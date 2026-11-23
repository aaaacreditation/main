import type { LeadKind } from "@prisma/client";
import { LEAD_KIND_LABEL, leadSourceLabel } from "./leads";
import { SITE_URL } from "./seo";

/**
 * The notification email for a website lead (Nov 2026, client: every form
 * submission is saved to Admin → Leads AND emailed to the enquiries mailbox).
 * One format for all the site's forms.
 */

export type LeadForEmail = {
  id?: string | null;
  business: string;
  contact: string;
  email: string;
  phone: string;
  sector: string;
  stage: string;
  message: string;
  source: string;
  kind: LeadKind;
  referrer?: string | null;
  createdAt: Date;
};

const SUBJECT_KIND: Record<LeadKind, string> = {
  CONTACT: "website enquiry",
  APPLICATION: "accreditation application",
  QUOTE: "quote request",
  ADVISOR: "program advisor request",
  MEMBERSHIP: "membership application",
  OTHER: "website enquiry",
};

const received = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function leadEmail(lead: LeadForEmail): { subject: string; text: string } {
  const who = lead.business || lead.contact || lead.email;
  const subject = `New ${SUBJECT_KIND[lead.kind]}: ${who}${lead.sector ? ` (${lead.sector})` : ""}`;

  const fields = [
    ["Organization", lead.business],
    ["Contact person", lead.contact],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Program / topic", lead.sector],
    ["Stage", lead.stage],
    ["Form", leadSourceLabel(lead.source)],
    ["Page", lead.referrer ?? ""],
    ["Received", `${received.format(lead.createdAt)} UTC`],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const text = [
    `New ${LEAD_KIND_LABEL[lead.kind].toLowerCase()} from the website.`,
    fields,
    lead.message ? `Message:\n${lead.message}` : "",
    [
      lead.id ? `Open in the admin: ${SITE_URL}/admin/leads/${lead.id}` : "",
      `Reply to this email to answer ${lead.contact || lead.email} directly.`,
    ]
      .filter(Boolean)
      .join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");

  return { subject, text };
}
