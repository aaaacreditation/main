import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../_components/Icon";
import ReadinessCheck from "./ReadinessCheck";
import ApplicationForm from "./ApplicationForm";
import CountUp from "./CountUp";
import "./sme.css";

export const metadata: Metadata = {
  title: { absolute: "SMEs Accreditation Program | AAA" },
  description:
    "Get an independent AAA SME Accreditation and a Business Readiness Score stakeholders trust. Recognised in 58 countries. Take the free 2-minute check.",
};

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

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

const JOURNEY: {
  title: string;
  img: string;
  alt: string;
  icon: React.ReactNode;
  items: string[];
}[] = [
  {
    title: "SMEs Seeking Funding or Investment",
    img: "/about/assessment.jpg",
    alt: "Assessors reviewing business records together at a desk",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
    items: [
      "Business health becomes a Funding Readiness Score",
      "Stronger confidence with lenders & investors",
      "More productive funding conversations",
    ],
  },
  {
    title: "Businesses Planning Growth or Expansion",
    img: "/home/conformity.jpg",
    alt: "Engineers reviewing a checklist on a manufacturing floor",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </>
    ),
    items: [
      "Scale with stronger business foundations",
      "Enter new markets with confidence",
      "Build standards-based partnerships",
    ],
  },
  {
    title: "Organisations Pursuing Larger Contracts",
    img: "/about/team-network.jpg",
    alt: "Business partners meeting in front of a world map",
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
    items: [
      "Meet buyer and compliance expectations",
      "Qualify for larger contracts & tenders",
      "Strengthen supplier credibility",
    ],
  },
  {
    title: "Companies Strengthening Credibility",
    img: "/acc-sme.jpeg",
    alt: "Representatives holding a framed AAA Accreditation Certificate",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    items: [
      "Independent, internationally recognised credential",
      "Build trust with customers & partners",
      "Demonstrate a well-managed business",
    ],
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
  {
    name: "Consulting & Services",
    img: "/sectors/consulting.jpg",
    icon: <path d="M20 7h-9M14 17H5M17 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  },
  { name: "Hospitality & Food", img: "/sectors/hospitality.jpg", icon: <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 15V2a5 5 0 0 0-3 5v6z" /> },
  {
    name: "Export & Import",
    img: "/sectors/export-import.jpg",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />,
  },
];

const CATEGORIES: { title: string; text: string }[] = [
  {
    title: "Financial & Funding Readiness",
    text: "Your financial records, awareness of obligations and liabilities, what funding you need and why, and how you track cash flow and sustainability.",
  },
  {
    title: "Operational Requirements",
    text: "Active operations and delivery, documented processes, enough resources to do the work, and clear communication with clients and stakeholders.",
  },
  {
    title: "Management & Structure",
    text: "Legal registration, a defined organisational structure, and clear ownership and management responsibilities.",
  },
  {
    title: "Governance & Compliance",
    text: "Ethical operations, managing business risk, meeting legal and regulatory rules, and being transparent about who you are.",
  },
  {
    title: "Market Presence & Growth",
    text: "A clear offer and target market, real customer activity, growth plans, and listening to customer feedback.",
  },
  {
    title: "Continuous Improvement",
    text: "Spotting what to improve, acting on feedback, fixing issues, and keeping a record of the changes you make.",
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
    text: "Assessors share feedback; SME takes action.",
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
  img?: string;
  remoteImg?: string;
  featured?: boolean;
}[] = [
  {
    name: "Monarch Master Injector",
    sector: "Medical Education",
    country: "Texas, USA",
    metric: "12% Growth · 500+ Students Certified",
    quote: "AAA Accreditation has opened new doors for Monarch Master Injectors.",
    desc: "World-class training for medical professionals in cosmetic injections and wellness/weight-loss injections.",
    remoteImg:
      "https://casestudies-alpha.vercel.app/_next/image?q=75&url=https%3A%2F%2Fres.cloudinary.com%2Fdldhco0xk%2Fimage%2Fupload%2Fv1763493779%2Fcase-studies%2Fcmi4ynrne0002l204ursb2qp4%2Fcontent%2Fua0hksdqgmcjkovktmvw.jpg&w=3840",
    featured: true,
  },
  {
    name: "Monarch Graduates",
    sector: "Medical Education",
    country: "Texas, USA",
    metric: "Post-Accreditation Impact",
    quote: "Graduates carry AAA-recognised certification into their professional practice.",
    desc: "Monarch's certified graduates show the practical impact of accredited, hands-on training.",
    remoteImg:
      "https://casestudies-alpha.vercel.app/_next/image?q=75&url=https%3A%2F%2Fres.cloudinary.com%2Fdldhco0xk%2Fimage%2Fupload%2Fv1763493775%2Fcase-studies%2Fcmi4ynrne0002l204ursb2qp4%2Ffeatured%2Fcvi1bxdnazo6phtlv3wg.jpg&w=3840",
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
  {
    name: "IIBMS",
    sector: "Education & Training",
    country: "Mumbai, India",
    metric: "Training Provider Accreditation",
    quote: "Accreditation helped strengthen trust, credibility, and learning standards.",
    desc: "An education and training provider using accreditation as a signal of structured quality.",
    img: "/about/story-iibms.jpg",
  },
  {
    name: "NSC",
    sector: "Professional · Regional",
    country: "Middle East",
    metric: "Regional Recognition",
    quote: "A strong example of AAA's growing international presence.",
    desc: "A regional organization reflecting the international reach and practical value of accreditation.",
    img: "/about/story-nsc.jpg",
  },
  {
    name: "Cinute Digital",
    sector: "Corporate · SME",
    country: "Mira Bhayandar, India",
    metric: "Corporate Quality Recognition",
    quote: "A modern organization demonstrating quality and professional development.",
    desc: "An SME earning independent recognition for structured, well-managed business practices.",
  },
  {
    name: "Meridian",
    sector: "Training Provider",
    country: "International",
    metric: "Training Excellence",
    quote: "Recognition for structured learning, quality, and continuous improvement.",
    desc: "A training provider recognised for structured learning and continuous improvement.",
  },
  {
    name: "Ullemeyer",
    sector: "Healthcare · Professional",
    country: "United States",
    metric: "Professional Recognition",
    quote: "A professional organization building confidence through accreditation.",
    desc: "A US-based organization strengthening client trust through independent accreditation.",
  },
];

const STRUGGLES: { n: string; title: string; text: string }[] = [
  {
    n: "01",
    title: "Hard to Earn Trust",
    text: "Customers, lenders, investors and business partners want more than promises. Without independent validation, building confidence takes longer and opportunities can be harder to secure.",
  },
  {
    n: "02",
    title: "Difficult to Prove Capability",
    text: "Many SMEs have strong products and capable teams, but lack objective evidence of their governance, operational maturity and business performance.",
  },
  {
    n: "03",
    title: "Missed Growth Opportunities",
    text: "Expanding into new markets, winning larger contracts and attracting strategic partnerships often requires businesses to demonstrate recognised standards and organisational readiness.",
  },
  {
    n: "04",
    title: "No Clear Roadmap to Improve",
    text: "Without a structured assessment, improvement efforts are often reactive. Businesses struggle to identify priorities, measure progress and strengthen long-term performance.",
  },
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
        <div className="container smex-hero-grid">
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
              The American Accreditation Association&rsquo;s (AAA) SME Accreditation Program helps
              Small and Medium Enterprises (SMEs) demonstrate credibility through an independent
              assessment of their business, governance, and operational framework. The resulting
              internationally recognised accreditation and Funding Readiness Score strengthen trust
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

          <div className="smex-hero-visual reveal">
            <figure className="smex-hero-photo">
              <Image
                src="/acc-sme.jpeg"
                alt="Two representatives holding a framed AAA Accreditation Certificate at a presentation ceremony"
                fill
                priority
                sizes="(max-width: 980px) 92vw, 48vw"
              />
              <figcaption>
                <span>Evidence-led assessment</span>
                <strong>Built for real businesses</strong>
              </figcaption>
            </figure>
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

      {/* Section 2 — What is AAA SME Accreditation (big title over who-it-serves + sectors) */}
      <section className="smex-journey" id="about">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">About AAA SME Accreditation</span>
            <h2>What is AAA SME Accreditation?</h2>
            <p>
              An international accreditation program that independently evaluates how your business
              is run. It builds trust, improves funding readiness, and opens doors to growth.
            </p>
          </div>

          <div className="smex-sub reveal" id="who">
            <h3>Where Your Business Is Today. What Accreditation Helps You Achieve.</h3>
            <p>
              No matter where you are in your business journey, accreditation helps you build
              trust, improve performance, and unlock new opportunities for sustainable growth.
            </p>
          </div>
          <div className="smex-journey-grid">
            {JOURNEY.map((j, i) => (
              <article className="smex-journey-card reveal" key={j.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="smex-journey-photo">
                  <Image
                    src={j.img}
                    alt={j.alt}
                    fill
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 24vw"
                  />
                </div>
                <span className="smex-journey-ico">
                  <LineIcon>{j.icon}</LineIcon>
                </span>
                <h3>{j.title}</h3>
                <ul>
                  {j.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="smex-sub reveal" id="sectors">
            <span className="smex-sub-kicker">Sectors We Serve</span>
            <h3>Accreditation Across Every Industry</h3>
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
          </div>
        </div>

        <div className="container">
          <div className="smex-about-ctas reveal">
            <Link href="#readiness" className="smex-btn smex-btn-gold">
              Check Your Readiness for Free <Icon name="arrow" size={16} />
            </Link>
            <Link href="#process" className="smex-btn smex-btn-ghost-navy">
              Learn more about the process
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 — Accreditation framework (hover-reveal cards) */}
      <section className="sme-cats" id="framework">
        <div className="container">
          <div className="smex-fw-head reveal">
            <div className="sme-head">
              <span className="eyebrow">Accreditation framework</span>
              <h2>What We Assess. What Stakeholders Value.</h2>
              <p>
                Your business is assessed across six weighted areas that determine your Business
                Readiness Score, using an evidence-based, consistent, impartial, risk-based, and
                proportionate assessment methodology.
              </p>
            </div>
            <figure className="smex-fw-photo">
              <Image
                src="/about/story-iibms.jpg"
                alt="AAA assessor presenting the accreditation framework to a business audience"
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
                  <span className="smex-mvv-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
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
          <div className="sme-head reveal">
            <span className="eyebrow">Accreditation process</span>
            <h2>The AAA accreditation process</h2>
            <p>
              A transparent, rigorous and globally benchmarked process designed to build trust and
              credibility.
            </p>
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
                <MiniSeal className="smex-proc-seal" />
                <p>
                  Accreditation Certificate valid for <strong>3 years</strong>
                </p>
              </aside>
            </div>
            <p className="smex-proc-note">
              <em>Re-assessment, renewal and upgrades follow the same evidence-based methodology.</em>
            </p>
          </div>
          <div className="smex-proc-ctas reveal">
            <Link href="/apply" className="smex-btn smex-btn-blue">
              Apply for Accreditation <Icon name="arrow" size={16} />
            </Link>
            <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost-navy">
              Book Your Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Section 6 — Readiness check strip (gauge) */}
      <section className="smex-strip" id="score">
        <div className="container">
          <div className="smex-strip-card reveal">
            <div className="smex-gauge">
              <svg viewBox="0 0 200 112" aria-hidden="true">
                <defs>
                  <linearGradient id="smexGaugeGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#173d73" />
                    <stop offset="1" stopColor="#2b5da8" />
                  </linearGradient>
                </defs>
                <path className="smex-gauge-track" d="M16 104a84 84 0 0 1 168 0" pathLength={100} />
                <path className="smex-gauge-val" d="M16 104a84 84 0 0 1 168 0" pathLength={100} />
              </svg>
              <div className="smex-gauge-read" aria-label="Sample Business Readiness Score: 78 out of 100">
                <strong><CountUp value={78} /></strong>
                <span>/100</span>
              </div>
              <span className="smex-gauge-lbl">Sample score</span>
            </div>
            <div className="smex-strip-copy">
              <span className="eyebrow">Readiness check</span>
              <h2>Take the First Step Towards Accreditation</h2>
              <p>
                A simple first step towards accreditation. Complete a quick self-assessment to
                understand your current level of business readiness.
              </p>
            </div>
            <Link href="#readiness" className="smex-btn smex-btn-blue">
              Start Business Readiness Check <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Free readiness check (interactive) */}
      <section className="smerc" id="readiness">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Free readiness check</span>
            <h2>Check your business readiness in two minutes</h2>
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
                className={"smex-story-card" + (s.featured ? " featured" : "")}
                key={`${s.name}-${i}`}
                aria-hidden={i >= STORIES.length || undefined}
              >
                <div className="smex-story-photo">
                  {s.img ? (
                    <Image
                      src={s.img}
                      alt={i < STORIES.length ? `${s.name} — AAA accreditation story` : ""}
                      fill
                      sizes="400px"
                    />
                  ) : s.remoteImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.remoteImg} alt={i < STORIES.length ? `${s.name} — AAA accreditation story` : ""} loading="lazy" />
                  ) : (
                    <MiniSeal className="smex-story-seal" />
                  )}
                  <span className="smex-story-pill">{s.sector}</span>
                  <span className="smex-story-loc">{s.country}</span>
                </div>
                <figcaption>
                  <div>
                    <span className="smex-story-metric">{s.metric}</span>
                    <h3>{s.name}</h3>
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

      {/* Section 8 — Why many SMEs struggle to grow (hover-reveal cards) */}
      <section className="smex-struggle" id="challenges">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">The challenge</span>
            <h2>Why Many SMEs Struggle to Grow</h2>
            <p>
              Growth isn&rsquo;t held back by ambition alone. Without independent validation and
              structured business systems, even capable businesses can miss valuable opportunities.
            </p>
          </div>
          <div className="smex-strug-grid">
            {STRUGGLES.map((s, i) => (
              <article
                className="smex-strug-card reveal"
                key={s.title}
                tabIndex={0}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="smex-card-kicker">Challenge {s.n}</span>
                <h3>{s.title}</h3>
                <span className="smex-strug-rule" aria-hidden="true" />
                <div className="smex-hover-panel">
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
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
              <Link href="/apply" className="smex-btn smex-btn-gold">
                Apply for Accreditation <Icon name="arrow" size={16} />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="smex-btn smex-btn-ghost">
                Book a Meeting
              </a>
              <a href="#application" className="smex-btn smex-btn-ghost">
                <Icon name="download" size={16} /> Download Application Form
              </a>
            </div>
          </div>

          <div className="smex-close-grid">
            <div className="smex-form-card reveal" id="application">
              <div className="smex-form-head">
                <span className="smex-form-seal" aria-hidden="true">
                  <MiniSeal />
                </span>
                <div>
                  <strong>AAA SME accreditation application form</strong>
                  <p>
                    Complete your business details below and our team will begin your
                    accreditation.
                  </p>
                </div>
              </div>
              <ApplicationForm />
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
