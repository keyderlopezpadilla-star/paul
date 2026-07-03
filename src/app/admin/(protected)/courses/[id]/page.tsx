import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/shared";
import { Field, Input, Textarea, Checkbox, SubmitButton } from "@/components/admin/ui";
import { saveCourse } from "@/app/admin/actions";

export default async function CourseFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const course = isNew ? null : await prisma.course.findUnique({ where: { id } });
  if (!isNew && !course) notFound();

  const modules = course ? (JSON.parse(course.modules) as string[]).join("\n") : "";

  return (
    <div>
      <PageHeader
        title={isNew ? "Nuevo curso" : "Editar curso"}
        back={{ href: "/admin/courses", label: "Volver a cursos" }}
      />
      <form action={saveCourse} className="max-w-2xl space-y-5 rounded-2xl border border-forest-900/10 bg-white p-8">
        {course && <input type="hidden" name="id" value={course.id} />}
        <Field label="Título" htmlFor="title">
          <Input id="title" name="title" defaultValue={course?.title ?? ""} required />
        </Field>
        <Field label="Slug" htmlFor="slug" hint="Identificador único">
          <Input id="slug" name="slug" defaultValue={course?.slug ?? ""} placeholder="poda-caqui" required />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Duración" htmlFor="duration">
            <Input id="duration" name="duration" defaultValue={course?.duration ?? "24 horas"} />
          </Field>
          <Field label="Distintivo" htmlFor="badge">
            <Input id="badge" name="badge" defaultValue={course?.badge ?? "Certificado Profesional"} />
          </Field>
        </div>
        <Field label="Descripción" htmlFor="description">
          <Textarea id="description" name="description" rows={3} defaultValue={course?.description ?? ""} required />
        </Field>
        <Field label="Módulos" htmlFor="modules" hint="Uno por línea">
          <Textarea id="modules" name="modules" rows={5} defaultValue={modules} />
        </Field>
        <Field label="Orden" htmlFor="order">
          <Input id="order" name="order" type="number" defaultValue={course?.order ?? 0} className="max-w-[120px]" />
        </Field>
        <Checkbox name="published" label="Publicado" defaultChecked={course?.published ?? true} />
        <div className="pt-2">
          <SubmitButton>{isNew ? "Crear curso" : "Guardar cambios"}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
