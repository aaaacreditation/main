import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Personnel Certification Bodies (ISO/IEC 17024)" };

export default function Page() {
  return (
    <ProgramPage
      title="Personnel Certification Bodies"
      standard="ISO/IEC 17024"
      intro="Accreditation of personnel-certification bodies — ensuring that the certification of individuals is impartial, defensible and aligned with international practice."
      whoFor={[
        "Bodies operating personnel-certification schemes",
        "Sector certification bodies (e.g. healthcare, energy, IT, finance)",
        "Professional associations issuing recognized credentials",
      ]}
      scope={[
        "Scheme design, validity and impartiality",
        "Examination development and psychometric integrity",
        "Decision-making, surveillance and recertification",
        "Appeals, complaints and conflict-of-interest management",
      ]}
      benefits={[
        "Globally-portable personnel certificates",
        "Demonstrable defensibility of certification decisions",
        "Reduced challenge risk through documented impartiality safeguards",
        "Eligibility for inclusion in international recognition arrangements",
      ]}
      related={[
        { href: "/programs/training-education", label: "Training Providers" },
        { href: "/programs/iso-17021", label: "System Certification (ISO/IEC 17021-1)" },
      ]}
    />
  );
}
