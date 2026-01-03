# Frontend Integration Guide

This guide shows how to integrate your Next.js frontend with the new backend API to replace mock data with real GitHub data.

## 1. Environment Setup

Add to your frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 2. Create API Utility

Create or update `me/lib/api.ts`:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchBackendAPI(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
    },
    // Add cache control for better performance
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  return data.success ? data.data : data;
}

// Backward compatibility with existing fetchGitHub function
export async function fetchGitHub(endpoint: string) {
  console.warn('fetchGitHub is deprecated, use fetchBackendAPI instead');
  return fetchBackendAPI(`/github${endpoint}`);
}
```

## 3. Update Components

### A. GitHub Activity Heatmap (`github-activity-heatmap.tsx`)

```typescript
"use client"

import { useEffect, useState } from "react"
import { fetchBackendAPI } from "@/lib/api"

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

export function GitHubActivityHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true)
        const data = await fetchBackendAPI('/github/contributions/2024')
        
        // Flatten the weeks into a single array of days
        const allDays: ContributionDay[] = []
        data.contributionCalendar.weeks.forEach((week: any) => {
          allDays.push(...week.contributionDays)
        })
        
        setContributions(allDays)
      } catch (error) {
        console.error('Error fetching contributions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading contributions...</div>
  }

  // Your existing rendering logic here...
  return (
    <div className="contribution-heatmap">
      {/* Render heatmap using contributions data */}
    </div>
  )
}
```

### B. GitHub Contributions (`github-contributions.tsx`)

```typescript
"use client"

import { useEffect, useState } from "react"
import { fetchBackendAPI } from "@/lib/api"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

type MonthlyDatum = { month: string; commits: number; prs: number; issues: number }
type LanguageDatum = { language: string; percentage: number; bytes: number }

