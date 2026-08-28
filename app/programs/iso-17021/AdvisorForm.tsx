"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * "Speak with an Accreditation Advisor" — the lead form from the client's
 * ISO/IEC 17021-1 hero. Posts to the shared /api/leads endpoint (same as the
 * SME application form) with a distinct `source` so it can be filtered in the
 * admin Content Studio.
 */
export default function AdvisorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const country = String(fd.get("country") || "").trim();
    const schemes = String(fd.get("schemes") || "").trim();

    const payload = {
      contact: String(fd.get("contact") || "").trim(),
      business: String(fd.get("organization") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      sector: "Management systems certification body",
      message: [
        country && `Country: ${country}`,
        schemes && `Certification schemes / requested scope:\n${schemes}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
      source: "iso-17021-advisor",
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
      <div className="cbx-form-done" role="status">
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <strong>Request received</strong>
        <p>
          Thank you — an AAA accreditation advisor will review your certification schemes and
          requested scope and contact you within two business days.
        </p>
      </div>
    );
  }

  return (
    <form className="cbx-form" onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="cbx-form-grid">
        <div className="cbx-field">
          <label htmlFor="cb-contact">Full name</label>
          <input id="cb-contact" name="contact" required placeholder="Your name" autoComplete="name" />
        </div>
        <div className="cbx-field">
          <label htmlFor="cb-organization">Organization</label>
          <input
            id="cb-organization"
            name="organization"
            required
            placeholder="Certification body name"
            autoComplete="organization"
          />
        </div>
        <div className="cbx-field">
          <label htmlFor="cb-country">Country</label>
          <input id="cb-country" name="country" placeholder="Country" autoComplete="country-name" />
        </div>
        <div className="cbx-field">
          <label htmlFor="cb-email">Email</label>
          <input
            id="cb-email"
            name="email"
            type="email"
            required
            placeholder="name@organization.com"
            autoComplete="email"
          />
        </div>
        <div className="cbx-field full">
          <label htmlFor="cb-schemes">Certification schemes</label>
          <textarea
            id="cb-schemes"
            name="schemes"
            rows={3}
            placeholder="Describe the standards, technical sectors, offices, and requested accreditation scope"
          />
        </div>

        {status === "error" && (
          <p className="cbx-form-err full" role="alert">
            {error}
          </p>
        )}

        <div className="cbx-form-foot">
          <button className="cbx-btn cbx-btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request Information"}
            {status !== "sending" && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <p className="cbx-form-note">
            No obligation. Your details are used only to respond to your accreditation enquiry.
          </p>
        </div>
      </div>
    </form>
  );
}
