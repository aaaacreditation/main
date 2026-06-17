import type { Metadata } from "next";
import AboutHero from "../_components/about/AboutHero";
import AboutCompetencies from "../_components/about/AboutCompetencies";
import AboutVisionMission from "../_components/about/AboutVisionMission";
import AboutObjectives from "../_components/about/AboutObjectives";
import AboutPillars from "../_components/about/AboutPillars";
import AboutManagement from "../_components/about/AboutManagement";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "About AAA",
  description:
    "AAA is the American Accreditation Association, authorized by the State Corporation Commission of the Commonwealth of Virginia under Title 13.1 of the Code of Virginia to offer a full range of comprehensive accreditation services — international accreditation accepted globally.",
  keywords: [
    "American Accreditation Association",
    "AAA accreditation",
    "international accreditation",
    "healthcare accreditation",
    "training providers accreditation",
    "schools accreditation",
    "ISO/IEC 17025",
    "ISO 15189",
    "ISO/IEC 17024",
    "ISO/IEC 17021",
    "ISO/IEC 17065",
    "ISO/IEC 17020",
    "ISO/IEC 17043",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AAA — American Accreditation Association",
    description:
      "Independent, international accreditation programs that provide globally accepted confidence of the competence for the accredited organizations.",
    url: "/about",
    type: "website",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "American Accreditation Association",
  alternateName: "AAA",
  url: "https://aaa-accreditation.org",
  logo: "https://aaa-accreditation.org/logo/AAA-Logo.png",
  description:
    "AAA is the American Accreditation Association, authorized by the State Corporation Commission of the Commonwealth of Virginia under Title 13.1 of the Code of Virginia to offer a full range of comprehensive accreditation services.",
  knowsAbout: [
    "Healthcare Accreditation",
    "Training Providers Accreditation",
    "Schools Accreditation",
    "Testing & Calibration Laboratories (ISO/IEC 17025)",
    "Medical Laboratories (ISO 15189)",
    "Personnel Certification Bodies (ISO/IEC 17024)",
    "System Certification Bodies (ISO/IEC 17021)",
    "Product Certification Bodies (ISO/IEC 17065)",
    "Inspection Bodies (ISO/IEC 17020)",
    "Proficiency Testing Providers (ISO/IEC 17043)",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      <AboutHero />
      <AboutCompetencies />
      <AboutVisionMission />
      <AboutObjectives />
      <AboutPillars />
      <AboutManagement />
      <CTA />
    </>
  );
}
