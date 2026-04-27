import { useState, useMemo } from 'react';
import { Search, ExternalLink, BookOpen, Globe, Shield, Database, Scale, Filter, Tag, Lock, Unlock, Sparkles, Bookmark, ChevronDown } from 'lucide-react';

interface LegalResource {
  id: string;
  name: string;
  url: string;
  description: string;
  commentary: string;
  category: string;
  jurisdiction: string;
  type: 'Open' | 'Commercial' | 'Freemium';
  tags: string[];
  featured?: boolean;
}

const RESOURCES: LegalResource[] = [
  // INDIA
  {
    id: 'india-1',
    name: 'Indian Kanoon',
    url: 'https://indiankanoon.org/',
    description: 'Aggregated judgments from Supreme Court, High Courts, and tribunals with full-text search.',
    commentary: 'The gold standard for free Indian legal research. Fast full-text search across millions of judgments. Essential for any India-focused litigation or regulatory work.',
    category: 'India',
    jurisdiction: 'India',
    type: 'Open',
    tags: ['Judgments', 'Full-text Search', 'SC/HC', 'Tribunals'],
    featured: true
  },
  {
    id: 'india-2',
    name: 'India Code',
    url: 'https://www.indiacode.nic.in/',
    description: 'Official central repository of Central and State Acts and subordinate legislation.',
    commentary: 'The official source for all Indian statutes. If you need the authoritative text of any Indian law, start here before going to commercial databases.',
    category: 'India',
    jurisdiction: 'India',
    type: 'Open',
    tags: ['Statutes', 'Legislation', 'Central Acts', 'State Acts']
  },
  {
    id: 'india-3',
    name: 'SCC Online (EBC)',
    url: 'https://www.scconline.com/',
    description: 'Leading commercial database for Supreme Court, High Court judgments and legal commentary.',
    commentary: 'The premium choice for Indian legal research. Headnotes are exceptionally well-written. Worth the subscription for any serious India practice.',
    category: 'India',
    jurisdiction: 'India',
    type: 'Commercial',
    tags: ['Judgments', 'Commentary', 'Headnotes', 'Premium'],
    featured: true
  },
  {
    id: 'india-4',
    name: 'Manupatra',
    url: 'https://www.manupatrafast.com/',
    description: 'Comprehensive commercial Indian legal research platform with statutes, judgments, and regulatory updates.',
    commentary: 'Strong on regulatory updates and notifications. Often faster than SCC on new SEBI, RBI, and MCA circulars. A must-have for corporate lawyers.',
    category: 'India',
    jurisdiction: 'India',
    type: 'Commercial',
    tags: ['Regulatory', 'Corporate', 'SEBI', 'RBI', 'MCA']
  },
  {
    id: 'india-5',
    name: 'eCourts / NJDG',
    url: 'https://njdg.ecourts.gov.in/',
    description: 'National Judicial Data Grid - case status and national judicial statistics.',
    commentary: 'Essential for case tracking and understanding court backlog. The pendency data is eye-opening and useful for client advisory on dispute resolution timelines.',
    category: 'India',
    jurisdiction: 'India',
    type: 'Open',
    tags: ['Case Status', 'Statistics', 'eCourts', 'Pendency']
  },
  {
    id: 'india-6',
    name: 'OpenNyAI Datasets',
    url: 'https://opennyai.org/datasets',
    description: 'Indian legal NLP datasets for judgment summarization, QA, and translation.',
    commentary: 'Cutting-edge resource for legal tech builders. If you are building AI tools for Indian legal practice, these datasets are the starting point.',
    category: 'India',
    jurisdiction: 'India',
    type: 'Open',
    tags: ['Legal Tech', 'AI/ML', 'NLP', 'Open Data']
  },

  // CHINA
  {
    id: 'china-1',
    name: 'National Laws & Regulations Database',
    url: 'https://flk.npc.gov.cn/',
    description: 'Official centralized repository of PRC laws and regulations in Chinese.',
    commentary: 'The authoritative source for Chinese legislation. Recently modernized interface. Use with Google Translate or have a Chinese-speaking associate verify.',
    category: 'China',
    jurisdiction: 'China',
    type: 'Open',
    tags: ['Statutes', 'PRC Law', 'Chinese', 'Official'],
    featured: true
  },
  {
    id: 'china-2',
    name: 'China Judgments Online (Wenshu)',
    url: 'https://wenshu.court.gov.cn/',
    description: 'Supreme People\'s Court open repository of court judgments.',
    commentary: 'Massive but often slow. Coverage has narrowed recently for politically sensitive cases. Still essential for understanding Chinese judicial reasoning.',
    category: 'China',
    jurisdiction: 'China',
    type: 'Open',
    tags: ['Judgments', 'Courts', 'SPC', 'Case Law'],
    featured: true
  },
  {
    id: 'china-3',
    name: 'PKULaw / LawInfoChina',
    url: 'https://www.lawinfochina.com/',
    description: 'Comprehensive Chinese legal database with English translations.',
    commentary: 'The best English-language resource for Chinese law. English translations are generally reliable. PKU\'s legal database is the standard for international firms.',
    category: 'China',
    jurisdiction: 'China',
    type: 'Commercial',
    tags: ['English', 'Translations', 'Comprehensive', 'PRC']
  },
  {
    id: 'china-4',
    name: 'OpenLaw (开放法学)',
    url: 'https://openlaw.cn/',
    description: 'Open legal case platform and analytics with variable coverage.',
    commentary: 'Good for analytics and trend spotting. Coverage varies by region. Useful complement to Wenshu when you need analytics rather than just raw judgments.',
    category: 'China',
    jurisdiction: 'China',
    type: 'Freemium',
    tags: ['Analytics', 'Cases', 'Open Data', 'Trends']
  },

  // SINGAPORE
  {
    id: 'singapore-1',
    name: 'LawNet (Singapore)',
    url: 'https://www.lawnet.sg/',
    description: 'Official Singapore legal research portal by the Academy of Law.',
    commentary: 'The official Singapore legal research tool. Excellent for Singapore cases, legislation, and treaties. Subscription required but worth it for Singapore practice.',
    category: 'Singapore',
    jurisdiction: 'Singapore',
    type: 'Commercial',
    tags: ['Official', 'Cases', 'Legislation', 'Treaties'],
    featured: true
  },
  {
    id: 'singapore-2',
    name: 'Singapore Statutes Online',
    url: 'https://sso.agc.gov.sg/',
    description: 'Official Singapore legislation database maintained by the Attorney-General\'s Chambers.',
    commentary: 'Free, authoritative, and well-maintained. Singapore\'s government does legal tech better than most. Start here for any Singapore statutory research.',
    category: 'Singapore',
    jurisdiction: 'Singapore',
    type: 'Open',
    tags: ['Statutes', 'AGC', 'Official', 'Free']
  },
  {
    id: 'singapore-3',
    name: 'Supreme Court Judgments (Singapore)',
    url: 'https://www.supremecourt.gov.sg/',
    description: 'Official Supreme Court of Singapore judgments database.',
    commentary: 'Singapore judgments are beautifully reasoned and highly influential across Commonwealth Asia. Essential reading for arbitration and commercial law.',
    category: 'Singapore',
    jurisdiction: 'Singapore',
    type: 'Open',
    tags: ['Judgments', 'SC', 'Commercial', 'Arbitration']
  },

  // HONG KONG
  {
    id: 'hk-1',
    name: 'HKLII (Hong Kong Legal Information Institute)',
    url: 'https://www.hklii.hk/',
    description: 'Free access to Hong Kong cases, legislation, and legal information.',
    commentary: 'The AustLII of Hong Kong. Free and comprehensive. If you cannot afford Lexis or Westlaw for HK, this is your go-to.',
    category: 'Hong Kong',
    jurisdiction: 'Hong Kong',
    type: 'Open',
    tags: ['Cases', 'Legislation', 'Free', 'AustLII'],
    featured: true
  },
  {
    id: 'hk-2',
    name: 'e-Legislation (Hong Kong)',
    url: 'https://www.elegislation.gov.hk/',
    description: 'Official Hong Kong legislation database with bilingual search.',
    commentary: 'Bilingual English/Chinese legislation. The official source. Hong Kong\'s legal system is unique - always verify against the official database.',
    category: 'Hong Kong',
    jurisdiction: 'Hong Kong',
    type: 'Open',
    tags: ['Bilingual', 'Statutes', 'Official', 'English/Chinese']
  },

  // JAPAN
  {
    id: 'japan-1',
    name: 'e-Gov Laws & Regulations (Japan)',
    url: 'https://elaws.e-gov.go.jp/',
    description: 'Official Japanese government legislation database in Japanese.',
    commentary: 'The authoritative source for Japanese law. Japanese language only. Use with a native-speaking associate or professional translation service.',
    category: 'Japan',
    jurisdiction: 'Japan',
    type: 'Open',
    tags: ['Statutes', 'Japanese', 'Official', 'e-Gov']
  },
  {
    id: 'japan-2',
    name: 'Japan Legal Information Institute (JaLII)',
    url: 'https://www.japaneselawtranslation.go.jp/',
    description: 'English translations of Japanese laws and regulations.',
    commentary: 'Government-provided English translations. Good for initial research but always confirm with Japanese original for binding interpretation.',
    category: 'Japan',
    jurisdiction: 'Japan',
    type: 'Open',
    tags: ['English', 'Translations', 'Government', 'Statutes']
  },

  // AUSTRALIA
  {
    id: 'aus-1',
    name: 'AustLII',
    url: 'https://www.austlii.edu.au/',
    description: 'Australasian Legal Information Institute - free access to Australian and NZ law.',
    commentary: 'One of the world\'s best free legal databases. Australia and New Zealand cases, legislation, and journals. The model that inspired HKLII and others.',
    category: 'Australia',
    jurisdiction: 'Australia',
    type: 'Open',
    tags: ['Cases', 'Legislation', 'Journals', 'Free'],
    featured: true
  },
  {
    id: 'aus-2',
    name: 'Federal Court of Australia',
    url: 'https://www.fedcourt.gov.au/',
    description: 'Official Federal Court judgments and practice notes.',
    commentary: 'Australian Federal Court judgments are influential across the Asia-Pacific. Particularly strong on commercial, competition, and intellectual property law.',
    category: 'Australia',
    jurisdiction: 'Australia',
    type: 'Open',
    tags: ['Federal Court', 'Judgments', 'Commercial', 'IP']
  },

  // ARBITRATION
  {
    id: 'arb-1',
    name: 'ICC Dispute Resolution Library',
    url: 'https://library.iccdrl.com/',
    description: 'ICC arbitration awards, rules, and dispute resolution resources.',
    commentary: 'Premium ICC arbitration research. Awards are redacted but still highly instructive. Essential for ICC arbitration practitioners.',
    category: 'Arbitration',
    jurisdiction: 'Global',
    type: 'Commercial',
    tags: ['ICC', 'Awards', 'Arbitration', 'Premium'],
    featured: true
  },
  {
    id: 'arb-2',
    name: 'Kluwer Arbitration',
    url: 'https://arbitration.kluwerlawonline.com/',
    description: 'Leading commercial arbitration research platform with cases, rules, and commentary.',
    commentary: 'The Bloomberg of arbitration research. Comprehensive coverage of investment and commercial arbitration. Worth every penny for arbitration-focused practices.',
    category: 'Arbitration',
    jurisdiction: 'Global',
    type: 'Commercial',
    tags: ['Investment', 'Commercial', 'Cases', 'Commentary'],
    featured: true
  },
  {
    id: 'arb-3',
    name: 'Global Arbitration Review',
    url: 'https://globalarbitrationreview.com/',
    description: 'News, analysis, and rankings for international arbitration.',
    commentary: 'The industry bible for arbitration intelligence. GAR 30 rankings drive partner lateral decisions. Essential reading for any arbitration practice leader.',
    category: 'Arbitration',
    jurisdiction: 'Global',
    type: 'Freemium',
    tags: ['News', 'Rankings', 'GAR 30', 'Analysis']
  },
  {
    id: 'arb-4',
    name: 'Investment Arbitration Reporter',
    url: 'https://www.iareporter.com/',
    description: 'Specialized reporting on investment treaty arbitration cases.',
    commentary: 'The must-read for ISDS practitioners. Fast, accurate reporting on ICSID, UNCITRAL, and PCA cases. Subscription is non-negotiable for investment arbitration.',
    category: 'Arbitration',
    jurisdiction: 'Global',
    type: 'Commercial',
    tags: ['ISDS', 'Investment', 'ICSID', 'Specialized']
  },

  // ESG / CLIMATE
  {
    id: 'esg-1',
    name: 'Climate Change Laws of the World',
    url: 'https://climate-laws.org/',
    description: 'Database of climate change legislation and policies globally.',
    commentary: 'Invaluable for cross-border climate law advisory. Map-based interface makes it easy to compare jurisdictions. Free and maintained by Grantham Institute.',
    category: 'ESG & Climate',
    jurisdiction: 'Global',
    type: 'Open',
    tags: ['Climate', 'Legislation', 'Policy', 'Global'],
    featured: true
  },
  {
    id: 'esg-2',
    name: 'ESG Legal Database (Singapore)',
    url: 'https://www.mas.gov.sg/',
    description: 'Monetary Authority of Singapore ESG regulations and guidelines.',
    commentary: 'Singapore is the ESG disclosure hub of Asia. MAS guidelines on green bonds, sustainable finance, and ESG disclosures are setting the regional standard.',
    category: 'ESG & Climate',
    jurisdiction: 'Singapore',
    type: 'Open',
    tags: ['ESG', 'MAS', 'Green Finance', 'Disclosure']
  },

  // LEGAL TECH
  {
    id: 'tech-1',
    name: 'Legal Hackers',
    url: 'https://legalhackers.org/',
    description: 'Global community exploring intersections of law and technology.',
    commentary: 'The best community for staying on top of legal tech trends. Local chapters in most major Asian cities. Attend their meetups for networking with legal tech founders.',
    category: 'Legal Tech',
    jurisdiction: 'Global',
    type: 'Open',
    tags: ['Community', 'Legal Tech', 'Events', 'Network']
  },
  {
    id: 'tech-2',
    name: 'Stanford CodeX',
    url: 'https://codex.stanford.edu/',
    description: 'Stanford Center for Legal Informatics research and publications.',
    commentary: 'Academic cutting-edge legal tech research. Their publications on computational law and legal AI are ahead of the market by 2-3 years.',
    category: 'Legal Tech',
    jurisdiction: 'Global',
    type: 'Open',
    tags: ['Research', 'Academic', 'AI', 'Computational Law']
  },
  {
    id: 'tech-3',
    name: 'Legaltech Hub',
    url: 'https://www.legaltechhub.com/',
    description: 'Directory and reviews of legal technology solutions.',
    commentary: 'The most comprehensive legal tech directory. Filter by practice area, jurisdiction, and firm size. Invaluable for legal tech procurement decisions.',
    category: 'Legal Tech',
    jurisdiction: 'Global',
    type: 'Freemium',
    tags: ['Directory', 'Reviews', 'Procurement', 'Tools']
  }
];

