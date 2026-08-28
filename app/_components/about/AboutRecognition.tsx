const RECOGNITIONS = [
  { name: "ISO/IEC 17011", sub: "Accreditation Bodies" },
  { name: "ILAC", sub: "Recognition Partner" },
  { name: "IAF", sub: "Recognition Partner" },
  { name: "GAFTA", sub: "Sector Network" },
  { name: "Commonwealth of VA", sub: "Authorizing Authority" },
  { name: "WTO/TBT", sub: "Aligned" },
  { name: "ISO 9001", sub: "Internal QMS" },
  { name: "ISO/IEC 17021", sub: "Aligned" },
  { name: "ISO 15189", sub: "Healthcare" },
  { name: "ISO/IEC 17025", sub: "Laboratories" },
  { name: "ISO/IEC 17020", sub: "Inspection" },
  { name: "ISO/IEC 17024", sub: "Personnel" },
];

export default function AboutRecognition() {
  return (
    <section className="recognition" id="recognition">
      <div className="container">
        <div className="recognition-head reveal">
          <span className="eyebrow">International recognition</span>
          <h3>Aligned with the bodies our clients answer to.</h3>
        </div>
        <div className="recognition-grid">
          {RECOGNITIONS.map((r) => (
            <div className="recognition-cell" key={r.name}>
              <div>
                <div className="name">{r.name}</div>
                <div className="sub">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
