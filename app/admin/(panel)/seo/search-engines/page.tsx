import type { Metadata } from "next";
import Link from "next/link";
import { requireArea } from "@/lib/admin";
import { SITE_URL } from "@/lib/seo";
import { isLiveSite, readSeoSettingsFresh } from "@/lib/site-settings";
import { getSitemapFiles, type SitemapFile } from "@/lib/sitemap";
import { INDEXNOW_KEY_PATH, indexNowLog } from "@/lib/search-engines";
import { AI_SEARCH, AI_TRAINING, robotsRules, robotsText } from "@/lib/robots-policy";
import SubmitButton from "../../../_components/SubmitButton";
import { SeoSubnav, dateTimeFmt } from "../seo-ui";
import { saveSearchSettings, submitToIndexNow } from "./actions";
import "../seo-admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Search engines & AI — SEO" };

type SP = { saved?: string; submitted?: string; ok?: string };

/** The files AI assistants, feed readers and crawlers read (lib/llms.ts, lib/feeds.ts). */
const MACHINE_FILES = [
  { path: "/llms.txt", what: "Index for AI assistants (llmstxt.org): what AAA is, key facts, the important pages." },
  { path: "/llms-full.txt", what: "The full text of the key pages as Markdown, in one file." },
  { path: "/facts.json", what: "Organization, figures, programs and contact details (JSON)." },
  { path: "/accredited-organizations.json", what: "The public register with every accreditation record (JSON)." },
  { path: "/feed/", what: "RSS feed of the latest 30 articles — the old WordPress feed address." },
  { path: "/feed.json", what: "The same articles as a JSON Feed." },
];

const newest = (f: SitemapFile) => f.urls.map((u) => u.lastmod).filter(Boolean).sort().pop();

