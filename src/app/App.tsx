import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { SiteNav } from "./components/SiteNav";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { ProcessSection } from "./components/ProcessSection";
import { WaitlistSection } from "./components/WaitlistSection";
import { SiteFooter } from "./components/SiteFooter";

const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const TermsOfService = lazy(() => import("./TermsOfService"));
const Contact = lazy(() => import("./Contact"));

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const RoutePage =
    path === "/privacy-policy"
      ? PrivacyPolicy
      : path === "/terms-of-service"
        ? TermsOfService
        : path === "/contact"
          ? Contact
          : null;

  if (RoutePage) {
    return (
      <Suspense fallback={<main className="p-8 text-center">Loading page…</main>}>
        <RoutePage />
      </Suspense>
    );
  }

  return (
    <div id="top" className="min-h-screen w-full overflow-x-clip bg-white text-veyns-charcoal">
      <SiteNav />
      <main>
        <Hero />
        <ProblemSection />
        <ProcessSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
