import { useState, useRef, useEffect } from 'react';
import { legalSystems } from '../data/dossierData';
import { Bot, Send, X, Sparkles, Loader2, Search, Brain } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AISearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your Asia-Pacific Legal Intelligence AI. Ask me about market opportunities, firm rankings, talent insights, or arbitrage plays across our 13 jurisdictions.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Create context from dossier data
    const context = legalSystems.map(s => ({
      name: s.name,
      momentum: s.momentum,
      type: s.type,
      region: s.region,
      boomingAreas: s.boomingAreas,
      marketSize: s.marketSize,
      dealFlow: s.dealFlow?.annualDealValue,
      topFirms: s.topFirms?.slice(0, 3),
      insiderIntel: s.insiderIntel?.marketTiming,
      arbitrage: s.arbitrageOpportunities?.map(a => a.type)
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context })
      });

      if (!res.ok) throw new Error('Failed to get response');
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again or check your API configuration.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQueries = [
    "Which market has the best arbitrage opportunities?",
    "Compare Singapore vs Hong Kong",
    "Who are the winning firms in Saudi Arabia?",
    "What are the talent shortages?",
    "Best entry timing for Vietnam?"
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-dossier-accent hover:bg-dossier-accent/90 text-dossier-bg rounded-full shadow-lg shadow-dossier-accent/20 transition-all hover:scale-105 border border-dossier-accent/50"
      >
        <Brain size={20} />
        <span className="font-medium text-sm">Ask AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] panel-glass rounded-xl border border-dossier-border shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dossier-border bg-dossier-accent/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-dossier-accent flex items-center justify-center">
            <Bot size={18} className="text-dossier-bg" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Legal Intelligence AI</h3>
            <p className="text-[10px] text-dossier-textDim flex items-center gap-1">
              <Sparkles size={10} /> Powered by DeepSeek
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-dossier-panelHover rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-dossier-accent/20' : 'bg-dossier-accent'
            }`}>
              {msg.role === 'user' ? <Search size={14} className="text-dossier-accent" /> : <Bot size={14} className="text-dossier-bg" />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-dossier-accent/10 border border-dossier-accent/30' 
                : 'bg-dossier-panelHover/50'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-dossier-accent flex items-center justify-center">
              <Bot size={14} className="text-dossier-bg" />
            </div>
            <div className="p-3 rounded-lg bg-dossier-panelHover/50 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-dossier-accent" />
              <span className="text-sm text-dossier-textDim">Analyzing intelligence...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Queries */}
      {messages.length < 3 && (
        <div className="px-4 pb-2">
          <p className="text-[10px] text-dossier-textDim mb-2 uppercase tracking-wider">Quick Queries</p>
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); }}
                className="px-2 py-1 text-[10px] bg-dossier-panelHover/50 hover:bg-dossier-panelHover rounded-full border border-dossier-border/50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-dossier-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about markets, firms, opportunities..."
            className="flex-1 px-3 py-2 bg-dossier-bg border border-dossier-border rounded-lg text-sm focus:outline-none focus:border-dossier-accent"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-3 py-2 bg-dossier-accent hover:bg-dossier-accent/90 disabled:opacity-50 rounded-lg transition-colors"
          >
            <Send size={16} className="text-dossier-bg" />
          </button>
        </div>
      </div>
    </div>
  );
}
