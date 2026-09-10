"use client";

import { useState } from "react";

/**
 * Hero enquiry form for the Training & Education Providers page.
 *
 * Fields follow the client's TEPA developer package (Sept 2026): name,
 * organization, email, phone, country, a read-only program field and a free
 * message. Posts to the shared /api/leads endpoint with the same `source` as
 * before, so nothing downstream changes.
 */
export default function AdvisorForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const country = String(fd.get("country") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const payload = {
      contact: String(fd.get("contact") || "").trim(),
      business: String(fd.get("organization") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      sector: "Training & education provider",
      message: [country && `Country: ${country}`, message].filter(Boolean).join("\n\n"),
      source: "training-education-advisor",
      website: String(fd.get("website") || ""), // honeypot
    };

    setStatus("sending");
    setError("");
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
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="tepx-form-done" role="status">
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <strong>Enquiry received</strong>
        <p>
          Thank you. An AAA accreditation advisor will review your details and contact you to
          discuss the most suitable next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="tepx-form-grid">
        <div className="tepx-field">
          <label htmlFor="tep-contact">Full name</label>
          <input id="tep-contact" name="contact" required placeholder="Your name" autoComplete="name" />
        </div>
        <div className="tepx-field">
          <label htmlFor="tep-organization">Organization</label>
          <input
            id="tep-organization"
            name="organization"
            required
            placeholder="Organization name"
            autoComplete="organization"
          />
        </div>
        <div className="tepx-field">
          <label htmlFor="tep-email">Email address</label>
          <input
            id="tep-email"
            name="email"
            type="email"
            required
            placeholder="name@organization.com"
            autoComplete="email"
          />
        </div>
        <div className="tepx-field">
          <label htmlFor="tep-phone">Phone number</label>
          <input id="tep-phone" name="phone" type="tel" placeholder="Including country code" autoComplete="tel" />
        </div>
        <div className="tepx-field">
          <label htmlFor="tep-country">Country</label>
          <input id="tep-country" name="country" placeholder="Country" autoComplete="country-name" />
        </div>
        <div className="tepx-field">
          <label htmlFor="tep-program">Program</label>
          <input id="tep-program" name="program" value="Training & Education Provider" readOnly />
        </div>
        <div className="tepx-field full">
          <label htmlFor="tep-message">Message</label>
          <textarea
            id="tep-message"
            name="message"
            rows={3}
            placeholder="Tell us briefly about your organization and what you would like to know"
          />
        </div>

        {status === "error" && (
          <p className="tepx-form-err full" role="alert">
            {error}
          </p>
        )}

        <button className="ax-btn ax-btn-blue" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit Enquiry"}
          {status !== "sending" && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </button>
        <p className="tepx-form-note">Your information will be used only to respond to your accreditation enquiry.</p>
      </div>
    </form>
  );
}
