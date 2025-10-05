/*
  # Create applicants table for AI Autobiography course

  1. New Tables
    - `applicants`
      - `id` (uuid, primary key)
      - `name` (text) - Applicant's name
      - `email` (text) - Applicant's email address
      - `phone` (text) - Applicant's phone number
      - `created_at` (timestamptz) - Timestamp of application submission

  2. Security
    - Enable RLS on `applicants` table
    - Add policy for anonymous users to insert their own applications
    - Add policy for viewing all records (for admin dashboard)
*/

CREATE TABLE IF NOT EXISTS applicants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON applicants
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view applications"
  ON applicants
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete applications"
  ON applicants
  FOR DELETE
  TO anon, authenticated
  USING (true);
