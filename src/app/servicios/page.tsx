import Image from "next/image";
import {
  Activity,
  Ambulance,
  Baby,
  Bone,
  Brain,
  ClipboardPlus,
  Eye,
  HeartPulse,
  Microscope,
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { PageFrame, PageHero, SectionHeading } from "@/components/site/subpage-layout";
import { ServicesGrid } from "@/components/site/services-grid";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const iconClass = "size-5";

const services = [
  { icon: <Stethoscope className={iconClass} />, title: "Consulta médica" },
  { icon: <ClipboardPlus className={iconClass} />, title: "Medicina interna" },
  { icon: <Baby className={iconClass} />, title: "Pediatría" },
  { icon: <HeartPulse className={iconClass} />, title: "Cardiología" },
  { icon: <Bone className={iconClass} />, title: "Traumatología" },
  { icon: <Eye className={iconClass} />, title: "Oftalmología" },
  { icon: <Brain className={iconClass} />, title: "Neurología" },
  { icon: <Smile className={iconClass} />, title: "Odontología" },
  { icon: <Sparkles className={iconClass} />, title: "Dermatología" },
  { icon: <Microscope className={iconClass} />, title: "Laboratorio clínico" },
  { icon: <Activity className={iconClass} />, title: "Diagnóstico por imágenes" },
  { icon: <Scissors className={iconClass} />, title: "Cirugía general" },
  { icon: <Syringe className={iconClass} />, title: "Vacunación" },
  { icon: <ShieldCheck className={iconClass} />, title: "Chequeos preventivos" },
  { icon: <Ambulance className={iconClass} />, title: "Urgencias 24/7" },
];

const labHighlights = [
  { title: "Análisis clínicos", description: "Resultados fiables y rápidos para apoyar una decisión médica segura.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80" },
  { title: "Laboratorio de diagnóstico", description: "Equipos modernos para exámenes de sangre, química y microbiología.", image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80" },
  { title: "Control y seguimiento", description: "Monitoreo preciso para tratamientos y prevención de riesgos.", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80" },
];

export default async function ServiciosPage() {
  const content = await getContent();

  return (
    <PageFrame contact={content.contact}>
      <PageHero eyebrow="Nuestros servicios" title="Soluciones de salud para cada momento" description="Encuentra atención médica, prevención, diagnóstico y seguimiento en un solo lugar." />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <SectionHeading eyebrow="Atención integral" title="Todo lo que necesitas para cuidar tu salud" description="Explora nuestros servicios médicos organizados para que encuentres fácilmente el apoyo que buscas." />
        <ServicesGrid items={services} href="/contacto#agendar" />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10">
        <SectionHeading eyebrow="Laboratorio" title="Tecnología para diagnósticos confiables" description="Nuestra área de laboratorio combina precisión, rapidez y acompañamiento clínico para cada paciente." />
        <div className="grid gap-6 lg:grid-cols-3">
          {labHighlights.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_12px_30px_rgba(14,165,233,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,165,233,0.18)]">
              <div className="relative h-64 overflow-hidden">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-sky-700">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-gradient-brand px-5 py-16 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">¿No sabes por dónde empezar?</p>
            <h2 className="mt-2 text-3xl font-bold">Te ayudamos a encontrar la atención adecuada.</h2>
          </div>
          <a href="/contacto#agendar" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-cyan-700 shadow-lg transition hover:-translate-y-0.5">Hablar con nosotros</a>
        </div>
      </section>
    </PageFrame>
  );
}
