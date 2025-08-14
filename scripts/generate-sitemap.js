import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Konfigurasi Supabase
const supabaseUrl = 'https://kmoojxygtcbfvomwczhs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb29qeHlndGNiZnZvbXdjemhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNTQyOTEsImV4cCI6MjA3MDczMDI5MX0.l1nY9QCVWuwpa8ETgA95Nba5jwgUNvcQA9ngX2xzzFc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Base URL website
const BASE_URL = 'https://ideadigiralcreative.com';

// Fungsi untuk mendapatkan semua blog posts yang dipublikasikan
async function getPublishedPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPublishedPosts:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan semua portofolio yang dipublikasikan
async function getPublishedPortfolios() {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolios:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPublishedPortfolios:', error);
    return [];
  }
}

// Fungsi untuk format tanggal
function formatDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

// Fungsi untuk menggenerate sitemap XML
function generateSitemapXML(blogPosts, portfolios) {
  const currentDate = formatDate(new Date());
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main Sections (Anchor Links) -->
  <url>
    <loc>${BASE_URL}/#home</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#portfolio</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#pricing</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog Section -->
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Portfolio Section -->
  <url>
    <loc>${BASE_URL}/portfolio</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Posts -->
`;

  // Menambahkan blog posts
  blogPosts.forEach(post => {
    const lastmod = post.updated_at ? formatDate(post.updated_at) : formatDate(post.published_at);
    sitemap += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Menambahkan portofolio
  portfolios.forEach(portfolio => {
    const lastmod = portfolio.updated_at ? formatDate(portfolio.updated_at) : formatDate(portfolio.created_at);
    sitemap += `  <url>
    <loc>${BASE_URL}/portfolio/${portfolio.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Menambahkan halaman statis lainnya
  sitemap += `  
  <!-- Service Pages -->
  <url>
    <loc>${BASE_URL}/services/website-development</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/services/ecommerce</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/services/corporate-website</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Portfolio Categories -->
  <url>
    <loc>${BASE_URL}/portfolio/ecommerce</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/portfolio/healthcare</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/portfolio/food-beverage</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/portfolio/construction</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/portfolio/education</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/portfolio/event-planning</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact/Consultation -->
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/consultation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- About/Company Info -->
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Privacy Policy & Terms -->
  <url>
    <loc>${BASE_URL}/privacy-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/terms-of-service</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  return sitemap;
}

// Fungsi utama
async function generateSitemap() {
  try {
    console.log('🚀 Memulai generate sitemap...');
    
    // Mengambil data blog dan portofolio
    console.log('📝 Mengambil data blog posts...');
    const blogPosts = await getPublishedPosts();
    console.log(`✅ Ditemukan ${blogPosts.length} blog posts`);
    
    console.log('📁 Mengambil data portofolio...');
    const portfolios = await getPublishedPortfolios();
    console.log(`✅ Ditemukan ${portfolios.length} portofolio`);
    
    // Generate sitemap XML
    console.log('🔧 Menggenerate sitemap XML...');
    const sitemapXML = generateSitemapXML(blogPosts, portfolios);
    
    // Menulis ke file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXML, 'utf8');
    
    console.log(`✅ Sitemap berhasil di-generate dan disimpan ke: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${blogPosts.length + portfolios.length + 20} (termasuk halaman statis)`);
    
    // Menampilkan statistik
    console.log('\n📈 Statistik Sitemap:');
    console.log(`   - Blog Posts: ${blogPosts.length}`);
    console.log(`   - Portfolios: ${portfolios.length}`);
    console.log(`   - Static Pages: 20`);
    console.log(`   - Total URLs: ${blogPosts.length + portfolios.length + 20}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Menjalankan script
generateSitemap();
