# Portfolio Image System

## 📁 Struktur Penyimpanan

Gambar portfolio disimpan di folder `public/portfolio-images/` dengan struktur:

```
public/
├── portfolio-images/
│   ├── .gitkeep
│   ├── portfolio-1234567890-abc123.jpg
│   ├── portfolio-1234567890-def456.webp
│   └── ...
```

## 🔧 Cara Kerja

### 1. **Upload Gambar**
- User upload gambar melalui admin panel
- Sistem generate nama file unik: `portfolio-{timestamp}-{randomId}.{extension}`
- File disimpan di `public/portfolio-images/`
- Path disimpan di database: `/portfolio-images/portfolio-1234567890-abc123.jpg`

### 2. **Display Gambar**
- Sistem cek apakah path dimulai dengan `/portfolio-images/`
- Jika ya, gunakan path langsung sebagai src image
- Jika tidak, gunakan sistem fallback (placeholder)

### 3. **Backup System**
- Gambar juga disimpan sebagai base64 di localStorage/sessionStorage
- Berfungsi sebagai backup jika file di public folder hilang

## 🚀 Keuntungan

### ✅ **Permanen**
- Gambar tersimpan di dalam aplikasi
- Tidak hilang saat browser ditutup/incognito
- Bisa diakses dari semua browser

### ✅ **Performance**
- File statis, load cepat
- Tidak perlu convert base64 setiap kali
- Browser bisa cache gambar

### ✅ **Scalable**
- Mudah di-backup
- Bisa di-deploy ke CDN
- Tidak bergantung pada storage browser

## 📝 Penggunaan

### **Upload Gambar Baru:**
```typescript
import { savePortfolioImageToPublic } from '@/lib/portfolioImageService';

const handleUpload = async (file: File) => {
  const imagePath = await savePortfolioImageToPublic(file);
  if (imagePath) {
    // imagePath = "/portfolio-images/portfolio-1234567890-abc123.jpg"
    // Simpan ke database
  }
};
```

### **Display Gambar:**
```typescript
import { getPortfolioImageWithFallback } from '@/lib/portfolioImageService';

const imageSrc = getPortfolioImageWithFallback(
  portfolio.featured_image, 
  portfolio.category, 
  portfolio.title
);
```

## 🔄 Migration dari Sistem Lama

### **Untuk gambar yang sudah ada:**
1. Export data dari localStorage
2. Jalankan script `node scripts/copy-images.js`
3. Update database dengan path baru

### **Script Migration:**
```bash
# Export localStorage data ke file
# Edit scripts/copy-images.js dengan data yang benar
node scripts/copy-images.js
```

## ⚠️ Catatan Penting

1. **Folder `public/portfolio-images/`** harus ada di git (dengan .gitkeep)
2. **File gambar** diabaikan oleh git (untuk ukuran repo)
3. **Backup** tetap disimpan di localStorage sebagai fallback
4. **Fallback** ke placeholder jika file tidak ditemukan

## 🛠️ Maintenance

### **Cleanup File Tidak Terpakai:**
```bash
# Cek file yang tidak terpakai
node scripts/cleanup-unused-images.js
```

### **Backup Gambar:**
```bash
# Backup semua gambar
cp -r public/portfolio-images/ backup/portfolio-images/
```

## 📊 Monitoring

- Monitor ukuran folder `public/portfolio-images/`
- Cek file yang tidak terpakai secara berkala
- Backup gambar penting secara regular
