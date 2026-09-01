import Image from "next/image";
import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta } from "../../../../lib/seo";
import {
  ArrowIcon,
  ClusterNav,
  DownloadIcon,
  HC_APPLICATION_FORM,
  HC_CONSULT,
  HC_EMAIL,
  LineIcon,
  hcRelated,
} from "../cluster";
import "../hc.css";

const SELF = "/programs/healthcare/process";

export const metadata = pageMeta({
  title: "Healthcare Accreditation Process & Timeline",
  description:
    "The AAA healthcare accreditation process: four documented stages, a 3–6 month preparation phase, on-site or hybrid survey and a 28-day decision.",
  path: SELF,
  keywords: [
    "healthcare accreditation process",
    "accreditation timeline",
    "hospital accreditation survey",
    "AAA accreditation stages",
  ],
});

/* The four formal accreditation stages, as published by AAA. */
const STAGES: { title: string; items: string[] }[] = [
  {
    title: "Preparation",
    items: [
      "A dedicated advisor is assigned",
      "You receive the self-assessment tool",
      "An action plan is set for implementing the standards",
      "The AAA advisory team provides training and technical support",
    ],
  },
  {
    title: "Document review",
    items: [
      "Finalize the self-assessment tool",
      "Submit the required documents and evidence",
      "AAA Surveyors review the documents",
    ],
  },
  {
    title: "Onsite / hybrid survey",
    items: [
      "AAA Surveyors conduct an onsite or hybrid survey (2 to 5 days)",
      "The AAA team sends the final report within 2 weeks",
      "The facility implements corrective actions, if required",
    ],
  },
  {
    title: "Accreditation decision",
    items: [
      "The accreditation committee reviews the surveyors' final reports",
      "The accreditation certificate is prepared",
      "Accreditation is granted, valid for 3 years",
    ],
  },
];

/* The planning timeline, transcribed from AAA's "Accreditation Process
   Timeline & what to expect" guide. */
type Phase = { title: string; when: string; items: { lead?: string; text: string }[] };

