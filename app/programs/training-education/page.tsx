import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import { CONTACT, FACTS } from "../../../lib/facts";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";
import AdvisorForm from "./AdvisorForm";
import FaqAccordion from "./FaqAccordion";
import HeroFormCard from "./HeroFormCard";
import HeroWaves from "./HeroWaves";
import Magnetic from "./Magnetic";
import SplitWords from "./SplitWords";
import TepaMotion from "./TepaMotion";
import VideoEmbed from "./VideoEmbed";
import "./tep.css";

/* -------------------------------------------------------------------------
   Sept 2026 rebuild to the client's "TEPA Website Developer Package v3"
   (section order, card counts and the three-element hero are the client's;
   the copy is theirs verbatim). Rendered with the site's `.ax-*` design
   system rather than the package's own CSS so it matches the home page.

   Final page order (README):
     1 Hero + enquiry form · 2 Why Accreditation Matters · 3 Accreditation in
     Practice · 4 What We Evaluate · 5 Why Choose AAA · 6 How Accreditation
     Works · 7 FAQ · 8 Final CTA

   Motion: `data-reveal` marks anything TepaMotion (GSAP + ScrollTrigger)
   brings in on scroll; `<SplitWords>` lets headings arrive word by word.
   Framer Motion runs the hero form, magnetic buttons, FAQ and play button.
   ------------------------------------------------------------------------- */

const PATH = "/programs/training-education";

export const metadata: Metadata = pageMeta({
  title: "Training & Education Providers Accreditation",
  description: `AAA accreditation for training and education providers: independent recognition that builds credibility, learner confidence and growth. Valid 3 years, ${FACTS.countriesPlus} countries.`,
  path: PATH,
  keywords: [
    "training provider accreditation",
    "education provider accreditation",
    "accredited training courses",
    "course accreditation",
    "American Directory of Competent Personnel",
  ],
});

const APPLY = "/apply";
const ADCP_URL = "https://adcp.aaa-accreditation.org";
/* The client's case-study site does not publish a Monarch page yet — the
   README asks for this to be pointed at the production case-study URL once
   it exists. Until then it goes to the accredited-organizations directory. */
const MONARCH_STORY = "/directory/accredited-organizations";
const LANDMARK_STORY =
  "https://casestudies-alpha.vercel.app/case-studies/landmark-management-partner-story-of-success-and-innovation";
const LANDMARK_VIDEO_ID = "C193YkDYYVU";

const APPLICATION_FORM =
  "https://aaa-accreditation.org/wp-content/uploads/2023/01/Application-form-Training-education-providers.docx";
const GUIDELINE =
  "https://aaa-accreditation.org/wp-content/uploads/2020/04/Guidline-for-accreditation-of-training-providers.pdf";
const SYMBOLS =
  "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf";

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

/* 2 — Why Accreditation Matters */
const VALUES: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Demonstrate Quality",
    text: "Show that your organization meets established accreditation requirements.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Build Confidence",
    text: "Increase trust among learners, employers, partners, and other stakeholders.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Stand Out",
    text: "Differentiate your organization in a competitive education and training sector.",
    icon: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </>
    ),
  },
  {
    title: "Support Growth",
    text: "Strengthen your reputation and create opportunities to attract more learners and expand your reach.",
    icon: (
      <>
        <path d="M6 20v-4M12 20V10M18 20V4" />
        <path d="M3 20h18" />
      </>
    ),
  },
];

/* 3 — Accreditation in Practice */
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
  ] as { v: string; k: string; count?: { to: string; suffix?: string; decimals?: string } }[],
};

const LANDMARK = {
  name: "Landmark Management Partners",
  kicker: "Video Testimonial",
  meta: "Training & Education Provider · Cairo, Egypt",
  copy: "Landmark Management Partners is featured by AAA as a training and education provider in Cairo and as a pioneer in pharmaceutical training. Watch the organization’s testimonial to hear directly about its experience with AAA accreditation.",
  points: ["Real accredited organization", "Pharmaceutical training", "First-hand accreditation experience"],
};

