"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { TextReveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/config/site";
import { whatsappUrl, mailtoUrl } from "@/lib/contact";

const emailSubject = "Consulta desde la web de Agropaul";
const emailBody =
  "Hola Agropaul,\n\nMe gustaría recibir más información sobre:\n\n(Cuéntanos sobre tu finca o tu proyecto)\n\nGracias.";

export function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-gradient-to-b from-mist to-paper py-24 sm:py-32">
      {/* animated blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-8%] top-[10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(52,197,106,0.18),transparent_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-6%] bottom-[5%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left — big type + contact details */}
          <div>
            <Eyebrow>Hablemos de tu cosecha</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-forest-900">
              <TextReveal text="Hagamos crecer tu finca juntos." />
            </h2>
            <p className="mt-6 max-w-md text-lg text-graphite">
              Cuéntanos sobre tu cultivo y te propondremos un plan a medida. Sin
              compromiso y con la respuesta de un equipo experto.
            </p>

            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href={mailtoUrl({ subject: emailSubject, body: emailBody })}
                  data-cursor="hover"
                  className="group flex items-center gap-4 text-forest-900"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-700 text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="text-lg group-hover:text-accent-600">{siteConfig.contact.gmail}</span>
                </a>
              </li>
              <li>
                <a href={siteConfig.contact.phoneHref} data-cursor="hover" className="group flex items-center gap-4 text-forest-900">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-700 text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="text-lg group-hover:text-accent-600">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group flex items-center gap-4 text-forest-900"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                    <WhatsappIcon className="h-5 w-5" />
                  </span>
                  <span className="text-lg group-hover:text-accent-600">
                    WhatsApp · {siteConfig.contact.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-forest-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-700 text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-lg">
                  {siteConfig.contact.address.region}, {siteConfig.contact.address.country}
                </span>
              </li>
            </ul>

            {/* Prominent WhatsApp CTA */}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 font-medium text-white shadow-[0_12px_32px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-[1.02] active:scale-95"
            >
              <WhatsappIcon className="h-5 w-5" />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
