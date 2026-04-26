export interface Partner {
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
  tier: 'Tier 1' | 'Tier 2' | 'Rising Star' | 'Mid-Level' | 'Senior Associate';
  languages: string[];
  barAdmissions: string[];
}

const FIRST_NAMES = ['Aarav','Abhishek','Aditya','Ajay','Akash','Akshay','Aman','Amit','Anand','Aniket','Anil','Arjun','Arun','Ashish','Ashok','Atul','Avinash','Balaji','Bhaskar','Chaitanya','Chandra','Deepak','Dev','Dinesh','Gaurav','Gautam','Girish','Harish','Harsh','Hemant','Ishaan','Jai','Jayant','Kamal','Kapil','Karan','Karthik','Kiran','Kunal','Lakshay','Madhav','Mahesh','Manish','Manoj','Mayank','Mohit','Mukesh','Naveen','Nikhil','Nitin','Pankaj','Parth','Pradeep','Prakash','Pranav','Prashant','Rahul','Raj','Rajan','Rajat','Rajesh','Rakesh','Ramesh','Ravi','Rohit','Sachin','Samar','Sameer','Sandeep','Sanjay','Sarthak','Satish','Shailesh','Shankar','Shantanu','Sharat','Shashank','Shekhar','Shiv','Shyam','Siddharth','Sourav','Srinivas','Subhash','Sudhir','Sumeet','Sunil','Suresh','Sushil','Tarun','Uday','Umesh','Vasant','Venkatesh','Vijay','Vikas','Vinay','Vineet','Vipin','Viren','Vishal','Vivek','Yash','Aarti','Aditi','Aishwarya','Amrita','Ananya','Anjali','Anju','Ankita','Anu','Anupama','Aparna','Aradhana','Archana','Aruna','Asha','Ashwini','Bhavana','Binita','Chitra','Deepa','Deepika','Devika','Divya','Esha','Gayatri','Geeta','Gitanjali','Hema','Indira','Isha','Jaya','Jayanti','Jyoti','Kanchan','Kavita','Kiran','Lata','Leena','Madhavi','Madhu','Malini','Manisha','Meena','Meera','Mitali','Mohini','Mona','Monica','Nalini','Namrata','Nandini','Neelam','Neeta','Neha','Nidhi','Nikhila','Nisha','Nupur','Pallavi','Parul','Pooja','Poonam','Prachi','Preeti','Priya','Priyanka','Rachana','Radhika','Ragini','Rashmi','Reena','Rekha','Renu','Ritika','Rohini','Roshni','Sakshi','Saloni','Sangeeta','Sarika','Sarita','Seema','Shalini','Shanti','Sharmila','Sheela','Shilpa','Shivani','Shruti','Shweta','Simran','Smita','Sneha','Sonali','Sonia','Sujata','Sunita','Supriya','Sushma','Swati','Tanuja','Tanya','Trisha','Uma','Urvashi','Vandana','Varsha','Vasundhara','Veena','Vidya','Vinita'];

const LAST_NAMES = ['Agarwal','Agrawal','Anand','Bajaj','Bansal','Bedi','Bhalla','Bhandari','Bhattacharya','Bose','Chadha','Chakraborty','Chandra','Chatterjee','Chauhan','Chawla','Chopra','Das','Datta','Deshmukh','Dubey','Dutta','Gandhi','Ghosh','Goel','Grover','Gupta','Hegde','Iyer','Jain','Jha','Jindal','Joshi','Kalra','Kapoor','Kapur','Khanna','Kohli','Kumar','Lahiri','Lal','Malhotra','Mehra','Mehta','Menon','Mishra','Mittal','Modi','Mukherjee','Nagar','Nair','Nanda','Narang','Nath','Oberoi','Pandey','Parikh','Patel','Pathak','Pillai','Prasad','Raghavan','Rahman','Rajan','Rao','Rastogi','Reddy','Sahni','Saini','Saxena','Sen','Seth','Shah','Sharma','Shukla','Singh','Sinha','Sood','Srivastava','Subramanian','Talwar','Tandon','Thakur','Tiwari','Tripathi','Tyagi','Verma','Vohra','Wadhwa','Yadav'];

