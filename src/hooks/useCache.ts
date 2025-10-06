import { useState, useEffect, useCallback } from 'react';
import { cache, cacheAsync, CACHE_KEYS, CacheKey } from '@/lib/cache';

interface UseCacheOptions<T> {
  key: CacheKey | string;
  ttl?: number;
  defaultValue?: T;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseCacheReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  clear: () => void;
  setData: (data: T) => void;
}

/**
 * Hook untuk menggunakan cache dalam komponen React
 */
export function useCache<T>(
  fetcher: () => Promise<T> | T,
  options: UseCacheOptions<T>
): UseCacheReturn<T> {
  const { key, ttl, defaultValue = null, autoRefresh = false, refreshInterval = 60000 } = options;
  
  const [data, setData] = useState<T | null>(() => {
    // Cek cache saat inisialisasi
    const cached = cache.get<T>(key);
    return cached || defaultValue;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fungsi untuk fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = fetcher();
      
      if (result instanceof Promise) {
        // Async fetcher
        const fetchedData = await cacheAsync(key, () => result, ttl);
        setData(fetchedData);
      } else {
        // Sync fetcher
        cache.set(key, result, ttl);
        setData(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error(`Error fetching data for key "${key}":`, error);
    } finally {
      setLoading(false);
    }
  }, [key, ttl, fetcher]);

  // Auto refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  // Fungsi untuk refresh manual
  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Fungsi untuk clear cache
  const clear = useCallback(() => {
    cache.delete(key);
    setData(defaultValue);
    setError(null);
  }, [key, defaultValue]);

  // Fungsi untuk set data manual
  const setDataManual = useCallback((newData: T) => {
    cache.set(key, newData, ttl);
    setData(newData);
    setError(null);
  }, [key, ttl]);

  return {
    data,
    loading,
    error,
    refresh,
    clear,
    setData: setDataManual
  };
}

/**
 * Hook untuk cache sederhana tanpa async
 */
export function useSimpleCache<T>(
  key: CacheKey | string,
  defaultValue?: T,
  ttl?: number
) {
  const [data, setData] = useState<T | null>(() => {
    const cached = cache.get<T>(key);
    return cached || defaultValue || null;
  });

  const setCachedData = useCallback((newData: T) => {
    cache.set(key, newData, ttl);
    setData(newData);
  }, [key, ttl]);

  const clearCache = useCallback(() => {
    cache.delete(key);
    setData(defaultValue || null);
  }, [key, defaultValue]);

  return {
    data,
    setData: setCachedData,
    clear: clearCache,
    hasData: data !== null
  };
}

/**
 * Hook untuk form data cache
 */
export function useFormCache<T extends Record<string, any>>(
  formId: string,
  defaultValue?: T
) {
  const cacheKey = `${CACHE_KEYS.FORM_DATA}_${formId}`;
  
  const { data, setData, clear } = useSimpleCache<T>(cacheKey, defaultValue, 30 * 60 * 1000); // 30 menit

  // Auto save form data
  const autoSave = useCallback((formData: T) => {
    setData(formData);
  }, [setData]);

  // Restore form data
  const restore = useCallback(() => {
    return data;
  }, [data]);

  return {
    formData: data,
    autoSave,
    restore,
    clear,
    hasSavedData: data !== null
  };
}

/**
 * Hook untuk user preferences cache
 */
export function useUserPreferences() {
  const { data: preferences, setData: setPreferences } = useSimpleCache<Record<string, any>>(
    CACHE_KEYS.USER_PREFERENCES,
    {},
    24 * 60 * 60 * 1000 // 24 jam
  );

  const setPreference = useCallback((key: string, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
  }, [preferences, setPreferences]);

  const getPreference = useCallback((key: string, defaultValue?: any) => {
    return preferences?.[key] ?? defaultValue;
  }, [preferences]);

  const removePreference = useCallback((key: string) => {
    const newPreferences = { ...preferences };
    delete newPreferences[key];
    setPreferences(newPreferences);
  }, [preferences, setPreferences]);

  return {
    preferences,
    setPreference,
    getPreference,
    removePreference,
    setPreferences
  };
}

// Export cache keys untuk digunakan di komponen
export { CACHE_KEYS };
export type { CacheKey };
