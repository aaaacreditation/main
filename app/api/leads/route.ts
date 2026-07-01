import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const cap = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Public endpoint for the "Start your application" form. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (cap((body as Record<string, unknown>).website, 10)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    business: cap((body as Record<string, unknown>).business, 200),
    contact: cap((body as Record<string, unknown>).contact, 200),
    email: cap((body as Record<string, unknown>).email, 320).toLowerCase(),
    phone: cap((body as Record<string, unknown>).phone, 60),
    sector: cap((body as Record<string, unknown>).sector, 100),
    stage: cap((body as Record<string, unknown>).stage, 100),
    message: cap((body as Record<string, unknown>).message, 4000),
    source: cap((body as Record<string, unknown>).source, 60) || "home-apply",
  };

  if (!data.business || !data.contact || !EMAIL_RE.test(data.email)) {
    return NextResponse.json(
      { error: "Please fill in business name, contact person and a valid email." },
      { status: 400 }
    );
  }

  try {
    await prisma.lead.create({ data });
  } catch (err) {
    console.error("Lead capture failed:", err);
    return NextResponse.json(
      { error: "We couldn't save your application right now — please email sme@aaa-accreditation.org." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
