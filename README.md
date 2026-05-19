# RTM-HD — Rodgers T. Momanyi Portfolio

Production-ready personal website and portfolio for **Rodgers T. Momanyi (RTM-HD)** — Senior Network Engineer, incoming Google Data Center Technician III at Hamina, Finland.

**Live:** [rtmhd.tech](https://rtmhd.tech)

Built with Next.js 16 · TypeScript · Tailwind v4 · Framer Motion · GSAP · R3F · MDX

---

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `YOUTUBE_API_KEY` | Optional | YouTube Data API v3 key. Without it the static `featuredVideos` fallback is used. |
| `YOUTUBE_CHANNEL_ID` | Optional | Your channel ID (e.g. `UCxxxxxxxx`). Required alongside `YOUTUBE_API_KEY`. |
| `RESEND_API_KEY` | Optional | [Resend](https://resend.com) key for contact form emails. Without it, messages are logged to console. |

### Getting a YouTube API key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project, enable **YouTube Data API v3**, create an API key
3. Find your channel ID at [youtube.com/account_advanced](https://www.youtube.com/account_advanced)

---

## Asset Checklist — Placeholders to Replace

| Asset | Path | Notes |
|---|---|---|
| Portrait photo | `/public/rodgers.jpg` | Displayed at 4:5 ratio in About section |
| Resume PDF | `/public/resume.pdf` | Linked as "Download CV" from Hero + About |
| Blog covers | `/public/blog/*.jpg` | Optional; set in MDX frontmatter `coverImage` |
| GitHub handle | `src/components/layout/Footer.tsx` | Search `TODO: verify handle` — `RTM-HD` is placeholder |
| X / Twitter handle | same file | `RTM_HD` is placeholder |
| Instagram handle | same file | `rtm.hd` is placeholder |
| YouTube video IDs | `src/lib/youtube.ts` | Replace `dQw4w9WgXcQ` stubs with real IDs |

---

## Deploy to Vercel

```bash
npx vercel link
npx vercel env add YOUTUBE_API_KEY
npx vercel env add YOUTUBE_CHANNEL_ID
npx vercel env add RESEND_API_KEY
npx vercel --prod
```

Or connect the repo to [vercel.com](https://vercel.com) for auto-deploys. Framework detection handles everything — no `vercel.json` needed.

Point your DNS A record for `rtmhd.tech` to Vercel, then add the domain in the dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router, TypeScript |
| Styling | Tailwind CSS v4 (CSS-native config) |
| Animation | Framer Motion 12 + GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis 1.x wired to GSAP ScrollTrigger |
| 3D / WebGL | React Three Fiber v9 + drei (hero blob) |
| Icons | lucide-react + inline SVGs |
| Blog | MDX via next-mdx-remote v6 (RSC) + gray-matter |
| Forms | `/api/contact` route · Zod v4 · Resend |
| Fonts | Poppins 400/600/700/900 + JetBrains Mono |
| SEO | App Router metadata, dynamic OG image, sitemap, robots |
| Theme | next-themes (dark/light, cookie-based) |
| Deployment | Vercel (zero-config) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout — fonts, providers, cursor
│   ├── page.tsx                Home (all sections)
│   ├── globals.css             Design tokens + Tailwind v4 base
│   ├── opengraph-image.tsx     Dynamic 1200x630 OG image
│   ├── sitemap.ts / robots.ts
│   ├── api/contact/route.ts    POST contact handler
│   └── blog/[slug]/page.tsx    MDX post renderer
├── components/
│   ├── layout/     Nav, Footer, ThemeProvider, Cursor, LenisProvider, IntroOverlay
│   ├── sections/   Hero, About, Experience, Projects, YouTube, Skills, Contact
│   ├── ui/         MagneticButton, Marquee, Counter, ScrollProgress, ReadingProgress,
│   │               VideoCard, ProjectCard, TimelineItem, CountdownClock
│   └── three/      HeroBlob (R3F GLSL noise shader)
├── content/blog/   *.mdx posts
└── lib/            youtube.ts, projects.ts, experience.ts, certs.ts, utils.ts
```

---

## Writing Blog Posts

Add `.mdx` files to `src/content/blog/`:

```mdx
---
title: "Post Title"
date: "2026-06-01"
excerpt: "One-line summary."
tags: ["BGP", "Networking"]
coverImage: "/blog/cover.jpg"
---

# Content here
```

---

## Customisation

- **Colours:** CSS variables in `src/app/globals.css`
- **Timeline:** `src/lib/experience.ts`
- **Projects:** `src/lib/projects.ts`
- **Certs/skills:** `src/lib/certs.ts`
- **Social links:** `src/components/layout/Footer.tsx`

---

## Performance Targets

- Lighthouse Performance ≥ 95 (mobile)
- Lighthouse Accessibility = 100
- Lighthouse Best Practices = 100
- Lighthouse SEO = 100

All animations respect `prefers-reduced-motion`. R3F canvas is lazily imported (no SSR). YouTube thumbnails use `next/image` with WebP/AVIF.
