"use client";

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
          {/* Left — narrative */}
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
            <Reveal delay={0.2}>
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
