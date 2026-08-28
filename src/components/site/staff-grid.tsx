"use client";

import { Award, CalendarDays, GraduationCap, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Doctor } from "@/lib/content";

function agendarHref(doctor: Doctor) {
  return `/contacto?especialidad=${encodeURIComponent(doctor.specialty)}&doctor=${encodeURIComponent(doctor.name)}#agendar`;
}

export function StaffGrid({ doctors }: { doctors: Doctor[] }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <>
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <article
            key={doctor.name}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedDoctor(doctor)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedDoctor(doctor);
              }
            }}
            className="flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-[0_8px_30px_rgba(7,59,145,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(8,145,178,0.2)]"
          >
            <div className="relative h-64 shrink-0 overflow-hidden bg-[#dff8ff]">
              <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedDoctor(doctor);
                }}
                className="absolute right-3 top-3 rounded-full bg-[#073b91] px-3 py-1 text-xs font-bold text-cyan-100 shadow-sm transition hover:bg-cyan-600"
              >
                Certificado
              </button>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-black text-[#073b91]">{doctor.name}</h2>
              <p className="mt-1 font-semibold text-cyan-700">{doctor.specialty}</p>
              <div className="mt-5 grid gap-3 border-t border-cyan-100 pt-4 text-sm text-slate-600">
                <p className="flex gap-2"><GraduationCap className="size-4 shrink-0 text-cyan-600" />{doctor.experience}</p>
                <p className="flex gap-2"><Award className="size-4 shrink-0 text-cyan-600" />Registro {doctor.registration}</p>
              </div>
              <Link href={agendarHref(doctor)} className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-700">
                Solicitar consulta <CalendarDays className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 px-5 backdrop-blur-sm" onClick={() => setSelectedDoctor(null)}>
          <div className="relative w-full max-w-lg rounded-[30px] border border-cyan-100 bg-white p-6 shadow-[0_25px_80px_rgba(8,145,178,0.22)]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              aria-label="Cerrar certificado"
              onClick={() => setSelectedDoctor(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Certificado profesional</p>
                <h3 className="mt-1 text-2xl font-black text-sky-700">{selectedDoctor.name}</h3>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-cyan-100 bg-sky-50 p-4 text-sm leading-7 text-slate-700">
              <p className="font-semibold text-slate-800">{selectedDoctor.specialty}</p>
              <p className="mt-2">{selectedDoctor.intro}</p>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-slate-600">
              <p className="flex items-center gap-2"><GraduationCap className="size-4 text-cyan-600" />{selectedDoctor.experience}</p>
              <p className="flex items-center gap-2"><Award className="size-4 text-cyan-600" />Registro {selectedDoctor.registration}</p>
            </div>
            <Link
              href={agendarHref(selectedDoctor)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)]"
            >
              Solicitar consulta <CalendarDays className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
