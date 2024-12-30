/*
  # Places and Votes Schema

  1. New Tables
    - `places`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `state` (text)
      - `city` (text)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)
    - `votes`
      - `id` (uuid, primary key)
      - `place_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Places table
CREATE TABLE IF NOT EXISTS places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  state text NOT NULL,
  city text NOT NULL,
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Places are viewable by everyone"
  ON places FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own places"
  ON places FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES places(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(place_id, user_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all votes"
  ON votes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can vote once per place"
  ON votes FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (
      SELECT 1 FROM votes
      WHERE place_id = votes.place_id AND user_id = auth.uid()
    )
  );