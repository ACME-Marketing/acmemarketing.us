# Email Setup Guide for Course Notifications

## Option 1: Supabase Built-in SMTP (Easiest)

### 1. Configure SMTP in Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Auth** → **SMTP Settings**
3. Enable SMTP and configure with your email provider

### 2. Popular SMTP Providers

#### Gmail (Recommended for testing)
```
Host: smtp.gmail.com
Port: 587
Username: your-email@gmail.com
Password: your-app-password (not regular password)
```
**Note**: You'll need to create an "App Password" in your Google Account settings

#### SendGrid
```
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: your-sendgrid-api-key
```

#### Resend
```
Host: smtp.resend.com
Port: 587
Username: resend
Password: your-resend-api-key
```

## Option 2: Supabase Edge Functions (More Control)

### 1. Deploy the Edge Function
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_ID`
4. Deploy the function: `supabase functions deploy send-course-notification`

### 2. Set Environment Variables
In your Supabase dashboard → Settings → Edge Functions:
- `RESEND_API_KEY` (if using Resend)
- `SENDGRID_API_KEY` (if using SendGrid)

### 3. Update the Edge Function
Uncomment the email sending code in `supabase/functions/send-course-notification/index.ts` and configure your preferred email service.

## Option 3: Use n8n for Email Automation

### 1. Create n8n Workflow
1. Set up a webhook trigger
2. Add email node (Gmail, SendGrid, etc.)
3. Configure email template
4. Deploy and get webhook URL

### 2. Update API to Use n8n
The current API is already configured to optionally use n8n webhooks. Just uncomment the n8n section and add your webhook URL to environment variables.

## Testing

### 1. Test Course Notification Form
1. Go to `/courses` page
2. Click "Get Notified"
3. Fill out the form
4. Check Supabase dashboard → Table Editor → `course_notifications`
5. Check your email for welcome message

### 2. Test API Directly
```bash
curl -X POST http://localhost:4322/api/course-notifications \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","first_name":"Test","last_name":"User"}'
```

## Recommended Setup for Production

1. **Use Supabase SMTP** for simplicity
2. **Set up proper email templates** with your branding
3. **Configure email verification** for new signups
4. **Set up email analytics** to track open rates
5. **Create automated sequences** for course launches

## Environment Variables Needed

Add these to your `.env` file:
```env
# For Supabase SMTP
SUPABASE_SMTP_HOST=smtp.gmail.com
SUPABASE_SMTP_PORT=587
SUPABASE_SMTP_USER=your-email@gmail.com
SUPABASE_SMTP_PASS=your-app-password

# For Edge Functions
RESEND_API_KEY=your-resend-key
# or
SENDGRID_API_KEY=your-sendgrid-key

# For n8n (optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/course-notifications
``` 