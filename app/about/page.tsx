import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../_components/Icon";
import { WorldMapFigure } from "../_components/WorldMap";
import TeamCarousel from "./TeamCarousel";
import "./about.css";

export const metadata: Metadata = {
  title: "About AAA",
  description:
    "The American Accreditation Association (AAA) is an independent accreditation organization headquartered in Virginia, USA, supporting organizations across 57 countries in demonstrating quality, competence, and continual improvement.",
  keywords: [
    "American Accreditation Association",
    "AAA accreditation",
    "international accreditation",
    "healthcare accreditation",
    "training providers accreditation",
    "conformity assessment bodies",
    "SME accreditation",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AAA — American Accreditation Association",
    description:
      "Inspiring Confidence. Recognizing Excellence. Independent accreditation services across multiple sectors, supporting organizations in 57 countries.",
    url: "/about",
    type: "website",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "American Accreditation Association",
  alternateName: "AAA",
  url: "https://aaa-accreditation.org",
  logo: "https://aaa-accreditation.org/logo/AAA-Logo.png",
  description:
    "The American Accreditation Association (AAA) is an independent accreditation organization committed to promoting quality, competence, and confidence across organizations worldwide.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Virginia",
    addressCountry: "US",
  },
  knowsAbout: [
    "Healthcare Accreditation",
    "Training & Education Providers Accreditation",
    "Conformity Assessment Bodies Accreditation",
    "SME Accreditation",
  ],
};

const STATS = [
  { num: "57", label: "Countries Served" },
  { num: "200+", label: "Accredited Organizations" },
  { num: "287", label: "Assessors & Experts" },
  { num: "20,162", label: "Accredited Certificates" },
];

const PRINCIPLES = [
  {
    icon: "scale",
    title: "Independent & Impartial",
    text: "Accreditation decisions are made objectively, based on evidence, defined requirements, and independent review.",
  },
  {
    icon: "globe",
    title: "International Expertise",
    text: "AAA works with assessors and technical experts across different sectors, regions, and professional environments.",
  },
  {
    icon: "check",
    title: "Evidence-Based Decisions",
    text: "Every accreditation outcome is supported by documented evidence, assessment findings, and a structured decision process.",
  },
  {
    icon: "arrowUpRight",
    title: "Continual Improvement",
    text: "AAA encourages organizations to use accreditation as a pathway for performance improvement, not only recognition.",
  },
] as const;

