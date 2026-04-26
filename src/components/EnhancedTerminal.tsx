import { useState, useEffect, useRef, useCallback } from 'react';
import { legalSystems } from '../data/dossierData';
import { 
  Search, Command, ArrowRight, TrendingUp, TrendingDown, 
  Activity, Globe, Briefcase, Users, AlertCircle, Zap,
  Terminal, ChevronRight, X, Maximize2, Minimize2, BarChart3,
  PieChart, LineChart, Hash, Info, Cpu
} from 'lucide-react';

// Types for rich terminal output
interface TerminalOutput {
  id: string;
  type: 'text' | 'chart' | 'table' | 'metric' | 'alert' | 'momentum' | 'arbitrage';
  timestamp: Date;
  content: any;
  source: 'user' | 'system' | 'ai';
}

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[]; color: string }[];
  type: 'bar' | 'line' | 'pie';
}

export function EnhancedTerminal() {
  const [command, setCommand] = useState('');
  const [outputs, setOutputs] = useState<TerminalOutput[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputs]);

  // Initial welcome message
  useEffect(() => {
    addOutput('system', 'text', {
      text: `╔══════════════════════════════════════════════════════════════╗
║     ASIA LEGAL INTELLIGENCE TERMINAL v3.0 - BLOOMBERG STYLE ║
║                    Powered by DeepSeek AI                     ║
╚══════════════════════════════════════════════════════════════╝`,
      style: 'header'
    });
    addOutput('system', 'metric', {
      metrics: [
        { label: 'JURISDICTIONS', value: '13', change: '+2 NEW', positive: true },
        { label: 'AVG MOMENTUM', value: '7.2', change: '+0.3', positive: true },
        { label: 'ACTIVE DEALS', value: '$800B', change: '+12%', positive: true },
        { label: 'LATERAL MOVES', value: '234', change: '+45', positive: true },
      ]
    });
    addOutput('system', 'text', {
      text: 'Type "help" for commands or ask any legal intelligence question.\nUse "viz [type]" for visualizations: bar, line, pie, momentum, arbitrage',
      style: 'info'
    });
  }, []);

  const addOutput = (source: 'user' | 'system' | 'ai', type: TerminalOutput['type'], content: any) => {
    setOutputs(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      type,
      timestamp: new Date(),
      content,
      source
    }]);
  };

  const processCommand = async (cmd: string) => {
    const cmdLower = cmd.toLowerCase().trim();
    
    // Add user input to terminal
    addOutput('user', 'text', { text: `> ${cmd}`, style: 'command' });

    if (cmdLower === 'help' || cmdLower === '?') {
      showHelp();
    } else if (cmdLower === 'clear' || cmdLower === 'cls') {
      setOutputs([]);
      addOutput('system', 'text', { text: 'Terminal cleared. Type "help" for commands.', style: 'info' });
    } else if (cmdLower.startsWith('viz ') || cmdLower.startsWith('visualize ')) {
      const vizType = cmdLower.split(' ')[1];
      handleVisualization(vizType);
    } else if (cmdLower === 'momentum' || cmdLower === 'mom') {
      showMomentumChart();
    } else if (cmdLower === 'arbitrage' || cmdLower === 'arb') {
      showArbitragePanel();
    } else if (cmdLower === 'market' || cmdLower === 'mkt') {
      showMarketOverview();
    } else if (cmdLower === 'talent' || cmdLower === 'tln') {
      showTalentHeatmap();
    } else if (cmdLower.startsWith('compare ')) {
      const countries = cmdLower.replace('compare ', '').split(' vs ').map(s => s.trim());
      showComparison(countries);
    } else if (cmdLower.startsWith('search ') || cmdLower.startsWith('s ')) {
      const query = cmdLower.startsWith('s ') ? cmd.substring(2) : cmd.substring(7);
      await aiSearch(query);
    } else if (cmdLower === 'news' || cmdLower === 'alerts') {
      showNewsAlerts();
    } else if (legalSystems.find(s => s.id === cmdLower)) {
      showJurisdictionDossier(cmdLower);
    } else if (cmdLower === 'exit' || cmdLower === 'quit') {
      addOutput('system', 'text', { text: 'Use browser back button or click Dashboard/Map to exit terminal mode.', style: 'warning' });
    } else if (cmdLower === '') {
      // Empty command
    } else {
      // Unknown command - treat as AI query
      await aiSearch(cmd);
    }
    
    setCommand('');
  };

  const showHelp = () => {
    addOutput('system', 'text', {
      text: `COMMANDS:
  DATA & ANALYTICS
    market/mkt              Market overview with metrics
    momentum/mom            Momentum rankings visualization  
    arbitrage/arb           Arbitrage opportunities panel
    talent/tln              Talent market heatmap
    viz [type]              Visualize: bar, line, pie, momentum
    compare [a] vs [b]      Compare jurisdictions
    
  AI & SEARCH
    search [query]          DeepSeek AI-powered search
    [any question]          Direct AI query
    
  NAVIGATION  
    [country]               View jurisdiction (e.g., singapore)
    news/alerts             Latest alerts and updates
    clear/cls               Clear terminal
    help/?                  Show this help`,
      style: 'command-list'
    });
  };

  const handleVisualization = (type: string) => {
    switch(type) {
      case 'momentum':
      case 'mom':
        showMomentumChart();
        break;
      case 'arbitrage':
      case 'arb':
        showArbitragePanel();
        break;
      case 'bar':
        showBarChart();
        break;
      case 'pie':
        showPieChart();
        break;
      case 'line':
        showLineChart();
        break;
      default:
        addOutput('system', 'text', { 
          text: `Unknown visualization type: ${type}\nAvailable: bar, line, pie, momentum, arbitrage`, 
          style: 'error' 
        });
    }
  };

  const showMomentumChart = () => {
    const sorted = [...legalSystems].sort((a, b) => b.momentum - a.momentum);
    addOutput('system', 'momentum', {
      title: 'MOMENTUM RANKINGS',
      jurisdictions: sorted.map(s => ({
        id: s.id,
        name: s.name,
        momentum: s.momentum,
        color: s.color,
        trend: s.momentum >= 8 ? 'STRONG BUY' : s.momentum >= 6 ? 'HOLD' : 'WEAK'
      }))
    });
  };

  const showArbitragePanel = () => {
    const arbs = legalSystems.flatMap(s => 
      (s.arbitrageOpportunities || []).map(a => ({ 
        ...a, 
        jurisdiction: s.name, 
        color: s.color,
        momentum: s.momentum 
      }))
    ).sort((a, b) => b.momentum - a.momentum);

    addOutput('system', 'arbitrage', {
      title: 'ARBITRAGE OPPORTUNITIES',
      opportunities: arbs.slice(0, 6)
    });
  };

  const showMarketOverview = () => {
    const metrics = [
      { label: 'TOTAL JURISDICTIONS', value: legalSystems.length.toString() },
      { label: 'HIGH MOMENTUM (>8)', value: legalSystems.filter(s => s.momentum >= 8).length.toString() },
      { label: 'AVG MOMENTUM', value: (legalSystems.reduce((a, s) => a + s.momentum, 0) / legalSystems.length).toFixed(1) },
      { label: 'ACTIVE MARKETS', value: '7' },
    ];

    addOutput('system', 'metric', { metrics });

    // Add jurisdiction table
    addOutput('system', 'table', {
      headers: ['JURISDICTION', 'MOM', 'DEAL FLOW', 'TOP SECTOR', 'GROWTH'],
      rows: legalSystems
        .sort((a, b) => b.momentum - a.momentum)
        .map(s => [
          s.name.toUpperCase(),
          `${s.momentum}/10`,
          s.dealFlow?.annualDealValue || 'N/A',
          s.boomingAreas[0]?.substring(0, 20) || 'N/A',
          s.partnerIntel?.partnerGrowth || 'N/A'
        ])
    });
  };

  const showTalentHeatmap = () => {
    addOutput('system', 'text', {
      text: `TALENT MARKET INTELLIGENCE - HEATMAP

${legalSystems.filter(s => s.partnerIntel).map(s => {
  const growth = parseInt(s.partnerIntel!.partnerGrowth.replace(/[^0-9-]/g, '')) || 0;
  const heat = growth > 15 ? '🔥🔥🔥' : growth > 10 ? '🔥🔥' : growth > 5 ? '🔥' : '❄️';
  return `${heat} ${s.name.padEnd(15)} ${s.partnerIntel!.partnerGrowth.padStart(8)} | ${s.partnerIntel!.totalPartners} partners`;
}).join('\n')}`,
      style: 'heatmap'
    });
  };

  const showComparison = (countries: string[]) => {
    if (countries.length < 2) {
      addOutput('system', 'text', { text: 'Usage: compare singapore vs hong kong', style: 'error' });
      return;
    }

    const systems = countries.map(c => legalSystems.find(s => s.id === c || s.name.toLowerCase() === c)).filter(Boolean);
    
    if (systems.length < 2) {
      addOutput('system', 'text', { text: 'Could not find both jurisdictions. Use IDs like "singapore" or "hong-kong"', style: 'error' });
      return;
    }

    addOutput('system', 'table', {
      headers: ['METRIC', ...systems.map(s => s!.name.toUpperCase())],
      rows: [
        ['Momentum', ...systems.map(s => `${s!.momentum}/10`)],
        ['Deal Flow', ...systems.map(s => s!.dealFlow?.annualDealValue || 'N/A')],
        ['Top Sector', ...systems.map(s => s!.boomingAreas[0] || 'N/A')],
        ['Partner Growth', ...systems.map(s => s!.partnerIntel?.partnerGrowth || 'N/A')],
        ['Type', ...systems.map(s => s!.type)],
      ]
    });
  };

  const showJurisdictionDossier = (id: string) => {
    const system = legalSystems.find(s => s.id === id);
    if (!system) return;

    addOutput('system', 'text', {
      text: `╔══════════════════════════════════════════════════════════════╗
║  ${system.name.toUpperCase().padEnd(56)} ║
╚══════════════════════════════════════════════════════════════╝`,
      style: 'header',
      color: system.color
    });

    addOutput('system', 'metric', {
      metrics: [
        { label: 'MOMENTUM', value: `${system.momentum}/10`, positive: system.momentum >= 8 },
        { label: 'TYPE', value: system.type },
        { label: 'REGION', value: system.region },
        { label: 'DEAL FLOW', value: system.dealFlow?.annualDealValue || 'N/A' },
      ]
    });

    if (system.insiderIntel) {
      addOutput('system', 'text', {
        text: `MARKET TIMING:\n${system.insiderIntel.marketTiming}\n\nWINNING FIRMS:\n${system.insiderIntel.winningFirms.slice(0, 3).join('\n')}`,
        style: 'intel'
      });
    }

    if (system.arbitrageOpportunities) {
      addOutput('system', 'arbitrage', {
        title: 'ARBITRAGE PLAYS',
        opportunities: system.arbitrageOpportunities.map(a => ({
          ...a,
          jurisdiction: system.name,
          color: system.color,
          momentum: system.momentum
        }))
      });
    }
  };

  const showNewsAlerts = () => {
    const alerts = [
      { time: '10:42', severity: 'high', text: 'Saudi Arabia: Saudization pressure intensifying - expat visa restrictions' },
      { time: '09:15', severity: 'medium', text: 'Singapore: Mid-senior talent shortage acute across ASEAN desks' },
      { time: '08:30', severity: 'high', text: 'Hong Kong: PRC firms aggressively poaching international talent' },
      { time: '07:45', severity: 'low', text: 'India: IBC timeline delays frustrating PE clients' },
      { time: 'Yesterday', severity: 'medium', text: 'UAE: Operating costs up 25% YoY, Saudi competition diverting capital' },
    ];

    addOutput('system', 'alert', { alerts });
  };

  const showBarChart = () => {
    addOutput('system', 'chart', {
      type: 'bar',
      title: 'MOMENTUM BY JURISDICTION',
      data: legalSystems.map(s => ({ name: s.id.toUpperCase(), value: s.momentum, color: s.color }))
    });
  };

  const showPieChart = () => {
    const byRegion = legalSystems.reduce((acc, s) => {
      acc[s.region] = (acc[s.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    addOutput('system', 'chart', {
      type: 'pie',
      title: 'MARKETS BY REGION',
      data: Object.entries(byRegion).map(([name, value]) => ({ name, value, color: '#' + Math.floor(Math.random()*16777215).toString(16) }))
    });
  };

  const showLineChart = () => {
    addOutput('system', 'chart', {
      type: 'line',
      title: 'MOMENTUM TREND (SIMULATED)',
      data: legalSystems.slice(0, 5).map(s => ({ name: s.id.toUpperCase(), value: s.momentum, color: s.color }))
    });
  };

  const aiSearch = async (query: string) => {
    setIsLoading(true);
    addOutput('system', 'text', { text: `[DeepSeek AI] Analyzing: "${query}"...`, style: 'ai-processing' });
    
    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
        timing: s.insiderIntel?.marketTiming,
        growth: s.partnerIntel?.partnerGrowth,
        deals: s.dealFlow?.annualDealValue
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, context })
      });

      if (!res.ok) throw new Error('AI query failed');
      
      const data = await res.json();
      
      // Parse AI response and format it
      const responseText = data.response;
      
      // Check if response contains specific patterns for formatting
      if (responseText.includes('market') || responseText.includes('opportunity')) {
        addOutput('ai', 'text', { text: responseText, style: 'ai-response' });
        
        // Suggest visualization
        addOutput('system', 'text', { 
          text: '💡 Tip: Type "viz momentum" or "viz arbitrage" to see related visualizations', 
          style: 'tip' 
        });
      } else {
        addOutput('ai', 'text', { text: responseText, style: 'ai-response' });
      }
    } catch (error) {
      addOutput('system', 'text', { text: '❌ AI service unavailable. Try again later.', style: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(command);
    }
  };

  // Canvas rendering for charts
  const renderChart = (output: TerminalOutput) => {
    if (output.type !== 'chart') return null;
    
    return (
      <div className="my-2 p-3 bg-terminal-panel border border-terminal-border rounded">
        <div className="text-terminal-amber text-xs font-bold mb-2 flex items-center gap-2">
          <BarChart3 size={12} /> {output.content.title}
        </div>
        <div className="h-32 flex items-end gap-1">
          {output.content.data.map((d: any, i: number) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t transition-all duration-500"
                style={{ 
                  height: `${(d.value / 10) * 100}%`,
                  backgroundColor: d.color,
                  minHeight: '4px'
                }}
              />
              <div className="text-[8px] text-terminal-textDim mt-1 truncate w-full text-center">
                {d.name.substring(0, 4)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-terminal-bg text-terminal-text font-mono text-xs overflow-hidden">
      {/* Bloomberg-style Header */}
      <header className="bg-terminal-header border-b border-terminal-border flex items-center justify-between px-3 py-2 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-terminal-amber" />
            <span className="text-terminal-amber font-bold">LEGAL-INTEL</span>
            <span className="text-[10px] text-terminal-textDim hidden md:inline">v3.0</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] text-terminal-textDim">
            <span className="text-terminal-green">● LIVE</span>
            <span>ASIA-PACIFIC</span>
            <span>MIDDLE EAST</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <TickerItem label="AVG MOM" value="7.2" change="+0.3" positive />
          <TickerItem label="DEALS" value="$800B" change="+12%" positive />
          <span className="text-terminal-textDim">{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      {/* Main Terminal Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {outputs.map((output) => (
          <div key={output.id} className="animate-in fade-in duration-200">
            {output.type === 'text' && (
              <TextOutput content={output.content} source={output.source} />
            )}
            {output.type === 'metric' && (
              <MetricOutput metrics={output.content.metrics} />
            )}
            {output.type === 'table' && (
              <TableOutput headers={output.content.headers} rows={output.content.rows} />
            )}
            {output.type === 'momentum' && (
              <MomentumOutput data={output.content} />
            )}
            {output.type === 'arbitrage' && (
              <ArbitrageOutput data={output.content} />
            )}
            {output.type === 'alert' && (
              <AlertOutput alerts={output.content.alerts} />
            )}
            {output.type === 'chart' && renderChart(output)}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-terminal-textDim p-2">
            <div className="w-2 h-2 bg-terminal-amber animate-pulse rounded-full" />
            <div className="w-2 h-2 bg-terminal-amber animate-pulse rounded-full delay-75" />
            <div className="w-2 h-2 bg-terminal-amber animate-pulse rounded-full delay-150" />
            <span className="text-[10px]">DeepSeek AI processing...</span>
          </div>
        )}
      </div>

      {/* Command Input */}
      <div className="border-t border-terminal-border bg-terminal-panel p-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-terminal-amber font-bold">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command or ask AI..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-terminal-text placeholder-terminal-textDim/50"
            disabled={isLoading}
            autoFocus
          />
          <button 
            onClick={() => processCommand(command)}
            disabled={isLoading || !command.trim()}
            className="text-terminal-textDim hover:text-terminal-amber disabled:opacity-30 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Quick suggestions */}
        <div className="flex items-center gap-2 mt-2 overflow-x-auto">
          <span className="text-[10px] text-terminal-textDim">Quick:</span>
          {['momentum', 'arbitrage', 'market', 'viz momentum', 'compare singapore vs hong kong'].map(cmd => (
            <button
              key={cmd}
              onClick={() => processCommand(cmd)}
              className="text-[10px] px-2 py-0.5 bg-terminal-panelHover hover:bg-terminal-border rounded text-terminal-textDim hover:text-terminal-text whitespace-nowrap transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="bg-terminal-header border-t border-terminal-border py-1 px-3 overflow-hidden shrink-0">
        <div className="flex items-center gap-6 text-[10px] animate-marquee whitespace-nowrap">
          {legalSystems.flatMap(s => [
            <span key={`${s.id}-1`} className="text-terminal-textDim">{s.id.toUpperCase()}</span>,
            <span key={`${s.id}-2`} style={{ color: s.momentum >= 8 ? '#00ff88' : s.momentum >= 6 ? '#ff8c00' : '#ff3366' }}>
              M{s.momentum}
            </span>,
            <span key={`${s.id}-3`} className="text-terminal-textDim">
              {s.dealFlow?.annualDealValue || 'N/A'}
            </span>,
            <span key={`${s.id}-4`} className="text-terminal-textDim">|</span>
          ])}
        </div>
      </div>
    </div>
  );
}

// Output Components
function TextOutput({ content, source }: { content: any; source: string }) {
  const getStyle = () => {
    switch (content.style) {
      case 'header': return 'text-terminal-amber font-bold whitespace-pre';
      case 'command': return 'text-terminal-text font-bold';
      case 'ai-response': return 'text-terminal-green leading-relaxed';
      case 'ai-processing': return 'text-terminal-amber/70 italic';
      case 'error': return 'text-terminal-red';
      case 'warning': return 'text-terminal-amber';
      case 'info': return 'text-terminal-textDim';
      case 'tip': return 'text-terminal-info text-[10px] italic';
      case 'command-list': return 'text-terminal-text text-[10px] whitespace-pre';
      case 'heatmap': return 'text-terminal-text text-[10px] whitespace-pre font-mono';
      default: return 'text-terminal-text';
    }
  };

  return <div className={getStyle()}>{content.text}</div>;
}

function MetricOutput({ metrics }: { metrics: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
      {metrics.map((m, i) => (
        <div key={i} className="bg-terminal-panel border border-terminal-border p-2 rounded">
          <div className="text-[8px] text-terminal-textDim uppercase">{m.label}</div>
          <div className="text-lg font-bold text-terminal-text">{m.value}</div>
          {m.change && (
            <div className={`text-[10px] ${m.positive ? 'text-terminal-green' : 'text-terminal-red'}`}>
              {m.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TableOutput({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-2 border border-terminal-border rounded">
      <table className="w-full text-[10px]">
        <thead>
          <tr className="bg-terminal-panel text-terminal-amber">
            {headers.map((h, i) => (
              <th key={i} className="px-2 py-1 text-left border-b border-terminal-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-terminal-border/50 hover:bg-terminal-panelHover/50">
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1 text-terminal-text">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MomentumOutput({ data }: { data: any }) {
  return (
    <div className="my-2 border border-terminal-border rounded overflow-hidden">
      <div className="bg-terminal-panel px-3 py-2 text-terminal-amber text-xs font-bold flex items-center gap-2">
        <TrendingUp size={12} /> {data.title}
      </div>
      <div className="divide-y divide-terminal-border">
        {data.jurisdictions.map((j: any, i: number) => (
          <div key={j.id} className="flex items-center gap-3 p-2 hover:bg-terminal-panelHover/50">
            <span className="text-terminal-amber font-bold w-6">#{i + 1}</span>
            <div className="w-2 h-2 rounded-full" style={{ background: j.color }} />
            <span className="flex-1 text-terminal-text text-sm">{j.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-terminal-border rounded overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${j.momentum * 10}%`,
                    background: j.momentum >= 8 ? '#00ff88' : j.momentum >= 6 ? '#ff8c00' : '#ff3366'
                  }}
                />
              </div>
              <span className={`font-bold w-8 text-right ${
                j.momentum >= 8 ? 'text-terminal-green' : j.momentum >= 6 ? 'text-terminal-amber' : 'text-terminal-red'
              }`}>
                {j.momentum}
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded ${
              j.trend === 'STRONG BUY' ? 'bg-terminal-green/20 text-terminal-green' :
              j.trend === 'HOLD' ? 'bg-terminal-amber/20 text-terminal-amber' :
              'bg-terminal-red/20 text-terminal-red'
            }`}>
              {j.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArbitrageOutput({ data }: { data: any }) {
  return (
    <div className="my-2 border border-terminal-border rounded overflow-hidden">
      <div className="bg-terminal-panel px-3 py-2 text-terminal-amber text-xs font-bold flex items-center gap-2">
        <Zap size={12} /> {data.title}
      </div>
      <div className="divide-y divide-terminal-border">
        {data.opportunities.map((opp: any, i: number) => (
          <div key={i} className="p-3 hover:bg-terminal-panelHover/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold" style={{ color: opp.color }}>{opp.type}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${
                opp.riskLevel === 'Low' ? 'bg-terminal-green/20 text-terminal-green' :
                opp.riskLevel === 'Medium' ? 'bg-terminal-amber/20 text-terminal-amber' :
                'bg-terminal-red/20 text-terminal-red'
              }`}>
                {opp.riskLevel} RISK
              </span>
            </div>
            <div className="text-[10px] text-terminal-textDim mb-1">{opp.jurisdiction}</div>
            <div className="text-xs text-terminal-text mb-1">{opp.description}</div>
            <div className="text-[10px] text-terminal-amber">{opp.expectedReturn}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertOutput({ alerts }: { alerts: any[] }) {
  return (
    <div className="my-2 border border-terminal-border rounded overflow-hidden">
      <div className="bg-terminal-panel px-3 py-2 text-terminal-red text-xs font-bold flex items-center gap-2">
        <AlertCircle size={12} /> MARKET ALERTS
      </div>
      <div className="divide-y divide-terminal-border">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-start gap-3 p-2 hover:bg-terminal-panelHover/50">
            <span className="text-[10px] text-terminal-textDim whitespace-nowrap">{alert.time}</span>
            <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
              alert.severity === 'high' ? 'bg-terminal-red' :
              alert.severity === 'medium' ? 'bg-terminal-amber' :
              'bg-terminal-green'
            }`} />
            <span className="text-xs text-terminal-text flex-1">{alert.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TickerItem({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-1 text-[10px]">
      <span className="text-terminal-textDim">{label}</span>
      <span className="text-terminal-text font-bold">{value}</span>
      <span className={positive ? 'text-terminal-green' : 'text-terminal-red'}>{change}</span>
    </div>
  );
}
