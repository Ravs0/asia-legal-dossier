import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';

const rssParser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; AsiaLegalBot/1.0)'
  }
});

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

// RSS Feed sources
const RSS_FEEDS = [
  {
    name: 'Reuters Legal',
    url: 'https://www.reutersagency.com/feed/?taxonomy=legal&post_type=reuters-best',
    category: 'market' as const,
    jurisdiction: 'Global'
  },
  {
    name: 'Legal Business',
    url: 'https://www.legalbusiness.co.uk/feed/',
    category: 'talent' as const,
    jurisdiction: 'UK'
  },
  {
    name: 'ALB Asia',
    url: 'https://www.legalbusiness.com.sg/feed/',
    category: 'market' as const,
    jurisdiction: 'Asia-Pacific'
  },
  {
    name: 'Chambers News',
    url: 'https://chambers.com/news/feed',
    category: 'market' as const,
    jurisdiction: 'Global'
  },
  {
    name: 'Law360',
    url: 'https://www.law360.com/rss/',
    category: 'litigation' as const,
    jurisdiction: 'US'
  },
  {
    name: 'Legal Cheek',
    url: 'https://www.legalcheek.com/feed/',
    category: 'talent' as const,
    jurisdiction: 'UK'
  }
];

// Categorize content based on keywords
function categorizeContent(title: string, content: string): NewsItem['category'] {
  const text = (title + ' ' + content).toLowerCase();
  if (text.includes('merger') || text.includes('acquisition') || text.includes('deal') || text.includes('ipo') || text.includes('transaction') || text.includes('investment')) {
    return 'deals';
  }
  if (text.includes('regulation') || text.includes('regulatory') || text.includes('compliance') || text.includes('sec') || text.includes('fca')) {
    return 'regulation';
  }
  if (text.includes('lateral') || text.includes('hire') || text.includes('partner') || text.includes('appointment') || text.includes('recruit')) {
    return 'talent';
  }
  if (text.includes('litigation') || text.includes('suit') || text.includes('court') || text.includes('arbitration') || text.includes('dispute')) {
    return 'litigation';
  }
  if (text.includes('policy') || text.includes('government') || text.includes('legislation') || text.includes('bill')) {
    return 'policy';
  }
  return 'market';
}

// Extract jurisdictions from content
function extractJurisdictions(title: string, content: string): string[] {
  const text = (title + ' ' + content).toLowerCase();
  const jurisdictions: string[] = [];
  
  const jurisdictionMap: Record<string, string[]> = {
    'Hong Kong': ['hong kong', 'hkex'],
    'Singapore': ['singapore', 'sgx'],
    'India': ['india', 'mumbai', 'delhi', 'bangalore'],
    'China': ['china', 'beijing', 'shanghai', 'prc'],
    'Japan': ['japan', 'tokyo', 'osaka'],
    'South Korea': ['south korea', 'seoul', 'korea'],
    'UAE': ['uae', 'dubai', 'abu dhabi', 'emirates'],
    'Saudi Arabia': ['saudi', 'saudi arabia', 'riyadh'],
    'Australia': ['australia', 'sydney', 'melbourne'],
    'UK': ['uk', 'britain', 'england', 'london'],
    'US': ['us', 'usa', 'america', 'new york', 'california']
  };
  
  for (const [jurisdiction, keywords] of Object.entries(jurisdictionMap)) {
    if (keywords.some(kw => text.includes(kw))) {
      jurisdictions.push(jurisdiction);
    }
  }
  
  return jurisdictions.length > 0 ? jurisdictions : ['Global'];
}

// Determine impact level
function determineImpact(title: string, content: string): NewsItem['impact'] {
  const text = (title + ' ' + content).toLowerCase();
  
  const highImpactKeywords = ['billion', 'major', 'significant', 'landmark', 'breakthrough', 'exclusive', 'urgent'];
  const mediumImpactKeywords = ['million', 'new', 'expansion', 'launch', 'partnership'];
  
  if (highImpactKeywords.some(kw => text.includes(kw))) return 'high';
  if (mediumImpactKeywords.some(kw => text.includes(kw))) return 'medium';
  return 'low';
}

