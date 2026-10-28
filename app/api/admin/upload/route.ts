import { NextResponse } from "next/server";
import { canAccess, getStaffSession } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { MEDIA_MAX_BYTES, MEDIA_TYPES, mediaFilename, mediaUrl } from "@/lib/media";

/**
 * Admin upload endpoint (cover images, logos, certificates, documents).
 * Stores the bytes in the Media table — see lib/media.ts for why — and
 * returns the public URL the forms save.
 */
export async function POST(req: Request) {
  const session = await getStaffSession();
  // Uploads feed articles, pages, case studies, logos and SEO images — any
  // editing area qualifies; the leads-only Sales role does not.
  const canEdit = (["content", "case-studies", "directory", "seo"] as const).some((a) =>
    canAccess(session?.user.role, a),
  );
  if (!session || !canEdit) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MEDIA_MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 4 MB)" }, { status: 413 });
  }
  if (!MEDIA_TYPES[file.type]) {
    return NextResponse.json(
      { error: "Unsupported type — use JPG, PNG, WebP, GIF, SVG or PDF" },
      { status: 415 },
    );
  }

  const alt = typeof form?.get("alt") === "string" ? String(form.get("alt")).slice(0, 300) : "";
  const filename = mediaFilename(file.name, file.type);
  const media = await prisma.media.create({
    data: {
      filename,
      mimeType: file.type,
      size: file.size,
      data: Buffer.from(await file.arrayBuffer()),
      alt,
      uploadedById: session.user.id || null,
    },
    select: { id: true, filename: true },
  });

  return NextResponse.json({ id: media.id, url: mediaUrl(media.id, media.filename) });
}
