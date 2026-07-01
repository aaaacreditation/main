import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { auth } from "@/auth";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Unsupported type — use JPG, PNG, WebP or GIF" }, { status: 415 });
  }

  const name = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${name}` });
}
