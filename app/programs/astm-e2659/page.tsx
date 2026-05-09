import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Training Providers Accreditation (ASTM E-2659)" };

export default function Page() {
  return (
    <ProgramPage
      title="Training Providers (ASTM E-2659)"
      standard="ASTM E-2659"
      intro="Accreditation of certificate-issuing training programs against ASTM E-2659 — the standard practice for certificate programs."
      whoFor={[
        "Continuing-education providers issuing certificates of completion",
        "Sector academies and corporate training functions",
        "Independent vendors operating recognized certificate programs",
      ]}
      scope={[
        "Needs analysis, learning objectives and instructional design",
        "Instructor competence and assessment validity",
        "Records, certificate issuance and learner appeals",
        "Quality-management system supporting the certificate program",
      ]}
      benefits={[
        "International recognition of program quality",
        "Portable certificates accepted by employers and regulators",
        "Demonstrated structural rigor against an established standard",
        "Eligibility for inclusion in the AAA accredited training register",
      ]}
      related={[
        { href: "/programs/training-education", label: "Training & Education Providers" },
        { href: "/programs/iso-17024", label: "Personnel Certification (ISO/IEC 17024)" },
      ]}
    />
  );
}
