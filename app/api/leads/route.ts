import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { LEADS_TO, sendMail } from "@/lib/mailer";
import { leadKindFromSource } from "@/lib/leads";
import { leadEmail } from "@/lib/lead-email";
import { leadPixelEvents, sendLeadToMeta } from "@/lib/meta-capi";
import { emailSha256, leadOpenAiEvents, sendLeadToOpenAi } from "@/lib/openai-capi";

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
  // Classified server-side so the admin can split contact enquiries from
  // applications without every form having to know about it.
  const record = {
    ...data,
    kind: leadKindFromSource(data.source, data.sector),
    referrer: (req.headers.get("referer") ?? "").slice(0, 500),
  };

  if (!data.business || !data.contact || !EMAIL_RE.test(data.email)) {
    return NextResponse.json(
      { error: "Please fill in business name, contact person and a valid email." },
      { status: 400 }
    );
  }

  // The request has reached AAA once EITHER the lead is saved (it shows in
  // Admin → Leads) OR the notification email to the enquiries mailbox has
  // gone out. Only when both fail does the visitor see an error. (Nov 2026:
  // the email used to be required, so with SMTP off on the preview server
  // every /contact and /apply submission was rejected AND discarded.)

  // 1. Save it — it shows in Admin → Leads.
  let saved: { id: string; createdAt: Date } | null = null;
  try {
    saved = await prisma.lead.create({ data: record, select: { id: true, createdAt: true } });
  } catch (err) {
    console.error(`${data.source} lead save failed:`, err);
  }

  // 2. Email it to the enquiries mailbox — every form, not only Contact and
  // Apply (Nov 2026, client). Recorded on the lead's timeline when it goes out.
  let mailed = false;
  try {
    const mail = leadEmail({ ...record, id: saved?.id, createdAt: saved?.createdAt ?? new Date() });
    await sendMail({ ...mail, replyTo: data.email });
    mailed = true;
  } catch (err) {
    console.error(`${data.source} email failed:`, err);
  }
  if (saved && mailed) {
    await prisma.leadActivity
      .create({ data: { leadId: saved.id, type: "email", body: `Notification emailed to ${LEADS_TO}.` } })
      .catch((err) => console.error("lead email activity failed:", err));
  }

  if (!saved && !mailed) {
    return NextResponse.json(
      { error: `We couldn't send your request right now — please email ${LEADS_TO}.` },
      { status: 500 }
    );
  }

  // 3. Ad platforms (Meta, OpenAI Ads): send the conversion to each
  // Conversions API once the visitor has their answer, and hand the same
  // events (same IDs) back to the form for the browser pixels — each platform
  // counts the pair once (Nov 2026). The only personal data returned is the
  // submitter's own email as a SHA-256 hash, for the OpenAI Pixel's `init`.
  const createdAt = saved?.createdAt ?? new Date();
  const meta = leadPixelEvents(record);
  const openaiEvents = leadOpenAiEvents(record);
  after(() =>
    Promise.all([
      sendLeadToMeta(meta, { ...data, createdAt }, req),
      sendLeadToOpenAi(openaiEvents, { email: data.email, createdAt }, req),
    ]),
  );

  return NextResponse.json({
    ok: true,
    meta,
    openai: { user: { email_sha256: emailSha256(data.email) }, events: openaiEvents },
  });
}
