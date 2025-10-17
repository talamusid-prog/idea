import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Ideadigiralcreative</title>
        <meta name="description" content="Kebijakan Privasi Ideadigiralcreative - Pelajari bagaimana kami melindungi dan menggunakan informasi pribadi Anda." />
        <meta name="keywords" content="privacy policy, kebijakan privasi, perlindungan data, keamanan informasi" />
        <link rel="canonical" href="https://ideadigiralcreative.com/privacy-policy" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Privacy Policy
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Pengenalan</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ideadigiralcreative berkomitmen untuk melindungi privasi dan keamanan informasi pribadi Anda. 
                  Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda 
                  ketika Anda menggunakan layanan website kami.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Informasi yang Kami Kumpulkan</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">2.1 Informasi Pribadi</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Nama lengkap</li>
                      <li>Alamat email</li>
                      <li>Nomor telepon</li>
                      <li>Alamat fisik</li>
                      <li>Informasi perusahaan (jika relevan)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">2.2 Informasi Teknis</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Alamat IP</li>
                      <li>Jenis browser dan versi</li>
                      <li>Sistem operasi</li>
                      <li>Data cookies</li>
                      <li>Log aktivitas website</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Cara Kami Menggunakan Informasi</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami menggunakan informasi yang dikumpulkan untuk:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Menyediakan dan meningkatkan layanan website</li>
                  <li>Memproses pesanan dan permintaan Anda</li>
                  <li>Berkomunikasi dengan Anda tentang layanan kami</li>
                  <li>Mengirimkan newsletter dan update (dengan persetujuan Anda)</li>
                  <li>Menganalisis penggunaan website untuk perbaikan</li>
                  <li>Mematuhi kewajiban hukum</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Perlindungan Data</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses, 
                  penggunaan, atau pengungkapan yang tidak sah. Ini termasuk:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Enkripsi data sensitif</li>
                  <li>Akses terbatas pada informasi pribadi</li>
                  <li>Pemantauan keamanan sistem secara berkala</li>
                  <li>Pelatihan karyawan tentang perlindungan data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Berbagi Informasi</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga, 
                  kecuali dalam situasi berikut:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Dengan persetujuan eksplisit Anda</li>
                  <li>Untuk mematuhi kewajiban hukum</li>
                  <li>Dengan penyedia layanan tepercaya yang terikat kontrak kerahasiaan</li>
                  <li>Dalam situasi darurat untuk melindungi keselamatan</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Anda dapat mengatur browser 
                  untuk menolak cookies, namun hal ini mungkin mempengaruhi fungsionalitas website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Hak Anda</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Anda memiliki hak untuk:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Mengakses informasi pribadi Anda</li>
                  <li>Memperbarui atau memperbaiki informasi yang tidak akurat</li>
                  <li>Menghapus informasi pribadi Anda</li>
                  <li>Menolak pemrosesan informasi pribadi Anda</li>
                  <li>Portabilitas data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Perubahan Kebijakan</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan 
                  di halaman ini dengan tanggal revisi yang diperbarui. Kami mendorong Anda untuk meninjau 
                  kebijakan ini secara berkala.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Kontak</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
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

export default PrivacyPolicy;
