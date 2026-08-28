"use client";

import { useState, type FormEvent } from "react";
import { Save } from "lucide-react";

export function AccountEditor({ initialUsername }: { initialUsername: string }) {
  const [username, setUsername] = useState(initialUsername);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    setStatus("saving");
    try {
      const response = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, username, newPassword }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error ?? "No se pudo actualizar.");
        setStatus("error");
        return;
      }

      setStatus("saved");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("No se pudo actualizar.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-md gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
        Usuario
        <input
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
        Contraseña actual
        <input
          required
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
        Nueva contraseña
        <input
          required
          type="password"
          minLength={6}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
        Confirmar nueva contraseña
        <input
          required
          type="password"
          minLength={6}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </label>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "saving"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:opacity-95 disabled:opacity-60"
      >
        <Save className="size-4" /> {status === "saving" ? "Guardando..." : "Actualizar credenciales"}
      </button>
      {status === "saved" && <p className="text-sm font-semibold text-emerald-600">Credenciales actualizadas.</p>}
    </form>
  );
}
