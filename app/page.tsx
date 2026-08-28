import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "./_components/Icon";
import JsonLd from "./_components/JsonLd";
import SealRosette from "./_components/SealRosette";
import { WorldMapFigure } from "./_components/WorldMap";
import { CASE_STUDIES, type CaseStudy } from "./_data/case-studies";
import HeroStats from "./_components/home/HeroStats";
import HomeGallery from "./_components/home/HomeGallery";
import HomeTeam from "./_components/home/HomeTeam";
import Insights from "./_components/home/Insights";
import QuoteForm from "./_components/home/QuoteForm";
import { CONTACT, FACTS, PROGRAMS } from "@/lib/facts";
import { faqSchema, pageMeta, serviceSchema } from "@/lib/seo";
import "./home.css";

/* =========================================================================
   HOMEPAGE
   -------------------------------------------------------------------------
   Aug 2026 rebuild onto the shared `.ax-*` design system (app/aaa-ds.css),
   the same visual language as the two client-approved reference pages
   (/programs/iso-17021 and /programs/smes-accreditation-program). Bespoke
   bits live in app/home.css, scoped under `.homex`.

   CONTENT: the client reverted this page to GENERAL ACCREDITATION positioning
   in July 2026 — headline "International Accreditation Accepted Globally",
   a "Get a Quote" CTA and a certificate hero visual. SME-specific messaging
   belongs on the SME program/landing pages, not here. Every figure comes from
   lib/facts.ts, every testimonial from app/_data/case-studies.ts.
   ========================================================================= */

// The root layout's `title.template` does not apply to its own segment, so the
// homepage carries the brand suffix itself.
export const metadata: Metadata = pageMeta({
  title: "International Accreditation Accepted Globally | AAA",
  description: `AAA delivers internationally recognized accreditation for healthcare, conformity assessment bodies, training providers and SMEs across ${FACTS.countriesLabel}.`,
  path: "/",
});

const CONSULT = CONTACT.consultationUrl;

const HERO_SUB =
  "The American Accreditation Association offers accreditation worldwide, based on internationally recognized standards that ensure the competence of accredited organizations — and the global acceptance of their results.";

const HERO_STATS = [
  { num: FACTS.organizations, label: "Accredited organizations" },
  { num: FACTS.countriesPlus, label: "Countries served" },
  { num: FACTS.assessors, label: "Assessors & experts" },
] as const;

/** Standards named on the sample certificate in the hero visual. */
const CERT_STANDARDS = ["ISO 15189", "ISO/IEC 17025", "ISQua EEA"];

/** Standards the AAA programs are aligned with — shown in the hero marquee. */
const STANDARDS = [
  "ISQua EEA",
  "ISO/IEC 17021-1",
  "ISO/IEC 17025",
  "ISO 15189",
  "ISO/IEC 17020",
  "ISO/IEC 17024",
  "ISO/IEC 17065",
  "ISO/IEC 17043",
  "ASTM E2659",
];

/* ------------------------------------------------------ Why AAA (pillars) */
// Transcribed from AAA's mission and the Virginia authorization statement.
const PILLARS: { title: string; text: string }[] = [
  {
    title: "Globally accepted",
    text: "AAA's vision is international accreditation accepted globally — promoting acceptance of accredited results and certificates internationally and amongst global partners.",
  },
  {
    title: "Built on international standards",
    text: "Programs are based on internationally recognized standards — from ISO/IEC 17025 and ISO 15189 to ISO/IEC 17024 and ASTM E2659 — ensuring the competence of accredited organizations.",
  },
  {
    title: "US-authorized",
    text: "Authorized by the State Corporation Commission of the Commonwealth of Virginia to transact business under Title 13.1 of the Code of Virginia, offering a full range of comprehensive accreditation services.",
  },
  {
    title: "Independent and impartial",
    text: "Impartiality, transparency, objectivity and independence are paramount in all AAA operations — safeguarded by a published impartiality policy, conflict-of-interest management and non-discriminatory services.",
  },
];