export default async function SearchEnginesPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireArea("seo");
  const sp = await searchParams;
  const live = isLiveSite();
  const [{ settings, updatedAt }, files, log] = await Promise.all([
    readSeoSettingsFresh(),
    getSitemapFiles().catch(() => [] as SitemapFile[]),
    indexNowLog(),
  ]);
  const total = files.reduce((n, f) => n + f.urls.length, 0);
  const robots = robotsText(robotsRules(settings));
  const indexUrl = `${SITE_URL}/sitemap_index.xml`;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <div className="adm-crumbs">
            <Link href="/admin/seo">SEO Center</Link>
          </div>
          <h1>Search engines &amp; AI</h1>
          <p className="adm-topbar-sub">
            Sitemaps, robots.txt, Google Search Console, IndexNow and the files AI assistants read.
          </p>
        </div>
      </header>

      <div className="adm-content">
        <SeoSubnav active="engines" />

        {!live ? (
          <p className="adm-toast" role="status">
            This is the preview server: robots.txt closes it to every crawler and nothing is sent to search engines. The
            settings below take effect on the live site at aaa-accreditation.org.
          </p>
        ) : null}
        {sp.saved ? <p className="adm-toast ok" role="status">Settings saved. robots.txt, the sitemaps and the AI files use them now.</p> : null}
        {sp.submitted ? (
          <p className={sp.ok === "1" ? "adm-toast ok" : "adm-error"} role="status">
            IndexNow: {sp.submitted}
          </p>
        ) : null}

        <form action={saveSearchSettings} className="adm-form sex-form">
          {/* ------------------------------------------------ Search Console */}
          <section className="adm-card sex-card">
            <div className="adm-card-head">
              <h2>Google Search Console &amp; webmaster tools</h2>
              <a className="adm-card-link" href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                Open Search Console ↗
              </a>
            </div>
            <p className="adm-hint">
              Search Console shows how Google indexes the site and which searches bring visitors. The owner proves control of
              the site with a code on the home page. The Google code below is the one the old WordPress site used, so the
              existing Search Console property stays verified when the new site goes live.
            </p>
            <div className="adm-fields three">
              <div>
                <label className="adm-label" htmlFor="se-google">Google verification code</label>
                <input id="se-google" className="sme-input" name="googleVerification" defaultValue={settings.googleVerification} placeholder="Paste the code or the whole <meta> tag" />
              </div>
              <div>
                <label className="adm-label" htmlFor="se-bing">Bing verification code</label>
                <input id="se-bing" className="sme-input" name="bingVerification" defaultValue={settings.bingVerification} placeholder="msvalidate.01 code" />
              </div>
              <div>
                <label className="adm-label" htmlFor="se-yandex">Yandex verification code</label>
                <input id="se-yandex" className="sme-input" name="yandexVerification" defaultValue={settings.yandexVerification} placeholder="Optional" />
              </div>
            </div>
            <ol className="sex-steps">
              <li>
                In Search Console, open the <strong>aaa-accreditation.org</strong> property (or add it — a “Domain” property
                verified by DNS covers every address).
              </li>
              <li>
                Go to <strong>Sitemaps</strong> and submit <code>{indexUrl}</code>. It is the same address the old site used, so
                if it is already listed, nothing needs to change.
              </li>
              <li>
                For Bing (which also feeds ChatGPT search and Copilot), sign in to{" "}
                <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer">Bing Webmaster Tools</a> and
                choose “Import from Google Search Console” — or paste its code above.
              </li>
            </ol>
          </section>

          {/* ------------------------------------------------------ Sitemaps */}
          <section className="adm-card sex-card">
            <div className="adm-card-head">
              <h2>Sitemaps</h2>
              <span className="adm-table-dim">{total.toLocaleString("en-US")} addresses in {files.length} files</span>
            </div>
            <p className="adm-hint">
              Built automatically from the pages, articles, case studies and register, and refreshed whenever content is saved.
              The file names are the old WordPress ones, so links search engines already know keep working. Left out on purpose:
              pages set to “noindex” in Page metadata, articles with no text, duplicate “-2” articles, and tag pages with too few
              articles.
            </p>
            <div className="adm-card-flush sex-table">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Contains</th>
                    <th style={{ textAlign: "right" }}>Addresses</th>
                    <th>Latest change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="/sitemap_index.xml" target="_blank" rel="noopener noreferrer"><code>sitemap_index.xml</code></a>
                    </td>
                    <td>Index of the files below — submit this one</td>
                    <td style={{ textAlign: "right" }}>{files.length} files</td>
                    <td />
                  </tr>
                  {files.map((f) => (
                    <tr key={f.name}>
                      <td>
                        <a href={`/${f.name}.xml`} target="_blank" rel="noopener noreferrer"><code>{f.name}.xml</code></a>
                      </td>
                      <td>{f.label}</td>
                      <td style={{ textAlign: "right" }}>{f.urls.length.toLocaleString("en-US")}</td>
                      <td className="adm-table-dim">{newest(f) ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="adm-fields">
              <div>
                <label className="adm-label" htmlFor="se-tagmin">Tag pages: minimum articles to be indexed</label>
                <input id="se-tagmin" className="sme-input" type="number" min={0} max={50} name="tagMinPosts" defaultValue={settings.tagMinPosts} />
                <p className="adm-hint">
                  A tag with fewer articles stays online (old links work) but is hidden from search and the sitemap, because
                  it only repeats one article. 2 is the usual choice; 0 indexes every tag.
                </p>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------- robots & AI bots */}
          <section className="adm-card sex-card">
            <div className="adm-card-head">
              <h2>robots.txt &amp; AI crawlers</h2>
              <a className="adm-card-link" href="/robots.txt" target="_blank" rel="noopener noreferrer">View robots.txt ↗</a>
            </div>
            <p className="adm-hint">
              Google and Bing always crawl the whole public site. These two switches decide whether AI tools may read it too.
              Being quoted by ChatGPT, Perplexity or Claude when someone asks about accreditation is free visibility for AAA,
              so both are open by default.
            </p>
            <div className="adm-fields">
              <div>
                <label className="adm-label" htmlFor="se-aisearch">AI assistants &amp; answer engines</label>
                <select id="se-aisearch" className="sme-select" name="aiSearch" defaultValue={settings.aiSearch}>
                  <option value="allow">Allowed — AI answers can read and cite the site</option>
                  <option value="block">Blocked</option>
                </select>
                <p className="adm-hint">{AI_SEARCH.join(", ")}</p>
              </div>
              <div>
                <label className="adm-label" htmlFor="se-aitrain">AI model training</label>
                <select id="se-aitrain" className="sme-select" name="aiTraining" defaultValue={settings.aiTraining}>
                  <option value="allow">Allowed — AI models learn about AAA</option>
                  <option value="block">Blocked</option>
                </select>
                <p className="adm-hint">{AI_TRAINING.join(", ")}</p>
              </div>
            </div>
            <label className="adm-label" htmlFor="se-disallow">Extra paths to close to all crawlers</label>
            <textarea
              id="se-disallow"
              className="sme-textarea"
              name="robotsDisallow"
              rows={3}
              defaultValue={settings.robotsDisallow.join("\n")}
              placeholder={"/private-page/\n/drafts/"}
            />
            <p className="adm-hint">
              One path per line, starting with “/”. The admin, the API and internal landing pages are always closed. To hide a
              single page from Google, set it to “noindex” in Page metadata instead — a blocked page can still appear in results.
            </p>
            <details className="sex-preview">
              <summary>robots.txt on the live site with these settings</summary>
              <pre>{robots}</pre>
            </details>
          </section>

          {/* ------------------------------------------------------ AI files */}
          <section className="adm-card sex-card">
            <div className="adm-card-head">
              <h2>Files for AI assistants &amp; feeds</h2>
            </div>
            <p className="adm-hint">
              Generated from the live pages and kept up to date automatically. AI tools read these to describe AAA accurately
              and link to the right pages.
            </p>
            <ul className="sex-files">
              {MACHINE_FILES.map((f) => (
                <li key={f.path}>
                  <a href={f.path} target="_blank" rel="noopener noreferrer"><code>{f.path}</code></a>
                  <span>{f.what}</span>
                </li>
              ))}
            </ul>
            <label className="adm-label" htmlFor="se-llms">Extra note for llms.txt</label>
            <textarea
              id="se-llms"
              className="sme-textarea"
              name="llmsIntro"
              rows={3}
              maxLength={4000}
              defaultValue={settings.llmsIntro}
              placeholder="Optional. e.g. a new program launch, or how AAA prefers to be described."
            />
            <p className="adm-hint">Shown under the key facts in llms.txt. Plain text or Markdown; keep it factual.</p>
          </section>

          {/* ------------------------------------------------------ IndexNow */}
          <section className="adm-card sex-card" id="indexnow-settings">
            <div className="adm-card-head">
              <h2>IndexNow — instant updates to Bing &amp; others</h2>
            </div>
            <p className="adm-hint">
              When an article, page, case study or register entry is saved, its address is sent to IndexNow at once, so Bing,
              Yandex, Seznam and Naver re-read it within minutes instead of days. Google does not use IndexNow; it reads the
              sitemaps.
            </p>
            <label className="adm-check">
              <input type="checkbox" name="indexNow" defaultChecked={settings.indexNow} />
              <span>
                Send changed pages to IndexNow automatically
                <small>Only from the live site — never from the preview server.</small>
              </span>
            </label>
            <p className="adm-hint">
              Key: <code>{settings.indexNowKey}</code> · published at{" "}
              <a href={INDEXNOW_KEY_PATH} target="_blank" rel="noopener noreferrer"><code>{INDEXNOW_KEY_PATH}</code></a>
            </p>
            <label className="adm-check">
              <input type="checkbox" name="newKey" />
              <span>
                Generate a new key on save
                <small>Only needed if the key was misused. The old key stops working at once.</small>
              </span>
            </label>
          </section>

          <div className="sex-save">
            <SubmitButton className="btn btn-primary adm-btn" pendingLabel="Saving…">Save settings</SubmitButton>
            {updatedAt ? <span className="adm-hint">Last saved {dateTimeFmt.format(updatedAt)}</span> : <span className="adm-hint">Using the defaults — nothing saved yet.</span>}
          </div>
        </form>

        {/* -------------------------------------------- manual submission */}
        <section className="adm-card sex-card" id="indexnow" style={{ marginTop: 18 }}>
          <div className="adm-card-head">
            <h2>Send addresses to IndexNow now</h2>
          </div>
          <form action={submitToIndexNow} className="adm-form">
            <label className="adm-label" htmlFor="se-urls">Addresses, one per line</label>
            <textarea id="se-urls" className="sme-textarea" name="urls" rows={4} placeholder={`${SITE_URL}/healthcare-accreditation/\n/about-aaa/`} />
            <div className="sex-actions">
              <SubmitButton className="btn btn-ghost adm-btn" pendingLabel="Sending…" disabled={!live}>
                Send these addresses
              </SubmitButton>
              <SubmitButton className="btn btn-ghost adm-btn" pendingLabel="Sending…" name="scope" value="all" disabled={!live}>
                Send every sitemap address ({total.toLocaleString("en-US")})
              </SubmitButton>
              {!live ? <span className="adm-hint">Available once the site is live.</span> : null}
            </div>
          </form>

          {log.length > 0 ? (
            <div className="adm-card-flush sex-table" style={{ marginTop: 14 }}>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>How</th>
                    <th style={{ textAlign: "right" }}>Addresses</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {log.map((e, i) => (
                    <tr key={`${e.at}-${i}`}>
                      <td className="adm-table-dim">{dateTimeFmt.format(new Date(e.at))}</td>
                      <td>{e.source === "manual" ? "Sent by hand" : "Automatic"}</td>
                      <td style={{ textAlign: "right" }} title={e.urls.join("\n")}>{e.count}</td>
                      <td>
                        <span className={`adm-chip ${e.ok ? "ok" : "warn"}`}>{e.ok ? "Accepted" : "Not accepted"}</span>{" "}
                        <span className="adm-table-dim">{e.message}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="adm-hint">Nothing sent yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
