import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Inspection Bodies (ISO/IEC 17020)" };

export default function Page() {
  return (
    <ProgramPage
      title="Inspection Bodies"
      standard="ISO/IEC 17020"
      intro="Accreditation of inspection bodies — Type A (independent), Type B (in-house), and Type C (mixed) — performing inspections across regulated and commercial sectors."
      whoFor={[
        "Independent third-party inspection bodies (Type A)",
        "In-house inspection units within manufacturing or service organizations (Type B)",
        "Mixed-function inspection bodies (Type C)",
      ]}
      scope={[
        "Inspector competence and impartiality",
        "Inspection methods, sampling and reporting",
        "Independence requirements per body type",
        "Quality-management system supporting the inspection activity",
      ]}
      benefits={[
        "International recognition of inspection results",
        "Reduced re-inspection in cross-border trade",
        "Demonstrable competence to clients and regulators",
        "Eligibility for inclusion in international recognition arrangements",
      ]}
      related={[
        { href: "/programs/iso-17025", label: "Testing & Calibration (ISO/IEC 17025)" },
        { href: "/programs/iso-17065", label: "Product Certification (ISO/IEC 17065)" },
      ]}
    />
  );
}