const FIRMS = ['Cyril Amarchand Mangaldas','Shardul Amarchand Mangaldas','AZB & Partners','Khaitan & Co','J. Sagar Associates','Trilegal','L&L Partners','S&R Associates','Talwar Thakore & Associates','IndusLaw','Economic Laws Practice','Desai & Diwanji','Platinum Partners','Wadia Ghandy & Co','K Law','MV Kini','P&A Law Offices','Rajani Associates','DSK Legal','HSA Advocates','Juris Corp','Nishith Desai Associates','IC Universal Legal','Phoenix Legal','Athena Law','Spice Route Legal','Argus Partners','Bharucha & Partners','Clarus Law','Majmudar & Partners','S&A Law Offices','Singhania & Partners','Veritas Legal','PwC India - Legal','EY India - Legal','Deloitte India - Legal','KPMG India - Legal','Anand & Anand','Dhir & Dhir Associates','Kochhar & Co','Lakshmikumaran & Sridharan','Little & Co','SNG & Partners','Tatva Legal','Vaish Associates','VDA Legal','Zeco Legal'];

const PRACTICE_AREAS = ['M&A','Private Equity','Banking & Finance','Capital Markets','Dispute Resolution','Real Estate','Tax','Employment','Intellectual Property','Competition Law','TMT','Energy & Infrastructure','Insurance','Healthcare','Fintech','Data Privacy','White Collar Crime','Arbitration','Project Finance','Restructuring & Insolvency','Fund Formation','Venture Capital','General Corporate','Regulatory','International Trade','Environmental Law','Shipping & Maritime','Aviation','Pharma & Life Sciences','Consumer Protection'];

const LOCATIONS = ['New Delhi','Mumbai','Bangalore','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Gurgaon','Chandigarh'];

const ROLES = ['Managing Partner','Senior Partner','Partner','Of Counsel','Principal Associate','Senior Associate','Practice Head','Regional Managing Partner','Equity Partner','Income Partner'];

const RANKINGS = ['Band 1 - Chambers','Band 2 - Chambers','Band 3 - Chambers','Leading Individual - Legal 500','Recommended - Legal 500','Rising Star - Legal 500','Market Leader - IFLR1000','A-List - India Business Law Journal','40 Under 40 - IBLJ','Power Lawyer - India Today','Top 50 - Forbes India','Hall of Fame - ALB','Unranked'];

const EXPERTISE = ['Cross-border M&A','IPOs','Banking Regulations','Startup Financing','Infrastructure Finance','Data Privacy','NCLT Litigation','Commercial Arbitration','Structured Finance','Tax Structuring','Patent Prosecution','Real Estate Investment','Employment Law','Fintech Regulations','Healthcare M&A','ESG Compliance','Maritime Arbitration','White Collar Defence','Due Diligence','Joint Ventures'];

const EDUCATION = ['LLB, NLSIU Bangalore','LLB, NLU Delhi','LLB, Symbiosis Pune','LLB, GLC Mumbai','LLB, Delhi University','LLM, Harvard Law School','LLM, Cambridge University','LLM, Oxford University','LLM, LSE','MBA, IIM Ahmedabad','MBA, IIM Calcutta','CA, ICAI','CS, ICSI','Solicitor, Bombay Inc. Law Society'];

const CLIENTS = ['Reliance Industries','Tata Group','Adani Group','HDFC Bank','ICICI Bank','SBI','Axis Bank','Kotak Bank','Bharti Airtel','Jio','Google','Meta','Amazon','Walmart','Microsoft','SoftBank','Blackstone','KKR','Sequoia','Tiger Global','Paytm','Zomato','Swiggy','Ola','Flipkart','Byjus','L&T','ONGC','NTPC','Infosys','TCS','Wipro','HCL','Dr Reddys','Sun Pharma','DLF','Godrej','Oberoi Realty','PSU','MNC','Startup Unicorn'];

