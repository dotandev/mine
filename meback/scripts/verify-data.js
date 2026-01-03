const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';

async function verify() {
    try {
        // 1. Login
        const loginRes = await axios.post(`${API_BASE}/admin/login`, {
            username: 'admin',
            password: 'admin123'
        });
        const token = loginRes.data.token;

        // 2. Fetch Projects
        const projectsRes = await axios.get(`${API_BASE}/admin/projects`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const projects = projectsRes.data.data || [];
        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }

        // 3. Inspect first project
        const p = projects[0];
        console.log(`Checking Project: ${p.name}`);
        console.log('Timeline field type:', typeof p.timeline);
        console.log('Timeline is Array?', Array.isArray(p.timeline));
        console.log('Timeline length:', p.timeline ? p.timeline.length : 'N/A');
        console.log('Full Timeline Data:', JSON.stringify(p.timeline, null, 2));

    } catch (err) {
        console.error('Error:', err.message);
    }
}

verify();
