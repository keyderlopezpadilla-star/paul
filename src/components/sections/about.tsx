"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, Users, Award, Cpu } from "lucide-react";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

const milestones = [
  { year: "2012", icon: Sprout, title: "Nace Agropaul", text: "Comenzamos ofreciendo poda técnica de cítricos en la Comunidad Valenciana." },
  { year: "2016", icon: Users, title: "Equipo agronómico", text: "Incorporamos agrónomos y técnicos para la gestión integral de fincas." },
  { year: "2020", icon: Award, title: "Formación certificada", text: "Lanzamos cursos de poda de 24h con certificado de profesionalidad." },
  { year: "2024", icon: Cpu, title: "Agricultura de precisión", text: "Integramos drones, sensores y datos para decisiones más inteligentes." },
];

export function About() {
  return (
    <section id="nosotros" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — narrative + Paul card */}
          <div>
            <Eyebrow>Quiénes somos</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-forest-900">
              <TextReveal text="Expertos en hacer crecer lo que importa." />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-graphite">
                Somos una empresa agrícola que combina el conocimiento de toda
                una vida en el campo con las técnicas más avanzadas. Cada árbol,
                cada parcela y cada cosecha reciben la atención de un equipo que
                entiende la tierra como un activo que hay que cuidar para las
                próximas generaciones.
              </p>
            </Reveal>

            {/* Paul — Gerente card */}
            <Reveal delay={0.2}>
              <PaulCard />
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-forest-900/10 bg-white p-6">
                  <p className="font-display text-4xl font-semibold text-forest-700">Sostenible</p>
                  <p className="mt-2 text-sm text-slate">Métodos respetuosos con el medio ambiente en cada intervención.</p>
                </div>
                <div className="rounded-2xl border border-forest-900/10 bg-white p-6">
                  <p className="font-display text-4xl font-semibold text-forest-700">Cercano</p>
                  <p className="mt-2 text-sm text-slate">Asesoramiento directo con agrónomos durante todo el año.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — timeline */}
          <div className="relative">
            <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-500 via-forest-300 to-transparent" />
            <ul className="space-y-10">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.li
                    key={m.year}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex gap-6 pl-0"
                  >
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white text-forest-700 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="pt-1">
                      <span className="font-display text-sm font-semibold text-accent-600">{m.year}</span>
                      <h3 className="mt-0.5 text-xl font-semibold tracking-tight text-forest-900">{m.title}</h3>
                      <p className="mt-2 max-w-sm text-graphite">{m.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Paul Gerente Card ─────────────── */

function PaulCard() {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative mt-10 flex flex-col overflow-hidden rounded-[2rem] border border-forest-900/10 bg-white shadow-[0_20px_60px_-30px_rgba(7,30,18,0.18)] sm:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto sm:w-44 sm:shrink-0">
        <Image
          src="/team/paul-gerente-campo.jpeg"
          alt="Paul — Gerente de Agropaul"
          fill
          sizes="(max-width: 640px) 100vw, 176px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-white/20" />
      </div>

      {/* Info */}
      <div className="relative flex flex-1 flex-col justify-center p-6 sm:p-8">
        {/* Decorative accent */}
        <div className="absolute right-6 top-6 h-10 w-10 rounded-full bg-accent-500/10 blur-xl" />

        <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-700">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Fundador
        </span>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-forest-900">
          Paul
        </h3>
        <p className="mt-1 text-base font-medium text-forest-700">
          Gerente y Jefe de Agropaul
        </p>
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          Con más de una década de experiencia en el campo valenciano, Paul
          lidera cada proyecto con pasión, cercanía y la convicción de que la
          agricultura puede ser innovadora sin perder su esencia.
        </p>

        {/* Signature-like flourish */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-forest-900/15 to-transparent" />
          <span className="font-display text-sm italic text-forest-700/60">
            &ldquo;Calidad que da fruto&rdquo;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
