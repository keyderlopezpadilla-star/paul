import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/shared";
import { Field, Input, Textarea, Checkbox, SubmitButton } from "@/components/admin/ui";
import { savePost } from "@/app/admin/actions";

export default async function PostFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const post = isNew ? null : await prisma.post.findUnique({ where: { id } });
  if (!isNew && !post) notFound();

  return (
    <div>
      <PageHeader
        title={isNew ? "Nueva noticia" : "Editar noticia"}
        back={{ href: "/admin/posts", label: "Volver a noticias" }}
      />
      <form action={savePost} className="max-w-2xl space-y-5 rounded-2xl border border-forest-900/10 bg-white p-8">
        {post && <input type="hidden" name="id" value={post.id} />}
        <Field label="Título" htmlFor="title">
          <Input id="title" name="title" defaultValue={post?.title ?? ""} required />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Slug" htmlFor="slug" hint="Se usa en la URL /noticias/...">
            <Input id="slug" name="slug" defaultValue={post?.slug ?? ""} placeholder="poda-invierno" required />
          </Field>
          <Field label="Categoría" htmlFor="category">
            <Input id="category" name="category" defaultValue={post?.category ?? "Actualidad"} />
          </Field>
        </div>
        <Field label="Extracto" htmlFor="excerpt" hint="Resumen corto para las tarjetas y el SEO">
          <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} required />
        </Field>
        <Field label="Contenido" htmlFor="content" hint="Texto del artículo (los saltos de línea separan párrafos)">
          <Textarea id="content" name="content" rows={10} defaultValue={post?.content ?? ""} required />
        </Field>
        <Field label="Color de portada" htmlFor="coverColor" hint="Hex, p. ej. #0f3d24">
          <Input id="coverColor" name="coverColor" defaultValue={post?.coverColor ?? "#0f3d24"} className="max-w-[180px]" />
        </Field>
        <Checkbox name="published" label="Publicado" defaultChecked={post?.published ?? false} />
        <div className="pt-2">
          <SubmitButton>{isNew ? "Crear noticia" : "Guardar cambios"}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
