import type { Metadata } from "next";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Accredited Organizations",
  description:
    "The public register of organizations accredited by the American Accreditation Association (AAA) — universities, training providers, certification bodies, laboratories, and healthcare institutions across 35 countries.",
};

type Accreditation = {
  accreditedAs: string;
  number: string;
  scope: string;
  expiry: string;
  status: string;
};

type Org = {
  name: string;
  location: string;
  country: string;
  description?: string;
  accreditation?: Accreditation;
};

/**
 * Source: aaa-accreditation.org/accredited-organizations/ (migrated content).
 * Entries are listed in the original register order (most recently added first);
 * the page groups them by country at render time.
 */
const ORGS: Org[] = [
  {
    name: "Caribbean Cancer Research Institute",
    location: "Trinidad and Tobago",
    country: "Trinidad and Tobago",
    description:
      "CCRI is a registered non-profit organization founded in 2016 in Trinidad and Tobago with a mission to prevent cancers and improve patient outcomes through data-driven interventions. A major focus of CCRI is capacity building for patient navigation in the Caribbean.",
  },
  {
    name: "Subinstitute, LLC",
    location: "Michigan, USA",
    country: "United States",
    description:
      "SUBINSTITUTE is an elite substitute staffing training program designed to rapidly prepare skilled substitute educators for high-impact educational environments. Through immersive classroom simulations, classroom management strategies, student engagement techniques, lesson continuity training, and real-world preparation, SUBINSTITUTE develops confident, dependable substitutes who can seamlessly step into any classroom. Its accelerated model combines professionalism, flexibility, and instructional readiness in a uniquely results-driven experience.",
  },
  {
    name: "Inspeed Global",
    location: "Doha, Qatar",
    country: "Qatar",
    description:
      "Inspeed Global is a worldwide conformity assessment company that is specialized in certification, Proficiency Testing & quality training. We offer independent services that will help you reduce risk, streamline your processes and operate in a more sustainable manner.",
  },
  {
    name: "GovernValu Business Consulting",
    location: "Istanbul, Turkiye",
    country: "Turkey",
    description:
      "GovernValu Consulting Company Limited was established in 2016 as a Türkiye-based consulting firm with a regional and global outlook. We provide integrated advisory services across governance, investment relations, valuation, risk management, compliance, cost optimization, and institutional development. Our services are delivered in alignment with international standards and tailored to the regulatory, cultural, and economic context of each market we serve.",
  },
  {
    name: "American International Technology University",
    location: "California, USA",
    country: "United States",
    description:
      "American International Technology University is registered with the Utah Division of Consumer Protection under the Postsecondary School and State Authorization Act. This registration permits AITU to operate as a distance-learning postsecondary institution in the State of Utah. Founded on principles of educational accessibility and excellence, AITU serves a diverse global student body seeking to advance their careers, expand their knowledge, and achieve their academic aspirations through rigorous online education.",
  },
  {
    name: "Nest Center for Journalism Innovation and Development",
    location: "Ulaanbaatar, Mongolia",
    country: "Mongolia",
    description:
      "Nest Center for Journalism Innovation and Development NGO (Nest Center) works under the mission to 'promote information rights through sustainable business models for the media' supporting the flow of accountable information between news creators and consumers. We also run the Mongolian Fact-Checking Center, an IFCN signatory and the first JTI-accredited organization in Mongolia, upholding high journalistic standards and contributing to more accountable journalism in the country.",
  },
  {
    name: "KPI For Drilling Services",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "KPI for Drilling Services (KPI-DS) is an independent Type A inspection body headquartered in Egypt, providing specialized rig inspection, audit, and equipment integrity services for the oil and gas industry. Accredited to ISO/IEC 17020:2012 and supported by ISO 9001, ISO 14001, and ISO 45001 certifications, KPI-DS operates across the Middle East and Africa in Nigeria, Congo, Uganda, South Sudan, Algeria to ensure safety, compliance, and operational reliability.",
  },
  {
    name: "Nursing Solutions Academy",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    description:
      "In 2025, Nursing Solutions Company, the first nursing consultancy company in Saudi Arabia, established Nursing Solutions Academy as its educational subsidiary. Our primary objective is to design, develop, and deliver customized professional training that is both visually appealing to learners and up-to-date in terms of content. “Training, Learning, and Being Inspired” is our motto in Nursing Solutions Academy.",
  },
  {
    name: "IndyEXCEL",
    location: "Indianapolis, USA",
    country: "United States",
    description:
      "IndyEXCEL equips youth and adults with the education, tools, and opportunities to build wealth that lasts for generations. Grounded in real-world entrepreneurship, workforce empowerment, and community innovation, the Academy bridges learning and earning—turning potential into prosperity. Our programs prepare learners to start and scale businesses, succeed in meaningful careers, and create sustainable impact within their communities.",
  },
  {
    name: "Transformation International Society",
    location: "Karachi, Pakistan",
    country: "Pakistan",
    description:
      "Transformation International Wellness Clinics is a multidisciplinary mental health and rehabilitation center based in Karachi, Pakistan. It offers comprehensive psychological, neurological, and therapeutic services for children and adults, including psychotherapy, autism rehabilitation, and counseling. Led by experienced professionals, the clinic focuses on holistic mental health care, combining evidence-based therapies with personalized treatment to support emotional, cognitive, and behavioral well-being.",
  },
  {
    name: "World Academy for Research and Development",
    location: "London, United Kingdom",
    country: "United Kingdom",
    description:
      "World Academy is a leading UK-based professional certification institute with a presence in over 70 countries. We deliver globally recognized certifications, including Certified Professional Credentials, Postgraduate Diplomas, and Professional Diplomas across multiple disciplines. Our programs are application-focused and career-oriented, equipping learners with practical, workplace-ready skills. We maintain strong affiliations with respected international bodies, reflecting our commitment to quality and global standards.",
  },
  {
    name: "Rocklin International School",
    location: "Kuala Lumpur, Malaysia",
    country: "Malaysia",
    description:
      "Rocklin International School Kuala Lumpur is a student-centered American international school serving PreK–12 learners. We offer an international curriculum aligned to globally accepted, university readiness standards that integrates inquiry, creativity, and global citizenship. We provide a nurturing and inclusive learning environment that fosters intellectual growth, leadership, and readiness for university and life beyond school.",
  },
  {
    name: "Hawkins University",
    location: "Texas, USA",
    country: "United States",
    description:
      "Hawkins University is a globally oriented higher education institution committed to academic excellence, industry-aligned programs, and accessible online learning. The university offers undergraduate, postgraduate, and doctoral programs designed to equip learners with practical expertise, critical thinking skills, and leadership capabilities for success in a rapidly evolving global economy.",
  },
  {
    name: "Woodcroft University",
    location: "Florida, USA",
    country: "United States",
    description:
      "Woodcroft University is a global, online-first institution delivering career-aligned undergraduate, postgraduate, and doctoral programs. Built for the digital era, it combines academic rigor, flexible learning, and industry-relevant education to empower learners worldwide with knowledge, skills, and leadership capabilities for real-world impact.",
  },
  {
    name: "T-CERT LLC",
    location: "Florida, USA",
    country: "United States",
    description:
      "T-CERT specialize in boosting professional growth through high-quality certifications. It provides you with the necessary tools to confidently and successfully navigate the challenges of today's market.",
  },
  {
    name: "Welcome Home Health, INC",
    location: "Portland, USA",
    country: "United States",
    description:
      "“Welcome Home Health” refers to digital health support for patients transitioning from hospital to home for better recovery, often involving care coordination, but can also broadly mean the general concept of supportive healthcare services provided in a patient's residence, which can range from skilled nursing to non-medical personal care, often requiring a doctor's order for formal home health care.",
  },
  {
    name: "Global College of America",
    location: "Arizona, USA",
    country: "United States",
    description:
      "Experience the gold standard of distance learning with Global College of America. We seamlessly blend rigorous academics with unmatched digital freedom, delivering a top-tier US education to your screen. No boundaries, no limits—just pure excellence. Transform your career with the world's most innovative pathway to success, accessible from anywhere.",
  },
  {
    name: "Aesthetic Learning Institute for Injectors DBA (A.L.I.)",
    location: "Texas, USA",
    country: "United States",
    description:
      "Aesthetic Learning Institute for Injectors (A.L.I.) is an accredited boutique education provider offering beginner-to-advanced aesthetic training for medical and non-medical professionals. Programs combine structured theory with supervised hands-on instruction, emphasizing patient safety, ethical practice, regulatory compliance, and real-world clinical skill development.",
  },
  {
    name: "The Indian Institute of Business Management Studies (IIBMS)",
    location: "Mumbai, India",
    country: "India",
    description:
      "The Indian Institute of Business Management Studies (IIBMS) is a well-established professional education institute with over 25 years of experience in the education sector. IIBMS offers online and distance learning programs in management, doctorate, and executive education, with a strong focus on industry-oriented curriculum, academic excellence, and career-focused learning. The institute is dedicated to empowering working professionals and aspiring leaders through flexible, practical, and globally relevant education.",
  },
  {
    name: "Effective Skills Training Center",
    location: "Jeddah, Saudi Arabia",
    country: "Saudi Arabia",
    description:
      "Effective Skills Training Center (ESTC) is a professional training institution dedicated to empowering individuals and organizations with high-quality, industry-relevant learning experiences. Most training courses offered at ESTC are developed based on extensive teaching and professional experience of highly qualified faculty members. ESTC provides specialized training courses and programs in fields Industrial Engineering and Management that are essential to today's competitive business and industrial environment.",
  },
  {
    name: "Advanced Academic Rheumatology Review Course",
    location: "Abu Dhabi, UAE",
    country: "United Arab Emirates",
    description:
      "AdARRC is a leading rheumatology education platform that brings together international experts for high-level clinical updates, case-based learning, and hands-on training. The program features focused academies in Immunology, AI in Healthcare, Research Methodology, Radiology & Rheumatology, and Fellows-in-Training, providing clinicians with a comprehensive and practical review of current advances in rheumatology practice.",
  },
  {
    name: "Tashkent University of Economics and Technologies",
    location: "Tashkent, Uzbekistan",
    country: "Uzbekistan",
    description:
      "Tashkent University of Economics and Technologies is a licensed higher education institution established in 2022, offering bachelor's and master's degree programs in education, humanities, economics, finance, and information technologies. Operating in Tashkent city and Namangan region, the university delivers instruction in Uzbek and Russian through a structured multi-shift academic system.",
  },
  {
    name: "Domus Salutis Citta' Di Legnago Clinic",
    location: "Legnago, Italy",
    country: "Italy",
    description:
      "Domus Salutis is a private clinical and surgical institute established in 2001, offering healthcare, surgical and diagnostic services. It is equipped with an outpatient clinics and inpatient units, clinical laboratory and Genetics services. Centered on the person, it responds to the health needs of the community. Enriched by the contribution of outstanding professionals, its name is synonymous with quality, efficiency and patient-focused care.",
  },
  {
    name: "The Bannister Method",
    location: "New York, USA",
    country: "United States",
    description:
      "The Bannister Method is a leading movement-training platform specializing in flexibility, core, yoga, and Pilates, designed to enhance mobility, strength, and overall body performance. The program serves both elite athletes and general fitness-seekers, offering tailored training for optimal physical function. Founded and led by Gail Bannister-Munn, a certified coach with deep expertise in flexibility, fascial stretch therapy, yoga, and Pilates, The Bannister Method combines professional training standards with a personalized, performance-driven approach.",
  },
  {
    name: "Synergy Academy",
    location: "Virginia, USA",
    country: "United States",
    description:
      "Synergy Academy is the Global Training Development and Learning (TD&L) Platform of Synergy Consulting, a globally respected infrastructure and financial advisory firm with a track record spanning over 60 countries. Synergy Academy offers a comprehensive suite of training programs in infrastructure development, project finance, and public-private partnerships (PPPs) for evolving needs of governments, private developers, financiers, development institutions & individuals.",
  },
  {
    name: "LiveRamp",
    location: "San Francisco, USA",
    country: "United States",
    description:
      "LiveRamp is a global, public SaaS company offering a data connectivity platform. It specializes in identity resolution, unifying online and offline customer data into a privacy-compliant view. This enables secure data collaboration, activation, and measurement across the advertising and marketing ecosystems for businesses.",
  },
  {
    name: "Kazian School of Management",
    location: "Mumbai, India",
    country: "India",
    description:
      "Kazian School of Management is a leading institution offering flexible and career-oriented management programs designed for working professionals. With a strong focus on practical learning, global exposure, and academic excellence, Kazian provides students with advanced knowledge and leadership skills. Its innovative approach and industry-relevant curriculum empower learners to achieve professional growth and success.",
  },
  {
    name: "ESCUELA DE NEGOCIOUS EUROPEA DE BARCELONA (ENEB)",
    location: "Barcelona, Spain",
    country: "Spain",
    description:
      "Based in Barcelona, ENEB is a leading international institution offering high-performance Master's and Postgraduate programs through flexible online learning. Its programs are designed within the European Higher Education Area (EHEA) and grant ECTS credits, ensuring academic quality and global recognition. With students across 40+ countries and 24/7 virtual campus access, ENEB is committed to excellence and professional growth.",
  },
  {
    name: "SupportCell (Under Intended Consequences Group)",
    location: "USA",
    country: "United States",
    description:
      "SupportCell provides accredited training for congressionally mandated intelligence standards and tradecraft standards. This provides intelligence contractors with documentation of training and competency meeting contract requirements for the federal government.",
  },
  {
    name: "HANLE VENTURES LLC, DBA Aline Hanle",
    location: "Wimberley, USA",
    country: "United States",
    description:
      "AlineHanle.com, a subdivision of Hanle Ventures, LLC, designs and delivers transformational programs integrating neuroscience, emotional intelligence, and intuitive strategy. Creator of the Cosmic Compass Facilitator Training, Aline Hanle empowers professionals to master soulful leadership, client-centered facilitation, and practical tools for growth, offering accredited pathways to personal mastery and conscious professional development.",
  },
  {
    name: "RC BUSINESS GROWTH CONSULTANCIES",
    location: "Lucknow, India",
    country: "India",
    description:
      "RCBG Consultancies LLP is a business consultancy firm that helps Indian companies create winning strategies and solve complex problems. Established a year ago, it leverages the 22-year professional journey of its founder, Dr. Rashi Chaturvedii. The company offers services like Six Sigma strategies, corporate training, and startup mentoring, with a focus on sustainable outcomes.",
  },
  {
    name: "DeBeauty clinic",
    location: "Texas, USA",
    country: "United States",
    description:
      "DeBeauty Academy is a professional training organization in the aesthetics industry, offering advanced education in injectables and facial balancing. We focus on safety, innovation, and practical application, providing structured programs for licensed professionals seeking to expand their expertise.",
  },
  {
    name: "Ullemeyer Forensics, LLC",
    location: "California, USA",
    country: "United States",
    description:
      "Ullemeyer Forensics, LLC is an organization that provides impartial forensic services to local law enforcement, law firms, and private investigation services. Founded by Michael Ullemeyer, the company is built on principles of integrity, quality, and exceptional service, aiming to serve public safety and justice. They specialize in training, consulting, and physical evidence processing.",
  },
  {
    name: "D'VINE BEAUTY ACADEMY",
    location: "Texas, USA",
    country: "United States",
    description:
      "D'Vine Beauty Academy offers top-tier education in medical aesthetics, ancillary medical careers, and TDLR-approved courses, including barbering, cosmetology, and esthetics. Our mission is to provide students with the essential knowledge and skills for rewarding careers in the beauty and medical fields, empowering them to succeed in their chosen profession.",
  },
  {
    name: "Abbysan Yoga & Wellness Center Co. Ltd",
    location: "Thailand",
    country: "Thailand",
    description:
      "Abbysan Yoga and Wellness Centre, founded by Dr. Abhishek Agrawal in Phuket, Thailand, specializes in pain relief through posture correction and science backed movement therapy. We help individuals recover, move better, and prevent injuries. Our education programs Posture Wellness Specialist, Clinical Pilates Instructor, and Yoga Teacher Training empower physiotherapists and movement professionals to create lasting impact and transform clients health.",
  },
  {
    name: "PRIORITY GLOBAL PRIVATE LIMITED",
    location: "India",
    country: "India",
    description:
      "Priority Global Private Limited founded in 2023 is a training and certification body, it is an institution that provides specialized instruction and training in a specific field, aiming to equip individuals with the knowledge, skills, and practical experience needed for professional development or career advancement. These academies can focus on various areas, professional development, and even specific industry practices, and often incorporate both theoretical learning and hands-on experience.",
  },
  {
    name: "Digital Laura Anderson LLC",
    location: "Florida, USA",
    country: "United States",
    description:
      "The 10hr $10k Work Month Online Trade Bootcamp teaches high-demand digital trades — like Meta Ads, TikTok Ads, email marketing, and AI skills. Through a 5-step system: learn a trade, position as an expert, book clients, delegate, and automate. Designed for aspiring entrepreneurs, it focuses on working smarter, escaping the 40-hour grind, and building location-independent income.",
  },
  {
    name: "ENGAGEBOX",
    location: "Panama City, Panama",
    country: "Panama",
    description:
      "EngageBox specializes in enhancing talent development and employee onboarding. With over 20 years of experience in the pharmaceutical industry, the company focuses on optimizing upskilling programs to improve productivity and competitiveness. Their expertise includes CRM, Business Intelligence, and training strategies, aiming to set teams up for success and drive organizational growth. EngageBox is committed to empowering businesses by crafting transformative strategies and enhancing customer experiences across regions.",
  },
  {
    name: "T&C – BRD",
    location: "Gujarat, India",
    country: "India",
    description:
      "T&C-BRD is a proprietorship company founded in 2016 and led by Mohan Narayan Limaye, a highly experienced functional safety expert. With a track record of delivering tailored, high-quality services, the company provides Functional Safety Training, Engineering and Product Certification Support.",
  },
  {
    name: "Smartcomply Academy",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    description:
      "Smartcomply Academy stands as a leader in delivering automated and AI-driven solutions for compliance, cybersecurity, and business transformation. Our Mission is to help businesses stay secure and compliant with smart, and automated solutions. The Academy provides tailored courses in compliance management, cybersecurity fundamentals, risk assessment, and regulatory requirements.",
  },
  {
    name: "International School of Brindisi",
    location: "Brindisi, Italy",
    country: "Italy",
    description:
      "The International School of Brindisi (ISB) is an American-style international school offering student-centered, inclusive education from early years through secondary. As the only international school south of Naples, ISB blends academic excellence with well-being and innovation to nurture confident, compassionate learners prepared to thrive locally and globally.",
  },
  {
    name: "INTERLINK ANGOLA",
    location: "Luanda, Angola",
    country: "Angola",
    description:
      "INTERLINK ANGOLA is a fully Angolan-owned company approved to deliver Maritime Training (STCW /IMO) and other safety Trainings to Oil and Gas Industry, Renewables, terminals and Logistics. Our expertise lies in international standards like OPITO, STCW, IMO and ISO. We are here to support you, saving lives and protecting the environment.",
  },
  {
    name: "Air Traffic Control Future Operators (ATCFO)",
    location: "Florida, USA",
    country: "United States",
    description:
      "Air Traffic Control Future Operators, Inc., (ATCFO), a service-disabled veteran owned business, was created to assist the United States in overcoming and help preventing Air Traffic Controller shortages. Our leadership team consists of former Federal Aviation Administration (FAA) Air Traffic Managers, FAA Quality Assurance and Training Specialist, FAA Air Traffic Controllers, Federal Contract Tower (FCT) Area Managers, Military Air Traffic Controllers.",
  },
  {
    name: "TOSI University",
    location: "Wyoming, USA",
    country: "United States",
    description:
      "TOSI University is the global leader in education for the Body Altering Aesthetics industry. They offer advanced training, post-surgical certifications, and award-winning business courses rooted in trauma science, physiology, and client safety. TOSI programs support professionals in bodywork, aesthetics, nursing, and plastic surgery, equipping them with real-world tools to reduce complications and elevate client care outcomes.",
  },
  {
    name: "Al ADLIAH TRAINING ACADEMY",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    description:
      "Al Adliah Group is a legal entity with extensive scientific and practical expertise in governance, estate liquidation—both domestically and internationally—and the establishment and dissolution of companies, including board management. The group has successfully developed innovative solutions for handling all aspects of estates, whether in the form of cash, shares, real estate, movable assets, or business entities. Al Adliah Group is committed to providing comprehensive, professional services tailored to complex inheritance and corporate governance needs.",
  },
  {
    name: "Global Medical City Hospital",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "Global Medical City is the largest private healthcare facility in Cairo, dedicated to transforming the medical landscape in Egypt. With over 700 inpatient beds, 60 specialized outpatient clinics, and 25 Surgery rooms, the hospital spans more than 88,200 square meters. GMC's vision is to deliver exceptional medical care to patients, prioritizing safety and adhering to the highest quality standards.",
  },
  {
    name: "The Med Spa Academy",
    location: "Waco, USA",
    country: "United States",
    description:
      "The Med Spa Academy offers specialized training in medical aesthetics for both professionals and aspiring practitioners. Their mission is to provide the latest techniques, focusing on safety, efficacy, and high-quality patient care. The academy emphasizes hands-on learning to equip students with the skills needed to succeed in the industry and deliver exceptional results. Graduates gain the confidence and expertise to thrive in the growing field of aesthetics.",
  },
  {
    name: "SHAM INSTITUTE",
    location: "Mangalore, India",
    country: "India",
    description:
      "SHAM INSTITUTE, established by the Shamala Education Trust, is dedicated to bridging the gap between education and employment. We offer a wide range of career-focused programs, from traditional academic training to vocational skill development, ensuring students gain the necessary expertise for success in their chosen fields. SHAM INSTITUTE committed to empowering students with industry-relevant skills through our regular and skill development/vocational programs along with specialized Degree and Certification programs available in both regular and online mode for training students to build successful careers in today's competitive world.",
  },
  {
    name: "European School of Management and Leadership",
    location: "Prague, Czech Republic",
    country: "Czech Republic",
    description:
      "ESML (European School of Management and Leadership) is a renowned educational institution based in Prague, offering programs in business, leadership, and management. They provide flexible learning options for professionals, including diplomas, bachelor's, master's, and doctoral degrees. With a focus on practical skills and global standards, ESML aims to empower students to become successful leaders in their careers.",
  },
  {
    name: "INTERNATIONAL SCIENCE AND TECHNOLOGY UNIVERSITY",
    location: "Warsaw, Poland",
    country: "Poland",
    description:
      "International Science and Technology University (ISTU) is a multinational accredited higher education institution and global higher education service provider in tertiary education-vocational training, evaluation-selection and certification services that is accredited by 7 different independent international organizations, has affiliations with 3 different unbiased supranational body, and also has a trusted brand name and quality-assurance certificates. ISTU is one of the founding members of the Business Eurasia Education Alliance, one of the most important global supreme institutions in the field of higher education. ISTU is included in Times Higher Education (THE) ranking database. ISTU is a “Microsoft Qualified Academic Institution” and affiliated from Google with “Education Plus” authorization.",
  },
  {
    name: "KCertification",
    location: "Sao Paulo, Brazil",
    country: "Brazil",
    description:
      "KCertification is specialized in ISO certifications, offering exceptional services to help organization align with international management standards. Backed by a team of highly skilled and experienced experts, to ensure a streamlined, efficient, and transparent certification process tailored to customers requirements. Committed to excellence, KCertification supports businesses in meeting regulatory expectations, improving operational efficiency, and gaining a competitive advantage in the global marketplace.",
  },
  {
    name: "MILLENNIA WELLNESS MD PLLC",
    location: "Texas, USA",
    country: "United States",
    description:
      "Millennia Wellness MD, located in Frisco, Texas, is a physician-owned clinic specializing in advanced skincare, laser treatments, weight loss, and hormone therapy. Led by Dr. Biju Mathew, a board-certified internal medicine physician, the clinic offers personalized, holistic health services to help clients achieve optimal well-being.",
  },
  {
    name: "Avantis",
    location: "Beirut, Lebanon",
    country: "Lebanon",
    description:
      "Avantis is a consultancy and training firm dedicated to empowering professionals through top-tier certification programs and tailored services. With over 23 years of experience, Avantis has successfully completed more than 325 projects, serving over 279 clients. Their offerings include preparation for globally recognized certifications such as CMA, CPA, CFA, FMAA, CIA, ACCA, and DipIFR, as well as customized training programs across various industries, including healthcare and insurance. Avantis also provides strategic consultancy services focusing on business development, process improvement, and organizational restructuring. Committed to excellence, Avantis aims to ignite potential and drive success for individuals and organizations alike.",
  },
  {
    name: "Lazarus Alliance",
    location: "Arizona, USA",
    country: "United States",
    description:
      "Lazarus Alliance is the Cybervisor® that helps private and public sector organizations deter threats, eliminate gaps, and proactively manage risk. Lazarus Alliance offers expertise coupled with advanced technology to achieve sustainable compliance, risk reductions and demonstrate compliance and cybersecurity excellence to customer, clients, stakeholders, and regulatory entities the world over.",
  },
  {
    name: "DWZ – Deutsche Weltweit Zertifizierung",
    location: "Berlin, Germany",
    country: "Germany",
    description:
      "DWZ is a German Certification Body offering a variety of certification services to ensure that people, systems and products are recognized worldwide. Our priority: your security and the protection of your certifications. Careful checks for clear insights.",
  },
  {
    name: "American University of Peace Studies Inc",
    location: "Georgetown, Guyana",
    country: "Guyana",
    description:
      "American University of Peace Studies is a private higher Educational Research Based University, established in 2003 with the aim to promote peace and harmony through the study of human behavior. Our Vision is to improve the human condition by preparing students to meet the needs of a changing society, providing great insights that empower human development and well being for all.",
  },
  {
    name: "The Dog Wizard Academy LLC",
    location: "Ohio, USA",
    country: "United States",
    description:
      "The Dog Wizard Academy offers comprehensive programs for individuals aspiring to become professional dog trainers. Their curriculum combines online coursework with in-person training, covering essential topics such as canine behavior, obedience training, and behavior modification. Graduates receive certification and have opportunities for job placement within The Dog Wizard network, with potential paths to franchise ownership.",
  },
  {
    name: "Michigan International Development College",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "At Michigan International Development College, we are dedicated to fostering professional growth and empowering individuals through specialized training. Our mission is to provide high-quality education across diverse fields, including education, marketing, sales, Administration, and business. We understand the ever-changing landscape of today's job market. Our experienced instructors bring a wealth of knowledge and real-world experience, ensuring that our students acquire the skills and insights needed to thrive in their careers. We pride ourselves on creating a dynamic learning environment that encourages innovation, collaboration, and personal development. Our programs are designed not just to teach but to inspire.",
  },
  {
    name: "Proyecto Inmigrante ICS. Inc. – Texas Institute for Immigration Studies",
    location: "Texas, USA",
    country: "United States",
    description:
      "The primary purpose of the Texas Institute for Immigration Studies (TXIIS) is to train students who, through the development of competencies and critical and analytical thinking, will have the professional, technical, and ethical skills necessary for professional careers through which they can build successful futures for themselves, their families, and their communities. TXIIS is an initiative of Proyecto Inmigrante ICS, Inc.",
  },
  {
    name: "Asian Pain Academy",
    location: "Kolkata, India",
    country: "India",
    description:
      "Asian Pain Academy offers Accredited Pain Management Courses for doctors, anesthesiologists, and medical professionals, including Pain Fellowship programs, online pain management courses, and hands-on pain management workshops. Located in Kolkata, India, it specializes in advanced techniques like MSK Ultrasound, Ultrasound-Guided Nerve Blocks and Pain Procedures, and Basic and Advanced C-arm Guided Pain Procedures, making it a leading destination for Pain Management Courses in Kolkata, India.",
  },
  {
    name: "American College of Canine Studies (ACCS)",
    location: "Nottingham, United Kingdom",
    country: "United Kingdom",
    description:
      "The American College of Canine Studies provide specialised canine related courses for those, US wide, working with dogs or interested in pursuing a career working with dogs. Students include Vet Techs, Trainers, Behavior experts, Shelter and Kennel staff, dog walkers and sitters. Courses are home study and self paced.",
  },
  {
    name: "EMMAK ACADEMY FOR TRAINING, DEVELOPMENT AND CONSULTING",
    location: "Ontario, Canada",
    country: "Canada",
    description:
      "Emmak Canadian Academy for Training and Consulting is a leading Canadian institution based in Canada, specializing in providing remote training and consulting services in both Arabic and English. The academy is dedicated to equipping individuals and organizations with the latest training courses and advanced curricula in an interactive and practical manner, under the supervision of a distinguished team of international experts and consultants. The academy focuses on enhancing personal and professional skills, keeping pace with the latest innovations in technology and professional development, contributing to growth and excellence at both individual and organizational levels.",
  },
  {
    name: "THEMIS INTERNATIONAL PRIVATE COURT LTD",
    location: "London, United Kingdom",
    country: "United Kingdom",
    description:
      "Themis International Private Court base in the United Kingdom has been setup to provide a smart and innovative alternative dispute resolution digital platform. TIPC's objective is to be the game-changer in the field with fast, efficient, cost-effective, flexible yet compliant, Alternative Dispute Resolutions (ADR). Unrivalled in experience and expertise with its panel of legal professionals around the Global Village.",
  },
  {
    name: "Al Delma for General Contracting Upstream Downstream Industry & Training Services LLC.",
    location: "Baghdad, Iraq",
    country: "Iraq",
    description:
      "Al Delma is an Iraqi business that offers a range of high-quality services across various sectors, including training, life support, operation and maintenance, supply and warehousing, system design, and construction. The company aims to meet the needs of different Iraqi market sectors through continuous market research, innovation, and development, focusing on rebuilding Iraq and enhancing the skills of its workforce to meet international standards.",
  },
  {
    name: "NOBLES TRAINING CENTER",
    location: "Michigan, USA",
    country: "United States",
    description:
      "Nobles Center specializes in providing a wide range of online courses and training programs aimed at enhancing skills and knowledge in various fields. Their platform offers professional development opportunities, tailored learning experiences, and expert-led sessions to help individuals achieve their personal and career goals.",
  },
  {
    name: "TASHKENT ECONOMICS AND PEDAGOGY INSTITUTE",
    location: "Tashkent, Uzbekistan",
    country: "Uzbekistan",
    description:
      "The Tashkent Institute of Economics and Pedagogy (TIPI) is an educational institution. It offers a range of programs focused on economics, pedagogy, and related disciplines, aiming to provide high-quality education and professional training. TIPI hosts various academic and extracurricular activities, including scientific conferences, talent competitions, and faculty-level initiatives. The institute also prioritizes student development through innovative learning approaches and practical engagement.",
  },
  {
    name: "Meridian Maritime Training Centre LLC",
    location: "Batumi, Georgia",
    country: "Georgia",
    description:
      "Meridian Maritime Training Centre is a training and certification institution dedicated to providing high-quality maritime education. The center offers a variety of programs, including fire prevention and firefighting, advanced firefighting, and tanker cargo operations, among others. Its facilities are designed to simulate real-world maritime conditions, ensuring that trainees gain both theoretical knowledge and practical skills.",
  },
  {
    name: "International House of Metrolina",
    location: "North Carolina, USA",
    country: "United States",
    description:
      "International House is a nonprofit organization that supports immigrants and promotes cultural diversity. Since 1981, it has offered programs such as cultural sensitivity training, immigration law services, and educational initiatives. The organization aims to empower immigrants, enhance international understanding, and enrich the community.",
  },
  {
    name: "SCHOOL OF JUDEO-CHRISTIAN EDUCATION",
    location: "Brooklyn, USA",
    country: "United States",
    description:
      "The School of Judeo-Messianic Education (JME) focuses on providing education rooted in Judeo-Christian values and traditions. Their mission is to nurture spiritual, intellectual, and emotional growth through a curriculum that includes Biblical Hebrew at various levels, textual analysis of sacred texts, and teachings on the Feasts of the Lord. They also foster a welcoming community for families and offer extracurricular activities, including retreats and events. The school emphasizes a holistic approach to education while staying connected to its faith-based roots.",
  },
  {
    name: "Vantage Laboratory Services",
    location: "Houston, USA",
    country: "United States",
    description:
      "Vantage Laboratory Services, Inc. is a Houston-based laboratory specializing in environmental, microbiological, and food testing. The lab's mission is to provide clients with the most accurate, reliable, and scientifically defendable data available.",
  },
  {
    name: "Clarivate PLC",
    location: "London, United Kingdom",
    country: "United Kingdom",
    description:
      "Clarivate PLC is a global company specializing in providing trusted insights and analytics to accelerate innovation. Clarivate offers a range of services, including data, software, and consultancy, to support research, intellectual property management, and business growth. The company serves industries such as healthcare, academia, and technology, helping organizations make informed decisions and drive advancements. With flagship products like Web of Science, Cortellis, and Derwent.",
  },
  {
    name: "Swiss International Management Academy (SIMA)",
    location: "Zug, Switzerland",
    country: "Switzerland",
    description:
      "The Swiss International Management Academy (SIMA) is a higher education institution based in Zug, Switzerland. It specializes in providing online programs tailored to global professionals, offering flexibility and accessibility. SIMA focuses on high-quality Swiss education with programs in business administration, data science, computer science, and other fields. The school emphasizes practical learning, international networking, and career readiness.",
  },
  {
    name: "Messianic Family Club LLC",
    location: "Georgia (GA), USA",
    country: "United States",
    description:
      "The Messianic Family Club (Messianic School of Ministry) is a vibrant community that embraces and celebrates the unity and harmony that can be found when christians from different backgrounds and beliefs can come together.",
  },
  {
    name: "386KONSULT INTEGRATED SERVICES LIMITED",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    description:
      "386KONSULT INTEGRATED SERVICES LIMITED is empowering businesses with technical excellence & innovation. They are committed to reshaping Africa's business scene with the mission to slash operational costs with tech, nurture global firms addressing African issues. We innovate and deploy tech for a global edge, fueling Africa's advancement.",
  },
  {
    name: "Quality Management Lead, S.L. (QML)",
    location: "Barcelona, Spain",
    country: "Spain",
    description:
      "Quality Management Lead (QML) is a Leading Certification Body located in Barcelona, Spain that is provide different types of management system certification (QMS, EMS, OHSAS, FSMS & Energy management Systems) for the industrial and service sectors.",
  },
  {
    name: "Gilk Radiology Consultants, LLC",
    location: "Kansas, USA",
    country: "United States",
    description:
      "Gilk Radiology Consultants, LLC (GRC) provides MRI safety consulting services helping radiology providers (hospitals, imaging centers, research institutions), imaging professionals (managers, radiologists, and technologists), product manufacturers, and legal professionals on issues of MRI safety and best practice.",
  },
  {
    name: "CLINOXY Solutions",
    location: "Hyderabad, India",
    country: "India",
    description:
      "CLINOXY Solutions is a Leading Skill Training Institute for Life Sciences Graduates that is headed by a highly experienced Pharma professionals having more than 10+ years core experience into clinical research field. The mission of CLINOXY is to provide comprehensive trainings for students from B.Pharmacy, M.Pharmacy, Pharm.D, Biotechnology, Microbiology, Chemistry, Nursing, Dental, MBBS and other life sciences graduates to kick start their career in healthcare industry.",
  },
  {
    name: "ESD Global INC.",
    location: "Massachusetts, USA",
    country: "United States",
    description:
      "Empowerment Self Defense is a holistic approach to personal safety that teaches tools to combat the whole spectrum of violence, from verbal harassment to sexual and physical violence. It is a violence prevention system that teaches individuals how to interrupt violence by listening to their intuition, assessing their options, asserting boundaries, and using de-escalation strategies. ESD provides tools for a range of mental, verbal, and physical responses.",
  },
  {
    name: "Alator Data Services Ltd",
    location: "Dundee, Scotland",
    country: "United Kingdom",
    description:
      "Alator Data Services Ltd. empowers businesses with accurate data to optimize plant performance. Their 20+ years of experience provide a one-stop solution for calibration, emissions monitoring, and environmental services, ensuring compliance, safety, and efficiency.",
  },
  {
    name: "Vanguard Medical LLC",
    location: "Virginia, USA",
    country: "United States",
    description:
      "Vanguard Medical based out of Virginia, USA is a comprehensive medical equipment service provider specializing in repair, cleaning, and biomedical services. They offer a one-stop solution for healthcare facilities, ensuring optimal performance and longevity of medical devices.",
  },
  {
    name: "Business and Finance Club (BFC)",
    location: "Beirut, Lebanon",
    country: "Lebanon",
    description:
      "BFC Provides exceptional consultation and training for individual and company success, encouraging continual learning and seek to be a trusted worldwide leader in financial and business consulting. BFC skilled consultants tailor solutions for financial optimization, streamlined processes, and growth.",
  },
  {
    name: "First International Development Center for Training (FIDC)",
    location: "Lusail, Qatar",
    country: "Qatar",
    description:
      "FIDC is a Qatari-owned entity based in Doha, specializes in providing diverse training and counselling services in both Arabic and English. With a focus on offering valuable learning experiences, Contributing to personal and professional growth.",
  },
  {
    name: "Landmark Management Partner",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "Landmark Management Partner is the hub of pharmaceutical Training and developing in Egypt and Gulf. The mission is to support organizations to grow and realize their potential, via providing strategic recommendations and tailored solutions with best quality and international standards, leading to great outcomes with high customer indulgent.",
  },
  {
    name: "AnaAkhtar FZC-LLC",
    location: "Sharjah, UAE",
    country: "United Arab Emirates",
    description:
      "AnaAkhtar Platform developed by a team of educators, psychologists, and artists in the MENA region, aims to support students in achieving their full potential and contributing to broader societal goals. Through effective tracking mechanisms, we seek to revolutionise how students are assessed for Social, Emotional, and Behavioural Development.",
  },
  {
    name: "Master Injectors LI.C, DBA Monarch Master Injector",
    location: "Texas, USA",
    country: "United States",
    description:
      "Master Injectors Inc. offers training and certification in cosmetic and wellness injections, including IV therapy. Their programs range from beginner to advanced levels, available both in-person and online. They provide expert-level skills, practical business solutions, and membership benefits.",
  },
  {
    name: "Uplifted Abilities, DBA NEMT Startup Coach",
    location: "South Carolina, USA",
    country: "United States",
    description:
      "The NEMT Startup Coach offers expert guidance for entrepreneurs in the Non-Emergency Medical Transportation industry. Led by Willena, a registered nurse and MBA student, provides personalized advice on starting and managing a NEMT business, including driver management and business growth strategies.",
  },
  {
    name: "Indian School of Medical Aesthetic & Clinical Cosmetology",
    location: "Mumbai, India",
    country: "India",
    description:
      "The Indian School of Medical Aesthetic and Cosmetology (ISMACC) provides advanced training and certification in medical aesthetics and cosmetology. Their programs combine theoretical knowledge with practical training, guided by experienced professionals, to equip students with essential career skills.",
  },
  {
    name: "National Power Academy (NPA)",
    location: "Dammam, Saudi Arabia",
    country: "Saudi Arabia",
    description:
      "The Academy is a unique and ambitious public-private initiative to provide specialized technical training programs, with the goal of creating qualified Saudi workforce equipped with the necessary skills and expertise to support the ever-growing national energy sector, in both public and private domains.",
  },
  {
    name: "National Industrial Training Institute (NITI)",
    location: "Al-Hufuf, Saudi Arabia",
    country: "Saudi Arabia",
    description:
      "NITI is an independent, not-for-profit training institute. It is the result of a strategic partnership between Saudi Aramco (SA) and the Technical & Vocational Training Corporation (TVTC). NITI offers training to high school graduates to qualify them to work in the Oil / Gas, Petrochemical, Energy and Construction industries.",
  },
  {
    name: "Governance Academy",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    description:
      "Governance Academy is a leading training provider in Saudi Arabia dedicated to advancing the principles of governance, transparency, and accountability within both the public and private sectors. Our mission is to foster a culture of ethical leadership and effective management practices across organizations.",
  },
  {
    name: "StudyMEDIC LLC",
    location: "Doha, Qatar",
    country: "Qatar",
    description:
      "StudyMEDIC offers fellowship programs designed to equip learners with the skills and knowledge to excel in your chosen specialty. Their programs adhere to international medical education standards, preparing learners for a successful career in the global healthcare landscape.",
  },
  {
    name: "TRUST Company for Management & Consulting Services",
    location: "Amman, Jordan",
    country: "Jordan",
    description:
      "TRUST Company is a specialized private company provides solutions, consultancy and training programs for Continues Professional Development, management and quality systems.",
  },
  {
    name: "ISB International Survey Bureau",
    location: "Sao Paulo, Brazil",
    country: "Brazil",
    description:
      "ISB International Survey Bureau is an organization that has been operating in the market for over 15 years, with extensive experience in the areas of inspection and certification of products, it offers a range of inspection services, such as: control and supervision of loading and unloading, sampling, measurement, analysis and testing.",
  },
  {
    name: "Fumind Tech LLP",
    location: "New Delhi, India",
    country: "India",
    description:
      "Fumind Tech is a professionally managed progressive organization in the field of Education Trainings, Self-Employment, tech skill courses & digital literacy, established by eminent reputed academicians with support of highly experienced Tech Gurus.",
  },
  {
    name: "Cinute Digital Private Limited",
    location: "Mira Bhayandar, India",
    country: "India",
    description:
      "Cinute Digital Pvt. Ltd (CDPL) is an EdTech company based in Mumbai, India. Provides in-demand online and on-premise certification programs in Software Testing, Data Science, Artificial Intelligence, Machine Learning, and other IT domains. The industry-oriented courses, led by experienced instructors, offer practical experience and high-quality education for real-world success, equipping learners for thriving careers in IT.",
  },
  {
    name: "ECC Knowledge Group",
    location: "Dubai, UAE",
    country: "United Arab Emirates",
    description:
      "ECC Knowledge Group is a leading education organization in the MENA region, offering internationally accredited business and leadership programs through partnerships with universities in Europe and Asia, with a strong focus on accessibility, flexibility, and learner success.",
  },
  {
    name: "Britishey Training Centre",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "Britishey Training Centre offers courses from prestigious institutions. With experienced and qualified instructors, the centre is dedicated to helping students achieve their language learning goals through interactive sessions, practical exercises, and personalized attention.",
  },
  {
    name: "AADHYA PAIN MANAGEMENT CENTRE",
    location: "Jaipur, India",
    country: "India",
    description:
      "Aadhya Pain Management Centre, based in Jaipur, India, is led by Dr. Kanchan Sharma — a Certified Expert in Musculoskeletal Pain and Ultrasound.",
  },
  {
    name: "AMERICAN COLLEGE OF TEACHERS AND TRAINERS LLC",
    location: "New Jersey, USA",
    country: "United States",
    description:
      "The American College of Teachers and Trainers is dedicated to promoting excellence in education. We empower educators and trainers with innovative strategies, knowledge, and skills, fostering a culture of lifelong learning and professional development.",
  },
  {
    name: "EAST BRIDGE UNIVERSITY",
    location: "Paris, France",
    country: "France",
  },
  {
    name: "International Chemistry Testing LLC – ICT",
    location: "Massachusetts, USA",
    country: "United States",
    description:
      "International Chemistry Testing (ICT) is a premier independent laboratory with 5,000 sq feet lab space to provides unique chemistry services for life science, food and dietary supplements, cosmetics, biotechnology and pharmaceutical industries.",
  },
  {
    name: "Namaa Academy",
    location: "Rabat, Morocco",
    country: "Morocco",
    description:
      "Namaa Academy is an independent institution specialized in Islamic and Human Sciences established in 2015, providing academic education, it adopts the distance education system. The academy follows a comprehensive and integrative character for Islamic and human sciences. It includes approximately forty specialized scientific courses distributed among eight diplomas.",
  },
  {
    name: "Inspeed Global",
    location: "Sarasota, USA · Istanbul, Turkey",
    country: "United States",
    description:
      "Inspeed Global is a worldwide conformity assessment company that is specialized in certification, Proficiency Testing & quality training. We offer independent services that will help you reduce risk, streamline your processes and operate in a more sustainable manner.",
    accreditation: {
      accreditedAs: "Management System Certification Body",
      number: "SC20502",
      scope: "ISO/IEC 17021",
      expiry: "25 May 2025",
      status: "Accredited",
    },
  },
  {
    name: "International Quality System Registrars – IQSR",
    location: "Minnesota, USA",
    country: "United States",
    description:
      "IQSR and its experienced auditors provide professional, reputable, and seamless certification services to most industries. A level of audit services that will deliver a substantial return on your investment. Your quality system initiatives will continue to improve as we guide you on the path to business success.",
  },
  {
    name: "SSC Services Coachstab",
    location: "Dallas, USA",
    country: "United States",
    description:
      "Experienced coaching center and community that helps individuals live healthier, wealthier, and more. CoachStab Life Coaching training is a 12 week program that is designed to teach the fundamentals of coaching and the skills needed to be a competent coach. CoachStab has created a unique program that will equip any potential coaches with the fundamentals and practices to use in coaching clients in any area of their lives.",
  },
  {
    name: "DGQZI Quality Certification International",
    location: "Berlin, Germany",
    country: "Germany",
    description:
      "DGQZI is the Deutsche Gesellschaft für Qualität und Zertifizierung international DGQZI GmbH, Berlin providing the Management System Certification in the different areas and sectors.",
  },
  {
    name: "Mckinsey Business University USA",
    location: "Wilmington, USA",
    country: "United States",
    description:
      "The University began as an initiative in a developed country in 2012-2013 to teach youth and communities the art of management and positive life. The university promoted the philosophy of a knowledgeable lifestyle and the pleasure of knowledge-based success. During the last decade, the university trained more than 25,000 trainees, researchers, and 50 companies.",
  },
  {
    name: "Enertech Qatar Safety",
    location: "Doha, Qatar",
    country: "Qatar",
    description:
      "Enertech Qatar is one of the Middle East's leading Health, Safety, and Environmental (HSE) Training Provider. Our wide range of courses gives the opportunity for modern workforce to get trained and certified with international standards.",
    accreditation: {
      accreditedAs: "Personnel Certification Body",
      number: "PC21301",
      scope: "Rigger, Lifting, Scaffolding",
      expiry: "26 January 2024",
      status: "Accredited",
    },
  },
  {
    name: "Etizan Training Center",
    location: "Doha, Qatar",
    country: "Qatar",
    description:
      "Etizan center offers bundles of training programs for individuals and institutions based on various fields taking into consideration the latest scientific standards that are given by professional trainers and specialists in several fields seeking individual and institutional development.",
  },
  {
    name: "American International Theism University",
    location: "Florida, USA",
    country: "United States",
    description:
      "AITU offers educational programs that prepare students for religious vocations as ministers, professionals, or laypersons in ministry. Our programs include counselling, theism, education, administration, music, fine arts, media communications, or social work.",
    accreditation: {
      accreditedAs: "Training & Education Provider",
      number: "TP20804",
      scope: "Business, Theology, Education, Psychology, Finance",
      expiry: "16 June 2026",
      status: "Accredited",
    },
  },
  {
    name: "Central Metallurgical for Research & Development Institute",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "CMRDI is a research center affiliated to the State Ministry of Scientific Research. The mission of the institute is to contribute to the national economy and the welfare of the society by improving the Egyptian industry through technological development and technology transfer.",
  },
  {
    name: "Orevan",
    location: "Ras Al-Khaimah, UAE",
    country: "United Arab Emirates",
    description:
      "Orevan established their vision as (Impact our healthcare clients' business with our trendsetting creative touch just as their way of touching other people's lives every day). The mission of Orevan is (to change the way you define healthcare communication by offering extraordinary creative insights that narrow the gap between doctors, enterprises, and individuals – all under one roof).",
  },
  {
    name: "Human Development Center",
    location: "Baku, Azerbaijan",
    country: "Azerbaijan",
    description:
      "Human Development Center (HDC) is a specialized company providing training and consulting services for individual and corporate development, and its scope of accreditation is the Training of Trainers.",
  },
  {
    name: "ZSK Aesthetics",
    location: "Islamabad, Pakistan",
    country: "Pakistan",
    description:
      "ZSK Aesthetics and Dental Clinic is an accredited aesthetic institute located in the heart of Islamabad and aiming to deliver the highest standards of personalized dental care education.",
  },
  {
    name: "Academy of Computer Technology and Training (ACTT)",
    location: "Trinidad & Tobago",
    country: "Trinidad and Tobago",
    description:
      "ACTT is an online institution at the forefront of technological education in Trinidad & Tobago. ACTT's mission is to provide accessible and comprehensive computer technology training that breaks down barriers and empowers individuals from all walks of life. ACTT is dedicated to fostering a culture of continuous learning, adaptability, and innovation in the digital age.",
  },
  {
    name: "AM Testing & Services. Inc.",
    location: "Florida, USA",
    country: "United States",
    description:
      "Located in the Southwest Florida area to provide product testing and certification services. We offer a full spectrum of product testing accredited to ISO 17025 and accepted by the CPSC. Unlike most labs, we will give you the personal attention you need to identify your unique testing needs and provide the most cost-effective way to comply with testing standards & requirements.",
  },
  {
    name: "ZMK",
    location: "Cairo, Egypt",
    country: "Egypt",
    description:
      "ZMK Training Center is committed to providing the best possible training and development services to trainees in the healthcare field. Through which the trainee acquires skills and professional competence which contributes to preparing a trainee leader who is confident in the healthcare field.",
  },
  {
    name: "BiMS",
    location: "Dhaka, Bangladesh",
    country: "Bangladesh",
    description:
      "BiMS was established in the year 2004 and the founder chairman was Late Abdur Rashid Engineer. He was the Minister for Labour and Manpower of the Government of People's Republic of Bangladesh. BiMS vision is (to become the preferred destination for management education and professional certifications).",
  },
  {
    name: "Enermech Qatar",
    location: "Doha, Qatar",
    country: "Qatar",
    description:
      "Enermech Qatar LLC had been accredited to provide certification for Basic Rigger/ Slinger Operator and Rigging Supervisor according to the scheme requirements of Qatar Energy. EnerMech was founded in Aberdeen, UK, supporting the North Sea oil and gas business; currently Enermech expanded their business to provide operations from 9 offices in Americas, 4 offices in Africa, 6 offices in Asia, 13 offices in Australia and New Zealand, 6 offices in Europe, and 5 offices in Middle East.",
  },
  {
    name: "FATIMA HOPE & PSYCHOLOGICAL CENTER (SMC -PRIVATE) LIMITED",
    location: "Lahore, Pakistan",
    country: "Pakistan",
    description:
      "Fatima Hope and Psychological Centre is a sanctuary of healing, committed to nurturing mental well-being with empathy and expertise. We offer a safe, supportive space where individuals are encouraged to explore their inner world, cultivate resilience, and realize their fullest potential. Our compassionate team of professionals employs holistic, transformative therapies, guiding clients toward lasting growth, emotional balance, and a brighter future.",
  },
  {
    name: "Asian Polytechnic University",
    location: "Lewes, USA",
    country: "United States",
    description:
      "Asian Polytechnic University (APU) was established in 2019 as an online distance learning university in Delaware, USA, with the vision of providing everyone with access to a high-quality education to provide students with opportunities for postsecondary education that inspire them to thrive.",
  },
  {
    name: "American Learning Center",
    location: "Vienna, USA",
    country: "United States",
    description:
      "American Learning Center takes pride in providing continuously updated online courses that are carefully selected and developed to meet the needs of any business environment.",
    accreditation: {
      accreditedAs: "Training & Education Provider",
      number: "TP20801",
      scope: "Business, Management, Human Resources",
      expiry: "1 June 2026",
      status: "Accredited",
    },
  },
  {
    name: "Alsharq Academia",
    location: "Istanbul, Turkey",
    country: "Turkey",
    description:
      "Alsharq Academia is an online platform offering an eclectic range of academic courses that aim at disseminating knowledge from the social sciences and humanities, and is targeted at civil and political activists with a view to enhance informed action.",
  },
  {
    name: "Proficiency Global Services (PGS)",
    location: "Birmingham, UK",
    country: "United Kingdom",
    description:
      "PGS provides an independent assessment of laboratories' performance and compares their results to reference laboratories worldwide. PGS established its vision to provide the highest quality PT services to local, regional, and international customers. PGS offers PT services and Quality certification services in a wide scope of work.",
  },
  {
    name: "Spectrum",
    location: "Sfax, Tunisia",
    country: "Tunisia",
    description:
      "Spectrum of Knowledge Production and Skills Development is based in Sfax, Tunisia, and committed to developing in learners educational and professional ethics, critical thinking & problem solving skills. Their Goal is to provide Training, Education and development services nationally and internationally.",
  },
  {
    name: "Pak Academy of Laser – The Face",
    location: "Islamabad, Pakistan",
    country: "Pakistan",
    description:
      "PAK academy provides 6 months clinical guided training and assessment of students in Laser Dentistry to produce trainers who are proficient in the contemporary skills of all the domains of Laser dentistry and are competent to carry out individual research and continuing professional development.",
  },
  {
    name: "Delta University for Science & Technology",
    location: "Gamasa, Egypt",
    country: "Egypt",
    description:
      "Delta University for Science and is the first private university in the Egyptian Delta and Lower Egypt. It is a university that operates according to the national and international accreditation standards and currently includes nine faculties. The University seeks to prepare the graduates in different educational fields to be confident competitors in the labor markets in different national, and regional levels.",
    accreditation: {
      accreditedAs: "Testing Laboratory ISO/IEC 17025",
      number: "TL21501",
      scope: "Construction Material Testing",
      expiry: "30 March 2025",
      status: "Accredited",
    },
  },
  {
    name: "Reskills",
    location: "Selangor, Malaysia",
    country: "Malaysia",
    description:
      "ReSkills is a subscription-based online learning platform, that gives users access to unlimited daily live learning classes, videos, courses, conferences, and materials. “We are deeply honored to be one of the first providers in Malaysia to be certified by this esteemed program,” said ReSkills CEO Jin Tan.",
  },
];

