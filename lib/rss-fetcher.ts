import Parser from 'rss-parser';

const parser = new Parser();

const RSS_FEEDS = [
  'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
  'https://www.moneycontrol.com/rss/MCtopnews.xml',
  'https://www.livemint.com/rss/money',
];

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  source: string;
}

export async function fetchFinanceNews(maxItems: number = 10): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const sourceName = feed.title || feedUrl;

      const items: NewsItem[] = (feed.items || []).slice(0, 5).map(item => ({
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        content: item.contentSnippet || item.content || '',
        source: sourceName,
      }));

      allItems.push(...items);
    } catch (error) {
      console.error(`Failed to fetch RSS feed: ${feedUrl}`, error);
    }
  }

  // Sort by date, newest first, and limit
  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return allItems.slice(0, maxItems);
}
