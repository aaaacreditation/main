"use client";

import { useState } from "react";
import Icon from "../Icon";

const SECTORS = [
  "Manufacturing",
  "IT & Software Services",
  "Healthcare & Pharma",
  "Agri-Processing",
  "Textile & Apparel",
  "Clean Energy & Greentech",
  "Logistics & Transportation",
  "Construction & Engineering",
  "Retail & E-commerce",
  "Consulting & Professional Services",
  "Other",
];

const STAGES = [
  "Preparing for first loan",
  "Seeking working capital",
  "Raising investor funding",
  "Exploring / Need guidance",
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
          sector: fd.get("sector"),
          stage: fd.get("stage"),
          message: fd.get("message"),
          website: fd.get("website"), // honeypot
          source: "home-apply",
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
      <h3>Start your application</h3>
      <p className="sme-form-sub">
        Fill in the form and our team will get back to you within 24 hours.
      </p>

      {status === "sent" ? (
        <div className="sme-form-success" role="status">
          <Icon name="check" size={20} strokeWidth={2.4} />
          Application received — we&rsquo;ll be in touch within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="sme-form-row">
            <input className="sme-input" type="text" name="business" placeholder="Business name *" required aria-label="Business name" />
            <input className="sme-input" type="text" name="contact" placeholder="Contact person *" required aria-label="Contact person" />
          </div>
          <div className="sme-form-row">
            <input className="sme-input" type="email" name="email" placeholder="Email address *" required aria-label="Email address" />
            <input className="sme-input" type="tel" name="phone" placeholder="Phone number *" required aria-label="Phone number" />
          </div>
          <div className="sme-form-row">
            <select className="sme-select" name="sector" required defaultValue="" aria-label="Sector">
              <option value="" disabled>
                Select your sector
              </option>
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select className="sme-select" name="stage" required defaultValue="" aria-label="Funding stage">
              <option value="" disabled>
                Funding stage
              </option>
              {STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="sme-form-row single">
            <textarea
              className="sme-textarea"
              name="message"
              placeholder="Tell us about your business and funding goals (optional)"
              rows={3}
              aria-label="About your business"
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
                Submit application <Icon name="arrow" size={14} className="arrow" />
              </>
            )}
          </button>
          <p className="sme-form-note">
            🔒 Your details are confidential. No spam — just a real conversation about funding readiness.
          </p>
        </form>
      )}
    </div>
  );
}
