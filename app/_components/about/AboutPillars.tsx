import Icon, { type IconName } from "../Icon";

const VALUES: { n: string; icon: IconName; title: string }[] = [
  { n: "01", icon: "cert", title: "Excellence" },
  { n: "02", icon: "flask", title: "Innovation" },
  { n: "03", icon: "search", title: "Transparency" },
  { n: "04", icon: "clipboard", title: "Professionalism" },
  { n: "05", icon: "flag", title: "Leadership" },
];

export default function AboutPillars() {
  return (
    <section className="pillars-block" id="values">
      <div className="container">
        <div className="pillars-head reveal">
          <div>
            <span className="eyebrow">Our values</span>
            <h2>The values behind every accreditation decision.</h2>
          </div>
        </div>

        <div className="pillars-grid cols-5">
          {VALUES.map((p, i) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
