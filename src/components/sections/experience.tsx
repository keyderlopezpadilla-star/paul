"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Smartphone, Loader2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  useMediaQuery,
  useReducedMotion,
  usePointerFine,
} from "@/hooks/use-media-query";

const FarmScene = dynamic(() => import("@/components/three/farm-scene"), {
  ssr: false,
});

function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#bfe0c6] via-[#8fce9e] to-[#3f8a5b]" />
      <div className="absolute right-[12%] top-[14%] h-40 w-40 rounded-full bg-[radial-gradient(circle,#ffe6a8,rgba(255,230,168,0.2)_60%,transparent)] blur-md" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-forest-700/60 to-transparent" />
    </div>
  );
}

// iOS 13+ gates the gyroscope behind an explicit permission request.
type DOEWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export function Experience() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const fine = usePointerFine();
  const touch = !fine;

  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [needsMotionPermission, setNeedsMotionPermission] = useState(false);

  // 3D everywhere now — only disabled when the user prefers reduced motion.
  const enable3D = !reduced;
  const quality = isDesktop ? "high" : "low";

  useEffect(() => {
    if (!enable3D) return;
    const t = setTimeout(() => {
      setReady(true);
      // iOS gates the gyroscope behind an explicit permission prompt.
      if (touch) {
        const DOE = window.DeviceOrientationEvent as DOEWithPermission | undefined;
        if (DOE && typeof DOE.requestPermission === "function") {
          setNeedsMotionPermission(true);
        }
      }
    }, 700);
    return () => clearTimeout(t);
  }, [enable3D, touch]);

  // Pause the render loop when the section scrolls out of view (saves battery).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const requestMotion = async () => {
    const DOE = window.DeviceOrientationEvent as DOEWithPermission | undefined;
    try {
      const res = await DOE?.requestPermission?.();
      if (res === "granted") setNeedsMotionPermission(false);
    } catch {
      setNeedsMotionPermission(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-forest-800 md:h-[92vh] md:min-h-[600px]"
    >
      {/* 3D or fallback */}
      <div className="absolute inset-0">
        {enable3D ? (
          <FarmScene quality={quality} touch={touch} paused={!visible} />
        ) : (
          <StaticFallback />
        )}
      </div>

      {/* Loading sequence */}
      <AnimatePresence>
        {enable3D && !ready && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-forest-900"
          >
            <Loader2 className="h-6 w-6 animate-spin text-accent-400" />
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Cargando experiencia
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top gradient + heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-forest-900/70 via-forest-900/20 to-transparent pb-32 pt-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow dark>Experiencia inmersiva</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-tight text-white">
            Tu finca, viva y en 3D.
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/70 sm:text-base">
            Explora un campo interactivo:{" "}
            {touch ? "inclina o desliza el dedo" : "mueve el ratón"} para
            recorrerlo y descubre cómo cuidamos cada cultivo.
          </p>
        </div>
      </div>

      {/* Interaction hint / motion-permission CTA */}
      {enable3D && ready && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-8"
        >
          {needsMotionPermission ? (
            <button
              onClick={requestMotion}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25"
            >
              <Smartphone className="h-4 w-4" />
              Activar movimiento 3D
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs text-white/80 backdrop-blur-md sm:text-sm">
              {touch ? (
                <>
                  <Smartphone className="h-4 w-4 shrink-0" />
                  Inclina o desliza · pulsa los puntos verdes
                </>
              ) : (
                <>
                  <MousePointer2 className="h-4 w-4 shrink-0" />
                  Mueve el ratón · pasa sobre los puntos verdes
                </>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-paper to-transparent" />
    </section>
  );
}
