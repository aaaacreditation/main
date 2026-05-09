const STANDARDS = [
  "ISO/IEC 17011",
  "ISO/IEC 17025",
  "ISO/IEC 17021",
  "ISO 15189",
  "ISO/IEC 17020",
  "ISO/IEC 17024",
  "ISO 9001",
];

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container">
        <div className="row">
          <div className="label">Internationally aligned with</div>
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
