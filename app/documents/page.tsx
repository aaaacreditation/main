import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import "./documents.css";

export const metadata = pageMeta({
  title: "Document Library",
  description:
    "Download AAA application forms, accreditation requirements, policies and checklists — plus the ILAC and IAF documents behind them. Free, no signup.",
  path: "/documents",
  keywords: [
    "accreditation application form",
    "AAA accreditation requirements",
    "ILAC documents",
    "IAF mandatory documents",
    "ISO 17020 checklist",
    "ISO 17043 checklist",
  ],
});

/* -------------------------------------------------------------------------
   Every href below is the live, published URL on aaa-accreditation.org,
   ilac.org or iaf.nu and must be preserved verbatim — printed application
   packs and older correspondence point at these exact addresses.
   ------------------------------------------------------------------------- */

type Kind = "PDF" | "DOC" | "DOCX";
type Source = "AAA" | "ILAC" | "IAF";
type Doc = { ttl: string; kind: Kind; source: Source; note?: string; href: string };

/* ---- The four documents that apply to every AAA accreditation program ---- */

const GENERAL_REQUIREMENTS: Doc = {
  ttl: "General requirements for accreditation",
  kind: "PDF",
  source: "AAA",
  note: "Version 2",
  href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
};

const ACCREDITATION_SYMBOLS: Doc = {
  ttl: "Requirements for use of accreditation symbols",
  kind: "PDF",
  source: "AAA",
  href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
};

const MULTI_SITE: Doc = {
  ttl: "Requirements for accreditation of multi-site conformity assessment bodies",
  kind: "PDF",
  source: "AAA",
  href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
};

// Recovered from the legacy /aaa-standards page, which held nothing but this
// download and had no home in the new site structure.
const AAA_STANDARDS: Doc = {
  ttl: "AAA Accreditation Standards",
  kind: "PDF",
  source: "AAA",
  note: "Version 1",
  href: "https://aaa-accreditation.org/wp-content/uploads/2024/11/AAA-Accreditation-Standards-v-1.pdf",
};

const CORE: { doc: Doc; blurb: string }[] = [
  {
    doc: GENERAL_REQUIREMENTS,
    blurb:
      "The baseline rules every applicant and accredited body works to — the conditions for granting, maintaining and withdrawing AAA accreditation.",
  },
  {
    doc: AAA_STANDARDS,
    blurb:
      "The AAA Accreditation Standards, assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition.",
  },
  {
    doc: ACCREDITATION_SYMBOLS,
    blurb:
      "How the AAA accreditation symbol and marks may be used on certificates, reports, websites and publicity material once you are accredited.",
  },
  {
    doc: MULTI_SITE,
    blurb:
      "How accreditation is assessed and granted when a conformity assessment body operates from more than one site or office.",
  },
];

const SYSTEM_PRODUCT_APPLICATION: Doc = {
  ttl: "Application form — system / product certification body",
  kind: "DOC",
  source: "AAA",
  note: "Application form",
  href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc",
};

/* ------------------------- Per-program document packs -------------------- */

type Group = {
  id: string;
  eyebrow: string;
  heading: string;
  blurb: string;
  program?: { href: string; label: string };
  docs: Doc[];
};

