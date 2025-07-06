# Fix Course Notification RLS Policies

## Problem
The notification signup form is getting a database error because the Row Level Security (RLS) policies on the `course_notifications` table are too restrictive for public access.

## Solution
Apply the following SQL in your Supabase SQL Editor:

```sql
-- Fix RLS policies for course_notifications to allow public access
-- This migration fixes the issue where unauthenticated users can't sign up for notifications

-- Drop existing policies for course_notifications
DROP POLICY IF EXISTS "Course notifications are insertable by everyone" ON course_notifications;
DROP POLICY IF EXISTS "Course notifications are viewable by owner" ON course_notifications;
DROP POLICY IF EXISTS "Course notifications are updatable by owner" ON course_notifications;

-- Create new policies that allow public access for notification signup
-- Allow anyone to insert (for signup)
CREATE POLICY "Course notifications are insertable by everyone" ON course_notifications
    FOR INSERT WITH CHECK (true);

-- Allow anyone to select (for checking if email exists)
CREATE POLICY "Course notifications are viewable by everyone" ON course_notifications
    FOR SELECT USING (true);

-- Allow updates only by authenticated users or by email match
CREATE POLICY "Course notifications are updatable by owner or email match" ON course_notifications
    FOR UPDATE USING (
        auth.role() = 'authenticated' OR 
        email = COALESCE(auth.jwt() ->> 'email', '')
    );
```

## Steps to Apply

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the SQL above
4. Click "Run" to execute
5. Test the notification form on your website

## What This Fixes

- **Before**: Only authenticated users could insert/select from course_notifications
- **After**: Anyone can insert (sign up) and select (check for duplicates) from course_notifications
- **Security**: Updates still require authentication or email match

## Testing

After applying the fix, test the notification signup form on your website. It should now work without database errors. 