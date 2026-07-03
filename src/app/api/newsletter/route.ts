import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail, newsletterWelcomeTemplate } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Inténtalo en un minuto." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Petición no válida." },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Email no válido." },
      { status: 422 },
    );
  }

  const { company, email } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // honeypot

  const normalized = email.trim().toLowerCase();

  // Idempotent: upsert so a repeat subscribe is a no-op, not an error.
  let created = false;
  try {
    const existing = await prisma.subscriber.findUnique({
      where: { email: normalized },
    });
    if (!existing) {
      await prisma.subscriber.create({ data: { email: normalized } });
      created = true;
    }
  } catch (err) {
    console.error("[newsletter] failed to store subscriber", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo completar la suscripción." },
      { status: 500 },
    );
  }

  // Only welcome brand-new subscribers.
  if (created) {
    const welcome = newsletterWelcomeTemplate();
    await sendEmail({
      to: normalized,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
    }).catch(() => undefined);
  }

  return NextResponse.json({ ok: true });
}
