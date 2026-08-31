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

Deployed on **Netlify**; `netlify.toml` pins the build explicitly rather than
relying on framework auto-detection.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`
- **Node version:** 20

> Do not add a `pnpm-workspace.yaml` back. Netlify treats it as a monorepo
> signal, switches the package manager to pnpm despite `package-lock.json`,
> and its Vite detection can then fall back to publishing the repo root —
> which serves the source `index.html` and its `/src/main.tsx` script tag,
> giving a blank white page with a 200 status.

A Vercel adapter (`api/subscribe.ts` + `vercel.json`) is kept alongside the
Netlify one so the site can move hosts; both call the same `api/_loops.ts`.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. On Netlify, set the same keys under
**Site configuration → Environment variables**, then redeploy.

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
src/app/components/WaitlistForm.tsx
          │  POST /api/subscribe
          ▼
netlify.toml  /api/*  →  /.netlify/functions/:splat
          │
netlify/functions/subscribe.ts   (Netlify adapter — live)
api/subscribe.ts                 (Vercel adapter — standby)
          │
          ▼
api/_loops.ts  ──→  app.loops.so/api/v1/contacts/create
```

- Contacts are tagged `source: "waitlist-landing-page"`, `userGroup: "early-cohort"`.
- An email already in Loops returns **409**, which is reported to the visitor as
  success — they are on the list either way.
- A hidden honeypot field (`company`) silently absorbs bot submissions.
- `npm run dev` serves the same route through a dev-only Vite middleware
  (see `devSubscribeApi` in `vite.config.ts`), so no Netlify CLI is needed locally.

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
