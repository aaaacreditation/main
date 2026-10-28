import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";

const PATH = "/programs/testing-laboratories";
const IMG = "/images/site/cab-testing-labs";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Testing Laboratories Accreditation (ISO/IEC 17025)",
    description:
      "ISO/IEC 17025 accreditation for testing laboratories: independent recognition that your laboratory operates competently and produces valid, reliable results.",
    path: PATH,
    keywords: [
      "ISO/IEC 17025 accreditation",
      "testing laboratory accreditation",
      "laboratory competence",
      "accredited test results",
      "chemical and microbiological testing",
    ],
  });
}

const DATA: SchemeData = {
  slug: "testing-labs",
  path: PATH,
  crumb: "Testing Laboratories",
  hero: {
    standard: "ISO/IEC 17025",
    title: "Testing Laboratories Accreditation",
    lead: "Demonstrate your laboratory's technical competence through accreditation against ISO/IEC 17025, the internationally recognized standard for testing laboratories. AAA accreditation provides independent recognition that your laboratory operates competently, consistently, and produces valid, reliable test results.",
    image: `${IMG}/aaa-accredited-laboratory-representative-9e9535aa.jpg`,
    imageAlt: "AAA-accredited laboratory representatives",
    caption: "AAA-Accredited Laboratory Recognition",
    stats: heroStats(),
  },
  advisor: {
    intro: "Tell us about your laboratory and requested testing scope.",
    field: "Testing Activities",
    placeholder: "Describe your testing activities and requested scope",
    sector: "Testing laboratory",
    source: "iso-17025-testing-advisor",
  },
  suitability: {
    title: "Is ISO/IEC 17025 Accreditation Right for Your Laboratory?",
    paragraphs: [
      "ISO/IEC 17025 is the internationally recognized standard for laboratories performing testing activities. Accreditation demonstrates that a laboratory has the technical competence, qualified personnel, appropriate equipment, and effective management systems needed to produce technically valid and reliable test results.",
      "Whether your laboratory operates independently or as part of a manufacturing company, government authority, university, research institution, or private organization, ISO/IEC 17025 accreditation provides independent confirmation of competence and helps build confidence among customers, regulators, and other stakeholders.",
    ],
    label: "Suitable for laboratories performing",
    tiles: [
      { icon: "flask", title: "Chemical Testing" },
      { icon: "microscope", title: "Microbiological Testing" },
      { icon: "leaf", title: "Food Testing" },
      { icon: "globe", title: "Water & Environmental Testing" },
      { icon: "cpu", title: "Electrical & Electronic Testing" },
      { icon: "building", title: "Construction Materials Testing" },
      { icon: "settings", title: "Mechanical Testing" },
      { icon: "search", title: "Other Testing Activities" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17025 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Technical Competence",
        text: "Provide independent evidence that your laboratory has the personnel, equipment, and management systems necessary to produce technically valid and reliable testing results.",
      },
      {
        icon: "shield-check",
        title: "Build Confidence in Laboratory Results",
        text: "Increase confidence among customers, regulators, government authorities, and other stakeholders by demonstrating that testing activities are performed competently and consistently.",
      },
      {
        icon: "clipboard-check",
        title: "Support Regulatory & Customer Requirements",
        text: "Meet accreditation requirements specified by regulators, procurement authorities, industry sectors, and customers that require independent recognition of laboratory competence.",
      },
      {
        icon: "trending-up",
        title: "Strengthen Market Opportunities",
        text: "Differentiate your laboratory from competitors, enhance your professional reputation, and create new opportunities in local and international markets.",
      },
    ],
    image: { src: `${IMG}/laboratory-visit-1bebaa46.jpg`, alt: "Laboratory visit", width: 1600, height: 833 },
    caption: "Supporting technical competence and confidence in laboratory results.",
    secondImage: {
      src: `${IMG}/laboratory-assessment-visit.jpg`,
      alt: "Laboratory specialist walking an AAA assessor through testing equipment",
      width: 1600,
      height: 813,
    },
  },
  areas: {
    intro: "AAA evaluates the laboratory systems and technical controls needed to produce valid and reliable results.",
    tiles: [
      {
        icon: "building",
        title: "Laboratory Management System",
        text: "Evaluation of the laboratory's management system, documented procedures, responsibilities, risk management, and continual improvement activities.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Assessment of personnel qualifications, technical competence, training, authorization, and ongoing competency monitoring.",
      },
      {
        icon: "clipboard",
        title: "Test Methods & Method Validation",
        text: "Review of testing methods, method selection, validation or verification activities, and technical implementation.",
      },
      {
        icon: "wrench",
        title: "Equipment & Measurement Traceability",
        text: "Assessment of equipment suitability, calibration, maintenance, reference standards, and measurement traceability.",
      },
      {
        icon: "chart",
        title: "Quality Assurance of Results",
        text: "Evaluation of activities performed to monitor and assure the validity, consistency, and reliability of laboratory results.",
      },
      {
        icon: "thermometer",
        title: "Facilities & Environmental Conditions",
        text: "Assessment of laboratory facilities, environmental conditions, and supporting infrastructure necessary to achieve valid testing results.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Resources",
    steps: [
      {
        title: "Submit Your Application",
        text: "Complete the application form and define the requested scope of accreditation.",
      },
      {
        title: "Document Review",
        text: "AAA reviews your management system documentation and supporting information to determine readiness for assessment.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified technical assessors evaluate your laboratory against ISO/IEC 17025 requirements and the requested scope.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the laboratory submits corrective actions and supporting evidence for review.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "Assessment results are reviewed independently before an accreditation decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful laboratories receive an accreditation certificate and approved scope, valid for three years.",
      },
    ],
  },
  testimonial: {
    title: "Hear From an AAA-Accredited Laboratory",
    intro:
      "Discover how AAA accreditation has supported accredited laboratories in strengthening technical confidence, professional recognition, and organizational development.",
    media: { kind: "video", id: "wFqT1485Nsw", title: "CMRDI laboratory testimonial" },
    quote: {
      quote:
        "AAA accreditation supports laboratories in strengthening technical confidence, professional recognition, and trust among stakeholders.",
      name: "CMRDI",
      lines: ["AAA-Accredited Laboratory · Egypt"],
    },
    second: {
      image: { src: `${IMG}/delta-university-testimonial-5373c411.jpg`, alt: "Delta University testimonial", width: 960, height: 960 },
      quote: {
        quote:
          "Working with AAA and achieving accreditation strengthened our position in the local market, broadened our experience, and increased confidence between Delta University and its stakeholders.",
        name: "Dr. Khaled Abouelhasan",
        lines: ["Delta University · Egypt"],
      },
    },
  },
  faq: {
    intro: "Common questions about ISO/IEC 17025 testing laboratory accreditation.",
    items: [
      {
        q: "What is ISO/IEC 17025?",
        a: "ISO/IEC 17025 is the internationally recognized standard specifying the general requirements for the competence of testing and calibration laboratories.",
      },
      {
        q: "Can newly established laboratories apply?",
        a: "Yes. Laboratories may apply provided they have implemented their management system and can demonstrate compliance with the applicable accreditation requirements.",
      },
      {
        q: "Is participation in proficiency testing required?",
        a: "Participation in proficiency testing or other appropriate quality assurance activities may be required where relevant to the laboratory's scope of accreditation.",
      },
      {
        q: "Can laboratories with multiple locations apply?",
        a: "Yes. Laboratories operating from multiple locations may apply, subject to assessment of the applicable locations and activities included within the requested scope.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and successful completion of any required surveillance or reassessment activities.",
      },
      {
        q: "How is the accreditation scope determined?",
        a: "The accredited scope is defined according to the laboratory's testing activities and is confirmed through the accreditation assessment process.",
      },
      {
        q: "How are accreditation fees calculated?",
        a: "Fees depend on the requested scope, number of laboratory locations, complexity of activities, and assessment requirements. A tailored quotation is provided after review of the application.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your laboratory's activities and accreditation requirements.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17025 Accreditation?",
    text: "Take the next step toward internationally recognized laboratory accreditation. Our team is ready to guide you through the accreditation process and help define the appropriate scope for your laboratory.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor("Testing Laboratories Accreditation", PATH)),
          serviceSchema({
            name: "Testing Laboratories Accreditation (ISO/IEC 17025)",
            description:
              "Accreditation of testing laboratories against ISO/IEC 17025, covering management systems, personnel competence, test methods, equipment and traceability, and quality assurance of results.",
            path: PATH,
            standard: "ISO/IEC 17025",
            audience: "Testing laboratories",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
