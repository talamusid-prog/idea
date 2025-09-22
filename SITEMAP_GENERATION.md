# Sitemap Generation Guide

## Overview
Script ini digunakan untuk menggenerate sitemap XML secara dinamis dengan mengambil data blog posts dan portofolio dari database Supabase.

## Fitur
- ✅ **Dynamic Blog Posts**: Mengambil semua blog posts yang dipublikasikan
- ✅ **Dynamic Portfolios**: Mengambil semua portofolio yang dipublikasikan
- ✅ **Static Pages**: Menyertakan halaman statis website
- ✅ **SEO Optimized**: Priority dan changefreq yang sesuai untuk SEO
- ✅ **Auto Update**: Lastmod otomatis berdasarkan tanggal terbaru

## Cara Penggunaan

### 1. Generate Sitemap
```bash
npm run generate-sitemap
```

### 2. Output
Script akan menghasilkan:
- File: `public/sitemap.xml`
- Statistik jumlah URLs yang di-generate
- Log proses generate

### 3. Statistik Contoh
```
📈 Statistik Sitemap:
   - Blog Posts: 4
   - Portfolios: 4
   - Static Pages: 20
   - Total URLs: 28
```

## Struktur Sitemap

### Halaman Utama
- **Homepage**: `/` (Priority: 1.0)
- **Anchor Links**: `/#home`, `/#portfolio`, `/#pricing`, `/#faq`

### Blog Section
- **Blog List**: `/blog` (Priority: 0.8)
- **Blog Posts**: `/blog/{slug}` (Priority: 0.7)
  - Contoh: `/blog/jasa-pembuatan-website-makassar-untuk-bisnis-personal-branding`

### Portfolio Section
- **Portfolio List**: `/portfolio` (Priority: 0.8)
- **Portfolio Detail**: `/portfolio/{slug}` (Priority: 0.7)
  - Contoh: `/portfolio/ecommerce-website`

### Service Pages
- `/services/website-development`
- `/services/ecommerce`
- `/services/corporate-website`

### Portfolio Categories
- `/portfolio/ecommerce`
- `/portfolio/healthcare`
- `/portfolio/food-beverage`
- `/portfolio/construction`
- `/portfolio/education`
- `/portfolio/event-planning`

### Halaman Lainnya
- `/contact`
- `/consultation`
- `/about`
- `/privacy-policy`
- `/terms-of-service`

## Konfigurasi

### Base URL
```javascript
const BASE_URL = 'https://ideadigiralcreative.com';
```

### Supabase Configuration
```javascript
const supabaseUrl = 'https://kmoojxygtcbfvomwczhs.supabase.co';
const supabaseAnonKey = 'your-anon-key';
```

## SEO Settings

### Priority Levels
- **1.0**: Homepage
- **0.9**: Main sections
- **0.8**: Blog/Portfolio lists, Services, Contact
- **0.7**: Blog posts, Portfolio items, Categories
- **0.6**: About page
- **0.3**: Legal pages

### Change Frequency
- **weekly**: Homepage, Blog list
- **monthly**: Most pages
- **yearly**: Legal pages

## Automation

### Manual Generation
```bash
npm run generate-sitemap
```

### Automated Generation (Recommended)
Tambahkan ke CI/CD pipeline atau cron job untuk generate otomatis:

```bash
# Generate setiap hari jam 2 pagi
0 2 * * * cd /path/to/project && npm run generate-sitemap
```

### Pre-build Hook
Tambahkan ke package.json untuk generate otomatis sebelum build:

```json
{
  "scripts": {
    "prebuild": "npm run generate-sitemap",
    "build": "vite build"
  }
}
```

## Troubleshooting

### Error: "require is not defined"
- Pastikan menggunakan ES modules syntax
- File sudah menggunakan `import` bukan `require`

### Error: "Cannot connect to Supabase"
- Periksa koneksi internet
- Pastikan Supabase URL dan key benar
- Periksa RLS policies di Supabase

### Empty Sitemap
- Pastikan ada data blog/portofolio dengan status 'published'
- Periksa query Supabase

## File Locations
- **Script**: `scripts/generate-sitemap.js`
- **Output**: `public/sitemap.xml`
- **Package Script**: `package.json` → `"generate-sitemap"`

## Dependencies
- `@supabase/supabase-js`: Untuk koneksi database
- `fs`: File system operations
- `path`: Path utilities
- `url`: URL utilities (ES modules)

## Notes
- Script hanya mengambil data dengan status 'published'
- Lastmod menggunakan tanggal terbaru (updated_at atau published_at/created_at)
- Sitemap di-generate dalam format XML standar
- Compatible dengan Google Search Console dan search engines lainnya
