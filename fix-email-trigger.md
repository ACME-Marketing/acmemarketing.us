# Fix Email Trigger for Course Notifications

## Problem
The edge function `send-course-notification` is not being invoked when a new record is added to the `course_notifications` table.

## Solution
We've updated the system to call the edge function directly from the API endpoint instead of relying on a complex database trigger.

## Changes Made

### 1. Database Trigger (Simplified)
Apply this SQL in your Supabase SQL Editor:

```sql
-- Fix the email trigger to properly invoke the edge function
-- This migration replaces the complex trigger with a simpler one that works

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS course_notification_email_trigger ON course_notifications;
DROP FUNCTION IF EXISTS trigger_course_notification_email();

-- Create a simpler trigger function that logs the event
-- The actual email sending will be handled by the API endpoint
CREATE OR REPLACE FUNCTION trigger_course_notification_email()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the notification creation
    RAISE LOG 'Course notification created for email: % (Name: % % Company: %)', 
        NEW.email, 
        COALESCE(NEW.first_name, 'N/A'), 
        COALESCE(NEW.last_name, 'N/A'),
        COALESCE(NEW.company, 'N/A');
    
    -- Note: The actual email sending is now handled by the API endpoint
    -- This trigger just logs the event for debugging purposes
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in course notification trigger for email %: %', NEW.email, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER course_notification_email_trigger
    AFTER INSERT ON course_notifications
    FOR EACH ROW EXECUTE FUNCTION trigger_course_notification_email();
```

### 2. API Endpoint (Updated)
The API endpoint (`src/pages/api/course-notifications.ts`) has been updated to:
- Call the edge function directly after creating a notification
- Use the service role key for authentication
- Handle errors gracefully
- Log success/failure of email sending

## How It Works Now

1. **User submits notification form** → API endpoint receives request
2. **API creates database record** → Notification is saved to `course_notifications` table
3. **API calls edge function** → `send-course-notification` function is invoked with user data
4. **Edge function sends email** → Welcome email is sent via SMTP
5. **User receives confirmation** → Success message shown on frontend

## Testing

After applying the changes:

1. **Test the notification form** on your website
2. **Check the browser console** for API logs
3. **Check your email inbox** for welcome messages
4. **Monitor Supabase logs** for trigger execution

## Environment Variables Required

Make sure your `.env` file includes:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

The service role key is needed for the API to authenticate with the edge function. 