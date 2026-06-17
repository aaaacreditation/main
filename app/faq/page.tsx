import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about the American Accreditation Association (AAA) — accreditation programs, the application process, healthcare accreditation and membership.",
};

type QA = { q: string; a: string };
type Group = { title: string; items: QA[] };

const GROUPS: Group[] = [
  {
    title: "About AAA & accreditation",
    items: [
      {
        q: "What is accreditation?",
        a: "Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards. The accreditation process aims to enhance service quality and ensure safety through compliance with global standards.",
      },
      {
        q: "Who is the American Accreditation Association (AAA)?",
        a: "AAA is the American Accreditation Association, authorized by the US government — the State Corporation Commission of the Commonwealth of Virginia — to transact its business according to the articles of cooperation under Title 13.1 of the Code of Virginia and to offer a full range of comprehensive accreditation services. AAA is a third-party accreditation body that delivers accreditation services according to various international standards.",
      },
      {
        q: "Which accreditation programs does AAA offer?",
        a: "AAA delivers a range of accreditation programs using international standards: Healthcare Accreditation; Training Providers Accreditation; Schools Accreditation; Testing & Calibration Laboratories (ISO/IEC 17025); Medical Laboratories (ISO 15189); Personnel Certification Bodies (ISO/IEC 17024); System Certification Bodies (ISO/IEC 17021); Product Certification Bodies (ISO/IEC 17065); Inspection Bodies (ISO/IEC 17020); and Proficiency Testing Providers (ISO/IEC 17043).",
      },
      {
        q: "What are the benefits of accreditation?",
        a: "To industry and trade, accreditation facilitates trade and eliminates the need for repetitive testing, certification and inspection. To regulators, it provides a reliable and impartial basis for sound decision-making. To conformity assessment service providers — testing, calibration and medical laboratories, certification bodies and inspection bodies — accreditation is a means of demonstrating competency to clients, an effective marketing tool, and a passport to submit tenders to contractors that require independently verified conformity assessment providers. To users of accredited services and consumers, accreditation is a guarantee of reliable and comparable conformity assessment results, and it increases the reliability of products.",
      },
      {
        q: "Is AAA internationally recognized?",
        a: "AAA is an institutional member of the International Society for Quality in Health Care (ISQua), which has been working to improve the quality and safety of health care worldwide for over 30 years. The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition — meaning their development and content have been found to meet international best-practice requirements.",
      },
    ],
  },
  {
    title: "Applying for accreditation",
    items: [
      {
        q: "What are the steps to get accreditation?",
        a: "Although there may be certain differences from one application to another, the general process remains the same for all candidate bodies and follows four stages: Application, Document Review, Assessment and Decision.",
      },
      {
        q: "How do I apply?",
        a: "You send the accreditation application form to AAA and pay the application fees. AAA then issues a letter confirming that your accreditation is in process. Application forms for every accreditation program are available in our document library.",
      },
      {
        q: "What happens during document review and assessment?",
        a: "AAA reviews your application and the related documents and sends you a Document Review Compliance Report; you revise your documents according to the review results if needed. AAA then defines the assessment dates and the assessment team, conducts an on-site assessment visit, and sends an assessment report that includes a recommendation for accreditation. You implement corrective actions if needed, and the accreditation committee reviews the file for a decision.",
      },
      {
        q: "How long is an AAA accreditation certificate valid?",
        a: "Once the accreditation decision is taken, AAA issues an accreditation certificate valid for 2 years, and your organization is registered in the American Directory of Competent Personnel (ADCP).",
      },
    ],
  },
  {
    title: "Healthcare accreditation",
    items: [
      {
        q: "Who can be accredited under the healthcare program?",
        a: "Hospitals, including day-care surgery centers; primary care clinics that primarily provide general healthcare services; specialty clinics, ranging from specialty practices with minor operating-room setups, including ENT and dermatology clinics; dental organizations, from single-chair dental offices to multi-unit dental clinics and hospitals; diagnostic centers, including X-ray centers, MRI centers, clinical analysis and other imaging facilities; rehabilitation centers, such as physiotherapy and occupational therapy clinics; alternative medicine units, including Ayurveda and Unani medical centers; community pharmacies; and medical travel agencies.",
      },
      {
        q: "What are the AAA accreditation standards?",
        a: "AAA's accreditation standards are a set of evidence-based criteria that healthcare organizations must meet to achieve and maintain accreditation. The standards are recognized internationally, accredited by the International Society for Quality in Health Care (ISQua), and developed by industry experts, healthcare professionals and stakeholders to reflect best practices in patient care, operational efficiency and organizational leadership.",
      },
      {
        q: "Why choose AAA for healthcare accreditation?",
        a: "AAA accreditation programs were created according to the international requirements of ISQua and in consultation with 174 international healthcare experts. Our streamlined four-step process is designed for ease and efficiency, with a dedicated advisor guiding you every step of the way. Once accredited, you receive permission to use the golden AAA accreditation symbol and mark on your healthcare documents, records and publicity materials, and you gain access to add your certified trainees and staff to the American Directory of Competent Personnel (ADCP).",
      },
      {
        q: "Can survey visits be conducted remotely?",
        a: "We offer flexible survey options, including on-site or a hybrid approach blending virtual and on-site components. A hybrid survey is conducted with one or more surveyors on-site while the remainder of the team participates remotely via video. This adaptability ensures we can accommodate your preferences and circumstances while providing a thorough and effective assessment.",
      },
      {
        q: "How can I review and comment on draft standards?",
        a: "Interested parties are welcome to contribute to the standards development process. To review and provide feedback on draft standards, submit a request by email to healthcare@aaa-accreditation.org and a copy of the relevant draft standards will be shared for consultation and comments. Feedback is gathered, analysed and used for continuous improvement according to the AAA Accreditation Standards Feedback Policy (Document No. P-HEC-10-V1).",
      },
    ],
  },
  {
    title: "Membership",
    items: [
      {
        q: "What membership options does AAA offer?",
        a: "AAA invites both organizations and individuals to join. Organizational membership is the perfect entry point for institutions aspiring to be aligned with AAA without undergoing the full accreditation process. Individual membership is designed for professionals passionate about shaping accreditation standards — industry experts, educators and quality professionals.",
      },
      {
        q: "What does individual membership cost and require?",
        a: "Individual membership lasts 2 years and costs $350. Eligibility requirements are an updated CV, a university degree, and evidence of competency and qualifications in the relevant field. Benefits include an official membership certificate validated through our platform with a unique URL, one free training course each year, listing in the American Directory for Competent Persons (ADCP), a QR-coded membership email signature, free educational webinars, publication of two articles or papers annually on the AAA website, networking opportunities, and eligibility to join AAA Technical Committees.",
      },
      {
        q: "What does organizational membership cost and include?",
        a: "Organizational membership costs $500 for 1 year, and membership fees are deducted from accreditation fees if an accreditation application is submitted within the first year of the membership duration. Members receive an official membership certificate, are allowed to use the AAA Membership Logo on their website and promotional material, and two members of the institution are eligible to attend one free training course each year and be listed in the American Directory for Competent Persons (ADCP), alongside webinars, content contribution, networking and technical committee eligibility.",
      },
    ],
  },
];

