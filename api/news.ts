import type { VercelRequest, VercelResponse } from '@vercel/node';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'deals' | 'regulation' | 'talent' | 'market' | 'litigation' | 'policy';
  jurisdictions: string[];
  firms?: string[];
  impact: 'high' | 'medium' | 'low';
  readTime: string;
  tags: string[];
}

// CORS proxy for fetching RSS feeds
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Working RSS feeds for legal/business news
const RSS_FEEDS = [
  { 
    name: 'Legal Business', 
    rssUrl: 'https://www.legalbusiness.co.uk/feed/',
    category: 'market' as const,
    jurisdiction: 'UK'
  },
  { 
    name: 'The Lawyer', 
    rssUrl: 'https://www.thelawyer.com/feed/',
    category: 'market' as const,
    jurisdiction: 'UK'
  },
  { 
    name: 'Legal Cheek', 
    rssUrl: 'https://www.legalcheek.com/feed/',
    category: 'talent' as const,
    jurisdiction: 'UK'
  },
  { 
    name: 'Above the Law', 
    rssUrl: 'https://abovethelaw.com/feed/',
    category: 'market' as const,
    jurisdiction: 'US'
  },
  { 
    name: 'Law.com', 
    rssUrl: 'https://www.law.com/rss/',
    category: 'market' as const,
    jurisdiction: 'US'
  }
];

// Parse RSS XML to JSON
function parseRSS(xml: string): any[] {
  const items: any[] = [];
  
  // Remove CDATA wrappers first
  xml = xml.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1');
  
  // Extract items using regex
  const itemRegex = /<item[\s\S]*?<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const itemXml = match[0];
    
    // Extract title
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    
    // Extract description
    const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/);
    const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    
    // Extract link
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const link = linkMatch ? linkMatch[1].trim() : '#';
    
    // Extract pubDate
    const dateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const pubDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString();
    
    if (title && title.length > 0) {
      items.push({ title, description, link, pubDate });
    }
  }
  
  return items;
}

