import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { SiteNav } from "./components/SiteNav";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { ProcessSection } from "./components/ProcessSection";
import { WaitlistSection } from "./components/WaitlistSection";
import { SiteFooter } from "./components/SiteFooter";

const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));

export default function App() {
  if (window.location.pathname.replace(/\/+$/, "") === "/privacy-policy") {
    return (
      <Suspense fallback={<main className="p-8 text-center">Loading Privacy Policy…</main>}>
        <PrivacyPolicy />
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
