-- Fix table names to match the code expectations
-- This migration aligns the database with what the code actually expects

-- First, let's see what tables exist and drop the conflicting ones
DROP TABLE IF EXISTS episode_access_logs CASCADE;
DROP TABLE IF EXISTS course_enrollments CASCADE;
DROP TABLE IF EXISTS course_notifications CASCADE;
DROP TABLE IF EXISTS episodes CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS course_episodes CASCADE; -- Drop the old table that shouldn't exist

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS trigger_course_notification_email() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create courses table with the EXACT field names the code expects
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image_url TEXT,
    price DECIMAL(10,2),
    stripe_price_id VARCHAR(255), -- Add this field that the code expects
    is_free BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true, -- Use is_active instead of enabled to match code
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_episodes table (not episodes) to match what the code expects
CREATE TABLE course_episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    video_url TEXT,
    duration_minutes INTEGER,
    episode_number INTEGER NOT NULL,
    is_free BOOLEAN DEFAULT false,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, episode_number)
);

-- Create course notifications table
CREATE TABLE course_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(255),
    notification_preferences JSONB DEFAULT '{"new_courses": true, "course_updates": true, "special_offers": true}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table (extends auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course enrollments table
CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0,
    UNIQUE(user_id, course_id)
);

-- Create episode access logs table
CREATE TABLE episode_access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    episode_id UUID REFERENCES course_episodes(id) ON DELETE CASCADE, -- Reference course_episodes, not episodes
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    watch_duration_seconds INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE episode_access_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read, admin write)
CREATE POLICY "Courses are viewable by everyone" ON courses
    FOR SELECT USING (is_active = true); -- Use is_active to match code

CREATE POLICY "Courses are insertable by authenticated users" ON courses
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Courses are updatable by authenticated users" ON courses
    FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for course_episodes (public read, admin write)
CREATE POLICY "Course episodes are viewable by everyone" ON course_episodes
    FOR SELECT USING (enabled = true);

CREATE POLICY "Course episodes are insertable by authenticated users" ON course_episodes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Course episodes are updatable by authenticated users" ON course_episodes
    FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for course_notifications (public insert, user read own)
CREATE POLICY "Course notifications are insertable by everyone" ON course_notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Course notifications are viewable by owner" ON course_notifications
    FOR SELECT USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Course notifications are updatable by owner" ON course_notifications
    FOR UPDATE USING (email = auth.jwt() ->> 'email');

-- RLS Policies for user_profiles (user owns their profile)
CREATE POLICY "User profiles are viewable by owner" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "User profiles are insertable by owner" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "User profiles are updatable by owner" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for course_enrollments (user owns their enrollments)
CREATE POLICY "Course enrollments are viewable by owner" ON course_enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Course enrollments are insertable by owner" ON course_enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Course enrollments are updatable by owner" ON course_enrollments
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for episode_access_logs (user owns their logs)
CREATE POLICY "Episode access logs are viewable by owner" ON episode_access_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Episode access logs are insertable by owner" ON episode_access_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Episode access logs are updatable by owner" ON episode_access_logs
    FOR UPDATE USING (auth.uid() = user_id);

-- Function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, first_name, last_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to send course notification email
CREATE OR REPLACE FUNCTION trigger_course_notification_email()
RETURNS TRIGGER AS $$
DECLARE
    service_role_key TEXT;
    edge_function_url TEXT;
    response_status INTEGER;
BEGIN
    -- Get the service role key from environment
    service_role_key := current_setting('app.settings.service_role_key', true);
    
    -- If service role key is not set, log and return
    IF service_role_key IS NULL THEN
        RAISE LOG 'Service role key not found in environment';
        RETURN NEW;
    END IF;
    
    -- Construct the edge function URL
    edge_function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-course-notification';
    
    -- Call the edge function
    SELECT status INTO response_status
    FROM net.http_post(
        url := edge_function_url,
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || service_role_key
        ),
        body := jsonb_build_object(
            'email', NEW.email,
            'first_name', COALESCE(NEW.first_name, ''),
            'last_name', COALESCE(NEW.last_name, ''),
            'company', COALESCE(NEW.company, '')
        )
    );
    
    -- Log the response
    RAISE LOG 'Edge function called for email % with status %', NEW.email, response_status;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error calling edge function for email %: %', NEW.email, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to send email when course notification is created
DROP TRIGGER IF EXISTS course_notification_email_trigger ON course_notifications;
CREATE TRIGGER course_notification_email_trigger
    AFTER INSERT ON course_notifications
    FOR EACH ROW EXECUTE FUNCTION trigger_course_notification_email();

-- Insert sample data with the correct field names
INSERT INTO courses (title, description, slug, price, stripe_price_id, is_free, is_active) VALUES
('AI Marketing Mastery', 'Learn how to leverage AI for effective marketing strategies', 'ai-marketing-mastery', 99.99, 'price_ai_marketing_mastery', false, true),
('Marketing Automation Fundamentals', 'Master the basics of marketing automation', 'marketing-automation-fundamentals', 0.00, 'price_automation_fundamentals', true, true),
('Content Strategy with AI', 'Create compelling content strategies using AI tools', 'content-strategy-with-ai', 149.99, 'price_content_strategy', false, true);

-- Insert sample episodes into course_episodes table
INSERT INTO course_episodes (course_id, title, description, episode_number, is_free, enabled) 
SELECT 
    c.id,
    'Introduction to AI Marketing',
    'Overview of how AI is transforming marketing',
    1,
    true,
    true
FROM courses c WHERE c.slug = 'ai-marketing-mastery';

INSERT INTO course_episodes (course_id, title, description, episode_number, is_free, enabled) 
SELECT 
    c.id,
    'Advanced AI Techniques',
    'Deep dive into advanced AI marketing techniques',
    2,
    false,
    true
FROM courses c WHERE c.slug = 'ai-marketing-mastery';

-- Create indexes for better performance
CREATE INDEX idx_courses_is_active ON courses(is_active);
CREATE INDEX idx_course_episodes_course_id ON course_episodes(course_id);
CREATE INDEX idx_course_episodes_enabled ON course_episodes(enabled);
CREATE INDEX idx_course_notifications_email ON course_notifications(email);
CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX idx_episode_access_logs_user_id ON episode_access_logs(user_id);
CREATE INDEX idx_episode_access_logs_episode_id ON episode_access_logs(episode_id); 