const TOTAL_QUESTIONS = GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="FAQ"
        title={<>Frequently asked <em>questions.</em></>}
        intro="Clear answers about AAA, our accreditation programs, the application process, healthcare accreditation and membership."
        crumbs={[{ label: "FAQ" }]}
        meta={[
          { k: "Topics", v: String(GROUPS.length) },
          { k: "Questions", v: String(TOTAL_QUESTIONS) },
        ]}
      />
      <section className="hc-faq">
        <div className="container">
          <div className="grid">
            <div className="side reveal">
              <span className="eyebrow">Frequently asked</span>
              <h2>Everything you need to know before you apply.</h2>
              <p>
                Don&apos;t see your question? Email{" "}
                <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a> or call{" "}
                <a href="tel:+15716012616">+1 (571) 601 2616</a> and we&apos;ll get back to you very soon.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-primary">
                  Contact us <Icon name="arrow" size={14} className="arrow" />
                </Link>
                <Link href="/documents" className="btn btn-ghost">
                  Document library
                </Link>
              </div>
            </div>
            <div className="reveal">
              {GROUPS.map((g, gi) => (
                <div key={g.title} style={{ marginTop: gi === 0 ? 0 : 56 }}>
                  <span className="eyebrow">{g.title}</span>
                  <div className="list" style={{ marginTop: 18 }}>
                    {g.items.map((f, i) => (
                      <details className="hc-faq-item" key={f.q} open={gi === 0 && i === 0}>
                        <summary>
                          <span>{f.q}</span>
                          <span className="plus">
                            <Icon name="arrow" size={12} strokeWidth={2} />
                          </span>
                        </summary>
                        <div className="answer">{f.a}</div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
