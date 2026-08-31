import { Reveal } from "./Reveal";
import { WaitlistForm } from "./WaitlistForm";
import appStoreIcon from "@/imports/image-2.png";

export function WaitlistSection() {
  return (
    <section id="waitlist" className="bg-veyns-royal text-white">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[2.2rem] leading-[1.15] text-white sm:text-[3rem]">
            A biomarker is not a number. It is a direction.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/75">
            Every blood test you&apos;ve ever taken is a single snapshot. Veyns
            connects them into a trajectory — with your training, sleep, and food
            on the same axis. Coming to iOS. The early cohort gets in first.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 max-w-md">
            <WaitlistForm variant="onBlue" cta="Join the waitlist" />
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/25 px-4 py-2.5 text-white/80">
            <img src={appStoreIcon} alt="App Store" className="h-8 w-8 shrink-0 rounded-[8px]" />
            <span className="flex flex-col items-start justify-center gap-0.5 text-left">
              <span className="text-[0.62rem] uppercase leading-none tracking-[0.14em] text-white/55">
                Coming soon to the
              </span>
              <span className="text-[1rem] leading-none">App Store</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
