import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import type { IconName } from "../../_components/Icon";
import CTA from "../../_components/CTA";
import PageHero from "../../_components/PageHero";

export const metadata: Metadata = {
  title: "Healthcare Accreditation",
  description:
    "ISQua-accredited healthcare accreditation from AAA for hospitals, clinics, dental organizations, diagnostic centers, and more — a four-stage process with dedicated advisors, granted for three years.",
};

type Pillar = { icon: IconName; corner: string; title: string; body: string; href: string };
const PILLARS: Pillar[] = [
  {
    icon: "book",
    corner: "01 · Standards",
    title: "Accreditation Standards",
    body:
      "Evidence-based criteria accredited by the International Society for Quality in Health Care (ISQua), covering every aspect of healthcare delivery across twelve chapters.",
    href: "/documents",
  },
  {
    icon: "clipboard",
    corner: "02 · Process",
    title: "Accreditation Process",
    body:
      "Your guide to the full accreditation process — four documented stages from preparation and document review to the onsite survey and accreditation decision.",
    href: "#process",
  },
  {
    icon: "shield",
    corner: "03 · Why AAA",
    title: "Why AAA Accreditation?",
    body:
      "Seven reasons to choose AAA as your trusted accreditation provider — from international recognition to dedicated advisory support and flexible survey visits.",
    href: "/about-accreditation",
  },
  {
    icon: "scale",
    corner: "04 · Services",
    title: "Consultation Services",
    body:
      "Approved AAA consultants provide gap analysis, training, and step-by-step guidance — from wherever you are today until AAA healthcare accreditation is granted.",
    href: "/contact",
  },
  {
    icon: "globe",
    corner: "05 · Recognition",
    title: "International Recognition",
    body:
      "AAA standards are assessed and accredited by ISQua EEA, meaning their development and content meet international best-practice requirements.",
    href: "/about-accreditation",
  },
  {
    icon: "medical",
    corner: "06 · Eligibility",
    title: "Who Can Be Accredited?",
    body:
      "The types of healthcare facilities that can apply for accreditation — from hospitals and clinics to pharmacies and medical travel agencies.",
    href: "#eligibility",
  },
];

const STAGES: { cap: string; title: string; items: string[] }[] = [
  {
    cap: "Stage 01",
    title: "Preparation",
    items: [
      "Dedicated advisor assigned",
      "Self-assessment tool issued",
      "Action plan set for standard implementation",
      "AAA advisory team provides training and technical support",
    ],
  },
  {
    cap: "Stage 02",
    title: "Document Review",
    items: [
      "Finalize the self-assessment tool",
      "Submission of required documents and evidence",
      "Review of documents by AAA Surveyors",
    ],
  },
  {
    cap: "Stage 03",
    title: "Onsite / Hybrid Survey",
    items: [
      "AAA Surveyors conduct an onsite or hybrid survey (2–5 days)",
      "Final report sent by the AAA team within 2 weeks",
      "Corrective-action implementation by the facility, if required",
    ],
  },
  {
    cap: "Stage 04",
    title: "Accreditation Decision",
    items: [
      "Accreditation committee reviews the surveyors' final reports",
      "Accreditation certificate prepared",
      "Accreditation granted, valid for 3 years",
    ],
  },
];

