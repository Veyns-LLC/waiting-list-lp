import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

type WaitlistFormProps = {
  /** Visual theme — "light" sits on white, "onBlue" sits on the royal band. */
  variant?: "light" | "onBlue";
  cta?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist capture. Posts to /api/subscribe, which adds the contact in Loops
 * server-side so the Loops API key never reaches the browser.
 */
export function WaitlistForm({ variant = "light", cta = "Get early access" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const onBlue = variant === "onBlue";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    if (!EMAIL_RE.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setStatus("done");
      toast.success(
        data.alreadySubscribed
          ? "You're already on the list — we'll be in touch."
          : "You're on the list. We'll be in touch before launch.",
      );
    } catch {
      toast.error("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`flex items-center gap-3 rounded-xl px-5 py-4 ${
          onBlue ? "bg-white/15 text-white" : "bg-veyns-sky-soft text-veyns-royal-deep"
        }`}
        role="status"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            onBlue ? "bg-white text-veyns-royal" : "bg-veyns-royal text-white"
          }`}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <p className="text-[0.95rem]">You&apos;re on the list — watch your inbox.</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        disabled={submitting}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className={`w-full flex-1 rounded-xl px-4 py-3 outline-none transition-colors disabled:opacity-60 ${
          onBlue
            ? "bg-white/12 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/25 focus:ring-white/70"
            : "bg-white text-veyns-charcoal placeholder:text-veyns-charcoal/40 ring-1 ring-inset ring-veyns-royal/15 focus:ring-veyns-royal/50"
        }`}
      />
      <button
        type="submit"
        disabled={submitting}
        className={`group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 whitespace-nowrap transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${
          onBlue
            ? "bg-white text-veyns-royal hover:bg-veyns-sky-soft"
            : "bg-veyns-royal text-white hover:bg-veyns-royal-deep"
        }`}
      >
        {submitting ? "Joining…" : cta}
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}
