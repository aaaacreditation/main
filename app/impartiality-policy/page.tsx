import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "Safeguarding Impartiality Policy" };

const COMMITMENTS = [
  { ttl: "Independence in governance", desc: "Accreditation decisions are taken by a committee with no commercial interest in the outcome." },
  { ttl: "Published impartiality policy", desc: "Our safeguarding framework, conflict-of-interest declarations, and assessor register are all public." },
  { ttl: "Documented assessment process", desc: "Every accreditation rests on a written audit trail, retained and auditable by recognition partners." },
  { ttl: "Open complaints procedure", desc: "Any party may file a complaint regarding any accreditation decision; cases are handled by an independent panel." },
  { ttl: "ISO/IEC alignment, not invention", desc: "We assess against the international standard for that activity — never criteria we authored ourselves." },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Impartiality"
        title={<>Safeguarding <em>impartiality.</em></>}
        intro="An accreditation that an interested party can influence is worth nothing. Five operating commitments protect every AAA decision — and we publish each of them so anyone can hold us to them."
        crumbs={[{ label: "Impartiality Policy" }]}
      />
      <PageBody label="Policy text">
        <h2>Scope</h2>
        <p>
          This policy applies to every member of AAA staff, every contracted assessor, and every
          member of an AAA committee involved in any accreditation decision. It governs the
          structural separation between commercial relationships and accreditation outcomes.
        </p>

        <h2 style={{ marginTop: 48 }}>Operating commitments</h2>
        <ul className="bullets">
          {COMMITMENTS.map((c) => (
            <li key={c.ttl}>
              <strong>{c.ttl}.</strong> {c.desc}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: 32 }}>
          <Link href="/documents" className="commit-doc" style={{ display: "inline-flex" }}>
            Download the full safeguarding framework <Icon name="download" size={14} />
          </Link>
        </p>
      </PageBody>
      <CTA />
    </>
  );
}
