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
  title: "Individual Membership Application",
  description:
    "Apply for AAA Individual Membership — $350 for two years. Submit your qualifications, training and experience for review by the AAA membership team.",
  path: "/membership/individual/apply",
});

const NEXT_STEPS = [
  {
    n: "01",
    title: "Competency review",
    text: "The AAA membership team reviews your qualifications, training and experience against the individual membership criteria.",
  },
  {
    n: "02",
    title: "Fee and confirmation",
    text: "We confirm your membership and send payment instructions for the $350 two-year individual membership.",
  },
  {
    n: "03",
    title: "Certificate and ADCP listing",
    text: "On approval you receive your validated membership certificate, a QR-coded email signature and your listing in the American Directory for Competent Persons.",
  },
];

const FAQ = [
  {
    q: "What documents do I need to send?",
    a: "An updated CV, a university degree, and evidence of competency and qualifications in the relevant field. Email your CV in PDF or JPEG format to info@aaa-accreditation.org after you submit this form, or paste a link to it in the form.",
  },
  {
    q: "How much is individual membership and how long does it run?",
    a: "Individual membership costs $350 and runs for two years.",
  },
  {
    q: "Should I use this form or the Recognized Competency Member form?",
    a: "Use this form for standard individual membership. If you are applying as a Recognized Competency Member, use the dedicated Recognized Competency Member application — it asks for the same information but records the category you are applying under.",
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
            { name: "Application", path: "/membership/individual/apply" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="Individual application"
        badge="Apply for individual membership"
        title={
          <>
            Apply for <em>individual membership.</em>
          </>
        }
        intro="Please use the following form to apply for AAA Accreditation Membership. Thank you for your interest in the American Accreditation Association — tell us about your professional background, qualifications and experience."
        crumbs={[
          { href: "/membership", label: "Membership" },
          { href: "/membership/individual", label: "Individual" },
          { label: "Apply" },
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
            <Link href="/membership/individual" className="ax-btn ax-btn-ghost">
              Review the benefits
            </Link>
          </>
        }
      />

      <section className="ax-section" id="form">
        <div className="container">
          <div className="memx-apply">
            <div className="memx-form-card reveal">
              <div className="ax-head" style={{ marginBottom: 28 }}>
                <span className="eyebrow">Fill a form to apply</span>
                <h2>Individual membership application</h2>
                <p>
                  Fields marked with an asterisk are required. Your details are used only to
                  process your AAA membership application.
                </p>
              </div>
              <IndividualApplicationForm
                source="membership-individual-application"
                track="Individual Membership"
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
                {
                  href: "/membership/individual/recognized-competency",
                  label: "Recognized Competency Member application",
                },
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
        title={<>Questions about <em>individual membership?</em></>}
        text="Our membership team can confirm whether your qualifications and experience meet the individual membership criteria before you apply."
        primary={{ href: "/contact", label: "Contact Membership" }}
        secondary={{ href: "/membership/individual", label: "Individual Membership" }}
        related={[
          { href: "/membership", label: "Membership overview" },
          { href: "/membership/organizational/apply", label: "Organizational application" },
        ]}
      />
    </main>
  );
}
