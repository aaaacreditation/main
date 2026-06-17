import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Safeguarding Impartiality Policy",
  description:
    "Safeguarding impartiality, transparency, objectivity and independence of all AAA operations and accreditation activities — the policy upheld by AAA top management.",
};

const MEASURES = [
  "Manages conflict of interest and any potential conflict of interest in our decision-making processes.",
  "Avoids the provision of services that affect its impartiality, such as consultancy services or suggesting the use of consultants, and does not participate in or offer any conformity assessment services that conformity assessment bodies perform.",
  "Is non-discriminatory, where its services are offered to all conformity assessment bodies (CABs) in a fair and equitable manner regardless of size, membership of any association or groups, the number of organizations already accredited, or whether from the public sector or private sector, provided that the application is within the scope of accreditation as offered.",
  "Ensures an impartial complaints and appeals procedure which is open to all stakeholders.",
  "Avoids compromising its impartiality and status in training service delivery, by offering generic training courses which do not give specific advice for the development of an organization's operations, and furthermore, not offering training courses as a precondition or guarantee of accreditation.",
  "Only offers support, training and twinning opportunities to other developing accreditation bodies in terms of meeting the necessary criteria for obtaining international recognition.",
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="Impartiality"
        title={<>Safeguarding <em>impartiality.</em></>}
        intro="Safeguarding impartiality, transparency, objectivity and independence of all AAA operations and accreditation activities is paramount to instilling confidence and trust in the integrity of AAA services to its clients and stakeholders."
        crumbs={[{ label: "Safeguarding Impartiality Policy" }]}
      />
      <PageBody label="Policy text">
        <h2>Policy statement</h2>
        <p>
          Safeguarding impartiality, transparency, objectivity and independence of all AAA
          operations and accreditation activities are paramount to instilling confidence and
          trust in the integrity of AAA services to its clients and stakeholders. Top management
          of AAA undertakes to uphold these values.
        </p>

        <h2 style={{ marginTop: 48 }}>Managing risks to impartiality</h2>
        <p>
          AAA continuously evaluates the risks to impartiality arising from its activities and
          from any conflicts arising from its or its personnel&rsquo;s relationships and
          interactions with other organizations, through various mechanisms such as internal and
          external audits, management reviews, complaints and customer satisfaction surveys. AAA
          analyzes, evaluates, treats and monitors all identified risks, and shall determine
          whether any residual risks are within an acceptable level of risk. Accreditation shall
          not be provided in areas where an unacceptable level of risk is identified, and which
          cannot be mitigated to an acceptable level.
        </p>

        <h2 style={{ marginTop: 48 }}>How this is achieved</h2>
        <p>This will be achieved by applying its policies and procedures in a manner that:</p>
        <ul className="bullets">
          {MEASURES.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </PageBody>
      <CTA />
    </>
  );
}