const PROGRAMS = [
  {
    title: "Training & Education Providers",
    text: "Supporting educational institutions, academies, and training providers in demonstrating excellence in learning, governance, and delivery.",
    href: "/programs/training-education",
  },
  {
    title: "Healthcare Organizations",
    text: "Promoting safer, higher-quality healthcare services through internationally recognized accreditation standards.",
    href: "/programs/healthcare",
  },
  {
    title: "Conformity Assessment Bodies",
    text: "Accreditation for certification bodies, inspection bodies, testing laboratories, and other conformity assessment organizations.",
    href: "/programs/conformity-assessment-bodies",
  },
  {
    title: "SMEs",
    text: "Supporting small and medium-sized enterprises in strengthening governance, performance, credibility, and business readiness.",
    href: "/programs/sme-funding-readiness",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="abx">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />

      {/* ---------- Hero ---------- */}
      <section className="abx-hero">
        <div className="abx-stripes" aria-hidden="true" />
        <span className="abx-sq a" aria-hidden="true" />
        <span className="abx-sq b" aria-hidden="true" />
        <div className="abx-container">
          <div className="abx-hero-inner reveal">
            <nav className="abx-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>About Us</span>
            </nav>
            <h1>About the American Accreditation Association</h1>
            <div className="abx-hero-rule" aria-hidden="true" />
            <p className="abx-hero-tag">Inspiring Confidence. Recognizing Excellence.</p>
            <p className="abx-hero-lede">
              The American Accreditation Association supports organizations worldwide in
              demonstrating quality, competence, and continual improvement through independent
              accreditation services across multiple sectors.
            </p>
            <div className="abx-hero-actions">
              <Link href="/programs" className="abx-btn abx-btn-gold">
                Explore Programs
              </Link>
              <Link href="/contact" className="abx-btn abx-btn-ghost">
                Contact AAA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Who We Are ---------- */}
      <section className="abx-section">
        <div className="abx-container">
          <div className="abx-who-grid">
            <div className="abx-collage reveal">
              <span className="frame" aria-hidden="true" />
              <figure className="main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/assessment.jpg" alt="AAA accreditation assessment in practice" />
              </figure>
              <figure className="detail">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/leadership.jpg" alt="AAA leadership team" />
              </figure>
              <div className="badge">
                <strong>57</strong>
                <span>
                  Countries
                  <br />
                  Served
                </span>
              </div>
            </div>
            <div className="abx-who-copy reveal">
              <div className="abx-kicker">Who We Are</div>
              <h2 className="abx-h2">
                Building Confidence Through <span className="gold">Accreditation</span>
              </h2>
              <p>
                The American Accreditation Association (AAA) is an independent accreditation
                organization committed to promoting quality, competence, and confidence across
                organizations worldwide.
              </p>
              <p>
                Headquartered in Virginia, United States, AAA delivers accreditation services
                through an international network of assessors and technical experts supporting
                organizations across 57 countries — helping them strengthen credibility, improve
                performance, and demonstrate their commitment to excellence.
              </p>
              <div className="abx-checklist">
                <span>
                  <Icon name="check" size={18} strokeWidth={2.4} /> Independent &amp; Impartial
                </span>
                <span>
                  <Icon name="check" size={18} strokeWidth={2.4} /> Globally Recognized
                </span>
                <span>
                  <Icon name="check" size={18} strokeWidth={2.4} /> Evidence-Based Decisions
                </span>
                <span>
                  <Icon name="check" size={18} strokeWidth={2.4} /> Expert Assessors
                </span>
              </div>
              <div className="abx-who-foot">
                <Link href="/about-accreditation" className="abx-btn abx-btn-navy">
                  Our Standards
                </Link>
                <div className="abx-chip">
                  <span className="av">ED</span>
                  <div>
                    <b>Executive Director</b>
                    <small>American Accreditation Association</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mission / Vision / Values ---------- */}
      <section className="abx-section cream">
        <div className="abx-container">
          <div className="abx-head-split reveal">
            <div className="l">
              <div className="abx-kicker">Our Foundation</div>
              <h2 className="abx-h2">Mission, Vision &amp; Values</h2>
            </div>
            <p className="r">
              Clear principles guide every assessment, every decision, and every partnership we
              build.
            </p>
          </div>
          <div className="abx-mvv-grid reveal">
            <div className="abx-mvv-card navy">
              <span className="abx-sq" aria-hidden="true" />
              <span className="ico">
                <Icon name="flag" size={26} strokeWidth={1.8} />
              </span>
              <h3>Our Mission</h3>
              <p>
                To provide impartial and credible accreditation services that recognize
                excellence, promote continual improvement, and strengthen confidence in
                organizations worldwide.
              </p>
            </div>
            <div className="abx-mvv-card white">
              <span className="ico">
                <Icon name="globe" size={26} strokeWidth={1.8} />
              </span>
              <h3>Our Vision</h3>
              <p>
                To be recognized as a leading international accreditation organization that
                inspires confidence and advances quality, competence, and continual improvement
                through accreditation.
              </p>
            </div>
            <div className="abx-mvv-card royal">
              <span className="ico">
                <Icon name="shield" size={26} strokeWidth={1.8} />
              </span>
              <h3>Our Values</h3>
              <p>
                Integrity, impartiality, competence, excellence, and collaboration — the
                principles behind every accreditation decision and every relationship we build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats band ---------- */}
      <section className="abx-stats">
        <div className="abx-container">
          <div className="abx-stats-grid reveal">
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why AAA ---------- */}
      <section className="abx-section">
        <div className="abx-container">
          <div className="abx-head-center reveal">
            <div className="abx-kicker center">Why AAA</div>
            <h2 className="abx-h2">What Sets Us Apart</h2>
          </div>
          <div className="abx-why-grid reveal">
            {PRINCIPLES.map((p) => (
              <div className="abx-why-card" key={p.title}>
                <span className="ico">
                  <Icon name={p.icon} size={26} strokeWidth={1.8} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What We Do (sectors) ---------- */}
      <section className="abx-process">
        <div className="abx-stripes rev" aria-hidden="true" />
        <div className="abx-container">
          <div className="abx-head-split reveal">
            <div className="l">
              <div className="abx-kicker on-dark">What We Do</div>
              <h2 className="abx-h2 light">Accreditation Across Multiple Sectors</h2>
            </div>
            <Link href="/programs" className="abx-btn abx-btn-outline-gold">
              Explore All Programs
            </Link>
          </div>
          <div className="abx-process-grid reveal">
            {PROGRAMS.map((p, i) => (
              <div className="abx-step" key={p.title}>
                <div className="no-row">
                  <span className="no">SECTOR 0{i + 1}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <Link href={p.href} className="more">
                  Learn more <Icon name="arrow" size={15} strokeWidth={2} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Leadership team (carousel) ---------- */}
      <section className="abx-section">
        <div className="abx-container">
          <div className="abx-head-center reveal">
            <div className="abx-kicker center">Our People</div>
            <h2 className="abx-h2">A Committed Leadership Team</h2>
          </div>
          <div className="reveal">
            <TeamCarousel />
          </div>
        </div>
      </section>

      {/* ---------- Executive Director's message ---------- */}
      <section className="abx-section cream">
        <div className="abx-container">
          <div className="abx-head-center reveal">
            <div className="abx-kicker center">Executive Director&rsquo;s Message</div>
            <h2 className="abx-h2">Leading with Quality and Confidence</h2>
          </div>
          <div className="abx-quote reveal">
            <span className="mark" aria-hidden="true">
              &ldquo;
            </span>
            <span className="abx-sq" aria-hidden="true" />
            <h3>Accreditation is more than recognition</h3>
            <p>
              At the American Accreditation Association, we believe accreditation is a commitment
              to quality, competence, and continual improvement. Every organization we work with
              has its own goals and challenges, but they all share one objective: building
              confidence among the people they serve.
            </p>
            <p>
              Our role is to provide an impartial, transparent, and internationally credible
              accreditation process that supports that objective. As AAA continues to expand
              globally, we remain committed to delivering professional accreditation services
              supported by qualified assessors, technical experts, and dedicated teams.
            </p>
            <div className="abx-quote-sig">
              <span className="av">ED</span>
              <div>
                <b>Executive Director</b>
                <small>American Accreditation Association</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Global reach (map) ---------- */}
      <section className="abx-section">
        <div className="abx-container">
          <div className="abx-head-split reveal">
            <div className="l">
              <div className="abx-kicker">Global Reach</div>
              <h2 className="abx-h2">Supporting Organizations Worldwide</h2>
            </div>
            <p className="r">
              AAA&rsquo;s presence across 57 countries reflects its commitment to quality-focused
              organizations in every region and professional environment.
            </p>
          </div>
          <div className="abx-map-frame reveal">
            <div className="abx-map-inner">
              <WorldMapFigure />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="abx-cta">
        <span className="abx-sq a" aria-hidden="true" />
        <span className="abx-sq b" aria-hidden="true" />
        <div className="abx-cta-inner reveal">
          <div className="l">
            <span>Ready to Begin?</span>
            <h2 className="abx-h2 light">
              Building Trust. Inspiring Confidence.
              <br />
              Recognizing Excellence.
            </h2>
            <p>
              Join organizations across 57 countries that have chosen the American Accreditation
              Association as their accreditation partner.
            </p>
          </div>
          <div className="abx-cta-actions">
            <Link href="/programs" className="abx-btn abx-btn-gold">
              Explore Accreditation Programs
            </Link>
            <Link href="/quote" className="abx-btn abx-btn-ghost">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
