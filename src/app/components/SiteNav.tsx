import { VeynsLogo } from "./VeynsLogo";

/** Minimal sticky top bar: wordmark + single waitlist CTA. */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-veyns-royal/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" aria-label="Veyns home" className="block">
          <VeynsLogo className="h-8 w-auto sm:h-9" />
        </a>
        <a
          href="#waitlist"
          className="rounded-lg bg-veyns-royal px-4 py-2 text-[0.9rem] text-white transition-colors hover:bg-veyns-royal-deep sm:px-5"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
