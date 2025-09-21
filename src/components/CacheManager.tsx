import { useState, useEffect } from 'react';
import { Trash2, RefreshCw, Database, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cache, CACHE_KEYS } from '@/lib/cache';
import { useUserPreferences } from '@/hooks/useCache';

const CacheManager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cacheStats, setCacheStats] = useState({
    size: 0,
    keys: [] as string[],
    memoryUsage: 0
  });

  const { getPreference, setPreference } = useUserPreferences();

  // Update cache stats
  const updateStats = () => {
    setCacheStats({
      size: cache.size(),
      keys: cache.keys(),
      memoryUsage: new Blob([JSON.stringify(cache.keys())]).size
    });
  };

  // Toggle visibility berdasarkan user preference
  useEffect(() => {
    const showCacheManager = getPreference('showCacheManager', false);
    setIsVisible(showCacheManager);
  }, [getPreference]);

  // Update stats setiap 5 detik
  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Toggle cache manager visibility
  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    setPreference('showCacheManager', newVisibility);
  };

  // Clear specific cache
  const clearCache = (key?: string) => {
    if (key) {
      cache.delete(key);
    } else {
      cache.clear();
    }
    updateStats();
  };

  // Clear expired cache
  const cleanupExpired = () => {
    cache.cleanupExpired();
    updateStats();
  };

  // Format bytes to human readable
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={toggleVisibility}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Database className="w-4 h-4 mr-2" />
          Cache
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {/* Cache Manager Panel */}
      <div className="bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-2xl w-80 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Cache Manager</h3>
          </div>
          <Button
            onClick={toggleVisibility}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-muted-foreground">Cache Items</div>
              <div className="font-semibold text-foreground">{cacheStats.size}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-muted-foreground">Memory</div>
              <div className="font-semibold text-foreground">{formatBytes(cacheStats.memoryUsage)}</div>
            </div>
          </div>

          {/* Cache Keys */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Cached Data:</div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {cacheStats.keys.length > 0 ? (
                cacheStats.keys.map((key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs bg-muted/30 rounded px-2 py-1"
                  >
                    <span className="text-muted-foreground truncate flex-1">{key}</span>
                    <Button
                      onClick={() => clearCache(key)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-xs text-muted-foreground text-center py-2">
                  No cached data
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button
              onClick={cleanupExpired}
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Cleanup
            </Button>
            <Button
              onClick={() => clearCache()}
              size="sm"
              variant="destructive"
              className="flex-1 text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="mt-2 flex justify-end">
        <Button
          onClick={toggleVisibility}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Settings className="w-4 h-4 mr-2" />
          Hide
        </Button>
      </div>
    </div>
  );
};

export default CacheManager;
