import Icon, { type IconName } from "../Icon";

const PILLARS: { n: string; icon: IconName; title: string; body: string }[] = [
  {
    n: "01",
    icon: "globe",
    title: "Globally Accepted",
    body: "Accreditations recognized across 60+ countries through international partnership networks and mutual recognition arrangements.",
  },
  {
    n: "02",
    icon: "iso",
    title: "ISO/IEC Aligned",
    body: "Every AAA program is built on an internationally-recognized ISO/IEC standard — not invented criteria.",
  },
  {
    n: "03",
    icon: "flag",
    title: "US-Authorized",
    body: "Authorized by the Commonwealth of Virginia, USA, with operations governed under United States legal jurisdiction.",
  },
  {
    n: "04",
    icon: "scale",
    title: "Independent & Impartial",
    body: "Governance protected by a public impartiality safeguarding policy — separating commercial interests from accreditation decisions.",
  },
];

export default function Why() {
  return (
    <section className="block alt" id="why">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">Why AAA</span>
            <h2 className="section-heading">Built for institutions that take quality seriously.</h2>
          </div>
          <p className="lede-side">
            Four commitments that distinguish AAA from generic certification — and align our work
            with the bodies our clients answer to.
          </p>
        </div>

        <div className="why-grid">
          {PILLARS.map((p, i) => (
            <div
              className="why-cell reveal"
              key={p.title}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Icon name={p.icon} size={28} className="icon" strokeWidth={1.4} />
                <span className="num">{p.n}</span>
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
