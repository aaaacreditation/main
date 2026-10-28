import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { COMMON_DOCS, DOC, crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import { PROGRAMS } from "@/lib/facts";

const PATH = PROGRAMS.iso15189.href;
const IMG = "/images/site/cab-15189";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Medical Laboratories Accreditation (ISO 15189)",
    description:
      "ISO 15189 accreditation for medical laboratories: independent recognition of the quality and competence behind accurate, reliable diagnostic services.",
    path: PATH,
    keywords: [
      "ISO 15189 accreditation",
      "medical laboratory accreditation",
      "ISO 15189:2022",
      "clinical laboratory quality",
      "point-of-care testing accreditation",
    ],
  });
}

const DATA: SchemeData = {
  slug: "iso15189",
  path: PATH,
  crumb: PROGRAMS.iso15189.shortLabel,
  hero: {
    standard: "ISO 15189:2022",
    title: PROGRAMS.iso15189.label,
    lead: "Demonstrate technical competence and confidence in your medical laboratory through ISO 15189 accreditation. AAA recognizes laboratories that consistently deliver accurate, reliable, and patient-focused diagnostic services while meeting international best practices.",
    image: `${IMG}/aaa-iso-15189-accredited-medical-laborat-0cfb8208.webp`,
    imageAlt: "AAA ISO 15189 accredited medical laboratory",
    caption: "Global Medical City team celebrating their ISO 15189 accreditation with AAA.",
    stats: heroStats(["Countries Served", "Assessors & Experts", "Accreditation Validity", "Recognition"], "Global"),
  },
  suitability: {
    title: "Is ISO 15189 Accreditation Right for Your Medical Laboratory?",
    paragraphs: [
      "ISO 15189 is the internationally recognized standard specifying requirements for quality and competence in medical laboratories. It is designed for laboratories that provide examination services used in the diagnosis, prevention, monitoring, and treatment of disease.",
      "Accreditation demonstrates that your laboratory has competent personnel, appropriate examination procedures, suitable equipment, effective quality controls, reliable reporting processes, and management systems necessary to provide consistent and clinically reliable results. ISO 15189:2022 also applies to point-of-care testing.",
    ],
    label: "Suitable for laboratories performing",
    tiles: [
      { icon: "flask", title: "Clinical Chemistry" },
      { icon: "heart-pulse", title: "Hematology" },
      { icon: "microscope", title: "Microbiology" },
      { icon: "shield", title: "Immunology & Serology" },
      { icon: "search-check", title: "Molecular Diagnostics" },
      { icon: "layers", title: "Histopathology & Cytology" },
      { icon: "activity", title: "Blood Transfusion / Immunohematology" },
      { icon: "plus", title: "Point-of-Care Testing" },
    ],
  },
  benefits: {
    title: "Why ISO 15189 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Medical Laboratory Competence",
        text: "Provide independent evidence that your laboratory has competent personnel, appropriate procedures, equipment, quality controls, and management systems necessary to produce reliable examination results.",
      },
      {
        icon: "stethoscope",
        title: "Strengthen Confidence in Patient Results",
        text: "Increase confidence among clinicians, patients, hospitals, regulators, and healthcare organizations that laboratory results are accurate, reliable, and suitable for clinical decision-making.",
      },
      {
        icon: "shield-check",
        title: "Support Patient Safety",
        text: "Strengthen controls throughout the examination process—from patient preparation and sample collection through examination, reporting, and interpretation—to reduce errors that may affect patient care.",
      },
      {
        icon: "hospital",
        title: "Support Regulatory & Healthcare Requirements",
        text: "Meet accreditation expectations established by healthcare systems, hospitals, regulators, procurement authorities, insurers, and other organizations that depend on reliable medical laboratory services.",
      },
    ],
    image: {
      src: `${IMG}/global-medical-city-medical-laboratory-t-818d486a.webp`,
      alt: "Global Medical City medical laboratory team with AAA recognition award",
      width: 2000,
      height: 1334,
    },
    captionTitle: "Accreditation in Practice",
    caption:
      "Independent accreditation recognizing quality, competence, and excellence in medical laboratory services.",
  },
  areas: {
    intro:
      "AAA evaluates the management, technical, quality, and patient-related controls needed to produce reliable medical laboratory results.",
    tiles: [
      {
        icon: "building",
        title: "Governance & Management System",
        text: "Organizational responsibilities, leadership, documented systems, quality objectives, risk management, records, and continual improvement.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Qualifications, training, experience, authorization, competency evaluation, and continued professional development.",
      },
      {
        icon: "clipboard",
        title: "Pre-Examination Processes",
        text: "Patient preparation, requests, specimen collection, identification, transportation, reception, handling, and acceptance criteria.",
      },
      {
        icon: "microscope",
        title: "Examination Methods & Validation",
        text: "Method selection, verification or validation, reference intervals, biological reference values, and technical implementation.",
      },
      {
        icon: "settings",
        title: "Equipment, Reagents & Consumables",
        text: "Equipment selection, calibration, maintenance, verification, reagents, consumables, inventory controls, and technical suitability.",
      },
      {
        icon: "chart",
        title: "Quality Assurance of Results",
        text: "Internal quality control, external quality assessment, proficiency testing, comparisons, and monitoring of examination performance.",
      },
      {
        icon: "file-text",
        title: "Post-Examination & Reporting",
        text: "Result review, authorization, reporting, critical-result communication, amended reports, interpretation, and retention of information.",
      },
      {
        icon: "shield-check",
        title: "Patient Safety, Risk & Improvement",
        text: "Nonconforming work, risk management, complaints, corrective actions, internal audits, quality indicators, and continual improvement.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Application",
    steps: [
      {
        title: "Submit Your Application",
        text: "Define the requested medical laboratory scope, including examination disciplines, methods, locations, and services.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documentation, procedures, personnel information, quality controls, examination methods, equipment arrangements, and the requested scope.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified technical assessors evaluate the laboratory against ISO 15189 requirements and the requested medical laboratory scope.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the laboratory submits corrective actions together with supporting evidence for review.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "Assessment findings and supporting evidence are independently reviewed before an accreditation decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful medical laboratories receive an accreditation certificate and approved scope, valid for three years.",
      },
    ],
    application: {
      text: "Complete the application form to provide information about your laboratory, medical examination disciplines, methods, locations, personnel, and proposed accreditation scope.",
      href: DOC.appMedical,
      note: "Additional technical requirements and supporting information will be provided by the AAA accreditation team as applicable to your requested scope.",
    },
    resourcesTitle: "Supporting Documents",
    resources: COMMON_DOCS,
  },
  testimonial: {
    title: "Hear From an AAA-Accredited Medical Laboratory",
    intro:
      "Discover how AAA accreditation has supported medical laboratories in strengthening technical competence, improving confidence in examination results, and reinforcing quality across patient-care services.",
    media: { kind: "video", id: "zpzh6QtLdSI", title: "Global Medical City testimonial" },
    story: {
      title: "Global Medical City · Egypt",
      text: "Learn how Global Medical City strengthened confidence in its laboratory services through ISO 15189 accreditation and why the team chose AAA as its accreditation partner.",
    },
    highlights: [
      {
        icon: "award",
        title: "Improved Laboratory Quality",
        text: "International accreditation strengthens confidence in laboratory quality management and technical competence.",
      },
      {
        icon: "heart-pulse",
        title: "Greater Patient Confidence",
        text: "Reliable laboratory services support clinicians and improve confidence in patient care.",
      },
      {
        icon: "globe",
        title: "International Recognition",
        text: "ISO 15189 accreditation demonstrates compliance with internationally recognized requirements for medical laboratories.",
      },
    ],
  },
  faq: {
    intro: "Common questions about ISO 15189 medical laboratory accreditation.",
    items: [
      {
        q: "What is ISO 15189?",
        a: "ISO 15189 specifies requirements for quality and competence in medical laboratories and is used to assess or recognize laboratory competence.",
      },
      {
        q: "What types of medical laboratories can apply?",
        a: "Medical laboratories operating in clinical chemistry, hematology, microbiology, immunology, molecular diagnostics, pathology, cytology, blood transfusion, and other diagnostic areas may apply.",
      },
      {
        q: "Does ISO 15189 apply to point-of-care testing?",
        a: "Yes. ISO 15189:2022 is also applicable to point-of-care testing.",
      },
      {
        q: "Can a newly established medical laboratory apply?",
        a: "Yes. A newly established laboratory may apply once it has implemented its management system and can demonstrate operational capability, competent personnel, effective examination procedures, equipment controls, and quality-assurance activities.",
      },
      {
        q: "Is proficiency testing required?",
        a: "Participation in proficiency testing, external quality assessment, or other suitable comparison activities may be required where relevant and available for the examinations included within the requested scope.",
      },
      {
        q: "Can multiple disciplines and locations be included?",
        a: "Yes. Multiple examination disciplines and laboratory locations may be included, subject to assessment of the activities, personnel, equipment, management controls, and services performed.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of applicable surveillance or reassessment activities.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your laboratory disciplines, examination services, locations, and proposed accreditation scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO 15189 Accreditation?",
    text: "Take the next step toward independent recognition of your medical laboratory’s quality and technical competence. Our team is ready to guide you through the accreditation process and help define the appropriate scope for your laboratory.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor(PROGRAMS.iso15189.label, PATH)),
          serviceSchema({
            name: `${PROGRAMS.iso15189.label} (ISO 15189)`,
            description:
              "Accreditation of medical laboratories against ISO 15189, covering governance, personnel competence, pre-examination, examination and post-examination processes, quality assurance and patient safety.",
            path: PATH,
            standard: "ISO 15189",
            audience: "Medical laboratories",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
