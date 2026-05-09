import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import type { IconName } from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Healthcare Accreditation",
  description:
    "AAA accredits hospitals, clinics, and medical laboratories against ISO-aligned quality criteria — recognized across borders, payers, and regulators.",
};

type Pillar = { icon: IconName; corner: string; title: string; body: string };
const PILLARS: Pillar[] = [
  {
    icon: "book",
    corner: "01 · Doc",
    title: "Accreditation Standards",
    body:
      "The AAA Manual for Healthcare Facilities defines every clause, indicator, and evidence requirement — published, versioned, and aligned to ISO 15189.",
  },
  {
    icon: "clipboard",
    corner: "02 · Process",
    title: "Accreditation Process",
    body:
      "A documented four-stage path from preparation to decision: dedicated advisor, self-assessment, document review, on-site survey, accreditation committee.",
  },
  {
    icon: "shield",
    corner: "03 · Why AAA",
    title: "Why AAA Accreditation",
    body:
      "Seven institutional reasons facilities choose AAA — independence, ISO alignment, US authorization, dedicated advisors, and globally accepted certificates.",
  },
  {
    icon: "scale",
    corner: "04 · Services",
    title: "Consultation Services",
    body:
      "Approved AAA consultants provide gap analysis, training, and implementation support — interpreting standards inside the hospital's actual operations.",
  },
  {
    icon: "globe",
    corner: "05 · Recognition",
    title: "International Recognition",
    body:
      "AAA-accredited certificates are accepted across 60+ jurisdictions through partnership networks and mutual-recognition arrangements.",
  },
  {
    icon: "medical",
    corner: "06 · Eligibility",
    title: "Who Can Be Accredited",
    body:
      "Hospitals, day-surgery clinics, dialysis centers, medical laboratories, primary-care networks, and specialized facilities — public and private.",
  },
];

const STAGES: { cap: string; title: string; items: string[] }[] = [
  {
    cap: "Stage 01",
    title: "Preparation",
    items: [
      "Dedicated advisor assigned",
      "Self-assessment tool issued",
      "Action plan for standard implementation",
      "Advisory team training & technical support",
    ],
  },
  {
    cap: "Stage 02",
    title: "Document Review",
    items: [
      "Self-assessment finalization",
      "Submission of required documents and evidence",
      "Document review by AAA Surveyors",
    ],
  },
  {
    cap: "Stage 03",
    title: "Onsite / Hybrid Survey",
    items: [
      "Surveyors conduct 2–5 day site visit",
      "Final report issued within 2 weeks",
      "Corrective-action implementation, if required",
    ],
  },
  {
    cap: "Stage 04",
    title: "Accreditation Decision",
    items: [
      "Independent committee reviews final reports",
      "Accreditation certificate prepared",
      "Granting of accreditation valid for 3 years",
    ],
  },
];

const ELIGIBLE: { icon: IconName; title: string; desc: string }[] = [
  { icon: "medical", title: "General Hospitals", desc: "Public and private acute-care hospitals of any bed-count." },
  { icon: "flask", title: "Medical Laboratories", desc: "Clinical, pathology, and reference laboratories under ISO 15189." },
  { icon: "industry", title: "Day-Surgery Clinics", desc: "Ambulatory surgical centers and out-patient surgical units." },
  { icon: "shield", title: "Specialized Facilities", desc: "Dialysis, IVF, oncology, cardiology, and other specialized centers." },
  { icon: "scale", title: "Primary Care Networks", desc: "Multi-site primary-care providers and family medicine clinics." },
  { icon: "globe", title: "Telemedicine Providers", desc: "Digital-health and telemedicine organizations operating cross-border." },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does the full accreditation process take?",
    a: "Typically six to nine months from kick-off to accreditation decision, depending on facility size, current quality-system maturity, and how quickly corrective actions are addressed after the on-site survey.",
  },
  {
    q: "How long is the AAA accreditation valid for?",
    a: "Three years. Surveillance check-ins occur during the cycle, and a full re-accreditation survey is conducted before expiry.",
  },
  {
    q: "Which ISO standard does the healthcare program align with?",
    a: "Hospital and clinic accreditation aligns with internationally-recognized healthcare quality criteria; medical laboratories are accredited under ISO 15189. AAA's own quality management system is operated under ISO 9001.",
  },
  {
    q: "Do you provide consultation or only assessment?",
    a: "Both are available — but they are operated by separate teams. The advisory team supports gap analysis, training, and standard interpretation. Accreditation decisions are taken by an independent committee with no involvement in the advisory engagement.",
  },
  {
    q: "Can our facility be accredited if we are outside the United States?",
    a: "Yes. AAA accredits facilities across more than 60 countries through international partnership networks. The certificate is recognized across those jurisdictions.",
  },
  {
    q: "What does the on-site survey actually involve?",
    a: "A team of AAA Surveyors conducts a 2–5 day visit reviewing clinical processes, documentation, patient pathways, and quality records. A final report is issued within two weeks.",
  },
];

