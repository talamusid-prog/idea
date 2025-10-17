import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Ideadigiralcreative</title>
        <meta name="description" content="Kebijakan Cookie Ideadigiralcreative - Pelajari bagaimana kami menggunakan cookies untuk meningkatkan pengalaman Anda." />
        <meta name="keywords" content="cookie policy, kebijakan cookie, tracking, analitik" />
        <link rel="canonical" href="https://ideadigiralcreative.com/cookie-policy" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Cookie Policy
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Apa itu Cookies?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies adalah file teks kecil yang disimpan di perangkat Anda (komputer, tablet, atau ponsel) 
                  ketika Anda mengunjungi website. Cookies membantu website mengingat informasi tentang kunjungan 
                  Anda, seperti preferensi bahasa dan pengaturan lainnya, yang dapat membuat kunjungan berikutnya 
                  lebih mudah dan situs lebih berguna bagi Anda.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Jenis Cookies yang Kami Gunakan</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Cookies Esensial</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Cookies ini diperlukan untuk menjalankan website dan tidak dapat dimatikan. 
                      Mereka biasanya hanya diset sebagai respons terhadap tindakan yang Anda lakukan 
                      yang setara dengan permintaan layanan.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Cookies sesi untuk mempertahankan status login</li>
                      <li>Cookies keamanan untuk mencegah serangan CSRF</li>
                      <li>Cookies preferensi bahasa</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Cookies Analitik</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Cookies ini memungkinkan kami untuk menghitung kunjungan dan sumber lalu lintas 
                      sehingga kami dapat mengukur dan meningkatkan kinerja situs kami.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Google Analytics untuk menganalisis penggunaan website</li>
                      <li>Cookies untuk melacak halaman yang paling sering dikunjungi</li>
                      <li>Cookies untuk mengukur waktu yang dihabiskan di website</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Cookies Fungsional</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Cookies ini memungkinkan website untuk menyediakan fungsionalitas yang ditingkatkan 
                      dan personalisasi, seperti video, obrolan langsung, dan preferensi pengguna.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Cookies untuk mengingat preferensi tampilan</li>
                      <li>Cookies untuk fitur obrolan langsung</li>
                      <li>Cookies untuk pengaturan tema (jika ada)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Cookies Pemasaran</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Cookies ini dapat diset melalui situs kami oleh mitra periklanan kami untuk 
                      membangun profil minat Anda dan menampilkan iklan yang relevan di situs lain.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Cookies untuk iklan yang dipersonalisasi</li>
                      <li>Cookies untuk melacak konversi</li>
                      <li>Cookies untuk remarketing</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Cookies Pihak Ketiga</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Website kami mungkin berisi cookies dari pihak ketiga. Berikut adalah beberapa 
                  layanan pihak ketiga yang mungkin menggunakan cookies di website kami:
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Google Analytics</h4>
                    <p className="text-gray-700 text-sm">
                      Digunakan untuk menganalisis penggunaan website. Anda dapat memilih keluar dari 
                      Google Analytics dengan mengunjungi 
                      <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                        Google Analytics Opt-out Browser Add-on
                      </a>.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Google Fonts</h4>
                    <p className="text-gray-700 text-sm">
                      Digunakan untuk menampilkan font yang konsisten di seluruh website.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Supabase</h4>
                    <p className="text-gray-700 text-sm">
                      Digunakan untuk autentikasi dan penyimpanan data backend.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Durasi Penyimpanan Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">4.1 Session Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Cookies ini dihapus ketika Anda menutup browser. Mereka tidak disimpan secara permanen 
                      di perangkat Anda.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">4.2 Persistent Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Cookies ini tetap tersimpan di perangkat Anda untuk jangka waktu tertentu atau 
                      sampai Anda menghapusnya. Durasi bervariasi tergantung pada jenis cookie:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                      <li>Cookies analitik: 2 tahun</li>
                      <li>Cookies preferensi: 1 tahun</li>
                      <li>Cookies pemasaran: 30-90 hari</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Cara Mengelola Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">5.1 Melalui Browser</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Anda dapat mengontrol dan menghapus cookies melalui pengaturan browser Anda. 
                      Berikut cara mengakses pengaturan cookies di browser populer:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                      <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
                      <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
                      <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">5.2 Melalui Banner Cookie</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ketika Anda pertama kali mengunjungi website kami, Anda akan melihat banner cookie 
                      yang memungkinkan Anda untuk memilih jenis cookies yang ingin Anda terima.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Dampak Menonaktifkan Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jika Anda memilih untuk menonaktifkan cookies, beberapa fitur website kami mungkin 
                  tidak berfungsi dengan baik:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Anda mungkin perlu memasukkan informasi yang sama berulang kali</li>
                  <li>Preferensi bahasa dan tampilan tidak akan tersimpan</li>
                  <li>Fitur obrolan langsung mungkin tidak berfungsi</li>
                  <li>Analitik website tidak akan mencatat kunjungan Anda</li>
                  <li>Beberapa konten interaktif mungkin tidak dapat diakses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Cookies dan Data Pribadi</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beberapa cookies yang kami gunakan mungkin mengumpulkan informasi pribadi. 
                  Informasi ini akan digunakan sesuai dengan Kebijakan Privasi kami. 
                  Kami tidak akan menggunakan cookies untuk mengumpulkan informasi pribadi 
                  tanpa persetujuan Anda.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Perubahan Kebijakan Cookie</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan 
                  perubahan dalam praktik kami atau untuk alasan operasional, hukum, atau regulasi lainnya. 
                  Kami akan memberitahu Anda tentang perubahan material dengan menempatkan pemberitahuan 
                  di website kami.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Kontak</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Cookie ini, silakan hubungi kami:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> ideadigiralcreative@gmail.com
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Telepon:</strong> +62 852-427-666-76
                  </p>
                  <p className="text-gray-700">
                    <strong>Alamat:</strong> Jl. Batua Raya No. 21, Makassar, Sulawesi Selatan
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default CookiePolicy;
