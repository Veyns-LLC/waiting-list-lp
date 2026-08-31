# Veyns — Pre-MVP Landing Page

## Context

Veyns is a platform for biohackers and health-conscious people. The MVP is a **lab-report parser**: upload your lab record and see your biomarker trends and useful insights over time. This landing page has two equal goals — **collect email subscribers** for the waitlist and **make people aware of the MVP**.

The user provided a full brand guide and a polished landing-page mockup (`src/imports/image.png` = brand guide, `src/imports/image-1.png` = landing mockup), plus four Veyns logo SVG components. We are matching the mockup's structure and brand, but simplified.

**Constraints from the user:**
- Simple one-pager, **4–6 sections max**, not a heavy site.
- **Cool, subtle animation**; healthcare vibe but also tech.
- **Serif headlines** (user disliked Sora), **Inter for body**, kept readable.
- **iOS-only** app — keep "Coming to iOS", App Store badge, no Android.
- **Frontend-only** email capture (success state only, no storage). **Do NOT set up Supabase** — user handles integration later.

## Brand tokens (from brand guide)

- Royal Blue `#1B4B9B` (primary), Sky Blue `#A8CBEA` (accent), White, Charcoal `#1F2937`.
- Logos use `#1B569A`/`#A0C7E9` (baked into SVGs — leave as-is).
- Headlines: editorial serif (use **Newsreader** via Google Fonts — screen-optimized, editorial). Body: **Inter**.

## Existing assets to reuse

- Logos: `src/imports/VeynsWordmarkOnWhiteColor1/index.tsx` (nav/footer), `src/imports/VeynsWordmarkOnBlueWhite1/index.tsx` (on blue band), `src/imports/VeynsStackedColor1/index.tsx` (optional). Each is a default export in a `relative size-full` wrapper — wrap in a sized box.
- `src/app/components/figma/ImageWithFallback.tsx` for the one photo (blue-toned lab/CGM imagery, sourced via Unsplash MCP).
- Libs already installed: `motion` (import from `motion/react`), `lucide-react`, `recharts`.

## Plan

### 1. Styles setup
- `src/styles/fonts.css`: add Google Fonts imports at top — Newsreader (headlines) + Inter (body).
- `src/styles/theme.css`: add brand CSS vars (`--veyns-royal`, `--veyns-sky`, `--veyns-charcoal`) and set `--font-serif`/`--font-sans`; align `--primary` to royal blue for buttons. Apply serif to `h1/h2/h3`, Inter to body. Keep changes minimal and token-based.

### 2. Components (in `src/app/components/`)
- `SiteNav.tsx` — sticky, minimal: Veyns wordmark left, "Join Waitlist" button right (scrolls to waitlist). Mobile: just logo + button.
- `Hero.tsx` — serif headline "You have five years of bloodwork. You have never seen it as a line.", subhead about turning scattered lab reports/wearables/food into one readable timeline, `WaitlistForm` + microcopy "iOS FIRST · FREE THROUGH BETA". Right: `BiomarkerChart` animated line inside a light phone/card frame.
- `BiomarkerChart.tsx` — `recharts` line chart on a subtle grid (brand blue line, animated draw-in) representing a biomarker trend. Mock data.
- `ProblemSection.tsx` — "The test was the easy part." with 3 lucide-icon points (Labs live in PDFs / Wearables live in their own apps / Nothing talks to anything). Optional single blue-toned photo via ImageWithFallback.
- `ProcessSection.tsx` — "Three steps to one timeline." reflecting the **lab-report parser MVP**: 01 Upload your lab report (PDF) → 02 Connect what you already wear → 03 Watch your biomarkers become a line. Icon/mini-diagram cards.
- `WaitlistSection.tsx` — royal-blue band "A biomarker is not a number. It is a direction." folded together with the "Coming to iOS" CTA: `WaitlistForm` + App Store badge (placeholder). Keeps section count low.
- `SiteFooter.tsx` — wordmark, © 2026 Veyns, Contact / Privacy / Terms (non-functional anchors).
- `WaitlistForm.tsx` — shared email input + submit; frontend-only: validates, shows inline success ("You're on the list") + `sonner` toast, clears field. No network call.

**Final section count (~5 + footer):** Hero · Problem · Process · Manifesto+Waitlist · Footer.

### 3. Compose in `src/app/App.tsx`
Import and stack the components in order; default export. Set page background white, max-width container per section, generous spacing.

### 4. Animation (load `make:motion-context` skill before writing motion code)
- Subtle scroll-reveal (fade/slide-up) on section entry via `motion/react` `whileInView`.
- Hero chart line draws in on mount.
- Respect `prefers-reduced-motion`. Keep it tasteful, not flashy.

### 5. Responsiveness
- Desktop-primary, fully responsive: hero two-column → stacked on mobile; process 3-col → 1-col; fluid type with the serif scaling down.

## Verification
- App renders in the Figma Make preview (dev server already running — do not start it).
- Visually compare against `src/imports/image-1.png`: nav, serif hero, email capture, problem, process, blue manifesto, waitlist, footer all present.
- Submit an email → inline success + toast, field clears, no console errors.
- Resize to mobile width → layout stacks cleanly, nothing clips.
- Reduced-motion: animations settle to static.
