import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Información legal y condiciones de uso del sitio web de Agropaul.",
};

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso Legal" updated="Julio de 2026">
      <p>
        El presente aviso legal regula el uso del sitio web {siteConfig.url},
        titularidad de {siteConfig.legalName}.
      </p>
      <h2>Objeto</h2>
      <p>
        Este sitio tiene por objeto informar sobre los servicios de gestión
        agrícola, poda técnica y formación que ofrece Agropaul.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, imágenes, diseño y código) son
        propiedad de {siteConfig.legalName} o de terceros que han autorizado su
        uso, y están protegidos por la normativa de propiedad intelectual.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        Agropaul no se hace responsable del mal uso de los contenidos ni de los
        daños derivados del acceso al sitio web.
      </p>
    </LegalPage>
  );
}
