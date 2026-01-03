"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Award, Calendar, ExternalLink, CheckCircle2 } from "lucide-react"

// Mock data - would typically come from useComprehensiveData custom hook or props
const CERTIFICATIONS = [
    {
        id: "1",
        title: "Machine Learning Scientist",
        issuer: "DataCamp",
        date: "June 2024",
        link: "https://datacamp.com/certificate/ml-scientist",
        logo: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=100&h=100&fit=crop", // placeholder
        description: "Mastered essential machine learning concepts including supervised learning, unsupervised learning, and deep learning fundamental. Completed 15+ interactive courses and 5 projects.",
        skills: ["Python", "Scikit-learn", "Keras", "TensorFlow", "Data Analysis"],
        color: "#03A9F4"
    },
    {
        id: "2",
        title: "Deep Learning Specialization",
        issuer: "Coursera",
        date: "April 2024",
        link: "https://coursera.org/certificate/deep-learning",
        logo: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=100&h=100&fit=crop",
        description: "In-depth specialization covering neural networks, hyperparameter tuning, regularization, and sequence models. Built and trained deep neural networks from scratch.",
        skills: ["Neural Networks", "CNNs", "RNNs", "Optimization", "Computer Vision"],
        color: "#0056D2"
    },
    {
        id: "3",
        title: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        date: "Feb 2024",
        link: "https://aws.amazon.com/certification/",
        logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop",
        description: "Validated expertise in designing distributed systems on AWS. Covers security, reliability, high availability, and cost optimization of AWS applications.",
        skills: ["Cloud Architecture", "EC2", "S3", "VPC", "Security"],
        color: "#FF9900"
    },
    {
        id: "4",
        title: "Full-Stack Web Developer",
        issuer: "FreeCodeCamp",
        date: "Jan 2024",
        link: "https://freecodecamp.org/certification/full-stack",
        logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
        description: "Comprehensive curriculum covering frontend frameworks, backend APIs, and database management. Built 5 full-stack applications to demonstrate proficiency.",
        skills: ["React", "Node.js", "Express", "MongoDB", "Redux"],
        color: "#0a0a23"
    },
    {
        id: "5",
        title: "Google Data Analytics",
        issuer: "Google",
        date: "Dec 2023",
        link: "https://grow.google/certificates/data-analytics",
        logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
        description: "Learned the practices and processes used by junior and associate data analysts. Cleaned, visualized, and analyzed data using R and SQL.",
        skills: ["Data Cleaning", "Data Visualization", "R Programming", "SQL", "Tableau"],
        color: "#4285F4"
    },
]

export function CertificationsPage() {
    const [selectedCert, setSelectedCert] = useState(CERTIFICATIONS[0])

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-6">
                        Certifications
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        Continuous learning through recognized professional certifications.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Interactive List */}
                    <div className="space-y-4">
                        {CERTIFICATIONS.map((cert) => (
                            <div
                                key={cert.id}
                                onMouseEnter={() => setSelectedCert(cert)}
                                className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${selectedCert.id === cert.id
                                        ? "bg-accent/5 border-accent shadow-sm"
                                        : "bg-card border-border hover:border-accent/50"
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3
                                            className={`text-lg font-semibold transition-colors ${selectedCert.id === cert.id ? "text-accent" : "text-foreground group-hover:text-foreground/80"
                                                }`}
                                        >
                                            {cert.title}
                                        </h3>
                                        <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                                    </div>
                                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${selectedCert.id === cert.id ? "text-accent translate-x-0" : "text-muted-foreground -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                        }`} />
                                </div>

                                {/* Mobile-only expanded view for smaller screens where the right panel isn't visible */}
                                <div className="lg:hidden mt-4 pt-4 border-t border-border/50 text-sm text-foreground/80">
                                    <p className="mb-3">{cert.description}</p>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-accent font-medium">
                                        Verify Credential <ExternalLink className="ml-2 w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Sticky Detail View (Desktop Only) */}
                    <div className="hidden lg:block sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCert.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-card border border-border rounded-2xl p-8 shadow-xl relative overflow-hidden"
                            >
                                {/* Decorative background gradient */}
                                <div
                                    className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full blur-3xl -mr-16 -mt-16"
                                    style={{ backgroundColor: selectedCert.color }}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-accent/10 flex items-center justify-center">
                                            <Award className="w-8 h-8" style={{ color: selectedCert.color }} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold leading-tight mb-1">{selectedCert.title}</h2>
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                <span className="font-medium">{selectedCert.issuer}</span>
                                                <span>•</span>
                                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {selectedCert.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Description</h4>
                                            <p className="text-lg leading-relaxed">{selectedCert.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Skills Verified</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCert.skills.map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border">
                                            <a
                                                href={selectedCert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                            >
                                                View Certificate
                                                <ExternalLink className="ml-2 w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    )
}
