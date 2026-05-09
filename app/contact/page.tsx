import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "Contact Us" };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Talk to <em>the AAA team.</em></>}
        intro="Reach the right desk on the first try — choose the topic that best matches your enquiry below."
        crumbs={[{ label: "Contact" }]}
        meta={[
          { k: "Headquarters", v: "Virginia, USA" },
          { k: "Email", v: "contact@aaa-accreditation.org" },
        ]}
      />
      <section className="page-body">
        <div className="container">
          <div className="grid">
            <div className="reveal">
              <div className="label">Direct contact</div>
              <ul className="bullets" style={{ marginTop: 24 }}>
                <li>
                  <Icon name="mail" size={14} /> contact@aaa-accreditation.org — general enquiries
                </li>
                <li>
                  <Icon name="mail" size={14} /> apply@aaa-accreditation.org — applications &amp; quotes
                </li>
                <li>
                  <Icon name="mail" size={14} /> impartiality@aaa-accreditation.org — complaints &amp; appeals
                </li>
                <li>
                  <Icon name="phone" size={14} /> WhatsApp · Mon–Fri
                </li>
              </ul>
            </div>
            <div className="reveal">
              <h2>Send us a message</h2>
              <form className="form-grid" action="#" method="post">
                <div className="form-row"><label>First name</label><input name="first" required /></div>
                <div className="form-row"><label>Last name</label><input name="last" required /></div>
                <div className="form-row"><label>Email</label><input name="email" type="email" required /></div>
                <div className="form-row"><label>Organization</label><input name="org" /></div>
                <div className="form-row full">
                  <label>Topic</label>
                  <select name="topic" defaultValue="">
                    <option value="" disabled>Select a topic…</option>
                    <option>General enquiry</option>
                    <option>Quote request</option>
                    <option>Application</option>
                    <option>Complaint or appeal</option>
                    <option>Press / media</option>
                  </select>
                </div>
                <div className="form-row full"><label>Message</label><textarea name="message" required /></div>
                <div className="form-actions full">
                  <button type="submit" className="btn btn-primary">
                    Send message <Icon name="arrow" size={14} className="arrow" />
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
