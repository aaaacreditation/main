import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";
import PageHero from "../../_components/PageHero";

export const metadata: Metadata = {
  title: "Organizational Membership",
  description:
    "AAA Organizational Membership — a one-year membership ($500) for institutions, with membership fees credited toward your accreditation fees when you apply within the first year.",
};

const WHO_CAN_JOIN = [
  "The first step in the journey to full AAA accreditation.",
  "Open to institutions that want to be associated with AAA without the full accreditation process.",
  "Appropriate for any entity with an interest in promoting quality and competence through accreditation.",
  "A visible way to showcase your commitment to maintaining high-quality standards.",
];

const BENEFITS = [
  {
    icon: "cert" as const,
    title: "Global Recognition",
    text: "Receive an official membership certificate from AAA, validated through our platform with a unique URL — and display the AAA Membership Logo on your website and promotional material.",
  },
  {
    icon: "book" as const,
    title: "Professional Training",
    text: "Two members of your institution are eligible to attend one free training course each year to sharpen their expertise.",
  },
  {
    icon: "clipboard" as const,
    title: "Directory Enrolment",
    text: "Two members of your institution are listed in the prestigious American Directory for Competent Persons (ADCP).",
  },
  {
    icon: "mail" as const,
    title: "Professional Branding",
    text: "Receive a QR-coded membership email signature so your team can showcase its affiliation.",
  },
  {
    icon: "chart" as const,
    title: "Educational Webinars",
    text: "Access free webinars on international standards development, quality management, internal audits, and assessment preparation in your area of interest.",
  },
  {
    icon: "doc" as const,
    title: "Content Contribution",
    text: "Publish two articles or papers annually on the AAA website, with backlinks to your institution's website or professional account.",
  },
  {
    icon: "globe" as const,
    title: "Networking Opportunities",
    text: "Connect and collaborate with peers in the quality and accreditation community through networking initiatives.",
  },
  {
    icon: "scale" as const,
    title: "Committee Membership",
    text: "Gain eligibility to join AAA Technical Committees and actively help shape your industry's standards.",
  },
];

const INCLUDED = [
  "Official membership certificate + AAA logo license",
  "Two staff: one free training course each year",
  "Two staff listed in the ADCP professional directory",
  "Eligibility for AAA Technical Committees",
];

const STEPS = [
  {
    k: "01",
    title: "Apply for membership",
    text: "Submit the short organizational membership form with your institution's details and primary contacts.",
  },
  {
    k: "02",
    title: "Get recognized",
    text: "Receive your official membership certificate and AAA logo license, and enrol two staff in the ADCP directory.",
  },
  {
    k: "03",
    title: "Credit toward accreditation",
    text: "Apply for full accreditation within your first year and your $500 fee is deducted from your accreditation fees.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="AAA Organizational Membership"
        title={<>Your first step to excellence and <em>global recognition.</em></>}
        intro="AAA membership can be the first step in the journey to full accreditation — and it also benefits institutions that want to be associated with AAA without going through the full accreditation process."
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Organizational" }]}
        meta={[
          { k: "Term", v: "1-year membership" },
          { k: "Fee", v: "$500" },
        ]}
      />

      {/* ---------- A. Who it's for + membership certificate ---------- */}
      <section className="omem-value">
        <div className="container">
          <div className="omem-value-grid">
            <div className="omem-value-copy reveal">
              <span className="eyebrow">Who it’s for</span>
              <h2>Open to any organization committed to quality.</h2>
              <p>
                Organizational membership suits any entity with an interest in promoting quality and
                competence through accreditation — whether as a first step toward full accreditation
                or as a lasting association with AAA.
              </p>
              <div className="omem-checklist">
                {WHO_CAN_JOIN.map((item) => (
                  <div className="omem-check" key={item}>
                    <span className="tick">
                      <Icon name="check" size={15} strokeWidth={2.4} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="omem-show">
              <figure className="omem-show-frame reveal">
                <Image
                  src="/member-org-sowmya.jpg"
                  alt="Dr. Sowmya NS, COO of Study Medic in India, sharing a five-star testimonial about her organization's association with the American Accreditation Association."
                  width={940}
                  height={788}
                  sizes="(max-width: 1080px) 480px, 42vw"
                  className="omem-show-img"
                />
              </figure>

              <span className="omem-float omem-float-a reveal">
                <Icon name="shield" size={16} /> Verified membership
              </span>
              <span className="omem-float omem-float-b reveal">
                <Icon name="globe" size={16} /> Globally recognized
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- B. Benefits ---------- */}
      <section className="omem-benefits">
        <div className="container">
          <div className="omem-head reveal">
            <div>
              <span className="eyebrow">Member benefits</span>
              <h2>Why become a member of AAA Accreditation?</h2>
            </div>
            <p>
              Eight ways AAA membership elevates your institution’s credibility, capability, and
              connections across the global quality and accreditation community.
            </p>
          </div>

          <div className="omem-benefit-grid">
            {BENEFITS.map((item, index) => (
              <article
                className="omem-benefit reveal"
                key={item.title}
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <div className="omem-benefit-ico">
                  <Icon name={item.icon} size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- C. Plan / pricing + accreditation credit ---------- */}
      <section className="omem-plan">
        <div className="container">
          <div className="omem-plan-card reveal">
            <div className="omem-plan-price">
              <span className="eyebrow">Organizational membership</span>
              <div className="omem-price">
                <span className="cur">$</span>500
                <span className="per">/ 1 year</span>
              </div>
              <p>
                A single fee of $500 covers a full one-year organizational membership for your
                institution — no recurring charges or hidden costs.
              </p>
              <ul className="omem-plan-list">
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

            <div className="omem-plan-detail">
              <h3>Membership that pays for itself.</h3>
              <div className="omem-credit">
                <span className="omem-credit-ico">
                  <Icon name="cert" size={20} />
                </span>
                <div>
                  <div className="omem-credit-flow">
                    <span className="a">$500 membership</span>
                    <Icon name="arrow" size={15} />
                    <span>Accreditation</span>
                  </div>
                  <p>
                    Your full $500 membership fee is deducted from your accreditation fees when you
                    submit an accreditation application within the first year of membership.
                  </p>
                </div>
              </div>
              <p className="omem-plan-note">
                Joining as a professional instead? See also{" "}
                <Link href="/membership/individual">Individual Membership</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- D. How to join ---------- */}
      <section className="omem-steps">
        <div className="container">
          <div className="omem-head reveal">
            <div>
              <span className="eyebrow">How to join</span>
              <h2>Becoming a member takes three steps.</h2>
            </div>
            <p>
              From application to recognition — and on to accreditation — the path to AAA
              organizational membership is straightforward and supported at every stage.
            </p>
          </div>

          <div className="omem-steps-grid">
            {STEPS.map((step, index) => (
              <article
                className="omem-step reveal"
                key={step.k}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="omem-step-num">{step.k}</span>
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
