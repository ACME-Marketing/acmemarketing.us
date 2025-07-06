import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Debugging environment variables...\n');

// Check all environment variables
const envVars = {
  'PUBLIC_SUPABASE_URL': process.env.PUBLIC_SUPABASE_URL,
  'PUBLIC_SUPABASE_ANON_KEY': process.env.PUBLIC_SUPABASE_ANON_KEY,
  'SUPABASE_URL': process.env.SUPABASE_URL,
  'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY,
};

console.log('📋 Environment variables:');
Object.entries(envVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${key.includes('KEY') ? value.substring(0, 20) + '...' : value}`);
  } else {
    console.log(`❌ ${key}: Missing`);
  }
});

console.log('\n🔍 Testing Astro import.meta.env access...');

// Simulate what the API endpoint would see
try {
  // This is what the API endpoint tries to do
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log('📊 Supabase URL available:', !!supabaseUrl);
  console.log('📊 Service Role Key available:', !!serviceRoleKey);
  
  if (supabaseUrl && serviceRoleKey) {
    console.log('✅ Both required variables are available');
    
    // Test the edge function call
    console.log('\n🧪 Testing edge function call...');
    
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/send-course-notification`;
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({
        email: 'debug-test@example.com',
        first_name: 'Debug',
        last_name: 'Test',
        company: 'Debug Company'
      })
    });
    
    console.log(`📊 Response status: ${response.status}`);
    const responseText = await response.text();
    console.log(`📊 Response body: ${responseText}`);
    
  } else {
    console.log('❌ Missing required environment variables');
  }
  
} catch (error) {
  console.error('❌ Error during test:', error);
} 