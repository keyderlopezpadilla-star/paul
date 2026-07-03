import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Información sobre el uso de cookies en el sitio web de Agropaul.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" updated="Julio de 2026">
      <p>
        Este sitio web utiliza cookies para mejorar tu experiencia de navegación
        y analizar el uso de la página de forma anónima.
      </p>
      <h2>Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu
        dispositivo cuando visitas un sitio web.
      </p>
      <h2>Tipos de cookies que usamos</h2>
      <p>
        Utilizamos cookies técnicas, necesarias para el funcionamiento del sitio,
        y cookies analíticas para entender cómo interactúan los visitantes con
        nuestro contenido.
      </p>
      <h2>Gestión de cookies</h2>
      <p>
        Puedes configurar o desactivar las cookies desde los ajustes de tu
        navegador en cualquier momento.
      </p>
    </LegalPage>
  );
}
