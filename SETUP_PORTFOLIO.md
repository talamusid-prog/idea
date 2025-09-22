# Setup Portfolio Database

## Langkah-langkah untuk mengaktifkan fitur Portfolio:

### 1. Jalankan Script SQL di Supabase

1. Buka **Supabase Dashboard**
2. Pilih project Anda
3. Buka **SQL Editor**
4. Copy dan paste isi file `database/portfolios.sql`
5. Klik **Run** untuk menjalankan script

### 2. Verifikasi Tabel Terbuat

Setelah menjalankan script, Anda akan memiliki:
- Tabel `portfolios` dengan struktur lengkap
- Row Level Security (RLS) policies
- Sample data untuk testing
- Indexes untuk performa optimal

### 3. Test Fitur Portfolio

1. **Admin Page**: Buka `/admin-portfolio` untuk mengelola portfolio
2. **Home Page**: Section portfolio akan menampilkan data dari database
3. **Portfolio Page**: Buka `/portfolio` untuk melihat semua portfolio
4. **Detail Page**: Klik portfolio untuk melihat detail di `/portfolio/:slug`

### 4. Struktur Data Portfolio

```sql
- id: UUID (Primary Key)
- title: String (Judul portfolio)
- description: Text (Deskripsi lengkap)
- slug: String (URL-friendly identifier)
- featured_image: String (URL gambar)
- client: String (Nama klien)
- category: String (Kategori portfolio)
- technologies: Array (Teknologi yang digunakan)
- project_url: String (URL live project)
- github_url: String (URL repository)
- status: 'draft' | 'published'
- featured: Boolean (Portfolio unggulan)
- created_at: Timestamp
- updated_at: Timestamp
```

### 5. Troubleshooting

Jika masih ada error 404:
1. Pastikan script SQL sudah dijalankan
2. Periksa RLS policies sudah aktif
3. Pastikan user sudah login untuk akses admin
4. Cek console browser untuk error detail

### 6. Sample Data

Script SQL sudah menyertakan sample data:
- E-Commerce Website
- Mobile Banking App  
- Company Profile Website

Anda bisa menambah, edit, atau hapus data melalui halaman admin.
