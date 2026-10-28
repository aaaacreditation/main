import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LEADS_TO, sendMail } from "@/lib/mailer";
import { leadKindFromSource } from "@/lib/leads";

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

  // The /apply and /contact forms email each submission to the enquiries
  // mailbox; the visitor only sees the thank-you message once that email has
  // been sent. Saving the lead for the admin panel is then best-effort, so a
  // database hiccup never turns a delivered request into an error (and a
  // duplicate on retry).
  const mail = notification(data);
  if (mail) {
    try {
      await sendMail({ ...mail, replyTo: data.email });
    } catch (err) {
      console.error(`${data.source} email failed:`, err);
      return NextResponse.json(
        { error: `We couldn't send your request right now — please email ${LEADS_TO}.` },
        { status: 500 }
      );
    }
    await prisma.lead.create({ data: record }).catch((err) => console.error("Lead save failed after email:", err));
    return NextResponse.json({ ok: true });
  }

  try {
    await prisma.lead.create({ data: record });
  } catch (err) {
    console.error("Lead capture failed:", err);
    return NextResponse.json(
      { error: "We couldn't save your application right now — please email sme@aaa-accreditation.org." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

type Lead = { business: string; contact: string; email: string; phone: string; sector: string; message: string; source: string };

/** The email for sources that notify the enquiries mailbox; null for the rest. */
function notification(d: Lead): { subject: string; text: string } | null {
  if (d.source === "apply-form") {
    return {
      subject: `New application inquiry: ${d.business} (${d.sector || "program not set"})`,
      text: [
        "New accreditation request from the website's Apply page.",
        [
          `Legal entity: ${d.business}`,
          `Authorized representative: ${d.contact}`,
          `Email: ${d.email}`,
          `Phone: ${d.phone}`,
          `Program applied for: ${d.sector}`,
        ].join("\n"),
        d.message,
      ].join("\n\n"),
    };
  }
  if (d.source === "contact-form") {
    return {
      subject: `New website enquiry: ${d.sector || "General enquiry"} from ${d.contact} (${d.business})`,
      text: [
        "New enquiry from the website's Contact page.",
        [
          `Name: ${d.contact}`,
          `Organization: ${d.business}`,
          `Email: ${d.email}`,
          `Phone: ${d.phone}`,
          `Topic: ${d.sector}`,
        ].join("\n"),
        d.message,
      ].join("\n\n"),
    };
  }
  return null;
}
