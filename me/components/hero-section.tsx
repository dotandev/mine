'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CharacterReveal, LineReveal } from './animations/text-reveal'
import { MagneticElement } from './animations/magnetic-element'
import { ScrollIndicator } from './animations/smooth-scroll'
import { GlowingOrbs } from './animations/floating-shapes'
import { MorphingText, GlitchText } from './animations/morphing-text'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const roles = ['Backend Engineer', 'Full-Stack Developer', 'Rust Enthusiast', 'Fintech Builder']

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GlowingOrbs />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
        style={{ y, opacity, scale }}
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#A25725]/10 text-[#A25725] text-sm font-medium">
            👋 Welcome to my digital space
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="mb-8">
          <LineReveal delay={0.3}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.9]">
              <GlitchText>One Human,</GlitchText>
            </h1>
          </LineReveal>
          <LineReveal delay={0.5}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9]">
              <span className="text-[#A25725]">Three Clues.</span>
            </h1>
          </LineReveal>
        </div>

        {/* Morphing Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-xl sm:text-2xl text-gray-600">
            I'm a <MorphingText texts={roles} className="text-[#A25725] font-semibold" interval={2500} />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto text-lg text-gray-500 mb-12"
        >
          Building scalable backend systems, fintech applications, and blockchain solutions 
          that make a real impact. Based in Lagos, Nigeria.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticElement strength={0.3}>
            <motion.button
              className="group relative px-8 py-4 bg-[#A25725] text-white rounded-full font-semibold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/projects'}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-[#DB6516]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </MagneticElement>

          <MagneticElement strength={0.3}>
            <motion.a
              href="/resume.pdf"
              download
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-[#A25725] hover:text-[#A25725] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: 'https://github.com/dotandev', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/khabibthekillys', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://twitter.com/khabibthekillys', label: 'Twitter' },
            { icon: Mail, href: 'mailto:khabibthekillys@gmail.com', label: 'Email' },
          ].map((social, index) => (
            <MagneticElement key={social.label} strength={0.5}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-[#A25725] hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            </MagneticElement>
          ))}
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}