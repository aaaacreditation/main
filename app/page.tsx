import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "./_components/JsonLd";
import { WorldMapFigure } from "./_components/WorldMap";
import NavyCard from "./_components/site/NavyCard";
import SectionHead from "./_components/site/SectionHead";
import Glyph, { type GlyphName } from "./_components/site/Glyph";
import HomeMetrics, { type HomeMetric } from "./_components/home/HomeMetrics";
import SuccessCarousel, { type SuccessStory } from "./_components/home/SuccessCarousel";
import { FACTS, PROGRAMS } from "@/lib/facts";
import { breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";
import "./home.css";

/* =========================================================================
   HOMEPAGE — Oct 2026 rebuild on the client's final homepage structure
   ("Home page" package: Hero + metrics → Accreditation Programs → Why
   Organizations Trust AAA → Success Stories → Latest Insights → Final CTA),
   rendered in the AAA design system. Every card is the SME blue card.

   Approved decisions applied (client README): the hero metrics bar carries
   the four metrics only (no mini map / "A GLOBAL PRESENCE"); Section 03 has
   no duplicate metrics bar; the "View All Success Stories" CTA is AAA blue.
   The hero keeps the client-approved BizGen treatment from home.css.
   ========================================================================= */

// The root layout's `title.template` does not apply to its own segment, so the
// homepage carries the brand suffix itself.
export const metadata: Metadata = pageMeta({
  title: "International Accreditation Body | AAA",
  description: `AAA provides international accreditation for healthcare, training and education providers, conformity assessment bodies and SMEs across ${FACTS.countriesPlus} countries.`,
  path: "/",
  keywords: [
    "American Accreditation Association",
    "international accreditation",
    "healthcare accreditation",
    "training provider accreditation",
    "conformity assessment accreditation",
    "SME accreditation",
  ],
});

const IMG = "/images/site/home";
const STORY_URL =
  "https://casestudies-alpha.vercel.app/case-studies/accreditation-impact-12-growth-500-students-certified";

/* ------------------------------------------------------------ 01 · Hero */
const METRICS: HomeMetric[] = [
  { value: FACTS.countriesPlus, label: "Countries", icon: "globe" },
  { value: FACTS.organizations, label: "Accredited Organizations", icon: "building" },
  { value: FACTS.assessors, label: "Assessors & Experts", icon: "users" },
  { value: FACTS.certificates, label: "Accredited Certificates", icon: "certificate" },
];

/* ------------------------------------------------------- 02 · Programs */
const PROGRAM_CARDS: { icon: GlyphName; title: string; text: string; href: string; schemaName: string }[] = [
  {
    icon: "graduation",
    title: "Education & Training",
    text: "Accreditation for training providers, academies, educational institutions and learning organizations seeking to strengthen credibility and demonstrate quality.",
    href: PROGRAMS.training.href,
    schemaName: PROGRAMS.training.label,
  },
  {
    icon: "heart-pulse",
    title: "Healthcare",
    text: "Accreditation for healthcare organizations seeking to improve quality, safety, performance and confidence across clinical and support services.",
    href: PROGRAMS.healthcare.href,
    schemaName: PROGRAMS.healthcare.label,
  },
  {
    icon: "badge-check",
    title: "Conformity Assessment",
    text: "Accreditation for certification bodies, inspection bodies, laboratories and other conformity assessment organizations operating against international standards.",
    href: PROGRAMS.cab.href,
    schemaName: PROGRAMS.cab.label,
  },
  {
    icon: "briefcase",
    title: "SMEs",
    text: "A structured accreditation pathway for small and medium enterprises committed to stronger systems, continuous improvement and business readiness.",
    href: PROGRAMS.sme.href,
    schemaName: PROGRAMS.sme.label,
  },
];

/* ---------------------------------------------------------- 03 · Trust */
const TRUST: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "International Standards & Recognized Frameworks",
    text: "AAA accreditation programs are developed around internationally established standards and sector-specific quality frameworks. AAA Healthcare Accreditation Standards have also been assessed and accredited by ISQua EEA.",
  },
  {
    icon: "user-check",
    title: "Dedicated Accreditation Coordinator",
    text: "Each applicant is assigned a dedicated Accreditation Coordinator to manage communication, coordinate process steps and provide timely administrative support.",
  },
  {
    icon: "target",
    title: "Flexible Assessment Options",
    text: "AAA provides on-site, remote and hybrid assessment options where appropriate, while maintaining the same rigorous accreditation requirements and decision process.",
  },
  {
    icon: "trending-up",
    title: "Proven International Experience",
    text: `With activity across ${FACTS.countriesPlus} countries, AAA has experience working with organizations of different sizes, sectors and regional contexts.`,
  },
];

