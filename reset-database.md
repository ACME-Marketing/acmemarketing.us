# Simple Database Reset Guide

This guide will help you reset just the database tables without affecting your Supabase project.

## Step 1: Run the Reset SQL

1. **Go to your Supabase Dashboard**
2. **Navigate to the SQL Editor**
3. **Copy and paste the entire contents of `supabase/migrations/002_reset_tables_only.sql`**
4. **Click "Run" to execute the script**

That's it! This will:
- Drop all existing course-related tables
- Recreate them with the proper schema
- Set up all triggers and functions
- Add sample data
- Configure RLS policies

## Step 2: Set Environment Variables (if not already set)

After running the SQL, verify these environment variables are set:

1. **Go to Settings → Database**
2. **Scroll down to "Environment Variables"**
3. **Make sure these are set:**

```
app.settings.service_role_key = [YOUR_SERVICE_ROLE_KEY]
app.settings.supabase_url = https://[YOUR_PROJECT_ID].supabase.co
```

## Step 3: Deploy the Edge Function

Run this command to deploy the updated edge function:

```bash
supabase functions deploy send-course-notification
```

## Step 4: Test the System

1. **Visit your courses page** - should show 3 sample courses
2. **Test the notification form** - should save to database and trigger email
3. **Check the logs** - should see the trigger working properly

## What This Accomplishes

✅ **Clean tables** - No conflicting data or triggers
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