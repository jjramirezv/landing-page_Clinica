"use client";

import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";

export type FieldDef<T> = {
  key: keyof T;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
};

export function ListEditor<T extends Record<string, string>>({
  initial,
  fields,
  endpoint,
  payloadKey,
  emptyItem,
  titleField,
  fallbackLabel,
}: {
  initial: T[];
  fields: FieldDef<T>[];
  endpoint: string;
  payloadKey: string;
  emptyItem: T;
  titleField: keyof T;
  fallbackLabel: string;
}) {
  const [items, setItems] = useState<T[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function update(index: number, key: keyof T, value: string) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function remove(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  function add() {
    setItems((current) => [...current, { ...emptyItem }]);
  }

  async function save() {
    setStatus("saving");
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [payloadKey]: items }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {items.length === 0 && (
        <div className="mb-5 rounded-3xl border border-dashed border-sky-200 bg-white/60 p-12 text-center text-slate-400">
          Todavía no hay nada aquí. Agrega el primero abajo.
        </div>
      )}
      <div className="grid gap-5">
        {items.map((item, index) => {
          const imageUrl = "image" in item ? String((item as Record<string, string>).image ?? "") : "";

          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_8px_25px_rgba(14,165,233,0.08)] transition hover:shadow-[0_12px_30px_rgba(14,165,233,0.14)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-sky-50 bg-sky-50/40 px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-xs font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-bold text-slate-700">{item[titleField] || `${fallbackLabel} ${index + 1}`}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="size-3.5" /> Eliminar
                </button>
              </div>
              <div className="flex flex-col gap-4 p-5 sm:flex-row">
                {imageUrl && (
                  <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-auto sm:w-32">
                    <img src={imageUrl} alt="" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                  </div>
                )}
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label
                  key={String(field.key)}
                  className={`grid gap-1.5 text-sm font-semibold text-slate-700 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}
                >
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={item[field.key] ?? ""}
                      onChange={(event) => update(index, field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="resize-none rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  ) : (
                    <input
                      value={item[field.key] ?? ""}
                      onChange={(event) => update(index, field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  )}
                </label>
              ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
        >
          <Plus className="size-4" /> Agregar
        </button>
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
