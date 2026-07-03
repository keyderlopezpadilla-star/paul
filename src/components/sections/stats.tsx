"use client";

import { motion } from "framer-motion";
import { stats } from "@/config/content";
import { Counter } from "@/components/motion/counter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const accentText: Record<string, string> = {
  accent: "text-accent-400",
  forest: "text-forest-200",
  harvest: "text-harvest-400",
  electric: "text-electric-400",
};

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-24 text-white sm:py-32">
      {/* growing-crop bars background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end justify-around opacity-20">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: (i % 12) * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-1 origin-bottom rounded-t-full bg-gradient-to-t from-accent-500/60 to-transparent"
            style={{ height: `${20 + ((i * 37) % 80)}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow dark>Resultados que se miden</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight">
            Números que crecen temporada tras temporada.
          </h2>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <dd
                className={cn(
                  "font-display text-6xl font-semibold tracking-tight sm:text-7xl",
                  accentText[stat.accent],
                )}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-white/60">{stat.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