const PROGRAMS: Group[] = [
  {
    id: "training-providers",
    eyebrow: "Training providers",
    heading: "Training providers accreditation",
    blurb:
      "For organizations delivering training and continuing-education programs that need their courses independently recognized.",
    program: { href: "/programs/training-education", label: "Training & education program" },
    docs: [
      {
        ttl: "Guideline for accreditation of training providers",
        kind: "PDF",
        source: "AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Guidline-for-accreditation-of-training-providers.pdf",
      },
      {
        ttl: "Application form — training providers",
        kind: "DOC",
        source: "AAA",
        note: "Application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-training-providers.doc",
      },
    ],
  },
  {
    id: "laboratories",
    eyebrow: "ISO/IEC 17025",
    heading: "Testing & calibration laboratories",
    blurb:
      "For laboratories seeking accreditation to ISO/IEC 17025, including the AAA policies on proficiency testing, traceability and measurement uncertainty.",
    program: { href: "/programs/iso-17025", label: "ISO/IEC 17025 program" },
    docs: [
      {
        ttl: "Application form — testing / calibration laboratories",
        kind: "DOC",
        source: "AAA",
        note: "Application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-testing-cal-labs.doc",
      },
      {
        ttl: "Proficiency Testing policy",
        kind: "PDF",
        source: "AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Proficiency-Testing-policy.pdf",
      },
      {
        ttl: "Measurement Traceability policy",
        kind: "PDF",
        source: "AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Measurement-Traceability-policy.pdf",
      },
      {
        ttl: "Determination of uncertainty of measurement policy",
        kind: "PDF",
        source: "AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Determination-of-uncertainty-of-measurement-policy.pdf",
      },
    ],
  },
  {
    id: "medical-laboratories",
    eyebrow: "ISO 15189",
    heading: "Medical laboratories",
    blurb:
      "For clinical and medical laboratories seeking accreditation to ISO 15189 for quality and competence.",
    program: { href: "/programs/iso-15189", label: "ISO 15189 program" },
    docs: [
      {
        ttl: "Application form — medical laboratories",
        kind: "DOC",
        source: "AAA",
        note: "Application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-for-accreditation-of-medical-labs.doc",
      },
    ],
  },
  {
    id: "personnel-certification",
    eyebrow: "ISO/IEC 17024",
    heading: "Personnel certification bodies",
    blurb:
      "For bodies certifying the competence of individuals against a defined certification scheme.",
    program: { href: "/programs/iso-17024", label: "ISO/IEC 17024 program" },
    docs: [
      {
        ttl: "Application form — personnel certification body",
        kind: "DOC",
        source: "AAA",
        note: "Application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-personnel-certfication.doc",
      },
    ],
  },
  {
    id: "management-systems",
    eyebrow: "ISO/IEC 17021-1",
    heading: "Management systems certification bodies",
    blurb:
      "For certification bodies auditing and certifying management systems — ISO 9001, 14001, 45001, 27001, 22000 and other schemes.",
    program: {
      href: "/programs/iso-17021",
      label: "Management Systems Certification Bodies Accreditation",
    },
    docs: [SYSTEM_PRODUCT_APPLICATION],
  },
  {
    id: "product-certification",
    eyebrow: "ISO/IEC 17065",
    heading: "Product certification bodies",
    blurb:
      "For bodies certifying products, processes and services. The application form is shared with the management-systems route.",
    program: { href: "/programs/iso-17065", label: "ISO/IEC 17065 program" },
    docs: [SYSTEM_PRODUCT_APPLICATION],
  },
  {
    id: "inspection-bodies",
    eyebrow: "ISO/IEC 17020",
    heading: "Inspection bodies",
    blurb:
      "For inspection bodies seeking accreditation to ISO/IEC 17020, including the self-assessment checklist.",
    program: { href: "/programs/iso-17020", label: "ISO/IEC 17020 program" },
    docs: [
      {
        ttl: "Application form — inspection bodies",
        kind: "DOC",
        source: "AAA",
        note: "Application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-Inspection-Bodies.doc",
      },
      {
        ttl: "Checklist for ISO/IEC 17020",
        kind: "DOCX",
        source: "AAA",
        note: "Self-assessment checklist",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-ISO-17020.docx",
      },
    ],
  },
  {
    id: "proficiency-testing",
    eyebrow: "ISO/IEC 17043",
    heading: "Proficiency testing providers",
    blurb:
      "For providers of proficiency testing schemes seeking accreditation to ISO/IEC 17043, including the self-assessment checklist.",
    program: { href: "/programs/iso-17043", label: "ISO/IEC 17043 program" },
    docs: [
      {
        ttl: "Application form — proficiency testing providers",
        kind: "DOC",
        source: "AAA",
        note: "Application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-PT-providers.doc",
      },
      {
        ttl: "Checklist for ISO/IEC 17043",
        kind: "DOCX",
        source: "AAA",
        note: "Self-assessment checklist",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-for-ISO-17043.docx",
      },
    ],
  },
];

/* --------------------- International reference documents ----------------- */