/* 4 — What We Evaluate */
const EVALUATE: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Your Organization",
    text: "How your organization is structured and managed to deliver quality learning programs.",
    icon: (
      <>
        <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
      </>
    ),
  },
  {
    title: "Your Learning Team",
    text: "The qualifications and expertise of the people delivering your learning programs.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m16 11 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Your Learning Programs",
    text: "How your programs are designed, delivered, and aligned with their intended learning outcomes.",
    icon: (
      <>
        <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
        <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
  {
    title: "Learner Assessment & Certificates",
    text: "How learners are assessed and how certificates are awarded.",
    icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m9.5 9 1.8 1.8L15 7.3" />
        <path d="M8.5 14.3 7 22l5-3 5 3-1.5-7.7" />
      </>
    ),
  },
];

/* 5 — Why Choose AAA */
const WHY: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "International Reach",
    text: `Supporting accredited organizations across more than ${FACTS.countries} countries worldwide.`,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
  },
  {
    title: "Independent Assessment",
    text: "Objective assessments conducted with fairness, consistency, and impartiality.",
    icon: (
      <>
        <path d="M12 3v18M7 21h10M3 7h18" />
        <path d="M6 7 3 14a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z" />
      </>
    ),
  },
  {
    title: "Experienced Assessors",
    text: "Qualified professionals with practical experience in education and training.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m16 11 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Supportive Approach",
    text: "A clear and transparent process that helps organizations demonstrate quality.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="m5.6 5.6 3.5 3.5M14.9 14.9l3.5 3.5M5.6 18.4l3.5-3.5M14.9 9.1l3.5-3.5" />
      </>
    ),
  },
];

const ADCP_CHECKS = ["Secure organization access", "Credential management", "QR verification", "Greater graduate visibility"];

/* 6 — How Accreditation Works */
const STEPS: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Submit Your Application",
    text: "Complete the accreditation application and provide the general information about your organization and the programs you wish to have accredited.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M12 18v-6M9 15h6" />
      </>
    ),
  },
  {
    title: "Submit Required Information",
    text: "Provide the supporting information required for assessment. AAA reviews your organization and learning programs against the applicable requirements.",
    icon: (
      <>
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9L9.2 3.6A2 2 0 0 0 7.5 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
        <path d="M12 17v-6M9 14l3-3 3 3" />
      </>
    ),
  },
  {
    title: "Accreditation Assessment",
    text: "AAA assessors evaluate your submitted information and evidence remotely through a structured document review.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3M8 11h6M11 8v6" />
      </>
    ),
  },
  {
    title: "Assessment Findings",
    text: "You receive the assessment findings and, where required, have the opportunity to address identified issues before completion of the assessment.",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
  {
    title: "Accreditation Decision",
    text: "An independent accreditation decision is made based on the assessment results and supporting evidence.",
    icon: (
      <>
        <path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10" />
        <path d="m16 16 6-6M8 8l6-6M9 7l8 8M21 11l-8-8" />
      </>
    ),
  },
  {
    title: "Accreditation Awarded",
    text: "Successful organizations receive an accreditation certificate valid for three years and may use the AAA Accreditation Symbol in accordance with the applicable requirements.",
    icon: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
      </>
    ),
  },
];

