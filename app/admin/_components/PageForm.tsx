"use client";

import Link from "next/link";
import { savePage } from "../actions";
import RichTextEditor from "./RichTextEditor";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

export interface PageFormData {
  id?: string;
  title?: string;
  slug?: string;
  intro?: string;
  content?: string;
  heroImage?: string | null;
  status?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export default function PageForm({ page }: { page?: PageFormData }) {
  const editing = Boolean(page?.id);

  return (
    <form action={savePage} className="adm-form">
      {editing ? <input type="hidden" name="id" value={page!.id} /> : null}

      <div className="adm-form-grid">
        <div className="adm-form-main">
          <label className="adm-label" htmlFor="pg-title">Title *</label>
          <input
            id="pg-title"
            className="sme-input adm-title-input"
            name="title"
            required
            defaultValue={page?.title || ""}
            placeholder="Page title"
          />

          <label className="adm-label" htmlFor="pg-intro">Intro</label>
          <textarea
            id="pg-intro"
            className="sme-textarea"
            name="intro"
            rows={3}
            defaultValue={page?.intro || ""}
            placeholder="Short introduction shown under the page title"
          />

          <span className="adm-label">Body</span>
          <RichTextEditor
            name="content"
            initialHTML={page?.content || ""}
            placeholder="Write the page content…"
          />
        </div>

        <aside className="adm-form-side">
          <div className="adm-panel">
            <h3>Publish</h3>
            <label className="adm-label" htmlFor="pg-status">Status</label>
            <select id="pg-status" className="sme-select" name="status" defaultValue={page?.status || "DRAFT"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
            <SubmitButton className="btn btn-primary adm-btn adm-btn-block" pendingLabel="Saving…">
              {editing ? "Save changes" : "Create page"}
            </SubmitButton>
            {editing && page?.status === "PUBLISHED" && page.slug ? (
              <Link href={`/${page.slug}`} target="_blank" className="adm-panel-link">
                View live page ↗
              </Link>
            ) : null}
          </div>

          <div className="adm-panel">
            <h3>Address</h3>
            <label className="adm-label" htmlFor="pg-slug">Slug</label>
            <input
              id="pg-slug"
              className="sme-input"
              name="slug"
              defaultValue={page?.slug || ""}
              placeholder="auto-generated from title"
            />
            <p className="adm-hint">The page is served at <code>/&lt;slug&gt;</code>. Built-in routes always take priority.</p>
          </div>

          <div className="adm-panel">
            <h3>Hero image</h3>
            <ImageField name="heroImage" label="" initial={page?.heroImage || ""} />
          </div>

          <details className="adm-panel adm-panel-details">
            <summary>SEO overrides</summary>
            <label className="adm-label" htmlFor="pg-seotitle">SEO title</label>
            <input id="pg-seotitle" className="sme-input" name="seoTitle" defaultValue={page?.seoTitle || ""} />
            <label className="adm-label" htmlFor="pg-seodesc">SEO description</label>
            <textarea id="pg-seodesc" className="sme-textarea" name="seoDescription" rows={3} defaultValue={page?.seoDescription || ""} />
          </details>
        </aside>
      </div>
    </form>
  );
}
