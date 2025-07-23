import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const supabaseUrl = "https://jnmancmdvjslsvkzaufo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubWFuY21kdmpzbHN2a3phdWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODQ1OTMsImV4cCI6MjA2NzI2MDU5M30.oiaztyJ64bZWFxDf1krcf8Ha0i6uKXwvzWm_9bMALZg";
const supabase = createClient(supabaseUrl, supabaseAnonKey) ;
const GET = async ({ request, url }) => {
  const email = url.searchParams.get("email");
  if (!email || email.trim() === "") {
    return new Response(JSON.stringify({ error: "Email parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!supabase) {
    return new Response(JSON.stringify({
      error: "Database connection not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const { data, error } = await supabase.from("course_notifications").select("*").eq("email", email).eq("is_active", true).single();
    if (error && error.code !== "PGRST116") {
      throw error;
    }
    return new Response(JSON.stringify({
      subscribed: !!data,
      notification: data
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error checking course notification status:", error);
    return new Response(JSON.stringify({
      error: "Database error",
      details: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  if (!supabase) {
    return new Response(JSON.stringify({
      error: "Database connection not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    const { email, first_name, last_name, company, notification_preferences } = body;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: existing } = await supabase.from("course_notifications").select("id").eq("email", email).eq("is_active", true).single();
    if (existing) {
      return new Response(JSON.stringify({
        error: "Email already subscribed to course notifications",
        subscribed: true
      }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data, error } = await supabase.from("course_notifications").insert({
      email,
      first_name: first_name || null,
      last_name: last_name || null,
      company: company || null,
      notification_preferences: notification_preferences || {
        new_courses: true,
        course_updates: true,
        special_offers: true
      }
    }).select().single();
    if (error) {
      throw error;
    }
    console.log("✅ Course notification subscription created:", data);
    try {
      const edgeFunctionUrl = `${supabaseUrl}/functions/v1/send-course-notification`;
      const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubWFuY21kdmpzbHN2a3phdWZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTY4NDU5MywiZXhwIjoyMDY3MjYwNTkzfQ.ShuMRkUie98i-nv8EhVB0JBGHWnqFozOuysJGx6-smM";
      if (!serviceRoleKey) ;
      const response = await fetch(edgeFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({
          email: data.email,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          company: data.company || ""
        })
      });
      if (response.ok) {
        console.log("📧 Welcome email sent successfully via edge function.");
      } else {
        const errorText = await response.text();
        console.error("❌ Failed to send welcome email via edge function:", response.status, errorText);
      }
    } catch (emailError) {
      console.error("❌ Error calling edge function:", emailError);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Successfully subscribed to course notifications. Welcome email will be sent shortly.",
      notification: data
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error subscribing to course notifications:", error);
    return new Response(JSON.stringify({
      error: "Database error",
      details: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
