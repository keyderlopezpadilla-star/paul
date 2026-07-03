import { prisma } from "@/lib/prisma";
import { DeleteButton, Card } from "@/components/admin/shared";
import { deleteSubscriber } from "@/app/admin/actions";
import { CopyEmails } from "./copy-emails";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function SubscribersAdminPage() {
  const rows = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-forest-900">
            Suscriptores
          </h1>
          <p className="mt-1.5 text-graphite">
            {rows.length
              ? `${rows.length} suscriptor(es) a la newsletter.`
              : "Emails suscritos a la newsletter."}
          </p>
        </div>
        <CopyEmails emails={rows.map((r) => r.email)} />
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead className="border-b border-forest-900/10 bg-mist/60 text-left text-slate">
            <tr>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Origen</th>
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {rows.map((s) => (
              <tr key={s.id} className="hover:bg-mist/40">
                <td className="px-5 py-3 font-medium text-forest-900">{s.email}</td>
                <td className="px-5 py-3 text-slate">{s.source}</td>
                <td className="px-5 py-3 text-slate">{formatDate(s.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end">
                    <DeleteButton
                      action={deleteSubscriber}
                      id={s.id}
                      message="¿Eliminar este suscriptor?"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate">
                  Todavía no hay suscriptores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
