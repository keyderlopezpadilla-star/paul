"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ParticleField } from "@/components/hero/particle-field";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { heroStats } from "@/config/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-forest-900"
    >
      {/* Layered background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-800 via-forest-900 to-forest-900" />
        {/* Sun glow */}
        <div className="absolute left-1/2 top-[-10%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35),rgba(52,197,106,0.12)_40%,transparent_70%)] blur-2xl" />
        {/* Field horizon */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-forest-900 via-forest-900/80 to-transparent" />
        <ParticleField />
        {/* Animated light rays */}
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_70%)]">
          <div className="absolute left-1/2 top-0 h-[120vh] w-[2px] -translate-x-1/2 rotate-[15deg] bg-gradient-to-b from-harvest-400/40 to-transparent" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[1px] -translate-x-1/2 -rotate-[12deg] bg-gradient-to-b from-accent-400/30 to-transparent" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[3px] -translate-x-1/2 rotate-[4deg] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </motion.div>

      <div className="grain" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
          </span>
          Gestión agrícola profesional · Comunidad Valenciana
        </motion.div>

        <h1 className="max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
          <TextReveal text="Innovación y pasión" />
          <br />
          <span className="text-gradient-forest">
            <TextReveal text="por la tierra" delay={0.15} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Poda técnica, aclareo, recolección y gestión integral de fincas.
          Maximizamos el rendimiento y la sostenibilidad de tus cultivos con
          precisión y tecnología.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="#servicios" size="lg">
            Descubre nuestros servicios
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="#cursos" variant="light" size="lg">
            Ver cursos de formación
          </Button>
        </motion.div>

        {/* Paul founder badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
            <Image
              src="/team/paul-gerente.jpeg"
              alt="Paul"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white/90">Paul</span>
            <span className="text-xs text-white/50">Gerente &amp; Fundador · Desde 2012</span>
          </div>
          <div className="ml-2 h-5 w-px bg-white/15" />
          <span className="text-xs italic text-white/40">&ldquo;Calidad que da fruto&rdquo;</span>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-4xl font-semibold text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-1 text-sm text-white/55">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[11px] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
