import { Activity, Baby, HeartPulse, ScanHeart, Siren, Stethoscope } from "lucide-react";
import { InfoCard, PageFrame, PageHero, SectionHeading } from "@/components/site/subpage-layout";
import { getContent } from "@/lib/content";

const units = [
  { icon: <HeartPulse className="size-6" />, title: "Unidad cardiovascular", description: "Prevención, evaluación y seguimiento para cuidar la salud de tu corazón." },
  { icon: <Baby className="size-6" />, title: "Unidad materno infantil", description: "Atención especializada para el embarazo, recién nacidos, niños y adolescentes." },
  { icon: <ScanHeart className="size-6" />, title: "Diagnóstico por imágenes", description: "Estudios de apoyo diagnóstico con equipos modernos y orientación profesional." },
  { icon: <Activity className="size-6" />, title: "Rehabilitación y bienestar", description: "Planes de recuperación y acompañamiento para volver a tus actividades." },
  { icon: <Siren className="size-6" />, title: "Atención prioritaria", description: "Respuesta oportuna para necesidades que no pueden esperar una cita regular." },
  { icon: <Stethoscope className="size-6" />, title: "Clínica preventiva", description: "Programas de chequeo y hábitos saludables adaptados a tu etapa de vida." },
];

export const dynamic = "force-dynamic";

export default async function UnidadesPage() {
  const content = await getContent();

  return <PageFrame contact={content.contact}><PageHero eyebrow="Atención especializada" title="Unidades pensadas para necesidades específicas" description="Integramos profesionales, tecnología y seguimiento para ofrecer una atención coordinada." /><section className="mx-auto max-w-7xl px-5 py-20 lg:px-10"><SectionHeading eyebrow="Nuestras unidades" title="Más coordinación, mejores decisiones" description="Cada unidad reúne los recursos necesarios para que recibas una atención completa y ordenada." /><div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">{units.map((unit) => <InfoCard key={unit.title} {...unit} href="/contacto#agendar" />)}</div></section><section className="bg-cyan-50/70 px-5 py-16 lg:px-10"><div className="mx-auto max-w-4xl text-center"><p className="text-lg leading-8 text-slate-600">¿Necesitas orientación sobre cuál unidad visitar? Nuestro equipo de atención puede ayudarte a elegir el primer paso.</p><a href="/contacto" className="mt-6 inline-flex rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-white shadow-brand">Solicitar orientación</a></div></section></PageFrame>;
}
