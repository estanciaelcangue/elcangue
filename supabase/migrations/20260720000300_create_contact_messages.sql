create table if not exists public.contact_messages (
  id uuid primary key default extensions.gen_random_uuid(),
  origin text not null check (origin in ('contact', 'events', 'destination_wedding', 'home')),
  name text not null,
  email text not null,
  phone text not null default '',
  subject text not null default '',
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create index if not exists contact_messages_unread_idx
  on public.contact_messages (is_read, created_at desc);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon;
grant select, update on table public.contact_messages to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop policy if exists "Editors can read contact messages" on public.contact_messages;
create policy "Editors can read contact messages"
  on public.contact_messages for select to authenticated
  using (public.current_user_role() in ('admin', 'editor'));

drop policy if exists "Editors can update contact messages" on public.contact_messages;
create policy "Editors can update contact messages"
  on public.contact_messages for update to authenticated
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));

create or replace function public.submit_contact_message(
  message_origin text,
  sender_name text,
  sender_email text,
  sender_phone text,
  message_subject text,
  message_body text,
  message_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_id uuid;
begin
  if message_origin not in ('contact', 'events', 'destination_wedding', 'home') then
    raise exception 'invalid message origin';
  end if;

  if char_length(trim(sender_name)) < 2 or char_length(sender_name) > 120 then
    raise exception 'invalid sender name';
  end if;

  if char_length(trim(sender_email)) < 3 or char_length(sender_email) > 254 then
    raise exception 'invalid sender email';
  end if;

  if char_length(message_body) < 5 or char_length(message_body) > 5000 then
    raise exception 'invalid message body';
  end if;

  insert into public.contact_messages (
    origin, name, email, phone, subject, message, metadata
  ) values (
    message_origin,
    trim(sender_name),
    lower(trim(sender_email)),
    left(trim(coalesce(sender_phone, '')), 40),
    left(trim(coalesce(message_subject, '')), 160),
    trim(message_body),
    coalesce(message_metadata, '{}'::jsonb)
  )
  returning id into inserted_id;

  return inserted_id;
end;
$$;

revoke all on function public.submit_contact_message(text, text, text, text, text, text, jsonb) from public;
grant execute on function public.submit_contact_message(text, text, text, text, text, text, jsonb) to anon, authenticated;

drop trigger if exists contact_messages_updated_at on public.contact_messages;
create trigger contact_messages_updated_at
  before update on public.contact_messages
  for each row execute function public.set_updated_at();
