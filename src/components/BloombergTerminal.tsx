import { useState, useEffect, useRef, useCallback } from 'react';
import { legalSystems } from '../data/dossierData';
import { MarkdownText } from './MarkdownText';
import { 
  Terminal, Search, Command, ArrowRight, TrendingUp, TrendingDown, 
  Activity, Globe, Briefcase, Users, AlertCircle, Zap, BarChart3,
  PieChart, LineChart, Clock, Calendar, Filter, Download, Maximize2,
  Minimize2, Settings, Bell, Wifi, Cpu, Hash, ChevronRight, X
} from 'lucide-react';

// Bloomberg-style color palette
const COLORS = {
  bg: '#000000',
  panel: '#1a1a1a',
  panelHover: '#2a2a2a',
  border: '#333333',
  amber: '#ff8c00',
  amberDim: '#b36200',
  green: '#00ff00',
  greenDim: '#00aa00',
  red: '#ff0000',
  redDim: '#aa0000',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  white: '#ffffff',
  gray: '#888888',
  grayDim: '#555555'
};

interface Panel {
  id: string;
  title: string;
  symbol?: string;
  component: React.ReactNode;
}

export function BloombergTerminal() {
  const [activeFunction, setActiveFunction] = useState<string>('HOM');
  const [commandLine, setCommandLine] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [activePanel, setActivePanel] = useState<'news' | 'markets' | 'deals' | 'heatmap' | 'terminal'>('news');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tickerData, setTickerData] = useState(generateTickerData());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      // Update ticker data occasionally
      if (Math.random() > 0.7) {
        setTickerData(generateTickerData());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function generateTickerData() {
    return legalSystems.map(s => ({
      symbol: s.id.toUpperCase(),
      name: s.name,
      momentum: s.momentum,
      change: (Math.random() * 2 - 0.5).toFixed(1),
      deals: s.dealFlow?.annualDealValue || 'N/A',
      color: s.color
    }));
  }

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;
    
    setCommandHistory(prev => [...prev, cmd]);
    setCommandLine('');

    const cmdUpper = cmd.toUpperCase().trim();
    
    // Function key shortcuts
    if (cmdUpper === 'HOM' || cmdUpper === 'HOME') {
      setActiveFunction('HOM');
      setActivePanel('news');
    } else if (cmdUpper === 'NEWS') {
      setActiveFunction('NEWS');
      setActivePanel('news');
    } else if (cmdUpper === 'MKT' || cmdUpper === 'MARKETS') {
      setActiveFunction('MKT');
      setActivePanel('markets');
    } else if (cmdUpper === 'DEAL' || cmdUpper === 'DEALS') {
      setActiveFunction('DEAL');
      setActivePanel('deals');
    } else if (cmdUpper === 'HEAT' || cmdUpper === 'MAP') {
      setActiveFunction('HEAT');
      setActivePanel('heatmap');
    } else if (cmdUpper === 'TERM' || cmdUpper === 'TERMINAL') {
      setActiveFunction('TERM');
      setActivePanel('terminal');
    } else if (cmdUpper === 'HELP' || cmdUpper === '?') {
      setShowHelp(!showHelp);
    } else if (legalSystems.find(s => s.id.toUpperCase() === cmdUpper || s.name.toUpperCase() === cmdUpper)) {
      const system = legalSystems.find(s => s.id.toUpperCase() === cmdUpper || s.name.toUpperCase() === cmdUpper);
      if (system) {
        setSelectedJurisdiction(system.id);
        setActiveFunction(system.id.toUpperCase());
      }
    } else {
      // AI Query
      setIsAiLoading(true);
      try {
        const context = legalSystems.map(s => ({
          name: s.name,
          momentum: s.momentum,
          arbitrage: s.arbitrageOpportunities?.map(a => a.type),
          timing: s.insiderIntel?.marketTiming
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: cmd, context })
        });

        if (res.ok) {
          const data = await res.json();
          setAiResponse(data.response);
        } else {
          setAiResponse(`Command "${cmd}" not recognized. Type HELP for available commands.`);
        }
      } catch {
        setAiResponse('Service temporarily unavailable. Try: HOM, NEWS, MKT, DEAL, HEAT, or jurisdiction codes.');
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(commandLine);
    }
    // F1-F12 shortcuts
    if (e.key === 'F1') { e.preventDefault(); setActiveFunction('HOM'); setActivePanel('news'); }
    if (e.key === 'F2') { e.preventDefault(); setActiveFunction('NEWS'); setActivePanel('news'); }
    if (e.key === 'F3') { e.preventDefault(); setActiveFunction('MKT'); setActivePanel('markets'); }
    if (e.key === 'F4') { e.preventDefault(); setActiveFunction('DEAL'); setActivePanel('deals'); }
    if (e.key === 'F5') { e.preventDefault(); setActiveFunction('HEAT'); setActivePanel('heatmap'); }
    if (e.key === 'F12') { e.preventDefault(); setShowHelp(!showHelp); }
    if (e.key === 'Escape') { e.preventDefault(); window.location.reload(); }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-gray-300 font-mono text-xs overflow-hidden">
      {/* TOP HEADER - Bloomberg Style */}
      <header className="bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#ff8c00] text-black px-2 py-0.5 font-bold">
            <Terminal size={12} />
            <span>LEGAL-INTEL</span>
          </div>
          <div className="text-[#ff8c00] font-bold">{activeFunction}</div>
          <div className="text-[#555] hidden md:block">|</div>
          <div className="hidden md:flex items-center gap-2 text-[10px]">
            <span className="text-[#0f0]">LIVE</span>
            <span className="text-[#888]">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[10px]">
          <TickerMetric label="MOM" value="7.2" change="+0.3" positive />
          <TickerMetric label="DEALS" value="$8.9B" />
          <TickerMetric label="ALERTS" value="3" change="+1" negative />
          <button onClick={() => window.location.reload()} className="text-[#888] hover:text-[#ff8c00] px-2">
            EXIT
          </button>
        </div>
      </header>

      {/* FUNCTION KEYS BAR */}
      <div className="bg-[#1a1a1a] border-b border-[#333] flex items-center text-[10px]">
        {[
          { key: 'F1', label: 'Home', func: 'HOM' },
          { key: 'F2', label: 'News', func: 'NEWS' },
          { key: 'F3', label: 'Markets', func: 'MKT' },
          { key: 'F4', label: 'Deals', func: 'DEAL' },
          { key: 'F5', label: 'HeatMap', func: 'HEAT' },
          { key: 'F6', label: 'Term', func: 'TERM' },
          { key: 'F7', label: 'AI', func: 'AI' },
          { key: 'F12', label: 'Help', func: 'HELP' },
        ].map((f, i) => (
          <button
            key={f.key}
            onClick={() => handleCommand(f.func)}
            className={`flex-1 flex items-center justify-center gap-1 py-1 border-r border-[#333] hover:bg-[#2a2a2a] transition-colors ${
              activeFunction === f.func ? 'bg-[#333] text-[#ff8c00]' : ''
            }`}
          >
            <span className="text-[#888]">{f.key}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - JURISDICTIONS */}
        <div className="w-32 bg-[#1a1a1a] border-r border-[#333] flex flex-col">
          <div className="px-2 py-1 text-[10px] text-[#888] border-b border-[#333] uppercase">
            Jurisdictions
          </div>
          <div className="flex-1 overflow-y-auto">
            {legalSystems.sort((a, b) => b.momentum - a.momentum).map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedJurisdiction(s.id);
                  setActiveFunction(s.id.toUpperCase());
                }}
                className={`w-full text-left px-2 py-1 text-[10px] hover:bg-[#2a2a2a] border-b border-[#333]/50 flex items-center justify-between ${
                  selectedJurisdiction === s.id ? 'bg-[#333] text-[#ff8c00]' : ''
                }`}
              >
                <span>{s.id.toUpperCase()}</span>
                <span className={s.momentum >= 8 ? 'text-[#0f0]' : s.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'}>
                  {s.momentum}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="flex-1 flex flex-col min-w-0 bg-black">
          {/* Panel Header */}
          <div className="bg-[#1a1a1a] border-b border-[#333] px-3 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#ff8c00] font-bold">{activePanel.toUpperCase()}</span>
              <span className="text-[#555]">|</span>
              <span className="text-[10px] text-[#888]">
                {activePanel === 'news' && 'LIVE MARKET NEWS'}
                {activePanel === 'markets' && 'MARKET DATA'}
                {activePanel === 'deals' && 'DEAL FLOW'}
                {activePanel === 'heatmap' && 'MOMENTUM HEATMAP'}
                {activePanel === 'terminal' && 'COMMAND TERMINAL'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#888]">
              <span>REFRESH: 30s</span>
              <Wifi size={10} className="text-[#0f0]" />
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto p-2">
            {activePanel === 'news' && <NewsPanel />}
            {activePanel === 'markets' && <MarketsPanel />}
            {activePanel === 'deals' && <DealsPanel />}
            {activePanel === 'heatmap' && <HeatmapPanel />}
            {activePanel === 'terminal' && (
              <TerminalPanel 
                response={aiResponse} 
                isLoading={isAiLoading}
                commandHistory={commandHistory}
              />
            )}
            {selectedJurisdiction && activePanel !== 'terminal' && (
              <JurisdictionPanel id={selectedJurisdiction} />
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR - QUICK STATS */}
        <div className="w-40 bg-[#1a1a1a] border-l border-[#333] flex flex-col">
          <div className="px-2 py-1 text-[10px] text-[#888] border-b border-[#333] uppercase">
            Top Movers
          </div>
          <div className="flex-1 overflow-y-auto">
            {legalSystems
              .sort((a, b) => b.momentum - a.momentum)
              .slice(0, 6)
              .map((s, i) => (
                <div key={s.id} className="px-2 py-2 border-b border-[#333]/50">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#ff8c00]">{s.id.toUpperCase()}</span>
                    <span className={s.momentum >= 8 ? 'text-[#0f0]' : 'text-[#ff8c00]'}>
                      {s.momentum}/10
                    </span>
                  </div>
                  <div className="text-[9px] text-[#555] mt-0.5 truncate">
                    {s.boomingAreas[0]}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* BOTTOM TICKER */}
      <div className="bg-[#1a1a1a] border-t border-[#333] py-1 overflow-hidden">
        <div className="flex items-center gap-6 text-[10px] animate-marquee whitespace-nowrap">
          {tickerData.flatMap((t, i) => [
            <span key={`sym-${i}`} className="text-[#888] font-bold">{t.symbol}</span>,
            <span key={`mom-${i}`} className={t.momentum >= 8 ? 'text-[#0f0]' : t.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'}>
              M{t.momentum}
            </span>,
            <span key={`deal-${i}`} className="text-[#888]">{t.deals}</span>,
            <span key={`sep-${i}`} className="text-[#333]">|</span>
          ])}
        </div>
      </div>

      {/* COMMAND LINE */}
      <div className="bg-[#1a1a1a] border-t border-[#333] px-2 py-1 flex items-center gap-2">
        <span className="text-[#ff8c00] font-bold">{activeFunction}</span>
        <span className="text-[#0f0]">{ '>' }</span>
        <input
          ref={inputRef}
          type="text"
          value={commandLine}
          onChange={(e) => setCommandLine(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[#fff] font-mono text-xs"
          placeholder="Enter command or jurisdiction code..."
          autoFocus
        />
        <span className="text-[10px] text-[#555] hidden md:inline">F12=Help  ESC=Exit</span>
      </div>

      {/* HELP OVERLAY */}
      {showHelp && (
        <HelpOverlay onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
}

// Panel Components
function NewsPanel() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<Record<number, string>>({});

  const news = [
    { 
      id: 1, time: '10:42', category: 'DEAL', headline: 'Saudi PIF launches $10B infrastructure fund - driving unprecedented legal work across project finance and construction', 
      source: 'Reuters', impact: 'HIGH',
      summary: 'The Public Investment Fund of Saudi Arabia unveils massive infrastructure initiative. International firms scrambling for mandates. Key areas: project finance, construction contracts, regulatory compliance.',
      jurisdictions: ['Saudi Arabia', 'UAE'],
      firms: ['White & Case', 'Latham & Watkins'],
      tags: ['Infrastructure', 'PIF', 'Vision 2030']
    },
    { 
      id: 2, time: '09:15', category: 'TALENT', headline: 'Freshfields announces 20% partner growth in Asia - targeting Singapore, Hong Kong, Tokyo', 
      source: 'Legal Business', impact: 'HIGH',
      summary: 'Expansion focuses on corporate/M&A, private equity, and disputes practices. 18-month timeline with aggressive lateral hiring from competitors.',
      jurisdictions: ['Singapore', 'Hong Kong', 'Japan'],
      firms: ['Freshfields'],
      tags: ['Expansion', 'Lateral Hiring', 'Partners']
    },
    { 
      id: 3, time: '08:30', category: 'REG', headline: 'Singapore releases draft AI Governance Framework for Legal Sector', 
      source: 'ST Legal', impact: 'HIGH',
      summary: 'Comprehensive regulations addressing client confidentiality, algorithmic transparency, and liability allocation between lawyers and AI vendors. Public consultation open.',
      jurisdictions: ['Singapore'],
      firms: [],
      tags: ['AI', 'Regulation', 'Legal Tech']
    },
    { 
      id: 4, time: '07:45', category: 'DEAL', headline: 'Clifford Chance secures Vietnam offshore wind advisory mandate - $3.2B project', 
      source: 'The Lawyer', impact: 'MED',
      summary: 'Lead international counsel for consortium developing Vietnam\'s largest offshore wind project. Complex multi-jurisdictional financing and regulatory challenges.',
      jurisdictions: ['Vietnam', 'Singapore'],
      firms: ['Clifford Chance', 'YKVN'],
      tags: ['Energy', 'Offshore Wind', 'Project Finance']
    },
    { 
      id: 5, time: 'Yesterday', category: 'MARKET', headline: 'Hong Kong IPO pipeline accelerates with 12 new listings planned for Q2', 
      source: 'IFR Asia', impact: 'HIGH',
      summary: 'Chinese tech companies and healthcare firms dominate pipeline. Signals renewed market confidence post-regulatory stabilization.',
      jurisdictions: ['Hong Kong', 'China'],
      firms: ['Multiple'],
      tags: ['Capital Markets', 'IPO', 'Listings']
    },
    { 
      id: 6, time: 'Yesterday', category: 'LIT', headline: 'India IBC resolution timeline delays continue - 65% cases exceed statutory limit', 
      source: 'Economic Times', impact: 'MED',
      summary: 'Some insolvency cases extending beyond 2 years. Creditors and investors demanding legislative reforms for faster resolution.',
      jurisdictions: ['India'],
      firms: [],
      tags: ['Insolvency', 'IBC', 'Bankruptcy', 'Delays']
    },
  ];

  const handleAnalyze = async (item: typeof news[0]) => {
    setAnalyzingId(item.id);
    
    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
      }));

      const prompt = `Analyze this legal market news:
Title: ${item.headline}
Summary: ${item.summary}
Jurisdictions: ${item.jurisdictions.join(', ')}
Category: ${item.category}

Provide strategic implications and recommended actions in 2-3 sentences.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, context })
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(prev => ({ ...prev, [item.id]: data.response }));
      } else {
        setAnalysis(prev => ({ 
          ...prev, 
          [item.id]: `Strategic Insight: ${item.headline} - Monitor ${item.jurisdictions.join('/')} market developments. Impact on ${item.firms?.length ? item.firms.join(', ') : 'market competitors'} significant. Recommend tracking related opportunities.` 
        }));
      }
    } catch {
      setAnalysis(prev => ({ 
        ...prev, 
        [item.id]: 'Analysis: High-impact development. Monitor jurisdiction-specific regulatory changes and competitive positioning.' 
      }));
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-12 gap-2 text-[10px] text-[#888] border-b border-[#333] pb-1 mb-2">
        <span className="col-span-1">TIME</span>
        <span className="col-span-1">CAT</span>
        <span className="col-span-6">HEADLINE</span>
        <span className="col-span-2">SOURCE</span>
        <span className="col-span-1">IMP</span>
        <span className="col-span-1">AI</span>
      </div>
      {news.map((n) => (
        <div key={n.id} className="border-b border-[#333]/30">
          <div 
            onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
            className="grid grid-cols-12 gap-2 text-xs py-1 hover:bg-[#1a1a1a] cursor-pointer items-center"
          >
            <span className="col-span-1 text-[#888]">{n.time}</span>
            <span className={`col-span-1 text-[10px] ${
              n.category === 'DEAL' ? 'text-[#0f0]' :
              n.category === 'TALENT' ? 'text-[#ff8c00]' :
              n.category === 'REG' ? 'text-[#0ff]' :
              n.category === 'LIT' ? 'text-[#f00]' :
              'text-[#f0f]'
            }`}>{n.category}</span>
            <span className="col-span-6 text-[#fff] truncate pr-2" title={n.headline}>{n.headline}</span>
            <span className="col-span-2 text-[#888] text-[10px]">{n.source}</span>
            <span className={`col-span-1 text-[10px] ${n.impact === 'HIGH' ? 'text-[#f00]' : 'text-[#ff8c00]'}`}>{n.impact}</span>
            <span className="col-span-1 text-[#555]">{expandedId === n.id ? '▼' : '▶'}</span>
          </div>
          
          {expandedId === n.id && (
            <div className="px-2 py-2 bg-[#1a1a1a] border-t border-[#333]/30">
              <p className="text-[#aaa] text-xs leading-relaxed mb-2">{n.summary}</p>
              <div className="flex items-center gap-3 text-[10px] text-[#888] mb-2">
                <span className="text-[#0ff]">{n.jurisdictions.join(', ')}</span>
                {n.firms?.length > 0 && <span>{n.firms.join(' • ')}</span>}
                <span className="text-[#ff8c00]">#{n.tags.join(' #')}</span>
              </div>
              
              {analysis[n.id] ? (
                <div className="mt-2 p-2 bg-[#222] border-l-2 border-[#ff8c00]">
                  <div className="text-[10px] text-[#ff8c00] mb-1">AI ANALYSIS</div>
                  <p className="text-[#ccc] text-xs">{analysis[n.id]}</p>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); handleAnalyze(n); }}
                  disabled={analyzingId === n.id}
                  className="mt-2 flex items-center gap-1 text-[10px] text-[#ff8c00] hover:text-[#fff] disabled:opacity-50"
                >
                  {analyzingId === n.id ? (
                    <RefreshCw size={10} className="animate-spin" />
                  ) : (
                    <Brain size={10} />
                  )}
                  {analyzingId === n.id ? 'Analyzing...' : 'AI Analysis'}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MarketsPanel() {
  const markets = [
    { symbol: 'HSI', name: 'Hang Seng', price: '17,234.56', change: '+1.2%', status: 'OPEN' },
    { symbol: 'N225', name: 'Nikkei 225', price: '38,456.78', change: '-0.5%', status: 'OPEN' },
    { symbol: 'STI', name: 'Straits Times', price: '3,245.67', change: '+0.8%', status: 'OPEN' },
    { symbol: 'KOSPI', name: 'KOSPI', price: '2,678.90', change: '+0.3%', status: 'OPEN' },
    { symbol: 'USD/SGD', name: 'USD/SGD', price: '1.3456', change: '-0.1%', status: '24H' },
    { symbol: 'USD/JPY', name: 'USD/JPY', price: '148.23', change: '+0.4%', status: '24H' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {markets.map((m, i) => (
        <div key={i} className="bg-[#1a1a1a] border border-[#333] p-2">
          <div className="flex items-center justify-between text-[10px] text-[#888] mb-1">
            <span>{m.symbol}</span>
            <span className={m.status === 'OPEN' ? 'text-[#0f0]' : 'text-[#ff8c00]'}>{m.status}</span>
          </div>
          <div className="text-lg font-mono text-[#fff]">{m.price}</div>
          <div className={`text-xs ${m.change.startsWith('+') ? 'text-[#0f0]' : 'text-[#f00]'}`}>
            {m.change.startsWith('+') ? '▲' : '▼'} {m.change}
          </div>
        </div>
      ))}
    </div>
  );
}

function DealsPanel() {
  const deals = [
    { value: '$4.2B', type: 'M&A', jurisdiction: 'SG/ID', status: 'ANN', time: '12m' },
    { value: '$850M', type: 'PE', jurisdiction: 'IN', status: 'CLOS', time: '45m' },
    { value: '$1.2B', type: 'IPO', jurisdiction: 'HK', status: 'ANN', time: '1h' },
    { value: '$2.1B', type: 'PF', jurisdiction: 'VN', status: 'COMP', time: '3h' },
    { value: '$600M', type: 'DEBT', jurisdiction: 'AE/SA', status: 'CLOS', time: '4h' },
  ];

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-6 gap-2 text-[10px] text-[#888] border-b border-[#333] pb-1 mb-2">
        <span>VALUE</span>
        <span>TYPE</span>
        <span>JURISDICTION</span>
        <span>STATUS</span>
        <span>TIME</span>
        <span>FIRMS</span>
      </div>
      {deals.map((d, i) => (
        <div key={i} className="grid grid-cols-6 gap-2 text-xs py-2 border-b border-[#333]/30 hover:bg-[#1a1a1a]">
          <span className="text-[#ff8c00] font-bold">{d.value}</span>
          <span className="text-[#fff]">{d.type}</span>
          <span className="text-[#888]">{d.jurisdiction}</span>
          <span className={`${
            d.status === 'ANN' ? 'text-[#0ff]' :
            d.status === 'CLOS' ? 'text-[#ff8c00]' :
            'text-[#0f0]'
          }`}>{d.status}</span>
          <span className="text-[#888]">{d.time}</span>
          <span className="text-[#555] text-[10px]">View →</span>
        </div>
      ))}
    </div>
  );
}

function HeatmapPanel() {
  const sorted = [...legalSystems].sort((a, b) => b.momentum - a.momentum);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {sorted.map(s => {
          const intensity = s.momentum / 10;
          return (
            <div 
              key={s.id} 
              className="p-3 border border-[#333] cursor-pointer hover:border-[#ff8c00] transition-colors"
              style={{ 
                backgroundColor: `rgba(${s.momentum >= 8 ? '0, 255, 0' : s.momentum >= 6 ? '255, 140, 0' : '255, 0, 0'}, ${intensity * 0.3})`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#888]">{s.id.toUpperCase()}</span>
                <span className={`text-lg font-bold ${
                  s.momentum >= 8 ? 'text-[#0f0]' : s.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'
                }`}>{s.momentum}</span>
              </div>
              <div className="text-[10px] text-[#888] mt-1 truncate">{s.boomingAreas[0]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TerminalPanel({ response, isLoading, commandHistory }: { response: string | null, isLoading: boolean, commandHistory: string[] }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
        {commandHistory.length === 0 && !response && (
          <div className="text-[#888]">
            <div className="text-[#ff8c00] mb-2">Welcome to Legal Intelligence Terminal v5.0</div>
            <div>Available commands:</div>
            <div className="ml-4 text-[#888]">
              <div>HOM, NEWS, MKT, DEAL, HEAT, TERM</div>
              <div>Or type any jurisdiction code (e.g., SG, HK, JP)</div>
              <div>Type HELP for full command list</div>
            </div>
          </div>
        )}
        {commandHistory.map((cmd, i) => (
          <div key={i} className="text-[#ff8c00]">{'> '}{cmd}</div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-[#0f0]">
            <div className="w-2 h-2 bg-[#0f0] animate-pulse rounded-full" />
            <span>Processing...</span>
          </div>
        )}
        {response && (
          <div className="text-[#fff]">
            <MarkdownText text={response} size="xs" />
          </div>
        )}
      </div>
    </div>
  );
}

function JurisdictionPanel({ id }: { id: string }) {
  const system = legalSystems.find(s => s.id === id);
  if (!system) return null;

  return (
    <div className="space-y-4">
      <div className="bg-[#1a1a1a] border border-[#333] p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ background: system.color }} />
          <span className="text-[#ff8c00] font-bold text-lg">{system.name.toUpperCase()}</span>
          <span className={`ml-auto text-lg font-bold ${
            system.momentum >= 8 ? 'text-[#0f0]' : system.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'
          }`}>{system.momentum}/10</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[#888]">Type: </span>
            <span className="text-[#fff]">{system.type}</span>
          </div>
          <div>
            <span className="text-[#888]">Region: </span>
            <span className="text-[#fff]">{system.region}</span>
          </div>
          <div>
            <span className="text-[#888]">Deals: </span>
            <span className="text-[#fff]">{system.dealFlow?.annualDealValue || 'N/A'}</span>
          </div>
          <div>
            <span className="text-[#888]">Growth: </span>
            <span className="text-[#0f0]">{system.partnerIntel?.partnerGrowth || 'N/A'}</span>
          </div>
        </div>
      </div>

      {system.arbitrageOpportunities && (
        <div>
          <div className="text-[#ff8c00] text-xs font-bold mb-2">ARBITRAGE OPPORTUNITIES</div>
          <div className="space-y-1">
            {system.arbitrageOpportunities.map((arb, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-[#333] p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#fff]">{arb.type}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    arb.riskLevel === 'Low' ? 'bg-[#0f0]/20 text-[#0f0]' :
                    arb.riskLevel === 'Medium' ? 'bg-[#ff8c00]/20 text-[#ff8c00]' :
                    'bg-[#f00]/20 text-[#f00]'
                  }`}>{arb.riskLevel}</span>
                </div>
                <div className="text-[#888] text-[10px] mt-1">{arb.expectedReturn}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-[#333] rounded max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between p-3 border-b border-[#333]">
          <span className="text-[#ff8c00] font-bold">COMMAND REFERENCE</span>
          <button onClick={onClose} className="text-[#888] hover:text-[#fff]">✕</button>
        </div>
        <div className="p-4 text-xs space-y-4">
          <div>
            <div className="text-[#ff8c00] font-bold mb-2">FUNCTION KEYS</div>
            <div className="grid grid-cols-2 gap-2 text-[#888]">
              <div><span className="text-[#fff]">F1</span> - Home/Dashboard</div>
              <div><span className="text-[#fff]">F2</span> - News Feed</div>
              <div><span className="text-[#fff]">F3</span> - Markets</div>
              <div><span className="text-[#fff]">F4</span> - Deal Flow</div>
              <div><span className="text-[#fff]">F5</span> - Heatmap</div>
              <div><span className="text-[#fff]">F6</span> - Terminal</div>
              <div><span className="text-[#fff]">F12</span> - This Help</div>
              <div><span className="text-[#fff]">ESC</span> - Exit Terminal</div>
            </div>
          </div>
          <div>
            <div className="text-[#ff8c00] font-bold mb-2">COMMANDS</div>
            <div className="grid grid-cols-2 gap-2 text-[#888]">
              <div><span className="text-[#fff]">HOM</span> - Go to home</div>
              <div><span className="text-[#fff]">NEWS</span> - Market news</div>
              <div><span className="text-[#fff]">MKT</span> - Market data</div>
              <div><span className="text-[#fff]">DEAL</span> - Deal flow</div>
              <div><span className="text-[#fff]">HEAT</span> - Momentum map</div>
              <div><span className="text-[#fff]">[CODE]</span> - Jurisdiction (e.g., SG, HK)</div>
            </div>
          </div>
          <div>
            <div className="text-[#ff8c00] font-bold mb-2">JURISDICTION CODES</div>
            <div className="grid grid-cols-4 gap-2 text-[#888] text-[10px]">
              {legalSystems.map(s => (
                <div key={s.id}><span className="text-[#fff]">{s.id.toUpperCase()}</span> - {s.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TickerMetric({ label, value, change, positive, negative }: { label: string, value: string, change?: string, positive?: boolean, negative?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[#888]">{label}:</span>
      <span className="text-[#fff] font-bold">{value}</span>
      {change && (
        <span className={positive ? 'text-[#0f0]' : negative ? 'text-[#f00]' : 'text-[#888]'}>
          {change}
        </span>
      )}
    </div>
  );
}
