import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Ideadigiralcreative</title>
        <meta name="description" content="Syarat dan Ketentuan Layanan Ideadigiralcreative - Ketahui hak dan kewajiban Anda dalam menggunakan layanan kami." />
        <meta name="keywords" content="terms of service, syarat ketentuan, layanan website, kontrak" />
        <link rel="canonical" href="https://ideadigiralcreative.com/terms-of-service" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Terms of Service
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Penerimaan Syarat</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dengan mengakses dan menggunakan layanan Ideadigiralcreative, Anda menyetujui untuk terikat oleh 
                  syarat dan ketentuan ini. Jika Anda tidak menyetujui salah satu bagian dari syarat ini, 
                  Anda tidak boleh menggunakan layanan kami.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Deskripsi Layanan</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ideadigiralcreative menyediakan layanan pembuatan website profesional, termasuk namun tidak terbatas pada:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Website Company Profile</li>
                  <li>Website Toko Online (E-commerce)</li>
                  <li>Website Portal Berita</li>
                  <li>Website Sekolah</li>
                  <li>Maintenance dan Support Website</li>
                  <li>Konsultasi Web Development</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Kewajiban Klien</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">3.1 Informasi yang Akurat</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Klien bertanggung jawab untuk memberikan informasi yang akurat, lengkap, dan terkini 
                      yang diperlukan untuk pengerjaan proyek.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">3.2 Konten dan Materi</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Klien bertanggung jawab untuk memastikan bahwa semua konten, gambar, teks, dan materi 
                      yang disediakan tidak melanggar hak kekayaan intelektual pihak ketiga.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">3.3 Pembayaran</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Klien wajib melakukan pembayaran sesuai dengan jadwal yang telah disepakati dalam kontrak.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Kewajiban Ideadigiralcreative</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Menyediakan layanan website sesuai dengan spesifikasi yang disepakati</li>
                  <li>Menyelesaikan proyek dalam waktu yang telah ditentukan</li>
                  <li>Memberikan dukungan teknis selama periode garansi</li>
                  <li>Menjaga kerahasiaan informasi klien</li>
                  <li>Menggunakan teknologi dan standar industri terbaik</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Hak Kekayaan Intelektual</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">5.1 Kode Sumber</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ideadigiralcreative mempertahankan hak atas kode sumber dan framework yang digunakan, 
                      kecuali disepakati lain dalam kontrak.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">5.2 Konten Klien</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Klien mempertahankan hak atas konten, gambar, dan materi yang mereka sediakan.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">5.3 Lisensi</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Klien diberikan lisensi untuk menggunakan website yang telah selesai sesuai dengan 
                      ketentuan yang disepakati.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Pembayaran dan Harga</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Harga layanan akan disepakati sebelum dimulainya proyek</li>
                  <li>Pembayaran dapat dilakukan secara bertahap sesuai jadwal yang disepakati</li>
                  <li>Harga tidak termasuk domain dan hosting (jika diperlukan)</li>
                  <li>Pembayaran yang terlambat dapat dikenakan denda sesuai ketentuan</li>
                  <li>Semua harga sudah termasuk PPN (jika berlaku)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Garansi dan Dukungan</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">7.1 Periode Garansi</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Kami memberikan garansi 3 bulan untuk perbaikan bug dan masalah teknis yang bukan 
                      disebabkan oleh perubahan dari pihak klien.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">7.2 Dukungan Teknis</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Dukungan teknis tersedia melalui email dan telepon selama jam kerja normal.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Pembatalan dan Pengembalian</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Pembatalan proyek dapat dilakukan dengan pemberitahuan tertulis</li>
                  <li>Pengembalian dana akan dihitung berdasarkan progress pengerjaan</li>
                  <li>Biaya yang sudah dikeluarkan untuk domain/hosting tidak dapat dikembalikan</li>
                  <li>Pembatalan setelah 50% pengerjaan akan dikenakan biaya 30% dari total kontrak</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Batasan Tanggung Jawab</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ideadigiralcreative tidak bertanggung jawab atas:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Kerugian yang timbul dari penggunaan website oleh pihak ketiga</li>
                  <li>Masalah yang disebabkan oleh perubahan dari pihak klien</li>
                  <li>Downtime yang disebabkan oleh hosting atau server pihak ketiga</li>
                  <li>Kerugian bisnis atau kehilangan keuntungan</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Penyelesaian Sengketa</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Setiap sengketa yang timbul akan diselesaikan melalui:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Musyawarah dan mufakat</li>
                  <li>Mediasi oleh pihak ketiga yang disepakati</li>
                  <li>Arbitrase di Pengadilan Negeri Makassar</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Perubahan Syarat</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ideadigiralcreative berhak mengubah syarat dan ketentuan ini sewaktu-waktu. 
                  Perubahan akan diberitahukan melalui website atau email. Penggunaan layanan 
                  setelah perubahan dianggap sebagai persetujuan terhadap syarat yang baru.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">12. Kontak</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Untuk pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
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

export default TermsOfService;
