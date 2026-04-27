import { useState, useEffect } from 'react';
import { legalSystems } from '../data/dossierData';
import { MarkdownText } from './MarkdownText';
import { 
  Newspaper, Search, Filter, ExternalLink, Clock, TrendingUp, 
  AlertCircle, Briefcase, Users, Scale, Globe, Zap, BarChart3,
  ChevronDown, ChevronUp, RefreshCw, Rss, Tag, Calendar,
  MessageSquare, Brain, ArrowRight, X, Bookmark, Share2
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url?: string;
  publishedAt: string;
  category: 'deals' | 'regulation' | 'talent' | 'market' | 'litigation' | 'policy';
  jurisdictions: string[];
  firms?: string[];
  impact: 'high' | 'medium' | 'low';
  readTime: string;
  tags: string[];
  analyzed?: boolean;
  analysis?: string;
}

const mockNewsFeed: NewsItem[] = [
  {
    id: '1',
    title: 'Saudi PIF Announces $10 Billion Infrastructure Fund for Legal Services Expansion',
    summary: 'The Public Investment Fund (PIF) of Saudi Arabia has unveiled a massive $10 billion infrastructure fund that will drive unprecedented legal work across project finance, construction, and regulatory compliance. International firms are scrambling to position for mandates.',
    source: 'Reuters Legal',
    url: 'https://www.reuters.com/business/legal/saudi-pif-10b-infrastructure-fund-2026-04-26/',
    publishedAt: '2026-04-26T10:30:00Z',
    category: 'deals',
    jurisdictions: ['Saudi Arabia', 'UAE'],
    firms: ['White & Case', 'Latham & Watkins', 'Clifford Chance'],
    impact: 'high',
    readTime: '4 min',
    tags: ['Infrastructure', 'Project Finance', 'Saudi Vision 2030', 'PIF']
  },
  {
    id: '2',
    title: 'Freshfields Confirms 20% Partner Growth in Asia-Pacific Region',
    summary: 'Freshfields Bruckhaus Deringer has announced plans to increase its Asia-Pacific partner count by 20% over the next 18 months, focusing on Singapore, Hong Kong, and Tokyo. The expansion targets corporate/M&A, private equity, and disputes practices.',
    source: 'Legal Business',
    url: 'https://www.legalbusiness.co.uk/news/freshfields-apac-partner-growth-2026/',
    publishedAt: '2026-04-26T09:15:00Z',
    category: 'talent',
    jurisdictions: ['Singapore', 'Hong Kong', 'Japan'],
    firms: ['Freshfields'],
    impact: 'high',
    readTime: '3 min',
    tags: ['Lateral Hiring', 'Expansion', 'Partners', 'APAC']
  },
  {
    id: '3',
    title: 'Singapore Releases Draft AI Governance Framework for Legal Sector',
    summary: 'The Singapore Ministry of Law has released a comprehensive draft framework governing the use of AI in legal services. The regulations address client confidentiality, algorithmic transparency, and liability allocation between lawyers and AI vendors.',
    source: 'Straits Times Legal',
    url: 'https://www.straitstimes.com/singapore/legal/ai-governance-framework-legal-sector-draft-2026/',
    publishedAt: '2026-04-26T08:00:00Z',
    category: 'regulation',
    jurisdictions: ['Singapore'],
    impact: 'high',
    readTime: '6 min',
    tags: ['AI', 'Regulation', 'Legal Tech', 'Governance']
  },
  {
    id: '4',
    title: 'Clifford Chance Secures Vietnam Offshore Wind Advisory Mandate',
    summary: 'Clifford Chance has been appointed as lead international counsel for a consortium developing Vietnam\'s largest offshore wind project. The $3.2 billion development faces complex multi-jurisdictional financing and regulatory challenges.',
    source: 'The Lawyer',
    url: 'https://www.thelawyer.com/clifford-chance-vietnam-offshore-wind-mandate-2026/',
    publishedAt: '2026-04-25T14:20:00Z',
    category: 'deals',
    jurisdictions: ['Vietnam', 'Singapore'],
    firms: ['Clifford Chance', 'YKVN'],
    impact: 'medium',
    readTime: '3 min',
    tags: ['Energy', 'Offshore Wind', 'Project Finance', 'Renewables']
  },
  {
    id: '5',
    title: 'Hong Kong IPO Pipeline Accelerates with 12 New Listings Planned',
    summary: 'The Hong Kong Stock Exchange has seen a significant uptick in IPO applications, with 12 new listings planned for Q2 2026. Chinese tech companies and healthcare firms dominate the pipeline, signaling renewed market confidence.',
    source: 'IFR Asia',
    url: 'https://www.ifre.com/story/hong-kong-ipo-pipeline-q2-2026-12-listings/',
    publishedAt: '2026-04-25T11:45:00Z',
    category: 'market',
    jurisdictions: ['Hong Kong', 'China'],
    impact: 'high',
    readTime: '4 min',
    tags: ['Capital Markets', 'IPO', 'Listings', 'Exchanges']
  },
  {
    id: '6',
    title: 'India IBC Resolution Timeline Delays Continue to Frustrate Creditors',
    summary: 'New data reveals that 65% of Insolvency and Bankruptcy Code (IBC) cases are taking longer than the statutory 330-day limit, with some extending beyond 2 years. Creditors and investors are demanding legislative reforms.',
    source: 'Economic Times Legal',
    url: 'https://economictimes.indiatimes.com/industry/legal/ibc-resolution-delays-data-2026/',
    publishedAt: '2026-04-25T09:30:00Z',
    category: 'litigation',
    jurisdictions: ['India'],
    impact: 'medium',
    readTime: '5 min',
    tags: ['Insolvency', 'IBC', 'Bankruptcy', 'Delays']
  },
  {
    id: '7',
    title: 'Cyril Amarchand Mangaldas and Trilegal Lead $850M Indian PE Deal',
    summary: 'The two firms are advising on a major private equity investment into India\'s fintech sector, marking one of the largest PE transactions in the country this quarter. The deal involves complex FDI and regulatory clearance requirements.',
    source: 'Livemint Legal',
    url: 'https://www.livemint.com/news/india/cam-trilegal-850m-pe-deal-fintech-2026/',
    publishedAt: '2026-04-24T16:00:00Z',
    category: 'deals',
    jurisdictions: ['India'],
    firms: ['Cyril Amarchand Mangaldas', 'Trilegal'],
    impact: 'medium',
    readTime: '3 min',
    tags: ['Private Equity', 'Fintech', 'Investment', 'FDI']
  },
  {
    id: '8',
    title: 'UAE Operating Costs Rise 25% YoY as Saudi Competition Intensifies',
    summary: 'A new survey of international law firms reveals that operating costs in Dubai have surged 25% year-over-year, driven by rent increases and talent competition. Meanwhile, Saudi Arabia\'s legal market is diverting deal flow from traditional regional hub.',
    source: 'The National Law Journal',
    url: 'https://www.nationallawjournal.com/2026/04/24/uae-law-firm-costs-saudi-competition/',
    publishedAt: '2026-04-24T12:15:00Z',
    category: 'market',
    jurisdictions: ['UAE', 'Saudi Arabia'],
    impact: 'high',
    readTime: '4 min',
    tags: ['Costs', 'Dubai', 'Riyadh', 'Competition']
  },
  {
    id: '9',
    title: 'Kirkland Advises on $4.2B Singapore-Indonesia Cross-Border M&A',
    summary: 'Kirkland & Ellis is acting as lead counsel on the largest Southeast Asia M&A transaction announced this quarter. The deal involves complex ASEAN regulatory approvals and multi-jurisdictional antitrust clearances.',
    source: 'Asian Legal Business',
    url: 'https://www.legalbusiness.com.sg/kirkland-4-2b-singapore-indonesia-ma-2026/',
    publishedAt: '2026-04-24T10:00:00Z',
    category: 'deals',
    jurisdictions: ['Singapore', 'Indonesia'],
    firms: ['Kirkland & Ellis', 'Rajah & Tann'],
    impact: 'high',
    readTime: '3 min',
    tags: ['M&A', 'Cross-Border', 'Antitrust', 'ASEAN']
  },
  {
    id: '10',
    title: 'Japan Amends Corporate Governance Code to Enhance Board Diversity',
    summary: 'The Tokyo Stock Exchange has released amendments to the Corporate Governance Code, introducing new requirements for board diversity and ESG disclosures. Legal advisors expect increased demand for governance consulting.',
    source: 'Nikkei Asia',
    url: 'https://asia.nikkei.com/Business/Japan-amends-corporate-governance-code-board-diversity/',
    publishedAt: '2026-04-23T15:30:00Z',
    category: 'regulation',
    jurisdictions: ['Japan'],
    impact: 'medium',
    readTime: '4 min',
    tags: ['Governance', 'ESG', 'Board Diversity', 'TSE']
  },
  {
    id: '11',
    title: 'PRC Firms Fangda and Han Kun Aggressively Recruiting from International Firms',
    summary: 'Leading Chinese law firms are offering premium compensation packages to lure partners from international practices in Hong Kong. The trend reflects growing capabilities and ambitions of domestic firms in cross-border work.',
    source: 'China Business Law Journal',
    url: 'https://www.chinabusinesslawjournal.com/2026/04/23/fangda-hankun-recruiting-international-firms/',
    publishedAt: '2026-04-23T11:20:00Z',
    category: 'talent',
    jurisdictions: ['China', 'Hong Kong'],
    firms: ['Fangda Partners', 'Han Kun Law'],
    impact: 'high',
    readTime: '5 min',
    tags: ['Talent War', 'Lateral Hiring', 'China Firms', 'Competition']
  },
  {
    id: '12',
    title: 'South Korea Expands Tax Incentives for Foreign Law Firm Branch Offices',
    summary: 'The Korean government has announced expanded tax incentives for foreign law firms establishing branch offices in Seoul. The move aims to position Korea as a regional legal hub for international arbitration and cross-border deals.',
    source: 'Korea Herald Business',
    url: 'https://www.koreaherald.com/view.php?ud=20260422000145',
    publishedAt: '2026-04-22T14:00:00Z',
    category: 'policy',
    jurisdictions: ['South Korea'],
    impact: 'medium',
    readTime: '3 min',
    tags: ['Tax Incentives', 'Foreign Firms', 'Policy', 'Seoul']
  }
];

