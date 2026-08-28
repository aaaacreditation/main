"use client";

import { useState } from "react";
import FormDone from "./FormDone";
import { block, compose, line, postLead, stack, val, type Status } from "./lead";

/**
 * Combined AAA Membership application — the "choose your membership type"
 * route, for applicants who arrive without having picked a track yet.
 *
 * Field set transcribed from the live WordPress form (Contact Form 7 #4868 on
 * /membership-application/): membership type, member information with a full
 * postal address, organization information with its own address, and a payment
 * method. The live dropdown still quotes the retired $150 / $450 prices; the
 * current published fees are used here instead ($350 individual / 2 years,
 * $500 organizational / 1 year), matching the membership pages.
 */

const MEMBERSHIP_TYPES = [
  "Individual Membership — $350 (2 years)",
  "Organizational Membership — $500 (1 year)",
];

const PAYMENT_METHODS = ["Credit card", "Bank transfer"];

export default function CombinedApplicationForm({ source }: { source: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const title = val(fd, "title");
    const first = val(fd, "firstName");
    const last = val(fd, "lastName");

    const payload = {
      business: val(fd, "organization"),
      contact: [title, first, last].filter(Boolean).join(" "),
      email: val(fd, "email"),
      phone: val(fd, "phone"),
      sector: val(fd, "industries").slice(0, 100),
      stage: val(fd, "membershipType"),
      source,
      website: val(fd, "companyWebsiteHp"), // honeypot
      message: compose([
        `Membership type: ${val(fd, "membershipType") || "not specified"}`,
        stack("MEMBER ADDRESS", [
          line("Address line 1", val(fd, "memberAddress1")),
          line("Address line 2", val(fd, "memberAddress2")),
          line("City", val(fd, "memberCity")),
          line("State / province", val(fd, "memberState")),
          line("ZIP / postal code", val(fd, "memberZip")),
          line("Country", val(fd, "memberCountry")),
        ]),
        stack("ORGANIZATION", [
          line("Occupation / title", val(fd, "occupation")),
          line("Website", val(fd, "orgWebsite")),
          line("Telephone", val(fd, "orgPhone")),
          line("Address line 1", val(fd, "orgAddress1")),
          line("Address line 2", val(fd, "orgAddress2")),
          line("City", val(fd, "orgCity")),
          line("State / province", val(fd, "orgState")),
          line("ZIP / postal code", val(fd, "orgZip")),
          line("Country", val(fd, "orgCountry")),
        ]),
        block("Industries you work in", val(fd, "industries")),
        line("Preferred payment method", val(fd, "paymentMethod")),
      ]),
    };

    setStatus("sending");
    setError("");
    try {
      await postLead(payload);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <FormDone title="Application received">
        <p>
          Thank you for your interest in AAA membership. Our membership team will confirm your
          membership type, send payment instructions for the method you selected, and let you know
          which supporting documents to email to info@aaa-accreditation.org.
        </p>
      </FormDone>
    );
  }

  return (
    <form className="memx-form" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="companyWebsiteHp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">1</i> Membership type
        </legend>
        <div className="memx-grid">
          <div className="memx-field full">
            <label htmlFor="mm-type">
              Which membership are you applying for?<span className="req">*</span>
            </label>
            <select id="mm-type" name="membershipType" required defaultValue="">
              <option value="" disabled>
                Please choose an option
              </option>
              {MEMBERSHIP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className="hint">
              Not sure yet? Compare the two on the{" "}
              <a href="/membership">membership overview</a>.
            </span>
          </div>
        </div>
      </fieldset>

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">2</i> Member information
        </legend>
        <div className="memx-grid">
          <div className="memx-field">
            <label htmlFor="mm-title">Title</label>
            <input id="mm-title" name="title" placeholder="Dr / Mr / Ms / Eng." autoComplete="honorific-prefix" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-first">
              First name<span className="req">*</span>
            </label>
            <input id="mm-first" name="firstName" required autoComplete="given-name" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-last">
              Last name<span className="req">*</span>
            </label>
            <input id="mm-last" name="lastName" required autoComplete="family-name" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-email">
              Email address<span className="req">*</span>
            </label>
            <input id="mm-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-phone">
              Mobile phone<span className="req">*</span>
            </label>
            <input id="mm-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-country">
              Country<span className="req">*</span>
            </label>
            <input id="mm-country" name="memberCountry" required autoComplete="country-name" />
          </div>
          <div className="memx-field full">
            <label htmlFor="mm-address1">
              Address line 1<span className="req">*</span>
            </label>
            <textarea id="mm-address1" name="memberAddress1" rows={2} required autoComplete="street-address" />
          </div>
          <div className="memx-field full">
            <label htmlFor="mm-address2">Address line 2</label>
            <textarea id="mm-address2" name="memberAddress2" rows={2} />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-city">
              City<span className="req">*</span>
            </label>
            <input id="mm-city" name="memberCity" required autoComplete="address-level2" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-state">
              State / province<span className="req">*</span>
            </label>
            <input id="mm-state" name="memberState" required autoComplete="address-level1" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-zip">
              ZIP / postal code<span className="req">*</span>
            </label>
            <input id="mm-zip" name="memberZip" required inputMode="numeric" autoComplete="postal-code" />
          </div>
        </div>
      </fieldset>

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">3</i> Organization information
        </legend>
        <div className="memx-grid">
          <div className="memx-field">
            <label htmlFor="mm-org">
              Organization name<span className="req">*</span>
            </label>
            <input id="mm-org" name="organization" required autoComplete="organization" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-occupation">
              Occupation / title<span className="req">*</span>
            </label>
            <input id="mm-occupation" name="occupation" required autoComplete="organization-title" />
          </div>
          <div className="memx-field full">
            <label htmlFor="mm-industries">
              Industries you work in<span className="req">*</span>
            </label>
            <textarea id="mm-industries" name="industries" rows={2} required />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-orgphone">
              Telephone<span className="req">*</span>
            </label>
            <input id="mm-orgphone" name="orgPhone" type="tel" required />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-orgweb">
              Website<span className="req">*</span>
            </label>
            <input id="mm-orgweb" name="orgWebsite" required placeholder="https://" inputMode="url" />
          </div>
          <div className="memx-field full">
            <label htmlFor="mm-orgaddress1">
              Address line 1<span className="req">*</span>
            </label>
            <textarea id="mm-orgaddress1" name="orgAddress1" rows={2} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="mm-orgaddress2">Address line 2</label>
            <textarea id="mm-orgaddress2" name="orgAddress2" rows={2} />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-orgcity">
              City<span className="req">*</span>
            </label>
            <input id="mm-orgcity" name="orgCity" required />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-orgstate">
              State / province<span className="req">*</span>
            </label>
            <input id="mm-orgstate" name="orgState" required />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-orgzip">
              ZIP / postal code<span className="req">*</span>
            </label>
            <input id="mm-orgzip" name="orgZip" required inputMode="numeric" />
          </div>
          <div className="memx-field">
            <label htmlFor="mm-orgcountry">
              Country<span className="req">*</span>
            </label>
            <input id="mm-orgcountry" name="orgCountry" required />
          </div>
        </div>
      </fieldset>

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">4</i> Payment method
        </legend>
        <div className="memx-grid">
          <div className="memx-field">
            <label htmlFor="mm-payment">
              How would you prefer to pay?<span className="req">*</span>
            </label>
            <select id="mm-payment" name="paymentMethod" required defaultValue="">
              <option value="" disabled>
                Please choose an option
              </option>
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <span className="hint">
              No payment is taken on this page — AAA sends instructions once your application is
              reviewed.
            </span>
          </div>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="memx-form-err" role="alert">
          {error}
        </p>
      )}

      <div className="memx-form-foot">
        <button className="ax-btn ax-btn-gold" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit application"}
          {status !== "sending" && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </button>
        <p className="memx-form-note">
          Your details are used only to process your AAA membership application. Submitting this
          form does not create a membership until AAA confirms the outcome of its review.
        </p>
      </div>
    </form>
  );
}
