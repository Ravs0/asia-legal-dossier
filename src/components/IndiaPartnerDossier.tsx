import { useState } from 'react';
import { legalSystems } from '../data/dossierData';
import { 
  ArrowLeft, Star, MapPin, Briefcase, Award, TrendingUp, 
  Building2, Phone, Mail, Linkedin, Globe, ChevronDown, ChevronUp,
  GraduationCap, BookOpen, Users, DollarSign, Clock, Shield
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  firm: string;
  role: string;
  practiceAreas: string[];
  location: string;
  experience: number;
  ranking: string;
  deals: { name: string; value: string; year: number }[];
  expertise: string[];
  education: string[];
  clients: string[];
  recognition: string[];
  email: string;
  phone: string;
  linkedIn?: string;
  bio: string;
  momentum: number;
  tier: 'Tier 1' | 'Tier 2' | 'Rising Star';
  languages: string[];
  barAdmissions: string[];
}

const indiaPartners: Partner[] = [
  {
    id: '1', name: 'Shardul Shroff', firm: 'Shardul Amarchand Mangaldas', role: 'Executive Chairman',
    practiceAreas: ['M&A', 'Private Equity', 'Banking & Finance'], location: 'New Delhi',
    experience: 35, ranking: 'Band 1 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Reliance-Future Retail Acquisition', value: '$3.4B', year: 2025 },
      { name: 'HDFC-HDFC Bank Merger', value: '$60B', year: 2023 },
      { name: 'Walmart-Flipkart', value: '$16B', year: 2018 }
    ],
    expertise: ['Cross-border M&A', 'Takeover Regulations', 'Competition Law', 'Joint Ventures'],
    education: ['LLB, University of Delhi', 'LLM, Harvard Law School'],
    clients: ['Reliance Industries', 'HDFC Group', 'Walmart', 'SoftBank', 'Blackstone'],
    recognition: ['Chambers Band 1 - Corporate/M&A', 'India Business Law Journal A-List', 'Legal 500 Eminent Practitioner'],
    email: 'shardul.shroff@amarchand.com', phone: '+91-11-4159-0700',
    linkedIn: 'linkedin.com/in/shardulshroff',
    bio: 'Pioneer of modern Indian corporate law. Led landmark transactions shaping India\'s M&A landscape. Former President of the Society of Indian Law Firms.',
    momentum: 10, tier: 'Tier 1', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court of India']
  },
  {
    id: '2', name: 'Cyril Shroff', firm: 'Cyril Amarchand Mangaldas', role: 'Managing Partner',
    practiceAreas: ['Capital Markets', 'M&A', 'Restructuring'], location: 'Mumbai',
    experience: 32, ranking: 'Band 1 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'LIC IPO', value: '$2.7B', year: 2022 },
      { name: 'Paytm IPO', value: '$2.5B', year: 2021 },
      { name: 'Tata Digital-BigBasket', value: '$1.2B', year: 2021 }
    ],
    expertise: ['IPOs', 'QIPs', 'External Commercial Borrowings', 'Debt Capital Markets'],
    education: ['LLB, Government Law College, Mumbai', 'Solicitor, Bombay Incorporated Law Society'],
    clients: ['LIC', 'Paytm', 'Tata Group', 'Adani Group', 'State Bank of India'],
    recognition: ['Chambers Band 1 - Capital Markets', 'IFLR1000 Market Leader', 'Asian Legal Business Lawyer of the Year'],
    email: 'cyril.shroff@amarchand.com', phone: '+91-22-2496-4455',
    linkedIn: 'linkedin.com/in/cyrilshroff',
    bio: 'Leading authority on Indian capital markets. Instrumental in developing the Indian IPO market. Advises on India\'s largest public offerings.',
    momentum: 10, tier: 'Tier 1', languages: ['English', 'Hindi', 'Marathi'], barAdmissions: ['Bombay HC', 'Supreme Court of India']
  },
  {
    id: '3', name: 'Zia Mody', firm: 'AZB & Partners', role: 'Founding Partner',
    practiceAreas: ['M&A', 'Private Equity', 'Banking & Finance'], location: 'Mumbai',
    experience: 35, ranking: 'Band 1 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Kotak-ING Vysya Bank Merger', value: '$2.5B', year: 2015 },
      { name: 'Vodafone-Idea Merger', value: '$23B', year: 2017 },
      { name: 'Walmart-Flipkart (Secondary)', value: '$16B', year: 2018 }
    ],
    expertise: ['Banking Regulations', 'NBFC Financing', 'Insolvency & Bankruptcy', 'Structured Finance'],
    education: ['BA, St. Xavier\'s College', 'LLB, University of Cambridge'],
    clients: ['Kotak Mahindra Bank', 'Vodafone', 'Standard Chartered', 'Citibank', 'HDFC Bank'],
    recognition: ['Chambers Band 1 - Banking & Finance', 'India Business Law Journal Hall of Fame', 'Economic Times Most Powerful Businesswoman'],
    email: 'zia.mody@azbpartners.com', phone: '+91-22-4072-9999',
    linkedIn: 'linkedin.com/in/ziamody',
    bio: 'India\'s most prominent female corporate lawyer. Founded AZB & Partners which grew into a top-tier firm. Expert in financial sector transactions.',
    momentum: 10, tier: 'Tier 1', languages: ['English', 'Hindi', 'Gujarati'], barAdmissions: ['Bombay HC', 'Supreme Court of India']
  },
  {
    id: '4', name: 'Pallavi Shroff', firm: 'Shardul Amarchand Mangaldas', role: 'Managing Partner',
    practiceAreas: ['Dispute Resolution', 'Insolvency', 'Regulatory'], location: 'New Delhi',
    experience: 28, ranking: 'Band 1 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Essar Steel Insolvency (ArcelorMittal)', value: '$7B', year: 2019 },
      { name: 'Jet Airways Resolution', value: '$3B', year: 2021 }
    ],
    expertise: ['IBC Proceedings', 'NCLT Litigation', 'Commercial Arbitration', 'White Collar Defence'],
    education: ['LLB, Faculty of Law, Delhi University', 'LLM, University of London'],
    clients: ['ArcelorMittal', 'JSW Steel', 'State Bank of India', 'ICICI Bank'],
    recognition: ['Chambers Band 1 - Dispute Resolution', 'Legal 500 Leading Individual', 'India Today Top 50 Lawyers'],
    email: 'pallavi.shroff@amarchand.com', phone: '+91-11-4159-0700',
    bio: 'Leading disputes lawyer with deep expertise in India\'s new insolvency regime. Handles complex cross-border litigation and arbitration.',
    momentum: 9, tier: 'Tier 1', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court of India']
  },
  {
    id: '5', name: 'Ajay Bahl', firm: 'AZB & Partners', role: 'Senior Partner',
    practiceAreas: ['M&A', 'Private Equity', 'Joint Ventures'], location: 'New Delhi',
    experience: 25, ranking: 'Band 1 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Blackstone-Jio Platform Investment', value: '$1.5B', year: 2020 },
      { name: 'KKR-Max Healthcare', value: '$400M', year: 2021 }
    ],
    expertise: ['Private Equity Investments', 'Exit Strategies', 'Growth Capital', 'Fund Formation'],
    education: ['LLB, University of Delhi', 'MBA, IIM Ahmedabad'],
    clients: ['Blackstone', 'KKR', 'General Atlantic', 'Sequoia Capital', 'SoftBank Vision Fund'],
    recognition: ['Chambers Band 1 - Private Equity', 'PE Asia Top Lawyer', 'VCCircle Influencer'],
    email: 'ajay.bahl@azbpartners.com', phone: '+91-11-4150-5555',
    bio: 'India\'s go-to lawyer for private equity transactions. Deep relationships with global PE funds investing in India.',
    momentum: 9, tier: 'Tier 1', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court of India']
  },
  {
    id: '6', name: 'Ashwath Rau', firm: 'AZB & Partners', role: 'Partner',
    practiceAreas: ['Private Equity', 'Venture Capital', 'Technology'], location: 'Bangalore',
    experience: 20, ranking: 'Band 2 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Tiger Global-Flipkart Series', value: '$360M', year: 2014 },
      { name: 'Accel-Ola Series', value: '$210M', year: 2015 },
      { name: 'Sequoia-Zomato Investment', value: '$150M', year: 2018 }
    ],
    expertise: ['Startup Financing', 'ESOP Structuring', 'Down-rounds', 'Cross-border Tech Deals'],
    education: ['LLB, National Law School of India University', 'LLM, NYU School of Law'],
    clients: ['Tiger Global', 'Accel Partners', 'Sequoia Capital India', 'Blume Ventures', 'Matrix Partners'],
    recognition: ['Chambers Band 2 - PE/VC', 'Forbes India Legal Powerlist', 'Legal 500 Next Gen Partner'],
    email: 'ashwath.rau@azbpartners.com', phone: '+91-80-4240-5555',
    bio: 'India\'s leading VC/tech lawyer. Based in Bangalore, the heart of India\'s startup ecosystem. Advises top unicorns and VC funds.',
    momentum: 9, tier: 'Tier 1', languages: ['English', 'Hindi', 'Kannada'], barAdmissions: ['Karnataka HC', 'Delhi HC']
  },
  {
    id: '7', name: 'Akshay Jaitly', firm: 'Trilegal', role: 'Senior Partner',
    practiceAreas: ['M&A', 'Corporate', 'Energy & Infrastructure'], location: 'New Delhi',
    experience: 22, ranking: 'Band 2 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Total-Adani Green Energy', value: '$2.5B', year: 2020 },
      { name: 'Brookfield-REIL Infrastructure', value: '$1B', year: 2021 }
    ],
    expertise: ['Infrastructure Finance', 'Project Finance', 'Power Sector', 'Renewable Energy'],
    education: ['LLB, Faculty of Law, Delhi University', 'BCL, Oxford University'],
    clients: ['Total Energies', 'Brookfield', 'Adani Group', 'Tata Power', 'NTPC'],
    recognition: ['Chambers Band 2 - Projects & Energy', 'Legal 500 Leading Individual', 'India Business Law Journal A-List'],
    email: 'akshay.jaitly@trilegal.com', phone: '+91-11-4168-9900',
    bio: 'Leading infrastructure and energy lawyer. Deep expertise in renewable energy transitions and power sector reforms in India.',
    momentum: 8, tier: 'Tier 2', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court of India']
  },
  {
    id: '8', name: 'Rahul Matthan', firm: 'Trilegal', role: 'Partner',
    practiceAreas: ['Technology', 'Data Privacy', 'Fintech', 'Telecom'], location: 'Bangalore',
    experience: 18, ranking: 'Band 2 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Google-Jio Platform Investment', value: '$4.5B', year: 2020 },
      { name: 'Facebook-Jio Investment', value: '$5.7B', year: 2020 }
    ],
    expertise: ['DPDP Act Compliance', 'Data Localization', 'Cross-border Data Transfer', 'Fintech Regulations', 'Telecom Licensing'],
    education: ['LLB, National Law School of India University', 'LLM, Harvard Law School'],
    clients: ['Google', 'Meta', 'Reliance Jio', 'Paytm', 'Razorpay'],
    recognition: ['Chambers Band 2 - TMT', 'Data Privacy Asia Top Lawyer', 'Legal 500 Rising Star'],
    email: 'rahul.matthan@trilegal.com', phone: '+91-80-4240-8888',
    bio: 'India\'s foremost technology and data privacy lawyer. Advised on landmark Big Tech investments into Jio Platforms. Expert on India\'s new DPDP Act.',
    momentum: 9, tier: 'Tier 2', languages: ['English', 'Hindi', 'Tamil'], barAdmissions: ['Karnataka HC', 'Delhi HC']
  },
  {
    id: '9', name: 'Abhishek Sinha', firm: 'EY India (Parthenon)', role: 'Partner, Strategy & Transactions',
    practiceAreas: ['Due Diligence', 'Valuation', 'Transaction Advisory'], location: 'Mumbai',
    experience: 15, ranking: 'Notable Practitioner - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Bain-Deloitte India Merger Advisory', value: 'N/A', year: 2024 },
      { name: 'Multiple PE Due Diligence', value: '$2B+', year: 2023 }
    ],
    expertise: ['Commercial Due Diligence', 'Valuation Modeling', 'Transaction Structuring', 'Post-merger Integration'],
    education: ['CA, Institute of Chartered Accountants of India', 'MBA, IIM Calcutta'],
    clients: ['Bain & Company', 'Blackstone', 'Advent International', 'Carlyle', 'Warburg Pincus'],
    recognition: ['EY Partner of the Year', 'Deal Watch Advisor of the Year'],
    email: 'abhishek.sinha@ey.com', phone: '+91-22-6192-0000',
    bio: 'Leading transaction advisory specialist bridging legal and financial due diligence. Former investment banker turned advisory partner.',
    momentum: 7, tier: 'Rising Star', languages: ['English', 'Hindi', 'Bengali'], barAdmissions: ['N/A - CA/Advisory']
  },
  {
    id: '10', name: 'Rohit Kumar', firm: 'L&L Partners (Luthra & Luthra)', role: 'Managing Partner',
    practiceAreas: ['Dispute Resolution', 'White Collar Crime', 'Regulatory'], location: 'New Delhi',
    experience: 30, ranking: 'Band 2 - Chambers Asia-Pacific 2026',
    deals: [
      { name: 'Vijay Mallya Extradition Defense', value: 'N/A', year: 2018 },
      { name: 'PNB Fraud Matter', value: '$2B', year: 2018 }
    ],
    expertise: ['Criminal Defense', 'ED Proceedings', 'CBI Investigations', 'SFIO Matters', 'FEMA Violations'],
    education: ['LLB, Faculty of Law, Delhi University', 'Diploma, IALS, London'],
    clients: ['High Net Worth Individuals', 'Banking Clients', 'Corporate Defendants'],
    recognition: ['Chambers Band 2 - Dispute Resolution', 'Legal 500 Leading Individual', 'India Today Power Lawyer'],
    email: 'rohit.kumar@luthra.com', phone: '+91-11-4121-5100',
    bio: 'India\'s leading white-collar defense lawyer. Handles high-profile criminal and regulatory enforcement matters.',
    momentum: 8, tier: 'Tier 2', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court of India']
  }
];