const ILAC_DOCS: Doc[] = [
  {
    ttl: "ILAC P9:06/2014 — ILAC Policy for Participation in Proficiency Testing Activities",
    kind: "PDF",
    source: "ILAC",
    href: "https://ilac.org/?ddownload=3259",
  },
  {
    ttl: "ILAC P10:01/2013 — ILAC Policy on Traceability of Measurement Results",
    kind: "PDF",
    source: "ILAC",
    href: "https://ilac.org/?ddownload=840",
  },
  {
    ttl: "ILAC P13:10/2010 — Application of ISO/IEC 17011 for the Accreditation of Proficiency Testing Providers",
    kind: "PDF",
    source: "ILAC",
    href: "https://ilac.org/?ddownload=843",
  },
  {
    ttl: "ILAC P14:01/2013 — ILAC Policy for Uncertainty in Calibration",
    kind: "PDF",
    source: "ILAC",
    href: "https://ilac.org/?ddownload=844",
  },
  {
    ttl: "ILAC P15:07/2016 — Application of ISO/IEC 17020:2012 for the Accreditation of Inspection Bodies",
    kind: "PDF",
    source: "ILAC",
    href: "https://ilac.org/?ddownload=3264",
  },
];

const IAF_DOCS: Doc[] = [
  {
    ttl: "IAF MD 1:2018 — Audit and Certification of a Management System Operated by a Multi-Site Organization",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/MD1Issue2Jan2018Pub29012018.pdf",
  },
  {
    ttl: "IAF MD 2:2017 — Transfer of Accredited Certification of Management Systems",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAFMD22017Pub.pdf",
  },
  {
    ttl: "IAF MD 3:2008 — Advanced Surveillance and Recertification Procedures (ASRP)",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/upFiles/IAFMD32008_ASRP_Pub_issue_1_v2.pdf",
  },
  {
    ttl: "IAF MD 4:2018 — Use of Information and Communication Technology (ICT) for Auditing/Assessment Purposes",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/upFiles/IAF%20MD4%20Issue%202%2003072018.pdf",
  },
  {
    ttl: "IAF MD 5:2019 — Determination of Audit Time of Quality, Environmental, and Occupational Health & Safety Management Systems",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/upFiles/IAF%20MD5%20Issue%204%20Version%202%2011112019.pdf",
  },
  {
    ttl: "IAF MD 5:2015 — Determination of Audit Time of Quality and Environmental Management Systems",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAFMD5QMSEMSAuditDurationIssue311062015.pdf",
  },
  {
    ttl: "IAF MD 6:2014 — Application of ISO 14065:2013",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/MD6_2014_Issue_2_Publication_Copy_23032014.pdf",
  },
  {
    ttl: "IAF MD 9:2017 — Application of ISO/IEC 17021-1 in the Field of Medical Device Quality Management Systems (ISO 13485)",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAFMD9Issue309062017.pdf",
  },
  {
    ttl: "IAF MD 10:2013 — Assessment of Certification Body Management of Competence in Accordance with ISO/IEC 17021:2011",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/upFiles/IAFMD102013CB_Competence.pdf",
  },
  {
    ttl: "IAF MD 11:2019 — Application of ISO/IEC 17021-1 for Audits of Integrated Management Systems",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/upFiles/IAF%20MD11%20Issue%202%20Version%202%2003072019.pdf",
  },
  {
    ttl: "IAF MD 12:2016 — Accreditation Assessment of Conformity Assessment Bodies with Activities in Multiple Countries",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAFMD122016Issue206012016.pdf",
  },
  {
    ttl: "IAF MD 13:2015 — Knowledge Requirements for Accreditation Body Personnel for Information Security Management Systems (ISO/IEC 27001)",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAFMD13ISMSABcompetenceIssue1Version228052015.pdf",
  },
  {
    ttl: "IAF MD 14:2014 — Application of ISO/IEC 17011 in Greenhouse Gas Validation and Verification (ISO 14065:2013)",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAF_MD_Appln_17011_GHGVV_09072014_Publication_Version.pdf",
  },
  {
    ttl: "IAF MD 15:2014 — Collection of Data to Provide Indicators of Management System Certification Bodies' Performance",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAF_MD15CB_IndicatorsIssue_114072014_PublicationVersion.pdf",
  },
  {
    ttl: "IAF MD 21:2018 — Requirements for the Migration to ISO 45001:2018 from OHSAS 18001:2007",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/workstation/upFiles/IAFMD21MigrationtoISO450012018Pub.pdf",
  },
  {
    ttl: "IAF MD 22:2019 — Application of ISO/IEC 17021-1 for the Certification of Occupational Health and Safety Management Systems (OH&SMS)",
    kind: "PDF",
    source: "IAF",
    href: "https://www.iaf.nu/upFiles/IAF%20MD22%20Issue%202%2007052019.pdf",
  },
];

