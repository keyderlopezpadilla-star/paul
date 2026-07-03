import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo Agropaul trata y protege tus datos personales.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad" updated="Julio de 2026">
      <p>
        En {siteConfig.legalName} nos tomamos muy en serio la protección de tus
        datos personales. Esta política explica qué información recopilamos y con
        qué finalidad, de acuerdo con el Reglamento General de Protección de
        Datos (RGPD).
      </p>
      <h2>Responsable del tratamiento</h2>
      <p>
        El responsable es {siteConfig.legalName}, con domicilio en{" "}
        {siteConfig.contact.address.region}, {siteConfig.contact.address.country}.
        Puedes contactarnos en {siteConfig.contact.email}.
      </p>
      <h2>Datos que recopilamos</h2>
      <p>
        Recopilamos los datos que nos facilitas a través de nuestros formularios
        de contacto y suscripción: nombre, correo electrónico, teléfono y el
        contenido de tu mensaje.
      </p>
      <h2>Finalidad</h2>
      <p>
        Utilizamos tus datos para responder a tus solicitudes, prestar nuestros
        servicios y, si lo consientes, enviarte comunicaciones sobre formación y
        novedades agrícolas.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión,
        oposición, limitación y portabilidad escribiéndonos a{" "}
        {siteConfig.contact.email}.
      </p>
    </LegalPage>
  );
}
