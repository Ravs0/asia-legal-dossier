import { legalSystems } from '../data/dossierData';
import { TrendingUp, Target, DollarSign, AlertCircle, Zap, Award, Globe, Briefcase, Users, BarChart3 } from 'lucide-react';

export function Dashboard() {
  const highMomentum = legalSystems.filter(s => s.momentum >= 8);
  const avgMomentum = (legalSystems.reduce((a, s) => a + s.momentum, 0) / legalSystems.length).toFixed(1);
  
  // Collect all arbitrage opportunities
  const allArbitrages = legalSystems.flatMap(s => 
    (s.arbitrageOpportunities || []).map(a => ({ ...a, jurisdiction: s.name, color: s.color }))
  ).slice(0, 6);
  
  // Get top partner growth markets
  const topGrowthMarkets = legalSystems
    .filter(s => s.partnerIntel)
    .sort((a, b) => {
      const aGrowth = parseInt(a.partnerIntel!.partnerGrowth.replace(/[^0-9]/g, '')) || 0;
      const bGrowth = parseInt(b.partnerIntel!.partnerGrowth.replace(/[^0-9]/g, '')) || 0;
      return bGrowth - aGrowth;
    })
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* EXECUTIVE SUMMARY */}
      <div className="panel-glass rounded-xl p-4 md:p-6 border-glow bg-gradient-to-br from-dossier-accent/10 via-dossier-bg to-dossier-bg">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Zap className="text-dossier-accent" size={18} />
          <h2 className="text-base md:text-lg font-bold tracking-wider">EXECUTIVE INTELLIGENCE SUMMARY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm">
          <div>
            <p className="text-dossier-textDim mb-2">HIGHEST MOMENTUM MARKETS</p>
            <div className="space-y-1">
              {highMomentum.slice(0, 3).map(s => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-dossier-textDim">({s.momentum}/10)</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-dossier-textDim mb-2">CRITICAL TALENT SHORTAGES</p>
            <div className="space-y-1 text-xs">
              <p>• Saudi ex-prosecutors (Q3 2026 window)</p>
              <p>• Vietnam AI compliance lawyers</p>
              <p>• Singapore ASEAN regional expertise</p>
              <p>• Japan bilingual M&A partners</p>
            </div>
          </div>
          <div>
            <p className="text-dossier-textDim mb-2">EMERGING ARBITRAGE PLAYS</p>
            <div className="space-y-1 text-xs">
              <p>• IBC boutiques (India) - 2-3x rates</p>
              <p>• Offshore wind (Korea/Vietnam)</p>
              <p>• AUKUS defence (Australia)</p>
              <p>• Family offices (Singapore)</p>
            </div>
          </div>
        </div>
      </div>

      {/* KEY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        <StatCard icon={<TrendingUp size={16} />} label="Avg Momentum" value={avgMomentum} suffix="/10" color="text-emerald-400" />
        <StatCard icon={<Target size={16} />} label="Hot Markets" value={highMomentum.length} suffix="" color="text-amber-400" />
        <StatCard icon={<Globe size={16} />} label="Jurisdictions" value={legalSystems.length} suffix="" color="text-sky-400" />
        <StatCard icon={<Briefcase size={16} />} label="Total Partners" value="~12K" suffix="+" color="text-purple-400" />
        <StatCard icon={<DollarSign size={16} />} label="Deal Flow" value="$800B+" suffix="" color="text-rose-400" />
      </div>

      {/* PARTNER GROWTH & MARKET TIMING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel-glass rounded-lg p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users size={12} md:size={14} /> Partner Growth Leaders
          </h3>
          <div className="space-y-2">
            {topGrowthMarkets.map(s => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-dossier-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm">{s.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                  <span className="text-[10px] md:text-xs text-dossier-textDim">{s.partnerIntel?.totalPartners} partners</span>
                  <span className="text-[10px] md:text-xs font-mono text-emerald-400 bg-emerald-400/10 px-1.5 md:px-2 py-0.5 rounded">
                    {s.partnerIntel?.partnerGrowth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-glass rounded-lg p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award size={12} md:size={14} /> Market Timing Signals
          </h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-emerald-500/10 rounded border-l-2 border-emerald-500">
              <strong className="text-emerald-400">OPTIMAL ENTRY:</strong> Saudi Arabia (prosecutor window), Vietnam (AI law first-mover), India (IBC boutique)
            </div>
            <div className="p-2 bg-amber-500/10 rounded border-l-2 border-amber-500">
              <strong className="text-amber-400">ACTIVE CYCLE:</strong> Singapore (family offices), Japan (M&A boom), South Korea (chip/offshore wind)
            </div>
            <div className="p-2 bg-rose-500/10 rounded border-l-2 border-rose-500">
              <strong className="text-rose-400">LATE CYCLE:</strong> UAE (mature, Saudi competition), Hong Kong (PRC firm competition)
            </div>
          </div>
        </div>
      </div>

      {/* ARBITRAGE OPPORTUNITIES */}
      <div className="panel-glass rounded-lg p-3 md:p-4">
        <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
          <BarChart3 size={12} md:size={14} /> Top Arbitrage Opportunities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {allArbitrages.map((a, i) => (
            <div key={i} className="p-3 bg-dossier-bg rounded border border-dossier-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                <span className="text-xs font-mono text-dossier-textDim">{a.jurisdiction}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ml-auto ${
                  a.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-400' :
                  a.riskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>{a.riskLevel}</span>
              </div>
              <p className="text-sm font-medium mb-1">{a.type}</p>
              <p className="text-xs text-dossier-textDim mb-2">{a.description}</p>
              <p className="text-xs text-dossier-accent">{a.expectedReturn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INSIDER ALERTS */}
      <div className="panel-glass rounded-lg p-3 md:p-4 border-l-4 border-dossier-warning">
        <h3 className="text-xs md:text-sm font-mono text-dossier-textDim uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertCircle size={12} md:size={14} /> Red Flag Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Saudi Arabia:</strong> Visa restrictions tightening for expat lawyers; Saudization pressure reaching senior associate level</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Hong Kong:</strong> PRC firms (Fangda, Han Kun) aggressively poaching international firm talent</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>India:</strong> Talent wars inflating salaries; IBC timeline delays frustrating clients</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>UAE:</strong> Rent/operating costs up 25% YoY; Saudi competition diverting capital</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Singapore:</strong> Mid-senior talent shortage acute; clients demanding ASEAN-wide capability</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">▸</span>
              <span><strong>Japan:</strong> English fluency gaps at senior levels limiting cross-border work</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, suffix, color }: { icon: any, label: string, value: string | number, suffix: string, color: string }) {
  return (
    <div className="panel-glass rounded-lg p-2 md:p-3 border-glow">
      <div className={`flex items-center gap-1 md:gap-2 mb-1 ${color}`}>
        <span className="scale-75 md:scale-100">{icon}</span>
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-base md:text-xl font-bold">
        {value}<span className="text-[10px] md:text-xs text-dossier-textDim ml-1">{suffix}</span>
      </div>
    </div>
  );
}
