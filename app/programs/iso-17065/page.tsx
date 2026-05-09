import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = { title: "Product Certification Bodies (ISO/IEC 17065)" };

export default function Page() {
  return (
    <ProgramPage
      title="Product Certification Bodies"
      standard="ISO/IEC 17065"
      intro="Accreditation of bodies certifying products, processes and services — supporting market access and consumer confidence."
      whoFor={[
        "Bodies certifying products against regulatory or voluntary schemes",
        "Bodies operating sector schemes (e.g. food, electrical, construction)",
        "Bodies issuing process or service certifications",
      ]}
      scope={[
        "Scheme governance and ownership",
        "Sampling, testing, inspection and evaluation activities",
        "Decision-making, surveillance and certificate issuance",
        "Use of marks of conformity and licensee management",
      ]}
      benefits={[
        "International recognition of product-conformity decisions",
        "Easier market access in destination economies",
        "Demonstrable independence from manufacturers and traders",
        "Continuous oversight via structured surveillance audits",
      ]}
      related={[
        { href: "/programs/iso-17021", label: "System Certification (ISO/IEC 17021-1)" },
        { href: "/programs/iso-17020", label: "Inspection Bodies (ISO/IEC 17020)" },
      ]}
    />
  );
}
