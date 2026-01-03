'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LineReveal } from './animations/text-reveal'
import { Building2, Calendar, MapPin, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Experience {
  experience_id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
  color: string
}

const experiences: Experience[] = [
  {
    experience_id: '1',
    company: 'Fintech Startup',
    role: 'Senior Backend Engineer',
    location: 'Lagos, Nigeria',
    startDate: '2023',
    endDate: 'Present',
    description: 'Leading backend architecture for a high-growth fintech platform processing millions in transactions.',
    achievements: [
      'Architected payment system handling 10K+ TPS',
      'Reduced API latency by 60% through optimization',
      'Led team of 5 engineers across 3 time zones'
    ],
    technologies: ['Rust', 'PostgreSQL', 'Redis', 'Kubernetes'],
    color: '#A25725'
  },
  {
    experience_id: '2',
    company: 'Blockchain Protocol',
    role: 'Smart Contract Developer',
    location: 'Remote',
    startDate: '2022',
    endDate: '2023',
    description: 'Developed core smart contracts for a DeFi protocol on Solana.',
    achievements: [
      'Built AMM with $50M+ TVL',
      'Implemented novel yield optimization strategies',
      'Conducted security audits and bug bounties'
    ],
    technologies: ['Rust', 'Solana', 'Anchor', 'TypeScript'],
    color: '#8B5CF6'
  },
  {
    experience_id: '3',
    company: 'Tech Consultancy',
    role: 'Full-Stack Developer',
    location: 'Lagos, Nigeria',
    startDate: '2021',
    endDate: '2022',
    description: 'Delivered custom software solutions for enterprise clients.',
    achievements: [
      'Shipped 12+ client projects on time',
      'Introduced CI/CD practices reducing deployment time by 80%',
      'Mentored 3 junior developers'
    ],
    technologies: ['Node.js', 'React', 'AWS', 'MongoDB'],
    color: '#3B82F6'
  },
  {
    experience_id: '4',
    company: 'University Research Lab',
    role: 'Research Assistant',
    location: 'Lagos, Nigeria',
    startDate: '2019',
    endDate: '2021',
    description: 'Conducted research in distributed systems and machine learning.',
    achievements: [
      'Published 3 peer-reviewed papers',
      'Developed ML models for network optimization',
      'Presented at 2 international conferences'
    ],
    technologies: ['Python', 'TensorFlow', 'Docker', 'Linux'],
    color: '#167B41'
  }
]

function TimelineItem({ experience, index, isLast }: { experience: Experience; index: number; isLast: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  useEffect(() => {
    if (!itemRef.current) return

    const ctx = gsap.context(() => {
      // Animate the card
      gsap.from(itemRef.current, {
        x: isEven ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 80%',
        }
      })
    }, itemRef)

    return () => ctx.revert()
  }, [isEven])

  return (
    <div className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} relative`}>
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 -translate-x-1/2 hidden lg:block" />
      
      {/* Content */}
      <motion.div
        ref={itemRef}
        className={`w-full lg:w-[calc(50%-40px)] ${isEven ? 'lg:text-right' : 'lg:text-left'}`}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group"
          whileHover={{ y: -5 }}
        >
          {/* Accent line */}
          <motion.div
            className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1 h-full`}
            style={{ backgroundColor: experience.color }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Header */}
          <div className={`flex items-start gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${experience.color}15` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Building2 className="w-7 h-7" style={{ color: experience.color }} />
            </motion.div>
            <div className={isEven ? 'lg:text-right' : ''}>
              <h3 className="text-xl font-bold text-gray-900">{experience.role}</h3>
              <p className="text-[#A25725] font-semibold">{experience.company}</p>
            </div>
          </div>

          {/* Meta */}
          <div className={`flex flex-wrap gap-4 mb-4 text-sm text-gray-500 ${isEven ? 'lg:justify-end' : ''}`}>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.startDate} - {experience.endDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{experience.description}</p>

          {/* Achievements */}
          <ul className={`space-y-2 mb-4 ${isEven ? 'lg:text-right' : ''}`}>
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="text-sm text-gray-600 flex items-start gap-2"
                style={{ flexDirection: isEven ? 'row-reverse' : 'row' }}
                initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span style={{ color: experience.color }}>▸</span>
                {achievement}
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-end' : ''}`}>
            {experience.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${experience.color}10`,
                  color: experience.color 
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Hover gradient */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${experience.color}05 0%, transparent 50%)`
            }}
          />
        </motion.div>
      </motion.div>

      {/* Timeline dot */}
      <motion.div
        className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white z-10"
        style={{ backgroundColor: experience.color }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: experience.color }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Empty space for alternating layout */}
      <div className="hidden lg:block w-[calc(50%-40px)]" />
    </div>
  )
}


export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from('.timeline-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#A25725]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="timeline-header text-center mb-20">
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-[#A25725]/10 text-[#A25725] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            💼 Career Journey
          </motion.span>
          
          <LineReveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Work <span className="text-[#A25725]">Experience</span>
            </h2>
          </LineReveal>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A timeline of my professional journey, from research to building 
            production systems at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated progress line */}
          <motion.div
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-[#A25725] via-[#8B5CF6] to-[#167B41] -translate-x-1/2 hidden lg:block rounded-full"
            style={{ height: lineHeight }}
          />

          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.experience_id}
                experience={experience}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>

        {/* View full resume CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/experience"
            className="inline-flex items-center gap-2 text-[#A25725] font-semibold hover:underline"
            whileHover={{ x: 5 }}
          >
            View Full Experience
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
