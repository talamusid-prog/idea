# Dokumentasi Sistem Cache

## Overview
Sistem cache yang diimplementasikan untuk mengoptimalkan performa aplikasi dengan menyimpan data di memory dan localStorage untuk mengurangi request yang berulang.

## Fitur Utama

### 1. Cache Manager (`src/lib/cache.ts`)
- **Memory Cache**: Menyimpan data di memory untuk akses cepat
- **LocalStorage Persistence**: Menyimpan data ke localStorage untuk persistensi
- **TTL (Time To Live)**: Setiap item cache memiliki waktu kadaluarsa
- **Auto Cleanup**: Membersihkan cache yang expired secara otomatis

### 2. React Hooks (`src/hooks/useCache.ts`)
- **useCache**: Hook untuk data async dengan loading state
- **useSimpleCache**: Hook untuk data sederhana
- **useFormCache**: Hook khusus untuk form data
- **useUserPreferences**: Hook untuk user preferences

### 3. Cache Manager UI (`src/components/CacheManager.tsx`)
- **Real-time Stats**: Menampilkan statistik cache secara real-time
- **Cache Management**: UI untuk mengelola cache
- **User Preferences**: Menyimpan preferensi user

## Penggunaan

### Basic Cache Usage
```typescript
import { cache } from '@/lib/cache';

// Menyimpan data
cache.set('user_data', userData, 5 * 60 * 1000); // 5 menit

// Mengambil data
const userData = cache.get('user_data');

// Menghapus data
cache.delete('user_data');

// Membersihkan semua cache
cache.clear();
```

### React Hook Usage
```typescript
import { useSimpleCache, CACHE_KEYS } from '@/hooks/useCache';

const MyComponent = () => {
  const { data, setData, clear } = useSimpleCache(
    CACHE_KEYS.USER_PREFERENCES,
    defaultValue,
    24 * 60 * 60 * 1000 // 24 jam
  );

  return (
    <div>
      <p>Data: {data}</p>
      <button onClick={() => setData(newData)}>Update</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
```

### Async Cache Usage
```typescript
import { useCache, CACHE_KEYS } from '@/hooks/useCache';

const MyComponent = () => {
  const { data, loading, error, refresh } = useCache(
    () => fetchUserData(), // Async function
    {
      key: CACHE_KEYS.USER_DATA,
      ttl: 10 * 60 * 1000, // 10 menit
      autoRefresh: true,
      refreshInterval: 5 * 60 * 1000 // 5 menit
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>User: {data?.name}</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};
```

## Cache Keys

```typescript
export const CACHE_KEYS = {
  PORTFOLIO: 'portfolio_data',
  TESTIMONIALS: 'testimonials_data',
  FAQ: 'faq_data',
  PRICING: 'pricing_data',
  USER_PREFERENCES: 'user_preferences',
  FORM_DATA: 'form_data',
  API_RESPONSES: 'api_responses'
} as const;
```

## Implementasi di Komponen

### 1. Portfolio Component
- Cache untuk kategori yang dipilih
- Memoized filtered projects
- Persistensi preferensi user

### 2. FAQ Component
- Cache untuk FAQ data
- TTL 24 jam

### 3. Testimonials Component
- Cache untuk testimonials data
- TTL 24 jam

### 4. Cache Manager Component
- Real-time monitoring
- Manual cache management
- User preferences untuk visibility

## Konfigurasi

### Default TTL
- **Memory Cache**: 5 menit
- **User Preferences**: 24 jam
- **Form Data**: 30 menit
- **API Responses**: 5 menit

### Auto Cleanup
- Berjalan setiap kali cache diinisialisasi
- Membersihkan expired items dari memory dan localStorage

## Best Practices

### 1. Gunakan Cache Keys yang Konsisten
```typescript
// ✅ Baik
cache.set('user_preferences_theme', 'dark');
cache.set('user_preferences_language', 'id');

// ❌ Buruk
cache.set('theme', 'dark');
cache.set('lang', 'id');
```

### 2. Set TTL yang Sesuai
```typescript
// Data yang jarang berubah
cache.set('static_data', data, 24 * 60 * 60 * 1000); // 24 jam

// Data yang sering berubah
cache.set('dynamic_data', data, 5 * 60 * 1000); // 5 menit
```

### 3. Handle Cache Miss
```typescript
const data = cache.get('key') || fetchData();
if (!cache.has('key')) {
  cache.set('key', data);
}
```

### 4. Clear Cache Saat Perlu
```typescript
// Clear specific cache
cache.delete('user_data');

// Clear all cache
cache.clear();

// Clear expired cache
cache.cleanupExpired();
```

## Monitoring dan Debugging

### Cache Manager UI
- Tampilkan statistik real-time
- Monitor memory usage
- List semua cache keys
- Manual cache management

### Console Logging
```typescript
// Enable debug mode
const DEBUG_CACHE = true;

if (DEBUG_CACHE) {
  console.log('Cache hit:', key);
  console.log('Cache miss:', key);
  console.log('Cache size:', cache.size());
}
```

## Performance Benefits

### 1. Reduced API Calls
- Menyimpan response API untuk mengurangi request
- Menggunakan cached data untuk data yang jarang berubah

### 2. Faster UI Updates
- Data tersedia segera dari cache
- Mengurangi loading time

### 3. Better User Experience
- Persistensi user preferences
- Form data tidak hilang saat refresh
- Smooth navigation

## Troubleshooting

### Common Issues

1. **Cache Not Persisting**
   - Cek localStorage quota
   - Pastikan tidak ada error di console

2. **Memory Leaks**
   - Gunakan TTL yang sesuai
   - Clear cache secara berkala

3. **Stale Data**
   - Set TTL yang lebih pendek
   - Implement manual refresh

### Debug Commands
```typescript
// Check cache status
console.log('Cache size:', cache.size());
console.log('Cache keys:', cache.keys());

// Check specific cache
console.log('User data:', cache.get('user_data'));

// Clear all cache
cache.clear();
```

## Future Enhancements

1. **Service Worker Integration**
   - Cache untuk offline functionality
   - Background sync

2. **Redis Integration**
   - Server-side caching
   - Distributed caching

3. **Cache Analytics**
   - Hit/miss ratio
   - Performance metrics
   - Usage patterns

4. **Advanced TTL**
   - Conditional TTL
   - Dynamic TTL based on usage
   - Cache warming strategies
