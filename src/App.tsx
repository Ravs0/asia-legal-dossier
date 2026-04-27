import { useState } from 'react';
import { legalSystems } from './data/dossierData';
import { MapView } from './components/MapView';
import { Dashboard } from './components/Dashboard';
import { DossierCard } from './components/DossierCard';
import { BloombergTerminal } from './components/BloombergTerminal';
import { LiveTerminal } from './components/LiveTerminal';
import { NewsHub } from './components/NewsHub';
import { PhoneAI } from './components/PhoneAI';
import { IndiaPartnerDossier } from './components/IndiaPartnerDossier';
import { LegalResourcesHub } from './components/LegalResourcesHub';
import { AISearch } from './components/AISearch';
import { LayoutDashboard, Map, Terminal, Newspaper, Sparkles, Users, BookOpen } from 'lucide-react';

type View = 'dashboard' | 'map' | 'terminal' | 'bloomberg' | 'news' | 'mobileai' | 'india-partners' | 'resources';

export default function App() {
  const [view, setView] = useState<View>('map');
  const [selected, setSelected] = useState<string | null>(null);

  const selectedSystem = legalSystems.find(s => s.id === selected) || null;

  return (
    <div className="min-h-screen bg-dossier-bg text-dossier-text font-sans">
      <header className="border-b border-dossier-border px-4 md:px-6 py-3 md:py-4 flex items-center justify-between bg-dossier-panel/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-dossier-accent/20 flex items-center justify-center border border-dossier-accent/40">
            <Map size={14} className="text-dossier-accent" />
          </div>
          <div>
            <h1 className="text-xs md:text-sm font-bold tracking-widest uppercase">Asia-Legal-Dossier</h1>
            <p className="text-[9px] md:text-[10px] font-mono text-dossier-textDim uppercase tracking-wider hidden sm:block">Intelligence Network | 2025-2026</p>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          <NavButton active={view === 'bloomberg'} onClick={() => setView('bloomberg')} icon={<Terminal size={14} />} label="Terminal" mobileLabel="Term" />
          <NavButton active={view === 'mobileai'} onClick={() => setView('mobileai')} icon={<Sparkles size={14} />} label="AI" mobileLabel="AI" />
          <NavButton active={view === 'india-partners'} onClick={() => setView('india-partners')} icon={<Users size={14} />} label="India" mobileLabel="IN Partners" />
          <NavButton active={view === 'news'} onClick={() => setView('news')} icon={<Newspaper size={14} />} label="News" mobileLabel="News" />
          <NavButton active={view === 'resources'} onClick={() => setView('resources')} icon={<BookOpen size={14} />} label="Resources" mobileLabel="DBs" />
          <NavButton active={view === 'dashboard'} onClick={() => setView('dashboard')} icon={<LayoutDashboard size={14} />} label="Dashboard" mobileLabel="Dash" />
          <NavButton active={view === 'map'} onClick={() => setView('map')} icon={<Map size={14} />} label="Map" mobileLabel="Map" />
        </nav>
      </header>

      {view === 'bloomberg' && (
        <div className="fixed inset-0 z-50">
          <BloombergTerminal />
        </div>
      )}
      
      {view === 'mobileai' && (
        <div className="fixed inset-0 z-50">
          <PhoneAI />
        </div>
      )}
      
      {view === 'news' && <NewsHub />}
      
      {view === 'india-partners' && <IndiaPartnerDossier />}
      
      {view === 'resources' && <LegalResourcesHub />}
      
      {view !== 'bloomberg' && view !== 'news' && view !== 'mobileai' && view !== 'india-partners' && view !== 'resources' && (
        <main className="p-3 md:p-6 max-w-7xl mx-auto">
          {view === 'dashboard' && <Dashboard />}
          {view === 'terminal' && <LiveTerminal />}
          {view === 'map' && (
            <div className="space-y-4">
              {/* Prominent Map Header */}
              <div className="bg-gradient-to-r from-dossier-accent/20 to-dossier-panel rounded-lg p-4 border border-dossier-accent/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold flex items-center gap-2 text-dossier-accent">
                      <Map size={20} /> Asia-Pacific Legal Markets Map
                    </h2>
                    <p className="text-sm text-dossier-text mt-1">Click any country on the map or select from the grid below to view full intelligence dossier</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dossier-textDim">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-dossier-accent animate-pulse" /> Live Data</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> 13 Jurisdictions</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Click to Explore</span>
                  </div>
                </div>
              </div>
              
              <div className="panel-glass rounded-lg p-4">
                <MapView onSelect={setSelected} selected={selected} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {legalSystems.sort((a,b) => b.momentum - a.momentum).map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s.id)}
                    className="panel-glass rounded-lg p-3 text-left hover:bg-dossier-panelHover transition-all border-glow hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="text-xs font-mono uppercase">{s.id}</span>
                    </div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-[10px] text-dossier-textDim mt-1">{s.type} • Momentum {s.momentum}/10</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {selectedSystem && (
        <DossierCard system={selectedSystem} onClose={() => setSelected(null)} />
      )}
      {view !== 'bloomberg' && view !== 'mobileai' && view !== 'india-partners' && view !== 'resources' && <AISearch />}

      {view !== 'bloomberg' && view !== 'mobileai' && view !== 'india-partners' && view !== 'resources' && (
        <footer className="border-t border-dossier-border px-4 md:px-6 py-3 md:py-4 mt-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-dossier-textDim gap-2">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-dossier-accent inline-block" /> Common Law</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-dossier-warning inline-block" /> Socialist</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" /> Civil Law</span>
            </div>
            <span className="text-[10px] text-dossier-textDim/70">Sources: Chambers 2026, Legal 500, asialaw, Asia Business Law Journal, MLAGlobal</span>
          </div>
        </footer>
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label, mobileLabel }: { active: boolean; onClick: () => void; icon: any; label: string; mobileLabel?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all touch-target ${
        active
          ? 'bg-dossier-accent/20 text-dossier-accent border border-dossier-accent/40'
          : 'text-dossier-textDim hover:text-white border border-transparent'
      }`}
    >
      {icon} <span className="hidden md:inline">{label}</span><span className="md:hidden">{mobileLabel || label}</span>
    </button>
  );
}
