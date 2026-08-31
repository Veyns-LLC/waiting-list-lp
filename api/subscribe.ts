import type { VercelRequest, VercelResponse } from "@vercel/node";
import { subscribe } from "./_loops.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  // Vercel parses JSON bodies for us, but be defensive about the shape.
  const body = (typeof req.body === "string" ? safeParse(req.body) : req.body) ?? {};

  const { status, body: payload } = await subscribe(body, process.env.LOOPS_API_KEY);
  return res.status(status).json(payload);
}

function safeParse(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
