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
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing Supabase Edge Function...\n');

if (!supabaseUrl || !supabaseKey || !serviceRoleKey) {
  console.log('❌ Missing environment variables:');
  console.log('   PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('   PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  console.log('   SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log('🔗 Supabase URL:', supabaseUrl);
console.log('🔑 Anon Key:', supabaseKey.substring(0, 20) + '...');
console.log('🔑 Service Role Key:', serviceRoleKey.substring(0, 20) + '...');
console.log('');

// Test script to manually call the edge function
const testData = {
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  company: 'Test Company'
};

async function testEdgeFunction() {
  try {
    console.log('🧪 Testing edge function with data:', testData);
    
    const response = await fetch(`${supabaseUrl}/functions/v1/send-course-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log('✅ Edge function response:', result);
    
  } catch (error) {
    console.error('❌ Error testing edge function:', error);
  }
}

testEdgeFunction(); 