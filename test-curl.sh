#!/bin/bash

# Test script for course notification edge function
# Replace the URL and key with your actual values

SUPABASE_URL="https://jnmancmdvjslsvkzaufo.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"

echo "🧪 Testing course notification edge function..."
echo "📧 Sending test email to wayne@acmemarketing.us"

curl -X POST "${SUPABASE_URL}/functions/v1/send-course-notification" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -d '{
    "email": "wayne@acmemarketing.us",
    "first_name": "Wayne",
    "last_name": "Sheppard",
    "company": "ACME Marketing"
  }'

echo ""
echo "📝 Instructions:"
echo "1. Replace SUPABASE_ANON_KEY with your actual anon key"
echo "2. Make sure Hostinger SMTP is configured in Supabase dashboard"
echo "3. Check your email inbox for the test message" 