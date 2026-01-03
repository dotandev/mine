"use client"


import { Marquee } from "@/components/ui/marquee"
import { TextRoller } from "@/components/ui/text-roller"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { ParticleBackground } from "@/components/particle-background"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState, useRef } from "react"
import { apiClient } from "@/lib/api"
import { useComprehensiveData, useActivityStats, useContactInfo } from "@/hooks/usePortfolio"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HomePage() {
  const { t } = useLanguage()
  const { data: comprehensiveData, loading: dataLoading } = useComprehensiveData()
  const { stats, loading: statsLoading } = useActivityStats()
  const { contact, loading: contactLoading } = useContactInfo()

  const heroRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(".hero-text", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    })
      .to(".hero-line", {
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.5")
      .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .to([".hero-actions", ".hero-socials"], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.5")
      .to(".hero-scroll", {
        opacity: 1,
        duration: 1,
        delay: 0.5
      })

  }, { scope: heroRef })

  // Use real data when available, fallback to static data
  const aboutData = comprehensiveData?.about
  const recentProjects = comprehensiveData?.recentProjects || []
  const activityStats = stats
  const contactInfo = contact

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <FloatingElements />
      {/* <Navigation /> */}

      {/* Hero Section - Enhanced with animations */}
      <section className="pt-16 min-h-screen flex items-center justify-center bg-background relative overflow-hidden" ref={heroRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-12">
            {/* Main Heading with staggered animation */}
            <div className="space-y-6 text-left sm:text-center max-w-5xl mx-auto">
              {/* Role 1 */}
              <div className="hero-text opacity-0 transform translate-y-full flex flex-wrap gap-x-3 items-baseline justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                <span className="text-foreground">Student (Botany),</span>
                <span className="text-accent flex gap-1">@<span className="text-foreground"><TextRoller words={["unilag."]} /></span></span>
              </div>

              {/* Role 2 */}
              <div className="hero-text opacity-0 transform translate-y-full flex flex-wrap gap-x-3 items-baseline justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                <span className="text-foreground">Software Engineer,</span>
                <span className="text-accent flex gap-1">@<span className="text-foreground"><TextRoller words={["web", "ML", "databases"]} interval={2000} loop={false} /></span></span>
              </div>

              {/* Role 3 */}
              <div className="hero-text opacity-0 transform translate-y-full flex flex-wrap gap-x-3 items-baseline justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                <span className="text-foreground">Research,</span>
                <span className="text-accent flex gap-1">@<span className="text-foreground"><TextRoller words={["leisure", "home", "nithub"]} interval={2500} loop={false} /></span></span>
              </div>

              {/* Internal Scroll - Marquee */}
              <div className="hero-line w-full opacity-0 transform scale-x-0 origin-center py-6 sm:py-10">
                <Marquee items={["Innovative", "Creative", "Scalable", "Robust"]} speed={20} />
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="hero-subtitle max-w-4xl mx-auto text-xl sm:text-2xl text-muted-foreground font-medium leading-relaxed opacity-0 translate-y-10">
                {t("home.hero.description")}
              </p>
            </div>

            {/* CTA Buttons with magnetic effect */}
            <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 opacity-0 translate-y-10">
              <MagneticButton
                size="lg"
                className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold group hover:scale-105 transition-all duration-300"
                onClick={() => (window.location.href = "/projects")}
              >
                {t("home.hero.cta.projects")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <a href="/resume.pdf" download>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  className="border-2 cursor-pointer border-border hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold bg-transparent hover:scale-105 transition-all duration-300"
                >
                  {t("home.hero.cta.resume")}
                </MagneticButton>
              </a>
            </div>

            {/* Social Links with hover animations */}
            <div className="hero-socials flex items-center justify-center space-x-6 pt-8 opacity-0 translate-y-10">
              {contactLoading ? (
                <div className="text-muted-foreground">Loading social links...</div>
              ) : contactInfo ? [
                { icon: Github, href: contactInfo.social_links.github },
                { icon: Linkedin, href: contactInfo.social_links.linkedin },
                { icon: Mail, href: `mailto:${contactInfo.email}` },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-accent transition-all duration-300 p-2 hover:scale-125 hover:rotate-12"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              )) : [
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-accent transition-all duration-300 p-2 hover:scale-125 hover:rotate-12"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center hover:border-accent transition-colors cursor-pointer">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Dark Impact Section with enhanced animations */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left" delay={200}>
              <div className="space-y-8">
                <h2 className="font-heading font-black text-4xl sm:text-6xl leading-tight">
                  {t("home.impact.title")}
                  <br />
                  <span className="text-accent">{t("home.impact.accent")}</span>
                </h2>
                <p className="text-xl text-primary-foreground/80 leading-relaxed">{t("home.impact.description")}</p>
                <MagneticButton
                  size="lg"
                  variant="secondary"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  {t("home.impact.cta")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <div className="space-y-6">
                <div className="text-sm text-primary-foreground/60 uppercase tracking-wider font-semibold">
                  LATEST WORK
                </div>
                <div className="space-y-4">
                  {(dataLoading ? [
                    { name: "Loading...", technologies: ["..."] },
                    { name: "Loading...", technologies: ["..."] },
                    { name: "Loading...", technologies: ["..."] },
                  ] : recentProjects.slice(0, 3).map(project => ({
                    name: project.name,
                    technologies: project.technologies || project.languages || []
                  }))).map((project, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-accent pl-6 py-2 hover:border-primary-foreground/40 transition-all duration-300 cursor-pointer group hover:translate-x-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/60 text-sm">
                        {Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities Grid with enhanced hover effects */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-6">
                {t("home.capabilities.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("home.capabilities.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Full-Stack Development",
                  description: "End-to-end application development with modern frameworks and scalable architectures",
                  icon: "🚀",
                },
                {
                  title: "AI & Machine Learning",
                  description: "Intelligent systems and data-driven solutions using cutting-edge ML algorithms",
                  icon: "🧠",
                },
                {
                  title: "Research & Innovation",
                  description:
                    "Academic research and experimental technologies pushing the boundaries of what's possible",
                  icon: "🔬",
                },
                {
                  title: "Cloud Architecture",
                  description: "Scalable cloud solutions and infrastructure design for enterprise applications",
                  icon: "☁️",
                },
                {
                  title: "Data Engineering",
                  description: "Big data processing, ETL pipelines, and real-time analytics systems",
                  icon: "📊",
                },
                {
                  title: "Cybersecurity",
                  description: "Security-first development practices and vulnerability assessment protocols",
                  icon: "🔒",
                },
              ].map((capability, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100}>
                  <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border hover:border-accent/50 relative overflow-hidden">
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardContent className="p-8 relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {capability.icon}
                      </div>
                      <h3 className="font-heading font-bold text-xl mb-4 group-hover:text-accent transition-colors duration-300">
                        {capability.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{capability.description}</p>
                      <div className="mt-6">
                        <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                          Learn More{" "}
                          <ExternalLink className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Section with counter animations */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  number: activityStats ? `${activityStats.total_projects}+` : "150+",
                  key: "home.stats.projects" as const
                },
                {
                  number: activityStats ? `${activityStats.research_papers}+` : "25+",
                  key: "home.stats.papers" as const
                },
                {
                  number: activityStats ? `${activityStats.years_experience}+` : "8+",
                  key: "home.stats.experience" as const
                },
                {
                  number: activityStats ? `${activityStats.technologies_used}+` : "50+",
                  key: "home.stats.certifications" as const
                },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl sm:text-5xl font-heading font-black text-accent mb-2 group-hover:scale-125 transition-all duration-300 cursor-pointer">
                    {statsLoading ? "..." : stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{t(stat.key)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer CTA with enhanced animations */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-20 bg-background border-t border-border">
          <div className="curso max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-6">{t("home.cta.title")}</h2>
            <p className="text-xl text-muted-foreground mb-8">{t("home.cta.description")}</p>
            <MagneticButton
              size="lg"
              onClick={() => (window.location.href = `mailto:${contactInfo?.email || 'contact@example.com'}`)}
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              {t("home.cta.button")}
              <Mail className="ml-2 w-5 h-5" />
            </MagneticButton>
          </div>
        </section>
      </ScrollReveal>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
