import { siteConfig } from "@/config/site";

/**
 * Transactional email via the Resend REST API (no extra dependency — we call
 * the HTTP endpoint directly so this stays edge-compatible and light).
 *
 * Graceful degradation: if `RESEND_API_KEY` is not configured the helper
 * returns `{ skipped: true }` instead of throwing, so submissions are still
 * persisted and the UX succeeds in local/dev environments.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  text?: string;
};

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; skipped: true }
  | { ok: false; skipped: false; error: string };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Default "from" address. Configure a verified domain in production. */
function fromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    `${siteConfig.name} <onboarding@resend.dev>`
  );
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(
      "[email] RESEND_API_KEY not set — skipping send (submission still stored).",
    );
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: input.replyTo,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => res.statusText);
      console.error("[email] Resend responded with", res.status, detail);
      return { ok: false, skipped: false, error: `HTTP ${res.status}` };
    }

    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id ?? "unknown" };
  } catch (err) {
    console.error("[email] send failed", err);
    return { ok: false, skipped: false, error: "network" };
  }
}

/* ----------------------------- Templates ----------------------------- */

const brand = {
  green: "#166534",
  ink: "#0b1f14",
  muted: "#64748b",
};

function shell(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f6f4;font-family:Inter,Arial,sans-serif;color:${brand.ink}">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px">
      <div style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e2e8e2">
        <div style="background:${brand.green};padding:22px 28px">
          <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.02em">${siteConfig.name}</span>
        </div>
        <div style="padding:28px">
          <h1 style="margin:0 0 16px;font-size:20px;color:${brand.ink}">${title}</h1>
          ${body}
        </div>
      </div>
      <p style="text-align:center;color:${brand.muted};font-size:12px;margin-top:18px">
        ${siteConfig.legalName} · ${siteConfig.contact.address.region}, ${siteConfig.contact.address.country}
      </p>
    </div>
  </body></html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:${brand.muted};font-size:13px;width:120px;vertical-align:top">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:${brand.ink}">${value}</td>
  </tr>`;
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function contactNotificationTemplate(input: {
  name: string;
  email: string;
  phone?: string;
  interestLabel: string;
  message: string;
}): { subject: string; html: string; text: string } {
  const subject = `Nueva consulta: ${input.name} · ${input.interestLabel}`;
  const html = shell(
    "Nueva consulta desde la web",
    `<table style="width:100%;border-collapse:collapse">
      ${row("Nombre", esc(input.name))}
      ${row("Email", `<a href="mailto:${esc(input.email)}" style="color:${brand.green}">${esc(input.email)}</a>`)}
      ${input.phone ? row("Teléfono", esc(input.phone)) : ""}
      ${row("Interés", esc(input.interestLabel))}
    </table>
    <div style="margin-top:18px;padding:16px;background:#f4f6f4;border-radius:12px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(
      input.message,
    )}</div>`,
  );
  const text = `Nueva consulta\nNombre: ${input.name}\nEmail: ${input.email}\nTeléfono: ${input.phone ?? "-"}\nInterés: ${input.interestLabel}\n\n${input.message}`;
  return { subject, html, text };
}

export function contactConfirmationTemplate(name: string): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Hemos recibido tu mensaje · ${siteConfig.name}`;
  const html = shell(
    `Gracias, ${esc(name)}`,
    `<p style="font-size:15px;line-height:1.7;margin:0 0 12px">
      Hemos recibido tu consulta y nuestro equipo te responderá en menos de
      <strong>24 horas laborables</strong>.
    </p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 12px">
      Mientras tanto, si prefieres hablar directamente puedes escribirnos a
      <a href="mailto:${siteConfig.contact.email}" style="color:${brand.green}">${siteConfig.contact.email}</a>.
    </p>
    <p style="font-size:14px;color:${brand.muted};margin-top:20px">— El equipo de ${siteConfig.name}</p>`,
  );
  const text = `Gracias, ${name}. Hemos recibido tu consulta y te responderemos en menos de 24 horas laborables. — ${siteConfig.name}`;
  return { subject, html, text };
}

export function newsletterWelcomeTemplate(): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Bienvenido a la newsletter de ${siteConfig.name}`;
  const html = shell(
    "Suscripción confirmada",
    `<p style="font-size:15px;line-height:1.7;margin:0 0 12px">
      Gracias por suscribirte. Recibirás nuestras novedades sobre poda técnica,
      gestión de fincas y formación agrícola.
    </p>
    <p style="font-size:14px;color:${brand.muted};margin-top:20px">— El equipo de ${siteConfig.name}</p>`,
  );
  const text = `Gracias por suscribirte a la newsletter de ${siteConfig.name}.`;
  return { subject, html, text };
}
