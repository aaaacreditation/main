import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../_components/JsonLd";
import Glyph from "../../_components/site/Glyph";
import NavyCard from "../../_components/site/NavyCard";
import { CONTACT, FACTS } from "../../../lib/facts";
import { breadcrumbSchema, faqSchema, serviceSchema } from "../../../lib/seo";
import { seoPage } from "../../../lib/seo-overrides";
import AdvisorCard from "./AdvisorCard";
import AdvisorForm from "./AdvisorForm";
import FaqAccordion from "./FaqAccordion";
import HeroWaves from "./HeroWaves";
import Magnetic from "./Magnetic";
import SplitWords from "./SplitWords";
import TepaMotion from "./TepaMotion";
import VideoEmbed from "./VideoEmbed";
import "./tep.css";

/* -------------------------------------------------------------------------
   Oct 2026 — brought onto the client's FINAL TEPA handover package
   (`client/wesbite html/TEPA`, README = approved decisions). Copy is the
   client's, verbatim; the Sept 2026 GSAP / Framer Motion scaffolding is kept.

   Final page order (README):
     1 Hero · 2 Why Accreditation Matters · 3 Accreditation in
     Practice (Monarch story + metrics | Landmark video + case study) ·
     4 What We Evaluate · 5 Why Choose AAA · 6 How Accreditation Works ·
     7 FAQ · 8 Final CTA + enquiry form
   (Oct 23 2026, client: the enquiry form moved from the hero into the final
   CTA, replacing its two buttons; the hero photo takes the freed column.)

   Every card is the SME blue card: `<NavyCard>` from the kit, or the same
   `.ax-card.navy.ax-blue` classes where a card needs its own markup (proof
   cards, benefit cards, process steps). Kit cards reveal through the global
   `.reveal` observer so their hover lift is never pinned by an inline GSAP
   transform; everything else marked `data-reveal` is driven by TepaMotion.
   ------------------------------------------------------------------------- */

const PATH = "/programs/training-education";
const IMG = "/images/site/tepa";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Training & Education Providers Accreditation",
    description: `AAA accreditation for training and education providers: independent recognition that builds credibility, learner trust and growth. Valid ${FACTS.cycleYears} years, ${FACTS.countriesPlus} countries.`,
    path: PATH,
    keywords: [
      "training provider accreditation",
      "education provider accreditation",
      "accredited training courses",
      "course accreditation",
      "American Directory of Competent Personnel",
    ],
  });
}

const APPLY = "/apply";
const ADCP_URL = "https://adcp.aaa-accreditation.org";
const DIRECTORY = "/directory/accredited-organizations";
const MONARCH_STORY =
  "https://casestudies-alpha.vercel.app/case-studies/accreditation-impact-12-growth-500-students-certified";
const LANDMARK_STORY =
  "https://casestudies-alpha.vercel.app/case-studies/landmark-management-partner-story-of-success-and-innovation";
const LANDMARK_VIDEO_ID = "C193YkDYYVU";

const Arrow = () => <Glyph name="arrow-right" size={14} strokeWidth={2} />;

/* 2 — Why Accreditation Matters */
const VALUES = [
  {
    icon: "shield-check",
    title: "Demonstrate Quality",
    text: "Show that your organization meets established accreditation requirements.",
  },
  {
    icon: "users",
    title: "Build Confidence",
    text: "Increase trust among learners, employers, partners, and other stakeholders.",
  },
  {
    icon: "trending-up",
    title: "Stand Out",
    text: "Differentiate your organization in a competitive education and training sector.",
  },
  {
    icon: "chart",
    title: "Support Growth",
    text: "Strengthen your reputation and create opportunities to attract more learners and expand your reach.",
  },
] as const;

/* 3 — Accreditation in Practice */
type Metric = { v: string; k: string; count?: { to: string; suffix?: string; decimals?: string } };

/* Figures on a hairline strip inside each proof card (four for Monarch, three
   for Landmark); TepaMotion counts every `data-count` up from zero when it
   scrolls into view. */
