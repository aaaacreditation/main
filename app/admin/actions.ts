"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContentStatus, LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { slugify } from "@/lib/slug";
import { signOut } from "@/auth";

/* ---------- shared helpers ---------- */

function str(formData: FormData, key: string, max = 100_000): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function parseStatus(v: string): ContentStatus {
  return v === "PUBLISHED" ? ContentStatus.PUBLISHED : ContentStatus.DRAFT;
}

function parseTags(v: string): string[] {
  return v
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 20);
}

async function uniquePostSlug(base: string, excludeId?: string) {
  let slug = base;
  for (let i = 2; ; i++) {
    const clash = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
    if (!clash || clash.id === excludeId) return slug;
    slug = `${base}-${i}`;
  }
}

async function uniquePageSlug(base: string, excludeId?: string) {
  let slug = base;
  for (let i = 2; ; i++) {
    const clash = await prisma.page.findUnique({ where: { slug }, select: { id: true } });
    if (!clash || clash.id === excludeId) return slug;
    slug = `${base}-${i}`;
  }
}

function revalidateNews(slug?: string) {
  revalidatePath("/news");
  if (slug) revalidatePath(`/news/${slug}`);
  revalidatePath("/"); // home shows latest insights
}

/* ---------- session ---------- */

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

/* ---------- posts ---------- */

export async function savePost(formData: FormData) {
  const session = await requireAdmin();

  const id = str(formData, "id");
  const title = str(formData, "title", 300);
  if (!title) redirect(id ? `/admin/posts/${id}?error=title` : "/admin/posts/new?error=title");

  const requestedSlug = slugify(str(formData, "slug", 200) || title);
  const status = parseStatus(str(formData, "status"));
  const content = str(formData, "content");
  const excerpt = str(formData, "excerpt", 800);
  const coverImage = str(formData, "coverImage", 600) || null;
  const category = str(formData, "category", 80) || "News";
  const tags = parseTags(str(formData, "tags", 600));
  const seoTitle = str(formData, "seoTitle", 200) || null;
  const seoDescription = str(formData, "seoDescription", 400) || null;

  let slug: string;
  if (id) {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) redirect("/admin/posts?error=notfound");
    slug = await uniquePostSlug(requestedSlug, id);
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags,
        status,
        seoTitle,
        seoDescription,
        publishedAt:
          status === ContentStatus.PUBLISHED
            ? existing.publishedAt ?? new Date()
            : existing.publishedAt,
      },
    });
    if (existing.slug !== slug) revalidatePath(`/news/${existing.slug}`);
  } else {
    slug = await uniquePostSlug(requestedSlug);
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags,
        status,
        seoTitle,
        seoDescription,
        publishedAt: status === ContentStatus.PUBLISHED ? new Date() : null,
        authorId: session.user.id ?? null,
      },
    });
  }

  revalidateNews(slug);
  redirect("/admin/posts?saved=1");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) redirect("/admin/posts");
  const post = await prisma.post.delete({ where: { id } }).catch(() => null);
  revalidateNews(post?.slug);
  redirect("/admin/posts?deleted=1");
}

/* ---------- pages ---------- */

export async function savePage(formData: FormData) {
  await requireAdmin();

  const id = str(formData, "id");
  const title = str(formData, "title", 300);
  if (!title) redirect(id ? `/admin/pages/${id}?error=title` : "/admin/pages/new?error=title");

  const requestedSlug = slugify(str(formData, "slug", 200) || title);
  const status = parseStatus(str(formData, "status"));
  const data = {
    title,
    intro: str(formData, "intro", 800),
    content: str(formData, "content"),
    heroImage: str(formData, "heroImage", 600) || null,
    status,
    seoTitle: str(formData, "seoTitle", 200) || null,
    seoDescription: str(formData, "seoDescription", 400) || null,
  };

  let slug: string;
  if (id) {
    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) redirect("/admin/pages?error=notfound");
    slug = await uniquePageSlug(requestedSlug, id);
    await prisma.page.update({ where: { id }, data: { ...data, slug } });
    if (existing.slug !== slug) revalidatePath(`/${existing.slug}`);
  } else {
    slug = await uniquePageSlug(requestedSlug);
    await prisma.page.create({ data: { ...data, slug } });
  }

  revalidatePath(`/${slug}`);
  redirect("/admin/pages?saved=1");
}

export async function deletePage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) redirect("/admin/pages");
  const page = await prisma.page.delete({ where: { id } }).catch(() => null);
  if (page) revalidatePath(`/${page.slug}`);
  redirect("/admin/pages?deleted=1");
}

/* ---------- leads ---------- */

export async function updateLead(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const status = str(formData, "status") as LeadStatus;
  const notes = str(formData, "notes", 4000);
  if (!id || !Object.values(LeadStatus).includes(status)) redirect("/admin/leads");
  await prisma.lead.update({ where: { id }, data: { status, notes } }).catch(() => null);
  revalidatePath("/admin/leads");
  redirect("/admin/leads?saved=1");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await prisma.lead.delete({ where: { id } }).catch(() => null);
  revalidatePath("/admin/leads");
  redirect("/admin/leads?deleted=1");
}
