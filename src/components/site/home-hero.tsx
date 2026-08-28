"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Award, CalendarDays, HeartPulse, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { InsurancePartners } from "@/components/site/insurance-partners";
import { Logo } from "@/components/site/logo";

export function HomeHero() {
  const [lightsOn, setLightsOn] = useState(false);
  const [touches, setTouches] = useState<Array<{ id: number; x: number; y: number }>>([]);

  function activateLights(event: PointerEvent<HTMLDivElement>) {
    const id = Date.now();
    setLightsOn(true);
    setTouches((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => setTouches((current) => current.filter((touch) => touch.id !== id)), 900);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.42),_rgba(224,242,254,0.28)_25%,_#e0f2fe_58%,_#f0f9ff_100%)] text-slate-900" onPointerDown={activateLights}>
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.7),transparent_20%),radial-gradient(circle_at_85%_45%,rgba(14,165,233,0.55),transparent_24%),radial-gradient(circle_at_45%_90%,rgba(125,211,252,0.62),transparent_24%)] transition-all duration-700 ${lightsOn ? "opacity-100" : "opacity-90"}`} />
        <div className={`absolute left-[8%] top-[28%] size-5 animate-pulse rounded-full bg-sky-200 shadow-[0_0_140px_36px_rgba(125,211,252,1)] transition-all duration-500 ${lightsOn ? "scale-125" : "scale-100"}`} />
        <div className={`absolute right-[12%] top-[22%] size-4 animate-ping rounded-full bg-sky-100 shadow-[0_0_150px_30px_rgba(186,230,253,1)] transition-all duration-500 ${lightsOn ? "scale-150" : "scale-100"}`} />
        <div className={`absolute bottom-[16%] left-[55%] size-3 animate-pulse rounded-full bg-cyan-100 shadow-[0_0_140px_26px_rgba(186,230,253,1)] transition-all duration-500 ${lightsOn ? "scale-150" : "scale-100"}`} />
        {touches.map((touch) => (
          <span
            key={touch.id}
            className="absolute size-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-[3px] border-sky-200/90 bg-sky-200/65 shadow-[0_0_150px_34px_rgba(56,189,248,1)]"
            style={{ left: touch.x, top: touch.y }}
          />
        ))}
      </div>

      <header className="relative z-20 border-b border-sky-200/80 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(125,211,252,0.16)]">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 py-3 lg:px-10">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-sky-800 lg:flex">
            <Link href="/nosotros" className="transition hover:text-sky-600">Nosotros</Link>
            <Link href="/servicios" className="transition hover:text-sky-600">Servicios</Link>
            <Link href="/especialidades" className="transition hover:text-sky-600">Especialidades</Link>
            <Link href="/staff-medico" className="transition hover:text-sky-600">Staff médico</Link>
            <Link href="/unidades-especializadas" className="transition hover:text-sky-600">Unidades</Link>
            <Link href="/contacto" className="transition hover:text-sky-600">Contacto</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              title="Acceso administrador"
              aria-label="Acceso administrador"
              className="hidden items-center justify-center rounded-full border border-sky-200 p-2.5 text-sky-700/70 transition hover:border-sky-400 hover:text-sky-700 sm:flex"
            >
              <ShieldCheck className="size-4" />
            </Link>
            <Link href="/contacto#agendar" className="rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 px-4 py-2.5 text-xs font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5 sm:px-5 sm:text-sm">Solicitar cita</Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-[fade-in-up_0.8s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-700 shadow-[0_0_30px_rgba(125,211,252,0.14)]"><Sparkles className="size-4" /> Atención médica integral</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-sky-700 drop-shadow-[0_2px_10px_rgba(14,165,233,0.12)] sm:text-7xl">Cuidamos tu salud con <span className="text-sky-500">profesionalismo.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">Atención médica moderna, humana y confiable para cuidar de ti y de tu familia. Nuestro equipo está listo para acompañarte en cada etapa.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contacto#agendar" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(56,189,248,0.45)] transition hover:-translate-y-1 hover:brightness-105">Solicitar una cita <ArrowRight className="size-4" /></Link>
              <Link href="/servicios" className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-700 shadow-[0_0_24px_rgba(125,211,252,0.15)] transition hover:-translate-y-1 hover:border-sky-300 hover:text-sky-700">Explorar servicios <HeartPulse className="size-4" /></Link>
            </div>
            <button type="button" className="mt-5 text-sm font-semibold text-sky-700 transition hover:text-sky-900" onClick={() => setLightsOn(true)}><span aria-hidden="true">✦</span> Toca la portada para activar las luces celestes</button>
            <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[['15+', 'Años de experiencia'], ['30+', 'Especialistas'], ['20K+', 'Pacientes'], ['24/7', 'Emergencias']].map(([value, label]) => <div key={label} className="rounded-2xl border border-sky-100 bg-white/80 p-4 text-center shadow-[0_0_18px_rgba(125,211,252,0.10)] backdrop-blur"><p className="text-2xl font-black text-sky-600">{value}</p><p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</p></div>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-[fade-in-up_1s_ease-out_0.15s_both]">
            <div className="absolute inset-8 animate-[spin_24s_linear_infinite] rounded-full border border-sky-300/50" />
            <div className="absolute inset-20 animate-[spin_18s_linear_infinite_reverse] rounded-full border border-dashed border-cyan-300/50" />
            <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-full border border-sky-200/80 bg-sky-100/60 p-5 shadow-[0_25px_80px_rgba(56,189,248,0.24)] backdrop-blur-sm sm:p-8">
              <div className="absolute inset-12 animate-pulse rounded-full bg-sky-200/50 blur-3xl" />
              <div className="relative size-full overflow-hidden rounded-full border-8 border-white/80 shadow-[0_25px_55px_rgba(14,165,233,0.18)]">
                <Image src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=85" alt="Médico atendiendo en una clínica moderna" fill className="object-cover transition duration-[1400ms] hover:scale-110" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/75 via-sky-900/10 to-cyan-200/20" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-10">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sky-400 text-white shadow-[0_0_25px_rgba(56,189,248,0.6)]"><Stethoscope className="size-7" /></div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-sky-100">VitalisSalud</p>
                  <p className="mt-2 text-2xl font-black text-white sm:text-3xl">Cuidamos tu bienestar</p>
                </div>
              </div>
            </div>
            <Link href="/staff-medico" className="absolute -left-2 top-1/4 flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-left shadow-[0_18px_35px_rgba(14,165,233,0.12)] backdrop-blur transition hover:-translate-y-1 sm:-left-8"><Award className="size-5 text-sky-600" /><span><span className="block text-xs font-bold text-slate-900">Staff certificado</span><span className="block text-[0.68rem] text-slate-500">Conoce al equipo</span></span></Link>
            <Link href="/contacto#agendar" className="absolute -right-2 bottom-1/4 flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-left shadow-[0_18px_35px_rgba(14,165,233,0.12)] backdrop-blur transition hover:-translate-y-1 sm:-right-8"><CalendarDays className="size-5 text-sky-600" /><span><span className="block text-xs font-bold text-slate-900">Agenda en minutos</span><span className="block text-[0.68rem] text-slate-500">Solicitar consulta</span></span></Link>
          </div>
        </div>
      </main>

      <InsurancePartners />
    </div>
  );
}
