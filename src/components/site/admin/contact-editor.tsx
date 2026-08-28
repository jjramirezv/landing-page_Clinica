"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { ContactInfo } from "@/lib/content";

const FIELDS: { key: keyof ContactInfo; label: string; placeholder?: string; type?: "text" | "textarea" }[] = [
  { key: "phoneDisplay", label: "Teléfono (visible)", placeholder: "+502 1234-5678" },
  { key: "phone", label: "Teléfono (para llamar, con código de país)", placeholder: "+50212345678" },
  { key: "whatsapp", label: "WhatsApp (solo números, con código de país)", placeholder: "50212345678" },
  { key: "whatsappMessage", label: "Mensaje predeterminado de WhatsApp", type: "textarea" },
  { key: "address", label: "Dirección", type: "textarea" },
  { key: "hours", label: "Horarios", type: "textarea" },
];

export function ContactEditor({ initial }: { initial: ContactInfo }) {
  const [form, setForm] = useState<ContactInfo>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function update(key: keyof ContactInfo, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setStatus("saving");
    try {
      const response = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: form }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        {FIELDS.map((field) => (
          <label key={field.key} className="grid gap-1.5 text-sm font-semibold text-slate-700">
            {field.label}
            {field.type === "textarea" ? (
              <textarea
                rows={2}
                value={form[field.key]}
                onChange={(event) => update(field.key, event.target.value)}
                placeholder={field.placeholder}
                className="resize-none rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            ) : (
              <input
                value={form[field.key]}
                onChange={(event) => update(field.key, event.target.value)}
                placeholder={field.placeholder}
                className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            )}
          </label>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:opacity-95 disabled:opacity-60"
        >
          <Save className="size-4" /> {status === "saving" ? "Guardando..." : "Guardar cambios"}
        </button>
        {status === "saved" && <span className="text-sm font-semibold text-emerald-600">Cambios guardados.</span>}
        {status === "error" && <span className="text-sm font-semibold text-red-600">No se pudo guardar. Intenta de nuevo.</span>}
      </div>
    </div>
  );
}
