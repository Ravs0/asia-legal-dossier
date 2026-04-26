import { useState, useRef, useEffect } from 'react';
import { legalSystems } from '../data/dossierData';
import { MarkdownText } from './MarkdownText';
import { Send, ChevronLeft, Sparkles, TrendingUp, Globe, Briefcase, Zap, Star, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: TrendingUp, label: 'Best Markets', query: 'Which markets have highest growth?', color: '#22c55e' },
  { icon: Globe, label: 'Compare', query: 'Singapore vs Hong Kong for M&A?', color: '#3b82f6' },
  { icon: Briefcase, label: 'Deals', query: 'Biggest deals this quarter?', color: '#f59e0b' },
  { icon: Zap, label: 'Arbitrage', query: 'Regulatory arbitrage opportunities?', color: '#8b5cf6' },
  { icon: Star, label: 'Rankings', query: 'Which firms winning in Asia?', color: '#f97316' },
];

export function MobileAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! Ask me anything about APAC legal markets, deals, talent, or jurisdictions.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputText]);

  const sendMessage = async (text: string = inputText) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowPrompts(false);
    setIsLoading(true);

    try {
      const context = legalSystems.map(s => ({
        name: s.name,
        momentum: s.momentum,
        arbitrage: s.arbitrageOpportunities?.map(a => a.type),
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, connection issue. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
        <button onClick={() => window.location.href = '/'} className="p-2 -ml-2">
          <ChevronLeft size={28} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold">Legal AI</h1>
            <p className="text-green-400 text-xs">● Online</p>
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Quick Prompts */}
        {showPrompts && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt.query)}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-left active:scale-95"
              >
                <prompt.icon size={20} style={{ color: prompt.color }} className="mb-2" />
                <p className="text-slate-200 text-sm font-medium">{prompt.label}</p>
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-md' 
                : 'bg-slate-900 text-slate-200 rounded-bl-md border border-slate-800'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <span className="text-xs text-slate-400">Legal AI</span>
                </div>
              )}
              <div className="text-[15px] leading-relaxed">
                <MarkdownText text={msg.content} size="sm" />
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-800">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder="Ask anything..."
            className="flex-1 bg-slate-950 rounded-2xl px-4 py-3 text-white placeholder-slate-500 resize-none outline-none max-h-32"
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center disabled:opacity-50 active:scale-95"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
