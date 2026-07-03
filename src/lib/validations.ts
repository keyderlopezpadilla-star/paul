import { z } from "zod";

/**
 * Shared Zod schemas for public forms.
 * Used on both the client (react-hook-form) and the server (API routes),
 * so validation rules never drift between the two.
 */

export const interestValues = ["poda", "gestion", "cursos", "otro"] as const;
export type Interest = (typeof interestValues)[number];

export const interestLabels: Record<Interest, string> = {
  poda: "Poda y aclareo",
  gestion: "Gestión de fincas",
  cursos: "Cursos de formación",
  otro: "Otro",
};

export const contactSchema = z.object({
  name: z.string().min(2, "Introduce tu nombre").max(120),
  email: z.string().email("Email no válido").max(160),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  interest: z.enum(interestValues),
  message: z
    .string()
    .min(10, "Cuéntanos un poco más (mín. 10 caracteres)")
    .max(4000),
  // Honeypot — must stay empty. Bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal("")),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Introduce un email válido").max(160),
  company: z.string().max(0).optional().or(z.literal("")),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;
