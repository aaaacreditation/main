import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "../_components/Icon";
import { WorldMapFigure } from "../_components/WorldMap";
import { posts, formatDate } from "../news/posts";
import AboutCarousel from "./AboutCarousel";
import HeroLeadForm from "./HeroLeadForm";
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
  address: { "@type": "PostalAddress", addressRegion: "Virginia", addressCountry: "US" },
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

const MVV = [
  {
    no: "01",
    label: "Our Mission",
    title: "Inspiring Confidence Through Quality",
    text: "To provide impartial and credible accreditation services that recognize excellence, promote continual improvement, and strengthen confidence in organizations worldwide.",
  },
  {
    no: "02",
    label: "Our Vision",
    title: "Excellence Through Accreditation",
    text: "To be recognized as a leading international accreditation organization that inspires confidence and advances quality, competence, and continual improvement.",
  },
  {
    no: "03",
    label: "Our Values",
    title: "The Principles That Guide Us",
    text: "Integrity, impartiality, competence, excellence, and collaboration — the principles behind every accreditation decision and relationship we build.",
  },
];

const REASONS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Internationally Recognized Standards",
    text: "AAA accreditation reflects alignment with international best-practice requirements, giving stakeholders confidence in the organizations we recognize.",
  },
  {
    icon: "clipboard",
    title: "Dedicated Accreditation Coordinator",
    text: "Each applicant is assigned a dedicated coordinator to manage communication, coordinate process steps, and provide timely support.",
  },
  {
    icon: "scale",
    title: "Flexible Assessment Options",
    text: "AAA provides on-site, hybrid, and virtual assessment options while maintaining the same rigorous requirements and decision process.",
  },
  {
    icon: "globe",
    title: "Proven International Experience",
    text: "With activity across 57 countries, AAA works with organizations of different sizes, sectors, and regional contexts.",
  },
];

const TEAM: { title: string; role: string; text: string; img: string }[] = [
  {
    title: "Executive Leadership",
    role: "Governance & Direction",
    text: "Experienced leadership guiding AAA's strategy, impartial governance, and international growth.",
    img: "/about/leadership.jpg",
  },
  {
    title: "Accreditation Committee",
    role: "Impartial Decisions",
    text: "An independent committee reviews assessment findings and grants accreditation on evidence alone.",
    img: "/about/team-committee.jpg",
  },
  {
    title: "Qualified Assessors",
    role: "287 Assessors & Experts",
    text: "Sector-experienced assessors who evaluate organizations against recognized standards worldwide.",
    img: "/about/team-assessors.jpg",
  },
  {
    title: "Technical Experts",
    role: "Sector Specialists",
    text: "Specialists across healthcare, education, conformity assessment, and enterprise development.",
    img: "/about/team-experts.jpg",
  },
  {
    title: "Advisory Committees",
    role: "Standards & Guidance",
    text: "Advisory committees supporting the development and continual review of AAA requirements.",
    img: "/about/team-advisory.jpg",
  },
  {
    title: "International Network",
    role: "57 Countries",
    text: "A worldwide professional network supporting organizations across regions and environments.",
    img: "/about/team-network.jpg",
  },
];

const STORIES: { name: string; sector: string; img: string; text: string; href: string }[] = [
  { name: "Domus Salutis", sector: "Healthcare", img: "/about/story-domus.jpg", text: "A healthcare organization demonstrating commitment to quality, patient confidence, and recognized excellence.", href: "/news" },
  { name: "IIBMS", sector: "Education & Training", img: "/about/story-iibms.jpg", text: "An education and training provider using accreditation to strengthen trust, credibility, and learning standards.", href: "/news" },
  { name: "NSC", sector: "International", img: "/about/story-nsc.jpg", text: "A regional organization reflecting AAA's growing reach and recognition across international markets.", href: "/news" },
  { name: "Woodcroft University", sector: "Education & Training", img: "/about/story-woodcroft.jpg", text: "Accredited as a Training & Education Provider for its Data Science and Cybersecurity master's programs.", href: "/news/woodcroft-university-earns-international-accreditation-for-data-science-and-cybersecurity-programs" },
  { name: "Global College of America", sector: "Higher Education", img: "/about/story-gca.jpg", text: "Achieved AAA accreditation recognizing its commitment to higher-education quality and excellence.", href: "/news/global-college-of-america-achieves-aaa-accreditation-for-higher-education-excellence" },
  { name: "Welcome Home Health", sector: "Healthcare", img: "/about/story-whh.jpg", text: "A Portland-based organization accredited for its commitment to quality care and professional training.", href: "/news/aaa-accredits-welcome-home-health-portland" },
];

