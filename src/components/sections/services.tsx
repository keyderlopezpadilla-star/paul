"use client";

import { motion } from "framer-motion";
import { Scissors, Sun, Sprout, Radar, ArrowUpRight } from "lucide-react";
import { type Service } from "@/config/content";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const icons = {
  "poda-tecnica": Scissors,
  "aclareo-recoleccion": Sun,
  "gestion-integral": Sprout,
  "agricultura-precision": Radar,
} as const;

const accentClasses: Record<Service["accent"], { chip: string; glow: string; text: string }> = {
  forest: { chip: "bg-forest-700 text-white", glow: "from-forest-500/20", text: "text-forest-700" },
  accent: { chip: "bg-accent-500 text-white", glow: "from-accent-500/20", text: "text-accent-600" },
  electric: { chip: "bg-electric-500 text-white", glow: "from-electric-500/20", text: "text-electric-600" },
  harvest: { chip: "bg-harvest-500 text-white", glow: "from-harvest-500/20", text: "text-harvest-600" },
};

function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = icons[service.id as keyof typeof icons] ?? Sprout;
  const a = accentClasses[service.accent] ?? accentClasses.forest;
  return (
    <motion.article
      data-cursor="hover"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-forest-900/10 bg-white p-8 shadow-[0_1px_0_rgba(7,30,18,0.04)]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          a.glow,
        )}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", a.chip)}>
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-display text-sm font-semibold text-forest-900/25">{service.index}</span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-forest-900">
          {service.title}
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-graphite">{service.description}</p>
      </div>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {service.bullets.map((b) => (
          <li
            key={b}
            className="rounded-full border border-forest-900/10 bg-mist px-3 py-1 text-sm text-forest-800/80"
          >
            {b}
          </li>
        ))}
      </ul>

      <div className={cn("relative mt-8 flex items-center gap-1.5 text-sm font-medium", a.text)}>
        Saber más
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.article>
  );
}

const BENTO_SPANS = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
];

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="servicios" className="relative bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Nuestra especialidad</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-forest-900">
              <TextReveal text="Soluciones agrícolas de precisión." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-graphite">
              Implementamos las mejores prácticas para maximizar el rendimiento y
              la sostenibilidad de tus cultivos, de la poda a los datos.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              className={BENTO_SPANS[i % BENTO_SPANS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
