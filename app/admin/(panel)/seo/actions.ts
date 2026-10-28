"use server";

import { revalidatePath, updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { audit, requireArea, str } from "@/lib/admin";
import { auditBaseUrl, normalizeRoutePath, recheckSeoPath } from "@/lib/seo-audit";

/* SEO Center server actions: per-path metadata overrides (SeoEntry) and
 * single-page re-checks. The public side reads SeoEntry through
 * lib/seo-overrides.ts, cached under the "seo" tag. */

const editHref = (path: string, flag: string) => `/admin/seo/pages/edit?path=${encodeURIComponent(path)}&${flag}`;

function pathFrom(formData: FormData): string {
  const path = normalizeRoutePath(str(formData, "path", 400));
  if (!path) redirect("/admin/seo/pages?error=path");
  return path;
}

function parseKeywords(v: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of v.split(/[,\n]/)) {
    const k = raw.trim().replace(/\s+/g, " ").slice(0, 80);
    if (!k || seen.has(k.toLowerCase())) continue;
    seen.add(k.toLowerCase());
    out.push(k);
    if (out.length >= 20) break;
  }
  return out;
}

/** Absolute http(s) URL, or a root-relative path (resolved against the site). */
function validCanonical(v: string): boolean {
  if (v.startsWith("/")) return normalizeRoutePath(v) !== null;
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function refreshPublic(path: string) {
  // updateTag (not revalidateTag "max"): read-your-writes, so the first view
  // after a save already shows the new metadata instead of a stale copy.
  updateTag("seo");
  revalidatePath(path);
  revalidatePath("/sitemap.xml");
}

export async function saveSeoEntry(formData: FormData) {
  const session = await requireArea("seo");
  const path = pathFrom(formData);

  const title = str(formData, "title", 200) || null;
  const description = str(formData, "description", 400) || null;
  const keywords = parseKeywords(str(formData, "keywords", 2000));
  const ogImage = str(formData, "ogImage", 600) || null;
  const canonical = str(formData, "canonical", 600) || null;
  const robots = str(formData, "robots", 20);
  const noindex = robots === "noindex" ? true : robots === "index" ? false : null;
  const notes = str(formData, "notes", 4000);

  if (canonical && !validCanonical(canonical)) redirect(editHref(path, "error=canonical"));

  const existing = await prisma.seoEntry.findUnique({ where: { path }, select: { id: true } });
  const empty = !title && !description && !keywords.length && !ogImage && !canonical && noindex === null && !notes;

  if (empty) {
    // Nothing left to override: drop the row so the page inherits everything again.
    if (existing) {
      await prisma.seoEntry.delete({ where: { id: existing.id } });
      await audit(session.user.id, "delete", "seo", existing.id, `Cleared SEO override for ${path}`);
      refreshPublic(path);
    }
    redirect(editHref(path, "removed=1"));
  }

  const data = { title, description, keywords, ogImage, canonical, noindex, notes };
  const saved = await prisma.seoEntry.upsert({ where: { path }, create: { path, ...data }, update: data });
  const changed = [
    title && "title",
    description && "description",
    keywords.length && "keywords",
    ogImage && "OG image",
    canonical && "canonical",
    noindex !== null && (noindex ? "noindex" : "index"),
  ].filter(Boolean);
  await audit(
    session.user.id,
    existing ? "update" : "create",
    "seo",
    saved.id,
    `SEO override for ${path}${changed.length ? ` (${changed.join(", ")})` : " (notes only)"}`,
  );
  refreshPublic(path);
  redirect(editHref(path, "saved=1"));
}

export async function deleteSeoEntry(formData: FormData) {
  const session = await requireArea("seo");
  const path = pathFrom(formData);
  const existing = await prisma.seoEntry.findUnique({ where: { path }, select: { id: true } });
  if (existing) {
    await prisma.seoEntry.delete({ where: { id: existing.id } });
    await audit(session.user.id, "delete", "seo", existing.id, `Removed SEO override for ${path}`);
    refreshPublic(path);
  }
  redirect(editHref(path, "removed=1"));
}

export async function recheckSeoPage(formData: FormData) {
  const session = await requireArea("seo");
  const path = pathFrom(formData);
  const baseUrl = auditBaseUrl(await headers());
  let ok = true;
  try {
    const result = await recheckSeoPath({ baseUrl, path });
    await audit(session.user.id, "audit", "seo", result.runId, `Re-checked ${path} — score ${result.score}`);
  } catch (err) {
    console.error("recheckSeoPage failed —", err);
    ok = false;
  }
  redirect(editHref(path, ok ? "checked=1" : "error=recheck"));
}
