import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { COMMON_DOCS, DOC, POLICIES_LINK, crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";
import { PROGRAMS } from "@/lib/facts";

const PATH = PROGRAMS.iso17020.href;
const IMG = "/images/site/cab-inspection";

export const metadata = pageMeta({
  title: "Inspection Bodies Accreditation (ISO/IEC 17020)",
  description:
    "ISO/IEC 17020 accreditation for inspection bodies: independent recognition of the competence, impartiality and consistency behind reliable inspection results.",
  path: PATH,
  keywords: [
    "ISO/IEC 17020 accreditation",
    "inspection body accreditation",
    "third-party inspection",
    "lifting and pressure equipment inspection",
    "impartiality and independence",
  ],
});

const DATA: SchemeData = {
  slug: "inspection",
  path: PATH,
  crumb: PROGRAMS.iso17020.shortLabel,
  hero: {
    standard: "ISO/IEC 17020",
    title: PROGRAMS.iso17020.label,
    lead: "Demonstrate the competence, impartiality, and consistent operation of your inspection body through accreditation against ISO/IEC 17020. AAA accreditation provides independent recognition that your organization performs inspections professionally and delivers reliable conformity decisions.",
    image: `${IMG}/kpi-for-drilling-services-team-holding-a-4ae11f18.webp`,
    imageAlt: "KPI for Drilling Services team holding an AAA accreditation certificate",
    caption: "KPI for Drilling Services · AAA-Accredited Inspection Body",
    stats: heroStats(),
  },
  advisor: {
    intro: "Tell us about your inspection activities and requested scope.",
    field: "Inspection Activities",
    placeholder: "Describe your inspection sectors, equipment, installations and requested scope",
    sector: "Inspection body",
    source: "iso-17020-advisor",
  },
  suitability: {
    title: "Is ISO/IEC 17020 Accreditation Right for Your Inspection Body?",
    paragraphs: [
      "ISO/IEC 17020 is the internationally recognized standard for organizations performing inspection activities. Accreditation demonstrates that an inspection body has competent personnel, appropriate inspection methods, suitable equipment, impartiality controls, and management systems needed to perform inspections consistently and issue reliable inspection results.",
      "Whether your inspection body operates independently or forms part of a larger organization, accreditation provides independent confirmation of competence and strengthens confidence among customers, regulators, asset owners, and other stakeholders.",
    ],
    label: "Suitable for inspection bodies performing",
    tiles: [
      { icon: "factory", title: "Lifting Equipment Inspection" },
      { icon: "gauge", title: "Pressure Equipment Inspection" },
      { icon: "cpu", title: "Electrical Installation Inspection" },
      { icon: "building", title: "Construction & Building Inspection" },
      { icon: "settings", title: "Industrial Machinery Inspection" },
      { icon: "route", title: "Vehicle & Transport Inspection" },
      { icon: "activity", title: "Oil, Gas & Energy Inspection" },
      { icon: "search", title: "Other Technical Inspections" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17020 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Inspection Competence",
        text: "Provide independent evidence that your inspection body has qualified personnel, suitable methods, equipment, and technical controls required to perform inspections competently.",
      },
      {
        icon: "shield-check",
        title: "Strengthen Confidence in Inspection Results",
        text: "Build confidence among clients, regulators, asset owners, and other stakeholders that inspection activities and conformity decisions are reliable and consistently performed.",
      },
      {
        icon: "shield",
        title: "Support Safety & Risk Management",
        text: "Help identify defects, nonconformities, and unsafe conditions before they lead to failures, accidents, or operational disruption.",
      },
      {
        icon: "clipboard-check",
        title: "Support Regulatory & Market Requirements",
        text: "Meet accreditation expectations in regulated sectors, procurement processes, supply chains, and contracts where accredited inspection services are required or preferred.",
      },
    ],
    image: {
      src: `${IMG}/industrial-inspection-activity-47c61bc6.webp`,
      alt: "Industrial inspection activity",
      width: 1186,
      height: 667,
    },
    captionTitle: "Inspection in Action",
    caption: "Technical inspection supporting safety, competence, and reliable conformity decisions.",
  },
  areas: {
    intro:
      "AAA evaluates the organizational and technical controls needed to perform inspections competently, impartially, and consistently.",
    tiles: [
      {
        icon: "building",
        title: "Structure & Management",
        text: "Legal identity, organizational structure, responsibilities, documented systems, records, and management controls.",
      },
      {
        icon: "scale",
        title: "Impartiality & Independence",
        text: "Identification, evaluation, control, and monitoring of risks to impartiality, independence, and conflicts of interest.",
      },
      {
        icon: "user-check",
        title: "Inspector Competence",
        text: "Qualifications, technical experience, training, authorization, supervision, and continued competence of inspectors.",
      },
      {
        icon: "clipboard",
        title: "Inspection Methods & Procedures",
        text: "Inspection methods, instructions, acceptance criteria, and consistent application of technical requirements.",
      },
      {
        icon: "wrench",
        title: "Equipment & Resources",
        text: "Suitability, identification, maintenance, verification, calibration, and control of inspection equipment.",
      },
      {
        icon: "search-check",
        title: "Planning & Performance",
        text: "How inspections are planned, conducted, witnessed, reviewed, and completed within the approved scope.",
      },
      {
        icon: "file-text",
        title: "Inspection Records & Reports",
        text: "Records, reports, certificates, findings, conformity statements, traceability, and authorization of results.",
      },
      {
        icon: "refresh",
        title: "Complaints & Corrective Actions",
        text: "Handling of complaints, appeals, nonconforming work, corrective actions, and improvement opportunities.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Resources",
    steps: [
      {
        title: "Submit Your Application",
        text: "Define the proposed inspection scope, sectors, equipment, installations, processes, and activities.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documents, procedures, impartiality controls, personnel records, and the proposed scope.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified assessors evaluate compliance with ISO/IEC 17020 and the requested technical scope, including evidence of inspector competence.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the inspection body submits corrective actions and supporting evidence.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "The assessment results and evidence are independently reviewed before a decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful inspection bodies receive an accreditation certificate and approved scope, valid for three years.",
      },
    ],
    resourcesTitle: "Application Documents & Resources",
    resources: [
      { label: "Accreditation Application Form", href: DOC.appInspection, meta: "DOC" },
      { label: "ISO/IEC 17020 Accreditation Requirements", href: DOC.generalRequirements, meta: "PDF" },
      { label: "Inspection Body Assessment Checklist", href: DOC.checklist17020, meta: "DOCX" },
      { label: "Scope of Accreditation Template", href: "/documents", meta: "VIEW" },
      { label: "Impartiality & Independence Requirements", href: "/documents", meta: "VIEW" },
      { label: "Witness Assessment Guidance", href: "/documents", meta: "VIEW" },
      { label: "Accreditation Symbol Requirements", href: DOC.symbols, meta: "PDF" },
      COMMON_DOCS[2],
      POLICIES_LINK,
    ],
  },
  testimonial: {
    title: "Hear From an AAA-Accredited Inspection Body",
    intro:
      "Discover how AAA accreditation has helped inspection bodies strengthen technical competence, improve customer confidence, and expand into new markets.",
    media: {
      kind: "image",
      image: {
        src: `${IMG}/raouf-samy-beside-the-kpi-accreditation--d20b0122.webp`,
        alt: "Raouf Samy beside the KPI accreditation certificate",
        width: 1600,
        height: 1376,
      },
      caption: "KPI for Drilling Services · Oil & Gas Inspection Body · Egypt",
    },
    quote: {
      quote:
        "AAA accreditation has been a significant milestone in our company’s growth. It strengthened the competence of our inspection team, enhanced confidence in our services, and helped us expand into new opportunities within the oil and gas industry.",
      name: "Raouf Samy",
      lines: ["Managing Director", "KPI for Drilling Services · Egypt"],
    },
    highlights: [
      {
        icon: "trending-up",
        title: "Expanded Market Opportunities",
        text: "Accreditation helped open new opportunities within the oil and gas industry.",
      },
      {
        icon: "user-check",
        title: "Stronger Technical Competence",
        text: "The process reinforced team competence and consistency across inspection activities.",
      },
      {
        icon: "handshake",
        title: "Greater Customer Confidence",
        text: "Independent accreditation strengthened confidence in KPI’s inspection services.",
      },
    ],
  },
  faq: {
    intro: "Common questions about ISO/IEC 17020 inspection body accreditation.",
    items: [
      {
        q: "What is ISO/IEC 17020?",
        a: "ISO/IEC 17020 specifies requirements for the competence, impartiality, and consistent operation of bodies performing inspection.",
      },
      {
        q: "What inspection activities can be accredited?",
        a: "Accreditation may cover inspection of materials, products, installations, plants, processes, work procedures, services, equipment, and other items within the requested technical scope.",
      },
      {
        q: "What are the different types of inspection bodies?",
        a: "Inspection bodies may operate with different degrees of organizational independence. The applicable classification and impartiality controls depend on the body’s structure, relationships, and inspection activities.",
      },
      {
        q: "Can a newly established inspection body apply?",
        a: "Yes. A newly established inspection body may apply when it has implemented its management system and can demonstrate personnel competence, suitable methods, equipment, impartiality controls, and operational capability.",
      },
      {
        q: "Is witnessing of inspection activities required?",
        a: "Witnessing may form part of the assessment where needed to confirm inspector competence and effective implementation of inspection procedures.",
      },
      {
        q: "Can multiple inspection sectors or locations be included?",
        a: "Yes. Multiple sectors, activities, and locations may be included, subject to assessment of the personnel, equipment, procedures, and controls applicable to each.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of any applicable surveillance or reassessment activities.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your inspection activities, organizational arrangements, and proposed scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17020 Accreditation?",
    text: "Take the next step toward independent recognition of your inspection body’s competence, impartiality, and consistent operation. Our team is ready to guide you through the accreditation process and help define the appropriate inspection scope.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor(PROGRAMS.iso17020.label, PATH)),
          serviceSchema({
            name: `${PROGRAMS.iso17020.label} (ISO/IEC 17020)`,
            description:
              "Accreditation of inspection bodies against ISO/IEC 17020, covering structure and management, impartiality and independence, inspector competence, inspection methods, equipment and reporting.",
            path: PATH,
            standard: "ISO/IEC 17020",
            audience: "Inspection bodies",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
