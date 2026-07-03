/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  services,
  courses,
  testimonials,
  partners,
} from "../src/config/content";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Agropaul database...");

  // --- Admin user ---
  const email = process.env.ADMIN_EMAIL ?? "admin@agropaul.es";
  const password = process.env.ADMIN_PASSWORD ?? "agropaul2026";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Administrador", passwordHash, role: "admin" },
  });
  console.log(`✔ Admin user: ${email}`);

  // --- Services ---
  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.id },
      update: {},
      create: {
        slug: s.id,
        index: s.index,
        title: s.title,
        description: s.description,
        bullets: JSON.stringify(s.bullets),
        accent: s.accent,
        order: i,
      },
    });
  }
  console.log(`✔ ${services.length} services`);

  // --- Courses ---
  for (const [i, c] of courses.entries()) {
    await prisma.course.upsert({
      where: { slug: c.id },
      update: {},
      create: {
        slug: c.id,
        title: c.title,
        duration: c.duration,
        badge: c.badge,
        description: c.description,
        modules: JSON.stringify(c.modules),
        order: i,
      },
    });
  }
  console.log(`✔ ${courses.length} courses`);

  // --- Testimonials ---
  await prisma.testimonial.deleteMany();
  for (const [i, t] of testimonials.entries()) {
    await prisma.testimonial.create({
      data: { quote: t.quote, author: t.author, role: t.role, order: i },
    });
  }
  console.log(`✔ ${testimonials.length} testimonials`);

  // --- Partners ---
  await prisma.partner.deleteMany();
  for (const [i, name] of partners.entries()) {
    await prisma.partner.create({ data: { name, order: i } });
  }
  console.log(`✔ ${partners.length} partners`);

  // --- Sample posts ---
  const posts = [
    {
      slug: "poda-invierno-caqui",
      title: "Poda de invierno del caqui: claves para una cosecha de calibre",
      excerpt:
        "Cómo estructurar el árbol en reposo para equilibrar vigor y producción la próxima campaña.",
      content:
        "La poda de invierno es el momento en el que se define la estructura del caqui para toda la campaña. Trabajamos sobre el árbol en reposo vegetativo para equilibrar el vigor, airear la copa y favorecer la entrada de luz.\n\nUna poda bien ejecutada se traduce en frutos de mayor calibre, menos incidencia de plagas y una recolección más cómoda y segura.",
      category: "Poda técnica",
      coverColor: "#0f3d24",
      published: true,
    },
    {
      slug: "drones-agricultura-precision",
      title: "Drones y NDVI: agricultura de precisión al alcance de tu finca",
      excerpt:
        "Detectar el estrés hídrico y las plagas antes de que sean visibles ya es posible y rentable.",
      content:
        "Los mapas de vigor NDVI obtenidos con dron nos permiten ver lo que el ojo no ve: zonas con estrés hídrico, deficiencias nutricionales o focos de plaga en fases muy tempranas.\n\nCon esos datos ajustamos riego y tratamientos parcela a parcela, reduciendo costes e impacto ambiental mientras mejoramos la producción.",
      category: "Innovación",
      coverColor: "#14512f",
      published: true,
    },
    {
      slug: "aclareo-manual-citricos",
      title: "Aclareo manual en cítricos: menos frutos, más valor",
      excerpt:
        "Por qué retirar fruta a tiempo aumenta el calibre, el dulzor y el precio final.",
      content:
        "El aclareo manual selectivo consiste en retirar parte de la fruta cuajada para que el árbol concentre sus recursos en los frutos restantes.\n\nEl resultado: mayor calibre, mejor grado brix y una fruta más homogénea y valorada en el mercado.",
      category: "Recolección",
      coverColor: "#178a48",
      published: true,
    },
  ];
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, publishedAt: new Date() },
    });
  }
  console.log(`✔ ${posts.length} posts`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
