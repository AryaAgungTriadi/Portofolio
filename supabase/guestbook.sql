-- Run once in the SQL Editor of your portfolio's dedicated Supabase project.
begin;
create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 80),
  message text not null check (char_length(trim(message)) between 2 and 1000),
  parent_id uuid references public.guestbook_entries(id) on delete cascade,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists guestbook_recent on public.guestbook_entries (created_at desc) where approved;
alter table public.guestbook_entries enable row level security;
revoke all on public.guestbook_entries from anon, authenticated;
grant select, insert, update, delete on public.guestbook_entries to service_role;

create table if not exists public.portfolio_submission_limits (
  fingerprint text not null,
  scope text not null check (scope in ('contact', 'guestbook')),
  window_start timestamptz not null,
  hits integer not null default 1,
  primary key (fingerprint, scope, window_start)
);
alter table public.portfolio_submission_limits enable row level security;
revoke all on public.portfolio_submission_limits from anon, authenticated;
grant select, insert, update, delete on public.portfolio_submission_limits to service_role;
create or replace function public.claim_portfolio_submission(p_fingerprint text, p_scope text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare current_hits integer;
begin
  if length(p_fingerprint) <> 64 or p_scope not in ('contact', 'guestbook') then return false; end if;
  delete from public.portfolio_submission_limits where window_start < now() - interval '1 day';
  insert into public.portfolio_submission_limits (fingerprint, scope, window_start)
    values (p_fingerprint, p_scope, date_trunc('hour', now()))
    on conflict (fingerprint, scope, window_start) do update
    set hits = public.portfolio_submission_limits.hits + 1
    returning hits into current_hits;
  return current_hits <= 5;
end;
$$;
revoke all on function public.claim_portfolio_submission(text, text) from public, anon, authenticated;
grant execute on function public.claim_portfolio_submission(text, text) to service_role;
commit;
