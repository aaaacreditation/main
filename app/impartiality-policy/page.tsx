import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import "./impartiality-policy.css";

export const metadata = pageMeta({
  title: "Safeguarding Impartiality Policy",
  description:
    "AAA's policy on impartiality, transparency, objectivity and independence — how risks to impartiality are identified, evaluated, treated and monitored.",
  path: "/impartiality-policy",
  keywords: [
    "impartiality policy",
    "accreditation impartiality",
    "conflict of interest accreditation body",
    "AAA governance",
  ],
});

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

const VALUES: { title: string; text: string }[] = [
  {
    title: "Impartiality",
    text: "Decisions are taken on evidence against published requirements — not on relationships, revenue or reputation.",
  },
  {
    title: "Transparency",
    text: "Requirements, policies and the routes for complaint and appeal are published and open to every stakeholder.",
  },
  {
    title: "Objectivity",
    text: "Assessment findings rest on what the evidence shows, and are reviewed independently before a decision.",
  },
  {
    title: "Independence",
    text: "AAA does not consult for the bodies it accredits, and does not perform the conformity assessment work they perform.",
  },
];

const MECHANISMS: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Internal audits",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </>
    ),
  },
  {
    label: "External audits",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    label: "Management reviews",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 3.5-4 3 2.5L20 7" />
      </>
    ),
  },
  {
    label: "Complaints & satisfaction surveys",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
];

const CYCLE: { verb: string; text: string }[] = [
  { verb: "Analyze", text: "Every identified risk to impartiality is analyzed in the context of the activity and the relationships that give rise to it." },
  { verb: "Evaluate", text: "Risks are evaluated to establish their significance and whether any residual risk remains after treatment." },
  { verb: "Treat", text: "Controls are applied to bring identified risks within an acceptable level of risk." },
  { verb: "Monitor", text: "Treated risks stay under monitoring, so a control that stops working is caught rather than assumed." },
];

/**
 * The six commitments, verbatim from the AAA Safeguarding Impartiality Policy.
 * The short headings are labels for navigation — the policy text is unchanged.
 */
const MEASURES: { title: string; text: string }[] = [
  {
    title: "Conflicts of interest are managed, not tolerated",
    text: "Manages conflict of interest and any potential conflict of interest in our decision-making processes.",
  },
  {
    title: "No consultancy, no conformity assessment work",
    text: "Avoids the provision of services that affect its impartiality, such as consultancy services or suggesting the use of consultants, and does not participate in or offer any conformity assessment services that conformity assessment bodies perform.",
  },
  {
    title: "Non-discriminatory access to accreditation",
    text: "Is non-discriminatory, where its services are offered to all conformity assessment bodies (CABs) in a fair and equitable manner regardless of size, membership of any association or groups, the number of organizations already accredited, or whether from the public sector or private sector, provided that the application is within the scope of accreditation as offered.",
  },
  {
    title: "An impartial complaints and appeals procedure",
    text: "Ensures an impartial complaints and appeals procedure which is open to all stakeholders.",
  },
  {
    title: "Training that stays generic",
    text: "Avoids compromising its impartiality and status in training service delivery, by offering generic training courses which do not give specific advice for the development of an organization's operations, and furthermore, not offering training courses as a precondition or guarantee of accreditation.",
  },
  {
    title: "Support for developing accreditation bodies only",
    text: "Only offers support, training and twinning opportunities to other developing accreditation bodies in terms of meeting the necessary criteria for obtaining international recognition.",
  },
];