/* -------------------------------------------------------------- Programs */
const PROGRAM_CARDS: {
  href: string;
  label: string;
  tag: string;
  img: string;
  alt: string;
  text: string;
  links?: { href: string; label: string }[];
}[] = [
  {
    href: PROGRAMS.healthcare.href,
    label: PROGRAMS.healthcare.label,
    tag: PROGRAMS.healthcare.standard,
    img: "/home/healthcare.jpg",
    alt: "Clinicians reviewing patient records in a hospital corridor",
    text: "Accreditation for hospitals, clinics, diagnostic centres, rehabilitation units and pharmacies — demonstrating a commitment to patient safety, clinical excellence and continuous improvement.",
  },
  {
    href: PROGRAMS.cab.href,
    label: PROGRAMS.cab.label,
    tag: "ISO/IEC 17000 series",
    img: "/home/conformity.jpg",
    alt: "Technician calibrating instruments in a testing laboratory",
    text: "A full family of programs supporting the global recognition of conformity-assessment results — testing, calibration and medical laboratories, certification bodies, inspection bodies and proficiency testing providers.",
    links: [
      { href: PROGRAMS.iso17025.href, label: PROGRAMS.iso17025.shortLabel },
      { href: PROGRAMS.iso15189.href, label: PROGRAMS.iso15189.shortLabel },
      { href: PROGRAMS.iso17021.href, label: PROGRAMS.iso17021.shortLabel },
      { href: PROGRAMS.iso17020.href, label: PROGRAMS.iso17020.shortLabel },
    ],
  },
  {
    href: PROGRAMS.training.href,
    label: PROGRAMS.training.label,
    tag: PROGRAMS.training.standard,
    img: "/home/training.jpg",
    alt: "Participants in a professional training workshop",
    text: "Formal recognition for training and education programs — classroom, workshop-based or e-learning, delivered anywhere in the world and assessed against ASTM E2659 and AAA's training standards.",
  },
  {
    href: PROGRAMS.sme.href,
    label: PROGRAMS.sme.label,
    tag: "Business Readiness Score",
    img: "/sme-journey-team.jpg",
    alt: "Two business owners reviewing their AAA accreditation certificate",
    text: "An independent, evidence-based assessment of how a small or medium enterprise is managed — producing an internationally recognized accreditation and a Business Readiness Score.",
  },
];

/* ------------------------------------------------------ Global recognition */
const METRICS = [
  { num: FACTS.countriesPlus, label: "Countries served" },
  { num: FACTS.organizations, label: "Accredited organizations" },
  { num: FACTS.assessors, label: "Assessors & experts" },
  { num: "ISQua", label: "EEA-assessed standards" },
];

const SUPPORT: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Internationally recognized standards",
    text: "AAA accreditation standards are assessed by ISQua EEA, reflecting alignment with international best-practice requirements.",
  },
  {
    icon: "clipboard",
    title: "Dedicated accreditation coordinator",
    text: "Each applicant is assigned a dedicated coordinator to manage communication, coordinate the process and provide timely support.",
  },
  {
    icon: "scale",
    title: "Flexible assessment options",
    text: "AAA provides on-site, hybrid and virtual assessment options while maintaining the same rigorous requirements and decision process.",
  },
  {
    icon: "globe",
    title: "Proven international experience",
    text: `With activity across ${FACTS.countriesLabel}, AAA works with organizations of different sizes, sectors and regional contexts.`,
  },
];

/* ------------------------------------------------ Process (from /faq copy) */
const PROCESS: { title: string; text: string }[] = [
  {
    title: "Application",
    text: "Send the accreditation application form for your program to AAA and pay the application fees. AAA issues a letter confirming that your accreditation is in process.",
  },
  {
    title: "Document review",
    text: "AAA reviews your application and the related documents and sends you a Document Review Compliance Report; you revise your documentation where the review identifies gaps.",
  },
  {
    title: "Assessment",
    text: "AAA defines the assessment dates and the assessment team, conducts the assessment, and issues an assessment report that includes a recommendation for accreditation.",
  },
  {
    title: "Decision",
    text: "You implement corrective actions where needed, and the accreditation committee reviews the complete file before an independent accreditation decision is taken.",
  },
];