const REFERENCE: Group[] = [
  {
    id: "ilac",
    eyebrow: "ILAC",
    heading: "ILAC policy documents",
    blurb:
      "International Laboratory Accreditation Cooperation policies on proficiency testing, traceability, calibration uncertainty and inspection-body accreditation.",
    docs: ILAC_DOCS,
  },
  {
    id: "iaf",
    eyebrow: "IAF",
    heading: "IAF mandatory documents",
    blurb:
      "International Accreditation Forum mandatory documents governing how management-system certification is audited, transferred, timed and reported.",
    docs: IAF_DOCS,
  },
];

const TOTAL_DOCS =
  CORE.length +
  new Set(PROGRAMS.flatMap((g) => g.docs.map((d) => d.href))).size +
  ILAC_DOCS.length +
  IAF_DOCS.length;

const FAQ = [
  {
    q: "Are AAA documents free to download?",
    a: "Yes. Every document in the AAA library — application forms, accreditation requirements, policies and checklists — is published in full and free to download, with no registration.",
  },
  {
    q: "Which documents apply to every AAA accreditation program?",
    a: "Four documents apply across all programs: the General requirements for accreditation, the AAA Accreditation Standards, the Requirements for use of accreditation symbols, and the Requirements for accreditation of multi-site conformity assessment bodies. Each program then adds its own application form and, where relevant, technical policies or a self-assessment checklist.",
  },
  {
    q: "Where do I find the application form for my program?",
    a: "Each accreditation program has its own application form, listed in that program's section of this library. Send the completed form to AAA with the application fees; AAA then issues a letter confirming that your accreditation is in process.",
  },
  {
    q: "What are the ILAC and IAF documents in this library?",
    a: "ILAC and IAF are the international organizations for accreditation bodies operating in accordance with ISO/IEC 17011 and involved in the accreditation of conformity assessment bodies, including laboratories, inspection bodies and certification bodies. Their published policies and mandatory documents are referenced throughout AAA's own requirements, so they are collected here for convenience.",
  },
];

