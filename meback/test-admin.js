const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';

async function testAdminSystem() {
  try {
    console.log('🧪 Testing admin system...');
    
    // Test server health
    try {
      const healthResponse = await axios.get(`${API_BASE}/portfolio/about`);
      console.log('✅ Server is running');
    } catch (error) {
      console.log('❌ Server is not running. Please start with: npm run dev');
      return;
    }

    // Test admin setup
    try {
      const setupResponse = await axios.post(`${API_BASE}/admin/setup`, {
        username: 'admin',
        email: 'admin@portfolio.com',
        password: 'admin123'
      });
      console.log('✅ Admin user created or already exists');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('ℹ️  Admin user already exists');
      } else {
        console.log('❌ Error setting up admin:', error.response?.data?.error || error.message);
        return;
      }
    }

    // Test admin login
    try {
      const loginResponse = await axios.post(`${API_BASE}/admin/login`, {
        username: 'admin',
        password: 'admin123'
      });
      
      if (loginResponse.data.success) {
        console.log('✅ Admin login successful');
        const token = loginResponse.data.token;
        
        // Test dashboard
        const dashboardResponse = await axios.get(`${API_BASE}/admin/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (dashboardResponse.data.success) {
          console.log('✅ Dashboard data retrieved');
          console.log('📊 Stats:', dashboardResponse.data.stats);
        }
        
        // Test about endpoint
        const aboutResponse = await axios.get(`${API_BASE}/admin/about`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (aboutResponse.data.success) {
          console.log('✅ About data retrieved');
        }
        
        console.log('🎉 Admin system is working correctly!');
        console.log('🌐 Access admin panel at: http://localhost:3000/admin');
        console.log('👤 Username: admin');
        console.log('🔑 Password: admin123');
        
      }
    } catch (error) {
      console.log('❌ Admin login failed:', error.response?.data?.error || error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAdminSystem();