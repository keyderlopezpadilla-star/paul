/**
 * Central site configuration & business metadata for Agropaul.
 * Single source of truth for SEO, structured data and contact info.
 */

export const siteConfig = {
  name: "Agropaul",
  legalName: "Agropaul Gestión Agrícola",
  tagline: "Innovación y pasión por la tierra",
  description:
    "Agropaul es una empresa agrícola profesional especializada en poda técnica de cítricos, caqui y frutales de hueso, aclareo, recolección y gestión integral de fincas. Formación certificada y soluciones sostenibles.",
  // Canonical site URL — override with NEXT_PUBLIC_SITE_URL (set on Vercel).
  // Falls back to the production domain once it's connected.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://agropaul.es",
  locale: "es_ES",
  lang: "es",
  keywords: [
    "poda técnica",
    "gestión agrícola",
    "poda de cítricos",
    "poda de caqui",
    "aclareo",
    "recolección",
    "gestión de fincas",
    "cursos de poda",
    "agricultura sostenible",
    "Agropaul",
  ],
  contact: {
    // Primary email (domain). Also add a Gmail below for direct contact.
    email: "info@agropaul.es",
    gmail: "agropaul.gestion@gmail.com",
    phone: "+34 642 873 776",
    phoneHref: "tel:+34642873776",
    // E.164 without "+" — used to build wa.me links.
    whatsappNumber: "34642873776",
    whatsapp: "https://wa.me/34642873776",
    whatsappMessage:
      "Hola Agropaul 👋, me gustaría recibir más información sobre vuestros servicios agrícolas.",
    address: {
      region: "Comunidad Valenciana",
      country: "España",
      countryCode: "ES",
    },
  },
  social: {
    instagram: "https://instagram.com/agropaul",
    linkedin: "https://linkedin.com/company/agropaul",
    youtube: "https://youtube.com/@agropaul",
    facebook: "https://facebook.com/agropaul",
  },
  founded: "2012",
} as const;

export type SiteConfig = typeof siteConfig;
