import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase.js';

export const GET: APIRoute = async ({ request, url }) => {
  const email = url.searchParams.get('email');
  
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabase
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
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

    // Optional: Send welcome email via n8n webhook
    try {
      const webhookUrl = (import.meta as any).env.N8N_WEBHOOK_URL;
      if (webhookUrl && data) {
        await fetch(webhookUrl + '/course-notification-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            first_name: first_name || null,
            last_name: last_name || null,
            company: company || null,
            notification_preferences: data.notification_preferences
          })
        });
      }
    } catch (webhookError) {
      console.warn('Failed to send webhook notification:', webhookError);
      // Don't fail the request if webhook fails
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed to course notifications',
      notification: data
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error subscribing to course notifications:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 