import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold">Ideadigiralcreative</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Spesialis pembuatan website profesional dan modern. 
              Membantu bisnis Anda berkembang di era digital dengan solusi web terbaik.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <a href="#pricing" className="text-white/80 hover:text-accent transition-smooth">
                  Paket Harga
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-white/80 hover:text-accent transition-smooth">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#process" className="text-white/80 hover:text-accent transition-smooth">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/80 hover:text-accent transition-smooth">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-white/80">Website Company Profile</span>
              </li>
              <li>
                <span className="text-white/80">Website Toko Online</span>
              </li>
              <li>
                <span className="text-white/80">Website Portal Berita</span>
              </li>
              <li>
                <span className="text-white/80">Website Sekolah</span>
              </li>
              <li>
                <span className="text-white/80">Maintenance Website</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/80">+62 852-427-666-76</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/80">ideadigiralcreative@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-white/80">
                  Jl. Batua Raya No. 21<br />
                  Makassar, Sulawesi Selatan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Ideadigiralcreative. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-accent transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-accent transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-accent transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;