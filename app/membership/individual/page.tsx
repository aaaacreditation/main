import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

const INCLUDED = [
  "One free training course every year",
  "Listing in the ADCP professional directory",
  "Eligibility for AAA Technical Committees",
];

const REQUIREMENTS = [
  "An updated professional CV",
  "A recognized university degree",
  "Evidence of competency in your field",
];

const STEPS = [
  {
    k: "01",
    title: "Prepare your documents",
    text: "Gather your updated CV, university degree, and evidence of competency and qualifications in your field.",
  },
  {
    k: "02",
    title: "Submit the membership form",
    text: "Complete the short individual membership form and attach your supporting documents for review.",
  },
  {
    k: "03",
    title: "Get verified & listed",
    text: "On approval, receive your official certificate and join the American Directory for Competent Persons.",
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

      {/* ---------- Value proposition + membership credential ---------- */}
      <section className="imem-value">
        <div className="container">
          <div className="imem-value-grid">
            <div className="imem-value-copy reveal">
              <span className="eyebrow">Who it’s for</span>
              <h2>Built for professionals who set the standard.</h2>
              <p>
                Whether you are an industry expert, educator, or quality professional, becoming an
                individual member with AAA allows you to play an active role in promoting quality
                and global excellence.
              </p>
              <div className="imem-checklist">
                {IDEAL_FOR.map((item) => (
                  <div className="imem-check" key={item}>
                    <span className="tick">
                      <Icon name="check" size={15} strokeWidth={2.4} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="imem-show">
              <figure className="imem-show-frame reveal">
                <Image
                  src="/member-approved-nigar.jpg"
                  alt="Nigar Aslanova, Senior State Specialist in Azerbaijan, holding her American Accreditation Association certificate as a five-star approved AAA member."
                  width={940}
                  height={788}
                  sizes="(max-width: 1080px) 480px, 42vw"
                  className="imem-show-img"
                />
              </figure>

              <span className="imem-float imem-float-a reveal">
                <Icon name="shield" size={16} /> Approved by AAA
              </span>
              <span className="imem-float imem-float-b reveal">
                <Icon name="globe" size={16} /> Globally recognized
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className="imem-benefits">
        <div className="container">
          <div className="imem-head reveal">
            <div>
              <span className="eyebrow">Member benefits</span>
              <h2>Everything your membership includes.</h2>
            </div>
            <p>
              Eight ways AAA membership advances your expertise, credibility, and connections
              across the global quality and accreditation community.
            </p>
          </div>

          <div className="imem-benefit-grid">
            {BENEFITS.map((item, index) => (
              <article
                className="imem-benefit reveal"
                key={item.title}
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <div className="imem-benefit-ico">
                  <Icon name={item.icon} size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Plan / pricing ---------- */}
      <section className="imem-plan">
        <div className="container">
          <div className="imem-plan-card reveal">
            <div className="imem-plan-price">
              <span className="eyebrow">Membership</span>
              <div className="imem-price">
                <span className="cur">$</span>350
                <span className="per">/ 2 years</span>
              </div>
              <p>
                A single fee of $350 covers your full two-year individual membership — no recurring
                charges or hidden costs.
              </p>
              <ul className="imem-plan-list">
                {INCLUDED.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} strokeWidth={2.4} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-gold">
                Apply now <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>

            <div className="imem-plan-detail">
              <h3>What you’ll need to apply</h3>
              <ul className="imem-req">
                {REQUIREMENTS.map((item) => (
                  <li key={item}>
                    <span className="tick">
                      <Icon name="check" size={14} strokeWidth={2.4} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="imem-plan-note">
                Representing an institution? Explore{" "}
                <Link href="/membership/organizational">Organizational Membership</Link> for
                team-wide recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How to join ---------- */}
      <section className="imem-steps">
        <div className="container">
          <div className="imem-head reveal">
            <div>
              <span className="eyebrow">How to join</span>
              <h2>Becoming a member takes three steps.</h2>
            </div>
            <p>
              From application to recognition, the path to AAA individual membership is
              straightforward and supported at every stage.
            </p>
          </div>

          <div className="imem-steps-grid">
            {STEPS.map((step, index) => (
              <article
                className="imem-step reveal"
                key={step.k}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="imem-step-num">{step.k}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
