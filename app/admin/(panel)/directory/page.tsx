import Link from "next/link";
import { requireArea } from "@/lib/admin";
import { DAY_MS, expiryTone } from "@/lib/directory";
import {
  ACCREDITATION_STATUSES,
  ACCREDITATION_TYPES,
  orgStatus,
  type AccreditationTypeId,
} from "@/app/_data/accredited-organizations";
import {
  EXPIRY_FILTERS,
  directoryStats,
  filterOrganizations,
  filtersQuery,
  loadAdminOrganizations,
  parseDirectoryFilters,
  soonestExpiry,
  type AdminOrg,
} from "./filters";
import "./directory-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Accredited Organizations" };

const PER_PAGE = 25;

const STATUS_TONE: Record<string, string> = { Accredited: "ok", Suspended: "warn", Withdrawn: "muted" };

const TYPE_OPTIONS = (Object.entries(ACCREDITATION_TYPES) as [AccreditationTypeId, { label: string; standard?: string }][]).map(
  ([id, t]) => ({ id, label: t.standard ? `${t.label} (${t.standard})` : t.label })
);

/** orgStatus() over the admin row (it only reads the records). */
const headlineStatus = (org: AdminOrg) =>
  orgStatus({ name: org.name, location: org.location, country: org.country, accreditations: org.accreditations });

function NumbersCell({ org }: { org: AdminOrg }) {
  const nums = org.accreditations.map((a) => a.number).filter(Boolean);
  if (nums.length === 0) return <span className="adm-table-dim">—</span>;
  const shown = nums.slice(0, 2).join(", ");
  return (
    <span className="dir-nums" title={nums.join(", ")}>
      {shown}
      {nums.length > 2 ? <em> +{nums.length - 2}</em> : null}
    </span>
  );
}

function ExpiryCell({ org, now }: { org: AdminOrg; now: Date }) {
  const rec = soonestExpiry(org);
  if (!rec) return <span className="adm-table-dim">—</span>;
  const tone = expiryTone(rec, now, 90);
  const days = rec.expiresOn ? Math.round((rec.expiresOn.getTime() - now.getTime()) / DAY_MS) : null;
  const note =
    tone === "expired" && days !== null
      ? `expired ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`
      : tone === "soon" && days !== null
        ? `in ${days} day${days === 1 ? "" : "s"}`
        : rec.expiresOn
          ? null
          : "date not parsed";
  return (
    <>
      {tone === "expired" || tone === "soon" ? (
        <span className={"adm-chip " + (tone === "expired" ? "err" : "warn")}>{rec.expiry}</span>
      ) : (
        <span className="adm-table-dim">{rec.expiry}</span>
      )}
      {note ? <span className="dir-sub">{note}</span> : null}
    </>
  );
}