function Stats({ items }: { items: Metric[] }) {
  return (
    <div className={items.length === 3 ? "tepx-stats three" : "tepx-stats"}>
      {items.map((m) => (
        <div key={m.k}>
          <b data-count={m.count?.to} data-suffix={m.count?.suffix} data-decimals={m.count?.decimals}>
            {m.v}
          </b>
          <span>{m.k}</span>
        </div>
      ))}
    </div>
  );
}

const MONARCH = {
  name: "Monarch Master Injectors",
  kicker: "Measured Business Impact",
  label: "AAA Accredited Training & Education Provider · Texas, United States",
  quote:
    "AAA Accreditation has opened new doors for Monarch Master Injectors. We have established partnerships with renowned medical providers and clinics, expanded our reach to a wider market, and strengthened the confidence our students place in our programs.",
  person: "Brenda Rocha",
  role: "CEO, Monarch Master Injectors",
  metrics: [
    { v: "500+", k: "Students Certified", count: { to: "500", suffix: "+" } },
    { v: "+8–12%", k: "Enrollment Growth" },
    { v: "4.9/5", k: "Average Learner Feedback", count: { to: "4.9", decimals: "1", suffix: "/5" } },
    { v: "7", k: "New Courses Launched", count: { to: "7" } },
  ] as Metric[],
};

const LANDMARK = {
  name: "Landmark Management Partners",
  kicker: "Video Testimonial",
  meta: "Training & Education Provider · Cairo, Egypt",
  copy: "Landmark Management Partners is featured by AAA as a training and education provider in Cairo and as a pioneer in pharmaceutical training. Watch the organization’s testimonial to hear directly about its experience with AAA accreditation.",
  /* The year is not counted up — it would read as a running total. */
  metrics: [
    { v: "9", k: "Programs Accredited", count: { to: "9" } },
    { v: "25%", k: "Client Growth", count: { to: "25", suffix: "%" } },
    { v: "2019", k: "Established in the Market" },
  ] as Metric[],
};

/* 4 — What We Evaluate */
const EVALUATE = [
  {
    icon: "building",
    title: "Your Organization",
    text: "How your organization is structured and managed to deliver quality learning programs.",
  },
  {
    icon: "user-check",
    title: "Your Learning Team",
    text: "The qualifications and expertise of the people delivering your learning programs.",
  },
  {
    icon: "book",
    title: "Your Learning Programs",
    text: "How your programs are designed, delivered, and aligned with their intended learning outcomes.",
  },
  {
    icon: "certificate",
    title: "Learner Assessment & Certificates",
    text: "How learners are assessed and how certificates are awarded.",
  },
] as const;

/* 5 — Why Choose AAA */
const WHY = [
  {
    icon: "globe",
    title: "International Reach",
    text: `Supporting accredited organizations across more than ${FACTS.countries} countries worldwide.`,
  },
  {
    icon: "scale",
    title: "Independent Assessment",
    text: "Objective assessments conducted with fairness, consistency, and impartiality.",
  },
  {
    icon: "user-check",
    title: "Experienced Assessors",
    text: "Qualified professionals with practical experience in education and training.",
  },
  {
    icon: "handshake",
    title: "Supportive Approach",
    text: "A clear and transparent process that helps organizations demonstrate quality.",
  },
] as const;

const ADCP_CHECKS = ["Secure organization access", "Credential management", "QR verification", "Greater graduate visibility"];

/* 6 — How Accreditation Works */
const STEPS = [
  {
    icon: "file-text",
    title: "Submit Your Application",
    text: "Complete the accreditation application and provide the general information about your organization and the programs you wish to have accredited.",
  },
  {
    icon: "folder",
    title: "Submit Required Information",
    text: "Provide the supporting information required for assessment. AAA reviews your organization and learning programs against the applicable requirements.",
  },
  {
    icon: "search-check",
    title: "Accreditation Assessment",
    text: "AAA assessors evaluate your submitted information and evidence remotely through a structured document review.",
  },
  {
    icon: "message",
    title: "Assessment Findings",
    text: "You receive the assessment findings and, where required, have the opportunity to address identified issues before completion of the assessment.",
  },
  {
    icon: "gavel",
    title: "Accreditation Decision",
    text: "An independent accreditation decision is made based on the assessment results and supporting evidence.",
  },
  {
    icon: "award",
    title: "Accreditation Awarded",
    text: "Successful organizations receive an accreditation certificate valid for three years and may use the AAA Accreditation Symbol in accordance with the applicable requirements.",
  },
] as const;

