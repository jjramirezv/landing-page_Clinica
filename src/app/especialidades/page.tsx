import { PageFrame, PageHero, SectionHeading } from "@/components/site/subpage-layout";
import { SpecialtyGrid } from "@/components/site/specialty-grid";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EspecialidadesPage() {
  const content = await getContent();

  return (
    <PageFrame contact={content.contact}>
      <PageHero eyebrow="Áreas médicas" title="Especialistas para cuidar lo que más importa" description="Conoce nuestras especialidades y encuentra el equipo indicado para acompañarte." />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <SectionHeading eyebrow="Encuentra tu especialidad" title="Atención experta, explicada con claridad" description="Cada área trabaja con un enfoque integral y coordinado para ofrecerte una mejor experiencia." />
        <SpecialtyGrid items={content.specialties} doctors={content.doctors} />
      </section>
    </PageFrame>
  );
}