const FAQ = [
  {
    q: "What is AAA's impartiality policy?",
    a: "Safeguarding impartiality, transparency, objectivity and independence of all AAA operations and accreditation activities is paramount to instilling confidence and trust in the integrity of AAA services to its clients and stakeholders. Top management of AAA undertakes to uphold these values.",
  },
  {
    q: "How does AAA identify risks to its impartiality?",
    a: "AAA continuously evaluates the risks to impartiality arising from its activities and from any conflicts arising from its or its personnel's relationships and interactions with other organizations, through various mechanisms such as internal and external audits, management reviews, complaints and customer satisfaction surveys.",
  },
  {
    q: "What happens if a risk to impartiality cannot be mitigated?",
    a: "AAA analyzes, evaluates, treats and monitors all identified risks, and determines whether any residual risks are within an acceptable level of risk. Accreditation shall not be provided in areas where an unacceptable level of risk is identified, and which cannot be mitigated to an acceptable level.",
  },
  {
    q: "Does AAA provide consultancy to the organizations it accredits?",
    a: "No. AAA avoids the provision of services that affect its impartiality, such as consultancy services or suggesting the use of consultants, and does not participate in or offer any conformity assessment services that conformity assessment bodies perform.",
  },
  {
    q: "Does AAA offer training to applicants?",
    a: "AAA avoids compromising its impartiality and status in training service delivery by offering generic training courses which do not give specific advice for the development of an organization's operations. Training courses are never offered as a precondition or guarantee of accreditation.",
  },
  {
    q: "Can anyone complain or appeal against an AAA decision?",
    a: "Yes. AAA ensures an impartial complaints and appeals procedure which is open to all stakeholders.",
  },
];

