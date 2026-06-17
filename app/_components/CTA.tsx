import Link from "next/link";
import Icon from "./Icon";
import SealRosette from "./SealRosette";

export default function CTA() {
  return (
    <section className="cta-band" id="cta">
      <span className="cta-corner" />
      <SealRosette spin />
      <div className="container">
        <div className="cta-band-inner">
          <div className="reveal">
            <span className="eyebrow" style={{ color: "var(--aaa-gold)" }}>Get started</span>
            <h2>Ready to pursue international accreditation?</h2>
            <p>
              Tell us about your organization and our team will scope your accreditation
              journey — your sector, the applicable standards, and the geographies you
              operate in — then come back with a tailored quote.
            </p>
          </div>
          <div className="cta-actions reveal">
            <Link href="/quote" className="btn btn-gold">
              Request a Quote <Icon name="arrow" size={14} className="arrow" />
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
