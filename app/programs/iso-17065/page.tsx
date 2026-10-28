import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { COMMON_DOCS, DOC, crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import { PROGRAMS } from "@/lib/facts";

const PATH = PROGRAMS.iso17065.href;
const IMG = "/images/site/cab-17065";
const TITLE = "Product, Process & Service Certification Bodies Accreditation";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Product Certification Accreditation (ISO/IEC 17065)",
    description:
      "ISO/IEC 17065 accreditation for product, process and service certification bodies: recognition of credible schemes and reliable certification decisions.",
    path: PATH,
    keywords: [
      "ISO/IEC 17065 accreditation",
      "product certification body accreditation",
      "process certification",
      "service certification",
      "certification scheme accreditation",
    ],
  });
}

const DATA: SchemeData = {
  slug: "iso17065",
  path: PATH,
  crumb: PROGRAMS.iso17065.shortLabel,
  hero: {
    standard: "ISO/IEC 17065",
    title: TITLE,
    lead: "Demonstrate the competence, impartiality, and consistent operation of your certification body through accreditation against ISO/IEC 17065. AAA accreditation provides independent recognition that your organization operates credible certification schemes and makes reliable certification decisions.",
    image: `${IMG}/aaa-accreditation-bfb52177.webp`,
    imageAlt: "AAA Accreditation",
    stats: heroStats(["Countries Served", "Assessors", "Validity", "Recognition"], "Global"),
  },
  suitability: {
    title: "Is ISO/IEC 17065 Accreditation Right for Your Certification Body?",
    paragraphs: [
      "ISO/IEC 17065 is the internationally recognized standard for organizations that certify products, processes, and services.",
      "Accreditation demonstrates that a certification body has the competent personnel, impartiality controls, evaluation processes, certification procedures, and management systems necessary to make consistent and reliable certification decisions.",
    ],
    label: "Suitable for certification bodies offering",
    tiles: [
      { icon: "package", title: "Consumer Product Certification" },
      { icon: "cpu", title: "Electrical & Electronic Product Certification" },
      { icon: "building", title: "Construction Product Certification" },
      { icon: "leaf", title: "Food & Agricultural Product Certification" },
      { icon: "factory", title: "Industrial Product Certification" },
      { icon: "refresh", title: "Process Certification" },
      { icon: "handshake", title: "Service Certification" },
      { icon: "check-circle", title: "Other Scheme-Based Certification Activities" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17065 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Certification Competence",
        text: "Provide independent evidence that your certification body has competent personnel, robust evaluation processes, effective scheme controls, and reliable certification decision-making.",
      },
      {
        icon: "shield-check",
        title: "Strengthen Confidence in Certified Products & Services",
        text: "Increase confidence among customers, regulators, manufacturers, retailers, and other stakeholders that certified products, processes, or services meet defined requirements.",
      },
      {
        icon: "scale",
        title: "Protect Impartiality & Credibility",
        text: "Demonstrate that commercial, financial, ownership, or operational relationships are effectively managed so certification decisions remain impartial.",
      },
      {
        icon: "globe",
        title: "Support Market Access & Regulatory Acceptance",
        text: "Strengthen the credibility of certification results and support access to regulated markets, procurement systems, supply chains, and international customers.",
      },
    ],
    image: {
      src: `${IMG}/industrial-product-conformity-assessment.webp`,
      alt: "Industrial product conformity assessment",
      width: 1400,
      height: 934,
    },
    captionTitle: "Certification in Practice",
    caption: "Supporting credible product certification and greater confidence throughout the supply chain.",
  },
  areas: {
    intro:
      "AAA evaluates the governance, competence, impartiality, evaluation, and decision-making controls needed to provide credible product, process, and service certification.",
    tiles: [
      {
        icon: "building",
        title: "Structure & Governance",
        text: "Legal identity, organizational structure, responsibilities, authority, governance arrangements, and management controls.",
      },
      {
        icon: "scale",
        title: "Impartiality & Conflict-of-Interest Management",
        text: "Control of ownership relationships, consultancy, commercial pressures, and other risks to impartiality.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Qualifications, technical knowledge, experience, authorization, and ongoing competence of certification personnel.",
      },
      {
        icon: "puzzle",
        title: "Certification Scheme Management",
        text: "Scheme requirements, certification criteria, evaluation methods, surveillance requirements, and scheme controls.",
      },
      {
        icon: "search-check",
        title: "Application & Evaluation",
        text: "Application review, evaluation planning, testing, inspection, auditing, technical review, and conformity-assessment activities.",
      },
      {
        icon: "check-circle",
        title: "Review & Certification Decision",
        text: "Independent review and decisions to grant, maintain, extend, reduce, suspend, withdraw, or renew certification.",
      },
      {
        icon: "calendar",
        title: "Surveillance & Continued Certification",
        text: "Ongoing surveillance, continued conformity, certification marks, and follow-up activities.",
      },
      {
        icon: "file-text",
        title: "Complaints, Appeals & Certification Records",
        text: "Complaints, appeals, certification records, public information, confidentiality, corrective actions, and improvement.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Application",
    steps: [
      {
        title: "Submit Your Application",
        text: "Define the certification schemes, products, processes, services, and technical sectors for which accreditation is requested.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documentation, scheme requirements, evaluation procedures, personnel competence, impartiality arrangements, and the proposed scope.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified assessors evaluate the certification body against ISO/IEC 17065 requirements and the requested accreditation scope.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the certification body submits corrective actions together with supporting evidence for review.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "Assessment findings and supporting evidence are independently reviewed before an accreditation decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful certification bodies receive an accreditation certificate and approved scope, valid for three years.",
      },
    ],
    application: {
      text: "Complete the application form to provide information about your organization, certification schemes, product or service categories, evaluation methods, locations, and proposed accreditation scope.",
      href: DOC.appSystemProduct2023,
      note: "Additional technical requirements and supporting information will be provided by the AAA accreditation team as applicable to your requested scope.",
    },
    resourcesTitle: "Supporting Documents",
    resources: [
      { label: "Application form for accreditation of Halal certification bodies", href: DOC.appHalal, meta: "DOC" },
      ...COMMON_DOCS,
    ],
  },
  testimonial: {
    eyebrow: "Accreditation Value",
    title: "What Accreditation Can Strengthen",
    cards: [
      {
        icon: "shield-check",
        title: "Stronger Certification Credibility",
        text: "Accreditation reinforces confidence in product, process, and service certification decisions.",
      },
      {
        icon: "globe",
        title: "Greater Market Acceptance",
        text: "Independent accreditation supports confidence among manufacturers, regulators, procurement authorities, and customers.",
      },
      {
        icon: "check-circle",
        title: "More Consistent Certification Processes",
        text: "The accreditation process strengthens evaluation, review, surveillance, and certification controls.",
      },
    ],
  },
  faq: {
    intro: "Common questions about ISO/IEC 17065 accreditation.",
    items: [
      {
        q: "What is ISO/IEC 17065?",
        a: "ISO/IEC 17065 specifies requirements for bodies certifying products, processes, and services.",
      },
      {
        q: "What can be certified?",
        a: "Certification may cover products, processes, and services where defined certification requirements and conformity-assessment methods are established.",
      },
      {
        q: "Can a newly established certification body apply?",
        a: "Yes. A newly established certification body may apply once it has implemented its management system and can demonstrate suitable schemes, competent personnel, impartiality controls, evaluation processes, and operational capability.",
      },
      {
        q: "What is included in the accreditation scope?",
        a: "The scope identifies the products, processes, services, certification schemes, or technical sectors for which the certification body has demonstrated competence.",
      },
      {
        q: "Does accreditation always require product testing?",
        a: "Not always. Evaluation methods depend on the certification scheme and may include testing, inspection, auditing, factory evaluation, technical assessment, document review, or a combination.",
      },
      {
        q: "Can several certification schemes be included?",
        a: "Yes. Multiple schemes or product categories may be included, provided the certification body demonstrates competence and compliance for each requested area.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of applicable surveillance or reassessment activities.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your certification schemes, technical sectors, and proposed accreditation scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17065 Accreditation?",
    text: "Take the next step toward independent recognition of your certification body’s competence, impartiality, and reliable operation. Our team is ready to guide you through the accreditation process and help define the appropriate scope for your product, process, or service certification activities.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor(PROGRAMS.iso17065.label, PATH)),
          serviceSchema({
            name: `${TITLE} (ISO/IEC 17065)`,
            description:
              "Accreditation of product, process and service certification bodies against ISO/IEC 17065, covering governance, impartiality, scheme management, evaluation, certification decisions and surveillance.",
            path: PATH,
            standard: "ISO/IEC 17065",
            audience: "Product, process and service certification bodies",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
