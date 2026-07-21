alter table public.blog_posts
  add column if not exists view_count bigint not null default 0
  check (view_count >= 0);

create or replace function public.increment_blog_post_views(post_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count bigint;
begin
  update public.blog_posts
  set view_count = view_count + 1
  where id = post_id and is_published = true
  returning view_count into updated_count;

  return updated_count;
end;
$$;

revoke all on function public.increment_blog_post_views(uuid) from public;
grant execute on function public.increment_blog_post_views(uuid) to anon, authenticated;
