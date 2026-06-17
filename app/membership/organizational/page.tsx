import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";
import PageHero from "../../_components/PageHero";

export const metadata: Metadata = {
  title: "Organizational Membership",
  description:
    "AAA Organizational Membership — a one-year membership ($500) for institutions, with membership fees deducted from accreditation fees if you apply within the first year.",
};

const WHO_CAN_JOIN = [
  "The first step in the journey to full AAA accreditation.",
  "Open to institutions that want to be associated with AAA without going through the full accreditation process.",
  "Appropriate for any entity with an interest in promoting quality and competence through accreditation.",
  "A visible way to showcase your commitment to maintaining high-quality standards.",
];

const BENEFITS = [
  {
    icon: "cert" as const,
    title: "Global Recognition",
    text: "Receive an official membership certificate from AAA, validated through our platform and linkable with a unique URL — and use the AAA Membership Logo on your website and promotional material.",
  },
  {
    icon: "book" as const,
    title: "Professional Training",
    text: "Two members of your institution are eligible to attend one free training course each year to enhance their expertise.",
  },
  {
    icon: "clipboard" as const,
    title: "Directory Enrolment",
    text: "Two members of your institution are listed in the prestigious American Directory for Competent Persons (ADCP).",
  },
  {
    icon: "mail" as const,
    title: "Professional Branding",
    text: "Receive a QR-coded membership email signature to showcase your affiliation.",
  },
  {
    icon: "chart" as const,
    title: "Educational Webinars",
    text: "Access free webinars on international standards development, quality management, internal audits, and assessment preparation in your area of interest.",
  },
  {
    icon: "doc" as const,
    title: "Content Contribution",
    text: "Publish two articles or papers annually on the AAA website, with backlinks to your website or professional account.",
  },
  {
    icon: "globe" as const,
    title: "Networking Opportunities",
    text: "Connect and collaborate with peers in the quality and accreditation community through networking initiatives.",
  },
  {
    icon: "scale" as const,
    title: "Committee Membership",
    text: "Gain eligibility to join AAA Technical Committees and actively engage in shaping your industry's standards.",
  },
];

const DETAILS = [
  {
    title: "Duration: 1 year",
    text: "Organizational membership runs for a one-year term.",
  },
  {
    title: "Cost: $500.00",
    text: "A single fee of $500.00 covers the one-year membership.",
  },
  {
    title: "Credit toward accreditation",
    text: "Membership fees are deducted from accreditation fees if your accreditation application is submitted within the first year of the membership duration.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="AAA Organizational Membership"
        title={<>Your first step to excellence and <em>global recognition.</em></>}
        intro="AAA membership can be the first step in the journey to full accreditation. It also benefits institutions that would like to be associated with AAA without going through the full accreditation process."
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Organizational" }]}
        meta={[
          { k: "Term", v: "1-year membership" },
          { k: "Fee", v: "$500" },
        ]}
      />

      <section className="mem-detail-section">
        <div className="container">
          <div className="mem-detail-grid">
            <article className="mem-detail-card reveal">
              <span className="eyebrow">Who can join</span>
              <h2>Open to any entity committed to quality and competence.</h2>
              <p>
                Organizational membership is appropriate for any entity that has an interest in
                promoting quality and competence through accreditation &mdash; whether as a step
                toward full accreditation or as a lasting association with AAA.
              </p>
            </article>

            <div className="mem-list-panel reveal">
              {WHO_CAN_JOIN.map((item) => (
                <div className="mem-list-row" key={item}>
                  <Icon name="check" size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mem-why">
        <div className="container">
          <div className="mem-why-layout">
            <div className="reveal">
              <span className="eyebrow">Member benefits</span>
              <h2>Why become a member of AAA Accreditation?</h2>
              <Link href="/contact" className="btn btn-primary">
                Apply now <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
            <div className="mem-benefit-grid">
              {BENEFITS.map((item, index) => (
                <article
                  className="mem-benefit-card reveal"
                  key={item.title}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="mem-benefit-icon">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mem-audience">
        <div className="container">
          <div className="mem-section-head reveal">
            <span className="eyebrow">Membership details</span>
            <h2>One-year membership, credited toward your accreditation.</h2>
            <p>
              Joining as a professional instead? See also{" "}
              <Link href="/membership/individual">Individual Membership</Link>.
            </p>
          </div>
          <div className="mem-step-grid">
            {DETAILS.map((item, index) => (
              <article
                className="mem-step-card reveal"
                key={item.title}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mem-detail-cta">
        <div className="container">
          <div className="mem-detail-cta-inner reveal">
            <div>
              <h2>Ready to apply for organizational membership?</h2>
              <p>
                Applications are submitted through a short membership form. Contact AAA to begin
                your organization&rsquo;s application and membership onboarding.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Apply now <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
