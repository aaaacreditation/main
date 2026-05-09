import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Individual Membership",
  description:
    "Individual membership with AAA for quality professionals, educators, industry experts, and accreditation contributors.",
};

const BENEFITS = [
  "Support the advancement of quality and competence across industries.",
  "Gain recognition as a valued contributor to the accreditation ecosystem.",
  "Access exclusive learning resources and professional development programs.",
  "Join leadership opportunities that strengthen your professional credibility.",
];

const IDEAL_FOR = [
  "Industry experts and technical professionals",
  "Educators and training leaders",
  "Quality managers and compliance specialists",
  "Assessors and accreditation contributors",
];

export default function Page() {
  return (
    <>
      <section className="mem-detail-hero individual">
        <div className="container">
          <div className="mem-crumbs light">
            <Link href="/">Home</Link>
            <span />
            <Link href="/membership">Membership</Link>
            <span />
            <span>Individual</span>
          </div>
          <div className="mem-detail-hero-content reveal">
            <span className="eyebrow">Individual Membership</span>
            <h1>Advance your accreditation knowledge and professional standing.</h1>
            <p>
              Designed for professionals passionate about shaping accreditation standards,
              individual membership connects you with AAA resources, visibility, and a global
              quality-focused community.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Apply for Individual Membership <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mem-detail-section">
        <div className="container">
          <div className="mem-detail-grid">
            <article className="mem-detail-card reveal">
              <span className="eyebrow">What you gain</span>
              <h2>Become a recognized contributor to accreditation excellence.</h2>
              <p>
                Whether you are an industry expert, educator, or quality professional, becoming an
                individual member with AAA allows you to play an active role in promoting quality
                and global excellence.
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
            <span className="eyebrow">Designed for</span>
            <h2>Professionals who want to shape standards, not just follow them.</h2>
          </div>
          <div className="mem-audience-grid">
            {IDEAL_FOR.map((item, index) => (
              <article
                className="mem-audience-card reveal"
                key={item}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mem-detail-cta">
        <div className="container">
          <div className="mem-detail-cta-inner reveal">
            <h2>Ready to become an individual member?</h2>
            <p>
              Contact AAA to begin your membership application and learn how individual membership
              can support your professional development.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact us <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
