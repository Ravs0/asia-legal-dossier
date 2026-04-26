import { useState, useEffect, useRef, useCallback } from 'react';
import { legalSystems } from '../data/dossierData';
import { 
  Terminal, TrendingUp, TrendingDown, Activity, Globe, 
  Clock, Zap, AlertCircle, Newspaper, RefreshCw, BarChart3,
  PieChart, Search, ArrowRight, ChevronRight, Wifi, WifiOff,
  DollarSign, Users, Briefcase, MapPin, Sun, Moon,
  Command, Cpu, Hash, Info, ExternalLink, Filter, Download,
  Maximize2, Minimize2, Settings, Bell, BellOff
} from 'lucide-react';

// Free API endpoints (no key required or demo keys)
const APIS = {
  news: 'https://gnews.io/api/v4/search?q=legal+law+asia&max=5&token=YOUR_TOKEN', // User will need to add their free key
  worldTime: 'http://worldtimeapi.org/api/timezone',
  exchangeRate: 'https://api.exchangerate-api.com/v4/latest/USD',
  ipGeolocation: 'https://ipapi.co/json/',
  randomQuote: 'https://api.quotable.io/random',
};

const generateMockAlerts = (): AlertItem[] => [
  { id: '1', time: '10:42', severity: 'critical', category: 'Regulation', message: 'Saudi Arabia: Saudization pressure intensifying', source: 'MOJ', acknowledged: false },
  { id: '2', time: '09:15', severity: 'warning', category: 'Talent', message: 'Singapore: Mid-senior talent shortage acute', source: 'Recruiters', acknowledged: false },
  { id: '3', time: '08:30', severity: 'critical', category: 'Competition', message: 'Hong Kong: PRC firms aggressively poaching', source: 'Industry', acknowledged: false },
];

interface LiveData {
  news: NewsItem[];
  markets: MarketData[];
  clocks: ClockData[];
  alerts: AlertItem[];
  deals: DealItem[];
  isConnected: boolean;
  lastUpdate: Date;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: 'legal' | 'market' | 'deal' | 'talent';
  impact: 'high' | 'medium' | 'low';
  url?: string;
}

interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
  region: string;
}

interface ClockData {
  city: string;
  timezone: string;
  time: string;
  isMarketOpen: boolean;
  offset: number;
}

interface AlertItem {
  id: string;
  time: string;
  severity: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  source: string;
  acknowledged: boolean;
}

interface DealItem {
  id: string;
  value: string;
  type: string;
  jurisdictions: string[];
  firms: string[];
  status: 'announced' | 'closing' | 'completed';
  time: string;
}

interface TerminalCommand {
  id: string;
  input: string;
  output: React.ReactNode;
  timestamp: Date;
  type: 'command' | 'response' | 'error' | 'system' | 'live';
}

