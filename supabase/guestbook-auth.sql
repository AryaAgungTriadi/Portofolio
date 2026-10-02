-- Additive migration: keeps existing comments and approvals.
begin;
alter table public.guestbook_entries add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.guestbook_entries add column if not exists avatar_url text;
alter table public.guestbook_entries add column if not exists provider text check (provider in ('google', 'github'));
alter table public.guestbook_entries add column if not exists is_owner boolean not null default false;
commit;
