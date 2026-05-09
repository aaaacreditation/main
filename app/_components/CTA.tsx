import Link from "next/link";
import Icon from "./Icon";

export default function CTA() {
  return (
    <section className="cta-band" id="cta">
      <span className="cta-corner" />
      <div className="container">
        <div className="cta-band-inner">
          <div className="reveal">
            <span className="eyebrow" style={{ color: "var(--aaa-gold)" }}>Get started</span>
            <h2>Ready to pursue international accreditation?</h2>
            <p>
              Get a tailored quote within 48 hours. Our team will scope your accreditation journey
              based on your sector, applicable ISO/IEC standards, and the geographies you operate in.
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
