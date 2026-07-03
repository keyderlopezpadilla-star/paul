"use client";

import { useActionState } from "react";
import { Leaf, Lock, AlertCircle } from "lucide-react";
import { authenticate } from "@/app/admin/actions";
import { Field, Input, SubmitButton } from "@/components/admin/ui";

export default function LoginPage() {
  const [error, formAction] = useActionState(authenticate, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center bg-forest-900 px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(52,197,106,0.15),transparent_70%)]" />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-white">
            <Leaf className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">
            Agropaul · Panel
          </h1>
          <p className="mt-1 text-sm text-white/50">Acceso al gestor de contenidos</p>
        </div>

        <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-white p-8">
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" placeholder="admin@agropaul.es" required autoComplete="email" />
          </Field>
          <Field label="Contraseña" htmlFor="password">
            <Input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
          </Field>

          {error && (
            <p className="flex items-center gap-2 rounded-lg bg-harvest-500/10 px-3 py-2 text-sm text-harvest-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          <SubmitButton className="w-full">
            <Lock className="h-4 w-4" /> Iniciar sesión
          </SubmitButton>

          <p className="pt-2 text-center text-xs text-slate">
            Demo: admin@agropaul.es · agropaul2026
          </p>
        </form>
      </div>
    </main>
  );
}
