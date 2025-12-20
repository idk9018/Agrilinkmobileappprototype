-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Market Prices Table
create table market_prices (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  unit text not null,
  change_percentage numeric not null,
  best_time text,
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table market_prices enable row level security;

-- Policies
create policy "Public prices are viewable by everyone." on market_prices
  for select using (true);

-- Seed Data (Initial Population)
insert into market_prices (name, price, unit, change_percentage, best_time) values
('Maize', 245000, 'per ton', 12, 'November - January'),
('Rice (Paddy)', 320000, 'per ton', -5, 'September - November'),
('Cassava', 85000, 'per ton', 8, 'December - February'),
('Yam', 180000, 'per ton', 15, 'August - October'),
('Tomatoes', 45000, 'per basket', -8, 'March - May'),
('Pepper', 35000, 'per basket', 20, 'Year-round (Peak: Dec-Feb)');
