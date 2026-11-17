"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TermKind } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit, requireArea, str } from "@/lib/admin";
import { recordSlugChange } from "@/lib/seo-overrides";
import { isSection, termSlug } from "@/lib/taxonomy";
import { isRegisterType } from "@/app/_data/accredited-organizations";
import { TAB_KIND, kindTab, type TaxonomyTab } from "./shared";

/*
 * Admin → Categories & Tags (Nov 2026). Posts store their category and tag
 * NAMES and organizations store register-tag SLUGS, so a rename or delete here
 * rewrites those strings in the same request — the public pages never see a
 * term that no longer exists.
 */

const back = (tab: TaxonomyTab, q: Record<string, string>) =>
  `/admin/taxonomy?${new URLSearchParams({ tab, ...q }).toString()}`;

function parseKind(formData: FormData) {
  const tab = str(formData, "tab", 20) as TaxonomyTab;
  const kind = TAB_KIND[tab];
  if (!kind) redirect("/admin/taxonomy");
  return { tab, kind };
}

/** Blog terms need the content area; register tags the directory area. */
async function guard(kind: TermKind) {
  return requireArea(kind === TermKind.ORG_TAG ? "directory" : "content");
}

function revalidateKind(kind: TermKind) {
  if (kind === TermKind.ORG_TAG) {
    revalidatePath("/directory/accredited-organizations");
    revalidatePath("/admin/directory", "layout");
  } else {
    revalidatePath("/news", "layout");
    revalidatePath("/articles", "layout");
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/posts", "layout");
  }
  revalidatePath("/admin/taxonomy");
}

/** Slug problems shared by create and rename. */
async function slugError(kind: TermKind, slug: string, excludeId?: string): Promise<string | null> {
  if (!slug || slug === "untitled") return "name";
  if (kind === TermKind.ORG_TAG && isRegisterType(slug)) return "builtin";
  const clash = await prisma.term.findUnique({ where: { kind_slug: { kind, slug } }, select: { id: true } });
  return clash && clash.id !== excludeId ? "exists" : null;
}

/* ---------------------------------------------------------------- create */

export async function createTerm(formData: FormData) {
  const { tab, kind } = parseKind(formData);
  const session = await guard(kind);
  const name = str(formData, "name", 60).replace(/\s+/g, " ");
  const slug = termSlug(name);
  const err = await slugError(kind, slug);
  if (err) redirect(back(tab, { error: err }));
  const section = str(formData, "section", 20);
  const { _max } = await prisma.term.aggregate({ where: { kind }, _max: { order: true } });
  const row = await prisma.term.create({
    data: { kind, name, slug, section: isSection(section) ? section : "news", order: (_max.order ?? -1) + 1 },
  });
  await audit(session.user.id, "create", "term", row.id, `Added ${kindTab(kind).one} “${name}”`);
  revalidateKind(kind);
  redirect(back(tab, { saved: "created" }));
}

/* ---------------------------------------------------------------- update */

export async function updateTerm(formData: FormData) {
  const { tab, kind } = parseKind(formData);
  const session = await guard(kind);
  const id = str(formData, "id", 40);
  const term = await prisma.term.findUnique({ where: { id } });
  if (!term || term.kind !== kind) redirect(back(tab, { error: "notfound" }));

  const name = str(formData, "name", 60).replace(/\s+/g, " ") || term.name;
  const slug = termSlug(name);
  const sectionRaw = str(formData, "section", 20);
  const section = kind === TermKind.POST_CATEGORY && isSection(sectionRaw) ? sectionRaw : term.section;
  if (slug !== term.slug) {
    const err = await slugError(kind, slug, term.id);
    if (err) redirect(back(tab, { error: err }));
  }

  await prisma.$transaction(async (tx) => {
    await tx.term.update({ where: { id }, data: { name, slug, section } });
    if (name === term.name && slug === term.slug) return;
    if (kind === TermKind.POST_CATEGORY) {
      const posts = await tx.post.findMany({ select: { id: true, category: true } });
      const ids = posts.filter((p) => termSlug(p.category || "News") === term.slug).map((p) => p.id);
      if (ids.length) await tx.post.updateMany({ where: { id: { in: ids } }, data: { category: name } });
    } else if (kind === TermKind.POST_TAG) {
      const posts = await tx.post.findMany({ where: { tags: { isEmpty: false } }, select: { id: true, tags: true } });
      for (const p of posts) {
        if (!p.tags.some((t) => termSlug(t) === term.slug)) continue;
        const tags = [...new Set(p.tags.map((t) => (termSlug(t) === term.slug ? name : t)))];
        await tx.post.update({ where: { id: p.id }, data: { tags } });
      }
    } else if (slug !== term.slug) {
      const orgs = await tx.organization.findMany({ where: { tags: { has: term.slug } }, select: { id: true, tags: true } });
      for (const o of orgs) {
        await tx.organization.update({
          where: { id: o.id },
          data: { tags: [...new Set(o.tags.map((t) => (t === term.slug ? slug : t)))] },
        });
      }
    }
  });

  // An indexed or linked category/tag page keeps working at its old URL.
  if (slug !== term.slug && kind !== TermKind.ORG_TAG) {
    const seg = kind === TermKind.POST_CATEGORY ? "category" : "tag";
    await recordSlugChange(`/news/${seg}/${term.slug}`, `/news/${seg}/${slug}`);
  }
  await audit(
    session.user.id,
    "update",
    "term",
    id,
    name !== term.name ? `Renamed ${kindTab(kind).one} “${term.name}” to “${name}”` : `Updated ${kindTab(kind).one} “${name}”`
  );
  revalidateKind(kind);
  redirect(back(tab, { saved: "updated" }));
}

