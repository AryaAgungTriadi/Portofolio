import { authClient, authReady } from "@/lib/guestbook-auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider");
  const fail = () => NextResponse.redirect(new URL("/?guestbook=login-error", url.origin));
  if (!authReady() || (provider !== "github" && provider !== "google")) return fail();
  try {
    const client = await authClient();
    const { data, error } = await client.auth.signInWithOAuth({ provider, options: { redirectTo: `${url.origin}/auth/callback`, skipBrowserRedirect: true } });
    if (error || !data.url) return fail();
    return NextResponse.redirect(data.url, { headers: { "Cache-Control": "no-store" } });
  } catch { return fail(); }
}
