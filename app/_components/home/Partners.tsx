import Link from "next/link";
import Icon from "../Icon";

const PARTNER_NAMES = [
  "Meridian Health", "Northgate Labs", "Apex Calibration", "Cedarwood Clinic",
  "Stanford Testing Co.", "Riverbend Medical", "Ironside Inspection", "Pacific Standards",
  "Caldwell Institute", "Veritas Assay", "Beacon Conformity", "Helios Hospital Group",
  "Atlas Personnel Cert.", "Drumlin Diagnostics", "Quay Bio", "Foreland Training",
  "Larkspur Imaging", "Brunton Calibration", "Concord Quality Co.", "Trent Standards Bureau",
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
            Accredited
          </span>
          <span>{name}</span>
        </div>
      )}
    </div>
  );
}

export default function Partners() {
  const row1 = PARTNER_NAMES.slice(0, 10);
  const row2 = PARTNER_NAMES.slice(10);
  return (
    <section className="block partners-block tight">
      <div className="container">
        <div className="block-head reveal" style={{ textAlign: "center", display: "block" }}>
          <span className="eyebrow" style={{ display: "inline-flex" }}>Accredited Organizations</span>
          <h2 className="section-heading" style={{ maxWidth: "28ch", margin: "14px auto 14px" }}>
            Trusted by institutions worldwide.
          </h2>
          <p style={{ margin: "0 auto", color: "var(--ink-600)", maxWidth: "56ch" }}>
            A selection of healthcare providers, laboratories, inspection bodies and training organizations
            currently holding AAA accreditation.
          </p>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[...row1, ...row1].map((n, i) => (
              <LogoTile key={`a-${i}`} name={n} idx={i} />
            ))}
          </div>
        </div>
        <div style={{ height: 16 }} />
        <div className="marquee reverse">
          <div className="marquee-track">
            {[...row2, ...row2].map((n, i) => (
              <LogoTile key={`b-${i}`} name={n} idx={i + 1} />
            ))}
          </div>
        </div>

        <div className="partners-foot">
          <Link href="/directory/accredited-organizations" className="ed-link">
            Browse all 200+ accredited organizations <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
