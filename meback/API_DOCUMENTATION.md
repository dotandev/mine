# Portfolio Backend API Documentation

A comprehensive REST API for your portfolio website that serves all sections including GitHub data, projects, experience, research, and more.

## Base URL
```
http://localhost:3001/api
```

## Authentication
Currently, no authentication is required for read operations. All endpoints are publicly accessible.

## Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Read-only endpoints**: 60 requests per minute  
- **Sync endpoint**: 5 requests per hour

---

## GitHub Endpoints

### Get User Profile
```http
GET /github/user
```

**Response:**
```json
{
  "success": true,
  "data": {
    "login": "username",
    "name": "Full Name",
    "bio": "Developer bio",
    "public_repos": 127,
    "followers": 892,
    "following": 234
  },
  "lastUpdated": "2024-12-31T10:00:00.000Z"
}
```

### Get Repositories
```http
GET /github/repositories?limit=10&sort=stargazers_count&order=desc&language=TypeScript
```

**Query Parameters:**
- `limit` (number): Number of repositories to return (default: 100)
- `sort` (string): Sort field (default: stargazers_count)
- `order` (string): Sort order - asc/desc (default: desc)
- `language` (string): Filter by programming language
- `includePrivate` (boolean): Include private repos (default: false)

### Get GitHub Stats
```http
GET /github/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRepos": 127,
    "totalStars": 2847,
    "totalForks": 456,
    "totalCommits": 3421,
    "followers": 892,
    "following": 234,
    "yearsActive": 8,
    "languagesUsed": ["TypeScript", "Python", "Rust"],
    "topLanguages": {
      "TypeScript": 45.2,
      "Python": 23.1,
      "Rust": 15.7
    }
  }
}
```

### Get Contribution Calendar
```http
GET /github/contributions/2024
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contributionCalendar": {
      "totalContributions": 1247,
      "weeks": [
        {
          "contributionDays": [
            {
              "date": "2024-01-01",
              "contributionCount": 5,
              "color": "#196127"
            }
          ]
        }
      ]
    },
    "monthlyContributions": [
      {
        "month": "2024-01",
        "commits": 89,
        "prs": 12,
        "issues": 5
      }
    ]
  }
}
```

### Get Comprehensive Contributions Data
```http
GET /github/contributions/comprehensive/2024
```

**Perfect for frontend /contributions page** - includes everything needed:
- Contribution calendar heatmap
- Monthly activity trends  
- Recent pull requests and issues
- Top repositories
- Language statistics
- Summary stats

---

## Portfolio Endpoints

### Get About Information
```http
GET /portfolio/about
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Your Name",
    "title": "Full-Stack Developer & AI Researcher",
    "bio": "Passionate software engineer...",
    "location": "San Francisco, CA",
    "avatar": "/avatar.jpg",
    "interests": ["AI", "Blockchain", "Open Source"],
    "languages": ["English", "Spanish"],
    "current_focus": ["Quantum ML", "Decentralized Systems"]
  }
}
```

### Get Professional Experience
```http
GET /portfolio/experience
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "biyard-inc",
      "type": "company",
      "company": "Biyard Inc",
      "location": "Remote, Korea",
      "roles": [
        {
          "title": "QA Engineer",
          "duration": "Aug 2025 – Present",
          "type": "Full-time",
          "description": "Engineered backend architectures...",
          "achievements": [
            "Implemented complex relational data models...",
            "Integrated AWS services..."
          ],
          "technologies": ["Rust", "Axum", "PostgreSQL", "AWS"]
        }
      ]
    }
  ]
}
```

### Get Skills
```http
GET /portfolio/skills
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category": "Programming Languages",
      "items": ["TypeScript", "Rust", "Python", "Go"]
    },
    {
      "category": "Cloud & DevOps", 
      "items": ["AWS", "Kubernetes", "Docker"]
    }
  ]
}
```

### Get Projects
```http
GET /portfolio/projects?category=Backend&search=rust&limit=10
```

**Query Parameters:**
- `category` (string): Filter by project category
- `search` (string): Search in name, description, tags
- `language` (string): Filter by programming language
- `framework` (string): Filter by framework
- `limit` (number): Number of projects (default: 50)
- `sort` (string): Sort field (default: date)
- `order` (string): Sort order (default: desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Progrex",
      "category": "Library",
      "description": "A Rust library for progressive tasks and scheduling.",
      "languages": ["Rust"],
      "technologies": ["Rust", "Tokio"],
      "tags": ["Library", "Rust", "Progressive"],
      "github": "https://crates.io/crates/progrex",
      "demo": "https://crates.io/crates/progrex",
      "date": "2024-08-01",
      "status": "Production"
    }
  ],
  "filters": {
    "categories": ["Library", "Backend", "Website"],
    "languages": ["Rust", "TypeScript", "Python"],
    "frameworks": ["Rust", "Node.js", "React"]
  }
}
```

### Get Single Project
```http
GET /portfolio/projects/1
```

### Get Hackathon Projects
```http
GET /portfolio/hackathons?limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "quantum-chat",
      "title": "QuantumChat - Secure Messaging with Quantum Encryption",
      "hackathon": "MIT Quantum Hackathon 2024",
      "duration": "48 hours",
      "team": "4 members",
      "placement": "1st Place",
      "prize": "$10,000",
      "description": "Real-time messaging application using quantum key distribution...",
      "technologies": ["Qiskit", "WebSocket", "React", "Node.js"],
      "links": {
        "github": "#",
        "demo": "#",
        "devpost": "#"
      }
    }
  ],
  "stats": {
    "totalHackathons": 25,
    "totalPrizes": 45000,
    "awards": 12
  }
}
```

### Get Research Papers
```http
GET /portfolio/research?category=Quantum Computing&status=Published
```

**Query Parameters:**
- `category` (string): Filter by research category
- `status` (string): Filter by publication status
- `year` (string): Filter by publication year
- `limit` (number): Number of papers (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "quantum-ml-crypto",
      "title": "Quantum-Enhanced Machine Learning for Cryptographic Protocol Analysis",
      "authors": ["John Doe", "Jane Smith", "Dr. Alice Johnson"],
      "journal": "Nature Quantum Information",
      "year": "2024",
      "status": "Published",
      "category": "Quantum Computing",
      "abstract": "This paper presents a novel approach...",
      "citations": 47,
      "impact_factor": 8.2,
      "links": {
        "pdf": "#",
        "arxiv": "#",
        "doi": "#"
      }
    }
  ],
  "stats": {
    "totalPapers": 25,
    "totalCitations": 1200,
    "avgImpactFactor": 8.2,
    "collaborators": 15
  }
}
```

