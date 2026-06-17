const STANDARDS = [
  "ISO/IEC 17025",
  "ISO 15189",
  "ISO/IEC 17024",
  "ISO/IEC 17021-1",
  "ISO/IEC 17065",
  "ISO/IEC 17020",
  "ISO/IEC 17043",
  "ASTM E2659",
];

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container">
        <div className="row">
          <div className="label">Programs based on</div>
          <div className="pills">
            {STANDARDS.map((s) => (
              <span key={s} className="std-pill dark">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
