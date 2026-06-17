import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import Icon from "../_components/Icon";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "The AAA document library — ILAC and IAF documents, application forms, accreditation requirements, policies and checklists for every AAA accreditation program.",
};

type Doc = { ttl: string; meta: string; href: string };
type Group = { eyebrow: string; heading: string; docs: Doc[] };

const GENERAL_REQUIREMENTS: Doc = {
  ttl: "General requirements for accreditation",
  meta: "PDF · AAA",
  href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
};

const ACCREDITATION_SYMBOLS: Doc = {
  ttl: "Requirements for use of accreditation symbols",
  meta: "PDF · AAA",
  href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
};

const MULTI_SITE: Doc = {
  ttl: "Requirements for accreditation of multi-site conformity assessment bodies",
  meta: "PDF · AAA",
  href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
};

const SYSTEM_PRODUCT_APPLICATION: Doc = {
  ttl: "Application form for accreditation of system/product certification body",
  meta: "DOC · AAA application form",
  href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc",
};

const GROUPS: Group[] = [
  {
    eyebrow: "International documents",
    heading: "ILAC/IAF documents.",
    docs: [
      {
        ttl: "ILAC P9:06/2014 ILAC Policy for Participation in Proficiency Testing Activities",
        meta: "PDF · ILAC",
        href: "https://ilac.org/?ddownload=3259",
      },
      {
        ttl: "ILAC P10:01/2013 ILAC Policy on Traceability of Measurement Results",
        meta: "PDF · ILAC",
        href: "https://ilac.org/?ddownload=840",
      },
      {
        ttl: "ILAC P13:10/2010 Application of ISO/IEC 17011 for the Accreditation of Proficiency Testing Providers",
        meta: "PDF · ILAC",
        href: "https://ilac.org/?ddownload=843",
      },
      {
        ttl: "ILAC P14:01/2013 ILAC Policy for Uncertainty in Calibration",
        meta: "PDF · ILAC",
        href: "https://ilac.org/?ddownload=844",
      },
      {
        ttl: "ILAC P15:07/2016 Application of ISO/IEC 17020:2012 for the Accreditation of Inspection Bodies",
        meta: "PDF · ILAC",
        href: "https://ilac.org/?ddownload=3264",
      },
      {
        ttl: "IAF MD 1:2018 IAF Mandatory Document for the Audit and Certification of a Management System Operated by a Multi-Site Organization",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/MD1Issue2Jan2018Pub29012018.pdf",
      },
      {
        ttl: "IAF MD 2:2017 IAF Mandatory Document for the Transfer of Accredited Certification of Management Systems",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAFMD22017Pub.pdf",
      },
      {
        ttl: "IAF MD 3:2008 Advanced Surveillance and Recertification Procedures (ASRP)",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/upFiles/IAFMD32008_ASRP_Pub_issue_1_v2.pdf",
      },
      {
        ttl: "IAF MD 4:2018 IAF Mandatory Document for the Use of Information and Communication Technology (ICT) for Auditing/Assessment Purposes",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/upFiles/IAF%20MD4%20Issue%202%2003072018.pdf",
      },
      {
        ttl: "IAF MD 5:2019 Determination of Audit Time of Quality, Environmental, and Occupational Health & Safety Management Systems",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/upFiles/IAF%20MD5%20Issue%204%20Version%202%2011112019.pdf",
      },
      {
        ttl: "IAF MD 5:2015 Determination of Audit Time of Quality and Environmental Management Systems",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAFMD5QMSEMSAuditDurationIssue311062015.pdf",
      },
      {
        ttl: "IAF MD 6:2014 Application of ISO 14065:2013",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/MD6_2014_Issue_2_Publication_Copy_23032014.pdf",
      },
      {
        ttl: "IAF MD 9:2017 Application of ISO/IEC 17021-1 in the Field of Medical Device Quality Management Systems (ISO 13485)",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAFMD9Issue309062017.pdf",
      },
      {
        ttl: "IAF MD 10:2013 IAF Mandatory Document for Assessment of Certification Body Management of Competence in Accordance with ISO/IEC 17021:2011",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/upFiles/IAFMD102013CB_Competence.pdf",
      },
      {
        ttl: "IAF MD 11:2019 IAF Mandatory Document for the Application of ISO/IEC 17021-1 for Audits of Integrated Management Systems",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/upFiles/IAF%20MD11%20Issue%202%20Version%202%2003072019.pdf",
      },
      {
        ttl: "IAF MD 12:2016 Accreditation Assessment of Conformity Assessment Bodies with Activities in Multiple Countries",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAFMD122016Issue206012016.pdf",
      },
      {
        ttl: "IAF MD 13:2015 Knowledge Requirements for Accreditation Body Personnel for Information Security Management Systems (ISO/IEC 27001)",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAFMD13ISMSABcompetenceIssue1Version228052015.pdf",
      },
      {
        ttl: "IAF MD 14:2014 Application of ISO/IEC 17011 in Greenhouse Gas Validation and Verification (ISO 14065:2013)",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAF_MD_Appln_17011_GHGVV_09072014_Publication_Version.pdf",
      },
      {
        ttl: "IAF MD 15:2014 IAF Mandatory Document for the Collection of Data to Provide Indicators of Management System Certification Bodies' Performance",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAF_MD15CB_IndicatorsIssue_114072014_PublicationVersion.pdf",
      },
      {
        ttl: "IAF MD 21:2018 Requirements for the Migration to ISO 45001:2018 from OHSAS 18001:2007",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/workstation/upFiles/IAFMD21MigrationtoISO450012018Pub.pdf",
      },
      {
        ttl: "IAF MD 22:2019 Application of ISO/IEC 17021-1 for the Certification of Occupational Health and Safety Management Systems (OH&SMS)",
        meta: "PDF · IAF",
        href: "https://www.iaf.nu/upFiles/IAF%20MD22%20Issue%202%2007052019.pdf",
      },
    ],
  },
  {
    eyebrow: "Training providers",
    heading: "Training providers accreditation.",
    docs: [
      {
        ttl: "Guideline for accreditation of training providers",
        meta: "PDF · AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Guidline-for-accreditation-of-training-providers.pdf",
      },
      {
        ttl: "Application form for training providers",
        meta: "DOC · AAA application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-training-providers.doc",
      },
      GENERAL_REQUIREMENTS,
      ACCREDITATION_SYMBOLS,
    ],
  },
  {
    eyebrow: "Laboratories",
    heading: "Testing/calibration laboratories accreditation.",
    docs: [
      {
        ttl: "Application form for accreditation of testing / calibration labs",
        meta: "DOC · AAA application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-testing-cal-labs.doc",
      },
      {
        ttl: "Proficiency Testing policy",
        meta: "PDF · AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Proficiency-Testing-policy.pdf",
      },
      {
        ttl: "Measurement Traceability policy",
        meta: "PDF · AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Measurement-Traceability-policy.pdf",
      },
      {
        ttl: "Determination of uncertainty of measurement policy",
        meta: "PDF · AAA",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Determination-of-uncertainty-of-measurement-policy.pdf",
      },
      GENERAL_REQUIREMENTS,
      ACCREDITATION_SYMBOLS,
      MULTI_SITE,
    ],
  },
  {
    eyebrow: "Medical laboratories",
    heading: "Medical laboratories accreditation.",
    docs: [
      {
        ttl: "Application form for accreditation of medical labs",
        meta: "DOC · AAA application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-for-accreditation-of-medical-labs.doc",
      },
      GENERAL_REQUIREMENTS,
      ACCREDITATION_SYMBOLS,
      MULTI_SITE,
    ],
  },
  {
    eyebrow: "Personnel certification",
    heading: "Personnel certification bodies accreditation.",
    docs: [
      {
        ttl: "Application form for accreditation of personnel certification body",
        meta: "DOC · AAA application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-personnel-certfication.doc",
      },
      GENERAL_REQUIREMENTS,
      ACCREDITATION_SYMBOLS,
      MULTI_SITE,
    ],
  },
  {
    eyebrow: "System certification",
    heading: "System certification bodies accreditation.",
    docs: [SYSTEM_PRODUCT_APPLICATION, GENERAL_REQUIREMENTS, ACCREDITATION_SYMBOLS, MULTI_SITE],
  },
  {
    eyebrow: "Product certification",
    heading: "Product certification bodies accreditation.",
    docs: [SYSTEM_PRODUCT_APPLICATION, GENERAL_REQUIREMENTS, ACCREDITATION_SYMBOLS, MULTI_SITE],
  },
  {
    eyebrow: "Inspection bodies",
    heading: "Inspection bodies accreditation.",
    docs: [
      {
        ttl: "Application form for accreditation of Inspection Bodies",
        meta: "DOC · AAA application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-Inspection-Bodies.doc",
      },
      {
        ttl: "Checklist for ISO/IEC 17020",
        meta: "DOCX · AAA checklist",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-ISO-17020.docx",
      },
      GENERAL_REQUIREMENTS,
      ACCREDITATION_SYMBOLS,
      MULTI_SITE,
    ],
  },
  {
    eyebrow: "Proficiency testing",
    heading: "Proficiency testing providers accreditation.",
    docs: [
      {
        ttl: "Application form for accreditation of PT providers",
        meta: "DOC · AAA application form",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-PT-providers.doc",
      },
      {
        ttl: "Checklist for ISO/IEC 17043",
        meta: "DOCX · AAA checklist",
        href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-for-ISO-17043.docx",
      },
      GENERAL_REQUIREMENTS,
      ACCREDITATION_SYMBOLS,
      MULTI_SITE,
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Documents"
        title={<>Public <em>document library.</em></>}
        intro="ILAC/IAF documents, application forms, requirements, policies and checklists for every AAA accreditation program — published in full and free to download."
        crumbs={[{ label: "Documents" }]}
        meta={[
          { k: "Categories", v: "9" },
          { k: "Sources", v: "AAA · ILAC · IAF" },
        ]}
      />
      {GROUPS.map((g, gi) => (
        <section className={gi === 0 ? "block" : "block tight"} key={g.heading}>
          <div className="container">
            <div className="block-head reveal">
              <div>
                <span className="eyebrow">{g.eyebrow}</span>
                <h2 className="section-heading">{g.heading}</h2>
              </div>
            </div>
            <ul className="doc-list">
              {g.docs.map((d) => (
                <li key={d.ttl} className="reveal">
                  <span className="ico"><Icon name="doc" size={18} /></span>
                  <div>
                    <div className="ttl">{d.ttl}</div>
                    <div className="meta">{d.meta}</div>
                  </div>
                  <a href={d.href} className="dl" target="_blank" rel="noopener noreferrer">
                    Download <Icon name="download" size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CTA />
    </>
  );
}
