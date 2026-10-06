"use client";

import { useState } from "react";
import Glyph from "../../_components/site/Glyph";

type Status = "idle" | "sending" | "ok" | "error";

const COUNTRIES = ["United States", "United Kingdom", "United Arab Emirates", "India", "Other"];

const ORG_TYPES = [
  "Testing or Calibration Laboratory",
  "Inspection Body",
  "Management Systems Certification Body",
  "Personnel Certification Body",
  "Medical Laboratory",
  "Product Certification Body",
  "Proficiency Testing Provider",
  "Not Sure",
];

/**
 * "Speak with an Accreditation Advisor" — the lead form from the client's CAB
 * hub hero. Posts to the shared /api/leads endpoint with its own `source` so
 * CAB enquiries can be filtered in the admin.
 */
export default function AdvisorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const country = get("country");
    const message = get("message");

    const payload = {
      contact: get("contact"),
      business: get("organization"),
      email: get("email"),
      sector: get("orgType") || "Conformity assessment body",
      message: [country && `Country: ${country}`, message && `Activities:\n${message}`].filter(Boolean).join("\n\n"),
      source: "cab-advisor",
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
      <div className="cabh-form-done" role="status">
        <span className="cabh-form-tick" aria-hidden="true">
          <Glyph name="check" size={22} strokeWidth={2.4} />
        </span>
        <strong>Request received</strong>
        <p>Thank you. Our team will guide you to the appropriate accreditation program.</p>
      </div>
    );
  }

  return (
    <form className="cabh-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="cabh-hp"
      />

      <div className="cabh-form-grid">
        <div className="cabh-field">
          <label htmlFor="cabh-contact">Full Name</label>
          <input id="cabh-contact" name="contact" required placeholder="Your name" autoComplete="name" />
        </div>
        <div className="cabh-field">
          <label htmlFor="cabh-org">Organization</label>
          <input
            id="cabh-org"
            name="organization"
            required
            placeholder="Organization name"
            autoComplete="organization"
          />
        </div>
        <div className="cabh-field">
          <label htmlFor="cabh-country">Country</label>
          <select id="cabh-country" name="country" defaultValue="">
            <option value="" disabled>
              Select country
            </option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="cabh-field">
          <label htmlFor="cabh-type">Type of Organization</label>
          <select id="cabh-type" name="orgType" defaultValue="">
            <option value="" disabled>
              Select organization type
            </option>
            {ORG_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="cabh-field full">
          <label htmlFor="cabh-email">Email Address</label>
          <input
            id="cabh-email"
            name="email"
            type="email"
            required
            placeholder="name@organization.com"
            autoComplete="email"
          />
        </div>
        <div className="cabh-field full">
          <label htmlFor="cabh-message">Message</label>
          <textarea
            id="cabh-message"
            name="message"
            rows={3}
            placeholder="Tell us briefly about your conformity assessment activities"
          />
        </div>

        {status === "error" && (
          <p className="cabh-form-err full" role="alert">
            {error}
          </p>
        )}

        <div className="cabh-form-foot full">
          <button className="ax-btn ax-btn-blue" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request Information"}
            {status !== "sending" && <Glyph name="arrow-right" size={14} strokeWidth={2} />}
          </button>
          <p className="cabh-form-note">Our team will guide you to the appropriate accreditation program.</p>
        </div>
      </div>
    </form>
  );
}
