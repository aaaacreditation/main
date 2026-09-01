import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import QuoteForm from "./QuoteForm";
import "./quote.css";

export const metadata: Metadata = pageMeta({
  title: "Request an Accreditation Quote",
  description:
    "Tell AAA your standard, sites and scope and an accreditation advisor will price your assessment. No obligation, and a reply within two business days.",
  path: "/quote",
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

/* What actually drives the size of an accreditation assessment. */
const FACTORS: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Standard and program",
    text: "ISO/IEC 17025, ISO 15189, ISO/IEC 17020, ISO/IEC 17021-1, ISO/IEC 17024, ISO/IEC 17065, ISO/IEC 17043, healthcare or training accreditation — each has its own assessment requirements.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    title: "Scope of accreditation",
    text: "The number of methods, tests, technical sectors or certification schemes you want covered is the single biggest driver of assessment effort.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18M3 12h18" />
      </>
    ),
  },
  {
    title: "Sites and locations",
    text: "Single site, multi-site or a network of branches. Multi-site bodies are assessed against AAA's published multi-site requirements.",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    title: "Size and complexity",
    text: "Personnel numbers, shift patterns, subcontracted activities and the complexity of your management system all affect assessment time.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Assessment team and travel",
    text: "The assessor and technical-expert profile needed for your scope, and the geography the team has to reach, are priced transparently.",
    icon: (
      <>
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <circle cx="12" cy="12" r="10" />
      </>
    ),
  },
  {
    title: "The accreditation cycle",
    text: "A quote covers the full cycle — initial assessment, surveillance during the accreditation period, and reassessment before the certificate expires.",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 3v6h-6" />
      </>
    ),
  },
];

const AFTER: { title: string; text: string }[] = [
  {
    title: "We read your request",
    text: "An accreditation advisor reviews the program, country, sites and scope you described and checks whether anything is missing.",
  },
  {
    title: "We ask, rather than assume",
    text: "If the scope is unclear — a method list, a technical sector, a transfer from another accreditation body — we come back with questions before pricing.",
  },
  {
    title: "You receive a written quote",
    text: "The quote sets out the assessment activities, the accreditation cycle they cover and the applicable fees.",
  },
  {
    title: "You decide, with no obligation",
    text: "Ask for a call to walk through the quote, revise the scope, or simply keep it on file. Nothing starts until you send the application.",
  },
  {
    title: "You apply when you are ready",
    text: "Accepting the quote means completing the application form for your program and paying the application fees — Stage 1 of the accreditation process.",
  },
];

const PREPARE = [
  "Your legal entity name and country of registration",
  "The standard or program you want to be accredited against",
  "A draft scope — methods, tests, technical sectors or certification schemes",
  "The number of sites and locations to be covered",
  "Approximate number of personnel involved in the accredited activity",
  "Any existing accreditation or certification you hold, or are transferring",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does requesting a quote commit me to anything?",
    a: "No. A quote is a scoping document, not an application. The accreditation process only begins once you send the application form for your program and pay the application fees.",
  },
  {
    q: "How long does it take to receive a quote?",
    a: "An advisor replies within two business days. If the scope you describe needs clarification, that reply will be a short set of questions so the eventual quote is accurate rather than indicative.",
  },
  {
    q: "Why does AAA need to know my scope before quoting?",
    a: "Assessment effort is driven by what is being accredited — the number of methods, tests, technical sectors or certification schemes, the number of sites, and the competence profile the assessment team needs. Without that, any figure would be a guess.",
  },
  {
    q: "What does the quote cover?",
    a: "The quote covers the accreditation cycle: the initial assessment, the surveillance activities carried out while the accreditation is valid, and the reassessment before the certificate expires.",
  },
  {
    q: "Can I get a quote for more than one program?",
    a: "Yes. Tell us in the notes which additional programs or standards you are considering and the advisor will scope them together, which is usually more efficient than quoting them separately.",
  },
  {
    q: "We are already accredited elsewhere. Can we transfer?",
    a: "Mention it in the notes with your current accreditation body, scope and certificate expiry date. The advisor will explain what evidence AAA needs and how the transfer affects the assessment.",
  },
  {
    q: "I would rather talk it through first.",
    a: "Book a free 30-minute consultation with an accreditation advisor. It is often the fastest way to settle the scope before any numbers are put on paper.",
  },
];

