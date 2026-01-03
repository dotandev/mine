# Portfolio Backend API

A comprehensive backend service for your portfolio website that integrates with GitHub and serves all portfolio sections including projects, experience, research, blog, and more.

## Features

- 🔄 **Automated GitHub Data Sync**: Fetches and caches GitHub data every 6 hours
- 📊 **Complete Portfolio API**: Serves all sections - about, experience, projects, research, blog, certifications
- 🎯 **Optimized Performance**: MongoDB caching with intelligent data refresh
- 🔒 **Security First**: Rate limiting, CORS, and security headers
- 📈 **Rich API Endpoints**: RESTful API for all portfolio and GitHub data
- 🌐 **Real-time Updates**: Supports both public and private contribution data
- 🚀 **Easy Setup**: Automated data seeding and configuration scripts

## Portfolio Sections Supported

✅ **About** - Personal information, bio, interests, current focus  
✅ **Experience** - Professional timeline with companies, roles, achievements  
✅ **Skills** - Technical expertise organized by categories  
✅ **Projects** - Portfolio projects with filtering and search  
✅ **Hackathons** - Hackathon projects with awards and prizes  
✅ **Research** - Academic papers with citations and impact factors  
✅ **Certifications** - Professional certifications and credentials  
✅ **Blog** - Blog posts with categories and tags  
✅ **Contact** - Contact information and availability status  
✅ **GitHub Integration** - Real-time GitHub data and contributions  

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 4.4+
- GitHub Personal Access Token

### Installation

1. **Clone and setup**:
```bash
cd meback
npm install
```

2. **Interactive Setup**:
```bash
npm run setup
```

This will guide you through:
- Environment configuration
- GitHub token setup
- Database connection
- CORS settings

3. **Start the server**:
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

4. **Test the API**:
```bash
npm run test-api
```

## API Endpoints Overview

### Core Portfolio Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/portfolio/about` | Personal information and bio |
| `/api/portfolio/experience` | Professional experience timeline |
| `/api/portfolio/skills` | Technical skills by category |
| `/api/portfolio/projects` | Portfolio projects with filtering |
| `/api/portfolio/hackathons` | Hackathon projects and awards |
| `/api/portfolio/research` | Research papers and publications |
| `/api/portfolio/certifications` | Professional certifications |
| `/api/portfolio/blog` | Blog posts with categories |
| `/api/portfolio/contact` | Contact information |
| `/api/portfolio/comprehensive` | **Complete homepage data** |

### GitHub Integration Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/github/user` | GitHub user profile |
| `/api/github/repositories` | Repository list with stats |
| `/api/github/stats` | Aggregated GitHub statistics |
| `/api/github/contributions/:year` | Contribution calendar |
| `/api/github/contributions/comprehensive/:year` | **Complete /contributions page data** |
| `/api/github/pull-requests` | Pull requests with filtering |
| `/api/github/issues` | Issues with filtering |
| `/api/github/languages` | Language statistics |

### Admin Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/github/sync` | POST | Force data synchronization |
| `/api/github/sync/status` | GET | Sync status and timing |

## Frontend Integration

The backend is designed to perfectly match your frontend structure:

### For `/activity` page:
```typescript
const data = await fetch('/api/github/contributions/comprehensive/2024');
// Returns: heatmap, stats, repos, languages, monthly trends
```

### For `/experience` page:
```typescript
const experience = await fetch('/api/portfolio/experience');
const skills = await fetch('/api/portfolio/skills');
// Returns: timeline data, skills by category
```

### For `/projects` page:
```typescript
const projects = await fetch('/api/portfolio/projects?category=Backend&limit=12');
// Returns: filtered projects with search and pagination
```

### For `/research` page:
```typescript
const papers = await fetch('/api/portfolio/research?status=Published');
// Returns: research papers with citations and filters
```

### For `/certifications` page:
```typescript
const certs = await fetch('/api/portfolio/certifications');
// Returns: certifications with logos and links
```

### For `/blog` page:
```typescript
const posts = await fetch('/api/portfolio/blog?limit=10');
// Returns: blog posts with categories and tags
```

### For homepage:
```typescript
const data = await fetch('/api/portfolio/comprehensive');
// Returns: summary data from all sections
```

## Data Management

### Automatic Data Seeding

On first startup, the backend automatically seeds:
- Sample experience data from your frontend
- Projects from your `projects.json` file
- Skills, certifications, research papers
- Blog posts and contact information

### GitHub Data Sync

- **Automatic**: Every 6 hours via cron job
- **Manual**: `POST /api/github/sync`
- **Smart**: Only syncs when data is stale

### Data Sources

The backend intelligently combines:
- **Static data**: Experience, skills, projects (from seeded data)
- **Dynamic data**: GitHub contributions, repositories, stats
- **Content**: Blog posts, research papers, certifications

## Configuration

### Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# GitHub API (Required)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username

# CORS
FRONTEND_URL=http://localhost:3000

# Sync Schedule (every 6 hours)
GITHUB_SYNC_CRON=0 */6 * * *
```

### GitHub Token Setup

Your GitHub Personal Access Token needs these scopes:
- `repo` (for private repository access)
- `user` (for user profile data)  
- `read:org` (for organization data)

Create one at: https://github.com/settings/tokens

## API Documentation

Comprehensive API documentation with examples:
```bash
cat API_DOCUMENTATION.md
```

## Frontend Integration Guide

Step-by-step integration guide:
```bash
cat FRONTEND_INTEGRATION.md
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup        # Interactive setup wizard
npm run test-api     # Test all API endpoints
npm run sync         # Manual GitHub data sync
```

### Project Structure

```
meback/
├── src/
│   ├── config/         # Database configuration
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API route handlers
│   ├── services/       # Business logic
│   ├── middleware/     # Express middleware
│   ├── jobs/           # Cron jobs and scheduling
│   ├── types/          # TypeScript type definitions
│   └── server.ts       # Main server file
├── scripts/            # Setup and testing scripts
└── docs/              # Documentation
```

## Deployment

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://your-mongo-host:27017/portfolio
GITHUB_TOKEN=your_production_token
GITHUB_USERNAME=your_username
FRONTEND_URL=https://your-portfolio-domain.com
```

## Monitoring

### Health Check
```bash
curl http://localhost:3001/health
```

### API Testing
```bash
npm run test-api
```

### Logs
The application uses structured logging with different levels for development and production.

## Key Benefits

✅ **Complete Portfolio Backend** - Serves all your frontend sections  
✅ **Real GitHub Integration** - Live data, not mock data  
✅ **Intelligent Caching** - Fast responses with automatic updates  
✅ **Easy Setup** - Interactive configuration and data seeding  
✅ **Production Ready** - Rate limiting, security, error handling  
✅ **Developer Friendly** - Comprehensive docs and testing tools  
✅ **Scalable Architecture** - Clean separation of concerns  

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.