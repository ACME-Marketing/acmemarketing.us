#!/usr/bin/env node

import fs from 'fs';

// Load environment variables manually
const envContent = fs.readFileSync('.env', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && !key.startsWith('#')) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.PUBLIC_SUPABASE_ANON_KEY;

console.log('🧪 Testing Supabase Edge Function...\n');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing environment variables:');
  console.log('   PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('   PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log('🔗 Supabase URL:', supabaseUrl);
console.log('🔑 Anon Key:', supabaseKey.substring(0, 20) + '...');
console.log('');

const testData = {
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  company: 'Test Company'
};

console.log('📧 Test data:', testData);
console.log('');

try {
  console.log('🚀 Calling edge function...');
  
  const response = await fetch(`${supabaseUrl}/functions/v1/send-course-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify(testData)
  });

  console.log('📊 Response status:', response.status);
  console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
  
  const responseText = await response.text();
  console.log('📄 Response text:', responseText);
  
  if (response.ok) {
    try {
      const result = JSON.parse(responseText);
      console.log('✅ Edge function test successful:', result);
    } catch (parseError) {
      console.log('⚠️ Response is not JSON:', responseText);
    }
  } else {
    console.log('❌ Edge function test failed');
  }
  
} catch (error) {
  console.error('💥 Error testing edge function:', error.message);
} 