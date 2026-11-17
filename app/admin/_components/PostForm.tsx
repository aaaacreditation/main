"use client";

import Link from "next/link";
import { useState } from "react";
import { savePost } from "../actions";
import TagPicker from "./TagPicker";
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

/** A category from Admin → Categories & Tags, and the Resources page that lists it. */
export type CategoryOption = { name: string; section: "news" | "articles" };

const SECTION_LABEL = { news: "News & Announcements", articles: "Articles" } as const;

export default function PostForm({
  post,
  categories = [],
  tagSuggestions = [],
}: {
  post?: PostFormData;
  categories?: CategoryOption[];
  tagSuggestions?: string[];
}) {
  const editing = Boolean(post?.id);
  // An imported article can carry a category that is not in the list yet;
  // it stays selectable and is added to the list on save.
  const current = post?.category || "News";
  const known = categories.find((c) => c.name.toLowerCase() === current.toLowerCase());
  const [category, setCategory] = useState(known?.name ?? current);
  const extra = known ? null : current;

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
            <select
              id="pf-category"
              className="sme-select"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {(["news", "articles"] as const).map((sec) => (
                <optgroup key={sec} label={SECTION_LABEL[sec]}>
                  {categories
                    .filter((c) => c.section === sec)
                    .map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </optgroup>
              ))}
              {extra ? <option value={extra}>{extra} (not in the list yet)</option> : null}
              <option value="__new">+ New category…</option>
            </select>
            {category === "__new" ? (
              <div className="adm-newterm">
                <input
                  className="sme-input"
                  name="newCategory"
                  maxLength={60}
                  required
                  autoFocus
                  placeholder="New category name"
                  aria-label="New category name"
                />
                <select className="sme-select" name="newCategorySection" defaultValue="articles" aria-label="Listed on">
                  <option value="news">Listed on {SECTION_LABEL.news}</option>
                  <option value="articles">Listed on {SECTION_LABEL.articles}</option>
                </select>
              </div>
            ) : (
              <p className="adm-hint">
                Listed on{" "}
                {SECTION_LABEL[categories.find((c) => c.name === category)?.section ?? "news"]}.{" "}
                <Link href="/admin/taxonomy?tab=categories">Manage categories</Link>
              </p>
            )}
            <span className="adm-label">Tags</span>
            <TagPicker name="tags" initial={post?.tags || []} suggestions={tagSuggestions} />
            <p className="adm-hint">
              <Link href="/admin/taxonomy?tab=tags">Manage tags</Link>
            </p>
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
