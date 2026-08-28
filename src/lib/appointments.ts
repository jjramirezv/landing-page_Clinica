import { randomUUID } from "crypto";
import { sql, ensureSchema } from "@/lib/db";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  doctor?: string;
  message?: string;
  createdAt: string;
};

type AppointmentRow = {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  doctor: string | null;
  message: string | null;
  created_at: string;
};

function toAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    specialty: row.specialty,
    doctor: row.doctor ?? undefined,
    message: row.message ?? undefined,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function listAppointments(): Promise<Appointment[]> {
  await ensureSchema();
  const rows = await sql`SELECT * FROM appointments ORDER BY created_at DESC`;
  return (rows as unknown as AppointmentRow[]).map(toAppointment);
}

export async function createAppointment(
  input: Omit<Appointment, "id" | "createdAt">
): Promise<Appointment> {
  await ensureSchema();

  const id = randomUUID();
  const rows = await sql`
    INSERT INTO appointments (id, name, phone, specialty, doctor, message)
    VALUES (${id}, ${input.name}, ${input.phone}, ${input.specialty}, ${input.doctor ?? null}, ${input.message ?? null})
    RETURNING *
  `;

  return toAppointment(rows[0] as unknown as AppointmentRow);
}
