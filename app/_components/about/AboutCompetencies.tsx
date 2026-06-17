const AREAS = [
  { name: "Healthcare Accreditation" },
  { name: "Training Providers Accreditation" },
  { name: "Schools Accreditation" },
  { name: "Testing & Calibration Laboratories", std: "ISO/IEC 17025" },
  { name: "Medical Laboratories", std: "ISO 15189" },
  { name: "Personnel Certification Bodies", std: "ISO/IEC 17024" },
  { name: "System Certification Bodies", std: "ISO/IEC 17021" },
  { name: "Product Certification Bodies", std: "ISO/IEC 17065" },
  { name: "Inspection Bodies", std: "ISO/IEC 17020" },
  { name: "Proficiency Testing Providers", std: "ISO/IEC 17043" },
];

export default function AboutCompetencies() {
  return (
    <section className="block" id="competencies">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">Areas of competency</span>
            <h2 className="section-heading">
              Dedicated to the formal recognition of competency.
            </h2>
          </div>
          <p className="lede-side">
            AAA is dedicated to the formal recognition for the competency of:
          </p>
        </div>
        <div className="dir-grid">
          {AREAS.map((a, i) => (
            <div
              className="dir-card reveal"
              key={a.name}
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <div className="name">{a.name}</div>
              {a.std && (
                <div className="scope">According to {a.std}.</div>
              )}
              {a.std && (
                <div className="tags"><span className="std-pill light">{a.std}</span></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
