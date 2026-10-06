import Link from "next/link";
import Image from "next/image";
import PageHero from "../../_components/PageHero";
import JsonLd from "../../_components/JsonLd";
import NavyCard from "../../_components/site/NavyCard";
import SectionHead from "../../_components/site/SectionHead";
import Stat from "../../_components/site/Stat";
import Glyph, { type GlyphName } from "../../_components/site/Glyph";
import { CAB_SCHEMES, CONTACT, FACTS, PROGRAMS } from "@/lib/facts";
import { pageMeta, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import AdvisorForm from "./AdvisorForm";
import CabVideo from "./CabVideo";
import "./cab.css";

/*
 * Conformity Assessment Bodies hub — rebuilt Oct 2026 on the client's final
 * "Home page for CABs" package: Hero (+ advisor form) → Choose Your Program
 * (8 cards) → Why Accreditation Matters → Why Choose AAA (stats) → How
 * Accreditation Works → Testimonials (video) → FAQ → Final CTA. Every card is
 * the shared NavyCard; stats come from lib/facts.
 */

const PATH = PROGRAMS.cab.href;
const IMG = "/images/site/cab-hub";

const DESCRIPTION =
  "AAA accredits testing and calibration laboratories, inspection bodies, certification bodies, medical laboratories and proficiency testing providers worldwide.";

export const metadata = pageMeta({
  title: "Conformity Assessment Bodies Accreditation",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "conformity assessment body accreditation",
    "CAB accreditation",
    "ISO/IEC 17025 accreditation",
    "ISO/IEC 17020 accreditation",
    "ISO/IEC 17021-1 accreditation",
    "ISO/IEC 17024 accreditation",
    "ISO 15189 accreditation",
    "ISO/IEC 17065 accreditation",
    "ISO/IEC 17043 accreditation",
  ],
});

/* ------------------------------------------------------------------ data */

/** Client copy + icon for each program, in CAB_SCHEMES order. */
const PROGRAM_COPY: { icon: GlyphName; text: string }[] = [
  {
    icon: "flask",
    text: "For laboratories performing testing or sampling activities that require technically valid, reliable, and traceable results.",
  },
  {
    icon: "gauge",
    text: "For laboratories performing calibration activities to establish measurement accuracy, traceability, and confidence in results.",
  },
  {
    icon: "search-check",
    text: "For organizations examining products, equipment, installations, processes, or services against specified requirements.",
  },
  {
    icon: "certificate",
    text: "For bodies certifying management systems such as quality, environmental, information security, or occupational health and safety systems.",
  },
  {
    icon: "id-card",
    text: "For organizations certifying the competence of individuals against defined requirements or certification schemes.",
  },
  {
    icon: "microscope",
    text: "For laboratories providing medical examination services that support diagnosis, screening, treatment, and patient care.",
  },
  {
    icon: "package",
    text: "For bodies certifying products, processes, or services, including applicable Halal certification programs.",
  },
  {
    icon: "chart",
    text: "For organizations designing and operating proficiency testing schemes that help laboratories evaluate and improve their performance.",
  },
];

const PROGRAM_CARDS = CAB_SCHEMES.map((s, i) => ({ ...s, ...PROGRAM_COPY[i] }));
const PROGRAM_COUNT = String(CAB_SCHEMES.length);

const HERO_CHIPS = [
  "Laboratories",
  "Inspection Bodies",
  "Certification Bodies",
  "Medical Laboratories",
  "Proficiency Testing Providers",
];

const MATTERS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "badge-check",
    title: "Demonstrate Technical Competence",
    text: "Show clients, regulators, and other stakeholders that your organization has the qualified personnel, methods, equipment, and systems needed to perform its accredited activities.",
  },
  {
    icon: "handshake",
    title: "Strengthen Confidence",
    text: "Build greater trust in your inspection, testing, calibration, certification, medical laboratory, or proficiency testing services.",
  },
  {
    icon: "check-circle",
    title: "Support Reliable Results",
    text: "Demonstrate that your conformity assessment activities are performed consistently and that the results or decisions issued by your organization can be relied upon.",
  },
  {
    icon: "trending-up",
    title: "Improve Market Access",
    text: "Support participation in tenders, supply chains, regulated sectors, and markets where accredited conformity assessment services are required or preferred.",
  },
];

