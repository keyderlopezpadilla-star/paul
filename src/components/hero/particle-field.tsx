"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  baseA: number;
  drift: number;
  phase: number;
};

/**
 * Lightweight canvas particle field evoking pollen / dust drifting in sunlight.
 * - Depth (z) drives parallax on mouse move
 * - DPR-aware, capped for performance
 * - Pauses when off-screen and respects prefers-reduced-motion
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let running = true;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    function build() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.scale(dpr, dpr);

      const density = Math.min(Math.floor((width * height) / 9000), 140);
      particles = Array.from({ length: density }, () => {
        const z = rand(0.2, 1);
        return {
          x: rand(0, width),
          y: rand(0, height),
          z,
          r: rand(0.6, 2.6) * z,
          baseA: rand(0.15, 0.7) * z,
          drift: rand(6, 26),
          phase: rand(0, Math.PI * 2),
        };
      });
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      for (const p of particles) {
        const sway = Math.sin(t / 1000 + p.phase) * p.drift * p.z;
        const px = p.x + sway + mouse.x * p.z * 40;
        const py =
          ((p.y - t / (reduced ? 1e9 : 60) * (0.2 + p.z)) % (height + 40)) +
          mouse.y * p.z * 40;
        const y = py < -20 ? py + height + 40 : py;
        const twinkle = 0.6 + Math.sin(t / 700 + p.phase) * 0.4;

        ctx!.beginPath();
        ctx!.arc(px, y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 244, 214, ${p.baseA * twinkle})`;
        ctx!.fill();

        // subtle green glow for closest particles
        if (p.z > 0.75) {
          ctx!.beginPath();
          ctx!.arc(px, y, p.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(52, 197, 106, ${p.baseA * 0.06})`;
          ctx!.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function onResize() {
      cancelAnimationFrame(raf);
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      build();
      raf = requestAnimationFrame(draw);
    }

    function onMouse(e: MouseEvent) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5);
      mouse.ty = (e.clientY / window.innerHeight - 0.5);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    build();
    raf = requestAnimationFrame(draw);
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    if (!reduced) window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