const CATEGORIES = [
  'All',
  'Featured',
  'India',
  'China',
  'Singapore',
  'Hong Kong',
  'Japan',
  'Australia',
  'Arbitration',
  'ESG & Climate',
  'Legal Tech'
];

const TYPE_COLORS = {
  'Open': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', icon: Unlock },
  'Commercial': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', icon: Lock },
  'Freemium': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20', icon: Database }
};

export function LegalResourcesHub() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = RESOURCES;
    if (activeCategory === 'Featured') {
      list = list.filter(r => r.featured);
    } else if (activeCategory !== 'All') {
      list = list.filter(r => r.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.commentary.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.jurisdiction.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  const featuredCount = RESOURCES.filter(r => r.featured).length;
  const openCount = RESOURCES.filter(r => r.type === 'Open').length;
  const commercialCount = RESOURCES.filter(r => r.type === 'Commercial').length;

  return (
    <div className="min-h-screen bg-dossier-bg">
      {/* Substack-style Header */}
      <div className="border-b border-dossier-border bg-dossier-panel/40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded bg-dossier-accent/20 flex items-center justify-center border border-dossier-accent/40">
              <Bookmark size={16} className="text-dossier-accent" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-dossier-textDim">Curated Intelligence</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Legal Research Resources</h1>
          <p className="text-sm md:text-base text-dossier-textDim max-w-2xl leading-relaxed">
            A hand-curated collection of the best legal databases, research tools, and intelligence sources 
            for Asia-Pacific practice. Organized by jurisdiction and practice area, with honest commentary on 
            what each tool is actually good for.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-dossier-panel border border-dossier-border">
              <Sparkles size={10} className="inline mr-1 text-dossier-accent" />
              {RESOURCES.length} Resources
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Unlock size={10} className="inline mr-1" />
              {openCount} Open Access
            </span>
            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Lock size={10} className="inline mr-1" />
              {commercialCount} Commercial
            </span>
            <span className="px-3 py-1.5 rounded-full bg-dossier-accent/10 border border-dossier-accent/20 text-dossier-accent">
              <Bookmark size={10} className="inline mr-1" />
              {featuredCount} Editor\'s Picks
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        {/* Search & Filter Bar */}
        <div className="sticky top-[72px] z-30 bg-dossier-bg/95 backdrop-blur-md pb-4 pt-2">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dossier-textDim" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search resources, tags, jurisdictions..."
                className="w-full pl-9 pr-4 py-2.5 bg-dossier-panel border border-dossier-border rounded-lg text-sm focus:outline-none focus:border-dossier-accent/50 placeholder:text-dossier-textDim/60"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
              <Filter size={12} className="text-dossier-textDim flex-shrink-0 hidden md:block" />
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-dossier-accent/20 text-dossier-accent border border-dossier-accent/40'
                      : 'bg-dossier-panel border border-dossier-border text-dossier-textDim hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-dossier-textDim font-mono">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {search && ` for "${search}"`}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filtered.map(resource => {
            const typeStyle = TYPE_COLORS[resource.type];
            const TypeIcon = typeStyle.icon;
            const isExpanded = expandedId === resource.id;

            return (
              <div
                key={resource.id}
                className={`group panel-glass rounded-lg border transition-all hover:border-dossier-accent/30 ${
                  resource.featured ? 'border-dossier-accent/20' : 'border-dossier-border/60'
                }`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="text-base md:text-lg font-semibold group-hover:text-dossier-accent transition-colors">
                          {resource.name}
                        </h3>
                        {resource.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-dossier-accent/15 text-dossier-accent border border-dossier-accent/30">
                            Editor\'s Pick
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-dossier-textDim leading-relaxed mb-3">
                        {resource.description}
                      </p>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 rounded-lg bg-dossier-panelHover border border-dossier-border hover:border-dossier-accent/40 hover:bg-dossier-accent/10 transition-all"
                    >
                      <ExternalLink size={14} className="text-dossier-textDim hover:text-dossier-accent" />
                    </a>
                  </div>

                  {/* Tags & Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>
                      <TypeIcon size={10} />
                      {resource.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-dossier-panel border border-dossier-border text-dossier-textDim">
                      <Globe size={10} />
                      {resource.jurisdiction}
                    </span>
                    {resource.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-dossier-panelHover border border-dossier-border/50 text-dossier-textDim">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Commentary - Substack-style curation note */}
                  <div className="mt-3">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : resource.id)}
                      className="flex items-center gap-1 text-xs text-dossier-accent hover:text-dossier-accent/80 transition-colors"
                    >
                      <BookOpen size={12} />
                      {isExpanded ? 'Hide commentary' : 'Why this matters'}
                      <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {isExpanded && (
                      <div className="mt-2 p-3 bg-dossier-panelHover/30 rounded border-l-2 border-dossier-accent/40">
                        <p className="text-sm text-dossier-text leading-relaxed italic">
                          "{resource.commentary}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={32} className="mx-auto text-dossier-textDim mb-3" />
            <p className="text-sm text-dossier-textDim">No resources found matching your search.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-2 text-xs text-dossier-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-dossier-panel/30 rounded-lg border border-dossier-border/50">
          <div className="flex items-start gap-3">
            <Scale size={16} className="text-dossier-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">About This Collection</p>
              <p className="text-xs text-dossier-textDim leading-relaxed">
                This database is curated based on real-world usage by Asia-Pacific law firms and in-house teams. 
                "Open" means freely accessible without subscription. "Commercial" requires paid access. 
                "Freemium" offers limited free access with premium tiers. Editor\'s Picks are resources 
                we consider essential for practice in that jurisdiction or area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
