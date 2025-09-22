# Setup Blog dengan Supabase

## **Langkah-langkah Setup Database**

### **1. Setup Supabase Database**
1. Buka dashboard Supabase Anda: https://app.supabase.com
2. Pilih project Anda
3. Buka **SQL Editor**
4. Copy dan paste seluruh isi file `database_setup.sql`
5. Jalankan script tersebut

### **2. Verifikasi Setup**
Setelah menjalankan script, Anda akan memiliki:
- ✅ Tabel `blog_posts` dengan struktur yang lengkap
- ✅ Index untuk performa optimal
- ✅ Row Level Security (RLS) untuk keamanan
- ✅ Policy untuk akses publik ke artikel yang dipublikasikan
- ✅ Sample data (3 artikel contoh)
- ✅ Trigger untuk auto-update `updated_at`

## **Fitur Blog yang Tersedia**

### **1. Blog List Component (`src/components/Blog.tsx`)**
- ✅ **Daftar Artikel**: Menampilkan semua artikel yang dipublikasikan
- ✅ **Search**: Pencarian berdasarkan judul, excerpt, dan tags
- ✅ **Responsive Grid**: Layout yang responsive untuk desktop dan mobile
- ✅ **Loading State**: Indikator loading saat memuat data
- ✅ **Empty State**: Pesan ketika tidak ada artikel
- ✅ **Meta Info**: Menampilkan penulis dan tanggal publikasi
- ✅ **Tags**: Menampilkan tags artikel dengan badge
- ✅ **Featured Image**: Gambar utama artikel (opsional)

### **2. Blog Editor Component (`src/components/BlogEditor.tsx`)**
- ✅ **Create Mode**: Membuat artikel baru
- ✅ **Edit Mode**: Mengedit artikel yang sudah ada
- ✅ **Preview Mode**: Preview artikel sebelum publish
- ✅ **Auto Slug**: Generate slug otomatis dari judul
- ✅ **Tags Management**: Tambah/hapus tags
- ✅ **Status Management**: Draft atau Published
- ✅ **Form Validation**: Validasi field yang required
- ✅ **Rich Text**: Textarea untuk konten artikel

### **3. Blog Service (`src/lib/blogService.ts`)**
- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **Search**: Pencarian artikel
- ✅ **Filter by Tags**: Filter artikel berdasarkan tags
- ✅ **Error Handling**: Error handling yang robust
- ✅ **TypeScript Support**: Type safety dengan TypeScript

## **Struktur Database**

### **Tabel: blog_posts**
```sql
- id (UUID, Primary Key)
- title (VARCHAR, Required)
- content (TEXT, Required)
- excerpt (TEXT, Required)
- slug (VARCHAR, Unique, Required)
- featured_image (TEXT, Optional)
- author (VARCHAR, Required)
- published_at (TIMESTAMP, Optional)
- created_at (TIMESTAMP, Auto)
- updated_at (TIMESTAMP, Auto)
- tags (TEXT[], Array)
- status (VARCHAR, 'draft' | 'published')
```

## **Cara Menggunakan**

### **1. Menampilkan Blog di Website**
Blog component sudah ditambahkan ke halaman utama dan menu header. Artikel akan otomatis dimuat dari Supabase.

### **2. Membuat Artikel Baru**
```tsx
import BlogEditor from "@/components/BlogEditor";

// Untuk membuat artikel baru
<BlogEditor 
  onSave={(post) => {
    console.log('Artikel berhasil dibuat:', post);
    // Refresh blog list atau redirect
  }}
  onCancel={() => {
    // Handle cancel action
  }}
/>
```

### **3. Mengedit Artikel**
```tsx
// Untuk mengedit artikel yang sudah ada
<BlogEditor 
  post={existingPost}
  onSave={(post) => {
    console.log('Artikel berhasil diupdate:', post);
  }}
  onCancel={() => {
    // Handle cancel action
  }}
/>
```

### **4. Menggunakan Blog Service**
```tsx
import { 
  getPublishedPosts, 
  createPost, 
  updatePost, 
  deletePost,
  searchPosts,
  getPostsByTag 
} from "@/lib/blogService";

// Get all published posts
const posts = await getPublishedPosts();

// Create new post
const newPost = await createPost({
  title: "Judul Artikel",
  content: "Konten artikel...",
  excerpt: "Ringkasan artikel...",
  slug: "judul-artikel",
  author: "Penulis",
  status: "published",
  tags: ["tag1", "tag2"]
});

// Search posts
const searchResults = await searchPosts("keyword");

// Get posts by tag
const taggedPosts = await getPostsByTag("SEO");
```

## **Keamanan**

### **Row Level Security (RLS)**
- ✅ **Public Read**: Semua orang bisa membaca artikel yang dipublikasikan
- ✅ **Admin Write**: Hanya admin yang bisa create/update/delete (perlu setup auth)

### **Data Validation**
- ✅ **Required Fields**: Title, content, excerpt, slug, author wajib diisi
- ✅ **Unique Slug**: Slug harus unik untuk setiap artikel
- ✅ **Status Validation**: Status hanya bisa 'draft' atau 'published'

## **Performance Optimization**

### **Database Indexes**
- ✅ **Status Index**: Untuk filter artikel yang dipublikasikan
- ✅ **Slug Index**: Untuk pencarian artikel berdasarkan slug
- ✅ **Published At Index**: Untuk sorting berdasarkan tanggal
- ✅ **Tags Index**: Untuk pencarian berdasarkan tags

### **Frontend Optimization**
- ✅ **Lazy Loading**: Load artikel saat dibutuhkan
- ✅ **Search Debouncing**: Optimasi pencarian
- ✅ **Responsive Images**: Optimasi gambar untuk mobile

## **Troubleshooting**

### **Error: "relation 'blog_posts' does not exist"**
- Pastikan script SQL sudah dijalankan di Supabase SQL Editor
- Cek apakah tabel sudah terbuat di Table Editor

### **Error: "permission denied"**
- Cek Row Level Security policy
- Pastikan policy untuk SELECT sudah dibuat

### **Artikel tidak muncul**
- Cek status artikel (harus 'published')
- Cek apakah ada error di console browser
- Cek network tab untuk error API

### **Search tidak berfungsi**
- Pastikan index untuk tags sudah dibuat
- Cek query search di blogService.ts

## **Next Steps**

### **Fitur yang Bisa Ditambahkan**
1. **Authentication**: Login system untuk admin
2. **Image Upload**: Upload gambar ke Supabase Storage
3. **Rich Text Editor**: WYSIWYG editor untuk konten
4. **Categories**: Kategori artikel
5. **Comments**: Sistem komentar
6. **Analytics**: Tracking views dan engagement
7. **SEO**: Meta tags dan schema markup
8. **Pagination**: Load more atau pagination
9. **Related Posts**: Artikel terkait
10. **Social Sharing**: Share ke social media

### **Deployment**
1. Setup environment variables untuk production
2. Configure CORS di Supabase
3. Setup custom domain (jika ada)
4. Optimize images dan assets
5. Setup monitoring dan analytics
