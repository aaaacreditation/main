import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import PageBody from "../../_components/PageBody";
import Icon from "../../_components/Icon";
import CTA from "../../_components/CTA";

export const metadata: Metadata = {
  title: "Training & Education Providers Accreditation (ASTM E2659)",
  description:
    "AAA accredits training and education providers — academies, centers, agencies, and organizations — based on the international American standard ASTM E2659.",
};

const APPLY_URL =
  "https://aaa-accreditation.org/wp-content/uploads/2023/01/Application-form-Training-education-providers.docx";

const DOCS = [
  {
    ttl: "Guideline for accreditation of training providers",
    meta: "PDF",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Guidline-for-accreditation-of-training-providers.pdf",
  },
  {
    ttl: "Application form for training providers",
    meta: "DOC",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-training-providers.doc",
  },
  {
    ttl: "General requirements for accreditation",
    meta: "PDF",
    href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
  },
  {
    ttl: "Requirements for use of accreditation symbols",
    meta: "PDF",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Accreditation Program"
        title={
          <>
            Training &amp; Education Providers <em>Accreditation.</em>
          </>
        }
        intro="AAA provides accreditation to education and training service providers — academies, centers, agencies, and organizations — based on the international American standard ASTM E2659."
        crumbs={[
          { href: "/programs/healthcare", label: "Programs" },
          { label: "Training & Education Providers" },
        ]}
        meta={[
          { k: "Anchor standard", v: "ASTM E2659" },
          { k: "Applies to", v: "Training & education providers" },
        ]}
      />
      <PageBody label="Program overview">
        <h2>About the program</h2>
        <p>
          AAA provides accreditation to education and training service providers — academies,
          centers, agencies, and organizations that deliver training courses in several fields
          and majors, such as managerial, social, humanitarian, media, IT, and vocational
          courses, continuing learning, blended learning, and all other types of training and
          scopes. The accreditation is based on the international American standard{" "}
          <strong>ASTM E2659</strong>.
        </p>
        <p>
          Getting accredited requires training providers to demonstrate that they are competent,
          that their trainers are qualified, and that their curricula meet the requirements.
        </p>
        <p>
          The accreditation process involves an evaluation of the training provider&apos;s
          corporate structure, facilities, staffing, curriculum, product development, and
          administration.
        </p>

        <h2 style={{ marginTop: 48 }}>Benefits of AAA accreditation for training providers</h2>
        <ul className="bullets">
          <li>
            <strong>Mark of quality</strong> — AAA is an independent, well-established, and
            globally recognized accreditation body. Once accredited, an organization can display
            the appropriate AAA logo and accreditation statement on its publicity materials.
          </li>
          <li>
            <strong>Listing on the American Directory of Accredited Organizations (ADAO)</strong>{" "}
            — accredited organizations are listed on the ADAO, providing information for
            external agencies, partners, and prospective trainees about the organization and the
            courses offered.
          </li>
          <li>
            <strong>Listing on the American Directory for Competent Personnel (ADCP)</strong> —
            persons trained and certified by an accredited training provider are listed on the
            ADCP, providing information for the public about the person and the certificate
            achieved.
          </li>
          <li>
            <strong>Webinar service</strong> — accredited organizations receive invitations to
            join webinars covering a variety of topics related to training providers and their
            standards.
          </li>
          <li>
            <strong>Raising standards</strong> — AAA assessments are conducted by highly
            experienced assessors with extensive knowledge of the sector, who can provide
            accredited organizations with invaluable advice on their quality assurance processes
            through the assessment.
          </li>
          <li>
            <strong>Marketing support pack</strong> — accredited organizations are provided with
            free marketing resources (logos, symbols, statements) to support stakeholder
            engagement, marketing campaigns, and business development activities.
          </li>
          <li>
            <strong>Staying informed</strong> — continual advice and updates on sector changes
            are provided through regular newsletters, posts on the AAA website, and social
            media.
          </li>
        </ul>

        <h2 style={{ marginTop: 48 }}>Related documents</h2>
        <p>
          The following documents relate to the accreditation of training providers.
        </p>
        <ul className="doc-list">
          {DOCS.map((d) => (
            <li key={d.ttl}>
              <span className="ico"><Icon name="doc" size={18} /></span>
              <div>
                <div className="ttl">{d.ttl}</div>
                <div className="meta">{d.meta}</div>
              </div>
              <a href={d.href} className="dl">
                Download <Icon name="download" size={12} />
              </a>
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: 48 }}>Apply for accreditation</h2>
        <p>
          You can apply for accreditation today — download the application form to begin, or
          request a quote from our team.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={APPLY_URL} className="btn btn-primary">
            Apply Now <Icon name="arrow" size={14} className="arrow" />
          </a>
          <Link href="/quote" className="btn btn-ghost">Request a Quote</Link>
        </div>

        <h2 style={{ marginTop: 56 }}>Related programs</h2>
        <ul className="bullets">
          <li>
            <Link href="/programs/training-education" className="ed-link">
              Training &amp; Education Providers
            </Link>
          </li>
          <li>
            <Link href="/programs/iso-17024" className="ed-link">
              Personnel Certification Bodies (ISO/IEC 17024)
            </Link>
          </li>
        </ul>
      </PageBody>
      <CTA />
    </>
  );
}
