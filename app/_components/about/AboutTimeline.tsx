const TIMELINE = [
  {
    year: "2014",
    title: "Founded in Virginia, USA",
    body: "AAA is established as an independent accreditation body authorized by the Commonwealth of Virginia.",
    tags: ["Founding"],
  },
  {
    year: "2016",
    title: "First healthcare program launches",
    body: "Hospital and clinic accreditation program goes live, anchored on internationally-recognized quality criteria.",
    tags: ["ISO 15189", "Healthcare"],
  },
  {
    year: "2018",
    title: "Conformity assessment expansion",
    body: "Programs added for testing & calibration laboratories, inspection bodies, and certification bodies.",
    tags: ["ISO/IEC 17025", "ISO/IEC 17020", "ISO/IEC 17021"],
  },
  {
    year: "2020",
    title: "International network at 30 countries",
    body: "Through partnership networks, AAA accreditations are recognized across 30+ operating jurisdictions.",
    tags: ["Recognition"],
  },
  {
    year: "2022",
    title: "Personnel certification & training",
    body: "Accreditation extended to personnel-certification bodies and accredited training providers.",
    tags: ["ISO/IEC 17024"],
  },
  {
    year: "2024",
    title: "Operating across 60+ countries",
    body: "Active assessor pool exceeds 180 globally; AAA-accredited certificates issued surpasses 12,000.",
    tags: ["Scale"],
  },
  {
    year: "2026",
    title: "Impartiality framework, public release",
    isCurrent: true,
    body: "Updated impartiality safeguarding framework published, separating accreditation decisions from commercial relationships.",
    tags: ["Governance"],
  },
];

export default function AboutTimeline() {
  return (
    <section className="timeline-block" id="history">
      <div className="container">
        <div className="timeline-head reveal">
          <div>
            <span className="eyebrow">Our history</span>
            <h2>Twelve years of building accreditation that travels.</h2>
          </div>
        </div>

        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div
              className={"tl-row reveal" + (t.isCurrent ? " is-current" : "")}
              key={t.year}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="tl-year">{t.year}</div>
              <div className="tl-content">
                <h4>{t.title}</h4>
                <p>{t.body}</p>
                {t.tags && (
                  <div className="tags">
                    {t.tags.map((tag) => (
                      <span key={tag} className="std-pill light">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
