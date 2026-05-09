import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "System Certification Bodies (ISO/IEC 17021-1)" };

export default function Page() {
  return (
    <ProgramPage
      title="System Certification Bodies"
      standard="ISO/IEC 17021-1"
      intro="Accreditation of bodies certifying management systems — ISO 9001, ISO 14001, ISO 45001, ISO/IEC 27001 and other management-system standards."
      whoFor={[
        "Independent management-system certification bodies",
        "Sector-specific certification bodies (e.g. food safety, medical devices)",
        "Multinational certification organizations operating across regions",
      ]}
      scope={[
        "Audit-team competence and impartiality",
        "Stage 1 and Stage 2 audit methodology and reporting",
        "Certification decisions, surveillance and recertification cycles",
        "Witness assessments across selected scopes",
      ]}
      benefits={[
        "Recognition under international IAF arrangements",
        "Acceptance of issued certificates across partner economies",
        "Demonstrated impartiality and competence to clients and regulators",
        "Operational discipline through structured surveillance",
      ]}
      related={[
        { href: "/programs/iso-17065", label: "Product Certification (ISO/IEC 17065)" },
        { href: "/programs/iso-17024", label: "Personnel Certification (ISO/IEC 17024)" },
      ]}
    />
  );
}
