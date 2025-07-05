// Script to check Supabase database tables
import { supabase } from './src/lib/supabase.js';

const checkDatabase = async () => {
  console.log('🔍 Checking Supabase database...');
  
  try {
    // Check if courses table exists and has data
    console.log('\n📚 Checking courses table...');
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .limit(5);
    
    if (coursesError) {
      console.log('❌ Courses table error:', coursesError);
    } else {
      console.log('✅ Courses found:', courses.length);
      console.log('📋 Courses data:', courses);
    }

    // Check if course_notifications table exists
    console.log('\n📧 Checking course_notifications table...');
    const { data: notifications, error: notificationsError } = await supabase
      .from('course_notifications')
      .select('*')
      .limit(5);
    
    if (notificationsError) {
      console.log('❌ Course notifications table error:', notificationsError);
    } else {
      console.log('✅ Notifications found:', notifications.length);
      console.log('📋 Notifications data:', notifications);
    }

    // Check if course_episodes table exists
    console.log('\n🎬 Checking course_episodes table...');
    const { data: episodes, error: episodesError } = await supabase
      .from('course_episodes')
      .select('*')
      .limit(5);
    
    if (episodesError) {
      console.log('❌ Course episodes table error:', episodesError);
    } else {
      console.log('✅ Episodes found:', episodes.length);
      console.log('📋 Episodes data:', episodes);
    }

  } catch (error) {
    console.error('💥 Database check error:', error);
  }
};

// Run the check
checkDatabase(); 