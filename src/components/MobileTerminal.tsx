import { useState, useEffect, useRef } from 'react';
import { legalSystems } from '../data/dossierData';
import { MarkdownText } from './MarkdownText';
import { 
  Terminal, Search, TrendingUp, Briefcase, Users, Scale, 
  Globe, Zap, X, ChevronRight, Brain, Menu, ArrowLeft,
  Newspaper, BarChart3, Flame, MessageSquare
} from 'lucide-react';

type Tab = 'news' | 'markets' | 'deals' | 'heatmap' | 'ai';

export function MobileTerminal() {
  const [activeTab, setActiveTab] = useState<Tab>('news');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);
  const [showJurisdictions, setShowJurisdictions] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiQuery, context })
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.response);
      }
    } catch {
      setAiResponse('Service unavailable. Try again later.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'deals', label: 'Deals', icon: Briefcase },
    { id: 'heatmap', label: 'Heat', icon: Flame },
    { id: 'ai', label: 'AI Ask', icon: MessageSquare },
  ];

  return (
    <div className="h-screen flex flex-col bg-black text-gray-300 overflow-hidden">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] px-3 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#ff8c00] flex items-center justify-center">
            <Terminal size={16} className="text-black" />
          </div>
          <div>
            <div className="text-[#ff8c00] font-bold text-sm">LEGAL-INTEL</div>
            <div className="text-[10px] text-[#666]">Mobile Terminal</div>
          </div>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-1 bg-[#ff0000]/20 text-[#ff0000] px-3 py-2 rounded text-xs font-bold"
        >
          <X size={14} />
          EXIT
        </button>
      </header>

      {/* Jurisdiction Selector */}
      <div className="bg-[#1a1a1a] border-b border-[#333] p-2 shrink-0">
        <button
          onClick={() => setShowJurisdictions(!showJurisdictions)}
          className="w-full flex items-center justify-between bg-[#222] border border-[#444] px-3 py-2.5 rounded"
        >
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-[#ff8c00]" />
            <span className="text-sm">
              {selectedJurisdiction 
                ? legalSystems.find(s => s.id === selectedJurisdiction)?.name 
                : 'Select Jurisdiction'}
            </span>
          </div>
          {showJurisdictions ? <X size={16} /> : <ChevronRight size={16} className="rotate-90" />}
        </button>

        {showJurisdictions && (
          <div className="mt-2 bg-[#222] border border-[#444] rounded max-h-48 overflow-y-auto">
            <button
              onClick={() => { setSelectedJurisdiction(null); setShowJurisdictions(false); }}
              className="w-full text-left px-3 py-3 text-sm border-b border-[#333] hover:bg-[#333]"
            >
              All Jurisdictions
            </button>
            {legalSystems.sort((a, b) => b.momentum - a.momentum).map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedJurisdiction(s.id); setShowJurisdictions(false); }}
                className="w-full text-left px-3 py-3 text-sm border-b border-[#333] hover:bg-[#333] flex items-center justify-between"
              >
                <span>{s.name}</span>
                <span className={s.momentum >= 8 ? 'text-[#0f0]' : s.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'}>
                  M{s.momentum}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div className="flex bg-[#1a1a1a] border-b border-[#333] overflow-x-auto shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[70px] flex flex-col items-center py-3 px-2 ${
              activeTab === tab.id 
                ? 'bg-[#333] text-[#ff8c00] border-b-2 border-[#ff8c00]' 
                : 'text-[#888]'
            }`}
          >
            <tab.icon size={18} />
            <span className="text-[10px] mt-1">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'news' && <NewsContent selectedJurisdiction={selectedJurisdiction} expandedId={expandedNews} setExpandedId={setExpandedNews} />}
        {activeTab === 'markets' && <MarketsContent selectedJurisdiction={selectedJurisdiction} />}
        {activeTab === 'deals' && <DealsContent selectedJurisdiction={selectedJurisdiction} />}
        {activeTab === 'heatmap' && <HeatmapContent />}
        {activeTab === 'ai' && (
          <AIContent 
            query={aiQuery} 
            setQuery={setAiQuery} 
            response={aiResponse} 
            setResponse={setAiResponse}
            isLoading={isAiLoading}
            onSubmit={handleAiQuery}
          />
        )}
      </div>
    </div>
  );
}

// Content Components
function NewsContent({ selectedJurisdiction, expandedId, setExpandedId }: { 
  selectedJurisdiction: string | null; 
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  const news = [
    { id: '1', time: '10:42', category: 'DEAL', title: 'Saudi PIF launches $10B infrastructure fund', source: 'Reuters', impact: 'HIGH', summary: 'Massive infrastructure initiative driving legal work across project finance and construction.' },
    { id: '2', time: '09:15', category: 'TALENT', title: 'Freshfields 20% partner growth in Asia', source: 'Legal Business', impact: 'HIGH', summary: 'Expansion targeting Singapore, Hong Kong, Tokyo in corporate/M&A and PE.' },
    { id: '3', time: '08:30', category: 'REG', title: 'Singapore AI Governance Framework', source: 'ST Legal', impact: 'HIGH', summary: 'New regulations for AI use in legal services addressing confidentiality and liability.' },
    { id: '4', time: '07:45', category: 'DEAL', title: 'Clifford Chance Vietnam wind mandate', source: 'The Lawyer', impact: 'MED', summary: '$3.2B offshore wind project with multi-jurisdictional financing challenges.' },
  ];

  return (
    <div className="space-y-3">
      {news.map(item => (
        <div key={item.id} className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className="w-full p-3 text-left"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    item.category === 'DEAL' ? 'bg-[#0f0]/20 text-[#0f0]' :
                    item.category === 'TALENT' ? 'bg-[#ff8c00]/20 text-[#ff8c00]' :
                    'bg-[#0ff]/20 text-[#0ff]'
                  }`}>{item.category}</span>
                  <span className="text-[10px] text-[#666]">{item.time}</span>
                  <span className={`text-[10px] ${item.impact === 'HIGH' ? 'text-[#f00]' : 'text-[#ff8c00]'}`}>{item.impact}</span>
                </div>
                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                <p className="text-[10px] text-[#888] mt-0.5">{item.source}</p>
              </div>
              <ChevronRight size={16} className={`text-[#666] transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
            </div>
          </button>
          {expandedId === item.id && (
            <div className="px-3 pb-3 border-t border-[#333]">
              <p className="text-xs text-[#aaa] mt-2">{item.summary}</p>
              <button className="mt-2 flex items-center gap-1 text-[10px] text-[#ff8c00]">
                <Brain size={12} />
                AI Analysis
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MarketsContent({ selectedJurisdiction }: { selectedJurisdiction: string | null }) {
  const markets = [
    { symbol: 'MOMENTUM', name: 'APAC Average', price: '7.2', change: '+0.3' },
    { symbol: 'DEALS', name: 'Q2 Volume', price: '$8.9B', change: '+12%' },
    { symbol: 'TALENT', name: 'Partner Moves', price: '45', change: '+8' },
  ];

  const system = selectedJurisdiction ? legalSystems.find(s => s.id === selectedJurisdiction) : null;

  return (
    <div className="space-y-3">
      {system && (
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3 mb-4">
          <h3 className="text-[#ff8c00] font-bold mb-2">{system.name}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-[#222] p-2 rounded">
              <div className="text-[10px] text-[#666]">Momentum</div>
              <div className={system.momentum >= 8 ? 'text-[#0f0]' : system.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'}>
                {system.momentum}/10
              </div>
            </div>
            <div className="bg-[#222] p-2 rounded">
              <div className="text-[10px] text-[#666]">Type</div>
              <div>{system.type}</div>
            </div>
          </div>
        </div>
      )}

      {markets.map(m => (
        <div key={m.symbol} className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold">{m.symbol}</div>
            <div className="text-[10px] text-[#666]">{m.name}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono">{m.price}</div>
            <div className={`text-xs ${m.change.startsWith('+') ? 'text-[#0f0]' : 'text-[#f00]'}`}>{m.change}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DealsContent({ selectedJurisdiction }: { selectedJurisdiction: string | null }) {
  const deals = [
    { value: '$4.2B', type: 'M&A', jurisdiction: 'SG/ID', status: 'ANN' },
    { value: '$850M', type: 'PE', jurisdiction: 'IN', status: 'CLOS' },
    { value: '$1.2B', type: 'IPO', jurisdiction: 'HK', status: 'ANN' },
    { value: '$2.1B', type: 'PF', jurisdiction: 'VN', status: 'COMP' },
  ];

  return (
    <div className="space-y-3">
      {deals.map((d, i) => (
        <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#ff8c00] font-bold">{d.value}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded ${
              d.status === 'ANN' ? 'bg-[#0ff]/20 text-[#0ff]' :
              d.status === 'CLOS' ? 'bg-[#ff8c00]/20 text-[#ff8c00]' :
              'bg-[#0f0]/20 text-[#0f0]'
            }`}>{d.status}</span>
          </div>
          <div className="text-sm">{d.type}</div>
          <div className="text-[10px] text-[#666]">{d.jurisdiction}</div>
        </div>
      ))}
    </div>
  );
}

