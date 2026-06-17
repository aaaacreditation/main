import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = {
  title: "Inspection Bodies Accreditation — ISO/IEC 17020",
  description:
    "AAA accredits inspection bodies to ISO/IEC 17020 — organizations that examine materials, products, installations, plant, processes, work procedures or services and determine their conformity with requirements.",
};

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

export default function Page() {
  return (
    <ProgramPage
      title="Inspection Bodies Accreditation"
      standard="ISO/IEC 17020"
      intro="AAA accredits inspection bodies to ISO/IEC 17020 — organizations that examine materials, products, installations, plant, processes, work procedures or services and determine their conformity with requirements."
      overview={[
        "AAA accredits inspection bodies to the standard ISO/IEC 17020. Their functions include the examination of materials, products, installations, plant, processes, work procedures or services, the determination of their conformity with requirements, and the subsequent reporting of the results of these activities.",
        "Examples of the inspections these organizations perform include the periodic inspection of lifting equipment, cranes and pressurized gas cylinders, and the inspection of buildings for the presence of asbestos, as well as lifts, hoists, electrical installations and escalators.",
        "The requirement for the independence of inspection bodies may vary according to legislation and market needs. There may be a requirement for inspections to be carried out by an inspection body with third-party status — one that is independent of both the seller or producer and the purchaser.",
        "These bodies generally perform inspections of facilities, equipment and installations for which the authorities have special regulations in place for safety reasons.",
      ]}
      documents={DOCUMENTS}
      documentsHeading="Documents related to the accreditation of Inspection Bodies"
      related={[
        { href: "/programs/iso-17025", label: "Testing & Calibration (ISO/IEC 17025)" },
        { href: "/programs/iso-17065", label: "Product Certification (ISO/IEC 17065)" },
      ]}
    />
  );
}
