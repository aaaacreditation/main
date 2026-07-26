import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../_components/Icon";
import ReadinessLauncher from "./ReadinessLauncher";
import "./sme.css";

export const metadata: Metadata = {
  title: { absolute: "SMEs Accreditation Program | AAA" },
  description:
    "Get an independent AAA SMEs Accreditation and a Business Readiness Score stakeholders trust. Recognised in 58 countries. Take the free 2-minute check.",
};

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";
const APPLICATION_FORM = "/documents/AAA-SME-Accreditation-Application-Form.docx";

function LineIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MiniSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <path
        d="M20 10.6l2 4 4.4.6-3.2 3.1.8 4.4-4-2.1-4 2.1.8-4.4-3.2-3.1 4.4-.6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ABOUT_CARDS: { big: string; small: string; text: string }[] = [
  {
    big: "50+",
    small: "Qualified Assessors",
    text: "Experienced professionals delivering consistent, evidence-based assessments.",
  },
  {
    big: "58+",
    small: "Countries served",
    text: "Accreditation recognised by businesses and stakeholders worldwide.",
  },
  {
    big: "Published",
    small: "Accreditation Framework",
    text: "A transparent methodology that ensures consistency and impartiality.",
  },
  {
    big: "India Pilot",
    small: "Cohort Open Now",
    text: "Join the first group of SMEs shaping the future of business accreditation.",
  },
];

const SECTORS: { name: string; img: string; icon: React.ReactNode }[] = [
  { name: "Manufacturing", img: "/sectors/manufacturing.jpg", icon: <path d="M2 20h20M4 20V9l5 3V9l5 3V4l6 4v12" /> },
  {
    name: "IT & Software Services",
    img: "/sectors/it-software.jpg",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  { name: "Healthcare & Pharma", img: "/sectors/healthcare.jpg", icon: <path d="M12 5v14M5 12h14" strokeWidth={2.2} /> },
  { name: "Agri-Processing", img: "/sectors/agri.jpg", icon: <path d="M12 22c5-3 8-7 8-13V4l-8 3-8-3v5c0 6 3 10 8 13z" /> },
  { name: "Textile & Apparel", img: "/sectors/textile.jpg", icon: <path d="M6 3l6 4 6-4 3 5-4 3v10H7V11L3 8z" /> },
  { name: "Clean Energy & Greentech", img: "/sectors/clean-energy.jpg", icon: <path d="M13 2L4 14h7l-2 8 9-12h-7z" /> },
  {
    name: "Logistics & Transport",
    img: "/sectors/logistics.jpg",
    icon: (
      <path d="M1 6h13v10H1zM14 9h5l3 3v4h-8M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    ),
  },
  { name: "Construction & Engineering", img: "/sectors/construction.jpg", icon: <path d="M2 20h20M5 20V8l7-4 7 4v12M9 20v-6h6v6" /> },
  {
    name: "Retail & E-commerce",
    img: "/sectors/retail.jpg",
    icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />,
  },
  { name: "Hospitality & Food", img: "/sectors/hospitality.jpg", icon: <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 15V2a5 5 0 0 0-3 5v6z" /> },
  {
    name: "Export & Import",
    img: "/sectors/export-import.jpg",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />,
  },
];

const CATEGORIES: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Financial & Funding Readiness",
    text: "Your financial records, awareness of obligations and liabilities, what funding you need and why, and how you track cash flow and sustainability.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    title: "Operational Requirements",
    text: "Active operations and delivery, documented processes, enough resources to do the work, and clear communication with clients and stakeholders.",
    icon: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  },
  {
    title: "Management & Structure",
    text: "Legal registration, a defined organisational structure, and clear ownership and management responsibilities.",
    icon: (
      <>
        <rect x="9" y="2" width="6" height="5" rx="1" />
        <rect x="2" y="17" width="6" height="5" rx="1" />
        <rect x="16" y="17" width="6" height="5" rx="1" />
        <path d="M12 7v4M5 17v-4h14v4" />
      </>
    ),
  },
  {
    title: "Governance & Compliance",
    text: "Ethical operations, managing business risk, meeting legal and regulatory rules, and being transparent about who you are.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Market Presence & Growth",
    text: "A clear offer and target market, real customer activity, growth plans, and listening to customer feedback.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </>
    ),
  },
  {
    title: "Continuous Improvement",
    text: "Spotting what to improve, acting on feedback, fixing issues, and keeping a record of the changes you make.",
    icon: (
      <>
        <path d="M21 3v6h-6M3 21v-6h6" />
        <path d="M3.5 12a8.5 8.5 0 0 1 14.3-6.2L21 9M20.5 12a8.5 8.5 0 0 1-14.3 6.2L3 15" />
      </>
    ),
  },
];

