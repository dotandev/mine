#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🚀 Portfolio Backend Setup\n');
  console.log('This will help you configure your portfolio backend with GitHub integration.\n');

  // Check if .env already exists
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('Please provide the following information:\n');

  const port = await question('Server port (3001): ') || '3001';
  const mongoUri = await question('MongoDB URI (mongodb://localhost:27017/portfolio): ') || 'mongodb://localhost:27017/portfolio';
  
  console.log('\n📋 GitHub Integration Setup:');
  console.log('You need a GitHub Personal Access Token with these scopes:');
  console.log('- repo (for private repository access)');
  console.log('- user (for user profile data)');
  console.log('- read:org (for organization data)');
  console.log('\nCreate one at: https://github.com/settings/tokens\n');
  
  const githubToken = await question('GitHub Personal Access Token (required): ');
  const githubUsername = await question('GitHub Username (required): ');
  
  const frontendUrl = await question('Frontend URL (http://localhost:3000): ') || 'http://localhost:3000';
  const nodeEnv = await question('Environment (development): ') || 'development';

  if (!githubToken || !githubUsername) {
    console.log('\n❌ GitHub token and username are required for the backend to work properly!');
    console.log('The backend will still start but GitHub features will not work.');
    
    const continueAnyway = await question('Continue anyway? (y/N): ');
    if (continueAnyway.toLowerCase() !== 'y') {
      rl.close();
      return;
    }
  }

  const envContent = `# Server Configuration
PORT=${port}
NODE_ENV=${nodeEnv}

# Database
MONGODB_URI=${mongoUri}

# GitHub API (Required for GitHub integration)
GITHUB_TOKEN=${githubToken}
GITHUB_USERNAME=${githubUsername}

# CORS
FRONTEND_URL=${frontendUrl}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Cron Jobs (GitHub data sync every 6 hours)
GITHUB_SYNC_CRON=0 */6 * * *
`;

  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ .env file created successfully!');
  
  console.log('\n📋 Next steps:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Start MongoDB service');
  console.log('3. Run the server: npm run dev');
  console.log('4. Test the API: curl http://localhost:' + port + '/health');
  console.log('5. Check API documentation: cat API_DOCUMENTATION.md');
  
  console.log('\n🔗 Available endpoints:');
  console.log('- Portfolio data: http://localhost:' + port + '/api/portfolio/*');
  console.log('- GitHub data: http://localhost:' + port + '/api/github/*');
  console.log('- Health check: http://localhost:' + port + '/health');
  
  console.log('\n📖 Frontend integration guide: FRONTEND_INTEGRATION.md');
  
  rl.close();
}

setup().catch(console.error);