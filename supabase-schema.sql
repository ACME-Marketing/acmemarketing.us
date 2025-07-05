-- Course System Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stripe_price_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course episodes table
CREATE TABLE IF NOT EXISTS course_episodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  episode_number INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT false,
  video_url TEXT,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, episode_number)
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  payment_data JSONB,
  stripe_subscription_id TEXT,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Create access logs table
CREATE TABLE IF NOT EXISTS access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  episode_id UUID REFERENCES course_episodes(id) ON DELETE CASCADE,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create user profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  job_title TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Courses: Anyone can read active courses
CREATE POLICY "Anyone can view active courses" ON courses
  FOR SELECT USING (is_active = true);

-- Course Episodes: Anyone can read free episodes, enrolled users can read all episodes
CREATE POLICY "Anyone can view free episodes" ON course_episodes
  FOR SELECT USING (is_free = true);

CREATE POLICY "Enrolled users can view all episodes" ON course_episodes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.user_id = auth.uid() 
      AND enrollments.course_id = course_episodes.course_id 
      AND enrollments.status = 'active'
    )
  );

-- Enrollments: Users can only see their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own enrollments" ON enrollments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own enrollments" ON enrollments
  FOR UPDATE USING (user_id = auth.uid());

-- Access Logs: Users can only see their own access logs
CREATE POLICY "Users can view own access logs" ON access_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own access logs" ON access_logs
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- User Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_course_episodes_course_id ON course_episodes(course_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_user_id ON access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_episode_id ON access_logs(episode_id);

-- Create function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample course data
INSERT INTO courses (title, description, price, stripe_price_id) VALUES
(
  'AI Marketing Mastery',
  'Learn how to leverage AI tools for marketing success',
  97.00,
  'price_ai_marketing_mastery'
),
(
  'Content Creation with AI',
  'Create engaging content faster with AI assistance',
  67.00,
  'price_content_creation_ai'
);

-- Insert sample episodes (first episode free for each course)
INSERT INTO course_episodes (course_id, title, description, episode_number, is_free, content) VALUES
-- AI Marketing Mastery episodes
(
  (SELECT id FROM courses WHERE title = 'AI Marketing Mastery'),
  'Introduction to AI Marketing',
  'Learn the fundamentals of AI-powered marketing',
  1,
  true,
  'This is the free introduction episode content...'
),
(
  (SELECT id FROM courses WHERE title = 'AI Marketing Mastery'),
  'Setting Up Your AI Marketing Stack',
  'Configure the essential AI tools for marketing',
  2,
  false,
  'This episode covers setting up your AI marketing tools...'
),
(
  (SELECT id FROM courses WHERE title = 'AI Marketing Mastery'),
  'AI-Powered Content Strategy',
  'Develop content strategies that leverage AI',
  3,
  false,
  'Learn how to create content strategies with AI...'
),
-- Content Creation with AI episodes
(
  (SELECT id FROM courses WHERE title = 'Content Creation with AI'),
  'AI Content Creation Basics',
  'Get started with AI content creation tools',
  1,
  true,
  'This is the free introduction to AI content creation...'
),
(
  (SELECT id FROM courses WHERE title = 'Content Creation with AI'),
  'Writing Blog Posts with AI',
  'Create engaging blog content using AI assistance',
  2,
  false,
  'Learn how to write better blog posts with AI...'
); 