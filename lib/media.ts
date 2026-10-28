import { slugify } from "./slug";

/**
 * Media storage for admin uploads.
 *
 * Files are stored in the Media table (bytea) and served by
 * app/media/[id]/[name]/route.ts. That works unchanged on Vercel (read-only
 * filesystem) and on the Hetzner VPS, and a single pg_dump moves the content
 * and its images together. Uploads made before Oct 27 2026 live under
 * /public/uploads and keep working wherever that folder exists.
 */

/** Vercel caps request bodies at 4.5 MB; stay safely under it. */
export const MEDIA_MAX_BYTES = 4 * 1024 * 1024;

export const MEDIA_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "application/pdf": "pdf",
};

/** Public URL of a stored file, e.g. /media/clx…/inspeed-global-logo.webp */
export function mediaUrl(id: string, filename: string): string {
  return `/media/${id}/${encodeURIComponent(filename)}`;
}

/** Safe, readable stored filename from the uploaded one. */
export function mediaFilename(original: string, mimeType: string): string {
  const ext = MEDIA_TYPES[mimeType] ?? "bin";
  const base = original.replace(/\.[a-z0-9]+$/i, "");
  return `${slugify(base).slice(0, 60) || "file"}.${ext}`;
}
