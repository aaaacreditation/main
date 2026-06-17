import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = {
  title: "Testing & Calibration Laboratories Accreditation — ISO/IEC 17025",
  description:
    "AAA accredits testing and calibration laboratories to ISO/IEC 17025 — guaranteeing services that are reliable and traceable to the International System of Units, with certificates recognised in many countries around the world.",
};

const DOCUMENTS = [
  {
    label: "Application form for accreditation of testing / calibration labs",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-testing-cal-labs.doc",
    meta: "DOC",
  },
  {
    label: "Proficiency Testing policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Proficiency-Testing-policy.pdf",
    meta: "PDF",
  },
  {
    label: "Measurement Traceability policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Measurement-Traceability-policy.pdf",
    meta: "PDF",
  },
  {
    label: "Determination of uncertainty of measurement policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Determination-of-uncertainty-of-measurement-policy.pdf",
    meta: "PDF",
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
      title="Testing & Calibration Laboratories Accreditation"
      standard="ISO/IEC 17025"
      intro="Carried out by a competent and impartial body, accredited testing and calibration guarantees that a laboratory delivers services that are reliable and traceable to the International System of Units."
      overview={[
        "Inaccurate testing and measurement results can have serious consequences for manufacturing processes and generate additional costs for businesses. The reliability of the measurements carried out is therefore essential — and this involves the testing and calibration of the equipment used.",
        "Carried out by a competent and impartial body, accredited testing and calibration guarantees that the laboratory delivers services that are reliable and traceable in the International System of Units.",
        "Thanks to multilateral arrangements, the testing and calibration certificates issued are recognised in many countries around the world, which facilitates trade.",
        "Gaining recognition for your laboratory's technical competence is a means of capturing new markets, since many organisational standards used by businesses require the traceability of measurements according to the International System of Units.",
      ]}
      documents={DOCUMENTS}
      documentsHeading="Documents related to the accreditation of testing & calibration labs"
      related={[
        { href: "/programs/iso-15189", label: "Medical Laboratories (ISO 15189)" },
        { href: "/programs/iso-17043", label: "Proficiency Testing (ISO/IEC 17043)" },
      ]}
    />
  );
}
