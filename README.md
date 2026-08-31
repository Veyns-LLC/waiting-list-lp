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

Copy `.env.example` to `.env.local` and fill it in. On Vercel, set the same keys
under **Project Settings → Environment Variables**.

| Variable                 | Required | Description                                             |
| ------------------------ | -------- | ------------------------------------------------------- |
| `LOOPS_API_KEY`          | yes      | Loops API key. Read server-side by `/api/subscribe`.     |
| `LOOPS_MAILING_LIST_ID`  | no       | If set, new contacts are added to this Loops list.       |

Neither is prefixed `VITE_`, so neither is inlined into the client bundle. Never
add a `VITE_` prefix to an API key — anything prefixed `VITE_` ships to the browser.

## Waitlist / Loops integration

The form posts to `POST /api/subscribe`, a Vercel Function that calls Loops'
`contacts/create` API with the secret key server-side.

```
src/app/components/WaitlistForm.tsx  →  POST /api/subscribe
                                            │
api/subscribe.ts   (Vercel Function adapter)│
api/_loops.ts      (shared logic) ──────────┴──→ app.loops.so/api/v1/contacts/create
```

- Contacts are tagged `source: "waitlist-landing-page"`, `userGroup: "early-cohort"`.
- An email already in Loops returns **409**, which is reported to the visitor as
  success — they are on the list either way.
- A hidden honeypot field (`company`) silently absorbs bot submissions.
- `npm run dev` serves the same route through a dev-only Vite middleware
  (see `devSubscribeApi` in `vite.config.ts`), so no `vercel dev` is needed locally.

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
