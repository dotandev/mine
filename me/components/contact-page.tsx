"use client"

import { useContactInfo } from "@/hooks/usePortfolio"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin, MessageSquare } from "lucide-react"
import Link from "next/link"

export function ContactPage() {
    const { contact, loading } = useContactInfo()

    const contactOptions = [
        {
            title: "General Inquiries",
            description: "For general questions about my work, research, or availability.",
            // Fallback email if contact data not loaded yet
            email: contact?.email || "hello@example.com",
            icon: MessageSquare
        },
        {
            title: "Collaborations",
            description: "Interested in collaborating on a project or research paper?",
            email: contact?.email || "collab@example.com",
            icon: Mail
        },
        {
            title: "Location",
            description: contact?.location || "Based in Lagos, Nigeria",
            email: null,
            icon: MapPin
        }
    ]

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-semibold tracking-tight mb-6"
                >
                    Contact
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-foreground leading-relaxed"
                >
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </motion.p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
                {contactOptions.map((option, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="group block p-8 rounded-lg border border-border bg-card hover:bg-accent/5 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="p-3 bg-accent/10 rounded-md text-accent">
                                    <option.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                                    <p className="text-muted-foreground mb-4">{option.description}</p>
                                    {option.email && (
                                        <Link href={`mailto:${option.email}`} className="inline-flex items-center font-medium text-accent hover:underline">
                                            {option.email} <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
