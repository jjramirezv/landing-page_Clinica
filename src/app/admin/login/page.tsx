"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { LogoMark } from "@/components/site/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });

    if (!response.ok) {
      setLoading(false);
      setError("Usuario o contraseña incorrectos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.42),_rgba(224,242,254,0.28)_25%,_#e0f2fe_58%,_#f0f9ff_100%)] px-5">
      <div className="w-full max-w-sm rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_25px_60px_rgba(14,165,233,0.15)]">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="size-14" />
          <h1 className="mt-5 text-2xl font-bold text-slate-900">Acceso administrador</h1>
          <p className="mt-2 text-sm text-slate-500">Inicia sesión para ver las citas solicitadas.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Usuario
            <input
              required
              name="username"
              autoComplete="username"
              className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              placeholder="admin"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Contraseña
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:opacity-95 disabled:opacity-60"
          >
            <Lock className="size-4" /> {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
