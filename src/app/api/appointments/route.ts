import { NextResponse } from "next/server";
import { createAppointment, listAppointments } from "@/lib/appointments";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const specialty = typeof body?.specialty === "string" ? body.specialty.trim() : "";
  const doctor = typeof body?.doctor === "string" ? body.doctor.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !phone || !specialty) {
    return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }

  const appointment = await createAppointment({
    name: name.slice(0, 200),
    phone: phone.slice(0, 60),
    specialty: specialty.slice(0, 120),
    doctor: doctor ? doctor.slice(0, 120) : undefined,
    message: message ? message.slice(0, 2000) : undefined,
  });

  return NextResponse.json({ appointment }, { status: 201 });
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const appointments = await listAppointments();
  return NextResponse.json({ appointments });
}
