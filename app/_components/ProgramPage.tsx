import Link from "next/link";
import PageHero from "./PageHero";
import Icon from "./Icon";
import CTA from "./CTA";

/**
 * Editorial template for the conformity-assessment program pages.
 *
 * Aug 2026: rebuilt on the `.ax-*` design system so these pages read like the
 * client-approved /programs/iso-17021 page instead of a plain text column.
 * The prop API is unchanged, plus optional `hero`, `faq` and `metrics`.
 */
export default function ProgramPage({
  eyebrow = "Accreditation Program",
  standard,
  title,
  intro,
  overview,
  whoFor,
  scope,
  scopeHeading = "Scope of accreditation",
  benefits,
  documents,
  documentsHeading = "Related documents",
  related,
  hero = "/hero.jpg",
  heroCaption,
  metrics,
  faq,
  process,
}: {
  eyebrow?: string;
  standard?: string;
  title: React.ReactNode;
  intro: string;
  overview?: string[];
  whoFor?: string[];
  scope?: string[];
  scopeHeading?: string;
  benefits?: string[];
  documents?: { label: string; href: string; meta?: string }[];
  documentsHeading?: string;
  related?: { href: string; label: string }[];
  hero?: string;
  heroCaption?: { kicker: string; title: string; chip?: string };
  metrics?: { v: string; k: string }[];
  faq?: { q: string; a: string }[];
  process?: { t: string; d: string }[];
}) {
  const plainTitle = typeof title === "string" ? title : "Program";

  const DEFAULT_PROCESS = [
    { t: "Application", d: "Submit the application form with your scope, sites and supporting management-system documentation." },
    { t: "Document review", d: "AAA reviews your submission against the anchor standard and confirms the assessment plan and team." },
    { t: "Assessment", d: "Qualified assessors evaluate conformity on site, remotely or in a hybrid arrangement, including witnessing where required." },
    { t: "Corrective action", d: "Any findings are addressed and evidence of effective correction is reviewed and accepted." },
    { t: "Accreditation decision", d: "An independent decision panel grants accreditation and issues the certificate and scope schedule." },
    { t: "Surveillance", d: "Annual surveillance keeps the accreditation live across the three-year cycle, followed by reassessment." },
  ];

  const steps = process ?? DEFAULT_PROCESS;

  return (
    <>
      <PageHero
        image={hero}
        eyebrow={eyebrow}
        badge={standard ?? eyebrow}
        title={title}
        intro={intro}
        crumbs={[
          { href: "/programs/conformity-assessment-bodies", label: "Programs" },
          { label: plainTitle },
        ]}
        caption={heroCaption ?? { kicker: "AAA accreditation", title: plainTitle, chip: standard }}
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
        meta={
          metrics
            ? metrics.map((m) => ({ k: m.k, v: m.v }))
            : standard
              ? [
                  { k: "Anchor standard", v: standard },
                  { k: "Accreditation cycle", v: "3 years" },
                  { k: "Surveillance", v: "Annual" },
                  { k: "Assessment modes", v: "On-site · Hybrid · Remote" },
                ]
              : undefined
        }
      />

      {/* ---------------------------------------------------- Overview ---- */}
      {overview && overview.length > 0 && (
        <section className="ax-section ax-section-first">
          <div className="container">
            <div className="ax-split top wide-left">
              <div>
                <div className="ax-head">
                  <span className="eyebrow">Program overview</span>
                  <h2>What this accreditation covers</h2>
                  <span className="ax-rule" />
                </div>
                <div className="ax-prose" style={{ marginTop: 24 }}>
                  {overview.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>

              <aside className="ax-panel">
                <span className="ax-panel-ico ax-ico">
                  <Icon name="clipboard" size={28} />
                </span>
                <h3>Start your application</h3>
                <p>
                  Send us your scope and we will confirm the applicable requirements, the
                  assessment plan and the fees before you commit.
                </p>
                <Link href="/apply" className="ax-btn ax-btn-blue">
                  Apply for Accreditation <Icon name="arrow" size={14} />
                </Link>
                <p className="ax-panel-note">
                  Prefer to talk first? <Link href="/contact" className="ax-link">Book a call with an assessor</Link>.
                </p>

                {documents && documents.length > 0 && (
                  <ul className="ax-docs">
                    <li className="ax-docs-title">{documentsHeading}</li>
                    {documents.map((d) => (
                      <li key={d.label}>
                        <a href={d.href}>
                          <span className="ax-ico"><Icon name="doc" size={16} /></span>
                          {d.label}
                          {d.meta && <i>{d.meta}</i>}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------ Who / benefits -- */}
      {((whoFor && whoFor.length > 0) || (benefits && benefits.length > 0)) && (
        <section className="ax-section fade">
          <div className="container">
            <div className="ax-split even top">
              {whoFor && whoFor.length > 0 && (
                <div>
                  <span className="ax-label">Who this program is for</span>
                  <ul className="ax-checks">
                    {whoFor.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
              {benefits && benefits.length > 0 && (
                <div>
                  <span className="ax-label">Benefits of AAA accreditation</span>
                  <ul className="ax-checks gold">
                    {benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- Scope ---- */}
      {scope && scope.length > 0 && (
        <section className="ax-section">
          <div className="container">
            <div className="ax-head">
              <span className="eyebrow">Scope</span>
              <h2>{scopeHeading}</h2>
              <span className="ax-rule" />
            </div>
            <div className="ax-grid" style={{ marginTop: 34 }}>
              {scope.map((s, i) => (
                <article className="ax-card" key={s}>
                  <div className="ax-card-top">
                    <span className="ax-card-ico ax-ico">
                      <Icon name="shield" size={22} />
                    </span>
                    <span className="ax-card-no">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p style={{ marginTop: 16, fontSize: 14.5, color: "var(--ink-700)" }}>{s}</p>
                  <span className="ax-card-rule" />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- Process ---- */}
      <section className="ax-section cream">
        <div className="container">
          <div className="ax-split wide-left top">
            <div className="ax-steps-panel">
              <h3>The accreditation process</h3>
              <ol className="ax-steps">
                {steps.map((s, i) => (
                  <li className="ax-step" key={s.t}>
                    <span className="ax-step-num">{i + 1}</span>
                    <span className="ax-step-body">
                      <b>{s.t}</b>
                      <span>{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico"><Icon name="shield" size={14} /></span>
                Accreditation is valid for 3 years, with annual surveillance
              </span>
            </div>

            <div className="ax-panel">
              <span className="ax-panel-ico ax-ico">
                <Icon name="doc" size={28} />
              </span>
              <h3>{documentsHeading}</h3>
              <p>
                Everything you need to prepare your submission — forms, checklists and the
                general requirements that apply to every AAA accreditation.
              </p>
              {documents && documents.length > 0 ? (
                <ul className="ax-docs">
                  {documents.map((d) => (
                    <li key={d.label}>
                      <a href={d.href}>
                        <span className="ax-ico"><Icon name="doc" size={16} /></span>
                        {d.label}
                        {d.meta && <i>{d.meta}</i>}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link href="/documents" className="ax-btn ax-btn-ghost-navy">
                  Browse all documents <Icon name="arrow" size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FAQ ---- */}
      {faq && faq.length > 0 && (
        <section className="ax-section">
          <div className="container">
            <div className="ax-head center">
              <span className="eyebrow">Questions</span>
              <h2>Frequently asked questions</h2>
              <p>Common questions about this AAA accreditation program.</p>
            </div>
            <div className="ax-faq-list">
              {faq.map((f) => (
                <details className="ax-faq-item" key={f.q}>
                  <summary>
                    {f.q}
                    <span className="ax-faq-plus" aria-hidden="true" />
                  </summary>
                  <div className="ax-faq-a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        eyebrow="Next step"
        title={<>Ready to apply for {standard ? <span className="ax-nowrap">{standard}</span> : "this"} accreditation?</>}
        text="Tell us about your organization, your intended scope and the sites involved. We will confirm the applicable requirements and come back with a tailored quote."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/quote", label: "Request a Quote" }}
        related={related}
      />
    </>
  );
}
