import { VeynsLogo } from "./VeynsLogo";

const LINKS = ["Contact", "Privacy protocol", "Terms of service"];

export function SiteFooter() {
  return (
    <footer className="border-t border-veyns-royal/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <VeynsLogo className="h-7 w-auto" />
        <p className="text-[0.8rem] text-veyns-charcoal/50">© 2026 Veyns</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[0.82rem] text-veyns-charcoal/60 transition-colors hover:text-veyns-royal"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
