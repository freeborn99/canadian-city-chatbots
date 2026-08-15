import * as cheerio from 'cheerio';

export interface ScrapedDocument {
  title: string;
  url: string;
  category: string;
  content: string;
  extractedAt: number;
}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 (CanadianCityBot/1.0; +https://canadian-city-chatbots.vercel.app)';

export async function scrapeUrl(
  targetUrl: string,
  category: string,
  label: string
): Promise<ScrapedDocument | null> {
  try {
    console.log(`[Scraper] Fetching: ${targetUrl} (${label})...`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-CA,en-US;q=0.9,en;q=0.8,fr-CA;q=0.7',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Scraper] HTTP ${response.status} when fetching ${targetUrl}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise elements
    $('script, style, noscript, svg, iframe, nav, footer, header, form, .cookie-banner, .advertisement, [aria-hidden="true"]').remove();

    // Extract title
    const pageTitle =
      $('meta[property="og:title"]').attr('content') ||
      $('h1').first().text().trim() ||
      $('title').text().trim() ||
      label;

    // Collect text from high-value semantic nodes
    const contentBlocks: string[] = [];

    $('main, article, #main-content, .main-content, .content, .news-list, .events-calendar, body')
      .first()
      .find('h1, h2, h3, h4, p, li, .event-item, .news-item, .view-content')
      .each((_, elem) => {
        const text = $(elem).text().replace(/\s+/g, ' ').trim();
        // Discard very short or irrelevant fragments
        if (text.length > 25 && !contentBlocks.includes(text)) {
          contentBlocks.push(text);
        }
      });

    const fullContent = contentBlocks.slice(0, 40).join('\n\n');

    if (!fullContent || fullContent.length < 50) {
      console.warn(`[Scraper] Low/empty content extracted from ${targetUrl}`);
      return null;
    }

    return {
      title: pageTitle.replace(/\s+/g, ' ').trim(),
      url: targetUrl,
      category,
      content: fullContent,
      extractedAt: Date.now(),
    };
  } catch (error: unknown) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      console.warn(`[Scraper] Request timeout for ${targetUrl}`);
    } else {
      console.error(`[Scraper] Failed to scrape ${targetUrl}:`, err.message);
    }
    return null;
  }
}
