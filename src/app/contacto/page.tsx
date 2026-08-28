import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageFrame, PageHero, SectionHeading } from "@/components/site/subpage-layout";
import { Sedes } from "@/components/site/sedes";
import { AppointmentForm } from "@/components/site/appointment-form";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ especialidad?: string; doctor?: string }>;
}) {
  const { especialidad, doctor } = await searchParams;
  const content = await getContent();
  const { contact } = content;

  return (
    <PageFrame contact={contact}>
      <PageHero
        eyebrow="Estamos para ayudarte"
        title="Hablemos de tu salud"
        description="Agenda una cita, escríbenos por WhatsApp o visítanos en la clínica. Te responderemos con claridad y rapidez."
      />
      <section id="agendar" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <SectionHeading eyebrow="Contacto" title="Elige la forma más cómoda de comunicarte" description="Nuestro equipo está disponible para orientarte y confirmar tu cita." />
          <div className="grid gap-4">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-4 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 transition hover:bg-cyan-100">
              <Phone className="size-6 text-cyan-700" />
              <span><strong className="block text-slate-900">Llámanos</strong><span className="text-sm text-slate-600">{contact.phoneDisplay}</span></span>
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 transition hover:bg-emerald-100"
            >
              <MessageCircle className="size-6 text-emerald-600" />
              <span><strong className="block text-slate-900">WhatsApp</strong><span className="text-sm text-slate-600">Respuesta rápida para agendar</span></span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-4">
              <MapPin className="size-6 text-cyan-700" />
              <span><strong className="block text-slate-900">Dirección</strong><span className="text-sm text-slate-600">{contact.address}</span></span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-4">
              <Clock3 className="size-6 text-cyan-700" />
              <span><strong className="block text-slate-900">Horarios</strong><span className="text-sm text-slate-600">{contact.hours}</span></span>
            </div>
          </div>
        </div>

        <AppointmentForm
          initialSpecialty={especialidad}
          doctorName={doctor}
          specialties={content.specialties.map((specialty) => specialty.title)}
        />
      </section>
      <Sedes items={content.sedes} phone={contact.phone} phoneDisplay={contact.phoneDisplay} />
    </PageFrame>
  );
}
