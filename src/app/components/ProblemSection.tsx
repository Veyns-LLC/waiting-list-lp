import { FileText, Watch, Unplug } from "lucide-react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const PROBLEMS = [
  {
    icon: FileText,
    title: "Labs live in PDFs.",
    body: "Scattered across Quest and Labcorp portals, email threads, and folders you never open twice.",
  },
  {
    icon: Watch,
    title: "Wearables live in their own apps.",
    body: "Whoop tells you one thing. Oura another. Your bloodwork sits in a third silo, disconnected from all of it.",
  },
  {
    icon: Unplug,
    title: "Nothing talks to anything.",
    body: "No way to see whether the thing you changed last quarter actually moved the number. Pure cause-and-effect guesswork.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-veyns-royal/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-[2rem] leading-tight text-veyns-charcoal sm:text-[2.4rem]">
              The test was the easy part.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-8">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-veyns-sky-soft text-veyns-royal">
                    <p.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] text-veyns-charcoal">{p.title}</h3>
                    <p className="mt-1 max-w-md leading-relaxed text-veyns-charcoal/65">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1746014601552-4ed3d01da7e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Person reviewing health data analytics on their phone"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-veyns-royal/20 mix-blend-multiply" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
