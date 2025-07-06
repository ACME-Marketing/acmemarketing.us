# Database Reset Guide

This guide will help you completely reset your Supabase database and apply the fresh schema with all triggers and functions.

## Step 1: Backup Current Data (Optional)
If you have any important data you want to keep, export it first from the Supabase dashboard.

## Step 2: Reset Database in Supabase Dashboard

1. **Go to your Supabase Dashboard**
2. **Navigate to Settings → Database**
3. **Scroll down to "Danger Zone"**
4. **Click "Reset Database"**
5. **Confirm the reset** (this will delete ALL data and tables)

## Step 3: Apply the New Schema

1. **Go to the SQL Editor in your Supabase Dashboard**
2. **Copy and paste the entire contents of `supabase/migrations/001_initial_schema.sql`**
3. **Click "Run" to execute the schema**

## Step 4: Set Environment Variables

After applying the schema, you need to set the environment variables for the database trigger:

1. **Go to Settings → Database**
2. **Scroll down to "Environment Variables"**
3. **Add these variables:**

```
app.settings.service_role_key = [YOUR_SERVICE_ROLE_KEY]
app.settings.supabase_url = https://[YOUR_PROJECT_ID].supabase.co
```

Replace `[YOUR_SERVICE_ROLE_KEY]` with your actual service role key and `[YOUR_PROJECT_ID]` with your project ID.

## Step 5: Deploy the Edge Function

Run this command to deploy the updated edge function:

```bash
supabase functions deploy send-course-notification
```

## Step 6: Test the System

1. **Test the courses page** - should show the sample courses
2. **Test the notification form** - should save to database and trigger email
3. **Check the logs** - should see the trigger working properly

## What This Reset Accomplishes

✅ **Clean slate** - No conflicting data or triggers
✅ **Proper schema** - All tables with correct relationships
✅ **Working triggers** - Email notifications will work automatically
✅ **Sample data** - Test courses and episodes included
✅ **RLS policies** - Proper security in place
✅ **Indexes** - Optimized for performance

## Verification

After completing the reset, you should see:
- 3 sample courses in the courses table
- 2 sample episodes in the episodes table
- Working email triggers when notifications are created
- Proper RLS policies protecting data

The system will now work consistently with database triggers handling email sending automatically. 