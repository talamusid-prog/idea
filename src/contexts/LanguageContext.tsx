import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = {
      id: {
        // Navigation
        'nav.home': 'Beranda',
        'nav.about': 'Tentang',
        'nav.services': 'Layanan',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Kontak',
        
        // Hero Section
        'hero.title': 'Solusi Website Profesional untuk Bisnis Anda',
        'hero.subtitle': 'Kami membantu Anda membangun website yang menarik, responsif, dan SEO-friendly untuk meningkatkan kehadiran digital bisnis Anda',
        'hero.cta.primary': 'Mulai Sekarang',
        'hero.cta.secondary': 'Lihat Portfolio',
        'hero.stats.websites.value': '100+',
        'hero.stats.websites.label': 'Website Selesai',
        'hero.stats.satisfaction.value': '98%',
        'hero.stats.satisfaction.label': 'Klien Puas',
        'hero.stats.support.value': '24/7',
        'hero.stats.support.label': 'Support',
        
        // Features
        'features.title': 'Mengapa Memilih Kami?',
        'features.subtitle': 'Kami menyediakan solusi website lengkap dengan teknologi terdepan',
        'features.responsive.title': 'Responsive Design',
        'features.responsive.desc': 'Website Anda akan terlihat sempurna di semua perangkat',
        'features.seo.title': 'SEO Optimized',
        'features.seo.desc': 'Optimasi untuk mesin pencari agar mudah ditemukan',
        'features.fast.title': 'Loading Cepat',
        'features.fast.desc': 'Website dengan performa tinggi dan loading yang cepat',
        'features.support.title': '24/7 Support',
        'features.support.desc': 'Tim support siap membantu Anda kapan saja',
        
        // Services
        'services.title': 'Layanan Kami',
        'services.subtitle': 'Solusi website lengkap untuk berbagai kebutuhan bisnis',
        'services.webdev.title': 'Pembuatan Website',
        'services.webdev.desc': 'Website custom sesuai kebutuhan bisnis Anda',
        'services.ecommerce.title': 'E-commerce',
        'services.ecommerce.desc': 'Toko online dengan fitur lengkap',
        'services.corporate.title': 'Website Corporate',
        'services.corporate.desc': 'Website profesional untuk perusahaan',
        
        // Portfolio
        'portfolio.badge': 'Portfolio Kami',
        'portfolio.title': 'Contoh Website Buatan Kami',
        'portfolio.subtitle': 'Lihat beberapa hasil karya terbaik kami yang telah membantu berbagai bisnis berkembang di dunia digital',
        'portfolio.loading': 'Memuat portfolio...',
        'portfolio.empty': 'Belum ada portfolio yang dipublikasikan.',
        'portfolio.demo': 'Demo',
        'portfolio.detail': 'Detail',
        'portfolio.client': 'Client',
        'portfolio.viewAll': 'Lihat Portfolio Lengkap',
        
        // Testimonials
        'testimonials.title': 'Apa Kata Klien Kami?',
        'testimonials.subtitle': 'Kepuasan klien adalah prioritas utama kami. Lihat testimoni dari berbagai klien yang telah mempercayakan website mereka kepada kami',
        'testimonials.badge': 'Testimoni Klien',
        'testimonials.rating': '4.9/5 dari 100+ review klien',
        
        // Process
        'process.title': 'Proses Pengerjaan',
        'process.subtitle': 'Langkah mudah pembuatan website',
        'process.consultation.title': 'Konsultasi',
        'process.consultation.desc': 'Diskusi kebutuhan dan konsep website',
        'process.design.title': 'Design',
        'process.design.desc': 'Pembuatan mockup dan UI/UX design',
        'process.development.title': 'Development',
        'process.development.desc': 'Pembuatan website dengan teknologi terdepan',
        'process.launch.title': 'Launch',
        'process.launch.desc': 'Website siap digunakan dan dioptimasi',
        
        // Pricing
        'pricing.title': 'Paket Harga',
        'pricing.subtitle': 'Pilih paket yang sesuai dengan kebutuhan bisnis Anda',
        'pricing.basic.title': 'Basic',
        'pricing.basic.desc': 'Cocok untuk bisnis kecil',
        'pricing.premium.title': 'Premium',
        'pricing.premium.desc': 'Solusi lengkap untuk bisnis menengah',
        'pricing.enterprise.title': 'Enterprise',
        'pricing.enterprise.desc': 'Solusi custom untuk bisnis besar',
        'pricing.choose': 'Pilih Paket',
        'pricing.popular': 'Paling Populer',
        
        // Pricing Hero
        'pricing.hero.title': 'Hanya Hari Ini, Kesempatan Buat Website Murah, Mudah, Cepat dan Keren',
        'pricing.hero.subtitle': 'Paket Lengkap Bikin Website Jasa Dalam Sekejap',
        'pricing.hero.serviceTitle': 'Jasa Pembuatan Website',
        'pricing.hero.startingFrom': 'Mulai Dari',
        'pricing.hero.price': 'Rp. 2,5 Juta',
        'pricing.hero.cta': 'Buat Website Sekarang',
        'pricing.features.premium.title': 'Premium Legal',
        'pricing.features.premium.desc': 'Themes & Plugin',
        'pricing.features.seo.title': 'SEO Basic',
        'pricing.features.seo.desc': 'Teroptimasi',
        'pricing.features.training.title': 'Training',
        'pricing.features.training.desc': 'Penggunaan Web',
        'pricing.features.responsive.title': 'Tampilan Responsif',
        'pricing.features.responsive.desc': 'Menyesuaikan di Device Apapun',
        'pricing.features.support.title': 'Support + Maintenance',
        'pricing.features.support.desc': '1 Tahun (Tergantung Paket yang Dipilih)',
        
        // Why Website
        'whyWebsite.title': 'Inilah Mengapa Kamu Harus',
        'whyWebsite.highlight': 'Bikin Website',
        'whyWebsite.titleEnd': 'Sekarang Juga',
        'whyWebsite.reasons.search.text': 'Jutaan orang melakukan pencarian di Google sebelum membeli sesuatu, ',
        'whyWebsite.reasons.search.highlight': 'termasuk bisnismu',
        'whyWebsite.reasons.search.suffix': 'daripada yang tidak',
        'whyWebsite.reasons.trust.text': 'Bisnis yang punya website ',
        'whyWebsite.reasons.trust.highlight': 'lebih dipercaya',
        'whyWebsite.reasons.trust.suffix': 'daripada yang tidak',
        'whyWebsite.reasons.business.text': '1 dari 3 pebisnis saat ini sudah menggunakan ',
        'whyWebsite.reasons.business.highlight': 'website untuk jualan',
        'whyWebsite.reasons.business.suffix': '',
        'whyWebsite.reasons.promotion.text': 'Ampuh sebagai ',
        'whyWebsite.reasons.promotion.highlight': 'media promosi',
        'whyWebsite.reasons.promotion.suffix': 'dan ekspansi pasar untuk bisnismu',
        
        // Website Types
        'websiteTypes.corporate.title': 'Website Profil Perusahaan',
        'websiteTypes.corporate.description': 'Buat website profil perusahaan yang profesional untuk meningkatkan kredibilitas bisnismu.',
        'websiteTypes.ecommerce.title': 'Website Toko Online',
        'websiteTypes.ecommerce.description': 'Website dengan berbagai fitur menarik dan mudah digunakan untuk meningkatkan penjualanmu.',
        'websiteTypes.application.title': 'Website Aplikasi',
        'websiteTypes.application.description': 'Kembangkan website aplikasi yang fungsional dan user-friendly untuk kebutuhan bisnismu.',
        'websiteTypes.news.title': 'Web Berita',
        'websiteTypes.news.description': 'Buat website berita yang informatif dan terpercaya untuk menyampaikan informasi terkini kepada pembaca.',
        'websiteTypes.ecourse.title': 'E-Course',
        'websiteTypes.ecourse.description': 'Buat platform yang interaktif untuk membagikan pengetahuan dan kursus online.',
        'websiteTypes.donation.title': 'Web Donasi',
        'websiteTypes.donation.description': 'Buat website donasi yang aman dan terpercaya untuk mengumpulkan dana dari berbagai donatur.',
        
        // Consultation
        'consultation.title': 'Butuh Konsultasi',
        'consultation.highlight': 'Jenis Website lainnya',
        'consultation.titleEnd': 'yang ingin dibuat?',
        'consultation.description': 'Langsung diskusikan bersama tim ahli kami untuk menggali kebutuhanmu dan mengetahui informasi lainnya lebih lanjut',
        'consultation.button': 'Konsultasi Sekarang',
        'consultation.whatsappMessage': 'Halo! Saya tertarik dengan jasa pembuatan website Anda. Bisa konsultasi lebih lanjut?',
        
        // Blog
        'blog.badge': 'Blog & Artikel',
        'blog.title': 'Blog & Artikel',
        'blog.subtitle': 'Temukan tips, tutorial, dan insight terbaru seputar web development, desain, dan teknologi digital untuk mengembangkan bisnis Anda.',
        'blog.loading': 'Memuat artikel...',
        'blog.empty': 'Belum ada artikel yang dipublikasikan.',
        'blog.viewAll': 'Lihat Semua Artikel',
        
        // FAQ
        'faq.badge': 'FAQ',
        'faq.title': 'Pertanyaan yang Sering Diajukan',
        'faq.subtitle': 'Temukan jawaban untuk pertanyaan umum seputar layanan pembuatan website kami',
        'faq.timeline.question': 'Berapa lama proses pembuatan website?',
        'faq.timeline.answer': 'Proses pembuatan website biasanya memakan waktu 5-7 hari kerja untuk paket Basic dan Bisnis, sedangkan paket Pro membutuhkan 10-14 hari kerja tergantung kompleksitas fitur yang diminta.',
        'faq.update.question': 'Apakah saya bisa update konten website sendiri?',
        'faq.update.answer': 'Ya, semua website yang kami buat dilengkapi dengan admin panel yang user-friendly. Kami juga akan memberikan tutorial cara menggunakan admin panel tersebut.',
        'faq.seo.question': 'Apakah website yang dibuat sudah SEO friendly?',
        'faq.seo.answer': 'Tentu! Semua website yang kami buat sudah dioptimasi untuk SEO dasar. Untuk paket Bisnis dan Pro, kami bahkan melakukan optimasi SEO yang lebih advanced.',
        'faq.revision.question': 'Bagaimana jika saya ingin revisi desain?',
        'faq.revision.answer': 'Setiap paket sudah termasuk revisi sesuai ketentuan (Basic: 3x, Bisnis: 5x, Pro: unlimited). Revisi dapat dilakukan selama masa pengerjaan website.',
        'faq.maintenance.question': 'Apakah ada biaya maintenance bulanan?',
        'faq.maintenance.answer': 'Tidak ada biaya maintenance wajib. Namun kami menyediakan layanan maintenance optional dengan biaya terpisah jika Anda membutuhkan update rutin atau backup berkala.',
        'faq.domain.question': 'Apakah domain dan hosting sudah termasuk?',
        'faq.domain.answer': 'Ya, semua paket sudah termasuk domain .com gratis untuk 1 tahun pertama dan hosting sesuai spesifikasi masing-masing paket.',
        'faq.payment.question': 'Bagaimana sistem pembayaran?',
        'faq.payment.answer': 'Pembayaran dapat dilakukan secara bertahap: 50% di awal sebagai down payment dan 50% sisanya setelah website selesai dan Anda puas dengan hasilnya.',
        'faq.warranty.question': 'Apakah ada garansi untuk website yang dibuat?',
        'faq.warranty.answer': 'Ya, kami memberikan garansi 30 hari untuk bug fixing dan technical support setelah website live. Garansi tidak termasuk penambahan fitur baru.',
        
        // Footer
        'footer.company': 'Perusahaan',
        'footer.services': 'Layanan',
        'footer.support': 'Dukungan',
        'footer.legal': 'Legal',
        'footer.copyright': '© 2024 Idea Digital Creative. Semua hak dilindungi.',
        
        // About Page
        'about.title': 'Tentang Kami — Ideadigital Creative',
        'about.subtitle': 'Ideadigital Creative adalah <strong>perusahaan digital agency</strong> yang berfokus pada pengembangan <strong>aplikasi dan website yang inovatif, aman, dan mudah digunakan</strong>. Kami membantu bisnis dari berbagai sektor untuk <strong>bertransformasi secara digital</strong> melalui solusi teknologi yang disesuaikan dengan kebutuhan unik setiap klien.',
        'about.description': 'Dengan memanfaatkan <strong>teknologi terbaru dan praktik terbaik</strong> dalam pengembangan perangkat lunak, kami memastikan setiap proyek memiliki <strong>performa optimal, tampilan profesional, serta pengalaman pengguna yang intuitif</strong>. Kami siap mewujudkan ide Anda menjadi <strong>produk digital yang berdampak</strong>.',
        'about.commitment': 'Mulai dari tahap <strong>konsultasi, perencanaan, desain, pengembangan, hingga implementasi</strong>, kami berkomitmen memberikan hasil terbaik yang mendorong <strong>efisiensi, produktivitas, dan pertumbuhan bisnis</strong> Anda.',
        'about.vision.title': 'Visi',
        'about.vision.content': 'Menjadi mitra terpercaya bagi bisnis dalam mengembangkan solusi digital yang fungsional, modern, dan bermanfaat untuk kemajuan usaha.',
        'about.mission.title': 'Misi',
        'about.mission.item1': 'Menghadirkan layanan pembuatan aplikasi dan website yang sesuai dengan kebutuhan dan karakter bisnis klien.',
        'about.mission.item2': 'Mengutamakan kualitas, keamanan, dan kemudahan penggunaan di setiap produk yang kami kembangkan.',
        'about.mission.item3': 'Memberikan pendampingan dari tahap perencanaan hingga implementasi agar hasil sesuai tujuan bisnis.',
        'about.mission.item4': 'Membangun kerja sama jangka panjang yang berlandaskan kepercayaan dan hasil nyata.',
        'about.mission.item5': 'Terus berinovasi mengikuti perkembangan teknologi untuk mendukung pertumbuhan digital yang berkelanjutan.',
        'about.values.badge': 'Nilai-Nilai Kami',
        'about.values.title': 'Nilai-Nilai yang Kami Anut',
        'about.values.subtitle': 'Prinsip-prinsip yang menjadi fondasi dalam setiap pekerjaan kami',
        'about.values.innovation.title': 'Inovasi',
        'about.values.innovation.desc': 'Selalu berinovasi dalam setiap proyek untuk memberikan solusi terbaik',
        'about.values.quality.title': 'Kualitas',
        'about.values.quality.desc': 'Komitmen tinggi terhadap kualitas dalam setiap detail pekerjaan',
        'about.values.partnership.title': 'Kemitraan',
        'about.values.partnership.desc': 'Membangun hubungan jangka panjang yang saling menguntungkan',
        'about.cta.title': 'Siap Bekerja Sama dengan Kami?',
        'about.cta.subtitle': 'Mari wujudkan visi digital bisnis Anda bersama tim profesional kami',
        
        // Common
        'common.learnMore': 'Pelajari Lebih Lanjut',
        'common.getStarted': 'Mulai Sekarang',
        'common.contactUs': 'Hubungi Kami',
        'common.readMore': 'Baca Selengkapnya',
        'common.close': 'Tutup',
        'common.loading': 'Memuat...',
        'common.error': 'Terjadi kesalahan',
        'common.success': 'Berhasil',
        'common.cancel': 'Batal',
        'common.save': 'Simpan',
        'common.edit': 'Edit',
        'common.delete': 'Hapus',
        'common.confirm': 'Konfirmasi',
        'common.yes': 'Ya',
        'common.no': 'Tidak',
      },
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Professional Website Solutions for Your Business',
        'hero.subtitle': 'We help you build attractive, responsive, and SEO-friendly websites to enhance your business digital presence',
        'hero.cta.primary': 'Get Started',
        'hero.cta.secondary': 'View Portfolio',
        'hero.stats.websites.value': '100+',
        'hero.stats.websites.label': 'Websites Completed',
        'hero.stats.satisfaction.value': '98%',
        'hero.stats.satisfaction.label': 'Client Satisfaction',
        'hero.stats.support.value': '24/7',
        'hero.stats.support.label': 'Support',
        
        // Features
        'features.title': 'Why Choose Us?',
        'features.subtitle': 'We provide complete website solutions with cutting-edge technology',
        'features.responsive.title': 'Responsive Design',
        'features.responsive.desc': 'Your website will look perfect on all devices',
        'features.seo.title': 'SEO Optimized',
        'features.seo.desc': 'Optimized for search engines to be easily found',
        'features.fast.title': 'Fast Loading',
        'features.fast.desc': 'High-performance website with fast loading',
        'features.support.title': '24/7 Support',
        'features.support.desc': 'Support team ready to help you anytime',
        
        // Services
        'services.title': 'Our Services',
        'services.subtitle': 'Complete website solutions for various business needs',
        'services.webdev.title': 'Website Development',
        'services.webdev.desc': 'Custom website according to your business needs',
        'services.ecommerce.title': 'E-commerce',
        'services.ecommerce.desc': 'Online store with complete features',
        'services.corporate.title': 'Corporate Website',
        'services.corporate.desc': 'Professional website for companies',
        
        // Portfolio
        'portfolio.badge': 'Our Portfolio',
        'portfolio.title': 'Examples of Our Website Creations',
        'portfolio.subtitle': 'See some of our best works that have helped various businesses grow in the digital world',
        'portfolio.loading': 'Loading portfolio...',
        'portfolio.empty': 'No portfolios have been published yet.',
        'portfolio.demo': 'Demo',
        'portfolio.detail': 'Detail',
        'portfolio.client': 'Client',
        'portfolio.viewAll': 'View Complete Portfolio',
        
        // Testimonials
        'testimonials.title': 'What Our Clients Say?',
        'testimonials.subtitle': 'Client satisfaction is our top priority. See testimonials from various clients who have entrusted their websites to us',
        'testimonials.badge': 'Client Testimonials',
        'testimonials.rating': '4.9/5 from 100+ client reviews',
        
        // Process
        'process.title': 'Our Process',
        'process.subtitle': 'Easy website creation steps',
        'process.consultation.title': 'Consultation',
        'process.consultation.desc': 'Discuss needs and website concepts',
        'process.design.title': 'Design',
        'process.design.desc': 'Create mockups and UI/UX design',
        'process.development.title': 'Development',
        'process.development.desc': 'Build website with cutting-edge technology',
        'process.launch.title': 'Launch',
        'process.launch.desc': 'Website ready to use and optimized',
        
        // Pricing
        'pricing.title': 'Pricing Plans',
        'pricing.subtitle': 'Choose the package that suits your business needs',
        'pricing.basic.title': 'Basic',
        'pricing.basic.desc': 'Perfect for small businesses',
        'pricing.premium.title': 'Premium',
        'pricing.premium.desc': 'Complete solution for medium businesses',
        'pricing.enterprise.title': 'Enterprise',
        'pricing.enterprise.desc': 'Custom solution for large businesses',
        'pricing.choose': 'Choose Plan',
        'pricing.popular': 'Most Popular',
        
        // Pricing Hero
        'pricing.hero.title': 'Today Only, Opportunity to Build Cheap, Easy, Fast and Cool Website',
        'pricing.hero.subtitle': 'Complete Website Service Package in an Instant',
        'pricing.hero.serviceTitle': 'Website Development Service',
        'pricing.hero.startingFrom': 'Starting From',
        'pricing.hero.price': 'Rp. 2.5 Million',
        'pricing.hero.cta': 'Build Website Now',
        'pricing.features.premium.title': 'Premium Legal',
        'pricing.features.premium.desc': 'Themes & Plugin',
        'pricing.features.seo.title': 'SEO Basic',
        'pricing.features.seo.desc': 'Optimized',
        'pricing.features.training.title': 'Training',
        'pricing.features.training.desc': 'Web Usage',
        'pricing.features.responsive.title': 'Responsive Design',
        'pricing.features.responsive.desc': 'Adapts to Any Device',
        'pricing.features.support.title': 'Support + Maintenance',
        'pricing.features.support.desc': '1 Year (Depending on Selected Package)',
        
        // Why Website
        'whyWebsite.title': 'This is Why You Should',
        'whyWebsite.highlight': 'Build a Website',
        'whyWebsite.titleEnd': 'Right Now',
        'whyWebsite.reasons.search.text': 'Millions of people search on Google before buying something, ',
        'whyWebsite.reasons.search.highlight': 'including your business',
        'whyWebsite.reasons.search.suffix': 'rather than those who don\'t',
        'whyWebsite.reasons.trust.text': 'Businesses with websites are ',
        'whyWebsite.reasons.trust.highlight': 'more trusted',
        'whyWebsite.reasons.trust.suffix': 'than those without',
        'whyWebsite.reasons.business.text': '1 in 3 business owners today already use ',
        'whyWebsite.reasons.business.highlight': 'websites for selling',
        'whyWebsite.reasons.business.suffix': '',
        'whyWebsite.reasons.promotion.text': 'Powerful as a ',
        'whyWebsite.reasons.promotion.highlight': 'promotional medium',
        'whyWebsite.reasons.promotion.suffix': 'and market expansion for your business',
        
        // Website Types
        'websiteTypes.corporate.title': 'Corporate Profile Website',
        'websiteTypes.corporate.description': 'Build a professional corporate profile website to enhance your business credibility.',
        'websiteTypes.ecommerce.title': 'Online Store Website',
        'websiteTypes.ecommerce.description': 'Website with various attractive features and easy to use to increase your sales.',
        'websiteTypes.application.title': 'Application Website',
        'websiteTypes.application.description': 'Develop a functional and user-friendly application website for your business needs.',
        'websiteTypes.news.title': 'News Website',
        'websiteTypes.news.description': 'Build an informative and trustworthy news website to deliver current information to readers.',
        'websiteTypes.ecourse.title': 'E-Course',
        'websiteTypes.ecourse.description': 'Build an interactive platform to share knowledge and online courses.',
        'websiteTypes.donation.title': 'Donation Website',
        'websiteTypes.donation.description': 'Build a secure and trustworthy donation website to collect funds from various donors.',
        
        // Consultation
        'consultation.title': 'Need Consultation for',
        'consultation.highlight': 'Other Website Types',
        'consultation.titleEnd': 'you want to build?',
        'consultation.description': 'Discuss directly with our expert team to explore your needs and find out more information',
        'consultation.button': 'Consult Now',
        'consultation.whatsappMessage': 'Hello! I\'m interested in your website development service. Can we consult further?',
        
        // Blog
        'blog.badge': 'Blog & Articles',
        'blog.title': 'Blog & Articles',
        'blog.subtitle': 'Discover the latest tips, tutorials, and insights about web development, design, and digital technology to grow your business.',
        'blog.loading': 'Loading articles...',
        'blog.empty': 'No articles have been published yet.',
        'blog.viewAll': 'View All Articles',
        
        // FAQ
        'faq.badge': 'FAQ',
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Find answers to common questions about our website development services',
        'faq.timeline.question': 'How long does the website development process take?',
        'faq.timeline.answer': 'The website development process usually takes 5-7 working days for Basic and Business packages, while the Pro package takes 10-14 working days depending on the complexity of the requested features.',
        'faq.update.question': 'Can I update the website content myself?',
        'faq.update.answer': 'Yes, all websites we create come with a user-friendly admin panel. We will also provide tutorials on how to use the admin panel.',
        'faq.seo.question': 'Are the websites created SEO friendly?',
        'faq.seo.answer': 'Of course! All websites we create are optimized for basic SEO. For Business and Pro packages, we even perform more advanced SEO optimization.',
        'faq.revision.question': 'What if I want to revise the design?',
        'faq.revision.answer': 'Each package already includes revisions according to the terms (Basic: 3x, Business: 5x, Pro: unlimited). Revisions can be made during the website development period.',
        'faq.maintenance.question': 'Is there a monthly maintenance fee?',
        'faq.maintenance.answer': 'There is no mandatory maintenance fee. However, we provide optional maintenance services with separate fees if you need regular updates or periodic backups.',
        'faq.domain.question': 'Are domain and hosting included?',
        'faq.domain.answer': 'Yes, all packages include a free .com domain for the first year and hosting according to each package specifications.',
        'faq.payment.question': 'How is the payment system?',
        'faq.payment.answer': 'Payment can be made in stages: 50% upfront as down payment and the remaining 50% after the website is completed and you are satisfied with the results.',
        'faq.warranty.question': 'Is there a warranty for the created website?',
        'faq.warranty.answer': 'Yes, we provide a 30-day warranty for bug fixing and technical support after the website goes live. The warranty does not include adding new features.',
        
        // Footer
        'footer.company': 'Company',
        'footer.services': 'Services',
        'footer.support': 'Support',
        'footer.legal': 'Legal',
        'footer.copyright': '© 2024 Idea Digital Creative. All rights reserved.',
        
        // About Page
        'about.title': 'About Us — Ideadigital Creative',
        'about.subtitle': 'Ideadigital Creative is a <strong>digital agency company</strong> focused on developing <strong>innovative, secure, and user-friendly applications and websites</strong>. We help businesses from various sectors to <strong>transform digitally</strong> through technology solutions tailored to each client\'s unique needs.',
        'about.description': 'By leveraging <strong>the latest technology and best practices</strong> in software development, we ensure every project has <strong>optimal performance, professional appearance, and intuitive user experience</strong>. We are ready to turn your ideas into <strong>impactful digital products</strong>.',
        'about.commitment': 'From <strong>consultation, planning, design, development, to implementation</strong>, we are committed to delivering the best results that drive <strong>efficiency, productivity, and your business growth</strong>.',
        'about.vision.title': 'Vision',
        'about.vision.content': 'To become a trusted partner for businesses in developing functional, modern, and beneficial digital solutions for business advancement.',
        'about.mission.title': 'Mission',
        'about.mission.item1': 'Providing application and website development services that align with client business needs and characteristics.',
        'about.mission.item2': 'Prioritizing quality, security, and ease of use in every product we develop.',
        'about.mission.item3': 'Providing guidance from planning to implementation stages to ensure results meet business objectives.',
        'about.mission.item4': 'Building long-term partnerships based on trust and tangible results.',
        'about.mission.item5': 'Continuously innovating following technological developments to support sustainable digital growth.',
        'about.values.badge': 'Our Values',
        'about.values.title': 'Values We Uphold',
        'about.values.subtitle': 'Principles that form the foundation of our work',
        'about.values.innovation.title': 'Innovation',
        'about.values.innovation.desc': 'Always innovating in every project to provide the best solutions',
        'about.values.quality.title': 'Quality',
        'about.values.quality.desc': 'High commitment to quality in every detail of our work',
        'about.values.partnership.title': 'Partnership',
        'about.values.partnership.desc': 'Building long-term mutually beneficial relationships',
        'about.cta.title': 'Ready to Work with Us?',
        'about.cta.subtitle': 'Let\'s realize your business digital vision together with our professional team',
        
        // Common
        'common.learnMore': 'Learn More',
        'common.getStarted': 'Get Started',
        'common.contactUs': 'Contact Us',
        'common.readMore': 'Read More',
        'common.close': 'Close',
        'common.loading': 'Loading...',
        'common.error': 'An error occurred',
        'common.success': 'Success',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.confirm': 'Confirm',
        'common.yes': 'Yes',
        'common.no': 'No',
      }
    };

    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
