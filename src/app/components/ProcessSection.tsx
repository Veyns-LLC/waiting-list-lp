import { UploadCloud, Watch, LineChart } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    icon: UploadCloud,
    title: "Drop in your lab report.",
    body: "Upload any PDF from Quest, Labcorp, or your doctor. Veyns parses every biomarker automatically — no manual entry.",
    tag: "The MVP starts here",
  },
  {
    n: "02",
    icon: Watch,
    title: "Connect what you already wear.",
    body: "Whoop, Oura, Apple Health. Your sleep, strain, and recovery land on the same axis as your bloodwork.",
    tag: "Coming next",
  },
  {
    n: "03",
    icon: LineChart,
    title: "Watch the line.",
    body: "Every marker becomes a trend. See what moved, when, and what you changed to move it.",
    tag: "The payoff",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-veyns-sky-soft/50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl text-[2rem] leading-tight text-veyns-charcoal sm:text-[2.4rem]">
            Three steps to one timeline.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-lg leading-relaxed text-veyns-charcoal/65">
            We&apos;re starting with the lab-report parser — the hardest, most
            useful piece — then folding in everything else you already track.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-veyns-royal/10 bg-white p-7 transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[2rem] text-veyns-royal/25">{s.n}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-veyns-sky-soft text-veyns-royal">
                    <s.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>
                <span className="mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-veyns-royal/70">
                  {s.tag}
                </span>
                <h3 className="mt-2 text-[1.2rem] text-veyns-charcoal">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-veyns-charcoal/65">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
