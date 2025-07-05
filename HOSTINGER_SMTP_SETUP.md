# Hostinger SMTP Setup for ACME Marketing

## Overview
This guide shows how to configure Hostinger's SMTP servers with Supabase to send course notification emails from your acmemarketing.us domain.

## Step 1: Get Hostinger SMTP Credentials

### From Hostinger Control Panel:
1. Log into your Hostinger control panel
2. Go to **Email** → **Manage Email Accounts**
3. Create a new email account (e.g., `noreply@acmemarketing.us`) or use existing
4. Note down these credentials:
   - **SMTP Host**: `smtp.hostinger.com`
   - **SMTP Port**: `587` (STARTTLS) or `465` (SSL)
   - **Username**: Your full email address (e.g., `noreply@acmemarketing.us`)
   - **Password**: Your email password

## Step 2: Configure Supabase SMTP Settings

### In Supabase Dashboard:
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Auth** → **SMTP Settings**
3. Enable SMTP and enter:
   ```
   Host: smtp.hostinger.com
   Port: 587
   Username: noreply@acmemarketing.us
   Password: your-email-password
   Sender Name: ACME Marketing
   Sender Email: noreply@acmemarketing.us
   ```
4. Test the connection
5. Save settings

## Step 3: Deploy the Edge Function

The edge function is already configured to use your Hostinger SMTP settings:

```bash
# Deploy the edge function
supabase functions deploy send-course-notification
```

## Step 4: Test the Email System

1. Go to your courses page: `https://acmemarketing.us/courses`
2. Click "Get Notified" 
3. Fill out the form with your email
4. Check your email for the welcome message

## Email Template Features

The welcome email includes:
- ✅ ACME Marketing branding with gradient design
- ✅ Personalized greeting with first name
- ✅ Clear value proposition
- ✅ Call-to-action button to view courses
- ✅ Professional footer with contact info

## Troubleshooting

### Common Issues:

**"Authentication failed"**
- Double-check username/password
- Ensure email account is active in Hostinger

**"Connection timeout"**
- Try port 465 instead of 587
- Check if Hostinger SMTP is enabled for your account

**"Email not sending"**
- Check Supabase function logs
- Verify SMTP settings are saved correctly

### Check Logs:
```bash
# View edge function logs
supabase functions logs send-course-notification
```

## Benefits of This Setup

✅ **Low Cost**: No additional email service fees  
✅ **Reliable**: Hostinger's proven SMTP infrastructure  
✅ **Branded**: Emails come from your domain  
✅ **Simple**: No complex API integrations  
✅ **Scalable**: Can handle growth as needed  

## Next Steps

Once this is working, you can:
1. Add more email templates for different notifications
2. Set up automated course launch emails
3. Create email sequences for new subscribers
4. Add unsubscribe functionality

---

**Need Help?** Check the Supabase documentation or Hostinger support for SMTP-specific issues. 