/* 7 — FAQ */
const QUICK: { icon: "cert" | "globe" | "search" | "shield" | "check" | "clipboard"; title: string; text: string }[] = [
  { icon: "cert", title: `${FACTS.cycleYears}-Year Validity`, text: "AAA accreditation is awarded for a three-year accreditation cycle." },
  { icon: "globe", title: "International Availability", text: "Organizations may apply from any country." },
  { icon: "search", title: "Remote Assessment", text: "The assessment is conducted remotely through a review of your submitted documentation." },
  { icon: "shield", title: "Accreditation Symbol", text: "Accredited organizations may use the AAA Accreditation Symbol in accordance with the applicable requirements." },
  { icon: "check", title: "Directory Listing", text: "Successful applicants are listed in the AAA Accredited Organization Directory." },
  { icon: "clipboard", title: "ADCP Access", text: "Accredited organizations receive access to the American Directory of Competent Personnel." },
];

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

      {/* 01 — Hero: copy | photo | enquiry form */}
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
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span aria-hidden="true">/</span>
                  <Link href="/programs">Programs</Link>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span aria-hidden="true">/</span>
                  <strong>Training &amp; Education Providers</strong>
                </span>
              </nav>

              <span className="ax-hero-badge tepx-hero-kicker">
                <i aria-hidden="true" />
                Training &amp; Education Providers Accreditation
              </span>

              <h1>
                <SplitWords text="Accreditation for Training & Education" />{" "}
                <em>
                  <SplitWords text="Providers" />
                  <i className="tepx-ul" aria-hidden="true" />
                </em>
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
                      <Icon name="check" size={12} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="ax-actions" data-reveal>
                <Magnetic>
                  <Link href={APPLY} className="ax-btn ax-btn-gold">
                    Apply for Accreditation <Icon name="arrow" size={14} />
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
                src="/programs/training-education/hero-accredited-provider.jpg"
                alt="Representatives of an AAA-accredited training and education provider holding their accreditation certificate"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 360px"
              />
              <figcaption>
                <span className="ax-cap">
                  <span>Accredited provider</span>
                  <strong>Real AAA-accredited training &amp; education provider</strong>
                </span>
              </figcaption>
            </figure>

            <HeroFormCard>
              <span className="eyebrow">Talk to us</span>
              <h2>Speak with an Accreditation Advisor</h2>
              <p>
                Share a few details about your organization and our team will contact you to
                discuss the most suitable next steps.
              </p>
              <AdvisorForm />
            </HeroFormCard>
          </div>
        </div>
      </section>

      {/* 02 — Why Accreditation Matters */}
      <section className="ax-section tepx-wm" id="why-accreditation-matters">
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
          <div className="ax-grid four tepx-values">
            {VALUES.map((v, i) => (
              <article className={"ax-card" + (i === 0 ? " navy" : "")} key={v.title} data-reveal>
                <div className="ax-card-top">
                  <span className={"ax-card-ico ax-ico" + (i % 2 ? " gold" : "")}>
                    <LineIcon>{v.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Accreditation in Practice */}
      <section className="ax-section cream" id="accreditation-in-practice">
        <div className="container">
          <div className="tepx-head-row">
            <div className="ax-head">
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
            <Link href="/directory/accredited-organizations" className="ax-btn ax-btn-ghost-navy" data-reveal>
              See accredited organizations <Icon name="arrow" size={14} />
            </Link>
          </div>

          <div className="tepx-proof">
            <article className="tepx-proof-card" data-reveal>
              <div className="tepx-proof-media">
                <Image
                  src="/programs/training-education/monarch-master-injectors.jpg"
                  alt="Monarch Master Injectors training session"
                  fill
                  sizes="(max-width: 980px) 100vw, 600px"
                />
                <span className="tepx-proof-label">{MONARCH.label}</span>
              </div>
              <div className="tepx-proof-body">
                <span className="ax-label">{MONARCH.kicker}</span>
                <h3>{MONARCH.name}</h3>
                <blockquote className="tepx-proof-quote">
                  <svg className="ax-quote-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.5 6A4.5 4.5 0 0 0 2 10.5V18h7v-7H5.5A2.5 2.5 0 0 1 8 8.5V6zm11 0a4.5 4.5 0 0 0-4.5 4.5V18h7v-7h-3.5a2.5 2.5 0 0 1 2.5-2.5V6z" />
                  </svg>
                  {MONARCH.quote}
                </blockquote>
                <p className="tepx-proof-person">
                  <b>{MONARCH.person}</b>
                  {MONARCH.role}
                </p>
                <div className="tepx-stats">
                  {MONARCH.metrics.map((m) => (
                    <div key={m.k}>
                      <b
                        data-count={m.count?.to}
                        data-suffix={m.count?.suffix}
                        data-decimals={m.count?.decimals}
                      >
                        {m.v}
                      </b>
                      <span>{m.k}</span>
                    </div>
                  ))}
                </div>
                <div className="tepx-proof-cta">
                  <Link href={MONARCH_STORY} className="ax-btn ax-btn-blue">
                    Read the Full Success Story <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </div>
            </article>

            <article className="tepx-proof-card" data-reveal>
              <div className="tepx-proof-media">
                <VideoEmbed
                  id={LANDMARK_VIDEO_ID}
                  title="Landmark Management Partners testimonial about AAA accreditation"
                  poster="/programs/training-education/landmark-video.jpg"
                  label="Watch the testimonial · Landmark Management Partners"
                />
              </div>
              <div className="tepx-proof-body">
                <span className="ax-label">{LANDMARK.kicker}</span>
                <h3>{LANDMARK.name}</h3>
                <p className="tepx-proof-meta">{LANDMARK.meta}</p>
                <p className="tepx-proof-copy">{LANDMARK.copy}</p>
                <ul className="ax-checks gold">
                  {LANDMARK.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tepx-proof-cta">
                  <a href={LANDMARK_STORY} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost-navy">
                    View Landmark Success Story <Icon name="arrow" size={14} />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 04 — What We Evaluate */}
      <section className="ax-section" id="what-we-evaluate">
        <div className="container">
          <div className="tepx-eval-split">
            <div className="tepx-eval-copy">
              <div className="ax-head">
                <span className="eyebrow">Our Assessment Focus</span>
                <h2>
                  <SplitWords text="What We Evaluate During Accreditation" />
                </h2>
                <p data-reveal>
                  Our assessment focuses on the key elements that contribute to delivering
                  high-quality learning programs.
                </p>
                <span className="tepx-focus" data-reveal>
                  <span className="ax-ico">
                    <Icon name="clipboard" size={16} />
                  </span>
                  Our assessment focuses on four key areas
                </span>
              </div>
              <figure className="ax-photo wide" data-reveal>
                <Image
                  src="/about/assessment.jpg"
                  alt="AAA assessors reviewing documentation with a provider"
                  fill
                  sizes="(max-width: 980px) 0px, 520px"
                />
                <span className="ax-photo-badge">Remote document review</span>
                <figcaption>
                  Findings are shared with you before the accreditation decision.
                  <span>Typically completed within 6 to 9 weeks</span>
                </figcaption>
              </figure>
            </div>
            <div className="tepx-eval-list">
              {EVALUATE.map((e, i) => (
                <article className="ax-card tepx-eval" key={e.title} data-reveal>
                  <span className={"ax-card-ico ax-ico" + (i % 2 ? " gold" : "")}>
                    <LineIcon>{e.icon}</LineIcon>
                  </span>
                  <div>
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Why Choose AAA */}
      <section className="ax-section cream" id="why-aaa">
        <div className="container">
          <div className="ax-head">
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
          <div className="ax-grid four">
            {WHY.map((w, i) => (
              <article className="ax-card" key={w.title} data-reveal>
                <div className="ax-card-top">
                  <span className={"ax-card-ico ax-ico" + (i % 2 ? " gold" : "")}>
                    <LineIcon>{w.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
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
            <article className="tepx-adcp" data-reveal>
              <span className="tepx-noise" aria-hidden="true" />
              <span className="ax-hero-badge">
                <i aria-hidden="true" />
                Flagship benefit
              </span>
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

              <div className="tepx-hub" aria-label="Illustrative view of the AAA Certification Management Hub" role="img">
                <div className="tepx-hub-bar">
                  <i />
                  <i />
                  <i />
                  <span>Certification Management Hub</span>
                </div>
                <div className="tepx-hub-stats">
                  <div>
                    <b>7</b>
                    <span>Certificates</span>
                  </div>
                  <div>
                    <b>7</b>
                    <span>Verified</span>
                  </div>
                  <div>
                    <b>0</b>
                    <span>Pending</span>
                  </div>
                </div>
                <div className="tepx-hub-rows">
                  {[0, 1, 2].map((r) => (
                    <div className="tepx-hub-row" key={r} data-reveal="row">
                      <i />
                      <i />
                      <i />
                      <em>Verified</em>
                    </div>
                  ))}
                </div>
              </div>

              <a href={ADCP_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-white">
                Explore ADCP <Icon name="arrow" size={14} />
              </a>
            </article>

            <div className="tepx-side">
              <article className="ax-card" data-reveal>
                <span className="tepx-side-media">
                  <Image src="/logo/aaalog.png" alt="AAA Accreditation Symbol" width={64} height={64} />
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
              <article className="ax-card" data-reveal>
                <span className="tepx-side-media">
                  <span className="ax-card-ico ax-ico">
                    <Icon name="globe" size={22} />
                  </span>
                </span>
                <div>
                  <h3>Global Accredited Organization Directory</h3>
                  <p>
                    Gain visibility in AAA’s online directory, allowing learners, employers, and
                    partners to verify your accredited status.
                  </p>
                </div>
              </article>
              <article className="ax-card" data-reveal>
                <span className="tepx-side-media cert">
                  <Image
                    src="/case-studies/monarch-master-injectors-certificate.jpg"
                    alt="An AAA accreditation certificate"
                    width={84}
                    height={84}
                  />
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
      <section className="ax-section tepx-wm" id="how-it-works">
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
                  <LineIcon>{s.icon}</LineIcon>
                </span>
                <span className="tepx-step-no">Step {i + 1}</span>
                <div className="tepx-step-card">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="ax-docs tepx-docs" data-reveal>
            <li className="ax-docs-title">Application &amp; requirements</li>
            <li>
              <a href={APPLICATION_FORM} target="_blank" rel="noopener noreferrer">
                <span className="ax-ico">
                  <Icon name="download" size={16} />
                </span>
                Accreditation application form
                <i>DOCX</i>
              </a>
            </li>
            <li>
              <a href={GUIDELINE} target="_blank" rel="noopener noreferrer">
                <span className="ax-ico">
                  <Icon name="doc" size={16} />
                </span>
                Guideline for accreditation of training providers
                <i>PDF</i>
              </a>
            </li>
            <li>
              <a href={SYMBOLS} target="_blank" rel="noopener noreferrer">
                <span className="ax-ico">
                  <Icon name="doc" size={16} />
                </span>
                Requirements for use of accreditation symbols
                <i>PDF</i>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section cream tepx-wm" id="faq">
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

          <div className="tepx-quick">
            {QUICK.map((q) => (
              <article className="ax-tile" key={q.title} data-reveal>
                <span className="ax-tile-ico ax-ico">
                  <Icon name={q.icon} size={20} />
                </span>
                <b>{q.title}</b>
                <span>{q.text}</span>
              </article>
            ))}
          </div>

          <FaqAccordion items={FAQ} />
        </div>
      </section>

      {/* 08 — Final CTA */}
      <section className="ax-close tepx-close tepx-wm" id="cta">
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
            <div className="ax-close-actions" data-reveal>
              <Magnetic>
                <Link href={APPLY} className="ax-btn ax-btn-gold">
                  Apply for Accreditation <Icon name="arrow" size={14} />
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
            <ul className="tepx-reassure" data-reveal>
              {REASSURE.map((r) => (
                <li key={r}>
                  <span className="ax-ico">
                    <Icon name="check" size={12} />
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
