import Link from "next/link";
import Icon from "../../../_components/Icon";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import CTA from "../../../_components/CTA";
import { pageMeta, breadcrumbSchema, faqSchema } from "../../../../lib/seo";
import OrganizationalApplicationForm from "../../_forms/OrganizationalApplicationForm";
import ApplyAside from "../../_forms/ApplyAside";
import "../../membership.css";

export const metadata = pageMeta({
  title: "Organizational Membership Application",
  description:
    "Apply for AAA Organizational Membership — $500 for one year, credited against accreditation fees when you apply within the first year of membership.",
  path: "/membership/organizational/apply",
});

const NEXT_STEPS = [
  {
    n: "01",
    title: "Institution review",
    text: "The AAA membership team reviews your institution's profile, legal status and authorized representative against the membership criteria.",
  },
  {
    n: "02",
    title: "Fee and confirmation",
    text: "We confirm your membership and send payment instructions for the $500 one-year organizational membership.",
  },
  {
    n: "03",
    title: "Certificate, logo and ADCP",
    text: "On approval you receive your validated certificate, the AAA Membership Logo licence and ADCP enrolment for two members of staff.",
  },
];

const FAQ = [
  {
    q: "What documents does my organization need to send?",
    a: "A copy of the organization's legal status document in PDF or JPEG format. Email it to info@aaa-accreditation.org after you submit this form, or paste a link to it in the form.",
  },
  {
    q: "Who signs the declaration?",
    a: "The declaration is made by the principal of the institution. The authorized representative named in the form is the person AAA will contact about the application.",
  },
  {
    q: "Is the membership fee credited against accreditation?",
    a: "Yes. Membership fees are deducted from accreditation fees if an accreditation application is submitted within the first year of the membership duration.",
  },
];

export default function Page() {
  return (
    <main className="axp memx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Membership", path: "/membership" },
            { name: "Organizational Membership", path: "/membership/organizational" },
            { name: "Application", path: "/membership/organizational/apply" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="Organizational application"
        badge="Apply for organizational membership"
        title={
          <>
            Apply for <em>organizational membership.</em>
          </>
        }
        intro="Please use the following form to apply for AAA Accreditation Membership. Thank you for your interest in the American Accreditation Association — tell us about your institution and name the representative authorized to act on its behalf."
        crumbs={[
          { href: "/membership", label: "Membership" },
          { href: "/membership/organizational", label: "Organizational" },
          { label: "Apply" },
        ]}
        meta={[
          { k: "Term", v: "1 year" },
          { k: "Fee", v: "$500" },
          { k: "Response", v: "2 business days" },
        ]}
        actions={
          <>
            <Link href="#form" className="ax-btn ax-btn-gold">
              Go to the form <Icon name="arrow" size={16} />
            </Link>
            <Link href="/membership/organizational" className="ax-btn ax-btn-ghost">
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
                <h2>Organizational membership application</h2>
                <p>
                  Fields marked with an asterisk are required. Your details are used only to
                  process your AAA membership application.
                </p>
              </div>
              <OrganizationalApplicationForm source="membership-organizational-application" />
            </div>

            <ApplyAside
              steps={NEXT_STEPS}
              documents={[
                "A copy of the organization's legal status document (PDF or JPEG)",
                "Legal status, date of establishment and total staff count",
                "Head office address and any other operating locations",
                "An authorized representative with their qualifications and contact details",
              ]}
              links={[
                { href: "/membership/organizational", label: "Organizational membership benefits" },
                { href: "/membership/individual/apply", label: "Individual membership application" },
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
        title={<>Planning to go on to <em>full accreditation?</em></>}
        text="Membership fees are deducted from accreditation fees when an accreditation application is submitted within the first year of membership. Our team can scope your accreditation route alongside your membership."
        primary={{ href: "/contact", label: "Contact Membership" }}
        secondary={{ href: "/quote", label: "Request a Quote" }}
        related={[
          { href: "/membership", label: "Membership overview" },
          { href: "/membership/organizational", label: "Organizational Membership" },
          { href: "/membership/individual/apply", label: "Individual application" },
        ]}
      />
    </main>
  );
}
