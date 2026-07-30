import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import { CASE_STUDIES, type CaseStudy } from "../../_data/case-studies";

// Two rows scrolling in opposite directions. Each row is duplicated once in
// render so the CSS marquee can loop seamlessly at translateX(-50%).
// Organizations and quotes come from the client's case-study source.
const ROW_A: CaseStudy[] = CASE_STUDIES.slice(0, 5);
const ROW_B: CaseStudy[] = CASE_STUDIES.slice(5);

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <figure className="cs-card">
      <span className="cs-qmark" aria-hidden>
        &rdquo;
      </span>
      <span className="cs-badge">{c.sector}</span>
      <blockquote className="cs-quote">{c.quote}</blockquote>
      <figcaption className="cs-by">
        {c.logo ? (
          <span className="cs-logo" aria-hidden>
            <Image
              src={c.logo}
              alt=""
              width={112}
              height={44}
              sizes="112px"
              loading="lazy"
            />
          </span>
        ) : (
          <span className="cs-avatar" aria-hidden>
            {c.initials}
          </span>
        )}
        <span className="cs-id">
          <span className="cs-name">{c.name}</span>
          <span className="cs-loc">{c.country}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function CaseStudies() {
  return (
    <section className="block cases-block" id="case-studies">
      <div className="container">
        <div className="block-head reveal" style={{ textAlign: "center", display: "block" }}>
          <span className="eyebrow" style={{ display: "inline-flex" }}>
            Case Studies
          </span>
          <h2 className="section-heading" style={{ maxWidth: "22ch", margin: "14px auto 16px" }}>
            Trusted by organizations across the world.
          </h2>
          <p className="cases-lede">
            From medical laboratories to universities, see how AAA accreditation helps
            organizations earn recognition, open new markets, and raise the bar on quality.
          </p>
        </div>
      </div>

      <div className="cs-rows reveal" aria-label="Accreditation success stories">
        <div className="cs-row">
          <div className="cs-track">
            {[...ROW_A, ...ROW_A].map((c, i) => (
              <CaseCard c={c} key={`a-${i}`} />
            ))}
          </div>
        </div>
        <div className="cs-row reverse">
          <div className="cs-track">
            {[...ROW_B, ...ROW_B].map((c, i) => (
              <CaseCard c={c} key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cases-foot">
          <Link href="/directory/accredited-organizations" className="ed-link cases-ed-link">
            Explore accredited organizations <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
