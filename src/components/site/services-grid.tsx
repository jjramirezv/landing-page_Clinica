"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

const PAGE_SIZE = 9;

export function ServicesGrid({ items, href }: { items: { icon: ReactNode; title: string }[]; href: string }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);

  function goTo(next: number) {
    setPage(Math.min(Math.max(next, 1), totalPages));
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ icon, title }) => (
          <Link
            key={title}
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-sky-100 bg-white px-5 py-4 shadow-[0_6px_20px_rgba(14,165,233,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_14px_30px_rgba(56,189,248,0.16)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-sky-200 text-sky-600 transition group-hover:border-sky-400 group-hover:bg-sky-50">
              {icon}
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.02em] text-slate-700">{title}</span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" /> Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => goTo(number)}
              aria-current={page === number}
              className={`size-9 rounded-full text-sm font-bold transition ${
                page === number
                  ? "bg-gradient-to-r from-sky-400 to-cyan-500 text-white shadow-[0_8px_18px_rgba(14,165,233,0.35)]"
                  : "border border-sky-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
