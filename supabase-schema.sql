-- ═══════════════════════════════════════════════════
-- WH40K Tracker — Supabase Database Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════

-- ── 1. PROFILES ──
-- Extends the built-in auth.users table with display name
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  display_name  text,
  created_at    timestamptz default now()
);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 2. ROSTER UNITS ──
-- One row per unit per user
create table if not exists public.roster_units (
  id            uuid default gen_random_uuid() primary key,
  user_id       uuid references auth.users(id) on delete cascade not null,
  faction_id    text not null,           -- e.g. 'csm', 'necrons'
  unit          text not null,           -- unit name
  cat           text not null,           -- category: Character, Infantry, etc.
  qty           integer default 0,       -- total models owned
  bought        text default 'N',        -- Y or N
  model_built   integer default 0,       -- models assembled
  units_built   integer default 0,       -- full units assembled
  units_owned   integer default 1,       -- number of units (for multi-unit entries)
  painted       integer default 0,       -- models painted
  stored_pts    integer,                 -- last known pts/unit
  note          text,                    -- optional note
  sort_order    integer default 0,       -- display order within faction
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Auto-update updated_at on changes
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_roster_updated_at on public.roster_units;
create trigger set_roster_updated_at
  before update on public.roster_units
  for each row execute procedure public.set_updated_at();

-- ── 3. SAVED LISTS ──
-- BCP/TTB lists the user has checked and wants to save
create table if not exists public.saved_lists (
  id            uuid default gen_random_uuid() primary key,
  user_id       uuid references auth.users(id) on delete cascade not null,
  name          text not null,           -- user-given name for the list
  raw_text      text not null,           -- original pasted text
  faction       text,                    -- detected faction
  created_at    timestamptz default now()
);

-- ── 4. ROW LEVEL SECURITY ──
-- Critical: users can only see and edit their own data

alter table public.profiles     enable row level security;
alter table public.roster_units enable row level security;
alter table public.saved_lists  enable row level security;

-- Profiles: users can read/update only their own
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Roster units: full CRUD on own rows only
create policy "Users can view own roster"
  on public.roster_units for select
  using (auth.uid() = user_id);

create policy "Users can insert own roster"
  on public.roster_units for insert
  with check (auth.uid() = user_id);

create policy "Users can update own roster"
  on public.roster_units for update
  using (auth.uid() = user_id);

create policy "Users can delete own roster"
  on public.roster_units for delete
  using (auth.uid() = user_id);

-- Saved lists: full CRUD on own rows only
create policy "Users can view own lists"
  on public.saved_lists for select
  using (auth.uid() = user_id);

create policy "Users can insert own lists"
  on public.saved_lists for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own lists"
  on public.saved_lists for delete
  using (auth.uid() = user_id);

-- ── 5. INDEXES ──
-- Speed up the most common queries
create index if not exists idx_roster_user_faction
  on public.roster_units (user_id, faction_id);

create index if not exists idx_lists_user
  on public.saved_lists (user_id);

-- ── DONE ──
-- You should see 3 tables in Table Editor: profiles, roster_units, saved_lists
