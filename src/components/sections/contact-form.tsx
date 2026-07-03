"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Introduce tu nombre"),
  email: z.string().email("Email no válido"),
  phone: z.string().optional(),
  interest: z.enum(["poda", "gestion", "cursos", "otro"]),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)"),
});
type FormData = z.infer<typeof schema>;

const interests = [
  { value: "poda", label: "Poda y aclareo" },
  { value: "gestion", label: "Gestión de fincas" },
  { value: "cursos", label: "Cursos de formación" },
  { value: "otro", label: "Otro" },
] as const;

const fieldClass =
  "h-12 w-full rounded-xl border border-forest-900/15 bg-white px-4 text-forest-900 placeholder:text-slate/70 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: "poda" },
  });

  const onSubmit = async (data: FormData) => {
    // Placeholder — a Resend-powered API route is planned for a later phase.
    void data;
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
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