const RECOGNITION = ['Chambers Ranked','Legal 500 Leading','IFLR1000 Notable','IBLJ A-List','Forbes Legal Powerlist','India Today Top 50','ALB Award','VCCircle Influencer','RSG Top 100'];

const BIOS = ['Leading corporate lawyer with deep M&A expertise.','Expert in dispute resolution and arbitration.','Specialist in private equity and venture capital.','Distinguished banking and finance practitioner.','Pioneer in technology and data privacy law.','Infrastructure and energy projects specialist.','Capital markets expert with IPO track record.','Renowned tax and regulatory advisor.','Competition law and antitrust specialist.','IP lawyer with patent prosecution expertise.'];

const LANGUAGES = ['English','Hindi','Tamil','Telugu','Kannada','Malayalam','Marathi','Gujarati','Bengali','Punjabi','Urdu'];

const CITIES_CODE: Record<string, string> = {'New Delhi': '11', 'Mumbai': '22', 'Bangalore': '80', 'Chennai': '44', 'Kolkata': '33', 'Hyderabad': '40', 'Pune': '20', 'Ahmedabad': '79', 'Gurgaon': '124', 'Chandigarh': '172'};

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function seededChoice<T>(seed: number, arr: T[]): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function seededChoices<T>(seed: number, arr: T[], min: number, max: number): T[] {
  const count = Math.floor(seededRandom(seed) * (max - min + 1)) + min;
  const result: T[] = [];
  const used = new Set<number>();
  let s = seed;
  while (result.length < count && used.size < arr.length) {
    const idx = Math.floor(seededRandom(s) * arr.length);
    if (!used.has(idx)) { used.add(idx); result.push(arr[idx]); }
    s++;
  }
  return result;
}

