import Icon, { type IconName } from "../Icon";

const PILLARS: { n: string; icon: IconName; title: string; body: string }[] = [
  {
    n: "01",
    icon: "globe",
    title: "Globally Accepted",
    body: "AAA's vision is to provide international accreditation accepted globally — promoting the acceptance of accredited results and certificates internationally and amongst global partners.",
  },
  {
    n: "02",
    icon: "iso",
    title: "Built on International Standards",
    body: "Programs are based on internationally recognized standards — from ISO/IEC 17025 and ISO 15189 to ISO/IEC 17024 and ASTM E2659 — ensuring the competence of accredited organizations.",
  },
  {
    n: "03",
    icon: "flag",
    title: "US-Authorized",
    body: "Authorized by the State Corporation Commission of the Commonwealth of Virginia to transact business under Title 13.1 of the Code of Virginia, offering a full range of comprehensive accreditation services.",
  },
  {
    n: "04",
    icon: "scale",
    title: "Independent & Impartial",
    body: "Impartiality, transparency, objectivity, and independence are paramount in all AAA operations — safeguarded by a published impartiality policy, conflict-of-interest management, and non-discriminatory services.",
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
            Four commitments drawn from AAA&apos;s mission: independent, international
            accreditation programs that provide globally accepted confidence in the competence
            of accredited organizations.
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
