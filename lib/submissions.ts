import { createHmac } from "node:crypto";

export class SubmissionError extends Error {
  constructor(public status: number) { super("Submission unavailable"); }
}
export function databaseReady() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY && (process.env.SUBMISSION_HASH_SECRET?.length ?? 0) >= 32);
}
export async function database(path: string, init: RequestInit = {}) {
  if (!databaseReady()) throw new SubmissionError(503);
  const key = process.env.SUPABASE_SECRET_KEY!;
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  // Legacy service-role keys are JWTs; new secret keys belong only in apikey.
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");
  const result = await fetch(`${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/${path}`, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!result.ok) throw new SubmissionError(503);
  return result;
}
export async function body(request: Request): Promise<Record<string, unknown>> {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) throw new SubmissionError(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new SubmissionError(415);
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionError(400);
  const chunks: Uint8Array[] = []; let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 20000) { await reader.cancel(); throw new SubmissionError(413); }
      chunks.push(value);
    }
    const decoded = Buffer.concat(chunks).toString("utf8");
    const parsed = JSON.parse(decoded);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new SubmissionError(400);
    return parsed;
  } catch (error) {
    if (error instanceof SubmissionError) throw error;
    throw new SubmissionError(400);
  }
}
export function field(value: unknown, min: number, max: number) {
  if (typeof value !== "string") throw new SubmissionError(400);
  const text = value.trim();
  if (text.length < min || text.length > max) throw new SubmissionError(400);
  return text;
}
export async function limit(request: Request, scope: "contact" | "guestbook") {
  const ip = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "local";
  const fingerprint = createHmac("sha256", process.env.SUBMISSION_HASH_SECRET ?? "").update(ip.split(",")[0].trim()).digest("hex");
  const result = await database("rpc/claim_portfolio_submission", { method: "POST", body: JSON.stringify({ p_fingerprint: fingerprint, p_scope: scope }) });
  if (await result.json() !== true) throw new SubmissionError(429);
}
export function failure(error: unknown) {
  const status = error instanceof SubmissionError ? error.status : 503;
  return Response.json({ error: status === 429 ? "rate_limit" : "unavailable" }, { status, headers: { "Cache-Control": "no-store" } });
}
