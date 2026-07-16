import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "../../_components/Icon";
import ReadinessCheck from "./ReadinessCheck";
import CountUp from "./CountUp";
import "./sme.css";

export const metadata: Metadata = {
  title: { absolute: "SME Accreditation & Funding Readiness Score | AAA" },
  description:
    "Get an independent AAA SME Accreditation and a Funding Readiness Score lenders trust. Recognised in 53+ countries. Take the free 2-minute check.",
};

const CONSULT = "https://calendly.com/aaa-accreditation/30min";

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

const FUNDING_GAP = [
  {
    value: 5.7,
    prefix: "$",
    suffix: "T",
    decimals: 1,
    label: "The annual finance gap facing small businesses in emerging markets.",
  },
  {
    value: 40,
    suffix: "%+",
    label: "Of formal small businesses have unmet financing needs.",
  },
  {
    value: 90,
    suffix: "%",
    label: "Of all businesses worldwide are SMEs, together driving half of the world's employment.",
  },
];

const PAIN: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "No standard signal",
    text: "Lenders have no easy way to read a business that keeps informal records. There's no common measure that simply says: this one's ready.",
  },
  {
    icon: "search",
    title: "A slow, closed process",
    text: "Loan decisions can drag on for three to six months. They often come down to who you know, and a first-time borrower has nothing to point back to.",
  },
  {
    icon: "clipboard",
    title: "One size fits all",
    text: "Most ratings are just pass or fail. Many first-time applicants don't make the cut, with no clear way to improve and try again.",
  },
  {
    icon: "industry",
    title: "Sector blindness",
    text: "A generalist lender rarely gets the real risks in farming, exports, tech, or manufacturing. Genuine strengths get missed, and good businesses get turned away.",
  },
];

const AUDIENCES: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "SMEs Seeking Funding or Investment",
    text: "Build confidence with lenders and investors.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    title: "Businesses Planning Growth or Expansion",
    text: "Strengthen your foundation and scale with confidence.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </>
    ),
  },
  {
    title: "Organisations Pursuing Larger Contracts",
    text: "Meet procurement and compliance standards with ease.",
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    title: "Companies Strengthening Credibility",
    text: "Build trust with customers, partners, and stakeholders.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: "Leaders Building Resilient Businesses",
    text: "Create strong systems for sustainable, long-term success.",
    icon: (
      <>
        <circle cx="12" cy="7" r="3.2" />
        <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </>
    ),
  },
];

const SECTORS: { name: string; icon: React.ReactNode }[] = [
  { name: "Manufacturing", icon: <path d="M2 20h20M4 20V9l5 3V9l5 3V4l6 4v12" /> },
  {
    name: "IT & Software Services",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  { name: "Healthcare & Pharma", icon: <path d="M12 5v14M5 12h14" strokeWidth={2.2} /> },
  { name: "Agri-Processing", icon: <path d="M12 22c5-3 8-7 8-13V4l-8 3-8-3v5c0 6 3 10 8 13z" /> },
  { name: "Textile & Apparel", icon: <path d="M6 3l6 4 6-4 3 5-4 3v10H7V11L3 8z" /> },
  { name: "Clean Energy & Greentech", icon: <path d="M13 2L4 14h7l-2 8 9-12h-7z" /> },
  {
    name: "Logistics & Transport",
    icon: (
      <path d="M1 6h13v10H1zM14 9h5l3 3v4h-8M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    ),
  },
  { name: "Construction & Engineering", icon: <path d="M2 20h20M5 20V8l7-4 7 4v12M9 20v-6h6v6" /> },
  {
    name: "Retail & E-commerce",
    icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />,
  },
  {
    name: "Consulting & Services",
    icon: <path d="M20 7h-9M14 17H5M17 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  },
  { name: "Hospitality & Food", icon: <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 15V2a5 5 0 0 0-3 5v6z" /> },
  {
    name: "Export & Import",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />,
  },
];

const CATEGORIES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "Financial & Funding Readiness",
    text: "Your financial records, awareness of obligations and liabilities, what funding you need and why, and how you track cash flow and sustainability.",
  },
  {
    icon: "industry",
    title: "Operational Requirements",
    text: "Active operations and delivery, documented processes, enough resources to do the work, and clear communication with clients and stakeholders.",
  },
  {
    icon: "clipboard",
    title: "Management & Structure",
    text: "Legal registration, a defined organisational structure, and clear ownership and management responsibilities.",
  },
  {
    icon: "shield",
    title: "Governance & Compliance",
    text: "Ethical operations, managing business risk, meeting legal and regulatory rules, and being transparent about who you are.",
  },
  {
    icon: "globe",
    title: "Market Presence & Growth",
    text: "A clear offer and target market, real customer activity, growth plans, and listening to customer feedback.",
  },
  {
    icon: "arrowUpRight",
    title: "Continuous Improvement",
    text: "Spotting what to improve, acting on feedback, fixing issues, and keeping a record of the changes you make.",
  },
];

const UNLOCK: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: "chart",
    title: "Funding access",
    items: [
      "Business health becomes a Funding Readiness Score",
      "Recognised by lenders and investors",
      "Faster funding conversations",
    ],
  },
  {
    icon: "cert",
    title: "Credibility & trust",
    items: [
      "Independent, internationally recognised credential",
      "Signals a well-run business",
      "Trusted by partners and customers",
    ],
  },
  {
    icon: "arrowUpRight",
    title: "Growth & expansion",
    items: [
      "Qualify for larger contracts",
      "Enter new markets with confidence",
      "Win standards-based partnerships",
    ],
  },
  {
    icon: "shield",
    title: "Business resilience",
    items: [
      "See exactly what to strengthen",
      "Build resilience over time",
      "Keep improving after accreditation",
    ],
  },
];

