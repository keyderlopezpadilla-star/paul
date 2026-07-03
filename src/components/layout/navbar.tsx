"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { nav } from "@/config/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > prev && latest > 320 && !open) setHidden(true);
    else setHidden(false);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[120] px-4 pt-4 sm:px-6"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border border-white/40 bg-white/70 shadow-[0_8px_40px_-12px_rgba(7,30,18,0.25)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link
            href="#top"
            className="flex items-center gap-2 pl-1"
            data-cursor="hover"
            aria-label="Agropaul inicio"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 text-white">
              <Leaf className="h-4.5 w-4.5" strokeWidth={2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-forest-900">
              Agropaul
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-forest-900/70 transition-colors hover:text-forest-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href="#contacto" size="sm">
              Solicitar presupuesto
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest-900 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Scroll progress */}
        <div className="mx-auto mt-2 h-px max-w-7xl overflow-hidden rounded-full bg-transparent">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-forest-500 to-accent-500"
            style={{ width: progressWidth }}
          />
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-forest-900/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-semibold text-white/90"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
                onClick={() => setOpen(false)}
              >
                <Button href="#contacto" variant="light" magnetic={false}>
                  Solicitar presupuesto
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