/* 7 — FAQ (client order: eligibility → process → cost/validity → benefits → next steps) */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Who can apply for this accreditation?",
    a: "Training providers, professional academies, universities, colleges, vocational education providers, online learning providers, corporate learning departments, government training institutions, and professional associations may apply.",
  },
  {
    q: "Does AAA accredit individual courses or the organization?",
    a: "AAA assesses the training or education provider and the learning programs included within the approved scope of accreditation.",
  },
  {
    q: "Can online learning providers apply?",
    a: "Yes. Organizations delivering programs online, onsite, or through blended learning may apply.",
  },
  {
    q: "Is ISO certification required before applying?",
    a: "No. ISO certification is not a prerequisite for Training & Education Providers Accreditation.",
  },
  {
    q: "How is the assessment conducted?",
    a: "The accreditation assessment is conducted remotely through a comprehensive review of your submitted documentation by qualified AAA assessors. Where clarification is required, additional information may be requested during the assessment process.",
  },
  {
    q: "How long does the accreditation process take?",
    a: "The timeframe depends on the organization’s readiness, the completeness of its documentation, the scope requested, and how quickly any assessment findings are addressed. On average, the accreditation process is typically completed within 6 to 9 weeks.",
  },
  {
    q: "How long is accreditation valid?",
    a: "Accreditation is valid for three years, subject to continued compliance with AAA requirements.",
  },
  {
    q: "How much does accreditation cost?",
    a: "Fees depend on the scope, size, complexity, delivery methods, and location of the organization. A tailored quotation is provided after reviewing the initial information.",
  },
  {
    q: "Can organizations outside the United States apply?",
    a: `Yes. AAA provides accreditation internationally and serves organizations across more than ${FACTS.countries} countries.`,
  },
  {
    q: "Can we use the AAA Accreditation Symbol?",
    a: "Yes. Accredited organizations may use the applicable AAA Accreditation Symbol on approved certificates, websites, publications, and promotional materials in accordance with AAA’s symbol-use requirements.",
  },
  {
    q: "What is the American Directory of Competent Personnel?",
    a: "ADCP is an online platform available to accredited organizations for issuing, managing, showcasing, and verifying the credentials of certified learners, staff, and graduates.",
  },
  {
    q: "How do we begin?",
    a: "Submit an enquiry, book a free consultation, or complete the accreditation application. AAA will then advise you on the documentation and next steps.",
  },
];

const REASSURE = [
  "No-obligation consultation",
  "Speak directly with an accreditation advisor",
  "Receive guidance on eligibility and next steps",
];

