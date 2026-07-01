import Link from "next/link";
import { ContentStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { deletePost } from "../../actions";
import DangerButton from "../../_components/DangerButton";

export const dynamic = "force-dynamic";

const PER_PAGE = 20;

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export default async function PostsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string; saved?: string; deleted?: string }>;
}) {
  const { q = "", status = "", page: pageParam = "1", saved, deleted } = await searchParams;
  const pageNum = Math.max(1, parseInt(pageParam, 10) || 1);

  const where: Prisma.PostWhereInput = {
    ...(status === "PUBLISHED" || status === "DRAFT"
      ? { status: status as ContentStatus }
      : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [total, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: [{ publishedAt: { sort: "desc", nulls: "first" } }, { updatedAt: "desc" }],
      take: PER_PAGE,
      skip: (pageNum - 1) * PER_PAGE,
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const filterHref = (s: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (s) params.set("status", s);
    const qs = params.toString();
    return `/admin/posts${qs ? `?${qs}` : ""}`;
  };
  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    params.set("page", String(p));
    return `/admin/posts?${params.toString()}`;
  };

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>News &amp; Blog</h1>
          <p className="adm-topbar-sub">{total} article{total === 1 ? "" : "s"}</p>
        </div>
        <div className="adm-topbar-actions">
          <Link href="/admin/posts/new" className="btn btn-primary adm-btn">+ New article</Link>
        </div>
      </header>

      <div className="adm-content">
        {saved ? <p className="adm-toast ok" role="status">Article saved.</p> : null}
        {deleted ? <p className="adm-toast" role="status">Article deleted.</p> : null}

        <div className="adm-filters">
          <form className="adm-search" action="/admin/posts" method="get">
            <input className="sme-input" type="search" name="q" defaultValue={q} placeholder="Search title or slug…" />
            {status ? <input type="hidden" name="status" value={status} /> : null}
            <button type="submit" className="btn btn-ghost adm-btn-sm">Search</button>
          </form>
          <div className="adm-tabs">
            <Link href={filterHref("")} className={"adm-tab" + (!status ? " on" : "")}>All</Link>
            <Link href={filterHref("PUBLISHED")} className={"adm-tab" + (status === "PUBLISHED" ? " on" : "")}>Published</Link>
            <Link href={filterHref("DRAFT")} className={"adm-tab" + (status === "DRAFT" ? " on" : "")}>Drafts</Link>
          </div>
        </div>

        <div className="adm-card adm-card-flush">
          {posts.length === 0 ? (
            <p className="adm-empty">No articles match. <Link href="/admin/posts/new">Create the first one →</Link></p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/posts/${p.id}`} className="adm-table-title">{p.title}</Link>
                      <span className="adm-table-slug">/news/{p.slug}</span>
                    </td>
                    <td>
                      <span className={"adm-chip " + (p.status === "PUBLISHED" ? "ok" : "muted")}>
                        {p.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="adm-table-dim">{p.category}</td>
                    <td className="adm-table-dim">
                      {dateFmt.format(p.publishedAt ?? p.updatedAt)}
                    </td>
                    <td className="adm-table-actions">
                      <Link href={`/admin/posts/${p.id}`} className="adm-edit">Edit</Link>
                      <form action={deletePost}>
                        <input type="hidden" name="id" value={p.id} />
                        <DangerButton className="adm-danger-link" confirmText={`Delete “${p.title}”? This cannot be undone.`}>
                          Delete
                        </DangerButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {pageNum > 1 ? <Link href={pageHref(pageNum - 1)} className="btn btn-ghost adm-btn-sm">← Previous</Link> : <span />}
            <span className="adm-pager-info">Page {pageNum} of {pages}</span>
            {pageNum < pages ? <Link href={pageHref(pageNum + 1)} className="btn btn-ghost adm-btn-sm">Next →</Link> : <span />}
          </nav>
        ) : null}
      </div>
    </>
  );
}
