'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MorphingTextProps {
  texts: string[]
  className?: string
  interval?: number
}

export function MorphingText({ texts, className = '', interval = 3000 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 50, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -50, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="inline-block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function Typewriter({ text, className = '', speed = 50, delay = 0 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-current ml-1"
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.5, repeat: isComplete ? 0 : Infinity }}
      />
    </span>
  )
}

interface GlitchTextProps {
  children: string
  className?: string
}

export function GlitchText({ children, className = '' }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-[#A25725] z-0"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              opacity: [0, 1, 0.8, 1, 0.9, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
            style={{ clipPath: 'inset(0 0 50% 0)' }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[#167B41] z-0"
            animate={{
              x: [0, 2, -2, 1, -1, 0],
              opacity: [0, 0.8, 1, 0.9, 1, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
            style={{ clipPath: 'inset(50% 0 0 0)' }}
          >
            {children}
          </motion.span>
        </>
      )}
    </motion.span>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function CountUp({ end, duration = 2, className = '', prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById(`count-${end}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [end])

  return (
    <span id={`count-${end}`} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}