"use client";

import { useState } from "react";
import ImageField from "../../../../_components/ImageField";
import SubmitButton from "../../../../_components/SubmitButton";
import { saveSeoEntry } from "../../actions";

type Tone = "ok" | "warn" | "err";

export interface SeoLimits {
  titleMin: number;
  titleMax: number;
  descMin: number;
  descMax: number;
}

export interface SeoEntryFormProps {
  path: string;
  siteUrl: string;
  /** Appended to every title by the site layout (" | AAA"). */
  suffix: string;
  limits: SeoLimits;
  initial: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    canonical: string;
    robots: "inherit" | "index" | "noindex";
    notes: string;
  };
  /** What the page shows today (last audit), used as the preview fallback. */
  live: { title: string; description: string } | null;
  hasEntry: boolean;
}

/** Override editor with a live Google result preview. */
export default function SeoEntryForm({ path, siteUrl, suffix, limits, initial, live, hasEntry }: SeoEntryFormProps) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);

  const tTrim = title.trim();
  const dTrim = description.trim();
  const shownTitle = tTrim ? `${tTrim}${suffix}` : live?.title || "";
  const shownDesc = dTrim || live?.description || "";
  const titleLen = shownTitle.length;
  const descLen = shownDesc.length;

  const titleTone: Tone =
    titleLen === 0 || titleLen > limits.titleMax + 10 ? "err" : titleLen > limits.titleMax || titleLen < limits.titleMin ? "warn" : "ok";
  const descTone: Tone =
    descLen === 0 || descLen < 70 || descLen > 200 ? "err" : descLen < limits.descMin || descLen > limits.descMax ? "warn" : "ok";
  const toneClass = (t: Tone) => (t === "ok" ? "" : ` ${t}`);
  const doubleSuffix = suffix.trim() !== "" && tTrim.toLowerCase().endsWith(suffix.trim().toLowerCase());

  let host = siteUrl;
  try {
    host = new URL(siteUrl).host;
  } catch {
    /* keep */
  }
  const crumbs = path === "/" ? "" : path.split("/").filter(Boolean).map(decodeURIComponentSafe).join(" › ");

  return (
    <form action={saveSeoEntry} className="adm-form">
      <input type="hidden" name="path" value={path} />

      <h3 className="adm-section-title">Google preview</h3>
      <div className="seo-serp-wrap">
        <div className="adm-serp" aria-live="polite">
          <div className="adm-serp-url">
            {host}
            {crumbs ? ` › ${crumbs}` : ""}
          </div>
          <div className="adm-serp-title">{shownTitle || "No title — Google will make one up"}</div>
          <div className="adm-serp-desc">{shownDesc || "No description — Google will show a random snippet of the page's text."}</div>
        </div>
        <p className="adm-hint">
          {tTrim || dTrim
            ? "Updates as you type. Google may still rewrite titles or descriptions it finds unhelpful."
            : "This is what the page shows today. Type below to override it."}
        </p>
      </div>

      <h3 className="adm-section-title">Search result</h3>
      <label className="adm-label" htmlFor="seo-title">
        SEO title
        <span className={`adm-counter${toneClass(titleTone)}`}>
          {titleLen} / {limits.titleMax}
          {tTrim ? ` incl. “${suffix.trim()}”` : ""}
        </span>
      </label>
      <input
        id="seo-title"
        className="sme-input"
        name="title"
        value={title}
        maxLength={200}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={live?.title ? live.title.replace(new RegExp(`${escapeRe(suffix)}$`), "") : "e.g. Healthcare Accreditation for Hospitals & Clinics"}
      />
      <p className="adm-hint">
        Leave blank to keep the page&apos;s built-in title. The site adds “{suffix.trim()}” to the end automatically, so aim for{" "}
        {limits.titleMax - suffix.length} characters or fewer here, with the main topic first.
      </p>
      {doubleSuffix ? (
        <p className="adm-hint" style={{ color: "var(--danger)" }}>
          Remove “{suffix.trim()}” from the end — it is added automatically and would appear twice.
        </p>
      ) : null}

      <label className="adm-label" htmlFor="seo-desc">
        Meta description
        <span className={`adm-counter${toneClass(descTone)}`}>
          {descLen} / {limits.descMin}–{limits.descMax}
        </span>
      </label>
      <textarea
        id="seo-desc"
        className="sme-textarea"
        name="description"
        rows={3}
        maxLength={400}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={live?.description || "One or two sentences: what this page offers and who it is for."}
      />
      <p className="adm-hint">Shown under the title in Google. Write for people: what they will find and why it matters.</p>

      <label className="adm-label" htmlFor="seo-keywords">Keywords</label>
      <input
        id="seo-keywords"
        className="sme-input"
        name="keywords"
        defaultValue={initial.keywords}
        placeholder="healthcare accreditation, hospital accreditation"
      />
      <p className="adm-hint">Optional, comma separated. Google doesn&apos;t rank on these, but some other search tools read them.</p>

      <h3 className="adm-section-title">Social sharing</h3>
      <ImageField name="ogImage" label="Sharing image (OG image)" initial={initial.ogImage} />
      <p className="adm-hint">Shown when the page is shared on LinkedIn, WhatsApp, X or Facebook. 1200 × 630 px works best.</p>

      <h3 className="adm-section-title">Indexing</h3>
      <div className="adm-fields">
        <div>
          <label className="adm-label" htmlFor="seo-robots">Search engines</label>
          <select id="seo-robots" className="sme-select" name="robots" defaultValue={initial.robots}>
            <option value="inherit">Use the page&apos;s default</option>
            <option value="index">Index — show this page in Google</option>
            <option value="noindex">Noindex — hide from Google and the sitemap</option>
          </select>
        </div>
        <div>
          <label className="adm-label" htmlFor="seo-canonical">Canonical address</label>
          <input
            id="seo-canonical"
            className="sme-input"
            name="canonical"
            defaultValue={initial.canonical}
            placeholder={path === "/" ? siteUrl : `${siteUrl}${path}`}
          />
        </div>
      </div>
      <p className="adm-hint">
        Leave the canonical blank — the page then points to itself, which is almost always right. Only set it when this page
        is a copy of another one; use the full address (https://…).
      </p>

      <h3 className="adm-section-title">Internal notes</h3>
      <textarea
        className="sme-textarea"
        name="notes"
        rows={3}
        maxLength={4000}
        defaultValue={initial.notes}
        placeholder="Why this override exists, who asked for it… (never shown on the website)"
        aria-label="Internal notes"
      />

      <div className="seo-actions">
        <SubmitButton className="btn btn-primary adm-btn" pendingLabel="Saving…">
          {hasEntry ? "Save override" : "Create override"}
        </SubmitButton>
        <span className="adm-table-dim">Changes reach the live page within a minute.</span>
      </div>
    </form>
  );
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeURIComponentSafe(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
