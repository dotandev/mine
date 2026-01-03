"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, Eye } from "lucide-react"
import { motion } from "framer-motion"

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
        const response = await apiClient.getGitHubRepositories();
        // The API actually returns an array directly according to type definition in API_DOCUMENTATION.md? 
        // Let's check api.ts types. api.ts returns ApiResponse<T> or just T?
        // documentation says: 
        // response: { success: true, data: [...] }
        // BUT api.ts getGitHubRepositories returns this.request('/github/repositories');
        // So it should return ApiResponse.

        // Wait, checking API_DOCUMENTATION.md for repositories:
        // GET /github/repositories?limit=10...
        // Response is NOT wrapped in { success: true } in standard GitHub API, but meback might.
        // Meback docs say "All endpoints return consistent error responses", implying success wrappers.
        // Let's assume wrapper.

        // However, looking at the guide code in FRONTEND_INTEGRATION.md:
        // const data = await fetchBackendAPI(...)
        // setRepositories(data) 
        // It implies data is the array.

        // Let's use the response.data convention from api.ts
        if ('data' in response && Array.isArray(response.data)) {
          setRepositories(response.data as Repository[])
        } else if (Array.isArray(response)) {
          setRepositories(response);
        } else {
          // fallback
          setRepositories([])
        }

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
      {repositories.map((repo, i) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors text-slate-100"
                >
                  {repo.name}
                </a>
              </CardTitle>
              {repo.description && (
                <p className="text-sm text-slate-400 line-clamp-2">
                  {repo.description}
                </p>
              )}
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-slate-500">
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
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300">{repo.language}</Badge>
                )}
              </div>

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs border-slate-700 text-slate-400">
                      {topic}
                    </Badge>
                  ))}
                  {repo.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                      +{repo.topics.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
