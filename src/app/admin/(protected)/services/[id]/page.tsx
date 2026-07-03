import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/shared";
import { Field, Input, Textarea, Select, Checkbox, SubmitButton } from "@/components/admin/ui";
import { saveService } from "@/app/admin/actions";

const accents = ["forest", "accent", "electric", "harvest"];

export default async function ServiceFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const service = isNew ? null : await prisma.service.findUnique({ where: { id } });
  if (!isNew && !service) notFound();

  const bullets = service ? (JSON.parse(service.bullets) as string[]).join("\n") : "";

  return (
    <div>
      <PageHeader
        title={isNew ? "Nuevo servicio" : "Editar servicio"}
        back={{ href: "/admin/services", label: "Volver a servicios" }}
      />
      <form action={saveService} className="max-w-2xl space-y-5 rounded-2xl border border-forest-900/10 bg-white p-8">
        {service && <input type="hidden" name="id" value={service.id} />}
        <div className="grid grid-cols-2 gap-5">
          <Field label="Número (índice)" htmlFor="index">
            <Input id="index" name="index" defaultValue={service?.index ?? "05"} placeholder="05" required />
          </Field>
          <Field label="Slug" htmlFor="slug" hint="Identificador único, sin espacios">
            <Input id="slug" name="slug" defaultValue={service?.slug ?? ""} placeholder="poda-tecnica" required />
          </Field>
        </div>
        <Field label="Título" htmlFor="title">
          <Input id="title" name="title" defaultValue={service?.title ?? ""} required />
        </Field>
        <Field label="Descripción" htmlFor="description">
          <Textarea id="description" name="description" rows={3} defaultValue={service?.description ?? ""} required />
        </Field>
        <Field label="Puntos clave" htmlFor="bullets" hint="Uno por línea">
          <Textarea id="bullets" name="bullets" rows={4} defaultValue={bullets} placeholder={"Diseño de copa\nPoda estacional"} />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Color de acento" htmlFor="accent">
            <Select id="accent" name="accent" defaultValue={service?.accent ?? "forest"}>
              {accents.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </Select>
          </Field>
          <Field label="Orden" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={service?.order ?? 0} />
          </Field>
        </div>
        <Checkbox name="published" label="Publicado" defaultChecked={service?.published ?? true} />
        <div className="pt-2">
          <SubmitButton>{isNew ? "Crear servicio" : "Guardar cambios"}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
