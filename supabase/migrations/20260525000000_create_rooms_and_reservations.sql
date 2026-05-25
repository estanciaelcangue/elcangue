-- pgcrypto (needed for gen_random_uuid if not already enabled)
create extension if not exists pgcrypto with schema extensions;

-- 1. profiles table — must exist before current_user_role() is defined
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null default '',
  role       text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. current_user_role() — depends on profiles; re-create safely (idempotent)
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- 3. RLS on profiles — depends on current_user_role()
alter table public.profiles enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Profiles are publicly readable'
  ) then
    create policy "Profiles are publicly readable"
      on public.profiles for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Admins can manage profiles'
  ) then
    create policy "Admins can manage profiles"
      on public.profiles for all
      using (public.current_user_role() = 'admin')
      with check (public.current_user_role() = 'admin');
  end if;
end $$;

-- ============================================================
-- ROOMS
-- ============================================================
create table if not exists public.rooms (
  id            uuid        primary key default extensions.gen_random_uuid(),
  name          text        not null,
  slug          text        not null unique,
  description   text        not null default '',
  image         text        not null default '',
  amenities     jsonb       not null default '[]',
  -- Available bed configurations shown to guests (at least one required)
  bed_configs   text[]      not null default '{"Matrimonial"}',
  max_guests    int         not null default 2,
  is_active     boolean     not null default true,
  sort_order    int         not null default 0,
  created_at    timestamptz not null default now()
);

alter table public.rooms enable row level security;

create policy "Rooms are publicly readable"
  on public.rooms for select
  using (is_active = true);

create policy "Admins can manage rooms"
  on public.rooms for all
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));

-- ============================================================
-- RESERVATIONS
-- ============================================================
create table if not exists public.reservations (
  id            uuid        primary key default extensions.gen_random_uuid(),
  room_id       uuid        references public.rooms(id) on delete set null,
  guest_name    text        not null,
  guest_email   text        not null,
  guest_phone   text        not null default '',
  check_in      date        not null,
  check_out     date        not null,
  adults        int         not null default 2 check (adults >= 1),
  children      int         not null default 0 check (children >= 0),
  bed_config    text        not null default 'Matrimonial',
  status        text        not null default 'pending'
                            check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  guest_notes   text        not null default '',
  admin_notes   text        not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists reservations_status_idx
  on public.reservations (status, created_at desc);

create index if not exists reservations_dates_idx
  on public.reservations (check_in, check_out);

alter table public.reservations enable row level security;

-- Public can insert (make a reservation request)
create policy "Anyone can create a reservation"
  on public.reservations for insert
  with check (true);

-- Only admins can read/update reservations
create policy "Admins can manage reservations"
  on public.reservations for all
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger reservations_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();

-- ============================================================
-- SEED: ROOMS
-- ============================================================
insert into public.rooms (name, slug, description, image, amenities, bed_configs, max_guests, sort_order)
values
  (
    'La Malacara',
    'la-malacara',
    'La emblemática verde naranja, adonde don Carmelo Cardozo llegó un día para quedarse. Esta habitación de estilo antiguo tiene vista al parque. Los muebles de roble americano pertenecieron a los abuelos. Tiene su propio baño, regadera de la estancia, y una pequeña terraza exterior donde desayunar o leer entre los pájaros.',
    '/images/LA%20MALACARA.webp',
    '["Cama King size","Televisión","Aire acondicionado","Frigobar","Hidromasaje doble y ducha escocesa","Calefacción a leña de dos ambientes","Wifi","Piso de madera"]',
    '{"Matrimonial","2 camas separadas","2 camas separadas + 1 extra","3 camas separadas"}',
    3,
    1
  ),
  (
    'La Mora',
    'la-mora',
    'Nuestra habitación principal es el addendum al casco antiguo. Fue baño, despensa. Para ellos, pasaron de generación en generación estos espacios. Es una pieza con historia de mucha sensibilidad, donde parece que el tiempo se detuvo con sus muebles de época y paredes con listones de pino patagónico.',
    '/images/LA%20MORA.webp',
    '["Cama King size","Aire acondicionado y estufa","Frigobar","Hidromasaje doble y ducha escocesa","Wifi","Piso de madera"]',
    '{"Matrimonial","2 camas separadas","2 camas separadas + 2 extras","4 camas separadas"}',
    4,
    2
  ),
  (
    'La Tubiana',
    'la-tubiana',
    'Un pequeño rincón de estilo antiguo con lindas vistas al parque. Los muebles y enseres evocan un tiempo pasado, y recuerdan a nuestros queridos abuelos. La habitación tiene su propio baño reformado.',
    '/images/LA%20TUBIANA.webp',
    '["Cama King size","Televisión","Aire acondicionado","Frigobar","Piso de madera"]',
    '{"Matrimonial","2 camas separadas","2 camas separadas + 1 extra","3 camas separadas"}',
    3,
    3
  ),
  (
    'La Rosilla',
    'la-rosilla',
    'Esta habitación es de nuestra favorita, otro estilo de cuarto, más moderno, con su baño independiente con hidromasaje y revestida de viejos ladrillos a la vista, es el resultado Boutique. Fue adonde el viejo Miguel Rodríguez dormía entre sus trastos para vigilar a los peones de la estancia.',
    '/images/LA%20ROSILLA.webp',
    '["Cama Queen size","Placar empotrado","Frigobar","Baños de hierro esmaltado y duchas spa"]',
    '{"Matrimonial"}',
    2,
    4
  ),
  (
    'La Gateada',
    'la-gateada',
    'Es nuestra habitación favorita: una suite de dos ambientes en el sector más antiguo del casco. Con piso de tablones de madera de pino patagónico, ventanales con marcos originales con vista al parque y al monte. Tiene una pequeña terraza que comparte con el Rosedal, ideal para desayunar mientras se escuchan los pájaros.',
    '/images/LA%20GATEADA.webp',
    '["Cama King size","Biblioteca con butacas y hogar a leña","Sofá cama de dos plazas","Escritorio","Televisor","Aire acondicionado"]',
    '{"Matrimonial","2 camas separadas","2 camas separadas + 2 extras","4 camas separadas"}',
    4,
    5
  ),
  (
    'La Zaina',
    'la-zaina',
    'La Zaina es nuestra suite biambiente en planta baja con terraza y vista a los jardines del Rosedal, ideal para parejas en busca de mayor privacidad y relax. El estilo de muebles y decoración del interior ofrece un ambiente acogedor y romántico.',
    '/images/LA%20ZAINA.webp',
    '["Cama Queen size","Kitchenette","Aire acondicionado","Frigobar","Baños hidromasaje y duchas de lluvia","Suite hidromasaje para dos"]',
    '{"Matrimonial","2 camas separadas","2 camas separadas + 1 extra","3 camas separadas"}',
    3,
    6
  )
on conflict (slug) do nothing;
