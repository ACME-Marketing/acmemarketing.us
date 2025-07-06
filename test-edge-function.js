#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing edge function invocation...');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

async function testEdgeFunction() {
  try {
    const testEmail = `test-edge-function-${Date.now()}@example.com`;
    
    console.log(`📧 Testing with email: ${testEmail}`);
    
    // Test 1: Call the edge function directly
    console.log('\n🔧 Test 1: Calling edge function directly...');
    
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/send-course-notification`;
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({
        email: testEmail,
        first_name: 'Test',
        last_name: 'User',
        company: 'Test Company'
      })
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📊 Response status text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`📊 Response body: ${responseText}`);
    
    if (response.ok) {
      console.log('✅ Edge function call successful');
    } else {
      console.error('❌ Edge function call failed');
    }
    
    // Test 2: Test through the API endpoint (simulate form submission)
    console.log('\n🌐 Test 2: Testing through API endpoint...');
    
    const apiResponse = await fetch('http://localhost:4322/api/course-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail,
        first_name: 'API Test',
        last_name: 'User',
        company: 'API Test Company'
      })
    });
    
    console.log(`📊 API Response status: ${apiResponse.status}`);
    
    const apiResponseText = await apiResponse.text();
    console.log(`📊 API Response body: ${apiResponseText}`);
    
    if (apiResponse.ok) {
      console.log('✅ API endpoint test successful');
    } else {
      console.error('❌ API endpoint test failed');
    }
    
    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { error: deleteError } = await supabase
      .from('course_notifications')
      .delete()
      .eq('email', testEmail);
    
    if (deleteError) {
      console.error('⚠️ Cleanup error (non-critical):', deleteError);
    } else {
      console.log('✅ Test data cleaned up');
    }
    
    console.log('\n🎉 Edge function testing complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Check your email inbox for test messages');
    console.log('2. Test the actual notification form on your website');
    console.log('3. Monitor the browser console for API logs');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testEdgeFunction(); 