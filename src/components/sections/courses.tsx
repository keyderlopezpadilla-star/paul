"use client";

import { motion } from "framer-motion";
import { Check, Clock, GraduationCap, ArrowRight } from "lucide-react";
import { type Course } from "@/config/content";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

export function Courses({ courses }: { courses: Course[] }) {
  return (
    <section id="cursos" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      {/* decorative gradient */}
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(52,197,106,0.10),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>Formación certificada</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-forest-900">
            <TextReveal text="Conviértete en experto en poda técnica." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-graphite">
              Cursos de 24 horas con certificado profesional. Teoría, práctica en
              campo y las herramientas para optimizar cualquier cultivo.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {courses.map((course, i) => (
            <motion.article
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(7,30,18,0.3)] sm:p-10"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-700 text-white">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest-50 px-3 py-1 font-medium text-forest-700">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <span className="rounded-full bg-accent-500/10 px-3 py-1 font-medium text-accent-600">
                    {course.badge}
                  </span>
                </div>
              </div>

              <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
                {course.title}
              </h3>
              <p className="mt-3 leading-relaxed text-graphite">{course.description}</p>

              <ul className="mt-7 grid gap-2.5">
                {course.modules.map((mod) => (
                  <li key={mod} className="flex items-center gap-3 text-forest-900/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {mod}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex items-center gap-4 border-t border-forest-900/10 pt-7">
                <Button href="#contacto" size="md">
                  Solicitar información
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
