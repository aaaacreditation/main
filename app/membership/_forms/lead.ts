/**
 * Shared plumbing for the four membership application forms.
 *
 * All of them POST to the existing `/api/leads` endpoint, which accepts a flat
 * payload — business, contact, email, phone, sector, stage, message, source
 * (+ a `website` honeypot). The membership forms carry many more fields than
 * that, so everything outside the eight columns is folded into `message` as a
 * labelled block that reads cleanly in the admin Content Studio.
 */

export type LeadPayload = {
  business: string;
  contact: string;
  email: string;
  phone?: string;
  sector?: string;
  stage?: string;
  message: string;
  source: string;
  /** Honeypot — always submitted, always expected to be empty. */
  website: string;
};

export type Status = "idle" | "sending" | "ok" | "error";

/** POST to /api/leads, throwing a human-readable Error on failure. */
export async function postLead(payload: LeadPayload): Promise<void> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }
}

/** Read a form field, trimmed. */
export const val = (fd: FormData, name: string) => String(fd.get(name) ?? "").trim();

/** Build a "Label: value" line, or nothing when the value is empty. */
export const line = (label: string, value: string) => (value ? `${label}: ${value}` : "");

/** Build a "Label:\n<multi-line value>" block, or nothing when empty. */
export const block = (label: string, value: string) => (value ? `${label}:\n${value}` : "");

/** Join the non-empty parts of a message body. */
export const compose = (parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join("\n\n");

/** A titled block of "Label: value" lines, dropping the empty ones. */
export const stack = (heading: string, rows: string[]) => {
  const body = rows.filter(Boolean).join("\n");
  return body ? `${heading}\n${body}` : "";
};
