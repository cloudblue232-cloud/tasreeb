-- ============================================================
-- كشف التسربات والعزل بالسعودية — Supabase Schema
-- ============================================================
-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New Query

-- ============================================================
-- 1. ARTICLES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  content     TEXT NOT NULL,
  image_url   TEXT,
  meta_title  TEXT,
  meta_description TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 2. SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image_url   TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ============================================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS POLICIES: ARTICLES
-- ============================================================

-- Public can read articles
CREATE POLICY "articles_select_public"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admin can insert
CREATE POLICY "articles_insert_admin"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated admin can update
CREATE POLICY "articles_update_admin"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete
CREATE POLICY "articles_delete_admin"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- 5. RLS POLICIES: SERVICES
-- ============================================================

-- Public can read services
CREATE POLICY "services_select_public"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admin can insert
CREATE POLICY "services_insert_admin"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated admin can update
CREATE POLICY "services_update_admin"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete
CREATE POLICY "services_delete_admin"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- 6. STORAGE BUCKET SETUP
-- Run this after creating the "uploads" bucket in Dashboard
-- Dashboard → Storage → New Bucket → Name: "uploads" → Public: YES
-- ============================================================

-- Allow public to read from uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "uploads_read_public"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'uploads');

CREATE POLICY "uploads_insert_admin"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "uploads_update_admin"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'uploads');

CREATE POLICY "uploads_delete_admin"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'uploads');
