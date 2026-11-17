import { blockIsEmpty, youTubeId, type Block, type CaseStudyLayout as Layout } from "@/lib/case-study-layout";
import CaseStudyBody from "./CaseStudyBody";
import CaseStudyVideo from "./CaseStudyVideo";

/**
 * A case study built in the admin page builder (Nov 2026): sections of 1–3
 * columns holding text, image, video and quote blocks. Columns stack on
 * narrow screens; empty blocks and empty sections are skipped.
 */
export default function CaseStudyLayout({ layout, title }: { layout: Layout; title: string }) {
  return (
    <div className="csx-layout">
      {layout.sections.map((s) => {
        const columns = s.columns.map((c) => c.filter((b) => !blockIsEmpty(b)));
        if (!columns.some((c) => c.length > 0)) return null;
        return (
          <section key={s.id} className={`csx-sec bg-${s.background} cols-${s.layout}`}>
            {columns.map((col, i) => (
              <div key={i} className="csx-col">
                {col.map((b) => (
                  <LayoutBlock key={b.id} block={b} title={title} />
                ))}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}

function LayoutBlock({ block: b, title }: { block: Block; title: string }) {
  if (b.type === "text") return <CaseStudyBody html={b.html} title={title} />;
  if (b.type === "image") {
    return (
      <figure className="csx-fig">
        {/* eslint-disable-next-line @next/next/no-img-element -- staff-uploaded media (/media/…) or a pasted URL */}
        <img src={b.src} alt={b.alt} loading="lazy" decoding="async" />
        {b.caption ? <figcaption>{b.caption}</figcaption> : null}
      </figure>
    );
  }
  if (b.type === "video") {
    const id = youTubeId(b.url);
    if (!id) return null;
    return (
      <figure className="csx-fig csx-fig-video">
        <CaseStudyVideo id={id} title={b.caption || `${title} — video`} />
        {b.caption ? <figcaption>{b.caption}</figcaption> : null}
      </figure>
    );
  }
  return (
    <blockquote className="csx-quote">
      <p>{b.text}</p>
      {b.by ? <cite>{b.by}</cite> : null}
    </blockquote>
  );
}
