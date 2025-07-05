// Test script to check SMTP options in Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testSMTPOptions() {
  console.log('🔍 Testing SMTP options...')
  
  try {
    // Test 1: Check if we can access auth settings
    console.log('\n1. Checking auth settings...')
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()
    console.log('Auth access:', authError ? '❌ Failed' : '✅ Success')
    if (authError) console.log('Auth error:', authError.message)
    
    // Test 2: Check if we can access RPC functions
    console.log('\n2. Checking RPC functions...')
    const { data: rpcData, error: rpcError } = await supabase.rpc('send_email', {
      to: 'test@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
      from: 'test@acmemarketing.us'
    })
    console.log('RPC access:', rpcError ? '❌ Failed' : '✅ Success')
    if (rpcError) console.log('RPC error:', rpcError.message)
    
    // Test 3: Check database functions
    console.log('\n3. Checking database functions...')
    const { data: dbData, error: dbError } = await supabase
      .from('information_schema.routines')
      .select('routine_name')
      .eq('routine_type', 'FUNCTION')
      .like('routine_name', '%email%')
    
    console.log('Database functions:', dbError ? '❌ Failed' : '✅ Success')
    if (dbError) {
      console.log('DB error:', dbError.message)
    } else {
      console.log('Email-related functions:', dbData?.map(f => f.routine_name) || 'None found')
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error)
  }
}

testSMTPOptions() 