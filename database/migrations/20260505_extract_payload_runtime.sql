ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS metadata jsonb;

CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  dodo_payment_id text NOT NULL UNIQUE,
  dodo_subscription_id text,
  customer_email text NOT NULL,
  product_name text,
  product_id text,
  amount numeric,
  currency text,
  status text NOT NULL,
  metadata jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
