import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a quote for AAA accreditation. Tell us about your organization and program of interest, and the American Accreditation Association team will get back to you.",
};

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Get a Quote"
        title={<>Fill a form to <em>get a quote.</em></>}
        intro="Please use this form to get a quote. Tell us about your organization and the accreditation program you are interested in, and our team will get back to you. Thank you for your interest in the American Accreditation Association — AAA."
        crumbs={[{ label: "Get a Quote" }]}
      />
      <section className="page-body">
        <div className="container">
          <div className="grid">
            <div className="reveal">
              <div className="label">Why we ask</div>
              <p style={{ marginTop: 24 }}>
                Accreditation scope, applicable standards, and assessment requirements vary by
                sector and by country. The information you provide here lets us prepare an accurate
                quote for your organization.
              </p>
              <ul className="bullets">
                <li>Sector and applicable ISO/IEC standard</li>
                <li>Number of sites and countries of operation</li>
                <li>Estimated number of accreditation scopes / methods</li>
              </ul>
            </div>
            <div className="reveal">
              <h2>Quote request</h2>
              <form className="form-grid" action="#" method="post">
                <div className="form-row"><label>Organization</label><input name="org" required /></div>
                <div className="form-row"><label>Country</label><input name="country" required /></div>
                <div className="form-row"><label>Contact name</label><input name="name" required /></div>
                <div className="form-row"><label>Email</label><input name="email" type="email" required /></div>
                <div className="form-row full">
                  <label>Program of interest</label>
                  <select name="program" defaultValue="">
                    <option value="" disabled>Select a program…</option>
                    <option>Healthcare Accreditation</option>
                    <option>Medical Laboratories (ISO 15189)</option>
                    <option>Testing & Calibration (ISO/IEC 17025)</option>
                    <option>Inspection Bodies (ISO/IEC 17020)</option>
                    <option>System Certification (ISO/IEC 17021-1)</option>
                    <option>Product Certification (ISO/IEC 17065)</option>
                    <option>Personnel Certification (ISO/IEC 17024)</option>
                    <option>Proficiency Testing (ISO/IEC 17043)</option>
                    <option>Training Providers (ASTM E-2659)</option>
                  </select>
                </div>
                <div className="form-row"><label>Sites</label><input name="sites" type="number" min={1} defaultValue={1} /></div>
                <div className="form-row"><label>Estimated scopes</label><input name="scopes" type="number" min={1} defaultValue={1} /></div>
                <div className="form-row full"><label>Notes</label><textarea name="notes" placeholder="Anything we should know?" /></div>
                <div className="form-actions full">
                  <button type="submit" className="btn btn-primary">
                    Request quote <Icon name="arrow" size={14} className="arrow" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
