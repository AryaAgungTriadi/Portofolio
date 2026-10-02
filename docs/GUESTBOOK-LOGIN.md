# Chat guestbook and social sign-in

Run `supabase/guestbook-auth.sql` once in Supabase SQL Editor. This additive migration preserves existing messages and approvals. Deploy this migration before the new code.

Add server-only `SUPABASE_PUBLISHABLE_KEY` (sb_publishable_... or legacy anon) in Vercel Production. Never use SUPABASE_SECRET_KEY for the auth client.

Supabase Authentication > URL Configuration:
- Site URL: https://portofolio-aryaagungtriadi.vercel.app
- Redirect URL: https://portofolio-aryaagungtriadi.vercel.app/auth/callback
- Add other portfolio domains explicitly if used, and http://localhost:3000/auth/callback for local testing.

Enable GitHub and Google under Authentication > Sign In / Providers. Create OAuth applications with their credentials, using Supabase's displayed provider callback URL (https://ktscnoneylwzhdtpwotc.supabase.co/auth/v1/callback), not the portfolio callback above. Store client secrets in the provider settings only.

Optional: after Arya signs in, copy his UUID from Authentication > Users into GUESTBOOK_OWNER_ID in Vercel. Only that verified account receives the DEV badge and right-aligned messages. Existing guest comments retain their names, have initial avatars and no provider badge. Names never grant owner rights.

Identity is verified through Supabase getUser on every submission. Visitors cannot supply their own name, provider, owner flag, or avatar through the form. Session cookies are HttpOnly and refreshed by the route handlers. Posts still require moderation (approved=true), and maintain origin, honeypot and durable rate-limit checks. Guestbook reads poll every 15 seconds while the drawer is visible; there is no fake realtime/LIVE badge. The API exposes neither email nor auth user UUID.

Validation requires live provider credentials: sign in, return to the open drawer, submit, approve, check another browser, reply, sign out, and confirm an unauthenticated POST returns 401. Google OAuth app audience/test user settings determine which users can sign in until its production setup is completed.
