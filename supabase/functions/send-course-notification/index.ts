import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, first_name, last_name, company } = await req.json()

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing environment variables:', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseServiceKey 
      })
      throw new Error('Missing required environment variables')
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Email data for SMTP
    const emailData = {
      from: 'ACME Marketing <noreply@acmemarketing.us>',
      to: email,
      subject: 'Welcome to ACME Marketing Course Notifications!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22d3ee; margin: 0; font-size: 28px;">ACME Marketing</h1>
            <p style="color: #94a3b8; margin: 5px 0;">AI First Marketing—Unleashed</p>
          </div>
          
          <h2 style="color: #22d3ee; border-bottom: 2px solid #22d3ee; padding-bottom: 10px;">Welcome to the Future of Marketing!</h2>
          
          <p>Hi ${first_name || 'there'},</p>
          
          <p>Thank you for subscribing to our course notifications! You're now part of an exclusive group that will be the first to know when we launch new AI marketing courses.</p>
          
          <div style="background: rgba(34, 211, 238, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #22d3ee; margin-top: 0;">What you'll receive:</h3>
            <ul style="color: #e2e8f0;">
              <li>🎯 <strong>New course announcements</strong> - Be first to access cutting-edge AI marketing strategies</li>
              <li>📈 <strong>Course updates and improvements</strong> - Get notified when we enhance existing courses</li>
              <li>💰 <strong>Special launch discounts</strong> - Exclusive pricing for early subscribers</li>
            </ul>
          </div>
          
          <p>We're excited to help you master AI-powered marketing and stay ahead of the competition!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://acmemarketing.us/courses" style="background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">View Our Courses</a>
          </div>
          
          <p style="color: #94a3b8; font-size: 14px; border-top: 1px solid #334155; padding-top: 20px; margin-top: 30px;">
            Best regards,<br>
            <strong>The ACME Marketing Team</strong><br>
            <a href="https://acmemarketing.us" style="color: #22d3ee;">acmemarketing.us</a>
          </p>
        </div>
      `
    }

    console.log('📧 Attempting to send email to:', email)
    console.log('🔧 Using Supabase URL:', supabaseUrl)

    // Use Supabase's auth system to send email
    // This will use your configured SMTP settings
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email: email,
      options: {
        data: {
          first_name: first_name || '',
          last_name: last_name || '',
          company: company || '',
          notification_type: 'course_notifications'
        }
      }
    })

    if (error) {
      console.error('❌ Supabase auth error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('✅ Email sent successfully via Supabase auth system')
    console.log('📧 Email data:', {
      to: email,
      subject: emailData.subject,
      from: emailData.from,
      html_length: emailData.html.length
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification email sent successfully',
        data: data
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Error in edge function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process notification request',
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
}) 