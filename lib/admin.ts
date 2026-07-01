import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Guards admin pages and server actions. Redirects anonymous visitors to the
 * login screen and returns the session for signed-in staff.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}
