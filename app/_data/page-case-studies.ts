/**
 * Case-study cards on the program pages (Nov 2026, client) — the bundled
 * snapshot.
 *
 * Like the home carousel, each program page has its own CaseStudy rows (the
 * client supplied page-specific wording, photos and figures), assigned to the
 * page with the "Show on program pages" ticks in the admin and linked to the
 * full case study at /case-studies/{slug}. This list seeds those rows and is
 * the fallback when the database is unreachable; once the database is live,
 * edit the cards in the admin, not here.
 *
 * Wording is verbatim from the pages it was moved off. `metric` holds the
 * figures as " · "-separated "VALUE Label" pairs (the TEPA cards show them as
 * a stat strip); on Healthcare cards it is the theme tag. `description` is the
 * card's supporting copy (Healthcare: the translation note). `quoteBy` is
 * "Name, Role".
 *
 * Client-safe: imported by the admin editor (a client component).
 */

export const PROGRAM_PAGES = [
  { key: "training-education", label: "Training & Education Providers", path: "/programs/training-education" },
  { key: "healthcare", label: "Healthcare Accreditation", path: "/programs/healthcare" },
  { key: "conformity-assessment-bodies", label: "Conformity Assessment Bodies", path: "/programs/conformity-assessment-bodies" },
] as const;

export type ProgramPageKey = (typeof PROGRAM_PAGES)[number]["key"];

export function isProgramPage(v: string): v is ProgramPageKey {
  return PROGRAM_PAGES.some((p) => p.key === v);
}

export type PageCaseStudySeed = {
  slug: string;
  name: string;
  sector: string;
  country: string;
  metric: string;
  quote: string;
  quoteBy: string;
  description: string;
  image: string;
  imageAlt: string;
  videoUrl: string | null;
  /** The full case study ("/case-studies/…"), or null for a card without one. */
  link: string | null;
  pages: ProgramPageKey[];
  order: number;
};

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const PAGE_CASE_STUDIES: PageCaseStudySeed[] = [
  /* ---------------------------------- Training & Education Providers */
  {
    slug: "monarch-master-injectors-tepa",
    name: "Monarch Master Injectors",
    sector: "Training & Education Provider",
    country: "Texas, United States",
    metric: "500+ Students Certified · +8–12% Enrollment Growth · 4.9/5 Average Learner Feedback · 7 New Courses Launched",
    quote:
      "AAA Accreditation has opened new doors for Monarch Master Injectors. We have established partnerships with renowned medical providers and clinics, expanded our reach to a wider market, and strengthened the confidence our students place in our programs.",
    quoteBy: "Brenda Rocha, CEO, Monarch Master Injectors",
    description: "",
    image: "/images/site/tepa/monarch-master-injectors.webp",
    imageAlt: "Monarch Master Injectors training session",
    videoUrl: null,
    link: "/case-studies/accreditation-impact-12-growth-500-students-certified",
    pages: ["training-education"],
    order: 0,
  },
  {
    slug: "landmark-management-partners-tepa",
    name: "Landmark Management Partners",
    sector: "Training & Education Provider",
    country: "Cairo, Egypt",
    metric: "9 Programs Accredited · 25% Client Growth · 2019 Established in the Market",
    quote: "",
    quoteBy: "",
    description:
      "Landmark Management Partners is featured by AAA as a training and education provider in Cairo and as a pioneer in pharmaceutical training. Watch the organization’s testimonial to hear directly about its experience with AAA accreditation.",
    image: "/programs/training-education/landmark-video.jpg",
    imageAlt: "Landmark Management Partners testimonial about AAA accreditation",
    videoUrl: yt("C193YkDYYVU"),
    link: "/case-studies/landmark-management-partner-story-of-success-and-innovation",
    pages: ["training-education"],
    order: 1,
  },

  /* ------------------------------------------------------- Healthcare */
  {
    slug: "global-medical-city-healthcare",
    name: "Global Medical City",
    sector: "Healthcare",
    country: "Egypt",
    metric: "Patient Safety & Trust",
    quote: "AAA accreditation helps ensure patient safety and supports patients in receiving the best possible medical care.",
    quoteBy: "",
    description: "Translated from Arabic",
    image: "/images/site/healthcare/testimonial-gmc.webp",
    imageAlt: "Global Medical City healthcare accreditation testimonial",
    videoUrl: yt("AZd-Wi2o5UI"),
    link: "/case-studies/global-medical-city-hospital-pioneering-excellence-in-egyptian-healthcare",
    pages: ["healthcare"],
    order: 0,
  },
  {
    slug: "domus-salutis-healthcare",
    name: "Domus Salutis",
    sector: "Healthcare",
    country: "Italy",
    metric: "Consistency & Quality",
    quote:
      "Accreditation means greater safety in procedures and protocols, and greater confidence that staff follow patients using consistent methods.",
    quoteBy: "",
    description: "Translated from Italian",
    image: "/images/site/healthcare/testimonial-domus.webp",
    imageAlt: "Domus Salutis healthcare accreditation testimonial",
    videoUrl: yt("SxgILo3vjGU"),
    link: "/case-studies/italys-healthcare-upgrade-domus-salutis-journey-to-aaa-accreditation",
    pages: ["healthcare"],
    order: 1,
  },
  {
    // No case study on the old site yet — the card plays its video only.
    slug: "dr-pauls-healthcare",
    name: "Dr. Paul’s",
    sector: "Healthcare",
    country: "India",
    metric: "Systems & Organizational Improvement",
    quote:
      "The accreditation journey has been a structured and valuable process that helped us strengthen our systems, documentation, patient safety practices and overall operational experience.",
    quoteBy: "",
    description: "",
    image: "/images/site/healthcare/testimonial-dr-paul.webp",
    imageAlt: "Dr. Paul’s healthcare accreditation testimonial",
    videoUrl: yt("zpzh6QtLdSI"),
    link: null,
    pages: ["healthcare"],
    order: 2,
  },

  /* ------------------------------------- Conformity Assessment Bodies */
  {
    slug: "lazarus-alliance-cab",
    name: "Lazarus Alliance",
    sector: "Certification Body",
    country: "Arizona, United States",
    metric: "",
    quote:
      "The AAA team is very technically precise, with strong subject-matter expertise and great collaboration. I do not hesitate to endorse AAA to prospective customers.",
    quoteBy: "Michael Peters, CEO, Lazarus Alliance",
    description: "",
    image: "/images/site/cab-hub/michael-peters-ceo-of-lazarus-alliance-s-7faa5977.webp",
    imageAlt: "Michael Peters, CEO of Lazarus Alliance, speaking about the AAA accreditation experience",
    videoUrl: yt("GPGwbCsk7CY"),
    link: "/case-studies/lazarus-alliance-accredited-cybersecurity-leadership",
    pages: ["conformity-assessment-bodies"],
    order: 0,
  },
  {
    slug: "kcertification-cab",
    name: "KCertification",
    sector: "Certification Body",
    country: "São Paulo, Brazil",
    metric: "",
    quote:
      "We began the process seeking a reliable partner to accredit our services, and from start to finish, everything was handled with professionalism.",
    quoteBy: "Christiano Baros, CEO, KCertification",
    description: "",
    image: "/images/site/cab-hub/christiano-baros-of-kcertification-holdi-977c68f7.webp",
    imageAlt: "Christiano Baros of KCertification holding an AAA accreditation certificate",
    videoUrl: null,
    link: "/case-studies/from-iso-alignment-to-international-trust",
    pages: ["conformity-assessment-bodies"],
    order: 1,
  },
];
