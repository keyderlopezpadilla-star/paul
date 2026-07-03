import { prisma } from "@/lib/prisma";
import type { Service, Course, Testimonial } from "@/config/content";

/**
 * Read-only data-access layer for public server components.
 * Pages that consume these are revalidated via revalidatePath() on CMS writes.
 */

function safeParse(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  const rows = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map((s) => ({
    id: s.slug,
    index: s.index,
    title: s.title,
    description: s.description,
    bullets: safeParse(s.bullets),
    accent: s.accent as Service["accent"],
  }));
}

export async function getCourses(): Promise<Course[]> {
  const rows = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map((c) => ({
    id: c.slug,
    title: c.title,
    duration: c.duration,
    badge: c.badge,
    description: c.description,
    modules: safeParse(c.modules),
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map((t) => ({ quote: t.quote, author: t.author, role: t.role }));
}

export async function getPartners(): Promise<string[]> {
  const rows = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return rows.map((p) => p.name);
}

export type PublicPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverColor: string;
  publishedAt: Date | null;
};

export async function getPosts(): Promise<PublicPost[]> {
  const rows = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    coverColor: p.coverColor,
    publishedAt: p.publishedAt,
  }));
}

export async function getPost(slug: string): Promise<PublicPost | null> {
  const p = await prisma.post.findUnique({ where: { slug } });
  if (!p || !p.published) return null;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    coverColor: p.coverColor,
    publishedAt: p.publishedAt,
  };
}
