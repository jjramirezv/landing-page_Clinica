import { redirect } from "next/navigation";
import { getAdminUsername, isAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { AdminShell } from "@/components/site/admin/admin-shell";
import { ContactEditor } from "@/components/site/admin/contact-editor";

export default async function AdminContactoPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [content, username] = await Promise.all([getContent(), getAdminUsername()]);

  return (
    <AdminShell title="Datos de contacto" active="/admin/contacto" username={username}>
      <p className="mb-6 text-sm text-slate-500">
        Esta información aparece en la página de Contacto, el pie de página y los botones de llamada/WhatsApp.
      </p>
      <ContactEditor initial={content.contact} />
    </AdminShell>
  );
}