const WHY_AAA: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "International Experience",
    text: "Supporting conformity assessment bodies across multiple countries and technical sectors.",
  },
  {
    icon: "certificate",
    title: "International Standards",
    text: "Providing accreditation against internationally recognized conformity assessment standards.",
  },
  {
    icon: "user-check",
    title: "Experienced Technical Assessors",
    text: "Assessment teams are selected according to the applicable standard and requested technical scope.",
  },
  {
    icon: "scale",
    title: "Independent Accreditation Decisions",
    text: "Accreditation decisions are made independently from the assessment process to support impartiality.",
  },
  {
    icon: "route",
    title: "Clear & Efficient Process",
    text: "A structured accreditation pathway with clear guidance from application through accreditation.",
  },
  {
    icon: "message",
    title: "Responsive Support",
    text: "Our team is available to answer questions and guide organizations throughout the accreditation journey.",
  },
];

const STATS = [
  { v: FACTS.countriesPlus, k: "Countries Served Worldwide" },
  { v: FACTS.organizations, k: "Accredited Organizations" },
  { v: FACTS.assessors, k: "Assessors & Experts" },
  { v: PROGRAM_COUNT, k: "CAB Accreditation Programs" },
  { v: FACTS.certificates, k: "Accredited Certificates" },
];

const STEPS = [
  {
    t: "Select the Appropriate Program",
    d: "Identify the accreditation program and international standard that match your organization’s conformity assessment activities.",
  },
  {
    t: "Submit Your Application",
    d: "Provide the required information about your organization, activities, locations, and proposed scope of accreditation.",
  },
  {
    t: "Document Review",
    d: "AAA reviews the submitted documentation to confirm readiness and identify any areas requiring clarification before the assessment.",
  },
  {
    t: "Accreditation Assessment",
    d: "Qualified assessors evaluate your organization against the applicable accreditation requirements and technical scope.",
  },
  {
    t: "Address Assessment Findings",
    d: "Where findings are identified, your organization is given the opportunity to submit corrective actions and supporting evidence.",
  },
  {
    t: "Independent Accreditation Decision",
    d: "The assessment results are reviewed independently before a formal accreditation decision is made.",
  },
  {
    t: "Accreditation Awarded",
    d: "Successful organizations receive an accreditation certificate together with the approved scope of accreditation.",
  },
];

const IMPACTS: { icon: GlyphName; t: string; d: string }[] = [
  { icon: "user-check", t: "Technical Expertise", d: "Assessment supported by knowledgeable subject-matter experts." },
  { icon: "handshake", t: "Strong Collaboration", d: "A professional and collaborative accreditation experience." },
  { icon: "trending-up", t: "Greater Credibility", d: "Accreditation reinforced confidence and supported future growth." },
];

