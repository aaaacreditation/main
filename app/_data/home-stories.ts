import type { SuccessStory } from "../_components/home/SuccessCarousel";

/**
 * Home-page Success Stories — the bundled snapshot.
 *
 * Since Oct 27 2026 the carousel reads the CaseStudy table (admin → Case
 * Studies, rows with "Show on home"); this list seeds that table and is the
 * fallback when the database is unreachable. Edit stories in the admin, not
 * here, once the database is live.
 */
const STORY_URL =
  "https://casestudies-alpha.vercel.app/case-studies/accreditation-impact-12-growth-500-students-certified";

/* ------------------------------------------------- 04 · Success stories */
// Oct 2026: the client's "success stories home page" document — twelve
// organizations, in the document's order. Testimonials are verbatim (spelling
// fixed only), except Monarch's, which the document gave as a note ("12% Growth
// & 500+ students certified and The google reviews become 1500+(5.0⭐)") and is
// set as a sentence here. Rows supplied with a YouTube video show the video thumbnail
// and link to it; the rest show the certificate photo and link to the case
// studies site. Assets live in /public/case-studies.
const CS = "/case-studies";
export const HOME_STORIES: SuccessStory[] = [
  {
    featured: true,
    name: "Monarch Master Injector",
    sector: "Healthcare",
    country: "USA",
    metric: "12% Growth · 500+ Students Certified",
    quote:
      "Accreditation impact: 12% growth and 500+ students certified, and Google reviews have grown to 1,500+ (5.0 ★).",
    img: `${CS}/monarch-master-injectors-certificate.jpg`,
    alt: "Monarch Master Injectors graduates holding their certificates",
    // Portrait photo in a wide frame: shift the crop up so faces and certificates both show.
    imgPosition: "center 35%",
    logo: `${CS}/monarch-master-injectors-logo.png`,
    href: STORY_URL,
  },
  {
    name: "Cinute Digital",
    sector: "Information Technology",
    country: "India",
    quote: "AAA’s global recognition has opened more doors with corporate clients, learners, and institutional partners.",
    img: `${CS}/cinute-digital-video.jpg`,
    alt: "Cinute Digital team with their AAA accreditation certificate",
    logo: `${CS}/cinute-digital-logo.jpg`,
    video: "https://www.youtube.com/watch?v=JN5Z7seQiFY",
  },
  {
    name: "Aldelma Training Center",
    sector: "Training Center",
    country: "Jordan, Iraq",
    quote:
      "Our main strategic benefits from accreditation are: we gained preferred vendor status with government entities and attracted multinational corporate clients.",
    img: `${CS}/aldelma-trading-certificate.jpg`,
    alt: "Aldelma Training Center representative holding the AAA accreditation certificate",
    logo: `${CS}/aldelma-trading-logo.jpg`,
  },
  {
    name: "Dr. Paul Clinic",
    sector: "Healthcare",
    country: "India",
    quote:
      "AAA accreditation has strengthened our patients’ trust, demonstrated our commitment to quality care, and supported our clinic’s growth.",
    img: `${CS}/dr-paul-clinic-certificate.jpg`,
    alt: "Dr. Paul’s clinic team receiving the AAA accreditation award",
    logo: `${CS}/dr-paul-clinic-logo.jpg`,
  },
  {
    name: "IIBMS",
    sector: "Training Center",
    country: "India",
    quote:
      "Since achieving AAA accreditation, we have seen a noticeable improvement. Accreditation has strengthened our credibility and market reputation.",
    img: `${CS}/iibms-certificate.jpg`,
    alt: "IIBMS team with the AAA accreditation certificate",
    logo: `${CS}/iibms-logo.jpg`,
  },
  {
    name: "Domus Salutis",
    sector: "Healthcare",
    country: "Italy",
    quote: "By working with the AAA, Domus Salutis has established a roadmap for ongoing growth in safety and medical technology.",
    img: `${CS}/domus-salutis-video.jpg`,
    alt: "Domus Salutis clinical team with the AAA accreditation plaque",
    logo: `${CS}/domus-salutis-logo.jpg`,
    video: "https://www.youtube.com/watch?v=SxgILo3vjGU",
  },
  {
    name: "Clarivate",
    sector: "Information Services",
    country: "USA, UK",
    quote:
      "Our experience with AAA was excellent. The accreditation process was professional, well-structured, and conducted with integrity, providing valuable insights that strengthened our organization.",
    img: `${CS}/clarivate-certificate.jpg`,
    alt: "Clarivate team receiving the AAA accreditation certificate",
    logo: `${CS}/clarivate-logo.jpg`,
  },
  {
    name: "QML",
    sector: "Certification Body",
    country: "Spain",
    quote:
      "AAA’s accreditation process was professional and smooth, providing valuable learning opportunities that helped us strengthen our certification practices.",
    img: `${CS}/qml-certificate.jpg`,
    alt: "QML representatives holding the AAA accreditation certificate",
    logo: `${CS}/qml-logo.png`,
  },
  {
    name: "RC Growth Consultancies",
    sector: "Consultation",
    country: "India",
    quote:
      "The value of accreditation extends far beyond recognition. It has helped our consultancy differentiate itself in the market while reinforcing a culture of quality and continual improvement.",
    img: `${CS}/rc-growth-consultancies-certificate.jpg`,
    alt: "RC Growth Consultancies founder holding the AAA accreditation certificate",
    logo: `${CS}/rc-growth-consultancies-logo-trimmed.png`,
    logoTight: true,
  },
  {
    name: "Namaa Academy",
    sector: "Academy",
    country: "Morocco",
    quote:
      "AAA’s accreditation recognises Namaa Academy’s commitment to quality education and strengthens our credibility as an ambitious academic institution.",
    img: `${CS}/namaa-academy-video.jpg`,
    alt: "Namaa Academy team receiving the AAA accreditation certificate",
    logo: `${CS}/namaa-academy-logo-trimmed.png`,
    logoTight: true,
    video: "https://www.youtube.com/watch?v=9Pluh1W5we8",
  },
  {
    name: "Global Medical City",
    sector: "Healthcare",
    country: "Egypt",
    quote:
      "Achieving AAA accreditation was a pivotal moment for us. It affirmed our dedication to providing world-class healthcare services and set a new benchmark for quality in Egypt.",
    img: `${CS}/global-medical-city-video.jpg`,
    alt: "Global Medical City team with the AAA accreditation award",
    logo: `${CS}/global-medical-city-logo-trimmed.png`,
    logoTight: true,
    video: "https://www.youtube.com/watch?v=zpzh6QtLdSI",
  },
  {
    name: "Clinoxy Solutions",
    sector: "Medical Devices",
    country: "India",
    quote:
      "The accreditation process has added real value to our organization, improving market credibility, increasing customer confidence, and supporting our mission to deliver high-quality healthcare solutions.",
    img: `${CS}/clinoxy-solutions-certificate.png`,
    alt: "Clinoxy Solutions director beside the AAA accreditation certificate",
    logo: `${CS}/clinoxy-solutions-logo.png`,
  },
];