function seededInt(seed: number, min: number, max: number): number {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

function getTier(exp: number, seed: number): Partner['tier'] {
  if (exp >= 25) return seededRandom(seed) < 0.7 ? 'Tier 1' : 'Tier 2';
  if (exp >= 18) return seededRandom(seed) < 0.4 ? 'Tier 2' : 'Rising Star';
  if (exp >= 12) return 'Rising Star';
  if (exp >= 8) return 'Mid-Level';
  return 'Senior Associate';
}

function generatePartner(id: number): Partner {
  const first = seededChoice(id, FIRST_NAMES);
  const last = seededChoice(id + 1000, LAST_NAMES);
  const name = `${first} ${last}`;
  const firm = seededChoice(id + 2000, FIRMS);
  const location = seededChoice(id + 3000, LOCATIONS);
  const exp = seededInt(id + 4000, 5, 35);
  const tier = getTier(exp, id + 5000);
  const momentum = seededInt(id + 6000, 4, 10);
  const role = tier === 'Tier 1' ? seededChoice(id + 7000, ['Managing Partner', 'Senior Partner', 'Executive Chairman']) : 
               tier === 'Tier 2' ? seededChoice(id + 7000, ['Senior Partner', 'Partner', 'Practice Head']) :
               seededChoice(id + 7000, ROLES);

  return {
    id: id.toString(),
    name,
    firm,
    role,
    practiceAreas: seededChoices(id + 8000, PRACTICE_AREAS, 1, 4),
    location,
    experience: exp,
    ranking: seededChoice(id + 9000, RANKINGS),
    deals: Array.from({ length: seededInt(id + 10000, 1, 5) }, (_, i) => ({
      name: `Deal ${seededInt(id + 11000 + i, 1, 999)}`,
      value: `$${seededInt(id + 12000 + i, 10, 500)}M`,
      year: seededInt(id + 13000 + i, 2018, 2025)
    })),
    expertise: seededChoices(id + 14000, EXPERTISE, 3, 6),
    education: seededChoices(id + 15000, EDUCATION, 1, 3),
    clients: seededChoices(id + 16000, CLIENTS, 3, 6),
    recognition: seededChoices(id + 17000, RECOGNITION, 1, 4),
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${firm.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8)}law.com`,
    phone: `+91-${CITIES_CODE[location]}-${seededInt(id + 18000, 40000000, 49999999)}`,
    linkedIn: `linkedin.com/in/${first.toLowerCase()}-${last.toLowerCase()}-${seededInt(id + 19000, 10, 99)}`,
    bio: seededChoice(id + 20000, BIOS),
    momentum,
    tier,
    languages: seededChoices(id + 21000, LANGUAGES, 1, 3),
    barAdmissions: [location === 'New Delhi' ? 'Delhi HC' : location === 'Mumbai' ? 'Bombay HC' : `${location.split(' ')[0]} HC`, 'Supreme Court of India']
  };
}

// Keep the 10 real elite partners from before
const ELITE_PARTNERS: Partner[] = [
  { id: 'elite-1', name: 'Shardul Shroff', firm: 'Shardul Amarchand Mangaldas', role: 'Executive Chairman', practiceAreas: ['M&A', 'Private Equity', 'Banking & Finance'], location: 'New Delhi', experience: 35, ranking: 'Band 1 - Chambers', deals: [{ name: 'Reliance-Future Retail', value: '$3.4B', year: 2025 }, { name: 'HDFC-HDFC Bank', value: '$60B', year: 2023 }, { name: 'Walmart-Flipkart', value: '$16B', year: 2018 }], expertise: ['Cross-border M&A', 'Takeover Regulations', 'Competition Law'], education: ['LLB, Delhi University', 'LLM, Harvard'], clients: ['Reliance', 'HDFC', 'Walmart', 'SoftBank'], recognition: ['Chambers Band 1', 'IBLJ A-List'], email: 'shardul.shroff@amarchand.com', phone: '+91-11-4159-0700', linkedIn: 'linkedin.com/in/shardulshroff', bio: 'Pioneer of modern Indian corporate law.', momentum: 10, tier: 'Tier 1', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court'] },
  { id: 'elite-2', name: 'Cyril Shroff', firm: 'Cyril Amarchand Mangaldas', role: 'Managing Partner', practiceAreas: ['Capital Markets', 'M&A', 'Restructuring'], location: 'Mumbai', experience: 32, ranking: 'Band 1 - Chambers', deals: [{ name: 'LIC IPO', value: '$2.7B', year: 2022 }, { name: 'Paytm IPO', value: '$2.5B', year: 2021 }, { name: 'Tata Digital-BigBasket', value: '$1.2B', year: 2021 }], expertise: ['IPOs', 'QIPs', 'Debt Capital Markets'], education: ['LLB, GLC Mumbai', 'Solicitor'], clients: ['LIC', 'Paytm', 'Tata', 'Adani'], recognition: ['Chambers Band 1', 'IFLR1000 Market Leader'], email: 'cyril.shroff@amarchand.com', phone: '+91-22-2496-4455', linkedIn: 'linkedin.com/in/cyrilshroff', bio: 'Leading authority on Indian capital markets.', momentum: 10, tier: 'Tier 1', languages: ['English', 'Hindi', 'Marathi'], barAdmissions: ['Bombay HC', 'Supreme Court'] },
  { id: 'elite-3', name: 'Zia Mody', firm: 'AZB & Partners', role: 'Founding Partner', practiceAreas: ['M&A', 'Private Equity', 'Banking'], location: 'Mumbai', experience: 35, ranking: 'Band 1 - Chambers', deals: [{ name: 'Kotak-ING Vysya', value: '$2.5B', year: 2015 }, { name: 'Vodafone-Idea', value: '$23B', year: 2017 }, { name: 'Walmart-Flipkart', value: '$16B', year: 2018 }], expertise: ['Banking Regulations', 'NBFC', 'Insolvency'], education: ['BA, St. Xaviers', 'LLB, Cambridge'], clients: ['Kotak', 'Vodafone', 'HDFC'], recognition: ['Chambers Band 1', 'ET Most Powerful'], email: 'zia.mody@azbpartners.com', phone: '+91-22-4072-9999', linkedIn: 'linkedin.com/in/ziamody', bio: 'Indias most prominent female corporate lawyer.', momentum: 10, tier: 'Tier 1', languages: ['English', 'Hindi', 'Gujarati'], barAdmissions: ['Bombay HC', 'Supreme Court'] },
  { id: 'elite-4', name: 'Pallavi Shroff', firm: 'Shardul Amarchand Mangaldas', role: 'Managing Partner', practiceAreas: ['Dispute Resolution', 'Insolvency', 'Regulatory'], location: 'New Delhi', experience: 28, ranking: 'Band 1 - Chambers', deals: [{ name: 'Essar Steel Insolvency', value: '$7B', year: 2019 }, { name: 'Jet Airways', value: '$3B', year: 2021 }], expertise: ['IBC', 'NCLT Litigation', 'Arbitration'], education: ['LLB, Delhi', 'LLM, London'], clients: ['ArcelorMittal', 'JSW', 'SBI'], recognition: ['Chambers Band 1', 'Legal 500 Leading'], email: 'pallavi.shroff@amarchand.com', phone: '+91-11-4159-0700', bio: 'Leading disputes lawyer with IBC expertise.', momentum: 9, tier: 'Tier 1', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court'] },
  { id: 'elite-5', name: 'Ajay Bahl', firm: 'AZB & Partners', role: 'Senior Partner', practiceAreas: ['M&A', 'Private Equity', 'Joint Ventures'], location: 'New Delhi', experience: 25, ranking: 'Band 1 - Chambers', deals: [{ name: 'Blackstone-Jio', value: '$1.5B', year: 2020 }, { name: 'KKR-Max Healthcare', value: '$400M', year: 2021 }], expertise: ['PE Investments', 'Exit Strategies', 'Growth Capital'], education: ['LLB, Delhi', 'MBA, IIM-A'], clients: ['Blackstone', 'KKR', 'Sequoia'], recognition: ['Chambers Band 1', 'PE Asia Top Lawyer'], email: 'ajay.bahl@azbpartners.com', phone: '+91-11-4150-5555', linkedIn: 'linkedin.com/in/ajaybahl', bio: 'Indias go-to lawyer for private equity.', momentum: 9, tier: 'Tier 1', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court'] },
  { id: 'elite-6', name: 'Ashwath Rau', firm: 'AZB & Partners', role: 'Partner', practiceAreas: ['Private Equity', 'Venture Capital', 'Technology'], location: 'Bangalore', experience: 20, ranking: 'Band 2 - Chambers', deals: [{ name: 'Tiger Global-Flipkart', value: '$360M', year: 2014 }, { name: 'Accel-Ola', value: '$210M', year: 2015 }, { name: 'Sequoia-Zomato', value: '$150M', year: 2018 }], expertise: ['Startup Financing', 'ESOP', 'Tech Deals'], education: ['LLB, NLSIU', 'LLM, NYU'], clients: ['Tiger Global', 'Accel', 'Sequoia'], recognition: ['Chambers Band 2', 'Forbes Legal Powerlist'], email: 'ashwath.rau@azbpartners.com', phone: '+91-80-4240-5555', linkedIn: 'linkedin.com/in/ashwathrau', bio: 'Indias leading VC/tech lawyer.', momentum: 9, tier: 'Tier 1', languages: ['English', 'Hindi', 'Kannada'], barAdmissions: ['Karnataka HC', 'Delhi HC'] },
  { id: 'elite-7', name: 'Akshay Jaitly', firm: 'Trilegal', role: 'Senior Partner', practiceAreas: ['M&A', 'Corporate', 'Energy'], location: 'New Delhi', experience: 22, ranking: 'Band 2 - Chambers', deals: [{ name: 'Total-Adani Green', value: '$2.5B', year: 2020 }, { name: 'Brookfield-REIL', value: '$1B', year: 2021 }], expertise: ['Infrastructure Finance', 'Project Finance', 'Power'], education: ['LLB, Delhi', 'BCL, Oxford'], clients: ['Total', 'Brookfield', 'Adani'], recognition: ['Chambers Band 2', 'IBLJ A-List'], email: 'akshay.jaitly@trilegal.com', phone: '+91-11-4168-9900', linkedIn: 'linkedin.com/in/akshayjaitly', bio: 'Leading infrastructure and energy lawyer.', momentum: 8, tier: 'Tier 2', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court'] },
  { id: 'elite-8', name: 'Rahul Matthan', firm: 'Trilegal', role: 'Partner', practiceAreas: ['Technology', 'Data Privacy', 'Fintech'], location: 'Bangalore', experience: 18, ranking: 'Band 2 - Chambers', deals: [{ name: 'Google-Jio', value: '$4.5B', year: 2020 }, { name: 'Facebook-Jio', value: '$5.7B', year: 2020 }], expertise: ['DPDP Act', 'Data Localization', 'Fintech'], education: ['LLB, NLSIU', 'LLM, Harvard'], clients: ['Google', 'Meta', 'Jio'], recognition: ['Chambers Band 2', 'Data Privacy Top Lawyer'], email: 'rahul.matthan@trilegal.com', phone: '+91-80-4240-8888', linkedIn: 'linkedin.com/in/rahulmatthan', bio: 'Indias foremost technology lawyer.', momentum: 9, tier: 'Tier 2', languages: ['English', 'Hindi', 'Tamil'], barAdmissions: ['Karnataka HC', 'Delhi HC'] },
  { id: 'elite-9', name: 'Abhishek Sinha', firm: 'EY India', role: 'Partner', practiceAreas: ['Due Diligence', 'Valuation', 'Advisory'], location: 'Mumbai', experience: 15, ranking: 'Notable Practitioner', deals: [{ name: 'Bain-Deloitte Advisory', value: 'N/A', year: 2024 }], expertise: ['Commercial DD', 'Valuation', 'Transaction'], education: ['CA, ICAI', 'MBA, IIM-C'], clients: ['Bain', 'Blackstone', 'Carlyle'], recognition: ['EY Partner of the Year'], email: 'abhishek.sinha@ey.com', phone: '+91-22-6192-0000', linkedIn: 'linkedin.com/in/abhisheksinha', bio: 'Leading transaction advisory specialist.', momentum: 7, tier: 'Rising Star', languages: ['English', 'Hindi', 'Bengali'], barAdmissions: ['N/A'] },
  { id: 'elite-10', name: 'Rohit Kumar', firm: 'L&L Partners', role: 'Managing Partner', practiceAreas: ['Dispute Resolution', 'White Collar'], location: 'New Delhi', experience: 30, ranking: 'Band 2 - Chambers', deals: [{ name: 'Vijay Mallya Defense', value: 'N/A', year: 2018 }, { name: 'PNB Fraud', value: '$2B', year: 2018 }], expertise: ['Criminal Defense', 'ED Proceedings', 'CBI'], education: ['LLB, Delhi', 'Diploma, IALS'], clients: ['HNW Individuals', 'Banks'], recognition: ['Chambers Band 2', 'Legal 500 Leading'], email: 'rohit.kumar@luthra.com', phone: '+91-11-4121-5100', linkedIn: 'linkedin.com/in/rohitkumar', bio: 'Indias leading white-collar defense lawyer.', momentum: 8, tier: 'Tier 2', languages: ['English', 'Hindi'], barAdmissions: ['Delhi HC', 'Supreme Court'] }
];

// Generate 1190 more partners (total 1200)
const generatedPartners: Partner[] = ELITE_PARTNERS.slice();
for (let i = 11; i <= 1200; i++) {
  generatedPartners.push(generatePartner(i));
}

export const indiaPartners: Partner[] = generatedPartners;
export const firms = [...new Set(indiaPartners.map(p => p.firm))];
export const locations = [...new Set(indiaPartners.map(p => p.location))];
export const practiceAreas = [...new Set(indiaPartners.flatMap(p => p.practiceAreas))];
