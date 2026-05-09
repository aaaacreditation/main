import Link from "next/link";
import Icon from "../Icon";

const HERO_BG = "/hero.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        role="img"
        aria-label="Laboratory professionals reviewing accreditation documentation"
      />
      <div className="hero-overlay" />

      <div className="hero-corner-tag">Live · Q1 2026</div>

      <div className="container">
        <div className="hero-content reveal">
          <span className="eyebrow">International Accreditation</span>
          <h1>
            Accreditation that is <span className="accent">accepted, everywhere.</span>
          </h1>
          <p className="lede">
            AAA delivers internationally-recognized accreditation programs for healthcare,
            conformity assessment bodies, and training providers — built on ISO/IEC standards
            and trusted across <strong>60+ countries</strong>.
          </p>
          <div className="hero-ctas">
            <Link
              href="/quote"
              className="btn"
              style={{ background: "var(--aaa-gold)", color: "var(--aaa-blue-950)", fontWeight: 600 }}
            >
              Get a Quote <Icon name="arrow" size={14} className="arrow" />
            </Link>
            <Link href="/programs/healthcare" className="btn btn-ghost">
              Explore Programs <Icon name="arrowUpRight" size={14} className="arrow" />
            </Link>
          </div>

          <div className="hero-trust">
            <span className="label">Recognized</span>
            <span className="std-pill light">ISO/IEC 17011</span>
            <span className="std-pill light">Virginia, USA</span>
            <span className="std-pill light">Globally Accepted</span>
          </div>
        </div>
      </div>

      <div className="hero-stat-card">
        <div className="num">12,400+ <span>certificates issued</span></div>
        <div className="lbl">Across 62 countries · 180+ active assessors</div>
      </div>
    </section>
  );
}
