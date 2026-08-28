const LEADERS = [
  {
    name: "Dr. Rasha Mahmoud",
    role: "Director General",
    initials: "RM",
    bio: "Twenty years across hospital quality systems and ISO 15189 implementation in the GCC and East Africa.",
  },
  {
    name: "James Caldwell",
    role: "Chief Accreditation Officer",
    initials: "JC",
    bio: "Former technical assessor for ISO/IEC 17025 across petroleum and pharmaceutical testing laboratories.",
  },
  {
    name: "Aiyana Brooks",
    role: "Head of Impartiality",
    initials: "AB",
    bio: "Governance specialist; chairs the AAA Impartiality Committee and complaints procedure.",
  },
  {
    name: "Marco Venturelli",
    role: "Director, International Operations",
    initials: "MV",
    bio: "Builds and maintains AAA's recognition partnerships across Europe, the GCC, and Southeast Asia.",
  },
];

export default function AboutLeadership() {
  return (
    <section className="leaders-block" id="leadership">
      <div className="container">
        <div className="leaders-head reveal">
          <span className="eyebrow">Leadership</span>
          <h2>The people accountable for every accreditation decision.</h2>
        </div>

        <div className="leaders-grid">
          {LEADERS.map((l, i) => (
            <div
              className="leader reveal"
              key={l.name}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="leader-photo">
                <span className="corner">Portrait · 4×5</span>
                <div className="ph">{l.initials}</div>
              </div>
              <div className="leader-body">
                <div className="leader-name">{l.name}</div>
                <div className="leader-role">{l.role}</div>
                <p className="leader-bio">{l.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
