import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import ApplyForm from "./ApplyForm";
import "./apply.css";

export const metadata: Metadata = pageMeta({
  title: "Apply for AAA Accreditation",
  description:
    "The four stages of AAA accreditation — application, document review, on-site assessment and decision — plus the application form for every AAA program.",
  path: "/apply",
});

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

function LineIcon({ children, strokeWidth = 1.7 }: { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// The four stages are the client's own published accreditation process,
// transcribed from the live "Apply for Accreditation" page.
const STAGES: { cap: string; title: string; items: string[]; icon: React.ReactNode }[] = [
  {
    cap: "Stage 01",
    title: "Application",
    items: [
      "You send the accreditation application form to AAA",
      "You pay the application fees",
      "AAA issues a letter confirming your accreditation is in process",
    ],
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
      </>
    ),
  },
  {
    cap: "Stage 02",
    title: "Document Review",
    items: [
      "AAA reviews your application and the related documents",
      "AAA sends you a Document Review Compliance Report",
      "You revise your documents according to the review results (if needed)",
    ],
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    cap: "Stage 03",
    title: "Assessment",
    items: [
      "AAA defines the assessment dates and assessment team",
      "AAA conducts the on-site assessment visit",
      "AAA sends an assessment report with a recommendation for accreditation",
      "You implement corrective actions (if needed)",
      "The accreditation committee reviews the file for decision",
    ],
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5M8.5 11l1.8 1.8L14 9" />
      </>
    ),
  },
  {
    cap: "Stage 04",
    title: "Decision",
    items: [
      "The accreditation decision is taken",
      "AAA issues an accreditation certificate valid for 2 years",
      "Your organization is registered in the American Directory of Competent Personnel (ADCP)",
    ],
    icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8M9.5 9l1.7 1.7L15 7" />
      </>
    ),
  },
];

// Application forms hosted on the AAA site — preserved exactly.
const FORMS: { ttl: string; href: string }[] = [
  {
    ttl: "Training providers",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-training-providers.doc",
  },
  {
    ttl: "Testing / calibration laboratories",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-testing-cal-labs.doc",
  },
  {
    ttl: "Medical laboratories",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-for-accreditation-of-medical-labs.doc",
  },
  {
    ttl: "Personnel certification bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-personnel-certfication.doc",
  },
  {
    ttl: "System / product certification bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc",
  },
  {
    ttl: "Inspection bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-Inspection-Bodies.doc",
  },
  {
    ttl: "PT providers",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-PT-providers.doc",
  },
];

// Public requirements documents, as linked from the ISO/IEC 17021-1 program page.
const DOCUMENTS: { label: string; href: string; meta: string }[] = [
  {
    label: "General requirements for accreditation",
    href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
    meta: "PDF",
  },
  {
    label: "Requirements for use of accreditation symbols",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
    meta: "PDF",
  },
  {
    label: "Accreditation of multi-site conformity assessment bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
    meta: "PDF",
  },
];

const PREPARE = [
  "Legal registration documents for the applicant entity",
  "Your management system documentation for the applicable standard",
  "The scope you want accredited — tests, methods, technical sectors or schemes",
  "Competence records for the personnel performing the accredited activity",
  "A list of the sites and locations to be covered",
  "Records showing the activity has been performed and internally reviewed",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How do I apply for AAA accreditation?",
    a: "Download the application form for your accreditation program, complete it with your organization's details and requested scope, and send it to AAA with the application fees. AAA then issues a letter confirming that your accreditation is in process.",
  },
  {
    q: "Is the process the same for every program?",
    a: "Although there may be certain differences from one application request to the other, the general process remains the same for all candidate bodies: application, document review, assessment, decision.",
  },
  {
    q: "How long is the accreditation certificate valid?",
    a: "The accreditation certificate issued at the decision stage is valid for 2 years, subject to continued compliance with AAA's accreditation requirements.",
  },
  {
    q: "What happens if the assessment identifies findings?",
    a: "You implement corrective actions and submit supporting evidence. The accreditation committee then reviews the complete file — assessment report, corrective actions and evidence — before the accreditation decision is taken.",
  },
  {
    q: "What is the ADCP?",
    a: "The American Directory of Competent Personnel. Once the accreditation decision is taken, your organization is registered in the ADCP, which is how third parties can verify that an accreditation is genuine and current.",
  },
  {
    q: "Do I need a quote before I apply?",
    a: "Not necessarily, but most organizations start there. A quote scopes the assessment and sets out the applicable fees, so you know what Stage 1 commits you to before you send the signed application form.",
  },
  {
    q: "Can a newly established organization apply?",
    a: "Yes, provided it has implemented its management system and can demonstrate operational capability, competent personnel and records showing the activity being accredited has actually been performed.",
  },
  {
    q: "Which application form do I need?",
    a: "Choose the form that matches your program: training providers, testing and calibration laboratories, medical laboratories, personnel certification bodies, system or product certification bodies, inspection bodies, or proficiency testing providers. If you are unsure, ask an advisor before you complete anything.",
  },
];

