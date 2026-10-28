import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../_components/site/Glyph";
import { breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import "./about-accreditation.css";

/*
 * About Accreditation — rebuilt Oct 2026 on the client's final cumulative
 * package (Hero → What Is Accreditation? + What Accreditation Delivers →
 * Accreditation vs Certification → How the Accreditation Process Works →
 * Final CTA), rendered in the AAA design system.
 *
 * Approved decisions applied: no testimonial section on this page (kept
 * educational and non-repetitive); final CTA = Explore Accreditation Programs
 * + Contact AAA.
 *
 * The hero is hand-built on the `.ax-hero` primitives instead of PageHero so
 * the AAA accreditation symbol can be shown whole (contain, not cover) and
 * keep its alt text.
 */

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "About Accreditation",
    description:
      "What accreditation is, what it delivers, how it differs from certification, and how the AAA accreditation process works from application to renewal.",
    path: "/about-accreditation",
    keywords: [
      "what is accreditation",
      "accreditation vs certification",
      "accreditation process",
      "benefits of accreditation",
      "accreditation scope",
      "American Accreditation Association",
    ],
  });
}

const DELIVERS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "check-circle",
    title: "Builds Trust",
    text: "Provides stakeholders with greater confidence through independent assessment.",
  },
  {
    icon: "award",
    title: "Demonstrates Quality & Competence",
    text: "Shows that defined requirements have been evaluated within the accredited scope.",
  },
  {
    icon: "trending-up",
    title: "Strengthens Performance",
    text: "Encourages organizations to review systems, identify gaps, and improve consistency.",
  },
  {
    icon: "shield-check",
    title: "Supports Risk Management",
    text: "Promotes structured controls, accountability, and attention to areas that may affect quality or performance.",
  },
  {
    icon: "refresh",
    title: "Encourages Continual Improvement",
    text: "Supports an ongoing approach to maintaining requirements and improving organizational effectiveness.",
  },
];

const ROWS = ["Purpose", "Focus", "Outcome", "Examples"] as const;

const COMPARE: { key: string; icon: GlyphName; label: string; rows: Record<(typeof ROWS)[number], string> }[] = [
  {
    key: "accreditation",
    icon: "award",
    label: "Accreditation",
    rows: {
      Purpose:
        "Provides independent recognition that an organization or body meets defined accreditation requirements within a specified scope.",
      Focus:
        "Assesses competence and conformity with the requirements applicable to the accreditation program and scope.",
      Outcome: "Accreditation is granted for a defined scope when applicable accreditation requirements are met.",
      Examples:
        "Healthcare organizations, training and education providers, laboratories, inspection bodies, certification bodies, and other organizations covered by accreditation programs.",
    },
  },
  {
    key: "certification",
    icon: "certificate",
    label: "Certification",
    rows: {
      Purpose:
        "Provides independent confirmation that specified requirements have been met for a management system, product, service, process, or person.",
      Focus: "Assesses conformity with the requirements of the relevant certification standard or scheme.",
      Outcome: "Certification is granted when the applicable certification requirements are met.",
      Examples: "ISO 9001 management system certification, product certification, and personnel certification.",
    },
  },
];

const STEPS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "clipboard",
    title: "Application",
    text: "The organization submits its application and defines the proposed accreditation scope.",
  },
  {
    icon: "file-text",
    title: "Document Review",
    text: "Relevant documentation is reviewed against the applicable accreditation requirements.",
  },
  {
    icon: "search-check",
    title: "Assessment",
    text: "Qualified assessors evaluate conformity with the applicable requirements through the appropriate assessment activities.",
  },
  {
    icon: "wrench",
    title: "Findings & Corrective Action",
    text: "Where findings are identified, the organization addresses them and provides the required evidence.",
  },
  {
    icon: "gavel",
    title: "Accreditation Decision",
    text: "Assessment results are independently reviewed and an accreditation decision is made.",
  },
  {
    icon: "repeat",
    title: "Monitoring & Renewal",
    text: "Accreditation is maintained through the applicable monitoring, reassessment, and renewal requirements.",
  },
];