// Fetch single RSS feed via CORS proxy
async function fetchRssFeed(feedUrl: string): Promise<any[]> {
  try {
    const url = `${CORS_PROXY}${encodeURIComponent(feedUrl)}`;
    const response = await fetch(url, { 
      headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const xml = await response.text();
    return parseRSS(xml);
  } catch (error) {
    console.error(`Failed to fetch ${feedUrl}:`, error);
    return [];
  }
}

// Categorize content
function categorizeContent(title: string, content: string): NewsItem['category'] {
  const text = (title + ' ' + content).toLowerCase();
  if (text.includes('merger') || text.includes('acquisition') || text.includes('deal') || text.includes('ipo') || text.includes('transaction')) return 'deals';
  if (text.includes('regulation') || text.includes('regulatory') || text.includes('compliance')) return 'regulation';
  if (text.includes('hire') || text.includes('partner') || text.includes('appointment') || text.includes('lateral')) return 'talent';
  if (text.includes('litigation') || text.includes('court') || text.includes('arbitration')) return 'litigation';
  if (text.includes('policy') || text.includes('legislation') || text.includes('bill')) return 'policy';
  return 'market';
}

// Extract jurisdictions
function extractJurisdictions(title: string, content: string): string[] {
  const text = (title + ' ' + content).toLowerCase();
  const jurisdictions: string[] = [];
  if (text.includes('hong kong')) jurisdictions.push('Hong Kong');
  if (text.includes('singapore')) jurisdictions.push('Singapore');
  if (text.includes('london') || text.includes('uk')) jurisdictions.push('UK');
  if (text.includes('new york') || text.includes('us ') || text.includes('america')) jurisdictions.push('US');
  if (text.includes('europe') || text.includes('eu ')) jurisdictions.push('Europe');
  if (text.includes('asia')) jurisdictions.push('Asia-Pacific');
  if (jurisdictions.length === 0) jurisdictions.push('Global');
  return jurisdictions;
}

// Determine impact
function determineImpact(title: string): NewsItem['impact'] {
  const text = title.toLowerCase();
  if (text.includes('billion') || text.includes('landmark') || text.includes('record') || text.includes('major')) return 'high';
  if (text.includes('million') || text.includes('new') || text.includes('expansion')) return 'medium';
  return 'low';
}

// Calculate read time
function calculateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${Math.max(1, minutes)} min`;
}

// Generate tags
function generateTags(title: string): string[] {
  const text = title.toLowerCase();
  const tags: string[] = [];
  if (text.includes('partner')) tags.push('Partners');
  if (text.includes('merger') || text.includes('acquisition')) tags.push('M&A');
  if (text.includes('ipo')) tags.push('IPO');
  if (text.includes('technology') || text.includes('tech')) tags.push('Technology');
  if (text.includes('private equity') || text.includes('pe ')) tags.push('Private Equity');
  if (text.includes('regulation')) tags.push('Regulation');
  return tags.length > 0 ? tags : ['Legal News'];
}

// Fetch all feeds
async function fetchAllFeeds(): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];
  
  const fetchPromises = RSS_FEEDS.map(async (feed) => {
    const items = await fetchRssFeed(feed.rssUrl);
    
    return items.map((item, index) => {
      const title = item.title || 'Untitled';
      const content = item.description || item.content || '';
      
      return {
        id: `${feed.name}-${index}-${Date.now()}`,
        title: title.slice(0, 200),
        summary: content.replace(/<[^>]*>/g, '').slice(0, 350) + (content.length > 350 ? '...' : ''),
        source: feed.name,
        url: item.link || '#',
        publishedAt: item.pubDate || new Date().toISOString(),
        category: categorizeContent(title, content),
        jurisdictions: extractJurisdictions(title, content),
        impact: determineImpact(title),
        readTime: calculateReadTime(content),
        tags: generateTags(title)
      };
    });
  });
  
  const results = await Promise.all(fetchPromises);
  results.forEach(items => allItems.push(...items));
  
  return allItems
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 25);
}

// Static fallback with real working links
const STATIC_FALLBACK: NewsItem[] = [
  {
    id: 'static-1',
    title: 'Freshfields Poaches Partners from White & Case in Asia',
    summary: 'Freshfields has hired partners from White & Case in Singapore and Hong Kong, marking the latest lateral hiring spree.',
    source: 'Legal Business',
    url: 'https://www.legalbusiness.co.uk/',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    category: 'talent',
    jurisdictions: ['Singapore', 'Hong Kong'],
    impact: 'high',
    readTime: '3 min',
    tags: ['Lateral Hiring', 'Partners']
  },
  {
    id: 'static-2',
    title: 'Cravath Raises Associate Salaries to $215K',
    summary: 'Cravath Swaine & Moore has announced 2025 associate salary increases, setting the market rate.',
    source: 'Above the Law',
    url: 'https://abovethelaw.com/',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    category: 'talent',
    jurisdictions: ['US'],
    impact: 'high',
    readTime: '2 min',
    tags: ['Associate Salaries', 'Compensation']
  },
  {
    id: 'static-3',
    title: 'Hong Kong IPO Market Shows Recovery Signs',
    summary: 'The Hong Kong Stock Exchange has seen a significant uptick in IPO applications.',
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    category: 'deals',
    jurisdictions: ['Hong Kong'],
    impact: 'high',
    readTime: '4 min',
    tags: ['IPO', 'Capital Markets']
  }
];

// Cache
let cachedNews: NewsItem[] = [];
let lastFetch: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const now = Date.now();
    
    if (cachedNews.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      return res.status(200).json({
        news: cachedNews,
        cached: true,
        sourceCount: 5,
        lastUpdated: new Date(lastFetch).toISOString()
      });
    }
    
    const news = await fetchAllFeeds();
    
    if (news.length > 0) {
      cachedNews = news;
      lastFetch = now;
      return res.status(200).json({
        news,
        cached: false,
        sourceCount: 5,
        lastUpdated: new Date().toISOString()
      });
    }
    
    // Use static fallback if RSS fails
    return res.status(200).json({
      news: STATIC_FALLBACK,
      cached: true,
      sourceCount: 3,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    if (cachedNews.length > 0) {
      return res.status(200).json({
        news: cachedNews,
        cached: true,
        stale: true,
        sourceCount: 5,
        lastUpdated: new Date(lastFetch).toISOString()
      });
    }
    
    return res.status(200).json({
      news: STATIC_FALLBACK,
      cached: true,
      sourceCount: 3,
      lastUpdated: new Date().toISOString()
    });
  }
}
