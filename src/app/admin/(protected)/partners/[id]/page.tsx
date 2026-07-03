import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/shared";
import { Field, Input, SubmitButton } from "@/components/admin/ui";
import { savePartner } from "@/app/admin/actions";

export default async function PartnerFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await prisma.partner.findUnique({ where: { id } });
  if (!isNew && !p) notFound();

  return (
    <div>
      <PageHeader
        title={isNew ? "Nuevo colaborador" : "Editar colaborador"}
        back={{ href: "/admin/partners", label: "Volver a colaboradores" }}
      />
      <form action={savePartner} className="max-w-xl space-y-5 rounded-2xl border border-forest-900/10 bg-white p-8">
        {p && <input type="hidden" name="id" value={p.id} />}
        <Field label="Nombre" htmlFor="name">
          <Input id="name" name="name" defaultValue={p?.name ?? ""} required />
        </Field>
        <Field label="Orden" htmlFor="order">
          <Input id="order" name="order" type="number" defaultValue={p?.order ?? 0} className="max-w-[120px]" />
        </Field>
        <div className="pt-2">
          <SubmitButton>{isNew ? "Crear colaborador" : "Guardar cambios"}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
