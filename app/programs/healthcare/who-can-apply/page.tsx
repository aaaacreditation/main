import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta } from "../../../../lib/seo";
import { ArrowIcon, ClusterNav, HC_CONSULT, HC_EMAIL, LineIcon, hcRelated } from "../cluster";
import "../hc.css";

const SELF = "/programs/healthcare/who-can-apply";

export const metadata = pageMeta({
  title: "Who Can Be Accredited? Eligible Healthcare Facilities",
  description:
    "Hospitals, primary care and specialty clinics, dental organizations, diagnostic and rehabilitation centers, pharmacies and medical travel agencies can apply.",
  path: SELF,
  keywords: [
    "who can be accredited",
    "healthcare accreditation eligibility",
    "clinic accreditation",
    "dental accreditation",
  ],
});

/* Facility types, verbatim in substance from the client's live
   "Who can be accredited?" page. */
const FACILITIES: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Hospitals",
    text: "Including day-care surgery centers.",
    icon: (
      <>
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M12 10v5M9.5 12.5h5" />
      </>
    ),
  },
  {
    title: "Primary care clinics",
    text: "Clinics that primarily provide general healthcare services.",
    icon: (
      <>
        <path d="M4 21V9l8-6 8 6v12" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    title: "Specialty clinics",
    text: "Ranging from specialty practices with minor operating-room setups, including ENT and dermatology clinics.",
    icon: (
      <>
        <path d="M8 3v4a4 4 0 0 0 8 0V3" />
        <path d="M12 11v4a5 5 0 0 0 10 0v-2" />
        <circle cx="22" cy="11" r="2" />
      </>
    ),
  },
  {
    title: "Dental organizations",
    text: "Ranging from single-chair dental offices to multi-unit dental clinics and hospitals.",
    icon: (
      <>
        <path d="M12 5.5C10.5 4 8.5 3 7 3.5 4.8 4.2 4 6.6 4.6 9.4c.5 2.4.6 4 .9 6.4.2 1.9.6 3.7 1.7 3.7 1.3 0 1.5-2.2 1.9-4.2.3-1.4.7-2.6 1.9-2.6s1.6 1.2 1.9 2.6c.4 2 .6 4.2 1.9 4.2 1.1 0 1.5-1.8 1.7-3.7.3-2.4.4-4 .9-6.4C18 6.6 17.2 4.2 15 3.5c-1.5-.5-3.5.5-3 2z" />
      </>
    ),
  },
  {
    title: "Diagnostic centers",
    text: "Including X-ray centers, MRI centers, clinical analysis and other imaging facilities.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
      </>
    ),
  },
  {
    title: "Rehabilitation centers",
    text: "Such as physiotherapy and occupational therapy clinics.",
    icon: (
      <>
        <circle cx="12" cy="4" r="2" />
        <path d="M12 6v6M8 9h8M9 21l3-9 3 9" />
      </>
    ),
  },
  {
    title: "Alternative medicine units",
    text: "Including Ayurveda and Unani medical centers.",
    icon: (
      <>
        <path d="M20 4c-8 0-14 4-14 12a6 6 0 0 0 6 6c8 0 8-10 8-18z" />
        <path d="M4 20c4-4 7-7 12-10" />
      </>
    ),
  },
  {
    title: "Community pharmacies",
    text: "Pharmacy services provided in community settings.",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 11v6M9 14h6" />
      </>
    ),
  },
  {
    title: "Medical travel agencies",
    text: "Organizations facilitating travel for medical care.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
      </>
    ),
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does our facility have to be a hospital?",
    a: "No. AAA accredits a wide range of healthcare providers beyond hospitals — including polyclinics, dental services, ambulatory services, radiology centers, physiotherapy centers, laboratory services, fertility clinics, eye care services and pharmacies.",
  },
  {
    q: "We are a single-chair dental office. Are we eligible?",
    a: "Yes. Dental organizations are eligible across the whole range, from single-chair dental offices to multi-unit dental clinics and dental hospitals.",
  },
  {
    q: "Can a day-care surgery center apply?",
    a: "Yes. Day-care surgery centers are covered under hospitals.",
  },
  {
    q: "Our facility is not on the list. What should we do?",
    a: "Contact the healthcare accreditation department at healthcare@aaa-accreditation.org or book a free consultation. AAA also runs separate programmes for medical laboratories (ISO 15189) and other conformity assessment bodies, so there may be a better-suited route.",
  },
];

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
            { name: "Who Can Be Accredited?", path: SELF },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        image="/sectors/healthcare.jpg"
        eyebrow="Who Can Be Accredited?"
        badge="Eligibility · Healthcare facilities"
        title={
          <>
            Nine kinds of facility. One <em>standard of care.</em>
          </>
        }
        intro="AAA healthcare accreditation is not limited to hospitals. From single-chair dental offices to multi-unit hospitals, these are the healthcare facilities eligible to apply for accreditation against the AAA Accreditation Standards for Healthcare Facilities."
        crumbs={[
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "Who Can Be Accredited?" },
        ]}
        caption={{
          kicker: "Diagnostic services",
          title: "Laboratories, imaging and clinical analysis included",
          chip: "Eligible",
        }}
        meta={[
          { k: "Eligible facility types", v: "9" },
          { k: "Standards chapters", v: "12" },
          { k: "Accreditation validity", v: "3 years" },
        ]}
      />

      {/* The list */}
      <section className="ax-section" id="facilities">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Eligible facilities</span>
            <h2>Healthcare facilities that can apply for accreditation</h2>
            <p>
              If your organization delivers care to patients, there is very likely a route for you.
              These are the facility types AAA accredits under the healthcare programme.
            </p>
          </div>

          <div className="ax-grid three">
            {FACILITIES.map((f, i) => (
              <article className="ax-card reveal" key={f.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon>{f.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Broad spectrum band */}
      <section className="ax-section navy" id="spectrum">
        <div className="container">
          <div className="ax-split even">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Broad accreditation spectrum</span>
                <h2>Well beyond the hospital ward</h2>
                <p>
                  We provide accreditation for a wide range of healthcare providers — not only
                  hospitals. If you deliver care, diagnose, dispense or rehabilitate, there is a
                  place for you in the programme.
                </p>
              </div>
              <ul className="ax-checks">
                <li>Polyclinics and ambulatory services</li>
                <li>Dental services and radiology centers</li>
                <li>Physiotherapy centers and laboratory services</li>
                <li>Fertility clinics, eye care services and pharmacies</li>
              </ul>
            </div>

            <div className="reveal">
              <div className="ax-grid two tight">
                <div className="ax-tile">
                  <b>Single site</b>
                  <span>A single-chair dental office or one primary care clinic.</span>
                </div>
                <div className="ax-tile">
                  <b>Multi-unit</b>
                  <span>Multi-unit dental clinics, polyclinic groups and hospitals.</span>
                </div>
                <div className="ax-tile">
                  <b>Diagnostic</b>
                  <span>X-ray, MRI, clinical analysis and other imaging facilities.</span>
                </div>
                <div className="ax-tile">
                  <b>Adjacent services</b>
                  <span>Community pharmacies and medical travel agencies.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not sure */}
      <section className="ax-section" id="not-sure">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Not sure where you fit?</span>
            <h2>Ask before you assume you are out of scope</h2>
            <p>
              Some organizations are better served by a different AAA programme — medical
              laboratories, for example, are accredited to ISO 15189. A short conversation will point
              you at the right one.
            </p>
          </div>
          <div className="ax-actions center">
            <a href={HC_CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-blue">
              Book a Free Consultation <ArrowIcon />
            </a>
            <Link href="/programs/iso-15189" className="ax-btn ax-btn-ghost-navy">
              Medical Laboratories (ISO 15189)
            </Link>
          </div>
          <div className="ax-note gold" style={{ maxWidth: 720, margin: "30px auto 0" }}>
            <div>
              <strong>Talk to the healthcare accreditation department</strong>
              Email{" "}
              <a className="ax-link" href={`mailto:${HC_EMAIL}`}>
                {HC_EMAIL}
              </a>{" "}
              with a short description of your facility and services, and an advisor will confirm your
              eligibility and the applicable chapters of the standards.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about eligibility</h2>
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
            Eligible? Then <em>start.</em>
          </>
        }
        text="Tell us about your facility and a dedicated advisor will confirm the applicable chapters of the standards and set out a realistic route to accreditation."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to the healthcare team" }}
        related={hcRelated(SELF)}
      />
    </main>
  );
}
