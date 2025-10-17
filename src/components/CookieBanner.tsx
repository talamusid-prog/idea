import { useState } from 'react';
import { useCookie } from '@/contexts/CookieContext';
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const { 
    showCookieBanner, 
    setShowCookieBanner, 
    acceptAllCookies, 
    rejectAllCookies,
    cookiePreferences,
    setCookiePreferences,
    savePreferences
  } = useCookie();
  
  const [showPreferences, setShowPreferences] = useState(false);

  if (!showCookieBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        {!showPreferences ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  🍪 Cookies
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Kami menggunakan cookies untuk meningkatkan pengalaman Anda.
                </p>
              </div>
              <button
                onClick={() => setShowCookieBanner(false)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreferences(true)}
                className="text-xs px-3 py-1 h-7"
              >
                <Settings className="w-3 h-3 mr-1" />
                Atur
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAllCookies}
                className="text-xs px-3 py-1 h-7 text-gray-600 hover:text-gray-800"
              >
                Tolak
              </Button>
              <Button
                size="sm"
                onClick={acceptAllCookies}
                className="text-xs px-3 py-1 h-7 bg-primary hover:bg-primary/90"
              >
                Terima
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Pengaturan Cookie
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-gray-900">Analitik</h4>
                  <p className="text-xs text-gray-500">Menganalisis penggunaan website</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) => setCookiePreferences({
                      ...cookiePreferences,
                      analytics: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-gray-900">Fungsional</h4>
                  <p className="text-xs text-gray-500">Mengingat preferensi Anda</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.functional}
                    onChange={(e) => setCookiePreferences({
                      ...cookiePreferences,
                      functional: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-gray-900">Pemasaran</h4>
                  <p className="text-xs text-gray-500">Iklan yang relevan</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={(e) => setCookiePreferences({
                      ...cookiePreferences,
                      marketing: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAllCookies}
                className="text-xs px-3 py-1 h-7 text-gray-600 hover:text-gray-800"
              >
                Tolak
              </Button>
              <Button
                size="sm"
                onClick={savePreferences}
                className="text-xs px-3 py-1 h-7 bg-primary hover:bg-primary/90 ml-auto"
              >
                Simpan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
