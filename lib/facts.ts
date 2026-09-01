/**
 * Canonical AAA facts — the single source of truth.
 *
 * Why this file exists: an Aug 2026 audit found the site stating NINE different
 * values for "countries served" (30, 35, 40+, 53+, 57, 58, 60, 60+, 70) — three
 * of them on one page. Beyond looking careless, contradictory numbers are the
 * single biggest blocker to being cited by AI answer engines: a model that
 * cannot resolve a fact will not repeat it.
 *
 * The canonical figures below are taken from the two most recent
 * client-approved pages (/programs/iso-17021, Aug 2026, and
 * /programs/smes-accreditation-program, July 2026), which both say 58.
 *
 * Import these instead of hardcoding. If the client updates a number, it
 * changes here and everywhere at once.
 */

export const FACTS = {
  /** Countries in which AAA-accredited organizations operate. */
  countries: 58,
  countriesLabel: "58 countries",
  countriesPlus: "58+",

  /** Organizations holding a live AAA accreditation. */
  organizations: "200+",
  organizationsLabel: "200+ accredited organizations",

  /** Assessors and technical experts on the AAA panel. */
  assessors: "100+",
  assessorsLabel: "100+ assessors & experts",

  /** AAA's healthcare standards are assessed by ISQua's External Evaluation Association. */
  recognition: "ISQua EEA assessed",

  /** Accreditation cycle. */
  cycleYears: 3,
  cycleLabel: "3-year accreditation cycle",
  surveillanceLabel: "Annual surveillance",
} as const;

export const CONTACT = {
  email: "info@aaa-accreditation.org",
  phone: "+1 (571) 601 2616",
  phoneHref: "tel:+15716012616",
  whatsapp: "+44 (748) 755 0737",
  whatsappHref: "https://wa.me/447487550737",
  street: "8609 Westwood Center Drive",
  city: "Tysons Corner",
  region: "VA",
  postalCode: "22182",
  country: "USA",
  addressLine: "8609 Westwood Center Drive, Tysons Corner, VA 22182, USA",
  consultationUrl: "https://calendly.com/aaa-accreditation4/30min",
} as const;

/**
 * Official AAA social profiles, taken from the live site (Aug 2026). The
 * rebuild previously rendered every social icon as `href="#"`, which is both a
 * dead link and a missed `sameAs` signal for search engines and AI answer
 * engines trying to confirm the organisation's identity.
 */
export const SOCIAL = [
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/aaa-accreditation/" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/AAA.Accreditations/" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/aaa.accreditations/" },
  { name: "X (Twitter)", icon: "twitter", href: "https://twitter.com/AAAccreditation" },
] as const;

/**
 * Program names, in the client's approved wording.
 *
 * `iso17021` was renamed from "System Certification Bodies" to
 * "Management Systems Certification Bodies Accreditation" (Aug 2026) — use
 * `PROGRAMS.iso17021.label` rather than writing the old name anywhere.
 */
export const PROGRAMS = {
  healthcare: {
    href: "/programs/healthcare",
    label: "Healthcare Accreditation",
    standard: "ISQua EEA Recognized",
  },
  cab: {
    href: "/programs/conformity-assessment-bodies",
    label: "Conformity Assessment Bodies Accreditation",
    standard: "7 Programs",
  },
  training: {
    href: "/programs/training-education",
    label: "Training & Education Providers Accreditation",
    standard: "Worldwide",
  },
  sme: {
    href: "/programs/smes-accreditation-program",
    label: "SMEs Accreditation Program",
    standard: "Funding-Ready in 30 Days",
  },
  school: {
    href: "/programs/school-accreditation",
    label: "School Accreditation",
    standard: "K–12 institutions",
  },
  iso17021: {
    href: "/programs/iso-17021",
    label: "Management Systems Certification Bodies Accreditation",
    shortLabel: "Management Systems Certification Bodies",
    standard: "ISO/IEC 17021-1",
  },
  iso17020: {
    href: "/programs/iso-17020",
    label: "Inspection Bodies Accreditation",
    shortLabel: "Inspection Bodies",
    standard: "ISO/IEC 17020",
  },
  iso17024: {
    href: "/programs/iso-17024",
    label: "Personnel Certification Bodies Accreditation",
    shortLabel: "Personnel Certification Bodies",
    standard: "ISO/IEC 17024",
  },
  iso17025: {
    href: "/programs/iso-17025",
    label: "Testing & Calibration Laboratories Accreditation",
    shortLabel: "Testing & Calibration Laboratories",
    standard: "ISO/IEC 17025",
  },
  iso15189: {
    href: "/programs/iso-15189",
    label: "Medical Laboratories Accreditation",
    shortLabel: "Medical Laboratories",
    standard: "ISO 15189",
  },
  iso17065: {
    href: "/programs/iso-17065",
    label: "Product Certification Bodies Accreditation",
    shortLabel: "Product Certification Bodies",
    standard: "ISO/IEC 17065",
  },
  iso17043: {
    href: "/programs/iso-17043",
    label: "Proficiency Testing Providers Accreditation",
    shortLabel: "Proficiency Testing Providers",
    standard: "ISO/IEC 17043",
  },
  astm: {
    href: "/programs/astm-e2659",
    label: "Certificate Programs Accreditation",
    shortLabel: "Certificate Programs",
    standard: "ASTM E2659",
  },
} as const;

/** The eight conformity-assessment schemes, in the order the hub lists them. */
export const CAB_SCHEMES = [
  PROGRAMS.iso17021,
  PROGRAMS.iso17065,
  PROGRAMS.iso17024,
  PROGRAMS.iso17020,
  PROGRAMS.iso17025,
  PROGRAMS.iso15189,
  PROGRAMS.iso17043,
  PROGRAMS.astm,
] as const;
