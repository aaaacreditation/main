import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import SubmitButton from "../_components/SubmitButton";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

async function login(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      redirectTo: "/admin",
    });
  } catch (err) {
    if (err instanceof AuthError) redirect("/admin/login?error=1");
    throw err; // successful sign-in redirects by throwing — let it through
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="alogin">
      <div className="alogin-backdrop" aria-hidden="true" />
      <div className="alogin-card">
        <div className="alogin-brand">
          <Image src="/logo/AAA-Logo.png" alt="American Accreditation Association" width={210} height={65} priority />
        </div>
        <h1>Content Studio</h1>
        <p className="alogin-sub">Sign in to manage pages, news and applications.</p>

        {error ? (
          <p className="alogin-error" role="alert">
            Incorrect email or password. Please try again.
          </p>
        ) : null}

        <form action={login}>
          <label className="adm-label" htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            className="sme-input"
            type="email"
            name="email"
            autoComplete="username"
            required
            placeholder="you@aaa-accreditation.org"
          />
          <label className="adm-label" htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="sme-input"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="••••••••••"
          />
          <SubmitButton className="btn btn-primary alogin-submit" pendingLabel="Signing in…">
            Sign in
          </SubmitButton>
        </form>

        <p className="alogin-foot">Restricted area — authorized AAA staff only.</p>
      </div>
    </div>
  );
}