function HeatmapContent() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {legalSystems.sort((a, b) => b.momentum - a.momentum).map(s => (
        <div 
          key={s.id}
          className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3"
          style={{ 
            borderLeftWidth: '3px',
            borderLeftColor: s.momentum >= 8 ? '#0f0' : s.momentum >= 6 ? '#ff8c00' : '#f00'
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold">{s.id.toUpperCase()}</span>
            <span className={s.momentum >= 8 ? 'text-[#0f0]' : s.momentum >= 6 ? 'text-[#ff8c00]' : 'text-[#f00]'}>
              {s.momentum}
            </span>
          </div>
          <div className="text-[10px] text-[#666] truncate">{s.boomingAreas[0]}</div>
        </div>
      ))}
    </div>
  );
}

function AIContent({ query, setQuery, response, setResponse, isLoading, onSubmit }: {
  query: string;
  setQuery: (q: string) => void;
  response: string | null;
  setResponse: (r: string | null) => void;
  isLoading: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about market opportunities, firm rankings, talent insights..."
          className="w-full bg-[#222] border border-[#444] rounded p-3 text-sm text-white placeholder-[#666] min-h-[80px] resize-none"
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !query.trim()}
          className="w-full mt-2 bg-[#ff8c00] text-black font-bold py-3 rounded disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain size={18} />
              Ask AI
            </>
          )}
        </button>
      </div>

      {response && (
        <div className="bg-[#1a1a1a] border border-[#ff8c00]/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2 text-[#ff8c00]">
            <Brain size={16} />
            <span className="text-xs font-bold">AI RESPONSE</span>
          </div>
          <div className="text-sm text-[#ccc]">
            <MarkdownText text={response} size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}
