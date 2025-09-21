-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  featured_image TEXT,
  client VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT false
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_portfolios_status ON portfolios(status);
CREATE INDEX IF NOT EXISTS idx_portfolios_category ON portfolios(category);
CREATE INDEX IF NOT EXISTS idx_portfolios_featured ON portfolios(featured);
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON portfolios(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolios table
-- Allow public read access to published portfolios
CREATE POLICY "Allow public read access to published portfolios" ON portfolios
  FOR SELECT USING (status = 'published');

-- Allow authenticated users to read all portfolios (for admin)
CREATE POLICY "Allow authenticated users to read all portfolios" ON portfolios
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert portfolios
CREATE POLICY "Allow authenticated users to insert portfolios" ON portfolios
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update portfolios
CREATE POLICY "Allow authenticated users to update portfolios" ON portfolios
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete portfolios
CREATE POLICY "Allow authenticated users to delete portfolios" ON portfolios
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_portfolios_updated_at 
  BEFORE UPDATE ON portfolios 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO portfolios (title, description, slug, client, category, technologies, project_url, github_url, status, featured) VALUES
(
  'E-Commerce Website',
  'Website toko online modern dengan fitur keranjang belanja, pembayaran, dan manajemen produk yang lengkap.',
  'ecommerce-website',
  'Toko Online ABC',
  'Web Development',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  'https://example-ecommerce.com',
  'https://github.com/username/ecommerce-project',
  'published',
  true
),
(
  'Mobile Banking App',
  'Aplikasi mobile banking dengan fitur transfer, pembayaran, dan monitoring saldo real-time.',
  'mobile-banking-app',
  'Bank Digital XYZ',
  'Mobile Development',
  ARRAY['React Native', 'Firebase', 'Node.js', 'MongoDB'],
  'https://play.google.com/store/apps/details?id=com.bankxyz',
  'https://github.com/username/banking-app',
  'published',
  true
),
(
  'Company Profile Website',
  'Website profil perusahaan dengan desain modern dan responsif untuk berbagai perangkat.',
  'company-profile-website',
  'PT Maju Bersama',
  'Web Development',
  ARRAY['Next.js', 'Tailwind CSS', 'Vercel'],
  'https://majubersama.com',
  'https://github.com/username/company-profile',
  'published',
  false
),
(
  'Restaurant Management System',
  'Sistem manajemen restoran dengan fitur pemesanan, inventori, dan laporan penjualan.',
  'restaurant-management-system',
  'Restoran Seafood',
  'Web Development',
  ARRAY['Vue.js', 'Laravel', 'MySQL', 'Bootstrap'],
  'https://resto-management.com',
  'https://github.com/username/restaurant-system',
  'published',
  false
),
(
  'Task Management App',
  'Aplikasi manajemen tugas dengan fitur kolaborasi tim, deadline tracking, dan progress monitoring.',
  'task-management-app',
  'Startup Tech',
  'Web Development',
  ARRAY['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
  'https://taskapp.com',
  'https://github.com/username/task-management',
  'published',
  true
);
