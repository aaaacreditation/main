import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="container">
        <div className="crumbs">
          <Link href="/">Home</Link>
          <span className="sep" />
          <span className="current">About</span>
        </div>

        <div className="about-hero-grid">
          <div className="reveal">
            <span className="eyebrow">About AAA</span>
            <h1>
              An institution built on <em>the standards we audit.</em>
            </h1>
          </div>

          <div className="about-hero-side reveal">
            <p>
              The American Accreditation Association is an independent accreditation body
              authorized by the Commonwealth of Virginia, USA — delivering ISO/IEC-aligned
              programs to organizations operating across more than sixty countries.
            </p>
            <div className="about-hero-meta">
              <div className="cell">
                <div className="k">Headquarters</div>
                <div className="v">Virginia, USA</div>
              </div>
              <div className="cell">
                <div className="k">Founded</div>
                <div className="v">2014</div>
              </div>
              <div className="cell">
                <div className="k">Operating in</div>
                <div className="v">62 countries</div>
              </div>
              <div className="cell">
                <div className="k">Active assessors</div>
                <div className="v">180+ globally</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
