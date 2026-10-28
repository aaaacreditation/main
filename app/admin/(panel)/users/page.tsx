import type { Metadata } from "next";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import DangerButton from "../../_components/DangerButton";
import SubmitButton from "../../_components/SubmitButton";
import { createUser, deleteUser, updateUser } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Team & Access" };

const ROLE_INFO: Record<Role, { label: string; text: string }> = {
  ADMIN: { label: "Administrator", text: "Everything, including team members and access." },
  EDITOR: { label: "Editor", text: "News, pages, case studies, directory, SEO and leads." },
  SALES: { label: "Sales", text: "Leads and applications only." },
};

const ERRORS: Record<string, string> = {
  fields: "Please fill in a name, a valid email and a role.",
  password: "Passwords must be at least 10 characters.",
  exists: "Someone with that email already has an account.",
  self: "You can't remove your own administrator access — ask another administrator.",
  lastadmin: "There must always be at least one active administrator.",
};

const SAVED: Record<string, string> = {
  created: "Team member added. Share the temporary password with them securely.",
  updated: "Changes saved.",
  deleted: "Team member removed.",
};

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

export default async function UsersAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const session = await requireArea("users");
  const { saved, error } = await searchParams;
  const users = await prisma.user.findMany({
    orderBy: [{ active: "desc" }, { role: "asc" }, { name: "asc" }],
    include: { _count: { select: { posts: true, assignedLeads: true } } },
  });

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Team &amp; Access</h1>
          <p className="adm-topbar-sub">
            {users.filter((u) => u.active).length} active of {users.length} account{users.length === 1 ? "" : "s"}
          </p>
        </div>
      </header>

      <div className="adm-content">
        {saved && SAVED[saved] ? <p className="adm-toast ok" role="status">{SAVED[saved]}</p> : null}
        {error && ERRORS[error] ? <p className="adm-error" role="alert">{ERRORS[error]}</p> : null}

        <div className="adm-form-grid">
          <div className="adm-card adm-card-flush">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last sign-in</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const self = u.id === session.user.id;
                  return (
                    <tr key={u.id}>
                      <td>
                        <span className="adm-table-title">
                          {u.name}
                          {self ? " (you)" : ""}
                        </span>
                        <span className="adm-table-slug">{u.email}</span>
                      </td>
                      <td>
                        <span className={"adm-chip " + (u.role === Role.ADMIN ? "navy" : u.role === Role.SALES ? "gold" : "ok")}>
                          {ROLE_INFO[u.role].label}
                        </span>
                      </td>
                      <td>
                        <span className={"adm-chip " + (u.active ? "won" : "muted")}>{u.active ? "Active" : "Deactivated"}</span>
                      </td>
                      <td className="adm-table-dim">{u.lastLoginAt ? dateFmt.format(u.lastLoginAt) : "Never"}</td>
                      <td className="adm-table-actions">
                        <details className="adm-panel-details">
                          <summary>Edit</summary>
                          <form action={updateUser} className="adm-form" style={{ textAlign: "left", minWidth: 260 }}>
                            <input type="hidden" name="id" value={u.id} />
                            <label className="adm-label" htmlFor={`u-name-${u.id}`}>Name</label>
                            <input id={`u-name-${u.id}`} className="sme-input" name="name" defaultValue={u.name} required />
                            <label className="adm-label" htmlFor={`u-role-${u.id}`}>Role</label>
                            <select id={`u-role-${u.id}`} className="sme-select" name="role" defaultValue={u.role}>
                              {Object.values(Role).map((r) => (
                                <option key={r} value={r}>{ROLE_INFO[r].label}</option>
                              ))}
                            </select>
                            <label className="adm-check">
                              <input type="checkbox" name="active" defaultChecked={u.active} value="1" />
                              <span>Active<small>Deactivated members can&apos;t sign in.</small></span>
                            </label>
                            <label className="adm-label" htmlFor={`u-pw-${u.id}`}>Reset password</label>
                            <input id={`u-pw-${u.id}`} className="sme-input" name="password" type="password" autoComplete="new-password" placeholder="Leave blank to keep" minLength={10} />
                            <SubmitButton className="btn btn-primary adm-btn-sm adm-btn-block" pendingLabel="Saving…">Save</SubmitButton>
                          </form>
                          {!self ? (
                            <form action={deleteUser} style={{ marginTop: 10, textAlign: "left" }}>
                              <input type="hidden" name="id" value={u.id} />
                              <DangerButton className="adm-danger-link" confirmText={`Remove ${u.email}? Their articles and notes stay, unattributed.`}>
                                Remove member
                              </DangerButton>
                            </form>
                          ) : null}
                        </details>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <aside className="adm-form-side">
            <form action={createUser} className="adm-panel adm-form">
              <h3>Add a team member</h3>
              <label className="adm-label" htmlFor="nu-name">Full name</label>
              <input id="nu-name" className="sme-input" name="name" required />
              <label className="adm-label" htmlFor="nu-email">Email</label>
              <input id="nu-email" className="sme-input" name="email" type="email" required placeholder="name@aaa-accreditation.org" />
              <label className="adm-label" htmlFor="nu-role">Role</label>
              <select id="nu-role" className="sme-select" name="role" defaultValue={Role.EDITOR}>
                {Object.values(Role).map((r) => (
                  <option key={r} value={r}>{ROLE_INFO[r].label}</option>
                ))}
              </select>
              <label className="adm-label" htmlFor="nu-pw">Temporary password</label>
              <input id="nu-pw" className="sme-input" name="password" type="password" autoComplete="new-password" required minLength={10} />
              <p className="adm-hint">At least 10 characters. They can change it under My account after signing in.</p>
              <SubmitButton className="btn btn-primary adm-btn-sm adm-btn-block" pendingLabel="Adding…">Add member</SubmitButton>
            </form>

            <div className="adm-panel">
              <h3>What each role can do</h3>
              <dl className="adm-kv" style={{ gridTemplateColumns: "100px 1fr" }}>
                {Object.values(Role).map((r) => (
                  <div key={r} style={{ display: "contents" }}>
                    <dt>{ROLE_INFO[r].label}</dt>
                    <dd>{ROLE_INFO[r].text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
