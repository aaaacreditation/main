import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import { mediaUrl } from "@/lib/media";
import DangerButton from "../../_components/DangerButton";
import { CopyUrlButton, MediaUploader } from "./MediaTools";
import { deleteMedia, updateMediaAlt } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Media Library" };

const PER_PAGE = 48;

const sizeFmt = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);
const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export default async function MediaAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; page?: string; saved?: string; deleted?: string; inuse?: string }>;
}) {
  await requireArea("content");
  const { q = "", type = "", page: pageParam = "1", saved, deleted, inuse } = await searchParams;
  const pageNum = Math.max(1, parseInt(pageParam, 10) || 1);

  const where: Prisma.MediaWhereInput = {
    ...(q ? { OR: [{ filename: { contains: q, mode: "insensitive" } }, { alt: { contains: q, mode: "insensitive" } }] } : {}),
    ...(type === "image" ? { mimeType: { startsWith: "image/" } } : type === "pdf" ? { mimeType: "application/pdf" } : {}),
  };

  const [total, items] = await Promise.all([
    prisma.media.count({ where }),
    prisma.media.findMany({
      where,
      // Never select `data` here — it is the file itself.
      select: { id: true, filename: true, mimeType: true, size: true, alt: true, createdAt: true, uploadedBy: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: PER_PAGE,
      skip: (pageNum - 1) * PER_PAGE,
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const href = (over: Record<string, string>) => {
    const p = new URLSearchParams({ ...(q ? { q } : {}), ...(type ? { type } : {}), ...over });
    const s = p.toString();
    return `/admin/media${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Media Library</h1>
          <p className="adm-topbar-sub">{total} file{total === 1 ? "" : "s"} · images and documents uploaded through the portal</p>
        </div>
        <MediaUploader />
      </header>

      <div className="adm-content">
        {saved ? <p className="adm-toast ok" role="status">Alt text saved.</p> : null}
        {deleted ? <p className="adm-toast" role="status">File deleted.</p> : null}
        {inuse ? (
          <p className="adm-error" role="alert">
            That file is still used in {inuse} place{inuse === "1" ? "" : "s"} (an article, page, case study, organization logo or SEO image). Replace it there first.
          </p>
        ) : null}

        <div className="adm-filters">
          <form className="adm-search" action="/admin/media" method="get">
            <input className="sme-input" type="search" name="q" defaultValue={q} placeholder="Search file name or alt text…" />
            {type ? <input type="hidden" name="type" value={type} /> : null}
            <button type="submit" className="btn btn-ghost adm-btn-sm">Search</button>
          </form>
          <div className="adm-tabs">
            <Link href={href({ type: "" })} className={"adm-tab" + (!type ? " on" : "")}>All</Link>
            <Link href={href({ type: "image" })} className={"adm-tab" + (type === "image" ? " on" : "")}>Images</Link>
            <Link href={href({ type: "pdf" })} className={"adm-tab" + (type === "pdf" ? " on" : "")}>PDFs</Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="adm-card">
            <p className="adm-empty">
              No files yet. Images uploaded from any editor (articles, case studies, directory logos, SEO) appear here too.
            </p>
          </div>
        ) : (
          <div className="adm-media-grid">
            {items.map((m) => {
              const url = mediaUrl(m.id, m.filename);
              const isImage = m.mimeType.startsWith("image/");
              return (
                <article className="adm-media-item" key={m.id}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={m.alt} loading="lazy" />
                    ) : (
                      <span className="adm-media-file">{m.filename.split(".").pop()?.toUpperCase()}</span>
                    )}
                  </a>
                  <div className="adm-media-meta">
                    <strong title={m.filename}>{m.filename}</strong>
                    <span>
                      {sizeFmt(m.size)} · {dateFmt.format(m.createdAt)}
                      {m.uploadedBy ? ` · ${m.uploadedBy.name}` : ""}
                    </span>
                    {isImage ? (
                      <form action={updateMediaAlt} style={{ display: "flex", gap: 6 }}>
                        <input type="hidden" name="id" value={m.id} />
                        <input className="sme-input" name="alt" defaultValue={m.alt} placeholder="Alt text" style={{ padding: "6px 8px", fontSize: 12 }} aria-label={`Alt text for ${m.filename}`} />
                        <button type="submit" className="adm-linkbtn">Save</button>
                      </form>
                    ) : null}
                    <div className="adm-media-actions">
                      <CopyUrlButton url={url} />
                      <form action={deleteMedia}>
                        <input type="hidden" name="id" value={m.id} />
                        <DangerButton className="adm-danger-link" confirmText={`Delete ${m.filename}?`}>Delete</DangerButton>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {pageNum > 1 ? <Link href={href({ page: String(pageNum - 1) })} className="btn btn-ghost adm-btn-sm">← Previous</Link> : <span />}
            <span className="adm-pager-info">Page {pageNum} of {pages}</span>
            {pageNum < pages ? <Link href={href({ page: String(pageNum + 1) })} className="btn btn-ghost adm-btn-sm">Next →</Link> : <span />}
          </nav>
        ) : null}
      </div>
    </>
  );
}
