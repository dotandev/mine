"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Star, GitFork, Users, Calendar, Code } from "lucide-react"
import { motion } from "framer-motion"

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
        const response = await apiClient.getGitHubStats()
        setStats(response.success ? response.data : null)
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
      value: stats.totalRepos,
      icon: GitBranch,
      description: "Open source projects",
    },
    {
      title: "Total Stars Earned",
      value: stats.totalStars,
      icon: Star,
      description: "Community recognition",
    },
    {
      title: "Total Forks",
      value: stats.totalForks,
      icon: GitFork,
      description: "Project contributions",
    },
    {
      title: "Total Commits",
      value: stats.totalCommits,
      icon: Code,
      description: "Code contributions",
    },
    {
      title: "Followers",
      value: stats.followers,
      icon: Users,
      description: "Developer network",
    },
    {
      title: "Years Active",
      value: stats.yearsActive,
      icon: Calendar,
      description: "Development experience",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">{stat.description}</p>
                </div>
                <stat.icon className="h-8 w-8 text-purple-400" />
              </motion.div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Languages & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {stats.languagesUsed.map((language, i) => (
              <motion.div
                key={language}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.05) }}
              >
                <Badge variant="secondary" className="bg-slate-800 text-slate-200">
                  {language}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
