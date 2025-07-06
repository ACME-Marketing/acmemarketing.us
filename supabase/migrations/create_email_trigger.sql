-- Create a function to call the edge function
CREATE OR REPLACE FUNCTION trigger_course_notification_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function via HTTP
  PERFORM
    net.http_post(
      url := 'https://jnmancmdvjslsvkzaufo.supabase.co/functions/v1/send-course-notification',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
      body := json_build_object(
        'email', NEW.email,
        'first_name', NEW.first_name,
        'last_name', NEW.last_name,
        'company', NEW.company
      )::text
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE OR REPLACE TRIGGER course_notification_email_trigger
  AFTER INSERT ON course_notifications
  FOR EACH ROW
  EXECUTE FUNCTION trigger_course_notification_email();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_course_notification_email() TO authenticated; 