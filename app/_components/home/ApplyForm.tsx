"use client";

import { useState } from "react";
import Icon from "../Icon";

const PROGRAMS = [
  "Healthcare Accreditation",
  "Conformity Assessment Bodies — Laboratories",
  "Conformity Assessment Bodies — Certification Bodies",
  "Conformity Assessment Bodies — Inspection Bodies",
  "Training & Education Providers Accreditation",
  "SME Funding Readiness Accreditation",
  "Other / Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: fd.get("business"),
          contact: fd.get("contact"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          sector: fd.get("program"),
          message: fd.get("message"),
          website: fd.get("website"), // honeypot
          source: "home-quote",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong — please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  return (
    <div className="sme-form-card reveal">
      <h3>Request a quote</h3>
      <p className="sme-form-sub">
        Tell us about your organization and our team will get back to you within 24 hours with a
        tailored quotation.
      </p>

      {status === "sent" ? (
        <div className="sme-form-success" role="status">
          <Icon name="check" size={20} strokeWidth={2.4} />
          Request received — we&rsquo;ll be in touch within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="sme-form-row">
            <input className="sme-input" type="text" name="business" placeholder="Organization name *" required aria-label="Organization name" />
            <input className="sme-input" type="text" name="contact" placeholder="Contact person *" required aria-label="Contact person" />
          </div>
          <div className="sme-form-row">
            <input className="sme-input" type="email" name="email" placeholder="Email address *" required aria-label="Email address" />
            <input className="sme-input" type="tel" name="phone" placeholder="Phone number *" required aria-label="Phone number" />
          </div>
          <div className="sme-form-row single">
            <select className="sme-select" name="program" required defaultValue="" aria-label="Accreditation program">
              <option value="" disabled>
                Which accreditation program are you interested in?
              </option>
              {PROGRAMS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="sme-form-row single">
            <textarea
              className="sme-textarea"
              name="message"
              placeholder="Tell us about your organization, scope, and locations (optional)"
              rows={3}
              aria-label="About your organization"
            />
          </div>
          {/* Honeypot — hidden from real users, catches naive bots */}
          <input
            className="sme-hp"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          {status === "error" ? (
            <p className="sme-form-error" role="alert">{error}</p>
          ) : null}
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : (
              <>
                Request my quote <Icon name="arrow" size={14} className="arrow" />
              </>
            )}
          </button>
          <p className="sme-form-note">
            🔒 Your details are confidential. No spam — just a real conversation about accreditation.
          </p>
        </form>
      )}
    </div>
  );
}
