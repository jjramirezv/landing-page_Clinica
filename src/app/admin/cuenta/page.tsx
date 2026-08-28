import { redirect } from "next/navigation";
import { getAdminUsername, isAuthenticated } from "@/lib/auth";
import { AdminShell } from "@/components/site/admin/admin-shell";
import { AccountEditor } from "@/components/site/admin/account-editor";

export default async function AdminCuentaPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const username = await getAdminUsername();

  return (
    <AdminShell title="Mi cuenta" active="/admin/cuenta" username={username}>
      <p className="mb-6 text-sm text-slate-500">Cambia el usuario y la contraseña con los que entras al panel.</p>
      <AccountEditor initialUsername={username} />
    </AdminShell>
  );
}
