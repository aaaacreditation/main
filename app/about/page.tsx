import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../_components/Icon";
import { WorldMapFigure } from "../_components/WorldMap";

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

const VALUES = [
  {
    icon: "shield",
    title: "Integrity",
    text: "We conduct all our activities with honesty, professionalism, and ethical responsibility.",
  },
  {
    icon: "scale",
    title: "Impartiality",
    text: "Our accreditation decisions are made independently and objectively, based solely on evidence and established requirements.",
  },
  {
    icon: "check",
    title: "Competence",
    text: "We work with qualified assessors, technical experts, and accreditation professionals with relevant experience.",
  },
  {
    icon: "chart",
    title: "Excellence",
    text: "We encourage organizations to pursue continual improvement and sustainable quality performance.",
  },
  {
    icon: "globe",
    title: "Collaboration",
    text: "We believe effective collaboration with organizations, experts, and partners creates lasting value and positive impact.",
  },
] as const;

const PROGRAMS = [
  {
    icon: "book",
    title: "Training & Education Providers",
    text: "Supporting educational institutions, academies, and training providers in demonstrating excellence in learning, governance, and training delivery.",
    href: "/programs/training-education",
  },
  {
    icon: "medical",
    title: "Healthcare Organizations",
    text: "Promoting safer, higher-quality healthcare services through internationally recognized accreditation standards.",
    href: "/programs/healthcare",
  },
  {
    icon: "cert",
    title: "Conformity Assessment Bodies",
    text: "Providing accreditation for certification bodies, inspection bodies, testing laboratories, and other conformity assessment organizations.",
    href: "/programs/conformity-assessment-bodies",
  },
  {
    icon: "industry",
    title: "SMEs",
    text: "Supporting small and medium-sized enterprises in strengthening governance, performance, credibility, and business readiness.",
    href: "/programs/sme-funding-readiness",
  },
] as const;

const PRINCIPLES = [
  {
    icon: "scale",
    title: "Independent and Impartial Accreditation",
    text: "Accreditation decisions are made objectively, based on evidence, defined requirements, and independent review.",
  },
  {
    icon: "globe",
    title: "International Network of Experts",
    text: "AAA works with assessors and technical experts across different sectors, regions, and professional environments.",
  },
  {
    icon: "check",
    title: "Evidence-Based Decision-Making",
    text: "Every accreditation outcome is supported by documented evidence, assessment findings, and a structured decision process.",
  },
  {
    icon: "arrowUpRight",
    title: "Commitment to Continual Improvement",
    text: "AAA encourages organizations to use accreditation as a pathway for performance improvement, not only recognition.",
  },
] as const;

