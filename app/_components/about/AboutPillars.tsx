import Icon, { type IconName } from "../Icon";

const PILLARS: { n: string; icon: IconName; title: string; body: string }[] = [
  {
    n: "01",
    icon: "shield",
    title: "Independence",
    body: "Accreditation decisions are taken by a committee that is structurally and financially separated from the bodies it accredits.",
  },
  {
    n: "02",
    icon: "iso",
    title: "Standards-aligned",
    body: "Every AAA program maps to a specific ISO/IEC standard. We do not invent criteria — we apply the criteria the world already agreed on.",
  },
  {
    n: "03",
    icon: "globe",
    title: "Internationally accepted",
    body: "Recognition through partnership networks and mutual-recognition arrangements covering more than sixty operating jurisdictions.",
  },
  {
    n: "04",
    icon: "scale",
    title: "Public accountability",
    body: "Our impartiality safeguarding policy, complaints procedure and assessor register are all published — anyone can read them.",
  },
];

export default function AboutPillars() {
  return (
    <section className="pillars-block">
      <div className="container">
        <div className="pillars-head reveal">
          <div>
            <span className="eyebrow">What we stand for</span>
            <h2>Four principles, applied without exception.</h2>
          </div>
          <p className="lede">
            They are easy to write down and difficult to operate. We operate them anyway —
            because the alternative is a certificate nobody trusts.
          </p>
        </div>

        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div
              className="pillar reveal"
              key={p.title}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="head">
                <span className="num">{p.n}</span>
                <Icon name={p.icon} size={22} className="icon" strokeWidth={1.4} />
              </div>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
