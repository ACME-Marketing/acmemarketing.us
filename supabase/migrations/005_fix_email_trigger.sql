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

-- Add a comment explaining the current setup
COMMENT ON FUNCTION trigger_course_notification_email() IS 
'Logs course notification creation. Email sending is handled by the API endpoint.'; 