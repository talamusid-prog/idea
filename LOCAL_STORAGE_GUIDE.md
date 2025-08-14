# Sistem Local Storage untuk Portfolio

## **🎯 Overview**

Sistem ini menggunakan **Local Storage** browser untuk menyimpan gambar portfolio, bukan Supabase Storage. Gambar akan tersimpan di browser user dan akan hilang jika:
- Browser cache dibersihkan
- User menggunakan browser berbeda
- Data local storage dihapus

## **💾 Cara Kerja Local Storage**

### **1. Penyimpanan Gambar**
- Gambar dikonversi ke **Base64** string
- Disimpan di `localStorage` dengan key unik
- Key format: `portfolio-image-{timestamp}-{random}`
- Data portfolio menyimpan key sebagai `featured_image`

### **2. Pengambilan Gambar**
- Sistem mengecek apakah `featured_image` adalah local key
- Jika ya, ambil dari `localStorage`
- Jika tidak, gunakan sebagai URL eksternal

### **3. Pembersihan Otomatis**
- Gambar yang tidak terpakai akan dihapus otomatis
- Cleanup dilakukan saat load portfolios
- Mencegah local storage penuh

## **🔧 Fitur yang Tersedia**

### **✅ Upload & Preview**
- Drag & drop gambar
- Preview sebelum simpan
- Validasi tipe dan ukuran file
- Maksimal 5MB per gambar

### **✅ Storage Management**
- Auto cleanup gambar tidak terpakai
- Hapus gambar saat portfolio dihapus
- Export data dengan gambar

### **✅ Fallback System**
- URL eksternal tetap didukung
- Input URL sebagai alternatif
- Hybrid system (local + external)

## **📁 Struktur Data**

### **Local Storage Keys**
```
portfolio-image-1703123456789-abc123: "data:image/jpeg;base64,/9j/4AAQ..."
portfolio-image-1703123456790-def456: "data:image/png;base64,iVBORw0KGgo..."
```

### **Portfolio Data**
```json
{
  "id": "uuid",
  "title": "Portfolio Title",
  "featured_image": "portfolio-image-1703123456789-abc123",
  "description": "...",
  "client": "...",
  "category": "...",
  "technologies": ["React", "Node.js"],
  "project_url": "https://example.com",
  "github_url": "https://github.com/...",
  "status": "published",
  "featured": true
}
```

## **🚀 Cara Penggunaan**

### **1. Upload Gambar**
1. Buka **Admin Portfolio**
2. Klik **Tambah Portfolio** atau **Edit Portfolio**
3. Drag & drop gambar ke area upload
4. Atau klik area untuk pilih file
5. Preview gambar akan muncul
6. Submit form untuk simpan

### **2. Export Data**
1. Klik tombol **Export Data**
2. File JSON akan di-download
3. Berisi semua data portfolio + gambar base64
4. Bisa digunakan untuk backup

### **3. Cleanup Manual**
```javascript
// Hapus semua gambar portfolio
Object.keys(localStorage)
  .filter(key => key.startsWith('portfolio-image-'))
  .forEach(key => localStorage.removeItem(key));
```

## **⚠️ Batasan & Pertimbangan**

### **Storage Limits**
- **Chrome/Edge**: ~5-10MB per domain
- **Firefox**: ~10MB per domain
- **Safari**: ~5-10MB per domain
- **Mobile**: Lebih terbatas

### **Performance**
- Base64 lebih besar dari file asli (~33% overhead)
- Loading gambar dari localStorage lebih cepat
- Tidak ada network request

### **Persistence**
- Data hilang jika browser cache dibersihkan
- Tidak sinkron antar device
- Tidak backup otomatis

## **🔍 Troubleshooting**

### **Error "QuotaExceededError"**
- Local storage penuh
- Hapus gambar yang tidak terpakai
- Gunakan URL eksternal sebagai alternatif

### **Gambar Tidak Muncul**
- Cek apakah key ada di localStorage
- Refresh halaman
- Cek console untuk error

### **Upload Gagal**
- Pastikan file < 5MB
- Pastikan tipe file adalah gambar
- Cek browser support localStorage

## **🔄 Migrasi dari Supabase Storage**

Jika ingin kembali ke Supabase Storage:

1. **Export data** dengan tombol Export
2. **Setup Supabase Storage** bucket
3. **Upload gambar** ke Supabase
4. **Update featured_image** dengan URL Supabase
5. **Hapus local storage** keys

## **📊 Monitoring**

### **Cek Storage Usage**
```javascript
// Total size localStorage
const totalSize = new Blob(
  Object.values(localStorage).map(val => val)
).size;
console.log('Total localStorage size:', totalSize, 'bytes');

// Portfolio images only
const imageKeys = Object.keys(localStorage)
  .filter(key => key.startsWith('portfolio-image-'));
const imageSize = new Blob(
  imageKeys.map(key => localStorage.getItem(key))
).size;
console.log('Portfolio images size:', imageSize, 'bytes');
```

### **List All Images**
```javascript
Object.keys(localStorage)
  .filter(key => key.startsWith('portfolio-image-'))
  .forEach(key => console.log(key));
```

## **🎨 UI Indicators**

- **💾 Icon**: Menunjukkan gambar disimpan local
- **Info text**: "Gambar akan disimpan di browser Anda"
- **Export button**: Untuk backup data
- **Preview**: Tampilkan gambar dari localStorage

Sistem ini ideal untuk development/testing atau aplikasi dengan data terbatas. Untuk production dengan data besar, pertimbangkan menggunakan cloud storage.
