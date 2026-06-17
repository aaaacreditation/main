import postsJson from "./posts-data.json";

export interface Post {
  slug: string;
  date: string; // ISO "YYYY-MM-DDTHH:MM:SS"
  title: string;
  excerpt: string;
  content: string;
  images: string[];
}

/** All real posts migrated from the old WordPress site, newest first. */
export const posts: Post[] = (postsJson as unknown as Post[])
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formats "2026-06-12T11:25:20" as "June 12, 2026" (no timezone drift). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
