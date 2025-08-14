-- Script untuk setup database blog di Supabase
-- Jalankan script ini di SQL Editor di dashboard Supabase

-- Buat tabel blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image TEXT,
    author VARCHAR(100) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    views INTEGER DEFAULT 0
);

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Buat policy untuk membaca artikel yang dipublikasikan (public access)
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
CREATE POLICY "Public can view published posts" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Buat policy untuk admin (jika menggunakan auth)
-- CREATE POLICY "Admin can manage all posts" ON blog_posts
--     FOR ALL USING (auth.role() = 'admin');

-- Insert sample data (opsional) - hanya jika belum ada data
INSERT INTO blog_posts (title, content, excerpt, slug, author, status, tags) 
SELECT * FROM (VALUES
(
    'Tips Membuat Website yang SEO Friendly',
    'Membuat website yang SEO friendly adalah langkah penting untuk meningkatkan visibilitas online Anda. Berikut adalah beberapa tips yang bisa Anda terapkan:

1. Optimasi Struktur URL
Pastikan URL website Anda bersih dan mudah dipahami. Gunakan kata kunci yang relevan dalam URL.

2. Meta Tags yang Optimal
Buat meta title dan meta description yang menarik dan mengandung kata kunci target.

3. Konten Berkualitas
Buat konten yang informatif, original, dan memberikan nilai tambah bagi pengunjung.

4. Optimasi Gambar
Gunakan alt text yang deskriptif dan kompres gambar untuk loading yang lebih cepat.

5. Mobile Friendly
Pastikan website Anda responsive dan berfungsi dengan baik di perangkat mobile.

6. Kecepatan Loading
Optimasi kecepatan website dengan kompresi gambar, caching, dan minifikasi CSS/JS.

7. Internal Linking
Gunakan internal linking untuk membantu pengunjung dan search engine memahami struktur website.

8. Schema Markup
Implementasikan schema markup untuk membantu search engine memahami konten Anda.

Dengan menerapkan tips-tips di atas, website Anda akan lebih mudah ditemukan di search engine dan memberikan pengalaman yang lebih baik bagi pengunjung.',
    'Pelajari cara membuat website yang SEO friendly dengan tips-tips praktis yang bisa langsung diterapkan untuk meningkatkan ranking di search engine.',
    'tips-membuat-website-seo-friendly',
    'Tim WebCraft Pro',
    'published',
    ARRAY['SEO', 'Website', 'Tips', 'Digital Marketing']
),
(
    'Perbedaan Website Statis vs Dinamis',
    'Website statis dan dinamis memiliki karakteristik yang berbeda dan masing-masing memiliki kelebihan dan kekurangan. Mari kita bahas perbedaannya:

WEBSITE STATIS
- Konten tetap dan tidak berubah
- Lebih cepat loading
- Lebih aman dari serangan
- Biaya hosting lebih murah
- Cocok untuk portfolio, landing page, atau website sederhana

KELEBIHAN:
- Performa sangat cepat
- Keamanan tinggi
- Mudah di-deploy
- Biaya rendah

KEKURANGAN:
- Sulit untuk update konten
- Tidak ada fitur interaktif
- Terbatas fungsionalitas

WEBSITE DINAMIS
- Konten dapat berubah berdasarkan database
- Memiliki fitur interaktif
- Dapat diupdate melalui CMS
- Cocok untuk e-commerce, blog, atau aplikasi web

KELEBIHAN:
- Mudah update konten
- Fitur interaktif
- Fungsionalitas luas
- User experience yang baik

KEKURANGAN:
- Loading lebih lambat
- Lebih rentan terhadap serangan
- Biaya hosting lebih tinggi
- Lebih kompleks dalam maintenance

PILIHAN YANG TEPAT
Pilih website statis jika:
- Konten jarang berubah
- Fokus pada kecepatan
- Budget terbatas
- Website sederhana

Pilih website dinamis jika:
- Konten sering berubah
- Butuh fitur interaktif
- Ada sistem user
- Website kompleks',
    'Pahami perbedaan website statis dan dinamis untuk memilih solusi yang tepat sesuai kebutuhan bisnis Anda.',
    'perbedaan-website-statis-vs-dinamis',
    'Tim WebCraft Pro',
    'published',
    ARRAY['Website', 'Development', 'Teknologi', 'Tips']
),
(
    'Mengapa Website Responsive Penting di Era Mobile',
    'Di era digital saat ini, lebih dari 60% traffic internet berasal dari perangkat mobile. Hal ini membuat website responsive menjadi sangat penting. Berikut alasan mengapa:

1. User Experience yang Lebih Baik
Website responsive memberikan pengalaman yang optimal di semua perangkat, baik desktop, tablet, maupun smartphone.

2. SEO yang Lebih Baik
Google menggunakan mobile-first indexing, yang berarti website yang mobile-friendly akan mendapat ranking yang lebih baik.

3. Tingkat Bounce Rate yang Lebih Rendah
Pengguna cenderung meninggalkan website yang tidak responsive, yang dapat meningkatkan bounce rate.

4. Konversi yang Lebih Tinggi
Website responsive dapat meningkatkan conversion rate karena pengguna merasa nyaman mengakses website Anda.

5. Competitive Advantage
Website responsive memberikan keunggulan kompetitif dibandingkan kompetitor yang belum responsive.

BEST PRACTICES WEBSITE RESPONSIVE:
- Gunakan CSS Grid dan Flexbox
- Implementasikan mobile-first design
- Optimasi gambar untuk mobile
- Gunakan font yang readable di mobile
- Pastikan touch targets cukup besar
- Test di berbagai perangkat

IMPLEMENTASI:
- Gunakan media queries
- Flexible images dan media
- Responsive typography
- Touch-friendly navigation
- Optimasi loading speed

Dengan website responsive, Anda tidak hanya memberikan pengalaman yang lebih baik bagi pengguna, tetapi juga meningkatkan performa website di search engine.',
    'Pelajari pentingnya website responsive di era mobile dan bagaimana implementasinya untuk meningkatkan user experience dan SEO.',
    'mengapa-website-responsive-penting-era-mobile',
         'Tim WebCraft Pro',
     'published',
     ARRAY['Responsive Design', 'Mobile', 'UX', 'SEO']
 )) AS new_data(title, content, excerpt, slug, author, status, tags)
WHERE NOT EXISTS (
    SELECT 1 FROM blog_posts WHERE slug = new_data.slug
);

-- Buat trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

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
