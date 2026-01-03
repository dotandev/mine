'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { CountUp } from './animations/morphing-text'
import { ParallaxSection } from './animations/parallax-section'

interface Stat {
  value: number
  suffix: string
  label: string
  color: string
}

const stats: Stat[] = [
  { value: 14, suffix: '+', label: 'Projects Completed', color: '#A25725' },
  { value: 6, suffix: '+', label: 'Research Papers', color: '#DB6516' },
  { value: 5, suffix: '+', label: 'Years Experience', color: '#167B41' },
  { value: 32, suffix: '+', label: 'Technologies Used', color: '#3B82F6' },
]

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      let startTime: number
      const duration = 2000

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      setTimeout(() => requestAnimationFrame(animate), delay * 1000)
    }
  }, [isInView, value, delay, hasStarted])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(162,87,37,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="stats-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-grid)" />
        </svg>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <ParallaxSection key={stat.label} speed={0.1 * (index + 1)}>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Number */}
                <motion.div
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3"
                  style={{ color: stat.color }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={index * 0.2} />
                </motion.div>

                {/* Label */}
                <p className="text-gray-400 text-sm sm:text-base font-medium">
                  {stat.label}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="mt-4 mx-auto h-1 rounded-full"
                  style={{ backgroundColor: stat.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 60 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                />
              </motion.div>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  )
}