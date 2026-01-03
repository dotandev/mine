'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticElement } from './animations/magnetic-element'
import { GlitchText } from './animations/morphing-text'
import { ArrowRight, Mail, MessageSquare, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate floating elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(162,87,37,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="float-element absolute w-4 h-4 rounded-full bg-[#A25725]/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A25725]/20 text-[#A25725] text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#A25725] animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Let's Build Something{' '}
            <span className="text-[#A25725]">
              <GlitchText>Amazing</GlitchText>
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you have a project in mind, need technical consultation, 
            or just want to connect — I'd love to hear from you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticElement strength={0.3}>
              <motion.a
                href="/contact"
                className="group relative px-8 py-4 bg-[#A25725] text-white rounded-full font-semibold overflow-hidden flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span className="relative z-10">Get In Touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-[#DB6516]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </MagneticElement>

            <MagneticElement strength={0.3}>
              <motion.a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-[#A25725] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </motion.a>
            </MagneticElement>
          </motion.div>

          {/* Quick contact options */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { icon: Mail, label: 'khabibthekillys@gmail.com', href: 'mailto:khabibthekillys@gmail.com' },
              { icon: MessageSquare, label: '@khabibthekillys', href: 'https://twitter.com/khabibthekillys' },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 hover:text-[#A25725] transition-colors"
                whileHover={{ y: -2 }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
