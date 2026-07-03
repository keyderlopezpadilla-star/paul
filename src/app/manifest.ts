import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * PWA web app manifest (Next.js metadata route → /manifest.webmanifest).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} · Gestión Agrícola Profesional`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbfcfa",
    theme_color: "#0f3d24",
    lang: siteConfig.lang,
    dir: "ltr",
    categories: ["business", "agriculture", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Servicios",
        short_name: "Servicios",
        url: "/#servicios",
        description: "Nuestros servicios agrícolas",
      },
      {
        name: "Noticias",
        short_name: "Noticias",
        url: "/noticias",
        description: "Actualidad y blog de Agropaul",
      },
      {
        name: "Contacto",
        short_name: "Contacto",
        url: "/#contacto",
        description: "Ponte en contacto con nosotros",
      },
    ],
  };
}
