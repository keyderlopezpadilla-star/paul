"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/hooks/use-media-query";

type CursorState = "default" | "hover" | "text" | "view";

/**
 * Context-aware custom cursor.
 * Reacts to elements with [data-cursor="..."] attributes.
 * Disabled on touch devices for accessibility & performance.
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!target) {
        setState("default");
        setLabel("");
        return;
      }
      const cursor = target.dataset.cursor;
      if (cursor === "view") {
        setState("view");
        setLabel(target.dataset.cursorLabel ?? "Ver");
      } else if (cursor === "text") {
        setState("text");
        setLabel("");
      } else {
        setState("hover");
        setLabel("");
      }
    };

    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [fine, visible, x, y]);

  if (!fine) return null;

  const size = state === "view" ? 84 : state === "hover" ? 52 : state === "text" ? 4 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: state === "view" ? "#ffffff" : "#ffffff",
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {state === "view" && (
        <span className="text-[11px] font-medium uppercase tracking-widest text-black">
          {label}
        </span>
      )}
    </motion.div>
  );
}