export default function Page() {
  return (
    <TepaMotion>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Accreditation Programs", path: "/programs" },
            { name: "Training & Education Providers Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Training & Education Providers Accreditation",
            description:
              "AAA accreditation for training and education providers — independent recognition that strengthens credibility, learner confidence, differentiation and growth. Remote document-review assessment, three-year validity, ADCP access for accredited organizations.",
            path: PATH,
            audience: "Training and education providers",
          }),
          faqSchema(FAQ),
        ]}
      />

      {/* 01 — Hero: copy | photo */}
      <section className="ax-hero tepx-hero" id="top">
        <div className="tepx-hero-bg" aria-hidden="true">
          <Image src="/home/training.jpg" alt="" fill priority sizes="100vw" />
        </div>
        <span className="tepx-hero-scrim" aria-hidden="true" />
        <span className="tepx-hero-glow" aria-hidden="true" />
        <HeroWaves />
        <span className="tepx-noise" aria-hidden="true" />
        <div className="container">
          <div className="ax-hero-grid tepx-hero-grid">
            <div className="ax-hero-copy">
              <nav className="ax-crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="tepx-crumb">
                  <span aria-hidden="true">/</span>
                  <Link href="/programs">Programs</Link>
                </span>
                <span className="tepx-crumb">
                  <span aria-hidden="true">/</span>
                  <strong>Training &amp; Education Providers</strong>
                </span>
              </nav>

              <span className="ax-hero-badge tepx-hero-kicker">
                <i aria-hidden="true" />
                Training &amp; Education Providers Accreditation
              </span>

              <h1>
                <SplitWords text="Accreditation for Training & Education Providers" />
              </h1>
              <p className="ax-hero-lead" data-reveal>
                Give your learning programs credibility that travels across borders through
                internationally recognized accreditation, helping your organization stand out,
                attract more learners, and strengthen its reputation.
              </p>

              <ul className="tepx-hero-points" data-reveal>
                {[
                  "International Accreditation",
                  `${FACTS.countriesPlus} Countries Served Worldwide`,
                  `${FACTS.cycleYears}-Year Accreditation Validity`,
                ].map((p) => (
                  <li key={p}>
                    <span className="ax-ico">
                      <Glyph name="check" size={12} strokeWidth={2.6} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="ax-actions" data-reveal>
                <Magnetic>
                  <Link href={APPLY} className="ax-btn ax-btn-gold">
                    Apply for Accreditation <Arrow />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <a
                    href={CONTACT.consultationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ax-btn ax-btn-ghost"
                  >
                    Book a Free Consultation
                  </a>
                </Magnetic>
              </div>
            </div>

            <figure className="ax-hero-photo tepx-hero-photo" data-reveal>
              <Image
                src={`${IMG}/hero-accredited-provider.webp`}
                alt="Representatives of an AAA-accredited training and education provider holding their accreditation certificate"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 540px"
              />
              <figcaption>
                <span className="ax-cap">
                  <strong>Real AAA-accredited training &amp; education provider</strong>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 — Why Accreditation Matters */}
      <section className="ax-section cream tepx-wm" id="why-accreditation-matters">
        <span className="tepx-wm-text" aria-hidden="true">
          AAA
        </span>
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">The Value of Accreditation</span>
            <h2>
              <SplitWords text="Why Accreditation Matters" />
            </h2>
            <p data-reveal>
              Accreditation provides independent recognition of your organization’s commitment
              to quality and helps strengthen confidence in your learning programs.
            </p>
          </div>
          <div className="ax-blue-grid four">
            {VALUES.map((v, i) => (
              <NavyCard key={v.title} icon={v.icon} no={String(i + 1).padStart(2, "0")} title={v.title}>
                <p>{v.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Accreditation in Practice */}
      <section className="ax-section" id="accreditation-in-practice">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">Real-World Success &amp; Client Experience</span>
            <h2>
              <SplitWords text="Accreditation in Practice" />
            </h2>
            <p data-reveal>
              See how AAA accreditation supports real training and education providers — from
              measurable business outcomes to the experience of working through the
              accreditation journey.
            </p>
          </div>

          <div className="tepx-proof">
            <article className="ax-card navy ax-blue reveal tepx-proof-card">
              <div className="tepx-proof-media">
                <Image
                  src={`${IMG}/monarch-master-injectors.webp`}
                  alt="Monarch Master Injectors training session"
                  fill
                  sizes="(max-width: 980px) 100vw, 580px"
                />
                <span className="tepx-proof-label">{MONARCH.label}</span>
              </div>
              <div className="tepx-proof-body">
                <span className="ax-blue-tag">{MONARCH.kicker}</span>
                <h3>{MONARCH.name}</h3>
                <blockquote className="tepx-proof-quote">
                  <Glyph name="quote" size={26} className="tepx-quote-mark" />
                  <p>{MONARCH.quote}</p>
                </blockquote>
                <p className="tepx-proof-person">
                  <b>{MONARCH.person}</b>
                  {MONARCH.role}
                </p>
                <Stats items={MONARCH.metrics} />
                <div className="tepx-proof-cta">
                  <a href={MONARCH_STORY} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-white">
                    Read the Full Success Story <Arrow />
                  </a>
                </div>
              </div>
            </article>

            <article className="ax-card navy ax-blue reveal tepx-proof-card">
              <div className="tepx-proof-media">
                <VideoEmbed
                  id={LANDMARK_VIDEO_ID}
                  title="Landmark Management Partners testimonial about AAA accreditation"
                  poster="/programs/training-education/landmark-video.jpg"
                  label="Watch the testimonial · Landmark Management Partners"
                />
              </div>
              <div className="tepx-proof-body">
                <span className="ax-blue-tag">{LANDMARK.kicker}</span>
                <h3>{LANDMARK.name}</h3>
                <p className="tepx-proof-meta">{LANDMARK.meta}</p>
                <p className="tepx-proof-copy">{LANDMARK.copy}</p>
                <Stats items={LANDMARK.metrics} />
                <div className="tepx-proof-cta">
                  <a href={LANDMARK_STORY} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-white">
                    View Landmark Success Story <Arrow />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 04 — What We Evaluate During Accreditation */}
      <section className="ax-section cream" id="what-we-evaluate">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">Our Assessment Focus</span>
            <h2>
              <SplitWords text="What We Evaluate During Accreditation" />
            </h2>
            <p data-reveal>
              Our assessment focuses on the key elements that contribute to delivering
              high-quality learning programs.
            </p>
          </div>
          <div className="ax-blue-grid four">
            {EVALUATE.map((e, i) => (
              <NavyCard key={e.title} icon={e.icon} no={String(i + 1).padStart(2, "0")} title={e.title}>
                <p>{e.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Why Choose AAA? */}
      <section className="ax-section" id="why-aaa">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">A Distinctive Accreditation Experience</span>
            <h2>
              <SplitWords text="Why Choose AAA?" />
            </h2>
            <p data-reveal>
              Choosing the right accreditation body is just as important as achieving
              accreditation. AAA combines an independent assessment process with exclusive
              benefits that add lasting value to your organization and learners.
            </p>
          </div>

          <div className="tepx-subhead" data-reveal>
            <h3>Why Organizations Choose AAA</h3>
          </div>
          <div className="ax-blue-grid four">
            {WHY.map((w, i) => (
              <NavyCard key={w.title} icon={w.icon} no={String(i + 1).padStart(2, "0")} title={w.title}>
                <p>{w.text}</p>
              </NavyCard>
            ))}
          </div>

          <div className="tepx-subhead" data-reveal>
            <h3>Exclusive Benefits of Accreditation</h3>
            <p>
              AAA accreditation provides more than recognition. Accredited organizations gain
              access to valuable tools that strengthen credibility, verification, and
              visibility.
            </p>
          </div>
          <div className="tepx-benefits">
            <article className="ax-card navy ax-blue reveal tepx-adcp">
              <span className="ax-blue-tag">Flagship Benefit</span>
              <h3>American Directory of Competent Personnel (ADCP)</h3>
              <p>
                Accredited organizations receive secure access to the American Directory of
                Competent Personnel, enabling them to issue, manage, showcase, and verify the
                credentials of certified learners, staff, and graduates through the AAA
                Certification Management Hub.
              </p>
              <ul className="ax-checks">
                {ADCP_CHECKS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              <figure className="tepx-hub-shot">
                <Image
                  src="/programs/training-education/adcp-hub.png"
                  alt="The AAA Certification Management Hub: the sign-in screen and the certificates dashboard listing issued certificates with QR verification"
                  width={1924}
                  height={847}
                  sizes="(max-width: 980px) 100vw, 640px"
                />
              </figure>

              <a href={ADCP_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-white">
                Explore ADCP <Arrow />
              </a>
            </article>

            <div className="tepx-side">
              <article className="ax-card navy ax-blue reveal tepx-side-card">
                <span className="tepx-side-media badge">
                  <Image
                    src="/programs/training-education/accredited-organization-badge.png"
                    alt="AAA Accredited Organization badge"
                    width={76}
                    height={76}
                  />
                </span>
                <div>
                  <h3>Right to Use the AAA Accreditation Symbol</h3>
                  <p>
                    Use the applicable AAA Accreditation Symbol on approved learning certificates,
                    websites, publications, and promotional materials in accordance with AAA
                    requirements.
                  </p>
                </div>
              </article>
              <article className="ax-card navy ax-blue reveal tepx-side-card">
                <span className="tepx-side-media badge">
                  <Image
                    src="/programs/training-education/directory-seal.png"
                    alt="Verified accredited organization seal"
                    width={76}
                    height={76}
                  />
                </span>
                <div>
                  <h3>Global Accredited Organization Directory</h3>
                  <p>
                    Gain visibility in AAA’s online directory, allowing learners, employers, and
                    partners to verify your accredited status.
                  </p>
                  <Link href={DIRECTORY} className="ax-btn ax-btn-white sm tepx-side-btn">
                    <Glyph name="search" size={14} strokeWidth={2.2} />
                    View Accredited Directory
                  </Link>
                </div>
              </article>
              <article className="ax-card navy ax-blue reveal tepx-side-card">
                <span className="ax-card-ico tepx-side-ico">
                  <Glyph name="search-check" />
                </span>
                <div>
                  <h3>Digital Certificate Verification</h3>
                  <p>
                    Issue certificates with secure QR-code verification, making it easy for
                    employers and other stakeholders to confirm authenticity.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — How Accreditation Works */}
      <section className="ax-section cream tepx-wm" id="how-it-works">
        <span className="tepx-wm-text" aria-hidden="true">
          AAA
        </span>
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">A Clear Accreditation Pathway</span>
            <h2>
              <SplitWords text="How Accreditation Works" />
            </h2>
            <p data-reveal>
              Our accreditation process is transparent, straightforward, and designed to guide
              your organization from application to accreditation.
            </p>
          </div>

          <ol className="tepx-steps">
            <span className="tepx-steps-line" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <li className="tepx-step" key={s.title}>
                <span className="tepx-step-ico" data-reveal="pop">
                  <Glyph name={s.icon} size={26} />
                </span>
                <span className="tepx-step-no">Step {i + 1}</span>
                <div className="tepx-step-card">
                  <div className="ax-card navy ax-blue tepx-step-inner">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section tepx-wm" id="faq">
        <span className="tepx-wm-text" aria-hidden="true">
          AAA
        </span>
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">Answers to Common Questions</span>
            <h2>
              <SplitWords text="Frequently Asked Questions" />
            </h2>
            <p data-reveal>
              Find quick answers to common questions about eligibility, assessment,
              accreditation validity, benefits, and how to begin.
            </p>
          </div>

          <FaqAccordion items={FAQ} />
        </div>
      </section>

      {/* 08 — Final CTA + enquiry form */}
      <section className="ax-close tepx-close tepx-wm" id="apply">
        <span className="tepx-noise" aria-hidden="true" />
        <span className="tepx-wm-text" aria-hidden="true">
          AAA
        </span>
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-close-inner">
            <span className="eyebrow">Take the Next Step</span>
            <h2>
              <SplitWords text="Ready to Strengthen Your Organization Through" />{" "}
              <em>
                <SplitWords text="Accreditation?" />
              </em>
            </h2>
            <p data-reveal>
              Whether you are exploring accreditation for the first time or ready to apply, our
              accreditation team is here to guide you through every step of the process.
            </p>
          </div>

          {/* Outside `.ax-close-inner` so its centred, white-on-navy type rules
              stay off the light form. */}
          <AdvisorCard>
            <h3>Speak with an Accreditation Advisor</h3>
            <p>
              Share a few details about your organization and our team will contact you to
              discuss the most suitable next steps.
            </p>
            <AdvisorForm />
          </AdvisorCard>

          <div className="ax-close-inner">
            <ul className="tepx-reassure" data-reveal>
              {REASSURE.map((r) => (
                <li key={r}>
                  <span className="ax-ico">
                    <Glyph name="check" size={12} strokeWidth={2.6} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="tepx-close-foot" data-reveal>
              Need guidance before applying?{" "}
              <Link href="/contact">Contact us</Link> and we will help you determine the most
              suitable accreditation pathway for your organization.
            </p>
          </div>
        </div>
      </section>
    </TepaMotion>
  );
}
