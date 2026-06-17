import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data AAA collects through aaa-accreditation.org, why it is collected, how it is used, the legal bases for processing, your legal rights, retention, cookies, and security.",
};

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

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <em>policy.</em></>}
        intro="What personal data AAA collects, why we collect it, how we use it — and the legal rights you have over your information."
        crumbs={[{ label: "Privacy Policy" }]}
        meta={[
          { k: "Website", v: "aaa-accreditation.org" },
          { k: "Data processed in", v: "United States" },
        ]}
      />
      <PageBody label="Policy text">
        <h2>1. Who we are</h2>
        <p>
          Our website address is:{" "}
          <a href="https://aaa-accreditation.org/" className="ed-link">https://aaa-accreditation.org/</a>.
        </p>

        <h2 style={{ marginTop: 40 }}>2. What personal data we collect and why we collect it</h2>
        <p>
          When visitors leave comments or send information through the contact-us form on the
          site, we collect the data shown in the forms available in the website. AAA may collect
          the name, phone and fax number, mailing and billing address, email address, and any
          other information provided by a User who contacts or interacts with AAA, via email or
          otherwise, such as when a User: (a) submits an application for membership or
          accreditation; (b) submits information at a seminar or other event.
        </p>
        <p>
          AAA may also collect information you provide about your professional expertise and
          experience, including your title, company name, industry, technical specialty, trade
          and/or organization(s)/association(s) to which you belong.
        </p>

        <h2 style={{ marginTop: 40 }}>3. Where we send your data</h2>
        <p>Visitor comments may be checked through an automated spam detection service.</p>

        <h2 style={{ marginTop: 40 }}>4. How AAA uses the information</h2>
        <p>AAA uses the information collected from its Users for the following purposes:</p>
        <ul className="bullets">
          {USES.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 40 }}>5. Legal bases for use of your information</h2>
        <p>
          The information that is discussed in this Policy will be collected, processed, stored,
          disclosed and disposed of in accordance with applicable U.S. law. Your information will
          be processed in the U.S. for the purposes described herein.
        </p>
        <p>The legal bases for using your information as set out in this Policy are as follows:</p>
        <ul className="bullets">
          <li>
            Where use of your information is necessary to perform our obligations under a
            contract with you or in order to take steps at your request prior to entering into a
            contract (for example, to comply with: our website user agreement, which you accept
            by browsing the websites/registering; and/or our contract to provide our Site to
            you); or
          </li>
          <li>
            Where use of your information is necessary for our legitimate interests or the
            legitimate interests of others (for example, to provide security for our website and
            applications; operate our business and our Site and its services; make and receive
            payments; customer service; marketing; analyze and improve our business; comply with
            legal requirements and defend our legal rights; prevent fraud and to know the
            customer to whom we are providing the Site and its services).
          </li>
          <li>
            Where required by law, and in some other cases, we handle your information on the
            basis of consent.
          </li>
        </ul>

        <h2 style={{ marginTop: 40 }}>6. Your legal rights</h2>
        <p>
          If you would like further information in relation to your legal rights under applicable
          law or would like to exercise any of them, please contact us at any time. Your local
          laws (e.g., in the EU) may permit you to request that we:
        </p>
        <ul className="bullets">
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

        <h2 style={{ marginTop: 40 }}>7. How long we retain your data</h2>
        <p>
          If you contacted us or sent a comment, it will be retained indefinitely. This is so we
          can recognize and approve any follow-up comments automatically instead of holding them
          in a moderation queue.
        </p>

        <h2 style={{ marginTop: 40 }}>8. Browser cookies</h2>
        <p>
          We may use &ldquo;cookies.&rdquo; Cookies are small pieces of information that are
          stored by your browser on your device. These cookies may be used: (a) to improve or
          enhance your experience using the Site; (b) to deliver content, including advertising,
          specific to your interests; and (c) for other purposes, such as security and
          administrative functions. For example, cookies are used to store your preferences for
          certain types of information so that you do not have to input those preferences every
          time you use the Site. Most web browsers automatically accept cookies, though different
          browsers may address cookies differently. Your browser may enable you to set your
          device to accept all cookies, to notify you when a cookie is issued, or to not receive
          cookies at any time. If you set your browser to not accept cookies, it may result in
          certain personalized services or other features not being provided to you when you use
          that device.
        </p>

        <h2 style={{ marginTop: 40 }}>9. Security</h2>
        <p>
          AAA implements measures to protect information that it maintains. These measures vary
          based on the sensitivity of the information that AAA collects and stores. However, no
          method of transmission over the internet or means of electronic or physical storage can
          be completely secure. Therefore, AAA makes no representations or warranties with regard
          to the sufficiency of its security measures, and any information transmitted to or
          through the Site is at your own risk.
        </p>
        <p>
          AAA will notify you in accordance with applicable law in the event of a breach of the
          confidentiality or security of your information. We may notify you under such
          circumstances using the e-mail address(es) we have on record for you. You should also
          take care with how you handle and disclose your information. Please refer to the{" "}
          <a
            href="https://www.ftc.gov/"
            className="ed-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Federal Trade Commission&rsquo;s website
          </a>{" "}
          for information about how to protect yourself against identity theft.
        </p>
      </PageBody>
    </>
  );
}