const PROCESS: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Application",
    text: "Submit the accreditation application to AAA.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </>
    ),
  },
  {
    title: "Documents",
    text: "Send programme documents for review.",
    icon: <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  },
  {
    title: "Assessment",
    text: "Documents assessed by AAA assessors.",
    icon: (
      <>
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4h6v3H9z" />
        <path d="m9.5 14 2 2 3.5-4.5" />
      </>
    ),
  },
  {
    title: "Feedback",
    text: "Assessors share feedback; SMEs take action.",
    icon: (
      <>
        <path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-5 3.5V11.5A7.5 7.5 0 0 1 10.5 4h3A7.5 7.5 0 0 1 21 11.5z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
      </>
    ),
  },
  {
    title: "Decision",
    text: "AAA accreditation committee decides.",
    icon: (
      <>
        <path d="m13.5 12.5-8 8a1.77 1.77 0 0 1-2.5-2.5l8-8" />
        <path d="m15.5 15.5 5.5-5.5M8.5 8.5 14 3M8 9l7 7M20 11l-7-7" />
      </>
    ),
  },
];

const STORY_URL =
  "https://casestudies-alpha.vercel.app/case-studies/accreditation-impact-12-growth-500-students-certified";

const STORIES: {
  name: string;
  sector: string;
  country: string;
  metric: string;
  quote: string;
  desc: string;
  img: string;
  logo?: string;
}[] = [
  {
    name: "Cinute Digital",
    sector: "Digital Services",
    country: "Mira Bhayandar, India",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/cinute-digital-certificate.jpg",
    logo: "/case-studies/cinute-digital-logo.jpg",
  },
  {
    name: "Priority Global",
    sector: "Professional Services",
    country: "Ghaziabad, India",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/priority-global-certificate.png",
    logo: "/case-studies/priority-global-logo.png",
  },
  {
    name: "IIBMS",
    sector: "Education & Training",
    country: "Mumbai, India",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/iibms-certificate.jpg",
    logo: "/case-studies/iibms-logo.jpg",
  },
  {
    name: "Clinoxy Solutions",
    sector: "Healthcare Solutions",
    country: "Hyderabad, India",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/clinoxy-solutions-certificate.png",
    logo: "/case-studies/clinoxy-solutions-logo.png",
  },
  {
    name: "RC Growth Consultancies",
    sector: "Consulting",
    country: "Lucknow, India",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/rc-growth-consultancies-certificate.jpg",
    logo: "/case-studies/rc-growth-consultancies-logo.png",
  },
  {
    name: "Study Medic",
    sector: "Medical Education",
    country: "Qatar, India",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/study-medic-certificate.png",
    logo: "/case-studies/study-medic-logo.png",
  },
  {
    name: "Aldelma Trading",
    sector: "Trading",
    country: "Jordan, Iraq",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate supplied in the AAA case-study source.",
    img: "/case-studies/aldelma-trading-certificate.jpg",
  },
  {
    name: "Clarivate",
    sector: "Information Services",
    country: "India, USA, UK",
    metric: "AAA Accredited Organization",
    quote: "Recognised through AAA accreditation.",
    desc: "Certificate and organization identity supplied in the AAA case-study source.",
    img: "/case-studies/clarivate-certificate.jpg",
    logo: "/case-studies/clarivate-logo.jpg",
  },
  {
    name: "Domus Salutis",
    sector: "Healthcare",
    country: "Italy",
    metric: "Healthcare Accreditation",
    quote: "A healthcare organization demonstrating commitment to recognized excellence.",
    desc: "Accreditation supporting patient confidence, quality of care, and institutional recognition.",
    img: "/about/story-domus.jpg",
  },
];

