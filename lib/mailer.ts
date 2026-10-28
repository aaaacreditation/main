import nodemailer from "nodemailer";
import { CONTACT } from "./facts";

// SMTP settings come from the environment (see .env.example). Port 465 uses
// implicit TLS; any other port (587) upgrades with STARTTLS.
const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

/** Where lead notifications go. Defaults to the public enquiries mailbox. */
export const LEADS_TO = process.env.LEADS_EMAIL_TO || CONTACT.email;

export const mailerConfigured = Boolean(host && user && pass);

const transport = mailerConfigured
  ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
  : null;

/** Sends a plain-text email; throws if SMTP is not configured or the send fails. */
export async function sendMail({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }) {
  if (!transport) throw new Error("SMTP is not configured");
  await transport.sendMail({
    from: process.env.SMTP_FROM || `"AAA Website" <${user}>`,
    to: LEADS_TO,
    replyTo,
    // Header values must stay on one line.
    subject: subject.replace(/[\r\n]+/g, " "),
    text,
  });
}
