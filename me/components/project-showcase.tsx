'use client'

import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card3D, HoverCard } from './animations/card-3d'
import { LineReveal } from './animations/text-reveal'
import { MagneticElement } from './animations/magnetic-element'
import { ExternalLink, Github, ArrowRight, Star, GitFork, Code2, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  project_id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: string
  image?: string
  github?: string
  live?: string
  featured: boolean
  stars?: number
  forks?: number
}

const mockProjects: Project[] = [
  {
    project_id: '1',
    title: 'Fintech Payment Gateway',
    description: 'High-performance payment processing system handling millions of transactions',
    longDescription: 'Built a scalable payment gateway using Rust and PostgreSQL, capable of processing 10,000+ TPS with 99.99% uptime.',
    technologies: ['Rust', 'PostgreSQL', 'Redis', 'gRPC', 'Docker'],
    category: 'Fintech',
    featured: true,
    stars: 234,
    forks: 45,
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    project_id: '2',
    title: 'Blockchain DEX',
    description: 'Decentralized exchange on Solana with automated market making',
    longDescription: 'Developed a high-frequency DEX with custom AMM algorithms achieving sub-second trade execution.',
    technologies: ['Rust', 'Solana', 'TypeScript', 'React', 'Anchor'],
    category: 'Blockchain',
    featured: true,
    stars: 189,
    forks: 32,
    github: 'https://github.com'
  },
  {
    project_id: '3',
    title: 'AI Code Review Bot',
    description: 'Intelligent code review assistant powered by LLMs',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'GitHub API'],
    category: 'AI/ML',
    featured: true,
    stars: 156,
    forks: 28,
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    project_id: '4',
    title: 'Real-time Analytics Dashboard',
    description: 'Live data visualization platform with WebSocket streaming',
    technologies: ['TypeScript', 'Next.js', 'D3.js', 'ClickHouse'],
    category: 'Data',
    featured: false,
    stars: 98,
    forks: 15,
    github: 'https://github.com'
  },
  {
    project_id: '5',
    title: 'Microservices Orchestrator',
    description: 'Kubernetes-native service mesh with intelligent routing',
    technologies: ['Go', 'Kubernetes', 'Envoy', 'Prometheus'],
    category: 'DevOps',
    featured: false,
    stars: 145,
    forks: 22,
    github: 'https://github.com'
  },
  {
    project_id: '6',
    title: 'Mobile Banking App',
    description: 'Cross-platform banking application with biometric auth',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    category: 'Fintech',
    featured: false,
    stars: 67,
    forks: 12,
    github: 'https://github.com'
  }
]

const categories = ['All', 'Fintech', 'Blockchain', 'AI/ML', 'Data', 'DevOps']

const categoryColors: Record<string, string> = {
  'Fintech': '#A25725',
  'Blockchain': '#8B5CF6',
  'AI/ML': '#EC4899',
  'Data': '#3B82F6',
  'DevOps': '#167B41'
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        }
      })
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  const color = categoryColors[project.category] || '#A25725'

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <Card3D intensity={8}>
        <HoverCard className="h-full">
          <motion.div
            className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 h-full"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Featured badge */}
            {project.featured && (
              <motion.div
                className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: color, color: 'white' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <Sparkles className="w-3 h-3" />
                Featured
              </motion.div>
            )}

            {/* Image/Gradient Header */}
            <div 
              className="h-48 relative overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)` 
              }}
            >
              {/* Animated pattern */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
                }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, ${color} 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Floating icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: isHovered ? -10 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                  style={{ backgroundColor: `${color}30` }}
                  animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }}
                >
                  <Code2 className="w-10 h-10" style={{ color }} />
                </motion.div>
              </motion.div>

              {/* Category tag */}
              <div className="absolute bottom-4 left-4">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                  style={{ backgroundColor: `${color}90`, color: 'white' }}
                >
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#A25725] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ backgroundColor: color, color: 'white' }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 text-gray-400 text-xs">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                {project.stars && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                )}
                {project.forks && (
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.github && (
                  <MagneticElement strength={0.3}>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                  </MagneticElement>
                )}
                {project.live && (
                  <MagneticElement strength={0.3}>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-[#A25725] hover:text-[#A25725] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </motion.a>
                  </MagneticElement>
                )}
              </div>
            </div>

            {/* Hover gradient overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${color}10, transparent)`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </HoverCard>
      </Card3D>
    </motion.div>
  )
}


export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(mockProjects)

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(mockProjects)
    } else {
      setFilteredProjects(mockProjects.filter(p => p.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.showcase-title', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })

      // Animate filter buttons
      gsap.from('.filter-btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.filter-container',
          start: 'top 85%',
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(162,87,37,0.05) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-[#A25725]/10 text-[#A25725] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            🚀 Featured Work
          </motion.span>
          
          <h2 className="showcase-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Projects That <span className="text-[#A25725]">Matter</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in backend systems, 
            blockchain development, and scalable architectures.
          </p>
        </div>

        {/* Category Filter */}
        <div className="filter-container flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <MagneticElement key={category} strength={0.2}>
              <motion.button
                className={`filter-btn px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#A25725] text-white shadow-lg shadow-[#A25725]/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            </MagneticElement>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.project_id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <MagneticElement strength={0.3}>
            <motion.a
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  )
}
