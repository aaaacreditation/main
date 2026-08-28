import Link from "next/link";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";
import { pageMeta, breadcrumbSchema, faqSchema } from "../../../lib/seo";
import CombinedApplicationForm from "../_forms/CombinedApplicationForm";
import ApplyAside from "../_forms/ApplyAside";
import "../membership.css";

export const metadata = pageMeta({
  title: "Apply for AAA Membership",
  description:
    "Apply for American Accreditation Association membership online — individual ($350 / 2 years) or organizational ($500 / 1 year). Reviewed in two business days.",
  path: "/membership/apply",
});

const NEXT_STEPS = [
  {
    n: "01",
    title: "We confirm your membership type",
    text: "The AAA membership team reviews your application and confirms the track and fee that apply to you.",
  },
  {
    n: "02",
    title: "You settle the membership fee",
    text: "We send payment instructions for the method you selected — credit card or bank transfer. No payment is taken on this page.",
  },
  {
    n: "03",
    title: "Your membership is issued",
    text: "On approval you receive your validated membership certificate, your QR-coded email signature and your ADCP directory enrolment.",
  },
];

const FAQ = [
  {
    q: "Which membership should I choose?",
    a: "Individual membership ($350 for two years) is for professionals. Organizational membership ($500 for one year) is for institutions and extends the training and directory benefits to two members of staff.",
  },
  {
    q: "Is payment taken on this form?",
    a: "No. You choose a preferred payment method — credit card or bank transfer — and AAA sends the payment instructions once your application has been reviewed.",
  },
  {
    q: "Do I need to send supporting documents?",
    a: "Yes. Individual applicants send an updated CV; organizations send a copy of their legal status document. Email them to info@aaa-accreditation.org after you submit this form.",
  },
];

export default function Page() {
  return (
    <main className="axp memx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Membership", path: "/membership" },
            { name: "Membership Application", path: "/membership/apply" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="Membership application"
        badge="Apply for membership"
        title={
          <>
            Apply for <em>AAA membership.</em>
          </>
        }
        intro="Please use the following form to apply for AAA Accreditation Membership. Thank you for your interest in the American Accreditation Association — choose your membership type and tell us about yourself and your organization."
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Apply" }]}
        meta={[
          { k: "Individual", v: "$350 / 2 yrs" },
          { k: "Organizational", v: "$500 / 1 yr" },
          { k: "Response", v: "2 business days" },
        ]}
        actions={
          <>
            <Link href="#form" className="ax-btn ax-btn-gold">
              Go to the form <Icon name="arrow" size={16} />
            </Link>
            <Link href="/membership" className="ax-btn ax-btn-ghost">
              Compare the two memberships
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
                <h2>Membership application</h2>
                <p>
                  Fields marked with an asterisk are required. Your details are used only to
                  process your AAA membership application.
                </p>
              </div>
              <CombinedApplicationForm source="membership-application" />
            </div>

            <ApplyAside
              steps={NEXT_STEPS}
              documents={[
                "Individual applicants: an updated CV, a university degree and evidence of competency",
                "Organizations: a copy of the organization's legal status document",
                "Your organization's postal address and website",
              ]}
              links={[
                { href: "/membership/individual/apply", label: "Individual membership application" },
                { href: "/membership/organizational/apply", label: "Organizational membership application" },
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
        title={<>Not sure which membership <em>fits you?</em></>}
        text="Our membership team can walk you through both tracks, what each includes, and how organizational membership credits against future accreditation fees."
        primary={{ href: "/contact", label: "Contact Membership" }}
        secondary={{ href: "/membership", label: "Compare memberships" }}
        related={[
          { href: "/membership/individual", label: "Individual Membership" },
          { href: "/membership/organizational", label: "Organizational Membership" },
        ]}
      />
    </main>
  );
}
