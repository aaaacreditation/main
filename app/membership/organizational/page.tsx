import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Organizational Membership",
  description:
    "Organizational membership with AAA for institutions seeking recognition, resources, and preparation for accreditation.",
};

const BENEFITS = [
  "Enhance credibility and brand reputation.",
  "Showcase commitment to maintaining high-quality standards.",
  "Access exclusive resources and professional support.",
  "Prepare confidently for full accreditation in the future.",
];

const STEPS = [
  {
    title: "Align with AAA",
    text: "Establish a visible institutional connection to AAA and its global accreditation community.",
  },
  {
    title: "Build readiness",
    text: "Use membership resources and guidance to strengthen your systems before full accreditation.",
  },
  {
    title: "Expand visibility",
    text: "Position your organization as a proactive leader in the pursuit of excellence.",
  },
];

export default function Page() {
  return (
    <>
      <section className="mem-detail-hero organizational">
        <div className="container">
          <div className="mem-crumbs light">
            <Link href="/">Home</Link>
            <span />
            <Link href="/membership">Membership</Link>
            <span />
            <span>Organizational</span>
          </div>
          <div className="mem-detail-hero-content reveal">
            <span className="eyebrow">Organizational Membership</span>
            <h1>The first step for institutions preparing for deeper AAA alignment.</h1>
            <p>
              Organizational membership serves as the perfect entry point for institutions
              aspiring to be aligned with AAA without undergoing the full accreditation process.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Apply for Organizational Membership <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mem-detail-section">
        <div className="container">
          <div className="mem-detail-grid">
            <article className="mem-detail-card reveal">
              <span className="eyebrow">Institutional value</span>
              <h2>A practical membership path before full accreditation.</h2>
              <p>
                Organizational membership opens doors to networking opportunities and positions
                your organization as a proactive leader in the pursuit of excellence.
              </p>
            </article>

            <div className="mem-list-panel reveal">
              {BENEFITS.map((benefit) => (
                <div className="mem-list-row" key={benefit}>
                  <Icon name="check" size={16} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mem-audience">
        <div className="container">
          <div className="mem-section-head reveal">
            <span className="eyebrow">Membership journey</span>
            <h2>Move from alignment to readiness with a clear institutional pathway.</h2>
          </div>
          <div className="mem-step-grid">
            {STEPS.map((step, index) => (
              <article
                className="mem-step-card reveal"
                key={step.title}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mem-detail-cta">
        <div className="container">
          <div className="mem-detail-cta-inner reveal">
            <h2>Ready to become an organizational member?</h2>
            <p>
              Contact AAA to discuss your organization&rsquo;s goals and receive guided membership
              onboarding.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact membership <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