/** Cleans WP excerpt artifacts (": :" and trailing "[…]") for card display. */
function cleanExcerpt(s: string): string {
  return s
    .replace(/:\s*:/g, ":")
    .replace(/\s*\[…\]\s*$/, "…")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function tagFor(title: string): string {
  const t = title.toLowerCase();
  if (/(webinar|event|conference|summit)/.test(t)) return "Event";
  if (/(guide|difference|vs\.?|what|how|why|know)/.test(t)) return "Article";
  return "News";
}

const UPDATES = posts.slice(0, 3);

export default function AboutPage() {
  return (
    <div className="abx">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />

      {/* ---------- Hero + lead form ---------- */}
      <section className="abx-hero">
        <div className="abx-container abx-hero-grid">
          <div className="abx-hero-copy reveal">
            <nav className="abx-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>About Us</span>
            </nav>
            <span className="abx-eyebrow">Quality • Competence • Continuous Improvement</span>
            <h1>
              Inspiring Confidence. <span className="gold">Recognizing Excellence.</span>
            </h1>
            <p className="abx-hero-sub">
              Independent accreditation that helps organizations demonstrate quality, strengthen
              credibility, and achieve recognition across education, healthcare, conformity
              assessment, and SME sectors.
            </p>
            <div className="abx-hero-actions">
              <Link href="/programs/healthcare" className="abx-btn abx-btn-gold">
                Explore Accreditation Programs
                <Icon name="arrow" className="abx-arw" />
              </Link>
              <Link href="/directory/accredited-organizations" className="abx-btn abx-btn-ghost">
                View Accredited Directory
              </Link>
            </div>
            <div className="abx-hero-trust">
              {STATS.map((s) => (
                <div key={s.label}>
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="abx-hero-form-wrap reveal">
            <HeroLeadForm />
          </div>
        </div>
      </section>

      {/* ---------- Who We Are ---------- */}
      <section className="abx-section">
        <div className="abx-container abx-who">
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
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Building Confidence Through <span className="gold">Accreditation</span>
            </h2>
            <p>
              The American Accreditation Association (AAA) is an independent accreditation
              organization committed to promoting quality, competence, and confidence across
              organizations worldwide.
            </p>
            <p>
              Headquartered in Virginia, United States, AAA delivers accreditation services through
              an international network of assessors and technical experts supporting organizations
              across 57 countries — helping them strengthen credibility, improve performance, and
              demonstrate their commitment to excellence.
            </p>
            <div className="abx-checklist">
              <span><Icon name="check" size={18} strokeWidth={2.4} /> Independent &amp; Impartial</span>
              <span><Icon name="check" size={18} strokeWidth={2.4} /> Globally Recognized</span>
              <span><Icon name="check" size={18} strokeWidth={2.4} /> Evidence-Based Decisions</span>
              <span><Icon name="check" size={18} strokeWidth={2.4} /> Expert Assessors</span>
            </div>
            <div className="abx-who-actions">
              <Link href="/about-accreditation" className="abx-btn abx-btn-navy">
                Our Standards
                <Icon name="arrow" className="abx-arw" />
              </Link>
              <Link href="/contact" className="abx-btn abx-btn-outline">
                Contact AAA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mission / Vision / Values ---------- */}
      <section className="abx-section light">
        <div className="abx-container">
          <div className="abx-head reveal">
            <div className="abx-kicker">Our Foundation</div>
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Mission, Vision &amp; Values
            </h2>
            <p className="abx-desc">
              Clear principles guide every assessment, every decision, and every partnership we
              build.
            </p>
          </div>
          <div className="abx-mvv reveal">
            {MVV.map((m) => (
              <article className="abx-mvv-card" key={m.no}>
                <div className="abx-mvv-in">
                  <div className="abx-flagband" aria-hidden="true">
                    <span className="canton">★ ★ ★</span>
                    <span className="stripes" />
                  </div>
                  <span className="abx-mvv-no" aria-hidden="true">{m.no}</span>
                  <span className="abx-mvv-label">{m.label}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <span className="abx-mvv-rule" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Leadership carousel ---------- */}
      <section className="abx-section">
        <div className="abx-container">
          <div className="abx-head center reveal">
            <div className="abx-kicker">Our People</div>
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              A Committed Leadership Team
            </h2>
            <p className="abx-desc">
              AAA&rsquo;s work is supported by experienced leadership, qualified assessors, and
              international expertise across every sector we serve.
            </p>
          </div>
          <div className="reveal">
            <AboutCarousel label="AAA leadership and expertise">
              {TEAM.map((m, i) => (
                <article className="abx-team-card" key={m.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.title} />
                  <span className="abx-team-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="abx-team-overlay">
                    <small>{m.role}</small>
                    <b>{m.title}</b>
                    <p>{m.text}</p>
                  </div>
                </article>
              ))}
            </AboutCarousel>
          </div>
        </div>
      </section>

      {/* ---------- Global Trust: reasons + stats + map ---------- */}
      <section className="abx-section wash">
        <div className="abx-container">
          <div className="abx-head center reveal">
            <div className="abx-kicker">Global Trust</div>
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
              Why Organizations Around the World Trust AAA
            </h2>
            <p className="abx-desc">
              AAA brings together recognized standards, structured coordination, flexible assessment
              options, and international experience across a growing global network.
            </p>
          </div>

          <div className="abx-reasons reveal">
            {REASONS.map((r) => (
              <div className="abx-reason" key={r.title}>
                <span className="ico"><Icon name={r.icon} /></span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          <div className="abx-visual reveal">
            <div className="abx-stats-panel">
              <div className="abx-stats-grid">
                {STATS.map((s) => (
                  <div className="abx-stat" key={s.label}>
                    <div className="num">{s.num}</div>
                    <div className="lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="abx-map-panel">
              <div className="abx-map-head">
                <div>
                  <h3>Supporting Organizations Across 57 Countries</h3>
                  <p>
                    AAA&rsquo;s international footprint reflects its growing role in supporting
                    quality-focused organizations across multiple regions and sectors.
                  </p>
                </div>
                <span className="abx-map-badge">Global Presence</span>
              </div>
              <div className="abx-map-image">
                <WorldMapFigure />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Success Stories carousel ---------- */}
      <section className="abx-section">
        <div className="abx-container">
          <div className="abx-head center reveal">
            <div className="abx-kicker">Success Stories</div>
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
              Trusted by organizations committed to excellence.
            </h2>
            <p className="abx-desc">
              Real organizations. Real recognition. Real accreditation journeys from different
              countries and sectors.
            </p>
          </div>
          <div className="reveal">
            <AboutCarousel label="AAA accredited organization success stories">
              {STORIES.map((s) => (
                <article className="abx-story" key={s.name}>
                  <div className="abx-story-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.name} />
                    <span className="abx-story-badge">{s.sector}</span>
                  </div>
                  <div className="abx-story-body">
                    <h3>{s.name}</h3>
                    <p>{s.text}</p>
                    <Link href={s.href} className="abx-readmore">
                      Read Story <Icon name="arrow" />
                    </Link>
                  </div>
                </article>
              ))}
            </AboutCarousel>
          </div>
          <div className="abx-center-action reveal">
            <Link href="/news" className="abx-btn abx-btn-gold">
              View All Success Stories
              <Icon name="arrow" className="abx-arw" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Resources: Latest Insights & Updates (real news) ---------- */}
      <section className="abx-section light">
        <div className="abx-container">
          <div className="abx-head center reveal">
            <div className="abx-kicker">Resources</div>
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
              Latest Insights &amp; Updates
            </h2>
            <p className="abx-desc">
              Recent articles, announcements, and events from the AAA accreditation community.
            </p>
          </div>
          <div className="abx-updates reveal">
            {UPDATES.map((p) => (
              <article className="abx-update" key={p.slug}>
                <div className="row">
                  <span className="abx-tag">{tagFor(p.title)}</span>
                  <span className="date">{formatDate(p.date)}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{cleanExcerpt(p.excerpt)}</p>
                <Link href={`/news/${p.slug}`} className="abx-readmore">
                  Read more <Icon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
          <div className="abx-center-action reveal">
            <Link href="/news" className="abx-btn abx-btn-outline">
              Explore All Resources
              <Icon name="arrow" className="abx-arw" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Executive Director's message ---------- */}
      <section className="abx-section wash">
        <div className="abx-container">
          <div className="abx-head center reveal">
            <div className="abx-kicker">Executive Director&rsquo;s Message</div>
            <h2 className="abx-title" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
              Leading with Quality and Confidence
            </h2>
          </div>
          <div className="abx-quote reveal">
            <span className="mark" aria-hidden="true">&ldquo;</span>
            <h3>Accreditation is more than recognition</h3>
            <p>
              At the American Accreditation Association, we believe accreditation is a commitment to
              quality, competence, and continual improvement. Every organization we work with has
              its own goals and challenges, but they all share one objective: building confidence
              among the people they serve.
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

      {/* ---------- CTA ---------- */}
      <section className="abx-cta">
        <div className="abx-cta-inner reveal">
          <h2>Ready to Begin Your Accreditation Journey?</h2>
          <p>
            Whether you are a training provider, healthcare organization, conformity assessment
            body, or SME, AAA can guide you toward the accreditation pathway that fits your
            organization.
          </p>
          <div className="abx-cta-actions">
            <Link href="/programs/healthcare" className="abx-btn abx-btn-gold">
              Explore Accreditation Programs
              <Icon name="arrow" className="abx-arw" />
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
