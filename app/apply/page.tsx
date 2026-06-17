import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Apply for Accreditation",
  description:
    "How to apply for AAA accreditation: application, document review, on-site assessment, and decision — with application forms for labs, certification bodies, inspection bodies, PT providers, and training providers.",
};

const STAGES: { cap: string; title: string; items: string[] }[] = [
  {
    cap: "Stage 01",
    title: "Application",
    items: [
      "You send the accreditation application form to AAA",
      "You pay the application fees",
      "AAA issues a letter confirming your accreditation is in process",
    ],
  },
  {
    cap: "Stage 02",
    title: "Document Review",
    items: [
      "AAA reviews your application and the related documents",
      "AAA sends you a Document Review Compliance Report",
      "You revise your documents according to the review results (if needed)",
    ],
  },
  {
    cap: "Stage 03",
    title: "Assessment",
    items: [
      "AAA defines the assessment dates and assessment team",
      "AAA conducts the on-site assessment visit",
      "AAA sends an assessment report with a recommendation for accreditation",
      "You implement corrective actions (if needed)",
      "The accreditation committee reviews the file for decision",
    ],
  },
  {
    cap: "Stage 04",
    title: "Decision",
    items: [
      "The accreditation decision is taken",
      "AAA issues an accreditation certificate valid for 2 years",
      "Your organization is registered in the American Directory of Competent Personnel (ADCP)",
    ],
  },
];

const FORMS = [
  {
    ttl: "Application form for training providers",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-training-providers.doc",
  },
  {
    ttl: "Application form for accreditation of testing / calibration labs",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-testing-cal-labs.doc",
  },
  {
    ttl: "Application form for accreditation of medical labs",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-for-accreditation-of-medical-labs.doc",
  },
  {
    ttl: "Application form for accreditation of personnel certification bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-personnel-certfication.doc",
  },
  {
    ttl: "Application form for accreditation of system / product certification bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc",
  },
  {
    ttl: "Application form for accreditation of inspection bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-Inspection-Bodies.doc",
  },
  {
    ttl: "Application form for accreditation of PT providers",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-PT-providers.doc",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title={<>Apply for <em>accreditation.</em></>}
        intro="Although there may be certain differences from one application request to the other, the general process remains the same for all candidate bodies. Discover the key steps of the accreditation process."
        crumbs={[{ label: "Apply" }]}
        meta={[
          { k: "Process stages", v: "4" },
          { k: "Certificate validity", v: "2 years" },
        ]}
      />

      <section className="hc-process">
        <div className="container">
          <div className="hc-process-head reveal">
            <div>
              <span className="eyebrow">Accreditation process</span>
              <h2 className="section-heading">What are the steps to get accreditation?</h2>
            </div>
            <span className="meta">International Accreditation &hellip; Accepted Globally</span>
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
              <h4>Send the accreditation application form to AAA</h4>
              <p>Download the application form for your program below to get accreditation.</p>
            </div>
            <Link href="#forms" className="btn btn-primary">
              Application forms <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="block" id="forms">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Application forms</span>
              <h2>Application forms for accreditation.</h2>
            </div>
            <p className="lede-side">
              Choose the form that matches your accreditation program, complete it, and send it to
              AAA with your application.
            </p>
          </div>
          <ul className="doc-list">
            {FORMS.map((f) => (
              <li key={f.ttl} className="reveal">
                <span className="ico"><Icon name="doc" size={18} /></span>
                <div>
                  <div className="ttl">{f.ttl}</div>
                  <div className="meta">DOC · Application form</div>
                </div>
                <a href={f.href} className="dl">
                  Download <Icon name="download" size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="grid">
            <div className="reveal">
              <div className="label">How to submit</div>
              <p style={{ marginTop: 24 }}>
                Send the accreditation application form to AAA to get accreditation. Once your
                application and fees are received, AAA issues a letter confirming that your
                accreditation is in process.
              </p>
              <ul className="bullets">
                <li>Download the application form for your program</li>
                <li>Complete it and submit it with your related documents</li>
                <li>Pay the application fees to begin the document review</li>
              </ul>
            </div>
            <div className="reveal">
              <h2>Start your application</h2>
              <form className="form-grid" action="#" method="post">
                <div className="form-row"><label>Legal entity name</label><input name="org" required /></div>
                <div className="form-row"><label>Country of registration</label><input name="country" required /></div>
                <div className="form-row"><label>Authorized representative</label><input name="rep" required /></div>
                <div className="form-row"><label>Email</label><input name="email" type="email" required /></div>
                <div className="form-row full">
                  <label>Program applied for</label>
                  <select name="program" defaultValue="">
                    <option value="" disabled>Select a program…</option>
                    <option>Healthcare Accreditation</option>
                    <option>Medical Laboratories (ISO 15189)</option>
                    <option>Testing & Calibration (ISO/IEC 17025)</option>
                    <option>Inspection Bodies (ISO/IEC 17020)</option>
                    <option>System Certification (ISO/IEC 17021-1)</option>
                    <option>Product Certification (ISO/IEC 17065)</option>
                    <option>Personnel Certification (ISO/IEC 17024)</option>
                    <option>Proficiency Testing (ISO/IEC 17043)</option>
                    <option>Training Providers (ASTM E-2659)</option>
                  </select>
                </div>
                <div className="form-row full"><label>Scope statement</label><textarea name="scope" required /></div>
                <div className="form-actions full">
                  <button type="submit" className="btn btn-primary">
                    Submit application <Icon name="arrow" size={14} className="arrow" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
