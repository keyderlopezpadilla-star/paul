import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/shared";
import { Field, Input, Textarea, Checkbox, SubmitButton } from "@/components/admin/ui";
import { saveTestimonial } from "@/app/admin/actions";

export default async function TestimonialFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const t = isNew ? null : await prisma.testimonial.findUnique({ where: { id } });
  if (!isNew && !t) notFound();

  return (
    <div>
      <PageHeader
        title={isNew ? "Nuevo testimonio" : "Editar testimonio"}
        back={{ href: "/admin/testimonials", label: "Volver a testimonios" }}
      />
      <form action={saveTestimonial} className="max-w-2xl space-y-5 rounded-2xl border border-forest-900/10 bg-white p-8">
        {t && <input type="hidden" name="id" value={t.id} />}
        <Field label="Cita" htmlFor="quote">
          <Textarea id="quote" name="quote" rows={4} defaultValue={t?.quote ?? ""} required />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Autor" htmlFor="author">
            <Input id="author" name="author" defaultValue={t?.author ?? ""} required />
          </Field>
          <Field label="Cargo / contexto" htmlFor="role">
            <Input id="role" name="role" defaultValue={t?.role ?? ""} placeholder="Productor de caqui" required />
          </Field>
        </div>
        <Field label="Orden" htmlFor="order">
          <Input id="order" name="order" type="number" defaultValue={t?.order ?? 0} className="max-w-[120px]" />
        </Field>
        <div className="flex gap-6">
          <Checkbox name="verified" label="Cliente verificado" defaultChecked={t?.verified ?? true} />
          <Checkbox name="published" label="Publicado" defaultChecked={t?.published ?? true} />
        </div>
        <div className="pt-2">
          <SubmitButton>{isNew ? "Crear testimonio" : "Guardar cambios"}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
