/**
 * Shared Loops.so subscribe logic.
 *
 * Kept free of any host-specific request/response types so it can be driven
 * both by the Vercel function (api/subscribe.ts) and by the dev-only Vite
 * middleware in vite.config.ts.
 */

const LOOPS_CREATE_CONTACT = "https://app.loops.so/api/v1/contacts/create";

/** Deliberately permissive — real validation is Loops' job, this just filters noise. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult = {
  status: number;
  body: { ok: true; alreadySubscribed?: boolean } | { ok: false; error: string };
};

export type SubscribeInput = {
  email: unknown;
  /** Honeypot field — bots fill it, humans never see it. */
  company?: unknown;
};

export async function subscribe(
  input: SubscribeInput,
  apiKey: string | undefined,
): Promise<SubscribeResult> {
  // Honeypot tripped: pretend it worked so the bot does not retry or learn.
  if (typeof input.company === "string" && input.company.trim() !== "") {
    return { status: 200, body: { ok: true } };
  }

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: 400, body: { ok: false, error: "Please enter a valid email address." } };
  }

  if (!apiKey) {
    // Misconfiguration, not a user error — surface it loudly in the logs.
    console.error("LOOPS_API_KEY is not set; cannot reach Loops.");
    return {
      status: 500,
      body: { ok: false, error: "Signups are temporarily unavailable. Please try again later." },
    };
  }

  const mailingListId = process.env.LOOPS_MAILING_LIST_ID;

  let res: Response;
  try {
    res = await fetch(LOOPS_CREATE_CONTACT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "waitlist-landing-page",
        userGroup: "early-cohort",
        subscribed: true,
        ...(mailingListId ? { mailingLists: { [mailingListId]: true } } : {}),
      }),
    });
  } catch (err) {
    console.error("Loops request failed:", err);
    return {
      status: 502,
      body: { ok: false, error: "Could not reach our email service. Please try again." },
    };
  }

  // Loops returns 409 when the contact already exists. From the visitor's point
  // of view that is a success — they are on the list either way.
  if (res.status === 409) {
    return { status: 200, body: { ok: true, alreadySubscribed: true } };
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`Loops responded ${res.status}: ${detail}`);
    return {
      status: 502,
      body: { ok: false, error: "Something went wrong on our end. Please try again." },
    };
  }

  return { status: 200, body: { ok: true } };
}
