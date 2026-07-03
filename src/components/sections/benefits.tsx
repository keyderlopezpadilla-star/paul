"use client";

import { motion } from "framer-motion";
import { TrendingUp, Leaf, MessageSquareText, Clock3 } from "lucide-react";
import { benefits } from "@/config/content";
import { TextReveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

const icons = [TrendingUp, Leaf, MessageSquareText, Clock3];

export function Benefits() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>Por qué Agropaul</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-forest-900">
            <TextReveal text="Ventajas que notarás en cada cosecha." />
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-forest-900/10 bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-700 text-white transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-forest-900">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-graphite">{b.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
