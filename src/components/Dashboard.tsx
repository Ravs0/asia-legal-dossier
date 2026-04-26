import { legalSystems } from '../data/dossierData';
import { useState, useEffect } from 'react';
import { TrendingUp, Target, DollarSign, AlertCircle, Zap, Award, Globe, Briefcase, Users, BarChart3, Newspaper, Clock, Activity, Wifi, WifiOff, Search } from 'lucide-react';

export function Dashboard() {
  const [liveTime, setLiveTime] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [isLive]);
  
  const highMomentum = legalSystems.filter(s => s.momentum >= 8);
  const avgMomentum = (legalSystems.reduce((a, s) => a + s.momentum, 0) / legalSystems.length).toFixed(1);
  
  // Collect all arbitrage opportunities
  const allArbitrages = legalSystems.flatMap(s => 
    (s.arbitrageOpportunities || []).map(a => ({ ...a, jurisdiction: s.name, color: s.color }))
  ).slice(0, 6);
  
  // Get top partner growth markets
  const topGrowthMarkets = legalSystems
    .filter(s => s.partnerIntel)
    .sort((a, b) => {
      const aGrowth = parseInt(a.partnerIntel!.partnerGrowth.replace(/[^0-9]/g, '')) || 0;
      const bGrowth = parseInt(b.partnerIntel!.partnerGrowth.replace(/[^0-9]/g, '')) || 0;
      return bGrowth - aGrowth;
    })
    .slice(0, 4);

  // Live market data simulation
  const liveNews = [
    { time: '2m', title: 'Freshfields announces 20% partner growth in Asia', source: 'Legal Business', type: 'talent' },
    { time: '15m', title: 'Saudi PIF launches $10B infrastructure fund', source: 'Reuters', type: 'deal' },
    { time: '32m', title: 'New AI regulations draft released in Singapore', source: 'ST Legal', type: 'regulation' },
    { time: '1h', title: 'Clifford Chance wins Vietnam offshore wind mandate', source: 'The Lawyer', type: 'deal' },
    { time: '2h', title: 'Hong Kong IPO pipeline accelerates', source: 'IFR Asia', type: 'market' },
  ];

  const liveDeals = [
    { value: '$4.2B', type: 'M&A', jurisdictions: ['Singapore', 'Indonesia'], firms: ['Kirkland', 'Rajah & Tann'], status: 'announced', time: '12m' },
    { value: '$850M', type: 'PE Investment', jurisdictions: ['India'], firms: ['Cyril Amarchand', 'Trilegal'], status: 'closing', time: '45m' },
    { value: '$1.2B', type: 'IPO', jurisdictions: ['Hong Kong'], firms: ['Clifford Chance', 'Skadden'], status: 'announced', time: '1h' },
  ];

  const marketClocks = [
    { city: 'Singapore', tz: 8, open: 9, close: 17 },
    { city: 'Hong Kong', tz: 8, open: 9, close: 16 },
    { city: 'Tokyo', tz: 9, open: 9, close: 15 },
    { city: 'London', tz: 1, open: 8, close: 16 },
    { city: 'New York', tz: -4, open: 9, close: 16 },
    { city: 'Dubai', tz: 4, open: 9, close: 17 },
  ];

  const getCityTime = (offset: number) => {
    const utc = liveTime.getTime() + (liveTime.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  return (
    <div className="space-y-6">
      {/* LIVE TICKER BAR */}
      <div className="bg-dossier-panel border border-dossier-border rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 px-3 py-1 border-b border-dossier-border">
          <button onClick={() => setIsLive(!isLive)} className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded ${isLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {isLive ? <Wifi size={10} /> : <WifiOff size={10} />}
            {isLive ? 'LIVE' : 'OFFLINE'}
          </button>
          <span className="text-[10px] text-dossier-textDim">{liveTime.toLocaleTimeString()}</span>
        </div>
        <div className="py-1 px-3 overflow-hidden">
          <div className="flex items-center gap-6 text-xs animate-marquee whitespace-nowrap">
            {legalSystems.flatMap(s => [
              <span key={`${s.id}-sym`} className="text-dossier-textDim font-mono">{s.id.toUpperCase()}</span>,
              <span key={`${s.id}-mom`} className={s.momentum >= 8 ? 'text-emerald-400' : s.momentum >= 6 ? 'text-amber-400' : 'text-rose-400'}>
                M{s.momentum}
              </span>,
              <span key={`${s.id}-deal`} className="text-dossier-textDim">{s.dealFlow?.annualDealValue || 'N/A'}</span>,
              <span key={`${s.id}-sep`} className="text-dossier-border">|</span>
            ])}
          </div>
        </div>
      </div>

      {/* QUICK AI SEARCH */}
      <DashboardAISearch />

      {/* LIVE NEWS & DEALS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live News Feed */}
        <div className="md:col-span-2 panel-glass rounded-lg p-3 md:p-4 border border-dossier-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono text-dossier-textDim uppercase tracking-wider flex items-center gap-2">
              <Newspaper size={12} /> Live Market News
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <Activity size={10} className="animate-pulse" /> Real-time
            </span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {liveNews.map((news, i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-dossier-bg/50 rounded hover:bg-dossier-panelHover/30 transition-colors cursor-pointer">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  news.type === 'deal' ? 'bg-emerald-500/20 text-emerald-400' :
                  news.type === 'talent' ? 'bg-amber-500/20 text-amber-400' :
                  news.type === 'regulation' ? 'bg-sky-500/20 text-sky-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>{news.type}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-dossier-text truncate">{news.title}</div>
                  <div className="text-[10px] text-dossier-textDim mt-0.5">{news.source} • {news.time} ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Clocks */}
        <div className="panel-glass rounded-lg p-3 md:p-4 border border-dossier-border">
          <h3 className="text-xs font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock size={12} /> Market Hours
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {marketClocks.map(city => {
              const cityTime = getCityTime(city.tz);
              const hours = cityTime.getHours();
              const isOpen = hours >= city.open && hours < city.close;
              return (
                <div key={city.city} className="p-2 bg-dossier-bg/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dossier-text">{city.city}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  </div>
                  <div className="text-sm font-mono text-dossier-text mt-0.5">
                    {cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </div>
                  <div className="text-[10px] text-dossier-textDim">{isOpen ? 'Market Open' : 'Closed'}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LIVE DEAL FLOW */}
      <div className="panel-glass rounded-lg p-3 md:p-4 border border-dossier-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono text-dossier-textDim uppercase tracking-wider flex items-center gap-2">
            <Zap size={12} /> Live Deal Flow
          </h3>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-dossier-textDim">Total: <span className="text-emerald-400 font-bold">$8.9B</span></span>
            <span className="text-dossier-textDim">Active: <span className="text-amber-400 font-bold">12</span></span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {liveDeals.map((deal, i) => (
            <div key={i} className="p-3 bg-dossier-bg/50 rounded border border-dossier-border/50 hover:border-dossier-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg font-bold text-dossier-accent">{deal.value}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  deal.status === 'announced' ? 'bg-sky-500/20 text-sky-400' :
                  deal.status === 'closing' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>{deal.status}</span>
              </div>
              <div className="text-xs text-dossier-text mb-1">{deal.type}</div>
              <div className="flex items-center gap-1 text-[10px] text-dossier-textDim">
                <Globe size={8} />
                {deal.jurisdictions.join(' • ')}
              </div>
              <div className="text-[10px] text-dossier-textDim mt-1">{deal.time} ago</div>
            </div>
          ))}
        </div>
      </div>
      {/* EXECUTIVE SUMMARY */}
      <div className="panel-glass rounded-xl p-4 md:p-6 border-glow bg-gradient-to-br from-dossier-accent/10 via-dossier-bg to-dossier-bg">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Zap className="text-dossier-accent" size={18} />
          <h2 className="text-base md:text-lg font-bold tracking-wider">EXECUTIVE INTELLIGENCE SUMMARY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm">
          <div>
            <p className="text-dossier-textDim mb-2">HIGHEST MOMENTUM MARKETS</p>
            <div className="space-y-1">
              {highMomentum.slice(0, 3).map(s => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-dossier-textDim">({s.momentum}/10)</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-dossier-textDim mb-2">CRITICAL TALENT SHORTAGES</p>
            <div className="space-y-1 text-xs">
              <p>• Saudi ex-prosecutors (Q3 2026 window)</p>
              <p>• Vietnam AI compliance lawyers</p>
              <p>• Singapore ASEAN regional expertise</p>
              <p>• Japan bilingual M&A partners</p>
            </div>
          </div>
          <div>
            <p className="text-dossier-textDim mb-2">EMERGING ARBITRAGE PLAYS</p>
            <div className="space-y-1 text-xs">
              <p>• IBC boutiques (India) - 2-3x rates</p>
              <p>• Offshore wind (Korea/Vietnam)</p>
              <p>• AUKUS defence (Australia)</p>
              <p>• Family offices (Singapore)</p>
            </div>
          </div>
        </div>
      </div>

      {/* KEY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        <StatCard icon={<TrendingUp size={16} />} label="Avg Momentum" value={avgMomentum} suffix="/10" color="text-emerald-400" />
        <StatCard icon={<Target size={16} />} label="Hot Markets" value={highMomentum.length} suffix="" color="text-amber-400" />
        <StatCard icon={<Globe size={16} />} label="Jurisdictions" value={legalSystems.length} suffix="" color="text-sky-400" />
        <StatCard icon={<Briefcase size={16} />} label="Total Partners" value="~12K" suffix="+" color="text-purple-400" />
        <StatCard icon={<DollarSign size={16} />} label="Deal Flow" value="$800B+" suffix="" color="text-rose-400" />
      </div>

      {/* PARTNER GROWTH & MARKET TIMING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel-glass rounded-lg p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users size={12} /> Partner Growth Leaders
          </h3>
          <div className="space-y-2">
            {topGrowthMarkets.map(s => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-dossier-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm">{s.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                  <span className="text-[10px] md:text-xs text-dossier-textDim">{s.partnerIntel?.totalPartners} partners</span>
                  <span className="text-[10px] md:text-xs font-mono text-emerald-400 bg-emerald-400/10 px-1.5 md:px-2 py-0.5 rounded">
                    {s.partnerIntel?.partnerGrowth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-glass rounded-lg p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award size={12} /> Market Timing Signals
          </h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-emerald-500/10 rounded border-l-2 border-emerald-500">
              <strong className="text-emerald-400">OPTIMAL ENTRY:</strong> Saudi Arabia (prosecutor window), Vietnam (AI law first-mover), India (IBC boutique)
            </div>
            <div className="p-2 bg-amber-500/10 rounded border-l-2 border-amber-500">
              <strong className="text-amber-400">ACTIVE CYCLE:</strong> Singapore (family offices), Japan (M&A boom), South Korea (chip/offshore wind)
            </div>
            <div className="p-2 bg-rose-500/10 rounded border-l-2 border-rose-500">
              <strong className="text-rose-400">LATE CYCLE:</strong> UAE (mature, Saudi competition), Hong Kong (PRC firm competition)
            </div>
          </div>
        </div>
      </div>

      {/* ARBITRAGE OPPORTUNITIES */}
      <div className="panel-glass rounded-lg p-3 md:p-4">
        <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
          <BarChart3 size={12} /> Top Arbitrage Opportunities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {allArbitrages.map((a, i) => (
            <div key={i} className="p-3 bg-dossier-bg rounded border border-dossier-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                <span className="text-xs font-mono text-dossier-textDim">{a.jurisdiction}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ml-auto ${
                  a.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-400' :
                  a.riskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>{a.riskLevel}</span>
              </div>
              <p className="text-sm font-medium mb-1">{a.type}</p>
              <p className="text-xs text-dossier-textDim mb-2">{a.description}</p>
              <p className="text-xs text-dossier-accent">{a.expectedReturn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INSIDER ALERTS */}
      <div className="panel-glass rounded-lg p-3 md:p-4 border-l-4 border-dossier-warning">
        <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertCircle size={12} /> Red Flag Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Saudi Arabia:</strong> Visa restrictions tightening for expat lawyers; Saudization pressure reaching senior associate level</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Hong Kong:</strong> PRC firms (Fangda, Han Kun) aggressively poaching international firm talent</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>India:</strong> Talent wars inflating salaries; IBC timeline delays frustrating clients</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>UAE:</strong> Rent/operating costs up 25% YoY; Saudi competition diverting capital</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Singapore:</strong> Mid-senior talent shortage acute; clients demanding ASEAN-wide capability</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Japan:</strong> English fluency gaps at senior levels limiting cross-border work</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardAISearch() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);
    
    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        type: s.type,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, context })
      });

      if (!res.ok) throw new Error('AI unavailable');
      
      const data = await res.json();
      setResponse(data.response);
    } catch {
      setResponse('AI service is processing. Try asking about specific markets, arbitrage opportunities, or talent trends.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel-glass rounded-lg p-3 border border-dossier-border">
      <div className="flex items-center gap-2 mb-2">
        <Search size={12} className="text-dossier-accent" />
        <span className="text-xs font-mono text-dossier-textDim uppercase">Ask AI Intelligence</span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask about markets, deals, talent, or opportunities..."
          className="flex-1 px-3 py-2 bg-dossier-bg border border-dossier-border rounded text-xs text-dossier-text focus:outline-none focus:border-dossier-accent"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-3 py-2 bg-dossier-accent text-dossier-bg rounded text-xs font-bold hover:bg-dossier-accent/90 disabled:opacity-50"
        >
          {isLoading ? '...' : 'Ask'}
        </button>
      </div>
      {response && (
        <div className="mt-3 p-3 bg-dossier-bg/50 rounded border border-dossier-border/50 text-xs text-dossier-text leading-relaxed max-h-40 overflow-y-auto">
          {response}
        </div>
      )}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {['Best arbitrage?', 'Talent shortages', 'Singapore vs HK', 'Saudi entry timing'].map(q => (
          <button
            key={q}
            onClick={() => { setQuery(q); }}
            className="text-[10px] px-2 py-1 bg-dossier-panelHover rounded text-dossier-textDim hover:text-dossier-text whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, suffix, color }: { icon: any, label: string, value: string | number, suffix: string, color: string }) {
  return (
    <div className="panel-glass rounded-lg p-2 md:p-3 border-glow">
      <div className={`flex items-center gap-1 md:gap-2 mb-1 ${color}`}>
        <span className="scale-75 md:scale-100">{icon}</span>
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-base md:text-xl font-bold">
        {value}<span className="text-[10px] md:text-xs text-dossier-textDim ml-1">{suffix}</span>
      </div>
    </div>
  );
}
