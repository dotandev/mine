'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { StaggerContainer, StaggerItem } from './animations/stagger-container'
import { Card3D, HoverCard } from './animations/card-3d'
import { LineReveal } from './animations/text-reveal'

const skillCategories = [
  {
    name: 'Languages',
    color: '#A25725',
    skills: ['TypeScript', 'Rust', 'Python', 'Go', 'Java', 'Move'],
    icon: '💻'
  },
  {
    name: 'Backend',
    color: '#DB6516',
    skills: ['Node.js', 'Express', 'Axum', 'NestJS', 'GraphQL', 'REST'],
    icon: '⚙️'
  },
  {
    name: 'Databases',
    color: '#167B41',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'],
    icon: '🗄️'
  },
  {
    name: 'Cloud & DevOps',
    color: '#3B82F6',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'],
    icon: '☁️'
  },
  {
    name: 'Blockchain',
    color: '#8B5CF6',
    skills: ['Solana', 'Ethereum', 'SUI', 'Web3.js', 'Smart Contracts'],
    icon: '🔗'
  },
  {
    name: 'Tools',
    color: '#EC4899',
    skills: ['Git', 'Linux', 'Vim', 'Postman', 'Figma'],
    icon: '🛠️'
  }
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#A25725]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#167B41]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <LineReveal>
            <span className="text-[#A25725] font-semibold text-lg">What I Work With</span>
          </LineReveal>
          <LineReveal delay={0.2}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mt-4">
              Skills & Technologies
            </h2>
          </LineReveal>
        </div>

        {/* Skills Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {skillCategories.map((category, index) => (
            <StaggerItem key={category.name}>
              <Card3D intensity={10}>
                <HoverCard className="h-full">
                  <motion.div
                    className="bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.color}15` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-default"
                          style={{ 
                            backgroundColor: `${category.color}10`,
                            color: category.color 
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + index * 0.1 + skillIndex * 0.05 }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: category.color,
                            color: 'white'
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Decorative line */}
                    <motion.div
                      className="mt-6 h-1 rounded-full"
                      style={{ backgroundColor: `${category.color}20` }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    />
                  </motion.div>
                </HoverCard>
              </Card3D>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}