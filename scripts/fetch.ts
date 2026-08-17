/**
 * fetch.ts — Pull items from RSS/Atom feeds and return raw entries.
 * Rights-safe: stores only metadata + URLs, no full copyrighted content.
 */

export interface RawEntry {
  title: string;
  url: string;
  published: string;
  rawText: string; // snippet from feed, NOT full article
  source: string;
}

// Small set of public, rights-safe RSS feeds covering AI risk / cultural commentary
const FEEDS: string[] = [
  'https://feeds.feedburner.com/oreilly/radar', // O'Reilly Radar
  'https://www.technologyreview.com/feed/',     // MIT Technology Review
  'https://ainowinstitute.org/feed',             // AI Now Institute
  'https://spectrum.ieee.org/rss/blog/therisks/recent', // IEEE Risks
];

async function parseFeed(url: string): Promise<RawEntry[]> {
  let xml: string;
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
      headers: { 'User-Agent': 'AI-Risk-Blog-Bot/1.0 (+https://github.com/driver727-pixel/Ai-self-portrait)' },
    });
    if (!res.ok) return [];
    xml = await res.text();
  } catch {
    return [];
  }

  const entries: RawEntry[] = [];

  // Minimal XML parser using regex — avoids heavy deps
  // Supports both RSS <item> and Atom <entry> formats
  // Uses backreference \1 to enforce matching open/close tags
  const itemPattern = /<(item|entry)[\s\S]*?<\/\1>/gi;
  let match;
  while ((match = itemPattern.exec(xml)) !== null) {
    const block = match[0];

    const title = extractText(block, 'title') ?? '';
    const link = extractText(block, 'link') ?? extractAttr(block, 'link', 'href') ?? '';
    const pubDate = extractText(block, 'pubDate') ?? extractText(block, 'published') ?? extractText(block, 'updated') ?? '';
    // description/summary — snippet, NOT full article
    const rawText = stripHtml(extractText(block, 'description') ?? extractText(block, 'summary') ?? '').slice(0, 500);

    if (title && link) {
      entries.push({ title, url: link, published: pubDate, rawText, source: new URL(url).hostname });
    }
  }
  return entries;
}

function extractText(xml: string, tag: string): string | undefined {
  const m = xml.match(new RegExp(`<${tag}(?:[^>]*)><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
    ?? xml.match(new RegExp(`<${tag}(?:[^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : undefined;
}

function extractAttr(xml: string, tag: string, attr: string): string | undefined {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["']`, 'i'));
  return m ? m[1] : undefined;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function fetchAll(): Promise<RawEntry[]> {
  const results = await Promise.allSettled(FEEDS.map(parseFeed));
  return results.flatMap(r => r.status === 'fulfilled' ? r.value : []);
}

// Allow running as standalone for testing
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const entries = await fetchAll();
  console.log(`Fetched ${entries.length} entries`);
  entries.slice(0, 3).forEach(e => console.log(' -', e.title, '|', e.url));
}
