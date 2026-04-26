import fs from 'fs';

const FIRST_NAMES = ['Aarav','Abhishek','Aditya','Ajay','Akash','Akshay','Aman','Amit','Anand','Aniket','Anil','Arjun','Arun','Ashish','Ashok','Atul','Avinash','Balaji','Bhaskar','Chaitanya','Chandra','Deepak','Dev','Dinesh','Gaurav','Gautam','Girish','Harish','Harsh','Hemant','Ishaan','Jai','Jayant','Kamal','Kapil','Karan','Karthik','Kiran','Kunal','Lakshay','Madhav','Mahesh','Manish','Manoj','Mayank','Mohit','Mukesh','Naveen','Nikhil','Nitin','Pankaj','Parth','Pradeep','Prakash','Pranav','Prashant','Rahul','Raj','Rajan','Rajat','Rajesh','Rakesh','Ramesh','Ravi','Rohit','Sachin','Samar','Sameer','Sandeep','Sanjay','Sarthak','Satish','Shailesh','Shankar','Shantanu','Sharat','Shashank','Shekhar','Shiv','Shyam','Siddharth','Sourav','Srinivas','Subhash','Sudhir','Sumeet','Sunil','Suresh','Sushil','Tarun','Uday','Umesh','Vasant','Venkatesh','Vijay','Vikas','Vinay','Vineet','Vipin','Viren','Vishal','Vivek','Yash','Aarti','Aditi','Aishwarya','Amrita','Ananya','Anjali','Anju','Ankita','Anu','Anupama','Aparna','Aradhana','Archana','Aruna','Asha','Ashwini','Bhavana','Binita','Chitra','Deepa','Deepika','Devika','Divya','Esha','Gayatri','Geeta','Gitanjali','Hema','Indira','Isha','Jaya','Jayanti','Jyoti','Kanchan','Kavita','Kiran','Lata','Leena','Madhavi','Madhu','Malini','Manisha','Meena','Meera','Mitali','Mohini','Mona','Monica','Nalini','Namrata','Nandini','Neelam','Neeta','Neha','Nidhi','Nikhila','Nisha','Nupur','Pallavi','Parul','Pooja','Poonam','Prachi','Preeti','Priya','Priyanka','Rachana','Radhika','Ragini','Rashmi','Reena','Rekha','Renu','Ritika','Rohini','Roshni','Sakshi','Saloni','Sangeeta','Sarika','Sarita','Seema','Shalini','Shanti','Sharmila','Sheela','Shilpa','Shivani','Shruti','Shweta','Simran','Smita','Sneha','Sonali','Sonia','Sujata','Sunita','Supriya','Sushma','Swati','Tanuja','Tanya','Trisha','Uma','Urvashi','Vandana','Varsha','Vasundhara','Veena','Vidya','Vinita'];
const LAST_NAMES = ['Agarwal','Agrawal','Anand','Bajaj','Bansal','Bedi','Bhalla','Bhandari','Bhattacharya','Bose','Chadha','Chakraborty','Chandra','Chatterjee','Chauhan','Chawla','Chopra','Das','Datta','Deshmukh','Dubey','Dutta','Gandhi','Ghosh','Goel','Grover','Gupta','Hegde','Iyer','Jain','Jha','Jindal','Joshi','Kalra','Kapoor','Kapur','Khanna','Kohli','Kumar','Lahiri','Lal','Malhotra','Mehra','Mehta','Menon','Mishra','Mittal','Modi','Mukherjee','Nagar','Nair','Nanda','Narang','Nath','Oberoi','Pandey','Parikh','Patel','Pathak','Pillai','Prasad','Raghavan','Rahman','Rajan','Rao','Rastogi','Reddy','Sahni','Saini','Saxena','Sen','Seth','Shah','Sharma','Shukla','Singh','Sinha','Sood','Srivastava','Subramanian','Talwar','Tandon','Thakur','Tiwari','Tripathi','Tyagi','Verma','Vohra','Wadhwa','Yadav'];
const FIRMS = ['Cyril Amarchand Mangaldas','Shardul Amarchand Mangaldas','AZB & Partners','Khaitan & Co','J. Sagar Associates','Trilegal','L&L Partners','S&R Associates','Talwar Thakore & Associates','IndusLaw','Economic Laws Practice','Desai & Diwanji','Platinum Partners','Wadia Ghandy & Co','K Law','MV Kini','P&A Law Offices','Rajani Associates','DSK Legal','HSA Advocates','Juris Corp','Nishith Desai Associates','IC Universal Legal','Phoenix Legal','Athena Law','Spice Route Legal','Argus Partners','Bharucha & Partners','Clarus Law','Majmudar & Partners','S&A Law Offices','Singhania & Partners','Veritas Legal','PwC India - Legal','EY India - Legal','Deloitte India - Legal','KPMG India - Legal','Anand & Anand','Dhir & Dhir Associates','Kochhar & Co','Lakshmikumaran & Sridharan','Little & Co','SNG & Partners','Tatva Legal','Vaish Associates','VDA Legal','Zeco Legal'];
const PRACTICE_AREAS = ['M&A','Private Equity','Banking & Finance','Capital Markets','Dispute Resolution','Real Estate','Tax','Employment','Intellectual Property','Competition Law','TMT','Energy & Infrastructure','Insurance','Healthcare','Fintech','Data Privacy','White Collar Crime','Arbitration','Project Finance','Restructuring & Insolvency','Fund Formation','Venture Capital','General Corporate','Regulatory','International Trade','Environmental Law','Shipping & Maritime','Aviation','Pharma & Life Sciences','Consumer Protection'];
const LOCATIONS = ['New Delhi','Mumbai','Bangalore','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Gurgaon','Chandigarh'];
const ROLES = ['Managing Partner','Senior Partner','Partner','Of Counsel','Principal Associate','Senior Associate','Practice Head','Regional Managing Partner','Equity Partner','Income Partner'];
const RANKINGS = ['Band 1 - Chambers','Band 2 - Chambers','Band 3 - Chambers','Leading Individual - Legal 500','Recommended - Legal 500','Rising Star - Legal 500','Market Leader - IFLR1000','A-List - India Business Law Journal','40 Under 40 - IBLJ','Power Lawyer - India Today','Top 50 - Forbes India','Hall of Fame - ALB','Unranked'];
const EXPERTISE = ['Cross-border M&A','IPOs','Banking Regulations','Startup Financing','Infrastructure Finance','Data Privacy','NCLT Litigation','Commercial Arbitration','Structured Finance','Tax Structuring','Patent Prosecution','Real Estate Investment','Employment Law','Fintech Regulations','Healthcare M&A','ESG Compliance','Maritime Arbitration','White Collar Defence','Due Diligence','Joint Ventures'];
const EDUCATION = ['LLB, NLSIU Bangalore','LLB, NLU Delhi','LLB, Symbiosis Pune','LLB, GLC Mumbai','LLB, Delhi University','LLM, Harvard Law School','LLM, Cambridge University','LLM, Oxford University','LLM, LSE','MBA, IIM Ahmedabad','MBA, IIM Calcutta','CA, ICAI','CS, ICSI','Solicitor, Bombay Inc. Law Society'];
const CLIENTS = ['Reliance Industries','Tata Group','Adani Group','HDFC Bank','ICICI Bank','SBI','Axis Bank','Kotak Bank','Bharti Airtel','Jio','Google','Meta','Amazon','Walmart','Microsoft','SoftBank','Blackstone','KKR','Sequoia','Tiger Global','Paytm','Zomato','Swiggy','Ola','Flipkart','Byjus','Unacademy','PolicyBazaar','CRED','Razorpay','PhonePe','BharatPe','Nykaa','Meesho','Lenskart','Delhivery','Ola Electric','Ather Energy','OYO','L&T','ONGC','NTPC','Infosys','TCS','Wipro','HCL','Dr Reddys','Sun Pharma','DLF','Godrej','Oberoi Realty','PSU','MNC','Startup Unicorn'];
const RECOGNITION = ['Chambers Ranked','Legal 500 Leading','IFLR1000 Notable','IBLJ A-List','Forbes Legal Powerlist','India Today Top 50','ALB Award','VCCircle Influencer','RSG Top 100'];
const BIOS = ['Leading corporate lawyer with deep M&A expertise.','Expert in dispute resolution and arbitration.','Specialist in private equity and venture capital.','Distinguished banking and finance practitioner.','Pioneer in technology and data privacy law.','Infrastructure and energy projects specialist.','Capital markets expert with IPO track record.','Renowned tax and regulatory advisor.','Competition law and antitrust specialist.','IP lawyer with patent prosecution expertise.'];
const LANGUAGES = ['English','Hindi','Tamil','Telugu','Kannada','Malayalam','Marathi','Gujarati','Bengali','Punjabi','Urdu'];