export default function AboutAccreditationPage() {
  return (
    <div className="axp acc">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About AAA", path: "/about" },
          { name: "About Accreditation", path: "/about-accreditation" },
        ])}
      />

      {/* 01 — Hero */}
      <section className="ax-hero v2 acc-hero">
        <div className="axh-aura" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="container">
          <div className="ax-hero-grid">
            <div className="ax-hero-copy">
              <nav className="ax-crumbs axh-in" style={{ "--d": 0 } as React.CSSProperties} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/about">About AAA</Link>
                <span aria-hidden="true">/</span>
                <strong>About Accreditation</strong>
              </nav>

              <span className="ax-hero-badge axh-in" style={{ "--d": 1 } as React.CSSProperties}>
                <i aria-hidden="true" />
                About Accreditation
              </span>

              <h1 className="axh-in" style={{ "--d": 2 } as React.CSSProperties}>About Accreditation</h1>

              <p className="ax-hero-lead axh-in" style={{ "--d": 3 } as React.CSSProperties}>
                <span className="acc-tagline">
                  Understanding how accreditation builds confidence in quality, competence, and performance.
                </span>
                Accreditation provides independent assurance that an organization operates in accordance with defined
                standards and demonstrates the competence, systems, and practices required within its scope.
              </p>

              <div className="ax-actions axh-in" style={{ "--d": 4 } as React.CSSProperties}>
                <Link href="/programs" className="ax-btn ax-btn-gold">
                  Explore Accreditation Programs <Glyph name="arrow-right" size={14} strokeWidth={2} />
                </Link>
                <Link href="/contact" className="ax-btn ax-btn-ghost">
                  Contact AAA
                </Link>
              </div>

              <ul className="acc-chips axh-in" style={{ "--d": 5 } as React.CSSProperties} aria-label="What accreditation stands for">
                <li>
                  <Glyph name="check-circle" size={16} /> Independent Assessment
                </li>
                <li>
                  <Glyph name="file-check" size={16} /> Evidence-Based Decisions
                </li>
                <li>
                  <Glyph name="target" size={16} /> Greater Confidence
                </li>
              </ul>
            </div>

            <div className="ax-hero-visual acc-hero-visual axh-in" style={{ "--d": 3 } as React.CSSProperties}>
              <figure className="acc-symbol">
                <Image
                  src="/images/site/about-accreditation/aaa-accreditation-symbol.webp"
                  alt="AAA Accredited Organization symbol"
                  width={1772}
                  height={1181}
                  sizes="(max-width: 980px) 90vw, 560px"
                  priority
                />
              </figure>
            </div>
          </div>
        </div>
        <span className="axh-rule" aria-hidden="true" />
      </section>

      {/* 02 — What is accreditation + what it delivers */}
      <section className="ax-section" id="what-is-accreditation">
        <div className="container acc-what">
          <div className="acc-what-copy">
            <SectionHead
              eyebrow="What Is Accreditation?"
              title="Independent Recognition of Quality and Competence"
              intro="Accreditation provides a structured, independent way to evaluate whether an organization meets defined requirements and demonstrates the competence and systems expected within its scope."
            />
            <div className="ax-prose reveal">
              <p>
                Accreditation is a structured and independent evaluation process used to determine whether an
                organization meets defined requirements and demonstrates the competence, systems, and practices necessary
                to operate effectively within its accredited scope.
              </p>
              <p>
                It provides stakeholders with greater confidence that the organization has been assessed against
                established criteria through a formal and impartial process.
              </p>
            </div>
            <blockquote className="acc-pull reveal">
              <strong>Accreditation is more than a certificate.</strong>
              <span>
                It represents independent assessment, evidence-based evaluation, and an ongoing commitment to meeting
                applicable requirements and continual improvement.
              </span>
            </blockquote>
            <p className="ax-note reveal acc-scope-note">
              <Glyph name="lightbulb" size={18} />
              <span>
                Accreditation applies to a defined scope and does not automatically mean that every activity performed
                by an organization is accredited.
              </span>
            </p>
          </div>

          <aside className="acc-delivers reveal" aria-labelledby="acc-delivers-h">
            <div className="acc-delivers-head">
              <span className="acc-kicker">Why Accreditation Matters</span>
              <h3 id="acc-delivers-h">What Accreditation Delivers</h3>
            </div>
            <ul className="acc-delivers-list">
              {DELIVERS.map((d) => (
                <li key={d.title}>
                  <span className="ax-card-ico">
                    <Glyph name={d.icon} />
                  </span>
                  <div>
                    <b>{d.title}</b>
                    <span>{d.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* 03 — Accreditation vs certification */}
      <section className="ax-section cream" id="accreditation-vs-certification">
        <div className="container">
          <SectionHead
            center
            eyebrow="Accreditation vs Certification"
            title="Understanding the Difference"
            intro="The terms are often confused, but they serve different purposes."
          />

          <div className="acc-compare reveal">
            <span className="acc-vs" aria-hidden="true">
              vs
            </span>
            {COMPARE.map((c) => (
              <article key={c.key} className={`acc-col acc-col-${c.key}`}>
                <header className="acc-col-head">
                  <span className="ax-card-ico">
                    <Glyph name={c.icon} />
                  </span>
                  <h3>{c.label}</h3>
                </header>
                <dl>
                  {ROWS.map((r) => (
                    <div key={r} className="acc-row">
                      <dt>{r}</dt>
                      <dd>{c.rows[r]}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="ax-blue-grid two acc-roles">
            <NavyCard icon="landmark" title="AAA's Role">
              <p>
                The American Accreditation Association provides accreditation to organizations across different sectors
                and programs, within defined accreditation scopes.
              </p>
            </NavyCard>
            <NavyCard icon="target" title="Accreditation Applies to a Defined Scope">
              <p>
                An organization&apos;s accreditation should not be interpreted as covering activities, services,
                programs, or areas outside its approved accreditation scope.
              </p>
            </NavyCard>
          </div>
        </div>
      </section>

      {/* 04 — How the accreditation process works */}
      <section className="ax-section" id="accreditation-process">
        <div className="container">
          <SectionHead
            center
            eyebrow="The Accreditation Journey"
            title="How the Accreditation Process Works"
            intro="While the exact process may vary by accreditation program and scope, the journey generally follows a structured sequence from application through ongoing monitoring and renewal."
          />

          <div className="acc-prestep reveal">
            <span className="acc-prestep-ico" aria-hidden="true">
              <Glyph name="compass" />
            </span>
            <p>
              <strong>Not sure where to start?</strong> Our accreditation team can help you identify the program and
              pathway that best fits your organization.
            </p>
            <Link href="/contact" className="ax-btn ax-btn-ghost-navy sm">
              Contact AAA <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>

          <ol className="acc-rail">
            {STEPS.map((s, i) => (
              <li key={s.title} className="acc-rail-step">
                <span className="acc-rail-node" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <NavyCard compact icon={s.icon} title={s.title}>
                  <p>{s.text}</p>
                </NavyCard>
              </li>
            ))}
          </ol>

          <p className="ax-note gold reveal acc-ongoing">
            <Glyph name="refresh" size={18} />
            <span>
              <strong>Accreditation is an ongoing commitment.</strong>
              Maintaining accreditation requires continued conformity with applicable requirements and participation in
              the monitoring and renewal activities relevant to the accreditation program.
            </span>
          </p>
        </div>
      </section>

      {/* 05 — Final CTA */}
      <CTA
        eyebrow="Take the Next Step"
        title="Ready to Begin Your Accreditation Journey?"
        text={
          <>
            Explore AAA accreditation programs or speak with our team to identify the accreditation pathway that best
            fits your organization, sector, and scope.
            <span className="acc-cta-note">
              Our team can help you understand the appropriate program, application requirements, and next steps.
            </span>
          </>
        }
        primary={{ href: "/programs", label: "Explore Accreditation Programs" }}
        secondary={{ href: "/contact", label: "Contact AAA" }}
      />
    </div>
  );
}
