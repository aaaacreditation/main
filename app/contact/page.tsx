import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the American Accreditation Association (AAA) — 8609 Westwood Center Drive, Tysons Corner, VA 22182, USA. T: +1 (571) 601 2616 · info@aaa-accreditation.org",
};

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Contact"
        title={<>Let&apos;s <em>connect.</em></>}
        intro="Thanks for your interest in the American Accreditation Association (AAA). Please use this form if you have any questions and we'll get back to you very soon."
        crumbs={[{ label: "Contact" }]}
        meta={[
          { k: "Headquarters", v: "Tysons Corner, VA, USA" },
          { k: "Email", v: "info@aaa-accreditation.org" },
        ]}
      />
      <section className="page-body">
        <div className="container">
          <div className="grid">
            <div className="reveal">
              <div className="label">Direct contact</div>
              <ul className="bullets" style={{ marginTop: 24 }}>
                <li>
                  <Icon name="pin" size={14} /> 8609 Westwood Center Drive, Tysons Corner, VA 22182, USA
                </li>
                <li>
                  <Icon name="phone" size={14} /> T: <a href="tel:+15716012616">+1 (571) 601 2616</a>
                </li>
                <li>
                  <Icon name="phone" size={14} /> Fax: +1 (571) 376 6582
                </li>
                <li>
                  <Icon name="mail" size={14} />{" "}
                  <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a> — general enquiries
                </li>
                <li>
                  <Icon name="mail" size={14} />{" "}
                  <a href="mailto:healthcare@aaa-accreditation.org">healthcare@aaa-accreditation.org</a> — healthcare
                  standards feedback &amp; draft-standard consultation
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
                    <option>Membership</option>
                    <option>Complaint or appeal</option>
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
