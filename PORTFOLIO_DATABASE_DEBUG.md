# Debug Portfolio Database Issue

## Masalah yang Ditemukan

Berdasarkan log yang diberikan, masalahnya adalah:

1. ✅ **Upload gambar berhasil** - gambar tersimpan di localStorage
2. ✅ **Data portfolio tersimpan** - dengan featured_image yang benar
3. ❌ **Data tidak tersimpan ke database** - ketika di-load ulang, featured_image = null

## Langkah Testing

### 1. Test Upload Portfolio Baru
1. Buka halaman admin portfolio: `http://localhost:8080/admin-portfolio`
2. Klik "Tambah Portofolio"
3. Isi form dengan data lengkap termasuk upload gambar
4. Klik "Simpan Portofolio"
5. Perhatikan log di console

### 2. Test Update Portfolio Existing
1. Klik tombol "Edit" pada portfolio yang sudah ada
2. Upload gambar baru
3. Klik "Update Portofolio"
4. Perhatikan log di console

### 3. Log yang Harus Diperhatikan

#### Saat Upload Portfolio Baru:
```
🚀 Memulai proses penyimpanan portofolio...
📝 Data portofolio yang akan disimpan: {...}
🖼️ Featured image yang akan disimpan: portfolio-image-xxx
🔍 Tipe data featured_image: string
✅ Portofolio berhasil disimpan dengan slug: xxx
📊 Data yang dikembalikan dari database: [...]
🖼️ Featured image di database: portfolio-image-xxx
```

#### Saat Update Portfolio:
```
🔄 Memulai update portfolio dengan slug: xxx
📝 Data yang akan diupdate: {...}
🖼️ Featured image yang akan diupdate: portfolio-image-xxx
✅ Portfolio berhasil diupdate
📊 Data yang dikembalikan setelah update: [...]
🖼️ Featured image setelah update: portfolio-image-xxx
```

#### Saat Load Portfolio:
```
🔍 Mengambil data portfolio dari database...
📊 Data portfolio dari database: [...]
📋 Portfolio 1 (Title): {id: 'xxx', featured_image: 'portfolio-image-xxx', hasFeaturedImage: true}
```

## Kemungkinan Penyebab

1. **RLS Policy Issue** - Policy INSERT/UPDATE tidak mengizinkan update field featured_image
2. **Database Schema Issue** - Field featured_image tidak ada atau tipe datanya salah
3. **Supabase Client Issue** - Masalah dengan konfigurasi client

## Troubleshooting

### 1. Cek Database Schema
```sql
-- Cek struktur tabel portfolios
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'portfolios';

-- Cek data portfolio terbaru
SELECT id, title, featured_image, created_at 
FROM portfolios 
ORDER BY created_at DESC 
LIMIT 5;
```

### 2. Cek RLS Policies
```sql
-- Cek policy yang ada
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'portfolios';
```

### 3. Test Manual Insert/Update
```sql
-- Test insert manual
INSERT INTO portfolios (title, description, client, category, technologies, featured_image, status, featured, slug, created_at, updated_at)
VALUES ('Test Portfolio', 'Test Description', 'Test Client', 'Test Category', ARRAY['React'], 'portfolio-image-test', 'published', false, 'test-portfolio', NOW(), NOW());

-- Test update manual
UPDATE portfolios 
SET featured_image = 'portfolio-image-updated' 
WHERE slug = 'test-portfolio';
```

## Solusi yang Akan Dicoba

1. **Tambahkan logging detail** untuk melihat apakah data benar-benar dikirim ke database
2. **Cek RLS policies** dan pastikan policy INSERT/UPDATE sudah benar
3. **Test manual** insert/update di Supabase SQL Editor
4. **Verifikasi schema** database apakah field featured_image sudah ada

## Expected Result

Setelah testing, seharusnya:
- Data featured_image tersimpan ke database dengan benar
- Ketika portfolio di-load ulang, featured_image tidak null
- Thumbnail portfolio tampil di halaman admin dan home
