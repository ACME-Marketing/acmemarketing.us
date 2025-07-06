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

-- Add a comment explaining the policy
COMMENT ON POLICY "Course notifications are insertable by everyone" ON course_notifications IS 
'Allows public signup for course notifications without requiring authentication';

COMMENT ON POLICY "Course notifications are viewable by everyone" ON course_notifications IS 
'Allows checking if email already exists for duplicate prevention'; 