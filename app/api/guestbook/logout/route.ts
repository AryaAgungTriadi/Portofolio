import { authClient, authReady } from "@/lib/guestbook-auth";
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (authReady()) {
    const client = await authClient();
    const { error } = await client.auth.signOut({ scope: "local" });
    if (error) return new Response(null, { status: 503 });
  }
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
