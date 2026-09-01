"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * "Speak with an accreditation advisor" — the lead form for the Training &
 * Education Providers program page.
 *
 * The page previously carried a decorative form whose submit button was a
 * `type="button"` with no handler, so every enquiry from the (paid) TEPA
 * traffic was silently dropped. This posts to the shared /api/leads endpoint
 * with a distinct `source` so training leads can be filtered in the admin
 * Content Studio.
 */
export default function AdvisorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const country = String(fd.get("country") || "").trim();
    const courses = String(fd.get("courses") || "").trim();

    const payload = {
      contact: String(fd.get("contact") || "").trim(),
      business: String(fd.get("organization") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      sector: "Training & education provider",
      message: [
        country && `Country: ${country}`,
        courses && `Courses / requested accreditation scope:\n${courses}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
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
        <strong>Request received</strong>
        <p>
          Thank you — an AAA accreditation advisor will review the courses you deliver and get
          back to you with the requirements, documents and next steps.
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
            placeholder="Training centre or institution"
            autoComplete="organization"
          />
        </div>
        <div className="tepx-field">
          <label htmlFor="tep-email">Email</label>
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
          <label htmlFor="tep-phone">Phone or WhatsApp</label>
          <input id="tep-phone" name="phone" placeholder="Including country code" autoComplete="tel" />
        </div>
        <div className="tepx-field full">
          <label htmlFor="tep-country">Country</label>
          <input id="tep-country" name="country" placeholder="Where you deliver your courses" autoComplete="country-name" />
        </div>
        <div className="tepx-field full">
          <label htmlFor="tep-courses">Courses you want accredited</label>
          <textarea
            id="tep-courses"
            name="courses"
            rows={3}
            placeholder="Subjects, delivery format (classroom, workshop, e-learning) and roughly how many learners you train each year"
          />
        </div>

        {status === "error" && (
          <p className="tepx-form-err full" role="alert">
            {error}
          </p>
        )}

        <div className="tepx-form-foot">
          <button className="ax-btn ax-btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request Information"}
            {status !== "sending" && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <p className="tepx-form-note">
            No obligation. Your details are used only to respond to your accreditation enquiry.
          </p>
        </div>
      </div>
    </form>
  );
}
