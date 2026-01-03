'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = '', intensity = 15 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

interface Card3DContentProps {
  children: React.ReactNode
  className?: string
  depth?: number
}

export function Card3DContent({ children, className = '', depth = 50 }: Card3DContentProps) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
        }}
        variants={{
          rest: { x: '-100%' },
          hover: { x: '100%' },
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          boxShadow: '0 0 0 1px rgba(162,87,37,0)',
        }}
        variants={{
          rest: { boxShadow: '0 0 0 1px rgba(162,87,37,0)' },
          hover: { boxShadow: '0 0 20px 2px rgba(162,87,37,0.3)' },
        }}
        transition={{ duration: 0.3 }}
      />
      
      {children}
    </motion.div>
  )
}

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

export function FlipCard({ front, back, className = '' }: FlipCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {front}
      </div>
      <div
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        {back}
      </div>
    </motion.div>
  )
}