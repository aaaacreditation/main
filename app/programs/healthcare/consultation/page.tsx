import Image from "next/image";
import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../../lib/seo";
import { ArrowIcon, ClusterNav, HC_CONSULT, HC_EMAIL, LineIcon, hcRelated } from "../cluster";
import "../hc.css";

const SELF = "/programs/healthcare/consultation";
const PHONE = "+1 (571) 601 2616";
const PHONE_HREF = "+15716012616";

export const metadata = pageMeta({
  title: "Healthcare Consulting Services for Accreditation",
  description:
    "AAA healthcare consulting: gap analysis, documentation support, staff training, operational improvement, mock surveys and continuous compliance strategy.",
  path: SELF,
  keywords: [
    "healthcare accreditation consulting",
    "gap analysis healthcare",
    "mock accreditation survey",
    "accreditation preparation support",
  ],
});

/* Services transcribed from AAA's "Healthcare Consulting Services for AAA
   Healthcare Accreditation" guide. */
const SERVICES: { title: string; points: { lead: string; text: string }[]; icon: React.ReactNode }[] = [
  {
    title: "Gap analysis",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5M8.5 12.5v-2M11 12.5v-4M13.5 12.5v-3" />
      </>
    ),
    points: [
      {
        lead: "Assessment of current practices",
        text: "Evaluate existing policies, procedures and compliance with AAA standards to identify areas for improvement and highlight gaps in quality, safety and regulatory compliance. It is the key first step, ensuring your organization is fully prepared for the accreditation review.",
      },
    ],
  },
  {
    title: "Preparation and documentation support",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </>
    ),
    points: [
      { lead: "Policy development", text: "Assistance creating and updating essential policies and procedures." },
      { lead: "Documentation organization", text: "Help compiling the documentation needed for the accreditation review." },
    ],
  },
  {
    title: "Staff training and engagement",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 16v5M7 8h6M7 11h4" />
      </>
    ),
    points: [
      {
        lead: "Accreditation standards training",
        text: "Workshops that educate staff on AAA requirements and expectations.",
      },
      { lead: "Team engagement", text: "Fostering a culture of quality and compliance among all employees." },
    ],
  },
  {
    title: "Operational improvement",
    icon: (
      <>
        <path d="M3 21h18M6 21V12M11 21V7M16 21v-6M21 21V4" />
      </>
    ),
    points: [
      { lead: "Process optimization", text: "Streamlining workflows to enhance efficiency and patient care." },
      {
        lead: "Performance metrics",
        text: "Implementing key performance indicators (KPIs) to monitor ongoing compliance.",
      },
    ],
  },
  {
    title: "Mock surveys",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 13 1.5 1.5L14 11M9 18h6" />
      </>
    ),
    points: [
      {
        lead: "Simulated accreditation surveys",
        text: "Practice surveys that prepare the organization for the real assessment.",
      },
      {
        lead: "Feedback and recommendations",
        text: "Actionable insights from the mock surveys so you can address identified weaknesses effectively and keep improving.",
      },
    ],
  },
  {
    title: "Continuous compliance strategy",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 3v6h-6M9 12l2 2 4-4" />
      </>
    ),
    points: [
      {
        lead: "Continuous support",
        text: "A plan for maintaining compliance after accreditation, with ongoing support and guidance.",
      },
      {
        lead: "Re-accreditation preparation",
        text: "A timeline and processes for future accreditation cycles.",
      },
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What consulting services does AAA offer?",
    a: "Gap analysis, preparation and documentation support, staff training and engagement, operational improvement, mock surveys, and a continuous compliance strategy covering post-accreditation support and re-accreditation preparation.",
  },
  {
    q: "Do we have to use AAA consulting to be accredited?",
    a: "No. Consulting is an optional stage. AAA provides consulting services if you need help preparing — you are assigned a dedicated healthcare consultant who guides you step by step, whether you are at the beginning of the journey or near the end.",
  },
  {
    q: "What does a gap analysis actually produce?",
    a: "An assessment of your current practices against the AAA standards, highlighting gaps in quality, safety and regulatory compliance, and identifying the specific areas that need improvement or modification before an accreditation review.",
  },
  {
    q: "What is a mock survey?",
    a: "A simulated accreditation survey conducted to prepare your organization for the real assessment, followed by actionable feedback and recommendations so you can address any remaining weaknesses before the official survey.",
  },
  {
    q: "Does support continue after accreditation is granted?",
    a: "Yes. The continuous compliance strategy sets out a plan for maintaining compliance post-accreditation, with ongoing support and guidance, plus a timeline and processes for future accreditation cycles.",
  },
];

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
            { name: "Consultation Services", path: SELF },
          ]),
          serviceSchema({
            name: "Healthcare Accreditation Consulting Services",
            description:
              "Gap analysis, preparation and documentation support, staff training, operational improvement, mock surveys and continuous compliance strategy for healthcare organizations preparing for AAA accreditation.",
            path: SELF,
            audience: "Hospitals and healthcare organizations",
          }),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        eyebrow="Consultation Services"
        badge="Consulting · Healthcare accreditation"
        title={
          <>
            Healthcare consulting that gets you <em>survey-ready.</em>
          </>
        }
        intro="AAA is the only healthcare accreditation body that will ensure you achieve accreditation through approved consultants who guide you step by step — taking you from the first stage, or from wherever you are today, until AAA healthcare accreditation is granted."
        crumbs={[
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "Consultation Services" },
        ]}
        actions={
          <>
            <a href={HC_CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-gold">
              Book a Free Consultation <ArrowIcon />
            </a>
            <Link href="/contact" className="ax-btn ax-btn-ghost">
              Contact the healthcare team
            </Link>
          </>
        }
        meta={[
          { k: "Key consulting services", v: "6" },
          { k: "Dedicated consultant", v: "1:1" },
          { k: "Support after accreditation", v: "Ongoing" },
        ]}
      />

      {/* Framing */}
      <section className="ax-section" id="approach">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">How we work with you</span>
                <h2>
                  Guidance that goes <em>past the checklist.</em>
                </h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p>
                Approved AAA consultants provide gap analysis, training, and a full walk-through of
                the standards — making sure they are understood and genuinely applicable inside your
                facility, not simply filed.
              </p>
              <p>
                You are assigned a dedicated healthcare consultant who guides you through the process
                step by step, whether you are at the very beginning of the accreditation journey or
                close to the end of it.
              </p>
              <ul className="ax-checks gold">
                <li>A dedicated consultant, committed to your facility&apos;s specific needs</li>
                <li>Step-by-step guidance from wherever you are today</li>
                <li>Training tailored to your staff and services</li>
                <li>A strong customer care team alongside you throughout</li>
              </ul>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/about/team-advisory.jpg"
                alt="Consultants and healthcare managers reviewing policies and performance data together"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Optional stage</span>
              <figcaption>
                Consulting is optional — but it is the fastest route through the standards.
                <span>Available before, during and after accreditation</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="ax-section cream" id="services">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Key consulting services offered</span>
            <h2>Six services, one route to accreditation</h2>
            <p>
              Take all six, or just the one you need. Each is scoped against the AAA Accreditation
              Standards for Healthcare Facilities.
            </p>
          </div>

          <div className="ax-grid three">
            {SERVICES.map((s, i) => (
              <article className="ax-card hc-phase reveal" key={s.title} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon>{s.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{s.title}</h3>
                <ul className="ax-checks">
                  {s.points.map((p) => (
                    <li key={p.lead}>
                      <span>
                        <strong>{p.lead}: </strong>
                        {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Where it fits in the journey */}
      <section className="ax-section navy" id="when">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Where consulting fits</span>
            <h2>Optional stages, alongside the formal process</h2>
            <p>
              Consulting runs in parallel with the four accreditation stages. It does not replace the
              survey — it makes sure you are ready for it.
            </p>
          </div>

          <div className="ax-grid three">
            <article className="ax-card reveal">
              <h3>Before you apply</h3>
              <p>
                Gap analysis against the standards, so you know the size of the work before you commit
                to a survey date.
              </p>
            </article>
            <article className="ax-card reveal" style={{ transitionDelay: "60ms" }}>
              <h3>While you prepare</h3>
              <p>
                Policy development, documentation support, staff training and internal mock surveys
                during the 3–6 month preparation phase.
              </p>
            </article>
            <article className="ax-card reveal" style={{ transitionDelay: "120ms" }}>
              <h3>After you are accredited</h3>
              <p>
                A continuous compliance strategy, ongoing support, and preparation for the next
                accreditation cycle.
              </p>
            </article>
          </div>

          <div className="ax-actions center">
            <Link href="/programs/healthcare/process" className="ax-btn ax-btn-ghost">
              See the full process &amp; timeline <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="ax-section" id="contact">
        <div className="container">
          <div className="ax-split even">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Contact us</span>
                <h2>
                  Start with a <em>conversation.</em>
                </h2>
                <p>
                  Tell us where your facility is today — whether that is a blank page or a nearly
                  complete evidence file — and we will tell you honestly what is left to do.
                </p>
              </div>
              <ul className="hc-contact">
                <li>
                  <span className="ax-ico" aria-hidden="true">
                    <LineIcon strokeWidth={2}>
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                    </LineIcon>
                  </span>
                  <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
                </li>
                <li>
                  <span className="ax-ico" aria-hidden="true">
                    <LineIcon strokeWidth={2}>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 6 10-6" />
                    </LineIcon>
                  </span>
                  <a href={`mailto:${HC_EMAIL}`}>{HC_EMAIL}</a>
                </li>
                <li>
                  <span className="ax-ico" aria-hidden="true">
                    <LineIcon strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </LineIcon>
                  </span>
                  <a href={HC_CONSULT} target="_blank" rel="noopener noreferrer">
                    Book a free 30-minute consultation
                  </a>
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
              <h3>What to have ready for the first call</h3>
              <p>
                None of this is mandatory — but the more you bring, the more useful the first
                conversation is.
              </p>
              <ul className="ax-checks">
                <li>The type and size of your facility, and the services it provides</li>
                <li>Any existing quality management or patient safety programme</li>
                <li>Whether you hold, or have held, any other accreditation</li>
                <li>Your target timeframe for being accredited</li>
              </ul>
              <p className="ax-panel-note">
                Consultation is provided by approved AAA consultants. Accreditation decisions remain
                with the AAA accreditation committee.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about consultation services</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQS.map((f, i) => (
              <details className="ax-faq-item" key={f.q} open={i === 0}>
                <summary>
                  <span>{f.q}</span>
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

      <ClusterNav
        current={SELF}
        cream
        eyebrow="Keep reading"
        heading="More on healthcare accreditation"
      />

      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Get a consultant on your <em>side.</em>
          </>
        }
        text="Book a free 30-minute consultation and we will scope the gap between where your facility is today and the AAA Accreditation Standards for Healthcare Facilities."
        primary={{ href: "/contact", label: "Contact the healthcare team" }}
        secondary={{ href: "/apply", label: "Apply for Accreditation" }}
        related={hcRelated(SELF)}
      />
    </main>
  );
}
