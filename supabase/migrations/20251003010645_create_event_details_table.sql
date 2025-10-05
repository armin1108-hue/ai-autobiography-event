/*
  # Create event details table

  1. New Tables
    - `event_details`
      - `id` (uuid, primary key)
      - `schedule` (text) - 행사 일정
      - `location` (text) - 장소
      - `materials` (text) - 준비물
      - `cost` (text) - 비용
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `event_details` table
    - Add policy for public read access
    - Add policy for authenticated admin updates (for now, any authenticated user can update)
  
  3. Initial Data
    - Insert default event details row
*/

CREATE TABLE IF NOT EXISTS event_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule text DEFAULT '',
  location text DEFAULT '',
  materials text DEFAULT '',
  cost text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read event details"
  ON event_details
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update event details"
  ON event_details
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert event details"
  ON event_details
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO event_details (id, schedule, location, materials, cost)
VALUES ('00000000-0000-0000-0000-000000000001', '매주 토요일 오후 2-5시', '온라인 ZOOM', '노트북 또는 스마트폰, 필기도구', '30만원 (조기등록 시 20% 할인)')
ON CONFLICT (id) DO NOTHING;
