-- Fix RLS Policies untuk admin panel
-- Jalankan script ini di SQL Editor di dashboard Supabase

-- Hapus policy yang ada (jika ada)
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can manage all posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for all users" ON blog_posts;

-- Buat policy untuk membaca artikel yang dipublikasikan (public access)
CREATE POLICY "Public can view published posts" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Buat policy untuk INSERT (membuat artikel baru)
CREATE POLICY "Enable insert for all users" ON blog_posts
    FOR INSERT WITH CHECK (true);

-- Buat policy untuk UPDATE (mengupdate artikel)
CREATE POLICY "Enable update for all users" ON blog_posts
    FOR UPDATE USING (true) WITH CHECK (true);

-- Buat policy untuk DELETE (menghapus artikel)
CREATE POLICY "Enable delete for all users" ON blog_posts
    FOR DELETE USING (true);

-- Atau jika ingin lebih aman, gunakan policy berdasarkan role (jika menggunakan auth)
-- CREATE POLICY "Admin can manage all posts" ON blog_posts
--     FOR ALL USING (auth.role() = 'authenticated');

-- Verifikasi policies yang dibuat
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'blog_posts';