export function LiveTerminal() {
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState<LiveData>({
    news: [],
    markets: [],
    clocks: [],
    alerts: [],
    deals: [],
    isConnected: true,
    lastUpdate: new Date()
  });
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commands]);

  // Initialize with welcome
  useEffect(() => {
    addSystemMessage('welcome', `╔════════════════════════════════════════════════════════════════╗
║     LEGAL INTELLIGENCE TERMINAL v4.1 - LIVE MARKET DATA      ║
║           Real-time Asia-Pacific Legal Markets                ║
╚════════════════════════════════════════════════════════════════╝`);
    
    addSystemMessage('info', 'Initializing live data feeds...');
    initializeLiveData();
    
    // Show quick help
    setTimeout(() => {
      addSystemMessage('tip', 'Type "help" for commands. Try "live" for real-time dashboard, "news" for latest updates, or ask AI anything.');
    }, 500);
  }, []);

  // Live data refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      refreshLiveData();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const addCommand = (input: string, output: React.ReactNode, type: TerminalCommand['type'] = 'response') => {
    setCommands(prev => [...prev, {
      id: Date.now().toString(),
      input,
      output,
      timestamp: new Date(),
      type
    }]);
  };

  const addSystemMessage = (subtype: string, message: string) => {
    setCommands(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      input: '',
      output: <SystemMessage type={subtype} message={message} />,
      timestamp: new Date(),
      type: 'system'
    }]);
  };

  const initializeLiveData = async () => {
    setLiveData(prev => ({ ...prev, isConnected: true }));
    
    // Simulate fetching initial data
    await Promise.all([
      fetchMockNews(),
      fetchMockMarkets(),
      fetchMockClocks(),
      fetchMockAlerts(),
      fetchMockDeals()
    ]);

    addSystemMessage('success', '✓ Live data feeds connected');
  };

  const refreshLiveData = async () => {
    if (!liveData.isConnected) return;
    
    setLiveData(prev => ({ ...prev, lastUpdate: new Date() }));
    
    // Simulate new data coming in
    if (Math.random() > 0.7) {
      const newAlert = generateRandomAlert();
      setLiveData(prev => ({
        ...prev,
        alerts: [newAlert, ...prev.alerts].slice(0, 20)
      }));
      
      if (notifications && newAlert.severity === 'critical') {
        addSystemMessage('alert', `🚨 NEW ALERT: ${newAlert.message.substring(0, 60)}...`);
      }
    }
  };

  const handleCommand = async (cmd: string) => {
    const cmdLower = cmd.toLowerCase().trim();
    
    // Add command to history
    addCommand(cmd, null, 'command');
    setInput('');

    if (cmdLower === 'help' || cmdLower === '?') {
      showHelp();
    } else if (cmdLower === 'live' || cmdLower === 'dashboard') {
      showLiveDashboard();
    } else if (cmdLower === 'news') {
      showNewsFeed();
    } else if (cmdLower === 'markets' || cmdLower === 'mkt') {
      showMarkets();
    } else if (cmdLower === 'deals' || cmdLower === 'flow') {
      showDealFlow();
    } else if (cmdLower === 'alerts' || cmdLower === 'watch') {
      showAlerts();
    } else if (cmdLower === 'clocks' || cmdLower === 'time') {
      showWorldClocks();
    } else if (cmdLower === 'momentum' || cmdLower === 'mom') {
      showMomentumVisualizer();
    } else if (cmdLower === 'compare') {
      showComparisonTool();
    } else if (cmdLower === 'refresh' || cmdLower === 'r') {
      await refreshLiveData();
      addCommand('', '✓ Data refreshed', 'response');
    } else if (cmdLower === 'connect' || cmdLower === 'reconnect') {
      await initializeLiveData();
    } else if (cmdLower === 'disconnect') {
      setLiveData(prev => ({ ...prev, isConnected: false }));
      addCommand('', 'Disconnected from live feeds', 'response');
    } else if (cmdLower === 'notifications on') {
      setNotifications(true);
      addCommand('', 'Notifications enabled', 'response');
    } else if (cmdLower === 'notifications off') {
      setNotifications(false);
      addCommand('', 'Notifications disabled', 'response');
    } else if (cmdLower === 'clear' || cmdLower === 'cls') {
      setCommands([]);
      addSystemMessage('info', 'Terminal cleared');
    } else if (cmdLower.startsWith('search ') || cmdLower.startsWith('s ')) {
      const query = cmdLower.startsWith('s ') ? cmd.substring(2) : cmd.substring(7);
      await aiSearch(query);
    } else if (cmdLower.startsWith('filter ')) {
      const filter = cmdLower.substring(7);
      handleFilter(filter);
    } else if (legalSystems.find(s => s.id === cmdLower)) {
      showJurisdictionDeepDive(cmdLower);
    } else if (cmdLower === '') {
      // Empty
    } else {
      // Try AI interpretation
      await aiSearch(cmd);
    }
  };

  const showHelp = () => {
    addCommand('', (
      <div className="space-y-1 text-xs font-mono">
        <div className="text-terminal-amber font-bold mb-2">LIVE DATA COMMANDS</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
          <span className="text-terminal-green">live, dashboard</span>
          <span className="text-terminal-textDim">Real-time market dashboard</span>
          <span className="text-terminal-green">news</span>
          <span className="text-terminal-textDim">Latest legal market news</span>
          <span className="text-terminal-green">markets, mkt</span>
          <span className="text-terminal-textDim">Market indices & FX rates</span>
          <span className="text-terminal-green">deals, flow</span>
          <span className="text-terminal-textDim">Live deal flow tracker</span>
          <span className="text-terminal-green">alerts, watch</span>
          <span className="text-terminal-textDim">Market alerts & warnings</span>
          <span className="text-terminal-green">clocks, time</span>
          <span className="text-terminal-textDim">World clocks for markets</span>
          <span className="text-terminal-green">momentum, mom</span>
          <span className="text-terminal-textDim">Momentum visualizer</span>
          <span className="text-terminal-green">compare</span>
          <span className="text-terminal-textDim">Jurisdiction comparison</span>
          <span className="text-terminal-green">refresh, r</span>
          <span className="text-terminal-textDim">Refresh live data</span>
          <span className="text-terminal-green">connect/disconnect</span>
          <span className="text-terminal-textDim">Toggle live feeds</span>
        </div>
        <div className="text-terminal-amber font-bold mt-3 mb-1">AI & SEARCH</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
          <span className="text-terminal-green">search [query]</span>
          <span className="text-terminal-textDim">DeepSeek AI search</span>
          <span className="text-terminal-green">filter [criteria]</span>
          <span className="text-terminal-textDim">Filter jurisdictions</span>
          <span className="text-terminal-green">[country name]</span>
          <span className="text-terminal-textDim">Jurisdiction deep-dive</span>
        </div>
        <div className="text-terminal-amber font-bold mt-3 mb-1">SYSTEM</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
          <span className="text-terminal-green">notifications on/off</span>
          <span className="text-terminal-textDim">Toggle alerts</span>
          <span className="text-terminal-green">clear, cls</span>
          <span className="text-terminal-textDim">Clear terminal</span>
          <span className="text-terminal-green">help, ?</span>
          <span className="text-terminal-textDim">Show this help</span>
        </div>
      </div>
    ), 'response');
  };

  const showLiveDashboard = () => {
    addCommand('', (
      <LiveDashboard 
        data={liveData} 
        legalSystems={legalSystems}
        onAlertClick={(alert) => addSystemMessage('info', `Alert: ${alert.message}`)}
      />
    ), 'live');
  };

  const showNewsFeed = () => {
    const mockNews: NewsItem[] = [
      { id: '1', title: 'Freshfields announces 20% partner growth in Asia', source: 'Legal Business', time: '2m ago', category: 'talent', impact: 'high' },
      { id: '2', title: 'Saudi PIF launches $10B infrastructure fund', source: 'Reuters', time: '15m ago', category: 'deal', impact: 'high' },
      { id: '3', title: 'New AI regulations draft released in Singapore', source: 'ST Legal', time: '32m ago', category: 'legal', impact: 'medium' },
      { id: '4', title: 'Clifford Chance wins Vietnam offshore wind mandate', source: 'The Lawyer', time: '1h ago', category: 'deal', impact: 'medium' },
      { id: '5', title: 'Hong Kong IPO pipeline accelerates', source: 'IFR Asia', time: '2h ago', category: 'market', impact: 'high' },
    ];

    addCommand('', (
      <div className="border border-terminal-border rounded overflow-hidden">
        <div className="bg-terminal-panel px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-terminal-amber">
            <Newspaper size={12} />
            <span className="text-xs font-bold">LIVE NEWS FEED</span>
          </div>
          <span className="text-[10px] text-terminal-textDim">Auto-refresh: ON</span>
        </div>
        <div className="divide-y divide-terminal-border">
          {mockNews.map(news => (
            <div key={news.id} className="p-3 hover:bg-terminal-panelHover/50 cursor-pointer group">
              <div className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  news.impact === 'high' ? 'bg-terminal-red animate-pulse' :
                  news.impact === 'medium' ? 'bg-terminal-amber' : 'bg-terminal-green'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-terminal-text leading-snug group-hover:text-terminal-amber transition-colors">
                    {news.title}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-terminal-textDim">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase ${
                      news.category === 'deal' ? 'bg-terminal-green/20 text-terminal-green' :
                      news.category === 'talent' ? 'bg-terminal-amber/20 text-terminal-amber' :
                      'bg-terminal-info/20 text-terminal-info'
                    }`}>
                      {news.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ), 'live');
  };

  const showMarkets = () => {
    const mockMarkets: MarketData[] = [
      { symbol: 'HSI', name: 'Hang Seng', price: '17,234.56', change: '+1.2%', positive: true, region: 'Hong Kong' },
      { symbol: 'N225', name: 'Nikkei 225', price: '38,456.78', change: '-0.5%', positive: false, region: 'Japan' },
      { symbol: 'STI', name: 'Straits Times', price: '3,245.67', change: '+0.8%', positive: true, region: 'Singapore' },
      { symbol: 'Kospi', name: 'KOSPI', price: '2,678.90', change: '+0.3%', positive: true, region: 'South Korea' },
      { symbol: 'USD/SGD', name: 'USD/SGD', price: '1.3456', change: '-0.1%', positive: false, region: 'FX' },
      { symbol: 'USD/JPY', name: 'USD/JPY', price: '148.23', change: '+0.4%', positive: true, region: 'FX' },
    ];

    addCommand('', (
      <div className="border border-terminal-border rounded overflow-hidden">
        <div className="bg-terminal-panel px-3 py-2 flex items-center gap-2 text-terminal-amber">
          <BarChart3 size={12} />
          <span className="text-xs font-bold">MARKET INDICES & FX</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-terminal-border">
          {mockMarkets.map(m => (
            <div key={m.symbol} className="bg-terminal-bg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-terminal-text">{m.symbol}</span>
                <span className="text-[10px] text-terminal-textDim">{m.region}</span>
              </div>
              <div className="text-lg font-mono text-terminal-text">{m.price}</div>
              <div className={`text-xs ${m.positive ? 'text-terminal-green' : 'text-terminal-red'}`}>
                {m.positive ? '▲' : '▼'} {m.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    ), 'live');
  };

  const showDealFlow = () => {
    const mockDeals: DealItem[] = [
      { id: '1', value: '$4.2B', type: 'M&A', jurisdictions: ['Singapore', 'Indonesia'], firms: ['Kirkland', 'Rajah & Tann'], status: 'announced', time: '12m ago' },
      { id: '2', value: '$850M', type: 'PE Investment', jurisdictions: ['India'], firms: ['Cyril Amarchand', 'Trilegal'], status: 'closing', time: '45m ago' },
      { id: '3', value: '$1.2B', type: 'IPO', jurisdictions: ['Hong Kong'], firms: ['Clifford Chance', 'Skadden'], status: 'announced', time: '1h ago' },
      { id: '4', value: '$2.1B', type: 'Project Finance', jurisdictions: ['Vietnam'], firms: ['Allen & Overy', 'Baker McKenzie'], status: 'completed', time: '3h ago' },
      { id: '5', value: '$600M', type: 'Debt', jurisdictions: ['UAE', 'Saudi'], firms: ['White & Case', 'Latham'], status: 'closing', time: '4h ago' },
    ];

    addCommand('', (
      <div className="border border-terminal-border rounded overflow-hidden">
        <div className="bg-terminal-panel px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-terminal-amber">
            <Zap size={12} />
            <span className="text-xs font-bold">LIVE DEAL FLOW</span>
          </div>
          <span className="text-lg font-bold text-terminal-green">$8.9B</span>
        </div>
        <div className="divide-y divide-terminal-border">
          {mockDeals.map(deal => (
            <div key={deal.id} className="p-3 hover:bg-terminal-panelHover/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-terminal-amber">{deal.value}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  deal.status === 'announced' ? 'bg-terminal-info/20 text-terminal-info' :
                  deal.status === 'closing' ? 'bg-terminal-amber/20 text-terminal-amber' :
                  'bg-terminal-green/20 text-terminal-green'
                }`}>
                  {deal.status.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-terminal-text mb-1">{deal.type}</div>
              <div className="flex items-center gap-2 text-[10px] text-terminal-textDim">
                <Globe size={10} />
                {deal.jurisdictions.join(' • ')}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-terminal-textDim mt-1">
                <Briefcase size={10} />
                {deal.firms.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    ), 'live');
  };

  const showAlerts = () => {
    addCommand('', (
      <LiveAlertsPanel 
        alerts={liveData.alerts.length > 0 ? liveData.alerts : generateMockAlerts()}
        onAcknowledge={(id) => {
          setLiveData(prev => ({
            ...prev,
            alerts: prev.alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a)
          }));
        }}
      />
    ), 'live');
  };

  const showWorldClocks = () => {
    const cities = [
      { city: 'Singapore', tz: 'Asia/Singapore', offset: 0 },
      { city: 'Hong Kong', tz: 'Asia/Hong_Kong', offset: 0 },
      { city: 'Tokyo', tz: 'Asia/Tokyo', offset: 1 },
      { city: 'London', tz: 'Europe/London', offset: -7 },
      { city: 'New York', tz: 'America/New_York', offset: -12 },
      { city: 'Dubai', tz: 'Asia/Dubai', offset: -4 },
    ];

    addCommand('', (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {cities.map(city => {
          const now = new Date();
          const cityTime = new Date(now.getTime() + city.offset * 3600000);
          const hours = cityTime.getHours();
          const isMarketOpen = hours >= 9 && hours < 17;
          
          return (
            <div key={city.city} className="border border-terminal-border rounded p-3 bg-terminal-panel">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-terminal-text">{city.city}</span>
                <span className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-terminal-green animate-pulse' : 'bg-terminal-red'}`} />
              </div>
              <div className="text-xl font-mono text-terminal-amber">
                {cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
              <div className="text-[10px] text-terminal-textDim mt-1">
                {isMarketOpen ? 'Market Open' : 'Market Closed'}
              </div>
            </div>
          );
        })}
      </div>
    ), 'live');
  };

  const showMomentumVisualizer = () => {
    addCommand('', (
      <div className="border border-terminal-border rounded overflow-hidden">
        <div className="bg-terminal-panel px-3 py-2 text-terminal-amber text-xs font-bold">
          MOMENTUM VISUALIZER - LIVE
        </div>
        <div className="p-4 space-y-3">
          {[...legalSystems].sort((a, b) => b.momentum - a.momentum).map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="text-terminal-amber w-6 text-xs">#{i + 1}</span>
              <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
              <span className="text-xs text-terminal-text w-24">{s.name}</span>
              <div className="flex-1 h-4 bg-terminal-border rounded overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000"
                  style={{ 
                    width: `${s.momentum * 10}%`,
                    background: s.momentum >= 8 ? '#00ff88' : s.momentum >= 6 ? '#ff8c00' : '#ff3366'
                  }}
                />
              </div>
              <span className={`text-xs font-bold w-8 ${
                s.momentum >= 8 ? 'text-terminal-green' : s.momentum >= 6 ? 'text-terminal-amber' : 'text-terminal-red'
              }`}>
                {s.momentum}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${
                s.momentum >= 8 ? 'bg-terminal-green/20 text-terminal-green' :
                s.momentum >= 6 ? 'bg-terminal-amber/20 text-terminal-amber' :
                'bg-terminal-red/20 text-terminal-red'
              }`}>
                {s.momentum >= 8 ? 'BUY' : s.momentum >= 6 ? 'HOLD' : 'AVOID'}
              </span>
            </div>
          ))}
        </div>
      </div>
    ), 'live');
  };

  const showComparisonTool = () => {
    addCommand('', (
      <div className="text-terminal-textDim text-sm">
        Usage: compare [jurisdiction] vs [jurisdiction]
        <div className="mt-2 text-xs">
          Example: <span className="text-terminal-amber">compare singapore vs hong-kong</span>
        </div>
        <div className="mt-2 text-xs">
          Available: {legalSystems.map(s => s.id).join(', ')}
        </div>
      </div>
    ), 'response');
  };

  const showJurisdictionDeepDive = (id: string) => {
    const system = legalSystems.find(s => s.id === id);
    if (!system) return;

    addCommand('', (
      <div className="border border-terminal-border rounded overflow-hidden">
        <div 
          className="px-4 py-3 text-lg font-bold"
          style={{ background: `${system.color}20`, color: system.color, borderBottom: `1px solid ${system.color}40` }}
        >
          {system.name.toUpperCase()} INTELLIGENCE
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            <MetricBox label="Momentum" value={`${system.momentum}/10`} color={system.momentum >= 8 ? 'green' : 'amber'} />
            <MetricBox label="Type" value={system.type} />
            <MetricBox label="Region" value={system.region} />
            <MetricBox label="Deal Flow" value={system.dealFlow?.annualDealValue || 'N/A'} />
          </div>
          
          <div className="bg-terminal-panel p-3 rounded text-xs text-terminal-text leading-relaxed">
            {system.description}
          </div>

          {system.insiderIntel && (
            <div className="border border-terminal-border rounded p-3">
              <div className="text-terminal-amber text-xs font-bold mb-2 flex items-center gap-2">
                <TrendingUp size={12} /> MARKET TIMING
              </div>
              <div className="text-xs text-terminal-text">{system.insiderIntel.marketTiming}</div>
            </div>
          )}

          {system.arbitrageOpportunities && (
            <div className="space-y-2">
              <div className="text-terminal-amber text-xs font-bold flex items-center gap-2">
                <Zap size={12} /> ARBITRAGE OPPORTUNITIES
              </div>
              {system.arbitrageOpportunities.map((arb, i) => (
                <div key={i} className="bg-terminal-panel p-2 rounded text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-terminal-text font-bold">{arb.type}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      arb.riskLevel === 'Low' ? 'bg-terminal-green/20 text-terminal-green' :
                      arb.riskLevel === 'Medium' ? 'bg-terminal-amber/20 text-terminal-amber' :
                      'bg-terminal-red/20 text-terminal-red'
                    }`}>{arb.riskLevel}</span>
                  </div>
                  <div className="text-terminal-textDim">{arb.expectedReturn}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ), 'live');
  };

  const aiSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
        timing: s.insiderIntel?.marketTiming,
        growth: s.partnerIntel?.partnerGrowth
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, context })
      });

      if (!res.ok) throw new Error('AI service error');
      
      const data = await res.json();
      
      addCommand('', (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-terminal-amber text-xs">
            <Cpu size={12} />
            <span>DeepSeek AI Analysis</span>
          </div>
          <div className="text-xs text-terminal-text leading-relaxed whitespace-pre-wrap">
            {data.response}
          </div>
          <div className="text-[10px] text-terminal-textDim italic">
            Try: "compare with chart" or "show arbitrage opportunities" for visualizations
          </div>
        </div>
      ), 'response');
    } catch (error) {
      addCommand('', (
        <div className="text-terminal-red text-xs">
          ⚠ AI service temporarily unavailable. Showing relevant data from dossier...
        </div>
      ), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (criteria: string) => {
    const filtered = legalSystems.filter(s => {
      if (criteria.includes('high momentum')) return s.momentum >= 8;
      if (criteria.includes('arbitrage')) return s.arbitrageOpportunities && s.arbitrageOpportunities.length > 0;
      if (criteria.includes('asia')) return s.region.includes('Asia');
      if (criteria.includes('me')) return s.region.includes('Middle East');
      return s.name.toLowerCase().includes(criteria) || s.id.includes(criteria);
    });

    addCommand('', (
      <div className="text-xs">
        <div className="text-terminal-amber mb-2">Filter: "{criteria}"</div>
        <div className="text-terminal-textDim">{filtered.length} results found:</div>
        <div className="mt-2 space-y-1">
          {filtered.map(s => (
            <div key={s.id} className="flex items-center gap-2 text-terminal-text">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span>{s.name}</span>
              <span className="text-terminal-textDim">(M{s.momentum})</span>
            </div>
          ))}
        </div>
      </div>
    ), 'response');
  };

  const generateRandomAlert = (): AlertItem => {
    const alerts = [
      { message: 'Saudi visa restrictions tightening for expat lawyers', severity: 'warning' as const, category: 'Regulation' },
      { message: 'Singapore PE deal volume up 23% QoQ', severity: 'info' as const, category: 'Deals' },
      { message: 'Hong Kong IPO pipeline accelerates', severity: 'info' as const, category: 'Capital Markets' },
      { message: 'India IBC timeline delays reported', severity: 'warning' as const, category: 'Insolvency' },
      { message: 'UAE operating costs up 25% YoY', severity: 'critical' as const, category: 'Costs' },
    ];
    const random = alerts[Math.floor(Math.random() * alerts.length)];
    return {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      severity: random.severity,
      category: random.category,
      message: random.message,
      source: 'Live Feed',
      acknowledged: false
    };
  };

  const fetchMockNews = async () => {};
  const fetchMockMarkets = async () => {};
  const fetchMockClocks = async () => {};
  const fetchMockAlerts = async () => {};
  const fetchMockDeals = async () => {};

  return (
    <div className="h-screen flex flex-col bg-terminal-bg text-terminal-text font-mono text-xs overflow-hidden">
      {/* Status Bar */}
      <div className="bg-terminal-header border-b border-terminal-border px-3 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-terminal-amber" />
            <span className="text-terminal-amber font-bold text-sm">LEGAL-INTEL</span>
            <span className="text-[10px] text-terminal-textDim">v4.1</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px]">
            <span className={`flex items-center gap-1 ${liveData.isConnected ? 'text-terminal-green' : 'text-terminal-red'}`}>
              {liveData.isConnected ? <Wifi size={10} /> : <WifiOff size={10} />}
              {liveData.isConnected ? 'LIVE' : 'OFFLINE'}
            </span>
            <span className="text-terminal-textDim">
              Last update: {liveData.lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] text-terminal-textDim hover:text-terminal-amber px-2 py-1 border border-terminal-border rounded"
          >
            EXIT [Esc]
          </button>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`p-1 rounded ${notifications ? 'text-terminal-amber' : 'text-terminal-textDim'}`}
          >
            {notifications ? <Bell size={12} /> : <BellOff size={12} />}
          </button>
          <button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-[10px] px-2 py-1 rounded ${autoRefresh ? 'bg-terminal-green/20 text-terminal-green' : 'bg-terminal-textDim/20 text-terminal-textDim'}`}
          >
            Auto: {autoRefresh ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Terminal */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {commands.map((cmd) => (
          <div key={cmd.id} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
            {cmd.type === 'command' && (
              <div className="flex items-center gap-2 text-terminal-amber">
                <ChevronRight size={12} />
                <span className="font-bold">{cmd.input}</span>
              </div>
            )}
            {cmd.output && <div className="mt-1">{cmd.output}</div>}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-terminal-amber p-2">
            <RefreshCw size={14} className="animate-spin" />
            <span className="text-xs">Processing...</span>
          </div>
        )}
      </div>

      {/* Command Input */}
      <div className="border-t border-terminal-border bg-terminal-panel p-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-terminal-amber font-bold text-lg">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-terminal-text placeholder-terminal-textDim/50"
            disabled={isLoading}
            autoFocus
          />
          <button 
            onClick={() => handleCommand(input)}
            disabled={isLoading || !input.trim()}
            className="text-terminal-textDim hover:text-terminal-amber disabled:opacity-30"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
          <span className="text-[10px] text-terminal-textDim">Quick:</span>
          {['live', 'news', 'deals', 'momentum', 'alerts', 'singapore', 'help'].map(action => (
            <button
              key={action}
              onClick={() => handleCommand(action)}
              className="text-[10px] px-2 py-1 bg-terminal-panelHover hover:bg-terminal-border rounded text-terminal-textDim hover:text-terminal-text transition-colors whitespace-nowrap"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Live Ticker */}
      <div className="bg-terminal-header border-t border-terminal-border py-1 px-3 overflow-hidden shrink-0">
        <div className="flex items-center gap-6 text-[10px] animate-marquee whitespace-nowrap">
          {legalSystems.flatMap(s => [
            <span key={`${s.id}-1`} className="text-terminal-textDim font-bold">{s.id.toUpperCase()}</span>,
            <span key={`${s.id}-2`} className={s.momentum >= 8 ? 'text-terminal-green' : s.momentum >= 6 ? 'text-terminal-amber' : 'text-terminal-red'}>
              M{s.momentum}
            </span>,
            <span key={`${s.id}-3`} className="text-terminal-textDim">
              {s.dealFlow?.annualDealValue || 'N/A'}
            </span>,
            <span key={`${s.id}-4`} className="text-terminal-border">|</span>
          ])}
        </div>
      </div>
    </div>
  );
}

// Sub-components
function SystemMessage({ type, message }: { type: string; message: string }) {
  const styles = {
    welcome: 'text-terminal-amber font-bold whitespace-pre',
    info: 'text-terminal-textDim',
    success: 'text-terminal-green',
    error: 'text-terminal-red',
    tip: 'text-terminal-info italic text-[10px]',
    alert: 'text-terminal-red font-bold',
  };
  
  return <div className={styles[type as keyof typeof styles] || 'text-terminal-text'}>{message}</div>;
}

function MetricBox({ label, value, color = 'text' }: { label: string; value: string; color?: 'green' | 'amber' | 'text' | 'red' }) {
  const colorClasses = {
    green: 'text-terminal-green',
    amber: 'text-terminal-amber',
    red: 'text-terminal-red',
    text: 'text-terminal-text'
  };
  
  return (
    <div className="bg-terminal-panel p-2 rounded border border-terminal-border">
      <div className="text-[8px] text-terminal-textDim uppercase">{label}</div>
      <div className={`text-sm font-bold ${colorClasses[color]}`}>{value}</div>
    </div>
  );
}

function LiveDashboard({ data, legalSystems, onAlertClick }: { 
  data: LiveData; 
  legalSystems: typeof import('../data/dossierData').legalSystems;
  onAlertClick: (alert: AlertItem) => void;
}) {
  return (
    <div className="border border-terminal-border rounded overflow-hidden bg-terminal-bg">
      <div className="bg-terminal-panel px-3 py-2 border-b border-terminal-border">
        <div className="flex items-center gap-2 text-terminal-amber">
          <Activity size={14} className="animate-pulse" />
          <span className="font-bold text-xs">LIVE MARKET DASHBOARD</span>
        </div>
      </div>
      
      <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-terminal-panel p-3 rounded border border-terminal-border">
          <div className="text-[10px] text-terminal-textDim uppercase">Jurisdictions</div>
          <div className="text-2xl font-bold text-terminal-text">{legalSystems.length}</div>
          <div className="text-[10px] text-terminal-green">+2 YTD</div>
        </div>
        <div className="bg-terminal-panel p-3 rounded border border-terminal-border">
          <div className="text-[10px] text-terminal-textDim uppercase">High Momentum</div>
          <div className="text-2xl font-bold text-terminal-green">
            {legalSystems.filter(s => s.momentum >= 8).length}
          </div>
          <div className="text-[10px] text-terminal-amber">Hot markets</div>
        </div>
        <div className="bg-terminal-panel p-3 rounded border border-terminal-border">
          <div className="text-[10px] text-terminal-textDim uppercase">Active Deals</div>
          <div className="text-2xl font-bold text-terminal-amber">$8.9B</div>
          <div className="text-[10px] text-terminal-green">+12% today</div>
        </div>
        <div className="bg-terminal-panel p-3 rounded border border-terminal-border">
          <div className="text-[10px] text-terminal-textDim uppercase">Alerts</div>
          <div className="text-2xl font-bold text-terminal-red">{data.alerts.filter(a => !a.acknowledged).length}</div>
          <div className="text-[10px] text-terminal-textDim">Unacknowledged</div>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="bg-terminal-panel p-2 rounded border border-terminal-border">
          <div className="text-[10px] text-terminal-amber mb-2 flex items-center gap-2">
            <AlertCircle size={10} /> RECENT ALERTS
          </div>
          <div className="space-y-1">
            {(data.alerts.length > 0 ? data.alerts : generateMockAlerts()).slice(0, 3).map((alert: AlertItem) => (
              <div 
                key={alert.id} 
                onClick={() => onAlertClick(alert)}
                className="flex items-center gap-2 text-xs p-1.5 hover:bg-terminal-bg rounded cursor-pointer"
              >
                <span className={`w-2 h-2 rounded-full ${
                  alert.severity === 'critical' ? 'bg-terminal-red animate-pulse' :
                  alert.severity === 'warning' ? 'bg-terminal-amber' : 'bg-terminal-green'
                }`} />
                <span className="text-terminal-textDim text-[10px]">{alert.time}</span>
                <span className="text-terminal-text truncate">{alert.message.substring(0, 40)}...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveAlertsPanel({ alerts, onAcknowledge }: { alerts: AlertItem[]; onAcknowledge: (id: string) => void }) {
  return (
    <div className="border border-terminal-border rounded overflow-hidden">
      <div className="bg-terminal-panel px-3 py-2 border-b border-terminal-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-terminal-amber">
          <AlertCircle size={12} />
          <span className="font-bold text-xs">MARKET ALERTS</span>
        </div>
        <span className="text-[10px] text-terminal-textDim">{alerts.filter(a => !a.acknowledged).length} new</span>
      </div>
      <div className="divide-y divide-terminal-border max-h-64 overflow-y-auto">
        {alerts.map(alert => (
          <div key={alert.id} className={`p-3 flex items-start gap-3 ${alert.acknowledged ? 'opacity-50' : ''}`}>
            <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
              alert.severity === 'critical' ? 'bg-terminal-red animate-pulse' :
              alert.severity === 'warning' ? 'bg-terminal-amber' : 'bg-terminal-green'
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-terminal-textDim">{alert.time}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  alert.severity === 'critical' ? 'bg-terminal-red/20 text-terminal-red' :
                  alert.severity === 'warning' ? 'bg-terminal-amber/20 text-terminal-amber' :
                  'bg-terminal-green/20 text-terminal-green'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
                <span className="text-[10px] text-terminal-amber">{alert.category}</span>
              </div>
              <div className="text-xs text-terminal-text">{alert.message}</div>
              <div className="text-[10px] text-terminal-textDim mt-1">Source: {alert.source}</div>
            </div>
            {!alert.acknowledged && (
              <button 
                onClick={() => onAcknowledge(alert.id)}
                className="text-[10px] text-terminal-textDim hover:text-terminal-amber px-2 py-1 border border-terminal-border rounded"
              >
                ACK
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
