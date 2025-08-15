const fs = require('fs');
const path = require('path');

// Script untuk menyalin gambar dari localStorage ke folder public
// Jalankan dengan: node scripts/copy-images.js

const publicImagesDir = path.join(__dirname, '../public/portfolio-images');

// Pastikan folder exists
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
  console.log('✅ Created portfolio-images directory');
}

// Fungsi untuk mengekstrak base64 ke file
function saveBase64ToFile(base64Data, filename) {
  try {
    // Remove data:image/jpeg;base64, prefix
    const base64Image = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Image, 'base64');
    
    const filePath = path.join(publicImagesDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    console.log(`✅ Saved: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving ${filename}:`, error.message);
    return false;
  }
}

// Fungsi untuk mendapatkan data dari localStorage (simulasi)
function getLocalStorageData() {
  // Ini adalah contoh data - dalam implementasi nyata, 
  // Anda perlu mengekstrak data dari browser localStorage
  return {
    // Contoh data localStorage
    'portfolio-image-1234567890-abc123': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    // Tambahkan data lain sesuai kebutuhan
  };
}

// Main function
function copyImagesToPublic() {
  console.log('🔄 Starting image copy process...');
  
  const localStorageData = getLocalStorageData();
  let successCount = 0;
  let errorCount = 0;
  
  Object.entries(localStorageData).forEach(([key, base64Data]) => {
    if (base64Data && base64Data.startsWith('data:image/')) {
      // Extract file extension from base64
      const match = base64Data.match(/data:image\/([a-z]+);base64,/);
      const extension = match ? match[1] : 'jpg';
      
      // Generate filename
      const filename = `${key}.${extension}`;
      
      if (saveBase64ToFile(base64Data, filename)) {
        successCount++;
      } else {
        errorCount++;
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully copied: ${successCount} images`);
  console.log(`❌ Failed to copy: ${errorCount} images`);
  console.log(`📁 Images saved to: ${publicImagesDir}`);
}

// Run the script
if (require.main === module) {
  copyImagesToPublic();
}

module.exports = { copyImagesToPublic, saveBase64ToFile };
