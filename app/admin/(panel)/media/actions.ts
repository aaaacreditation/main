"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { audit, requireArea, str } from "@/lib/admin";
import { mediaUrl } from "@/lib/media";

/** Where a media URL is still referenced, so deleting it would break a page. */
async function usages(url: string) {
  const [posts, pages, stories, orgs, seo] = await Promise.all([
    prisma.post.count({ where: { OR: [{ coverImage: url }, { content: { contains: url } }] } }),
    prisma.page.count({ where: { OR: [{ heroImage: url }, { content: { contains: url } }] } }),
    prisma.caseStudy.count({ where: { OR: [{ image: url }, { logo: url }] } }),
    prisma.organization.count({ where: { logo: url } }),
    prisma.seoEntry.count({ where: { ogImage: url } }),
  ]);
  return { posts, pages, stories, orgs, seo, total: posts + pages + stories + orgs + seo };
}

export async function updateMediaAlt(formData: FormData) {
  const session = await requireArea("content");
  const id = str(formData, "id");
  const alt = str(formData, "alt", 300);
  if (!id) redirect("/admin/media");
  await prisma.media.update({ where: { id }, data: { alt } }).catch(() => null);
  await audit(session.user.id, "update", "media", id, "Updated alt text");
  revalidatePath("/admin/media");
  redirect("/admin/media?saved=1");
}

export async function deleteMedia(formData: FormData) {
  const session = await requireArea("content");
  const id = str(formData, "id");
  const media = id
    ? await prisma.media.findUnique({ where: { id }, select: { id: true, filename: true } })
    : null;
  if (!media) redirect("/admin/media");

  const used = await usages(mediaUrl(media.id, media.filename));
  if (used.total > 0) redirect(`/admin/media?inuse=${used.total}`);

  await prisma.media.delete({ where: { id } });
  await audit(session.user.id, "delete", "media", id, `Deleted ${media.filename}`);
  revalidatePath("/admin/media");
  redirect("/admin/media?deleted=1");
}
