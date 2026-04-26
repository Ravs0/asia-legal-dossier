export interface LegalSystem {
  id: string; name: string; region: string; type: string;
  momentum: number; marketSize: string; foundedLaw: string;
  keyRegulators: string[]; topFirms: string[]; boomingAreas: string[];
  gaps: string[]; relationships: { target: string; strength: number; label: string }[];
  description: string; latestReform: string; color: string;
  
  // Expanded fields (optional for backward compatibility)
  keyStatutes?: { name: string; year: number; impact: string }[];
  majorDeals?: { name: string; value?: string; year: number; type: string }[];
  legalMarketSize?: { lawyers: string; topFirmsRevenue: string; growthRate: string };
  barriersToEntry?: string[];
  regulatoryTrends?: string[];
  comparisonNotes?: { vs: string; advantage: string; disadvantage: string }[];
  talentMarket?: { avgPartnerSalary: string; associateHiring: string; lateralMoves: string };
  recentDevelopments?: { date: string; title: string; description: string }[];
  
  // PITCH INTELLIGENCE FIELDS
  dealFlow?: { 
    annualDealValue: string; 
    topSectors: string[]; 
    activePE: string[];
    pipelineOutlook: string;
  };
  insiderIntel?: {
    winningFirms: string[];
    losingTalent: string[];
    hiddenOpportunities: string[];
    redFlags: string[];
    marketTiming: string;
  };
  competitiveLandscape?: {
    tier1: string[];
    tier2: string[];
    boutiques: string[];
    newEntrants: string[];
  };
  arbitrageOpportunities?: {
    type: string;
    description: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    expectedReturn: string;
  }[];
  partnerIntel?: {
    totalPartners: string;
    partnerGrowth: string;
    lateralHires2024: string;
    departedPartners: string;
    avgYearsToPartner: string;
  };
  clientIntel?: {
    keyClients: string[];
    clientSpendingTrend: string;
    procurementChanges: string;
    ratePressure: string;
  };
}

