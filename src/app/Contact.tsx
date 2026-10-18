import { useEffect } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Veyns";
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = "https://veyns.com/contact";
  }, []);

  return (
    <div id="top" className="min-h-screen w-full overflow-x-clip bg-white text-veyns-charcoal">
      <SiteNav />
      <main className="mx-auto min-h-[60vh] w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-veyns-charcoal/55">
          <a className="transition-colors hover:text-veyns-royal" href="/#top">
            Home
          </a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">Contact</span>
        </nav>
        <h1 className="mb-8 text-4xl text-veyns-charcoal sm:text-5xl">Contact</h1>
        <address className="not-italic text-base leading-8 text-veyns-charcoal/75">
          <strong className="font-semibold text-veyns-charcoal">Veyns LLC</strong>
          <br />
          212 N. 2nd St., STE 100
          <br />
          Richmond, Kentucky 40475
          <br />
          United States
          <br />
          <a
            className="text-veyns-royal underline decoration-veyns-royal/40 underline-offset-4 transition-colors hover:text-veyns-royal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-veyns-royal"
            href="mailto:hello@veyns.app"
          >
            hello@veyns.app
          </a>
        </address>
      </main>
      <SiteFooter />
    </div>
  );
}