const COUNTRIES = Array.from(new Set(ORGS.map((o) => o.country))).sort((a, b) =>
  a.localeCompare(b)
);

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Directory"
        title={<>Accredited <em>organizations.</em></>}
        intro="The public register of organizations holding AAA accreditation — universities, training providers, certification bodies, laboratories, and healthcare institutions worldwide."
        crumbs={[{ label: "Directory" }, { label: "Accredited Organizations" }]}
        meta={[
          { k: "Listed organizations", v: `${ORGS.length}` },
          { k: "Countries represented", v: `${COUNTRIES.length}` },
        ]}
      />
      <section className="block">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">The register</span>
              <h2 className="section-heading">
                {ORGS.length} listings across {COUNTRIES.length} countries.
              </h2>
            </div>
            <p className="lede-side">
              Grouped by country. Each entry reflects the organization as published in the AAA
              register, including accreditation details where recorded.
            </p>
          </div>

          {COUNTRIES.map((country, i) => {
            const orgs = ORGS.filter((o) => o.country === country);
            return (
              <div key={country} style={{ marginTop: i === 0 ? 0 : 56 }}>
                <span className="eyebrow">
                  {country} · {orgs.length}
                </span>
                <div className="dir-grid" style={{ marginTop: 20 }}>
                  {orgs.map((o) => (
                    <div className="dir-card reveal" key={`${o.name}-${o.location}`}>
                      <div className="name">{o.name}</div>
                      {o.description && <div className="scope">{o.description}</div>}
                      {o.accreditation && (
                        <div className="scope">
                          <strong>Accredited as:</strong> {o.accreditation.accreditedAs} ·{" "}
                          <strong>Accreditation No.</strong> {o.accreditation.number} ·{" "}
                          <strong>Scope:</strong> {o.accreditation.scope} ·{" "}
                          <strong>Expiry:</strong> {o.accreditation.expiry} ·{" "}
                          <strong>Status:</strong> {o.accreditation.status}
                        </div>
                      )}
                      <div className="tags">
                        <span className="std-pill light">{o.location}</span>
                        {o.accreditation && (
                          <span className="std-pill light">{o.accreditation.number}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
