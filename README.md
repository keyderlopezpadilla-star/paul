# Agropaul — Gestión Agrícola Profesional

A production-grade marketing experience for **Agropaul**, an agricultural
company specialising in technical pruning, farm management and certified
training. Built to feel designed by Apple, built by Vercel and animated by
Active Theory.

> Content is in **Spanish (es-ES)**, matching the real business.

## ✦ Tech stack

| Area | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, React 19, Server Components) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v4** (CSS-first design tokens) |
| Animation | **Framer Motion** + custom canvas WebGL particle field |
| Smooth scroll | **Lenis** |
| Forms | **React Hook Form** + **Zod** |
| Icons | **lucide-react** + custom SVG brand glyphs |
| SEO | Metadata API, JSON-LD, dynamic OG image, sitemap, robots |

## ✦ Architecture

Feature-driven + atomic composition:

```
src/
├─ app/                     # Routes, metadata, sitemap, robots, OG image
│  ├─ layout.tsx            # Fonts, providers, navbar/footer, JSON-LD
│  ├─ page.tsx              # Homepage composition
│  └─ (privacidad|cookies|aviso-legal)/
├─ components/
│  ├─ providers/            # Lenis smooth-scroll provider
│  ├─ interaction/          # Custom cursor, magnetic wrapper
│  ├─ motion/               # Reveal, TextReveal, Counter
│  ├─ hero/                 # Canvas particle field
│  ├─ layout/               # Navbar, Footer, legal shell
│  ├─ sections/             # Homepage sections (hero, services, …)
│  ├─ seo/                  # JSON-LD structured data
│  └─ ui/                   # Button, Eyebrow, social icons
├─ config/                  # site.ts (business data) + content.ts (copy)
├─ hooks/                   # use-media-query (pointer / reduced-motion)
└─ lib/                     # utils (cn, lerp, clamp…)
```

**Single source of truth:** all business info lives in `src/config/site.ts`
and all editorial copy in `src/config/content.ts`.

## ✦ Highlights

- **Cinematic hero** — layered gradients, sun glow, DPR-aware canvas particle
  field with parallax, masked light rays, staggered word reveal, animated
  counters.
- **Pinned horizontal-scroll process** — sticky viewport with an X-translated
  track (degrades to a vertical stack on touch).
- **Bento services grid**, auto-rotating **glassmorphism testimonials**,
  animated stat counters, infinite marquee.
- **Micro-interactions** — magnetic buttons, context-aware custom cursor,
  hover tilt/lift, shine sweeps.
- **Accessibility** — semantic HTML, keyboard focus rings, full
  `prefers-reduced-motion` support, touch fallbacks.
- **SEO** — rich JSON-LD (`Organization`/`LocalBusiness`/`Course`), dynamic
  OpenGraph image, sitemap & robots.

## ✦ Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
npm run lint
```

## ✦ Roadmap (next phases)

These were intentionally deferred to keep Phase 1 real, fast and shippable:

1. **3D farm scene** — React Three Fiber / Drei immersive terrain, tractor,
   drone, day/night cycle (loaded behind a dynamic, reduced-motion-aware gate).
2. **CMS + Admin** — Prisma + PostgreSQL, NextAuth, media library (Cloudinary),
   manage products/courses/news/testimonials.
3. **Live forms** — Resend-powered contact & newsletter API routes
   (currently validated client-side with simulated submission).
4. **PWA / offline** + Stripe-ready checkout for courses.

See `.env.example` for the variables these phases will use.
