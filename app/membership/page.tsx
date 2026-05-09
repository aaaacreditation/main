import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the American Accreditation Association membership community through individual or organizational membership.",
};

const MEMBERSHIP_TYPES = [
  {
    title: "Individual Membership",
    label: "For professionals",
    href: "/membership/individual",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=82",
    desc: "Designed for professionals passionate about shaping accreditation standards and advancing quality across industries.",
    bullets: [
      "Support the advancement of quality and competence across industries.",
      "Gain recognition as a valued contributor to the accreditation ecosystem.",
      "Access learning resources, leadership opportunities, and professional development programs.",
    ],
  },
  {
    title: "Organizational Membership",
    label: "For institutions",
    href: "/membership/organizational",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=82",
    desc: "A strategic entry point for institutions that want to align with AAA before pursuing full accreditation.",
    bullets: [
      "Enhance credibility and brand reputation.",
      "Showcase commitment to high-quality standards.",
      "Access resources and professional support for future accreditation.",
    ],
  },
];

const WHY_JOIN = [
  {
    icon: "book" as const,
    title: "Exclusive resources",
    text: "Tailored guidance for personal and organizational development across accreditation, quality, and competence.",
  },
  {
    icon: "globe" as const,
    title: "Global network",
    text: "Connect with like-minded professionals and institutions working toward international standards of excellence.",
  },
  {
    icon: "chart" as const,
    title: "Career-building visibility",
    text: "Build credibility through leadership opportunities, professional development, and association with AAA.",
  },
];

export default function Page() {
  return (
    <>
      <section className="mem-hero">
        <div className="mem-hero-media" />
        <div className="container">
          <div className="mem-crumbs">
            <Link href="/">Home</Link>
            <span />
            <span>Membership</span>
          </div>
          <div className="mem-hero-grid">
            <div className="reveal">
              <span className="eyebrow">Membership</span>
              <h1>Join a global community advancing accreditation excellence.</h1>
            </div>
            <div className="mem-hero-panel reveal">
              <p>
                The American Accreditation Association (AAA) invites both organizations and
                individuals to become part of a prestigious global community dedicated to advancing
                accreditation standards and fostering professional development.
              </p>
              <div className="mem-hero-actions">
                <Link href="/membership/individual" className="btn btn-primary">
                  Individual Membership <Icon name="arrow" size={14} className="arrow" />
                </Link>
                <Link href="/membership/organizational" className="btn btn-ghost">
                  Organizational Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mem-overview">
        <div className="container">
          <div className="mem-section-head reveal">
            <span className="eyebrow">Membership pathways</span>
            <h2>Choose the membership route that matches your role.</h2>
            <p>
              Whether you are building professional standing or preparing an institution for a
              stronger accreditation journey, AAA membership gives you a visible connection to a
              standards-focused international community.
            </p>
          </div>

          <div className="mem-type-grid">
            {MEMBERSHIP_TYPES.map((type, index) => (
              <article
                className="mem-type-card reveal"
                key={type.title}
                style={{
                  transitionDelay: `${index * 90}ms`,
                  backgroundImage: `linear-gradient(90deg, rgba(2,73,133,.92), rgba(2,73,133,.62)), url(${type.image})`,
                }}
              >
                <span>{type.label}</span>
                <h3>{type.title}</h3>
                <p>{type.desc}</p>
                <ul>
                  {type.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Icon name="check" size={15} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link href={type.href} className="mem-card-link">
                  Learn more <Icon name="arrowUpRight" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mem-content-band">
        <div className="container">
          <div className="mem-copy-grid">
            <article className="mem-copy-block reveal">
              <h2>Organizational Membership</h2>
              <p>
                Organizational membership serves as the perfect entry point for institutions
                aspiring to be aligned with AAA without undergoing the full accreditation process.
                It is ideal for organizations seeking to:
              </p>
              <ul>
                <li>Enhance their credibility and brand reputation.</li>
                <li>Showcase their commitment to maintaining high-quality standards.</li>
                <li>
                  Access exclusive resources and professional support to prepare for full
                  accreditation in the future.
                </li>
              </ul>
              <p>
                This membership opens doors to networking opportunities and positions your
                organization as a proactive leader in the pursuit of excellence.
              </p>
            </article>

            <article className="mem-copy-block reveal">
              <h2>Individual Membership</h2>
              <p>
                Designed for professionals passionate about shaping accreditation standards,
                individual membership is ideal for those who wish to:
              </p>
              <ul>
                <li>Support the advancement of quality and competence across industries.</li>
                <li>
                  Gain recognition as a valued contributor to the accreditation ecosystem.
                </li>
                <li>
                  Access exclusive learning resources, leadership opportunities, and professional
                  development programs.
                </li>
              </ul>
              <p>
                Whether you are an industry expert, educator, or quality professional, becoming an
                individual member with AAA allows you to play an active role in promoting quality
                and global excellence.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mem-why">
        <div className="container">
          <div className="mem-why-layout">
            <div className="reveal">
              <span className="eyebrow">Why join AAA?</span>
              <h2>More than a designation. A commitment to excellence, growth, and global impact.</h2>
              <Link href="/contact" className="btn btn-primary">
                Take the first step <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
            <div className="mem-benefit-grid">
              {WHY_JOIN.map((item, index) => (
                <article
                  className="mem-benefit-card reveal"
                  key={item.title}
                  style={{ transitionDelay: `${index * 80}ms` }}
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

      <section className="mem-final">
        <div className="container">
          <div className="mem-final-inner reveal">
            <span>Take the first step toward transforming your journey with AAA accreditation membership today.</span>
            <Link href="/contact" className="btn btn-gold">
              Contact Membership <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
