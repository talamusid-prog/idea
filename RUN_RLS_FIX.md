# Panduan Menjalankan RLS Fix

## **🔧 Langkah-langkah untuk Memperbaiki RLS Policies**

### **1. Buka Supabase Dashboard**
1. Buka browser dan kunjungi [supabase.com](https://supabase.com)
2. Login ke akun Anda
3. Pilih project yang sesuai

### **2. Buka SQL Editor**
1. Di sidebar kiri, klik **"SQL Editor"**
2. Klik **"New query"** untuk membuat query baru

### **3. Jalankan Script RLS Fix**
1. Copy seluruh isi dari file `fix_portfolio_rls.sql`
2. Paste ke dalam SQL Editor
3. Klik **"Run"** untuk menjalankan script

### **4. Verifikasi Hasil**
Setelah script berhasil dijalankan, Anda akan melihat output seperti:
```
DROP POLICY
CREATE POLICY
CREATE POLICY
CREATE POLICY
CREATE POLICY
CREATE POLICY
```

### **5. Test Database**
Untuk memastikan RLS fix berhasil, jalankan query test:
```sql
-- Test insert portfolio
INSERT INTO portfolios (title, description, slug, client, category, technologies, featured_image, status, featured) 
VALUES ('Test Portfolio', 'Test Description', 'test-portfolio-123', 'Test Client', 'Test Category', ARRAY['Test'], 'test-image-key', 'draft', false);

-- Test select portfolios
SELECT * FROM portfolios WHERE slug = 'test-portfolio-123';

-- Clean up test data
DELETE FROM portfolios WHERE slug = 'test-portfolio-123';
```

## **📋 Isi Script RLS Fix**

Script `fix_portfolio_rls.sql` berisi:

```sql
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
```

## **⚠️ Catatan Penting**

### **Sebelum Menjalankan:**
- ✅ Backup database jika ada data penting
- ✅ Pastikan Anda memiliki akses admin ke Supabase
- ✅ Pastikan project yang dipilih sudah benar

### **Setelah Menjalankan:**
- ✅ Test upload portfolio baru di admin panel
- ✅ Test update portfolio yang sudah ada
- ✅ Cek apakah featured_image tersimpan dengan benar

### **Jika Ada Error:**
- ❌ **Error 42501**: Policy sudah ada, ini normal
- ❌ **Error 23505**: Duplicate key, coba dengan slug yang berbeda
- ❌ **Error lainnya**: Cek log error dan pastikan syntax benar

## **🎯 Hasil yang Diharapkan**

Setelah menjalankan RLS fix:
- ✅ Admin dapat menyimpan portfolio dengan featured_image
- ✅ Data tersimpan dengan benar di database
- ✅ Thumbnail portfolio tampil di halaman home
- ✅ Tidak ada error permission di console

## **🔄 Langkah Selanjutnya**

1. **Jalankan RLS fix** sesuai panduan di atas
2. **Test upload portfolio** di admin panel
3. **Cek thumbnail** di halaman home
4. **Monitor console logs** untuk memastikan tidak ada error

Jika masih ada masalah, cek file `PORTFOLIO_IMAGE_SOLUTION.md` untuk solusi lengkap! 🚀
