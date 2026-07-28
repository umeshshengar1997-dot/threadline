-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run

-- Public profile info, one row per signed-up user
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  theme text not null default 'ticket-indigo',
  accent_color text not null default '#5B5FEF',
  created_at timestamptz not null default now()
);

-- Links that appear on a user's public page
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  url text not null,
  position int not null default 0,
  click_count int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.links enable row level security;

-- Anyone can read profiles/links (this is what makes the public page work)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Public links are viewable by everyone"
  on public.links for select
  using (true);

-- Users can only insert/update/delete their own rows
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can manage their own links"
  on public.links for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Auto-create a profile row when someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, 'user' || substr(new.id::text, 1, 8));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Let a logged-in user atomically increment a link's click count from the public page
create or replace function public.increment_click(link_id uuid)
returns void as $$
begin
  update public.links set click_count = click_count + 1 where id = link_id;
end;
$$ language plpgsql security definer;
