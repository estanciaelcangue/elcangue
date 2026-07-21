insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-media',
  'blog-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Blog media is publicly readable" on storage.objects;
create policy "Blog media is publicly readable"
  on storage.objects for select
  using (bucket_id = 'blog-media');

drop policy if exists "Editors can upload blog media" on storage.objects;
create policy "Editors can upload blog media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'blog-media'
    and public.current_user_role() in ('admin', 'editor')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Editors can update their blog media" on storage.objects;
create policy "Editors can update their blog media"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'blog-media'
    and public.current_user_role() in ('admin', 'editor')
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'blog-media'
    and public.current_user_role() in ('admin', 'editor')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Editors can delete their blog media" on storage.objects;
create policy "Editors can delete their blog media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'blog-media'
    and public.current_user_role() in ('admin', 'editor')
    and (
      public.current_user_role() = 'admin'
      or (storage.foldername(name))[1] = auth.uid()::text
    )
  );
