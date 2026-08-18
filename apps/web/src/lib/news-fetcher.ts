import { NewsHeadline } from '@/lib/city-data';

interface LiveNewsCache {
  [cityId: string]: {
    articles: NewsHeadline[];
    fetchedAt: number;
    source: 'rss' | 'fallback';
  };
}

// Ensure global cache across hot reloads
const globalAny: any = globalThis;
if (!globalAny.__LIVE_NEWS_CACHE__) {
  globalAny.__LIVE_NEWS_CACHE__ = {} as LiveNewsCache;
}
const cache: LiveNewsCache = globalAny.__LIVE_NEWS_CACHE__;

const CITY_RSS_FEEDS: Record<string, string[]> = {
  yyc: ['https://calgaryherald.com/feed', 'https://www.cbc.ca/cmlink/rss-canada-calgary', 'https://dailyhive.com/feed/calgary'],
  yyz: ['https://www.cbc.ca/cmlink/rss-canada-toronto', 'https://www.blogto.com/feed/'],
  yvr: ['https://vancouversun.com/feed', 'https://www.cbc.ca/cmlink/rss-canada-britishcolumbia', 'https://dailyhive.com/feed/vancouver'],
  yul: ['https://montrealgazette.com/feed', 'https://www.cbc.ca/cmlink/rss-canada-montreal'],
  yeg: ['https://edmontonjournal.com/feed', 'https://www.cbc.ca/cmlink/rss-canada-edmonton'],
  yow: ['https://ottawacitizen.com/feed', 'https://www.cbc.ca/cmlink/rss-canada-ottawa'],
  ywg: ['https://www.cbc.ca/cmlink/rss-canada-manitoba'],
  yhz: ['https://www.cbc.ca/cmlink/rss-canada-novascotia'],
  yyj: ['https://www.cbc.ca/cmlink/rss-canada-britishcolumbia'],
  yyt: ['https://www.cbc.ca/cmlink/rss-canada-newfoundland'],
};

export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Recently';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}

interface ParsedRSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}

async function fetchAndParseRSS(url: string): Promise<ParsedRSSItem[]> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
      console.warn(`Failed to fetch RSS from ${url}: ${response.statusText}`);
      return [];
    }
    const xml = await response.text();
    
    const items: ParsedRSSItem[] = [];
    // Regex parsing for basic RSS items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null && items.length < 8) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/);
      const title = titleMatch ? (titleMatch[1] || titleMatch[2]).trim() : 'No Title';
      
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
      const link = linkMatch ? linkMatch[1].trim() : '#';
      
      const descMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/);
      const description = descMatch ? (descMatch[1] || descMatch[2]).replace(/<[^>]*>?/gm, '').trim() : '';
      
      const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();
      
      const sourceMatch = itemXml.match(/<dc:creator>([\s\S]*?)<\/dc:creator>|<source[^>]*>([\s\S]*?)<\/source>/);
      const source = sourceMatch ? (sourceMatch[1] || sourceMatch[2]).trim() : new URL(url).hostname;
      
      items.push({ title, link, description, pubDate, source });
    }
    
    return items;
  } catch (error) {
    console.warn(`Error processing RSS feed ${url}:`, error);
    return [];
  }
}

interface AIArticleSummary {
  id: string; // The URL link
  summary: string;
  keyTakeaways: string[];
  localImpact: string;
  category: NewsHeadline['category'];
}

