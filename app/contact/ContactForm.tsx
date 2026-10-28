"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "sending" | "ok" | "error";
type FieldKey = "first" | "last" | "email" | "phone" | "organization" | "country" | "topic" | "message";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Preserved from the previous /contact form. */
const TOPICS = [
  "General enquiry",
  "Quote request",
  "Application",
  "Membership",
  "Complaint or appeal",
];

/** `?topic=` values other pages link with (e.g. CONTACT.quoteHref). */
const TOPIC_PARAMS: Record<string, string> = { quote: "Quote request" };

const EMPTY = {
  first: "",
  last: "",
  email: "",
  phone: "",
  organization: "",
  country: "",
  topic: "",
  message: "",
};

/**
 * General enquiry form for /contact.
 *
 * Posts to the shared /api/leads endpoint with source "contact-form" so
 * enquiries land in the admin Content Studio alongside applications and quote
 * requests. Modelled on the client-approved AdvisorForm pattern.
 *
 * Oct 2026: the separate /quote page was retired, so "Request a Quote" links
 * arrive as `?topic=quote` and the topic is pre-selected. The static HTML is
 * the plain form (Suspense fallback); the URL is read once it hydrates.
 */
export default function ContactForm() {
  return (
    <Suspense fallback={<EnquiryForm />}>
      <EnquiryFormFromUrl />
    </Suspense>
  );
}

function EnquiryFormFromUrl() {
  const topic = TOPIC_PARAMS[useSearchParams().get("topic") ?? ""] ?? "";
  // Keyed so a same-page link with a different topic starts a fresh form.
  return <EnquiryForm key={topic} initialTopic={topic} />;
}

function EnquiryForm({ initialTopic = "" }: { initialTopic?: string }) {
  const [values, setValues] = useState({ ...EMPTY, topic: initialTopic });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  function set(key: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.first.trim()) next.first = "Please enter your first name.";
    if (!values.last.trim()) next.last = "Please enter your last name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a phone number with the country code.";
    if (!values.organization.trim()) next.organization = "Please enter your organization name.";
    if (!values.country.trim()) next.country = "Please enter your country.";
    if (!values.topic) next.topic = "Please choose a topic.";
    if (values.message.trim().length < 10) next.message = "Please tell us a little more (10 characters or more).";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setFailure("Please correct the highlighted fields and try again.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const payload = {
      contact: `${values.first.trim()} ${values.last.trim()}`.trim(),
      business: values.organization.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      sector: values.topic,
      stage: "",
      message: [`Country: ${values.country.trim()}`, values.message.trim()].join("\n\n"),
      source: "contact-form",
      website: String(fd.get("website") || ""), // honeypot
    };

    setStatus("sending");
    setFailure("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setFailure(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="ctx-form-done" role="status">
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <strong>Message received</strong>
        <p>
          Thank you for contacting the American Accreditation Association. A member of our team
          will reply to <b>{values.email.trim()}</b> within two business days. If your enquiry is
          urgent, call us on <a href="tel:+15716012616">+1 (571) 601 2616</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="ctx-form" onSubmit={onSubmit} noValidate>
      {/* honeypot — hidden from people, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="ctx-form-grid">
        <div className="ctx-field">
          <label htmlFor="ct-first">
            First name<span className="req">*</span>
          </label>
          <input
            id="ct-first"
            name="first"
            required
            value={values.first}
            onChange={(e) => set("first", e.target.value)}
            autoComplete="given-name"
            placeholder="First name"
            aria-invalid={Boolean(errors.first)}
            aria-describedby={errors.first ? "ct-first-err" : undefined}
          />
          {errors.first && <span className="ctx-err" id="ct-first-err">{errors.first}</span>}
        </div>

        <div className="ctx-field">
          <label htmlFor="ct-last">
            Last name<span className="req">*</span>
          </label>
          <input
            id="ct-last"
            name="last"
            required
            value={values.last}
            onChange={(e) => set("last", e.target.value)}
            autoComplete="family-name"
            placeholder="Last name"
            aria-invalid={Boolean(errors.last)}
            aria-describedby={errors.last ? "ct-last-err" : undefined}
          />
          {errors.last && <span className="ctx-err" id="ct-last-err">{errors.last}</span>}
        </div>

        <div className="ctx-field">
          <label htmlFor="ct-email">
            Email<span className="req">*</span>
          </label>
          <input
            id="ct-email"
            name="email"
            required
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            placeholder="name@organization.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "ct-email-err" : undefined}
          />
          {errors.email && <span className="ctx-err" id="ct-email-err">{errors.email}</span>}
        </div>

        <div className="ctx-field">
          <label htmlFor="ct-phone">
            Phone<span className="req">*</span>
          </label>
          <input
            id="ct-phone"
            name="phone"
            required
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+1 571 000 0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "ct-phone-err" : undefined}
          />
          {errors.phone && <span className="ctx-err" id="ct-phone-err">{errors.phone}</span>}
        </div>

        <div className="ctx-field">
          <label htmlFor="ct-organization">
            Organization<span className="req">*</span>
          </label>
          <input
            id="ct-organization"
            name="organization"
            required
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            autoComplete="organization"
            placeholder="Organization name"
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "ct-organization-err" : undefined}
          />
          {errors.organization && <span className="ctx-err" id="ct-organization-err">{errors.organization}</span>}
        </div>

        <div className="ctx-field">
          <label htmlFor="ct-country">
            Country<span className="req">*</span>
          </label>
          <input
            id="ct-country"
            name="country"
            required
            value={values.country}
            onChange={(e) => set("country", e.target.value)}
            autoComplete="country-name"
            placeholder="Country"
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? "ct-country-err" : undefined}
          />
          {errors.country && <span className="ctx-err" id="ct-country-err">{errors.country}</span>}
        </div>

        <div className="ctx-field full">
          <label htmlFor="ct-topic">
            Topic<span className="req">*</span>
          </label>
          <select
            id="ct-topic"
            name="topic"
            required
            value={values.topic}
            onChange={(e) => set("topic", e.target.value)}
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "ct-topic-err" : undefined}
          >
            <option value="" disabled>
              Select a topic…
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.topic && <span className="ctx-err" id="ct-topic-err">{errors.topic}</span>}
        </div>

        <div className="ctx-field full">
          <label htmlFor="ct-message">
            Message<span className="req">*</span>
          </label>
          <textarea
            id="ct-message"
            name="message"
            required
            rows={4}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="How can we help? Include your accreditation program or standard if you already know it."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "ct-message-err" : undefined}
          />
          {errors.message && <span className="ctx-err" id="ct-message-err">{errors.message}</span>}
        </div>

        {status === "error" && failure && (
          <p className="ctx-form-err full" role="alert">
            {failure}
          </p>
        )}

        <div className="ctx-form-foot">
          <button className="ax-btn ax-btn-blue" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
            {status !== "sending" && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <p className="ctx-form-note">
            We reply within two business days. Your details are used only to answer your enquiry.
          </p>
        </div>
      </div>
    </form>
  );
}
