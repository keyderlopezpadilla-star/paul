"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { usePointerFine, useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/* ============================================================
   Data
   ============================================================ */

type GalleryCategory = "todos" | "campo" | "equipo" | "maquinaria";

interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  aspect: "portrait" | "landscape" | "square";
}

const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/desbroce-campo.jpeg",
    alt: "Trabajador con desbrozadora limpiando parcela",
    category: "campo",
    aspect: "portrait",
  },
  {
    src: "/gallery/tractor-mccormick.jpeg",
    alt: "Tractor McCormick en cultivo de caquis",
    category: "maquinaria",
    aspect: "landscape",
  },
  {
    src: "/gallery/tractor-new-holland.jpeg",
    alt: "Tractor New Holland T4.90F con cajas de caquis",
    category: "maquinaria",
    aspect: "landscape",
  },
  {
    src: "/gallery/recoleccion-melocotones.jpeg",
    alt: "Recoleccion de melocotones con cubo Agro Paul S.L.",
    category: "campo",
    aspect: "portrait",
  },
  {
    src: "/gallery/recoleccion-caqui-cajas.jpeg",
    alt: "Trabajador con cajas llenas de caquis",
    category: "campo",
    aspect: "portrait",
  },
  {
    src: "/gallery/recoleccion-equipo-caqui.jpeg",
    alt: "Equipo cosechando caquis en el campo",
    category: "equipo",
    aspect: "landscape",
  },
  {
    src: "/gallery/trabajador-caqui-mano.jpeg",
    alt: "Trabajador sosteniendo caquis recien cosechados",
    category: "campo",
    aspect: "portrait",
  },
  {
    src: "/gallery/trabajador-caqui-arbol.jpeg",
    alt: "Trabajador recogiendo caquis del arbol",
    category: "campo",
    aspect: "portrait",
  },
  {
    src: "/gallery/vehiculo-agropaul.jpeg",
    alt: "Vehiculo corporativo Agropaul",
    category: "maquinaria",
    aspect: "landscape",
  },
];

const teamImages = [
  {
    src: "/team/equipo-completo.jpeg",
    alt: "Equipo completo de Agropaul",
  },
  {
    src: "/team/equipo-recoleccion-grupal.jpeg",
    alt: "Equipo de recoleccion grupal en campo de caquis",
  },
  {
    src: "/team/dos-trabajadores-caqui.jpeg",
    alt: "Dos trabajadores con cajas de caquis",
  },
  {
    src: "/team/paul-gerente-campo.jpeg",
    alt: "Paul, gerente de Agropaul, en campo de melocotones",
  },
  {
    src: "/team/dos-companeros-campo.jpeg",
    alt: "Dos companeros posando en campo de caquis",
  },
];

const tabs: { label: string; value: GalleryCategory }[] = [
  { label: "Todos", value: "todos" },
  { label: "Campo", value: "campo" },
  { label: "Equipo", value: "equipo" },
  { label: "Maquinaria", value: "maquinaria" },
];

/* ============================================================
   3D Tilt Card
   ============================================================ */

function TiltCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFine || reducedMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      setTransform({ rotateX, rotateY, scale: 1.03 });
    },
    [isFine, reducedMotion],
  );

  const handlePointerLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  // Touch tilt using device orientation
  useEffect(() => {
    if (isFine || reducedMotion) return;
    // On touch devices we do a subtle tilt on touch start/move
    const card = cardRef.current;
    if (!card) return;

    let active = false;
    const handleTouchStart = () => {
      active = true;
      setTransform({ rotateX: 0, rotateY: 0, scale: 1.02 });
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!active) return;
      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      setTransform({ rotateX, rotateY, scale: 1.02 });
    };
    const handleTouchEnd = () => {
      active = false;
      setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    card.addEventListener("touchstart", handleTouchStart, { passive: true });
    card.addEventListener("touchmove", handleTouchMove, { passive: true });
    card.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isFine, reducedMotion]);

  const aspectClass =
    image.aspect === "portrait"
      ? "aspect-[3/4]"
      : image.aspect === "square"
        ? "aspect-square"
        : "aspect-[4/3]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative overflow-hidden rounded-2xl bg-stone shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
        style={{
          perspective: "800px",
          transform: `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transition: "transform 0.2s ease-out",
          willChange: "transform",
        }}
      >
        <div className={cn("relative w-full overflow-hidden", aspectClass)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-forest-900/0 transition-colors duration-300 group-hover:bg-forest-900/20" />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Team 3D Card (horizontal scroll)
   ============================================================ */

function TeamCard({ image, index }: { image: (typeof teamImages)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFine || reducedMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      setTransform({ rotateX, rotateY, scale: 1.04 });
    },
    [isFine, reducedMotion],
  );

  const handlePointerLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0"
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-64 overflow-hidden rounded-2xl bg-stone shadow-md sm:w-72 md:w-80"
        style={{
          perspective: "600px",
          transform: `perspective(600px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transition: "transform 0.2s ease-out",
          willChange: "transform",
        }}
      >
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 80vw, 320px"
            className="object-cover"
            loading="lazy"
          />
          {/* Bottom gradient with label */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/70 via-forest-900/30 to-transparent p-4 pt-12">
            <p className="text-sm font-medium text-white/90">{image.alt}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Lightbox
   ============================================================ */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const image = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Image */}
      <motion.div
        key={image.src}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-4 max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl sm:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-center text-sm text-white/90">{image.alt}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Gallery Section
   ============================================================ */

export function Gallery() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    activeTab === "todos"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  }, [filteredImages.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  }, [filteredImages.length]);

  return (
    <section id="galeria" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <Eyebrow>Galeria</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-forest-900">
            <TextReveal text="Nuestro trabajo en el campo." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-graphite">
              Cada temporada dejamos constancia de nuestro compromiso con la
              calidad. Estas imagenes reflejan el trabajo diario de nuestro
              equipo en fincas de toda la Comunidad Valenciana.
            </p>
          </Reveal>
        </div>

        {/* Filter tabs */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  activeTab === tab.value
                    ? "bg-forest-900 text-white shadow-md"
                    : "bg-stone text-forest-700 hover:bg-forest-100",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery grid */}
        <div className="mt-12">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredImages.map((image, index) => (
                <TiltCard
                  key={image.src}
                  image={image}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Team subsection */}
        <div className="mt-24">
          <Eyebrow>Nuestro equipo</Eyebrow>
          <h3 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-forest-900">
            <TextReveal text="Las personas detras de cada cosecha." />
          </h3>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-graphite">
              Un equipo profesional, comprometido y con experiencia en todas las
              fases del ciclo agricola.
            </p>
          </Reveal>

          {/* Horizontal scroll */}
          <div className="relative mt-10">
            <div
              ref={scrollRef}
              className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:gap-6"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {teamImages.map((image, index) => (
                <div key={image.src} style={{ scrollSnapAlign: "start" }}>
                  <TeamCard image={image} index={index} />
                </div>
              ))}
            </div>
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-paper to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-paper to-transparent" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
