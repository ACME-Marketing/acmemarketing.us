import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { email, first_name, last_name, company } = await req.json()

    const subject = "Welcome to ACME Marketing Courses!"
    const body = `
      <h1>Welcome, ${first_name || 'Friend'}!</h1>
      <p>Thank you for subscribing to course notifications from ACME Marketing. We're excited to have you.</p>
      <p>We will notify you at this email address (${email}) when new courses are released or when there are important updates.</p>
      <p>The ACME Marketing Team</p>
    `

    const { error } = await supabaseClient.rpc('send_email', {
      to_email: email,
      subject_line: subject,
      html_content: body,
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}) 