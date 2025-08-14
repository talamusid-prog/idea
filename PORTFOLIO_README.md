# Fitur Portofolio - Dokumentasi

## Overview
Fitur portofolio memungkinkan admin untuk mengelola proyek-proyek yang telah dikerjakan dan menampilkannya kepada pengunjung website. Fitur ini terdiri dari halaman admin untuk mengelola portofolio dan halaman publik untuk menampilkan portofolio.

## Struktur Database

### Tabel `portfolios`
```sql
CREATE TABLE portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  featured_image TEXT,
  client VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT false
);
```

## Setup Database

1. Buka Supabase Dashboard
2. Masuk ke SQL Editor
3. Jalankan script dari file `database/portfolios.sql`
4. Script akan membuat tabel, index, policies, dan sample data

## Halaman yang Tersedia

### 1. Admin Portofolio (`/admin-portfolio`)
- **Fitur:**
  - Melihat semua portofolio (draft dan published)
  - Menambah portofolio baru
  - Edit portofolio existing
  - Hapus portofolio
  - Toggle status draft/published
  - Toggle featured/unfeatured

- **Cara Akses:**
  - Login ke admin panel (`/admin`)
  - Klik menu "Portofolio" di sidebar

### 2. Halaman Portofolio Publik (`/portfolio`)
- **Fitur:**
  - Menampilkan semua portofolio yang published
  - Search dan filter berdasarkan kategori
  - Card yang bisa diklik untuk melihat detail
  - Link langsung ke demo dan source code

- **Cara Akses:**
  - Klik menu "Portofolio" di header website
  - Atau langsung ke `/portfolio`

### 3. Detail Portofolio (`/portfolio/:slug`)
- **Fitur:**
  - Menampilkan detail lengkap portofolio
  - Sidebar dengan portofolio unggulan
  - Portofolio terkait berdasarkan kategori/teknologi
  - Link ke demo dan source code
  - Breadcrumb navigation

## Cara Menggunakan

### Menambah Portofolio Baru
1. Login ke admin panel
2. Klik menu "Portofolio"
3. Klik tombol "Tambah Portofolio"
4. Isi form dengan data:
   - **Judul Proyek** (wajib)
   - **Deskripsi** (wajib)
   - **Client** (wajib)
   - **Kategori** (wajib)
   - **URL Gambar** (opsional)
   - **URL Proyek** (opsional)
   - **URL GitHub** (opsional)
   - **Teknologi** (tambah satu per satu)
   - **Status** (draft/published)
   - **Featured** (ya/tidak)
5. Klik "Simpan Portofolio"

### Edit Portofolio
1. Di halaman admin portofolio
2. Klik tombol "Edit" pada card portofolio
3. Ubah data yang diperlukan
4. Klik "Update Portofolio"

### Hapus Portofolio
1. Di halaman admin portofolio
2. Klik tombol "Hapus" (icon trash) pada card portofolio
3. Konfirmasi penghapusan

## Field Deskripsi

### Title
Judul proyek portofolio. Akan digunakan untuk generate slug otomatis.

### Description
Deskripsi lengkap proyek. Bisa berisi detail fitur, teknologi, dan hasil yang dicapai.

### Client
Nama klien atau perusahaan yang menggunakan layanan.

### Category
Kategori proyek (contoh: Web Development, Mobile Development, UI/UX Design).

### Technologies
Array teknologi yang digunakan dalam proyek. Bisa ditambah satu per satu.

### Project URL
Link ke demo atau website proyek yang sudah live.

### GitHub URL
Link ke repository source code (jika open source).

### Featured Image
URL gambar yang akan ditampilkan sebagai thumbnail.

### Status
- **Draft**: Portofolio belum dipublikasikan (hanya admin yang bisa lihat)
- **Published**: Portofolio sudah dipublikasikan (semua orang bisa lihat)

### Featured
Portofolio yang ditandai sebagai featured akan ditampilkan di sidebar dan mendapat badge khusus.

## Routing

```typescript
// Admin routes
/admin-portfolio - Halaman admin untuk mengelola portofolio

// Public routes  
/portfolio - Halaman utama portofolio
/portfolio/:slug - Detail portofolio berdasarkan slug
```

## Service Functions

### `portfolioService.ts`
File ini berisi semua fungsi untuk berinteraksi dengan database:

- `getAllPortfolios()` - Ambil semua portofolio (admin)
- `getPublishedPortfolios()` - Ambil portofolio yang published
- `getPortfolioBySlug(slug)` - Ambil portofolio berdasarkan slug
- `createPortfolioWithSlug(data)` - Buat portofolio baru dengan slug otomatis
- `updatePortfolioBySlug(slug, data)` - Update portofolio
- `deletePortfolio(id)` - Hapus portofolio
- `getFeaturedPortfolios(limit)` - Ambil portofolio featured
- `getPortfoliosByCategory(category)` - Ambil portofolio berdasarkan kategori

## Komponen yang Digunakan

### Admin
- `AdminPortfolio.tsx` - Halaman admin untuk mengelola portofolio

### Public
- `Portfolio.tsx` - Halaman utama portofolio
- `PortfolioDetail.tsx` - Halaman detail portofolio

## Styling

Semua komponen menggunakan Tailwind CSS dengan tema yang konsisten dengan aplikasi utama. Warna dan styling mengikuti design system yang sudah ada.

## Keamanan

- Row Level Security (RLS) diaktifkan di database
- Hanya admin yang bisa CRUD portofolio
- Public hanya bisa read portofolio yang published
- Validasi input di frontend dan backend

## Troubleshooting

### Portofolio tidak muncul
1. Pastikan status = 'published'
2. Cek console browser untuk error
3. Pastikan database connection berfungsi

### Error saat save
1. Pastikan semua field wajib terisi
2. Cek format URL (harus valid)
3. Pastikan slug unik (tidak ada duplikat)

### Gambar tidak muncul
1. Pastikan URL gambar valid dan bisa diakses
2. Cek apakah gambar menggunakan HTTPS
3. Pastikan gambar tidak terlalu besar

## Sample Data

Script SQL sudah menyertakan 5 sample portofolio yang bisa digunakan sebagai contoh atau testing.
