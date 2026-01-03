'use client'

import { motion } from 'framer-motion'

interface FloatingShapesProps {
  className?: string
}

export function FloatingShapes({ className = '' }: FloatingShapesProps) {
  const shapes = [
    { size: 300, x: '10%', y: '20%', duration: 20, delay: 0 },
    { size: 200, x: '80%', y: '10%', duration: 25, delay: 2 },
    { size: 150, x: '70%', y: '60%', duration: 18, delay: 4 },
    { size: 250, x: '20%', y: '70%', duration: 22, delay: 1 },
    { size: 180, x: '50%', y: '40%', duration: 28, delay: 3 },
  ]

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, rgba(162,87,37,0.08) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

interface GlowingOrbsProps {
  className?: string
}

export function GlowingOrbs({ className = '' }: GlowingOrbsProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(162,87,37,0.15) 0%, rgba(219,101,22,0.05) 40%, transparent 70%)',
          left: '-10%',
          top: '20%',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(219,101,22,0.12) 0%, rgba(162,87,37,0.04) 40%, transparent 70%)',
          right: '-5%',
          bottom: '10%',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Accent orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(22,123,65,0.1) 0%, transparent 60%)',
          left: '50%',
          top: '60%',
          filter: 'blur(30px)',
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

interface GridPatternProps {
  className?: string
}

export function AnimatedGridPattern({ className = '' }: GridPatternProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}