import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema, interestLabels } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  sendEmail,
  contactNotificationTemplate,
  contactConfirmationTemplate,
} from "@/lib/email";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Rate limit per IP (5 requests / minute).
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Inténtalo en un minuto." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  // 2. Parse + validate.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Petición no válida." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos no válidos.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { company, ...data } = parsed.data;
  // Honeypot tripped — pretend success, drop silently.
  if (company) return NextResponse.json({ ok: true });

  // 3. Persist the lead (survives even if email is not configured).
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        interest: data.interest,
        message: data.message,
      },
    });
  } catch (err) {
    console.error("[contact] failed to store message", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar el mensaje." },
      { status: 500 },
    );
  }

  // 4. Fire notification + confirmation emails (non-blocking on failure).
  const interestLabel = interestLabels[data.interest];
  const notify = contactNotificationTemplate({ ...data, interestLabel });
  const confirm = contactConfirmationTemplate(data.name);

  await Promise.allSettled([
    sendEmail({
      to:
        process.env.CONTACT_TO_EMAIL ||
        siteConfig.contact.gmail ||
        siteConfig.contact.email,
      subject: notify.subject,
      html: notify.html,
      text: notify.text,
      replyTo: data.email,
    }),
    sendEmail({
      to: data.email,
      subject: confirm.subject,
      html: confirm.html,
      text: confirm.text,
    }),
  ]);

  return NextResponse.json({ ok: true });
}
