"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { useState, type PointerEvent } from "react";
import { Logo, LogoMark } from "@/components/site/logo";
import type { ContactInfo } from "@/lib/content";

const DEFAULT_FOOTER_CONTACT: ContactInfo = {
  phone: "+50212345678",
  phoneDisplay: "+502 1234-5678",
  whatsapp: "50212345678",
  whatsappMessage: "Hola, deseo agendar una cita en Clínica Vitalis Salud",
  address: "Av. Reforma 123, Ciudad de Guatemala",
  hours: "Lunes a viernes, 7:00 a. m. a 8:00 p. m.",
};

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Especialidades", href: "/especialidades" },
  { label: "Staff médico", href: "/staff-medico" },
  { label: "Unidades especializadas", href: "/unidades-especializadas" },
  { label: "Contacto", href: "/contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(125,211,252,0.12)]">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-10">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-semibold text-slate-600 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-sky-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contacto#agendar" className="shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-4 py-2.5 text-center text-xs font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5 sm:px-5 sm:text-sm">
          Agendar cita
        </Link>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3 text-xs font-semibold text-slate-600 xl:hidden lg:px-10">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1.5 transition hover:border-sky-300 hover:text-sky-700">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter({ contact }: { contact?: ContactInfo }) {
  const info = contact ?? DEFAULT_FOOTER_CONTACT;

  return (
    <footer className="border-t border-sky-100 bg-slate-950 px-5 py-12 text-slate-300 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <span className="text-xl font-black text-white">VitalisSalud</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">Atención médica integral, humana y moderna para cuidar de ti y de tu familia.</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Explora</p>
          <div className="mt-4 grid gap-3 text-sm">
            {navItems.slice(1, 6).map((item) => <Link key={item.href} href={item.href} className="transition hover:text-cyan-300">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Atención</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <a href={`tel:${info.phone}`} className="flex items-center gap-2 transition hover:text-cyan-300"><Phone className="size-4" /> {info.phoneDisplay}</a>
            <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-cyan-300"><MessageCircle className="size-4" /> WhatsApp</a>
            <span>{info.address}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6">
        <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-cyan-300">
          <ShieldCheck className="size-3.5" /> Acceso administrador
        </Link>
      </div>
    </footer>
  );
}

export function PageFrame({ children, contact }: { children: React.ReactNode; contact?: ContactInfo }) {
  const [lightsOn, setLightsOn] = useState(false);
  const [touches, setTouches] = useState<Array<{ id: number; x: number; y: number }>>([]);

  function activateLights(event: PointerEvent<HTMLDivElement>) {
    const id = Date.now();
    setLightsOn(true);
    setTouches((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => setTouches((current) => current.filter((touch) => touch.id !== id)), 900);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.45),_rgba(224,242,254,0.28)_24%,_#f0f9ff_60%,_#f8fdff_100%)] text-slate-900" onPointerDown={activateLights}>
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.7),transparent_20%),radial-gradient(circle_at_80%_40%,rgba(125,211,252,0.55),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.6),transparent_22%)] transition-all duration-700 ${lightsOn ? "opacity-100" : "opacity-90"}`} />
        <div className={`absolute left-[10%] top-[18%] size-4 animate-pulse rounded-full bg-sky-200 shadow-[0_0_140px_36px_rgba(125,211,252,1)] transition-all duration-500 ${lightsOn ? "scale-125" : "scale-100"}`} />
        <div className={`absolute right-[16%] top-[24%] size-3 animate-ping rounded-full bg-sky-100 shadow-[0_0_140px_28px_rgba(186,230,253,1)] transition-all duration-500 ${lightsOn ? "scale-150" : "scale-100"}`} />
        <div className={`absolute bottom-[22%] left-[52%] size-3 animate-pulse rounded-full bg-cyan-100 shadow-[0_0_140px_28px_rgba(186,230,253,1)] transition-all duration-500 ${lightsOn ? "scale-150" : "scale-100"}`} />
        {touches.map((touch) => (
          <span
            key={touch.id}
            className="absolute size-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-[3px] border-sky-200/90 bg-sky-200/65 shadow-[0_0_150px_34px_rgba(56,189,248,1)]"
            style={{ left: touch.x, top: touch.y }}
          />
        ))}
      </div>

      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter contact={contact} />
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.45),_rgba(224,242,254,0.25)_20%,_#38bdf8_48%,_#0ea5e9_100%)] px-5 py-20 text-white sm:py-28 lg:px-10">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] left-1/3 size-80 rounded-full border border-white/20" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-100">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white drop-shadow-[0_6px_18px_rgba(8,47,73,0.35)] sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sky-50">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-10 max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-sky-700 drop-shadow-[0_2px_8px_rgba(14,165,233,0.15)] sm:text-4xl">{title}</h2>{description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}</div>;
}

export function InfoCard({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href?: string }) {
  return <article className="group flex h-full flex-col rounded-3xl border border-sky-100 bg-white p-6 shadow-[0_8px_30px_rgba(14,165,233,0.10)] transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(56,189,248,0.18)]"><div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 text-white shadow-[0_0_22px_rgba(56,189,248,0.35)]">{icon}</div><h3 className="mt-5 text-xl font-black text-sky-700">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-slate-700">{description}</p>{href && <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition group-hover:gap-3">Solicitar atención <ArrowRight className="size-4" /></Link>}</article>;
}
