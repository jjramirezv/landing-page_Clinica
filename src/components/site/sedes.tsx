"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, PhoneCall } from "lucide-react";
import { useState } from "react";
import type { Sede } from "@/lib/content";

export function Sedes({ items: sedes, phone, phoneDisplay }: { items: Sede[]; phone: string; phoneDisplay: string }) {
  const [index, setIndex] = useState(0);

  function go(next: number) {
    setIndex((next + sedes.length) % sedes.length);
  }

  const sede = sedes[index];

  if (!sede) return null;

  return (
    <section className="bg-slate-50 px-5 py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Nuestras ubicaciones</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Conoce nuestras <span className="text-sky-600">sedes</span>
          </h2>
          <a href={`tel:${phone}`} className="mt-6 flex items-center gap-3 text-xl font-bold text-slate-800 transition hover:text-sky-700">
            <PhoneCall className="size-6 text-sky-600" /> {phoneDisplay}
          </a>
          <Link
            href="/contacto#agendar"
            className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5"
          >
            Reservar cita
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_18px_45px_rgba(14,165,233,0.14)]">
            <div className="grid sm:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col justify-center gap-3 p-6 sm:p-7">
                <span className="flex size-11 items-center justify-center rounded-full border-2 border-sky-200 text-sky-600">
                  <MapPin className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">{sede.nombre}</h3>
                <p className="text-sm leading-6 text-slate-600">{sede.direccion}</p>
              </div>
              <div className="relative h-52 sm:h-full">
                <Image src={sede.image} alt={sede.nombre} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Sede anterior"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-lg transition hover:bg-slate-900"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente sede"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-lg transition hover:bg-slate-900"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {sedes.map((item, itemIndex) => (
              <button
                key={item.nombre}
                type="button"
                aria-label={`Ver ${item.nombre}`}
                onClick={() => setIndex(itemIndex)}
                className={`h-2 rounded-full transition-all ${itemIndex === index ? "w-7 bg-sky-500" : "w-2 bg-sky-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
