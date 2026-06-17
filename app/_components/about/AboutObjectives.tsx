const OBJECTIVES = [
  {
    num: "01",
    title: "Confidence in quality, protection of the public",
    body: "Provide international accreditation that inspires confidence in the quality of products and services, acceptance of results from accredited organizations, and the protection of the health, safety, and environment of the public.",
    tags: ["Public health", "Safety", "Environment"],
  },
  {
    num: "02",
    title: "Acceptance amongst global partners",
    body: "Promote the acceptance of accredited results and certificates internationally and amongst global partners.",
    tags: ["International recognition"],
  },
  {
    num: "03",
    title: "Capability to exceed expectations",
    body: "Continue to strengthen our operations teams — developing the capacity and capability to exceed the expectations of our customers and stakeholders, and to deliver accreditation services to the highest quality and technical standards.",
    tags: ["Operations", "Technical standards"],
  },
];

export default function AboutObjectives() {
  return (
    <section className="timeline-block" id="objectives">
      <div className="container">
        <div className="timeline-head reveal">
          <div>
            <span className="eyebrow">Strategic objectives</span>
            <h2>Three objectives, behind every program we operate.</h2>
          </div>
        </div>

        <div className="timeline">
          {OBJECTIVES.map((o, i) => (
            <div
              className="tl-row reveal"
              key={o.num}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="tl-year">{o.num}</div>
              <div className="tl-content">
                <h4>{o.title}</h4>
                <p>{o.body}</p>
                <div className="tags">
                  {o.tags.map((tag) => (
                    <span key={tag} className="std-pill light">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
