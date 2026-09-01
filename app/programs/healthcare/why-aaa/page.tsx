import Image from "next/image";
import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta } from "../../../../lib/seo";
import { ArrowIcon, ClusterNav, HC_CONSULT, hcRelated } from "../cluster";
import "../hc.css";

const SELF = "/programs/healthcare/why-aaa";

export const metadata = pageMeta({
  title: "Why AAA Healthcare Accreditation? 7 Reasons",
  description:
    "Seven reasons hospitals and clinics choose AAA: ISQua-accredited standards, a simple four-step process, a dedicated advisor and flexible hybrid surveys.",
  path: SELF,
  keywords: [
    "why AAA accreditation",
    "healthcare accreditation benefits",
    "hospital accreditation advantages",
  ],
});

/* Reasons transcribed from the client's live "Why AAA Accreditation?" page. */
const REASONS: { title: string; text: string }[] = [
  {
    title: "International recognition with exceptional value",
    text: "AAA accreditation programs are created according to the international requirements of ISQua (the International Society for Quality in Health Care) and in consultation with 174 international healthcare experts around the world, to assist and improve the quality and safety of healthcare facilities.",
  },
  {
    title: "Simple accreditation process",
    text: "Our streamlined four-step process is designed for ease and efficiency. With a dedicated, professional team guiding you every step of the way, achieving accreditation is smooth, straightforward and hassle-free.",
  },
  {
    title: "Competitive advantage",
    text: "Set yourself apart from the competition. Accredited facilities are often seen as more trustworthy and reliable — accreditation from AAA is proof of your ability to meet high standards and shows your commitment to improving patient outcomes and safety. Once accredited, you are permitted to use the golden AAA accreditation symbol and mark on your healthcare documents, records and publicity materials.",
  },
  {
    title: "Enhanced support & advisory services",
    text: "You get a dedicated advisor committed to your specific needs and to making the accreditation process easy. We go beyond accreditation by offering direct support and specialized training tailored to your organization, so your team fully understands and meets the accreditation standards. A strong customer care team accompanies you throughout the process.",
  },
  {
    title: "Flexible survey visits",
    text: "We offer flexible survey options, including on-site or a hybrid approach blending virtual and on-site components. A hybrid survey is conducted with one or more surveyors on-site and the remainder of the team participating remotely by video. This adaptability lets us accommodate your preferences and circumstances while still providing a thorough and effective assessment.",
  },
  {
    title: "Exclusive access to the American Directory of Competent Personnel",
    text: "Once accredited, you can add your certified trainees and staff to the American Directory of Competent Personnel. This lets you issue digital certificates with a unique URL validated by AAA to your staff, enhancing their credentials and your organization's reputation.",
  },
  {
    title: "Broad accreditation spectrum",
    text: "We accredit a wide range of healthcare providers, not only hospitals — including polyclinics, dental services, ambulatory services, radiology centers, physiotherapy centers, laboratory services, fertility clinics, eye care services and pharmacies.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What makes AAA different from other healthcare accreditation bodies?",
    a: "AAA is the only healthcare accreditation body that will ensure you achieve accreditation through approved consultants who guide you step by step — from the first stage, or wherever you are today, until AAA healthcare accreditation is granted. That guidance includes gap analysis, training and working through the standards.",
  },
  {
    q: "Can we use the AAA accreditation mark once accredited?",
    a: "Yes. Once accredited you are permitted to use the golden AAA accreditation symbol and mark on your healthcare documents, records and publicity materials.",
  },
  {
    q: "Do surveyors have to travel to our facility?",
    a: "Not necessarily for the whole team. AAA offers on-site or hybrid surveys: one or more surveyors work on-site while the remainder of the team participates remotely via video.",
  },
  {
    q: "What is the American Directory of Competent Personnel?",
    a: "It is an AAA directory that accredited organizations can add their certified trainees and staff to, allowing digital certificates with a unique URL validated by AAA to be issued to your people.",
  },
];

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
            { name: "Why AAA Accreditation?", path: SELF },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        eyebrow="Why AAA Accreditation?"
        badge="Healthcare Accreditation · Why AAA"
        title={
          <>
            Seven reasons facilities choose <em>AAA.</em>
          </>
        }
        intro="Accreditation is a serious commitment, so the body you choose matters. These are the reasons hospitals, clinics and diagnostic centres across the world select the American Accreditation Association — and what you get that you would not get elsewhere."
        crumbs={[
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "Why AAA Accreditation?" },
        ]}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <ArrowIcon />
            </Link>
            <a href={HC_CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
        meta={[
          { k: "Reasons to choose AAA", v: "7" },
          { k: "Experts consulted", v: "174" },
          { k: "Steps to accreditation", v: "4" },
        ]}
      />

      {/* Framing */}
      <section className="ax-section">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">The short version</span>
                <h2>
                  Recognition you can prove, with support you can <em>actually use.</em>
                </h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p>
                AAA accreditation pairs internationally recognized standards — assessed and
                accredited by ISQua EEA — with something most accreditation bodies do not offer: a
                dedicated advisor and approved consultants who work alongside your team until
                accreditation is granted.
              </p>
              <p>
                The result is a programme that holds up to international scrutiny, and a route to it
                that your quality team can realistically walk.
              </p>
              <ul className="ax-checks gold">
                <li>Standards accredited by ISQua EEA</li>
                <li>Four documented stages from preparation to decision</li>
                <li>On-site or hybrid surveys to suit your circumstances</li>
                <li>Accreditation granted for three years</li>
              </ul>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/about/team-advisory.jpg"
                alt="An advisory team reviewing accreditation documentation and performance data around a table"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Dedicated advisory</span>
              <figcaption>
                A dedicated advisor is assigned to every applicant facility.
                <span>Supported by AAA&apos;s customer care team throughout</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The seven reasons */}
      <section className="ax-section cream" id="reasons">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Seven reasons</span>
            <h2>Why choose AAA as your accreditation provider</h2>
            <p>
              Each of these is a concrete, checkable difference — not a slogan. Ask any accreditation
              body you are comparing us with for the same list.
            </p>
          </div>

          <ol className="ax-reasons reveal">
            {REASONS.map((r, i) => (
              <li className="ax-reason" key={r.title}>
                <span className="ax-reason-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof band */}
      <section className="ax-section navy">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">The record behind the claims</span>
            <h2>Accreditation that travels</h2>
            <p>
              AAA works with organizations across healthcare, conformity assessment and education —
              which is why an AAA healthcare accreditation is recognized well beyond the country it
              was awarded in.
            </p>
          </div>
          <ul className="ax-stats reveal">
            <li className="ax-stat">
              <b>200+</b>
              <span>Accredited organizations</span>
            </li>
            <li className="ax-stat">
              <b>58+</b>
              <span>Countries served</span>
            </li>
            <li className="ax-stat">
              <b>100+</b>
              <span>Assessors &amp; experts</span>
            </li>
            <li className="ax-stat">
              <b>ISQua EEA</b>
              <span>Standards assessed &amp; accredited</span>
            </li>
          </ul>
          <div className="ax-actions center">
            <Link href="/programs/healthcare/international-recognition" className="ax-btn ax-btn-ghost">
              About our international recognition <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ax-section" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions we hear when facilities compare providers</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQS.map((f, i) => (
              <details className="ax-faq-item" key={f.q} open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClusterNav
        current={SELF}
        cream
        eyebrow="Keep reading"
        heading="More on healthcare accreditation"
        lead="The rest of the programme — the standards themselves, the process, who can apply and how we support you."
      />

      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Convinced? Start your <em>accreditation.</em>
          </>
        }
        text="Tell us about your facility and a dedicated advisor will come back with the applicable standards, a survey format that suits you and a realistic timeline."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to the healthcare team" }}
        related={hcRelated(SELF)}
      />
    </main>
  );
}
