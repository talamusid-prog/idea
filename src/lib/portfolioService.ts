import { supabase } from './supabase';
import { Portfolio, CreatePortfolio } from './supabase';

// Fungsi untuk mendapatkan semua portofolio (termasuk draft) - untuk admin
export const getAllPortfolios = async (): Promise<Portfolio[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all portfolios:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPortfolios:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan portofolio yang dipublikasikan
export const getPublishedPortfolios = async (): Promise<Portfolio[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published portfolios:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPublishedPortfolios:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan portofolio berdasarkan slug
export const getPortfolioBySlug = async (slug: string): Promise<Portfolio | null> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching portfolio by slug:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getPortfolioBySlug:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan portofolio berdasarkan slug (untuk admin - semua status)
export const getPortfolioBySlugAdmin = async (slug: string): Promise<Portfolio | null> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching portfolio by slug (admin):', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getPortfolioBySlugAdmin:', error);
    return null;
  }
};

// Fungsi untuk membuat portofolio baru
export const createPortfolio = async (portfolio: CreatePortfolio): Promise<Portfolio | null> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .insert([{
        ...portfolio,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating portfolio:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createPortfolio:', error);
    return null;
  }
};

// Fungsi untuk membuat portofolio baru dengan slug otomatis
export const createPortfolioWithSlug = async (portfolio: Omit<CreatePortfolio, 'slug'>): Promise<boolean> => {
  try {
    // Generate slug dari title
    const baseSlug = portfolio.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    let slug = baseSlug;
    let counter = 1;
    
    // Check if slug already exists
    while (true) {
      const { data: existingPortfolio } = await supabase
        .from('portfolios')
        .select('id')
        .eq('slug', slug)
        .single();
      
      if (!existingPortfolio) {
        break;
      }
      
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const portfolioData = {
      ...portfolio,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('portfolios')
      .insert([portfolioData])
      .select();

    if (error) {
      console.error('❌ Error saat menyimpan portofolio:', error);
      
      if (error.code === '42501') {
        console.error('🔒 Kemungkinan masalah RLS policy. Pastikan policy INSERT sudah dibuat.');
      }
      
      throw error;
    }

    return true;
  } catch (error) {
    console.error('❌ Error dalam createPortfolioWithSlug:', error);
    return false;
  }
};

// Fungsi untuk update portofolio
export const updatePortfolio = async (id: string, updates: Partial<CreatePortfolio>): Promise<Portfolio | null> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating portfolio:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updatePortfolio:', error);
    return null;
  }
};

// Fungsi untuk update portofolio berdasarkan slug
export const updatePortfolioBySlug = async (slug: string, updates: Partial<CreatePortfolio>): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug)
      .select();

    if (error) {
      console.error('❌ Error updating portfolio by slug:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error in updatePortfolioBySlug:', error);
    return false;
  }
};

// Fungsi untuk menghapus portofolio
export const deletePortfolio = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting portfolio:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePortfolio:', error);
    return false;
  }
};

// Fungsi untuk mendapatkan portofolio berdasarkan kategori
export const getPortfoliosByCategory = async (category: string): Promise<Portfolio[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolios by category:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPortfoliosByCategory:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan portofolio featured
export const getFeaturedPortfolios = async (limit: number = 6): Promise<Portfolio[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured portfolios:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFeaturedPortfolios:', error);
    return [];
  }
};
