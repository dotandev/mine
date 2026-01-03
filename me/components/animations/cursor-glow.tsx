'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorGlowProps {
  color?: string
  size?: number
  opacity?: number
}

export function CursorGlow({ 
  color = '#A25725', 
  size = 400, 
  opacity = 0.15 
}: CursorGlowProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
      setIsVisible(true)
    }

    const hideCursor = () => setIsVisible(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [cursorX, cursorY, size])

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          x: cursorXSpring,
          y: cursorYSpring,
          background: `radial-gradient(circle, ${hexToRgba(color, opacity)} 0%, ${hexToRgba(color, opacity * 0.3)} 40%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}