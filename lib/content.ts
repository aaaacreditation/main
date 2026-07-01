import { ContentStatus, type Page } from "@prisma/client";
import { prisma } from "./db";
import postsJson from "@/app/news/posts-data.json";

/**
 * Public content access with graceful degradation: reads from Postgres, and
 * falls back to the bundled posts-data.json snapshot if the database is
 * unreachable (e.g. a build/preview environment without DATABASE_URL).
 */

export interface PublicPost {
  slug: string;
  date: string; // local ISO "YYYY-MM-DDTHH:MM:SS"
  title: string;
  excerpt: string;
  content: string;
  images: string[];
  coverImage: string | null;
  category: string;
}

interface RawPost {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  images: string[];
}

function toLocalIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

const fallbackPosts: PublicPost[] = (postsJson as unknown as RawPost[])
  .map((p) => ({
    ...p,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    images: p.images ?? [],
    coverImage: p.images?.[0] ?? null,
    category: "News",
  }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export async function getPublishedPosts(): Promise<PublicPost[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map((r) => ({
      slug: r.slug,
      date: toLocalIso(r.publishedAt ?? r.createdAt),
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      images: r.images,
      coverImage: r.coverImage,
      category: r.category,
    }));
  } catch (err) {
    console.error("getPublishedPosts: falling back to bundled data —", err);
    return fallbackPosts;
  }
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  try {
    const r = await prisma.post.findFirst({
      where: { slug, status: ContentStatus.PUBLISHED },
    });
    if (!r) return null;
    return {
      slug: r.slug,
      date: toLocalIso(r.publishedAt ?? r.createdAt),
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      images: r.images,
      coverImage: r.coverImage,
      category: r.category,
    };
  } catch (err) {
    console.error("getPublishedPost: falling back to bundled data —", err);
    return fallbackPosts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getPublishedPage(slug: string): Promise<Page | null> {
  try {
    return await prisma.page.findFirst({
      where: { slug, status: ContentStatus.PUBLISHED },
    });
  } catch (err) {
    console.error("getPublishedPage failed —", err);
    return null;
  }
}
