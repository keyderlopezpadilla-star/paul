"use client";

import Link from "next/link";
import { Leaf, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { nav } from "@/config/content";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { whatsappUrl, mailtoUrl } from "@/lib/contact";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  FacebookIcon,
  WhatsappIcon,
} from "@/components/ui/social-icons";

const socials = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: newsletter + brand */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-400">
              Newsletter
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Recibe conocimiento agrícola que hace crecer tu cosecha.
            </h2>
            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          {/* Right: links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
                Navegación
              </h3>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-cursor="hover"
                      className="group inline-flex items-center gap-1 text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
                Contacto
              </h3>
              <ul className="mt-5 space-y-3 text-white/75">
                <li>
                  <a href={mailtoUrl({ subject: "Consulta desde la web de Agropaul" })} data-cursor="hover" className="hover:text-white">
                    {siteConfig.contact.gmail}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.contact.phoneHref} data-cursor="hover" className="hover:text-white">
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300"
                  >
                    <WhatsappIcon className="h-3.5 w-3.5" />
                    WhatsApp directo
                  </a>
                </li>
                <li className="text-white/60">
                  {siteConfig.contact.address.region},<br />
                  {siteConfig.contact.address.country}
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    data-cursor="hover"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-accent-400 hover:text-accent-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Giant animated wordmark */}
        <div className="mt-20 flex items-center gap-3 border-t border-white/10 pt-10">
          <Leaf className="h-6 w-6 text-accent-400" />
          <span className="font-display text-[15vw] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[12vw]">
            AGROPAUL
          </span>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-sm text-white/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" data-cursor="hover" className="hover:text-white/80">
              Privacidad
            </Link>
            <Link href="/aviso-legal" data-cursor="hover" className="hover:text-white/80">
              Aviso legal
            </Link>
            <Link href="/cookies" data-cursor="hover" className="hover:text-white/80">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
