import { LegalSystem } from '../data/dossierData';
import { Building2, Scale, TrendingUp, AlertCircle, FileText, Users, Network, BookOpen, Briefcase, DollarSign, Shield, Activity, ChevronRight, Calendar, BarChart3, Target, Zap, Award, PieChart, Crown, AlertTriangle, Eye } from 'lucide-react';

interface Props {
  system: LegalSystem | null;
  onClose: () => void;
}

export function DossierCard({ system, onClose }: Props) {
  if (!system) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2 md:p-4" onClick={onClose}>
      <div className="panel-glass rounded-xl max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden border border-dossier-border shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between p-3 md:p-6 border-b border-dossier-border" style={{ background: `linear-gradient(135deg, ${system.color}20 0%, ${system.color}05 50%, transparent 100%)` }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-[0_0_15px] flex-shrink-0" style={{ background: system.color, boxShadow: `0 0 15px ${system.color}50` }} />
              <h2 className="text-xl md:text-3xl font-bold truncate">{system.name}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 md:mt-3 text-xs md:text-sm">
              <Badge color={system.color}><Scale size={10} /> {system.type}</Badge>
              <Badge color="#f59e0b"><TrendingUp size={10} /> {system.momentum}/10</Badge>
              <Badge color="#6366f1">{system.region}</Badge>
              <span className="text-dossier-textDim hidden sm:inline">{system.marketSize}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-dossier-textDim hover:text-white transition-colors p-2 rounded-lg hover:bg-dossier-panelHover flex-shrink-0 touch-target">
            <span className="text-xl md:text-2xl">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 md:p-6 overflow-y-auto max-h-[75vh] md:max-h-[70vh] scrollbar-thin space-y-4 md:space-y-6">
          
          {/* Description */}
          <div className="p-4 bg-dossier-panelHover/30 rounded-lg border border-dossier-border/50">
            <p className="text-sm leading-relaxed">{system.description}</p>
          </div>

          {/* Market Size Stats */}
          {system.legalMarketSize && (
            <Section icon={<BarChart3 size={14} />} title="Legal Market Overview" accent>
              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Lawyers" value={system.legalMarketSize.lawyers} />
                <StatBox label="Top Firms Revenue" value={system.legalMarketSize.topFirmsRevenue} />
                <StatBox label="Growth Rate" value={system.legalMarketSize.growthRate} />
              </div>
            </Section>
          )}

          {/* Key Statutes */}
          {system.keyStatutes && system.keyStatutes.length > 0 && (
            <Section icon={<BookOpen size={14} />} title="Key Statutes & Legislation" accent>
              <div className="space-y-2">
                {system.keyStatutes.map((statute, i) => (
                  <div key={i} className="p-3 bg-dossier-panelHover/20 rounded border-l-2" style={{ borderLeftColor: system.color }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{statute.name}</span>
                      <span className="text-xs font-mono text-dossier-textDim">{statute.year}</span>
                    </div>
                    <p className="text-xs text-dossier-textDim">{statute.impact}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Major Deals */}
          {system.majorDeals && system.majorDeals.length > 0 && (
            <Section icon={<Briefcase size={14} />} title="Major Transactions" accent>
              <div className="grid grid-cols-2 gap-2">
                {system.majorDeals.map((deal, i) => (
                  <div key={i} className="p-3 bg-dossier-accentDim/10 rounded border border-dossier-accent/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{deal.name}</span>
                      <span className="text-xs text-dossier-accent font-mono">{deal.value}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-dossier-textDim">
                      <span>{deal.year}</span>
                      <span>•</span>
                      <span>{deal.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Two Column: Regulators & Firms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section icon={<Building2 size={14} />} title="Key Regulators">
              <div className="flex flex-wrap gap-2">
                {system.keyRegulators.map(r => (
                  <span key={r} className="px-2 py-1 text-xs bg-dossier-border/50 rounded border border-dossier-border">{r}</span>
                ))}
              </div>
            </Section>

            <Section icon={<Users size={14} />} title="Top Firms">
              <div className="flex flex-wrap gap-2">
                {system.topFirms.map(f => (
                  <span key={f} className="px-2 py-1 text-xs bg-dossier-accentDim/20 text-dossier-accent rounded border border-dossier-accent/30">{f}</span>
                ))}
              </div>
            </Section>
          </div>

          {/* Two Column: Booming Areas & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section icon={<TrendingUp size={14} />} title="Booming Practice Areas" accent>
              <ul className="space-y-1.5">
                {system.boomingAreas.map((a, i) => (
                  <li key={i} className="text-sm flex items-start gap-2 p-1.5 rounded hover:bg-dossier-panelHover/30 transition-colors">
                    <span className="text-dossier-accent mt-0.5">▸</span> {a}
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={<AlertCircle size={14} />} title="Market Gaps & Needs" warning>
              <ul className="space-y-1.5">
                {system.gaps.map((g, i) => (
                  <li key={i} className="text-sm flex items-start gap-2 p-1.5 rounded hover:bg-dossier-warningDim/10 transition-colors">
                    <span className="text-dossier-warning mt-0.5">▸</span> {g}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Talent Market */}
          {system.talentMarket && (
            <Section icon={<DollarSign size={14} />} title="Talent Market" accent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                <div className="p-3 bg-dossier-panelHover/20 rounded">
                  <div className="text-xs text-dossier-textDim mb-1">Partner Compensation</div>
                  <div className="text-sm font-medium">{system.talentMarket.avgPartnerSalary}</div>
                </div>
                <div className="p-3 bg-dossier-panelHover/20 rounded">
                  <div className="text-xs text-dossier-textDim mb-1">Associate Hiring</div>
                  <div className="text-sm">{system.talentMarket.associateHiring}</div>
                </div>
                <div className="p-3 bg-dossier-panelHover/20 rounded">
                  <div className="text-xs text-dossier-textDim mb-1">Lateral Movement</div>
                  <div className="text-sm">{system.talentMarket.lateralMoves}</div>
                </div>
              </div>
            </Section>
          )}

          {/* Barriers to Entry */}
          {system.barriersToEntry && system.barriersToEntry.length > 0 && (
            <Section icon={<Shield size={14} />} title="Barriers to Entry" warning>
              <div className="p-2 md:p-3 bg-dossier-warningDim/10 rounded border border-dossier-warning/20">
                <ul className="space-y-1.5">
                  {system.barriersToEntry.map((b, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-dossier-warning">•</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          )}

          {/* Regulatory Trends */}
          {system.regulatoryTrends && system.regulatoryTrends.length > 0 && (
            <Section icon={<Activity size={14} />} title="Regulatory Trends" accent>
              <div className="flex flex-wrap gap-2">
                {system.regulatoryTrends.map((t, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs bg-dossier-infoDim/20 text-dossier-info rounded-full border border-dossier-info/30">
                    {t}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Comparison Notes */}
          {system.comparisonNotes && system.comparisonNotes.length > 0 && (
            <Section icon={<ChevronRight size={14} />} title="Comparative Advantages">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {system.comparisonNotes.map((note, i) => (
                  <div key={i} className="p-3 bg-dossier-panelHover/20 rounded border border-dossier-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-dossier-textDim">vs</span>
                      <span className="font-medium text-sm">{note.vs}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-dossier-accent">+</span>
                        <span>{note.advantage}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-dossier-warning">-</span>
                        <span>{note.disadvantage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Recent Developments */}
          {system.recentDevelopments && system.recentDevelopments.length > 0 && (
            <Section icon={<Calendar size={14} />} title="Recent Developments" accent>
              <div className="space-y-2">
                {system.recentDevelopments.map((dev, i) => (
                  <div key={i} className="p-3 bg-dossier-panelHover/20 rounded border-l-2 border-dossier-accent/50">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-dossier-accent">{dev.date}</span>
                      <span className="font-medium text-sm">{dev.title}</span>
                    </div>
                    <p className="text-xs text-dossier-textDim">{dev.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* PITCH INTELLIGENCE SECTIONS */}
          
          {/* Deal Flow */}
          {system.dealFlow && (
            <Section icon={<PieChart size={14} />} title="Deal Flow Intelligence" accent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4">
                <div className="p-2 md:p-3 bg-dossier-accentDim/10 rounded border border-dossier-accent/20">
                  <div className="text-[10px] md:text-xs text-dossier-textDim mb-1">Annual Deal Value</div>
                  <div className="text-base md:text-lg font-bold text-dossier-accent">{system.dealFlow.annualDealValue}</div>
                </div>
                <div className="p-2 md:p-3 bg-dossier-panelHover/20 rounded">
                  <div className="text-[10px] md:text-xs text-dossier-textDim mb-1">Pipeline Outlook</div>
                  <div className="text-xs md:text-sm">{system.dealFlow.pipelineOutlook}</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-dossier-textDim mb-2">Top Sectors</div>
                <div className="flex flex-wrap gap-2">
                  {system.dealFlow.topSectors.map((s, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-dossier-panelHover rounded border border-dossier-border/50">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-dossier-textDim mb-2">Active PE Firms</div>
                <div className="flex flex-wrap gap-2">
                  {system.dealFlow.activePE.map((pe, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-dossier-infoDim/20 text-dossier-info rounded-full">{pe}</span>
                  ))}
                </div>
              </div>
            </Section>
          )}

          {/* Insider Intel */}
          {system.insiderIntel && (
            <Section icon={<Eye size={14} />} title="Insider Intelligence" warning>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4">
                <div>
                  <div className="text-xs text-emerald-400 mb-2 flex items-center gap-1"><Award size={12} /> Winning Firms</div>
                  <ul className="space-y-1">
                    {system.insiderIntel.winningFirms.slice(0, 4).map((f, i) => (
                      <li key={i} className="text-xs text-dossier-textDim">• {f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs text-rose-400 mb-2 flex items-center gap-1"><AlertTriangle size={12} /> Losing Talent</div>
                  <ul className="space-y-1">
                    {system.insiderIntel.losingTalent.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-xs text-dossier-textDim">• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-dossier-warningDim/10 rounded border border-dossier-warning/20 mb-3">
                <div className="text-xs text-dossier-warning mb-1 flex items-center gap-1"><Target size={12} /> Hidden Opportunities</div>
                <div className="flex flex-wrap gap-2">
                  {system.insiderIntel.hiddenOpportunities.slice(0, 4).map((opp, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-dossier-bg rounded border border-dossier-border/50">{opp}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-rose-500/10 rounded border border-rose-500/20 mb-3">
                <div className="text-xs text-rose-400 mb-1 flex items-center gap-1"><AlertCircle size={12} /> Red Flags</div>
                <ul className="space-y-1">
                  {system.insiderIntel.redFlags.slice(0, 3).map((r, i) => (
                    <li key={i} className="text-xs text-dossier-textDim">• {r}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/30">
                <div className="text-xs text-emerald-400 mb-1 flex items-center gap-1"><Zap size={12} /> Market Timing</div>
                <p className="text-sm">{system.insiderIntel.marketTiming}</p>
              </div>
            </Section>
          )}

          {/* Competitive Landscape */}
          {system.competitiveLandscape && (
            <Section icon={<Crown size={14} />} title="Competitive Landscape">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/20">
                  <div className="text-xs text-yellow-400 mb-2 font-mono">TIER 1</div>
                  <div className="flex flex-wrap gap-1">
                    {system.competitiveLandscape.tier1.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-dossier-bg rounded">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-slate-500/10 rounded border border-slate-500/20">
                  <div className="text-xs text-slate-400 mb-2 font-mono">TIER 2</div>
                  <div className="flex flex-wrap gap-1">
                    {system.competitiveLandscape.tier2.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-dossier-bg rounded">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-dossier-panelHover/30 rounded">
                  <div className="text-xs text-dossier-textDim mb-2 font-mono">BOUTIQUES</div>
                  <div className="flex flex-wrap gap-1">
                    {system.competitiveLandscape.boutiques.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-dossier-bg rounded">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-dossier-accentDim/10 rounded">
                  <div className="text-xs text-dossier-accent mb-2 font-mono">NEW ENTRANTS</div>
                  <div className="flex flex-wrap gap-1">
                    {system.competitiveLandscape.newEntrants.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-dossier-bg rounded">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Arbitrage Opportunities */}
          {system.arbitrageOpportunities && system.arbitrageOpportunities.length > 0 && (
            <Section icon={<Target size={14} />} title="Arbitrage Opportunities" accent>
              <div className="space-y-2 md:space-y-3">
                {system.arbitrageOpportunities.map((arb, i) => (
                  <div key={i} className="p-3 bg-gradient-to-r from-dossier-accent/10 to-transparent rounded border-l-2 border-dossier-accent">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{arb.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        arb.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-400' :
                        arb.riskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>{arb.riskLevel} Risk</span>
                    </div>
                    <p className="text-xs text-dossier-textDim mb-2">{arb.description}</p>
                    <p className="text-xs text-dossier-accent font-medium">{arb.expectedReturn}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Partner Intel */}
          {system.partnerIntel && (
            <Section icon={<Users size={14} />} title="Partner Market Intelligence">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
                <StatBox label="Total Partners" value={system.partnerIntel.totalPartners} />
                <StatBox label="Growth" value={system.partnerIntel.partnerGrowth} />
                <StatBox label="2024 Lateral Hires" value={system.partnerIntel.lateralHires2024} />
                <StatBox label="Departed" value={system.partnerIntel.departedPartners} />
                <StatBox label="Years to Partner" value={system.partnerIntel.avgYearsToPartner} />
              </div>
            </Section>
          )}

          {/* Client Intel */}
          {system.clientIntel && (
            <Section icon={<Briefcase size={14} />} title="Client Intelligence">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-3">
                <div className="p-3 bg-dossier-panelHover/20 rounded">
                  <div className="text-xs text-dossier-textDim mb-1">Spending Trend</div>
                  <div className="text-sm font-medium text-emerald-400">{system.clientIntel.clientSpendingTrend}</div>
                </div>
                <div className="p-3 bg-dossier-panelHover/20 rounded">
                  <div className="text-xs text-dossier-textDim mb-1">Rate Pressure</div>
                  <div className="text-sm">{system.clientIntel.ratePressure}</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-dossier-textDim mb-2">Key Clients</div>
                <div className="flex flex-wrap gap-2">
                  {system.clientIntel.keyClients.slice(0, 6).map((c, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-dossier-accentDim/20 text-dossier-accent rounded">{c}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-dossier-panelHover/20 rounded">
                <div className="text-xs text-dossier-textDim mb-1">Procurement Changes</div>
                <div className="text-sm">{system.clientIntel.procurementChanges}</div>
              </div>
            </Section>
          )}

          {/* Latest Reform */}
          <Section icon={<Network size={14} />} title="Latest Reform" accent>
            <div className="p-4 bg-gradient-to-r from-dossier-accent/10 to-transparent rounded border-l-2 border-dossier-accent">
              <p className="text-sm">{system.latestReform}</p>
            </div>
          </Section>

          {/* Relationships */}
          <Section icon={<Network size={14} />} title="Regional Relationships">
            <div className="flex flex-wrap gap-2">
              {system.relationships.map(r => (
                <span key={r.target} className="px-3 py-1.5 text-xs bg-dossier-panelHover rounded-full border border-dossier-border/50 flex items-center gap-2">
                  → <span className="font-medium">{r.target.toUpperCase()}</span>
                  <span className="text-dossier-textDim">({r.strength}/10)</span>
                  <span className="text-dossier-textDim">{r.label}</span>
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children, accent, warning }: { icon: any, title: string, children: any, accent?: boolean, warning?: boolean }) {
  return (
    <div className="border-b border-dossier-border/30 pb-4 last:border-0">
      <h3 className={`text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2 ${accent ? 'text-dossier-accent' : warning ? 'text-dossier-warning' : 'text-dossier-textDim'}`}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="px-2 py-1 text-xs rounded flex items-center gap-1.5 border" style={{ borderColor: `${color}40`, background: `${color}15`, color }}>
      {children}
    </span>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-dossier-panelHover/30 rounded border border-dossier-border/50 text-center">
      <div className="text-xs text-dossier-textDim mb-1">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
