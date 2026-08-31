# Veyns — Waitlist Landing Page

Email-capture landing page for the Veyns early cohort. React + Vite + Tailwind v4,
built as a static SPA.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
```

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Production build into `dist/`        |
| `npm run preview`   | Serve the production build locally   |
| `npm run typecheck` | Run `tsc --noEmit`                   |

## Deploying

The output is a fully static `dist/` folder — any static host works.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20+

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable              | Required | Description                                                     |
| --------------------- | -------- | --------------------------------------------------------------- |
| `VITE_LOOPS_FORM_ID`  | yes      | Loops.so newsletter form id, used by the waitlist form endpoint. |

Anything prefixed `VITE_` is inlined into the client bundle and is publicly
visible. Never put a Loops **API key** in a `VITE_` variable — the newsletter
form endpoint is designed for public, browser-side use and needs no secret.

## Project layout

```
index.html                  # document head, SEO + OG tags
public/                     # static assets copied verbatim (favicon)
src/
  main.tsx                  # React entry point
  app/App.tsx               # page composition
  app/components/           # page sections (Hero, Problem, Process, Waitlist…)
  app/components/ui/        # shadcn/ui primitives
  imports/                  # Figma-exported logo + image assets
  styles/                   # fonts, Tailwind entry, design tokens
```

Original design: [Figma](https://www.figma.com/design/vagnRoYRRMA6hcT3Vj1ixA/Landing-Page-for-Email-Subscribers)