function HCHero() {
  return (
    <section className="hc-hero">
      <div className="hc-hero-bg" />
      <div className="hc-hero-overlay" />
      <div className="container">
        <div className="hc-hero-content reveal">
          <h1>
            Patient safety, made <em>internationally legible.</em>
          </h1>
        </div>
      </div>
    </section>
  );
}

function HCPillars() {
  return (
    <section className="hc-pillars" id="why">
      <div className="container">
        <div className="hc-pillars-head reveal">
          <div>
            <span className="eyebrow">What makes us unique</span>
            <h2 className="section-heading">Six things hospitals get from working with AAA.</h2>
          </div>
          <p className="lede">
            Independent, evidence-driven, and aligned with the ISO standard for that
            activity — never criteria we authored ourselves.
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
                  <Link href="/quote" className="ed-link">
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
          <span className="meta">Avg. 6–9 months · Validity 3 years</span>
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
            <p>Our team will respond with a tailored quote within 48 hours.</p>
          </div>
          <Link href="/quote" className="btn btn-primary">
            Apply Now <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HCEligibility() {
  return (
    <section className="hc-elig">
      <div className="container">
        <div className="grid">
          <div className="reveal">
            <span className="eyebrow">Who can be accredited</span>
            <h2>
              Built for any organization that <em>delivers care.</em>
            </h2>
            <p className="lede">
              The AAA Healthcare program is structured to apply equally to a 20-bed clinic
              and a 1,200-bed academic medical center. Eligibility is a function of
              activity, not size — if you provide healthcare, AAA accredits it.
            </p>
            <Link href="/quote" className="btn btn-gold">
              Check your eligibility <Icon name="arrow" size={14} className="arrow" />
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
          <div className="hc-team-photo reveal">
            <div className="ph">
              <div className="ph-circle">WD</div>
            </div>
            <span className="corner">Healthcare · Department Lead</span>
            <div className="accent-corner" />
          </div>
          <div className="reveal">
            <span className="eyebrow">Meet the team</span>
            <h2>A single point of contact for every healthcare applicant.</h2>
            <p className="lede">
              You won&apos;t be passed between departments. From initial inquiry through
              accreditation decision, every healthcare facility is paired with a
              department lead who owns the relationship, the timeline, and the evidence
              file.
            </p>

            <div className="person">
              <div className="av">WD</div>
              <div>
                <div className="name">Wendy Danicourt</div>
                <div className="role">Manager · Healthcare Accreditation Department</div>
              </div>
            </div>

            <div className="hc-team-cta">
              <Link href="/contact" className="btn btn-primary">
                Contact the department <Icon name="mail" size={14} className="arrow" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Schedule a call <Icon name="phone" size={14} className="arrow" />
              </Link>
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
            <h2>Everything hospitals ask before they apply.</h2>
            <p>
              Don&apos;t see your question? Our healthcare department responds to every
              inquiry within one business day.
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
      <HCPillars />
      <HCProcess />
      <HCEligibility />
      <HCTeam />
      <HCFAQ />
      <CTA />
    </>
  );
}
