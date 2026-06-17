import Link from "next/link";
import PageHero from "./PageHero";
import PageBody from "./PageBody";
import Icon from "./Icon";
import CTA from "./CTA";

export default function ProgramPage({
  eyebrow = "Accreditation Program",
  standard,
  title,
  intro,
  overview,
  whoFor,
  scope,
  scopeHeading = "Scope of accreditation",
  benefits,
  documents,
  documentsHeading = "Related documents",
  related,
}: {
  eyebrow?: string;
  standard?: string;
  title: React.ReactNode;
  intro: string;
  overview?: string[];
  whoFor?: string[];
  scope?: string[];
  scopeHeading?: string;
  benefits?: string[];
  documents?: { label: string; href: string; meta?: string }[];
  documentsHeading?: string;
  related?: { href: string; label: string }[];
}) {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        crumbs={[{ href: "/programs/healthcare", label: "Programs" }, { label: typeof title === "string" ? title : "Program" }]}
        meta={
          standard
            ? [
                { k: "Anchor standard", v: standard },
                { k: "Audit cycle", v: "3-year accreditation cycle" },
              ]
            : undefined
        }
      />
      <PageBody label="Program overview">
        {overview && overview.map((p) => <p key={p}>{p}</p>)}

        {whoFor && whoFor.length > 0 && (
          <>
            <h2 style={overview ? { marginTop: 48 } : undefined}>Who this program is for</h2>
            <ul className="bullets">
              {whoFor.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </>
        )}

        {scope && scope.length > 0 && (
          <>
            <h2 style={{ marginTop: 48 }}>{scopeHeading}</h2>
            <ul className="bullets">
              {scope.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </>
        )}

        {benefits && benefits.length > 0 && (
          <>
            <h2 style={{ marginTop: 48 }}>Benefits of AAA accreditation</h2>
            <ul className="bullets">
              {benefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </>
        )}

        {documents && documents.length > 0 && (
          <>
            <h2 style={{ marginTop: 48 }}>{documentsHeading}</h2>
            <ul className="doc-list" style={{ marginTop: 8 }}>
              {documents.map((d) => (
                <li key={d.label}>
                  <span className="ico"><Icon name="doc" size={18} /></span>
                  <div>
                    <div className="ttl">{d.label}</div>
                    {d.meta && <div className="meta">{d.meta}</div>}
                  </div>
                  <a href={d.href} className="dl">
                    Download <Icon name="download" size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/quote" className="btn btn-primary">
            Request a Quote <Icon name="arrow" size={14} className="arrow" />
          </Link>
          <Link href="/apply" className="btn btn-ghost">Apply for Accreditation</Link>
        </div>

        {related && related.length > 0 && (
          <>
            <h2 style={{ marginTop: 56 }}>Related programs</h2>
            <ul className="bullets">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="ed-link">{r.label}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </PageBody>
      <CTA />
    </>
  );
}