function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}
function seededChoice(seed, arr) {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}
function seededChoices(seed, arr, min, max) {
  const count = Math.floor(seededRandom(seed) * (max - min + 1)) + min;
  const result = [];
  const used = new Set();
  let s = seed;
  while (result.length < count && used.size < arr.length) {
    const idx = Math.floor(seededRandom(s) * arr.length);
    if (!used.has(idx)) { used.add(idx); result.push(arr[idx]); }
    s++;
  }
  return result;
}
function seededInt(seed, min, max) {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}
function getTier(exp, seed) {
  if (exp >= 25) return seededRandom(seed) < 0.7 ? 'Tier 1' : 'Tier 2';
  if (exp >= 18) return seededRandom(seed) < 0.4 ? 'Tier 2' : 'Rising Star';
  if (exp >= 12) return 'Rising Star';
  if (exp >= 8) return 'Mid-Level';
  return 'Senior Associate';
}

const elitePartners = [
  { id: '1', name: 'Shardul Shroff', firm: 'Shardul Amarchand Mangaldas', role: 'Executive Chairman', practiceAreas: 'M&A|Private Equity|Banking & Finance', location: 'New Delhi', experience: 35, ranking: 'Band 1 - Chambers', deals: 'Reliance-Future Retail ($3.4B,2025)|HDFC-HDFC Bank ($60B,2023)|Walmart-Flipkart ($16B,2018)', expertise: 'Cross-border M&A|Takeover Regulations|Competition Law', education: 'LLB, Delhi University|LLM, Harvard', clients: 'Reliance Industries|HDFC Group|Walmart|SoftBank|Blackstone', recognition: 'Chambers Band 1|IBLJ A-List|Legal 500 Eminent', email: 'shardul.shroff@amarchand.com', phone: '+91-11-4159-0700', linkedIn: 'linkedin.com/in/shardulshroff', bio: 'Pioneer of modern Indian corporate law.', momentum: 10, tier: 'Tier 1', languages: 'English|Hindi', barAdmissions: 'Delhi HC|Supreme Court' },
  { id: '2', name: 'Cyril Shroff', firm: 'Cyril Amarchand Mangaldas', role: 'Managing Partner', practiceAreas: 'Capital Markets|M&A|Restructuring', location: 'Mumbai', experience: 32, ranking: 'Band 1 - Chambers', deals: 'LIC IPO ($2.7B,2022)|Paytm IPO ($2.5B,2021)|Tata Digital-BigBasket ($1.2B,2021)', expertise: 'IPOs|QIPs|Debt Capital Markets', education: 'LLB, GLC Mumbai|Solicitor, Bombay Inc.', clients: 'LIC|Paytm|Tata Group|Adani Group|SBI', recognition: 'Chambers Band 1|IFLR1000 Market Leader|ALB Lawyer of Year', email: 'cyril.shroff@amarchand.com', phone: '+91-22-2496-4455', linkedIn: 'linkedin.com/in/cyrilshroff', bio: 'Leading authority on Indian capital markets.', momentum: 10, tier: 'Tier 1', languages: 'English|Hindi|Marathi', barAdmissions: 'Bombay HC|Supreme Court' },
  { id: '3', name: 'Zia Mody', firm: 'AZB & Partners', role: 'Founding Partner', practiceAreas: 'M&A|Private Equity|Banking & Finance', location: 'Mumbai', experience: 35, ranking: 'Band 1 - Chambers', deals: 'Kotak-ING Vysya ($2.5B,2015)|Vodafone-Idea ($23B,2017)|Walmart-Flipkart ($16B,2018)', expertise: 'Banking Regulations|NBFC|Insolvency & Bankruptcy', education: 'BA, St. Xaviers|LLB, Cambridge', clients: 'Kotak Mahindra Bank|Vodafone|Standard Chartered|Citibank|HDFC Bank', recognition: 'Chambers Band 1|ET Most Powerful|IBLJ Hall of Fame', email: 'zia.mody@azbpartners.com', phone: '+91-22-4072-9999', linkedIn: 'linkedin.com/in/ziamody', bio: 'Indias most prominent female corporate lawyer.', momentum: 10, tier: 'Tier 1', languages: 'English|Hindi|Gujarati', barAdmissions: 'Bombay HC|Supreme Court' },
  { id: '4', name: 'Pallavi Shroff', firm: 'Shardul Amarchand Mangaldas', role: 'Managing Partner', practiceAreas: 'Dispute Resolution|Insolvency|Regulatory', location: 'New Delhi', experience: 28, ranking: 'Band 1 - Chambers', deals: 'Essar Steel Insolvency ($7B,2019)|Jet Airways Resolution ($3B,2021)', expertise: 'IBC|NCLT Litigation|Arbitration', education: 'LLB, Delhi University|LLM, University of London', clients: 'ArcelorMittal|JSW Steel|SBI|ICICI Bank', recognition: 'Chambers Band 1|Legal 500 Leading|India Today Top 50', email: 'pallavi.shroff@amarchand.com', phone: '+91-11-4159-0700', linkedIn: 'linkedin.com/in/pallavishroff', bio: 'Leading disputes lawyer with IBC expertise.', momentum: 9, tier: 'Tier 1', languages: 'English|Hindi', barAdmissions: 'Delhi HC|Supreme Court' },
  { id: '5', name: 'Ajay Bahl', firm: 'AZB & Partners', role: 'Senior Partner', practiceAreas: 'M&A|Private Equity|Joint Ventures', location: 'New Delhi', experience: 25, ranking: 'Band 1 - Chambers', deals: 'Blackstone-Jio ($1.5B,2020)|KKR-Max Healthcare ($400M,2021)', expertise: 'PE Investments|Exit Strategies|Growth Capital', education: 'LLB, Delhi University|MBA, IIM-A', clients: 'Blackstone|KKR|General Atlantic|Sequoia|SoftBank Vision Fund', recognition: 'Chambers Band 1|PE Asia Top Lawyer|VCCircle Influencer', email: 'ajay.bahl@azbpartners.com', phone: '+91-11-4150-5555', linkedIn: 'linkedin.com/in/ajaybahl', bio: 'Indias go-to lawyer for private equity.', momentum: 9, tier: 'Tier 1', languages: 'English|Hindi', barAdmissions: 'Delhi HC|Supreme Court' },
  { id: '6', name: 'Ashwath Rau', firm: 'AZB & Partners', role: 'Partner', practiceAreas: 'Private Equity|Venture Capital|Technology', location: 'Bangalore', experience: 20, ranking: 'Band 2 - Chambers', deals: 'Tiger Global-Flipkart ($360M,2014)|Accel-Ola ($210M,2015)|Sequoia-Zomato ($150M,2018)', expertise: 'Startup Financing|ESOP Structuring|Tech Deals', education: 'LLB, NLSIU|LLM, NYU', clients: 'Tiger Global|Accel|Sequoia India|Blume Ventures|Matrix Partners', recognition: 'Chambers Band 2|Forbes Legal Powerlist|Legal 500 Next Gen', email: 'ashwath.rau@azbpartners.com', phone: '+91-80-4240-5555', linkedIn: 'linkedin.com/in/ashwathrau', bio: 'Indias leading VC/tech lawyer in Bangalore.', momentum: 9, tier: 'Tier 1', languages: 'English|Hindi|Kannada', barAdmissions: 'Karnataka HC|Delhi HC' },
  { id: '7', name: 'Akshay Jaitly', firm: 'Trilegal', role: 'Senior Partner', practiceAreas: 'M&A|Corporate|Energy & Infrastructure', location: 'New Delhi', experience: 22, ranking: 'Band 2 - Chambers', deals: 'Total-Adani Green ($2.5B,2020)|Brookfield-REIL ($1B,2021)', expertise: 'Infrastructure Finance|Project Finance|Power', education: 'LLB, Delhi University|BCL, Oxford', clients: 'Total Energies|Brookfield|Adani|Tata Power|NTPC', recognition: 'Chambers Band 2|IBLJ A-List|Legal 500 Leading', email: 'akshay.jaitly@trilegal.com', phone: '+91-11-4168-9900', linkedIn: 'linkedin.com/in/akshayjaitly', bio: 'Leading infrastructure and energy lawyer.', momentum: 8, tier: 'Tier 2', languages: 'English|Hindi', barAdmissions: 'Delhi HC|Supreme Court' },
  { id: '8', name: 'Rahul Matthan', firm: 'Trilegal', role: 'Partner', practiceAreas: 'Technology|Data Privacy|Fintech', location: 'Bangalore', experience: 18, ranking: 'Band 2 - Chambers', deals: 'Google-Jio ($4.5B,2020)|Facebook-Jio ($5.7B,2020)', expertise: 'DPDP Act|Data Localization|Fintech', education: 'LLB, NLSIU|LLM, Harvard', clients: 'Google|Meta|Reliance Jio|Paytm|Razorpay', recognition: 'Chambers Band 2|Data Privacy Top Lawyer|Legal 500 Rising Star', email: 'rahul.matthan@trilegal.com', phone: '+91-80-4240-8888', linkedIn: 'linkedin.com/in/rahulmatthan', bio: 'Indias foremost technology lawyer.', momentum: 9, tier: 'Tier 2', languages: 'English|Hindi|Tamil', barAdmissions: 'Karnataka HC|Delhi HC' },
  { id: '9', name: 'Abhishek Sinha', firm: 'EY India', role: 'Partner', practiceAreas: 'Due Diligence|Valuation|Advisory', location: 'Mumbai', experience: 15, ranking: 'Notable Practitioner', deals: 'Bain-Deloitte Advisory (N/A,2024)', expertise: 'Commercial DD|Valuation|Transaction', education: 'CA, ICAI|MBA, IIM-C', clients: 'Bain & Company|Blackstone|Advent|Carlyle|Warburg Pincus', recognition: 'EY Partner of the Year|Deal Watch Advisor', email: 'abhishek.sinha@ey.com', phone: '+91-22-6192-0000', linkedIn: 'linkedin.com/in/abhisheksinha', bio: 'Leading transaction advisory specialist.', momentum: 7, tier: 'Rising Star', languages: 'English|Hindi|Bengali', barAdmissions: 'N/A - CA/Advisory' },
  { id: '10', name: 'Rohit Kumar', firm: 'L&L Partners', role: 'Managing Partner', practiceAreas: 'Dispute Resolution|White Collar', location: 'New Delhi', experience: 30, ranking: 'Band 2 - Chambers', deals: 'Vijay Mallya Defense (N/A,2018)|PNB Fraud ($2B,2018)', expertise: 'Criminal Defense|ED Proceedings|CBI', education: 'LLB, Delhi University|Diploma, IALS London', clients: 'HNW Individuals|Banking Clients|Corporate Defendants', recognition: 'Chambers Band 2|Legal 500 Leading|India Today Power Lawyer', email: 'rohit.kumar@luthra.com', phone: '+91-11-4121-5100', linkedIn: 'linkedin.com/in/rohitkumar', bio: 'Indias leading white-collar defense lawyer.', momentum: 8, tier: 'Tier 2', languages: 'English|Hindi', barAdmissions: 'Delhi HC|Supreme Court' }
];

