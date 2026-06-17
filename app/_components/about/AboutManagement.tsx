const TEAM = [
  {
    name: "Kathryn Williams",
    role: "Director General",
    email: "Kathryn@aaa-accreditation.org",
  },
  {
    name: "Saad Azm",
    role: "Managing Director, International",
    email: "Saad@aaa-accreditation.org",
  },
  {
    name: "Tina Pavone",
    role: "Associate Managing Director",
    email: "Tina@aaa-accreditation.org",
  },
  {
    name: "Galyani Sam",
    role: "Business Development Manager",
    email: "Galyani@aaa-accreditation.org",
  },
  {
    name: "Angel Horn",
    role: "Accreditation Director Assistant",
    email: "Angel@aaa-accreditation.org",
  },
  {
    name: "John Collins",
    role: "Training Providers Accreditation",
    email: "John@aaa-accreditation.org",
  },
  {
    name: "Peter Smith",
    role: "Laboratories Accreditation",
    email: "Peter@aaa-accreditation.org",
  },
  {
    name: "Robert Davis",
    role: "Inspection Bodies Accreditation",
    email: "Robert@aaa-accreditation.org",
  },
  {
    name: "William Moore",
    role: "Certification Bodies Accreditation",
    email: "William@aaa-accreditation.org",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function AboutManagement() {
  return (
    <section className="leaders-block" id="management">
      <div className="container">
        <div className="leaders-head reveal">
          <span className="eyebrow">Management &amp; Structure</span>
          <h2>The team behind every AAA accreditation program.</h2>
        </div>

        <div className="leaders-grid">
          {TEAM.map((m, i) => (
            <div
              className="leader reveal"
              key={m.name}
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
            >
              <div className="leader-photo">
                <div className="ph">{initials(m.name)}</div>
              </div>
              <div className="leader-body">
                <div className="leader-name">{m.name}</div>
                <div className="leader-role">{m.role}</div>
                <p className="leader-bio">
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
