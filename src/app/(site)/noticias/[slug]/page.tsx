import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getPost } from "@/lib/data";
import { siteConfig } from "@/config/site";

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/noticias/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    articleSection: post.category,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/noticias/${post.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <header
        className="relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-36"
        style={{ background: `linear-gradient(140deg, ${post.coverColor}, #071e12)` }}
      >
        {post.coverImage && (
          <>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/50 to-forest-900/30" />
          </>
        )}
        <div className="grain" />
        <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Todas las noticias
          </Link>
          <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
            <span className="rounded-full bg-white/15 px-3 py-1 font-medium text-white backdrop-blur-sm">
              {post.category}
            </span>
            <time>{formatDate(post.publishedAt)}</time>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-white">
            {post.title}
          </h1>
        </div>
      </header>

      {/* Body */}
      <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <p className="mb-10 border-l-2 border-accent-500 pl-5 text-xl leading-relaxed text-forest-900">
          {post.excerpt}
        </p>
        <div className="space-y-6 text-lg leading-relaxed text-graphite">
          {post.content.split("\n").filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
