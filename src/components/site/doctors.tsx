"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { DOCTORS } from "@/lib/data";

export function Doctors() {
  return (
    <section id="doctores" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Equipo médico
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Nuestros Doctores
          </h2>
          <p className="mt-4 text-muted-foreground">
            Profesionales certificados, comprometidos con brindarte la mejor
            atención médica y humana.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((doc, i) => (
            <Reveal key={doc.name} delay={i * 0.08}>
              <motion.div whileHover={{ y: -8 }} className="h-full">
                <Card className="hover-lift h-full overflow-hidden border-none py-0 shadow-sm">
                  <div className="flex h-40 items-center justify-center bg-gradient-brand">
                    <Avatar size="lg" className="size-20 ring-4 ring-white/40">
                      <AvatarFallback className="bg-white/20 text-2xl font-bold text-white">
                        {doc.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardContent className="flex flex-col gap-2 pt-4 pb-5">
                    <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10">
                      {doc.specialty}
                    </Badge>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {doc.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {doc.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
