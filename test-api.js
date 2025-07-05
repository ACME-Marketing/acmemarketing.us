// Test script to debug the course notifications API
const testAPI = async () => {
  const testData = {
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    company: 'Test Company'
  };

  try {
    console.log('🧪 Testing course notifications API...');
    console.log('📧 Test data:', testData);
    
    const response = await fetch('http://localhost:4322/api/course-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Response status:', response.status);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📄 Response text:', responseText);
    
    if (response.ok) {
      try {
        const result = JSON.parse(responseText);
        console.log('✅ API test successful:', result);
      } catch (parseError) {
        console.log('❌ JSON parse error:', parseError);
      }
    } else {
      console.log('❌ API test failed with status:', response.status);
    }
    
  } catch (error) {
    console.error('💥 Test error:', error);
  }
};

// Run the test
testAPI(); 