const PHASES: Phase[] = [
  {
    title: "Preparation phase",
    when: "3–6 months",
    items: [
      {
        lead: "Assess readiness",
        text: "Evaluate your current healthcare practices, policies and systems to determine how they align with the accreditation standards, once you receive your healthcare manual.",
      },
      {
        lead: "Gather documentation",
        text: "Collect the policies, procedures and records that demonstrate compliance, and separate what must be sent before the survey from what will be demonstrated during it.",
      },
      {
        lead: "Form an accreditation team",
        text: "Appoint the individuals who will lead the process — typically staff from quality management, clinical services and administration.",
      },
      {
        lead: "Education & training",
        text: "Educate your staff about the accreditation standards, the process, and their roles in achieving compliance.",
      },
    ],
  },
  {
    title: "Self-assessment & gap analysis",
    when: "Within preparation",
    items: [
      {
        lead: "Conduct a self-assessment",
        text: "Review your existing processes, systems and services against the accreditation criteria.",
      },
      {
        lead: "Identify gaps",
        text: "Identify the areas that need improvement or modification to meet the accreditation standards.",
      },
      {
        lead: "Develop an action plan",
        text: "Create a detailed plan to address the identified gaps — revising policies, improving clinical practices or enhancing patient safety protocols.",
      },
    ],
  },
  {
    title: "Implement changes & improvements",
    when: "Within preparation",
    items: [
      {
        lead: "Make necessary improvements",
        text: "Begin implementing the changes in your action plan: updating protocols, training staff and improving facilities.",
      },
      {
        lead: "Monitor your progress",
        text: "Continuously monitor the effectiveness of the changes and confirm the improvements align with the accreditation requirements.",
      },
      {
        lead: "Conduct internal mock surveys",
        text: "Identify any remaining issues and address them before the official survey.",
      },
    ],
  },
  {
    title: "Prepare for the on-site survey",
    when: "1–2 months before",
    items: [
      {
        lead: "Review documentation and records",
        text: "Ensure all required documents and records are up to date and available for review by the surveyors, and send what needs to be sent beforehand.",
      },
      {
        lead: "Prepare your staff",
        text: "Make sure everyone understands their role during the survey and the expectations of the compliance agenda.",
      },
    ],
  },
  {
    title: "On-site / hybrid survey",
    when: "3 days – 1 week",
    items: [
      { lead: "Schedule the survey", text: "Set the date for the official accreditation survey." },
      {
        lead: "Host the surveyors",
        text: "A team of surveyors visits your facility, reviews documents, and interviews staff and patients.",
      },
      {
        lead: "Receive initial feedback",
        text: "After the survey you have a debriefing meeting outlining any areas for improvement or suggestions from the surveyors.",
      },
    ],
  },
  {
    title: "Post-survey & accreditation decision",
    when: "Within 28 working days",
    items: [
      {
        lead: "Corrective actions",
        text: "If issues are identified during or after the survey, implement corrective actions and submit evidence of compliance — especially where a conditional accreditation is followed by another survey.",
      },
      {
        lead: "Final decision",
        text: "Once concerns are addressed, the Accreditation Decision Committee makes the final decision on your accreditation status.",
      },
      {
        lead: "Accreditation awarded",
        text: "If you meet all the necessary standards in accordance with the AAA manual, you are granted accreditation.",
      },
    ],
  },
  {
    title: "Ongoing maintenance",
    when: "Continuous",
    items: [
      {
        lead: "Regular reviews",
        text: "Conduct regular internal audits and assessments to ensure ongoing compliance with the accreditation standards.",
      },
      {
        lead: "Prepare for self-assessment",
        text: "A self-assessment is conducted after 18 months for the organization to review its own compliance.",
      },
      {
        lead: "Prepare for re-accreditation",
        text: "Accreditation is valid for a set period — typically 3 years. Begin preparing for re-accreditation well in advance.",
      },
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does the whole process take?",
    a: "It depends where you start. AAA's timeline guide allows 3 to 6 months for the preparation phase, 1 to 2 months of focused preparation before the survey, an on-site or hybrid survey, and an accreditation decision within 28 working days of the survey being completed.",
  },
  {
    q: "How long is the survey itself?",
    a: "AAA Surveyors conduct an onsite or hybrid survey lasting two to five days; AAA's planning guide advises reserving three days to one week for the visit. A debriefing meeting follows immediately, and the final report is sent within two weeks.",
  },
  {
    q: "What happens if we do not meet a standard?",
    a: "If issues are identified during or after the survey, you implement corrective actions and submit evidence of compliance. This is especially the case where a conditional accreditation is followed by another survey. Once concerns are addressed, the Accreditation Decision Committee makes the final decision.",
  },
  {
    q: "Do we have to do this alone?",
    a: "No. Consulting services are available if you need help preparing. You are assigned a dedicated healthcare consultant who guides you through the process step by step, whether you are at the beginning of the journey or near the end.",
  },
  {
    q: "What happens after we are accredited?",
    a: "Ongoing maintenance is continuous: regular internal audits and assessments, a self-assessment after 18 months for the organization to review its own compliance, and preparation for re-accreditation well before the three-year certificate expires.",
  },
];

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
            { name: "Accreditation Process", path: SELF },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        eyebrow="Accreditation Process"
        badge="Process · Timeline · What to expect"
        title={
          <>
            From first enquiry to <em>accreditation granted.</em>
          </>
        }
        intro="Your guide to the full AAA healthcare accreditation process — the four formal stages, how long each phase realistically takes, and exactly what your team needs to have ready at each point."
        crumbs={[
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "Accreditation Process" },
        ]}
        actions={
          <>
            <a
              href={HC_APPLICATION_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn ax-btn-gold"
            >
              <DownloadIcon /> Download Application Form
            </a>
            <a href={HC_CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
        meta={[
          { k: "Preparation phase", v: "3–6 months" },
          { k: "Pre-survey preparation", v: "1–2 months" },
          { k: "Decision after survey", v: "28 days" },
          { k: "Accreditation validity", v: "3 years" },
        ]}
      />

      {/* Four formal stages */}
      <section className="ax-section" id="stages">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">The formal process</span>
            <h2>Four stages, fully documented</h2>
            <p>
              Every AAA healthcare accreditation follows the same four stages, with a dedicated
              advisor assigned from stage one.
            </p>
          </div>

          <div className="ax-split top">
            <div className="ax-steps-panel reveal">
              <h3>Accreditation stages</h3>
              <ol className="ax-steps">
                {STAGES.map((s, i) => (
                  <li className="ax-step" key={s.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="ax-step-body">
                      <b>{s.title}</b>
                      <span>{s.items.join(" · ")}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </LineIcon>
                </span>
                Accreditation certificate valid for 3 years
              </span>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/about/assessment.jpg"
                alt="AAA surveyors reviewing records with hospital staff during an on-site accreditation survey"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Stage 3 · Survey</span>
              <figcaption>
                Surveyors review documents, walk the facility, and interview staff and patients.
                <span>On-site or hybrid, 2–5 days</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Detailed timeline */}
      <section className="ax-section cream" id="timeline">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Timeline &amp; what to expect</span>
            <h2>Phase by phase, with realistic durations</h2>
            <p>
              This is AAA&apos;s planning guide for facilities preparing for accreditation. Use it to
              schedule internal work, brief your board, and set expectations with your team.
            </p>
          </div>

          <div className="ax-grid two">
            {PHASES.map((p, i) => (
              <article className="ax-card hc-phase reveal" key={p.title} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon strokeWidth={2}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </LineIcon>
                  </span>
                  <span className="hc-phase-when">{p.when}</span>
                </div>
                <h3>
                  {String(i + 1).padStart(2, "0")}. {p.title}
                </h3>
                <ul className="ax-checks">
                  {p.items.map((it) => (
                    <li key={it.text}>
                      <span>
                        {it.lead && <strong>{it.lead}: </strong>}
                        {it.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Optional support */}
      <section className="ax-section" id="support">
        <div className="container">
          <div className="ax-split even">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Optional stages</span>
                <h2>
                  You do not have to walk this <em>on your own.</em>
                </h2>
                <p>
                  AAA provides consulting services if you need help preparing. You are assigned a
                  dedicated healthcare consultant who guides you through the process step by step —
                  whether you are at the very beginning of the journey or close to the end.
                </p>
              </div>
              <ul className="ax-checks gold">
                <li>Gap analysis against the standards before you commit to a survey date</li>
                <li>Policy development and documentation support</li>
                <li>Staff training on the standards and their role in the survey</li>
                <li>Internal mock surveys before the official visit</li>
              </ul>
              <div className="ax-actions">
                <Link href="/programs/healthcare/consultation" className="ax-btn ax-btn-blue">
                  Explore consultation services <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                </LineIcon>
              </span>
              <h3>Now you can apply for accreditation</h3>
              <p>
                Complete the healthcare accreditation application form with details of your facility,
                its services and the scope you want assessed. A dedicated advisor takes it from there.
              </p>
              <a
                href={HC_APPLICATION_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn-blue"
              >
                <DownloadIcon /> Download Application Form
              </a>
              <p className="ax-panel-note">
                Questions first? Email{" "}
                <a className="ax-link" href={`mailto:${HC_EMAIL}`}>
                  {HC_EMAIL}
                </a>
                .
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Before you apply</li>
                <li>
                  <Link href="/programs/healthcare/who-can-apply">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="m5 12 5 5L20 7" />
                      </LineIcon>
                    </span>
                    Check your eligibility
                    <i>Guide</i>
                  </Link>
                </li>
                <li>
                  <Link href="/programs/healthcare/standards">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </LineIcon>
                    </span>
                    Read the twelve chapters
                    <i>Standards</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about the process</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQS.map((f, i) => (
              <details className="ax-faq-item" key={f.q} open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClusterNav
        current={SELF}
        cream
        eyebrow="Keep reading"
        heading="More on healthcare accreditation"
      />

      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Start the <em>clock.</em>
          </>
        }
        text="The sooner a dedicated advisor is assigned and the self-assessment tool is in your hands, the sooner your three to six month preparation phase begins."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to the healthcare team" }}
        related={hcRelated(SELF)}
      />
    </main>
  );
}
