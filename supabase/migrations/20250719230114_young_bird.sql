/*
  # Create payment codes table for admin-generated codes

  1. New Tables
    - `payment_codes`
      - `id` (uuid, primary key)
      - `code` (text, unique) - The payment code
      - `stripe_price_id` (text) - Associated Stripe price ID
      - `price` (numeric) - Price in dollars
      - `description` (text) - Service description
      - `used` (boolean) - Whether code has been used
      - `used_by` (uuid) - User who used the code
      - `used_at` (timestamp) - When code was used
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `payment_codes` table
    - Add policies for authenticated users to read codes
    - Add policies for service role to manage codes
*/

CREATE TABLE IF NOT EXISTS payment_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  stripe_price_id text NOT NULL,
  price numeric(10,2) NOT NULL,
  description text NOT NULL,
  used boolean DEFAULT false,
  used_by uuid REFERENCES auth.users(id),
  used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payment_codes ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read payment codes
CREATE POLICY "Users can read payment codes"
  ON payment_codes
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role to manage payment codes (for admin functions)
CREATE POLICY "Service role can manage payment codes"
  ON payment_codes
  FOR ALL
  TO service_role
  USING (true);

-- Create index for faster code lookups
CREATE INDEX IF NOT EXISTS idx_payment_codes_code ON payment_codes(code);
CREATE INDEX IF NOT EXISTS idx_payment_codes_used ON payment_codes(used);