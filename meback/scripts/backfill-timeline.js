const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';

async function backfillTimeline() {
    try {
        console.log('🔄 Starting timeline backfill...');

        // 1. Login as Admin to get token
        console.log('🔑 Authenticating as admin...');
        const loginRes = await axios.post(`${API_BASE}/admin/login`, {
            username: 'admin',      // Assuming default from setup-admin.js
            password: 'admin123'    // Assuming default from setup-admin.js
        });

        const token = loginRes.data.token;
        if (!token) throw new Error('Failed to retrieve info token');
        console.log('✅ Authenticated successfully.');

        // 2. Fetch Projects
        console.log('📦 Fetching projects...');
        const projectsRes = await axios.get(`${API_BASE}/admin/projects`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const projects = projectsRes.data.data || [];
        console.log(`Found ${projects.length} projects.`);

        // 3. Update Projects
        let updatedCount = 0;
        for (const project of projects) {
            // The backend update route expects 'project_id' (custom string), not '_id' (ObjectId)
            const projectId = project.project_id || project.id || project._id;

            if (!project.project_id) {
                console.warn(`⚠️  Project '${project.name}' is missing 'project_id'. Using fallback: ${projectId}`);
            }

            if (!projectId) {
                console.warn(`⚠️  Skipping project ${project.name}: No ID found`);
                continue;
            }

            // Always update if timeline is empty OR strictly if user asked (here we stick to empty check to be safe, or just overwrite?)
            // efficient backfill: only if missing.
            if (!project.timeline || project.timeline.length === 0) {
                console.log(`✏️  Updating timeline for: ${project.name} (ID: ${projectId})`);

                // Generate 3-7 random timeline events
                const eventCount = Math.floor(Math.random() * 5) + 3; // 3 to 7
                const newTimeline = [];
                const baseYear = parseInt(project.year || project.date?.split('-')[0] || new Date().getFullYear().toString());

                const eventTypes = [
                    { title: 'Project Inception', desc: 'Initial concept and requirements gathering.' },
                    { title: 'Design Phase', desc: 'UI/UX design and system architecture planning.' },
                    { title: 'Core Development', desc: 'Implementation of core features and backend logic.' },
                    { title: 'Alpha Release', desc: 'Internal testing of the MVP.' },
                    { title: 'Beta Testing', desc: 'User acceptance testing and bug fixing.' },
                    { title: 'Performance Optimization', desc: 'Refactoring and optimizing for speed.' },
                    { title: 'Official Launch', desc: 'Deployment to production servers.' },
                    { title: 'Feature Update', desc: 'Added new capabilities based on user feedback.' }
                ];

                // Pick random events and distribute dates
                for (let i = 0; i < eventCount; i++) {
                    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
                    // Distribute months roughly across the year(s)
                    const month = Math.floor(Math.random() * 12) + 1;
                    const dateStr = `${baseYear}-${month.toString().padStart(2, '0')}`;

                    newTimeline.push({
                        date: dateStr,
                        title: eventType.title,
                        description: eventType.desc
                    });
                }

                // Sort timeline by date
                newTimeline.sort((a, b) => a.date.localeCompare(b.date));

                try {
                    await axios.put(`${API_BASE}/admin/projects/${projectId}`, {
                        ...project,
                        timeline: newTimeline
                    }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    console.log(`✅ Updated ${project.name} with ${eventCount} events.`);
                    updatedCount++;
                } catch (err) {
                    console.error(`❌ Failed to update ${project.name}:`, err.response?.data?.error || err.message);
                }
            } else {
                console.log(`⏭️  Skipping ${project.name} (Timeline exists)`);
            }
        }

        console.log(`\n🎉 Backfill complete! Updated ${updatedCount} projects.`);

    } catch (error) {
        if (error.response) {
            console.error('❌ API Error:', error.response.status, error.response.data);
        } else {
            console.error('❌ Error:', error.message);
        }
    }
}

backfillTimeline();
