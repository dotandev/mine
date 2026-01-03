'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const technologies = [
  { name: 'Rust', icon: '🦀', color: '#DEA584' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'Go', icon: '🐹', color: '#00ADD8' },
  { name: 'Solana', icon: '◎', color: '#9945FF' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'Redis', icon: '🔴', color: '#DC382D' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'Kubernetes', icon: '☸️', color: '#326CE5' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'Node.js', icon: '💚', color: '#339933' },
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'Next.js', icon: '▲', color: '#000000' },
  { name: 'GraphQL', icon: '◈', color: '#E10098' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
]

interface TechMarqueeProps {
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

function MarqueeRow({ speed = 30, direction = 'left' }: TechMarqueeProps) {
  const [duplicatedTechs] = useState([...technologies, ...technologies, ...technologies])

  return (
    <div className="flex overflow-hidden py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -33.33 * technologies.length * 10] : [-33.33 * technologies.length * 10, 0]
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span className="text-2xl">{tech.icon}</span>
            <span 
              className="font-semibold text-sm"
              style={{ color: tech.color }}
            >
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee({ className = '' }: TechMarqueeProps) {
  return (
    <section className={`py-16 bg-gray-50 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <motion.p
          className="text-center text-gray-500 text-sm uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technologies I work with
        </motion.p>
      </div>
      
      <div className="space-y-4">
        <MarqueeRow speed={40} direction="left" />
        <MarqueeRow speed={35} direction="right" />
      </div>
    </section>
  )
}
