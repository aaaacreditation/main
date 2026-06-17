import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";
import PageHero from "../../_components/PageHero";

export const metadata: Metadata = {
  title: "Individual Membership",
  description:
    "AAA Individual Membership — a two-year membership ($350) offering global recognition, one free training course per year, ADCP directory enrolment, webinars, and AAA Technical Committee eligibility.",
};

const IDEAL_FOR = [
  "Enhance your professional credentials and credibility.",
  "Gain recognition as a leader in promoting excellence and competence in your field.",
  "Access cutting-edge resources that support career growth and development.",
  "Contribute to setting global quality and accreditation standards.",
];

const BENEFITS = [
  {
    icon: "cert" as const,
    title: "Global Recognition",
    text: "Receive an official membership certificate from AAA, validated through our platform and linkable to your professional profiles with a unique URL.",
  },
  {
    icon: "book" as const,
    title: "Professional Training",
    text: "Attend one free training course each year to enhance your expertise.",
  },
  {
    icon: "clipboard" as const,
    title: "Directory Enrolment",
    text: "Be listed in the prestigious American Directory for Competent Persons (ADCP).",
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
    text: "Publish two articles or papers annually on the AAA website, with backlinks to your personal website or professional account.",
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
    title: "Duration: 2 years",
    text: "Individual membership is valid for a two-year term.",
  },
  {
    title: "Cost: $350",
    text: "A single fee of $350 covers the full two-year membership.",
  },
  {
    title: "Eligibility requirements",
    text: "An updated CV, a university degree, and evidence of competency and qualifications in the relevant field.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="AAA Individual Membership"
        title={<>Unlock new horizons in your <em>professional journey.</em></>}
        intro="Membership with AAA isn’t just about accreditation — it’s about expanding your potential, connecting with a prestigious global network, and excelling in your professional endeavors."
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Individual" }]}
        meta={[
          { k: "Term", v: "2-year membership" },
          { k: "Fee", v: "$350" },
        ]}
      />

      <section className="mem-detail-section">
        <div className="container">
          <div className="mem-detail-grid">
            <article className="mem-detail-card reveal">
              <span className="eyebrow">Who it is for</span>
              <h2>Individual membership is ideal for anyone looking to grow.</h2>
              <p>
                Whether you are an industry expert, educator, or quality professional, becoming an
                individual member with AAA allows you to play an active role in promoting quality
                and global excellence.
              </p>
            </article>

            <div className="mem-list-panel reveal">
              {IDEAL_FOR.map((item) => (
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
            <h2>A two-year membership with clear eligibility requirements.</h2>
            <p>
              Representing an institution? See also{" "}
              <Link href="/membership/organizational">Organizational Membership</Link>.
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
              <h2>Ready to apply for individual membership?</h2>
              <p>
                Applications are submitted through a short membership form together with your
                updated CV, university degree, and evidence of competency. Contact AAA to begin
                your application.
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
