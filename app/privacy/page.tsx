import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import "./privacy.css";

/**
 * Deliberately indexable. A privacy policy is a trust page: it is one of the
 * documents buyers, regulators and ad platforms look for, it is unique content
 * rather than boilerplate thin content, and hiding it from search removes a
 * credibility signal without protecting anything. No `noindex` here.
 */
export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "What personal data AAA collects through aaa-accreditation.org, why we collect it, the legal bases for processing, your rights, retention, cookies and security.",
  path: "/privacy",
});

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

const USES = [
  "For the purposes for which you provided it;",
  "To respond to Users' questions and/or comments;",
  "To provide products, services or information to Users;",
  "To process a User's purchase;",
  "To provide a User with details of his or her account status;",
  "To customize the advertising and content you see on the Site;",
  "To notify a User about new features of the Site, or products, services, special offers, or other information that we believe will be of interest to a User;",
  "To perform analytics and research used in marketing, promotion, or similar activities;",
  "To monitor Site performance and perform analytics and research aimed at improving the accuracy, effectiveness, usability, or popularity of the Site;",
  "To enforce the legal terms that govern a User's use of the Site and otherwise establish, exercise, or defend our legal rights where it is necessary for our legitimate interests or the legitimate interests of others;",
  "To prevent fraud and other prohibited or illegal activities;",
  "To administer sweepstakes and contests;",
  "To ensure that AAA complies with applicable laws, procedures, and regulations which apply to use where it is necessary for our legitimate interests or the legitimate interests of others.",
];

const RIGHTS = [
  "Provide access to and/or a copy of certain information we hold about you;",
  "Prevent the processing of your information for direct-marketing purposes (including any direct marketing processing based on profiling);",
  "Update information which is out of date or incorrect;",
  "Delete certain information which we are holding about you;",
  "Restrict the way that we process and disclose certain of your information;",
  "Revoke your consent for the processing of your information.",
];

const SUMMARY: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "What we collect",
    text: "The details you type into a form on this site — name, phone and fax, mailing and billing address, email — plus information you give us about your professional expertise and experience.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    title: "Why we collect it",
    text: "To answer your question, deliver the service you asked for, run and improve this site, meet our legal obligations, and prevent fraud.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-5M12 8h.01" />
      </>
    ),
  },
  {
    title: "Your rights",
    text: "Depending on where you are, you can ask for a copy of your data, correct it, delete it, restrict its use, stop direct marketing, or withdraw consent.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Where it is processed",
    text: "Your information is collected, processed, stored, disclosed and disposed of in accordance with applicable U.S. law, and processed in the United States.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
      </>
    ),
  },
];

