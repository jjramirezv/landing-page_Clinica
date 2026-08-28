"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Award, CheckCircle2, MessageCircle, Star, X } from "lucide-react";
import { HomeHero } from "@/components/site/home-hero";

const servicios = [
  {
    title: "Cardiología",
    description: "Prevención y seguimiento integral para tu salud cardiovascular.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pediatría",
    description: "Cuidados médicos cálidos y especializados para cada etapa infantil.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Dermatología",
    description: "Tratamiento personalizado para la salud de tu piel y bienestar.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
  },
];

const especialistas = [
  {
    nombre: "Dra. María López",
    cargo: "Cardiología",
    experiencia: "12 años de experiencia",
    registro: "CMP 45821",
    descripcion: "Especialista en prevención cardiovascular, hipertensión y seguimiento integral del corazón.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Dr. Carlos Ruiz",
    cargo: "Pediatría",
    experiencia: "10 años de experiencia",
    registro: "CMP 39214",
    descripcion: "Acompaña el crecimiento y desarrollo de niños y adolescentes con atención cercana.",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    nombre: "Dra. Ana Torres",
    cargo: "Dermatología",
    experiencia: "9 años de experiencia",
    registro: "CMP 41706",
    descripcion: "Experta en salud de la piel, diagnóstico clínico y tratamientos dermatológicos personalizados.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
];

const comentarios = [
  {
    nombre: "Laura Fernández",
    comentario: "Una excelente clínica. El personal fue muy amable y la doctora explicó todo con mucha paciencia.",
    detalle: "Paciente de Cardiología",
  },
  {
    nombre: "Jorge Ramírez",
    comentario: "Pude agendar fácilmente y me atendieron a tiempo. Las instalaciones son modernas y muy limpias.",
    detalle: "Paciente de Medicina General",
  },
  {
    nombre: "Daniela Castro",
    comentario: "Me sentí acompañada en todo momento. Recomiendo VitalisSalud por su atención humana y profesional.",
    detalle: "Paciente de Pediatría",
  },
];

export function LegacyHome() {
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof especialistas)[number] | null>(null);
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [touches, setTouches] = useState<Array<{ id: number; x: number; y: number }>>([]);

  function handleAppointmentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppointmentSent(true);
    event.currentTarget.reset();
  }

  return (
    <div
      className="relative min-h-screen bg-white text-slate-900"
      onPointerDown={(event) => {
        const id = Date.now();
        setLightsOn(true);
        setTouches((current) => [...current.slice(-5), {
          id,
          x: event.clientX,
          y: event.clientY,
        }]);
        window.setTimeout(() => {
          setTouches((current) => current.filter((touch) => touch.id !== id));
        }, 900);
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-multiply">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.16),transparent_28%),radial-gradient(circle_at_80%_45%,rgba(125,211,252,0.14),transparent_30%),radial-gradient(circle_at_45%_90%,rgba(165,243,252,0.16),transparent_26%)] transition-opacity duration-700 ${lightsOn ? "opacity-100" : "opacity-60"}`} />
        {lightsOn && (
          <>
            <div className="absolute left-[8%] top-[38%] size-5 animate-pulse rounded-full bg-cyan-200 shadow-[0_0_65px_24px_rgba(103,232,249,0.55)]" />
            <div className="absolute right-[12%] top-[62%] size-4 animate-ping rounded-full bg-sky-200 shadow-[0_0_55px_20px_rgba(125,211,252,0.5)]" />
            <div className="absolute bottom-[10%] left-[55%] size-3 animate-pulse rounded-full bg-cyan-100 shadow-[0_0_45px_16px_rgba(165,243,252,0.6)]" />
          </>
        )}
        {touches.map((touch) => (
          <div
            key={touch.id}
            className="absolute size-20 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-cyan-100 bg-cyan-200/25 shadow-[0_0_45px_18px_rgba(103,232,249,0.7)]"
            style={{ left: touch.x, top: touch.y }}
          />
        ))}
      </div>
      <header className="sticky top-0 z-50 border-b border-cyan-100/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-lg font-bold text-white shadow-brand">
              +
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-cyan-600">
                Clínica
              </p>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Vitalis<span className="text-cyan-500">Salud</span>
              </h2>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 xl:flex">
            <Link href="/" className="transition hover:text-cyan-600">Inicio</Link>
            <a href="/nosotros" className="transition hover:text-cyan-600">Nosotros</a>
            <a href="/servicios" className="transition hover:text-cyan-600">Servicios</a>
            <a href="/especialidades" className="transition hover:text-cyan-600">Especialidades</a>
            <a href="/staff-medico" className="transition hover:text-cyan-600">Staff médico</a>
            <a href="/unidades-especializadas" className="transition hover:text-cyan-600">Unidades especializadas</a>
            <a href="/contacto" className="transition hover:text-cyan-600">Contacto</a>
          </nav>

          <a href="#agendar" className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:scale-[1.02]">
            Agendar cita
          </a>
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden bg-gradient-hero"
        >
          <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${lightsOn ? "opacity-100" : "opacity-90"}`}>
            <div className="absolute left-[-6rem] top-16 h-80 w-80 rounded-full bg-cyan-300/45 blur-3xl" />
            <div className="absolute right-[-4rem] top-20 h-96 w-96 rounded-full bg-sky-300/55 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/45 blur-3xl" />
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,0.18),transparent_42%)]" />
            <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30 animate-[spin_24s_linear_infinite]" />
            <div className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-300/25 animate-[spin_18s_linear_infinite_reverse]" />
            {lightsOn && (
              <>
                <div className="absolute left-[12%] top-[24%] size-4 animate-ping rounded-full bg-cyan-200 shadow-[0_0_45px_16px_rgba(103,232,249,0.95)]" />
                <div className="absolute right-[18%] top-[18%] size-3 animate-pulse rounded-full bg-white shadow-[0_0_40px_14px_rgba(165,243,252,1)]" />
                <div className="absolute bottom-[20%] left-[42%] size-5 animate-pulse rounded-full bg-sky-200 shadow-[0_0_55px_20px_rgba(125,211,252,0.9)]" />
                <div className="absolute bottom-[30%] right-[8%] size-3 animate-ping rounded-full bg-cyan-100 shadow-[0_0_40px_14px_rgba(103,232,249,0.95)]" />
              </>
            )}
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
            <div className="flex flex-col justify-center animate-[fade-in-up_0.8s_ease-out_both]">
              <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-700 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                Atención médica de confianza
              </span>

              <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
                Tu salud merece
                <span className="text-gradient-brand"> atención extraordinaria.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                En Clínica Vitalis Salud combinamos tecnología, experiencia y calidez humana para cuidar a tu familia con la atención que se merece.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#agendar"
                  className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_26px_rgba(6,182,212,0.5)] transition hover:scale-[1.02]"
                >
                  Agendar una cita
                </a>
                <a
                  href="#servicios"
                  className="rounded-full border border-cyan-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_0_24px_rgba(34,211,238,0.14)] transition hover:border-cyan-300 hover:text-cyan-700"
                >
                  Ver especialidades
                </a>
              </div>

              <p className="mt-4 text-sm font-semibold text-cyan-700">
                {lightsOn ? "✨ Luces celestes activadas" : "Toca la portada para encender las luces"}
              </p>

              <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["15+", "Años de experiencia"],
                  ["30+", "Especialistas"],
                  ["20K+", "Pacientes"],
                  ["98%", "Satisfacción"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-cyan-100 bg-white/80 p-4 text-center shadow-[0_0_18px_rgba(34,211,238,0.08)] backdrop-blur-sm">
                    <div className="text-2xl font-black text-cyan-700">{value}</div>
                    <div className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-slate-600">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-[fade-in-up_1s_ease-out_0.15s_both]">
              <div className="absolute -left-8 top-16 h-24 w-24 animate-[float-soft_5s_ease-in-out_infinite] rounded-full border border-cyan-300 bg-cyan-100/60 blur-sm" />
              <div className="absolute -right-10 bottom-14 h-20 w-20 animate-[float-soft_6s_ease-in-out_0.8s_infinite] rounded-full border border-cyan-300 bg-cyan-100/60 blur-sm" />
              <div className="absolute -right-3 top-1/2 z-10 h-5 w-5 animate-ping rounded-full bg-white shadow-[0_0_30px_12px_rgba(103,232,249,0.85)]" />

              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-200/70 bg-white/90 p-4 shadow-[0_32px_70px_rgba(34,211,238,0.28)] ring-1 ring-cyan-200/70 backdrop-blur-sm transition duration-700 hover:-translate-y-2 hover:shadow-[0_38px_90px_rgba(34,211,238,0.4)]">
                <Image
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor atendiendo a un paciente"
                  width={900}
                  height={1100}
                  className="h-[560px] w-full rounded-[1.5rem] object-cover transition duration-[1200ms] hover:scale-105"
                  priority
                />

                <div className="absolute left-8 top-8 animate-[float-soft_5s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/85 p-3 shadow-lg backdrop-blur-sm">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cyan-700">
                    Urgencias
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900">24/7</p>
                </div>

                <div className="absolute bottom-8 right-8 animate-[float-soft_6s_ease-in-out_0.5s_infinite] rounded-2xl border border-cyan-100 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">✓</div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Especialistas
                      </p>
                      <p className="text-lg font-black text-slate-900">30 +</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="bg-gradient-section px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                Nuestros servicios
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-sky-700 drop-shadow-[0_2px_10px_rgba(14,165,233,0.14)]">
                Especialidades médicas
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {servicios.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-[0_0_18px_rgba(34,211,238,0.08)] transition hover:-translate-y-2 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={900}
                      height={700}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    <button className="mt-6 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100">
                      Solicitar atención
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              <Image
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                alt="Instalaciones de la clínica"
                width={1200}
                height={900}
                className="h-[520px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                Sobre nosotros
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-sky-700 drop-shadow-[0_2px_10px_rgba(14,165,233,0.14)]">
                Una atención médica cercana, moderna y confiable.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Desde nuestra fundación hemos trabajado para ofrecer una experiencia de salud más humana, más rápida y más segura para cada paciente. Nuestro equipo te acompaña desde la prevención hasta el tratamiento, con orientación clara y seguimiento continuo.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Contamos con consultorios modernos, atención para toda la familia y un equipo preparado para responder tus preguntas antes, durante y después de cada consulta.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  "Especialistas certificados y en constante actualización.",
                  "Tecnología de diagnóstico avanzada y tiempos de espera razonables.",
                  "Atención personalizada para familias, empresas y adultos mayores.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">
                      ✓
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="especialistas" className="bg-slate-50 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                Nuestro equipo
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-sky-700 drop-shadow-[0_2px_10px_rgba(14,165,233,0.14)]">
                Profesionales que cuidan de ti
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {especialistas.map((doc) => (
                <article key={doc.nombre} className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-4 shadow-[0_0_20px_rgba(34,211,238,0.08)] transition hover:-translate-y-2">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={doc.image}
                      alt={doc.nombre}
                      width={800}
                      height={900}
                      className="h-80 w-full object-cover"
                    />
                  </div>
                  <div className="px-2 pb-2 pt-5">
                    <h3 className="text-2xl font-black text-slate-900">{doc.nombre}</h3>
                    <p className="mt-2 text-cyan-700">{doc.cargo}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(doc)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700 transition hover:bg-cyan-100"
                    >
                      <Award className="size-4" /> Ver certificado
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="comentarios" className="bg-gradient-section px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">Lo que dicen nuestros pacientes</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-sky-700 drop-shadow-[0_2px_10px_rgba(14,165,233,0.12)]">Una clínica en la que puedes confiar</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Cada comentario nos impulsa a seguir ofreciendo una atención cercana, clara y profesional.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {comentarios.map((comentario) => (
                <article key={comentario.nombre} className="rounded-[2rem] border border-cyan-100 bg-white p-7 shadow-[0_0_20px_rgba(34,211,238,0.1)] transition hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  <div className="flex gap-1 text-amber-400" aria-label="5 estrellas">
                    {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}
                  </div>
                  <p className="mt-5 text-base leading-7 text-slate-600">“{comentario.comentario}”</p>
                  <div className="mt-6 border-t border-cyan-100 pt-4">
                    <p className="font-bold text-slate-900">{comentario.nombre}</p>
                    <p className="mt-1 text-sm text-cyan-700">{comentario.detalle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-cyan-100 bg-gradient-brand p-8 text-white shadow-[0_24px_55px_rgba(6,182,212,0.35)] md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">
                  Agenda tu cita
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  Cuida tu salud con un equipo que te escucha.
                </h2>
              </div>
              <a
                href="#agendar"
                className="inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-cyan-700 shadow-[0_0_24px_rgba(255,255,255,0.4)] transition hover:scale-[1.02]"
              >
                Quiero una cita
              </a>
            </div>
          </div>
        </section>
        <section id="agendar" className="bg-cyan-50/70 px-6 py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">Agenda tu consulta</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-sky-700 drop-shadow-[0_2px_10px_rgba(14,165,233,0.14)]">Estamos listos para atenderte.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Completa tus datos y nos pondremos en contacto contigo para confirmar el horario disponible con el especialista que necesitas.</p>
              <a
                href="https://wa.me/50212345678?text=Hola%2C%20deseo%20agendar%20una%20cita%20en%20Cl%C3%ADnica%20Vitalis%20Salud"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5d]"
              >
                <MessageCircle className="size-5" /> Agendar por WhatsApp
              </a>
            </div>

            <form onSubmit={handleAppointmentSubmit} className="rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-[0_0_25px_rgba(34,211,238,0.12)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Nombre completo
                  <input required name="name" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" placeholder="Tu nombre" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Teléfono
                  <input required type="tel" name="phone" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" placeholder="5555-1234" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                  Especialidad
                  <select required name="specialty" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
                    <option value="">Selecciona una especialidad</option>
                    {servicios.map((item) => <option key={item.title}>{item.title}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                  Mensaje (opcional)
                  <textarea name="message" rows={3} className="resize-none rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" placeholder="Cuéntanos cómo podemos ayudarte" />
                </label>
              </div>
              <button type="submit" className="mt-6 w-full rounded-full bg-gradient-brand px-5 py-3.5 text-sm font-semibold text-white shadow-brand transition hover:opacity-95">Solicitar cita</button>
              {appointmentSent && <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600"><CheckCircle2 className="size-4" /> Recibimos tu solicitud. Te contactaremos pronto.</p>}
            </form>
          </div>
        </section>
      </main>

      {selectedDoctor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 px-5 py-8" role="presentation" onClick={() => setSelectedDoctor(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="doctor-certificate-title" className="relative w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Cerrar certificado" onClick={() => setSelectedDoctor(null)} className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><X className="size-5" /></button>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"><Award className="size-7" /></div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Certificado profesional</p>
            <h2 id="doctor-certificate-title" className="mt-2 text-3xl font-black text-slate-900">{selectedDoctor.nombre}</h2>
            <p className="mt-2 font-semibold text-cyan-700">{selectedDoctor.cargo}</p>
            <p className="mt-5 leading-7 text-slate-600">{selectedDoctor.descripcion}</p>
            <div className="mt-6 grid gap-3 rounded-2xl bg-cyan-50 p-4 text-sm text-slate-700">
              <p><span className="font-bold">Experiencia:</span> {selectedDoctor.experiencia}</p>
              <p><span className="font-bold">Registro profesional:</span> {selectedDoctor.registro}</p>
              <p className="font-semibold text-emerald-600">✓ Certificación vigente</p>
            </div>
            <a href="#agendar" onClick={() => setSelectedDoctor(null)} className="mt-6 block rounded-full bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-brand">Agendar con este especialista</a>
          </div>
        </div>
      )}

      <footer id="contacto" className="border-t border-cyan-100 bg-slate-950 px-6 py-10 text-slate-300 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-brand text-lg font-bold text-white">
                +
              </div>
              <h3 className="text-xl font-black text-white">VitalisSalud</h3>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Cuidando la salud de tu familia con atención médica personalizada, humana y moderna.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <a href="/servicios" className="transition hover:text-cyan-400">Servicios</a>
            <a href="/especialidades" className="transition hover:text-cyan-400">Especialidades</a>
            <a href="/staff-medico" className="transition hover:text-cyan-400">Staff médico</a>
            <a href="/contacto" className="transition hover:text-cyan-400">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeHero;