/* ------------------------------------------------------- Accredited network */
const ORGS = [
  { name: "GovernValU Consulting", loc: "Türkiye", mono: "GV" },
  { name: "T&C Board", loc: "Gujarat, India", mono: "T&C" },
  { name: "Millennia Wellness", loc: "Texas, USA", mono: "MW" },
  { name: "Indian Institute for Business Management Studies", loc: "Mumbai, India", mono: "IIBMS" },
  { name: "RC Business Growth Consultancies", loc: "Business growth consultancy", mono: "RC" },
];

// Real, attributed quotes from accredited organizations — see app/_data/case-studies.ts.
const TESTIMONIALS = ["Cinute Digital", "Clarivate", "Monarch Master Injectors"]
  .map((name) => CASE_STUDIES.find((c) => c.name === name))
  .filter((c): c is CaseStudy => Boolean(c))
  .map((c) => ({
    quote: c.quote,
    name: c.name,
    org: `${c.sector} — ${c.country}`,
    logo: c.logo,
  }));

/* ------------------------------------------------------- FAQ (from /faq) */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What is accreditation?",
    a: "Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards. The accreditation process aims to enhance service quality and ensure safety through compliance with global standards.",
  },
  {
    q: "Who is the American Accreditation Association (AAA)?",
    a: "AAA is authorized by the State Corporation Commission of the Commonwealth of Virginia to transact its business according to the articles of cooperation under Title 13.1 of the Code of Virginia and to offer a full range of comprehensive accreditation services. AAA is a third-party accreditation body that delivers accreditation services according to various international standards.",
  },
  {
    q: "Is AAA internationally recognized?",
    a: "AAA is an institutional member of the International Society for Quality in Health Care (ISQua). The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition — meaning their development and content have been found to meet international best-practice requirements.",
  },
  {
    q: "Which accreditation programs does AAA offer?",
    a: "AAA delivers a range of accreditation programs using international standards: Healthcare Accreditation; Training & Education Providers Accreditation; School Accreditation; the SMEs Accreditation Program; Testing & Calibration Laboratories (ISO/IEC 17025); Medical Laboratories (ISO 15189); Personnel Certification Bodies (ISO/IEC 17024); Management Systems Certification Bodies (ISO/IEC 17021-1); Product Certification Bodies (ISO/IEC 17065); Inspection Bodies (ISO/IEC 17020); and Proficiency Testing Providers (ISO/IEC 17043).",
  },
  {
    q: "What are the steps to get accreditation?",
    a: "Although there may be certain differences from one application to another, the general process remains the same for all candidate bodies and follows four stages: Application, Document Review, Assessment and Decision.",
  },
];

const CONTACT_ITEMS: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "mail", label: "Email us", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: "phone", label: "Call us", value: CONTACT.phone, href: CONTACT.phoneHref },
  {
    icon: "phone",
    label: "International / WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappHref,
  },
  { icon: "pin", label: "Visit us", value: CONTACT.addressLine },
];

/* --------------------------------------------------------------- JSON-LD */
// The site-wide Organization and WebSite nodes are emitted once in
// app/layout.tsx, so this page adds only what is specific to it: the four
// headline programs as Services, and the FAQ block above as an FAQPage.
const SCHEMA = [
  ...PROGRAM_CARDS.map((p) =>
    serviceSchema({
      name: p.label,
      description: p.text,
      path: p.href,
      audience: "Organizations seeking international accreditation",
    })
  ),
  faqSchema(FAQ),
];

