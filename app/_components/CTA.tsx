import Link from "next/link";
import Icon from "./Icon";

/**
 * Shared closing CTA band.
 *
 * Aug 2026: re-skinned onto the `.ax-close` primitive so the site's closing
 * band matches the reference pages. Props are optional — every existing
 * `<CTA />` call site keeps working unchanged.
 */
export default function CTA({
  eyebrow = "Get started",
  title = "Ready to pursue international accreditation?",
  text = "Tell us about your organization and our team will scope your accreditation journey — your sector, the applicable standards, and the geographies you operate in — then come back with a tailored quote.",
  primary = { href: "/quote", label: "Request a Quote" },
  secondary = { href: "/contact", label: "Schedule a Consultation" },
  related,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  related?: { href: string; label: string }[];
} = {}) {
  return (
    <section className="ax-close" id="cta">
      <span className="ax-close-corner" aria-hidden="true" />
      <div className="container">
        <div className="ax-close-inner reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{text}</p>

          <div className="ax-close-actions">
            <Link href={primary.href} className="ax-btn ax-btn-gold">
              {primary.label} <Icon name="arrow" size={14} />
            </Link>
            <Link href={secondary.href} className="ax-btn ax-btn-ghost">
              {secondary.label}
            </Link>
          </div>

          {related && related.length > 0 && (
            <div className="ax-related">
              <span>Related:</span>
              {related.map((r) => (
                <Link key={r.href} href={r.href}>
                  {r.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
