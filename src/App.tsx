import { useState } from 'react';
import { legalSystems } from './data/dossierData';
import { MapView } from './components/MapView';
import { Dashboard } from './components/Dashboard';
import { DossierCard } from './components/DossierCard';
import { AISearch } from './components/AISearch';
import { LayoutDashboard, Map, FileText } from 'lucide-react';

type View = 'dashboard' | 'map';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [selected, setSelected] = useState<string | null>(null);

  const selectedSystem = legalSystems.find(s => s.id === selected) || null;

  return (
    <div className="min-h-screen bg-dossier-bg text-dossier-text font-sans">
      <header className="border-b border-dossier-border px-6 py-4 flex items-center justify-between bg-dossier-panel/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-dossier-accent/20 flex items-center justify-center border border-dossier-accent/40">
            <Map size={16} className="text-dossier-accent" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase">Asia-Legal-Dossier</h1>
            <p className="text-[10px] font-mono text-dossier-textDim uppercase tracking-wider">Intelligence Network | 2025-2026</p>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          <NavButton active={view === 'dashboard'} onClick={() => setView('dashboard')} icon={<LayoutDashboard size={14} />} label="Executive Dashboard" />
          <NavButton active={view === 'map'} onClick={() => setView('map')} icon={<Map size={14} />} label="Geographic Map" />
        </nav>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {view === 'dashboard' && <Dashboard />}
        {view === 'map' && (
          <div className="space-y-4">
            <div className="panel-glass rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-mono text-dossier-textDim uppercase tracking-wider flex items-center gap-2">
                  <Map size={14} /> Asia-Pacific Legal Markets Map
                </h2>
                <p className="text-xs text-dossier-textDim">Click a country to open full intelligence dossier • Use controls to zoom</p>
              </div>
              <MapView onSelect={setSelected} selected={selected} />
            </div>
            <div className="grid grid-cols-5 gap-3">
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

      {selectedSystem && (
        <DossierCard system={selectedSystem} onClose={() => setSelected(null)} />
      )}
      <AISearch />

      <footer className="border-t border-dossier-border px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-dossier-textDim">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-dossier-accent inline-block" /> Common Law</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-dossier-warning inline-block" /> Socialist</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" /> Civil Law</span>
          </div>
          <span>Sources: Chambers 2026, Legal 500, asialaw, Asia Business Law Journal, MLAGlobal</span>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
        active
          ? 'bg-dossier-accent/20 text-dossier-accent border border-dossier-accent/40'
          : 'text-dossier-textDim hover:text-white border border-transparent'
      }`}
    >
      {icon} {label}
    </button>
  );
}
