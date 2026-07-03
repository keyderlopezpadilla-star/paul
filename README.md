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

## ✦ Phase 2 — Immersive 3D (done ✅)

An interactive **React Three Fiber** farm scene lives in the `#experiencia`
section (`src/components/three/`):

- Rolling, sine-displaced **terrain**, **instanced crop field** swaying in the
  wind, low-poly **trees** with animated foliage, a **quadcopter drone** that
  patrols the field with spinning rotors.
- Procedural **sky** (golden hour), soft **clouds**, floating **pollen**
  (Sparkles), ACES tone mapping, shadows and depth fog.
- **Camera drift + mouse parallax** and interactive **hotspots** (drei `Html`)
  describing the services.
- Loaded via `next/dynamic` (`ssr: false`), gated on pointer-fine desktop and
  `prefers-reduced-motion`, with a static gradient fallback and a loading
  sequence — so it never hurts SSR, mobile or accessibility.

## ✦ Roadmap (next phases)

3. **CMS + Admin** — Prisma + PostgreSQL, NextAuth, media library (Cloudinary),
   manage products/courses/news/testimonials.
4. **Live forms** — Resend-powered contact & newsletter API routes
   (currently validated client-side with simulated submission).
5. **PWA / offline** + Stripe-ready checkout for courses.

See `.env.example` for the variables these phases will use.
