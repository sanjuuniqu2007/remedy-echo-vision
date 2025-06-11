
-- Create profiles table for user data
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  primary key (id)
);

-- Enable RLS on profiles table
alter table public.profiles enable row level security;

-- Create policy for users to only see their own profile
create policy "Users can view own profile" 
  on profiles for select 
  using (auth.uid() = id);

-- Create policy for users to update their own profile
create policy "Users can update own profile" 
  on profiles for update 
  using (auth.uid() = id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

-- Create trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create symptoms table for storing user symptom analysis
create table public.symptoms (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  condition text not null,
  remedy text not null,
  urgency text not null check (urgency in ('Low', 'Medium', 'High')),
  explanation text not null,
  seek_medical_attention boolean default false,
  image_url text,
  voice_input text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on symptoms table
alter table public.symptoms enable row level security;

-- Create policy for users to only see their own symptoms
create policy "Users can view own symptoms" 
  on symptoms for select 
  using (auth.uid() = user_id);

-- Create policy for users to insert their own symptoms
create policy "Users can insert own symptoms" 
  on symptoms for insert 
  with check (auth.uid() = user_id);

-- Create policy for users to update their own symptoms
create policy "Users can update own symptoms" 
  on symptoms for update 
  using (auth.uid() = user_id);

-- Create policy for users to delete their own symptoms
create policy "Users can delete own symptoms" 
  on symptoms for delete 
  using (auth.uid() = user_id);
