import { Helmet } from "react-helmet-async";
import { useCookie } from "@/contexts/CookieContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookiePreferences = () => {
  const { 
    cookiePreferences, 
    setCookiePreferences, 
    savePreferences,
    acceptAllCookies,
    rejectAllCookies
  } = useCookie();

  return (
    <>
      <Helmet>
        <title>Pengaturan Cookie - Ideadigiralcreative</title>
        <meta name="description" content="Kelola preferensi cookie Anda untuk website Ideadigiralcreative. Sesuaikan pengaturan privasi sesuai kebutuhan Anda." />
        <meta name="keywords" content="pengaturan cookie, preferensi privasi, kelola cookies" />
        <link rel="canonical" href="https://ideadigiralcreative.com/cookie-preferences" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Settings className="w-12 h-12 text-primary mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                  Pengaturan Cookie
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kelola preferensi cookie Anda untuk mengontrol bagaimana website ini menggunakan 
                data dan meningkatkan pengalaman Anda.
              </p>
            </div>

            <div className="space-y-8">
              {/* Essential Cookies */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Check className="w-6 h-6 text-green-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Cookies Esensial</h2>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Selalu Aktif
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies ini diperlukan untuk fungsi dasar website dan tidak dapat dinonaktifkan. 
                  Mereka memungkinkan navigasi yang aman dan penggunaan fitur-fitur dasar website.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Contoh:</strong> Session cookies, security cookies, language preferences
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Cookies Analitik</h2>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies ini membantu kami memahami bagaimana pengunjung berinteraksi dengan website 
                  dengan mengumpulkan dan melaporkan informasi secara anonim.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Contoh:</strong> Google Analytics, page views, bounce rate, user behavior
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Cookies Fungsional</h2>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies ini memungkinkan website mengingat pilihan Anda dan memberikan fitur 
                  yang ditingkatkan dan lebih personal.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Contoh:</strong> Theme preferences, chat settings, form data
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Cookies Pemasaran</h2>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies ini digunakan untuk menampilkan iklan yang relevan dan mengukur 
                  efektivitas kampanye iklan.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Contoh:</strong> Ad targeting, conversion tracking, remarketing
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={rejectAllCookies}
                  className="flex-1 sm:flex-none"
                >
                  Tolak Semua
                </Button>
                <Button
                  onClick={acceptAllCookies}
                  className="flex-1 sm:flex-none"
                >
                  Terima Semua
                </Button>
                <Button
                  onClick={savePreferences}
                  className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
                >
                  Simpan Pengaturan
                </Button>
              </div>

              {/* Additional Information */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Informasi Tambahan
                </h3>
                <div className="space-y-3 text-blue-800">
                  <p>
                    <strong>Perubahan Pengaturan:</strong> Anda dapat mengubah pengaturan cookie 
                    kapan saja dengan mengunjungi halaman ini.
                  </p>
                  <p>
                    <strong>Dampak Menonaktifkan:</strong> Menonaktifkan cookies tertentu dapat 
                    mempengaruhi fungsionalitas website dan pengalaman pengguna.
                  </p>
                  <p>
                    <strong>Kebijakan Privasi:</strong> Untuk informasi lebih lanjut tentang 
                    bagaimana kami menggunakan data Anda, silakan baca{' '}
                    <a 
                      href="/privacy-policy" 
                      className="underline hover:no-underline font-medium"
                    >
                      Kebijakan Privasi
                    </a> kami.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default CookiePreferences;
