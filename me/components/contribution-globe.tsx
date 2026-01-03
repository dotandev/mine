'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ContributionDay {
  date: string
  count: number
  level: number
}

// Generate mock contribution data for visualization
const generateContributionData = (): ContributionDay[] => {
  const data: ContributionDay[] = []
  const today = new Date()
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const count = Math.floor(Math.random() * 15)
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level
    })
  }
  return data
}

const levelColors = [
  'rgba(162, 87, 37, 0.1)',
  'rgba(162, 87, 37, 0.3)',
  'rgba(162, 87, 37, 0.5)',
  'rgba(162, 87, 37, 0.7)',
  'rgba(162, 87, 37, 1)',
]

export function ContributionGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [contributions] = useState(generateContributionData)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [totalContributions, setTotalContributions] = useState(0)

  useEffect(() => {
    const total = contributions.reduce((sum, day) => sum + day.count, 0)
    setTotalContributions(total)
  }, [contributions])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from('.contrib-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })

      // Animate stats
      gsap.from('.contrib-stat', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      })

      // Animate contribution cells with wave effect
      gsap.from('.contrib-cell', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: {
          each: 0.002,
          from: 'start',
          grid: 'auto',
          ease: 'power2.inOut'
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contrib-grid',
          start: 'top 80%',
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Group contributions by week
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <section ref={containerRef} className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#A25725] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="contrib-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contribution <span className="text-[#A25725]">Activity</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A visual journey through my coding activity over the past year
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {[
            { label: 'Total Contributions', value: totalContributions, icon: '🔥' },
            { label: 'Longest Streak', value: '47 days', icon: '⚡' },
            { label: 'Current Streak', value: '12 days', icon: '🚀' },
            { label: 'Best Day', value: '23 commits', icon: '💪' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="contrib-stat bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[180px] border border-gray-700/50 hover:border-[#A25725]/50 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="contrib-grid overflow-x-auto pb-4">
          <div className="flex gap-1 min-w-max justify-center">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={day.date}
                    className="contrib-cell w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-150 hover:z-10"
                    style={{ backgroundColor: levelColors[day.level] }}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-xl z-50 pointer-events-none">
            <span className="font-semibold">{hoveredDay.count} contributions</span>
            <span className="text-gray-400 ml-2">{hoveredDay.date}</span>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-400 text-sm">
          <span>Less</span>
          {levelColors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </section>
  )
}