// Extract firms mentioned
function extractFirms(title: string, content: string): string[] {
  const text = (title + ' ' + content).toLowerCase();
  const firms: string[] = [];
  
  const knownFirms = [
    'clifford chance', 'linklaters', 'freshfields', 'allen & overy',
    'latham & watkins', 'kirkland & ellis', 'skadden', 'sullivan & cromwell',
    'white & case', 'dla piper', 'hogan lovells', 'baker mckenzie',
    'cyril amarchand mangaldas', 'azb & partners', 'trilegal', 'shardul amarchand',
    'khaitan & co', 'j. sagar associates', 'l&l partners',
    'rajah & tann', 'wongpartnership', 'drew & napier',
    'fangda partners', 'han kun law', 'zhong lun', 'king & wood mallesons',
    'anderson mori', 'tmi associates', 'nagashima ohno',
    'kim & chang', 'bae kim & lee', 'lee & ko'
  ];
  
  for (const firm of knownFirms) {
    if (text.includes(firm)) {
      firms.push(firm.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    }
  }
  
  return firms;
}

// Generate tags from content
function generateTags(title: string, content: string): string[] {
  const text = (title + ' ' + content).toLowerCase();
  const tags: string[] = [];
  
  const tagKeywords: Record<string, string[]> = {
    'M&A': ['merger', 'acquisition', 'm&a', 'takeover'],
    'Private Equity': ['private equity', 'pe', 'buyout', 'sponsor'],
    'IPO': ['ipo', 'listing', 'public offering'],
    'ESG': ['esg', 'sustainability', 'green', 'climate'],
    'Technology': ['tech', 'technology', 'ai', 'digital', 'fintech'],
    'Arbitration': ['arbitration', 'icc', 'siac', 'lcia'],
    'Employment': ['employment', 'labor', 'workplace'],
    'Data Privacy': ['data', 'privacy', 'gdpr', 'dpdp'],
    'Antitrust': ['antitrust', 'competition', 'merger control'],
    'Finance': ['banking', 'finance', 'debt', 'loan']
  };
  
  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      tags.push(tag);
    }
  }
  
  return tags.slice(0, 4);
}

// Calculate read time
function calculateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${Math.max(1, minutes)} min`;
}

// Fetch and parse RSS feeds
async function fetchNewsFeeds(): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];
  
  const fetchPromises = RSS_FEEDS.map(async (feed) => {
    try {
      const parsed = await rssParser.parseURL(feed.url);
      
      return (parsed.items || []).slice(0, 10).map((item, index) => {
        const title = item.title || 'Untitled';
        const content = item.contentSnippet || item.content || item.summary || '';
        const category = categorizeContent(title, content);
        
        return {
          id: `${feed.name}-${index}-${Date.now()}`,
          title: title.slice(0, 200),
          summary: content.slice(0, 400) + (content.length > 400 ? '...' : ''),
          source: feed.name,
          url: item.link || '#',
          publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
          category,
          jurisdictions: extractJurisdictions(title, content),
          firms: extractFirms(title, content),
          impact: determineImpact(title, content),
          readTime: calculateReadTime(content),
          tags: generateTags(title, content)
        };
      });
    } catch (error) {
      console.error(`Failed to fetch ${feed.name}:`, error);
      return [];
    }
  });
  
  const results = await Promise.allSettled(fetchPromises);
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  });
  
  // Sort by date, most recent first
  return allItems.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 50);
}

// Cache for 5 minutes
let cachedNews: NewsItem[] = [];
let lastFetch: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const now = Date.now();
    
    // Return cached data if fresh
    if (cachedNews.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      return res.status(200).json({
        news: cachedNews,
        cached: true,
        lastUpdated: new Date(lastFetch).toISOString()
      });
    }
    
    // Fetch fresh data
    const news = await fetchNewsFeeds();
    
    // Update cache
    cachedNews = news;
    lastFetch = now;
    
    return res.status(200).json({
      news,
      cached: false,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('News API Error:', error);
    
    // Return cached data if available, even if stale
    if (cachedNews.length > 0) {
      return res.status(200).json({
        news: cachedNews,
        cached: true,
        stale: true,
        lastUpdated: new Date(lastFetch).toISOString()
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
