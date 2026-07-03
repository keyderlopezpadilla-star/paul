"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, BadgeCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/config/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReducedMotion } from "@/hooks/use-media-query";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduced = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index],
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [reduced]);

  const t = testimonials[index];

  return (
    <section id="testimonios" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="flex flex-col items-center">
          <Eyebrow>Confían en nosotros</Eyebrow>
        </div>

        <div className="relative mt-12 min-h-[22rem] sm:min-h-[20rem]">
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-3xl rounded-[2.5rem] bg-gradient-to-br from-forest-50 to-accent-500/10 blur-2xl" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, y: 40, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: 6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
              className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/60 bg-white/70 p-8 shadow-[0_30px_90px_-40px_rgba(7,30,18,0.3)] backdrop-blur-xl sm:p-14"
            >
              <Quote className="mx-auto h-10 w-10 text-accent-500/40" />
              <p className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight text-forest-900 sm:text-3xl">
                “{t.quote}”
              </p>
              <footer className="mt-8 flex flex-col items-center">
                <div className="flex items-center gap-1.5 font-semibold text-forest-900">
                  {t.author}
                  <BadgeCheck className="h-4.5 w-4.5 text-electric-500" />
                </div>
                <span className="mt-1 text-sm text-slate">{t.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(index - 1)}
            aria-label="Anterior"
            data-cursor="hover"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/15 text-forest-800 transition-colors hover:bg-forest-900 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={
                  "h-2 rounded-full transition-all duration-300 " +
                  (i === index ? "w-8 bg-forest-700" : "w-2 bg-forest-900/20 hover:bg-forest-900/40")
                }
              />
            ))}
          </div>
          <button
            onClick={() => go(index + 1)}
            aria-label="Siguiente"
            data-cursor="hover"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/15 text-forest-800 transition-colors hover:bg-forest-900 hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
