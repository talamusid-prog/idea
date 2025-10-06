import { supabase } from './supabase';

// Fungsi untuk test koneksi database
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test 1: Cek koneksi dengan query sederhana
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
};

// Fungsi untuk test insert data
export const testInsertData = async () => {
  try {
    console.log('Testing insert data...');
    
    const testData = {
      title: 'Test Artikel ' + new Date().toISOString(),
      content: 'Ini adalah artikel test untuk memverifikasi fungsi insert.',
      excerpt: 'Artikel test untuk debugging.',
      slug: 'test-artikel-' + Date.now(),
      featured_image: '',
      author: 'Test Admin',
      tags: ['test', 'debug'],
      status: 'draft' as const,
      published_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Data yang akan diinsert:', testData);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([testData])
      .select();
    
    if (error) {
      console.error('❌ Insert failed:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return false;
    }
    
    console.log('✅ Insert successful:', data);
    return true;
  } catch (error) {
    console.error('❌ Insert error:', error);
    return false;
  }
};

// Fungsi untuk test read data
export const testReadData = async () => {
  try {
    console.log('Testing read data...');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('❌ Read failed:', error);
      return false;
    }
    
    console.log('✅ Read successful:', data);
    return true;
  } catch (error) {
    console.error('❌ Read error:', error);
    return false;
  }
};

// Fungsi untuk menjalankan semua test
export const runAllTests = async () => {
  console.log('🚀 Starting database tests...');
  
  const connectionTest = await testDatabaseConnection();
  if (!connectionTest) {
    console.log('❌ Connection test failed, stopping tests');
    return;
  }
  
  const readTest = await testReadData();
  if (!readTest) {
    console.log('❌ Read test failed');
  }
  
  const insertTest = await testInsertData();
  if (!insertTest) {
    console.log('❌ Insert test failed');
  }
  
  console.log('🏁 All tests completed');
};
