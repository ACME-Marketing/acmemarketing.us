import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('🧪 Testing notification signup after RLS fix...');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testNotificationSignup() {
  try {
    const testEmail = `test-notification-${Date.now()}@example.com`;
    
    console.log(`📧 Testing with email: ${testEmail}`);
    
    // Test 1: Check if email exists (should work)
    console.log('\n🔍 Test 1: Checking if email exists...');
    const { data: existingData, error: existingError } = await supabase
      .from('course_notifications')
      .select('*')
      .eq('email', testEmail)
      .single();
    
    if (existingError && existingError.code !== 'PGRST116') {
      console.error('❌ Select test failed:', existingError);
      return;
    }
    
    console.log('✅ Select test passed (email not found, as expected)');
    
    // Test 2: Insert new notification (should work)
    console.log('\n📝 Test 2: Inserting new notification...');
    const { data: insertData, error: insertError } = await supabase
      .from('course_notifications')
      .insert({
        email: testEmail,
        first_name: 'Test',
        last_name: 'User',
        company: 'Test Company',
        notification_preferences: {
          new_courses: true,
          course_updates: true,
          special_offers: false
        }
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError);
      return;
    }
    
    console.log('✅ Insert test passed:', insertData);
    
    // Test 3: Check if email exists now (should work)
    console.log('\n🔍 Test 3: Checking if email exists after insert...');
    const { data: checkData, error: checkError } = await supabase
      .from('course_notifications')
      .select('*')
      .eq('email', testEmail)
      .single();
    
    if (checkError) {
      console.error('❌ Check after insert failed:', checkError);
      return;
    }
    
    console.log('✅ Check after insert passed:', checkData);
    
    // Test 4: Try to insert duplicate (should fail gracefully)
    console.log('\n🔄 Test 4: Testing duplicate email handling...');
    const { data: duplicateData, error: duplicateError } = await supabase
      .from('course_notifications')
      .insert({
        email: testEmail,
        first_name: 'Duplicate',
        last_name: 'User'
      })
      .select()
      .single();
    
    if (duplicateError && duplicateError.code === '23505') {
      console.log('✅ Duplicate handling works (unique constraint violation as expected)');
    } else if (duplicateError) {
      console.error('❌ Unexpected duplicate error:', duplicateError);
    } else {
      console.log('⚠️ Duplicate was allowed (this might be unexpected)');
    }
    
    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('course_notifications')
      .delete()
      .eq('email', testEmail);
    
    if (deleteError) {
      console.error('⚠️ Cleanup error (non-critical):', deleteError);
    } else {
      console.log('✅ Test data cleaned up');
    }
    
    console.log('\n🎉 All tests passed! The notification signup form should now work correctly.');
    console.log('\n📋 Next steps:');
    console.log('1. Test the actual notification form on your website');
    console.log('2. Check that emails are being sent (if email trigger is set up)');
    console.log('3. Verify the form clears properly after submission');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testNotificationSignup(); 