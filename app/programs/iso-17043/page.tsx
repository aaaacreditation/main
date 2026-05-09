import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Proficiency Testing Providers (ISO/IEC 17043)" };

export default function Page() {
  return (
    <ProgramPage
      title="Proficiency Testing Providers"
      standard="ISO/IEC 17043"
      intro="Accreditation of providers of proficiency-testing schemes — the third-party measurement of laboratory performance against agreed criteria."
      whoFor={[
        "Independent PT-scheme operators",
        "Sector consortia operating proficiency-testing rounds",
        "National measurement institutes offering PT services",
      ]}
      scope={[
        "Scheme design, statistical handling and reporting",
        "Production, characterization and homogeneity of PT items",
        "Performance evaluation criteria and consistent treatment of participants",
        "Confidentiality, impartiality and conflict-of-interest management",
      ]}
      benefits={[
        "International recognition of PT results across ILAC partners",
        "Stronger market acceptance of scheme outputs",
        "Demonstrable independence and statistical defensibility",
        "Continuous improvement through structured surveillance",
      ]}
      related={[
        { href: "/programs/iso-17025", label: "Testing & Calibration (ISO/IEC 17025)" },
        { href: "/programs/iso-15189", label: "Medical Laboratories (ISO 15189)" },
      ]}
    />
  );
}