export const legalSystems: LegalSystem[] = [
  {
    id: 'saudi', name: 'Saudi Arabia', region: 'Middle East', type: 'Sharia-Commercial',
    momentum: 10, marketSize: 'Vision 2030: ~$3T GDP target',
    foundedLaw: 'Commercial Courts (2024), SCCA (2024), PDPL (2023)',
    keyRegulators: ['Capital Market Authority (CMA)', 'Ministry of Investment (MISA)', 'SCCA'],
    topFirms: ['Al-Rasheed', 'Hammad & Al-Mehdar', 'Al Jadaan', 'AAA Law (Dentons)', 'White & Case', 'Baker McKenzie'],
    boomingAreas: ['Vision 2030 Mega-Projects', 'Sharia-compliant Finance', 'Tadawul IPOs', 'FIDIC Construction', 'PDPL Data Privacy', 'Saudization'],
    gaps: ['Saudi nationality required for court (Muhami license)', 'Arabic fluency essential', 'Talent poaching fierce', 'Disputes outpace arbitration capacity'],
    relationships: [
      { target: 'uae', strength: 9, label: 'Gulf Capital' },
      { target: 'singapore', strength: 6, label: 'Arb Rivalry' },
      { target: 'china', strength: 5, label: 'Belt & Road' },
    ],
    description: 'Most dramatic legal market creation in modern history. Vision 2030 forces rapid codification of commercial law within Shari\'a framework. The Kingdom\'s legal sector now features sophisticated law firms capable of handling the most complex transactions in the Middle East. The establishment of specialized Commercial Courts and the Saudi Center for Commercial Arbitration (SCCA) has created a more structured and predictable legal system than ever before.',
    latestReform: 'Sept 2025: Prosecutors\' Office dissolution announced for 2026; ex-prosecutor hiring wave.',
    color: '#10b981',
    
    keyStatutes: [
      { name: 'Commercial Courts Law', year: 2024, impact: 'Established specialized commercial courts with expedited procedures for business disputes' },
      { name: 'Personal Data Protection Law (PDPL)', year: 2023, impact: 'Comprehensive data privacy framework modeled on GDPR, with extraterritorial reach' },
      { name: 'Companies Law', year: 2022, impact: 'Modernized corporate governance, introduced single-person companies, streamlined M&A' },
      { name: 'Civil Transactions Law', year: 2023, impact: 'First codification of contract principles, reducing reliance on uncodified Shari\'a' },
      { name: 'Bankruptcy Law', year: 2018, impact: 'Introduced formal restructuring and liquidation procedures, previously non-existent' },
      { name: 'Arbitration Law', year: 2012, impact: 'Adopted UNCITRAL Model Law, but enforcement remains evolving' },
    ],
    majorDeals: [
      { name: 'NEOM City Project', value: '$500B+', year: 2025, type: 'Infrastructure / Project Finance' },
      { name: 'Saudi Aramco Pipeline Investors', value: '$12.4B', year: 2021, type: 'Energy / M&A' },
      { name: 'Red Sea Development Authority', value: '$20B', year: 2024, type: 'Tourism / PPP' },
      { name: 'Qiddiya Entertainment City', value: '$10B', year: 2024, type: 'Entertainment / Real Estate' },
      { name: 'SABIC Acquisition by Aramco', value: '$69B', year: 2020, type: 'Chemicals / M&A' },
    ],
    legalMarketSize: { 
      lawyers: '~3,500 registered lawyers (rapidly expanding)', 
      topFirmsRevenue: 'Top 10 firms: $400M+ combined (estimated 2024)', 
      growthRate: '25-30% annual growth in legal services market' 
    },
    barriersToEntry: [
      'Saudi nationality required for court appearances (Muhami license)',
      'Foreign lawyers limited to legal consultant status only',
      'Arabic language fluency essential for local court matters',
      'Shari\'a principles underpin all commercial transactions',
      'Extensive Saudization quotas in employment',
    ],
    regulatoryTrends: [
      'Increasing codification of commercial law to reduce Shari\'a uncertainty',
      'Rapid expansion of regulatory bodies (CMA, MISA, SCCA)',
      'Growing sophistication of securities regulation post-Aramco IPO',
      'Tightening data protection enforcement under PDPL',
      'Labour law reforms supporting Vision 2030 talent acquisition',
    ],
    comparisonNotes: [
      { vs: 'UAE', advantage: 'Larger project pipeline under Vision 2030', disadvantage: 'Less developed institutional infrastructure than DIFC/ADGM' },
      { vs: 'Singapore', advantage: 'Closer cultural alignment with MENA clients', disadvantage: 'Arbitration seat less neutral for Asian disputes' },
    ],
    talentMarket: { 
      avgPartnerSalary: '$400K-$1.2M (tax-free, international firms)', 
      associateHiring: 'Aggressive lateral hiring from UK and US firms', 
      lateralMoves: 'Wave of ex-prosecutor hires following Sept 2025 announcement' 
    },
    recentDevelopments: [
      { date: 'Sept 2025', title: 'Prosecutors Office Dissolution', description: 'State announced dissolution of Prosecutors Office in 2026, dividing powers between two new agencies; led to massive hiring of ex-prosecutors by law firms' },
      { date: 'Aug 2025', title: 'CMA Securities Reforms', description: 'New rules for SPACs and direct listings to boost Tadawul activity' },
      { date: 'Jul 2025', title: 'PDPL Enforcement Begins', description: 'First fines issued under Personal Data Protection Law, primarily targeting telecoms and banking' },
      { date: 'Mar 2025', title: 'SCCA Caseload Surge', description: 'SCCA handled 450% increase in arbitration filings, mostly construction disputes' },
    ],
    
    // PITCH INTELLIGENCE - Saudi Arabia
    dealFlow: {
      annualDealValue: '$85B+ (2025 est.)',
      topSectors: ['Energy/Utilities (30%)', 'Infrastructure (25%)', 'Real Estate (20%)', 'Financial Services (15%)', 'Healthcare (10%)'],
      activePE: ['PIF (Public Investment Fund)', 'BlackRock', 'KKR', 'EIG', 'Actis', 'Masdar'],
      pipelineOutlook: 'NEOM Phase 1 projects ($50B) launching Q2-Q3 2026; 40+ Tadawul IPOs in pipeline; Sovereign wealth driving infrastructure mega-deals',
    },
    insiderIntel: {
      winningFirms: ['Al-Rasheed (local dominance)', 'White & Case (project finance)', 'Hammad & Al-Mehdar (disputes)', 'AAA Law/Dentons (volume leader)', 'Latham & Watkins (mega-deals)', 'Baker McKenzie (regulatory)'],
      losingTalent: ['DLA Piper (3 partners departed to Al-Rasheed)', 'Clifford Chance (associate attrition to 40%)', 'Small local firms losing young lawyers to international firms'],
      hiddenOpportunities: ['Ex-prosecutor lateral hiring window (closes Q3 2026)', 'PDPL compliance boutique creation', 'NEOM-specific construction arbitration expertise', 'Sharia-compliant PE structuring', 'Tadawul IPO readiness advisory'],
      redFlags: ['Court judgments unpredictable despite reforms', 'Visa restrictions for expat lawyers tightening', 'Saudization pressure reaching senior associate level', 'Payment delays from government entities', 'Shari\'a board conflicts in complex finance'],
      marketTiming: 'OPTIMAL ENTRY: Now through Q4 2026. Prosecutor dissolution creates unique talent window. NEOM construction phase accelerating.',
    },
    competitiveLandscape: {
      tier1: ['Al-Rasheed', 'Hammad & Al-Mehdar', 'White & Case', 'Latham & Watkins'],
      tier2: ['Al Jadaan', 'AAA Law/Dentons', 'Baker McKenzie', 'Clifford Chance'],
      boutiques: ['A&O Shearman (new entry)', 'Freshfields (Riyadh desk)', 'Local specialist construction boutiques'],
      newEntrants: ['Quinn Emanuel (litigation focus)', 'Kirkland & Ellis (PE/energy)'],
    },
    arbitrageOpportunities: [
      { type: 'Ex-Prosecutor Strategy', description: 'Hire ex-prosecutors now while transition uncertainty exists; rates 40% below London/NY equivalents', riskLevel: 'Medium', expectedReturn: '3-4x over 3 years as demand normalizes' },
      { type: 'PDPL First-Mover', description: 'First pure-play data privacy boutique; current market served by BigLaw generalists', riskLevel: 'Low', expectedReturn: 'High margins in regulatory consulting' },
      { type: 'NEOM Construction Niche', description: 'FIDIC + Saudi law expertise combination extremely scarce', riskLevel: 'Medium', expectedReturn: 'Premium rates (30-50% above market) for specialized expertise' },
    ],
    partnerIntel: {
      totalPartners: '~420 across top 20 firms',
      partnerGrowth: '+35% YoY (highest globally)',
      lateralHires2024: '67 partners moved to Saudi roles (from UK/US primarily)',
      departedPartners: '~18 partners left (mostly small firms to larger platforms)',
      avgYearsToPartner: '10-12 years (extended due to Saudization pressure)',
    },
    clientIntel: {
      keyClients: ['PIF', 'Saudi Aramco', 'NEOM', 'Red Sea Global', 'ACWA Power', 'Almarai', 'STC', 'Al Rajhi Bank'],
      clientSpendingTrend: '+45% YoY on external counsel (2024-2025)',
      procurementChanges: 'Panel consolidation happening; preferring firms with on-ground Saudi presence',
      ratePressure: 'Moderate - accepting premium rates for complex work, but demanding fixed fees for routine matters',
    },
  },
  {
    id: 'uae', name: 'UAE (DIFC/ADGM)', region: 'Middle East', type: 'Common Law',
    momentum: 9, marketSize: 'Primary ME arbitration & funds hub',
    foundedLaw: 'DIFC Courts (2004), ADGM (2015), UAE PDPL (2023)',
    keyRegulators: ['DIFC Courts', 'ADGM FSRA', 'DIAC', 'UAE Central Bank'],
    topFirms: ['Hadef & Partners', 'Al Tamimi', 'Galadari', 'White & Case', 'Latham', 'Clifford Chance'],
    boomingAreas: ['Fintech / Crypto / Digital Assets', 'Real Estate', 'Fund Formation', 'Family Offices', 'Energy (ADNOC)', 'DIAC Arbitration'],
    gaps: ['Dual-track lawyers (civil + common law) scarce', 'SMEs underserved', 'Cyber-security compliance shortage'],
    relationships: [
      { target: 'saudi', strength: 9, label: 'Gulf Capital' },
      { target: 'singapore', strength: 7, label: 'Hub Compete' },
      { target: 'hongkong', strength: 5, label: 'Arb Rivalry' },
    ],
    description: 'Dual-track: local civil law + free-zone common law. ADGM is the most sophisticated common-law financial jurisdiction in the Middle East. The UAE offers a unique ecosystem where international firms can practice English common law within the DIFC and ADGM free zones while local firms handle UAE federal matters. This bifurcated system has attracted over 80 international law firms to establish presences, making Dubai and Abu Dhabi the pre-eminent legal hubs for Middle East and Africa transactions.',
    latestReform: 'Feb 2026: World\'s most profitable law firm registered ADGM branch.',
    color: '#38bdf8',
    
    keyStatutes: [
      { name: 'DIFC Arbitration Law', year: 2004, impact: 'Adopted UNCITRAL Model Law, established DIFC Courts as independent common law jurisdiction' },
      { name: 'DIFC Data Protection Law', year: 2020, impact: 'GDPR-equivalent framework within DIFC, recognized as adequate by EU' },
      { name: 'ADGM Commercial Licensing Regulations', year: 2015, impact: 'Allowed 100% foreign ownership of law firms in ADGM' },
      { name: 'UAE Federal Data Protection Law', year: 2023, impact: 'Extended data privacy across all Emirates, with extraterritorial application' },
      { name: 'Dubai Virtual Assets Law', year: 2022, impact: 'Established VARA as world\'s first independent virtual asset regulator' },
      { name: 'ADGM SPAC Regulations', year: 2022, impact: 'First Middle East jurisdiction to allow SPAC listings under common law framework' },
    ],
    majorDeals: [
      { name: 'ADNOC Pipeline Assets', value: '$20.7B', year: 2020, type: 'Infrastructure / M&A' },
      { name: 'Dubai Holding Hospitality', value: '$2.5B', year: 2024, type: 'Hospitality / Real Estate' },
      { name: 'DP World Jebel Ali Port Expansion', value: '$3B', year: 2024, type: 'Logistics / Infrastructure' },
      { name: 'Abu Dhabi Global Market SPAC', value: '$1.2B', year: 2023, type: 'Capital Markets / SPAC' },
      { name: 'Emirates NBD Acquisition of DenizBank', value: '$2.5B', year: 2019, type: 'Financial Services / M&A' },
    ],
    legalMarketSize: { 
      lawyers: '~15,000 (both local and free zone)', 
      topFirmsRevenue: 'White & Case MEA: $150M+; Latham Middle East: $120M+ (est.)', 
      growthRate: '12-15% annual growth; DIFC caseload up 200% since 2020' 
    },
    barriersToEntry: [
      'Federal/UAE civil law matters require local advocates (unless DIFC/ADGM jurisdiction elected)',
      'Language bifurcation: Arabic for local courts, English for DIFC/ADGM',
      'Emiratization requirements in employment',
      'Foreign firms cannot practice UAE law outside free zones',
      'Complex licensing regime across 7 Emirates plus federal level',
    ],
    regulatoryTrends: [
      'Rapid fintech/crypto regulatory development outpacing global peers',
      'DIFC Courts expanding jurisdiction through contractual opt-ins',
      'ADGM positioning as Asia-Africa investment gateway',
      'Family office regulatory framework attracting global wealth',
      'Sustainable finance regulations aligning with COP28 host status',
    ],
    comparisonNotes: [
      { vs: 'Saudi Arabia', advantage: 'Established common law institutions (20+ years)', disadvantage: 'Smaller domestic deal pipeline than Vision 2030' },
      { vs: 'Singapore', advantage: 'Closer to European/African time zones', disadvantage: 'Smaller Asia-Pacific arbitration market share' },
    ],
    talentMarket: { 
      avgPartnerSalary: '$350K-$900K (tax-free, top tier)', 
      associateHiring: 'Strong demand for dual-qualified (common + civil law) associates', 
      lateralMoves: 'Partners moving from London/NY for tax-free packages; Saudi poaching some talent' 
    },
    recentDevelopments: [
      { date: 'Feb 2026', title: 'Top Firm ADGM Entry', description: 'World\'s most profitable law firm registered ADGM branch, validating jurisdiction credibility' },
      { date: 'Jan 2026', title: 'DIFC Courts Caseload Record', description: 'DIFC Courts handled 1,200+ cases in 2025, 40% increase YoY' },
      { date: 'Dec 2025', title: 'VARA Crypto Enforcement', description: 'First major penalties issued under virtual asset regulations' },
      { date: 'Nov 2025', title: 'ADGM Fund Domiciliation', description: 'Over 500 funds now domiciled in ADGM; surpassed Cayman for regional preference' },
    ],
    
    dealFlow: {
      annualDealValue: '$45B (2025)',
      topSectors: ['Real Estate (30%)', 'Energy/Infrastructure (25%)', 'Financial Services (20%)', 'Hospitality (15%)', 'Technology (10%)'],
      activePE: ['ADQ', 'Mubadala', 'Eclipse', 'Partners Group', 'Kohlberg Kravis Roberts'],
      pipelineOutlook: 'ADNOC privatization continuing; family office structuring boom; Africa-Asia corridor investments accelerating',
    },
    insiderIntel: {
      winningFirms: ['Al Tamimi (volume leader)', 'Hadef & Partners (elite)', 'White & Case (international deals)', 'Latham (funds)', 'Clifford Chance (project finance)', 'Galadari (DIFC disputes)'],
      losingTalent: ['Linklaters (lost 2 partners to A&O)', 'Herbert Smith Freehills (associate exodus)', 'Small UK firms closing Dubai desks'],
      hiddenOpportunities: ['African cross-border work via ADGM', 'Crypto regulatory advisory (still niche)', 'Family office structuring for UHNW Indians', 'DIFC Courts enforcement in Africa/Asia', 'Golden visa legal structuring'],
      redFlags: ['Rent and operating costs escalating 25% YoY', 'Saudi competition diverting capital', 'Court enforcement challenges outside DIFC/ADGM', 'Talent poaching by Saudi firms', 'ADGM saturation risk in funds'],
      marketTiming: 'LATE CYCLE: Still profitable but entering maturity. Saudi competition real. Best opportunities in niche specializations (crypto, Africa).',
    },
    competitiveLandscape: {
      tier1: ['Al Tamimi', 'Hadef & Partners', 'White & Case', 'Latham & Watkins'],
      tier2: ['Clifford Chance', 'Galadari', 'Baker McKenzie', 'A&O Shearman'],
      boutiques: ['Boutique DIFC litigation shops', 'ADGM fund specialists', 'Crypto advisory boutiques'],
      newEntrants: ['Top-tier US firm entering ADGM', 'Regional African firms opening Dubai desks'],
    },
    arbitrageOpportunities: [
      { type: 'Africa-Asia Corridor', description: 'Use ADGM as hub for African capital flows to Asia; unique positioning', riskLevel: 'Medium', expectedReturn: 'First-mover advantage in underserved corridor' },
      { type: 'Crypto Compliance', description: 'VARA framework still new; advisory expertise limited', riskLevel: 'High', expectedReturn: 'Premium fees in volatile regulatory environment' },
      { type: 'Family Office Niche', description: 'Indian UHNW migration to Dubai creating structuring demand', riskLevel: 'Low', expectedReturn: 'Recurring retainer relationships' },
    ],
    partnerIntel: {
      totalPartners: '~1,800 across all firms',
      partnerGrowth: '+12% YoY',
      lateralHires2024: '~85 partners (mostly UK to Dubai)',
      departedPartners: '~25 (mostly to Saudi or returning home)',
      avgYearsToPartner: '8-10 years',
    },
    clientIntel: {
      keyClients: ['ADNOC', 'DP World', 'Emirates NBD', 'Emaar', 'Dubai Holding', 'Mubadala', 'Sovereign wealth families'],
      clientSpendingTrend: '+18% YoY',
      procurementChanges: 'Panel reviews happening; Saudi competition pushing rate negotiations',
      ratePressure: 'Moderate - premium rates holding but discount pressure increasing',
    },
  },
  {
    id: 'china', name: 'China', region: 'East Asia', type: 'Socialist',
    momentum: 8, marketSize: 'Largest legal market by volume globally (~500,000+ lawyers)',
    foundedLaw: 'Civil Code (2021), Foreign Investment Law (2020), PIPL (2021)',
    keyRegulators: ['MOFCOM', 'SAMR', 'CAC (Cyberspace Admin)', 'CSRC', 'NDRC', 'MPS'],
    topFirms: ['King & Wood Mallesons (#1 Hurun 2026)', 'Grandall', 'JunHe', 'Fangda Partners', 'Zhong Lun', 'Han Kun'],
    boomingAreas: ['Inbound M&A / Strategic Investment', 'Tech / AI / Manufacturing', 'Biopharma', 'HK Capital Markets', 'PIPL Compliance', 'Sanctions / Export Controls'],
    gaps: ['Cross-border enforcement remains uneven', 'Geopolitical sanctions complexity', 'PE exit values constrained'],
    relationships: [
      { target: 'hongkong', strength: 10, label: 'CM Pipeline' },
      { target: 'singapore', strength: 6, label: 'ASEAN Gate' },
      { target: 'vietnam', strength: 7, label: 'Mfg Shift' },
      { target: 'saudi', strength: 5, label: 'Belt Road' },
    ],
    description: 'Chinese firms are aggressively expanding globally, challenging Magic Circle and White-Shoe dominance in Asia. The 2021 Civil Code represents the most significant codification since 1949, consolidating contract, tort, and property law. Regulatory complexity (FDI screening under FEFTA-equivalent measures, data localisation under PIPL) is paradoxically increasing legal value even as geopolitical tensions rise. Chinese firms now handle 40+ of CSI 300 index companies.',
    latestReform: '2024: Streamlined foreign strategic investment in listed companies; reduced lockup periods and size thresholds.',
    color: '#ef4444',
    
    keyStatutes: [
      { name: 'Civil Code', year: 2021, impact: 'Consolidated contract, tort, property law; first comprehensive codification since 1949' },
      { name: 'Personal Information Protection Law (PIPL)', year: 2021, impact: 'Comprehensive data privacy law with extraterritorial reach; GDPR-equivalent' },
      { name: 'Data Security Law', year: 2021, impact: 'Data classification system; national security reviews for data exports' },
      { name: 'Foreign Investment Law', year: 2020, impact: 'Replaced three separate laws; introduced negative list system' },
      { name: 'Anti-Foreign Sanctions Law', year: 2021, impact: 'Counter-sanctions mechanism; creates compliance conflicts with US/EU sanctions' },
      { name: 'Cybersecurity Law', year: 2017, impact: 'Data localization; security reviews for critical information infrastructure' },
      { name: 'Export Control Law', year: 2020, impact: 'China\'s first comprehensive export control framework' },
    ],
    majorDeals: [
      { name: 'TikTok / ByteDance Global Restructuring', value: 'N/A', year: 2024, type: 'Technology / Regulatory' },
      { name: 'Ant Group IPO Cancellation', value: '$34B suspended', year: 2020, type: 'Financial Services / Regulatory' },
      { name: 'Coca-Cola China Acquisition', value: '$2.5B', year: 2024, type: 'Consumer / M&A' },
      { name: 'Beijing Stock Exchange Listings', value: '$50B+ pipeline', year: 2024, type: 'Capital Markets' },
      { name: 'CATL European Battery Plants', value: '$7.3B', year: 2023, type: 'Manufacturing / Green Energy' },
    ],
    legalMarketSize: { 
      lawyers: '~520,000+ (largest globally)', 
      topFirmsRevenue: 'King & Wood Mallesons: $1B+; Top 10 Chinese firms: $5B+ combined', 
      growthRate: '8-10% annual growth; slowing from 15%+ pre-2020' 
    },
    barriersToEntry: [
      'Foreign law firms cannot practice Chinese law; limited to "representative offices"',
      'Foreign-Hong Kong law firm associations subject to strict caps',
      'Chinese law practice limited to PRC-qualified lawyers (bar exam required)',
      'Geopolitical restrictions on certain sectors (semiconductors, AI, defense)',
      'Data localization requirements limit cross-border discovery',
    ],
    regulatoryTrends: [
      'Increasing extraterritorial application of Chinese law (data, sanctions)',
      'Heightened FDI screening in sensitive sectors (tech, agriculture, data)',
      'Platform economy regulation normalizing post-Ant crackdown',
      'Green finance regulations accelerating under dual carbon goals',
      'Legal services liberalization stalled; protectionism increasing',
    ],
    comparisonNotes: [
      { vs: 'Hong Kong', advantage: 'Larger domestic market; regulatory control', disadvantage: 'International enforcement challenges; geopolitical perception' },
      { vs: 'USA', advantage: 'Faster regulatory approval for certain M&A', disadvantage: 'Limited extraterritorial enforcement reach vs US law' },
    ],
    talentMarket: { 
      avgPartnerSalary: 'Top tier: $300K-$800K (local firms); $500K-$1.5M (international)', 
      associateHiring: 'Slowing in M&A; growing in compliance/PIPL', 
      lateralMoves: 'PRC firms poaching international firm partners for HK expansion' 
    },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'Revised Foreign Investment Rules', description: 'Further streamlined strategic investment in listed companies, but added national security reviews' },
      { date: 'Nov 2025', title: 'PIPL Enforcement Wave', description: 'CAC imposed record fines on major platforms for data violations; created compliance surge' },
      { date: 'Oct 2025', title: 'Chip Export Controls Retaliation', description: 'New restrictions on rare earth exports in response to US chip sanctions' },
      { date: 'Aug 2025', title: 'Zhong Lun HK Expansion', description: 'Hired 5 partners from Kirkland & Ellis for Hong Kong capital markets practice' },
    ],
    
    dealFlow: {
      annualDealValue: '$180B (2024)',
      topSectors: ['Manufacturing (35%)', 'Technology (20%)', 'Energy/Resources (15%)', 'Healthcare (15%)', 'Consumer (15%)'],
      activePE: ['Hillhouse', 'Sequoia China', 'CDH', 'CPE', 'GGV Capital', 'Matrix Partners'],
      pipelineOutlook: 'Deal flow recovering post-2023; IPO backlog at HKEX; outbound M&A restricted; compliance work surging',
    },
    insiderIntel: {
      winningFirms: ['King & Wood Mallesons (scale)', 'Fangda Partners (elite)', 'Han Kun (TMT)', 'JunHe (state-owned deals)', 'Zhong Lun (full service)', 'Grandall (volume)'],
      losingTalent: ['International firms (Skadden, Kirkland losing talent to PRC firms)', 'Magic Circle (associate exodus to PRC firms for better advancement)', 'Regional US firms closing Beijing offices'],
      hiddenOpportunities: ['PIPL compliance boutique (underserved)', 'Dual-use technology export control advisory', 'Southeast Asia outbound structuring (avoiding China restrictions)', 'Red-chip restructuring expertise', 'Green bond structuring'],
      redFlags: ['Geopolitical risk (sanctions, decoupling)', 'Regulatory unpredictability (platform crackdowns)', 'Capital controls limiting outbound work', 'Court enforcement uneven for foreign judgments', 'Talent retention challenges'],
      marketTiming: 'RECOVERY PHASE: Post-crackdown normalization underway. PIPL creating new compliance demand. Geopolitical caution remains.',
    },
    competitiveLandscape: {
      tier1: ['King & Wood Mallesons', 'Fangda Partners', 'JunHe', 'Zhong Lun'],
      tier2: ['Grandall', 'Han Kun', 'Commerce & Finance', 'AllBright'],
      boutiques: ['Han Kun (TMT niche)', 'Fangda (elite deals)', 'AnJie (IP)', 'Landbridge (cross-border)'],
      newEntrants: ['PRC firms expanding to HK/Singapore', 'Southeast Asian firms partnering for China access'],
    },
    arbitrageOpportunities: [
      { type: 'PIPL Boutique', description: 'Pure-play data privacy practice; currently bundled with general corp', riskLevel: 'Low', expectedReturn: 'Premium rates for specialized expertise' },
      { type: 'SE Asia Hub', description: 'Structure China deals through Singapore/Vietnam entities', riskLevel: 'Medium', expectedReturn: 'Geopolitical arbitrage opportunities' },
    ],
    partnerIntel: {
      totalPartners: '~4,500 at top 20 firms',
      partnerGrowth: '+6% YoY',
      lateralHires2024: '~45 (mostly HK/Singapore returns)',
      departedPartners: '~60 (to PRC firms or leaving China)',
      avgYearsToPartner: '10-12 years (PRC firms); 12-14 years (international)',
    },
    clientIntel: {
      keyClients: ['Alibaba', 'Tencent', 'ByteDance', 'CATL', 'Sinopec', 'ICBC', 'State-owned conglomerates'],
      clientSpendingTrend: 'Flat to +5% (shifting to compliance from M&A)',
      procurementChanges: 'Panel consolidation; PRC firms winning more mandates from international',
      ratePressure: 'High - rate competition intense; commoditization of routine work',
    },
  },
  {
    id: 'hongkong', name: 'Hong Kong', region: 'East Asia', type: 'Common Law',
    momentum: 7, marketSize: 'IPO revival 2025; privatisations USD 20bn+',
    foundedLaw: 'Basic Law (1997), HKEX Listing Rules, Competition Ordinance',
    keyRegulators: ['SFC', 'HKEX', 'Competition Commission', 'DoJ (Arbitration)'],
    topFirms: ['Kirkland & Ellis', 'Skadden', 'Latham', 'Clifford Chance', 'Davis Polk', 'Fangda (PRC)'],
    boomingAreas: ['IPO Revival / Listings', 'Privatisations (ESR, Hang Seng)', 'Sports Arbitration Hub', 'China Access Deals', 'Sanctions / Export Control', 'Wealth Management'],
    gaps: ['PRC firms poaching top HK talent', 'IPO market faces Singapore / US rivalry', 'Geopolitical perception risk'],
    relationships: [
      { target: 'china', strength: 10, label: 'CM Pipeline' },
      { target: 'singapore', strength: 7, label: 'Hub Compete' },
      { target: 'uae', strength: 5, label: 'Arb Rivalry' },
    ],
    description: 'Common law gateway to China. Pushing to become a sports arbitration hub. Privatisations drove record deal values in 2025. Hong Kong remains the dominant venue for Chinese company IPOs, though facing increasing competition from Singapore and US exchanges. The HKSAR government is actively positioning Hong Kong as a center for sports dispute resolution, with the Advisory Committee established in 2024.',
    latestReform: '2024 Policy Address: Advisory Committee on Sports Dispute Resolution established.',
    color: '#f472b6',
    
    keyStatutes: [
      { name: 'Hong Kong National Security Law', year: 2020, impact: 'Beijing-imposed law; has affected certain commercial dispute dynamics' },
      { name: 'Competition Ordinance', year: 2012, impact: 'First competition law regime in Hong Kong; voluntary merger notification' },
      { name: 'Arbitration Ordinance (UNCITRAL)', year: 2011, impact: 'Adopted UNCITRAL Model Law; interim measures from HK courts' },
      { name: 'Personal Data (Privacy) Ordinance', year: 2012, impact: 'Data protection framework; currently being strengthened' },
      { name: 'Limited Partnership Fund Ordinance', year: 2020, impact: 'Facilitated onshore fund domiciliation; competed with Cayman/Singapore' },
      { name: 'Anti-Money Laundering Ordinance', year: 2018, impact: 'Enhanced due diligence for financial institutions and designated non-financials' },
    ],
    majorDeals: [
      { name: 'ESR Group Privatisation', value: '$7.1B', year: 2025, type: 'Real Estate / Take-Private' },
      { name: 'Hang Seng Bank Strategic Review', value: '$13.6B', year: 2025, type: 'Financial Services / Restructuring' },
      { name: 'Alibaba HK Secondary Listing', value: '$13B', year: 2019, type: 'Capital Markets / IPO' },
      { name: 'CK Asset European Acquisitions', value: '$8B', year: 2024, type: 'Infrastructure / M&A' },
      { name: 'JD.com Hong Kong Listing', value: '$4.5B', year: 2020, type: 'Technology / IPO' },
    ],
    legalMarketSize: { 
      lawyers: '~12,000 (10,000+ solicitors, 1,500+ barristers)', 
      topFirmsRevenue: 'Kirkland HK: $200M+; Skadden Asia: $150M+ (est.)', 
      growthRate: 'IPO activity volatile; privatisations driving 2025 growth' 
    },
    barriersToEntry: [
      'Practicing certificate required from The Law Society of Hong Kong',
      'PCLL conversion for common law qualified lawyers',
      'PRC firms increasingly competitive for China-related work',
      'Language requirements: English and/or Chinese proficiency',
      'National security considerations affecting certain client representations',
    ],
    regulatoryTrends: [
      'IPO market recovering from 2022-2023 lows',
      'Cryptocurrency licensing regime under SFC developing',
      'Virtual asset trading platform regulations',
      'Green and sustainable finance taxonomy development',
      'Family office incentive schemes competing with Singapore',
    ],
    comparisonNotes: [
      { vs: 'Singapore', advantage: 'Direct access to China capital markets', disadvantage: 'Less neutral for ASEAN disputes; geopolitical perceptions' },
      { vs: 'New York', advantage: 'Asian timezone for China deals', disadvantage: 'Limited US securities law expertise vs Wall Street' },
    ],
    talentMarket: { 
      avgPartnerSalary: '$400K-$1.5M (US firms); $300K-$800K (local firms)', 
      associateHiring: 'Strong demand for Mandarin-speaking associates', 
      lateralMoves: 'PRC firms (Han Kun, Fangda) poaching international firm partners' 
    },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'IPO Market Recovery', description: 'Hong Kong IPO volumes reached $15B in 2025, up 40% from 2024' },
      { date: 'Nov 2025', title: 'Fangda HK Expansion', description: 'Hired 8 partners from international firms for Hong Kong practice' },
      { date: 'Oct 2025', title: 'Sports Arbitration Initiative', description: 'HKMAG launched dedicated sports arbitration rules' },
      { date: 'Aug 2025', title: 'Wealth Management Competition', description: 'Family Office Connect scheme attracted 200+ single family offices' },
    ],
    
    dealFlow: {
      annualDealValue: '$25B (2024)',
      topSectors: ['Financial Services (40%)', 'Real Estate (25%)', 'TMT (20%)', 'Consumer (15%)'],
      activePE: ['PAG', 'RRJ Capital', 'Morgan Stanley PE', 'Blackstone', 'TPG'],
      pipelineOutlook: 'IPO recovery fragile; privatization wave continuing; PRC firms winning share; arbitration steady',
    },
    insiderIntel: {
      winningFirms: ['Kirkland & Ellis (PE)', 'Skadden (M&A)', 'Fangda HK (China deals)', 'DLA Piper (volume)', 'Latham & Watkins (funds)'],
      losingTalent: ['Clifford Chance (2 partners to Fangda)', 'Linklaters (associate exodus)', 'White & Case (senior associate departures)'],
      hiddenOpportunities: ['Sports arbitration niche', 'Virtual asset licensing advisory', 'Family office structuring', 'HK-listed Chinese company privatizations'],
      redFlags: ['PRC firm competition intensifying', 'IPO market share loss to US', 'Geopolitical perception issues', 'Talent shortage Mandarin-speaking seniors'],
      marketTiming: 'RECOVERY: IPO market improving but facing structural competition from Singapore and US.',
    },
    competitiveLandscape: {
      tier1: ['Kirkland & Ellis', 'Skadden', 'Latham & Watkins', 'Clifford Chance'],
      tier2: ['Davis Polk', 'Weil Gotshal', 'DLA Piper', 'Fangda HK'],
      boutiques: ['Deacons (local elite)', 'Tanner De Witt', 'Oldham (litigation)'],
      newEntrants: ['PRC firms (Fangda, Han Kun expanding)', 'Regional Asian firms opening HK desks'],
    },
    arbitrageOpportunities: [
      { type: 'China Access', description: 'HK as platform for China deals while avoiding mainland restrictions', riskLevel: 'Medium', expectedReturn: 'Geopolitical arbitrage premium' },
      { type: 'Sports Arbitration', description: 'Underdeveloped vs CAS; Asia sports market growing', riskLevel: 'Low', expectedReturn: 'First-mover niche capture' },
    ],
    partnerIntel: {
      totalPartners: '~1,800',
      partnerGrowth: '+5% YoY',
      lateralHires2024: '~40 (mostly PRC firms poaching)',
      departedPartners: '~35 (to PRC firms or leaving Asia)',
      avgYearsToPartner: '10-12 years (international); 8-10 years (local)',
    },
    clientIntel: {
      keyClients: ['HSBC', 'CK Hutchison', 'Alibaba', 'Tencent', 'WH Group', 'New World Development'],
      clientSpendingTrend: 'Flat; privatizations offsetting IPO decline',
      procurementChanges: 'PRC firms gaining share of China-related mandates',
      ratePressure: 'Moderate - holding rates but competition from PRC firms',
    },
  },
  {
    id: 'singapore', name: 'Singapore', region: 'Southeast Asia', type: 'Common Law',
    momentum: 8, marketSize: 'Premier neutral arbitration seat in Asia; 1,000+ new family offices since 2020',
    foundedLaw: 'Arbitration Act, Legal Profession Act, IBA Guidelines adoption',
    keyRegulators: ['SIAC', 'Maxwell Chambers', 'MAS (Monetary Authority)', 'CCCS (Competition)', 'ACRA'],
    topFirms: ['WongPartnership', 'Allen & Gledhill', 'Rajah & Tann', 'Dentons Rodyk', 'Baker McKenzie', 'Latham & Watkins'],
    boomingAreas: ['International Arbitration', 'Fund Formation / Family Offices', 'Capital Markets Revival', 'ESG / Sustainability Reporting', '15% Global Min Tax Structuring', 'ASEAN Regional Coverage'],
    gaps: ['Mid-senior funds & project finance associates scarce', 'Clients expect ASEAN-wide capability from one desk', 'Competition from HK / Dubai for regional HQs'],
    relationships: [
      { target: 'hongkong', strength: 7, label: 'Hub Compete' },
      { target: 'uae', strength: 7, label: 'Hub Compete' },
      { target: 'indonesia', strength: 8, label: 'ASEAN Lead' },
      { target: 'vietnam', strength: 8, label: 'ASEAN Lead' },
      { target: 'philippines', strength: 7, label: 'ASEAN Lead' },
    ],
    description: 'The de facto legal hub for Southeast Asia. SIAC is the busiest arbitration institution in Asia, handling 400+ new cases annually. The family office influx (1,000+ new since 2020) is driving fund structuring demand. Singapore\'s neutrality makes it the preferred seat for China-ASEAN, India-ASEAN, and intra-ASEAN disputes. The Variable Capital Company (VCC) regime has made Singapore a competitive fund domicile.',
    latestReform: '2025-2026: 15% global minimum tax implementation reshaping holding company structures.',
    color: '#f59e0b',
    
    keyStatutes: [
      { name: 'Arbitration Act (UNCITRAL Model Law)', year: 1995, impact: 'Adopted UNCITRAL Model Law; minimal court intervention principle' },
      { name: 'Legal Profession Act', year: 1967, impact: 'Governs admission and practice; Qualified Foreign Lawyer regime for arbitration' },
      { name: 'Competition Act', year: 2004, impact: 'Merger control regime; voluntary notification but strong enforcement' },
      { name: 'Variable Capital Companies Act', year: 2018, impact: 'Innovative fund structure; umbrella/sub-funds; competing with Cayman' },
      { name: 'Personal Data Protection Act (PDPA)', year: 2012, impact: 'Data protection with business-friendly exemptions' },
      { name: 'Securities and Futures Act', year: 2001, impact: 'Comprehensive capital markets regulation; licensing regime' },
      { name: 'Carbon Pricing Act', year: 2018, impact: 'First carbon tax in Southeast Asia; drives ESG legal work' },
    ],
    majorDeals: [
      { name: 'Grab SPAC Merger (NASDAQ)', value: '$39.6B', year: 2021, type: 'Technology / SPAC' },
      { name: 'Sea Limited Follow-ons', value: '$6B+', year: 2020, type: 'Technology / Capital Markets' },
      { name: 'Temasek Portfolio Restructurings', value: 'Multi-billion', year: 2024, type: 'Sovereign Wealth / M&A' },
      { name: 'VCC Fund Launches', value: '$50B+ AUM', year: 2024, type: 'Fund Formation' },
      { name: 'Singapore Airlines Rights Issue', value: '$6.2B', year: 2020, type: 'Aviation / Capital Markets' },
    ],
    legalMarketSize: { 
      lawyers: '~6,000 (5,500+ solicitors, 500+ foreign lawyers)', 
      topFirmsRevenue: 'Allen & Gledhill: $300M+; WongPartnership: $200M+', 
      growthRate: 'SIAC caseload growing 15% YoY; family office work up 40%' 
    },
    barriersToEntry: [
      'Advocate & Solicitor admission requires Singapore-qualified law degree or conversion',
      'Foreign lawyers can practice in foreign law areas and international arbitration only',
      'Law firm partnerships must maintain local majority (unless exempted)',
      'Competition for top-tier talent is intense; salary expectations rising',
      'Expected to provide ASEAN regional coverage creates pressure',
    ],
    regulatoryTrends: [
      'VCC regime continuing to attract fund domiciliation from Cayman',
      'Crypto/digital asset licensing framework under MAS',
      '15% global minimum tax implementation (Pillar Two)',
      'Carbon services and transition finance legal demand surging',
      'ASEAN integration legal frameworks developing slowly',
    ],
    comparisonNotes: [
      { vs: 'Hong Kong', advantage: 'Neutral arbitration seat; perceived stability', disadvantage: 'No direct China capital markets access' },
      { vs: 'Dubai', advantage: 'Closer to ASEAN markets; established arbitration', disadvantage: 'Smaller Middle East/Africa access' },
    ],
    talentMarket: { 
      avgPartnerSalary: '$250K-$800K (local firms); $400K-$1.2M (international)', 
      associateHiring: 'Hot market for 3-7 PQE M&A, funds, project finance', 
      lateralMoves: 'Partners moving from Hong Kong for lifestyle; talent wars intensifying' 
    },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'Family Office Milestone', description: '1,100 family offices registered under Variable Capital Company regime' },
      { date: 'Nov 2025', title: 'SIAC Caseload Record', description: 'SIAC received 480 new cases in 2025, up 18% YoY; China-related disputes 35%' },
      { date: 'Oct 2025', title: 'Crypto License Approvals', description: 'MAS granted 5 new Digital Payment Token licenses to global exchanges' },
      { date: 'Aug 2025', title: 'Carbon Services Boom', description: 'Climate Impact X and other platforms driving carbon trading legal work' },
    ],
    
    dealFlow: {
      annualDealValue: '$18B (2025)',
      topSectors: ['Arbitration (30%)', 'Funds/Family Offices (25%)', 'Capital Markets (20%)', 'Energy/Infrastructure (15%)', 'Tech (10%)'],
      activePE: ['Temasek', 'GIC', 'EDB', 'Clifford Capital', 'Dymon Asia'],
      pipelineOutlook: 'Arbitration caseload steady; family office boom; ASEAN regional deal hub; crypto framework evolving',
    },
    insiderIntel: {
      winningFirms: ['Allen & Gledhill (local dominance)', 'Rajah & Tann (regional reach)', 'WongPartnership (litigation)', 'Baker McKenzie (international)', 'Latham & Watkins (funds)', 'Clifford Chance (arbitration)'],
      losingTalent: ['Herbert Smith Freehills (partner exits)', 'Ashurst (associate attrition)', 'Small firms losing talent to Big 4 Singapore'],
      hiddenOpportunities: ['Family office structuring boutique', 'ASEAN regional coverage model', 'VCC fund specialist practice', 'Carbon services legal advisory', 'Crypto compliance niche'],
      redFlags: ['Mid-senior talent shortage acute', 'Client demands for ASEAN-wide capability', 'Rising costs threatening competitiveness', 'Panel consolidation pressure'],
      marketTiming: 'PRIME OPPORTUNITY: Arbitration leader; family office surge; ASEAN hub position. Best market in Asia for work-life balance + quality deal flow.',
    },
    competitiveLandscape: {
      tier1: ['Allen & Gledhill', 'Rajah & Tann', 'WongPartnership'],
      tier2: ['Dentons Rodyk', 'Baker McKenzie', 'Clifford Chance', 'Latham & Watkins'],
      boutiques: ['Drew & Napier (litigation)', 'Peter Low (tax)', 'Singapore specialists in funds/arbitration'],
      newEntrants: ['White & Case expanding', 'Sidley Austin new office', 'Regional ASEAN firms opening desks'],
    },
    arbitrageOpportunities: [
      { type: 'Family Office Niche', description: 'Dedicated family office practice; underserved by generalists', riskLevel: 'Low', expectedReturn: 'Recurring retainer + AUM-linked fees' },
      { type: 'ASEAN Regional Hub', description: 'Single desk covering multiple ASEAN jurisdictions; unique positioning', riskLevel: 'Medium', expectedReturn: 'Premium for regional expertise' },
      { type: 'VCC Specialist', description: 'Variable Capital Company specialist; funds work migrating from Cayman', riskLevel: 'Low', expectedReturn: 'High margin fund formation work' },
    ],
    partnerIntel: {
      totalPartners: '~850',
      partnerGrowth: '+10% YoY',
      lateralHires2024: '~55 partners (HK to Singapore migration)',
      departedPartners: '~20 (mostly to Saudi/international moves)',
      avgYearsToPartner: '10-11 years (international); 8-10 years (local)',
    },
    clientIntel: {
      keyClients: ['Temasek', 'GIC', 'DBS', 'OCBC', 'UOB', 'Grab', 'Sea Limited', 'Sovereign wealth families'],
      clientSpendingTrend: '+25% YoY on external counsel',
      procurementChanges: 'Family offices demanding bundled services; arbitration clients more rate-sensitive',
      ratePressure: 'Moderate - rates holding but talent costs rising',
    },
  },
  {
    id: 'vietnam', name: 'Vietnam', region: 'Southeast Asia', type: 'Civil Law',
    momentum: 7, marketSize: 'M&A value up ~30% YoY 2025',
    foundedLaw: 'Civil Code (2015), Investment Law (2020), AI Law (Dec 2025)',
    keyRegulators: ['Ministry of Planning & Investment', 'State Securities Commission', 'Ministry of Justice', 'MoIT'],
    topFirms: ['Indochine Counsel', 'LNT & Partners', 'YKVN', 'Baker McKenzie VN'],
    boomingAreas: ['Manufacturing (Electronics, Textiles)', 'Real Estate / Industrial Parks', 'Energy / Offshore Wind (Decree 225/2025)', 'AI Regulation (1st in ASEAN)', 'Data Privacy (PDPL draft)', 'Healthcare / Tech M&A'],
    gaps: ['Sophisticated capital markets practices thin', 'Real estate disputes exceed arbitration capacity', 'AI compliance lawyers extremely scarce'],
    relationships: [
      { target: 'china', strength: 7, label: 'Mfg Shift' },
      { target: 'singapore', strength: 8, label: 'ASEAN Lead' },
      { target: 'southkorea', strength: 5, label: 'Tech FDI' },
    ],
    description: 'First ASEAN nation with standalone AI Law (March 2026). Primary beneficiary of China+1 manufacturing relocation. New Investment Law streamlines FDI.',
    latestReform: 'March 2026: New Investment Law takes effect, narrowing conditional business lines.',
    color: '#22d3ee',
    
    keyStatutes: [
      { name: 'Law on Artificial Intelligence', year: 2025, impact: 'First standalone AI law in ASEAN; risk-based approach with human oversight mandates' },
      { name: 'Civil Code', year: 2015, impact: 'Comprehensive codification of contract, property, and tort law' },
      { name: 'Investment Law', year: 2020, impact: 'Streamlined FDI procedures; negative list approach' },
      { name: 'Decree 225/2025', year: 2025, impact: 'Direct appointment of strategic investors for critical projects' },
    ],
    majorDeals: [
      { name: 'Samsung Vietnam Expansion', value: '$2B', year: 2023, type: 'Technology' },
      { name: 'VinFast EV Manufacturing', value: '$4B', year: 2024, type: 'Automotive' },
      { name: 'Offshore Wind Projects', value: '$5B', year: 2026, type: 'Energy' },
    ],
    legalMarketSize: { lawyers: '~15,000', topFirmsRevenue: '$50M+', growthRate: '20%+' },
    barriersToEntry: ['Foreign lawyers cannot practice Vietnamese law', 'Vietnamese bar required for courts', 'Land-use rights complexity'],
    regulatoryTrends: ['AI regulation leading ASEAN', 'Energy transition frameworks', 'Data protection law expected 2026'],
    comparisonNotes: [{ vs: 'Indonesia', advantage: 'Faster FDI approvals', disadvantage: 'Smaller market' }],
    talentMarket: { avgPartnerSalary: '$100K-$250K', associateHiring: 'High demand bilingual lawyers', lateralMoves: 'Intl firms opening offices' },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'AI Law Passed', description: 'First ASEAN standalone AI law enacted' },
      { date: 'Nov 2025', title: 'Decree 225 Active', description: 'Strategic investor appointment mechanism operational' },
    ],
    
    dealFlow: {
      annualDealValue: '$12B (2025)',
      topSectors: ['Manufacturing (40%)', 'Real Estate (25%)', 'Energy (20%)', 'Tech (15%)'],
      activePE: ['VinaCapital', 'Mekong Capital', 'KKR Vietnam', 'Temasek', 'Warburg Pincus'],
      pipelineOutlook: 'China+1 manufacturing boom; offshore wind pipeline; AI compliance surge; infrastructure PPPs accelerating',
    },
    insiderIntel: {
      winningFirms: ['Baker McKenzie VN (deal flow)', 'LNT & Partners (local elite)', 'YKVN (capital markets)', 'Indochine Counsel (corporate)', 'Franco-Vietnamese boutique (compliance)'],
      losingTalent: ['Small local firms losing talent to international firms', 'Ho Chi Minh City firms losing talent to Hanoi (government proximity)'],
      hiddenOpportunities: ['AI compliance first-mover', 'Offshore wind project finance', 'Industrial park legal structuring', 'Vietnam-Singapore cross-border', 'Manufacturing FDI advisory'],
      redFlags: ['Land-use rights disputes common', 'Capital markets expertise limited', 'Arbitration capacity insufficient', 'Regulatory uncertainty in new sectors'],
      marketTiming: 'EARLY CYCLE: AI law leadership; manufacturing boom; offshore wind opening. Prime entry window.',
    },
    competitiveLandscape: {
      tier1: ['Baker McKenzie VN', 'LNT & Partners', 'YKVN'],
      tier2: ['Indochine Counsel', 'Franco-Vietnamese firms', 'Regional ASEAN firms'],
      boutiques: ['Real estate specialists', 'IP boutiques', 'Compliance advisory shops'],
      newEntrants: ['Kirkland & Ellis Vietnam desk', 'Korean firms (Samsung ecosystem)'],
    },
    arbitrageOpportunities: [
      { type: 'AI Compliance First-Mover', description: 'Only law with AI-specific statute in ASEAN; advisory market empty', riskLevel: 'Low', expectedReturn: 'Define market standards; premium rates' },
      { type: 'Offshore Wind', description: 'Decree 225 creates project finance opportunity; expertise scarce', riskLevel: 'Medium', expectedReturn: '25-40% above market rates for specialized expertise' },
    ],
    partnerIntel: {
      totalPartners: '~180',
      partnerGrowth: '+18% YoY',
      lateralHires2024: '~15 partners (regional moves)',
      departedPartners: '~5 (mostly to Singapore)',
      avgYearsToPartner: '8-10 years (local); 10-12 years (international)',
    },
    clientIntel: {
      keyClients: ['Samsung Vietnam', 'VinGroup', 'Masan Group', 'FPT', 'Foreign manufacturers (Intel, Foxconn)', 'SOEs'],
      clientSpendingTrend: '+35% YoY on external counsel',
      procurementChanges: 'International firms gaining share; demand for ASEAN regional capability',
      ratePressure: 'Low - rates rising 10-15% annually due to talent shortage',
    },
  },
  {
    id: 'indonesia', name: 'Indonesia', region: 'Southeast Asia', type: 'Civil Law',
    momentum: 7, marketSize: 'ASEAN\'s largest economy, ~$1.4T GDP',
    foundedLaw: 'Job Creation Law (2020), Capital Markets Law, IKN Law (2022)',
    keyRegulators: ['OJK', 'BKPM', 'Ministry of Energy & Mineral Resources', 'KPPU'],
    topFirms: ['HHP Law (Baker McKenzie)', 'Assegaf Hamzah', 'Hadiputranto Hadinoto', 'Wong & Partners associate'],
    boomingAreas: ['Natural Resources / Coal Export Controls', 'Renewable Energy (Geothermal, Solar)', 'E-commerce / Fintech / Digital Banking', 'Infrastructure / PPPs', 'IKN New Capital City', 'Data Protection'],
    gaps: ['Regulatory unpredictability (BPJS, local-content)', 'Foreign firms cannot practice domestic law directly', 'Bilingual (Bahasa/English) transactional lawyers scarce'],
    relationships: [
      { target: 'singapore', strength: 8, label: 'ASEAN Lead' },
      { target: 'china', strength: 6, label: 'Belt Road' },
      { target: 'australia', strength: 5, label: 'Resources' },
    ],
    description: 'Favoured destination for China+1 supply chain relocation. New capital city (IKN) creating massive infrastructure legal demand.',
    latestReform: '2025: New investment minimum requirements and export control regimes for natural resources.',
    color: '#f97316',
    
    keyStatutes: [
      { name: 'Job Creation Law (Omnibus Law)', year: 2020, impact: 'Streamlined business licensing; controversial labor provisions; partially revised 2022' },
      { name: 'Capital Markets Law', year: 1995, impact: 'Established OJK; modernized securities regulation' },
      { name: 'IKN Law', year: 2022, impact: 'Legal framework for new capital city; special economic zone status' },
      { name: 'Personal Data Protection Law', year: 2022, impact: 'GDPR-style data protection; extraterritorial reach' },
    ],
    majorDeals: [
      { name: 'Freeport Indonesia Stake', value: '$3.85B', year: 2018, type: 'Mining / Divestment' },
      { name: 'Gojek-Tokopedia Merger', value: '$18B', year: 2021, type: 'Technology / Merger' },
      { name: 'IKN Infrastructure Phase 1', value: '$30B', year: 2024, type: 'Infrastructure / PPP' },
    ],
    legalMarketSize: { lawyers: '~35,000', topFirmsRevenue: '$100M+', growthRate: '15%+' },
    barriersToEntry: ['Foreign lawyers cannot practice Indonesian law', 'Bahasa Indonesia essential', 'Regulatory unpredictability'],
    regulatoryTrends: ['Resource nationalism increasing', 'IKN legal framework evolving', 'Data protection enforcement ramping up'],
    comparisonNotes: [{ vs: 'Vietnam', advantage: 'Larger domestic market', disadvantage: 'More complex regulatory environment' }],
    talentMarket: { avgPartnerSalary: '$150K-$300K', associateHiring: 'Demand for bilingual lawyers', lateralMoves: 'Regional firms expanding' },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'IKN Phase 1 Launch', description: 'Government offices begin relocation to Nusantara' },
      { date: 'Oct 2025', title: 'Export Controls Tightened', description: 'New regulations on nickel and coal exports' },
    ],
    
    dealFlow: {
      annualDealValue: '$22B (2025)',
      topSectors: ['Resources (35%)', 'Infrastructure (25%)', 'Digital Economy (20%)', 'Financial Services (20%)'],
      activePE: ['Northstar', 'TPG', 'Sequoia SEA', 'East Ventures', 'SoftBank'],
      pipelineOutlook: 'IKN moving slowly but creating legal demand; resources nationalism creating work; fintech regulation maturing',
    },
    insiderIntel: {
      winningFirms: ['HHP/Baker McKenzie (international)', 'Assegaf Hamzah (local elite)', 'Hadiputranto Hadinoto (resources)', 'Wong & Partners (corporate)'],
      losingTalent: ['Small local firms to international platforms', 'Senior associates moving to Singapore/HK for international exposure'],
      hiddenOpportunities: ['IKN-specific legal work', 'Resource nationalism compliance', 'Fintech licensing boutique', 'Halal fintech structuring'],
      redFlags: ['Regulatory unpredictability chronic', 'IKN timeline delays', 'Resource sector volatility', 'Language barrier significant'],
      marketTiming: 'SELECTIVE: Resources work strong; IKN slower than expected; fintech maturing. Focus on specific niches.',
    },
    competitiveLandscape: {
      tier1: ['HHP/Baker McKenzie', 'Assegaf Hamzah', 'Hadiputranto Hadinoto'],
      tier2: ['Wong & Partners', 'RHTLaw', 'Regional ASEAN firms'],
      boutiques: ['Fintech specialists', 'Resources niche firms', 'Local litigation boutiques'],
      newEntrants: ['Vietnamese firms eyeing expansion', 'Australian firms for resources'],
    },
    arbitrageOpportunities: [
      { type: 'IKN Niche', description: 'First-mover legal expertise for new capital city', riskLevel: 'Medium', expectedReturn: 'Government work pipeline' },
      { type: 'Resources Compliance', description: 'Export controls and downstream processing regulations', riskLevel: 'Medium', expectedReturn: 'Retainer relationships with miners' },
    ],
    partnerIntel: {
      totalPartners: '~450',
      partnerGrowth: '+12% YoY',
      lateralHires2024: '~20 partners (regional)',
      departedPartners: '~10 (to Singapore/HK)',
      avgYearsToPartner: '9-11 years',
    },
    clientIntel: {
      keyClients: ['Freeport McMoRan', 'Gojek', 'Bank Mandiri', 'Pertamina', 'Astra International'],
      clientSpendingTrend: '+20% YoY',
      procurementChanges: 'International firms winning more mandates from resources clients',
      ratePressure: 'Moderate - local firms competing on price',
    },
  },
  {
    id: 'philippines', name: 'Philippines', region: 'Southeast Asia', type: 'Civil Law',
    momentum: 6, marketSize: 'Large-ticket deals rising in energy, infra, financials',
    foundedLaw: 'Civil Code, Corporation Code, Competition Act (2015)',
    keyRegulators: ['Philippine Competition Commission (PCC)', 'SEC', 'DOJ', 'DOLE'],
    topFirms: ['Romulo Mabanta', 'SyCip Salazar', 'Picazo Buyco', 'Mosveldtt Law', 'Quisumbing Torres (Baker)'],
    boomingAreas: ['Energy / Infrastructure', 'Healthcare / Gaming / Data Centres', 'Financial Services M&A', 'Competition / Merger Control', 'PEZA / BOI Incentive Structuring', 'CEPA with UAE'],
    gaps: ['Overlooked vs Indonesia/Vietnam', 'PEZA vs BOI structuring knowledge gap', 'Labour-law illegal-dismissal exposure persistent', 'Local litigation + int\'l arbitration bridge weak'],
    relationships: [
      { target: 'singapore', strength: 7, label: 'ASEAN Lead' },
      { target: 'uae', strength: 5, label: 'CEPA Trade' },
      { target: 'usa', strength: 4, label: 'BPO / Services' },
    ],
    description: 'Often overlooked but deal values are rising. PCC thresholds adjusted March 2025. CEPA with UAE opening new trade corridors.',
    latestReform: 'March 2025: PCC notification thresholds adjusted to PHP 8.5bn / PHP 3.5bn.',
    color: '#a855f7',
    
    keyStatutes: [
      { name: 'Competition Act', year: 2015, impact: 'Established PCC; mandatory merger notification thresholds' },
      { name: 'Corporation Code', year: 1980, impact: 'Corporate governance framework; recent amendments for digitalization' },
      { name: 'Renewable Energy Act', year: 2008, impact: 'Feed-in tariff system; driving energy transition legal work' },
    ],
    majorDeals: [
      { name: 'Meralco Strategic Partnership', value: '$1.5B', year: 2024, type: 'Energy / Infrastructure' },
      { name: 'BPO Sector Consolidation', value: '$500M', year: 2025, type: 'Services / M&A' },
    ],
    legalMarketSize: { lawyers: '~45,000', topFirmsRevenue: '$80M+', growthRate: '12%+' },
    barriersToEntry: ['Philippine bar required for practice', 'Complex incentive regime navigation', 'Labor law complexity'],
    regulatoryTrends: ['PCC enforcement intensifying', 'CEPA with UAE opening opportunities', 'Data privacy law evolution'],
    comparisonNotes: [{ vs: 'Indonesia', advantage: 'English widely used', disadvantage: 'Smaller deal sizes' }],
    talentMarket: { avgPartnerSalary: '$100K-$200K', associateHiring: 'Steady demand', lateralMoves: 'Limited international firm presence' },
    recentDevelopments: [
      { date: 'Mar 2025', title: 'PCC Threshold Update', description: 'Merger notification thresholds increased to PHP 8.5bn' },
    ],
    
    dealFlow: {
      annualDealValue: '$8B (2025)',
      topSectors: ['Energy (30%)', 'Infrastructure (25%)', 'BPO/Services (20%)', 'Real Estate (15%)', 'Consumer (10%)'],
      activePE: ['Ayala Capital', 'JG Summit', 'Metro Pacific', 'SM Investments'],
      pipelineOutlook: 'Often overlooked but deal quality improving; CEPA with UAE opening trade; energy transition creating opportunities',
    },
    insiderIntel: {
      winningFirms: ['SyCip Salazar (local elite)', 'Romulo Mabanta (international)', 'Picazo Buyco (corporate)', 'Quisumbing Torres (Baker)'],
      losingTalent: ['Mid-levels leaving for Singapore/HK', 'Small firm partners moving to larger platforms'],
      hiddenOpportunities: ['CEPA arbitrage (UAE corridor)', 'Renewable energy incentives structuring', 'BPO legal services export', 'Data centre work growing'],
      redFlags: ['Often overlooked by international firms', 'Competition enforcement nascent', 'Labor law complexity', 'Court delays chronic'],
      marketTiming: 'UNDERVALUED: Less competition than Indonesia/Vietnam. Quality deal flow hidden from mainstream radar.',
    },
    competitiveLandscape: {
      tier1: ['SyCip Salazar', 'Romulo Mabanta', 'Picazo Buyco'],
      tier2: ['Quisumbing Torres', 'SycipLaw', 'Regional firms'],
      boutiques: ['Energy specialists', 'Labor law boutiques', 'Local litigation'],
      newEntrants: ['Singapore firms opening desks', 'UAE firms post-CEPA'],
    },
    arbitrageOpportunities: [
      { type: 'CEPA Arbitrage', description: 'Philippines-UAE trade corridor underserved legally', riskLevel: 'Low', expectedReturn: 'First-mover in new trade lane' },
      { type: 'Renewable Incentives', description: 'BOI/PEZA green energy incentives specialization', riskLevel: 'Low', expectedReturn: 'Recurring advisory retainers' },
    ],
    partnerIntel: {
      totalPartners: '~280',
      partnerGrowth: '+8% YoY',
      lateralHires2024: '~12 partners',
      departedPartners: '~8 (to Singapore/HK)',
      avgYearsToPartner: '8-10 years',
    },
    clientIntel: {
      keyClients: ['Ayala Corp', 'SM Group', 'JG Summit', 'Manila Electric', 'BDO Unibank'],
      clientSpendingTrend: '+15% YoY',
      procurementChanges: 'More open to international firms for cross-border work',
      ratePressure: 'Low - less competition than neighbors',
    },
  },
  {
    id: 'japan', name: 'Japan', region: 'East Asia', type: 'Civil Law',
    momentum: 8, marketSize: 'Record M&A: USD 230-350bn in 2025',
    foundedLaw: 'Civil Code (2020 reform), Companies Act, FEFTA (1949, ongoing reform)',
    keyRegulators: ['JFSA', 'METI', 'JFTC', 'Ministry of Justice'],
    topFirms: ['Anderson Mori & Tomotsune', 'Nagashima Ohno', 'Mori Hamada & Matsumoto', 'Atsumi & Sakai', 'TMI'],
    boomingAreas: ['M&A / Corporate Restructuring', 'Activist Defence / Governance', 'Sports / Entertainment Law', 'Real Estate / Infrastructure / Funds', 'Commercial Litigation', 'FEFTA Compliance'],
    gaps: ['English-fluent cross-border M&A lawyers scarce', 'FEFTA compliance expertise critical', 'Talent thin in real estate, infrastructure, funds'],
    relationships: [
      { target: 'singapore', strength: 6, label: 'ASEAN Invest' },
      { target: 'southkorea', strength: 6, label: 'Tech / Chips' },
      { target: 'usa', strength: 7, label: 'Cross-Border' },
    ],
    description: 'Shattered all M&A records in 2025. Most concentrated wave of regulatory reform in modern history (FEFTA amendments, cross-ministerial).',
    latestReform: '2025-2026: FEFTA amendment direction set; indirect acquisition regulations and post-investment intervention proposed.',
    color: '#6366f1',
    
    keyStatutes: [
      { name: 'Civil Code Reform', year: 2020, impact: 'First major reform in 120 years; modernized contract and tort law' },
      { name: 'Companies Act', year: 2005, impact: 'Corporate governance framework; board structure requirements' },
      { name: 'FEFTA', year: 1949, impact: 'Foreign investment screening; undergoing major 2025-2026 reform' },
      { name: 'Anti-Monopoly Act', year: 1947, impact: 'Competition law; JFTC enforcement powers' },
    ],
    majorDeals: [
      { name: 'Toshiba Delisting', value: '$14B', year: 2023, type: 'Take-Private' },
      { name: 'Sony-Bungie Acquisition', value: '$3.6B', year: 2022, type: 'Gaming / M&A' },
      { name: 'Nippon Steel-US Steel', value: '$14.9B', year: 2024, type: 'Steel / Cross-border' },
    ],
    legalMarketSize: { lawyers: '~42,000', topFirmsRevenue: '$500M+', growthRate: '10%+' },
    barriersToEntry: ['Japan bar required for Japanese law', 'English fluency scarce among senior lawyers', 'Unique corporate culture'],
    regulatoryTrends: ['FEFTA reform expanding scope', 'Activist defense work increasing', 'Sports law emerging specialty'],
    comparisonNotes: [{ vs: 'USA', advantage: 'Strong M&A deal flow', disadvantage: 'Language barrier for foreign lawyers' }],
    talentMarket: { avgPartnerSalary: '$300K-$600K', associateHiring: 'High demand bilingual associates', lateralMoves: 'Intl firms hiring Japanese partners' },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'FEFTA Reform Proposal', description: 'New regulations on indirect acquisitions' },
      { date: 'Oct 2025', title: 'Record M&A Year', description: '2025 deal values hit $350B' },
    ],
    
    dealFlow: {
      annualDealValue: '$350B (2025)',
      topSectors: ['M&A (40%)', 'Real Estate (20%)', 'PE/Activist (20%)', 'Sports/Entertainment (10%)', 'Litigation (10%)'],
      activePE: ['Bain Capital', 'KKR Japan', 'Carlyle', 'Advent', 'Blackstone'],
      pipelineOutlook: 'M&A boom continuing; activist defense growing; sports law emerging; real estate/infrastructure funds active',
    },
    insiderIntel: {
      winningFirms: ['Anderson Mori & Tomotsune (volume)', 'Nagashima Ohno (elite)', 'Mori Hamada (PE)', 'Atsumi & Sakai (cross-border)', 'TMI (diverse)'],
      losingTalent: ['International firms losing associates to Japanese firms', 'Small firms struggling to retain mid-levels'],
      hiddenOpportunities: ['Sports law specialization', 'Activist defense boutique', 'FEFTA compliance advisory', 'English-language fund formation', 'Cross-border sports M&A'],
      redFlags: ['English fluency gaps at senior levels', 'Conservative partnership culture', 'FEFTA compliance complexity increasing', 'Geographic distance from other Asian markets'],
      marketTiming: 'ACTIVE CYCLE: Record M&A creating sustained demand. Sports/entertainment emerging. Entry window open for bilingual specialists.',
    },
    competitiveLandscape: {
      tier1: ['Anderson Mori', 'Nagashima Ohno', 'Mori Hamada'],
      tier2: ['Atsumi & Sakai', 'TMI', 'Nishimura & Asahi'],
      boutiques: ['Sports law specialists', 'FEFTA boutique firms', 'English-language fund boutiques'],
      newEntrants: ['US firms adding Tokyo partners', 'Korean firms eyeing Japan desks'],
    },
    arbitrageOpportunities: [
      { type: 'English Bilingual Premium', description: 'English-fluent Japanese lawyers command 50-100% premium for cross-border work', riskLevel: 'Low', expectedReturn: 'Premium rates for scarce bilingual talent' },
      { type: 'Sports Law First-Mover', description: 'J. League commercialization and sports M&A creating demand', riskLevel: 'Low', expectedReturn: 'First-mover niche capture' },
    ],
    partnerIntel: {
      totalPartners: '~2,400',
      partnerGrowth: '+8% YoY',
      lateralHires2024: '~35 partners',
      departedPartners: '~15',
      avgYearsToPartner: '12-14 years (traditional); 10-12 years (international)',
    },
    clientIntel: {
      keyClients: ['Toyota', 'Sony', 'SoftBank', 'Mitsubishi', 'Hitachi', 'Nippon Steel', 'Fast Retailing'],
      clientSpendingTrend: '+15% YoY',
      procurementChanges: 'Conservative but increasing external counsel for cross-border',
      ratePressure: 'Low - stable rate environment',
    },
  },
  {
    id: 'southkorea', name: 'South Korea', region: 'East Asia', type: 'Civil Law',
    momentum: 7, marketSize: 'M&A value & volume both up 2025',
    foundedLaw: 'Civil Code, Commercial Act, Monopoly Regulation Act, Offshore Wind Special Act (Mar 2025)',
    keyRegulators: ['FSC', 'KFTC', 'MOTIE', 'Korea Energy Agency'],
    topFirms: ['Kim & Chang', 'Bae Kim & Lee', 'Lee & Ko', 'Yoon & Yang', 'Shin & Kim'],
    boomingAreas: ['M&A / Conglomerate Restructuring', 'Technology / AI / Biopharma / Chips', 'Offshore Wind (zone-based planning)', 'Private Equity / Funds', 'Labour / Employment', 'MTO Rule (proposed)'],
    gaps: ['MTO proposals could fundamentally change acquisition structures', 'PE fundraising share in APAC declined', 'Korea desks in Singapore drawing talent away from Seoul'],
    relationships: [
      { target: 'japan', strength: 6, label: 'Tech / Chips' },
      { target: 'singapore', strength: 5, label: 'Desk Shift' },
      { target: 'vietnam', strength: 5, label: 'Tech FDI' },
    ],
    description: 'Government push for chip self-sufficiency driving tech law demand. Offshore Wind Special Act (effective March 2026) creates new project-finance work.',
    latestReform: '2025-2026: Mandatory Tender Offer (MTO) rule under consideration; 100% vs majority model debate.',
    color: '#8b5cf6',
    
    keyStatutes: [
      { name: 'Offshore Wind Special Act', year: 2025, impact: 'Zone-based development; project finance opportunities' },
      { name: 'Monopoly Regulation Act', year: 1980, impact: 'Merger control; KFTC enforcement' },
      { name: 'Commercial Act', year: 1962, impact: 'Corporate law framework' },
    ],
    majorDeals: [
      { name: 'SK Hynix Intel NAND', value: '$9B', year: 2021, type: 'Semiconductor / M&A' },
      { name: 'Coupang IPO', value: '$4.6B', year: 2021, type: 'Technology / IPO' },
    ],
    legalMarketSize: { lawyers: '~25,000', topFirmsRevenue: '$300M+', growthRate: '8%+' },
    barriersToEntry: ['Korean bar required', 'Language barrier significant', 'Chaebol-centric business culture'],
    regulatoryTrends: ['Offshore wind framework new', 'MTO reform debate', 'Chip self-sufficiency drive'],
    comparisonNotes: [{ vs: 'Japan', advantage: 'Tech sector growth', disadvantage: 'Smaller M&A market' }],
    talentMarket: { avgPartnerSalary: '$200K-$400K', associateHiring: 'Steady demand', lateralMoves: 'Some talent moving to Singapore' },
    recentDevelopments: [
      { date: 'Mar 2025', title: 'Offshore Wind Act', description: 'Special Act enacted for zone-based offshore wind' },
    ],
    
    dealFlow: {
      annualDealValue: '$45B (2025)',
      topSectors: ['Semiconductors (25%)', 'M&A (25%)', 'PE/Funds (20%)', 'Energy (15%)', 'Entertainment (15%)'],
      activePE: ['MBK Partners', 'IMM', 'Hahn & Co', 'Korea Development Bank', 'KDB'],
      pipelineOutlook: 'Chip self-sufficiency driving deals; offshore wind projects starting; MTO reform debate creating advisory demand; PE exit windows opening',
    },
    insiderIntel: {
      winningFirms: ['Kim & Chang (elite)', 'Bae Kim & Lee (chaebol)', 'Lee & Ko (tech)', 'Shin & Kim (diverse)', 'Yoon & Yang (cross-border)'],
      losingTalent: ['Mid-levels moving to Singapore desks', 'International firms struggling with Korean language requirements'],
      hiddenOpportunities: ['Offshore wind project finance', 'Chip supply chain legal advisory', 'K-pop entertainment law', 'MTO reform readiness', 'Korean PE exit structuring'],
      redFlags: ['Chaebol relationship barriers for outsiders', 'MTO uncertainty affecting deal structures', 'Korean language essential for local work', 'PE fundraising declining'],
      marketTiming: 'ACTIVE: Chip boom and offshore wind creating demand. MTO reform uncertainty creating advisory opportunities.',
    },
    competitiveLandscape: {
      tier1: ['Kim & Chang', 'Bae Kim & Lee', 'Lee & Ko'],
      tier2: ['Shin & Kim', 'Yoon & Yang', 'Regional firms'],
      boutiques: ['Entertainment law specialists', 'Offshore wind boutiques', 'PE niche firms'],
      newEntrants: ['Japanese firms for cross-border', 'US firms adding Seoul desks'],
    },
    arbitrageOpportunities: [
      { type: 'Offshore Wind Niche', description: 'Zone-based planning expertise extremely scarce; first-mover advantage', riskLevel: 'Medium', expectedReturn: 'Project finance advisory retainers' },
      { type: 'Entertainment Law', description: 'K-pop global expansion creating IP and contract demand', riskLevel: 'Low', expectedReturn: 'Recurring artist/label relationships' },
    ],
    partnerIntel: {
      totalPartners: '~680',
      partnerGrowth: '+10% YoY',
      lateralHires2024: '~25 partners',
      departedPartners: '~10 (to Singapore)',
      avgYearsToPartner: '10-12 years',
    },
    clientIntel: {
      keyClients: ['Samsung', 'SK Group', 'Hyundai', 'LG', 'Korea Investment Corp', 'Naver'],
      clientSpendingTrend: '+18% YoY',
      procurementChanges: 'Chaebols consolidating panels; preferring firms with deep sector expertise',
      ratePressure: 'Moderate - rates stable but demanding expertise premiums',
    },
  },
  {
    id: 'india', name: 'India', region: 'South Asia', type: 'Common Law',
    momentum: 8, marketSize: 'Billion-dollar deals rising; services market growing 6.7% CAGR',
    foundedLaw: 'Constitution (1950), Companies Act (2013), IBC (2016), DPDP Act (2023)',
    keyRegulators: ['SEBI', 'RBI', 'NCLT / NCLAT', 'CCI', 'MCA'],
    topFirms: ['Cyril Amarchand Mangaldas', 'Shardul Amarchand', 'AZB & Partners', 'JSA', 'Trilegal', 'Khaitan & Co'],
    boomingAreas: ['Financial Services M&A (Banks)', 'Consumer Goods / Real Estate / Pharma', 'Global Capability Centres / Data Centres', 'Energy Transition (Solar, Green H2)', 'IBC / Insolvency', 'DPDP Compliance'],
    gaps: ['Judicial backlog / enforcement delays chronic', 'IBC expertise demand >> supply', 'Cross-border tax / transfer pricing disputes', 'Foreign firms still restricted from Indian law practice'],
    relationships: [
      { target: 'singapore', strength: 7, label: 'Arb / Funds' },
      { target: 'uae', strength: 6, label: 'Remittance / Trade' },
      { target: 'usa', strength: 8, label: 'IT / Services' },
    ],
    description: 'Talent wars: Indian firms scaling rapidly, offering international-firm compensation. IBC has created a new practice area from scratch. Foreign law firm entry still restricted.',
    latestReform: '2023 DPDP Act taking effect; IBC amendments ongoing to speed resolution.',
    color: '#f43f5e',
    
    keyStatutes: [
      { name: 'IBC', year: 2016, impact: 'Comprehensive insolvency law; new practice area creation' },
      { name: 'Companies Act', year: 2013, impact: 'Modernized corporate law; CSR requirements' },
      { name: 'DPDP Act', year: 2023, impact: 'Data protection framework; digital personal data' },
      { name: 'SEBI Regulations', year: 1992, impact: 'Capital markets regulator; continuous evolution' },
    ],
    majorDeals: [
      { name: 'HDFC-HDFC Bank Merger', value: '$60B', year: 2023, type: 'Financial / Merger' },
      { name: 'Reliance-Disney JV', value: '$8.5B', year: 2024, type: 'Media / JV' },
      { name: 'Adani Enterprises FPO', value: '$2.5B', year: 2024, type: 'Capital Markets' },
    ],
    legalMarketSize: { lawyers: '~1.5M+ (largest globally)', topFirmsRevenue: '$400M+', growthRate: '15%+' },
    barriersToEntry: ['Foreign firms cannot practice Indian law', 'Indian bar required', 'Judicial backlog'],
    regulatoryTrends: ['IBC maturing', 'DPDP enforcement beginning', 'Energy transition laws'],
    comparisonNotes: [{ vs: 'China', advantage: 'Common law system', disadvantage: 'Judicial delays' }],
    talentMarket: { avgPartnerSalary: '$150K-$400K', associateHiring: 'High demand IBC specialists', lateralMoves: 'Talent wars between top firms' },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'DPDP Enforcement', description: 'First penalties under DPDP Act' },
      { date: 'Oct 2025', title: 'IBC Amendments', description: 'Ongoing amendments to speed resolution' },
    ],
    
    dealFlow: {
      annualDealValue: '$65B (2025)',
      topSectors: ['Financial Services (25%)', 'Real Estate (20%)', 'Energy/Infra (20%)', 'Consumer/Pharma (20%)', 'Tech (15%)'],
      activePE: ['Warburg Pincus', 'KKR India', 'Blackstone India', 'TPG', 'True North', 'Baring PE'],
      pipelineOutlook: 'IBC work sustained; DPDP compliance growing; banking M&A active; data centre boom; energy transition accelerating',
    },
    insiderIntel: {
      winningFirms: ['Cyril Amarchand Mangaldas (elite)', 'Shardul Amarchand (M&A)', 'AZB & Partners (PE)', 'Trilegal (funds)', 'Khaitan & Co (full service)', 'JSA (corporate)'],
      losingTalent: ['International firms unable to practice Indian law', 'Senior associates poached by Indian firms with international-firm salaries'],
      hiddenOpportunities: ['IBC boutique creation', 'DPDP compliance specialization', 'Data centre legal structuring', 'Global Capability Centre advisory', 'Green hydrogen project finance'],
      redFlags: ['Judicial backlog chronic', 'Foreign firm practice restriction', 'IBC timeline delays frustrating clients', 'Talent wars inflating salaries', 'Regulatory unpredictability'],
      marketTiming: 'PRIME: IBC and DPDP creating new practice areas. Indian firms scaling internationally. Talent costs rising but deal flow supporting.',
    },
    competitiveLandscape: {
      tier1: ['Cyril Amarchand', 'Shardul Amarchand', 'AZB & Partners'],
      tier2: ['Trilegal', 'Khaitan & Co', 'JSA', 'S&R Associates'],
      boutiques: ['IBC specialists', 'DPDP compliance shops', 'Fund formation boutiques'],
      newEntrants: ['Indian firms opening London/Singapore', 'UK barristers chamber model'],
    },
    arbitrageOpportunities: [
      { type: 'IBC Boutique', description: 'IBC expertise demand far exceeds supply; specialized boutique can command premium', riskLevel: 'Low', expectedReturn: '2-3x market rates for IBC specialists' },
      { type: 'GCC Advisory', description: 'Global Capability Centre legal structuring underserved', riskLevel: 'Low', expectedReturn: 'Recurring corporate retainers' },
    ],
    partnerIntel: {
      totalPartners: '~1,200 at top 20 firms',
      partnerGrowth: '+15% YoY',
      lateralHires2024: '~85 partners (massive talent movement)',
      departedPartners: '~45 (firm-hopping)',
      avgYearsToPartner: '10-12 years',
    },
    clientIntel: {
      keyClients: ['Reliance', 'Tata Group', 'Adani Group', 'HDFC', 'ICICI', 'State Bank of India', 'Infosys'],
      clientSpendingTrend: '+30% YoY',
      procurementChanges: 'Panel consolidation; preferring full-service capability',
      ratePressure: 'High - salary wars forcing rate increases',
    },
  },
  {
    id: 'malaysia', name: 'Malaysia', region: 'Southeast Asia', type: 'Common Law',
    momentum: 7, marketSize: 'M&A surged ~87% YoY to USD 8.3bn',
    foundedLaw: 'Companies Act 2016, Competition Act 2010, NIF 2026',
    keyRegulators: ['SC Malaysia', 'MyCC', 'MIDA', 'Ministry of Finance'],
    topFirms: ['Wong & Partners (Baker)', 'Skrine', 'Zaid Ibrahim', 'Christopher & Lee Ong'],
    boomingAreas: ['Communications / Tech M&A', 'Semiconductor Ecosystem / FDI', 'Infrastructure / Healthcare', 'NIF 2026 Manufacturing Incentives', 'Halal Trade / Certification', 'Competition / Merger Control'],
    gaps: ['Deep tech / semiconductor legal expertise scarce', 'Regional ASEAN integration legal frameworks underdeveloped'],
    relationships: [
      { target: 'singapore', strength: 9, label: 'ASEAN Lead' },
      { target: 'indonesia', strength: 6, label: 'Halal / Trade' },
      { target: 'china', strength: 5, label: 'Manufacturing' },
    ],
    description: 'Semiconductor ecosystem attracting massive FDI. Halal trade law is an underexplored but growing specialty.',
    latestReform: '2026: New Industrial Master Plan (NIMP) and NIF manufacturing incentives.',
    color: '#14b8a6',
    
    keyStatutes: [
      { name: 'Companies Act 2016', year: 2016, impact: 'Modernized corporate law; audit requirements' },
      { name: 'Competition Act 2010', year: 2010, impact: 'Established MyCC; merger control' },
      { name: 'NIF 2026', year: 2026, impact: 'New incentives for high-value manufacturing' },
    ],
    majorDeals: [
      { name: 'Intel Penang Expansion', value: '$7B', year: 2024, type: 'Semiconductor' },
      { name: 'TSMC JV', value: 'Under negotiation', year: 2025, type: 'Technology' },
    ],
    legalMarketSize: { lawyers: '~20,000', topFirmsRevenue: '$100M+', growthRate: '10%+' },
    barriersToEntry: ['Malaysian bar required for domestic law', 'Sharia law considerations for Muslim matters', 'Bilingual needs'],
    regulatoryTrends: ['Semiconductor incentives attracting FDI', 'Halal certification growing', 'NIF 2026 implementation'],
    comparisonNotes: [{ vs: 'Singapore', advantage: 'Lower costs', disadvantage: 'Smaller market' }],
    talentMarket: { avgPartnerSalary: '$120K-$250K', associateHiring: 'Semiconductor expertise demand', lateralMoves: 'Regional expansion' },
    recentDevelopments: [
      { date: 'Jan 2026', title: 'NIF 2026 Launch', description: 'New incentives for high-value manufacturing' },
    ],
    
    dealFlow: {
      annualDealValue: '$8.3B (2025)',
      topSectors: ['Semiconductors (30%)', 'Tech M&A (25%)', 'Infrastructure (20%)', 'Healthcare (15%)', 'Energy (10%)'],
      activePE: ['Khazanah', 'Creador', 'Navis Capital', 'Permodalan Nasional'],
      pipelineOutlook: 'Semiconductor ecosystem attracting massive FDI; NIF 2026 creating manufacturing incentives; halal trade growing; ASEAN integration work',
    },
    insiderIntel: {
      winningFirms: ['Wong & Partners (Baker)', 'Skrine (local elite)', 'Zaid Ibrahim (Islamic finance)', 'Christopher & Lee Ong (corporate)'],
      losingTalent: ['Mid-levels moving to Singapore', 'International firms struggling with Sharia complexity'],
      hiddenOpportunities: ['Semiconductor legal structuring', 'Halal certification legal framework', 'NIF incentive advisory', 'ASEAN cross-border work', 'Digital banking licensing'],
      redFlags: ['Sharia compliance complexity', 'Bilingual needs (Malay/English)', 'Smaller market than Singapore/Indonesia', 'Regulatory unpredictability in resources'],
      marketTiming: 'SELECTIVE: Semiconductor boom creating niche opportunities. ASEAN integration work growing.',
    },
    competitiveLandscape: {
      tier1: ['Wong & Partners', 'Skrine', 'Zaid Ibrahim'],
      tier2: ['Christopher & Lee Ong', 'Regional firms', 'Baker McKenzie'],
      boutiques: ['Islamic finance specialists', 'Semiconductor IP boutiques', 'Halal certification shops'],
      newEntrants: ['Singapore firms expanding north', 'Korean firms for semiconductor'],
    },
    arbitrageOpportunities: [
      { type: 'Semiconductor Structuring', description: 'NIF incentives + FDI structuring expertise scarce', riskLevel: 'Low', expectedReturn: 'Retainer relationships with chip makers' },
      { type: 'Halal Finance', description: 'Underserved niche with growing global demand', riskLevel: 'Low', expectedReturn: 'Premium for specialized expertise' },
    ],
    partnerIntel: {
      totalPartners: '~320',
      partnerGrowth: '+8% YoY',
      lateralHires2024: '~15 partners',
      departedPartners: '~8',
      avgYearsToPartner: '9-11 years',
    },
    clientIntel: {
      keyClients: ['Petronas', 'Maybank', 'CIMB', 'Intel Malaysia', 'TSMC JV partners', 'Khazanah portfolio companies'],
      clientSpendingTrend: '+20% YoY',
      procurementChanges: 'Semiconductor clients demanding sector expertise',
      ratePressure: 'Moderate - rates stable',
    },
  },
  {
    id: 'thailand', name: 'Thailand', region: 'Southeast Asia', type: 'Civil Law',
    momentum: 6, marketSize: 'Tourism recovery + BOI-driven manufacturing',
    foundedLaw: 'Civil & Commercial Code, Foreign Business Act, Investment Promotion Act',
    keyRegulators: ['BOI', 'DBD', 'SEC Thailand', 'NBTC'],
    topFirms: ['Tilleke & Gibbins', 'Baker McKenzie Thailand', 'Chandler MHM', 'Nishimura & Asahi (Thai)'],
    boomingAreas: ['Tourism / Hospitality / Real Estate', 'Automotive / BOI Manufacturing', 'Digital Banking / Fintech', 'Omnibus Law Plan (streamlining)', 'Digital Work Permits', 'E-commerce / Logistics'],
    gaps: ['Political instability affects legal certainty', 'Foreign ownership restrictions in key sectors', 'Digital economy law lagging behind practice'],
    relationships: [
      { target: 'singapore', strength: 8, label: 'ASEAN Lead' },
      { target: 'japan', strength: 7, label: 'Auto / Invest' },
      { target: 'china', strength: 6, label: 'Tourism / Mfg' },
    ],
    description: 'Omnibus Law Plan is the most significant regulatory simplification effort in ASEAN. Digital work permits and BOI incentives are attracting FDI.',
    latestReform: '2025: Omnibus Law Plan introduced to streamline regulation and cut business costs.',
    color: '#06b6d4',
    
    keyStatutes: [
      { name: 'Civil & Commercial Code', year: 1925, impact: 'Comprehensive civil law codification; ongoing modernization' },
      { name: 'Foreign Business Act', year: 1999, impact: 'Foreign ownership restrictions; Thailand Plus scheme' },
      { name: 'Omnibus Law Plan', year: 2025, impact: 'Streamlining regulations; cutting business costs' },
    ],
    majorDeals: [
      { name: 'Bangkok Airport Expansion', value: '$2B', year: 2024, type: 'Infrastructure' },
      { name: 'BOI EV Investment', value: '$1.5B', year: 2024, type: 'Manufacturing' },
    ],
    legalMarketSize: { lawyers: '~8,000', topFirmsRevenue: '$80M+', growthRate: '8%+' },
    barriersToEntry: ['Thai bar required for domestic practice', 'Language barrier', 'Political instability'],
    regulatoryTrends: ['Omnibus Law implementation', 'Digital economy regulation', 'EV manufacturing incentives'],
    comparisonNotes: [{ vs: 'Vietnam', advantage: 'Established tourism infrastructure', disadvantage: 'Higher labor costs' }],
    talentMarket: { avgPartnerSalary: '$100K-$200K', associateHiring: 'Steady demand', lateralMoves: 'Limited international firm presence' },
    recentDevelopments: [
      { date: 'Nov 2025', title: 'Omnibus Law Rollout', description: 'Streamlining business regulations' },
    ],
    
    dealFlow: {
      annualDealValue: '$6B (2025)',
      topSectors: ['Tourism/Hospitality (30%)', 'Manufacturing (25%)', 'Real Estate (20%)', 'Digital Economy (15%)', 'Energy (10%)'],
      activePE: ['KKR Thailand', 'Baring Asia', 'Nexus Point', 'Navis Capital'],
      pipelineOutlook: 'Omnibus Law creating regulatory simplification demand; BOI incentives attracting EV manufacturing; digital economy regulation evolving',
    },
    insiderIntel: {
      winningFirms: ['Tilleke & Gibbins (elite)', 'Baker McKenzie Thailand', 'Chandler MHM (corporate)', 'Nishimura (Japanese deals)'],
      losingTalent: ['Associates moving to Singapore/HK', 'Political uncertainty causing talent retention issues'],
      hiddenOpportunities: ['Omnibus Law compliance advisory', 'BOI incentive structuring', 'Digital banking licensing', 'EV manufacturing FDI', 'Tourism recovery legal work'],
      redFlags: ['Political instability affecting certainty', 'Foreign ownership restrictions', 'Language barrier for non-Thai speakers', 'Court system delays'],
      marketTiming: 'SELECTIVE: Omnibus Law and BOI incentives creating work. Tourism recovery driving hospitality deals. Political risk requires careful positioning.',
    },
    competitiveLandscape: {
      tier1: ['Tilleke & Gibbins', 'Baker McKenzie Thailand'],
      tier2: ['Chandler MHM', 'Nishimura & Asahi', 'Regional firms'],
      boutiques: ['Tourism/hospitality specialists', 'BOI incentive boutiques', 'Local litigation shops'],
      newEntrants: ['Singapore firms', 'Japanese firms for auto sector'],
    },
    arbitrageOpportunities: [
      { type: 'Omnibus Law Advisory', description: 'Regulatory simplification creates compliance advisory demand', riskLevel: 'Low', expectedReturn: 'Corporate retainers' },
      { type: 'BOI Incentives', description: 'EV and manufacturing incentive structuring underserved', riskLevel: 'Low', expectedReturn: 'Project-based fees' },
    ],
    partnerIntel: {
      totalPartners: '~220',
      partnerGrowth: '+6% YoY',
      lateralHires2024: '~8 partners',
      departedPartners: '~6',
      avgYearsToPartner: '9-11 years',
    },
    clientIntel: {
      keyClients: ['PTT Group', 'Siam Cement', 'Bangkok Bank', 'CP Group', 'Tourism Authority of Thailand'],
      clientSpendingTrend: '+12% YoY',
      procurementChanges: 'Government clients demanding BOI expertise',
      ratePressure: 'Low - moderate competition',
    },
  },
  {
    id: 'australia', name: 'Australia', region: 'Oceania', type: 'Common Law',
    momentum: 7, marketSize: 'Healthy M&A volumes; mining/resources dominant',
    foundedLaw: 'Corporations Act 2001, Competition and Consumer Act, Environment Protection Acts',
    keyRegulators: ['ASIC', 'ACCC', 'Foreign Investment Review Board', 'AER'],
    topFirms: ['Allens', 'King & Wood Mallesons', 'Clayton Utz', 'Ashurst', 'Herbert Smith Freehills', 'MinterEllison'],
    boomingAreas: ['Mining / Critical Minerals / Resources', 'Energy Transition / Renewables', 'Real Estate / Infrastructure', 'Financial Services / Tech', 'ESG / Climate Litigation', 'Defence / AUKUS'],
    gaps: ['Climate litigation capacity behind Europe', 'Defence procurement legal expertise nascent', 'Mid-market M&A advisory underserved outside top 6 firms'],
    relationships: [
      { target: 'singapore', strength: 7, label: 'ASEAN Invest' },
      { target: 'indonesia', strength: 5, label: 'Resources' },
      { target: 'usa', strength: 6, label: 'AUKUS / Defence' },
    ],
    description: 'Critical minerals and AUKUS defence are driving new practice areas. ESG litigation is emerging but still behind European maturity.',
    latestReform: '2025: FIRB threshold adjustments and AUKUS defence procurement frameworks.',
    color: '#84cc16',
    
    keyStatutes: [
      { name: 'Corporations Act 2001', year: 2001, impact: 'Comprehensive corporate law; directors duties; continuous disclosure' },
      { name: 'Competition and Consumer Act', year: 2010, impact: 'ACCC enforcement; merger control; consumer protection' },
      { name: 'Environment Protection Acts', year: 1970, impact: 'Environmental regulation; climate litigation basis' },
      { name: 'AUKUS Treaty', year: 2021, impact: 'Defence procurement; nuclear submarine program' },
    ],
    majorDeals: [
      { name: 'BHP-Oz Minerals', value: '$9.6B', year: 2023, type: 'Mining / M&A' },
      { name: 'Woodside-BHP Petroleum', value: '$12B', year: 2022, type: 'Energy / Merger' },
      { name: 'Lynas Rare Earths Expansion', value: '$500M', year: 2024, type: 'Critical Minerals' },
    ],
    legalMarketSize: { lawyers: '~80,000', topFirmsRevenue: '$400M+', growthRate: '6%+' },
    barriersToEntry: ['Australian admission required', 'Geographic distance from Asia', 'High cost base'],
    regulatoryTrends: ['Climate litigation increasing', 'Critical minerals focus', 'AUKUS defence work'],
    comparisonNotes: [{ vs: 'Singapore', advantage: 'Mining/resources expertise', disadvantage: 'Distance from Asia deals' }],
    talentMarket: { avgPartnerSalary: '$300K-$600K', associateHiring: 'Steady demand', lateralMoves: 'Limited lateral movement' },
    recentDevelopments: [
      { date: 'Dec 2025', title: 'FIRB Reforms', description: 'Threshold adjustments for foreign investment' },
      { date: 'Nov 2025', title: 'AUKUS Implementation', description: 'Defence procurement frameworks developing' },
    ],
    
    dealFlow: {
      annualDealValue: '$35B (2025)',
      topSectors: ['Mining/Resources (35%)', 'Energy/Infra (25%)', 'Real Estate (20%)', 'Financial Services (10%)', 'Defence (10%)'],
      activePE: ['Macquarie', 'IFM Investors', 'QIC', 'AustralianSuper', 'Cbus'],
      pipelineOutlook: 'Critical minerals boom; AUKUS defence work emerging; energy transition creating renewables demand; climate litigation growing',
    },
    insiderIntel: {
      winningFirms: ['Allens (resources)', 'King & Wood Mallesons (Asia deals)', 'Clayton Utz (infrastructure)', 'Herbert Smith Freehills ( disputes)', 'MinterEllison (diverse)'],
      losingTalent: ['Associates moving to London/Singapore for international exposure', 'Mid-levels leaving for in-house roles at mining companies'],
      hiddenOpportunities: ['AUKUS defence procurement', 'Critical minerals project finance', 'Climate litigation boutique', 'Indigenous land rights advisory', 'Hydrogen energy structuring'],
      redFlags: ['Geographic distance from Asian deal flow', 'High cost base vs Asia', 'Climate litigation capacity behind Europe', 'Defence expertise nascent'],
      marketTiming: 'SELECTIVE: Resources and energy transition strong. AUKUS creating new niche. Distance from Asia limits cross-border work.',
    },
    competitiveLandscape: {
      tier1: ['Allens', 'King & Wood Mallesons', 'Clayton Utz'],
      tier2: ['Herbert Smith Freehills', 'Ashurst', 'MinterEllison'],
      boutiques: ['Resources specialists', 'Climate litigation boutiques', 'Indigenous law specialists'],
      newEntrants: ['UK firms for AUKUS work', 'US firms for resources'],
    },
    arbitrageOpportunities: [
      { type: 'AUKUS Defence', description: 'Defence procurement legal expertise extremely scarce; first-mover advantage', riskLevel: 'Medium', expectedReturn: 'Government contract pipeline' },
      { type: 'Critical Minerals', description: 'Lithium, rare earth project finance and structuring demand growing', riskLevel: 'Low', expectedReturn: 'Retainer relationships with miners' },
    ],
    partnerIntel: {
      totalPartners: '~1,800',
      partnerGrowth: '+4% YoY',
      lateralHires2024: '~20 partners',
      departedPartners: '~15',
      avgYearsToPartner: '10-12 years',
    },
    clientIntel: {
      keyClients: ['BHP', 'Rio Tinto', 'Macquarie Group', 'Woodside', 'Qantas', 'Commonwealth Bank'],
      clientSpendingTrend: '+8% YoY',
      procurementChanges: 'Resources clients consolidating panels; demanding sector expertise',
      ratePressure: 'Moderate - stable rates',
    },
  },
];

