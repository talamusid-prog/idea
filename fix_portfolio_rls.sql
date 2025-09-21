-- Fix RLS Policies untuk tabel portfolios
-- Jalankan script ini di SQL Editor di dashboard Supabase

-- Hapus policy yang ada untuk tabel portfolios
DROP POLICY IF EXISTS "Allow public read access to published portfolios" ON portfolios;
DROP POLICY IF EXISTS "Allow authenticated users to read all portfolios" ON portfolios;
DROP POLICY IF EXISTS "Allow authenticated users to insert portfolios" ON portfolios;
DROP POLICY IF EXISTS "Allow authenticated users to update portfolios" ON portfolios;
DROP POLICY IF EXISTS "Allow authenticated users to delete portfolios" ON portfolios;

-- Buat policy untuk membaca portfolio yang dipublikasikan (public access)
CREATE POLICY "Allow public read access to published portfolios" ON portfolios
    FOR SELECT USING (status = 'published');

-- Buat policy untuk INSERT (membuat portfolio baru) - tanpa auth requirement
CREATE POLICY "Enable insert for all users" ON portfolios
    FOR INSERT WITH CHECK (true);

-- Buat policy untuk UPDATE (mengupdate portfolio) - tanpa auth requirement
CREATE POLICY "Enable update for all users" ON portfolios
    FOR UPDATE USING (true) WITH CHECK (true);

-- Buat policy untuk DELETE (menghapus portfolio) - tanpa auth requirement
CREATE POLICY "Enable delete for all users" ON portfolios
    FOR DELETE USING (true);

-- Buat policy untuk membaca semua portfolio (untuk admin) - tanpa auth requirement
CREATE POLICY "Enable read for all users" ON portfolios
    FOR SELECT USING (true);

-- Verifikasi policies yang dibuat
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'portfolios';

-- Test insert untuk memastikan policy berfungsi
-- INSERT INTO portfolios (title, description, slug, client, category, technologies, featured_image, status, featured) 
-- VALUES ('Test Portfolio', 'Test Description', 'test-portfolio', 'Test Client', 'Test Category', ARRAY['Test'], 'test-image-key', 'draft', false);
