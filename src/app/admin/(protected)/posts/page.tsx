import Link from "next/link";
import { Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader, DeleteButton, Card } from "@/components/admin/shared";
import { deletePost } from "@/app/admin/actions";

export default async function PostsAdminPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <PageHeader
        title="Noticias"
        description="Artículos del blog, visibles en /noticias."
        newHref="/admin/posts/new"
        newLabel="Nueva noticia"
      />
      <Card>
        <table className="w-full text-sm">
          <thead className="border-b border-forest-900/10 bg-mist/60 text-left text-slate">
            <tr>
              <th className="px-5 py-3 font-medium">Título</th>
              <th className="px-5 py-3 font-medium">Categoría</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-mist/40">
                <td className="px-5 py-3 font-medium text-forest-900">
                  <span className="line-clamp-1 max-w-sm">{p.title}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-slate">{p.category}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      "rounded-full px-2.5 py-0.5 text-xs font-medium " +
                      (p.published
                        ? "bg-accent-500/10 text-accent-600"
                        : "bg-slate/10 text-slate")
                    }
                  >
                    {p.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/posts/${p.id}`}
                      aria-label="Editar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate hover:bg-forest-50 hover:text-forest-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deletePost} id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate">
                  Todavía no hay noticias.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
