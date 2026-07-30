"use client";

import { useState } from "react";

const SECTOR_OPTIONS = [
  "Manufacturing",
  "IT & Software Services",
  "Healthcare & Pharma",
  "Agri-Processing",
  "Textile & Apparel",
  "Clean Energy & Greentech",
  "Logistics & Transport",
  "Construction & Engineering",
  "Retail & E-commerce",
  "Consulting & Services",
  "Hospitality & Food",
  "Export & Import",
  "Other",
];

type Status = "idle" | "sending" | "ok" | "error";

export default function ApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const country = String(fd.get("country") || "").trim();
    const notes = String(fd.get("notes") || "").trim();

    const payload = {
      contact: String(fd.get("contact") || "").trim(),
      business: String(fd.get("business") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      sector: String(fd.get("sector") || "").trim(),
      message: [country && `Country: ${country}`, notes].filter(Boolean).join("\n"),
      source: "sme-application",
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
      <div className="smex-appform-done" role="status">
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <strong>Application received</strong>
        <p>
          Thank you — our team will review your business details and contact you shortly with
          the next steps and a customised quote.
        </p>
      </div>
    );
  }

  return (
    <form className="smex-appform" onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="smex-appform-two">
        <div className="smex-appform-row">
          <label htmlFor="sme-contact">Full name</label>
          <input id="sme-contact" name="contact" required placeholder="Your full name" autoComplete="name" />
        </div>
        <div className="smex-appform-row">
          <label htmlFor="sme-business">Business name</label>
          <input id="sme-business" name="business" required placeholder="Registered business name" autoComplete="organization" />
        </div>
      </div>

      <div className="smex-appform-two">
        <div className="smex-appform-row">
          <label htmlFor="sme-email">Email address</label>
          <input id="sme-email" name="email" type="email" required placeholder="name@company.com" autoComplete="email" />
        </div>
        <div className="smex-appform-row">
          <label htmlFor="sme-phone">Phone number</label>
          <input id="sme-phone" name="phone" type="tel" placeholder="+1 000 000 0000" autoComplete="tel" />
        </div>
      </div>

      <div className="smex-appform-two">
        <div className="smex-appform-row">
          <label htmlFor="sme-sector">Sector</label>
          <select id="sme-sector" name="sector" defaultValue="">
            <option value="" disabled>
              Select your sector
            </option>
            {SECTOR_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="smex-appform-row">
          <label htmlFor="sme-country">Country</label>
          <input id="sme-country" name="country" placeholder="Country of operation" autoComplete="country-name" />
        </div>
      </div>

      <div className="smex-appform-row">
        <label htmlFor="sme-notes">Anything else we should know? (optional)</label>
        <textarea id="sme-notes" name="notes" rows={3} placeholder="Funding goals, timelines, or questions for our team" />
      </div>

      {status === "error" && (
        <p className="smex-appform-err" role="alert">
          {error}
        </p>
      )}

      <button className="smex-btn smex-btn-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
      <p className="smex-appform-note">
        We&rsquo;ll respond within two business days. Your details are used only to process your
        accreditation enquiry.
      </p>
    </form>
  );
}