export function NewsHub({ onAnalyze }: { onAnalyze?: (news: NewsItem) => void }) {
  const [news, setNews] = useState<NewsItem[]>(mockNewsFeed);
  const [filter, setFilter] = useState<'all' | NewsItem['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'impact'>('newest');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newArticleIds, setNewArticleIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [isUsingRealData, setIsUsingRealData] = useState(false);

  // Initial fetch on mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshFeed();
    }, 60000);
    return () => clearInterval(interval);
  }, [news]);

  const fetchNews = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      
      const data = await response.json();
      
      if (data.news && data.news.length > 0) {
        // Detect new articles
        const currentIds = new Set(news.map(n => n.id));
        const newIds = new Set<string>();
        
        data.news.forEach((item: NewsItem) => {
          if (!currentIds.has(item.id)) {
            newIds.add(item.id);
          }
        });
        
        setNews(data.news);
        setIsUsingRealData(true);
        setLastUpdated(new Date(data.lastUpdated));
        
        if (newIds.size > 0) {
          setNewArticleIds(newIds);
          // Clear "new" indicator after 10 seconds
          setTimeout(() => {
            setNewArticleIds(prev => {
              const next = new Set(prev);
              newIds.forEach(id => next.delete(id));
              return next;
            });
          }, 10000);
        }
      }
    } catch (err) {
      console.error('News fetch error:', err);
      setError('Live feed unavailable. Showing cached/mock data.');
      // Keep using mock data on error
    } finally {
      setIsRefreshing(false);
    }
  };

  const refreshFeed = () => {
    fetchNews(true);
  };

  const filteredNews = news.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesJurisdiction = !selectedJurisdiction || 
      item.jurisdictions.some(j => j.toLowerCase().includes(selectedJurisdiction.toLowerCase()));
    return matchesFilter && matchesSearch && matchesJurisdiction;
  }).sort((a, b) => {
    if (sortBy === 'impact') {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const handleAnalyze = async (item: NewsItem) => {
    setAnalyzingId(item.id);
    
    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
      }));

      const prompt = `Analyze this legal market news and provide strategic insights:

Title: ${item.title}
Summary: ${item.summary}
Jurisdictions: ${item.jurisdictions.join(', ')}
Category: ${item.category}
Impact: ${item.impact}

Provide:
1. Key strategic implications for law firms
2. Which jurisdictions/competitors are most affected
3. Recommended actions for legal professionals
4. Related arbitrage opportunities if any`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, context })
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(prev => ({ ...prev, [item.id]: data.response }));
      }
    } catch {
      setAiAnalysis(prev => ({ 
        ...prev, 
        [item.id]: 'Analysis unavailable. Key implications: Monitor regulatory changes, assess competitive positioning, and evaluate client impact.' 
      }));
    } finally {
      setAnalyzingId(null);
    }
  };

  const getCategoryIcon = (category: NewsItem['category']) => {
    switch (category) {
      case 'deals': return <Briefcase size={14} className="text-emerald-400" />;
      case 'talent': return <Users size={14} className="text-amber-400" />;
      case 'regulation': return <Scale size={14} className="text-sky-400" />;
      case 'litigation': return <AlertCircle size={14} className="text-rose-400" />;
      case 'policy': return <Globe size={14} className="text-purple-400" />;
      default: return <TrendingUp size={14} className="text-dossier-accent" />;
    }
  };

  const getImpactColor = (impact: NewsItem['impact']) => {
    switch (impact) {
      case 'high': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-dossier-bg text-dossier-text">
      {/* Header */}
      <div className="bg-dossier-panel border-b border-dossier-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-dossier-accent/20 flex items-center justify-center border border-dossier-accent/40">
                <Rss size={20} className="text-dossier-accent" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wider">LEGAL INTELLIGENCE NEWS</h1>
                <p className="text-xs text-dossier-textDim">Real-time market updates & analysis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-4 text-dossier-textDim">
                <span className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isUsingRealData ? 'bg-emerald-400' : 'bg-amber-400'} ${isRefreshing ? 'animate-ping' : 'animate-pulse'}`} />
                  <span className={isRefreshing ? 'text-emerald-400' : isUsingRealData ? 'text-emerald-400' : 'text-amber-400'}>
                    {isRefreshing ? 'Updating...' : isUsingRealData ? 'Live Feed' : 'Demo Mode'}
                  </span>
                </span>
                <span>{filteredNews.length} articles</span>
                <span className="text-dossier-textDim/60">
                  {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <button
                onClick={refreshFeed}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-2 py-1 bg-dossier-panel hover:bg-dossier-panelHover border border-dossier-border rounded text-dossier-textDim hover:text-dossier-text disabled:opacity-50 transition-colors"
                title="Refresh feed"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2 text-xs text-amber-400">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dossier-textDim" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, tags, jurisdictions..."
                className="w-full pl-9 pr-4 py-2 bg-dossier-bg border border-dossier-border rounded-lg text-xs focus:outline-none focus:border-dossier-accent"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: 'all', label: 'All', icon: <Newspaper size={12} /> },
                { id: 'deals', label: 'Deals', icon: <Briefcase size={12} /> },
                { id: 'talent', label: 'Talent', icon: <Users size={12} /> },
                { id: 'regulation', label: 'Regulation', icon: <Scale size={12} /> },
                { id: 'market', label: 'Markets', icon: <TrendingUp size={12} /> },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${
                    filter === cat.id 
                      ? 'bg-dossier-accent/20 text-dossier-accent border border-dossier-accent/40' 
                      : 'bg-dossier-bg border border-dossier-border text-dossier-textDim hover:text-dossier-text'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-dossier-bg border border-dossier-border rounded-lg text-xs text-dossier-textDim focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="impact">Highest Impact</option>
              </select>
            </div>
          </div>

          {/* Jurisdiction Filter */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] text-dossier-textDim uppercase">Filter by:</span>
            <button
              onClick={() => setSelectedJurisdiction(null)}
              className={`text-[10px] px-2 py-1 rounded ${!selectedJurisdiction ? 'bg-dossier-accent/20 text-dossier-accent' : 'bg-dossier-bg text-dossier-textDim'}`}
            >
              All
            </button>
            {legalSystems.slice(0, 8).map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedJurisdiction(selectedJurisdiction === s.id ? null : s.name)}
                className={`text-[10px] px-2 py-1 rounded whitespace-nowrap ${
                  selectedJurisdiction === s.name 
                    ? 'bg-dossier-accent/20 text-dossier-accent' 
                    : 'bg-dossier-bg text-dossier-textDim hover:text-dossier-text'
                }`}
              >
                {s.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* News Feed */}
          <div className="lg:col-span-3 space-y-4">
            {filteredNews.map(item => (
              <div 
                key={item.id} 
                className="panel-glass rounded-lg border border-dossier-border hover:border-dossier-accent/30 transition-all"
              >
                <div className="p-4">
                  {/* Header Row */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-dossier-panel flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {newArticleIds.has(item.id) && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 font-semibold animate-pulse">
                            NEW
                          </span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${getImpactColor(item.impact)}`}>
                          {item.impact.toUpperCase()} IMPACT
                        </span>
                        <span className="text-[10px] text-dossier-textDim flex items-center gap-1">
                          <Clock size={10} />
                          {formatTime(item.publishedAt)}
                        </span>
                        <span className="text-[10px] text-dossier-textDim">{item.readTime} read</span>
                      </div>
                      
                      <h2 
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="text-sm font-semibold mt-2 cursor-pointer hover:text-dossier-accent transition-colors"
                      >
                        {item.title}
                      </h2>
                      
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-dossier-textDim">
                        <span className="text-dossier-accent">{item.source}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Globe size={10} />
                          {item.jurisdictions.join(', ')}
                        </div>
                        {item.firms && (
                          <>
                            <span>•</span>
                            <span>{item.firms.join(', ')}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="text-dossier-textDim hover:text-dossier-text"
                    >
                      {expandedId === item.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === item.id && (
                    <div className="mt-4 pt-4 border-t border-dossier-border/50">
                      <p className="text-xs text-dossier-text leading-relaxed">
                        {item.summary}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-dossier-panelHover rounded text-dossier-textDim">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-dossier-border/30">
                        <button 
                          onClick={() => handleAnalyze(item)}
                          disabled={analyzingId === item.id}
                          className="flex items-center gap-1.5 text-xs text-dossier-accent hover:text-dossier-text transition-colors disabled:opacity-50"
                        >
                          {analyzingId === item.id ? (
                            <RefreshCw size={12} className="animate-spin" />
                          ) : (
                            <Brain size={12} />
                          )}
                          {analyzingId === item.id ? 'Analyzing...' : 'AI Analysis'}
                        </button>
                        
                        {item.url && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-dossier-accent/10 text-dossier-accent border border-dossier-accent/30 rounded hover:bg-dossier-accent/20 transition-colors"
                          >
                            <ExternalLink size={12} />
                            Read Original Article
                          </a>
                        )}
                        
                        <button className="flex items-center gap-1.5 text-xs text-dossier-textDim hover:text-dossier-text ml-auto">
                          <Bookmark size={12} />
                          Save
                        </button>
                      </div>

                      {/* AI Analysis Result */}
                      {aiAnalysis[item.id] && (
                        <div className="mt-4 p-3 bg-dossier-panel/50 rounded-lg border border-dossier-accent/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain size={12} className="text-dossier-accent" />
                            <span className="text-xs font-semibold text-dossier-accent">AI Intelligence Analysis</span>
                          </div>
                          <div className="text-xs text-dossier-text">
                            <MarkdownText text={aiAnalysis[item.id]} size="xs" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Trending Topics */}
            <div className="panel-glass rounded-lg p-4 border border-dossier-border">
              <h3 className="text-xs font-semibold mb-3 flex items-center gap-2">
                <Zap size={14} className="text-dossier-accent" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['Saudi Vision 2030', 'AI Regulation', 'Offshore Wind', 'IPO Pipeline', 'Talent War', 'China Firms', 'IBC Delays'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] px-2 py-1 bg-dossier-bg rounded hover:bg-dossier-panelHover transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Sources */}
            <div className="panel-glass rounded-lg p-4 border border-dossier-border">
              <h3 className="text-xs font-semibold mb-3 flex items-center gap-2">
                <Newspaper size={14} className="text-dossier-accent" />
                Top Sources
              </h3>
              <div className="space-y-2 text-xs">
                {['Reuters Legal', 'Legal Business', 'IFR Asia', 'The Lawyer', 'ALB'].map((source, i) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="text-dossier-textDim">{source}</span>
                    <span className="text-dossier-accent">{12 - i * 2} articles</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Impact Summary */}
            <div className="panel-glass rounded-lg p-4 border border-dossier-border">
              <h3 className="text-xs font-semibold mb-3 flex items-center gap-2">
                <BarChart3 size={14} className="text-dossier-accent" />
                Impact Summary
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-400">High Impact</span>
                  <span className="font-mono">{filteredNews.filter(n => n.impact === 'high').length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400">Medium Impact</span>
                  <span className="font-mono">{filteredNews.filter(n => n.impact === 'medium').length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400">Low Impact</span>
                  <span className="font-mono">{filteredNews.filter(n => n.impact === 'low').length}</span>
                </div>
              </div>
            </div>

            {/* Quick Terminal Access */}
            <div className="panel-glass rounded-lg p-4 border border-dossier-border bg-gradient-to-br from-dossier-accent/10 to-transparent">
              <h3 className="text-xs font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={14} className="text-dossier-accent" />
                Terminal Analysis
              </h3>
              <p className="text-[10px] text-dossier-textDim mb-3">
                Use the Bloomberg Terminal for deep-dive analysis on any news item.
              </p>
              <button className="w-full text-xs bg-dossier-accent text-dossier-bg py-2 rounded font-semibold hover:bg-dossier-accent/90 transition-colors">
                Open Terminal →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
