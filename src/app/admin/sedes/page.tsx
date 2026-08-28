import { redirect } from "next/navigation";
import { getAdminUsername, isAuthenticated } from "@/lib/auth";
import { getContent, type Sede } from "@/lib/content";
import { AdminShell } from "@/components/site/admin/admin-shell";
import { ListEditor, type FieldDef } from "@/components/site/admin/list-editor";

const FIELDS: FieldDef<Sede>[] = [
  { key: "nombre", label: "Nombre de la sede", placeholder: "Sede Zona 10" },
  { key: "direccion", label: "Dirección", type: "textarea" },
  { key: "image", label: "URL de la foto", placeholder: "https://..." },
];

const EMPTY: Sede = { nombre: "", direccion: "", image: "" };

export default async function AdminSedesPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [content, username] = await Promise.all([getContent(), getAdminUsername()]);

  return (
    <AdminShell title="Sedes" active="/admin/sedes" username={username}>
      <p className="mb-6 text-sm text-slate-500">Estas sedes aparecen en el carrusel de la página de Contacto.</p>
      <ListEditor
        initial={content.sedes}
        fields={FIELDS}
        endpoint="/api/admin/sedes"
        payloadKey="sedes"
        emptyItem={EMPTY}
        titleField="nombre"
        fallbackLabel="Sede"
      />
    </AdminShell>
  );
}
