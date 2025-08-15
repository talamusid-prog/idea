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
    console.log('🖼️ [IMAGE SERVICE] Saving image to storage...', { fileName: file.name, fileSize: file.size });
    
    // Convert file to base64
    const base64 = await convertFileToBase64(file);
    console.log('🖼️ [IMAGE SERVICE] File converted to base64, length:', base64.length);

    // Generate unique key
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 11);
    const imageKey = `portfolio-image-${timestamp}-${randomId}`;
    
    console.log('🖼️ [IMAGE SERVICE] Generated image key:', imageKey);

    // Save to localStorage and sessionStorage
    localStorage.setItem(imageKey, base64);
    sessionStorage.setItem(imageKey, base64);

    // Verify save
    const savedImage = localStorage.getItem(imageKey);
    if (savedImage) {
      console.log('✅ [IMAGE SERVICE] Image saved successfully to storage');
      
      // Broadcast to other tabs
      broadcastImageToOtherTabs(imageKey, base64);
      
      return imageKey;
    } else {
      console.error('❌ [IMAGE SERVICE] Failed to save image to storage');
      return null;
    }
  } catch (error) {
    console.error('❌ [IMAGE SERVICE] Error saving image to storage:', error);
    return null;
  }
};

// Fungsi untuk mengambil gambar dari storage
export const getPortfolioImage = (imageKey: string): string | null => {
  try {
    console.log('🖼️ [IMAGE SERVICE] Getting image from storage:', imageKey);
    
    // Try localStorage first
    let image = localStorage.getItem(imageKey);
    
    if (image) {
      console.log('✅ [IMAGE SERVICE] Image found in localStorage');
      return image;
    }
    
    // Try sessionStorage as fallback
    image = sessionStorage.getItem(imageKey);
    if (image) {
      console.log('✅ [IMAGE SERVICE] Image found in sessionStorage');
      return image;
    }
    
    console.log('❌ [IMAGE SERVICE] Image not found in storage');
    return null;
  } catch (error) {
    console.error('❌ [IMAGE SERVICE] Error getting image from storage:', error);
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
    console.log('🔄 [IMAGE SERVICE] Starting image sync from database...');
    
    // Get all portfolios from database
    const { data: portfolios, error } = await supabase
      .from('portfolios')
      .select('id, title, featured_image')
      .not('featured_image', 'is', null);
    
    if (error) {
      console.error('❌ [IMAGE SERVICE] Error fetching portfolios for sync:', error);
      return;
    }
    
    console.log('🔄 [IMAGE SERVICE] Found portfolios with images:', portfolios?.length);
    
    // Check which images are missing from storage
    let missingCount = 0;
    portfolios?.forEach(portfolio => {
      if (portfolio.featured_image && portfolio.featured_image.startsWith('portfolio-image-')) {
        const existsInLocal = localStorage.getItem(portfolio.featured_image);
        const existsInSession = sessionStorage.getItem(portfolio.featured_image);
        
        if (!existsInLocal && !existsInSession) {
          console.log(`⚠️ [IMAGE SERVICE] Image missing for portfolio: ${portfolio.title} (${portfolio.featured_image})`);
          missingCount++;
        } else {
          console.log(`✅ [IMAGE SERVICE] Image exists for portfolio: ${portfolio.title}`);
        }
      }
    });
    
    console.log(`🔄 [IMAGE SERVICE] Sync complete. Missing images: ${missingCount}`);
    
  } catch (error) {
    console.error('❌ [IMAGE SERVICE] Error syncing images:', error);
  }
};

// Fungsi untuk debug storage status
export const debugStorageStatus = () => {
  try {
    console.log('🔍 [IMAGE SERVICE] Debugging storage status...');
    
    const localStorageKeys = [];
    const sessionStorageKeys = [];
    
    // Get all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('portfolio-image-')) {
        localStorageKeys.push(key);
      }
    }
    
    // Get all sessionStorage keys
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('portfolio-image-')) {
        sessionStorageKeys.push(key);
      }
    }
    
    console.log('🔍 [IMAGE SERVICE] localStorage portfolio images:', localStorageKeys.length, localStorageKeys);
    console.log('🔍 [IMAGE SERVICE] sessionStorage portfolio images:', sessionStorageKeys.length, sessionStorageKeys);
    
    return {
      localStorage: localStorageKeys,
      sessionStorage: sessionStorageKeys
    };
  } catch (error) {
    console.error('❌ [IMAGE SERVICE] Error debugging storage:', error);
    return { localStorage: [], sessionStorage: [] };
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
    console.error('❌ [IMAGE SERVICE] Error importing images:', error);
    return 0;
  }
};

// Fungsi untuk memperbaiki gambar yang hilang
export const fixMissingImages = async () => {
  try {
    console.log('🔧 [IMAGE SERVICE] Starting to fix missing images...');
    
    // Get all portfolios from database
    const { data: portfolios, error } = await supabase
      .from('portfolios')
      .select('id, title, featured_image, category')
      .not('featured_image', 'is', null);
    
    if (error) {
      console.error('❌ [IMAGE SERVICE] Error fetching portfolios for fix:', error);
      return;
    }
    
    let fixedCount = 0;
    portfolios?.forEach(portfolio => {
      if (portfolio.featured_image && portfolio.featured_image.startsWith('portfolio-image-')) {
        const existsInLocal = localStorage.getItem(portfolio.featured_image);
        const existsInSession = sessionStorage.getItem(portfolio.featured_image);
        
        if (!existsInLocal && !existsInSession) {
          console.log(`🔧 [IMAGE SERVICE] Image missing for portfolio: ${portfolio.title} (${portfolio.featured_image})`);
          
          // Try to get from other tabs or use placeholder
          const placeholder = getPlaceholderImageByTitle(portfolio.title) || getPlaceholderImage(portfolio.category);
          
          // Save placeholder as the missing image temporarily
          localStorage.setItem(portfolio.featured_image, placeholder);
          sessionStorage.setItem(portfolio.featured_image, placeholder);
          
          console.log(`🔧 [IMAGE SERVICE] Fixed missing image for: ${portfolio.title}`);
          fixedCount++;
        }
      }
    });
    
    console.log(`🔧 [IMAGE SERVICE] Fixed ${fixedCount} missing images`);
    return fixedCount;
    
  } catch (error) {
    console.error('❌ [IMAGE SERVICE] Error fixing missing images:', error);
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
  console.log('🖼️ [IMAGE SERVICE] Getting image with fallback:', { imageKey, category, title });
  
  // Try to get from storage first
  const storedImage = getPortfolioImage(imageKey);
  if (storedImage) {
    console.log('✅ [IMAGE SERVICE] Using stored image');
    return storedImage;
  }
  
  // If not found in storage, return placeholder based on title first, then category
  if (title) {
    const placeholderByTitle = getPlaceholderImageByTitle(title);
    console.log('🖼️ [IMAGE SERVICE] Using placeholder by title:', placeholderByTitle);
    return placeholderByTitle;
  }
  
  const placeholderByCategory = getPlaceholderImage(category);
  console.log('🖼️ [IMAGE SERVICE] Using placeholder by category:', placeholderByCategory);
  return placeholderByCategory;
};