export default function HomePage() {
  return (
    <div className="axp homex">
      <JsonLd schema={SCHEMA} />

      {/* ============================ 01 · Hero ============================ */}
      <section className="ax-hero" id="top">
        <div className="container">
          <div className="ax-hero-grid">
            <div className="ax-hero-copy reveal">
              <span className="ax-hero-badge">
                <i aria-hidden="true" />
                US-authorized accreditation body
              </span>

              <h1>
                International Accreditation <em>Accepted Globally</em>
              </h1>

              <p className="ax-hero-lead">{HERO_SUB}</p>

              <div className="ax-actions">
                <Link href="/quote" className="ax-btn ax-btn-gold">
                  Get a Quote <Icon name="arrow" size={15} />
                </Link>
                <Link href="#programs" className="ax-btn ax-btn-ghost">
                  Explore our programs
                </Link>
              </div>

              <HeroStats stats={HERO_STATS} />
            </div>

            {/* Product visual — an illustrative certificate of accreditation */}
            <div className="hx-cert-wrap reveal" aria-hidden="true">
              <div className="hx-cert">
                <div className="hx-cert-head">
                  <span className="hx-cert-mark">AAA</span>
                  <span className="hx-cert-title">
                    <strong>Certificate of Accreditation</strong>
                    <span>Illustrative sample</span>
                  </span>
                  <span className="hx-cert-verified">
                    <Icon name="check" size={11} strokeWidth={3} /> Verified
                  </span>
                </div>

                <div className="hx-cert-body">
                  <SealRosette />
                  <span className="hx-cert-line">This certifies that</span>
                  <span className="hx-cert-org">Your Organization</span>
                  <span className="hx-cert-line">
                    has demonstrated competence and impartiality in accordance with
                  </span>
                  <div className="hx-cert-stds">
                    {CERT_STANDARDS.map((s) => (
                      <span className="hx-std" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hx-cert-meta">
                  <div>
                    <span>Decision</span>
                    <strong>Granted</strong>
                  </div>
                  <div>
                    <span>Validity</span>
                    <strong>{FACTS.cycleYears} years</strong>
                  </div>
                  <div>
                    <span>Verification</span>
                    <strong>Digital</strong>
                  </div>
                </div>

                <div className="hx-cert-foot">
                  <span className="hx-cert-seal">ISQua</span>
                  <p>Standards assessed by ISQua EEA · verifiable online</p>
                </div>
              </div>

              <div className="hx-chips">
                <span className="hx-chip">
                  <i>
                    <Icon name="shield" size={15} />
                  </i>
                  ISQua EEA-assessed standards
                </span>
                <span className="hx-chip">
                  <i>
                    <Icon name="globe" size={15} />
                  </i>
                  Accepted in {FACTS.countriesLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Standards marquee */}
        <div className="hx-band">
          <div className="container hx-band-inner">
            <span className="hx-band-label">Programs aligned with international standards</span>
            <div className="hx-mq" aria-hidden="true">
              <div className="hx-mq-track">
                {[...STANDARDS, ...STANDARDS].map((s, i) => (
                  <span className="hx-mq-item" key={`${s}-${i}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== 02 · Why AAA =========================== */}
      <section className="ax-section" id="why">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Why AAA</span>
                <h2>
                  Independent accreditation for institutions that take{" "}
                  <em>quality seriously</em>
                </h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p>
                The American Accreditation Association is a third-party accreditation body
                headquartered in Tysons Corner, Virginia. Its programs are based on internationally
                recognized standards that ensure the competence of accredited organizations and the
                global acceptance of their accreditations.
              </p>

              <ol className="ax-reasons">
                {PILLARS.map((p, i) => (
                  <li className="ax-reason" key={p.title}>
                    <span className="ax-reason-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="ax-actions">
                <Link href="/about" className="ax-btn ax-btn-ghost-navy">
                  About AAA <Icon name="arrow" size={15} />
                </Link>
                <Link href="/about-accreditation" className="ax-btn ax-btn-ghost-navy">
                  What accreditation means
                </Link>
              </div>
            </div>

            <figure className="ax-photo wide reveal">
              <Image
                src="/about/assessment.jpg"
                alt="AAA assessors reviewing documentation with clinical staff during an on-site accreditation assessment"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">On-site assessment</span>
              <figcaption>
                Evidence-based assessment, delivered by a panel of {FACTS.assessorsLabel}.
                <span>American Accreditation Association · Tysons Corner, Virginia</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ========================== 03 · Programs ========================== */}
      <section className="ax-section cream" id="programs">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Our services</span>
            <h2>Accreditation programs, recognized worldwide</h2>
            <p>
              Choose the accreditation pathway that matches your organization — each assessed
              against internationally recognized standards, by the same independent process.
            </p>
          </div>

          <div className="hx-progs">
            {PROGRAM_CARDS.map((p, i) => (
              <article className="hx-prog reveal" key={p.href} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="hx-prog-media">
                  <Image src={p.img} alt={p.alt} fill sizes="(max-width: 980px) 92vw, 46vw" />
                  <span className="hx-prog-tag">{p.tag}</span>
                  <h3>{p.label}</h3>
                </div>
                <div className="hx-prog-body">
                  <p>{p.text}</p>
                  {p.links && (
                    <ul className="hx-prog-links">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href}>
                            {l.label} <Icon name="arrowUpRight" size={12} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href={p.href} className="hx-prog-go">
                    Explore the program <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 04 · Global recognition ===================== */}
      <section className="ax-section" id="global">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Global recognition</span>
            <h2>Trusted by organizations around the world</h2>
            <p>
              AAA&rsquo;s international footprint reflects its growing role supporting
              quality-focused organizations across regions and sectors.
            </p>
          </div>

          <div className="ax-metrics reveal">
            {METRICS.map((m) => (
              <div className="ax-metric" key={m.label}>
                <b>{m.num}</b>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div className="hx-map reveal" style={{ marginTop: "22px" }}>
            <div className="hx-map-head">
              <div>
                <h3>Countries we operate in</h3>
                <p>
                  Accredited organizations in {FACTS.countriesLabel} — hover a country to see
                  whether it is part of the AAA network.
                </p>
              </div>
              <span className="hx-map-badge">Global presence</span>
            </div>
            <div className="hx-map-body">
              <WorldMapFigure />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= 05 · How it works ========================= */}
      <section className="ax-section cream" id="process">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">How it works</span>
            <h2>A clear route from application to accreditation</h2>
            <p>
              Although details differ between programs, the general process is the same for every
              candidate organization — and you are supported at each stage.
            </p>
          </div>

          <div className="ax-grid four" style={{ marginBottom: "28px" }}>
            {SUPPORT.map((s, i) => (
              <article className="ax-card reveal" key={s.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="ax-split top">
            <div className="ax-steps-panel reveal">
              <h3>The accreditation process</h3>
              <ol className="ax-steps">
                {PROCESS.map((step, i) => (
                  <li className="ax-step" key={step.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="ax-step-body">
                      <b>{step.title}</b>
                      <span>{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <Icon name="globe" size={16} />
                </span>
                Assessments delivered on-site, hybrid or virtually
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <Icon name="doc" size={28} />
              </span>
              <h3>Start your application</h3>
              <p>
                Tell us about your organization, the standards you work to and the locations you
                operate in. Application forms for every accreditation program are available in the
                AAA document library.
              </p>
              <Link href="/apply" className="ax-btn ax-btn-blue">
                Apply for accreditation <Icon name="arrow" size={15} />
              </Link>
              <p className="ax-panel-note">
                Not sure which program applies? Request a quote and an accreditation specialist will
                scope it with you.
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Useful next steps</li>
                <li>
                  <Link href="/documents">
                    <span className="ax-ico" aria-hidden="true">
                      <Icon name="doc" size={16} strokeWidth={2} />
                    </span>
                    Application forms &amp; requirements
                    <i>Library</i>
                  </Link>
                </li>
                <li>
                  <Link href="/quote">
                    <span className="ax-ico" aria-hidden="true">
                      <Icon name="clipboard" size={16} strokeWidth={2} />
                    </span>
                    Request a tailored quotation
                    <i>Form</i>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="ax-ico" aria-hidden="true">
                      <Icon name="search" size={16} strokeWidth={2} />
                    </span>
                    Frequently asked questions
                    <i>FAQ</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ====================== 06 · Success stories ======================= */}
      <section className="ax-section" id="clients">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Success stories</span>
            <h2>Be part of our accredited network</h2>
            <p>
              Join a growing community of organizations that have demonstrated competence and
              credibility through AAA accreditation.
            </p>
          </div>

          <ul className="hx-orgs reveal">
            {ORGS.map((o) => (
              <li className="hx-org" key={o.name}>
                <span className="hx-org-mono" aria-hidden="true">
                  {o.mono}
                </span>
                <b>{o.name}</b>
                <span>{o.loc}</span>
              </li>
            ))}
          </ul>

          <div className="hx-testis">
            {TESTIMONIALS.map((t, i) => (
              <figure className="hx-testi reveal" key={t.name} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="hx-testi-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                    <path d="M9.6 6.4v3.2c-1.7.5-2.6 1.6-2.7 3.4H9.6V18H3.9v-5c0-3.9 1.9-6.1 5.7-6.6zm10.5 0v3.2c-1.7.5-2.6 1.6-2.7 3.4h2.7V18h-5.7v-5c0-3.9 1.9-6.1 5.7-6.6z" />
                  </svg>
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  {t.logo && (
                    <span className="hx-testi-logo" aria-hidden="true">
                      <Image src={t.logo} alt="" width={120} height={40} sizes="120px" />
                    </span>
                  )}
                  <span className="hx-testi-who">
                    <strong>{t.name}</strong>
                    <span>{t.org}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="ax-actions center">
            <Link href="/directory/accredited-organizations" className="ax-btn ax-btn-ghost-navy">
              Explore accredited organizations <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================== 07 · Gallery ========================== */}
      <section className="ax-section cream" id="gallery">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Gallery</span>
            <h2>Excellence in action</h2>
            <p>
              Moments from AAA accreditation assessments, certification ceremonies and engagements
              with organizations worldwide.
            </p>
          </div>
          <HomeGallery />
        </div>
      </section>

      {/* ============================ 08 · Team =========================== */}
      <section className="ax-section navy" id="team">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Leadership team</span>
            <h2>Meet our team</h2>
            <p>
              Dedicated professionals committed to elevating standards worldwide. Hover over a card
              to read each biography.
            </p>
          </div>
          <HomeTeam />
        </div>
      </section>

      {/* ============================ 09 · News =========================== */}
      <section className="ax-section" id="news">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">AAA news</span>
            <h2>News &amp; events from the accreditation community</h2>
          </div>
          <Insights />
          <div className="ax-actions center">
            <Link href="/news" className="ax-btn ax-btn-ghost-navy">
              View all news <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ 10 · FAQ ============================ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>The questions organizations ask most often before they apply for accreditation.</p>
          </div>
          <div className="ax-faq-list">
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
          <div className="ax-actions center">
            <Link href="/faq" className="ax-btn ax-btn-ghost-navy">
              Read all FAQs <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================== 11 · Contact & quote ====================== */}
      <section className="ax-section navy hx-navy" id="contact">
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Get in touch</span>
                <h2>Ready to start your accreditation journey?</h2>
                <p>
                  Tell us about your organization and our team will scope your accreditation
                  pathway — the applicable standards, the process and a tailored quotation.
                </p>
              </div>

              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="hx-consult">
                <i aria-hidden="true">
                  <Icon name="cert" size={20} />
                </i>
                <span>
                  <strong>Book a free 30-minute consultation</strong>
                  <em>Talk to an accreditation specialist. No obligation.</em>
                </span>
                <Icon name="arrow" size={16} />
              </a>

              <ul className="hx-contacts">
                {CONTACT_ITEMS.map((c) => {
                  const body = (
                    <>
                      <i aria-hidden="true">
                        <Icon name={c.icon} size={17} />
                      </i>
                      <span>
                        <strong>{c.label}</strong>
                        {c.value}
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a
                          className="hx-contact-item"
                          href={c.href}
                          {...(c.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="hx-contact-item">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="ax-related" style={{ justifyContent: "flex-start" }}>
                <span>Explore:</span>
                <Link href={PROGRAMS.healthcare.href}>Healthcare</Link>
                <Link href={PROGRAMS.cab.href}>Conformity assessment bodies</Link>
                <Link href={PROGRAMS.training.href}>Training &amp; education</Link>
                <Link href={PROGRAMS.sme.href}>SMEs</Link>
              </div>
            </div>

            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
