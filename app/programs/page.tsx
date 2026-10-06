import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../_components/site/Glyph";
import { pageMeta, breadcrumbSchema, SITE_URL } from "../../lib/seo";
import { FACTS, PROGRAMS } from "../../lib/facts";

/**
 * `/programs` index — the destination of every "Explore Accreditation
 * Programs" button. Oct 2026: rebuilt on the client's program structure (four
 * primary pathways from the homepage, eight conformity-assessment programs
 * from the CAB hub), using the client's own card copy and the SME blue card.
 */

export const metadata: Metadata = pageMeta({
  title: "Accreditation Programs",
  description: `Accreditation programs from the American Accreditation Association for education and training, healthcare, conformity assessment bodies and SMEs across ${FACTS.countriesPlus} countries.`,
  path: "/programs",
});

const PRIMARY: { icon: GlyphName; href: string; title: string; text: string }[] = [
  {
    icon: "graduation",
    href: PROGRAMS.training.href,
    title: "Education & Training",
    text: "Accreditation for training providers, academies, educational institutions and learning organizations seeking to strengthen credibility and demonstrate quality.",
  },
  {
    icon: "heart-pulse",
    href: PROGRAMS.healthcare.href,
    title: "Healthcare",
    text: "Accreditation for healthcare organizations seeking to improve quality, safety, performance and confidence across clinical and support services.",
  },
  {
    icon: "shield-check",
    href: PROGRAMS.cab.href,
    title: "Conformity Assessment",
    text: "Accreditation for certification bodies, inspection bodies, laboratories and other conformity assessment organizations operating against international standards.",
  },
  {
    icon: "trending-up",
    href: PROGRAMS.sme.href,
    title: "SMEs",
    text: "A structured accreditation pathway for small and medium enterprises committed to stronger systems, continuous improvement and business readiness.",
  },
];

const CAB: { icon: GlyphName; p: { href: string; shortLabel: string; standard: string }; text: string }[] = [
  {
    icon: "flask",
    p: PROGRAMS.testingLabs,
    text: "For laboratories performing testing or sampling activities that require technically valid, reliable, and traceable results.",
  },
  {
    icon: "gauge",
    p: PROGRAMS.calibrationLabs,
    text: "For laboratories performing calibration activities to establish measurement accuracy, traceability, and confidence in results.",
  },
  {
    icon: "search-check",
    p: PROGRAMS.iso17020,
    text: "For organizations examining products, equipment, installations, processes, or services against specified requirements.",
  },
  {
    icon: "file-check",
    p: PROGRAMS.iso17021,
    text: "For bodies certifying management systems such as quality, environmental, information security, or occupational health and safety systems.",
  },
  {
    icon: "id-card",
    p: PROGRAMS.iso17024,
    text: "For organizations certifying the competence of individuals against defined requirements or certification schemes.",
  },
  {
    icon: "microscope",
    p: PROGRAMS.iso15189,
    text: "For laboratories providing medical examination services that support diagnosis, screening, treatment, and patient care.",
  },
  {
    icon: "package",
    p: PROGRAMS.iso17065,
    text: "For bodies certifying products, processes, or services, including applicable Halal certification programs.",
  },
  {
    icon: "chart",
    p: PROGRAMS.iso17043,
    text: "For organizations designing and operating proficiency testing schemes that help laboratories evaluate and improve their performance.",
  },
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AAA accreditation programs",
  itemListElement: [...PRIMARY.map((p) => ({ name: p.title, href: p.href })), ...CAB.map((c) => ({ name: c.p.shortLabel, href: c.p.href }))].map(
    (p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}${p.href}` })
  ),
};

export default function ProgramsPage() {
  return (
    <div className="axp">
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Accreditation Programs", path: "/programs" }]), itemList]} />

      <PageHero
        eyebrow="Accreditation Programs"
        crumbs={[{ label: "Accreditation Programs" }]}
        title="Find the Right Accreditation Program"
        intro="Choose the pathway that matches your organization type and quality objectives. AAA provides accreditation across education, healthcare, conformity assessment and SME sectors."
        actions={
          <>
            <Link href="/contact" className="ax-btn ax-btn-gold">
              Talk to an Accreditation Expert <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <Link href="/apply" className="ax-btn ax-btn-ghost">
              Apply for Accreditation
            </Link>
          </>
        }
        meta={[
          { k: "Countries", v: FACTS.countriesPlus },
          { k: "Accredited organizations", v: FACTS.organizations },
          { k: "Assessors & experts", v: FACTS.assessors },
        ]}
      />

      <section className="ax-section" id="pathways">
        <div className="container">
          <SectionHead center eyebrow="Accreditation Pathways" title="Four Accreditation Pathways" />
          <div className="ax-blue-grid four">
            {PRIMARY.map((p, i) => (
              <NavyCard key={p.href} icon={p.icon} no={String(i + 1).padStart(2, "0")} title={p.title} href={p.href} cta="Explore Program">
                <p>{p.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-section cream" id="conformity-assessment">
        <div className="container">
          <SectionHead
            center
            eyebrow="Conformity Assessment Programs"
            title="Choose Your Accreditation Program"
            intro="Select the accreditation program that best matches your organization’s activities. Each program is based on a specific international standard and designed for a particular type of conformity assessment body."
          />
          <div className="ax-blue-grid four">
            {CAB.map((c) => (
              <NavyCard key={c.p.href} icon={c.icon} tag={c.p.standard} title={c.p.shortLabel} href={c.p.href}>
                <p>{c.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Not sure where to start?"
        title="Not sure which program is right for your organization?"
        text="Speak with the AAA team and we will guide you toward the most suitable accreditation pathway."
        primary={{ href: "/contact", label: "Talk to an Accreditation Expert" }}
        secondary={{ href: "/apply", label: "Apply for Accreditation" }}
      />
    </div>
  );
}