/* ------------------------------------------------- 04 · Success stories */
const STORIES: SuccessStory[] = [
  {
    featured: true,
    name: "Monarch Master Injector",
    img: `${IMG}/monarch-master-injector-story.webp`,
    alt: "Monarch Master Injector accreditation story",
    sector: "Medical Education",
    country: "Texas, USA",
    metric: "12% Growth · 500+ Students Certified",
    quote: "“AAA Accreditation has opened new doors for Monarch Master Injectors.”",
    desc: "World-class training for medical professionals in cosmetic injections and wellness/weight-loss injections.",
    href: STORY_URL,
  },
  {
    name: "Monarch Graduates",
    img: `${IMG}/monarch-graduates-story.webp`,
    alt: "Monarch Graduates accreditation story",
    sector: "Medical Education",
    country: "Texas, USA",
    metric: "Post-Accreditation Impact",
    quote: "“A strong visual story showing learners, certificates, and practical professional training.”",
    desc: "A supporting Monarch card that can link to the same detailed case study or video section.",
    href: STORY_URL,
  },
  {
    name: "Domus Salutis",
    img: `${IMG}/domus-salutis-accreditation-story-6b4a6efe.webp`,
    alt: "Domus Salutis accreditation story",
    sector: "Healthcare",
    country: "Italy",
    metric: "Healthcare Accreditation",
    quote: "“A healthcare organization demonstrating commitment to recognized excellence.”",
    desc: "A strong healthcare success story for patient confidence, quality, and institutional recognition.",
    href: STORY_URL,
  },
  {
    name: "IIBMS",
    img: `${IMG}/iibms-accreditation-story-c29e334c.webp`,
    alt: "IIBMS accreditation story",
    sector: "Education & Training",
    country: "India",
    metric: "Training Provider Accreditation",
    quote: "“Accreditation helped strengthen trust, credibility, and learning standards.”",
    desc: "An education and training provider using accreditation as a signal of structured quality.",
    href: STORY_URL,
  },
  {
    name: "NSC",
    img: `${IMG}/nsc-accreditation-story-e32493fe.jpg`,
    alt: "NSC accreditation story",
    sector: "Professional / Regional",
    country: "Middle East",
    metric: "Regional Recognition",
    quote: "“A strong example of AAA's growing international presence.”",
    desc: "A regional organization reflecting the international reach and practical value of accreditation.",
    href: STORY_URL,
  },
  {
    name: "Cinute Digital",
    img: `${IMG}/cinute-digital-accreditation-story-8c8b1a4e.webp`,
    alt: "Cinute Digital accreditation story",
    sector: "Corporate / SME",
    country: "India",
    metric: "Corporate Quality Recognition",
    quote: "“A modern organization demonstrating quality and professional development.”",
    desc: "An SME/corporate story that adds diversity to the homepage success stories.",
    href: STORY_URL,
  },
  {
    name: "Meridian",
    img: `${IMG}/meridian-accreditation-story-4b226d09.webp`,
    alt: "Meridian accreditation story",
    sector: "Training Provider",
    country: "International",
    metric: "Training Excellence",
    quote: "“Recognition for structured learning, quality, and continuous improvement.”",
    desc: "A training-provider story suitable for showing breadth across the education sector.",
    href: STORY_URL,
  },
  {
    name: "Ullemeyer",
    img: `${IMG}/ullemeyer-accreditation-story-17ede0a0.webp`,
    alt: "Ullemeyer accreditation story",
    sector: "Healthcare / Professional",
    country: "United States",
    metric: "Professional Recognition",
    quote: "“A professional organization building confidence through accreditation.”",
    desc: "A US-based story that adds geographic balance and strengthens international proof.",
    href: STORY_URL,
  },
];

/* ------------------------------------------------------- 05 · Insights */
const INSIGHTS: {
  label: string;
  kind: "article" | "event" | "news";
  kicker: string;
  title: string;
  text: string;
  cta: string;
  img: string;
  alt: string;
  w: number;
  h: number;
  icon: GlyphName;
}[] = [
  {
    label: "Article",
    kind: "article",
    kicker: "Accreditation Insights",
    title: "Is Accreditation Really About Passing the Survey?",
    text: "For many organizations, an accreditation survey can feel like the finish line. Explore why accreditation is better understood as an ongoing journey of quality and improvement.",
    cta: "Read Article",
    img: `${IMG}/insight-article-1.png`,
    alt: "Healthcare professionals reviewing quality information",
    w: 548,
    h: 345,
    icon: "file-text",
  },
  {
    label: "Event",
    kind: "event",
    kicker: "AAA Event",
    title: "Maintaining Your Accreditation Without Turning It Into a Second Job",
    text: "Join an upcoming AAA session focused on practical ways to maintain accreditation requirements as part of everyday operations and continuous improvement.",
    cta: "View Event",
    img: `${IMG}/insight-article-2.png`,
    alt: "Team reviewing plans and schedules",
    w: 548,
    h: 345,
    icon: "calendar",
  },
  {
    label: "News",
    kind: "news",
    kicker: "AAA News & Awareness",
    title: "Blood Cancer Awareness Month: Turning Awareness into Action",
    text: "Awareness can lead to earlier action. AAA joins the global conversation highlighting the importance of awareness, timely diagnosis and appropriate care.",
    cta: "Read News",
    img: `${IMG}/insight-news.png`,
    alt: "Blood Cancer Awareness Month graphic",
    w: 548,
    h: 365,
    icon: "megaphone",
  },
];

