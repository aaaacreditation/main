"use client";

import Link from "next/link";
import { savePost } from "../actions";
import RichTextEditor from "./RichTextEditor";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

export interface PostFormData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  category?: string;
  tags?: string[];
  status?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export default function PostForm({ post }: { post?: PostFormData }) {
  const editing = Boolean(post?.id);

  return (
    <form action={savePost} className="adm-form">
      {editing ? <input type="hidden" name="id" value={post!.id} /> : null}

      <div className="adm-form-grid">
        <div className="adm-form-main">
          <label className="adm-label" htmlFor="pf-title">Title *</label>
          <input
            id="pf-title"
            className="sme-input adm-title-input"
            name="title"
            required
            defaultValue={post?.title || ""}
            placeholder="Article headline"
          />

          <label className="adm-label" htmlFor="pf-excerpt">Excerpt</label>
          <textarea
            id="pf-excerpt"
            className="sme-textarea"
            name="excerpt"
            rows={3}
            defaultValue={post?.excerpt || ""}
            placeholder="Short summary shown on listing cards and in search results"
          />

          <span className="adm-label">Body</span>
          <RichTextEditor
            name="content"
            initialHTML={post?.content || ""}
            placeholder="Write the article…"
          />
        </div>

        <aside className="adm-form-side">
          <div className="adm-panel">
            <h3>Publish</h3>
            <label className="adm-label" htmlFor="pf-status">Status</label>
            <select id="pf-status" className="sme-select" name="status" defaultValue={post?.status || "DRAFT"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
            <SubmitButton className="btn btn-primary adm-btn adm-btn-block" pendingLabel="Saving…">
              {editing ? "Save changes" : "Create article"}
            </SubmitButton>
            {editing && post?.status === "PUBLISHED" && post.slug ? (
              <Link href={`/news/${post.slug}`} target="_blank" className="adm-panel-link">
                View live article ↗
              </Link>
            ) : null}
          </div>

          <div className="adm-panel">
            <h3>Organize</h3>
            <label className="adm-label" htmlFor="pf-slug">Slug</label>
            <input
              id="pf-slug"
              className="sme-input"
              name="slug"
              defaultValue={post?.slug || ""}
              placeholder="auto-generated from title"
            />
            <label className="adm-label" htmlFor="pf-category">Category</label>
            <input
              id="pf-category"
              className="sme-input"
              name="category"
              list="pf-categories"
              defaultValue={post?.category || "News"}
            />
            <datalist id="pf-categories">
              <option value="News" />
              <option value="Announcements" />
              <option value="Insights" />
              <option value="Events" />
            </datalist>
            <label className="adm-label" htmlFor="pf-tags">Tags</label>
            <input
              id="pf-tags"
              className="sme-input"
              name="tags"
              defaultValue={(post?.tags || []).join(", ")}
              placeholder="accreditation, healthcare"
            />
          </div>

          <div className="adm-panel">
            <h3>Cover image</h3>
            <ImageField name="coverImage" label="" initial={post?.coverImage || ""} />
          </div>

          <details className="adm-panel adm-panel-details">
            <summary>SEO overrides</summary>
            <label className="adm-label" htmlFor="pf-seotitle">SEO title</label>
            <input id="pf-seotitle" className="sme-input" name="seoTitle" defaultValue={post?.seoTitle || ""} />
            <label className="adm-label" htmlFor="pf-seodesc">SEO description</label>
            <textarea id="pf-seodesc" className="sme-textarea" name="seoDescription" rows={3} defaultValue={post?.seoDescription || ""} />
          </details>
        </aside>
      </div>
    </form>
  );
}
