"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const schema = z.object({
  email: z.string().email("Introduce un email válido"),
});
type FormData = z.infer<typeof schema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    // Placeholder for Resend integration (wired in a later phase).
    void data;
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
    reset();
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 pl-5 backdrop-blur-sm focus-within:border-accent-400/60">
        <input
          type="email"
          placeholder="tu@email.com"
          aria-label="Correo electrónico"
          {...register("email")}
          className="h-11 flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          data-cursor="hover"
          aria-label="Suscribirse"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white transition-colors hover:bg-accent-400 disabled:opacity-70"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 className="h-4 w-4 animate-spin" />
              </motion.span>
            ) : status === "done" ? (
              <motion.span key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div className="mt-2 min-h-[20px] pl-5 text-sm">
        {errors.email && <span className="text-harvest-400">{errors.email.message}</span>}
        {status === "done" && (
          <span className="text-accent-400">¡Gracias! Te has suscrito correctamente.</span>
        )}
      </div>
    </form>
  );
}
