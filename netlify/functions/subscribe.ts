import { subscribe } from "../../api/_loops.js";

/**
 * Netlify Function adapter. Reached via the /api/* redirect in netlify.toml,
 * so the browser still calls POST /api/subscribe.
 *
 * The Loops API key is read from process.env here on the server and never
 * reaches the client bundle.
 */
export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  let parsed: Record<string, unknown> = {};
  try {
    parsed = await req.json();
  } catch {
    /* fall through — subscribe() rejects the empty payload */
  }

  const { status, body } = await subscribe(parsed, process.env.LOOPS_API_KEY);
  return json(body, status);
};

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