export const relationships = legalSystems.flatMap(s =>
  s.relationships.map(r => ({
    source: s.id,
    target: r.target,
    strength: r.strength,
    label: r.label,
  }))
).filter(r => legalSystems.some(s => s.id === r.target));

export const reforms = [
  { date: '2024', system: 'saudi', title: 'Commercial Courts & SCCA established' },
  { date: '2024', system: 'china', title: 'Foreign Strategic Investment Regulations' },
  { date: '2025 Mar', system: 'philippines', title: 'PCC thresholds: PHP 8.5bn / 3.5bn' },
  { date: '2025 Mar', system: 'southkorea', title: 'Offshore Wind Special Act enacted' },
  { date: '2025 Sep', system: 'saudi', title: 'Prosecutors Office dissolution announced' },
  { date: '2025', system: 'thailand', title: 'Omnibus Law Plan introduced' },
  { date: '2025 Dec', system: 'vietnam', title: 'Standalone AI Law passed' },
  { date: '2026 Jan', system: 'uae', title: 'World\'s top law firm registers ADGM' },
  { date: '2026 Mar', system: 'vietnam', title: 'New Investment Law takes effect' },
  { date: '2026 Mar', system: 'southkorea', title: 'Offshore Wind Act effective' },
  { date: '2025-26', system: 'japan', title: 'FEFTA amendment direction set' },
  { date: '2025-26', system: 'singapore', title: '15% Global Minimum Tax implementation' },
  { date: '2026', system: 'malaysia', title: 'NIF 2026 manufacturing incentives' },
];
