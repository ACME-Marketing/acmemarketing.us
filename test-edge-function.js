// Test script for Supabase edge function email
const testEdgeFunction = async () => {
  const testData = {
    email: 'wayne@acmemarketing.us',
    first_name: 'Wayne',
    last_name: 'Sheppard',
    company: 'ACME Marketing'
  };

  // Using the actual Supabase project URL from your deployment
  const SUPABASE_URL = 'https://jnmancmdvjslsvkzaufo.supabase.co';
  
  // You need to get your anon key from Supabase dashboard
  // Go to Settings > API and copy the "anon public" key
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your-anon-key-here';

  try {
    console.log('🧪 Testing Supabase edge function...');
    console.log('📧 Test data:', testData);
    
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-course-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(testData)
    });

    const result = await response.text();
    
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data:', result);
    
    if (response.ok) {
      console.log('✅ Edge function test successful!');
      console.log('📧 Check your email inbox for the welcome message');
    } else {
      console.log('❌ Edge function test failed:', result);
    }
    
  } catch (error) {
    console.error('💥 Test error:', error);
  }
};

// Instructions for setup
console.log('📝 Before running this test:');
console.log('1. Replace SUPABASE_URL with your actual project URL');
console.log('2. Replace SUPABASE_ANON_KEY with your actual anon key');
console.log('3. Make sure Hostinger SMTP is configured in Supabase dashboard');
console.log('4. Ensure the edge function is deployed');
console.log('');

// Uncomment the line below to run the test after setting up the credentials
// testEdgeFunction(); 