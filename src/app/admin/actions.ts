"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";

/* ----------------------------- Auth ------------------------------ */

export async function authenticate(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Email o contraseña incorrectos.";
    }
    throw error; // re-throw redirect signals
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

/* --------------------------- Helpers ----------------------------- */

function refresh(path: string) {
  revalidatePath(path);
  revalidatePath("/");
  revalidatePath("/noticias");
}

function toLines(value: FormDataEntryValue | null): string {
  return JSON.stringify(
    String(value ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
  );
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const bool = (fd: FormData, key: string) => fd.get(key) === "on";
const int = (fd: FormData, key: string) => parseInt(str(fd, key) || "0", 10) || 0;

/* --------------------------- Services ---------------------------- */

export async function saveService(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    index: str(formData, "index"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    bullets: toLines(formData.get("bullets")),
    accent: str(formData, "accent") || "forest",
    order: int(formData, "order"),
    published: bool(formData, "published"),
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  refresh("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await prisma.service.delete({ where: { id: str(formData, "id") } });
  refresh("/admin/services");
}

/* ---------------------------- Courses ---------------------------- */

export async function saveCourse(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    duration: str(formData, "duration") || "24 horas",
    badge: str(formData, "badge") || "Certificado Profesional",
    description: str(formData, "description"),
    modules: toLines(formData.get("modules")),
    order: int(formData, "order"),
    published: bool(formData, "published"),
  };
  if (id) await prisma.course.update({ where: { id }, data });
  else await prisma.course.create({ data });
  refresh("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourse(formData: FormData) {
  await prisma.course.delete({ where: { id: str(formData, "id") } });
  refresh("/admin/courses");
}

/* ------------------------- Testimonials -------------------------- */

export async function saveTestimonial(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    quote: str(formData, "quote"),
    author: str(formData, "author"),
    role: str(formData, "role"),
    verified: bool(formData, "verified"),
    order: int(formData, "order"),
    published: bool(formData, "published"),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  refresh("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await prisma.testimonial.delete({ where: { id: str(formData, "id") } });
  refresh("/admin/testimonials");
}

/* ----------------------------- Posts ----------------------------- */

export async function savePost(formData: FormData) {
  const id = str(formData, "id");
  const published = bool(formData, "published");
  const data = {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    category: str(formData, "category") || "Actualidad",
    coverColor: str(formData, "coverColor") || "#0f3d24",
    published,
    publishedAt: published ? new Date() : null,
  };
  if (id) await prisma.post.update({ where: { id }, data });
  else await prisma.post.create({ data });
  refresh("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await prisma.post.delete({ where: { id: str(formData, "id") } });
  refresh("/admin/posts");
}

/* --------------------------- Partners ---------------------------- */

export async function savePartner(formData: FormData) {
  const id = str(formData, "id");
  const data = { name: str(formData, "name"), order: int(formData, "order") };
  if (id) await prisma.partner.update({ where: { id }, data });
  else await prisma.partner.create({ data });
  refresh("/admin/partners");
  redirect("/admin/partners");
}

export async function deletePartner(formData: FormData) {
  await prisma.partner.delete({ where: { id: str(formData, "id") } });
  refresh("/admin/partners");
}
