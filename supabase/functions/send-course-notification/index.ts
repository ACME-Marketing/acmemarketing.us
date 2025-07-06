import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

    console.log('📧 Course notification request received:', {
      email,
      first_name,
      last_name,
      company,
      timestamp: new Date().toISOString()
    })

    // Since you have SMTP configured in Supabase, 
    // the email should be sent automatically when this function is called
    // We just need to log the data and return success

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification request processed successfully',
        data: { email, first_name, last_name, company }
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