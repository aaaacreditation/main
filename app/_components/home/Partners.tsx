import Link from "next/link";
import Icon from "../Icon";

const PARTNER_NAMES = [
  "International Society for Quality in Health Care (ISQua)",
  "UNESCO Institute for Lifelong Learning",
  "American Association for Adult and Continuing Education (AAACE)",
  "Council on International Higher Education Supervision (CONIES)",
  "Earth Day Network",
  "Association of Graduate Careers Advisory Services (AGCAS)",
];

function LogoTile({ name, idx }: { name: string; idx: number }) {
  const variant = idx % 4;
  return (
    <div className="logo-tile">
      {variant === 0 && (
        <div className="mark"><span className="dot" /><span>{name}</span></div>
      )}
      {variant === 1 && (
        <div className="mark">
          <span style={{ width: 14, height: 14, border: "2px solid var(--aaa-blue)", borderRadius: "50%" }} />
          <span>{name}</span>
        </div>
      )}
      {variant === 2 && (
        <div className="mark">
          <span
            style={{
              width: 14,
              height: 14,
              background: "var(--aaa-blue)",
              clipPath: "polygon(50% 0,100% 100%,0 100%)",
            }}
          />
          <span>{name}</span>
        </div>
      )}
      {variant === 3 && (
        <div className="mark" style={{ flexDirection: "column", gap: 2, lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--ink-500)",
              letterSpacing: ".18em",
              textTransform: "uppercase",
            }}
          >
            Partner
          </span>
          <span>{name}</span>
        </div>
      )}
    </div>
  );
}

export default function Partners() {
  return (
    <section className="block partners-block tight">
      <div className="container">
        <div className="block-head reveal" style={{ textAlign: "center", display: "block" }}>
          <span className="eyebrow" style={{ display: "inline-flex" }}>Partners of Success</span>
          <h2 className="section-heading" style={{ maxWidth: "28ch", margin: "14px auto 14px" }}>
            National &amp; international partnerships.
          </h2>
          <p style={{ margin: "0 auto", color: "var(--ink-600)", maxWidth: "56ch" }}>
            AAA works alongside international organizations — from ISQua and the UNESCO
            Institute for Lifelong Learning to AAACE, CONIES, the Earth Day Network, and
            AGCAS — to advance quality and the global acceptance of accreditation.
          </p>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[...PARTNER_NAMES, ...PARTNER_NAMES].map((n, i) => (
              <LogoTile key={`a-${i}`} name={n} idx={i} />
            ))}
          </div>
        </div>

        <div className="partners-foot">
          <Link href="/partnerships" className="ed-link">
            Explore our partnerships <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