type Section = { id: string; n: number; title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    id: "who-we-are",
    n: 1,
    title: "Who we are",
    body: (
      <p>
        Our website address is:{" "}
        <a href="https://aaa-accreditation.org/">https://aaa-accreditation.org/</a>. The site is
        operated by the American Accreditation Association, 8609 Westwood Center Drive, Tysons
        Corner, VA 22182, United States.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    n: 2,
    title: "What personal data we collect and why we collect it",
    body: (
      <>
        <p>
          When visitors leave comments or send information through the contact-us form on the site,
          we collect the data shown in the forms available in the website. AAA may collect the
          name, phone and fax number, mailing and billing address, email address, and any other
          information provided by a User who contacts or interacts with AAA, via email or
          otherwise, such as when a User: (a) submits an application for membership or
          accreditation; (b) submits information at a seminar or other event.
        </p>
        <p>
          AAA may also collect information you provide about your professional expertise and
          experience, including your title, company name, industry, technical specialty, trade
          and/or organization(s)/association(s) to which you belong.
        </p>
      </>
    ),
  },
  {
    id: "where-we-send",
    n: 3,
    title: "Where we send your data",
    body: <p>Visitor comments may be checked through an automated spam detection service.</p>,
  },
  {
    id: "how-we-use",
    n: 4,
    title: "How AAA uses the information",
    body: (
      <>
        <p>AAA uses the information collected from its Users for the following purposes:</p>
        <ul>
          {USES.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "legal-bases",
    n: 5,
    title: "Legal bases for use of your information",
    body: (
      <>
        <p>
          The information that is discussed in this Policy will be collected, processed, stored,
          disclosed and disposed of in accordance with applicable U.S. law. Your information will
          be processed in the U.S. for the purposes described herein.
        </p>
        <p>The legal bases for using your information as set out in this Policy are as follows:</p>
        <ul>
          <li>
            Where use of your information is necessary to perform our obligations under a contract
            with you or in order to take steps at your request prior to entering into a contract
            (for example, to comply with: our website user agreement, which you accept by browsing
            the websites/registering; and/or our contract to provide our Site to you); or
          </li>
          <li>
            Where use of your information is necessary for our legitimate interests or the
            legitimate interests of others (for example, to provide security for our website and
            applications; operate our business and our Site and its services; make and receive
            payments; customer service; marketing; analyze and improve our business; comply with
            legal requirements and defend our legal rights; prevent fraud and to know the customer
            to whom we are providing the Site and its services).
          </li>
          <li>
            Where required by law, and in some other cases, we handle your information on the basis
            of consent.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    n: 6,
    title: "Your legal rights",
    body: (
      <>
        <p>
          If you would like further information in relation to your legal rights under applicable
          law or would like to exercise any of them, please contact us at any time. Your local laws
          (e.g., in the EU) may permit you to request that we:
        </p>
        <ul>
          {RIGHTS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>
          We will consider all requests and provide our response within the time period stated by
          applicable law. Please note, however, that certain information may be exempt from such
          requests in some circumstances, which may include if we need to keep processing your
          information for our legitimate interests or to comply with a legal obligation. We may
          request you provide us with information necessary to confirm your identity before
          responding to your request.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    n: 7,
    title: "How long we retain your data",
    body: (
      <p>
        If you contacted us or sent a comment, it will be retained indefinitely. This is so we can
        recognize and approve any follow-up comments automatically instead of holding them in a
        moderation queue.
      </p>
    ),
  },
  {
    id: "cookies",
    n: 8,
    title: "Browser cookies",
    body: (
      <p>
        We may use &ldquo;cookies.&rdquo; Cookies are small pieces of information that are stored by
        your browser on your device. These cookies may be used: (a) to improve or enhance your
        experience using the Site; (b) to deliver content, including advertising, specific to your
        interests; and (c) for other purposes, such as security and administrative functions. For
        example, cookies are used to store your preferences for certain types of information so
        that you do not have to input those preferences every time you use the Site. Most web
        browsers automatically accept cookies, though different browsers may address cookies
        differently. Your browser may enable you to set your device to accept all cookies, to
        notify you when a cookie is issued, or to not receive cookies at any time. If you set your
        browser to not accept cookies, it may result in certain personalized services or other
        features not being provided to you when you use that device.
      </p>
    ),
  },
  {
    id: "security",
    n: 9,
    title: "Security",
    body: (
      <>
        <p>
          AAA implements measures to protect information that it maintains. These measures vary
          based on the sensitivity of the information that AAA collects and stores. However, no
          method of transmission over the internet or means of electronic or physical storage can be
          completely secure. Therefore, AAA makes no representations or warranties with regard to
          the sufficiency of its security measures, and any information transmitted to or through
          the Site is at your own risk.
        </p>
        <p>
          AAA will notify you in accordance with applicable law in the event of a breach of the
          confidentiality or security of your information. We may notify you under such
          circumstances using the e-mail address(es) we have on record for you. You should also take
          care with how you handle and disclose your information. Please refer to the{" "}
          <a href="https://www.ftc.gov/" target="_blank" rel="noopener noreferrer">
            Federal Trade Commission&rsquo;s website
          </a>{" "}
          for information about how to protect yourself against identity theft.
        </p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <main className="axp pvx">
      <JsonLd schema={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])} />

      <PageHero
        eyebrow="Legal"
        badge="Legal · aaa-accreditation.org"
        title={
          <>
            Privacy <em>policy.</em>
          </>
        }
        intro="What personal data AAA collects through this website, why we collect it, the legal bases we rely on, how long we keep it — and the rights you have over your information."
        crumbs={[{ label: "Privacy Policy" }]}
        meta={[
          { k: "Applies to", v: "aaa-accreditation.org" },
          { k: "Data processed in", v: "United States" },
          { k: "Policy sections", v: String(SECTIONS.length) },
          { k: "Rights you can exercise", v: String(RIGHTS.length) },
        ]}
      />

      {/* 01 — Plain-English summary */}
      <section className="ax-section" id="summary">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">In short</span>
            <h2>The policy in four points.</h2>
            <p>
              This summary is here for orientation only — the full policy below is the binding
              text.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div className="pvx-summary" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
            {SUMMARY.map((s, i) => (
              <article
                className="pvx-sum-card reveal"
                key={s.title}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon>{s.icon}</LineIcon>
                </span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Full policy text, with a sticky contents rail */}
      <PageBody
        label="Policy text"
        aside={
          <nav className="pvx-toc" aria-label="Policy contents">
            <span className="ax-label" style={{ marginBottom: 0 }}>
              Contents
            </span>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        }
      >
        {SECTIONS.map((s) => (
          <section key={s.id}>
            <h2 id={s.id}>
              <span className="pvx-n" aria-hidden="true">
                {s.n}.
              </span>
              {s.title}
            </h2>
            {s.body}
          </section>
        ))}
      </PageBody>

      {/* 03 — Data contact.
             Deliberately NOT the site-wide sales CTA: asking a reader who just
             looked up their data rights to "request a quote" is the wrong ask.
             This band gives them the one thing the policy tells them to do —
             contact us — with the details they need to do it. */}
      <section className="pvx-contact" id="data-contact">
        <span className="pvx-contact-corner" aria-hidden="true" />
        <div className="container">
          <div className="pvx-contact-grid">
            <div className="reveal">
              <span className="eyebrow">Your data</span>
              <h2>
                Want a copy, a correction or a <em>deletion?</em>
              </h2>
              <p>
                If you would like further information about your legal rights under applicable law,
                or would like to exercise any of them, contact us at any time. We will consider all
                requests and respond within the time period stated by applicable law, and may ask
                for information to confirm your identity first.
              </p>
              <div className="ax-actions">
                <Link href="/contact" className="ax-btn ax-btn-white">
                  Contact AAA <Icon name="arrow" size={14} />
                </Link>
                <a href="mailto:info@aaa-accreditation.org" className="ax-btn ax-btn-ghost">
                  Email the team
                </a>
              </div>
            </div>

            <div className="pvx-card reveal">
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a>
                  </dd>
                </div>
                <div>
                  <dt>Telephone</dt>
                  <dd>
                    <a href="tel:+15716012616">+1 (571) 601 2616</a>
                  </dd>
                </div>
                <div>
                  <dt>Postal address</dt>
                  <dd>
                    American Accreditation Association
                    <br />
                    8609 Westwood Center Drive
                    <br />
                    Tysons Corner, VA 22182, USA
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
