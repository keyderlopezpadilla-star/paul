"use client";

import Link from "next/link";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

export function PageHeader({
  title,
  description,
  newHref,
  newLabel = "Nuevo",
  back,
}: {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-8">
      {back && (
        <Link
          href={back.href}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-forest-700"
        >
          <ArrowLeft className="h-4 w-4" /> {back.label}
        </Link>
      )}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-forest-900">
            {title}
          </h1>
          {description && <p className="mt-1.5 text-graphite">{description}</p>}
        </div>
        {newHref && (
          <Link
            href={newHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-800"
          >
            <Plus className="h-4 w-4" /> {newLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

export function DeleteButton({
  action,
  id,
  message = "¿Seguro que quieres eliminar este elemento?",
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  message?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Eliminar"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate transition-colors hover:bg-harvest-500/10 hover:text-harvest-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white">
      {children}
    </div>
  );
}
