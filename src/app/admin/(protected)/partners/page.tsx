import Link from "next/link";
import { Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader, DeleteButton, Card } from "@/components/admin/shared";
import { deletePartner } from "@/app/admin/actions";

export default async function PartnersAdminPage() {
  const rows = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageHeader
        title="Colaboradores"
        description="Marcas que aparecen en el carrusel de la home."
        newHref="/admin/partners/new"
        newLabel="Nuevo colaborador"
      />
      <Card>
        <table className="w-full text-sm">
          <thead className="border-b border-forest-900/10 bg-mist/60 text-left text-slate">
            <tr>
              <th className="px-5 py-3 font-medium">Orden</th>
              <th className="px-5 py-3 font-medium">Nombre</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-mist/40">
                <td className="px-5 py-3 text-slate">{p.order}</td>
                <td className="px-5 py-3 font-medium text-forest-900">{p.name}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/partners/${p.id}`}
                      aria-label="Editar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate hover:bg-forest-50 hover:text-forest-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deletePartner} id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-slate">
                  Todavía no hay colaboradores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
