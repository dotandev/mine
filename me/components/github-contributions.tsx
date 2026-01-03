"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

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
        const year = new Date().getFullYear();
        // Fetch comprehensive data for the current year
        // We need to use the actual endpoint logic. 
        // api.ts has getGitHubContributions(year) but that returns heatmap usually?
        // Let's check api.ts again. 
        // It calls /github/contributions?year=...

        // Wait, FRONTEND_INTEGRATION.md says:
        // GET /github/contributions/comprehensive/2024
        // api.ts doesn't seem to have a dedicated 'getGitHubComprehensiveContributions' method in the interface I saw?
        // Let me check api.ts content I wrote/read earlier.

        // api.ts:
        // async getGitHubContributions(year?: number) { return this.request(...) } 
        // mapping to /github/contributions

        // It seems api.ts MIGHT be missing the 'comprehensive' endpoint explicitly if I didn't add it.
        // I should check `api.ts` content I generated. 
        // I did NOT see strict "comprehensive" method for github in api.ts, I only saw "getGitHubContributions".
        // BUT I can manually call the endpoint if needed or update api.ts.
        // Actually, looking at default_api:view_file output for api.ts earlier:
        // It had `getComprehensive()` for portfolio, but `getGitHubContributions` for github.

        // I will assume `getGitHubContributions` might return the comprehensive data OR I need to use `fetch` manually or update api.ts.
        // Ideally I update api.ts but for speed I might just use the raw endpoint here or cast.
        // Actually, let's just use the `apiClient` but if the method isn't there, I can't use it.
        // Wait, I can't update api.ts easily without breaking flow. 
        // I will use `apiClient['request']` if it was public, but it's private.
        // I will just use `fetch` with the `NEXT_PUBLIC_API_URL` here for the specific endpoint or better yet:
        // I will try to use `getGitHubContributions` and see if it works, or just fallback to fetch.

        // The guide says: GET /github/contributions/comprehensive/2024

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/github/contributions/comprehensive/${year}`);
        const response = await res.json();
        const data = response.data;

        if (data) {
          setMonthlyData(data.monthlyContributions || [])
          // data.topLanguages is an object { "TypeScript": 45.2, ... } in the doc example?
          // No, doc Example says:
          // "topLanguages": { "TypeScript": 45.2 ... } 
          // But my type expects array. 
          // I'll convert it.

          if (data.topLanguages) {
            const languages = Object.entries(data.topLanguages).map(([language, percentage]) => ({
              language,
              percentage: Number(percentage)
            }));
            // Sort by percentage
            languages.sort((a, b) => b.percentage - a.percentage);
            setLanguageData(languages as LanguageDatum[]);
          }
        }

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
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <CardContent className="p-6 h-80">
          <h3 className="text-lg font-semibold mb-4 text-slate-200">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              />
              <Legend />
              <Line type="monotone" dataKey="commits" stroke="#a78bfa" strokeWidth={2} name="Commits" dot={{ fill: '#a78bfa' }} />
              <Line type="monotone" dataKey="prs" stroke="#34d399" strokeWidth={2} name="Pull Requests" dot={{ fill: '#34d399' }} />
              <Line type="monotone" dataKey="issues" stroke="#fbbf24" strokeWidth={2} name="Issues" dot={{ fill: '#fbbf24' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Language Distribution */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <CardContent className="p-6 h-80">
          <h3 className="text-lg font-semibold mb-4 text-slate-200">Top Languages</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={languageData.slice(0, 10)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="language" type="category" width={100} stroke="#94a3b8" />
              <Tooltip
                cursor={{ fill: '#334155', opacity: 0.2 }}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              />
              <Bar dataKey="percentage" fill="#8884d8" radius={[0, 4, 4, 0]}>
                {/* Optional: varied colors */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
