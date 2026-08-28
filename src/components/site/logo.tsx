export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 shadow-[0_0_25px_rgba(56,189,248,0.55)] ${className}`}
    >
      <svg viewBox="0 0 40 40" className="h-[62%] w-[62%]" fill="none" aria-hidden="true">
        <path
          d="M2 20h8l3-12 4 24 3-16 2.5 4H30"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="16" y="6" width="8" height="28" rx="3" fill="white" />
        <rect x="6" y="16" width="28" height="8" rx="3" fill="white" />
      </svg>
    </span>
  );
}

export function Logo({ className = "", markClassName, withEyebrow = true }: { className?: string; markClassName?: string; withEyebrow?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className={markClassName} />
      <span>
        {withEyebrow && (
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-sky-700">Clínica</span>
        )}
        <span className="block text-xl font-black tracking-tight text-slate-900">
          Vitalis<span className="text-sky-500">Salud</span>
        </span>
      </span>
    </span>
  );
}
