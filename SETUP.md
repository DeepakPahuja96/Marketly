# Marketly Setup Instructions

## Phase 1: Supabase Authentication Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

### 2. Set up Database Schema
Run the following SQL in your Supabase SQL Editor:

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price_tokens integer not null check (price_tokens > 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance integer not null default 500,
  updated_at timestamptz default now()
);

create table token_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  delta integer not null,
  reason text not null,
  reference_id text,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  product_id uuid not null references products(id),
  price_tokens integer not null,
  status text not null default 'completed',
  created_at timestamptz default now()
);

create table payments (
  id text primary key,
  user_id uuid not null references auth.users(id),
  amount_cents integer not null,
  tokens_credited integer not null,
  status text not null,
  created_at timestamptz default now()
);
```

### 3. Configure Environment Variables
1. Create a `.env.local` file in the project root
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

### 4. Configure Supabase Auth
1. In your Supabase dashboard, go to Authentication > Settings
2. Set the Site URL to: `http://localhost:3000`
3. Add redirect URLs:
   - `http://localhost:3000/reset-password/confirm`

### 5. Test the Application
1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Try signing up with a new account
4. Check that the user gets 500 tokens automatically

## What's Implemented

✅ **Authentication System:**
- Email/password signup with automatic wallet creation (500 tokens)
- Login functionality
- Password reset via email
- Server-side session management
- Protected routes with middleware

✅ **Database Integration:**
- Full database schema with relationships
- User profiles and roles
- Wallet system with token balance
- Transaction tracking
- Order and payment tables (ready for future phases)

✅ **UI Updates:**
- Real authentication state in Navbar
- Dynamic token balance display
- Error and success message handling
- Server-side data fetching in account page

## Next Steps
- Phase 2: Product management and display
- Phase 3: Token-based purchasing system
- Phase 4: Admin panel functionality
- Phase 5: Stripe integration for token purchases
