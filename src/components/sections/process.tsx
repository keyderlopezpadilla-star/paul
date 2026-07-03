"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/config/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { usePointerFine } from "@/hooks/use-media-query";

/**
 * Pinned horizontal-scroll storytelling section.
 * On large pointer devices the track translates on the X axis as the user
 * scrolls through a tall wrapper (pin effect). Falls back to a vertical
 * stack on touch/small screens for accessibility.
 */
export function Process() {
  const fine = usePointerFine();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // 4 panels + intro → translate across ~ -68%
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-68%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!fine) {
    return (
      <section id="proceso" className="bg-forest-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow dark>Cómo trabajamos</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight">
            Un proceso claro, de la tierra a los datos.
          </h2>
          <div className="mt-12 space-y-5">
            {processSteps.map((s) => (
              <div key={s.id} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <span className="text-sm font-semibold text-accent-400">{s.step}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proceso" ref={targetRef} className="relative h-[400vh] bg-forest-900">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-7xl px-6">
          <Eyebrow dark>Cómo trabajamos</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-tight text-white">
            Un proceso claro, de la tierra a los datos.
          </h2>
        </div>

        <motion.ol style={{ x }} className="flex gap-8 px-6">
          {processSteps.map((s, i) => (
            <li
              key={s.id}
              className="relative flex h-[52vh] w-[80vw] shrink-0 flex-col justify-between rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 backdrop-blur-sm sm:w-[62vw] lg:w-[42vw]"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-semibold uppercase tracking-widest text-accent-400">
                  {s.step}
                </span>
                <span className="font-display text-7xl font-bold leading-none text-white/[0.06]">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </motion.ol>

        {/* progress bar */}
        <div className="mx-auto mt-10 h-px w-full max-w-7xl overflow-hidden bg-white/10 px-6">
          <motion.div style={{ width: progress }} className="h-full bg-accent-400" />
        </div>
      </div>
    </section>
  );
}