const FAQ = [
  {
    q: "What is a conformity assessment body?",
    a: "A conformity assessment body is an organization that performs activities such as testing, calibration, inspection, certification, medical laboratory services, or proficiency testing.",
  },
  {
    q: "Which accreditation program applies to my organization?",
    a: "The applicable program depends on your organization's activities. Each accreditation program is based on a specific international standard relevant to those activities.",
  },
  {
    q: "Can an organization apply for more than one accreditation program?",
    a: "Yes. Organizations that perform different conformity assessment activities may apply for multiple accreditation programs, provided they satisfy the applicable requirements for each requested scope.",
  },
  {
    q: "How is the accreditation scope defined?",
    a: "The scope identifies the specific activities, methods, products, services, sectors, or standards covered by the accreditation and is evaluated as part of the assessment.",
  },
  {
    q: "Can organizations outside the United States apply?",
    a: "Yes. AAA provides accreditation services to conformity assessment bodies in countries around the world.",
  },
  {
    q: "How are assessors selected?",
    a: "Assessment teams are selected according to the applicable accreditation standard, the organization's activities, and the requested technical scope.",
  },
  {
    q: "How long does accreditation remain valid?",
    a: "AAA accreditation is valid for three years, subject to continued compliance with AAA accreditation requirements and successful completion of any required surveillance or reassessment activities.",
  },
  {
    q: "How are accreditation fees calculated?",
    a: "Fees depend on the selected accreditation program, technical scope, number of locations, complexity of activities, and assessment requirements. A tailored quotation is provided after reviewing your application.",
  },
  {
    q: "Where can I find the requirements and application documents?",
    a: "The relevant requirements, application forms, and supporting documents are available on each individual accreditation program page.",
  },
  {
    q: "How do I begin?",
    a: "Select the accreditation program that best matches your organization's activities or contact the AAA team for guidance if you are unsure which accreditation standard applies.",
  },
];

const TRUST = ["International accreditation services", "Technical guidance", "Support from enquiry to application"];

const VIDEO_ID = "GPGwbCsk7CY";
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

/* ------------------------------------------------------------------ page */