### Get Certifications
```http
GET /portfolio/certifications
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ml-scientist",
      "title": "Machine Learning Scientist",
      "issuer": "DataCamp",
      "date": "June 2024",
      "link": "https://datacamp.com/certificate/ml-scientist",
      "logo": "/logos/datacamp.png",
      "description": "Advanced machine learning certification..."
    }
  ]
}
```

### Get Blog Posts
```http
GET /portfolio/blog?category=Technology&limit=5
```

**Query Parameters:**
- `category` (string): Filter by blog category
- `tag` (string): Filter by tag
- `status` (string): Filter by status (default: published)
- `limit` (number): Number of posts (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "rust-performance",
      "title": "Why Rust is the Future of Systems Programming",
      "slug": "rust-future-systems-programming",
      "excerpt": "Exploring Rust's memory safety, performance benefits...",
      "author": "Your Name",
      "published_date": "2024-03-15",
      "tags": ["Rust", "Systems Programming", "Performance"],
      "category": "Technology",
      "reading_time": 8,
      "views": 1250,
      "likes": 89
    }
  ],
  "filters": {
    "categories": ["Technology", "Tutorial", "Opinion"],
    "tags": ["Rust", "JavaScript", "AI", "Blockchain"]
  }
}
```

### Get Single Blog Post
```http
GET /portfolio/blog/rust-future-systems-programming
```

### Get Contact Information
```http
GET /portfolio/contact
```

**Response:**
```json
{
  "success": true,
  "data": {
    "email": "hello@yourname.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "social_links": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername",
      "twitter": "https://twitter.com/yourusername",
      "website": "https://yourname.com"
    },
    "availability": {
      "status": "available",
      "message": "Open to new opportunities and collaborations"
    }
  }
}
```

### Get Activity Statistics
```http
GET /portfolio/activity/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_projects": 14,
    "total_contributions": 1247,
    "years_experience": 5,
    "technologies_used": 25,
    "hackathons_won": 12,
    "research_papers": 25
  }
}
```

### Get Comprehensive Portfolio Data
```http
GET /portfolio/comprehensive
```

**Perfect for homepage** - includes summary data from all sections:
- About information
- Recent projects (6)
- Top skills (6)
- Recent experience (3)
- Activity stats
- Recent research papers (3)
- Recent blog posts (3)

---

## Admin Endpoints

### Force GitHub Data Sync
```http
POST /github/sync
```

**Response:**
```json
{
  "success": true,
  "message": "Data sync completed successfully",
  "timestamp": "2024-12-31T10:00:00.000Z"
}
```

### Get Sync Status
```http
GET /github/sync/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lastSync": "2024-12-31T04:00:00.000Z",
    "isStale": false,
    "nextSyncDue": "Within 6 hours"
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `429` - Too Many Requests (Rate Limited)
- `500` - Internal Server Error

---

## Frontend Integration Examples

### React Hook for Projects
```typescript
import { useState, useEffect } from 'react';

function useProjects(category?: string) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const url = category 
          ? `/api/portfolio/projects?category=${category}`
          : '/api/portfolio/projects';
        
        const response = await fetch(url);
        const data = await response.json();
        setProjects(data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [category]);

  return { projects, loading };
}
```

### Next.js API Route Example
```typescript
// pages/api/projects.ts
export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:3001/api/portfolio/projects');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}
```

---

## Data Models

### Project Model
```typescript
interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  languages: string[];
  technologies?: string[];
  tags: string[];
  date: string;
  framework: string;
  industry: string;
  github: string;
  demo?: string;
  status?: string;
}
```

### Experience Model
```typescript
interface Experience {
  id: string;
  type: 'company' | 'break';
  company?: string;
  location?: string;
  roles?: Role[];
}

interface Role {
  title: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}
```

---

## Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://localhost:27017/portfolio
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username
FRONTEND_URL=https://yourportfolio.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
```

This API provides everything your frontend needs for all portfolio sections with real GitHub integration, comprehensive filtering, and optimized performance through caching and rate limiting.