import Link from "next/link";
import { Scissors, GraduationCap, Quote, Newspaper, Handshake, Inbox, Users, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const [services, courses, testimonials, posts, partners, drafts, unreadMsgs, subscribers] =
    await Promise.all([
      prisma.service.count(),
      prisma.course.count(),
      prisma.testimonial.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.partner.count(),
      prisma.post.count({ where: { published: false } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.subscriber.count(),
    ]);

  const cards = [
    { label: "Servicios", value: services, href: "/admin/services", icon: Scissors },
    { label: "Cursos", value: courses, href: "/admin/courses", icon: GraduationCap },
    { label: "Testimonios", value: testimonials, href: "/admin/testimonials", icon: Quote },
    { label: "Noticias publicadas", value: posts, href: "/admin/posts", icon: Newspaper },
    { label: "Colaboradores", value: partners, href: "/admin/partners", icon: Handshake },
    { label: "Borradores", value: drafts, href: "/admin/posts", icon: Newspaper },
    { label: "Mensajes sin leer", value: unreadMsgs, href: "/admin/messages", icon: Inbox },
    { label: "Suscriptores", value: subscribers, href: "/admin/subscribers", icon: Users },
  ];

  return (
    <div>
      <p className="text-sm text-slate">Bienvenido de nuevo,</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-forest-900">
        {session?.user?.name ?? "Administrador"}
      </h1>
      <p className="mt-2 max-w-lg text-graphite">
        Gestiona el contenido del sitio de Agropaul. Los cambios se publican al
        instante en la web pública.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group rounded-2xl border border-forest-900/10 bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(7,30,18,0.35)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-4 font-display text-4xl font-semibold text-forest-900">{c.value}</p>
              <p className="text-sm text-slate">{c.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