export default function CabHubPage() {
  return (
    <div className="axp cabh">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Accreditation Programs", path: "/programs" },
            { name: PROGRAMS.cab.label, path: PATH },
          ]),
          faqSchema(FAQ),
          serviceSchema({
            name: PROGRAMS.cab.label,
            description: DESCRIPTION,
            path: PATH,
            standard: CAB_SCHEMES.map((s) => s.standard)
              .filter((s, i, a) => a.indexOf(s) === i)
              .join(", "),
            audience: "Conformity assessment bodies",
          }),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Conformity Assessment Bodies"
        crumbs={[{ href: "/programs", label: "Programs" }, { label: "Conformity Assessment Bodies" }]}
        title={
          <>
            Accreditation for <span className="cabh-gold">Conformity Assessment Bodies</span>
          </>
        }
        intro="AAA accredits organizations that perform conformity assessment activities, including testing, calibration, inspection, certification, medical laboratory services, and proficiency testing, in accordance with internationally recognized standards."
        image={`${IMG}/aaa-accredited-conformity-assessment-bod-416d3d2d.webp`}
        imageAlt="AAA accredited conformity assessment body holding its accreditation certificate"
        caption={{ kicker: "Conformity Assessment Bodies", title: "AAA Accredited Conformity Assessment Body" }}
        actions={
          <>
            <ul className="cabh-chips" aria-label="Organizations AAA accredits">
              {HERO_CHIPS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <a href="#choose-your-program" className="ax-btn ax-btn-gold">
              Find Your Accreditation Program <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
            <a href={CONTACT.consultationUrl} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
        meta={[
          { v: FACTS.countriesPlus, k: "Countries Served Worldwide" },
          { v: PROGRAM_COUNT, k: "Accreditation Programs" },
          { v: "Multiple", k: "International Standards" },
        ]}
      />

      {/* Advisor form — overlaps the hero */}
      <section className="cabh-advisor" aria-labelledby="cabh-advisor-h">
        <div className="container">
          <div className="cabh-advisor-card reveal">
            <div className="cabh-advisor-intro">
              <span className="cabh-seal" aria-hidden="true">
                <Glyph name="message" />
              </span>
              <h2 id="cabh-advisor-h">Speak with an Accreditation Advisor</h2>
              <p>
                Tell us about your organization and activities, and our team will help identify the most suitable
                accreditation program.
              </p>
            </div>
            <AdvisorForm />
          </div>
        </div>
      </section>

      {/* 02 — Choose your program */}
      <section className="ax-section" id="choose-your-program">
        <div className="container">
          <SectionHead
            center
            eyebrow="Conformity Assessment Programs"
            title="Choose Your Accreditation Program"
            intro="Select the accreditation program that best matches your organization’s activities. Each program is based on a specific international standard and designed for a particular type of conformity assessment body."
          />
          <div className="ax-blue-grid four">
            {PROGRAM_CARDS.map((p) => (
              <NavyCard key={p.href} icon={p.icon} tag={p.standard} title={p.shortLabel} href={p.href} cta="Learn More">
                <p>{p.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Why accreditation matters */}
      <section className="ax-section cream" id="why-accreditation-matters">
        <div className="container">
          <SectionHead
            center
            eyebrow="Benefits of Accreditation"
            title="Why Accreditation Matters"
            intro="Accreditation provides independent recognition that your organization is competent to perform its conformity assessment activities consistently and impartially."
          />
          <div className="ax-blue-grid four">
            {MATTERS.map((m, i) => (
              <NavyCard key={m.title} icon={m.icon} no={String(i + 1).padStart(2, "0")} title={m.title}>
                <p>{m.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Why choose AAA */}
      <section className="ax-section" id="why-choose-aaa">
        <div className="container">
          <SectionHead
            center
            eyebrow="International Experience. Technical Expertise."
            title="Why Choose AAA?"
            intro="Organizations around the world choose AAA for its international experience, technical expertise, impartial accreditation process, and commitment to internationally recognized standards."
          />

          <div className="cabh-why">
            <figure className="ax-photo cabh-why-photo reveal">
              <Image
                src={`${IMG}/representatives-of-an-aaa-accredited-org-a5ac85f7.jpg`}
                alt="Representatives of an AAA accredited organization holding their accreditation certificate"
                fill
                sizes="(max-width: 980px) 90vw, 440px"
              />
              <figcaption>
                Supporting Conformity Assessment Bodies Worldwide
                <span>Real organizations. Independent assessment. International accreditation services.</span>
              </figcaption>
            </figure>

            <ul className="cabh-why-list">
              {WHY_AAA.map((w) => (
                <li key={w.title} className="reveal">
                  <span className="ax-card-ico">
                    <Glyph name={w.icon} />
                  </span>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul className="ax-metrics cabh-metrics" aria-label="AAA in numbers">
            {STATS.map((s) => (
              <li key={s.k} className="ax-metric reveal">
                <b>
                  <Stat value={s.v} />
                </b>
                <span>{s.k}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — How accreditation works */}
      <section className="ax-section cream" id="how-accreditation-works">
        <div className="container cabh-process">
          <div className="cabh-process-copy">
            <SectionHead
              eyebrow="A Structured Accreditation Journey"
              title="How Accreditation Works"
              intro="AAA follows a structured accreditation process designed to assess your organization against the applicable international standard and requested scope of accreditation."
            />
            <p className="ax-note reveal">
              The assessment approach, required evidence, timeframe, and technical activities depend on the selected
              accreditation program and requested scope.
            </p>
          </div>

          <div className="ax-steps-panel cabh-steps reveal">
            <ol className="ax-steps">
              {STEPS.map((s, i) => (
                <li className="ax-step" key={s.t}>
                  <span className="ax-step-num">{i + 1}</span>
                  <span className="ax-step-body">
                    <em>Step {i + 1}</em>
                    <b>{s.t}</b>
                    <span>{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 06 — Testimonials */}
      <section className="ax-section" id="accredited-organizations">
        <div className="container">
          <SectionHead
            center
            eyebrow="Real Accreditation Experiences"
            title="Hear From Our Accredited Organizations"
            intro="Discover how AAA accreditation has supported certification bodies through technical expertise, professional collaboration, and stronger credibility."
          />

          <div className="cabh-story">
            <div className="reveal">
              <CabVideo
                id={VIDEO_ID}
                title="Lazarus Alliance — AAA accreditation experience"
                poster={`${IMG}/michael-peters-ceo-of-lazarus-alliance-s-7faa5977.webp`}
                alt="Michael Peters, CEO of Lazarus Alliance, speaking about the AAA accreditation experience"
                label="Watch the Lazarus Alliance Story"
                sub="AAA Accredited Certification Body · Arizona, United States"
              />
            </div>

            <div className="ax-quote cabh-quote reveal">
              <span className="ax-quote-mark" aria-hidden="true">
                <Glyph name="quote" size={40} />
              </span>
              <blockquote>
                The AAA team is very technically precise, with strong subject-matter expertise and great
                collaboration. I do not hesitate to endorse AAA to prospective customers.
              </blockquote>
              <div className="ax-quote-person">
                <strong>Michael Peters</strong>
                <span>CEO, Lazarus Alliance</span>
                <span className="cabh-quote-org">AAA Accredited Certification Body · United States</span>
              </div>

              <ul className="cabh-impacts">
                {IMPACTS.map((m) => (
                  <li key={m.t}>
                    <Glyph name={m.icon} size={20} />
                    <div>
                      <strong>{m.t}</strong>
                      <span>{m.d}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cabh-quote-actions">
                <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-blue sm">
                  Watch the Full Story <Glyph name="play" size={14} strokeWidth={2} />
                </a>
                <Link href="/news" className="ax-btn ax-btn-ghost-navy sm">
                  Read the Success Story
                </Link>
              </div>
            </div>
          </div>

          <div className="cabh-second reveal">
            <div className="cabh-second-photo">
              <Image
                src={`${IMG}/christiano-baros-of-kcertification-holdi-977c68f7.webp`}
                alt="Christiano Baros of KCertification holding an AAA accreditation certificate"
                width={1380}
                height={863}
                sizes="(max-width: 720px) 90vw, 260px"
              />
            </div>
            <div className="cabh-second-copy">
              <span className="cabh-second-kicker">Another Accredited Organization’s Experience</span>
              <blockquote>
                We began the process seeking a reliable partner to accredit our services, and from start to finish,
                everything was handled with professionalism.
              </blockquote>
              <div className="cabh-second-person">
                <strong>Christiano Baros</strong>
                <span>CEO, KCertification · São Paulo, Brazil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <SectionHead
            center
            eyebrow="Frequently Asked Questions"
            title="Questions About CAB Accreditation"
            intro="Find answers to common questions about conformity assessment body accreditation, eligibility, accreditation scope, and how to begin."
          />
          <div className="ax-faq-list cabh-faq">
            {FAQ.map((f) => (
              <details className="ax-faq-item reveal" key={f.q}>
                <summary>
                  {f.q}
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>
                    {f.q === "How long does accreditation remain valid?" ? (
                      <>
                        AAA accreditation is valid for <strong>three years</strong>, subject to continued compliance
                        with AAA accreditation requirements and successful completion of any required surveillance or
                        reassessment activities.
                      </>
                    ) : (
                      f.a
                    )}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Final CTA */}
      <section className="ax-close" id="cta">
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-close-inner reveal">
            <span className="eyebrow">Take the Next Step</span>
            <h2>Ready to Find the Right Accreditation Program?</h2>
            <p>
              Whether you already know the accreditation standard you need or would like guidance in selecting the
              most appropriate program, our team is here to help.
            </p>
            <div className="ax-close-actions">
              <a href="#choose-your-program" className="ax-btn ax-btn-gold">
                Explore Accreditation Programs <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </a>
              <a href={CONTACT.consultationUrl} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
                Book a Free Consultation
              </a>
            </div>
            <ul className="cabh-trust">
              {TRUST.map((t) => (
                <li key={t}>
                  <Glyph name="check" size={14} strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="cabh-guidance">
              Not sure which program is right for you? Our accreditation team will help identify the most suitable
              standard and accreditation pathway for your organization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
