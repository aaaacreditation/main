import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { COMMON_DOCS, DOC, crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import { PROGRAMS } from "@/lib/facts";

const PATH = PROGRAMS.iso17043.href;
const IMG = "/images/site/cab-17043";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Proficiency Testing Accreditation (ISO/IEC 17043)",
    description:
      "ISO/IEC 17043 accreditation for proficiency testing providers: independent recognition that your PT schemes are designed, operated and reported competently.",
    path: PATH,
    keywords: [
      "ISO/IEC 17043 accreditation",
      "proficiency testing provider accreditation",
      "interlaboratory comparison",
      "PT scheme accreditation",
      "ISO/IEC 17043:2023",
    ],
  });
}

const DATA: SchemeData = {
  slug: "iso17043",
  path: PATH,
  crumb: PROGRAMS.iso17043.shortLabel,
  hero: {
    standard: "ISO/IEC 17043:2023",
    title: PROGRAMS.iso17043.label,
    lead: "Demonstrate the competence, impartiality, and consistent operation of your proficiency testing program through accreditation against ISO/IEC 17043. AAA accreditation provides independent recognition that your organization designs, operates, evaluates, and reports proficiency testing schemes reliably and competently.",
    image: `${IMG}/proficiency-testing-laboratory-professio-b937be61.webp`,
    imageAlt: "Proficiency testing laboratory professionals reviewing samples and statistical results",
    caption: "Technical competence, reliable PT schemes, and meaningful performance evaluation.",
    stats: heroStats(),
  },
  suitability: {
    title: "Is ISO/IEC 17043 Accreditation Right for Your Organization?",
    paragraphs: [
      "ISO/IEC 17043 is the internationally recognized standard for organizations that provide proficiency testing and interlaboratory comparison schemes.",
      "Accreditation demonstrates that a proficiency testing provider has competent personnel, technical methods, statistical processes, quality controls, impartiality arrangements, and management systems needed to design and operate reliable proficiency testing programs.",
    ],
    label: "Suitable for providers operating schemes in",
    tiles: [
      { icon: "flask", title: "Chemical Testing" },
      { icon: "microscope", title: "Microbiological Testing" },
      { icon: "heart-pulse", title: "Medical Laboratory Testing" },
      { icon: "leaf", title: "Environmental Testing" },
      { icon: "store", title: "Food Testing" },
      { icon: "ruler", title: "Calibration & Measurement" },
      { icon: "building", title: "Construction Materials Testing" },
      { icon: "search", title: "Other Technical PT Programs" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17043 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Technical Competence",
        text: "Provide independent evidence that your organization has the technical expertise, statistical capability, personnel, and systems needed to operate reliable proficiency testing schemes.",
      },
      {
        icon: "shield-check",
        title: "Strengthen Confidence in PT Results",
        text: "Build confidence among participating laboratories, regulators, accreditation bodies, and other stakeholders that proficiency testing results are produced consistently and impartially.",
      },
      {
        icon: "trending-up",
        title: "Support Laboratory Performance Improvement",
        text: "Help participating laboratories identify technical weaknesses, investigate unsatisfactory performance, and improve the reliability of their testing or calibration activities.",
      },
      {
        icon: "clipboard-check",
        title: "Support Regulatory & Accreditation Requirements",
        text: "Provide proficiency testing services that can support laboratories in meeting external quality-assurance, regulatory, and accreditation requirements.",
      },
    ],
    captionTitle: "Performance Review in Practice",
    caption:
      "Proficiency testing combines technical expertise, statistical evaluation, and interlaboratory comparison to support reliable performance.",
  },
  areas: {
    intro:
      "AAA evaluates the management, technical, statistical, and operational controls needed to design and deliver reliable proficiency testing schemes.",
    tiles: [
      {
        icon: "building",
        title: "Organization & Management System",
        text: "Organizational responsibilities, governance, documented procedures, records, risk management, and continual improvement.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Qualifications, training, experience, authorization, and ongoing competence of technical, statistical, and administrative personnel.",
      },
      {
        icon: "puzzle",
        title: "PT Scheme Design",
        text: "Planning, development, validation, documentation, and maintenance of proficiency testing schemes.",
      },
      {
        icon: "flask",
        title: "Test Items & Sample Preparation",
        text: "Preparation, homogeneity, stability, handling, storage, packaging, and distribution of proficiency testing items.",
      },
      {
        icon: "chart",
        title: "Assigned Values & Statistical Methods",
        text: "Assigned values, uncertainty, statistical treatment, performance criteria, and participant scoring methods.",
      },
      {
        icon: "megaphone",
        title: "Participant Instructions & Communication",
        text: "Instructions, submission requirements, timelines, confidentiality, and communication of scheme information.",
      },
      {
        icon: "file-text",
        title: "Evaluation & Reporting",
        text: "Result evaluation, performance interpretation, report content, confidentiality, and technical conclusions.",
      },
      {
        icon: "refresh",
        title: "Complaints, Appeals & Improvement",
        text: "Complaints, appeals, nonconforming work, corrective actions, internal audits, management review, and continual improvement.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Application",
    steps: [
      {
        title: "Submit Your Application",
        text: "Define the proficiency testing schemes, technical fields, analytes, measurands, or activities for which accreditation is requested.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documentation, PT scheme procedures, statistical methods, personnel competence, sample preparation controls, and the proposed scope.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified assessors evaluate the organization against ISO/IEC 17043 requirements and the requested proficiency testing scope.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the provider submits corrective actions together with supporting evidence for review.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "Assessment results and supporting evidence are independently reviewed before the accreditation decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful proficiency testing providers receive an accreditation certificate and approved scope, valid for three years.",
      },
    ],
    application: {
      text: "Complete the application form to provide information about your organization, proficiency testing schemes, technical fields, personnel, locations, and proposed accreditation scope.",
      href: DOC.appPT,
      note: "Additional technical requirements and supporting information will be provided by the AAA accreditation team as applicable to your requested scope.",
    },
    resourcesTitle: "Supporting Documents",
    resources: [
      { label: "Checklist for ISO/IEC 17043", href: DOC.checklist17043, meta: "DOCX" },
      { label: "Proficiency Testing policy", href: DOC.ptPolicy, meta: "PDF" },
      ...COMMON_DOCS,
    ],
  },
  testimonial: {
    title: "Hear From an AAA-Accredited Proficiency Testing Provider",
    intro:
      "Discover how AAA accreditation has supported proficiency testing providers in strengthening technical credibility, improving confidence in scheme results, and supporting laboratory performance.",
    media: {
      kind: "video",
      id: "3nOuL937cA0",
      title: "ISO/IEC 17043 accredited proficiency testing provider testimonial",
    },
    story: {
      title: "Real Client Experience",
      text: "Hear directly from an AAA-accredited proficiency testing provider about its accreditation journey and the value of demonstrating competence against ISO/IEC 17043.",
    },
    highlights: [
      {
        icon: "badge-check",
        title: "Stronger Scheme Credibility",
        text: "Accreditation strengthens confidence in the design, operation, and evaluation of proficiency testing schemes.",
      },
      {
        icon: "users",
        title: "Greater Participant Confidence",
        text: "Independent accreditation reinforces trust among laboratories and other participants in PT results and performance evaluations.",
      },
      {
        icon: "globe",
        title: "Wider Market Recognition",
        text: "Accredited PT services support stronger recognition among laboratories, regulators, and accreditation stakeholders.",
      },
    ],
  },
  faq: {
    intro: "Common questions about ISO/IEC 17043 proficiency testing provider accreditation.",
    items: [
      {
        q: "What is ISO/IEC 17043?",
        a: "ISO/IEC 17043 specifies requirements for the competence, impartiality, and consistent operation of proficiency testing providers.",
      },
      {
        q: "What is proficiency testing?",
        a: "Proficiency testing is the evaluation of participant performance against pre-established criteria through interlaboratory comparisons or other appropriate comparison activities.",
      },
      {
        q: "Can a newly established proficiency testing provider apply?",
        a: "Yes. A newly established provider may apply once it has implemented its management system and can demonstrate technical competence, suitable scheme design, qualified personnel, reliable sample preparation, and effective statistical processes.",
      },
      {
        q: "What types of PT schemes can be accredited?",
        a: "Accreditation may cover schemes in testing, calibration, medical laboratory activities, microbiology, chemistry, environmental analysis, construction materials, food testing, and other technical fields.",
      },
      {
        q: "Are homogeneity and stability studies required?",
        a: "Where relevant, proficiency testing providers are expected to demonstrate that PT items are sufficiently homogeneous and stable for the intended scheme.",
      },
      {
        q: "Are statistical methods assessed?",
        a: "Yes. AAA evaluates the statistical design, assigned values, uncertainty, performance criteria, participant scoring, and interpretation methods used in proficiency testing schemes.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of applicable surveillance or reassessment activities.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your proficiency testing schemes and proposed accreditation scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17043 Accreditation?",
    text: "Take the next step toward independent recognition of your proficiency testing provider’s competence, impartiality, and reliable operation. Our team is ready to guide you through the accreditation process and help define the appropriate scope for your proficiency testing schemes.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor(PROGRAMS.iso17043.label, PATH)),
          serviceSchema({
            name: `${PROGRAMS.iso17043.label} (ISO/IEC 17043)`,
            description:
              "Accreditation of proficiency testing providers against ISO/IEC 17043, covering PT scheme design, test item preparation, assigned values and statistical methods, evaluation and reporting.",
            path: PATH,
            standard: "ISO/IEC 17043",
            audience: "Proficiency testing providers",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
