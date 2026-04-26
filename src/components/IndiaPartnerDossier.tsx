import { useState, useMemo } from 'react';
import { indiaPartners, firms, locations, practiceAreas, Partner } from '../data/indiaPartnerData';
import { 
  ArrowLeft, Star, MapPin, Briefcase, Award, TrendingUp, 
  Building2, Phone, Mail, Linkedin, ChevronDown, ChevronUp,
  GraduationCap, BookOpen, Users, Clock, Shield,
  ChevronLeft, ChevronRight, Download
} from 'lucide-react';

const PARTNERS_PER_PAGE = 50;

export function IndiaPartnerDossier() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [filterFirm, setFilterFirm] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [filterPractice, setFilterPractice] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPartners = useMemo(() => {
    return indiaPartners.filter(p => {
      const sq = searchQuery.toLowerCase();
      const matchesSearch = !sq || 
        p.name.toLowerCase().includes(sq) ||
        p.firm.toLowerCase().includes(sq) ||
        p.practiceAreas.some(a => a.toLowerCase().includes(sq));
      const matchesFirm = !filterFirm || p.firm === filterFirm;
      const matchesLocation = !filterLocation || p.location === filterLocation;
      const matchesPractice = !filterPractice || p.practiceAreas.includes(filterPractice);
      const matchesTier = !filterTier || p.tier === filterTier;
      return matchesSearch && matchesFirm && matchesLocation && matchesPractice && matchesTier;
    });
  }, [searchQuery, filterFirm, filterLocation, filterPractice, filterTier]);

  const totalPages = Math.ceil(filteredPartners.length / PARTNERS_PER_PAGE);
  const paginatedPartners = filteredPartners.slice((currentPage - 1) * PARTNERS_PER_PAGE, currentPage * PARTNERS_PER_PAGE);

  if (selectedPartner) {
    return <PartnerDetail partner={selectedPartner} onClose={() => setSelectedPartner(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                India Partner Dossier
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">1,200 Legal Professionals</p>
            </div>
            <a href="/india-partners.csv" download className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors">
              <Download size={16} />
              <span className="hidden sm:inline">CSV</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<Users size={18} />} label="Partners" value={indiaPartners.length} color="from-blue-500 to-cyan-500" />
          <StatCard icon={<Building2 size={18} />} label="Firms" value={firms.length} color="from-purple-500 to-pink-500" />
          <StatCard icon={<Award size={18} />} label="Tier 1" value={indiaPartners.filter(p => p.tier === 'Tier 1').length} color="from-amber-500 to-orange-500" />
          <StatCard icon={<TrendingUp size={18} />} label="Avg Momentum" value={`${(indiaPartners.reduce((a, p) => a + p.momentum, 0) / indiaPartners.length).toFixed(1)}/10`} color="from-emerald-500 to-teal-500" />
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search 1,200 partners by name, firm, practice..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <svg className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select value={filterFirm || ''} onChange={(e) => { setFilterFirm(e.target.value || null); setCurrentPage(1); }} className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option value="">All Firms</option>
                {firms.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={filterLocation || ''} onChange={(e) => { setFilterLocation(e.target.value || null); setCurrentPage(1); }} className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option value="">All Locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={filterPractice || ''} onChange={(e) => { setFilterPractice(e.target.value || null); setCurrentPage(1); }} className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option value="">All Practices</option>
                {practiceAreas.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={filterTier || ''} onChange={(e) => { setFilterTier(e.target.value || null); setCurrentPage(1); }} className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option value="">All Tiers</option>
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Rising Star">Rising Star</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior Associate">Senior Associate</option>
              </select>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{filteredPartners.length.toLocaleString()} partners found</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
          
          {paginatedPartners.map(partner => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="w-full text-left bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all active:scale-[0.99]"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                  partner.tier === 'Tier 1' ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' :
                  partner.tier === 'Tier 2' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' :
                  'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                }`}>
                  {partner.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white truncate">{partner.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      partner.tier === 'Tier 1' ? 'bg-amber-500/20 text-amber-400' :
                      partner.tier === 'Tier 2' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>{partner.tier}</span>
                  </div>
                  <p className="text-sm text-slate-400">{partner.role} • {partner.firm}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} /> {partner.location}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12} /> {partner.experience} yrs</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Star size={12} className="text-amber-400" /> M{partner.momentum}</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {partner.practiceAreas.slice(0, 3).map(area => (
                      <span key={area} className="text-[10px] bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-500/30"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-slate-400 px-4">{currentPage} / {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-500/30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerDetail({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deals' | 'clients' | 'contact'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              partner.tier === 'Tier 1' ? 'bg-amber-500/20 text-amber-400' :
              partner.tier === 'Tier 2' ? 'bg-blue-500/20 text-blue-400' :
              'bg-emerald-500/20 text-emerald-400'
            }`}>{partner.tier}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 ${
              partner.tier === 'Tier 1' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
              partner.tier === 'Tier 2' ? 'bg-gradient-to-br from-blue-500 to-purple-600' :
              'bg-gradient-to-br from-emerald-500 to-teal-600'
            }`}>
              {partner.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{partner.name}</h1>
              <p className="text-amber-400 font-medium">{partner.role}</p>
              <p className="text-slate-400">{partner.firm}</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> {partner.location}</span>
                <span className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> {partner.experience} years</span>
                <span className="text-sm text-slate-500 flex items-center gap-1"><GraduationCap size={14} /> {partner.education[0]}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-300 leading-relaxed">{partner.bio}</p>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {partner.practiceAreas.map(area => (
              <span key={area} className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg">{area}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-1 bg-slate-800/30 p-1 rounded-xl">
          {[{ id: 'overview' as const, label: 'Overview', icon: Award }, { id: 'deals' as const, label: 'Deals', icon: Briefcase }, { id: 'clients' as const, label: 'Clients', icon: Users }, { id: 'contact' as const, label: 'Contact', icon: Phone }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Ranking</p>
                <p className="text-sm font-medium">{partner.ranking}</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Momentum</p>
                <p className="text-lg font-bold text-amber-400">{partner.momentum}/10</p>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Shield size={16} className="text-amber-400" /> Key Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {partner.expertise.map(e => <div key={e} className="flex items-center gap-2 text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" />{e}</div>)}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2"><BookOpen size={16} className="text-amber-400" /> Education</h3>
              {partner.education.map(edu => <p key={edu} className="text-sm text-slate-300 mb-1">• {edu}</p>)}
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Award size={16} className="text-amber-400" /> Recognition</h3>
              {partner.recognition.map(rec => <p key={rec} className="text-sm text-slate-300 mb-1">• {rec}</p>)}
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="space-y-3">
            {partner.deals.map((deal, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white">{deal.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{deal.year}</p>
                  </div>
                  <span className="text-amber-400 font-bold">{deal.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partner.clients.map(client => (
              <div key={client} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center"><Building2 size={18} className="text-slate-400" /></div>
                <span className="font-medium text-sm">{client}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-3">
            <a href={`mailto:${partner.email}`} className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"><Mail size={18} className="text-blue-400" /></div>
              <div><p className="text-xs text-slate-500">Email</p><p className="text-sm text-white">{partner.email}</p></div>
            </a>
            <a href={`tel:${partner.phone}`} className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center"><Phone size={18} className="text-green-400" /></div>
              <div><p className="text-xs text-slate-500">Phone</p><p className="text-sm text-white">{partner.phone}</p></div>
            </a>
            {partner.linkedIn && (
              <a href={`https://${partner.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center"><Linkedin size={18} className="text-blue-400" /></div>
                <div><p className="text-xs text-slate-500">LinkedIn</p><p className="text-sm text-white">{partner.linkedIn}</p></div>
              </a>
            )}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-2">Bar Admissions</p>
              <div className="flex gap-2 flex-wrap">
                {partner.barAdmissions.map(bar => <span key={bar} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">{bar}</span>)}
              </div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-2">Languages</p>
              <div className="flex gap-2 flex-wrap">
                {partner.languages.map(lang => <span key={lang} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">{lang}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
