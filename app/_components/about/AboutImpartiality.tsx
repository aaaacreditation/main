import Link from "next/link";
import Icon from "../Icon";

const COMMITMENTS = [
  {
    ttl: "Independence in governance",
    desc: "Accreditation decisions are taken by a committee with no commercial interest in the outcome.",
  },
  {
    ttl: "Published impartiality policy",
    desc: "Our safeguarding framework, conflict-of-interest declarations, and assessor register are all public.",
  },
  {
    ttl: "Documented assessment process",
    desc: "Every accreditation rests on a written audit trail, retained and auditable by recognition partners.",
  },
  {
    ttl: "Open complaints procedure",
    desc: "Any party may file a complaint regarding any accreditation decision; cases are handled by an independent panel.",
  },
  {
    ttl: "ISO/IEC alignment, not invention",
    desc: "We assess against the international standard for that activity — never criteria we authored ourselves.",
  },
];

export default function AboutImpartiality() {
  return (
    <section className="commit-block" id="impartiality">
      <div className="container">
        <div className="commit-grid">
          <div className="reveal">
            <span className="eyebrow">Impartiality</span>
            <h2>Our independence is the <em>product.</em></h2>
            <p className="lede">
              An accreditation that an interested party can influence is worth nothing.
              Five operating commitments protect AAA accreditations from that fate — and we
              publish each of them so anyone can hold us to them.
            </p>
            <Link href="/impartiality-policy" className="commit-doc">
              Read the safeguarding framework <Icon name="arrow" size={14} />
            </Link>
          </div>

          <ul className="commit-list reveal">
            {COMMITMENTS.map((c) => (
              <li key={c.ttl}>
                <span className="check">
                  <Icon name="cert" size={14} strokeWidth={1.6} />
                </span>
                <div>
                  <span className="ttl">{c.ttl}</span>
                  <span className="desc">{c.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
