import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = {
  title: "System Certification Bodies Accreditation — ISO/IEC 17021-1",
  description:
    "AAA accredits management system certification bodies to ISO/IEC 17021-1 — covering quality, environmental, occupational health & safety, food safety, medical devices, energy, greenhouse gas and information security management systems.",
};

const DOCUMENTS = [
  {
    label: "Application form for accreditation of system/product certification body",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc",
    meta: "DOC",
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
      title="System Certification Bodies Accreditation"
      standard="ISO/IEC 17021-1"
      intro="Quality, environmental, food safety, energy and information security management systems are present in many sectors of the economy. Third-party certification is a means of having their conformity with international standards recognised."
      overview={[
        "Quality, environmental, food safety, energy and information security management systems are present in many sectors of the economy. Certification of such systems by a third party is a means of having their conformity with international standards recognised — certifying that the system in place meets precise requirements.",
        "Use of accredited certification allows a customer to obtain assurance that the conformity assessment body (CAB) whose services it is using is competent and impartial.",
        "It is a token of confidence in the quality of the service delivered. In certain sectors of activity, benefiting from accredited certification can prove decisive for capturing new markets.",
      ]}
      scopeHeading="AAA scope of accreditation"
      scope={[
        "Accreditation of Quality Management Systems Certification Bodies (ISO 9001)",
        "Accreditation of Environmental Management Systems Certification Bodies (ISO 14001)",
        "Accreditation of Occupational Health & Safety Management Systems Certification Bodies (ISO 45001)",
        "Accreditation of Food Safety Management Systems Certification Bodies (ISO 22000)",
        "Accreditation of Medical Devices Quality Management Systems Certification Bodies (ISO 13485)",
        "Accreditation of Energy Management Systems Certification Bodies (ISO 50001)",
        "Accreditation of Greenhouse Gases Certification Bodies (ISO 14064)",
        "Accreditation of Information Security Management Systems Certification Bodies (ISO 27001)",
      ]}
      documents={DOCUMENTS}
      documentsHeading="Documents related to the accreditation of System Certification Bodies"
      related={[
        { href: "/programs/iso-17065", label: "Product Certification (ISO/IEC 17065)" },
        { href: "/programs/iso-17024", label: "Personnel Certification (ISO/IEC 17024)" },
      ]}
    />
  );
}
