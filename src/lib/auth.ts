import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { sql, ensureSchema } from "@/lib/db";

export const ADMIN_COOKIE_NAME = "vitalis_admin_session";

type AdminRow = { username: string; password_hash: string };

async function ensureAdmin(): Promise<AdminRow> {
  await ensureSchema();
  const rows = await sql`SELECT username, password_hash FROM admin_credentials WHERE id = 1`;
  if (rows.length > 0) {
    return rows[0] as AdminRow;
  }

  const username = process.env.ADMIN_USER ?? "admin";
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "changeme123", 10);
  await sql`
    INSERT INTO admin_credentials (id, username, password_hash)
    VALUES (1, ${username}, ${passwordHash})
    ON CONFLICT (id) DO NOTHING
  `;
  const seeded = await sql`SELECT username, password_hash FROM admin_credentials WHERE id = 1`;
  return seeded[0] as AdminRow;
}

function hashToken(passwordHash: string) {
  const secret = process.env.SESSION_SECRET ?? "vitalis-dev-secret";
  return createHash("sha256").update(`${passwordHash}:${secret}`).digest("hex");
}

export async function verifyCredentials(username: string, password: string) {
  const admin = await ensureAdmin();
  if (username !== admin.username) return false;
  return bcrypt.compare(password, admin.password_hash);
}

export async function sessionToken() {
  const admin = await ensureAdmin();
  return hashToken(admin.password_hash);
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  const expected = await sessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export async function getAdminUsername() {
  const admin = await ensureAdmin();
  return admin.username;
}

export async function updateAdminCredentials(username: string, password: string) {
  await ensureSchema();
  const passwordHash = await bcrypt.hash(password, 10);
  await sql`
    INSERT INTO admin_credentials (id, username, password_hash)
    VALUES (1, ${username}, ${passwordHash})
    ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, password_hash = EXCLUDED.password_hash
  `;
}
