create extension if not exists pgcrypto with schema extensions;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.blog_posts (
  id uuid primary key default extensions.gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  featured_image text not null,
  category text not null check (category in ('novedades', 'eventos', 'prensa', 'experiencias')),
  published_at timestamptz not null default now(),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default extensions.gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  title text not null,
  description text not null default '',
  content text not null default '',
  featured_image text not null,
  event_date timestamptz not null,
  event_end_date timestamptz,
  location text not null default '',
  ticket_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts
  add column if not exists author_id uuid references public.profiles(id) on delete set null;

alter table public.events
  add column if not exists author_id uuid references public.profiles(id) on delete set null;

create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc)
  where is_published = true;

create index if not exists blog_posts_category_idx
  on public.blog_posts (category)
  where is_published = true;

create index if not exists events_event_date_idx
  on public.events (event_date asc)
  where is_published = true;

alter table public.blog_posts enable row level security;
alter table public.events enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles
  for select
  using (true);

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
  on public.profiles
  for all
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

drop policy if exists "Published blog posts are publicly readable" on public.blog_posts;
create policy "Published blog posts are publicly readable"
  on public.blog_posts
  for select
  using (is_published = true);

drop policy if exists "Editors can read all blog posts" on public.blog_posts;
create policy "Editors can read all blog posts"
  on public.blog_posts
  for select
  using (public.current_user_role() in ('admin', 'editor'));

drop policy if exists "Editors can create blog posts" on public.blog_posts;
create policy "Editors can create blog posts"
  on public.blog_posts
  for insert
  with check (
    public.current_user_role() in ('admin', 'editor')
    and (
      author_id = auth.uid()
      or public.current_user_role() = 'admin'
    )
  );

drop policy if exists "Editors can update their blog posts" on public.blog_posts;
create policy "Editors can update their blog posts"
  on public.blog_posts
  for update
  using (
    public.current_user_role() = 'admin'
    or (
      public.current_user_role() = 'editor'
      and author_id = auth.uid()
    )
  )
  with check (
    public.current_user_role() = 'admin'
    or (
      public.current_user_role() = 'editor'
      and author_id = auth.uid()
    )
  );

drop policy if exists "Editors can delete their blog posts" on public.blog_posts;
create policy "Editors can delete their blog posts"
  on public.blog_posts
  for delete
  using (
    public.current_user_role() = 'admin'
    or (
      public.current_user_role() = 'editor'
      and author_id = auth.uid()
    )
  );

drop policy if exists "Published events are publicly readable" on public.events;
create policy "Published events are publicly readable"
  on public.events
  for select
  using (is_published = true);

drop policy if exists "Editors can manage events" on public.events;
create policy "Editors can manage events"
  on public.events
  for all
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));
