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

export default function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="sme-form-card reveal">
      <h3>Start your application</h3>
      <p className="sme-form-sub">
        Fill in the form and our team will get back to you within 24 hours.
      </p>

      {submitted ? (
        <div className="sme-form-success" role="status">
          <Icon name="check" size={20} strokeWidth={2.4} />
          Application received — we&rsquo;ll be in touch within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="sme-form-row">
            <input className="sme-input" type="text" placeholder="Business name *" required aria-label="Business name" />
            <input className="sme-input" type="text" placeholder="Contact person *" required aria-label="Contact person" />
          </div>
          <div className="sme-form-row">
            <input className="sme-input" type="email" placeholder="Email address *" required aria-label="Email address" />
            <input className="sme-input" type="tel" placeholder="Phone number *" required aria-label="Phone number" />
          </div>
          <div className="sme-form-row">
            <select className="sme-select" required defaultValue="" aria-label="Sector">
              <option value="" disabled>
                Select your sector
              </option>
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select className="sme-select" required defaultValue="" aria-label="Funding stage">
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
              placeholder="Tell us about your business and funding goals (optional)"
              rows={3}
              aria-label="About your business"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit application <Icon name="arrow" size={14} className="arrow" />
          </button>
          <p className="sme-form-note">
            🔒 Your details are confidential. No spam — just a real conversation about funding readiness.
          </p>
        </form>
      )}
    </div>
  );
}
