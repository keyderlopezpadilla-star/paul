import { siteConfig } from "@/config/site";
import { services, courses } from "@/config/content";

/**
 * Server-rendered JSON-LD structured data for rich results.
 * Emits LocalBusiness, Organization, and Course entities.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        email: [siteConfig.contact.gmail, siteConfig.contact.email],
        telephone: siteConfig.contact.phone,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phone,
          email: siteConfig.contact.gmail,
          contactType: "customer service",
          availableLanguage: ["es"],
        },
        foundingDate: siteConfig.founded,
        areaServed: {
          "@type": "AdministrativeArea",
          name: siteConfig.contact.address.region,
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: siteConfig.contact.address.region,
          addressCountry: siteConfig.contact.address.countryCode,
        },
        sameAs: Object.values(siteConfig.social),
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "es-ES",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      ...courses.map((c) => ({
        "@type": "Course",
        name: c.title,
        description: c.description,
        timeRequired: "PT24H",
        provider: { "@id": `${siteConfig.url}/#organization` },
        offers: {
          "@type": "Offer",
          category: "Professional Certification",
          availability: "https://schema.org/InStock",
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