export default async function DirectoryAdmin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireArea("directory");
  const sp = await searchParams;
  const filters = parseDirectoryFilters(sp);
  const pageNum = Math.max(1, parseInt(String(sp.page ?? "1"), 10) || 1);
  const saved = Boolean(sp.saved);
  const deleted = Boolean(sp.deleted);

  const now = new Date();
  const all = await loadAdminOrganizations();
  const stats = directoryStats(all, now);
  const results = filterOrganizations(all, filters, now);
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(pageNum, pages);
  const rows = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const countries = Array.from(new Set(all.map((o) => o.country).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
  const query = filtersQuery(filters);
  const filtered = query !== "";
  const pageHref = (p: number) => `/admin/directory?${filtersQuery(filters, { page: String(p) })}`;
  const exportHref = `/api/admin/directory/export${query ? `?${query}` : ""}`;

  const statCards = [
    {
      label: "Organizations",
      value: stats.organizations,
      note: `${stats.published} published`,
      href: "/admin/directory",
    },
    {
      label: "Accreditation records",
      value: stats.records,
      note: `${stats.accreditedRecords} marked Accredited`,
      href: "/admin/directory?rstatus=Accredited",
    },
    {
      label: "Countries",
      value: stats.publicCountries,
      note: "on the public register",
      href: null,
    },
    {
      label: "Expiring ≤ 90 days",
      value: stats.expiring,
      note: "still marked Accredited",
      href: "/admin/directory?expiry=90&rstatus=Accredited",
      accent: stats.expiring > 0,
    },
    {
      label: "Expired",
      value: stats.expired,
      note: "past expiry, still Accredited",
      href: "/admin/directory?expiry=expired&rstatus=Accredited",
    },
  ];

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Accredited Organizations</h1>
          <p className="adm-topbar-sub">
            The public register at /directory/accredited-organizations — {stats.organizations} organization
            {stats.organizations === 1 ? "" : "s"}, {stats.records} accreditation record{stats.records === 1 ? "" : "s"}
          </p>
        </div>
        <div className="adm-topbar-actions">
          <a
            href={exportHref}
            className="btn btn-ghost adm-btn"
            title={filtered ? "Export the filtered records as CSV" : "Export every record as CSV"}
          >
            Export CSV
          </a>
          <Link href="/admin/directory/new" className="btn btn-primary adm-btn">
            + Add organization
          </Link>
        </div>
      </header>

      <div className="adm-content dir-admin">
        {saved ? <p className="adm-toast ok" role="status">Organization saved.</p> : null}
        {deleted ? <p className="adm-toast" role="status">Organization deleted.</p> : null}

        <div className="adm-stats five">
          {statCards.map((s) =>
            s.href ? (
              <Link href={s.href} className={"adm-stat" + (s.accent ? " accent" : "")} key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
                <em>{s.note}</em>
              </Link>
            ) : (
              <div className="adm-stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
                <em>{s.note}</em>
              </div>
            )
          )}
        </div>

        <form className="adm-filterbar" action="/admin/directory" method="get">
          <label className="grow">
            Search
            <input
              className="sme-input"
              type="search"
              name="q"
              defaultValue={filters.q}
              placeholder="Name, location, country, accreditation no.…"
            />
          </label>
          <label>
            Country
            <select className="sme-select" name="country" defaultValue={filters.country}>
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            Program
            <select className="sme-select" name="type" defaultValue={filters.type}>
              <option value="">All programs</option>
              {TYPE_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Record status
            <select className="sme-select" name="rstatus" defaultValue={filters.rstatus}>
              <option value="">Any status</option>
              {ACCREDITATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Listing
            <select className="sme-select" name="status" defaultValue={filters.status}>
              <option value="">Published &amp; drafts</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </label>
          <label>
            Expiry
            <select className="sme-select" name="expiry" defaultValue={filters.expiry}>
              <option value="">Any date</option>
              {Object.entries(EXPIRY_FILTERS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className="adm-filterbar-actions">
            <button type="submit" className="btn btn-primary adm-btn-sm">
              Filter
            </button>
            {filtered ? (
              <Link href="/admin/directory" className="btn btn-ghost adm-btn-sm">
                Reset
              </Link>
            ) : null}
          </div>
        </form>

        {filtered ? (
          <p className="dir-count">
            {results.length} of {all.length} organization{all.length === 1 ? "" : "s"} match.
          </p>
        ) : null}

        <div className="adm-card adm-card-flush">
          {rows.length === 0 ? (
            <p className="adm-empty">
              {filtered ? (
                <>
                  No organizations match these filters. <Link href="/admin/directory">Clear the filters →</Link>
                </>
              ) : (
                <>
                  The register is empty. <Link href="/admin/directory/new">Add the first organization →</Link>
                </>
              )}
            </p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Accreditation no.</th>
                  <th>Status</th>
                  <th>Soonest expiry</th>
                  <th>Listing</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ org }) => {
                  const headline = org.accreditations.length > 0 ? headlineStatus(org) : null;
                  return (
                    <tr key={org.id}>
                      <td>
                        <div className="adm-row-media">
                          {org.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={org.logo} alt="" className="adm-thumb" loading="lazy" />
                          ) : (
                            <span className="adm-thumb dir-mono" aria-hidden="true">
                              {org.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                          <div className="dir-name">
                            <Link href={`/admin/directory/${org.id}`} className="adm-table-title">
                              {org.name}
                            </Link>
                            <span className="dir-sub">{org.location || org.country || "—"}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <NumbersCell org={org} />
                      </td>
                      <td>
                        {headline ? (
                          <span className={"adm-chip " + (STATUS_TONE[headline] ?? "muted")}>{headline}</span>
                        ) : (
                          <span className="adm-chip muted">No records</span>
                        )}
                      </td>
                      <td>
                        <ExpiryCell org={org} now={now} />
                      </td>
                      <td>
                        <span className={"adm-chip " + (org.status === "PUBLISHED" ? "ok" : "muted")}>
                          {org.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="adm-table-actions">
                        <Link href={`/admin/directory/${org.id}`} className="adm-edit">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {current > 1 ? (
              <Link href={pageHref(current - 1)} className="btn btn-ghost adm-btn-sm">
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            <span className="adm-pager-info">
              Page {current} of {pages}
            </span>
            {current < pages ? (
              <Link href={pageHref(current + 1)} className="btn btn-ghost adm-btn-sm">
                Next →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </div>
    </>
  );
}