export default function Page() {
  return (
    <main className="axp impx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Safeguarding Impartiality Policy", path: "/impartiality-policy" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/about/leadership.jpg"
        eyebrow="Impartiality"
        badge="Policy · Upheld by top management"
        title={
          <>
            Safeguarding <em>impartiality.</em>
          </>
        }
        intro="An accreditation body is only worth the independence behind its decisions. This is the policy that governs AAA's impartiality, transparency, objectivity and independence — and what happens when a risk to any of them cannot be brought to an acceptable level."
        crumbs={[{ label: "Safeguarding Impartiality Policy" }]}
        caption={{
          kicker: "AAA top management",
          title: "Undertaking to uphold impartiality, transparency, objectivity and independence",
          chip: "Public policy",
        }}
        meta={[
          { k: "Policy owner", v: "Top management" },
          { k: "Scope", v: "All operations" },
          { k: "Risk review", v: "Continuous" },
          { k: "Appeals open to", v: "All stakeholders" },
        ]}
        actions={
          <>
            <a href="#commitments" className="ax-btn ax-btn-gold">
              Read the six commitments <Icon name="arrow" size={14} />
            </a>
            <Link href="/contact" className="ax-btn ax-btn-ghost">
              Raise a complaint or appeal
            </Link>
          </>
        }
      />

      {/* 01 — Policy statement */}
      <section className="ax-section" id="statement">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Policy statement</span>
                <h2>The undertaking, in AAA&rsquo;s own words.</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p style={{ marginTop: 24 }}>
                Impartiality is not a section of the AAA management system that sits alongside the
                rest of it. It is the condition on which every accreditation decision depends: if
                the assessment could have gone another way because of a relationship, a fee or a
                favour, the accreditation is worthless to the client and to everyone relying on it.
              </p>
              <p>
                This policy applies to all AAA operations and accreditation activities, and is
                upheld by AAA top management.
              </p>
              <div className="ax-actions">
                <Link href="/advisory-committees" className="ax-btn ax-btn-ghost-navy">
                  Technical governance <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>

            <figure className="ax-quote reveal">
              <span className="ax-ico ax-quote-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.6 6.4v3.2c-1.7.5-2.6 1.6-2.7 3.4H9.6V18H3.9v-5c0-3.9 1.9-6.1 5.7-6.6zm10.5 0v3.2c-1.7.5-2.6 1.6-2.7 3.4h2.7V18h-5.7v-5c0-3.9 1.9-6.1 5.7-6.6z" />
                </svg>
              </span>
              <blockquote>
                Safeguarding impartiality, transparency, objectivity and independence of all AAA
                operations and accreditation activities are paramount to instilling confidence and
                trust in the integrity of AAA services to its clients and stakeholders. Top
                management of AAA undertakes to uphold these values.
              </blockquote>
              <figcaption className="ax-quote-person">
                <strong>AAA Safeguarding Impartiality Policy</strong>
                <span>American Accreditation Association · Tysons Corner, Virginia</span>
              </figcaption>
            </figure>
          </div>

          <ul className="impx-values reveal" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {VALUES.map((v) => (
              <li className="impx-value" key={v.title}>
                <b>{v.title}</b>
                <span>{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 — Risk management */}
      <section className="ax-section navy" id="risk">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Managing the risk</span>
            <h2>Risks to impartiality are looked for, not waited for.</h2>
            <p>
              AAA continuously evaluates the risks to impartiality arising from its activities and
              from any conflicts arising from its or its personnel&rsquo;s relationships and
              interactions with other organizations.
            </p>
          </div>

          <span className="ax-label">
            Where the evidence comes from
          </span>
          <ul className="impx-mechs reveal">
            {MECHANISMS.map((m) => (
              <li className="impx-mech" key={m.label}>
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon>{m.icon}</LineIcon>
                </span>
                {m.label}
              </li>
            ))}
          </ul>

          <span className="ax-label">
            What happens to every risk identified
          </span>
          <ol className="impx-cycle reveal">
            {CYCLE.map((c) => (
              <li key={c.verb}>
                <b>{c.verb}</b>
                <span>{c.text}</span>
              </li>
            ))}
          </ol>

          <div className="ax-note red impx-alert reveal">
            <span className="ax-ico" aria-hidden="true">
              <LineIcon strokeWidth={2}>
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                <path d="M12 9v4M12 17h.01" />
              </LineIcon>
            </span>
            <span>
              <strong>The rule that has teeth</strong>
              AAA analyzes, evaluates, treats and monitors all identified risks, and determines
              whether any residual risks are within an acceptable level of risk.{" "}
              <strong className="impx-alert-rule">
                Accreditation shall not be provided in areas where an unacceptable level of risk is
                identified, and which cannot be mitigated to an acceptable level.
              </strong>
            </span>
          </div>
        </div>
      </section>

      {/* 03 — The six commitments */}
      <section className="ax-section" id="commitments">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">How this is achieved</span>
            <h2>Six commitments applied to every policy and procedure.</h2>
            <p>
              This will be achieved by applying AAA&rsquo;s policies and procedures in a manner
              that:
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <ol className="ax-reasons">
            {MEASURES.map((m, i) => (
              <li className="ax-reason reveal" key={m.title}>
                <span className="ax-reason-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Complaints & appeals */}
      <section className="ax-section cream" id="appeals">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Complaints &amp; appeals</span>
                <h2>Open to all stakeholders — not only to applicants.</h2>
                <p>
                  An impartial complaints and appeals procedure is one of the six commitments
                  above, and it is deliberately not limited to the organizations AAA accredits.
                  Anyone with a stake in an accredited service can use it.
                </p>
              </div>
              <ul className="ax-checks">
                <li>Complaints and appeals are handled through a procedure open to all stakeholders</li>
                <li>Complaints feed the continuous evaluation of risks to impartiality</li>
                <li>
                  Customer satisfaction surveys and management reviews are treated as impartiality
                  evidence, not just service feedback
                </li>
              </ul>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 9h8M8 13h5" />
                </LineIcon>
              </span>
              <h3>Raise a complaint or appeal</h3>
              <p>
                Contact the AAA team with the organization concerned, the accreditation scope, and
                what you would like reviewed. Complaints about impartiality are handled through the
                same impartial procedure as any other.
              </p>
              <Link href="/contact" className="ax-btn ax-btn-blue">
                Contact AAA <Icon name="arrow" size={14} />
              </Link>
              <p className="ax-panel-note">
                American Accreditation Association · 8609 Westwood Center Drive, Tysons Corner, VA
                22182, USA · +1 (571) 601 2616 · info@aaa-accreditation.org
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Related documents</li>
                <li>
                  <a
                    href="https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </LineIcon>
                    </span>
                    General requirements for accreditation
                    <i>PDF</i>
                  </a>
                </li>
                <li>
                  <Link href="/advisory-committees">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
                      </LineIcon>
                    </span>
                    Advisory Technical Committees
                    <i>Governance</i>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </LineIcon>
                    </span>
                    Privacy Policy
                    <i>Legal</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 05 — FAQ */}
      <section className="ax-section" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Impartiality, answered.</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQ.map((item, i) => (
              <details className="ax-faq-item reveal" key={item.q} open={i === 0}>
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
        eyebrow="Independent by design"
        title={
          <>
            Accreditation you can <em>rely on.</em>
          </>
        }
        text="Independence is what makes an accreditation certificate mean something. Tell us about your organization and our team will scope your accreditation journey."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Contact AAA" }}
        related={[
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/advisory-committees", label: "Advisory committees" },
          { href: "/documents", label: "Document library" },
          { href: "/privacy", label: "Privacy policy" },
        ]}
      />
    </main>
  );
}
