import { authClient, authReady } from "@/lib/guestbook-auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code && authReady()) {
    try {
      const client = await authClient();
      const { error } = await client.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL("/?guestbook=open", url.origin), { headers: { "Cache-Control": "no-store" } });
    } catch { /* Show a safe retry message without exposing OAuth details. */ }
  }
  return NextResponse.redirect(new URL("/?guestbook=login-error", url.origin), { headers: { "Cache-Control": "no-store" } });
}