const firms = [...new Set(indiaPartners.map(p => p.firm))];
const locations = [...new Set(indiaPartners.map(p => p.location))];
const practiceAreas = [...new Set(indiaPartners.flatMap(p => p.practiceAreas))];

export function IndiaPartnerDossier() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [filterFirm, setFilterFirm] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [filterPractice, setFilterPractice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPartners = indiaPartners.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.practiceAreas.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFirm = !filterFirm || p.firm === filterFirm;
    const matchesLocation = !filterLocation || p.location === filterLocation;
    const matchesPractice = !filterPractice || p.practiceAreas.includes(filterPractice);
    return matchesSearch && matchesFirm && matchesLocation && matchesPractice;
  });

  if (selectedPartner) {
    return <PartnerDetail partner={selectedPartner} onClose={() => setSelectedPartner(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                India Partner Dossier
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Elite Legal Professionals Directory</p>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<Users size={18} />} label="Partners" value={indiaPartners.length} color="from-blue-500 to-cyan-500" />
          <StatCard icon={<Building2 size={18} />} label="Firms" value={firms.length} color="from-purple-500 to-pink-500" />
          <StatCard icon={<Award size={18} />} label="Tier 1" value={indiaPartners.filter(p => p.tier === 'Tier 1').length} color="from-amber-500 to-orange-500" />
          <StatCard icon={<TrendingUp size={18} />} label="Avg Momentum" value={`${(indiaPartners.reduce((a, p) => a + p.momentum, 0) / indiaPartners.length).toFixed(1)}/10`} color="from-emerald-500 to-teal-500" />
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partners, firms, practice areas..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <svg className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                value={filterFirm || ''}
                onChange={(e) => setFilterFirm(e.target.value || null)}
                className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="">All Firms</option>
                {firms.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select
                value={filterLocation || ''}
                onChange={(e) => setFilterLocation(e.target.value || null)}
                className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="">All Locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select
                value={filterPractice || ''}
                onChange={(e) => setFilterPractice(e.target.value || null)}
                className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="">All Practices</option>
                {practiceAreas.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-3">
          <p className="text-sm text-slate-500">{filteredPartners.length} partners found</p>
          {filteredPartners.map(partner => (
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
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={12} /> {partner.location}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {partner.experience} yrs
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Star size={12} className="text-amber-400" /> M{partner.momentum}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {partner.practiceAreas.slice(0, 3).map(area => (
                      <span key={area} className="text-[10px] bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PartnerDetail({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deals' | 'clients' | 'contact'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
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
        {/* Profile Card */}
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
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <MapPin size={14} /> {partner.location}
                </span>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Clock size={14} /> {partner.experience} years
                </span>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <GraduationCap size={14} /> {partner.education[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-300 leading-relaxed">{partner.bio}</p>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {partner.practiceAreas.map(area => (
              <span key={area} className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800/30 p-1 rounded-xl">
          {[
            { id: 'overview' as const, label: 'Overview', icon: Award },
            { id: 'deals' as const, label: 'Deals', icon: Briefcase },
            { id: 'clients' as const, label: 'Clients', icon: Users },
            { id: 'contact' as const, label: 'Contact', icon: Phone },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-amber-500/20 text-amber-400' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
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
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Shield size={16} className="text-amber-400" />
                Key Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {partner.expertise.map(e => (
                  <div key={e} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {e}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-amber-400" />
                Education
              </h3>
              {partner.education.map(edu => (
                <p key={edu} className="text-sm text-slate-300 mb-1">• {edu}</p>
              ))}
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                Recognition
              </h3>
              {partner.recognition.map(rec => (
                <p key={rec} className="text-sm text-slate-300 mb-1">• {rec}</p>
              ))}
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
                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                  <Building2 size={18} className="text-slate-400" />
                </div>
                <span className="font-medium text-sm">{client}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-3">
            <a href={`mailto:${partner.email}`} className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Mail size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm text-white">{partner.email}</p>
              </div>
            </a>
            <a href={`tel:${partner.phone}`} className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Phone size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Phone</p>
                <p className="text-sm text-white">{partner.phone}</p>
              </div>
            </a>
            {partner.linkedIn && (
              <a href={`https://${partner.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Linkedin size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">LinkedIn</p>
                  <p className="text-sm text-white">{partner.linkedIn}</p>
                </div>
              </a>
            )}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-2">Bar Admissions</p>
              <div className="flex gap-2 flex-wrap">
                {partner.barAdmissions.map(bar => (
                  <span key={bar} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">{bar}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-2">Languages</p>
              <div className="flex gap-2 flex-wrap">
                {partner.languages.map(lang => (
                  <span key={lang} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">{lang}</span>
                ))}
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
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
