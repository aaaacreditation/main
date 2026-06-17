import type { CSSProperties } from "react";
import Link from "next/link";
import Icon from "../Icon";

export default function Programs() {
  return (
    <section className="block" id="programs">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">Our Services</span>
            <h2 className="section-heading">Accreditation programs, recognized worldwide.</h2>
          </div>
          <p className="lede-side">
            Choose the accreditation pathway that matches your organization — each assessed
            against internationally recognized standards.
          </p>
        </div>

        <div className="svc-grid">
          <article className="svc-card reveal" style={{ "--svc-bg": "url('/home/training.jpg')" } as CSSProperties}>
            <div className="svc-card-inner">
              <h3>Training &amp; Education Providers Accreditation</h3>
              <p>
                Formal recognition for training and education programs — classroom,
                workshop-based, or e-learning, delivered anywhere in the world.
              </p>
              <Link href="/programs/training-education" className="svc-readmore">
                Read More <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          </article>

          <article className="svc-card reveal" style={{ transitionDelay: "90ms", "--svc-bg": "url('/home/healthcare.jpg')" } as CSSProperties}>
            <div className="svc-card-inner">
              <h3>Healthcare Accreditation</h3>
              <p>
                Accreditation for hospitals and healthcare organizations — demonstrating a
                commitment to patient safety, clinical excellence, and continuous improvement.
              </p>
              <Link href="/programs/healthcare" className="svc-readmore">
                Read More <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          </article>

          <article className="svc-card reveal" style={{ transitionDelay: "180ms", "--svc-bg": "url('/home/conformity.jpg')" } as CSSProperties}>
            <div className="svc-card-inner">
              <h3>Conformity Assessment Bodies Accreditation</h3>
              <p>
                A full family of programs, supporting global recognition of conformity-assessment
                results across:
              </p>
              <div className="svc-links">
                <Link href="/programs/iso-17025">
                  Laboratories <Icon name="arrowUpRight" size={13} />
                </Link>
                <Link href="/programs/iso-17065">
                  Certification Bodies <Icon name="arrowUpRight" size={13} />
                </Link>
                <Link href="/programs/iso-17020">
                  Inspection Bodies <Icon name="arrowUpRight" size={13} />
                </Link>
              </div>
              <Link href="/programs/conformity-assessment-bodies" className="svc-readmore">
                Read More <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
