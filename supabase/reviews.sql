-- Patient reviews table.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  location    text not null check (char_length(location) between 2 and 80),
  rating      smallint not null check (rating between 1 and 5),
  message     text not null check (char_length(message) between 10 and 1000),
  approved    boolean not null default false
);

create index if not exists reviews_approved_created_idx
  on public.reviews (approved, created_at desc);

-- Row Level Security ON with no policies = the public anon key can't read or
-- write anything. Only the website's server (service role key) can access it.
alter table public.reviews enable row level security;

-- Explicit grant for the server key (needed when "Automatically expose new
-- tables" is off in the project settings). anon/authenticated get nothing.
grant select, insert, update, delete on public.reviews to service_role;
