import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import SealRosette from "./SealRosette";

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
              An independent accreditation body delivering internationally-recognized programs
              for healthcare organizations, training and education providers, schools,
              laboratories, and certification and inspection bodies.
            </p>
            <div className="social">
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={16} /></a>
              <a href="#" aria-label="Twitter"><Icon name="twitter" size={16} /></a>
              <a href="#" aria-label="YouTube"><Icon name="youtube" size={16} /></a>
              <a href="#" aria-label="Facebook"><Icon name="facebook" size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Programs</h5>
            <ul>
              <li><Link href="/programs/healthcare">Healthcare</Link></li>
              <li><Link href="/programs/iso-15189">Medical Laboratories</Link></li>
              <li><Link href="/programs/iso-17025">Testing &amp; Calibration</Link></li>
              <li><Link href="/programs/iso-17020">Inspection Bodies</Link></li>
              <li><Link href="/programs/iso-17021">System Certification</Link></li>
              <li><Link href="/programs/iso-17024">Personnel Certification</Link></li>
              <li><Link href="/programs/training-education">Training Providers</Link></li>
              <li><Link href="/programs/iso-17065">Product Certification</Link></li>
              <li><Link href="/programs/school-accreditation">School Accreditation</Link></li>
              <li><Link href="/programs/iso-17043">Proficiency Testing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>About</h5>
            <ul>
              <li><Link href="/about">About AAA</Link></li>
              <li><Link href="/about-accreditation">About Accreditation</Link></li>
              <li><Link href="/partnerships">Partners</Link></li>
              <li><Link href="/impartiality-policy">Impartiality Policy</Link></li>
              <li><Link href="/news">AAA News</Link></li>
              <li><Link href="/documents">Documents</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h5>Contact</h5>
            <div className="item">
              <Icon name="pin" size={16} className="ico" />
              <div>
                <strong>8609 Westwood Center Drive</strong>
                Tysons Corner, VA 22182, USA
              </div>
            </div>
            <div className="item">
              <Icon name="phone" size={16} className="ico" />
              <a href="tel:+15716012616" style={{ color: "rgba(255,255,255,.85)" }}>+1 (571) 601 2616</a>
            </div>
            <div className="item">
              <Icon name="globe" size={16} className="ico" />
              <div>International Operations<br /><span className="muted">Tel./WhatsApp +44 (748) 755 0737</span></div>
            </div>
            <div className="item">
              <Icon name="mail" size={16} className="ico" />
              <a href="mailto:info@aaa-accreditation.org" style={{ color: "rgba(255,255,255,.85)" }}>info@aaa-accreditation.org</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} American Accreditation Association. All rights reserved.</span>
          <div className="links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
