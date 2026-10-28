/**
 * Create a staff user, or reset an existing user's password — for the first
 * admin on a fresh server and for lock-outs. Day-to-day user management
 * belongs in the admin (/admin/users).
 *
 * Runs inside the production image (copied to /tools/create-user.mjs), via the
 * entrypoint so DATABASE_URL is set:
 *
 *   docker compose -f docker-compose.prod.yml run --rm app \
 *     create-user --email jane@aaa-accreditation.org --name "Jane Doe" --role ADMIN
 *
 * The password is read from NEW_USER_PASSWORD when set (pass it with
 * `-e NEW_USER_PASSWORD`), otherwise a random one is generated and printed
 * once. An existing user keeps their role unless --role is given, and is
 * re-activated.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { parseArgs } from "node:util";

const ROLES = ["ADMIN", "EDITOR", "SALES"];

const { values } = parseArgs({
  options: {
    email: { type: "string" },
    name: { type: "string" },
    role: { type: "string" },
  },
});

const email = (values.email ?? "").trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Usage: create-user --email <email> [--name <name>] [--role ADMIN|EDITOR|SALES]");
  process.exit(1);
}
const role = values.role?.toUpperCase();
if (role && !ROLES.includes(role)) {
  console.error(`--role must be one of ${ROLES.join(", ")}`);
  process.exit(1);
}

const provided = process.env.NEW_USER_PASSWORD;
if (provided && provided.length < 12) {
  console.error("NEW_USER_PASSWORD must be at least 12 characters.");
  process.exit(1);
}
const password = provided || randomBytes(18).toString("base64url");
const passwordHash = await bcrypt.hash(password, 12);

const prisma = new PrismaClient();
try {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
        active: true,
        ...(role ? { role } : {}),
        ...(values.name ? { name: values.name } : {}),
      },
    });
    console.log(`Password reset for ${email} (role ${role ?? existing.role}).`);
  } else {
    await prisma.user.create({
      data: {
        email,
        name: values.name || email.split("@")[0],
        passwordHash,
        role: role ?? "ADMIN",
      },
    });
    console.log(`Created ${role ?? "ADMIN"} user ${email}.`);
  }
  if (!provided) console.log(`Temporary password (shown once): ${password}`);
} finally {
  await prisma.$disconnect();
}
