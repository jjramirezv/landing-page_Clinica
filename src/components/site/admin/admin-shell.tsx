"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { CalendarClock, MapPin, Phone, Stethoscope, UserCog, Users } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { LogoutButton } from "@/components/site/logout-button";

const ADMIN_NAV = [
  { href: "/admin", label: "Citas", icon: CalendarClock },
  { href: "/admin/doctores", label: "Doctores", icon: Stethoscope },
  { href: "/admin/especialidades", label: "Especialidades", icon: Users },
  { href: "/admin/sedes", label: "Sedes", icon: MapPin },
  { href: "/admin/contacto", label: "Contacto", icon: Phone },
  { href: "/admin/cuenta", label: "Mi cuenta", icon: UserCog },
];

export function AdminShell({
  title,
  active,
  username,
  children,
}: {
  title: string;
  active: string;
  username?: string;
  children: React.ReactNode;
}) {
  const [lightsOn, setLightsOn] = useState(false);
  const [touches, setTouches] = useState<Array<{ id: number; x: number; y: number }>>([]);

  function activateLights(event: PointerEvent<HTMLDivElement>) {
    const id = Date.now();
    setLightsOn(true);
    setTouches((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => setTouches((current) => current.filter((touch) => touch.id !== id)), 900);
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.4),_rgba(224,242,254,0.24)_24%,_#f0f9ff_55%,_#f8fdff_100%)]"
      onPointerDown={activateLights}
    >
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen">
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.55),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(125,211,252,0.45),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.5),transparent_22%)] transition-all duration-700 ${lightsOn ? "opacity-100" : "opacity-80"}`}
        />
        <div className={`absolute left-[8%] top-[16%] size-4 animate-pulse rounded-full bg-sky-200 shadow-[0_0_120px_32px_rgba(125,211,252,1)] transition-all duration-500 ${lightsOn ? "scale-125" : "scale-100"}`} />
        <div className={`absolute right-[14%] top-[22%] size-3 animate-ping rounded-full bg-sky-100 shadow-[0_0_120px_26px_rgba(186,230,253,1)] transition-all duration-500 ${lightsOn ? "scale-150" : "scale-100"}`} />
        <div className={`absolute bottom-[18%] left-[48%] size-3 animate-pulse rounded-full bg-cyan-100 shadow-[0_0_120px_26px_rgba(186,230,253,1)] transition-all duration-500 ${lightsOn ? "scale-150" : "scale-100"}`} />
        {touches.map((touch) => (
          <span
            key={touch.id}
            className="absolute size-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-[3px] border-sky-200/90 bg-sky-200/65 shadow-[0_0_140px_30px_rgba(56,189,248,1)]"
            style={{ left: touch.x, top: touch.y }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <header className="border-b border-sky-100 bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(125,211,252,0.12)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-10">
            <div className="flex items-center gap-3">
              <LogoMark className="size-11" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                  {username ? `Hola, ${username}` : "Panel administrador"}
                </p>
                <h1 className="text-xl font-black tracking-tight text-slate-900">{title}</h1>
              </div>
            </div>
            <LogoutButton />
          </div>
          <nav className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-5 pb-3 lg:px-10">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === active;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-sky-400 to-cyan-500 text-white shadow-[0_8px_20px_rgba(14,165,233,0.35)]"
                      : "text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                  }`}
                >
                  <Icon className="size-4" /> {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-10 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
