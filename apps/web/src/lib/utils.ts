import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves a reliable, direct link to a news story.
 * If the provided URL is a generic section page or root domain (e.g. financialpost.com/commodities/energy, cbc.ca),
 * it seamlessly generates a targeted search query for the exact article title and publication source,
 * ensuring users always land on the exact article rather than a generic section front page.
 */
export function getCanonicalArticleUrl(rawUrl: string, title?: string, source?: string): string {
  if (!rawUrl) {
    if (title) {
      return `https://www.google.com/search?q=${encodeURIComponent((source ? source + ' ' : '') + title)}`;
    }
    return '#';
  }

  try {
    const parsed = new URL(rawUrl);
    const pathname = parsed.pathname.replace(/\/+$/, '');
    const pathParts = pathname.split('/').filter(Boolean);

    // If it's already a targeted search query
    if (parsed.hostname.includes('google.com') || parsed.searchParams.has('q')) {
      return rawUrl;
    }

    // Generic homepages or shallow category roots (e.g. /news, /commodities/energy, /local-news)
    const hasArticleSlug = pathParts.some((part) => part.includes('-') && part.length > 18) || /\d{5,}/.test(pathname) || pathname.endsWith('.html');
    const isGenericSection = pathParts.length === 0 || (!hasArticleSlug && pathParts.length <= 2);

    if (isGenericSection && title) {
      const cleanSource = (source || '').replace(/\/.*$/, '').trim();
      const query = cleanSource ? `${cleanSource} "${title}"` : `"${title}"`;
      return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    return rawUrl;
  } catch {
    if (title) {
      return `https://www.google.com/search?q=${encodeURIComponent((source ? source + ' ' : '') + title)}`;
    }
    return rawUrl;
  }
}
