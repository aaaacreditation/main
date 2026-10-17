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
import { CONTACT, EXTERNAL, FACTS, PROGRAMS } from "@/lib/facts";
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
// Oct 2026: the client's "success stories home page" document — twelve
// organizations, in the document's order. Testimonials are verbatim (spelling
// fixed only), except Monarch's, which the document gave as a note ("12% Growth
// & 500+ students certified and The google reviews become 1500+(5.0⭐)") and is
// set as a sentence here. Rows supplied with a YouTube video show the video thumbnail
// and link to it; the rest show the certificate photo and link to the case
// studies site. Assets live in /public/case-studies.
const CS = "/case-studies";
const STORIES: SuccessStory[] = [
  {
    featured: true,
    name: "Monarch Master Injector",
    sector: "Healthcare",
    country: "USA",
    metric: "12% Growth · 500+ Students Certified",
    quote:
      "Accreditation impact: 12% growth and 500+ students certified, and Google reviews have grown to 1,500+ (5.0 ★).",
    img: `${CS}/monarch-master-injectors-certificate.jpg`,
    alt: "Monarch Master Injectors graduates holding their certificates",
    logo: `${CS}/monarch-master-injectors-logo.png`,
    href: STORY_URL,
  },
  {
    name: "Cinute Digital",
    sector: "Information Technology",
    country: "India",
    quote: "AAA’s global recognition has opened more doors with corporate clients, learners, and institutional partners.",
    img: `${CS}/cinute-digital-video.jpg`,
    alt: "Cinute Digital team with their AAA accreditation certificate",
    logo: `${CS}/cinute-digital-logo.jpg`,
    video: "https://www.youtube.com/watch?v=JN5Z7seQiFY",
  },
  {
    name: "Aldelma Training Center",
    sector: "Training Center",
    country: "Jordan, Iraq",
    quote:
      "Our main strategic benefits from accreditation are: we gained preferred vendor status with government entities and attracted multinational corporate clients.",
    img: `${CS}/aldelma-trading-certificate.jpg`,
    alt: "Aldelma Training Center representative holding the AAA accreditation certificate",
    logo: `${CS}/aldelma-trading-logo.jpg`,
  },
  {
    name: "Dr. Paul Clinic",
    sector: "Healthcare",
    country: "India",
    quote:
      "AAA accreditation has strengthened our patients’ trust, demonstrated our commitment to quality care, and supported our clinic’s growth.",
    img: `${CS}/dr-paul-clinic-certificate.jpg`,
    alt: "Dr. Paul’s clinic team receiving the AAA accreditation award",
    logo: `${CS}/dr-paul-clinic-logo.jpg`,
  },
  {
    name: "IIBMS",
    sector: "Training Center",
    country: "India",
    quote:
      "Since achieving AAA accreditation, we have seen a noticeable improvement. Accreditation has strengthened our credibility and market reputation.",
    img: `${CS}/iibms-certificate.jpg`,
    alt: "IIBMS team with the AAA accreditation certificate",
    logo: `${CS}/iibms-logo.jpg`,
  },
  {
    name: "Domus Salutis",
    sector: "Healthcare",
    country: "Italy",
    quote: "By working with the AAA, Domus Salutis has established a roadmap for ongoing growth in safety and medical technology.",
    img: `${CS}/domus-salutis-video.jpg`,
    alt: "Domus Salutis clinical team with the AAA accreditation plaque",
    logo: `${CS}/domus-salutis-logo.jpg`,
    video: "https://www.youtube.com/watch?v=SxgILo3vjGU",
  },
  {
    name: "Clarivate",
    sector: "Information Services",
    country: "USA, UK",
    quote:
      "Our experience with AAA was excellent. The accreditation process was professional, well-structured, and conducted with integrity, providing valuable insights that strengthened our organization.",
    img: `${CS}/clarivate-certificate.jpg`,
    alt: "Clarivate team receiving the AAA accreditation certificate",
    logo: `${CS}/clarivate-logo.jpg`,
  },
  {
    name: "QML",
    sector: "Certification Body",
    country: "Spain",
    quote:
      "AAA’s accreditation process was professional and smooth, providing valuable learning opportunities that helped us strengthen our certification practices.",
    img: `${CS}/qml-certificate.jpg`,
    alt: "QML representatives holding the AAA accreditation certificate",
    logo: `${CS}/qml-logo.png`,
  },
  {
    name: "RC Growth Consultancies",
    sector: "Consultation",
    country: "India",
    quote:
      "The value of accreditation extends far beyond recognition. It has helped our consultancy differentiate itself in the market while reinforcing a culture of quality and continual improvement.",
    img: `${CS}/rc-growth-consultancies-certificate.jpg`,
    alt: "RC Growth Consultancies founder holding the AAA accreditation certificate",
    logo: `${CS}/rc-growth-consultancies-logo.png`,
  },
  {
    name: "Namaa Academy",
    sector: "Academy",
    country: "Morocco",
    quote:
      "AAA’s accreditation recognises Namaa Academy’s commitment to quality education and strengthens our credibility as an ambitious academic institution.",
    img: `${CS}/namaa-academy-video.jpg`,
    alt: "Namaa Academy team receiving the AAA accreditation certificate",
    logo: `${CS}/namaa-academy-logo.png`,
    video: "https://www.youtube.com/watch?v=9Pluh1W5we8",
  },
  {
    name: "Global Medical City",
    sector: "Healthcare",
    country: "Egypt",
    quote:
      "Achieving AAA accreditation was a pivotal moment for us. It affirmed our dedication to providing world-class healthcare services and set a new benchmark for quality in Egypt.",
    img: `${CS}/global-medical-city-video.jpg`,
    alt: "Global Medical City team with the AAA accreditation award",
    logo: `${CS}/global-medical-city-logo.jpg`,
    video: "https://www.youtube.com/watch?v=zpzh6QtLdSI",
  },
  {
    name: "Clinoxy Solutions",
    sector: "Medical Devices",
    country: "India",
    quote:
      "The accreditation process has added real value to our organization, improving market credibility, increasing customer confidence, and supporting our mission to deliver high-quality healthcare solutions.",
    img: `${CS}/clinoxy-solutions-certificate.png`,
    alt: "Clinoxy Solutions director beside the AAA accreditation certificate",
    logo: `${CS}/clinoxy-solutions-logo.png`,
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
                <Link href={CONTACT.formHref} className="ax-btn ax-btn-ghost">
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
            <Link href={CONTACT.formHref} className="ax-btn ax-btn-blue">
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
                <NavyCard key={t.title} icon={t.icon} no={String(i + 1).padStart(2, "0")} title={t.title} compact>
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

        <SuccessCarousel stories={STORIES} moreHref={EXTERNAL.successStories} />

        <div className="container">
          <div className="hx-ss-cta">
            <a href={EXTERNAL.successStories} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-blue">
              View All Success Stories <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
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
              <Link href={CONTACT.formHref} className="ax-btn ax-btn-gold">
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
