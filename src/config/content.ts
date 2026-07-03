/**
 * Editorial content for the Agropaul homepage.
 * Grounded in the real services of the company (agropaul.es).
 */

export const nav = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cursos", href: "/#cursos" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export const heroStats = [
  { value: 12, suffix: "+", label: "Años de experiencia" },
  { value: 850, suffix: "", label: "Hectáreas gestionadas" },
  { value: 24, suffix: "h", label: "Cursos certificados" },
  { value: 98, suffix: "%", label: "Clientes que repiten" },
] as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  bullets: string[];
  accent: "forest" | "accent" | "electric" | "harvest";
};

export const services: Service[] = [
  {
    id: "poda-tecnica",
    index: "01",
    title: "Poda Técnica Avanzada",
    description:
      "Especialistas en cítricos, caqui y frutales de hueso. Optimizamos la estructura del árbol para una producción abundante, sana y de máxima calidad.",
    bullets: [
      "Diseño y equilibrio de copa",
      "Poda estacional de precisión",
      "Renovación de árboles agotados",
    ],
    accent: "forest",
  },
  {
    id: "aclareo-recoleccion",
    index: "02",
    title: "Aclareo y Recolección",
    description:
      "Mediante técnicas de aclareo manual aseguramos un mayor calibre y dulzor en cada fruto. Recolección eficiente, cuidadosa y trazable.",
    bullets: [
      "Aclareo manual selectivo",
      "Mayor calibre y grado brix",
      "Logística de recolección",
    ],
    accent: "harvest",
  },
  {
    id: "gestion-integral",
    index: "03",
    title: "Gestión Integral de Fincas",
    description:
      "Control fitosanitario, análisis de suelos, planes de riego y fertilización personalizados. Tu finca en manos expertas durante todo el año.",
    bullets: [
      "Control fitosanitario",
      "Análisis de suelo y agua",
      "Planes de riego y abonado",
    ],
    accent: "accent",
  },
  {
    id: "agricultura-precision",
    index: "04",
    title: "Agricultura de Precisión",
    description:
      "Monitorización con drones y sensores para decisiones basadas en datos. Detectamos estrés hídrico y plagas antes de que sean visibles.",
    bullets: [
      "Inspección con dron",
      "Mapas de vigor (NDVI)",
      "Alertas tempranas",
    ],
    accent: "electric",
  },
];

export type Course = {
  id: string;
  title: string;
  duration: string;
  badge: string;
  description: string;
  modules: string[];
};

export const courses: Course[] = [
  {
    id: "poda-caqui",
    title: "Curso de Poda de Caqui",
    duration: "24 horas",
    badge: "Certificado Profesional",
    description:
      "Domina las técnicas avanzadas de poda para árboles de caqui: equilibrio vegetativo, estructura y maximización del rendimiento con prácticas en campo.",
    modules: [
      "Anatomía y fisiología del caqui",
      "Técnicas de poda estacional",
      "Herramientas y seguridad",
      "Prácticas intensivas en campo",
      "Certificado de profesionalidad",
    ],
  },
  {
    id: "poda-naranja",
    title: "Curso de Poda de Naranjas",
    duration: "24 horas",
    badge: "Certificado Profesional",
    description:
      "Especialízate en la poda profesional de cítricos: diseño de copa, control del crecimiento vegetativo y técnicas modernas para optimizar la producción.",
    modules: [
      "Características de árboles cítricos",
      "Sistemas de poda moderna",
      "Control fitosanitario",
      "Productividad y calidad",
      "Certificado de profesionalidad",
    ],
  },
];

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "diagnostico",
    step: "Fase 01",
    title: "Diagnóstico de la finca",
    description:
      "Visitamos el terreno, analizamos suelo, agua y estado del cultivo. Cartografiamos cada parcela para entender su potencial real.",
  },
  {
    id: "plan",
    step: "Fase 02",
    title: "Plan agronómico a medida",
    description:
      "Diseñamos un calendario de poda, riego, abonado y tratamientos ajustado a tu variedad, clima y objetivos de producción.",
  },
  {
    id: "ejecucion",
    step: "Fase 03",
    title: "Ejecución experta",
    description:
      "Nuestro equipo de agrónomos y podadores certificados interviene con precisión, respetando el árbol y el medio ambiente.",
  },
  {
    id: "seguimiento",
    step: "Fase 04",
    title: "Seguimiento y datos",
    description:
      "Monitorizamos con dron y sensores, medimos resultados y ajustamos el plan para mejorar la cosecha temporada tras temporada.",
  },
];

export type Benefit = {
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    title: "Mayor rentabilidad",
    description:
      "Incrementamos la producción y la calidad de tus cosechas, traduciéndose en mayores ingresos por hectárea.",
  },
  {
    title: "Sostenibilidad garantizada",
    description:
      "Aplicamos métodos respetuosos con el medio ambiente, cuidando la tierra para las futuras generaciones.",
  },
  {
    title: "Asesoramiento experto",
    description:
      "Contarás con el respaldo de agrónomos y técnicos altamente cualificados en cada etapa del cultivo.",
  },
  {
    title: "Optimización del tiempo",
    description:
      "Nos encargamos de las labores más intensas, liberando tu tiempo para otras prioridades.",
  },
];

export const stats = [
  { value: 32, suffix: "%", label: "Aumento medio de producción", accent: "accent" },
  { value: 850, suffix: " ha", label: "Superficie bajo gestión", accent: "forest" },
  { value: 1200, suffix: "+", label: "Árboles podados al mes", accent: "harvest" },
  { value: 15, suffix: " años", label: "De media junto a cada cliente", accent: "electric" },
] as const;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Desde que Agropaul gestiona nuestra finca de caquis, el calibre y la calidad del fruto han dado un salto enorme. Trabajo serio y muy técnico.",
    author: "Vicente Císcar",
    role: "Productor de caqui · Ribera Alta",
  },
  {
    quote:
      "El curso de poda de cítricos fue una revelación. Contenido práctico, profesores expertos y un certificado que me abrió puertas laborales.",
    author: "Laura Marín",
    role: "Alumna certificada",
  },
  {
    quote:
      "Su control fitosanitario y los informes con dron nos ayudan a anticiparnos a los problemas. Es como tener un agrónomo en el bolsillo.",
    author: "Cooperativa La Vega",
    role: "Cliente corporativo",
  },
];

export const partners = [
  "Cítricos del Levante",
  "Cooperativa La Vega",
  "AgroTech Valencia",
  "Frutas Serrano",
  "Riegos Mediterráneo",
  "Vivers del Túria",
] as const;
