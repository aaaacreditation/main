import Link from "next/link";
import Icon, { type IconName } from "../Icon";

const PROGRAMS: { icon: IconName; title: string; desc: string; stds: string[]; href: string }[] = [
  {
    icon: "medical",
    title: "Healthcare Accreditation",
    desc: "Independent accreditation for hospitals, clinics, and medical laboratories — improving patient outcomes through internationally-aligned quality systems.",
    stds: ["ISO 15189", "ISO 9001"],
    href: "/programs/healthcare",
  },
  {
    icon: "flask",
    title: "Conformity Assessment Bodies",
    desc: "Accreditation of testing, calibration, inspection and certification bodies, supporting global recognition of conformity-assessment results.",
    stds: ["ISO/IEC 17025", "ISO/IEC 17020", "ISO/IEC 17021"],
    href: "/programs/conformity-assessment-bodies",
  },
  {
    icon: "book",
    title: "Training Providers & Personnel",
    desc: "Accreditation of personnel-certification bodies and training programs — ensuring competence is demonstrable, auditable, and portable across borders.",
    stds: ["ISO/IEC 17024"],
    href: "/programs/training-education",
  },
];

export default function Programs() {
  return (
    <section className="block" id="programs">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">Programs</span>
            <h2 className="section-heading">Internationally-recognized accreditation, scoped to your sector.</h2>
          </div>
          <p className="lede-side">
            Each AAA program is built on a defined ISO/IEC standard and delivered by independent assessors
            with sector experience.
          </p>
        </div>

        <div className="programs-grid">
          {PROGRAMS.map((p, i) => (
            <article
              className="program-card reveal"
              key={p.title}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="program-icon">
                <Icon name={p.icon} size={26} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="program-stds">
                {p.stds.map((s) => (
                  <span key={s} className="std-pill light">{s}</span>
                ))}
              </div>
              <div className="program-foot">
                <Link href={p.href} className="ed-link">
                  Learn more <Icon name="arrow" size={14} className="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
