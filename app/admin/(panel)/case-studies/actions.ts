"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit, bool, int, requireArea, str } from "@/lib/admin";
import { isAllowedImageSrc } from "@/lib/case-studies";
import { slugify } from "@/lib/slug";
import { IMAGE_POSITIONS, listHref, parseTab, placementWhere } from "./shared";

/** Every public route that renders case studies, plus the admin list. */
function revalidateCaseStudies() {
  revalidatePath("/");
  revalidatePath("/programs/smes-accreditation-program");
  revalidatePath("/admin/case-studies");
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base;
  for (let i = 2; ; i++) {
    const clash = await prisma.caseStudy.findUnique({ where: { slug }, select: { id: true } });
    if (!clash || clash.id === excludeId) return slug;
    slug = `${base}-${i}`;
  }
}

const HTTP_URL = /^https?:\/\/[^\s/]+\.[^\s]+$/i;

function isSitePath(v: string) {
  return v.startsWith("/") && !v.startsWith("//") && !/\s/.test(v);
}

/* ---------------------------------------------------------------- save */

export async function saveCaseStudy(formData: FormData) {
  const session = await requireArea("case-studies");

  const id = str(formData, "id", 40);
  const back = id ? `/admin/case-studies/${id}` : "/admin/case-studies/new";
  const fail = (code: string): never => redirect(`${back}?error=${code}`);

  const existing = id ? await prisma.caseStudy.findUnique({ where: { id } }) : null;
  if (id && !existing) redirect("/admin/case-studies?error=notfound");

  const name = str(formData, "name", 200);
  const sector = str(formData, "sector", 120);
  const country = str(formData, "country", 160);
  const metric = str(formData, "metric", 200);
  const quote = str(formData, "quote", 2000);
  const description = str(formData, "description", 3000);
  const image = str(formData, "image", 600) || null;
  const imageAlt = str(formData, "imageAlt", 300);
  const imagePosition = str(formData, "imagePosition", 40);
  const logo = str(formData, "logo", 600) || null;
  const logoTight = bool(formData, "logoTight");
  const initials = str(formData, "initials", 6);
  const videoUrl = str(formData, "videoUrl", 500) || null;
  const link = str(formData, "link", 500) || null;
  const featured = bool(formData, "featured");
  const showOnHome = bool(formData, "showOnHome");
  const showOnSme = bool(formData, "showOnSme");
  const status = str(formData, "status") === "PUBLISHED" ? ContentStatus.PUBLISHED : ContentStatus.DRAFT;

  if (!name) fail("name");
  // Both cards render through next/image, which only accepts site paths and
  // the hosts in next.config.ts — a pasted external URL would break the page.
  if (image && !isAllowedImageSrc(image)) fail("image-src");
  if (logo && !isAllowedImageSrc(logo)) fail("logo-src");
  if (showOnHome && (!image || !imageAlt || !logo)) fail("home-media");
  if (showOnSme && !image) fail("sme-image");
  if (videoUrl && !HTTP_URL.test(videoUrl)) fail("video");
  if (link && !HTTP_URL.test(link) && !isSitePath(link)) fail("link");
  // Lands in an inline style, so only the listed values (or the stored one) pass.
  if (
    !IMAGE_POSITIONS.some((p) => p.value === imagePosition) &&
    imagePosition !== existing?.imagePosition
  ) {
    fail("position");
  }

  // Blank order: keep the current one, or append to the end of the placement.
  let order: number;
  if (str(formData, "order", 12) !== "") {
    order = Math.max(-100_000, Math.min(100_000, int(formData, "order", 0)));
  } else if (existing) {
    order = existing.order;
  } else {
    const { _max } = await prisma.caseStudy.aggregate({
      _max: { order: true },
      where: showOnHome ? { showOnHome: true } : showOnSme ? { showOnSme: true } : {},
    });
    order = (_max.order ?? -1) + 1;
  }

  const slug = await uniqueSlug(slugify(str(formData, "slug", 120) || name), existing?.id);

  const data = {
    slug,
    name,
    sector,
    country,
    metric,
    quote,
    description,
    image,
    imageAlt,
    imagePosition,
    logo,
    logoTight,
    initials,
    videoUrl,
    link,
    featured,
    showOnHome,
    showOnSme,
    order,
    status,
  };

  if (existing) {
    await prisma.caseStudy.update({ where: { id: existing.id }, data });
    await audit(session.user.id, "update", "case-study", existing.id, `Updated case study “${name}”`);
  } else {
    const created = await prisma.caseStudy.create({ data });
    await audit(session.user.id, "create", "case-study", created.id, `Added case study “${name}”`);
  }

  revalidateCaseStudies();
  redirect("/admin/case-studies?saved=1");
}

/* -------------------------------------------------------------- delete */

export async function deleteCaseStudy(formData: FormData) {
  const session = await requireArea("case-studies");
  const id = str(formData, "id", 40);
  const tab = parseTab(str(formData, "tab", 20));
  if (!id) redirect(listHref(tab));

  const row = await prisma.caseStudy.delete({ where: { id } }).catch(() => null);
  if (!row) redirect(listHref(tab, { error: "notfound" }));

  await audit(session.user.id, "delete", "case-study", id, `Deleted case study “${row.name}”`);
  revalidateCaseStudies();
  redirect(listHref(tab, { deleted: "1" }));
}

/* ------------------------------------------------------------- reorder */

/**
 * Moves a row one step up or down within the current placement tab. The
 * sorted order values of that tab are kept in place and handed out again in
 * the new sequence, so only the two swapped rows normally change (ties from
 * hand-typed orders are spread out to keep the sequence strict).
 */
export async function moveCaseStudy(formData: FormData) {
  const session = await requireArea("case-studies");
  const id = str(formData, "id", 40);
  const dir = str(formData, "dir", 4) === "up" ? -1 : 1;
  const tab = parseTab(str(formData, "tab", 20));

  const rows = await prisma.caseStudy.findMany({
    where: placementWhere(tab),
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true, order: true },
  });
  const from = rows.findIndex((r) => r.id === id);
  const to = from + dir;
  if (from < 0 || to < 0 || to >= rows.length) redirect(listHref(tab));

  const values = rows.map((r) => r.order);
  const next = [...rows];
  [next[from], next[to]] = [next[to], next[from]];

  let prev = Number.NEGATIVE_INFINITY;
  const updates = [];
  for (let i = 0; i < next.length; i++) {
    const value = Math.max(values[i], prev + 1);
    prev = value;
    if (value !== next[i].order) {
      updates.push(prisma.caseStudy.update({ where: { id: next[i].id }, data: { order: value } }));
    }
  }
  if (updates.length) await prisma.$transaction(updates);

  await audit(
    session.user.id,
    "reorder",
    "case-study",
    id,
    `Moved “${rows[from].name}” ${dir < 0 ? "up" : "down"} (${tab || "all"} list)`,
  );
  revalidateCaseStudies();
  redirect(listHref(tab, { moved: id }));
}
