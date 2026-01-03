const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';

async function setupAdmin() {
  try {
    console.log('🔧 Setting up initial admin user...');
    
    const adminData = {
      username: 'admin',
      email: 'admin@portfolio.com',
      password: 'admin123' // Change this in production!
    };

    const response = await axios.post(`${API_BASE}/admin/setup`, adminData);
    
    if (response.data.success) {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email:', adminData.email);
      console.log('👤 Username:', adminData.username);
      console.log('🔑 Password:', adminData.password);
      console.log('⚠️  Please change the password after first login!');
    }
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error === 'Admin already exists') {
      console.log('ℹ️  Admin user already exists');
    } else {
      console.error('❌ Error setting up admin:', error.response?.data?.error || error.message);
    }
  }
}

setupAdmin();