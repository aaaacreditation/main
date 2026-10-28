import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { COMMON_DOCS, DOC, crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import { PROGRAMS } from "@/lib/facts";

/*
 * Oct 2026: rebuilt on the shared scheme component. The previous bespoke page
 * (client-frozen cb.css + AdvisorForm.tsx in this folder) is no longer
 * imported here; those files are intentionally left in place untouched.
 */

const PATH = PROGRAMS.iso17021.href;
const IMG = "/images/site/cab-17021";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: PROGRAMS.iso17021.label,
    description:
      "ISO/IEC 17021-1 accreditation for management systems certification bodies: independent recognition of impartial audits and reliable certification decisions.",
    path: PATH,
    keywords: [
      "ISO/IEC 17021-1 accreditation",
      PROGRAMS.iso17021.label,
      "certification body accreditation",
      "ISO 9001 certification body",
      "ISO/IEC 27001 certification body",
    ],
  });
}

const DATA: SchemeData = {
  slug: "iso17021",
  path: PATH,
  crumb: PROGRAMS.iso17021.shortLabel,
  hero: {
    standard: PROGRAMS.iso17021.standard,
    title: PROGRAMS.iso17021.label,
    lead: "Demonstrate the competence, impartiality, and consistent operation of your certification body through accreditation against ISO/IEC 17021-1. AAA accreditation provides independent recognition that your organization conducts management-system audits and certification activities professionally, consistently, and with reliable certification decisions.",
    image: `${IMG}/qml-representatives-holding-an-aaa-accre-416d3d2d.webp`,
    imageAlt: "QML representatives holding an AAA accreditation certificate",
    caption: "QML · AAA-Accredited Management Systems Certification Body · Spain",
    stats: heroStats(),
  },
  advisor: {
    intro: "Tell us about your certification schemes, technical sectors, and requested scope.",
    field: "Certification Schemes",
    placeholder: "Describe the standards, technical sectors, offices, and requested accreditation scope",
    sector: "Management systems certification body",
    source: "iso-17021-advisor",
  },
  suitability: {
    title: "Is ISO/IEC 17021-1 Accreditation Right for Your Certification Body?",
    paragraphs: [
      "ISO/IEC 17021-1 is the internationally recognized standard for bodies providing audit and certification of management systems. Accreditation demonstrates that a certification body has the competent personnel, impartiality controls, audit processes, certification procedures, and management systems required to deliver consistent and credible certification services.",
      "A certification body may offer one or several management-system certification schemes and does not need to provide certification for every type of management system. Whether your organization is newly established or already provides certification services, accreditation offers independent confirmation that its activities are performed competently, impartially, and consistently.",
    ],
    label: "Suitable for certification bodies offering",
    tiles: [
      { icon: "award", title: "ISO 9001 Quality Management" },
      { icon: "leaf", title: "ISO 14001 Environmental Management" },
      { icon: "heart-pulse", title: "ISO 45001 Occupational Health & Safety" },
      { icon: "lock", title: "ISO/IEC 27001 Information Security" },
      { icon: "store", title: "ISO 22000 Food Safety Management" },
      { icon: "activity", title: "ISO 50001 Energy Management" },
      { icon: "repeat", title: "ISO 22301 Business Continuity" },
      { icon: "check-circle", title: "Other Management-System Schemes" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17021-1 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Certification Competence",
        text: "Provide independent evidence that your certification body has competent auditors, reviewers, decision-makers, and management systems needed to deliver reliable certification services.",
      },
      {
        icon: "shield-check",
        title: "Strengthen Confidence in Certification Decisions",
        text: "Build confidence among certified clients, regulators, procurement authorities, and other stakeholders that certification decisions are based on competent and consistent audits.",
      },
      {
        icon: "scale",
        title: "Protect Impartiality and Credibility",
        text: "Demonstrate that risks to impartiality, conflicts of interest, and commercial pressures are identified, evaluated, controlled, and monitored.",
      },
      {
        icon: "globe",
        title: "Support Market Access and Growth",
        text: "Strengthen your certification body’s credibility, improve its competitive position, and support access to new clients, sectors, and international markets.",
      },
    ],
    image: {
      src: `${IMG}/kcertification-presenting-an-iso-9001-ce-a5a13aa3.jpg`,
      alt: "KCertification presenting an ISO 9001 certificate",
      width: 681,
      height: 907,
    },
    captionTitle: "Accredited Certification in Practice",
    caption: "Supporting credible management-systems certification and stronger client confidence.",
  },
  areas: {
    intro:
      "AAA evaluates the governance, competence, impartiality, audit, and decision-making controls needed to provide credible management-systems certification.",
    tiles: [
      {
        icon: "building",
        title: "Structure & Governance",
        text: "Legal identity, organizational structure, responsibilities, authority, governance arrangements, and management controls.",
      },
      {
        icon: "scale",
        title: "Impartiality Management",
        text: "Identification, evaluation, control, and monitoring of risks to impartiality and conflicts of interest.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Competence criteria, qualifications, technical knowledge, experience, training, authorization, and ongoing monitoring.",
      },
      {
        icon: "puzzle",
        title: "Audit Team Selection",
        text: "Selection and assignment of competent auditors and technical experts according to scheme, sector, and client activities.",
      },
      {
        icon: "calendar",
        title: "Audit Planning & Delivery",
        text: "Application review, audit-time determination, Stage 1 and Stage 2 audits, surveillance, recertification, and special audits.",
      },
      {
        icon: "check-circle",
        title: "Certification Review & Decision",
        text: "Independent review and decisions to grant, maintain, renew, suspend, withdraw, or change certification.",
      },
      {
        icon: "file-text",
        title: "Records & Public Information",
        text: "Audit records, certification files, certificate content, public directories, confidentiality, and client information.",
      },
      {
        icon: "refresh",
        title: "Complaints & Corrective Actions",
        text: "Complaints, appeals, nonconformities, corrective actions, internal audits, management review, and improvement.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Application",
    steps: [
      {
        title: "Submit Your Application",
        text: "Define the management-system standards, technical sectors, offices, and requested accreditation scope.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documents, certification procedures, competence criteria, impartiality controls, and audit processes.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified assessors evaluate compliance with ISO/IEC 17021-1. The assessment may include office review, certification-file review, and witnessing of audit activities.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the certification body submits corrective actions and supporting evidence.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "The assessment results and supporting evidence are reviewed independently before a decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful certification bodies receive an accreditation certificate and approved scope, valid for three years.",
      },
    ],
    application: {
      text: "Complete the application form to provide information about your organization, certification activities, requested management-system standards, technical sectors, locations, and proposed accreditation scope.",
      href: DOC.appSystemProduct2020,
      note: "Additional technical requirements and supporting information will be provided by the AAA accreditation team as applicable to your requested scope.",
    },
    resourcesTitle: "Supporting Documents",
    resources: COMMON_DOCS,
  },
  testimonial: {
    title: "Hear From AAA-Accredited Certification Bodies",
    intro:
      "Discover how AAA accreditation has supported certification bodies through technical expertise, professional collaboration, and stronger market credibility.",
    media: {
      kind: "logo",
      image: { src: `${IMG}/lazarus-alliance-logo-895866b4.webp`, alt: "Lazarus Alliance logo", width: 2000, height: 373 },
      caption: "AAA-Accredited Certification Body · Arizona, United States",
    },
    quote: {
      quote:
        "The AAA team is very technically precise, with strong subject-matter expertise and great collaboration. I do not hesitate to endorse AAA to prospective customers.",
      name: "Michael Peters",
      lines: ["CEO, Lazarus Alliance"],
    },
    highlights: [
      {
        icon: "lightbulb",
        title: "Technical Expertise",
        text: "Assessment supported by knowledgeable subject-matter experts.",
      },
      {
        icon: "handshake",
        title: "Strong Collaboration",
        text: "A professional and collaborative accreditation experience.",
      },
      {
        icon: "trending-up",
        title: "Greater Credibility",
        text: "Accreditation reinforced confidence and supported future growth.",
      },
    ],
    clients: {
      title: "Accreditation Supporting Recognized Client Relationships",
      text: "Lazarus Alliance provides accredited certification and assurance services to organizations across technology, government, cybersecurity, and other sectors. The organizations shown are clients of Lazarus Alliance, not organizations directly accredited by AAA.",
      image: {
        src: `${IMG}/examples-of-lazarus-alliance-client-orga-698dd286.png`,
        alt: "Examples of Lazarus Alliance client organizations",
        width: 2048,
        height: 474,
      },
    },
    second: {
      image: {
        src: `${IMG}/kcertification-accreditation-experience-a5a13aa3.jpg`,
        alt: "KCertification accreditation experience",
        width: 681,
        height: 907,
      },
      quote: {
        quote:
          "We began the process seeking a reliable partner to accredit our services, and from start to finish, everything was handled with professionalism.",
        name: "Christiano Baros",
        lines: ["CEO, KCertification · São Paulo, Brazil"],
      },
    },
  },
  faq: {
    intro: "Common questions about ISO/IEC 17021-1 accreditation for management-systems certification bodies.",
    items: [
      {
        q: "What is ISO/IEC 17021-1?",
        a: "ISO/IEC 17021-1 specifies requirements for the competence, consistency, and impartiality of bodies providing audit and certification of management systems.",
      },
      {
        q: "Does a certification body need to offer all management-system standards?",
        a: "No. A certification body may provide certification for one or more management-system standards and is not required to offer every type of management-system certification.",
      },
      {
        q: "Can a newly established certification body apply?",
        a: "Yes. A newly established certification body may apply when it has implemented its management system and can demonstrate operational capability, competent personnel, impartiality controls, and effective certification processes.",
      },
      {
        q: "What is included in the accreditation scope?",
        a: "The scope normally identifies the management-system standards and technical sectors for which the certification body has demonstrated competence.",
      },
      {
        q: "Is witness assessment required?",
        a: "Witness assessment may form part of the accreditation process to confirm auditor competence and effective implementation of the certification body’s audit procedures.",
      },
      {
        q: "Can several certification schemes be included?",
        a: "Yes. A certification body may request accreditation for several management-system standards, provided it demonstrates competence and compliance for each requested scheme and technical sector.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of applicable surveillance or reassessment activities.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your certification schemes, technical sectors, offices, and proposed accreditation scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17021-1 Accreditation?",
    text: "Take the next step toward independent recognition of your certification body’s competence, impartiality, and consistent operation. Our team is ready to guide you through the accreditation process and help define the appropriate management-system certification scope.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor(PROGRAMS.iso17021.label, PATH)),
          serviceSchema({
            name: `${PROGRAMS.iso17021.label} (ISO/IEC 17021-1)`,
            description:
              "Accreditation of management systems certification bodies against ISO/IEC 17021-1, covering governance, impartiality, personnel competence, audit planning and delivery, and certification decisions.",
            path: PATH,
            standard: PROGRAMS.iso17021.standard,
            audience: "Management systems certification bodies",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
