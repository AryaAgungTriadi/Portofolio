import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export const authReady = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
// Used only in route handlers, which can persist refreshed session cookies.
export async function authClient() {
  const store = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookieOptions: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" },
    cookies: { getAll: () => store.getAll(), setAll: (values) => { values.forEach(({ name, value, options }) => store.set(name, value, options)); } },
  });
}
export async function identity() {
  if (!authReady()) return null;
  const client = await authClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return null;
  const metadata = user.user_metadata;
  const raw = metadata.full_name ?? metadata.name ?? metadata.user_name;
  const name = typeof raw === "string" && raw.trim().length >= 2 ? raw.trim().slice(0,80) : "Guest";
  const provider = user.app_metadata.provider;
  if (provider !== "github" && provider !== "google") return null;
  const avatar = metadata.avatar_url ?? metadata.picture;
  const avatar_url = typeof avatar === "string" && avatar.startsWith("https://") && avatar.length < 2048 ? avatar : null;
  return { id: user.id, name, avatar_url, provider, is_owner: user.id === process.env.GUESTBOOK_OWNER_ID };
}
