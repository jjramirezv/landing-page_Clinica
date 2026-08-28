"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function AppointmentForm({
  initialSpecialty,
  doctorName,
  specialties,
}: {
  initialSpecialty?: string;
  doctorName?: string;
  specialties: string[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          specialty: data.get("specialty"),
          doctor: doctorName ?? "",
          message: data.get("message"),
        }),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-[0_12px_35px_rgba(8,145,178,0.1)] sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900">Solicita tu cita</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Déjanos tus datos y nos comunicaremos contigo para confirmar disponibilidad.</p>

      {doctorName && (
        <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-slate-700">
          Agendarás con <span className="font-bold text-sky-700">{doctorName}</span>
          {initialSpecialty && (
            <>
              {" — "}
              <span className="font-semibold">{initialSpecialty}</span>
            </>
          )}
          . Solo necesitamos tu nombre y datos de contacto para continuar.
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Tu nombre
          <input
            required
            name="name"
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            placeholder="¿Cómo te llamas?"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Teléfono
          <input
            required
            type="tel"
            name="phone"
            className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            placeholder="5555-1234"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
          Especialidad
          <select
            required
            name="specialty"
            defaultValue={initialSpecialty ?? ""}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="">Selecciona una especialidad</option>
            {specialties.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
          Mensaje
          <textarea
            name="message"
            rows={4}
            className="resize-none rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            placeholder="Cuéntanos cómo podemos ayudarte"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-gradient-brand px-5 py-3.5 text-sm font-bold text-white shadow-brand transition hover:opacity-95 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </button>

      {status === "success" && (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
          <CheckCircle2 className="size-4" /> Recibimos tu solicitud. Te contactaremos pronto.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-center text-sm font-semibold text-red-600">
          Hubo un problema al enviar tu solicitud. Intenta de nuevo.
        </p>
      )}
    </form>
  );
}
