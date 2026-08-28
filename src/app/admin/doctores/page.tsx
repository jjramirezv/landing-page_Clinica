import { redirect } from "next/navigation";
import { getAdminUsername, isAuthenticated } from "@/lib/auth";
import { getContent, type Doctor } from "@/lib/content";
import { AdminShell } from "@/components/site/admin/admin-shell";
import { ListEditor, type FieldDef } from "@/components/site/admin/list-editor";

const FIELDS: FieldDef<Doctor>[] = [
  { key: "name", label: "Nombre", placeholder: "Dra. María López" },
  { key: "specialty", label: "Especialidad", placeholder: "Cardiología" },
  { key: "experience", label: "Experiencia", placeholder: "12 años de experiencia" },
  { key: "registration", label: "Registro profesional", placeholder: "CMP 45821" },
  { key: "image", label: "URL de la foto", placeholder: "https://..." },
  { key: "intro", label: "Introducción breve", type: "textarea" },
];

const EMPTY: Doctor = { name: "", specialty: "", experience: "", registration: "", image: "", intro: "" };

export default async function AdminDoctoresPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [content, username] = await Promise.all([getContent(), getAdminUsername()]);

  return (
    <AdminShell title="Doctores" active="/admin/doctores" username={username}>
      <p className="mb-6 text-sm text-slate-500">
        Estos doctores aparecen en Staff médico y se vinculan por especialidad al reservar cita desde Especialidades.
      </p>
      <ListEditor
        initial={content.doctors}
        fields={FIELDS}
        endpoint="/api/admin/doctors"
        payloadKey="doctors"
        emptyItem={EMPTY}
        titleField="name"
        fallbackLabel="Doctor"
      />
    </AdminShell>
  );
}