function LineIcon({ children, strokeWidth = 1.7 }: { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function DocRow({ doc }: { doc: Doc }) {
  return (
    <li className="dlx-row reveal">
      <span className={`dlx-type ${doc.kind.toLowerCase()}`} aria-hidden="true">
        {doc.kind}
      </span>
      <div className="dlx-row-body">
        <p className="dlx-row-ttl">{doc.ttl}</p>
        <p className="dlx-row-meta">
          <span className={"dlx-src" + (doc.source === "AAA" ? " aaa" : "")}>{doc.source}</span>
          <span>{doc.kind} document</span>
          {doc.note && (
            <>
              <span className="dlx-dot" aria-hidden="true">
                ·
              </span>
              <span>{doc.note}</span>
            </>
          )}
        </p>
      </div>
      <a
        className="dlx-get"
        href={doc.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${doc.ttl} (${doc.kind})`}
      >
        <Icon name="download" size={13} />
        Download
      </a>
    </li>
  );
}

function DocGroup({ group }: { group: Group }) {
  return (
    <div className="dlx-group" id={group.id}>
      <div className="dlx-group-head reveal">
        <div>
          <span className="eyebrow">{group.eyebrow}</span>
          <h3>{group.heading}</h3>
          <p>{group.blurb}</p>
        </div>
        {group.program && (
          <Link className="dlx-group-link" href={group.program.href}>
            {group.program.label} <Icon name="arrow" size={13} />
          </Link>
        )}
      </div>
      <ul className="dlx-list">
        {group.docs.map((d) => (
          <DocRow doc={d} key={`${group.id}-${d.href}`} />
        ))}
      </ul>
      {group.program && (
        <div className="ax-note dlx-also reveal">
          <span className="ax-ico" style={{ width: 18, height: 18, flex: "none", marginTop: 2 }} aria-hidden="true">
            <LineIcon strokeWidth={2}>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 16v-5M12 8h.01" />
            </LineIcon>
          </span>
          <span>
            <strong>Also required for this program</strong>
            The four <a href="#core">core documents</a> above — general requirements,
            accreditation standards, use of symbols and multi-site requirements — apply to every
            AAA accreditation program, including this one.
          </span>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="axp dlx">
      <JsonLd
        schema={[breadcrumbSchema([{ name: "Documents", path: "/documents" }]), faqSchema(FAQ)]}
      />

      <PageHero
        image="/about/assessment.jpg"
        eyebrow="Documents"
        badge="Public library · Free to download"
        title={
          <>
            The AAA <em>document library.</em>
          </>
        }
        intro="Application forms, accreditation requirements, technical policies and self-assessment checklists for every AAA program — alongside the ILAC and IAF documents they are built on. Published in full, free to download, no registration."
        crumbs={[{ label: "Documents" }]}
        caption={{
          kicker: "Assessment in progress",
          title: "Every requirement we assess against is published here",
          chip: "Open access",
        }}
        meta={[
          { k: "Documents published", v: String(TOTAL_DOCS) },
          { k: "Accreditation programs", v: String(PROGRAMS.length) },
          { k: "Sources", v: "AAA · ILAC · IAF" },
          { k: "Cost", v: "Free" },
        ]}
        actions={
          <>
            <a
              href={GENERAL_REQUIREMENTS.href}
              className="ax-btn ax-btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="download" size={14} /> General requirements
            </a>
            <a href="#programs" className="ax-btn ax-btn-ghost">
              Find my program pack
            </a>
          </>
        }
      />

      {/* 01 — Core documents */}
      <section className="ax-section" id="core">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Start here</span>
            <h2>Four documents apply to every program.</h2>
            <p>
              Whatever you are applying for — a hospital, a laboratory, a certification body or a
              training provider — these are the requirements your assessment is measured against.
              Read them before you complete an application form.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div className="dlx-core" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {CORE.map(({ doc, blurb }, i) => (
              <a
                className="dlx-core-card reveal"
                key={doc.href}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <span className={`dlx-type ${doc.kind.toLowerCase()}`} aria-hidden="true">
                  {doc.kind}
                </span>
                <b>{doc.ttl}</b>
                <p>{blurb}</p>
                <i>
                  Download <Icon name="download" size={13} />
                </i>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Program index */}
      <section className="ax-section navy tight" id="index">
        <div className="container">
          <div className="ax-head reveal" style={{ maxWidth: 620 }}>
            <span className="eyebrow">Jump to a pack</span>
            <h2>Documents by accreditation program.</h2>
          </div>
          <ul className="dlx-index reveal" style={{ marginTop: 26 }}>
            {PROGRAMS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`}>
                  {g.heading}
                  <em>{g.eyebrow}</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Program document packs */}
      <section className="ax-section cream" id="programs">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Program packs</span>
            <h2>Forms, policies and checklists by program.</h2>
            <p>
              Each program adds its own application form to the core requirements — plus the
              technical policies and self-assessment checklists specific to that scope.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {PROGRAMS.map((g) => (
              <DocGroup group={g} key={g.id} />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — International reference documents */}
      <section className="ax-section" id="international">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">International documents</span>
            <h2>The ILAC and IAF documents behind our requirements.</h2>
            <p>
              ILAC and IAF are the international organizations for accreditation bodies operating
              in accordance with ISO/IEC 17011. Their published policies and mandatory documents
              are referenced throughout AAA&rsquo;s own requirements, so they are collected here in
              full.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {REFERENCE.map((g) => (
              <DocGroup group={g} key={g.id} />
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Using the library */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Using the library</span>
            <h2>Questions about these documents.</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQ.map((item, i) => (
              <details className="ax-faq-item reveal" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Ready to apply"
        title={
          <>
            Found your form? Let&rsquo;s <em>scope your assessment.</em>
          </>
        }
        text="Send us the completed application form, or talk to an advisor first about the standards, sectors and locations your accreditation should cover."
        primary={{ href: "/apply", label: "Start an application" }}
        secondary={{ href: "/contact", label: "Ask about a document" }}
        related={[
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/faq", label: "FAQ" },
          { href: "/impartiality-policy", label: "Impartiality policy" },
        ]}
      />
    </main>
  );
}
