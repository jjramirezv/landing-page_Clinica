import { redirect } from "next/navigation";
import { CalendarClock, MapPin, Phone, Stethoscope, User, Users } from "lucide-react";
import { getAdminUsername, isAuthenticated } from "@/lib/auth";
import { listAppointments } from "@/lib/appointments";
import { getContent } from "@/lib/content";
import { AdminShell } from "@/components/site/admin/admin-shell";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [appointments, content, username] = await Promise.all([
    listAppointments(),
    getContent(),
    getAdminUsername(),
  ]);

  const stats = [
    { label: "Citas solicitadas", value: appointments.length, icon: CalendarClock },
    { label: "Doctores", value: content.doctors.length, icon: Stethoscope },
    { label: "Especialidades", value: content.specialties.length, icon: Users },
    { label: "Sedes", value: content.sedes.length, icon: MapPin },
  ];

  return (
    <AdminShell title="Citas solicitadas" active="/admin" username={username}>
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_25px_rgba(14,165,233,0.08)]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]">
              <stat.icon className="size-5" />
            </div>
            <p className="mt-3 text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <p className="mb-6 text-sm text-slate-500">
        {appointments.length === 0
          ? "Todavía no hay solicitudes de cita."
          : `${appointments.length} solicitud${appointments.length === 1 ? "" : "es"} recibida${appointments.length === 1 ? "" : "s"}.`}
      </p>

      {appointments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-sky-200 bg-white/60 p-12 text-center text-slate-400">
          Cuando alguien agende desde el sitio, la solicitud aparecerá aquí.
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <article
              key={appointment.id}
              className="overflow-hidden rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_25px_rgba(14,165,233,0.08)] transition hover:shadow-[0_12px_30px_rgba(14,165,233,0.14)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                    <User className="size-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{appointment.name}</p>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Phone className="size-3.5" /> {appointment.phone}
                    </p>
                  </div>
                </div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <CalendarClock className="size-4" />
                  {new Date(appointment.createdAt).toLocaleString("es-GT", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-700">
                  <Stethoscope className="size-3.5" /> {appointment.specialty}
                </span>
                {appointment.doctor && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                    {appointment.doctor}
                  </span>
                )}
              </div>

              {appointment.message && (
                <p className="mt-4 rounded-xl bg-sky-50/60 p-3 text-sm leading-6 text-slate-600">{appointment.message}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
