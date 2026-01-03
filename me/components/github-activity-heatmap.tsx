"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

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
        // Using current year
        const year = new Date().getFullYear();
        const response = await apiClient.getGitHubContributions(year);
        const data = response.success ? response.data : null;

        if (data) {
          const allDays: ContributionDay[] = []
          data.contributionCalendar.weeks.forEach((week: any) => {
            allDays.push(...week.contributionDays)
          })
          setContributions(allDays)
        }
      } catch (error) {
        console.error('Error fetching contributions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contribution Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[repeat(53,1fr)] gap-1 animate-pulse">
            {Array.from({ length: 53 * 7 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-slate-200 rounded-sm" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group by weeks for the grid
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <Card className="w-full border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="flex gap-1 min-w-[800px]">
          {weeks.map((week, weekIndex) => (
            <motion.div
              key={weekIndex}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: weekIndex * 0.01 }}
            >
              {week.map((day, dayIndex) => (
                <div
                  key={day.date}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: day.contributionCount > 0 ? day.color : '#1e293b' }}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-2 mt-4 text-xs text-slate-400">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-[#1e293b]" />
          <div className="w-3 h-3 rounded-sm bg-[#0e4429]" />
          <div className="w-3 h-3 rounded-sm bg-[#006d32]" />
          <div className="w-3 h-3 rounded-sm bg-[#26a641]" />
          <div className="w-3 h-3 rounded-sm bg-[#39d353]" />
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  )
}
