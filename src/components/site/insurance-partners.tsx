const aseguradoras = [
  {
    nombre: "La Positiva",
    logo: (
      <svg viewBox="0 0 190 60" role="img" aria-label="La Positiva Seguros" className="h-9 w-auto sm:h-10">
        <text x="0" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="700" fontSize="30" fill="#e8590c">
          La Positiva
        </text>
        <text x="2" y="50" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9" letterSpacing="2" fill="#64748b">
          SEGUROS
        </text>
      </svg>
    ),
  },
  {
    nombre: "Mapfre",
    logo: (
      <svg viewBox="0 0 170 60" role="img" aria-label="Mapfre" className="h-8 w-auto sm:h-9">
        <text x="0" y="38" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="34" letterSpacing="0.5" fill="#e2001a">
          MAPFRE
        </text>
      </svg>
    ),
  },
  {
    nombre: "Sanitas",
    logo: (
      <svg viewBox="0 0 170 60" role="img" aria-label="Sanitas" className="h-9 w-auto sm:h-10">
        <path d="M14 10c8 3 12 11 9 20-2 7-9 11-16 10 1-7 1-14 4-20 1-3 2-7 3-10z" fill="#0d9488" />
        <path d="M12 40c-6-3-9-10-6-17 5 2 9 7 10 13 0 2 0 3-1 4h-3z" fill="#5eead4" />
        <text x="30" y="38" fontFamily="Verdana, Arial, sans-serif" fontWeight="700" fontSize="26" fill="#0f766e">
          Sanitas
        </text>
      </svg>
    ),
  },
  {
    nombre: "Rimac",
    logo: (
      <svg viewBox="0 0 150 60" role="img" aria-label="Rimac Seguros" className="h-9 w-auto sm:h-10">
        <path d="M4 30l10-14 8 10 10-18 8 22" stroke="#d90429" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="46" y="36" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="0.5" fill="#d90429">
          RIMAC
        </text>
      </svg>
    ),
  },
  {
    nombre: "Pacífico",
    logo: (
      <svg viewBox="0 0 170 60" role="img" aria-label="Pacífico Seguros" className="h-8 w-auto sm:h-9">
        <circle cx="12" cy="24" r="10" fill="#0284c7" />
        <circle cx="20" cy="16" r="5" fill="#38bdf8" />
        <text x="34" y="36" fontFamily="Verdana, Arial, sans-serif" fontWeight="700" fontSize="26" fill="#0369a1">
          pacífico
        </text>
      </svg>
    ),
  },
];

export function InsurancePartners() {
  return (
    <section className="relative z-10 bg-white px-5 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          <span className="text-sky-700">Cobertura médica</span> con todas tus aseguradoras
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
          Trabajamos con las principales compañías de seguros para que tu atención médica sea simple y sin complicaciones.
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {aseguradoras.map((item) => (
            <div
              key={item.nombre}
              className="grayscale-[35%] opacity-80 transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
              title={item.nombre}
            >
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
