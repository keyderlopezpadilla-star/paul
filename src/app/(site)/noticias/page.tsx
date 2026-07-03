import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/data";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Noticias y conocimiento agrícola",
  description:
    "Artículos sobre poda técnica, agricultura de precisión, recolección y gestión sostenible de fincas por el equipo de Agropaul.",
  alternates: { canonical: "/noticias" },
};

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NoticiasPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6">
      <Eyebrow>Blog</Eyebrow>
      <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight text-forest-900">
        Conocimiento que hace crecer tu cosecha.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-graphite">
        Consejos, técnicas y novedades del sector agrícola por nuestro equipo de
        agrónomos y podadores.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 text-slate">Pronto publicaremos nuevos artículos.</p>
      ) : (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/noticias/${post.slug}`}
              data-cursor="hover"
              className="group flex flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-white transition-shadow hover:shadow-[0_30px_80px_-40px_rgba(7,30,18,0.3)]"
            >
              <div
                className="relative flex h-44 items-end overflow-hidden p-6"
                style={{
                  background: `linear-gradient(135deg, ${post.coverColor}, #14512f)`,
                }}
              >
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {post.coverImage && (
                  <span className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent" />
                )}
                <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs uppercase tracking-widest text-slate">
                  {formatDate(post.publishedAt)}
                </time>
                <h2 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-forest-900">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-graphite">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600">
                  Leer artículo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
