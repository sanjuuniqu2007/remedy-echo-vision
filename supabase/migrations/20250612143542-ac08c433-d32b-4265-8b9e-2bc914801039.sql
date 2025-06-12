
-- Create journal entries table
create table public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  symptoms text not null,
  medicines_taken text,
  effectiveness_rating integer check (effectiveness_rating >= 1 and effectiveness_rating <= 5),
  notes text,
  entry_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on journal entries table
alter table public.journal_entries enable row level security;

-- Create policies for journal entries
create policy "Users can view own journal entries" 
  on journal_entries for select 
  using (auth.uid() = user_id);

create policy "Users can insert own journal entries" 
  on journal_entries for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own journal entries" 
  on journal_entries for update 
  using (auth.uid() = user_id);

create policy "Users can delete own journal entries" 
  on journal_entries for delete 
  using (auth.uid() = user_id);

-- Create home remedies table (public data, no user-specific access needed)
create table public.home_remedies (
  id uuid default gen_random_uuid() primary key,
  category text not null check (category in ('Common Cold', 'Headache', 'Fever', 'Digestive Issues')),
  title text not null,
  ingredients text[] not null,
  preparation_steps text[] not null,
  precautions text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert some sample home remedies
insert into public.home_remedies (category, title, ingredients, preparation_steps, precautions) values
('Common Cold', 'Ginger Tea', 
 ARRAY['1 inch fresh ginger root', '1 cup water', '1 tbsp honey', '1 tbsp lemon juice'],
 ARRAY['Slice ginger root thinly', 'Boil water and add ginger slices', 'Simmer for 10-15 minutes', 'Strain and add honey and lemon juice'],
 ARRAY['Avoid if allergic to ginger', 'Consult doctor if symptoms persist beyond 7 days', 'Not recommended for children under 2 years']),

('Headache', 'Peppermint Oil Relief', 
 ARRAY['2-3 drops peppermint essential oil', '1 tbsp carrier oil (coconut or olive oil)'],
 ARRAY['Mix peppermint oil with carrier oil', 'Apply to temples and forehead', 'Massage gently in circular motions'],
 ARRAY['Avoid contact with eyes', 'Test on small skin area first', 'Do not use on children under 6 years']),

('Fever', 'Willow Bark Tea', 
 ARRAY['1 tsp dried willow bark', '1 cup boiling water', 'Honey to taste'],
 ARRAY['Steep willow bark in boiling water for 10 minutes', 'Strain the tea', 'Add honey if desired'],
 ARRAY['Do not use if allergic to aspirin', 'Consult doctor for high fever (over 103°F)', 'Not for children under 16 years']),

('Digestive Issues', 'Chamomile Tea', 
 ARRAY['1 chamomile tea bag or 1 tsp dried chamomile', '1 cup hot water', 'Honey (optional)'],
 ARRAY['Steep chamomile in hot water for 5-10 minutes', 'Remove tea bag or strain', 'Add honey if desired'],
 ARRAY['Avoid if allergic to ragweed family plants', 'May interact with blood thinners', 'Consult doctor if symptoms worsen']);
