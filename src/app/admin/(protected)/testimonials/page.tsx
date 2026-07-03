import Link from "next/link";
import { Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader, DeleteButton, Card } from "@/components/admin/shared";
import { deleteTestimonial } from "@/app/admin/actions";

export default async function TestimonialsAdminPage() {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageHeader
        title="Testimonios"
        description="Opiniones de clientes y alumnos."
        newHref="/admin/testimonials/new"
        newLabel="Nuevo testimonio"
      />
      <Card>
        <table className="w-full text-sm">
          <thead className="border-b border-forest-900/10 bg-mist/60 text-left text-slate">
            <tr>
              <th className="px-5 py-3 font-medium">Autor</th>
              <th className="px-5 py-3 font-medium">Cita</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {rows.map((t) => (
              <tr key={t.id} className="hover:bg-mist/40">
                <td className="whitespace-nowrap px-5 py-3 font-medium text-forest-900">
                  {t.author}
                  <span className="block text-xs font-normal text-slate">{t.role}</span>
                </td>
                <td className="px-5 py-3 text-slate">
                  <span className="line-clamp-2 max-w-md">{t.quote}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/testimonials/${t.id}`}
                      aria-label="Editar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate hover:bg-forest-50 hover:text-forest-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteTestimonial} id={t.id} />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-slate">
                  Todavía no hay testimonios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
