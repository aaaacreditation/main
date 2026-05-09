import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import type { IconName } from "../../_components/Icon";

export const metadata: Metadata = {
  title: "Conformity Assessment Bodies",
  description:
    "AAA accreditation programs for laboratories, inspection bodies, certification bodies, and proficiency testing providers under ISO/IEC standards.",
};

const PROGRAMS: {
  icon: IconName;
  title: string;
  standard: string;
  href: string;
  desc: string;
  image: string;
  imagePosition?: string;
}[] = [
  {
    icon: "clipboard",
    title: "Inspection Bodies Accreditation",
    standard: "ISO/IEC 17020",
    href: "/programs/iso-17020",
    desc: "For Type A, B, and C inspection bodies performing independent inspection across regulated and commercial sectors.",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center",
  },
  {
    icon: "cert",
    title: "System Certification Bodies Accreditation",
    standard: "ISO/IEC 17021-1",
    href: "/programs/iso-17021",
    desc: "For organizations certifying management systems, audit programs, certification decisions, and surveillance cycles.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center",
  },
  {
    icon: "shield",
    title: "Personnel Certification Bodies Accreditation",
    standard: "ISO/IEC 17024",
    href: "/programs/iso-17024",
    desc: "For bodies certifying individuals through impartial, defensible, and internationally aligned credentialing schemes.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center",
  },
  {
    icon: "flask",
    title: "Testing & Calibration Laboratories Accreditation",
    standard: "ISO/IEC 17025",
    href: "/programs/iso-17025",
    desc: "For testing, calibration, sampling, field testing, measurement uncertainty, and traceability programs.",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center",
  },
  {
    icon: "medical",
    title: "Medical Laboratories Accreditation",
    standard: "ISO 15189",
    href: "/programs/iso-15189",
    desc: "For clinical, pathology, reference, and healthcare laboratories focused on quality and patient-safety outcomes.",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center",
  },
  {
    icon: "iso",
    title: "Product Certification Bodies Accreditation",
    standard: "ISO/IEC 17065 & Halal",
    href: "/programs/iso-17065",
    desc: "For bodies certifying products, processes, services, and sector schemes that support market access.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center 58%",
  },
  {
    icon: "chart",
    title: "Proficiency Testing Providers Accreditation",
    standard: "ISO/IEC 17043",
    href: "/programs/iso-17043",
    desc: "For providers that design proficiency-testing schemes and evaluate laboratory performance against agreed criteria.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=82",
    imagePosition: "center",
  },
];

const OVERVIEW = [
  {
    label: "Who this program is for",
    items: [
      "Testing and calibration laboratories operating across regulated sectors",
      "Independent inspection bodies (Type A, B, or C)",
      "Management-system certification bodies (QMS, EMS, FSMS, etc.)",
      "Product-certification and personnel-certification bodies",
    ],
  },
  {
    label: "Scope of accreditation",
    items: [
      "Technical competence and metrological traceability",
      "Impartiality safeguards and management-system requirements",
      "Sampling, decision rules, and reporting frameworks",
      "Witnessed assessments and proficiency-testing participation",
    ],
  },
  {
    label: "Benefits of AAA accreditation",
    items: [
      "Global mutual-recognition through partnership networks (ILAC, IAF)",
      "Reduced re-testing and re-inspection in cross-border trade",
      "Demonstrated technical competence to regulators and clients",
      "Continuous improvement through structured surveillance audits",
    ],
  },
];

function CABHero() {
  return (
    <section className="cab-hero">
      <div className="cab-hero-media" aria-hidden="true" />
      <div className="cab-hero-shade" aria-hidden="true" />
      <div className="container">
        <div className="cab-crumbs">
          <Link href="/">Home</Link>
          <span />
          <Link href="/programs/healthcare">Programs</Link>
          <span />
          <strong>Conformity Assessment Bodies</strong>
        </div>

        <div className="cab-hero-grid">
          <div>
            <span className="eyebrow">Accreditation Programs</span>
            <h1>
              <span>Conformity</span>
              <span>Assessment</span>
              <span>Bodies</span>
              <span>Accreditation</span>
            </h1>
          </div>

          <aside className="cab-hero-panel">
            <p>
              Accreditation of testing, calibration, inspection and certification
              bodies, supporting global recognition of conformity-assessment results.
            </p>
            <div className="cab-hero-tags">
              <span>ISO/IEC 17025</span>
              <span>ISO/IEC 17020</span>
              <span>ISO/IEC 17021</span>
              <span>ISO/IEC 17024</span>
              <span>ISO/IEC 17065</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CABPrograms() {
  return (
    <section className="cab-programs" id="program-directory">
      <div className="container">
        <div className="cab-section-head">
          <div>
            <span className="eyebrow">Program Directory</span>
            <h2 className="section-heading">Choose the accreditation path that matches your activity.</h2>
          </div>
          <p>
            Each scope is assessed against the relevant ISO/IEC standard, with
            competence, impartiality, reporting, and surveillance requirements
            tailored to the service being accredited.
          </p>
        </div>

        <div className="cab-card-grid">
          {PROGRAMS.map((program, index) => (
            <Link
              className="cab-card"
              href={program.href}
              key={program.title}
              style={
                {
                  "--cab-card-bg": `url(${program.image})`,
                  "--cab-card-position": program.imagePosition ?? "center",
                  transitionDelay: `${index * 55}ms`,
                } as CSSProperties
              }
            >
              <span className="cab-card-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="cab-card-icon">
                <Icon name={program.icon} size={24} strokeWidth={1.5} />
              </span>
              <span className="cab-card-body">
                <span className="cab-card-standard">{program.standard}</span>
                <span className="cab-card-title">{program.title}</span>
                <span className="cab-card-desc">{program.desc}</span>
              </span>
              <span className="cab-card-action">
                Read More <Icon name="arrow" size={14} className="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CABOverview() {
  return (
    <section className="cab-overview">
      <div className="container">
        <div className="cab-overview-grid">
          <div className="cab-overview-copy">
            <span className="eyebrow">Program Overview</span>
            <h2>One accreditation family for the organizations that prove conformity.</h2>
            <p>
              AAA evaluates the systems, competence, decision rules, records, and
              impartiality controls behind each conformity-assessment activity, so
              results can be trusted by regulators, clients, and markets.
            </p>
            <div className="cab-overview-actions">
              <Link href="/quote" className="btn btn-gold">
                Request a Quote <Icon name="arrow" size={14} className="arrow" />
              </Link>
              <Link href="/apply" className="btn btn-ghost-light">
                Apply for Accreditation
              </Link>
            </div>
          </div>

          <div className="cab-overview-list">
            {OVERVIEW.map((section) => (
              <article className="cab-overview-item" key={section.label}>
                <h3>{section.label}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={14} strokeWidth={1.8} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <CABHero />
      <CABPrograms />
      <CABOverview />
      <CTA />
    </>
  );
}
