import Link from "next/link";
import { Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader, DeleteButton, Card } from "@/components/admin/shared";
import { deleteService } from "@/app/admin/actions";

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageHeader
        title="Servicios"
        description="Las áreas de especialidad que se muestran en la home."
        newHref="/admin/services/new"
        newLabel="Nuevo servicio"
      />
      <Card>
        <table className="w-full text-sm">
          <thead className="border-b border-forest-900/10 bg-mist/60 text-left text-slate">
            <tr>
              <th className="px-5 py-3 font-medium">#</th>
              <th className="px-5 py-3 font-medium">Título</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-mist/40">
                <td className="px-5 py-3 font-display text-slate">{s.index}</td>
                <td className="px-5 py-3 font-medium text-forest-900">{s.title}</td>
                <td className="px-5 py-3">
                  <span className={s.published ? "text-accent-600" : "text-slate"}>
                    {s.published ? "Publicado" : "Oculto"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/services/${s.id}`}
                      aria-label="Editar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate hover:bg-forest-50 hover:text-forest-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteService} id={s.id} />
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate">
                  Todavía no hay servicios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
