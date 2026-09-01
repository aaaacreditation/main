import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import SealRosette from "./SealRosette";
import { CONTACT, FACTS, PROGRAMS, SOCIAL } from "../../lib/facts";

/**
 * Site footer.
 *
 * Aug 2026: program labels, contact details and social profiles now come from
 * lib/facts.ts. Previously the ISO/IEC 17021-1 link was labelled "System
 * Certification" (renamed to Management Systems Certification Bodies) and all
 * four social icons pointed at `href="#"`.
 */

const PROGRAM_LINKS = [
  PROGRAMS.healthcare,
  PROGRAMS.training,
  PROGRAMS.sme,
  PROGRAMS.school,
  PROGRAMS.iso17021,
  PROGRAMS.iso17065,
  PROGRAMS.iso17024,
  PROGRAMS.iso17020,
  PROGRAMS.iso17025,
  PROGRAMS.iso15189,
  PROGRAMS.iso17043,
  PROGRAMS.astm,
];

const ABOUT_LINKS = [
  { href: "/about", label: "About AAA" },
  { href: "/about-accreditation", label: "About Accreditation" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/advisory-committees", label: "Advisory Committees" },
  { href: "/impartiality-policy", label: "Impartiality Policy" },
  { href: "/news", label: "AAA News" },
  { href: "/documents", label: "Documents" },
  { href: "/membership", label: "Membership" },
  { href: "/directory/accredited-organizations", label: "Accredited Organizations" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <SealRosette />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="American Accreditation Association — home">
              <Image
                src="/logo/AAA-Logo.png"
                alt="American Accreditation Association"
                width={350}
                height={120}
                className="brand-logo brand-logo-footer"
              />
            </Link>
            <p>
              An independent accreditation body delivering internationally recognized programs
              for healthcare organizations, training and education providers, schools,
              laboratories, and certification and inspection bodies across{" "}
              {FACTS.countriesLabel}.
            </p>
            <div className="social">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={`AAA on ${s.name}`}
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h5>Accreditation Programs</h5>
            <ul>
              {PROGRAM_LINKS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>{"shortLabel" in p ? p.shortLabel : p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>About</h5>
            <ul>
              {ABOUT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h5>Contact</h5>
            <div className="item">
              <Icon name="pin" size={16} className="ico" />
              <div>
                <strong>{CONTACT.street}</strong>
                {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}, {CONTACT.country}
              </div>
            </div>
            <div className="item">
              <Icon name="phone" size={16} className="ico" />
              <a href={CONTACT.phoneHref} style={{ color: "rgba(255,255,255,.85)" }}>
                {CONTACT.phone}
              </a>
            </div>
            <div className="item">
              <Icon name="globe" size={16} className="ico" />
              <div>
                International Operations
                <br />
                <span className="muted">
                  Tel./WhatsApp{" "}
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                    {CONTACT.whatsapp}
                  </a>
                </span>
              </div>
            </div>
            <div className="item">
              <Icon name="mail" size={16} className="ico" />
              <a href={`mailto:${CONTACT.email}`} style={{ color: "rgba(255,255,255,.85)" }}>
                {CONTACT.email}
              </a>
            </div>
            <Link href="/quote" className="ax-btn ax-btn-gold sm" style={{ marginTop: 18 }}>
              Request a Quote <Icon name="arrow" size={13} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} American Accreditation Association. All rights reserved.</span>
          <div className="links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/impartiality-policy">Impartiality</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
