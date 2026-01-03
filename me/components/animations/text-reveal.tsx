'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function TextReveal({ children, className = '', delay = 0, staggerDelay = 0.03 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface CharacterRevealProps {
  children: string
  className?: string
  delay?: number
}

export function CharacterReveal({ children, className = '', delay = 0 }: CharacterRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const characters = children.split('')

  return (
    <motion.span ref={ref} className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.02,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface LineRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function LineReveal({ children, className = '', delay = 0 }: LineRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}