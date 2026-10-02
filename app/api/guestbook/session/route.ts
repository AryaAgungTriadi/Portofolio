import { authReady, identity } from "@/lib/guestbook-auth";
export async function GET() {
  try { return Response.json({ ready: authReady(), user: await identity() }, { headers: { "Cache-Control": "private, no-store" } }); }
  catch { return Response.json({ ready: false, user: null }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
