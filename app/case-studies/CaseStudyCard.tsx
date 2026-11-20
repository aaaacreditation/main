import Image from "next/image";
import Link from "@/app/_components/SiteLink";
import Glyph from "../_components/site/Glyph";
import type { CaseStudyArticle } from "@/lib/case-studies";

/** First label of the organization's sector ("Training & Education Provider · Healthcare" → the first). */
export const sectorTag = (sector: string) => sector.split(/[·,]/)[0].trim();

/**
 * A case study in the index and "more case studies" grids — the SME blue card
 * with the cover photo inset at the top.
 */
export default function CaseStudyCard({ a, sizes }: { a: CaseStudyArticle; sizes: string }) {
  return (
    <Link href={`/case-studies/${a.slug}`} className="ax-card navy ax-blue reveal csx-card">
      <span className="csx-card-media">
        {a.image ? (
          <Image src={a.image} alt={a.imageAlt || a.name} fill sizes={sizes} />
        ) : (
          <span className="csx-card-mono" aria-hidden="true">
            {a.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="csx-card-body">
        {a.sector && <span className="ax-blue-tag">{sectorTag(a.sector)}</span>}
        <h3>{a.title}</h3>
        <span className="csx-card-org">
          {a.name}
          {a.country && <> · {a.country}</>}
        </span>
        {a.excerpt && a.excerpt !== a.title && <p>{a.excerpt}</p>}
        <span className="csx-card-go">
          Read the case study <Glyph name="arrow-right" size={14} strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
}
