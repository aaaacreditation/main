// Accredited-organization case studies, transcribed from the client's
// "Website final Changes 3" document (July 2026). Quotes, sectors and locations
// are the organizations' own words as supplied — do not paraphrase them.
// Certificates and logos live in /public/case-studies and come from the same file.

export type CaseStudy = {
  /** Organization name, as written by the client. */
  name: string;
  /** Sector column from the source document. */
  sector: string;
  /** Location column from the source document. */
  country: string;
  /** Short gold kicker above the org name on the story card. */
  metric: string;
  /** The organization's testimonial, verbatim. */
  quote: string;
  /** Certificate / award photo. */
  img: string;
  /** Organization logo, where one was supplied. */
  logo?: string;
  /** Extra impact detail, only where the source document provided figures. */
  desc?: string;
  /** Initials fallback for surfaces that show an avatar rather than a logo. */
  initials: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Cinute Digital",
    sector: "Information Technology",
    country: "Mira Bhayandar, India",
    metric: "AAA Accredited Organization",
    quote:
      "AAA's global recognition has opened more doors with corporate clients, and institutional partners.",
    img: "/case-studies/cinute-digital-certificate.jpg",
    logo: "/case-studies/cinute-digital-logo.jpg",
    initials: "CD",
  },
  {
    name: "Priority Global",
    sector: "Training & Education",
    country: "Ghaziabad, India",
    metric: "AAA Accredited Organization",
    quote:
      "The impact of accreditation has been remarkable. It has helped us attract more learners, expand our client base, and demonstrate our commitment to delivering high-quality education and training.",
    img: "/case-studies/priority-global-certificate.png",
    logo: "/case-studies/priority-global-logo.png",
    initials: "PG",
  },
  {
    name: "IIBMS",
    sector: "Business Management",
    country: "Mumbai, India",
    metric: "AAA Accredited Organization",
    quote:
      "Since achieving AAA accreditation, we have seen a noticeable improvement. Accreditation has strengthened our credibility and market reputation.",
    img: "/case-studies/iibms-certificate.jpg",
    logo: "/case-studies/iibms-logo.jpg",
    initials: "IB",
  },
  {
    name: "Clinoxy Solutions",
    sector: "Medical Devices",
    country: "Hyderabad, India",
    metric: "AAA Accredited Organization",
    quote:
      "The accreditation process has added real value to our organization, improving market credibility, increasing customer confidence, and supporting our mission to deliver high-quality healthcare solutions.",
    img: "/case-studies/clinoxy-solutions-certificate.png",
    logo: "/case-studies/clinoxy-solutions-logo.png",
    initials: "CS",
  },
  {
    name: "RC Growth Consultancies",
    sector: "Consultation",
    country: "Lucknow, India",
    metric: "AAA Accredited Organization",
    quote:
      "The value of accreditation extends far beyond recognition. It has helped our consultancy differentiate itself in the market while reinforcing a culture of quality and continual improvement.",
    img: "/case-studies/rc-growth-consultancies-certificate.jpg",
    logo: "/case-studies/rc-growth-consultancies-logo.png",
    initials: "RC",
  },
  {
    name: "Study Medic",
    sector: "Medical Education",
    country: "Qatar, India",
    metric: "AAA Accredited Organization",
    quote:
      "I recommend the American Accreditation Association to any institution committed to upholding the highest standards of education.",
    img: "/case-studies/study-medic-certificate.png",
    logo: "/case-studies/study-medic-logo.png",
    initials: "SM",
  },
  {
    name: "Aldelma Trading",
    sector: "Trading",
    country: "Jordan, Iraq",
    metric: "AAA Accredited Organization",
    quote:
      "Our main strategic benefits from accreditation are: we gained preferred vendor status with government entities and attracted multinational corporate clients.",
    img: "/case-studies/aldelma-trading-certificate.jpg",
    logo: "/case-studies/aldelma-trading-logo.jpg",
    initials: "AT",
  },
  {
    name: "Clarivate",
    sector: "Information Services",
    country: "India, USA, UK",
    metric: "AAA Accredited Organization",
    quote:
      "Our experience with AAA was excellent. The accreditation process was professional, well-structured, and conducted with integrity, providing valuable insights that strengthened our organization.",
    img: "/case-studies/clarivate-certificate.jpg",
    logo: "/case-studies/clarivate-logo.jpg",
    initials: "CL",
  },
  {
    name: "Domus Salutis",
    sector: "Healthcare",
    country: "Italy",
    metric: "AAA Accredited Organization",
    quote:
      "By working with the AAA, Domus Salutis has established a roadmap for ongoing growth in safety and medical technology.",
    img: "/case-studies/domus-salutis-certificate.jpg",
    logo: "/case-studies/domus-salutis-logo.jpg",
    initials: "DS",
  },
  {
    name: "Monarch Master Injectors",
    sector: "Medical Training",
    country: "United States",
    metric: "12% growth · 500+ certified",
    quote:
      "Accreditation impact: 12% growth and 500+ students certified, with Google reviews now past 1,500 at a 5.0 rating.",
    img: "/case-studies/monarch-master-injectors-certificate.jpg",
    logo: "/case-studies/monarch-master-injectors-logo.png",
    initials: "MM",
  },
];
