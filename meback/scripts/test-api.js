#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:3001';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`📡 GET ${BASE_URL}${endpoint}`);
    
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    console.log(`✅ Status: ${response.status}`);
    
    if (response.data.success !== undefined) {
      console.log(`📊 Success: ${response.data.success}`);
    }
    
    if (response.data.data) {
      if (Array.isArray(response.data.data)) {
        console.log(`📦 Data: Array with ${response.data.data.length} items`);
      } else if (typeof response.data.data === 'object') {
        console.log(`📦 Data: Object with keys: ${Object.keys(response.data.data).join(', ')}`);
      }
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.response?.status || error.message}`);
    if (error.response?.data) {
      console.log(`📝 Details: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    return false;
  }
}

async function runTests() {
  console.log('🚀 Portfolio Backend API Test Suite');
  console.log(`🌐 Base URL: ${BASE_URL}\n`);

  const tests = [
    // Health and basic endpoints
    ['/health', 'Health Check'],
    
    // GitHub endpoints
    ['/api/github/user', 'GitHub User Profile'],
    ['/api/github/repositories?limit=5', 'Top 5 Repositories'],
    ['/api/github/stats', 'GitHub Statistics'],
    ['/api/github/contributions/2024', 'Contributions for 2024'],
    ['/api/github/contributions/monthly/2024', 'Monthly Contributions 2024'],
    ['/api/github/languages', 'Language Statistics'],
    ['/api/github/pull-requests?limit=5', 'Recent Pull Requests'],
    ['/api/github/issues?limit=5', 'Recent Issues'],
    ['/api/github/sync/status', 'Sync Status'],
    ['/api/github/contributions/comprehensive/2024', 'Comprehensive Contributions Data'],
    
    // Portfolio endpoints
    ['/api/portfolio/about', 'About Information'],
    ['/api/portfolio/experience', 'Professional Experience'],
    ['/api/portfolio/skills', 'Technical Skills'],
    ['/api/portfolio/projects?limit=5', 'Recent Projects'],
    ['/api/portfolio/hackathons?limit=3', 'Hackathon Projects'],
    ['/api/portfolio/research?limit=3', 'Research Papers'],
    ['/api/portfolio/certifications', 'Certifications'],
    ['/api/portfolio/blog?limit=3', 'Blog Posts'],
    ['/api/portfolio/contact', 'Contact Information'],
    ['/api/portfolio/activity/stats', 'Activity Statistics'],
    ['/api/portfolio/comprehensive', 'Comprehensive Portfolio Data']
  ];

  let passed = 0;
  let failed = 0;

  for (const [endpoint, description] of tests) {
    const success = await testEndpoint(endpoint, description);
    if (success) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log('\n💡 Troubleshooting:');
    console.log('1. Ensure the server is running: npm run dev');
    console.log('2. Check MongoDB connection');
    console.log('3. Verify GitHub token and username in .env');
    console.log('4. Run initial sync: curl -X POST http://localhost:3001/api/github/sync');
    console.log('5. Check server logs for detailed error messages');
  } else {
    console.log('\n🎉 All tests passed! Your portfolio backend is ready to use.');
    console.log('\n📖 Next steps:');
    console.log('1. Check API documentation: cat API_DOCUMENTATION.md');
    console.log('2. Integrate with frontend: cat FRONTEND_INTEGRATION.md');
    console.log('3. Visit your portfolio endpoints in the browser');
  }
}

runTests().catch(console.error);