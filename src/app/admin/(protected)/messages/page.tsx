import { Mail, MailOpen, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader, DeleteButton, Card } from "@/components/admin/shared";
import { deleteMessage, toggleMessageRead } from "@/app/admin/actions";
import { interestLabels, type Interest } from "@/lib/validations";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function MessagesAdminPage() {
  const rows = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  const unread = rows.filter((r) => !r.read).length;

  return (
    <div>
      <PageHeader
        title="Mensajes"
        description={
          rows.length
            ? `${rows.length} consulta(s) · ${unread} sin leer.`
            : "Consultas recibidas desde el formulario de contacto."
        }
      />
      <div className="space-y-4">
        {rows.map((m) => (
          <Card key={m.id}>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-lg font-semibold text-forest-900">
                    {m.name}
                  </span>
                  {!m.read && (
                    <span className="rounded-full bg-accent-500/15 px-2.5 py-0.5 text-xs font-medium text-accent-600">
                      Nuevo
                    </span>
                  )}
                  <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-700">
                    {interestLabels[m.interest as Interest] ?? m.interest}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate">
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-forest-700"
                  >
                    <Mail className="h-3.5 w-3.5" /> {m.email}
                  </a>
                  {m.phone && (
                    <a
                      href={`tel:${m.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-forest-700"
                    >
                      <Phone className="h-3.5 w-3.5" /> {m.phone}
                    </a>
                  )}
                  <span>{formatDate(m.createdAt)}</span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-graphite">
                  {m.message}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    aria-label={m.read ? "Marcar como no leído" : "Marcar como leído"}
                    title={m.read ? "Marcar como no leído" : "Marcar como leído"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition-colors hover:bg-forest-50 hover:text-forest-700"
                  >
                    {m.read ? (
                      <MailOpen className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </button>
                </form>
                <DeleteButton
                  action={deleteMessage}
                  id={m.id}
                  message="¿Eliminar este mensaje?"
                />
              </div>
            </div>
          </Card>
        ))}
        {rows.length === 0 && (
          <Card>
            <p className="px-5 py-10 text-center text-slate">
              Todavía no hay mensajes.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
