"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/data";

export function Stats() {
  return (
    <section className="relative -mt-10 z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur sm:grid-cols-4 sm:p-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="font-heading text-3xl font-extrabold text-gradient-brand sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
