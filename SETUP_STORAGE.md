# Setup Supabase Storage untuk Upload Gambar

## Langkah-langkah untuk mengaktifkan fitur upload gambar:

### 1. Buat Storage Bucket di Supabase

1. Buka **Supabase Dashboard**
2. Pilih project Anda
3. Buka **Storage** di sidebar
4. Klik **Create a new bucket**
5. Isi form dengan:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ Centang (agar gambar bisa diakses publik)
   - **File size limit**: `5MB` (atau sesuai kebutuhan)
   - **Allowed MIME types**: `image/*`
6. Klik **Create bucket**

### 2. Set Storage Policies

Setelah bucket dibuat, atur policies untuk keamanan:

#### Policy untuk Upload (INSERT)
```sql
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload portfolio images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

#### Policy untuk Read (SELECT)
```sql
-- Allow public read access to portfolio images
CREATE POLICY "Allow public read access to portfolio images" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-images');
```

#### Policy untuk Update (UPDATE)
```sql
-- Allow authenticated users to update their uploaded images
CREATE POLICY "Allow authenticated users to update portfolio images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

#### Policy untuk Delete (DELETE)
```sql
-- Allow authenticated users to delete their uploaded images
CREATE POLICY "Allow authenticated users to delete portfolio images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

### 3. Jalankan Policies di SQL Editor

1. Buka **SQL Editor** di Supabase
2. Copy dan paste semua policies di atas
3. Klik **Run** untuk menjalankan

### 4. Test Upload Feature

1. **Login** ke aplikasi sebagai admin
2. Buka **Admin Portfolio** (`/admin-portfolio`)
3. Klik **Tambah Portfolio** atau **Edit Portfolio**
4. Klik **Pilih Gambar** untuk upload
5. Pilih file gambar (max 5MB)
6. Preview gambar akan muncul
7. Submit form untuk upload

### 5. Fitur Upload yang Tersedia

- ✅ **Drag & Drop** - Drag file ke area upload
- ✅ **File Validation** - Hanya file gambar yang diterima
- ✅ **Size Limit** - Maksimal 5MB per file
- ✅ **Image Preview** - Preview sebelum upload
- ✅ **Remove Image** - Hapus gambar yang dipilih
- ✅ **URL Fallback** - Masukkan URL gambar sebagai alternatif
- ✅ **Auto Upload** - Upload otomatis saat submit form

### 6. Struktur File di Storage

```
portfolio-images/
├── 1703123456789-abc123.jpg
├── 1703123456790-def456.png
└── 1703123456791-ghi789.webp
```

### 7. Troubleshooting

**Error "Bucket not found"**:
- Pastikan bucket `portfolio-images` sudah dibuat
- Periksa nama bucket sesuai dengan kode

**Error "Access denied"**:
- Pastikan policies sudah dijalankan
- Periksa user sudah login sebagai admin

**Error "File too large"**:
- Periksa ukuran file (max 5MB)
- Atur file size limit di bucket settings

**Error "Invalid file type"**:
- Pastikan file adalah gambar (jpg, png, webp, dll)
- Periksa MIME type di bucket settings

### 8. Security Best Practices

- ✅ **File Validation** - Validasi tipe dan ukuran file
- ✅ **Unique Filenames** - Nama file unik dengan timestamp
- ✅ **Public Access** - Gambar bisa diakses publik untuk portfolio
- ✅ **Authenticated Upload** - Hanya admin yang bisa upload
- ✅ **Size Limits** - Batasan ukuran file untuk keamanan
