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
npm install                 # also runs `prisma generate` (postinstall)
cp .env.example .env        # SQLite defaults work out of the box
npm run db:migrate          # create the SQLite schema (prisma/dev.db)
npm run db:seed             # seed content + admin user
npm run dev                 # http://localhost:3000
```

Other scripts: `npm run build` · `npm run start` · `npm run lint` ·
`npm run db:studio` (Prisma Studio) · `npm run db:setup` (deploy + seed).

**Admin panel:** visit [`/admin`](http://localhost:3000/admin) and sign in with
the seeded credentials — `admin@agropaul.es` / `agropaul2026`
(configurable via `.env`; change them for production).

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

## ✦ Phase 3 — CMS + Admin (done ✅)

A fully functional headless CMS backs the public site:

- **Prisma + SQLite** (zero-config locally; swap the datasource to PostgreSQL
  for production). Schema: `User`, `Service`, `Course`, `Testimonial`,
  `Partner`, `Post`. Seeded from `src/config/content.ts`.
- **NextAuth v5 (Auth.js)** credentials auth with bcrypt-hashed passwords, JWT
  sessions, and an **edge-safe config split** (`auth.config.ts` for middleware,
  `auth.ts` for the Node provider). `middleware.ts` protects every `/admin`
  route.
- **Admin dashboard** at `/admin` — sidebar, stats overview, and full
  create/edit/delete (via **server actions**) for services, courses,
  testimonials, news posts and partners.
- **Public site wired to the DB** — the homepage (services, courses,
  testimonials, partner marquee) and a new **`/noticias` blog** (list + article
  pages with `generateStaticParams`, dynamic metadata and `Article` JSON-LD)
  all read from Prisma. CMS writes call `revalidatePath()` so changes appear
  immediately.

> The public site sits under a `(site)` route group with its own layout
> (smooth scroll, cursor, navbar, footer); `/admin` has a separate shell.

## ✦ Roadmap (next phases)

4. **Live forms** — Resend-powered contact & newsletter API routes
   (currently validated client-side with simulated submission).
5. **PWA / offline** + Stripe-ready checkout for courses.
6. **Media library** — Cloudinary uploads wired into the CMS forms.

See `.env.example` for the variables these phases will use.
