import type { ReactNode } from "react";

/**
 * Shared shell for legal/policy pages with a consistent editorial layout.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-40 sm:px-6">
      <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight text-forest-900">
        {title}
      </h1>
      <p className="mt-4 text-sm text-slate">Última actualización: {updated}</p>
      <div className="prose-agropaul mt-12 space-y-6 text-graphite [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-forest-900 [&_p]:leading-relaxed">
        {children}
      </div>
    </article>
  );
}
