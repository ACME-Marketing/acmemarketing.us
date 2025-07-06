import fetch from 'node-fetch';

console.log('🧪 Testing website form submission...\n');

async function testWebsiteForm() {
  try {
    const testEmail = `website-test-${Date.now()}@example.com`;
    
    console.log(`📧 Testing with email: ${testEmail}`);
    
    // Simulate the exact request the website form would send
    const response = await fetch('http://localhost:4322/api/course-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail,
        first_name: 'Website',
        last_name: 'Test',
        company: 'Website Test Company',
        notification_preferences: {
          new_courses: true,
          course_updates: true,
          special_offers: false
        }
      })
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📊 Response headers:`, Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log(`📊 Response body: ${responseText}`);
    
    if (response.ok) {
      console.log('✅ Website form test successful');
      
      // Try to parse the response as JSON
      try {
        const responseData = JSON.parse(responseText);
        console.log('📋 Parsed response:', responseData);
      } catch (parseError) {
        console.log('⚠️ Response is not valid JSON');
      }
    } else {
      console.error('❌ Website form test failed');
    }
    
  } catch (error) {
    console.error('❌ Error testing website form:', error);
  }
}

testWebsiteForm(); 