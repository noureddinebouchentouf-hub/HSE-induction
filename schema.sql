create extension if not exists pgcrypto;

create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(trim(full_name)) > 1),
  email text not null,
  address text not null,
  arrival_at timestamptz not null,
  departure_at timestamptz not null,
  visit_reason text not null,
  visit_reason_details text default '',
  signature_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  source text not null default 'site',
  ip_address text,
  constraint valid_dates check (departure_at > arrival_at)
);

create table if not exists public.epi_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  company text,
  email text not null,
  pickup_date date not null,
  equipment jsonb not null default '[]'::jsonb,
  status text not null default 'pending' check (status in ('pending','approved','ready','rejected'))
);

create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  request_type text not null check (request_type in ('visitor','epi')),
  related_id uuid,
  to_email text not null,
  subject text not null,
  status text not null check (status in ('queued','sent','failed')),
  provider text not null default 'resend',
  payload jsonb default '{}'::jsonb
);

create index if not exists idx_visitors_created_at on public.visitors (created_at desc);
create index if not exists idx_epi_requests_created_at on public.epi_requests (created_at desc);
create index if not exists idx_email_logs_created_at on public.email_logs (created_at desc);

alter table public.visitors enable row level security;
alter table public.epi_requests enable row level security;
alter table public.email_logs enable row level security;

create policy "visitors_insert"
on public.visitors
for insert
with check (true);

create policy "epi_requests_insert"
on public.epi_requests
for insert
with check (true);

create policy "email_logs_insert"
on public.email_logs
for insert
with check (true);

create policy "visitors_select_admin"
on public.visitors
for select
using (true);

create policy "epi_requests_select_admin"
on public.epi_requests
for select
using (true);

create policy "email_logs_select_admin"
on public.email_logs
for select
using (true);