const ELIGIBLE: { icon: IconName; title: string; desc: string }[] = [
  { icon: "medical", title: "Hospitals", desc: "Including day-care surgery centers." },
  { icon: "clipboard", title: "Primary Care Clinics", desc: "Clinics that primarily provide general healthcare services." },
  { icon: "cert", title: "Specialty Clinics", desc: "Specialty practices with minor operating-room setups, including ENT and dermatology clinics." },
  { icon: "shield", title: "Dental Organizations", desc: "From single-chair dental offices to multi-unit dental clinics and hospitals." },
  { icon: "search", title: "Diagnostic Centers", desc: "X-ray centers, MRI centers, clinical analysis, and other imaging facilities." },
  { icon: "chart", title: "Rehabilitation Centers", desc: "Physiotherapy and occupational therapy clinics." },
  { icon: "flask", title: "Alternative Medicine Units", desc: "Including Ayurveda and Unani medical centers." },
  { icon: "doc", title: "Community Pharmacies", desc: "Pharmacy services provided in community settings." },
  { icon: "globe", title: "Medical Travel Agencies", desc: "Organizations facilitating travel for medical care." },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long is AAA healthcare accreditation valid?",
    a: "Accreditation is granted for three years. The decision is made by the accreditation committee after reviewing the final reports prepared by AAA Surveyors.",
  },
  {
    q: "What does the survey involve?",
    a: "AAA Surveyors conduct an onsite or hybrid survey lasting two to five days. The AAA team sends the final report within two weeks, and the facility implements corrective actions if required.",
  },
  {
    q: "Can part of the survey be conducted remotely?",
    a: "Yes. We offer flexible survey options, including a hybrid approach that blends virtual and on-site components: one or more surveyors work on-site while the remainder of the team participates via video.",
  },
  {
    q: "Are AAA standards internationally recognized?",
    a: "Yes. The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition (September 2018). AAA is also an institutional member of ISQua.",
  },
  {
    q: "Does AAA help us prepare, or only assess?",
    a: "Both. Approved AAA consultants guide you step-by-step — from the first stage, or wherever you are, until accreditation is granted — including gap analysis, training, and working through the standards. A dedicated advisor and self-assessment tool support you from stage one.",
  },
  {
    q: "How can we comment on the accreditation standards?",
    a: "AAA gathers, analyses, and uses feedback for continuous improvement under its Accreditation Standards Feedback Policy (Document No. P-HEC-10-V1). Email healthcare@aaa-accreditation.org to share feedback or to request a copy of draft standards for consultation.",
  },
];

function HCHero() {
  return (
    <PageHero
      image="/hero.jpg"
      eyebrow="Healthcare Accreditation"
      title={<>Advancing excellence in <em>healthcare.</em></>}
      intro="At the American Accreditation Association, we ensure hospitals and healthcare organizations deliver safe, high-quality care while fostering continuous improvement and innovation. Partnering with AAA demonstrates your commitment to patient safety, clinical excellence, and operational efficiency."
      crumbs={[{ href: "/programs/healthcare", label: "Programs" }, { label: "Healthcare Accreditation" }]}
      meta={[
        { k: "Recognition", v: "ISQua EEA" },
        { k: "Audit cycle", v: "3-year accreditation cycle" },
      ]}
    />
  );
}

