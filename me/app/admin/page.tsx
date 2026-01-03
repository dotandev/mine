'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  FileText,
  Briefcase,
  Code,
  Award,
  Settings,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react'
import ResearchManagement from './components/ResearchManagement'
import AboutManagement from './components/AboutManagement'
import ExperienceManagement from './components/ExperienceManagement'
import BlogManagement from './components/BlogManagement'
import ContactManagement from './components/ContactManagement'
import ProjectsManagement from './components/ProjectsManagement'
import SkillsManagement from './components/SkillsManagement'





const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  lastLogin?: string
}

interface DashboardStats {
  projects: number
  experiences: number
  hackathons: number
  papers: number
  certifications: number
  blogPosts: number
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE}/admin/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
        setIsAuthenticated(true)
        await fetchDashboardStats()
      } else {
        localStorage.removeItem('admin_token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('admin_token')
    }

    setLoading(false)
  }

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('admin_token', data.token)
        setAdmin(data.admin)
        setIsAuthenticated(true)
        await fetchDashboardStats()
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    }

    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setAdmin(null)
    setStats(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username or Email</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Admin</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {admin?.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="about">
              <Users className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="experience">
              <Briefcase className="h-4 w-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Code className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FileText className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="research">
              <FileText className="h-4 w-4 mr-2" />
              Research
            </TabsTrigger>
            <TabsTrigger value="blog">
              <FileText className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Settings className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardContent stats={stats} />
          </TabsContent>

          <TabsContent value="about">
            <AboutManagement />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceManagement />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManagement />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManagement />
          </TabsContent>

          <TabsContent value="research">
            <ResearchManagement />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DashboardContent({ stats }: { stats: DashboardStats | null }) {
  if (!stats) {
    return <div>Loading stats...</div>
  }

  const statCards = [
    { title: 'Projects', value: stats.projects, icon: FileText, color: 'bg-blue-500' },
    { title: 'Experiences', value: stats.experiences, icon: Briefcase, color: 'bg-green-500' },
    { title: 'Hackathons', value: stats.hackathons, icon: Award, color: 'bg-purple-500' },
    { title: 'Research Papers', value: stats.papers, icon: FileText, color: 'bg-red-500' },
    { title: 'Certifications', value: stats.certifications, icon: Award, color: 'bg-yellow-500' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'bg-indigo-500' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Components are imported from separate files