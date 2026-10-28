import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../_components/site/Glyph";
import { breadcrumbSchema, SITE_URL } from "../../lib/seo";
import { seoPage } from "../../lib/seo-overrides";
import { FACTS, PROGRAMS } from "../../lib/facts";
import "./programs.css";

/**
 * `/programs` index — the destination of every "Explore Accreditation
 * Programs" button. Oct 2026: rebuilt on the client's program structure (the
 * four primary pathways from the homepage), using the client's own card copy
 * and the SME blue card. The eight-program "Choose Your Accreditation Program"
 * grid was removed at the client's request (Oct 22 2026); those programs are
 * still listed on the Conformity Assessment Bodies hub.
 */

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Accreditation Programs",
    description: `Accreditation programs from the American Accreditation Association for education and training, healthcare, conformity assessment bodies and SMEs across ${FACTS.countriesPlus} countries.`,
    path: "/programs",
  });
}

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

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AAA accreditation programs",
  itemListElement: PRIMARY.map((p) => ({ name: p.title, href: p.href })).map(
    (p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}${p.href}` })
  ),
};

export default function ProgramsPage() {
  return (
    <div className="axp prgx">
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Accreditation Programs", path: "/programs" }]), itemList]} />

      <PageHero
        eyebrow="Accreditation Programs"
        background="/images/site/programs/programs-hero.jpg"
        imageAlt="Monarch Master Injectors training cohort holding an accreditation certificate"
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
