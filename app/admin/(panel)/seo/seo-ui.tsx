import Link from "next/link";
import type { CSSProperties } from "react";
import { descriptionTone, scoreTone, titleTone, type AuditIssue } from "@/lib/seo-audit";

/* Server-side building blocks shared by the SEO Center pages. (Client
 * components must not import this file — lib/seo-audit pulls in Prisma.) */

export const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function SeoSubnav({ active }: { active: "overview" | "pages" }) {
  return (
    <nav className="adm-subnav" aria-label="SEO Center sections">
      <Link href="/admin/seo" className={active === "overview" ? "on" : undefined}>Overview &amp; audit</Link>
      <Link href="/admin/seo/pages" className={active === "pages" ? "on" : undefined}>Page metadata</Link>
      <Link href="/admin/seo/redirects">Redirects</Link>
    </nav>
  );
}

export function ScoreRing({ score, large = false }: { score: number | null | undefined; large?: boolean }) {
  if (score === null || score === undefined) return <span className="adm-chip muted">Not audited</span>;
  return (
    <span
      className={`adm-score ${scoreTone(score)}${large ? " lg" : ""}`}
      style={{ "--v": score } as CSSProperties}
      role="img"
      aria-label={`SEO score ${score} out of 100`}
      title={`SEO score ${score} / 100`}
    >
      <span>{score}</span>
    </span>
  );
}

/** Length chip for a rendered title (≤ 60) or description (120–160). */
export function LenChip({ kind, value }: { kind: "title" | "description"; value: string | null | undefined }) {
  if (value === null || value === undefined) return <span className="adm-chip muted">—</span>;
  const len = value.length;
  const tone = kind === "title" ? titleTone(len) : descriptionTone(len);
  const rule = kind === "title" ? "Aim for 25–60 characters" : "Aim for 120–160 characters";
  return (
    <span className={`adm-chip ${tone}`} title={rule}>
      {len === 0 ? "Missing" : `${len} chars`}
    </span>
  );
}

const LEVEL_WORD = { error: "Error", warn: "Warning", info: "Tip" } as const;

export function IssueList({ issues, empty = "No issues found on this page." }: { issues: AuditIssue[]; empty?: string }) {
  if (!issues.length) return <p className="adm-hint">{empty}</p>;
  return (
    <ul className="adm-issues seo-issues">
      {issues.map((i, n) => (
        <li key={`${i.code}-${n}`} className={i.level}>
          <div>
            <span className="seo-issue-level">{LEVEL_WORD[i.level]}</span>
            <span className="seo-issue-msg">{i.message}</span>
            {i.fix ? <span className="seo-issue-fix">How to fix: {i.fix}</span> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function editHref(path: string) {
  return `/admin/seo/pages/edit?path=${encodeURIComponent(path)}`;
}
