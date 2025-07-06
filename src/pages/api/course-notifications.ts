import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Mark this as a server-rendered endpoint
export const prerender = false;

// Check if environment variables are available
const supabaseUrl = (import.meta as any).env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const GET: APIRoute = async ({ request, url }) => {
  const email = url.searchParams.get('email');
  
  if (!email || email.trim() === '') {
    return new Response(JSON.stringify({ error: 'Email parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!supabase) {
    return new Response(JSON.stringify({ 
      error: 'Database connection not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabase!
      .from('course_notifications')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw error;
    }

    return new Response(JSON.stringify({
      subscribed: !!data,
      notification: data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error checking course notification status:', error);
    return new Response(JSON.stringify({ 
      error: 'Database error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!supabase) {
    return new Response(JSON.stringify({ 
      error: 'Database connection not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { email, first_name, last_name, company, notification_preferences } = body;

    // Validate required fields
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('course_notifications')
      .select('id')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ 
        error: 'Email already subscribed to course notifications',
        subscribed: true 
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new notification subscription
    // The database trigger will automatically send the welcome email
    const { data, error } = await supabase
      .from('course_notifications')
      .insert({
        email,
        first_name: first_name || null,
        last_name: last_name || null,
        company: company || null,
        notification_preferences: notification_preferences || {
          new_courses: true,
          course_updates: true,
          special_offers: true
        }
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ Course notification subscription created:', data);
    
    // Call the edge function to send welcome email
    try {
      const edgeFunctionUrl = `${supabaseUrl}/functions/v1/send-course-notification`;
      
      // Try multiple ways to get the service role key
      const serviceRoleKey = (import.meta as any).env.SUPABASE_SERVICE_ROLE_KEY || 
                            (import.meta as any).env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
                            process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      console.log('🔍 Service role key available:', !!serviceRoleKey);
      
      if (serviceRoleKey) {
        console.log('📧 Calling edge function...');
        const response = await fetch(edgeFunctionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`
          },
          body: JSON.stringify({
            email: data.email,
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            company: data.company || ''
          })
        });
        
        console.log('📊 Edge function response status:', response.status);
        
        if (response.ok) {
          const responseText = await response.text();
          console.log('📧 Welcome email sent successfully via edge function');
          console.log('📊 Response:', responseText);
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to send welcome email:', response.status, response.statusText);
          console.error('📊 Error response:', errorText);
        }
      } else {
        console.warn('⚠️ Service role key not available, skipping email send');
        console.log('🔍 Available env vars:', Object.keys((import.meta as any).env || {}));
      }
    } catch (emailError) {
      console.error('❌ Error calling edge function:', emailError);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed to course notifications. Welcome email will be sent shortly.',
      notification: data
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error subscribing to course notifications:', error);
    return new Response(JSON.stringify({ 
      error: 'Database error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 