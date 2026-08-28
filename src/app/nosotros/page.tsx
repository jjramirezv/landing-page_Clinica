import { HeartHandshake, ShieldCheck, Users, Zap } from "lucide-react";
import { InfoCard, PageFrame, PageHero, SectionHeading } from "@/components/site/subpage-layout";
import { getContent } from "@/lib/content";

const values = [
  { icon: <HeartHandshake className="size-6" />, title: "Trato humano", description: "Escuchamos tus necesidades y explicamos cada paso con claridad para que tomes decisiones con confianza." },
  { icon: <ShieldCheck className="size-6" />, title: "Confianza y seguridad", description: "Trabajamos con protocolos de calidad, profesionales certificados y un seguimiento responsable." },
  { icon: <Users className="size-6" />, title: "Cuidado familiar", description: "Acompañamos a niños, adultos, familias y adultos mayores con atención cercana y respetuosa." },
  { icon: <Zap className="size-6" />, title: "Innovación útil", description: "Incorporamos tecnología que mejora el diagnóstico, la comunicación y la experiencia del paciente." },
];

export const dynamic = "force-dynamic";

export default async function NosotrosPage() {
  const content = await getContent();

  return <PageFrame contact={content.contact}><PageHero eyebrow="Quiénes somos" title="Una clínica que te acompaña de verdad" description="En VitalisSalud combinamos experiencia médica, tecnología y calidez humana para que cada visita sea clara, segura y cercana." /><section className="mx-auto max-w-7xl px-5 py-20 lg:px-10"><div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-cyan-50 p-3 shadow-[0_18px_50px_rgba(8,145,178,0.14)]"><img src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80" alt="Profesional de salud acompañando a una paciente" className="h-[420px] w-full rounded-[1.5rem] object-cover" /></div><div><SectionHeading eyebrow="Nuestra historia" title="Más de 15 años poniendo a las personas primero" description="Nacimos con la idea de hacer que la atención médica se sintiera más humana y accesible. Hoy reunimos especialistas de distintas áreas en un mismo lugar, con procesos sencillos y acompañamiento continuo." /><p className="leading-7 text-slate-600">Cada consulta comienza con una conversación. Nuestro equipo se toma el tiempo de entenderte, resolver tus dudas y construir contigo un plan de cuidado que se adapte a tu vida.</p></div></div></section><section className="bg-cyan-50/70 px-5 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Lo que nos guía" title="Principios que se sienten en cada consulta" /><div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">{values.map((item) => <InfoCard key={item.title} {...item} />)}</div></div></section></PageFrame>;
}
