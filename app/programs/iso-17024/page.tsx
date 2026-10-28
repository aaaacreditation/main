import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { COMMON_DOCS, DOC, crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import { PROGRAMS } from "@/lib/facts";

const PATH = PROGRAMS.iso17024.href;
const IMG = "/images/site/cab-17024";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Personnel Certification Accreditation (ISO/IEC 17024)",
    description:
      "ISO/IEC 17024 accreditation for personnel certification bodies: independent recognition of credible certification schemes and reliable decisions on competence.",
    path: PATH,
    keywords: [
      "ISO/IEC 17024 accreditation",
      "personnel certification body accreditation",
      "certification of persons",
      "certification scheme development",
      "ISO/IEC 17024:2026",
    ],
  });
}

const DATA: SchemeData = {
  slug: "iso17024",
  path: PATH,
  crumb: PROGRAMS.iso17024.shortLabel,
  hero: {
    standard: "ISO/IEC 17024:2026",
    title: PROGRAMS.iso17024.label,
    lead: "Demonstrate the competence, impartiality, and consistent operation of your personnel certification body through accreditation against ISO/IEC 17024. AAA accreditation provides independent recognition that your organization operates credible certification schemes and makes reliable decisions about the competence of certified individuals.",
    image: `${IMG}/smartcomply-representatives-holding-an-a-9c81c677.webp`,
    imageAlt: "Smartcomply representatives holding an AAA accreditation certificate",
    caption: "Smartcomply Academy · AAA-Accredited Personnel Certification Body · Nigeria",
    stats: heroStats(),
  },
  advisor: {
    intro: "Tell us about your personnel certification schemes and proposed scope.",
    field: "Certification Schemes",
    placeholder: "Describe your personnel certification schemes and proposed scope",
    sector: "Personnel certification body",
    source: "iso-17024-advisor",
  },
  suitability: {
    title: "Is ISO/IEC 17024 Accreditation Right for Your Certification Body?",
    paragraphs: [
      "ISO/IEC 17024 is the internationally recognized standard for organizations that certify the competence of individuals against defined requirements. Personnel certification provides assurance that a person has demonstrated the knowledge, skills, and abilities required by a specific certification scheme.",
      "Accreditation demonstrates that the certification body has competent personnel, impartiality controls, reliable assessment methods, secure examination processes, and effective certification procedures needed to make consistent and credible certification decisions.",
    ],
    label: "Suitable for certification bodies offering",
    tiles: [
      { icon: "chart", title: "Quality & Management Professionals" },
      { icon: "shield", title: "Health & Safety Professionals" },
      { icon: "search", title: "Technical Inspectors" },
      { icon: "clipboard-check", title: "Auditors & Lead Auditors" },
      { icon: "lock", title: "IT & Cybersecurity Professionals" },
      { icon: "stethoscope", title: "Healthcare & Clinical Professionals" },
      { icon: "wrench", title: "Skilled Trades & Technical Occupations" },
      { icon: "graduation", title: "Other Professional Certification Schemes" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17024 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Certification Competence",
        text: "Provide independent evidence that your certification body has the personnel, systems, assessment methods, and governance needed to operate credible certification schemes.",
      },
      {
        icon: "user-check",
        title: "Build Confidence in Certified Professionals",
        text: "Increase confidence among employers, regulators, clients, and the public that certified individuals have demonstrated the competence required by the certification scheme.",
      },
      {
        icon: "globe",
        title: "Support Recognition and Workforce Mobility",
        text: "Strengthen the acceptance of personnel certifications across organizations, sectors, and countries and support professional mobility.",
      },
      {
        icon: "scale",
        title: "Protect Fairness, Impartiality, and Reliability",
        text: "Demonstrate that certification decisions, examinations, assessment tools, and certification processes are impartial, transparent, secure, and consistently applied.",
      },
    ],
    image: {
      src: `${IMG}/competence-assessment-in-an-industrial-w-d0707ee5.webp`,
      alt: "Competence assessment in an industrial workplace",
      width: 700,
      height: 799,
    },
    captionTitle: "Competence in Practice",
    caption:
      "Personnel certification helps verify that professionals have demonstrated the competence required to perform their roles safely and effectively.",
  },
  areas: {
    intro:
      "AAA evaluates the governance, scheme, competence, assessment, security, and decision-making controls needed to operate reliable personnel certification.",
    tiles: [
      {
        icon: "building",
        title: "Structure & Governance",
        text: "Legal identity, organizational structure, responsibilities, authority, governance arrangements, and management controls.",
      },
      {
        icon: "scale",
        title: "Impartiality Management",
        text: "Control of conflicts of interest, commercial pressures, and relationships with training providers or related organizations.",
      },
      {
        icon: "puzzle",
        title: "Certification Scheme Development",
        text: "Design, validation, maintenance, and updating of schemes according to defined competence requirements and stakeholder needs.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Qualifications, experience, training, authorization, and continued competence of examiners, assessors, reviewers, and decision-makers.",
      },
      {
        icon: "clipboard",
        title: "Application & Eligibility Review",
        text: "Review and verification of candidate prerequisites, education, experience, training, and other eligibility requirements.",
      },
      {
        icon: "file-check",
        title: "Assessment & Examination Processes",
        text: "Written examinations, practical assessments, interviews, portfolios, scoring methods, security, and consistency controls.",
      },
      {
        icon: "check-circle",
        title: "Certification Decisions & Status",
        text: "Independent processes to grant, maintain, renew, suspend, withdraw, or change certification.",
      },
      {
        icon: "refresh",
        title: "Surveillance, Recertification & Complaints",
        text: "Surveillance, recertification, complaints, appeals, misuse controls, corrective actions, and improvement activities.",
      },
    ],
    note: {
      title: "Use of AI and Digital Assessment Tools:",
      text: "Where artificial intelligence or digital assessment tools are used, AAA evaluates their validation, monitoring, security, competence requirements, human oversight, and control of generated outcomes.",
    },
  },
  process: {
    title: "Accreditation Process & Application",
    steps: [
      {
        title: "Submit Your Application",
        text: "Define the personnel certification schemes and professional scopes for which accreditation is requested.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documents, certification schemes, competence criteria, assessment methods, impartiality controls, and examination procedures.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified assessors evaluate compliance with ISO/IEC 17024. This may include file review, examination-process review, assessment tools, personnel competence, and witnessing.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the certification body submits corrective actions and supporting evidence.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "The assessment results and supporting evidence are independently reviewed before a decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful certification bodies receive an accreditation certificate and approved personnel certification scope, valid for three years.",
      },
    ],
    application: {
      text: "Complete the application form to provide information about your organization, certification schemes, candidate requirements, assessment methods, examination processes, locations, and proposed accreditation scope.",
      href: DOC.appPersonnel,
      note: "Additional technical requirements and supporting information will be provided by the AAA accreditation team as applicable to your requested scope.",
    },
    resourcesTitle: "Supporting Documents",
    resources: COMMON_DOCS,
  },
  testimonial: {
    title: "Hear From an AAA-Accredited Personnel Certification Body",
    intro:
      "Discover how AAA accreditation has supported personnel certification bodies in strengthening assessment quality, professional credibility, and confidence in certified individuals.",
    media: {
      kind: "image",
      image: {
        src: `${IMG}/daniel-obot-testimonial-for-aaa-accredit-5261858e.webp`,
        alt: "Daniel Obot testimonial for AAA accreditation",
        width: 940,
        height: 788,
      },
      caption: "Smartcomply · AAA-Accredited Personnel Certification Body",
    },
    quote: {
      quote:
        "We are incredibly proud to have achieved accreditation as a Certification Body for Personnel Certification from AAA. The entire journey, from the initial engagement to the final accreditation, was marked by a highly professional, seamless, and supportive experience.",
      name: "Daniel Obot",
      lines: ["Director, Academy Operations", "Smartcomply"],
    },
    highlights: [
      {
        icon: "route",
        title: "Professional Accreditation Journey",
        text: "A seamless and supportive experience from initial engagement through final accreditation.",
      },
      {
        icon: "certificate",
        title: "Stronger Certification Credibility",
        text: "Independent recognition strengthened confidence in Smartcomply’s personnel certification activities.",
      },
      {
        icon: "shield-check",
        title: "Greater Organizational Confidence",
        text: "Accreditation reinforced the organization’s commitment to credible and reliable certification.",
      },
    ],
  },
  faq: {
    intro: "Common questions about ISO/IEC 17024 accreditation for personnel certification bodies.",
    items: [
      {
        q: "What is ISO/IEC 17024?",
        a: "ISO/IEC 17024 specifies requirements for bodies operating certification of persons and includes requirements relating to the development and maintenance of personnel certification schemes.",
      },
      {
        q: "What is personnel certification?",
        a: "Personnel certification is a third-party process used to confirm that an individual has demonstrated defined competence requirements within a specific certification scheme.",
      },
      {
        q: "Can a newly established certification body apply?",
        a: "Yes. A newly established certification body may apply when it has implemented its management system and can demonstrate operational capability, competent personnel, valid certification schemes, reliable assessments, and effective impartiality controls.",
      },
      {
        q: "What is included in the accreditation scope?",
        a: "The accreditation scope identifies the personnel certification schemes, professional categories, or competence areas for which the certification body has demonstrated compliance and competence.",
      },
      {
        q: "Are examinations always required?",
        a: "No. The assessment method depends on the certification scheme and may include written examinations, practical assessments, interviews, portfolio assessment, observation, or an appropriate combination.",
      },
      {
        q: "Can training and certification be provided by the same organization?",
        a: "They may exist within the same wider organization, but the certification body must identify and control risks to impartiality and ensure certification decisions remain independent from training activities.",
      },
      {
        q: "Does the 2026 edition address artificial intelligence?",
        a: "Yes. Where AI is used in certification or assessment activities, the certification body must apply appropriate validation, monitoring, competence, security, human oversight, and control of generated outcomes.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your certification schemes, assessment methods, candidate requirements, and proposed accreditation scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17024 Accreditation?",
    text: "Take the next step toward independent recognition of your personnel certification body’s competence, impartiality, and reliable operation. Our team is ready to guide you through the accreditation process and help define the appropriate scope for your certification schemes.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor(PROGRAMS.iso17024.label, PATH)),
          serviceSchema({
            name: `${PROGRAMS.iso17024.label} (ISO/IEC 17024)`,
            description:
              "Accreditation of personnel certification bodies against ISO/IEC 17024, covering governance, impartiality, scheme development, examination processes and certification decisions.",
            path: PATH,
            standard: "ISO/IEC 17024",
            audience: "Personnel certification bodies",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