/* ---------------------------------------------------------------- delete */

export async function deleteTerm(formData: FormData) {
  const { tab, kind } = parseKind(formData);
  const session = await guard(kind);
  const id = str(formData, "id", 40);
  const term = await prisma.term.findUnique({ where: { id } });
  if (!term || term.kind !== kind) redirect(back(tab, { error: "notfound" }));

  let moved = 0;
  await prisma.$transaction(async (tx) => {
    if (kind === TermKind.POST_CATEGORY) {
      const posts = await tx.post.findMany({ select: { id: true, category: true } });
      const ids = posts.filter((p) => termSlug(p.category || "News") === term.slug).map((p) => p.id);
      if (ids.length) {
        // A category in use needs somewhere for its articles to go.
        const target = await tx.term.findUnique({ where: { id: str(formData, "moveTo", 40) } });
        if (!target || target.kind !== kind || target.id === term.id) throw new Error("move-target");
        await tx.post.updateMany({ where: { id: { in: ids } }, data: { category: target.name } });
        moved = ids.length;
      }
    } else if (kind === TermKind.POST_TAG) {
      const posts = await tx.post.findMany({ where: { tags: { isEmpty: false } }, select: { id: true, tags: true } });
      for (const p of posts) {
        const tags = p.tags.filter((t) => termSlug(t) !== term.slug);
        if (tags.length !== p.tags.length) {
          await tx.post.update({ where: { id: p.id }, data: { tags } });
          moved++;
        }
      }
    } else {
      const orgs = await tx.organization.findMany({ where: { tags: { has: term.slug } }, select: { id: true, tags: true } });
      for (const o of orgs) {
        await tx.organization.update({ where: { id: o.id }, data: { tags: o.tags.filter((t) => t !== term.slug) } });
        moved++;
      }
    }
    await tx.term.delete({ where: { id } });
  }).catch((err: Error) => {
    if (err.message === "move-target") redirect(back(tab, { error: "move" }));
    throw err;
  });

  await audit(
    session.user.id,
    "delete",
    "term",
    id,
    `Deleted ${kindTab(kind).one} “${term.name}”${moved ? ` (${moved} item${moved === 1 ? "" : "s"} updated)` : ""}`
  );
  revalidateKind(kind);
  redirect(back(tab, { saved: "deleted" }));
}

/* ----------------------------------------------------------------- order */

export async function moveTerm(formData: FormData) {
  const { tab, kind } = parseKind(formData);
  await guard(kind);
  const id = str(formData, "id", 40);
  const dir = str(formData, "dir", 4) === "up" ? -1 : 1;
  const rows = await prisma.term.findMany({ where: { kind }, orderBy: [{ order: "asc" }, { name: "asc" }] });
  const i = rows.findIndex((r) => r.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= rows.length) redirect(back(tab, {}));
  [rows[i], rows[j]] = [rows[j], rows[i]];
  await prisma.$transaction(rows.map((r, order) => prisma.term.update({ where: { id: r.id }, data: { order } })));
  revalidateKind(kind);
  redirect(back(tab, {}));
}
