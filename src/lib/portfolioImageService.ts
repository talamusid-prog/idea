// Service untuk mengelola gambar portfolio dengan sistem berbagi antar tab
import { supabase } from './supabase';

// Event untuk berbagi data antar tab
const PORTFOLIO_IMAGE_EVENT = 'portfolio-image-updated';

// Interface untuk data gambar
interface PortfolioImageData {
  key: string;
  data: string;
  timestamp: number;
}

// Broadcast channel untuk komunikasi antar tab
let broadcastChannel: BroadcastChannel | null = null;

// Initialize broadcast channel
const initBroadcastChannel = () => {
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      broadcastChannel = new BroadcastChannel('portfolio-images');
    }
  } catch (error) {
    console.warn('⚠️ BroadcastChannel not supported, falling back to postMessage');
  }
};

// Initialize on module load
initBroadcastChannel();

// Fungsi untuk menyimpan gambar dengan sistem berbagi antar tab
export const savePortfolioImage = async (file: File): Promise<string | null> => {
  try {
    // Convert file to base64
    const base64 = await convertFileToBase64(file);

    // Generate unique key
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 11);
    const imageKey = `portfolio-image-${timestamp}-${randomId}`;

    // Save to localStorage and sessionStorage
    localStorage.setItem(imageKey, base64);
    sessionStorage.setItem(imageKey, base64);

    // Verify save
    const savedImage = localStorage.getItem(imageKey);
    if (savedImage) {
      // Broadcast to other tabs
      broadcastImageToOtherTabs(imageKey, base64);
      
      return imageKey;
    } else {
      return null;
    }
  } catch (error) {
    console.error('❌ Error saving image to storage:', error);
    return null;
  }
};

// Fungsi untuk mengambil gambar dari storage
export const getPortfolioImage = (imageKey: string): string | null => {
  try {
    // Try localStorage first
    let image = localStorage.getItem(imageKey);
    
    if (image) {
      return image;
    }
    
    // Try sessionStorage as fallback
    image = sessionStorage.getItem(imageKey);
    if (image) {
      return image;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error getting image from storage:', error);
    return null;
  }
};

// Fungsi untuk broadcast gambar ke tab lain
const broadcastImageToOtherTabs = (key: string, data: string) => {
  try {
    const imageData: PortfolioImageData = {
      key,
      data,
      timestamp: Date.now()
    };
    
    // Use BroadcastChannel if available
    if (broadcastChannel) {
      broadcastChannel.postMessage({
        type: PORTFOLIO_IMAGE_EVENT,
        payload: imageData
      });
    } else {
      // Fallback to postMessage
      window.postMessage({
        type: PORTFOLIO_IMAGE_EVENT,
        payload: imageData
      }, '*');
    }
  } catch (error) {
    console.error('❌ Error broadcasting image:', error);
  }
};

// Fungsi untuk mendengarkan update gambar dari tab lain
export const listenForImageUpdates = (callback: (key: string, data: string) => void) => {
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === PORTFOLIO_IMAGE_EVENT) {
      const { key, data } = event.data.payload;
      
      // Save to current tab's storage
      localStorage.setItem(key, data);
      sessionStorage.setItem(key, data);
      
      // Call callback
      callback(key, data);
    }
  };

  const handleBroadcastMessage = (event: MessageEvent) => {
    if (event.data.type === PORTFOLIO_IMAGE_EVENT) {
      const { key, data } = event.data.payload;
      
      // Save to current tab's storage
      localStorage.setItem(key, data);
      sessionStorage.setItem(key, data);
      
      // Call callback
      callback(key, data);
    }
  };

  // Listen for postMessage
  window.addEventListener('message', handleMessage);
  
  // Listen for BroadcastChannel
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcastMessage);
  }
  
  // Return cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcastMessage);
    }
  };
};

// Fungsi untuk convert file ke base64
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Fungsi untuk sync gambar dari database ke storage
export const syncImagesFromDatabase = async () => {
  try {
    // Get all portfolios from database
    const { data: portfolios, error } = await supabase
      .from('portfolios')
      .select('id, title, featured_image')
      .not('featured_image', 'is', null);
    
    if (error) {
      console.error('❌ Error fetching portfolios for sync:', error);
      return;
    }
    
    // Check which images are missing from storage
    portfolios?.forEach(portfolio => {
      if (portfolio.featured_image && portfolio.featured_image.startsWith('portfolio-image-')) {
        const existsInLocal = localStorage.getItem(portfolio.featured_image);
        const existsInSession = sessionStorage.getItem(portfolio.featured_image);
        
        if (!existsInLocal && !existsInSession) {
          console.log(`⚠️ Image missing for portfolio: ${portfolio.title} (${portfolio.featured_image})`);
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Error syncing images:', error);
  }
};

// Fungsi untuk export semua gambar dari storage
export const exportAllImages = (): Record<string, string> => {
  const images: Record<string, string> = {};
  
  try {
    // Get all localStorage keys that start with portfolio-image-
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('portfolio-image-')) {
        const data = localStorage.getItem(key);
        if (data) {
          images[key] = data;
        }
      }
    }
    
    return images;
  } catch (error) {
    console.error('❌ Error exporting images:', error);
    return {};
  }
};

// Fungsi untuk import gambar ke storage
export const importImages = (images: Record<string, string>) => {
  try {
    let importedCount = 0;
    
    Object.entries(images).forEach(([key, data]) => {
      if (key.startsWith('portfolio-image-')) {
        localStorage.setItem(key, data);
        sessionStorage.setItem(key, data);
        importedCount++;
      }
    });
    
    return importedCount;
  } catch (error) {
    console.error('❌ Error importing images:', error);
    return 0;
  }
};

// Fungsi untuk mendapatkan placeholder image berdasarkan kategori
export const getPlaceholderImage = (category: string): string => {
  const categoryImages: Record<string, string> = {
    'Web Development': '/ecommerce.jpg',
    'Mobile Development': '/ecommerce.jpg',
    'E-Commerce': '/ecommerce.jpg',
    'Healthcare': '/Healthcare.webp',
    'Restaurant': '/Food-Beverage.webp',
    'Education': '/Education.jpg',
    'Finance': '/ecommerce.jpg',
    'default': '/placeholder.svg'
  };
  
  return categoryImages[category] || categoryImages.default;
};

// Fungsi untuk mendapatkan placeholder image berdasarkan nama portfolio
export const getPlaceholderImageByTitle = (title: string): string => {
  const titleImages: Record<string, string> = {
    'E-Commerce Website': '/ecommerce.jpg',
    'Apps Juara': '/ecommerce.jpg',
    'Restaurant Management System': '/Food-Beverage.webp',
    'HealtCare': '/Healthcare.webp',
    'Healthcare': '/Healthcare.webp',
    'Mobile Banking App': '/ecommerce.jpg',
    'Company Profile Website': '/ecommerce.jpg',
    'Task Management App': '/ecommerce.jpg'
  };
  
  return titleImages[title] || '/placeholder.svg';
};

// Fungsi untuk mendapatkan gambar dengan fallback yang lebih robust
export const getPortfolioImageWithFallback = (imageKey: string, category: string = 'default', title: string = ''): string => {
  // Try to get from storage first
  const storedImage = getPortfolioImage(imageKey);
  if (storedImage) {
    return storedImage;
  }
  
  // If not found in storage, return placeholder based on title first, then category
  if (title) {
    return getPlaceholderImageByTitle(title);
  }
  
  return getPlaceholderImage(category);
};
