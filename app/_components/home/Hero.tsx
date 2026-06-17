import Link from "next/link";
import Icon from "../Icon";
import SealRosette from "../SealRosette";

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
      <SealRosette spin />

      <div className="hero-corner-tag">Virginia, USA</div>

      <div className="container">
        <div className="hero-content reveal">
          <span className="eyebrow">American Accreditation Association</span>
          <h1>
            International accreditation, <span className="accent">accepted globally.</span>
          </h1>
          <p className="lede">
            The American Accreditation Association (AAA) offers accreditation worldwide. Our
            programs are based on <strong>internationally recognized standards</strong> that
            ensure the competence of accredited organizations and the global acceptance of
            their accreditations.
          </p>
          <div className="hero-ctas">
            <Link
              href="/quote"
              className="btn"
              style={{ background: "var(--aaa-gold)", color: "var(--aaa-blue-950)", fontWeight: 600 }}
            >
              Get a Quote <Icon name="arrow" size={14} className="arrow" />
            </Link>
            <Link href="#programs" className="btn btn-ghost">
              Explore Programs <Icon name="arrowUpRight" size={14} className="arrow" />
            </Link>
          </div>

          <div className="hero-trust">
            <span className="label">Recognized</span>
            <span className="std-pill light">Authorized in Virginia, USA</span>
            <span className="std-pill light">ISQua Member</span>
            <span className="std-pill light">UNESCO Partner</span>
          </div>
        </div>
      </div>

      <div className="hero-stat-card">
        <div className="num">12 <span>accreditation programs</span></div>
        <div className="lbl">Healthcare, education &amp; conformity assessment bodies</div>
      </div>
    </section>
  );
}