export default function Page() {
  return (
    <main className="axp qtx">
      <JsonLd
        schema={[breadcrumbSchema([{ name: "Get a Quote", path: "/quote" }]), faqSchema(FAQ)]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/hero.jpg"
        eyebrow="Get a Quote"
        badge="Quote request · No obligation"
        title={
          <>
            Get a quote for <em>your accreditation.</em>
          </>
        }
        intro="Accreditation is priced against what is actually being assessed — your standard, your scope, your sites. Tell us those three things and an advisor will come back with a quote built for your organization rather than a price list."
        crumbs={[{ label: "Get a Quote" }]}
        meta={[
          { k: "Typical reply", v: "2 days" },
          { k: "Countries served", v: "58" },
          { k: "Assessors & experts", v: "100+" },
          { k: "Accredited organizations", v: "200+" },
        ]}
        caption={{
          kicker: "American Accreditation Association",
          title: "International accreditation, accepted globally",
          chip: "No obligation",
        }}
      />

      {/* 02 — The form (overlaps the hero) */}
      <section className="qtx-request" id="request">
        <div className="container">
          <div className="qtx-card reveal">
            <div className="qtx-card-copy">
              <span className="eyebrow">Request a quote</span>
              <h2>Tell us what needs accrediting</h2>
              <p>
                Six answers are enough to start. The more precisely you can describe your scope, the
                closer the first quote will be to the final one.
              </p>
              <ul className="qtx-card-points">
                <li>Reviewed by an accreditation advisor, not an automated calculator</li>
                <li>Reply within two business days</li>
                <li>Covers the full accreditation cycle, not just the first visit</li>
                <li>No obligation — a quote is not an application</li>
              </ul>
              <p className="qtx-card-aside">
                Not sure which program applies to you?{" "}
                <a href={CONSULT} target="_blank" rel="noopener noreferrer">
                  Book a 30-minute consultation
                </a>{" "}
                or browse the{" "}
                <Link href="/programs/conformity-assessment-bodies">accreditation programs</Link>{" "}
                first.
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* 03 — How a quote is built */}
      <section className="ax-section" id="how-priced">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">How pricing works</span>
            <h2>What shapes an accreditation quote</h2>
            <p>
              There is no flat fee for accreditation, because no two accreditation scopes are the
              same. These are the factors an advisor weighs when scoping your assessment.
            </p>
          </div>

          <div className="ax-grid three">
            {FACTORS.map((f, i) => (
              <article className="ax-card reveal" key={f.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon>{f.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — What happens next + what to prepare */}
      <section className="ax-section cream" id="what-next">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">After you send the form</span>
            <h2>From request to a quote you can act on</h2>
            <p>
              A short, predictable sequence — and a clear line between getting a price and starting
              the accreditation process.
            </p>
          </div>

          <div className="ax-split top">
            <div className="ax-steps-panel reveal">
              <h3>What happens next</h3>
              <ol className="ax-steps">
                {AFTER.map((s, i) => (
                  <li className="ax-step" key={s.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="ax-step-body">
                      <b>{s.title}</b>
                      <span>{s.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </LineIcon>
                </span>
                Advisor reply within two business days
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                  <path d="M9 11V5a3 3 0 0 1 6 0v6M9 16h6" />
                </LineIcon>
              </span>
              <h3>Have these to hand</h3>
              <p>
                None of it is mandatory to send the form — but the more of this you can include, the
                fewer follow-up questions stand between you and a firm price.
              </p>
              <ul className="ax-checks gold">
                {PREPARE.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ul className="ax-docs">
                <li className="ax-docs-title">Useful before you ask</li>
                <li>
                  <Link href="/documents">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </LineIcon>
                    </span>
                    Accreditation requirements &amp; public documents
                    <i>Docs</i>
                  </Link>
                </li>
                <li>
                  <Link href="/apply">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                      </LineIcon>
                    </span>
                    Application forms and the four assessment stages
                    <i>Apply</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 05 — What a quote covers */}
      <section className="ax-section navy" id="covers">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Scope of the quote</span>
            <h2>What your quote does and does not cover</h2>
            <p>
              Accreditation fees pay for competent assessment, not for consultancy. AAA is an
              accreditation body: we assess, we do not advise on how to build the system we later
              assess.
            </p>
          </div>

          <div className="qtx-scope-cols reveal">
            <div>
              <h3>Included</h3>
              <ul className="ax-checks">
                <li>Application handling and document review</li>
                <li>The on-site accreditation assessment</li>
                <li>Review of corrective actions and supporting evidence</li>
                <li>The independent accreditation decision</li>
                <li>Issue of the accreditation certificate and approved scope</li>
                <li>Surveillance and reassessment across the accreditation cycle</li>
              </ul>
            </div>
            <div>
              <h3>Not included</h3>
              <ul className="ax-checks">
                <li>Consultancy on designing or implementing your management system</li>
                <li>Training your personnel to meet the standard</li>
                <li>Preparing your documentation on your behalf</li>
                <li>Any activity that would compromise AAA&rsquo;s impartiality</li>
              </ul>
            </div>
          </div>

          <div className="ax-actions">
            <Link href="/impartiality-policy" className="ax-btn ax-btn-ghost">
              Read the impartiality policy
            </Link>
            <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a consultation
            </a>
          </div>
        </div>
      </section>

      {/* 06 — FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about quotes and fees</h2>
            <p>
              What a quote commits you to, how long it takes, and why AAA asks about scope before
              pricing.
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
        eyebrow="Ready when you are"
        title="Have your quote? The next step is the application."
        text="Accepting a quote means sending the application form for your program and paying the application fees — Stage 1 of AAA's four-stage accreditation process."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to an advisor" }}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All CAB programs" },
          { href: "/documents", label: "Requirements & documents" },
          { href: "/faq", label: "Full FAQ" },
        ]}
      />
    </main>
  );
}
