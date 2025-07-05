// Test script to debug the course notifications API
const testAPI = async () => {
  console.log('🧪 Testing Course Notifications API...\n');

  const baseUrl = 'http://localhost:4322';
  const testEmail = 'test@example.com';

  try {
    // Test GET endpoint
    console.log('1️⃣ Testing GET /api/course-notifications?email=' + testEmail);
    const getResponse = await fetch(`${baseUrl}/api/course-notifications?email=${testEmail}`);
    
    if (!getResponse.ok) {
      console.log(`   ❌ GET failed with status: ${getResponse.status}`);
      const errorText = await getResponse.text();
      console.log(`   Error response: ${errorText}`);
      
      if (getResponse.status === 500) {
        console.log('   💡 This usually means missing environment variables or database connection issues');
        console.log('   📝 Run: node setup-env.js to set up your .env file');
      }
      console.log('');
    } else {
      const getData = await getResponse.json();
      console.log(`   ✅ GET successful (${getResponse.status})`);
      console.log(`   Response:`, JSON.stringify(getData, null, 2));
      console.log('');
    }

    // Test POST endpoint
    console.log('2️⃣ Testing POST /api/course-notifications');
    const postData = {
      email: testEmail,
      first_name: 'Test',
      last_name: 'User',
      company: 'Test Company',
      notification_preferences: {
        new_courses: true,
        course_updates: true,
        special_offers: false
      }
    };

    const postResponse = await fetch(`${baseUrl}/api/course-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!postResponse.ok) {
      console.log(`   ❌ POST failed with status: ${postResponse.status}`);
      const errorText = await postResponse.text();
      console.log(`   Error response: ${errorText}`);
      
      if (postResponse.status === 500) {
        console.log('   💡 This usually means missing environment variables or database connection issues');
        console.log('   📝 Run: node setup-env.js to set up your .env file');
      }
      console.log('');
    } else {
      const postResult = await postResponse.json();
      console.log(`   ✅ POST successful (${postResponse.status})`);
      console.log(`   Response:`, JSON.stringify(postResult, null, 2));
      console.log('');
    }

    // Test duplicate subscription
    console.log('3️⃣ Testing duplicate subscription (should return 409)');
    const duplicateResponse = await fetch(`${baseUrl}/api/course-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (duplicateResponse.status === 409) {
      console.log(`   ✅ Duplicate test successful (${duplicateResponse.status})`);
      const duplicateResult = await duplicateResponse.json();
      console.log(`   Response:`, JSON.stringify(duplicateResult, null, 2));
    } else {
      console.log(`   ⚠️  Unexpected status: ${duplicateResponse.status}`);
      const duplicateResult = await duplicateResponse.json();
      console.log(`   Response:`, JSON.stringify(duplicateResult, null, 2));
    }

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('');
    console.log('💡 Troubleshooting tips:');
    console.log('   - Make sure the dev server is running: npm run dev');
    console.log('   - Check that .env file exists with Supabase credentials');
    console.log('   - Run: node setup-env.js to set up your .env file');
    console.log('   - Verify Supabase tables are created');
  }
};

// Run the test
testAPI(); 