import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import ProgramPage from "../../_components/ProgramPage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

const PATH = "/programs/iso-17020";

export const metadata: Metadata = pageMeta({
  title: "Inspection Bodies Accreditation (ISO/IEC 17020)",
  description:
    "AAA accredits Type A, B and C inspection bodies to ISO/IEC 17020 — independent recognition of competence, impartiality and consistent inspection reporting.",
  path: PATH,
  keywords: [
    "ISO/IEC 17020 accreditation",
    "inspection body accreditation",
    "Type A inspection body",
    "third-party inspection",
  ],
});

const DOCUMENTS = [
  {
    label: "Application form for accreditation of Inspection Bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-Inspection-Bodies.doc",
    meta: "DOC",
  },
  {
    label: "Checklist for ISO/IEC 17020",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-ISO-17020.docx",
    meta: "DOCX",
  },
  {
    label: "General requirements for accreditation",
    href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
    meta: "PDF",
  },
  {
    label: "Requirements for use of accreditation symbols",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
    meta: "PDF",
  },
  {
    label: "Requirements for accreditation of multi-site conformity assessment bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
    meta: "PDF",
  },
];

const FAQ = [
  {
    q: "What is the difference between Type A, B and C inspection bodies?",
    a: "ISO/IEC 17020 classifies inspection bodies by their independence. A Type A body provides third-party inspection and must be independent of the parties involved. A Type B body is a separate and identifiable part of an organization and supplies inspection services only to its parent organization. A Type C body may supply inspection services both to its parent organization and to other parties. The type applied for is confirmed during assessment and stated on the accreditation scope.",
  },
  {
    q: "Does ISO/IEC 17020 require us to hold ISO 9001 as well?",
    a: "No. The standard offers two routes to the management-system requirements. Option A sets out the management-system elements inside ISO/IEC 17020 itself; Option B is satisfied by a management system established in accordance with ISO 9001 that is capable of supporting and demonstrating the requirements of ISO/IEC 17020. Either route is acceptable for accreditation.",
  },
  {
    q: "Which inspection activities can be included in the scope?",
    a: "Accreditation is granted for a defined scope that identifies the inspection fields, the items or installations inspected, the methods or regulatory requirements applied, and the sites or locations from which inspection is managed. Typical fields include lifting equipment, cranes and pressurized gas cylinders, lifts, hoists and escalators, electrical installations, buildings and the presence of asbestos.",
  },
  {
    q: "Can an inspection body also be accredited for testing or certification?",
    a: "Yes, but those activities are assessed against their own standards — ISO/IEC 17025 for testing and calibration, ISO/IEC 17065 for product certification — and appear as separate accreditations. The body must be able to show that combining activities does not compromise the impartiality of its inspection work.",
  },
  {
    q: "How long does accreditation last?",
    a: "AAA accreditation is granted for a three-year cycle with annual surveillance assessments, followed by a full reassessment before the cycle is renewed. Changes to scope, key personnel or sites are notified to AAA and may trigger an extension-to-scope assessment.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/conformity-assessment-bodies" },
            { name: "Inspection Bodies Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Inspection Bodies Accreditation (ISO/IEC 17020)",
            description:
              "Accreditation of Type A, B and C inspection bodies against ISO/IEC 17020, covering impartiality, competence, inspection methods and reporting.",
            path: PATH,
            standard: "ISO/IEC 17020",
            audience: "Inspection bodies",
          }),
          faqSchema(FAQ),
        ]}
      />
      <ProgramPage
        title="Inspection Bodies Accreditation"
        standard="ISO/IEC 17020"
        intro="AAA accredits inspection bodies to ISO/IEC 17020 — organizations that examine materials, products, installations, plant, processes, work procedures or services and determine their conformity with requirements."
        hero="/sectors/construction.jpg"
        heroCaption={{
          kicker: "AAA accreditation",
          title: "Inspection in the field",
          chip: "ISO/IEC 17020",
        }}
        metrics={[
          { v: "ISO/IEC 17020", k: "Anchor standard" },
          { v: "Type A · B · C", k: "Inspection body types" },
          { v: "3 years", k: "Accreditation cycle" },
          { v: "Annual", k: "Surveillance" },
        ]}
        overview={[
          "AAA accredits inspection bodies to the standard ISO/IEC 17020. Their functions include the examination of materials, products, installations, plant, processes, work procedures or services, the determination of their conformity with requirements, and the subsequent reporting of the results of these activities.",
          "Examples of the inspections these organizations perform include the periodic inspection of lifting equipment, cranes and pressurized gas cylinders, and the inspection of buildings for the presence of asbestos, as well as lifts, hoists, electrical installations and escalators.",
          "The requirement for the independence of inspection bodies may vary according to legislation and market needs. There may be a requirement for inspections to be carried out by an inspection body with third-party status — one that is independent of both the seller or producer and the purchaser. ISO/IEC 17020 reflects this by defining three types of body: Type A, which is independent of the parties involved; Type B, which serves only its parent organization; and Type C, which may serve its parent organization and other parties.",
          "These bodies generally perform inspections of facilities, equipment and installations for which the authorities have special regulations in place for safety reasons. Accreditation gives those authorities, and the clients of the inspection body, independent evidence that the inspection was carried out by competent people, using controlled methods, and reported without bias.",
        ]}
        whoFor={[
          "Type A bodies providing third-party inspection, independent of the parties involved in the item inspected",
          "Type B in-house inspection bodies that form a separate, identifiable part of an organization and inspect only for their parent organization",
          "Type C bodies that inspect both for their parent organization and for other clients",
          "Bodies inspecting lifting equipment, cranes, pressure equipment and gas cylinders",
          "Bodies inspecting buildings, lifts, hoists, escalators and electrical installations",
          "Bodies performing asbestos, safety and pre-shipment inspection under statutory or contractual requirements",
          "Inspection bodies designated by regulators, or required by tender conditions to hold accredited status",
        ]}
        scopeHeading="What the assessment covers"
        scope={[
          "Impartiality and independence — classification as a Type A, B or C body, identification of risks to impartiality and the safeguards applied to them.",
          "Confidentiality — enforceable commitments covering all information obtained or created during inspection activities.",
          "Administrative and organizational requirements — legal identity, liability arrangements, the technical manager and nominated deputies.",
          "Competence of personnel — qualification criteria for inspectors, training, authorization, ongoing monitoring and supervision.",
          "Facilities and equipment — access to what is needed, calibration and maintenance programmes, and traceability of measurements.",
          "Inspection methods and procedures — contract review, documented methods, handling and identification of inspection items, and sampling where used.",
          "Inspection records, reports and certificates — traceable records, authorized signatories, and reports that clearly state what was inspected and against what.",
          "Management system, complaints and appeals — Option A or Option B, internal audit, management review, corrective action and the handling of complaints and appeals.",
        ]}
        benefits={[
          "Independent evidence that inspection results are produced by competent, impartial personnel using controlled methods",
          "Acceptance where legislation, regulators or purchasers require inspection by a body with third-party status",
          "Documented control of equipment calibration and measurement traceability behind every inspection result",
          "Eliminates the need for repetitive testing, certification and inspection, which facilitates trade",
          "An effective marketing tool and a passport to tenders that require independently verified conformity assessment service providers",
          "Annual surveillance that keeps inspector competence, methods and reporting current across the three-year cycle",
        ]}
        documents={DOCUMENTS}
        documentsHeading="Documents related to the accreditation of Inspection Bodies"
        faq={FAQ}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All conformity assessment programs" },
          { href: "/programs/iso-17025", label: "Testing & Calibration Laboratories (ISO/IEC 17025)" },
          { href: "/programs/iso-17065", label: "Product Certification Bodies (ISO/IEC 17065)" },
          { href: "/programs/iso-17021", label: "Management Systems Certification Bodies (ISO/IEC 17021-1)" },
        ]}
      />
    </>
  );
}
