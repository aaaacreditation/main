import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import SubmitButton from "../../_components/SubmitButton";
import { updateAccount } from "../users/actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My account" };

const ERRORS: Record<string, string> = {
  name: "Please enter your name.",
  current: "Your current password is incorrect.",
  password: "New passwords must be at least 10 characters.",
  confirm: "The new password and its confirmation don't match.",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const session = await requireAdmin();
  const { saved, error } = await searchParams;
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { name: true, email: true, role: true, lastLoginAt: true, createdAt: true },
  });

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>My account</h1>
          <p className="adm-topbar-sub">{user.email}</p>
        </div>
      </header>
      <div className="adm-content" style={{ maxWidth: 720 }}>
        {saved ? <p className="adm-toast ok" role="status">Account updated.</p> : null}
        {error && ERRORS[error] ? <p className="adm-error" role="alert">{ERRORS[error]}</p> : null}

        <form action={updateAccount} className="adm-form adm-form-main">
          <h3 className="adm-section-title">Profile</h3>
          <label className="adm-label" htmlFor="acc-name">Name</label>
          <input id="acc-name" className="sme-input" name="name" defaultValue={user.name} required />
          <p className="adm-hint">Role: {user.role.toLowerCase()} · member since {user.createdAt.toLocaleDateString("en-US")}</p>

          <h3 className="adm-section-title">Change password</h3>
          <div className="adm-fields">
            <div className="full">
              <label className="adm-label" htmlFor="acc-cur">Current password</label>
              <input id="acc-cur" className="sme-input" name="currentPassword" type="password" autoComplete="current-password" />
            </div>
            <div>
              <label className="adm-label" htmlFor="acc-new">New password</label>
              <input id="acc-new" className="sme-input" name="newPassword" type="password" autoComplete="new-password" minLength={10} />
            </div>
            <div>
              <label className="adm-label" htmlFor="acc-confirm">Confirm new password</label>
              <input id="acc-confirm" className="sme-input" name="confirmPassword" type="password" autoComplete="new-password" minLength={10} />
            </div>
          </div>
          <p className="adm-hint">Leave the password fields empty to keep your current password.</p>
          <SubmitButton className="btn btn-primary adm-btn" pendingLabel="Saving…">Save changes</SubmitButton>
        </form>
      </div>
    </>
  );
}
