-- Zusatztabelle Profiles https://supabase.com/docs/guides/auth/managing-user-data

create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,

  primary key (id)
);

alter table public.profiles enable row level security;

-- Datenbank trigger definieren, der immer im Hintergrund automatisch, wenn ich die Registrierung aufrufe in die zweite Tabelle Profiles die Zusatzdaten schreibt
-- wir legen einmal an und müssen ergänzen, falls es zusätzliche Felder gibt
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
-- falls wir weitere Felder hinzufügen wollen, hier Namen der Spalten mit Komma ergänzen
  insert into public.profiles (id, first_name, last_name)
 --  hier die Werte ergänzen
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


