-- Enable the pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to call the edge function
CREATE OR REPLACE FUNCTION trigger_course_notification_email()
RETURNS TRIGGER AS $$
DECLARE
  service_role_key TEXT;
BEGIN
  -- Get the service role key from environment
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- If service role key is not available, use a default approach
  IF service_role_key IS NULL THEN
    -- Call the edge function without auth (it will handle auth internally)
    PERFORM
      net.http_post(
        url := 'https://jnmancmdvjslsvkzaufo.supabase.co/functions/v1/send-course-notification',
        headers := '{"Content-Type": "application/json"}',
        body := json_build_object(
          'email', NEW.email,
          'first_name', NEW.first_name,
          'last_name', NEW.last_name,
          'company', NEW.company
        )::text
      );
  ELSE
    -- Call the edge function with auth
    PERFORM
      net.http_post(
        url := 'https://jnmancmdvjslsvkzaufo.supabase.co/functions/v1/send-course-notification',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || service_role_key || '"}',
        body := json_build_object(
          'email', NEW.email,
          'first_name', NEW.first_name,
          'last_name', NEW.last_name,
          'company', NEW.company
        )::text
      );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS course_notification_email_trigger ON course_notifications;
CREATE TRIGGER course_notification_email_trigger
  AFTER INSERT ON course_notifications
  FOR EACH ROW
  EXECUTE FUNCTION trigger_course_notification_email();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_course_notification_email() TO authenticated; 