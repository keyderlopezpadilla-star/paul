import { siteConfig } from "@/config/site";

/**
 * Helpers to build optimized WhatsApp and email (mailto) deep links with
 * pre-filled content. Centralized so every entry point (floating button,
 * contact form, footer, CTA) stays consistent.
 */

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappMessage);
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
}

/** Build a mailto: link with optional pre-filled subject and body. */
export function mailtoUrl({
  to,
  subject,
  body,
}: {
  to?: string;
  subject?: string;
  body?: string;
} = {}): string {
  const address = to ?? siteConfig.contact.gmail;
  const parts: string[] = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${address}${parts.length ? `?${parts.join("&")}` : ""}`;
}

/** Compose a WhatsApp message from contact-form fields. */
export function buildLeadWhatsappMessage(data: {
  name: string;
  email: string;
  phone?: string;
  interestLabel: string;
  message: string;
}): string {
  return [
    "Hola Agropaul 👋, os escribo desde la web.",
    "",
    `*Nombre:* ${data.name}`,
    `*Email:* ${data.email}`,
    data.phone ? `*Teléfono:* ${data.phone}` : null,
    `*Interés:* ${data.interestLabel}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Compose a mailto body from contact-form fields. */
export function buildLeadEmailBody(data: {
  name: string;
  email: string;
  phone?: string;
  interestLabel: string;
  message: string;
}): string {
  return [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Teléfono: ${data.phone}` : null,
    `Interés: ${data.interestLabel}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}