const FAQ = [
  {
    q: "What is AAA SMEs accreditation?",
    a: "AAA SMEs Accreditation is a program for small and medium businesses that assesses how well your business is run and how prepared it is to grow. It helps you show credibility, build trust, and earn independent recognition for good business practices.",
  },
  {
    q: "What makes AAA different from other accreditation bodies?",
    a: "AAA focuses on business readiness, governance, and growth. Through an independent assessment, your business earns recognition based on established criteria that align with recognised accreditation principles.",
  },
  {
    q: "Who can apply for AAA SMEs accreditation?",
    a: "Any eligible small or medium enterprise can apply, across a wide range of industries. Whether you are well established or still growing, you can apply as long as you meet the mandatory accreditation requirements.",
  },
  {
    q: "How is funding readiness assessed?",
    a: "Your business is assessed across six areas: Financial & Funding Readiness, Operational Requirements, Management & Structure, Governance & Compliance, Market Presence & Growth, and Continuous Improvement. Together they show how prepared you are for funding, partnerships, and steady growth.",
  },
  {
    q: "How do I check whether my business is eligible?",
    a: "You can use the free Readiness Check above. It takes a couple of minutes and gives you an instant view of where your business stands and what to work on before you apply.",
  },
  {
    q: "How long does the accreditation process take?",
    a: "It depends on your business size, how ready you are, and the information you provide. Most assessments take typically 30 to 60 days, following a clear process of application, review, and decision.",
  },
  {
    q: "Can startups apply for accreditation?",
    a: "Yes. A startup can apply as long as it is actively operating and can show sound business practices, governance, and operational controls. Accreditation is open to SMEs at different stages, provided the business is genuinely up and running.",
  },
  {
    q: "How long is the accreditation valid?",
    a: "Your accreditation is valid for three years, as long as you continue to meet the required standards.",
  },
  {
    q: "How much does AAA SMEs accreditation cost?",
    a: "Cost depends on the size, complexity, and scope of the assessment. AAA gives each business a customised quote so the process fits its specific needs.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple. Run the free Readiness Check above, or contact AAA directly. Our team will walk you through the eligibility requirements, what to expect from the assessment, and your next steps.",
  },
];

