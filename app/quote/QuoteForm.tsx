"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";
type FieldKey = "organization" | "country" | "name" | "email" | "program";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Program list preserved from the previous /quote form. The ISO/IEC 17021-1
 * entry now carries the program's current name, "Management Systems
 * Certification Bodies Accreditation".
 */
const PROGRAMS = [
  "Healthcare Accreditation",
  "Medical Laboratories (ISO 15189)",
  "Testing & Calibration (ISO/IEC 17025)",
  "Inspection Bodies (ISO/IEC 17020)",
  "Management Systems Certification Bodies Accreditation (ISO/IEC 17021-1)",
  "Product Certification (ISO/IEC 17065)",
  "Personnel Certification (ISO/IEC 17024)",
  "Proficiency Testing (ISO/IEC 17043)",
  "Training Providers (ASTM E-2659)",
];

const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "Still exploring — no date yet",
];

const EMPTY = {
  organization: "",
  country: "",
  name: "",
  email: "",
  phone: "",
  program: "",
  sites: "1",
  scopes: "1",
  timeline: "",
  notes: "",
};

/**
 * Quote request form for /quote.
 *
 * Posts to the shared /api/leads endpoint with source "quote-form". The
 * scoping answers (country, sites, scopes, notes) are folded into `message` so
 * the whole request is readable in one place in the admin Content Studio.
 */
export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  function set(key: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.organization.trim()) next.organization = "Please enter your organization's name.";
    if (!values.country.trim()) next.country = "Please tell us where you operate.";
    if (!values.name.trim()) next.name = "Please enter a contact name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (!values.program) next.program = "Please choose the program you are interested in.";
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
      contact: values.name.trim(),
      business: values.organization.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      sector: values.program,
      stage: values.timeline,
      message: [
        `Country / countries of operation: ${values.country.trim()}`,
        `Sites to be covered: ${values.sites || "1"}`,
        `Estimated scopes / methods: ${values.scopes || "1"}`,
        values.timeline && `Preferred start: ${values.timeline}`,
        values.notes.trim() && `Notes:\n${values.notes.trim()}`,
      ]
        .filter(Boolean)
        .join("\n"),
      source: "quote-form",
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
      <div className="qtx-form-done" role="status">
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <strong>Quote request received</strong>
        <p>
          Thank you — an AAA accreditation advisor will review the scope you described for{" "}
          <b>{values.organization.trim()}</b> and reply to <b>{values.email.trim()}</b> within two
          business days. If anything is unclear we will ask before pricing rather than guess.
        </p>
        <p className="qtx-form-done-next">
          While you wait, you can{" "}
          <a
            href="https://calendly.com/aaa-accreditation4/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            book a 30-minute consultation
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="qtx-form" onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="qtx-form-grid">
        <div className="qtx-field">
          <label htmlFor="qt-organization">Organization</label>
          <input
            id="qt-organization"
            name="organization"
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            autoComplete="organization"
            placeholder="Legal entity name"
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "qt-organization-err" : undefined}
          />
          {errors.organization && (
            <span className="qtx-err" id="qt-organization-err">
              {errors.organization}
            </span>
          )}
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-country">Country of operation</label>
          <input
            id="qt-country"
            name="country"
            value={values.country}
            onChange={(e) => set("country", e.target.value)}
            autoComplete="country-name"
            placeholder="Country, or list of countries"
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? "qt-country-err" : undefined}
          />
          {errors.country && (
            <span className="qtx-err" id="qt-country-err">
              {errors.country}
            </span>
          )}
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-name">Contact name</label>
          <input
            id="qt-name"
            name="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            placeholder="Who should we reply to?"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "qt-name-err" : undefined}
          />
          {errors.name && (
            <span className="qtx-err" id="qt-name-err">
              {errors.name}
            </span>
          )}
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-email">Email</label>
          <input
            id="qt-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            placeholder="name@organization.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "qt-email-err" : undefined}
          />
          {errors.email && (
            <span className="qtx-err" id="qt-email-err">
              {errors.email}
            </span>
          )}
        </div>

        <div className="qtx-field full">
          <label htmlFor="qt-program">Program of interest</label>
          <select
            id="qt-program"
            name="program"
            value={values.program}
            onChange={(e) => set("program", e.target.value)}
            aria-invalid={Boolean(errors.program)}
            aria-describedby={errors.program ? "qt-program-err" : undefined}
          >
            <option value="" disabled>
              Select a program…
            </option>
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.program && (
            <span className="qtx-err" id="qt-program-err">
              {errors.program}
            </span>
          )}
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-sites">Sites to be covered</label>
          <input
            id="qt-sites"
            name="sites"
            type="number"
            min={1}
            step={1}
            value={values.sites}
            onChange={(e) => set("sites", e.target.value)}
          />
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-scopes">Estimated scopes / methods</label>
          <input
            id="qt-scopes"
            name="scopes"
            type="number"
            min={1}
            step={1}
            value={values.scopes}
            onChange={(e) => set("scopes", e.target.value)}
          />
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-phone">
            Phone <i>optional</i>
          </label>
          <input
            id="qt-phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+1 571 000 0000"
          />
        </div>

        <div className="qtx-field">
          <label htmlFor="qt-timeline">
            Preferred start <i>optional</i>
          </label>
          <select
            id="qt-timeline"
            name="timeline"
            value={values.timeline}
            onChange={(e) => set("timeline", e.target.value)}
          >
            <option value="">No preference</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="qtx-field full">
          <label htmlFor="qt-notes">
            Notes <i>optional</i>
          </label>
          <textarea
            id="qt-notes"
            name="notes"
            rows={3}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Anything that affects scope — existing certifications, regulatory deadlines, technical sectors, languages, or a transfer from another accreditation body."
          />
        </div>

        {status === "error" && failure && (
          <p className="qtx-form-err full" role="alert">
            {failure}
          </p>
        )}

        <div className="qtx-form-foot">
          <button className="ax-btn ax-btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request my quote"}
            {status !== "sending" && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <p className="qtx-form-note">
            No obligation. Your details are used only to prepare and discuss your quote.
          </p>
        </div>
      </div>
    </form>
  );
}
