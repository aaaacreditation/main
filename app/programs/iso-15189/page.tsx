import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Medical Laboratories (ISO 15189)" };

export default function Page() {
  return (
    <ProgramPage
      title="Medical Laboratories"
      standard="ISO 15189:2022"
      intro="Accreditation of medical laboratories under ISO 15189 — quality and competence requirements specifically tailored to medical testing."
      whoFor={[
        "Hospital-based clinical laboratories",
        "Independent and reference medical laboratories",
        "Point-of-care testing programs operated by healthcare providers",
      ]}
      scope={[
        "Pre-, intra- and post-examination processes",
        "Patient identification, sample integrity and turnaround time",
        "Validation and verification of examination procedures",
        "Risk management and patient-safety outcomes",
      ]}
      benefits={[
        "Internationally-aligned recognition of clinical-laboratory quality",
        "Direct support of patient-safety and clinical-governance objectives",
        "Eligibility for cross-border insurance and referral arrangements",
        "Continuous improvement via structured surveillance audits",
      ]}
      related={[
        { href: "/programs/healthcare", label: "Healthcare Accreditation" },
        { href: "/programs/iso-17025", label: "Testing & Calibration (ISO/IEC 17025)" },
      ]}
    />
  );
}