function generatePartner(id) {
  const first = seededChoice(id, FIRST_NAMES);
  const last = seededChoice(id + 1000, LAST_NAMES);
  const name = first + ' ' + last;
  const firm = seededChoice(id + 2000, FIRMS);
  const location = seededChoice(id + 3000, LOCATIONS);
  const exp = seededInt(id + 4000, 5, 35);
  const tier = getTier(exp, id + 5000);
  const role = tier === 'Tier 1' ? seededChoice(id + 7000, ['Managing Partner','Senior Partner','Executive Chairman']) : tier === 'Tier 2' ? seededChoice(id + 7000, ['Senior Partner','Partner','Practice Head']) : seededChoice(id + 7000, ROLES);
  const pas = seededChoices(id + 8000, PRACTICE_AREAS, 1, 4);
  const dealsArr = [];
  const numDeals = seededInt(id + 10000, 1, 5);
  for (let i = 0; i < numDeals; i++) {
    dealsArr.push('Deal ' + seededInt(id + 11000 + i, 1, 999) + ' ($' + seededInt(id + 12000 + i, 10, 500) + 'M,' + seededInt(id + 13000 + i, 2018, 2025) + ')');
  }
  const locHC = {'New Delhi': 'Delhi HC', 'Mumbai': 'Bombay HC', 'Bangalore': 'Karnataka HC', 'Chennai': 'Madras HC', 'Kolkata': 'Calcutta HC', 'Hyderabad': 'Telangana HC', 'Pune': 'Bombay HC', 'Ahmedabad': 'Gujarat HC', 'Gurgaon': 'Punjab & Haryana HC', 'Chandigarh': 'Punjab & Haryana HC'};
  return {
    id: id.toString(),
    name,
    firm,
    role,
    practiceAreas: pas.join('|'),
    location,
    experience: exp,
    ranking: seededChoice(id + 9000, RANKINGS),
    deals: dealsArr.join('|'),
    expertise: seededChoices(id + 14000, EXPERTISE, 3, 6).join('|'),
    education: seededChoices(id + 15000, EDUCATION, 1, 3).join('|'),
    clients: seededChoices(id + 16000, CLIENTS, 3, 6).join('|'),
    recognition: seededChoices(id + 17000, RECOGNITION, 1, 4).join('|'),
    email: first.toLowerCase() + '.' + last.toLowerCase() + '@' + firm.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) + 'law.com',
    phone: '+91-' + ({'New Delhi': '11','Mumbai': '22','Bangalore': '80','Chennai': '44','Kolkata': '33','Hyderabad': '40','Pune': '20','Ahmedabad': '79','Gurgaon': '124','Chandigarh': '172'})[location] + '-' + seededInt(id + 18000, 40000000, 49999999),
    linkedIn: 'linkedin.com/in/' + first.toLowerCase() + '-' + last.toLowerCase() + '-' + seededInt(id + 19000, 10, 99),
    bio: seededChoice(id + 20000, BIOS),
    momentum: seededInt(id + 6000, 4, 10),
    tier,
    languages: seededChoices(id + 21000, LANGUAGES, 1, 3).join('|'),
    barAdmissions: (locHC[location] || location.split(' ')[0] + ' HC') + '|Supreme Court of India'
  };
}

const allPartners = [...elitePartners];
for (let i = 11; i <= 1200; i++) {
  allPartners.push(generatePartner(i));
}

const headers = ['ID','Name','Firm','Role','Practice Areas','Location','Experience (Years)','Ranking','Deals','Expertise','Education','Clients','Recognition','Email','Phone','LinkedIn','Bio','Momentum','Tier','Languages','Bar Admissions'];
const rows = allPartners.map(p => [
  p.id, p.name, p.firm, p.role, p.practiceAreas, p.location, p.experience, p.ranking, p.deals, p.expertise, p.education, p.clients, p.recognition, p.email, p.phone, p.linkedIn, p.bio, p.momentum, p.tier, p.languages, p.barAdmissions
].map(v => '"' + String(v || '').replace(/"/g, '""') + '"'));

const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
fs.writeFileSync('public/india-partners.csv', csv);
console.log('CSV written with', allPartners.length, 'partners');
