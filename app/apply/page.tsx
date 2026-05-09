import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "Apply for Accreditation" };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title={<>Apply for <em>accreditation.</em></>}
        intro="Begin a formal application to AAA. After submission, an accreditation manager will be assigned to your file and respond within five working days."
        crumbs={[{ label: "Apply" }]}
      />
      <section className="page-body">
        <div className="container">
          <div className="grid">
            <div className="reveal">
              <div className="label">What happens next</div>
              <ul className="bullets" style={{ marginTop: 24 }}>
                <li>1. Application screening &amp; scope confirmation</li>
                <li>2. Stage 1 documentation review</li>
                <li>3. Stage 2 on-site assessment</li>
                <li>4. Independent accreditation decision</li>
                <li>5. Issuance &amp; entry into the public register</li>
              </ul>
            </div>
            <div className="reveal">
              <h2>Application form</h2>
              <form className="form-grid" action="#" method="post">
                <div className="form-row"><label>Legal entity name</label><input name="org" required /></div>
                <div className="form-row"><label>Country of registration</label><input name="country" required /></div>
                <div className="form-row"><label>Authorized representative</label><input name="rep" required /></div>
                <div className="form-row"><label>Email</label><input name="email" type="email" required /></div>
                <div className="form-row full">
                  <label>Program applied for</label>
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
                <div className="form-row full"><label>Scope statement</label><textarea name="scope" required /></div>
                <div className="form-actions full">
                  <button type="submit" className="btn btn-primary">
                    Submit application <Icon name="arrow" size={14} className="arrow" />
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