function HCIntro() {
  return (
    <section className="hc-intro">
      <div className="container">
        <div className="grid">
          <span className="label reveal">What makes us unique?</span>
          <div className="reveal">
            <h2>
              AAA is the only healthcare accreditation body that will ensure you get
              the accreditation through our{" "}
              <strong>approved consultants who will be guiding you step-by-step</strong>{" "}
              — taking you from the first stage or wherever you are until you are
              granted AAA healthcare accreditation.
            </h2>
            <p>
              Their guidance will include gap analysis, training, going through the
              standards and ensuring understanding and applicability of it within your
              hospital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HCPillars() {
  return (
    <section className="hc-pillars">
      <div className="container">
        <div className="hc-pillars-head reveal">
          <div>
            <span className="eyebrow">The healthcare program</span>
            <h2 className="section-heading">Everything the program covers, in six parts.</h2>
          </div>
          <p className="lede">
            Programs created according to the international requirements of ISQua, in
            consultation with 174 international healthcare experts.
          </p>
        </div>

        <div className="hc-pillars-grid">
          {PILLARS.map((c, i) => (
            <article
              className="hc-card reveal"
              key={c.title}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="hc-card-img">
                <span className="corner">{c.corner}</span>
                <div className="icon-wrap">
                  <Icon name={c.icon} size={64} strokeWidth={1.2} />
                </div>
              </div>
              <div className="hc-card-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="foot">
                  <Link href={c.href} className="ed-link">
                    Learn more <Icon name="arrow" size={14} className="arrow" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HCProcess() {
  return (
    <section className="hc-process" id="process">
      <div className="container">
        <div className="hc-process-head reveal">
          <div>
            <span className="eyebrow">Accreditation process</span>
            <h2 className="section-heading">Four stages, fully documented.</h2>
          </div>
          <span className="meta">Survey 2–5 days · Valid 3 years</span>
        </div>

        <div className="hc-process-grid">
          {STAGES.map((s, i) => (
            <div
              className="hc-stage reveal"
              key={s.title}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="hc-stage-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="hc-stage-cap">{s.cap}</div>
              <h4>{s.title}</h4>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>
                    <Icon name="cert" size={14} strokeWidth={1.6} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hc-process-foot reveal">
          <div>
            <h4>Now you can apply for accreditation</h4>
            <p>
              Submit your application and a dedicated advisor will guide you from your
              first step to the accreditation decision.
            </p>
          </div>
          <Link href="/apply" className="btn btn-primary">
            Apply Now <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HCEligibility() {
  return (
    <section className="hc-elig" id="eligibility">
      <div className="container">
        <div className="grid">
          <div className="reveal">
            <span className="eyebrow">Who can be accredited?</span>
            <h2>
              Open to the full spectrum of <em>care providers.</em>
            </h2>
            <p className="lede">
              From single-chair dental offices to multi-unit hospitals, the AAA
              healthcare program accredits the complete range of healthcare facilities.
            </p>
            <Link href="/apply" className="btn btn-gold">
              Apply for accreditation <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>

          <div className="hc-elig-list reveal">
            {ELIGIBLE.map((e) => (
              <div className="hc-elig-cell" key={e.title}>
                <Icon name={e.icon} size={22} className="ico" strokeWidth={1.4} />
                <h5>{e.title}</h5>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HCTeam() {
  return (
    <section className="hc-team" id="team">
      <div className="container">
        <div className="hc-team-grid">
          <div className="hc-team-form reveal">
            <h3>Contact the department</h3>
            <p className="hc-form-sub">
              Tell us about your facility and a dedicated advisor will get back to you.
            </p>
            <form className="form-grid" action="#" method="post">
              <div className="form-row"><label>Name</label><input name="name" required /></div>
              <div className="form-row"><label>Email</label><input name="email" type="email" required /></div>
              <div className="form-row"><label>Phone</label><input name="phone" type="tel" /></div>
              <div className="form-row"><label>Subject</label><input name="subject" /></div>
              <div className="form-row full"><label>Message</label><textarea name="message" required /></div>
              <div className="form-row full">
                <label>Where did you hear about us?</label>
                <select name="referral" defaultValue="">
                  <option value="" disabled>Select an option…</option>
                  <option>Search engine</option>
                  <option>Referral or word of mouth</option>
                  <option>Social media</option>
                  <option>Conference or event</option>
                  <option>News or publication</option>
                  <option>Existing client</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-actions full">
                <button type="submit" className="btn btn-primary">
                  Contact us <Icon name="arrow" size={14} className="arrow" />
                </button>
              </div>
            </form>
          </div>

          <div className="reveal">
            <span className="eyebrow">Meet the AAA team</span>
            <h2>A dedicated advisor for every healthcare applicant.</h2>
            <p className="lede">
              Every applicant facility works with a dedicated advisor committed to its
              specific needs, supported by a strong customer-care team that accompanies
              you throughout the accreditation process.
            </p>

            <div className="person">
              <div className="av">WD</div>
              <div>
                <div className="name">Wendy Danicourt</div>
                <div className="role">Manager · Healthcare Accreditation Department</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HCFAQ() {
  return (
    <section className="hc-faq">
      <div className="container">
        <div className="grid">
          <div className="side reveal">
            <span className="eyebrow">Frequently asked</span>
            <h2>Everything facilities ask before they apply.</h2>
            <p>
              Don&apos;t see your question? Contact the healthcare accreditation
              department at healthcare@aaa-accreditation.org.
            </p>
          </div>
          <div className="list reveal">
            {FAQS.map((f, i) => (
              <details className="hc-faq-item" key={f.q} open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <span className="plus">
                    <Icon name="arrow" size={12} strokeWidth={2} />
                  </span>
                </summary>
                <div className="answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <HCHero />
      <div className="hc-rx">
        <HCIntro />
        <HCPillars />
        <HCProcess />
        <HCEligibility />
        <HCTeam />
        <HCFAQ />
      </div>
      <CTA />
    </>
  );
}
