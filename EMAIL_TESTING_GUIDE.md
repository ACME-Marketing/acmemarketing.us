# Email Testing Guide for ACME Marketing

## Overview
This guide will help you test the course notification email system using Hostinger SMTP.

## Prerequisites

### 1. Get Your Supabase Anon Key
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/jnmancmdvjslsvkzaufo
2. Navigate to **Settings** → **API**
3. Copy the **"anon public"** key (starts with `eyJ...`)

### 2. Configure Hostinger SMTP in Supabase
1. In your Supabase dashboard, go to **Settings** → **Auth** → **SMTP Settings**
2. Enable SMTP and enter:
   ```
   Host: smtp.hostinger.com
   Port: 587
   Username: noreply@acmemarketing.us
   Password: your-email-password
   Sender Name: ACME Marketing
   Sender Email: noreply@acmemarketing.us
   ```
3. Test the connection and save

## Testing Methods

### Method 1: Test via Website (Recommended)
1. Go to your courses page: `https://acmemarketing.us/courses`
2. Click "Get Notified" button
3. Fill out the form with your email
4. Check your email inbox for the welcome message

### Method 2: Test via Curl
1. Update the `test-curl.sh` file with your anon key:
   ```bash
   SUPABASE_ANON_KEY="your-actual-anon-key-here"
   ```
2. Run the test:
   ```bash
   ./test-curl.sh
   ```

### Method 3: Test via Node.js
1. Set your anon key as environment variable:
   ```bash
   export SUPABASE_ANON_KEY="your-actual-anon-key-here"
   ```
2. Run the test:
   ```bash
   node test-edge-function.js
   ```

## Expected Results

### Success Response
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Email Content
You should receive a beautifully formatted email with:
- ✅ ACME Marketing branding
- ✅ Personalized greeting
- ✅ Course notification benefits
- ✅ Call-to-action button
- ✅ Professional footer

## Troubleshooting

### Common Issues

**"401 Unauthorized"**
- Check that your anon key is correct
- Ensure the key starts with `eyJ...`

**"500 Internal Server Error"**
- Check Supabase function logs: `supabase functions logs send-course-notification`
- Verify SMTP settings are configured correctly

**"SMTP Authentication Failed"**
- Double-check Hostinger email credentials
- Ensure email account is active

**"Email not received"**
- Check spam/junk folder
- Verify email address is correct
- Check Hostinger email settings

### Check Function Logs
```bash
supabase functions logs send-course-notification --follow
```

### Test SMTP Connection
In Supabase dashboard:
1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Click "Test Connection"
3. Check for any error messages

## Next Steps

Once email testing is successful:
1. ✅ Test the full user flow on your website
2. ✅ Monitor email delivery rates
3. ✅ Set up email templates for different notifications
4. ✅ Configure email analytics if needed

---

**Need Help?** Check the Supabase documentation or contact support if issues persist. 