import Link from "next/link";
import Icon from "../../../_components/Icon";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import CTA from "../../../_components/CTA";
import { pageMeta, breadcrumbSchema, faqSchema } from "../../../../lib/seo";
import IndividualApplicationForm from "../../_forms/IndividualApplicationForm";
import ApplyAside from "../../_forms/ApplyAside";
import "../../membership.css";

export const metadata = pageMeta({
  title: "Recognized Competency Member Application",
  description:
    "Apply for AAA Individual Membership as a Recognized Competency Member. Submit your qualifications, training, certifications and experience for review.",
  path: "/membership/individual/recognized-competency",
});

const NEXT_STEPS = [
  {
    n: "01",
    title: "Competency review",
    text: "The AAA membership team reviews your education, training, certifications and experience against the individual membership criteria.",
  },
  {
    n: "02",
    title: "Fee and confirmation",
    text: "We confirm your membership category and send payment instructions for the $350 two-year individual membership.",
  },
  {
    n: "03",
    title: "Certificate and ADCP listing",
    text: "On approval you receive your validated membership certificate, a QR-coded email signature and your listing in the American Directory for Competent Persons.",
  },
];

const FAQ = [
  {
    q: "How does this differ from the standard individual membership application?",
    a: "AAA runs the Recognized Competency Member application as a separate route on its individual membership track. The information requested is the same as the standard individual membership application — your professional background, education, training, certifications and experience — and it is recorded against the Recognized Competency Member category.",
  },
  {
    q: "What documents do I need to send?",
    a: "An updated CV, a university degree, and evidence of competency and qualifications in the relevant field. Email your CV in PDF or JPEG format to info@aaa-accreditation.org after you submit this form, or paste a link to it in the form.",
  },
  {
    q: "How much is individual membership and how long does it run?",
    a: "Individual membership costs $350 and runs for two years.",
  },
];

export default function Page() {
  return (
    <main className="axp memx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Membership", path: "/membership" },
            { name: "Individual Membership", path: "/membership/individual" },
            {
              name: "Recognized Competency Member",
              path: "/membership/individual/recognized-competency",
            },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="Recognized Competency Member"
        badge="Recognized Competency Member"
        title={
          <>
            Apply as a <em>Recognized Competency Member.</em>
          </>
        }
        intro="Please use the following form to apply for AAA Accreditation Membership. Thank you for your interest in the American Accreditation Association — this is the individual membership route for applicants applying under the Recognized Competency Member category."
        crumbs={[
          { href: "/membership", label: "Membership" },
          { href: "/membership/individual", label: "Individual" },
          { label: "Recognized Competency" },
        ]}
        meta={[
          { k: "Term", v: "2 years" },
          { k: "Fee", v: "$350" },
          { k: "Response", v: "2 business days" },
        ]}
        actions={
          <>
            <Link href="#form" className="ax-btn ax-btn-gold">
              Go to the form <Icon name="arrow" size={16} />
            </Link>
            <Link href="/membership/individual/apply" className="ax-btn ax-btn-ghost">
              Standard individual application
            </Link>
          </>
        }
      />

      <section className="ax-section" id="form">
        <div className="container">
          <div className="memx-apply">
            <div className="memx-form-card reveal">
              <div className="ax-head" style={{ marginBottom: 22 }}>
                <span className="eyebrow">Fill a form to apply</span>
                <h2>Recognized Competency Member application</h2>
                <p>
                  Fields marked with an asterisk are required. Your details are used only to
                  process your AAA membership application.
                </p>
              </div>
              <div className="ax-note gold" style={{ marginBottom: 26 }}>
                <div>
                  <strong>Applying under the standard route instead?</strong>
                  This form records your application under the Recognized Competency Member
                  category. For standard individual membership, use the{" "}
                  <Link href="/membership/individual/apply" className="ax-link">
                    individual membership application
                  </Link>
                  .
                </div>
              </div>
              <IndividualApplicationForm
                source="membership-individual-rcm"
                track="Individual Membership — Recognized Competency Member"
              />
            </div>

            <ApplyAside
              steps={NEXT_STEPS}
              documents={[
                "An updated CV (PDF or JPEG)",
                "A university degree",
                "Evidence of competency and qualifications in the relevant field",
              ]}
              links={[
                { href: "/membership/individual", label: "Individual membership benefits" },
                { href: "/membership/individual/apply", label: "Standard individual application" },
                { href: "/membership", label: "Membership overview" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Before you submit</span>
            <h2>Questions applicants ask</h2>
          </div>
          <div className="ax-faq-list single">
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
        </div>
      </section>

      <CTA
        eyebrow="Need a hand?"
        title={<>Not sure which route <em>applies to you?</em></>}
        text="Our membership team can confirm which individual membership category fits your qualifications and experience before you apply."
        primary={{ href: "/contact", label: "Contact Membership" }}
        secondary={{ href: "/membership/individual", label: "Individual Membership" }}
        related={[
          { href: "/membership", label: "Membership overview" },
          { href: "/membership/individual/apply", label: "Individual application" },
        ]}
      />
    </main>
  );
}
