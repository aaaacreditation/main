const STATEMENT =
  "The American Accreditation Association (AAA) offers accreditation worldwide. Its programs are based on internationally recognized standards that ensure the competence of accredited organizations and the global acceptance of their accreditations.";

const WORDS = STATEMENT.split(" ");
// Emphasized phrases: "internationally recognized standards" and "global acceptance"
const EMPHASIS = new Set([13, 14, 15, 25, 26]);

export default function Intro() {
  return (
    <section className="intro">
      <div className="container">
        <span className="intro-eyebrow reveal">American Accreditation Association</span>
        <p className="intro-statement reveal">
          {WORDS.map((w, i) => (
            <span
              key={i}
              className={"word" + (EMPHASIS.has(i) ? " em" : "")}
              style={{ transitionDelay: `${120 + i * 26}ms` }}
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
