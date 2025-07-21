/*
  # Add admin user management

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `created_by` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for admin users to read admin data
    - Add policy for service role to manage admin users
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(user_id)
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can read admin data
CREATE POLICY "Admin users can read admin data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Service role can manage admin users
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);