const PROCESS = [
  { title: "Application", text: "Send your accreditation application to AAA with your business details and the level you are aiming for." },
  { title: "Documents", text: "Share the evidence we review: business registration, financial records, operational documents, and governance details." },
  { title: "Assessment", text: "AAA assessors evaluate your submission through document review, interviews, and verification of your operations." },
  { title: "Feedback", text: "If anything needs strengthening, our assessors tell you what to address, so you can act on it before any decision is made." },
  { title: "Decision", text: "The AAA accreditation committee reviews your assessment and makes the accreditation decision." },
  { title: "Certificate", text: "Your accreditation certificate is issued, valid for three years, with a digital verification badge." },
];

const LEGACY = [
  "Monarch Master Injectors",
  "Aadhya Pain Management Centre",
  "Clarivate",
  "Clinoxy Solutions",
  "Priority Global Pvt Ltd",
];

const FAQ = [
  {
    q: "What is AAA SME accreditation?",
    a: "AAA SME Accreditation is a program for small and medium businesses that assesses how well your business is run and how prepared it is to grow. It helps you show credibility, build trust, and earn independent recognition for good business practices.",
  },
  {
    q: "What makes AAA different from other accreditation bodies?",
    a: "AAA focuses on business readiness, governance, and growth. Through an independent assessment, your business earns recognition based on established criteria that align with recognised accreditation principles.",
  },
  {
    q: "Who can apply for AAA SME accreditation?",
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
    q: "How much does AAA SME accreditation cost?",
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
      <section className="smex-hero">
        <div className="smex-hero-stars" aria-hidden="true">★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★</div>
        <div className="container smex-hero-grid">
          <div className="smex-hero-copy reveal">
            <nav className="smex-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#programs">Programs</Link>
              <span>/</span>
              <strong>SME Funding Readiness</strong>
            </nav>

            <div className="smex-kicker">
              <span className="smex-mini-flag" aria-hidden="true">
                <Image src="/flag-usa.webp" alt="" fill sizes="38px" />
              </span>
              SME Funding Readiness Program
            </div>

            <h1>
              Build Trust. <em>Improve Funding Readiness.</em> Grow Your Business.
            </h1>
            <p>
              The American Accreditation Association&rsquo;s (AAA) SME Accreditation Program helps
              Small and Medium Enterprises (SMEs) demonstrate credibility through an independent
              assessment of their business, governance, and operational framework. The resulting
              internationally recognised accreditation and Funding Readiness Score strengthen trust
              and unlock opportunities for growth, partnerships, market expansion, and funding.
            </p>

            <div className="smex-hero-actions">
              <Link href="#readiness" className="smex-btn smex-btn-red">
                Check Your Readiness for Free
                <Icon name="arrow" size={16} />
              </Link>
              <Link href="/apply" className="smex-btn smex-btn-ghost">
                Apply for Accreditation
              </Link>
            </div>

            <div className="smex-hero-badges" aria-label="Program highlights">
              <span className="smex-badge">
                <Icon name="globe" size={15} /> Recognised in 53+ countries
              </span>
              <span className="smex-badge">
                <Icon name="clipboard" size={15} /> Six-area evidence-based assessment
              </span>
            </div>
          </div>

          <div className="smex-hero-visual reveal">
            <figure className="smex-hero-photo">
              <Image
                src="/about/team-advisory.jpg"
                alt="Business advisors reviewing performance evidence and funding-readiness data"
                fill
                priority
                sizes="(max-width: 980px) 92vw, 48vw"
              />
              <figcaption>
                <span>Evidence-led assessment</span>
                <strong>Built for real businesses</strong>
              </figcaption>
            </figure>

            <div className="smex-signal-card" aria-label="AAA funding-readiness framework">
              <div className="smex-signal-head">
                <span className="smex-signal-mark"><Icon name="chart" size={19} /></span>
                <span><small>AAA framework</small><strong>Funding Readiness Score</strong></span>
                <span className="smex-live-dot">Evidence-led</span>
              </div>
              <div className="smex-signal-body">
                <div className="smex-signal-ring"><strong>6</strong><span>areas</span></div>
                <div className="smex-signal-bars" aria-hidden="true">
                  {[84, 76, 91, 72, 88, 81].map((width, index) => (
                    <span key={width} style={{ "--bar": `${width}%`, "--delay": `${index * 100}ms` } as React.CSSProperties} />
                  ))}
                </div>
              </div>
              <div className="smex-signal-foot">
                <span><Icon name="shield" size={14} /> Independent</span>
                <span><Icon name="check" size={14} /> Evidence based</span>
              </div>
            </div>

            <div className="smex-hero-stamp">
              <Image src="/logo/acc-org.png" alt="AAA Organizational Member accreditation seal" width={248} height={248} />
            </div>
          </div>
        </div>
        <div className="smex-hero-rail" aria-label="Program principles">
          <div className="container">
            <span>U.S. headquartered</span><i>★</i>
            <span>Independent assessment</span><i>★</i>
            <span>International recognition</span><i>★</i>
            <span>Lender-readable evidence</span>
          </div>
        </div>
      </section>

      {/* Section 2 — The Global Funding Gap (stats + problem, merged) */}
      <section className="sme-stats" id="why">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">The global funding gap</span>
            <h2>Why Strong SMEs Are Still Overlooked</h2>
            <p>
              The funding gap is real, and bigger than most people think. Strong businesses.
              Real potential. But the system still isn&rsquo;t built for them.
            </p>
          </div>
          <div className="sme-stats-grid">
            {FUNDING_GAP.map((s, i) => (
              <div className="sme-stat reveal" key={s.label} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="smex-stat-index">0{i + 1}</span>
                <span className="sme-stat-num">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </span>
                <span className="sme-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="sme-stats-note reveal">
            These businesses are not short on potential. They just can&rsquo;t show lenders what
            they need to see.
          </p>

          <h3 className="smex-subhead reveal">Why SMEs struggle to get funding</h3>
          <div className="sme-pain-grid">
            {PAIN.map((p, i) => (
              <article className="sme-pain-card reveal" key={p.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="smex-card-kicker">Barrier {String(i + 1).padStart(2, "0")}</span>
                <div className="sme-pain-ico">
                  <Icon name={p.icon} size={22} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>

          <div className="smex-callout reveal">
            <span className="smex-callout-star" aria-hidden="true">★</span>
            <p>
              <strong>That&rsquo;s where AAA makes the difference.</strong> We provide an
              independent, evidence-based assessment that helps SMEs prove their business strength
              and unlock the funding and growth they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — About the program (expandable panels) */}
      <section className="sme-global" id="about">
        <div className="container">
          <div className="sme-head light reveal">
            <span className="eyebrow">About AAA SME Accreditation</span>
            <h2>What is AAA SME Accreditation?</h2>
            <p>
              An international accreditation program that independently evaluates how your business
              is run. It builds trust, improves funding readiness, and opens doors to growth.
            </p>
          </div>

          <div className="smex-trust reveal" aria-label="Program trust points">
            <span>Recognised in 53+ countries</span><i>★</i>
            <span>Independent and impartial</span><i>★</i>
            <span>Funding Readiness Score</span><i>★</i>
            <span>Six-pillar assessment</span>
          </div>

          <div className="smex-panels">
            <details className="smex-panel reveal" open>
              <summary>
                <span className="smex-panel-mark">
                  <LineIcon>
                    <circle cx="12" cy="7" r="3.2" />
                    <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                  </LineIcon>
                </span>
                <span className="smex-panel-head">
                  <strong>Who is it for</strong>
                  <em>For every SME. At every stage.</em>
                </span>
                <span className="smex-panel-plus" aria-hidden="true" />
              </summary>
              <div className="smex-panel-body">
                <ul className="smex-aud">
                  {AUDIENCES.map((a) => (
                    <li key={a.title}>
                      <span className="smex-line-ico"><LineIcon>{a.icon}</LineIcon></span>
                      <div>
                        <strong>{a.title}</strong>
                        <p>{a.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="smex-panel reveal">
              <summary>
                <span className="smex-panel-mark">
                  <LineIcon>
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />
                  </LineIcon>
                </span>
                <span className="smex-panel-head">
                  <strong>Sectors we accredit</strong>
                  <em>Across industries. Around the world.</em>
                </span>
                <span className="smex-panel-plus" aria-hidden="true" />
              </summary>
              <div className="smex-panel-body">
                <div className="smex-sectors-grid">
                  {SECTORS.map((s) => (
                    <div className="smex-sector-tile" key={s.name}>
                      <span className="smex-line-ico sm"><LineIcon>{s.icon}</LineIcon></span>
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="smex-about-ctas reveal">
            <Link href="#readiness" className="smex-btn smex-btn-red">
              Check Your Readiness for Free <Icon name="arrow" size={16} />
            </Link>
            <Link href="#process" className="smex-link-light">
              Learn more about the process <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 — The framework (six navy pillar cards) */}
      <section className="sme-cats" id="framework">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">The framework</span>
            <h2>AAA SME accreditation framework</h2>
            <p className="smex-h2-sub">Six things we assess, the same six lenders care about</p>
            <p>
              Your business is assessed across six weighted areas that determine your Funding
              Readiness Score, using an evidence-based, consistent, impartial, risk-based, and
              proportionate assessment methodology.
            </p>
          </div>
          <div className="sme-cats-grid">
            {CATEGORIES.map((c, i) => (
              <article className="sme-cat reveal" key={c.title} style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="smex-flagband" aria-hidden="true">
                  <span>★ ★ ★</span><i />
                </div>
                <div className="smex-cat-top">
                  <span className="smex-card-no">{String(i + 1).padStart(2, "0")}</span>
                  <div className="sme-cat-ico">
                    <Icon name={c.icon} size={24} />
                  </div>
                </div>
                <span className="smex-cat-label">Pillar {i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="smex-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Funding Readiness Check strip (gauge) */}
      <section className="smex-strip" id="score">
        <div className="container">
          <div className="smex-strip-card reveal">
            <div className="smex-gauge">
              <svg viewBox="0 0 200 112" aria-hidden="true">
                <defs>
                  <linearGradient id="smexGaugeGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#8e6b18" />
                    <stop offset="1" stopColor="#b38a2e" />
                  </linearGradient>
                </defs>
                <path className="smex-gauge-track" d="M16 104a84 84 0 0 1 168 0" pathLength={100} />
                <path className="smex-gauge-val" d="M16 104a84 84 0 0 1 168 0" pathLength={100} />
              </svg>
              <div className="smex-gauge-read" aria-label="Sample Funding Readiness Score: 78 out of 100">
                <strong><CountUp value={78} /></strong>
                <span>/100</span>
              </div>
              <span className="smex-gauge-lbl">Sample score</span>
            </div>
            <div className="smex-strip-copy">
              <span className="eyebrow">Funding Readiness Check</span>
              <h2>Take the First Step Towards Accreditation</h2>
              <p>Free Funding Readiness Check&ensp;·&ensp;about 2 minutes&ensp;·&ensp;no sign-up</p>
            </div>
            <Link href="#readiness" className="smex-btn smex-btn-gold">
              Get my score <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6 — What accreditation unlocks (benefits) */}
      <section className="sme-benefits" id="benefits">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Business benefits</span>
            <h2>What accreditation unlocks for your business</h2>
            <p>
              Accreditation does more than hand you a certificate. It strengthens every
              conversation you have with lenders, investors, partners, and customers.
            </p>
          </div>
          <div className="smex-unlock-grid">
            {UNLOCK.map((g, i) => (
              <article className="smex-unlock reveal" key={g.title} style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="smex-unlock-ico">
                  <Icon name={g.icon} size={22} />
                </div>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Accreditation process (timeline) */}
      <section className="sme-process" id="process">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Accreditation process</span>
            <h2>The AAA accreditation process</h2>
            <p>
              A transparent, rigorous and globally benchmarked process designed to build trust and
              credibility.
            </p>
          </div>
          <div className="smex-timeline reveal">
            <ol className="smex-tl">
              {PROCESS.map((step, i) => (
                <li
                  className={"smex-tl-step" + (i === PROCESS.length - 1 ? " final" : "")}
                  key={step.title}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="smex-tl-num" aria-hidden="true">{i + 1}</span>
                  <h3>
                    {i === PROCESS.length - 1 && <MiniSeal className="smex-tl-seal" />}
                    {step.title}
                  </h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="smex-proc-ctas reveal">
            <Link href="/apply" className="smex-btn smex-btn-red">
              Apply for Accreditation <Icon name="arrow" size={16} />
            </Link>
            <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost-navy">
              Book a Meeting
            </a>
          </div>
        </div>
      </section>

      {/* Section 8 — A Legacy of Accredited Excellence (case studies) */}
      <section className="smex-legacy" id="accredited">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Accredited excellence</span>
            <h2>A Legacy of Accredited Excellence</h2>
            <p>Organisations that put their business to the test and earned AAA accreditation.</p>
          </div>
          {/* Certificate photos, logos, and quotes are client-supplied — placeholders until assets arrive */}
          <div className="smex-legacy-grid">
            {LEGACY.map((name, i) => (
              <figure className="smex-legacy-card reveal" key={name} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="smex-legacy-photo" aria-hidden="true">
                  <MiniSeal className="smex-legacy-seal" />
                  <span>AAA Accredited</span>
                </div>
                <figcaption>
                  <strong>{name}</strong>
                  <em>Certificate photo &amp; quote to follow</em>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="smex-legacy-cta reveal">
            <Link href="/apply" className="smex-btn smex-btn-red">
              Apply for Accreditation <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Free readiness check (interactive) */}
      <section className="smerc" id="readiness">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Free readiness check</span>
            <h2>Check your funding readiness in two minutes</h2>
            <p>
              Answer twelve quick questions across the six areas we assess.
              You&rsquo;ll get an instant readiness score and see exactly where your
              business stands. No sign-up, no obligation.
            </p>
          </div>
          <div className="reveal">
            <ReadinessCheck />
          </div>
        </div>
      </section>

      {/* Section 9 — FAQ (unchanged) */}
      <section className="sme-faq" id="faq">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Frequently asked questions</span>
            <h2>Questions, answered</h2>
            <p>
              Everything you need to know about AAA SME Accreditation: eligibility,
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
            <div>
              <span className="eyebrow">Start today</span>
              <h2>Start Your Accreditation Journey</h2>
              <p>
                Run the free readiness check, apply for accreditation, or book a meeting with our
                team.
              </p>
            </div>
            <div className="smex-close-actions">
              <Link href="/apply" className="smex-btn smex-btn-red">
                Apply for Accreditation <Icon name="arrow" size={16} />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost">
                Book a Meeting
              </a>
            </div>
          </div>

          <div className="smex-close-grid">
            <div className="smex-form-card reveal">
              <div className="smex-doc" aria-hidden="true">
                <MiniSeal className="smex-doc-seal" />
              </div>
              <div className="smex-form-copy">
                <strong>AAA SME accreditation application form</strong>
                <p>
                  Download the application form, complete your business details, and send it back
                  to our team to begin your accreditation.
                </p>
                {/* TODO: point this at the client-supplied application-form PDF when provided */}
                <Link href="/apply" className="smex-btn smex-btn-gold sm">
                  <Icon name="download" size={15} /> Download application form
                </Link>
              </div>
            </div>

            <div className="smex-close-contact reveal">
              <div className="sme-contact-item">
                <span className="ico"><Icon name="pin" size={18} /></span>
                <span><strong>Visit us</strong>8609 Westwood Center Drive, Tysons Corner, VA 22182, USA</span>
              </div>
              <a className="sme-contact-item" href="tel:+15716012616">
                <span className="ico"><Icon name="phone" size={18} /></span>
                <span><strong>Call us</strong>+1 (571) 601 2616</span>
              </a>
              <div className="sme-contact-item">
                <span className="ico"><Icon name="doc" size={18} /></span>
                <span><strong>Fax</strong>+1 (571) 376 6582</span>
              </div>
              <a className="sme-contact-item" href="mailto:info@aaa-accreditation.org">
                <span className="ico"><Icon name="mail" size={18} /></span>
                <span><strong>Email us</strong>info@aaa-accreditation.org</span>
              </a>
              <a className="sme-contact-item" href="https://wa.me/447487550737" target="_blank" rel="noopener noreferrer">
                <span className="ico"><Icon name="phone" size={18} /></span>
                <span><strong>International Operations / WhatsApp</strong>+44 (748) 755 0737</span>
              </a>
              <Link className="sme-contact-item" href="/contact">
                <span className="ico"><Icon name="mail" size={18} /></span>
                <span><strong>Contact form</strong>Send us a message online</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
