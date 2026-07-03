"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  interestValues,
  interestLabels,
  type ContactInput,
} from "@/lib/validations";

type FormData = ContactInput;

const interests = interestValues.map((value) => ({
  value,
  label: interestLabels[value],
}));

const fieldClass =
  "h-12 w-full rounded-xl border border-forest-900/15 bg-white px-4 text-forest-900 placeholder:text-slate/70 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interest: "poda" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setServerError(
          payload?.error ??
            "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
        );
        return;
      }
      setSent(true);
    } catch {
      setServerError(
        "Error de conexión. Comprueba tu red e inténtalo de nuevo.",
      );
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-accent-500/30 bg-white p-12 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-accent-500" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-forest-900">
          ¡Mensaje enviado!
        </h3>
        <p className="mt-2 max-w-sm text-graphite">
          Gracias por contactar con Agropaul. Nuestro equipo te responderá en
          menos de 24 horas laborables.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-forest-900/10 bg-white/80 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-forest-900">
            Nombre
          </label>
          <input id="name" placeholder="Tu nombre" className={fieldClass} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-sm text-harvest-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest-900">
            Email
          </label>
          <input id="email" type="email" placeholder="tu@email.com" className={fieldClass} {...register("email")} />
          {errors.email && <p className="mt-1.5 text-sm text-harvest-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-forest-900">
            Teléfono <span className="text-slate">(opcional)</span>
          </label>
          <input id="phone" placeholder="+34 ..." className={fieldClass} {...register("phone")} />
        </div>
        <div>
          <label htmlFor="interest" className="mb-2 block text-sm font-medium text-forest-900">
            Me interesa
          </label>
          <select id="interest" className={cn(fieldClass, "appearance-none")} {...register("interest")}>
            {interests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-forest-900">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Cuéntanos sobre tu finca o tu proyecto..."
          className={cn(fieldClass, "h-auto py-3 resize-none")}
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-sm text-harvest-600">{errors.message.message}</p>}
      </div>

      {/* Honeypot — hidden from humans, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">No rellenar</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border border-harvest-600/30 bg-harvest-600/5 px-4 py-3 text-sm text-harvest-600"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor="hover"
        className="group mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-forest-700 px-8 py-4 font-medium text-white transition-colors hover:bg-forest-800 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
