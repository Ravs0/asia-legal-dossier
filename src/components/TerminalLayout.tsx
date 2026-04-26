import { useState, useEffect, useRef } from 'react';
import { legalSystems } from '../data/dossierData';
import { 
  Search, Command, ArrowRight, TrendingUp, TrendingDown, 
  Activity, Globe, Briefcase, Users, AlertCircle, Zap,
  Terminal, ChevronRight, X, Maximize2, Minimize2
} from 'lucide-react';

interface Panel {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultWidth: string;
}

export function TerminalLayout() {
  const [command, setCommand] = useState('');
  const [activePanel, setActivePanel] = useState('market');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> Asia Legal Intelligence Terminal v2.0',
    '> Connected to DeepSeek AI',
    '> Type "help" for available commands',
    ''
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const executeCommand = async (cmd: string) => {
    const cmdLower = cmd.toLowerCase().trim();
    setTerminalOutput(prev => [...prev, `> ${cmd}`]);
    
    if (cmdLower === 'help') {
      setTerminalOutput(prev => [...prev, 
        'AVAILABLE COMMANDS:',
        '  market           - View market overview',
        '  momentum         - Rankings by momentum',
        '  arbitrage        - Arbitrage opportunities', 
        '  talent           - Talent market insights',
        '  search [query]   - AI-powered search',
        '  [country]        - Jurisdiction dossier (e.g., singapore)',
        '  clear            - Clear terminal',
        '  exit             - Return to dashboard',
        ''
      ]);
    } else if (cmdLower === 'clear') {
      setTerminalOutput(['> Terminal cleared', '']);
    } else if (cmdLower === 'market') {
      setActivePanel('market');
      setTerminalOutput(prev => [...prev, 'Loading market data...', '']);
    } else if (cmdLower === 'momentum') {
      setActivePanel('momentum');
      setTerminalOutput(prev => [...prev, 'Loading momentum rankings...', '']);
    } else if (cmdLower === 'arbitrage') {
      setActivePanel('arbitrage');
      setTerminalOutput(prev => [...prev, 'Scanning arbitrage opportunities...', '']);
    } else if (cmdLower === 'talent') {
      setActivePanel('talent');
      setTerminalOutput(prev => [...prev, 'Loading talent intelligence...', '']);
    } else if (cmdLower.startsWith('search ')) {
      const query = cmd.substring(7);
      await aiSearch(query);
    } else if (legalSystems.find(s => s.id === cmdLower)) {
      setSelectedJurisdiction(cmdLower);
      setActivePanel('dossier');
      setTerminalOutput(prev => [...prev, `Loading ${cmdLower} intelligence...`, '']);
    } else if (cmdLower === 'exit') {
      window.location.reload();
    } else if (cmdLower === '') {
      // Do nothing
    } else {
      setTerminalOutput(prev => [...prev, `Command not found: ${cmd}`, 'Type "help" for available commands', '']);
    }
    setCommand('');
  };

  const aiSearch = async (query: string) => {
    setIsLoading(true);
    setTerminalOutput(prev => [...prev, `Querying DeepSeek AI: "${query}"...`]);
    
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
        body: JSON.stringify({ message: query, context })
      });

      if (!res.ok) throw new Error('AI query failed');
      
      const data = await res.json();
      const responseLines = data.response.split('\n').filter((l: string) => l.trim());
      setTerminalOutput(prev => [...prev, ...responseLines, '']);
    } catch (error) {
      setTerminalOutput(prev => [...prev, 'Error: AI service unavailable', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(command);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-terminal-text font-mono text-xs md:text-sm overflow-hidden">
      {/* Bloomberg-style Header */}
      <header className="bg-terminal-header border-b border-terminal-border flex items-center justify-between px-2 md:px-4 py-1 md:py-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <Terminal size={16} className="text-terminal-amber" />
            <span className="text-terminal-amber font-bold text-xs md:text-sm">LEGAL-INTEL</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] md:text-xs text-terminal-textDim">
            <span>ASIA-PACIFIC</span>
            <span>MIDDLE EAST</span>
            <span className="text-terminal-green">LIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs">
          <TickerItem label="AVG MOM" value="7.2" change="+0.3" positive />
          <TickerItem label="DEALS" value="$800B" change="+12%" positive />
          <TickerItem label="PARTNERS" value="12K" change="+8%" positive />
          <span className="text-terminal-textDim">{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      {/* Main Content - Multi Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Navigation */}
        <div className="w-12 md:w-48 bg-terminal-sidebar border-r border-terminal-border flex flex-col">
          <div className="p-1 md:p-2 border-b border-terminal-border text-[10px] md:text-xs text-terminal-textDim uppercase hidden md:block">
            Navigation
          </div>
          {[
            { id: 'market', label: 'Market', icon: Activity },
            { id: 'momentum', label: 'Momentum', icon: TrendingUp },
            { id: 'arbitrage', label: 'Arbitrage', icon: Zap },
            { id: 'talent', label: 'Talent', icon: Users },
            { id: 'dossier', label: 'Dossier', icon: Briefcase },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1 md:py-2 text-[10px] md:text-xs hover:bg-terminal-panelHover transition-colors ${
                activePanel === item.id ? 'bg-terminal-panelHover text-terminal-amber' : 'text-terminal-text'
              }`}
            >
              <item.icon size={14} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
          
          <div className="mt-auto p-1 md:p-2 border-t border-terminal-border">
            <div className="text-[8px] md:text-[10px] text-terminal-textDim uppercase mb-1 hidden md:block">Jurisdictions</div>
            <div className="space-y-0.5 md:space-y-1 max-h-24 md:max-h-48 overflow-y-auto">
              {legalSystems.slice(0, 6).map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedJurisdiction(s.id);
                    setActivePanel('dossier');
                  }}
                  className="w-full text-left px-1 md:px-2 py-0.5 text-[8px] md:text-xs hover:bg-terminal-panelHover truncate"
                  style={{ color: s.color }}
                >
                  <span className="hidden md:inline">{s.id.toUpperCase()}</span>
                  <span className="md:hidden">{s.id.slice(0, 3).toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Main Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Panel Header */}
          <div className="bg-terminal-panel border-b border-terminal-border px-2 md:px-4 py-1 md:py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-terminal-amber font-bold text-xs md:text-sm">
                {activePanel.toUpperCase()}
              </span>
              <span className="text-[10px] md:text-xs text-terminal-textDim hidden sm:inline">
                {activePanel === 'market' && 'REAL-TIME MARKET DATA'}
                {activePanel === 'momentum' && 'MOMENTUM RANKINGS'}
                {activePanel === 'arbitrage' && 'ARBITRAGE OPPORTUNITIES'}
                {activePanel === 'talent' && 'TALENT MARKET INTELLIGENCE'}
                {activePanel === 'dossier' && selectedJurisdiction?.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-0.5 md:p-1 hover:bg-terminal-panelHover text-terminal-textDim">
                <Minimize2 size={12} />
              </button>
              <button className="p-0.5 md:p-1 hover:bg-terminal-panelHover text-terminal-textDim">
                <Maximize2 size={12} />
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto p-2 md:p-4 bg-black">
            {activePanel === 'market' && <MarketPanel />}
            {activePanel === 'momentum' && <MomentumPanel />}
            {activePanel === 'arbitrage' && <ArbitragePanel />}
            {activePanel === 'talent' && <TalentPanel />}
            {activePanel === 'dossier' && <DossierPanel jurisdiction={selectedJurisdiction} />}
          </div>
        </div>

        {/* Right Panel - Terminal/AI */}
        <div className="hidden lg:flex w-80 xl:w-96 flex-col border-l border-terminal-border bg-terminal-sidebar">
          <div className="bg-terminal-panel border-b border-terminal-border px-3 py-2 flex items-center gap-2">
            <Command size={14} className="text-terminal-amber" />
            <span className="text-terminal-amber font-bold text-xs">TERMINAL</span>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 text-xs space-y-1 font-mono">
            {terminalOutput.map((line, i) => (
              <div 
                key={i} 
                className={`${
                  line.startsWith('>') ? 'text-terminal-amber' : 
                  line.startsWith('AVAILABLE') || line.startsWith('  ') ? 'text-terminal-green' :
                  line.startsWith('Error') ? 'text-terminal-red' :
                  'text-terminal-text'
                }`}
              >
                {line}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-terminal-textDim">
                <div className="w-2 h-2 bg-terminal-amber animate-pulse rounded-full" />
                Processing...
              </div>
            )}
          </div>

          <div className="p-2 border-t border-terminal-border bg-terminal-panel">
            <div className="flex items-center gap-2">
              <span className="text-terminal-amber">{'>'}</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-terminal-text placeholder-terminal-textDim"
                disabled={isLoading}
              />
              <button 
                onClick={() => executeCommand(command)}
                disabled={isLoading}
                className="text-terminal-textDim hover:text-terminal-amber"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="bg-terminal-header border-t border-terminal-border py-1 px-2 md:px-4 overflow-hidden">
        <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs animate-marquee whitespace-nowrap">
          {legalSystems.flatMap(s => [
            <span key={`${s.id}-1`} className="text-terminal-textDim">{s.id.toUpperCase()}</span>,
            <span key={`${s.id}-2`} style={{ color: s.momentum >= 8 ? '#10b981' : s.momentum >= 6 ? '#f59e0b' : '#ef4444' }}>
              M{s.momentum}
            </span>,
            <span key={`${s.id}-3`} className="text-terminal-textDim">
              {s.dealFlow?.annualDealValue || 'N/A'}
            </span>
          ])}
        </div>
      </div>
    </div>
  );
}

// Sub-components for panels
function MarketPanel() {
  return (
    <div className="space-y-2 md:space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <MetricBox label="TOTAL JURISDICTIONS" value="13" />
        <MetricBox label="AVG MOMENTUM" value="7.2" change="+0.3" />
        <MetricBox label="HIGH GROWTH MARKETS" value="7" />
        <MetricBox label="ANNUAL DEAL FLOW" value="$800B+" />
      </div>
      
      <div className="border border-terminal-border bg-terminal-panel">
        <div className="px-2 md:px-4 py-1 md:py-2 border-b border-terminal-border text-[10px] md:text-xs text-terminal-amber uppercase">
          Jurisdiction Overview
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] md:text-xs">
            <thead>
              <tr className="text-terminal-textDim border-b border-terminal-border">
                <th className="px-2 md:px-4 py-1 md:py-2 text-left">JURISDICTION</th>
                <th className="px-2 md:px-4 py-1 md:py-2 text-left">MOM</th>
                <th className="px-2 md:px-4 py-1 md:py-2 text-left">DEAL FLOW</th>
                <th className="px-2 md:px-4 py-1 md:py-2 text-left hidden md:table-cell">TOP SECTOR</th>
                <th className="px-2 md:px-4 py-1 md:py-2 text-left hidden lg:table-cell">PARTNER GROWTH</th>
              </tr>
            </thead>
            <tbody>
              {legalSystems.sort((a, b) => b.momentum - a.momentum).map(s => (
                <tr key={s.id} className="border-b border-terminal-border/50 hover:bg-terminal-panelHover">
                  <td className="px-2 md:px-4 py-1 md:py-2">
                    <span style={{ color: s.color }}>●</span> {s.name.toUpperCase()}
                  </td>
                  <td className="px-2 md:px-4 py-1 md:py-2">
                    <span className={s.momentum >= 8 ? 'text-terminal-green' : s.momentum >= 6 ? 'text-terminal-amber' : 'text-terminal-red'}>
                      {s.momentum}/10
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-1 md:py-2 text-terminal-textDim">
                    {s.dealFlow?.annualDealValue || 'N/A'}
                  </td>
                  <td className="px-2 md:px-4 py-1 md:py-2 text-terminal-textDim hidden md:table-cell">
                    {s.boomingAreas[0]}
                  </td>
                  <td className="px-2 md:px-4 py-1 md:py-2 text-terminal-green hidden lg:table-cell">
                    {s.partnerIntel?.partnerGrowth || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MomentumPanel() {
  const sorted = [...legalSystems].sort((a, b) => b.momentum - a.momentum);
  
  return (
    <div className="space-y-2 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {sorted.map((s, i) => (
          <div key={s.id} className="border border-terminal-border bg-terminal-panel p-2 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-terminal-amber font-bold text-xs md:text-sm">#{i + 1}</span>
              <span style={{ color: s.color }} className="text-lg md:text-2xl font-bold">{s.momentum}</span>
            </div>
            <div className="text-xs md:text-sm font-bold mb-1" style={{ color: s.color }}>{s.name}</div>
            <div className="text-[10px] md:text-xs text-terminal-textDim">{s.region}</div>
            <div className="mt-2 h-1 bg-terminal-border rounded overflow-hidden">
              <div 
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${s.momentum * 10}%`,
                  background: s.momentum >= 8 ? '#10b981' : s.momentum >= 6 ? '#f59e0b' : '#ef4444'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArbitragePanel() {
  const allArbitrages = legalSystems.flatMap(s => 
    (s.arbitrageOpportunities || []).map(a => ({ ...a, jurisdiction: s.name, color: s.color }))
  ).sort((a, b) => {
    const riskOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
    return (riskOrder[a.riskLevel as keyof typeof riskOrder] || 0) - (riskOrder[b.riskLevel as keyof typeof riskOrder] || 0);
  });

  return (
    <div className="space-y-2 md:space-y-4">
      <div className="border border-terminal-border bg-terminal-panel">
        <div className="px-2 md:px-4 py-1 md:py-2 border-b border-terminal-border text-[10px] md:text-xs text-terminal-amber uppercase">
          Arbitrage Opportunities ({allArbitrages.length})
        </div>
        <div className="divide-y divide-terminal-border">
          {allArbitrages.map((arb, i) => (
            <div key={i} className="p-2 md:p-4 hover:bg-terminal-panelHover">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-bold" style={{ color: arb.color }}>{arb.type}</span>
                <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded ${
                  arb.riskLevel === 'Low' ? 'bg-terminal-green/20 text-terminal-green' :
                  arb.riskLevel === 'Medium' ? 'bg-terminal-amber/20 text-terminal-amber' :
                  'bg-terminal-red/20 text-terminal-red'
                }`}>
                  {arb.riskLevel} RISK
                </span>
              </div>
              <div className="text-[10px] md:text-xs text-terminal-textDim mb-1">{arb.jurisdiction}</div>
              <div className="text-xs md:text-sm mb-1">{arb.description}</div>
              <div className="text-[10px] md:text-xs text-terminal-amber">{arb.expectedReturn}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TalentPanel() {
  return (
    <div className="space-y-2 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {legalSystems.filter(s => s.partnerIntel).map(s => (
          <div key={s.id} className="border border-terminal-border bg-terminal-panel p-2 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm font-bold" style={{ color: s.color }}>{s.name}</span>
              <span className="text-terminal-green text-xs md:text-sm">{s.partnerIntel?.partnerGrowth}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs">
              <div>
                <div className="text-terminal-textDim">Partners</div>
                <div className="text-terminal-text">{s.partnerIntel?.totalPartners}</div>
              </div>
              <div>
                <div className="text-terminal-textDim">Lateral '24</div>
                <div className="text-terminal-text">{s.partnerIntel?.lateralHires2024}</div>
              </div>
              <div>
                <div className="text-terminal-textDim">Departed</div>
                <div className="text-terminal-red">{s.partnerIntel?.departedPartners}</div>
              </div>
              <div>
                <div className="text-terminal-textDim">To Partner</div>
                <div className="text-terminal-text">{s.partnerIntel?.avgYearsToPartner}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DossierPanel({ jurisdiction }: { jurisdiction: string | null }) {
  const system = legalSystems.find(s => s.id === jurisdiction);
  if (!system) return <div className="text-terminal-textDim p-4">Select a jurisdiction from the sidebar</div>;

  return (
    <div className="space-y-2 md:space-y-4">
      <div className="border border-terminal-border bg-terminal-panel p-3 md:p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ background: system.color }} />
          <span className="text-lg md:text-xl font-bold" style={{ color: system.color }}>{system.name}</span>
        </div>
        <div className="text-xs md:text-sm text-terminal-text mb-2">{system.description}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] md:text-xs">
          <div>
            <div className="text-terminal-textDim">Type</div>
            <div className="text-terminal-text">{system.type}</div>
          </div>
          <div>
            <div className="text-terminal-textDim">Region</div>
            <div className="text-terminal-text">{system.region}</div>
          </div>
          <div>
            <div className="text-terminal-textDim">Momentum</div>
            <div className={system.momentum >= 8 ? 'text-terminal-green' : 'text-terminal-amber'}>
              {system.momentum}/10
            </div>
          </div>
          <div>
            <div className="text-terminal-textDim">Deal Flow</div>
            <div className="text-terminal-text">{system.dealFlow?.annualDealValue || 'N/A'}</div>
          </div>
        </div>
      </div>

      {system.insiderIntel && (
        <div className="border border-terminal-border bg-terminal-panel p-3 md:p-4">
          <div className="text-terminal-amber text-xs md:text-sm font-bold mb-2">MARKET TIMING</div>
          <div className="text-xs md:text-sm text-terminal-text bg-terminal-sidebar p-2 md:p-3 rounded">
            {system.insiderIntel.marketTiming}
          </div>
        </div>
      )}

      {system.arbitrageOpportunities && system.arbitrageOpportunities.length > 0 && (
        <div className="border border-terminal-border bg-terminal-panel p-3 md:p-4">
          <div className="text-terminal-amber text-xs md:text-sm font-bold mb-2">ARBITRAGE PLAYS</div>
          <div className="space-y-2">
            {system.arbitrageOpportunities.map((arb, i) => (
              <div key={i} className="text-xs md:text-sm">
                <span className="text-terminal-amber">{'>'}</span> {arb.type} <span className="text-terminal-textDim">({arb.riskLevel})</span>
                <div className="text-terminal-textDim ml-4">{arb.expectedReturn}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper components
function TickerItem({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-1 text-[10px] md:text-xs">
      <span className="text-terminal-textDim">{label}</span>
      <span className="text-terminal-text font-bold">{value}</span>
      <span className={positive ? 'text-terminal-green' : 'text-terminal-red'}>{change}</span>
    </div>
  );
}

function MetricBox({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <div className="border border-terminal-border bg-terminal-panel p-2 md:p-4">
      <div className="text-[8px] md:text-[10px] text-terminal-textDim uppercase mb-1">{label}</div>
      <div className="text-base md:text-xl font-bold text-terminal-text">{value}</div>
      {change && <div className="text-[10px] md:text-xs text-terminal-green">{change}</div>}
    </div>
  );
}
