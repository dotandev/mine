'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [pageHeight, setPageHeight] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const transform = useSpring(scrollY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (scrollRef.current) {
      setPageHeight(scrollRef.current.scrollHeight)
    }
  }, [])

  return (
    <>
      <div style={{ height: pageHeight }} />
      <motion.div
        ref={scrollRef}
        className="fixed top-0 left-0 w-full"
        style={{ y: useTransform(transform, (value) => -value) }}
      >
        {children}
      </motion.div>
    </>
  )
}

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A25725] via-[#DB6516] to-[#A25725] origin-left z-50 ${className}`}
      style={{ scaleX }}
    />
  )
}

interface ScrollIndicatorProps {
  className?: string
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-[#A25725] rounded-full flex justify-center cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-1.5 h-3 bg-[#A25725] rounded-full mt-2"
          animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}