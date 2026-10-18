import { VeynsLogo } from "./VeynsLogo";

const LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-veyns-royal/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <a href="/#top" aria-label="Veyns home" className="block">
          <VeynsLogo className="h-7 w-auto" />
        </a>
        <p className="text-[0.8rem] text-veyns-charcoal/50">© 2026 Veyns</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[0.82rem] text-veyns-charcoal/60 transition-colors hover:text-veyns-royal"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
