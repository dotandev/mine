"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { GitHubActivityHeatmap } from "@/components/github-activity-heatmap"
import { GitHubStats } from "@/components/github-stats"
import { GitHubRepositories } from "@/components/github-repositories"
import { GitHubContributions } from "@/components/github-contributions"
import { LifeMap } from "@/components/life-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Map as MapIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { BackgroundBeams } from "@/components/ui/background-beams"

export default function ActivityPage() {
  const [viewMode, setViewMode] = useState<'code' | 'life'>('code');

  return (
    <div className="min-h-screen relative bg-slate-950/20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="pt-24 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading font-black text-5xl sm:text-7xl text-[var(--lando-text)] mb-6">
              {viewMode === 'code' ? 'DEVELOPMENT' : 'GLOBAL'}
              <br />
              <span className="text-[#A25725]">{viewMode === 'code' ? 'ACTIVITY' : 'FOOTPRINT'}</span>
            </h1>
            <div className="w-24 h-1 bg-[#A25725] mx-auto mb-8 shadow-lg shadow-[#A25725]/50" />
            <p className="text-xl text-[var(--lando-muted)] max-w-3xl mx-auto leading-relaxed">
              {viewMode === 'code'
                ? "Real-time insights into my development journey, contribution patterns, and open-source involvement across multiple platforms."
                : "A visual journey of where I've been, where I'm managed bases, and where I plan to conquer next."}
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-slate-900/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 inline-flex">
              <Button
                variant="ghost"
                onClick={() => setViewMode('code')}
                className={`rounded-full px-8 py-6 text-lg font-bold gap-2 transition-all ${viewMode === 'code'
                    ? "bg-[#A25725] text-white shadow-lg shadow-[#A25725]/20"
                    : "text-[var(--lando-muted)] hover:text-white hover:bg-white/5"
                  }`}
              >
                <Code className="w-5 h-5" />
                Code Activity
              </Button>
              <Button
                variant="ghost"
                onClick={() => setViewMode('life')}
                className={`rounded-full px-8 py-6 text-lg font-bold gap-2 transition-all ${viewMode === 'life'
                    ? "bg-[#A25725] text-white shadow-lg shadow-[#A25725]/20"
                    : "text-[var(--lando-muted)] hover:text-white hover:bg-white/5"
                  }`}
              >
                <MapIcon className="w-5 h-5" />
                Life Maps
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="relative z-10 min-h-[500px]">
        <AnimatePresence mode="wait">
          {viewMode === 'code' ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* GitHub Stats Overview */}
              <section className="pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <GitHubStats />
                </div>
              </section>

              {/* Activity Heatmap */}
              <section className="pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="font-heading text-2xl">Contribution Activity</CardTitle>
                      <p className="text-muted-foreground">
                        Daily contribution patterns over the past year showing consistency and dedication to development.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <GitHubActivityHeatmap />
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Contribution Charts */}
              <section className="pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <GitHubContributions />
                </div>
              </section>

              {/* Top Repositories */}
              <section className="pb-32 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <GitHubRepositories />
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="life"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LifeMap />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}

