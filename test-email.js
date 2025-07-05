// Test script for course notification email functionality
const testEmail = async () => {
  const testData = {
    email: 'wayne@acmemarketing.us', // Using your actual email for testing
    first_name: 'Wayne',
    last_name: 'Sheppard',
    company: 'ACME Marketing'
  };

  try {
    console.log('🧪 Testing course notification email system...');
    console.log('📧 Test data:', testData);
    
    // Test the API endpoint
    const response = await fetch('http://localhost:4322/api/course-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data:', result);
    
    if (response.ok) {
      console.log('✅ Email test successful!');
      console.log('📧 Check your email inbox for the welcome message');
    } else {
      console.log('❌ Email test failed:', result.error);
    }
    
  } catch (error) {
    console.error('💥 Test error:', error);
  }
};

// Run the test
testEmail(); 