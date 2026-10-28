import { prisma } from "@/lib/db";

/**
 * Serves files uploaded through the admin (lib/media.ts). The id is the cache
 * key — a replaced image gets a new id, so responses are immutable.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string; name: string }> }) {
  const { id } = await ctx.params;
  const media = await prisma.media
    .findUnique({ where: { id }, select: { data: true, mimeType: true, filename: true } })
    .catch(() => null);
  if (!media?.data) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mimeType,
      "Content-Length": String(media.data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${media.filename}"`,
      // Uploaded SVGs can carry script; never let one run on this origin.
      "Content-Security-Policy": "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