async function generateAISummary(articles: ParsedRSSItem[]): Promise<Map<string, AIArticleSummary>> {
  if (articles.length === 0) return new Map();
  if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY not set. Skipping AI summary generation.");
    return new Map();
  }

  const prompt = `
You are a local news editor for Canadian cities. Below is a list of news articles parsed from RSS feeds. 
For each article, generate:
1. A 1-2 sentence summary.
2. 3 key takeaways (as an array of strings).
3. A 1-sentence local impact assessment.
4. A category classification strictly from this list: 'Civic', 'Business', 'Culture', 'Development', 'Regional', 'Sports', 'Technology', 'Government', 'Energy', 'Finance', 'Maritime', 'Aerospace', 'Agriculture', 'Policy', 'Industry', 'Logistics', 'Healthcare', 'Environment', 'Education'.

Articles:
${articles.map((a) => `ID (Link): ${a.link}\nTitle: ${a.title}\nDescription: ${a.description.substring(0, 500)}...\nSource: ${a.source}\n`).join('\n---\n')}

Return ONLY a JSON object with a single key "articles" containing an array of objects. Each object MUST have:
- "id": string (exactly matching the ID/Link provided above)
- "summary": string
- "keyTakeaways": string[] (exactly 3 items)
- "localImpact": string
- "category": string (from the allowed list)
`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });

    if (!res.ok) {
      console.warn(`Groq API error: ${res.statusText}`);
      return new Map();
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '{"articles": []}';
    
    let parsed: any;
    try {
      parsed = JSON.parse(content);
      if (parsed.articles && Array.isArray(parsed.articles)) {
        parsed = parsed.articles;
      } else {
        parsed = [];
      }
    } catch (e) {
      console.warn("Failed to parse Groq response JSON", e);
      return new Map();
    }

    const summariesMap = new Map<string, AIArticleSummary>();
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        if (item.id && item.summary && item.keyTakeaways && item.localImpact && item.category) {
          summariesMap.set(item.id, item as AIArticleSummary);
        }
      }
    }
    
    return summariesMap;
  } catch (err) {
    console.warn("Exception during generateAISummary:", err);
    return new Map();
  }
}

export async function fetchAndCacheAllCityNews(): Promise<Record<string, number>> {
  const summary: Record<string, number> = {};

  for (const [cityId, feeds] of Object.entries(CITY_RSS_FEEDS)) {
    try {
      let allParsedItems: ParsedRSSItem[] = [];
      
      for (const feedUrl of feeds) {
        const items = await fetchAndParseRSS(feedUrl);
        allParsedItems = allParsedItems.concat(items);
      }
      
      // Limit to 8 items per city total to avoid overwhelming the prompt/UI
      allParsedItems = allParsedItems.slice(0, 8);
      
      if (allParsedItems.length > 0) {
        const aiSummaries = await generateAISummary(allParsedItems);
        
        const newsHeadlines: NewsHeadline[] = allParsedItems.map((item, index) => {
          const aiData = aiSummaries.get(item.link);
          
          return {
            id: `news-${cityId}-${index}-${Date.now()}`,
            title: item.title,
            source: item.source,
            category: (aiData?.category as NewsHeadline['category']) || 'Civic',
            url: item.link,
            timeAgo: getRelativeTime(item.pubDate),
            summary: aiData?.summary || item.description.substring(0, 150) + '...',
            expandedDetails: {
              keyTakeaways: aiData?.keyTakeaways || ['Read the full article for more details.'],
              localImpact: aiData?.localImpact || 'Local implications are detailed in the source article.',
              timeline: 'Ongoing',
            }
          };
        });

        cache[cityId] = {
          articles: newsHeadlines,
          fetchedAt: Date.now(),
          source: 'rss'
        };
        summary[cityId] = newsHeadlines.length;
      } else {
        summary[cityId] = 0;
      }
    } catch (err) {
      console.warn(`Error processing news for city ${cityId}:`, err);
      summary[cityId] = 0;
    }
  }

  return summary;
}

export function getLiveNewsForCity(cityId: string): NewsHeadline[] {
  const cachedData = cache[cityId];
  if (!cachedData) return [];
  
  // Check if cache is < 4 hours old
  const isFresh = (Date.now() - cachedData.fetchedAt) < (4 * 60 * 60 * 1000);
  
  if (isFresh && cachedData.articles && cachedData.articles.length > 0) {
    return cachedData.articles;
  }
  
  return [];
}

export function getNewsCacheStatus(): Record<string, { count: number; ageMinutes: number }> {
  const status: Record<string, { count: number; ageMinutes: number }> = {};
  const now = Date.now();
  
  for (const cityId of Object.keys(CITY_RSS_FEEDS)) {
    const cachedData = cache[cityId];
    if (cachedData) {
      status[cityId] = {
        count: cachedData.articles.length,
        ageMinutes: Math.floor((now - cachedData.fetchedAt) / (60 * 1000))
      };
    } else {
      status[cityId] = {
        count: 0,
        ageMinutes: -1
      };
    }
  }
  
  return status;
}
