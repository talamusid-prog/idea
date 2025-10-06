// Cache utility untuk mengoptimalkan performa aplikasi
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time To Live dalam milidetik
}

class Cache {
  private storage: Map<string, CacheItem<any>>;
  private defaultTTL: number = 5 * 60 * 1000; // 5 menit default

  constructor() {
    this.storage = new Map();
    this.cleanupExpired();
  }

  /**
   * Menyimpan data ke cache
   * @param key - Kunci cache
   * @param data - Data yang akan disimpan
   * @param ttl - Time To Live dalam milidetik (opsional)
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };
    
    this.storage.set(key, item);
    
    // Simpan ke localStorage untuk persistensi
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Gagal menyimpan ke localStorage:', error);
    }
  }

  /**
   * Mengambil data dari cache
   * @param key - Kunci cache
   * @returns Data yang tersimpan atau null jika expired/tidak ada
   */
  get<T>(key: string): T | null {
    // Cek di memory cache terlebih dahulu
    const memoryItem = this.storage.get(key);
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.data;
    }

    // Cek di localStorage jika tidak ada di memory
    try {
      const storedItem = localStorage.getItem(`cache_${key}`);
      if (storedItem) {
        const item: CacheItem<T> = JSON.parse(storedItem);
        if (!this.isExpired(item)) {
          // Restore ke memory cache
          this.storage.set(key, item);
          return item.data;
        } else {
          // Hapus jika expired
          localStorage.removeItem(`cache_${key}`);
        }
      }
    } catch (error) {
      console.warn('Gagal membaca dari localStorage:', error);
    }

    return null;
  }

  /**
   * Mengecek apakah item cache sudah expired
   */
  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  /**
   * Menghapus item cache
   * @param key - Kunci cache yang akan dihapus
   */
  delete(key: string): void {
    this.storage.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Gagal menghapus dari localStorage:', error);
    }
  }

  /**
   * Membersihkan semua cache yang expired
   */
  cleanupExpired(): void {
    const now = Date.now();
    
    // Cleanup memory cache
    for (const [key, item] of this.storage.entries()) {
      if (this.isExpired(item)) {
        this.storage.delete(key);
      }
    }

    // Cleanup localStorage
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('cache_')) {
          const storedItem = localStorage.getItem(key);
          if (storedItem) {
            const item: CacheItem<any> = JSON.parse(storedItem);
            if (this.isExpired(item)) {
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (error) {
      console.warn('Gagal membersihkan localStorage:', error);
    }
  }

  /**
   * Membersihkan semua cache
   */
  clear(): void {
    this.storage.clear();
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn('Gagal membersihkan localStorage:', error);
    }
  }

  /**
   * Mendapatkan ukuran cache
   */
  size(): number {
    return this.storage.size;
  }

  /**
   * Mendapatkan semua kunci cache
   */
  keys(): string[] {
    return Array.from(this.storage.keys());
  }

  /**
   * Mengecek apakah cache memiliki kunci tertentu
   */
  has(key: string): boolean {
    const item = this.get(key);
    return item !== null;
  }
}

// Instance global cache
export const cache = new Cache();

// Fungsi helper untuk cache dengan async
export const cacheAsync = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> => {
  // Cek cache terlebih dahulu
  const cached = cache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Jika tidak ada di cache, fetch data
  const data = await fetcher();
  
  // Simpan ke cache
  cache.set(key, data, ttl);
  
  return data;
};

// Fungsi helper untuk cache dengan debounce
export const cacheWithDebounce = <T>(
  key: string,
  fetcher: () => T,
  ttl?: number,
  debounceMs: number = 300
): T | null => {
  const cached = cache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Debounce untuk menghindari multiple calls
  const debounceKey = `debounce_${key}`;
  const debounceTimer = cache.get<number>(debounceKey);
  
  if (debounceTimer) {
    return null; // Masih dalam debounce
  }

  // Set debounce timer
  cache.set(debounceKey, Date.now(), debounceMs);
  
  // Fetch dan cache data
  const data = fetcher();
  cache.set(key, data, ttl);
  
  return data;
};

// Cache keys constants
export const CACHE_KEYS = {
  PORTFOLIO: 'portfolio_data',
  TESTIMONIALS: 'testimonials_data',
  FAQ: 'faq_data',
  PRICING: 'pricing_data',
  USER_PREFERENCES: 'user_preferences',
  FORM_DATA: 'form_data',
  API_RESPONSES: 'api_responses'
} as const;

// Export types
export type CacheKey = typeof CACHE_KEYS[keyof typeof CACHE_KEYS];
