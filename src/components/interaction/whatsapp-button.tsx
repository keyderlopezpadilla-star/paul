"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { whatsappUrl } from "@/lib/contact";
import { siteConfig } from "@/config/site";

/**
 * Floating WhatsApp action button — always available on the public site.
 * Appears after a small scroll, with a pulsing ring and a one-time tooltip
 * to invite contact. Opens WhatsApp with a pre-filled message.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show an inviting tooltip shortly after the button appears (once).
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShowTip(true), 1200);
    const h = setTimeout(() => setShowTip(false), 7000);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-[130] flex items-center gap-3"
          style={{
            bottom: "max(1.25rem, env(safe-area-inset-bottom))",
            right: "max(1.25rem, env(safe-area-inset-right))",
          }}
        >
          <AnimatePresence>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="relative hidden items-center gap-2 rounded-2xl bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-forest-900 shadow-[0_10px_40px_-12px_rgba(7,30,18,0.45)] sm:flex"
              >
                ¿Hablamos? Escríbenos por WhatsApp
                <button
                  onClick={() => setShowTip(false)}
                  aria-label="Cerrar"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate hover:text-forest-900"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <span className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label={`Escribir a ${siteConfig.name} por WhatsApp`}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
            <WhatsappIcon className="relative h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
