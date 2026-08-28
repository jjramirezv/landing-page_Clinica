"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/data";

const HeroScene = dynamic(
  () => import("@/components/site/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-hero pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur">
            🏥 Centro Médico Integral
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
            Tu salud, en{" "}
            <span className="text-gradient-brand">manos expertas</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            En MediVital combinamos experiencia médica, tecnología moderna y
            calidez humana para cuidar de ti y tu familia. Agenda tu cita en
            minutos y recibe atención de especialistas certificados.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                render={<a href="#contacto" />}
                className="h-12 rounded-full bg-gradient-brand px-8 text-base text-white shadow-brand hover:opacity-95"
              >
                🩺 Agendar Cita
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                variant="outline"
                render={<a href={`tel:${CLINIC.phone}`} />}
                className="h-12 rounded-full border-2 border-primary/30 bg-white/70 px-8 text-base text-primary backdrop-blur hover:bg-white"
              >
                <Phone className="size-4" /> Llamar Ahora
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <div className="relative h-full w-full">
            <HeroScene />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
