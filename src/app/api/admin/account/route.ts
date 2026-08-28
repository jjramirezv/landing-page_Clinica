import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  getAdminUsername,
  isAuthenticated,
  sessionToken,
  updateAdminCredentials,
  verifyCredentials,
} from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  return NextResponse.json({ username: await getAdminUsername() });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newUsername = typeof body?.username === "string" ? body.username.trim() : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  const currentUsername = await getAdminUsername();
  const validCurrent = await verifyCredentials(currentUsername, currentPassword);
  if (!validCurrent) {
    return NextResponse.json({ error: "Tu contraseña actual no es correcta." }, { status: 401 });
  }

  if (!newUsername) {
    return NextResponse.json({ error: "El usuario no puede estar vacío." }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: "La nueva contraseña debe tener al menos 6 caracteres." }, { status: 400 });
  }

  await updateAdminCredentials(newUsername, newPassword);

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, await sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}
