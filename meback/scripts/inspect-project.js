const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';

async function inspect() {
    try {
        const loginRes = await axios.post(`${API_BASE}/admin/login`, {
            username: 'admin',
            password: 'admin123'
        });
        const token = loginRes.data.token;

        const projectsRes = await axios.get(`${API_BASE}/admin/projects`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const projects = projectsRes.data.data || [];
        if (projects.length === 0) console.log('No projects.');
        else {
            const p = projects[0];
            console.log('--- PROJECT DUMP ---');
            console.log('ID (_id):', p._id);
            console.log('id (virtual?):', p.id);
            console.log('project_id:', p.project_id);
            console.log('Name:', p.name);
            console.log('Keys:', Object.keys(p));
        }
    } catch (err) {
        console.error(err.message);
    }
}

inspect();
