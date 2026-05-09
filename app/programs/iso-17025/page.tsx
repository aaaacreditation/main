import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Testing & Calibration Laboratories (ISO/IEC 17025)" };

export default function Page() {
  return (
    <ProgramPage
      title="Testing & Calibration Laboratories"
      standard="ISO/IEC 17025:2017"
      intro="Accreditation of testing and calibration laboratories under ISO/IEC 17025:2017 — the international standard for laboratory competence and impartiality."
      whoFor={[
        "Independent and in-house testing laboratories",
        "Calibration laboratories operating across regulated sectors",
        "Field-testing and on-site sampling operations",
      ]}
      scope={[
        "Technical competence for specific test or calibration methods",
        "Metrological traceability and measurement uncertainty",
        "Sampling, decision rules and reporting of results",
        "Management of risks, opportunities, and impartiality",
      ]}
      benefits={[
        "Internationally-recognized scope of accreditation",
        "Acceptance of test reports across ILAC partner economies",
        "Demonstrable competence to regulators and end clients",
        "Disciplined improvement through method validation and PT",
      ]}
      related={[
        { href: "/programs/iso-15189", label: "Medical Laboratories (ISO 15189)" },
        { href: "/programs/iso-17043", label: "Proficiency Testing (ISO/IEC 17043)" },
      ]}
    />
  );
}
