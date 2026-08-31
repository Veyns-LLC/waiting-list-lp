import { Reveal } from "./Reveal";
import { WaitlistForm } from "./WaitlistForm";
import { BiomarkerChart } from "./BiomarkerChart";

/** Aggregator sources shown as a subtle trust row under the hero. */
const SOURCES = ["Labcorp", "Quest", "Whoop", "Apple Health", "Oura"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-veyns-sky/40 blur-[120px]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div className="relative">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-veyns-sky-soft px-3 py-1 text-[0.78rem] uppercase tracking-[0.16em] text-veyns-royal">
              <span className="h-1.5 w-1.5 rounded-full bg-veyns-royal" />
              Now building · Join the early cohort
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.05] text-veyns-charcoal sm:text-[3.4rem]">
              You have five years of bloodwork.
              <br />
              You&apos;ve never seen it as a line.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-veyns-charcoal/70">
              Your labs, your wearables, your food — scattered across a dozen
              apps and PDFs. Veyns pulls it all into one timeline you can
              actually read. Everyone&apos;s tracking. Almost no one&apos;s
              connecting the dots. Don&apos;t get left flying blind.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 max-w-md">
              <WaitlistForm />
              <p className="mt-3 text-[0.8rem] text-veyns-charcoal/50">
                Join the early cohort — the first users shape what gets built.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-[0.72rem] uppercase tracking-[0.16em] text-veyns-charcoal/40">
                Pulls from
              </span>
              {SOURCES.map((s) => (
                <span key={s} className="text-[0.85rem] text-veyns-charcoal/60">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <BiomarkerChart />
        </div>
      </div>
    </section>
  );
}