export function GitHubContributions() {
  const [monthlyData, setMonthlyData] = useState<MonthlyDatum[]>([])
  const [languageData, setLanguageData] = useState<LanguageDatum[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch comprehensive data for the current year
        const data = await fetchBackendAPI('/github/contributions/comprehensive/2024')
        
        // Set monthly contributions (now includes real PR and issue counts!)
        setMonthlyData(data.monthlyContributions)
        
        // Set language data
        setLanguageData(data.topLanguages)
        
      } catch (error) {
        console.error('Error fetching contribution data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading contribution data...</div>
  }

  return (
    <div className="space-y-6">
      {/* Monthly Activity Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Line type="monotone" dataKey="commits" stroke="#8884d8" name="Commits" />
            <Line type="monotone" dataKey="prs" stroke="#82ca9d" name="Pull Requests" />
            <Line type="monotone" dataKey="issues" stroke="#ffc658" name="Issues" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Language Distribution */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={languageData.slice(0, 10)} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="language" type="category" width={100} />
            <Bar dataKey="percentage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
```

### C. GitHub Repositories (`github-repositories.tsx`)

```typescript
"use client"

import { useEffect, useState } from "react"
import { fetchBackendAPI } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, Eye } from "lucide-react"

interface Repository {
  id: number
  name: string
  description?: string
  html_url: string
  language?: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  topics: string[]
  updated_at: string
}

export function GitHubRepositories() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setLoading(true)
        const data = await fetchBackendAPI('/github/repositories?limit=12&sort=stargazers_count&order=desc')
        setRepositories(data)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading repositories...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <Card key={repo.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {repo.name}
              </a>
            </CardTitle>
            {repo.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {repo.description}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center">
                  <GitFork className="w-4 h-4 mr-1" />
                  {repo.forks_count}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {repo.watchers_count}
                </span>
              </div>
              {repo.language && (
                <Badge variant="secondary">{repo.language}</Badge>
              )}
            </div>
            
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {repo.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{repo.topics.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### D. GitHub Stats (`github-stats.tsx`)

```typescript
"use client"

import { useEffect, useState } from "react"
import { fetchBackendAPI } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Star, GitFork, Users, Calendar, Code } from "lucide-react"

interface GitHubStatsData {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalCommits: number
  followers: number
  following: number
  yearsActive: number
  languagesUsed: string[]
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const data = await fetchBackendAPI('/github/stats')
        setStats(data)
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading GitHub stats...</div>
  }

  if (!stats) {
    return <div>Error loading stats</div>
  }

  const statCards = [
    {
      title: "Public Repositories",
      value: stats.totalRepos.toLocaleString(),
      icon: GitBranch,
      description: "Open source projects",
    },
    {
      title: "Total Stars Earned",
      value: stats.totalStars.toLocaleString(),
      icon: Star,
      description: "Community recognition",
    },
    {
      title: "Total Forks",
      value: stats.totalForks.toLocaleString(),
      icon: GitFork,
      description: "Project contributions",
    },
    {
      title: "Total Commits",
      value: stats.totalCommits.toLocaleString(), // Now real data!
      icon: Code,
      description: "Code contributions",
    },
    {
      title: "Followers",
      value: stats.followers.toLocaleString(),
      icon: Users,
      description: "Developer network",
    },
    {
      title: "Years Active",
      value: stats.yearsActive.toString(),
      icon: Calendar,
      description: "Development experience",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Languages Used */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Languages & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {stats.languagesUsed.map((language) => (
              <Badge key={language} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 4. Create Contributions Page

Create `me/app/contributions/page.tsx`:

```typescript
import { Suspense } from 'react'
import { GitHubActivityHeatmap } from '@/components/github-activity-heatmap'
import { GitHubContributions } from '@/components/github-contributions'
import { GitHubStats } from '@/components/github-stats'
import { GitHubRepositories } from '@/components/github-repositories'

export default function ContributionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">GitHub Contributions</h1>
        <p className="text-xl text-gray-600">
          A comprehensive view of my development activity and contributions
        </p>
      </div>

      {/* Contribution Heatmap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Activity Overview</h2>
        <Suspense fallback={<div className="animate-pulse h-40 bg-gray-200 rounded"></div>}>
          <GitHubActivityHeatmap />
        </Suspense>
      </section>

      {/* Stats Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Statistics</h2>
        <Suspense fallback={<div className="animate-pulse h-60 bg-gray-200 rounded"></div>}>
          <GitHubStats />
        </Suspense>
      </section>

      {/* Monthly Trends */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contribution Trends</h2>
        <Suspense fallback={<div className="animate-pulse h-80 bg-gray-200 rounded"></div>}>
          <GitHubContributions />
        </Suspense>
      </section>

      {/* Top Repositories */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Repositories</h2>
        <Suspense fallback={<div className="animate-pulse h-60 bg-gray-200 rounded"></div>}>
          <GitHubRepositories />
        </Suspense>
      </section>
    </div>
  )
}
```

## 5. Add Loading and Error States

Create `me/components/loading-states.tsx`:

```typescript
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}

export function ErrorState({ message, retry }: { message: string; retry?: () => void }) {
  return (
    <div className="text-center p-8 space-y-4">
      <p className="text-red-600">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
```

## 6. Update Navigation

Add the contributions page to your navigation in `me/components/navigation.tsx`:

```typescript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contributions', label: 'Contributions' }, // Add this
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]
```

## 7. Performance Optimizations

### A. Add React Query (Optional)

For better caching and state management:

```bash
npm install @tanstack/react-query
```

```typescript
// lib/queries.ts
import { useQuery } from '@tanstack/react-query'
import { fetchBackendAPI } from './api'

export function useGitHubStats() {
  return useQuery({
    queryKey: ['github-stats'],
    queryFn: () => fetchBackendAPI('/github/stats'),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export function useContributions(year: number) {
  return useQuery({
    queryKey: ['contributions', year],
    queryFn: () => fetchBackendAPI(`/github/contributions/comprehensive/${year}`),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
```

### B. Add Error Boundaries

```typescript
// components/error-boundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>
    }

    return this.props.children
  }
}
```

## 8. Testing the Integration

1. **Start the backend**: `cd meback && npm run dev`
2. **Start the frontend**: `cd me && npm run dev`
3. **Test the API**: `cd meback && npm run test-api`
4. **Visit**: `http://localhost:3000/contributions`

## 9. Deployment Considerations

### Environment Variables

**Frontend (.env.production)**:
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

**Backend (.env.production)**:
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### CORS Configuration

Ensure your backend CORS settings match your production domains.

## Benefits of This Integration

✅ **Real Data**: No more mock data - everything is live from GitHub
✅ **Performance**: Backend caching reduces API calls and improves speed  
✅ **Reliability**: Automatic data sync ensures fresh information
✅ **Scalability**: Rate limiting and error handling for production use
✅ **Rich Features**: Access to both public and private contribution data
✅ **Analytics**: Comprehensive statistics and trends
✅ **SEO Friendly**: Server-side rendering with Next.js

Your portfolio now has a professional backend that showcases real GitHub activity with beautiful, animated visualizations!