function SectionHead({
  kicker,
  title,
  desc,
  light,
}: {
  kicker: string;
  title: string;
  desc?: string;
  light?: boolean;
}) {
  return (
    <div className={"ab-section-head reveal" + (light ? " light" : "")}>
      <div className="ab-flagline" aria-hidden="true" />
      <div className="ab-kicker">{kicker}</div>
      <h2 className="ab-title">{title}</h2>
      {desc && <p className="ab-desc">{desc}</p>}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />

      {/* ---------- Hero ---------- */}
      <section className="about-hero ab-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span className="sep" />
              <span className="current">About AAA</span>
            </span>
          </div>
          <div className="ab-hero-grid">
            <div className="ab-hero-copy reveal">
              <span className="ab-eyebrow-pill">About AAA</span>
              <h1>About the American Accreditation Association</h1>
              <p className="ab-hero-sub">Inspiring Confidence. Recognizing Excellence.</p>
              <p className="ab-hero-lede">
                The American Accreditation Association supports organizations worldwide in
                demonstrating quality, competence, and continual improvement through independent
                accreditation services across multiple sectors.
              </p>
              <div className="ab-hero-actions">
                <Link href="/programs" className="btn btn-gold-grad">
                  Explore Accreditation Programs
                  <Icon name="arrow" className="arrow" />
                </Link>
                <Link href="/contact" className="btn btn-ghost-light">
                  Contact AAA
                </Link>
              </div>
            </div>
            <div className="ab-hero-card reveal">
              <div className="ab-hero-map">
                <WorldMapFigure showLegend={false} />
              </div>
              <div className="ab-hero-stats">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <strong>{s.num}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Who We Are ---------- */}
      <section className="ab-section">
        <div className="container">
          <div className="ab-who-grid">
            <div className="ab-who-left reveal">
              <div className="ab-card ab-who-copy">
                <div className="ab-kicker">Who We Are</div>
                <h2 className="ab-title">Building Confidence Through Accreditation</h2>
                <p>
                  The American Accreditation Association (AAA) is an independent accreditation
                  organization committed to promoting quality, competence, and confidence across
                  organizations worldwide.
                </p>
                <p>
                  Headquartered in Virginia, United States, AAA delivers accreditation services
                  through an international network of assessors and technical experts supporting
                  organizations across 57 countries.
                </p>
                <p>
                  AAA works with healthcare organizations, training and education providers,
                  conformity assessment bodies, SMEs, and professional institutions seeking to
                  demonstrate their commitment to recognized standards, continual improvement,
                  and stakeholder confidence.
                </p>
                <p>
                  Through structured, impartial, and transparent accreditation processes, AAA
                  helps organizations strengthen credibility, improve performance, and demonstrate
                  their commitment to excellence.
                </p>
              </div>
              <div className="ab-glance">
                <div className="ab-glance-head">AAA at a Glance</div>
                <div className="ab-glance-list">
                  <div>
                    <strong>Virginia, USA</strong>
                    <span>Head Office</span>
                  </div>
                  <div>
                    <strong>57</strong>
                    <span>Countries Served</span>
                  </div>
                  <div>
                    <strong>200+</strong>
                    <span>Accredited Organizations</span>
                  </div>
                  <div>
                    <strong>287</strong>
                    <span>Assessors & Experts</span>
                  </div>
                  <div>
                    <strong>20,162</strong>
                    <span>Accredited Certificates</span>
                  </div>
                  <div>
                    <strong>Multiple</strong>
                    <span>Accreditation Programs</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ab-who-right reveal">
              <figure className="ab-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/assessment.jpg" alt="AAA accreditation assessment in practice" />
                <figcaption>
                  Accreditation in practice: reviewing evidence, engaging teams, and supporting
                  continual improvement.
                </figcaption>
              </figure>
              <figure className="ab-team-strip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/leadership.jpg" alt="AAA leadership team" />
                <figcaption>
                  Leadership and technical expertise supporting AAA&rsquo;s international
                  accreditation activities.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mission & Vision ---------- */}
      <section className="ab-section alt">
        <div className="container">
          <SectionHead
            kicker="Mission & Vision"
            title="Our Purpose and Direction"
            desc="AAA is guided by a clear mission and vision focused on quality, competence, confidence, and continual improvement."
          />
          <div className="ab-mv-grid reveal">
            <div className="ab-mv-card">
              <div className="ab-mv-icon">
                <Icon name="flag" />
              </div>
              <h3>Our Mission</h3>
              <h4>Inspiring Confidence Through Quality</h4>
              <p>
                To provide impartial and credible accreditation services that recognize
                excellence, promote continual improvement, and strengthen confidence in
                organizations worldwide.
              </p>
            </div>
            <div className="ab-mv-card">
              <div className="ab-mv-icon">
                <Icon name="globe" />
              </div>
              <h3>Our Vision</h3>
              <h4>Excellence Through Accreditation</h4>
              <p>
                To be recognized as a leading international accreditation organization that
                inspires confidence and advances quality, competence, and continual improvement
                through accreditation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="ab-section">
        <div className="container">
          <SectionHead kicker="Our Values" title="Principles That Guide Our Work" />
          <div className="ab-values-grid reveal">
            {VALUES.map((v) => (
              <div key={v.title} className="ab-value-card">
                <div className="ab-value-icon">
                  <Icon name={v.icon} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What We Do ---------- */}
      <section className="ab-section alt">
        <div className="container">
          <SectionHead
            kicker="What We Do"
            title="Accreditation Across Multiple Sectors"
            desc="AAA provides independent accreditation services that help organizations demonstrate quality, competence, and commitment to continual improvement."
          />
          <div className="ab-program-grid reveal">
            {PROGRAMS.map((p) => (
              <Link key={p.title} href={p.href} className="ab-program-card">
                <span className="ab-program-ribbon" aria-hidden="true">
                  <span className="ab-ribbon-star">&#9733;</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="ab-ribbon-seal" src="/logo/acc-org.png" alt="" />
                </span>
                <div className="ab-program-body">
                  <div className="ab-program-icon">
                    <Icon name={p.icon} size={26} />
                  </div>
                  <h3>{p.title}</h3>
                  <span className="ab-program-rule" aria-hidden="true" />
                  <p>{p.text}</p>
                  <span className="ab-program-more">
                    Learn more <Icon name="arrow" className="arrow" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why AAA ---------- */}
      <section className="ab-section">
        <div className="container">
          <SectionHead
            kicker="Why AAA Stands Apart"
            title="A Professional Accreditation System Built on Trust"
            desc="AAA combines impartial governance, international expertise, structured assessment, and evidence-based decision-making."
          />
          <div className="ab-choose-grid">
            <div className="ab-card ab-choose-list reveal">
              <h3>What Defines AAA</h3>
              <p className="ab-choose-intro">
                AAA combines impartial governance, international expertise, structured assessment,
                and evidence-based decision-making to support confidence in accredited
                organizations.
              </p>
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="ab-principle">
                  <div className="ab-principle-icon">
                    <Icon name={p.icon} />
                  </div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ab-map-block reveal">
              <div className="ab-map-stats">
                {STATS.map((s) => (
                  <div key={s.label} className="ab-map-stat">
                    <strong>{s.num}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="ab-map-inner">
                <h3>Supporting Organizations Worldwide</h3>
                <p>
                  AAA&rsquo;s global presence reflects its commitment to supporting quality-focused
                  organizations across different countries, sectors, and professional environments.
                </p>
                <WorldMapFigure />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Leadership ---------- */}
      <section className="ab-section alt">
        <div className="container">
          <SectionHead
            kicker="Leadership & Expertise"
            title="People Behind the Accreditation System"
            desc="AAA's work is supported by leadership, technical expertise, and international professional experience across multiple sectors."
          />
          <figure className="ab-team-banner reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/leadership.jpg" alt="AAA management and leadership team" />
          </figure>
          <p className="ab-leadership-caption reveal">
            AAA&rsquo;s international accreditation activities are guided by experienced leadership
            and supported by qualified assessors, technical experts, and dedicated accreditation
            teams around the world.
          </p>
        </div>
      </section>

      {/* ---------- Executive Director's Message ---------- */}
      <section className="ab-section">
        <div className="container">
          <div className="ab-exec-box reveal">
            <div className="ab-kicker">Executive Director&rsquo;s Message</div>
            <h2 className="ab-title">A Message from the Executive Director</h2>
            <h3>Leading with Quality, Competence, and Confidence</h3>
            <p>
              At the American Accreditation Association, we believe accreditation is more than
              recognition&mdash;it is a commitment to quality, competence, and continual
              improvement.
            </p>
            <p>
              Every organization we work with has its own goals and challenges, but they all share
              one objective: building confidence among the people they serve. Our role is to
              provide an impartial, transparent, and internationally credible accreditation
              process that supports that objective.
            </p>
            <p>
              As AAA continues to expand globally, we remain committed to delivering professional
              accreditation services supported by qualified assessors, technical experts, and
              dedicated accreditation teams.
            </p>
            <div className="ab-signature">
              Executive Director
              <br />
              American Accreditation Association
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Commitment ---------- */}
      <section className="ab-section ab-commitment">
        <div className="container">
          <SectionHead
            light
            kicker="Our Commitment"
            title="Committed to Quality, Impartiality, and Confidence"
            desc="We aim to ensure that every accreditation decision reflects evidence, competence, fairness, and integrity."
          />
          <p className="ab-commit-text reveal">
            AAA is committed to maintaining the highest standards of professionalism,
            impartiality, consistency, and integrity throughout every stage of the accreditation
            process. Our accreditation activities are supported by qualified experts, sound
            governance, objective decision-making, and internationally recognized good practices.
          </p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="ab-cta">
        <div className="container reveal">
          <h2>Building Trust. Inspiring Confidence. Recognizing Excellence.</h2>
          <p>
            Join organizations across 57 countries that have chosen the American Accreditation
            Association as their accreditation partner.
          </p>
          <div className="ab-cta-actions">
            <Link href="/programs" className="btn btn-gold-grad">
              Explore Accreditation Programs
              <Icon name="arrow" className="arrow" />
            </Link>
            <Link href="/quote" className="btn btn-ghost-light">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
