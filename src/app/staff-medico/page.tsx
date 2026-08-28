import { PageFrame, PageHero, SectionHeading } from "@/components/site/subpage-layout";
import { StaffGrid } from "@/components/site/staff-grid";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function StaffMedicoPage() {
  const content = await getContent();

  return (
    <PageFrame contact={content.contact}>
      <PageHero eyebrow="Equipo médico" title="Profesionales que escuchan y acompañan" description="Conoce a nuestro staff médico: especialistas certificados, cercanos y comprometidos con tu bienestar." />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <SectionHeading eyebrow="Nuestro staff" title="Un equipo preparado para ti" />
        <StaffGrid doctors={content.doctors} />
      </section>
    </PageFrame>
  );
}