export default function Page() {
  return (
    <main className="smex">
      {/* Section 1 — Hero */}
      <section className="smex-hero lpx-hero lpx-hero--nav">
        <div className="container lpx-hero-inner">
          <div className="smex-hero-copy reveal">
            <nav className="smex-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#programs">Programs</Link>
              <span>/</span>
              <strong>SMEs Accreditation Program</strong>
            </nav>

            <h1>SMEs Accreditation Program</h1>
            <p>
              The American Accreditation Association&rsquo;s (AAA) SMEs Accreditation Program helps
              Small and Medium Enterprises (SMEs) demonstrate credibility through an independent
              assessment of their business, governance, and operational framework. The resulting
              internationally recognised accreditation and Business Readiness Score strengthen trust
              and unlock opportunities for growth, partnerships, market expansion, and funding.
            </p>

            <div className="smex-hero-actions">
              <Link href="#readiness" className="smex-btn smex-btn-gold">
                Check Your Readiness for Free
                <Icon name="arrow" size={16} />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost">
                Book Your Consultation
              </a>
            </div>

          </div>
        </div>

        <div className="lpx-hero-media">
          <Image
            src="/hero-sme-team.png"
            alt="Two representatives holding a framed AAA Accreditation Certificate"
            fill
            priority
            sizes="(max-width: 980px) 100vw, 50vw"
          />
          <div className="lpx-hero-caption">
            <span>Evidence-led assessment</span>
            <strong>Built for real businesses</strong>
          </div>
        </div>

        <div className="smex-hero-rail" aria-label="Program principles">
          <div className="container">
            <span>U.S. headquartered</span><i>★</i>
            <span>Independent assessment</span><i>★</i>
            <span>International recognition</span><i>★</i>
            <span>Recognised in 58 countries</span>
          </div>
        </div>
      </section>

      {/* Section 2 — What is AAA SMEs Accreditation (big title over who-it-serves + sectors) */}
      <section className="smex-journey" id="about">
        <div className="container">
          <div className="smex-about-split" id="who">
            <div className="smex-about-copy reveal">
              <h2>What is SMEs Accreditation?</h2>
              <span className="smex-about-rule" aria-hidden="true" />
              <p>
                Small and Medium Enterprises (SMEs) Accreditation is an independent,
                evidence-based programme that evaluates how your business is managed across key
                areas of organisational performance.
              </p>
              <p>
                It helps SMEs demonstrate credibility, strengthen business practices, and build
                confidence with customers, partners, and financial institutions.
              </p>
            </div>
            <div className="smex-about-cards">
              {ABOUT_CARDS.map((c, i) => (
                <article className="smex-about-card reveal" key={c.big} style={{ transitionDelay: `${i * 60}ms` }}>
                  <h3>
                    <span className="t1">{c.big}</span>
                    <span className="t2">{c.small}</span>
                  </h3>
                  <span className="smex-about-card-rule" aria-hidden="true" />
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="smex-sub reveal" id="sectors">
            <h3>Accreditation Across Every Sector</h3>
            <p>
              From manufacturing to global trade, we provide accreditation solutions that uphold
              quality, safety, and excellence across all sectors.
            </p>
          </div>
        </div>

        <div className="smex-sector-strip reveal" aria-label="Industries we accredit">
          <div className="smex-sector-cols">
            {SECTORS.map((s) => (
              <div className="smex-sector-col" key={s.name}>
                <div className="smex-sector-photo">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    sizes="(max-width: 720px) 33vw, (max-width: 1100px) 17vw, 9vw"
                  />
                </div>
                <div className="smex-sector-cell">
                  <span className="smex-sector-glyph"><LineIcon>{s.icon}</LineIcon></span>
                  <span className="smex-sector-name">{s.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="smex-sector-band">
            <span className="smex-sector-band-ico" aria-hidden="true">
              <LineIcon>
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />
              </LineIcon>
            </span>
            <p>
              No matter your industry, our accreditation builds trust, ensures compliance, and
              drives sustainable growth.
            </p>
            <div className="smex-about-ctas">
              <Link href="#readiness" className="smex-btn smex-btn-gold">
                Check Your Readiness for Free <Icon name="arrow" size={16} />
              </Link>
              <Link href="#process" className="smex-btn smex-btn-ghost">
                Learn more about the process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Accreditation framework (hover-reveal cards) */}
      <section className="sme-cats" id="framework">
        <div className="container">
          <div className="smex-fw-head reveal">
            <div className="sme-head">
              <h2>6 Pillars of SMEs Accreditation</h2>
              <p>
                Your business is assessed across six weighted areas that determine your Business
                Readiness Score, using an evidence-based, consistent, impartial, risk-based, and
                proportionate assessment methodology.
              </p>
            </div>
            <figure className="smex-fw-photo">
              <Image
                src="/sme-framework-review.jpg"
                alt="AAA assessors discussing an assessment together over a laptop"
                fill
                sizes="(max-width: 1100px) 92vw, 38vw"
              />
              <figcaption>
                <span>Six weighted areas</span>
                <strong>One Business Readiness Score</strong>
              </figcaption>
            </figure>
          </div>
          <div className="sme-cats-grid">
            {CATEGORIES.map((c, i) => (
              <article
                className="smex-mvv-card reveal"
                key={c.title}
                tabIndex={0}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className="smex-mvv-in">
                  <div className="smex-mvv-top">
                    <span className="smex-mvv-ico" aria-hidden="true">
                      <LineIcon>{c.icon}</LineIcon>
                    </span>
                    <span className="smex-mvv-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <span className="smex-mvv-rule" aria-hidden="true" />
                  <div className="smex-hover-panel">
                    <h4>{c.title}</h4>
                    <p>{c.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Accreditation process (timeline) */}
      <section className="sme-process" id="process">
        <div className="container">
          <div className="smex-proc-head reveal">
            <div className="sme-head">
              <h2>The accreditation process</h2>
              <p>
                A transparent, rigorous and globally benchmarked process designed to build trust
                and credibility.
              </p>
              <div className="smex-proc-ctas">
                <Link href="/apply" className="smex-btn smex-btn-blue">
                  Apply for Accreditation <Icon name="arrow" size={16} />
                </Link>
                <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost-navy">
                  Book Your Consultation
                </a>
              </div>
            </div>
            <figure className="smex-proc-photo">
              <Image
                src="/sme-process-award.jpg"
                alt="Healthcare team receiving their American Accreditation Association award"
                fill
                sizes="(max-width: 1100px) 92vw, 38vw"
              />
            </figure>
          </div>
          <div className="smex-timeline reveal">
            <div className="smex-proc-grid">
              <ol className="smex-proc-steps">
                {PROCESS.map((step, i) => (
                  <li
                    className="smex-proc-step"
                    key={step.title}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="smex-proc-badge" aria-hidden="true">{i + 1}</span>
                    <span className="smex-proc-ico">
                      <LineIcon>{step.icon}</LineIcon>
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
              <aside className="smex-proc-cert">
                <Image
                  src="/aaa-accredited-badge.png"
                  alt="AAA Accredited Business seal"
                  width={887}
                  height={900}
                  className="smex-proc-seal"
                />
                <p>
                  Accreditation Certificate valid for <strong>3 years</strong>
                </p>
              </aside>
            </div>
            <p className="smex-proc-note">
              <em>Re-assessment, renewal and upgrades follow the same evidence-based methodology.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Readiness check strip (gauge + inline check) */}
      <section className="smex-strip" id="readiness">
        <div className="container">
          <div className="smex-strip-card reveal">
            <div className="smex-strip-copy">
              <h2>Take the First Step Towards Accreditation</h2>
              <p>
                A simple first step towards accreditation. Complete a quick self-assessment to
                understand your current level of business readiness.
              </p>
            </div>
            {/* button + sample-result preview + the check itself, opened on demand */}
            <ReadinessLauncher />
          </div>
        </div>
      </section>

      {/* Section 7 — Success stories (auto carousel, per client's mockup) */}
      <section className="smex-legacy" id="accredited">
        <div className="container">
          <div className="smex-stories-head reveal">
            <div className="sme-head">
              <span className="eyebrow">Success stories</span>
              <h2>Trusted by organizations committed to excellence.</h2>
              <p>
                Real accreditation journeys from healthcare organizations, education providers,
                SMEs, public institutions, and international partners recognized through AAA.
              </p>
            </div>
            <aside className="smex-stories-featured">
              <strong>Featured Story</strong>
              <span>
                Monarch Master Injector: 12% growth and 500+ students certified after
                accreditation.
              </span>
            </aside>
          </div>
        </div>
        <div className="smex-carousel reveal" aria-label="AAA success stories">
          <div className="smex-carousel-track">
            {[...STORIES, ...STORIES].map((s, i) => (
              <figure
                className="smex-story-card"
                key={`${s.name}-${i}`}
                aria-hidden={i >= STORIES.length || undefined}
              >
                <div className="smex-story-photo">
                  <Image
                    src={s.img}
                    alt={i < STORIES.length ? `${s.name} — AAA accreditation story` : ""}
                    fill
                    sizes="400px"
                  />
                  <span className="smex-story-pill">{s.sector}</span>
                  <span className="smex-story-loc">{s.country}</span>
                </div>
                <figcaption>
                  <div>
                    <span className="smex-story-metric">{s.metric}</span>
                    <div className="smex-story-title">
                      <h3>{s.name}</h3>
                      {s.logo && (
                        <Image
                          src={s.logo}
                          alt={`${s.name} logo`}
                          width={120}
                          height={52}
                          className="smex-story-logo"
                        />
                      )}
                    </div>
                    <p className="smex-story-quote">&ldquo;{s.quote}&rdquo;</p>
                    <p className="smex-story-desc">{s.desc}</p>
                  </div>
                  <div className="smex-story-foot">
                    <a
                      href={STORY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={i >= STORIES.length ? -1 : undefined}
                    >
                      Read Story →
                    </a>
                    <span className="smex-story-badge">Accredited</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="smex-legacy-cta reveal">
            <a
              href="https://casestudies-alpha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="smex-btn smex-btn-blue"
            >
              View All Success Stories
            </a>
            <Link href="/apply" className="smex-btn smex-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9 — FAQ (unchanged) */}
      <section className="sme-faq" id="faq">
        <div className="container">
          <div className="sme-head reveal">
            <h2>FAQs</h2>
            <p>
              Everything you need to know about AAA SMEs Accreditation: eligibility,
              timelines, validity, and how to get started.
            </p>
          </div>
          <div className="sme-faq-list">
            {FAQ.map((item, index) => (
              <details className="sme-faq-item" key={item.q} open={index === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="sme-faq-plus" aria-hidden="true" />
                </summary>
                <div className="sme-faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — Closing CTA & contact */}
      <section className="sme-contact" id="contact">
        <span className="sme-contact-corner" />
        <div className="container">
          <div className="smex-close-strip reveal">
            <div className="smex-close-copy">
              <span className="eyebrow">Start today</span>
              <h2>Start Your Accreditation Journey</h2>
              <p>
                Run the free readiness check, apply for accreditation, or book a meeting with our
                team.
              </p>
            </div>
            <figure className="smex-close-photo">
              <Image
                src="/sme-journey-team.jpg"
                alt="AAA assessors reviewing accreditation documents with an organisation's team"
                fill
                sizes="(max-width: 720px) 92vw, 330px"
              />
            </figure>
            <div className="smex-close-actions">
              <Link href="/apply" className="smex-btn smex-btn-gold">
                Apply for Accreditation <Icon name="arrow" size={16} />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost">
                Book a Meeting
              </a>
              <a
                href={APPLICATION_FORM}
                download
                className="smex-btn smex-btn-ghost"
              >
                <Icon name="download" size={16} /> Download Application Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
