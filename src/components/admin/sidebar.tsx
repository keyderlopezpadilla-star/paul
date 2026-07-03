"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Scissors,
  GraduationCap,
  Quote,
  Newspaper,
  Handshake,
  Inbox,
  Users,
  ExternalLink,
  LogOut,
  Leaf,
} from "lucide-react";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/services", label: "Servicios", icon: Scissors },
  { href: "/admin/courses", label: "Cursos", icon: GraduationCap },
  { href: "/admin/testimonials", label: "Testimonios", icon: Quote },
  { href: "/admin/posts", label: "Noticias", icon: Newspaper },
  { href: "/admin/partners", label: "Colaboradores", icon: Handshake },
  { href: "/admin/messages", label: "Mensajes", icon: Inbox },
  { href: "/admin/subscribers", label: "Suscriptores", icon: Users },
];

export function Sidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-forest-900/10 bg-white">
      <div className="flex items-center gap-2 border-b border-forest-900/10 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-700 text-white">
          <Leaf className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="font-display text-sm font-semibold leading-none text-forest-900">Agropaul</p>
          <p className="text-xs text-slate">Gestor de contenidos</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-forest-700 text-white"
                  : "text-forest-900/70 hover:bg-forest-50",
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-forest-900/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-forest-900/70 hover:bg-forest-50"
        >
          <ExternalLink className="h-4.5 w-4.5" />
          Ver sitio
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-harvest-600 hover:bg-harvest-500/10"
          >
            <LogOut className="h-4.5 w-4.5" />
            Cerrar sesión
          </button>
        </form>
        {email && <p className="truncate px-3 pt-2 text-xs text-slate">{email}</p>}
      </div>
    </aside>
  );
}
