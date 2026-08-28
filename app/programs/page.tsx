import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "../_components/Icon";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, SITE_URL } from "../../lib/seo";
import { CAB_SCHEMES, FACTS, PROGRAMS } from "../../lib/facts";

/**
 * `/programs` index.
 *
 * This URL 404'd until Aug 2026 even though it is the obvious parent of every
 * `/programs/*` page — visitors trimming the URL, and crawlers inferring the
 * hierarchy, both hit a dead end. It now lists every accreditation program AAA
 * offers, in one place.
 */

export const metadata: Metadata = pageMeta({
  title: "Accreditation Programs",
  description: `Every accreditation program offered by the American Accreditation Association — healthcare, conformity assessment bodies, training providers, schools and SMEs, across ${FACTS.countriesLabel}.`,
  path: "/programs",
});

const SECTORS: {
  icon: IconName;
  href: string;
  label: string;
  standard: string;
  text: string;
}[] = [
  {
    icon: "shield",
    href: PROGRAMS.healthcare.href,
    label: PROGRAMS.healthcare.label,
    standard: PROGRAMS.healthcare.standard,
    text: "Accreditation for hospitals, clinics, laboratories and healthcare facilities against standards assessed by ISQua's External Evaluation Association.",
  },
  {
    icon: "clipboard",
    href: PROGRAMS.cab.href,
    label: PROGRAMS.cab.label,
    standard: PROGRAMS.cab.standard,
    text: "Accreditation of certification bodies, inspection bodies, laboratories and proficiency testing providers against the ISO/IEC 17000 series.",
  },
  {
    icon: "scale",
    href: PROGRAMS.training.href,
    label: PROGRAMS.training.label,
    standard: PROGRAMS.training.standard,
    text: "Independent recognition for training organizations, course providers and continuing-education programs delivering to international learners.",
  },
  {
    icon: "globe",
    href: PROGRAMS.sme.href,
    label: PROGRAMS.sme.label,
    standard: PROGRAMS.sme.standard,
    text: "An independent accreditation and Business Readiness Score that turns an SME's operational and financial health into evidence lenders and partners trust.",
  },
  {
    icon: "clipboard",
    href: PROGRAMS.school.href,
    label: PROGRAMS.school.label,
    standard: PROGRAMS.school.standard,
    text: "Whole-school accreditation covering governance, curriculum, teaching and learning, student services and continual improvement.",
  },
];

export default function ProgramsIndexPage() {
  return (
    <div className="axp">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Accreditation Programs", path: "/programs" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AAA accreditation programs",
            itemListElement: [...SECTORS, ...CAB_SCHEMES].map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.label,
              url: `${SITE_URL}${p.href}`,
            })),
          },
        ]}
      />

      <PageHero
        image="/hero.jpg"
        eyebrow="Accreditation Programs"
        badge="Accreditation Programs"
        title={
          <>
            Every AAA accreditation <em>program</em>
          </>
        }
        intro="AAA accredits organizations against internationally recognized standards — in healthcare, conformity assessment, education and training, and small and medium enterprises. Choose the program that matches your organization."
        crumbs={[{ label: "Accreditation Programs" }]}
        caption={{ kicker: "American Accreditation Association", title: "Recognized worldwide" }}
        meta={[
          { k: "Sector programs", v: "5" },
          { k: "Conformity schemes", v: String(CAB_SCHEMES.length) },
          { k: "Countries served", v: FACTS.countriesPlus },
          { k: "Accredited organizations", v: FACTS.organizations },
        ]}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
            <Link href="/quote" className="ax-btn ax-btn-ghost">
              Request a Quote
            </Link>
          </>
        }
      />

      {/* ------------------------------------------------ Sector programs -- */}
      <section className="ax-section">
        <div className="container">
          <div className="ax-head">
            <span className="eyebrow">By sector</span>
            <h2>Sector accreditation programs</h2>
            <p>
              Each program applies the requirements of its anchor standard to a specific kind of
              organization. If you are unsure which fits, tell us what you do and we will confirm
              the applicable scheme before you apply.
            </p>
            <span className="ax-rule" />
          </div>

          <div className="ax-grid" style={{ marginTop: 34 }}>
            {SECTORS.map((s, i) => (
              <Link className="ax-card" href={s.href} key={s.href}>
                <div className="ax-card-top">
                  <span className="ax-card-ico ax-ico">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="ax-card-no">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{s.label}</h3>
                <p>{s.text}</p>
                <span className="ax-card-go">
                  {s.standard} <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------ Conformity assessment schemes */}
      <section className="ax-section cream">
        <div className="container">
          <div className="ax-head">
            <span className="eyebrow">By standard</span>
            <h2>Conformity assessment schemes</h2>
            <p>
              Accreditation of the bodies that themselves certify, inspect or test — assessed
              against the relevant standard in the ISO/IEC 17000 series.
            </p>
            <span className="ax-rule" />
          </div>

          <div className="ax-grid four tight" style={{ marginTop: 34 }}>
            {CAB_SCHEMES.map((s) => (
              <Link className="ax-tile" href={s.href} key={s.href}>
                <span className="ax-tile-ico ax-ico">
                  <Icon name="shield" size={20} />
                </span>
                <span>
                  <b>{s.shortLabel}</b>
                  <span>{s.standard}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Not sure which program?"
        title="Tell us what your organization does"
        text="Describe your activities, your intended scope and the countries you operate in. We will confirm the applicable program and requirements, then come back with a tailored quote."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/contact", label: "Talk to an assessor" }}
      />
    </div>
  );
}
