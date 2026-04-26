import { useState, useRef, useEffect } from 'react';
import { legalSystems } from '../data/dossierData';
import { MarkdownText } from './MarkdownText';
import { 
  ArrowLeft, Sparkles, Send, Mic, MoreHorizontal,
  TrendingUp, Building2, Scale, Users, Zap, Globe,
  ChevronRight, RotateCcw, MessageCircle
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  { icon: TrendingUp, text: 'Which markets are hot right now?', color: 'bg-green-500' },
  { icon: Building2, text: 'Compare Singapore vs Hong Kong', color: 'bg-blue-500' },
  { icon: Scale, text: 'Latest regulatory changes?', color: 'bg-purple-500' },
  { icon: Users, text: 'Where to find top talent?', color: 'bg-pink-500' },
  { icon: Zap, text: 'Best arbitrage opportunities', color: 'bg-amber-500' },
  { icon: Globe, text: 'Emerging jurisdictions', color: 'bg-cyan-500' },
];

export function PhoneAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowSuggestions(false);
    setLoading(true);

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
          timestamp: new Date()
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Connection error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([]);
    setShowSuggestions(true);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* iOS Status Bar */}
      <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-sm font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full border-2 border-black" />
          <div className="w-4 h-4 rounded-full border-2 border-black" />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center text-blue-600 text-lg"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
          <span className="ml-1">Back</span>
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Sparkles size={16} className="text-blue-600" fill="currentColor" />
            <span className="font-semibold text-lg text-black">Legal AI</span>
          </div>
          <span className="text-xs text-gray-500">Asia-Pacific Intelligence</span>
        </div>
        <button onClick={reset} className="p-2">
          <RotateCcw size={22} className="text-blue-600" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {messages.length === 0 && showSuggestions ? (
          <div className="p-4 pt-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl">
                <Sparkles size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What can I help with?</h2>
              <p className="text-gray-500">Ask about markets, deals, talent, or jurisdictions</p>
            </div>

            <div className="space-y-3">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s.text)}
                  className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
                >
                  <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                    <s.icon size={20} className="text-white" />
                  </div>
                  <span className="flex-1 text-left text-gray-800 font-medium">{s.text}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <Sparkles size={14} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-base leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-md' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                }`}>
                  <div className="text-[15px] leading-relaxed">
                    <MarkdownText text={m.content} size="sm" theme="light" />
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 pb-8">
        <div className="flex items-end gap-2 bg-gray-100 rounded-full px-4 py-2">
          <button className="p-2 text-gray-500">
            <MoreHorizontal size={24} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Message..."
            className="flex-1 bg-transparent py-3 px-2 text-base text-gray-900 placeholder-gray-500 outline-none resize-none max-h-24"
            rows={1}
          />
          {input.trim() ? (
            <button 
              onClick={() => send()}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            >
              <Send size={18} className="text-white ml-0.5" />
            </button>
          ) : (
            <button className="w-10 h-10 text-gray-500 flex items-center justify-center">
              <Mic size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