/* --------------------------------------------------------------- JSON-LD */
// Organization and WebSite are emitted once in app/layout.tsx; breadcrumbSchema
// prepends Home itself, so `[]` yields the single Home crumb for "/".
const SCHEMA = [
  breadcrumbSchema([]),
  ...PROGRAM_CARDS.map((p) =>
    serviceSchema({
      name: p.schemaName,
      description: p.text,
      path: p.href,
      audience: "Organizations seeking international accreditation",
    })
  ),
];

export default function HomePage() {
  return (
    <div className="axp homex">
      <JsonLd schema={SCHEMA} />

      {/* ============================ 01 · Hero ============================ */}
      <section className="ax-hero hx-hero" id="top">
        <Image
          className="hx-hero-img"
          src={`${IMG}/aaa-homepage-hero.webp`}
          alt="AAA team and healthcare professionals during an accreditation-related event"
          fill
          priority
          sizes="100vw"
        />
        <span className="hx-hero-scrim" aria-hidden="true" />
        {/* Animated overlay: drifting light, a periodic sheen and slow seal rings. */}
        <div className="hx-hero-fx" aria-hidden="true">
          <span className="hx-fx-aura a" />
          <span className="hx-fx-aura b" />
          <span className="hx-fx-sheen" />
          <span className="hx-fx-rings">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="container">
          <div className="ax-hero-grid solo overlap">
            <div className="ax-hero-copy">
              <span className="ax-hero-badge axh-in" style={{ "--d": 0 } as React.CSSProperties}>Global Accreditation. Trusted Quality.</span>

              <h1 className="axh-in" style={{ "--d": 1 } as React.CSSProperties}>
                Inspiring Confidence. <em>Recognizing Excellence.</em>
              </h1>

              <p className="ax-hero-lead axh-in" style={{ "--d": 2 } as React.CSSProperties}>
                The American Accreditation Association provides international accreditation that strengthens
                credibility, demonstrates quality and creates opportunities for organizations worldwide.
              </p>

              <div className="ax-actions axh-in" style={{ "--d": 3 } as React.CSSProperties}>
                <Link href="/programs" className="ax-btn ax-btn-gold">
                  Explore Accreditation Programs <Glyph name="arrow-right" size={15} strokeWidth={2} />
                </Link>
                <Link href="/contact" className="ax-btn ax-btn-ghost">
                  Talk to an Accreditation Expert
                </Link>
              </div>

              <p className="hx-help axh-in" style={{ "--d": 4 } as React.CSSProperties}>
                <span className="hx-help-ico" aria-hidden="true">
                  ?
                </span>
                Not sure which accreditation is right for your organization? Our team can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip — normal flow, pulled up over the hero (README V2). */}
      <div className="hx-metrics-wrap">
        <div className="container">
          <HomeMetrics items={METRICS} />
        </div>
      </div>

      {/* ===================== 02 · Accreditation programs ================== */}
      <section className="ax-section hx-programs" id="accreditation-programs">
        <div className="container">
          <SectionHead
            center
            eyebrow="Accreditation Programs"
            title="Find the Right Accreditation Program"
            intro="Choose the pathway that matches your organization type and quality objectives. AAA provides accreditation across education, healthcare, conformity assessment and SME sectors."
          />
          <div className="ax-blue-grid four">
            {PROGRAM_CARDS.map((p, i) => (
              <NavyCard
                key={p.title}
                icon={p.icon}
                no={String(i + 1).padStart(2, "0")}
                title={p.title}
                href={p.href}
                cta="Explore Program"
              >
                <p>{p.text}</p>
              </NavyCard>
            ))}
          </div>

          <div className="hx-support reveal">
            <span className="hx-support-ico" aria-hidden="true">
              <Glyph name="message" />
            </span>
            <div className="hx-support-copy">
              <strong>Not sure which program is right for your organization?</strong>
              <p>Speak with the AAA team and we will guide you toward the most suitable accreditation pathway.</p>
            </div>
            <Link href="/contact" className="ax-btn ax-btn-blue">
              Talk to an Accreditation Expert <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== 03 · Why organizations trust AAA ============= */}
      <section className="ax-section cream hx-trust" id="why-trust-aaa">
        <div className="container">
          <SectionHead
            center
            title={
              <>
                Why Organizations Around the World <em>Trust AAA</em>
              </>
            }
            intro="Organizations around the world choose AAA for its commitment to quality, international experience and practical, supportive approach to accreditation."
          />

          <div className="hx-trust-layout">
            <div className="ax-blue-grid two hx-trust-cards">
              {TRUST.map((t, i) => (
                <NavyCard key={t.title} icon={t.icon} no={String(i + 1).padStart(2, "0")} title={t.title}>
                  <p>{t.text}</p>
                </NavyCard>
              ))}
            </div>

            <div className="hx-reach reveal">
              <div className="hx-reach-band">
                <span className="hx-reach-mini">Global Experience. International Reach.</span>
                <h3>Supporting Organizations Across {FACTS.countriesPlus} Countries</h3>
                <p>
                  AAA&apos;s international footprint reflects its experience working with organizations, professionals
                  and quality-focused institutions across multiple regions and sectors.
                </p>
              </div>
              <div className="hx-reach-map">
                <WorldMapFigure />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= 04 · Success stories ===================== */}
      <section className="ax-section hx-stories" id="success-stories">
        <div className="container">
          <div className="hx-ss-head">
            <SectionHead
              eyebrow="Success Stories"
              title="Trusted by organizations committed to excellence."
              intro="Real accreditation journeys from healthcare organizations, education providers, SMEs, public institutions, and international partners recognized through AAA."
            />
            <aside className="hx-ss-feature reveal" aria-label="Featured story">
              <span className="hx-ss-feature-ico" aria-hidden="true">
                <Glyph name="trophy" />
              </span>
              <div>
                <strong>Featured Story</strong>
                <p>Monarch Master Injector: 12% growth and 500+ students certified after accreditation.</p>
              </div>
            </aside>
          </div>
        </div>

        <SuccessCarousel stories={STORIES} />

        <div className="container">
          <div className="hx-ss-cta">
            <Link href="/news" className="ax-btn ax-btn-blue">
              View All Success Stories <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================== 05 · Latest insights & updates ============== */}
      <section className="ax-section cream hx-insights" id="latest-insights">
        <div className="container">
          <SectionHead
            center
            eyebrow="Resources & Updates"
            title="Latest Insights & Updates"
            intro="Stay informed with practical accreditation insights, upcoming AAA events and the latest news from our global community."
          />
          <div className="ax-blue-grid hx-insight-grid">
            {INSIGHTS.map((n, i) => (
              <Link
                key={n.title}
                href="/news"
                className={`ax-card navy ax-blue reveal hx-insight ${n.kind}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <figure className="hx-insight-media">
                  <Image src={n.img} alt={n.alt} width={n.w} height={n.h} sizes="(max-width: 860px) 92vw, 400px" />
                  <span className="hx-insight-label">
                    <Glyph name={n.icon} size={13} strokeWidth={2} /> {n.label}
                  </span>
                </figure>
                <div className="hx-insight-body">
                  <span className="ax-blue-kicker">{n.kicker}</span>
                  <h3>{n.title}</h3>
                  <div className="ax-blue-body">
                    <p>{n.text}</p>
                  </div>
                  <span className="ax-card-go">
                    {n.cta} <Glyph name="arrow-right" size={14} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="ax-actions center">
            <Link href="/news" className="ax-btn ax-btn-ghost-navy">
              Explore All Resources <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ 06 · Final CTA ======================== */}
      <section className="ax-close hx-final" id="begin-accreditation">
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-close-inner reveal">
            <span className="eyebrow">Take the Next Step</span>
            <h2>Ready to Begin Your Accreditation Journey?</h2>
            <p>
              Whether you represent a healthcare organization, training and education provider, conformity assessment
              body or SME, our team can help you identify the accreditation pathway that fits your organization.
            </p>
            <div className="ax-close-actions">
              <Link href="/contact" className="ax-btn ax-btn-gold">
                Request Accreditation Information <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
              <Link href="/programs" className="ax-btn ax-btn-ghost">
                Explore Accreditation Programs <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
            </div>
            <p className="hx-help center">
              <span className="hx-help-ico" aria-hidden="true">
                ?
              </span>
              Not sure where to start? Our accreditation team is here to guide you through the options.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
