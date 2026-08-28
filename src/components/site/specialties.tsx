"use client";

import { motion } from "framer-motion";
import { Baby, Bone, Brain, Eye, HeartPulse, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { SPECIALTIES } from "@/lib/data";

const ICONS = {
  HeartPulse,
  Baby,
  Bone,
  Eye,
  Brain,
  Sparkles,
} as const;

export function Specialties() {
  return (
    <section
      id="especialidades"
      className="bg-gradient-section px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Nuestros servicios
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Especialidades Médicas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Contamos con un equipo multidisciplinario listo para atender tus
            necesidades de salud en cada etapa de la vida.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Reveal key={s.name} delay={i * 0.06}>
                <motion.div whileHover={{ y: -6 }} className="h-full">
                  <Card className="hover-lift h-full border-none bg-white shadow-sm">
                    <CardContent className="flex flex-col gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-brand transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-7" />
                      </span>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {s.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
