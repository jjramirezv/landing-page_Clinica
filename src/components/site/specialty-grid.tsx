"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import { useState } from "react";
import type { Doctor } from "@/lib/content";

type Specialty = { title: string; description: string; image: string };

export function SpecialtyGrid({ items, doctors }: { items: Specialty[]; doctors: Doctor[] }) {
  const [selected, setSelected] = useState<Specialty | null>(null);
  const doctor = selected ? doctors.find((item) => item.specialty === selected.title) : undefined;

  const agendarHref = selected
    ? `/contacto?especialidad=${encodeURIComponent(selected.title)}${
        doctor ? `&doctor=${encodeURIComponent(doctor.name)}` : ""
      }#agendar`
    : "/contacto#agendar";

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setSelected(item)}
            className="group relative block h-72 overflow-hidden rounded-3xl text-left shadow-[0_8px_30px_rgba(14,165,233,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(56,189,248,0.25)] sm:h-80"
          >
            <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/85">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition group-hover:gap-2.5">
                Solicitar atención <ArrowRight className="size-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 px-5 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-cyan-100 bg-white shadow-[0_25px_80px_rgba(8,145,178,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow transition hover:bg-white hover:text-slate-900"
            >
              <X className="size-5" />
            </button>

            {doctor && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={doctor.image} alt={doctor.name} fill sizes="450px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">{selected.title}</p>

              {doctor ? (
                <>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">{doctor.name}</h3>
                  <p className="mt-1 font-semibold text-cyan-700">{doctor.specialty}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{doctor.intro}</p>
                </>
              ) : (
                <p className="mt-3 text-sm leading-7 text-slate-600">{selected.description}</p>
              )}

              <Link
                href={agendarHref}
                onClick={() => setSelected(null)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5"
              >
                Agendar cita <CalendarDays className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
