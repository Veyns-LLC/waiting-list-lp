import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

type WaitlistFormProps = {
  /** Visual theme — "light" sits on white, "onBlue" sits on the royal band. */
  variant?: "light" | "onBlue";
  cta?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Frontend-only waitlist capture. Validates the email and shows a success
 * state — no network call. Real storage/integration is handled downstream.
 */
export function WaitlistForm({ variant = "light", cta = "Get early access" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const onBlue = variant === "onBlue";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setDone(true);
    toast.success("You're on the list. We'll be in touch before launch.");
  }

  if (done) {
    return (
      <div
        className={`flex items-center gap-3 rounded-xl px-5 py-4 ${
          onBlue ? "bg-white/15 text-white" : "bg-veyns-sky-soft text-veyns-royal-deep"
        }`}
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            onBlue ? "bg-white text-veyns-royal" : "bg-veyns-royal text-white"
          }`}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <p className="text-[0.95rem]">You're on the list — watch your inbox.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 sm:flex-row sm:items-stretch ${
        onBlue ? "" : ""
      }`}
    >
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className={`w-full flex-1 rounded-xl px-4 py-3 outline-none transition-colors ${
          onBlue
            ? "bg-white/12 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/25 focus:ring-white/70"
            : "bg-white text-veyns-charcoal placeholder:text-veyns-charcoal/40 ring-1 ring-inset ring-veyns-royal/15 focus:ring-veyns-royal/50"
        }`}
      />
      <button
        type="submit"
        className={`group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 whitespace-nowrap transition-all active:scale-[0.98] ${
          onBlue
            ? "bg-white text-veyns-royal hover:bg-veyns-sky-soft"
            : "bg-veyns-royal text-white hover:bg-veyns-royal-deep"
        }`}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
