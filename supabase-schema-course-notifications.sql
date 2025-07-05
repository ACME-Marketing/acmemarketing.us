-- Course Notifications Table
CREATE TABLE course_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(200),
  notification_preferences JSONB DEFAULT '{"new_courses": true, "course_updates": true, "special_offers": true}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_course_notifications_email ON course_notifications(email);
CREATE INDEX idx_course_notifications_active ON course_notifications(is_active);

-- Row Level Security (RLS) policies
ALTER TABLE course_notifications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for signups)
CREATE POLICY "Allow public insert" ON course_notifications
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own notifications
CREATE POLICY "Allow users to view own" ON course_notifications
  FOR SELECT USING (true);

-- Allow users to update their own notifications
CREATE POLICY "Allow users to update own" ON course_notifications
  FOR UPDATE USING (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_course_notifications_updated_at
  BEFORE UPDATE ON course_notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 