export default function Page() {
  return (
    <main className="axp apx">
      <JsonLd
        schema={[breadcrumbSchema([{ name: "Apply", path: "/apply" }]), faqSchema(FAQ)]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/about/assessment.jpg"
        eyebrow="Apply"
        badge="Apply · Four assessment stages"
        title={
          <>
            Apply for <em>accreditation.</em>
          </>
        }
        intro="Although there may be certain differences from one application request to the other, the general process remains the same for all candidate bodies: application, document review, assessment, decision. Here is what each stage involves — and the form to start it."
        crumbs={[{ label: "Apply" }]}
        meta={[
          { k: "Process stages", v: "4" },
          { k: "Certificate validity", v: "2 years" },
          { k: "Countries served", v: "58" },
          { k: "Accredited organizations", v: "200+" },
        ]}
        caption={{
          kicker: "AAA assessment team",
          title: "On-site assessment against the applicable international standard",
          chip: "Stage 03",
        }}
      />

      {/* 02 — Start your application (overlaps the hero) */}
      <section className="apx-start" id="start">
        <div className="container">
          <div className="apx-card reveal">
            <div className="apx-card-copy">
              <span className="eyebrow">Start here</span>
              <h2>Start your application</h2>
              <p>
                Tell us who is applying and what you want accredited. An advisor will confirm the
                correct program, send the right application form, and list the documents to prepare.
              </p>
              <ul className="apx-card-points">
                <li>Confirms which program and standard applies to you</li>
                <li>Reply within two business days</li>
                <li>You receive the correct application form and document checklist</li>
              </ul>
              <p className="apx-card-aside">
                Already know your program? Go straight to the{" "}
                <Link href="#forms">application forms</Link> — or{" "}
                <a href={CONSULT} target="_blank" rel="noopener noreferrer">
                  book a 30-minute consultation
                </a>{" "}
                first.
              </p>
            </div>
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* 03 — The four stages */}
      <section className="ax-section" id="process">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Accreditation process</span>
            <h2>What are the steps to get accreditation?</h2>
            <p>
              Four stages, the same for every candidate body — from the application you send us to
              the independent decision that puts your organization on the register.
            </p>
          </div>

          <div className="ax-grid four">
            {STAGES.map((s, i) => (
              <article className="ax-card apx-stage reveal" key={s.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon>{s.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="apx-stage-cap">{s.cap}</span>
                <h3>{s.title}</h3>
                <ul className="ax-checks">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="ax-note gold reveal" style={{ marginTop: 28 }}>
            <span className="ax-ico" style={{ width: 20, height: 20, color: "var(--aaa-gold-700)" }} aria-hidden="true">
              <LineIcon strokeWidth={2}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M11 12h1v4h1" />
              </LineIcon>
            </span>
            <span>
              <strong>Accreditation is a cycle, not a one-off visit.</strong>
              The certificate issued at Stage 04 is valid for 2 years, and your organization is
              registered in the American Directory of Competent Personnel (ADCP) so third parties
              can verify it.
            </span>
          </div>
        </div>
      </section>

      {/* 04 — Application forms */}
      <section className="ax-section cream" id="forms">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Application forms</span>
            <h2>Application forms for accreditation</h2>
            <p>
              Choose the form that matches your accreditation program, complete it, and send it to
              AAA with your supporting documents and application fees.
            </p>
          </div>

          <ul className="apx-forms reveal">
            {FORMS.map((f) => (
              <li key={f.href}>
                <a className="apx-form-link" href={f.href} target="_blank" rel="noopener noreferrer">
                  <span className="ax-ico apx-form-ico" aria-hidden="true">
                    <LineIcon>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                    </LineIcon>
                  </span>
                  <span>
                    <b>{f.ttl}</b>
                    <span className="meta">DOC · Accreditation application form</span>
                  </span>
                  <span className="apx-form-dl">
                    Download
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Before you submit */}
      <section className="ax-section" id="prepare">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Before you submit</span>
            <h2>What to have ready</h2>
            <p>
              Document review is Stage 02 for a reason: the completeness of what you send with the
              application form is the biggest single influence on how quickly you reach assessment.
            </p>
          </div>

          <div className="ax-split top">
            <div className="reveal">
              <span className="ax-label">Send with your application</span>
              <ul className="ax-checks gold">
                {PREPARE.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="ax-note" style={{ marginTop: 24 }}>
                <span>
                  <strong>Additional requirements may apply.</strong>
                  Technical requirements vary by program and requested scope. The AAA accreditation
                  team will confirm anything further that applies to your application.
                </span>
              </div>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M9 13h6M9 17h4" />
                </LineIcon>
              </span>
              <h3>Read the requirements first</h3>
              <p>
                AAA publishes the requirements it assesses against. Reading them before you apply is
                the cheapest possible preparation.
              </p>
              <Link href="/documents" className="ax-btn ax-btn-blue">
                All public documents
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <ul className="ax-docs">
                <li className="ax-docs-title">Core requirements</li>
                {DOCUMENTS.map((d) => (
                  <li key={d.href}>
                    <a href={d.href} target="_blank" rel="noopener noreferrer">
                      <span className="ax-ico" aria-hidden="true">
                        <LineIcon strokeWidth={2}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                        </LineIcon>
                      </span>
                      {d.label}
                      <i>{d.meta}</i>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="ax-panel-note">
                Not sure which program applies to you? An advisor will confirm it before you
                complete any form.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 06 — After the decision */}
      <section className="ax-section navy" id="after">
        <div className="container">
          <div className="ax-split even top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">After the decision</span>
                <h2>What accreditation gives your organization</h2>
                <p>
                  A positive accreditation decision is the start of the relationship, not the end of
                  it. Accreditation has to be maintained, and it has to be verifiable by the people
                  who rely on it.
                </p>
              </div>
              <ul className="ax-checks">
                <li>An accreditation certificate valid for 2 years, with an approved scope</li>
                <li>Registration in the American Directory of Competent Personnel (ADCP)</li>
                <li>The right to use AAA accreditation symbols under the published requirements</li>
                <li>Independent recognition that supports market access and procurement</li>
              </ul>
              <div className="ax-actions">
                <Link href="/directory/accredited-organizations" className="ax-btn ax-btn-white">
                  See accredited organizations
                </Link>
                <a
                  href="https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ax-btn ax-btn-ghost"
                >
                  Use of accreditation symbols
                </a>
              </div>
            </div>

            <div className="ax-steps-panel reveal">
              <h3>Maintaining accreditation</h3>
              <ol className="ax-steps">
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    1
                  </span>
                  <div className="ax-step-body">
                    <b>Keep operating to the standard</b>
                    <span>
                      Accreditation confirms competence at a point in time; maintaining it means the
                      management system keeps working between assessments.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    2
                  </span>
                  <div className="ax-step-body">
                    <b>Tell AAA about significant changes</b>
                    <span>
                      Changes to your legal status, sites, personnel or the scope of the accredited
                      activity have to be notified so the accreditation stays accurate.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    3
                  </span>
                  <div className="ax-step-body">
                    <b>Reassessment before expiry</b>
                    <span>
                      Ahead of the certificate&rsquo;s two-year expiry, AAA reassesses the
                      organization so accreditation continues without a gap.
                    </span>
                  </div>
                </li>
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </LineIcon>
                </span>
                Accreditation certificate valid for 2 years
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about applying</h2>
            <p>
              Forms, fees, findings and what happens once the accreditation decision has been taken.
            </p>
          </div>
          <div className="ax-faq-list reveal">
            {FAQ.map((item, i) => (
              <details className="ax-faq-item" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="International Accreditation … Accepted Globally"
        title="Ready to send your application?"
        text="Download the form for your program, or start with a quote so you know exactly what Stage 1 commits your organization to."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/contact", label: "Talk to an advisor" }}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All CAB programs" },
          { href: "/documents", label: "Requirements & documents" },
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
        ]}
      />
    </main>
  );
}
