import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import SchemePage from "../_scheme/SchemePage";
import { crumbsFor, heroStats, relatedFor } from "../_scheme/shared";
import type { SchemeData } from "../_scheme/types";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";

const PATH = "/programs/calibration-laboratories";
const IMG = "/images/site/cab-calibration-labs";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Calibration Laboratories Accreditation (ISO/IEC 17025)",
    description:
      "ISO/IEC 17025 accreditation for calibration laboratories: independent recognition of competent, consistent calibration with reliable measurement traceability.",
    path: PATH,
    keywords: [
      "ISO/IEC 17025 calibration accreditation",
      "calibration laboratory accreditation",
      "measurement traceability",
      "measurement uncertainty",
      "calibration and measurement capability",
    ],
  });
}

const DATA: SchemeData = {
  slug: "calibration-labs",
  path: PATH,
  crumb: "Calibration Laboratories",
  hero: {
    standard: "ISO/IEC 17025",
    title: "Calibration Laboratories Accreditation",
    lead: "Demonstrate your laboratory’s technical competence through accreditation against ISO/IEC 17025, the internationally recognized standard for calibration laboratories. AAA accreditation provides independent recognition that your laboratory performs calibrations competently, consistently, and with reliable measurement traceability.",
    image: `${IMG}/aaa-recognition-award-presentation-7078355c.webp`,
    imageAlt: "AAA recognition award presentation",
    caption: "Recognizing Calibration Competence and Measurement Confidence",
    stats: heroStats(),
  },
  advisor: {
    intro: "Tell us about your laboratory and proposed calibration scope.",
    field: "Calibration Activities",
    placeholder: "Describe your calibration activities, measurement quantities and ranges",
    sector: "Calibration laboratory",
    source: "iso-17025-calibration-advisor",
  },
  suitability: {
    title: "Is ISO/IEC 17025 Accreditation Right for Your Calibration Laboratory?",
    paragraphs: [
      "ISO/IEC 17025 is the internationally recognized standard for laboratories performing calibration activities. Accreditation demonstrates that a laboratory has the technical competence, qualified personnel, suitable equipment, appropriate environmental controls, and effective management systems required to produce accurate and traceable calibration results.",
      "Whether your laboratory operates independently or as part of a manufacturing company, government authority, university, research institution, service company, or industrial organization, ISO/IEC 17025 accreditation provides independent confirmation of competence and strengthens confidence in the calibration certificates and results you issue.",
    ],
    label: "Suitable for laboratories performing",
    tiles: [
      { icon: "ruler", title: "Dimensional Calibration" },
      { icon: "scale", title: "Mass & Balance Calibration" },
      { icon: "thermometer", title: "Temperature Calibration" },
      { icon: "gauge", title: "Pressure Calibration" },
      { icon: "cpu", title: "Electrical Calibration" },
      { icon: "clock", title: "Time & Frequency Calibration" },
      { icon: "wrench", title: "Force & Torque Calibration" },
      { icon: "activity", title: "Volume & Flow Calibration" },
    ],
  },
  benefits: {
    title: "Why ISO/IEC 17025 Accreditation Matters",
    items: [
      {
        icon: "badge-check",
        title: "Demonstrate Technical Competence",
        text: "Provide independent evidence that your laboratory has the qualified personnel, reference standards, equipment, methods, and systems needed to perform reliable calibration activities.",
      },
      {
        icon: "shield-check",
        title: "Strengthen Confidence in Calibration Results",
        text: "Build confidence among customers, regulators, manufacturers, laboratories, and other users of calibration certificates by demonstrating that measurements are performed competently and consistently.",
      },
      {
        icon: "link",
        title: "Establish Measurement Traceability",
        text: "Demonstrate that calibration results are linked through a documented and unbroken chain of calibrations to appropriate national or international measurement standards.",
      },
      {
        icon: "trending-up",
        title: "Support Compliance & Market Opportunities",
        text: "Meet regulatory, contractual, and customer requirements while strengthening your laboratory’s credibility and ability to compete for calibration work.",
      },
    ],
    image: {
      src: `${IMG}/calibration-laboratory-team-02e26970.webp`,
      alt: "Calibration laboratory team",
      width: 1186,
      height: 667,
    },
    caption: "Celebrating technical competence, teamwork, and successful accreditation.",
  },
  areas: {
    intro:
      "AAA evaluates the management and technical controls needed to deliver accurate, traceable, and reliable calibration results.",
    tiles: [
      {
        icon: "building",
        title: "Laboratory Management System",
        text: "Evaluation of documented procedures, responsibilities, risk controls, record management, and improvement activities.",
      },
      {
        icon: "users",
        title: "Personnel Competence",
        text: "Assessment of qualifications, training, technical competence, authorization, and continued ability to perform specific calibrations.",
      },
      {
        icon: "clipboard",
        title: "Calibration Methods & Procedures",
        text: "Review of technical procedures, method implementation, verification, and validation where applicable.",
      },
      {
        icon: "package",
        title: "Reference Standards & Equipment",
        text: "Assessment of reference standards, measuring instruments, suitability, maintenance, intermediate checks, and protection.",
      },
      {
        icon: "link",
        title: "Measurement Traceability",
        text: "Evaluation of the documented and unbroken calibration chain linking results to recognized references.",
      },
      {
        icon: "plus",
        title: "Measurement Uncertainty",
        text: "Assessment of how uncertainty is identified, evaluated, calculated, documented, and reported.",
      },
      {
        icon: "thermometer",
        title: "Facilities & Environmental Conditions",
        text: "Assessment of temperature, humidity, vibration, cleanliness, power stability, and other relevant conditions.",
      },
      {
        icon: "chart",
        title: "Assurance of Calibration Results",
        text: "Evaluation of comparisons, checks, proficiency testing, and other controls used to monitor validity and consistency.",
      },
    ],
  },
  process: {
    title: "Accreditation Process & Resources",
    steps: [
      {
        title: "Submit Your Application",
        text: "Complete the application form and define the requested calibration scope, including measurement quantities, ranges, methods, and capabilities.",
      },
      {
        title: "Document Review",
        text: "AAA reviews management-system documents, procedures, uncertainty calculations, equipment information, and the proposed scope.",
      },
      {
        title: "Accreditation Assessment",
        text: "Qualified technical assessors evaluate compliance with ISO/IEC 17025 and competence for the requested calibration activities.",
      },
      {
        title: "Corrective Actions",
        text: "Where findings are identified, the laboratory submits corrective actions and supporting evidence for review.",
      },
      {
        title: "Independent Accreditation Decision",
        text: "The assessment results and supporting evidence are reviewed independently before a decision is made.",
      },
      {
        title: "Accreditation Granted",
        text: "Successful laboratories receive an accreditation certificate and approved calibration scope, valid for three years.",
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
    intro: "Common questions about ISO/IEC 17025 calibration laboratory accreditation.",
    items: [
      {
        q: "What is ISO/IEC 17025?",
        a: "ISO/IEC 17025 is the internationally recognized standard specifying the general requirements for the competence of testing and calibration laboratories.",
      },
      {
        q: "Can a newly established calibration laboratory apply?",
        a: "Yes. A newly established laboratory may apply when it has implemented its management system and can demonstrate that personnel, methods, equipment, traceability arrangements, and calibration activities meet applicable requirements.",
      },
      {
        q: "What is included in the accredited calibration scope?",
        a: "The scope normally identifies the measurement quantity, calibration item or instrument, measurement range, calibration method, and the laboratory’s approved calibration and measurement capability.",
      },
      {
        q: "What is measurement traceability?",
        a: "Measurement traceability is the property of a measurement result whereby it can be related to a recognized reference through a documented and unbroken chain of calibrations, each contributing to measurement uncertainty.",
      },
      {
        q: "Is measurement uncertainty required?",
        a: "Yes. Calibration laboratories are expected to evaluate and document measurement uncertainty for the calibration activities included within their scope.",
      },
      {
        q: "Is participation in proficiency testing required?",
        a: "Participation in proficiency testing, interlaboratory comparisons, or other suitable quality-assurance activities may be required where relevant and available.",
      },
      {
        q: "How long is accreditation valid?",
        a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of any applicable surveillance or reassessment activities.",
      },
      {
        q: "How do I begin?",
        a: "Complete the accreditation application form or contact the AAA team to discuss your laboratory’s calibration activities, measurement capabilities, and proposed scope.",
      },
    ],
  },
  cta: {
    title: "Ready to Apply for ISO/IEC 17025 Calibration Laboratory Accreditation?",
    text: "Take the next step toward independent recognition of your laboratory’s calibration competence and measurement capabilities. Our team is ready to guide you through the accreditation process and help define the appropriate calibration scope.",
  },
  related: relatedFor(PATH),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbsFor("Calibration Laboratories Accreditation", PATH)),
          serviceSchema({
            name: "Calibration Laboratories Accreditation (ISO/IEC 17025)",
            description:
              "Accreditation of calibration laboratories against ISO/IEC 17025, covering personnel competence, calibration methods, reference standards, measurement traceability and measurement uncertainty.",
            path: PATH,
            standard: "ISO/IEC 17025",
            audience: "Calibration laboratories",
          }),
          faqSchema(DATA.faq.items),
        ]}
      />
      <SchemePage data={DATA} />
    </>
  );
}
