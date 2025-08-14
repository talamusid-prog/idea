-- Script untuk menambahkan kolom views ke tabel blog_posts yang sudah ada
-- Jalankan script ini di SQL Editor di dashboard Supabase jika tabel sudah ada

-- Tambah kolom views jika belum ada
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Buat function untuk increment views
CREATE OR REPLACE FUNCTION increment_views(post_id UUID)
RETURNS INTEGER AS $$
BEGIN
    UPDATE blog_posts 
    SET views = COALESCE(views, 0) + 1 
    WHERE id = post_id;
    
    RETURN (SELECT views FROM blog_posts WHERE id = post_id);
END;
$$ LANGUAGE plpgsql;

-- Update semua post yang sudah ada dengan views = 0 jika NULL
UPDATE blog_posts 
SET views = 0 
WHERE views IS NULL;

-- Verifikasi perubahan
SELECT id, title, views FROM blog_posts LIMIT 5;
