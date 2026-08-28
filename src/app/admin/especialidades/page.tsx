import { redirect } from "next/navigation";
import { getAdminUsername, isAuthenticated } from "@/lib/auth";
import { getContent, type Specialty } from "@/lib/content";
import { AdminShell } from "@/components/site/admin/admin-shell";
import { ListEditor, type FieldDef } from "@/components/site/admin/list-editor";

const FIELDS: FieldDef<Specialty>[] = [
  { key: "title", label: "Nombre de la especialidad", placeholder: "Cardiología" },
  { key: "description", label: "Descripción corta", type: "textarea" },
  { key: "image", label: "URL de la imagen", placeholder: "https://..." },
];

const EMPTY: Specialty = { title: "", description: "", image: "" };

export default async function AdminEspecialidadesPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [content, username] = await Promise.all([getContent(), getAdminUsername()]);

  return (
    <AdminShell title="Especialidades" active="/admin/especialidades" username={username}>
      <p className="mb-6 text-sm text-slate-500">
        El nombre debe coincidir exactamente con la especialidad de un doctor para que se vinculen al reservar cita.
      </p>
      <ListEditor
        initial={content.specialties}
        fields={FIELDS}
        endpoint="/api/admin/specialties"
        payloadKey="specialties"
        emptyItem={EMPTY}
        titleField="title"
        fallbackLabel="Especialidad"
      />
    </AdminShell>
  );
}
