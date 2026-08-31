import { Toaster } from "sonner";
import { SiteNav } from "./components/SiteNav";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { ProcessSection } from "./components/ProcessSection";
import { WaitlistSection } from "./components/WaitlistSection";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white text-veyns-charcoal">
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
