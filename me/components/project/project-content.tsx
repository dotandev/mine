"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, Code2, Cpu } from "lucide-react";
import Image from "next/image";

interface ProjectContentProps {
    project: any; // Using any for flexibility with API data
}

const Section = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "circOut" }}
        className="mb-20 sm:mb-32"
    >
        <h3 className="text-3xl sm:text-5xl font-black mb-8 text-foreground/90 tracking-tight">{title}</h3>
        <div className="text-lg sm:text-xl leading-relaxed text-foreground/80 font-normal">
            {children}
        </div>
    </motion.div>
);

export const ProjectContent = ({ project }: ProjectContentProps) => {
    return (
        <div className="space-y-12 pb-24">
            {/* Content Sections */}
            <Section title="The Challenge">
                <p className="whitespace-pre-line">{project.description}</p>
            </Section>

            {/* Divider */}
            <div className="w-full h-px bg-border/40" />

            <Section title="The Approach" delay={0.2}>
                <p className="whitespace-pre-line">{project.details || project.description}</p>
            </Section>

            {project.long_description && (
                <>
                    <div className="w-full h-px bg-border/40" />
                    <Section title="Deep Dive" delay={0.3}>
                        <p className="whitespace-pre-line">{project.long_description}</p>
                    </Section>
                </>
            )}

            {/* Key Tasks & Features Section */}
            {(project.features?.length > 0 || project.tasks?.length > 0) && (
                <>
                    <div className="w-full h-px bg-border/40" />
                    <Section title="Key Tasks & Features" delay={0.4}>
                        <ul className="grid sm:grid-cols-2 gap-6">
                            {(project.tasks || project.features || []).map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#1DB954] mt-2.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>
                </>
            )}

            {/* Requirements Section */}
            {project.requirements?.length > 0 && (
                <>
                    <div className="w-full h-px bg-border/40" />
                    <Section title="Requirements" delay={0.5}>
                        <ul className="space-y-4">
                            {project.requirements.map((req: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#A25725] mt-2 flex-shrink-0" />
                                    <span className="text-foreground/80">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>
                </>
            )}

            {/* Timeline Section */}
            {project.timeline?.length > 0 && (
                <>
                    <div className="w-full h-px bg-border/40" />
                    <Section title="Project Timeline" delay={0.6}>
                        <div className="relative border-l-2 border-border/50 ml-4 space-y-12">
                            {project.timeline.map((event: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="relative pl-8"
                                >
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-[#1DB954] shadow-[0_0_10px_rgba(29,185,84,0.3)]" />
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                        <span className="text-sm font-bold text-[#1DB954] uppercase tracking-wider bg-[#1DB954]/10 px-2 py-1 rounded w-fit">
                                            {event.date}
                                        </span>
                                        <h4 className="text-xl font-bold text-foreground">{event.title}</h4>
                                    </div>
                                    <p className="text-foreground/70 leading-relaxed bg-secondary/20 p-4 rounded-xl border border-border/50">
                                        {event.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </Section>
                </>
            )}

            {/* Gallery Section */}
            {project.images?.length > 0 && (
                <>
                    <div className="w-full h-px bg-border/40" />
                    <Section title="Gallery" delay={0.7}>
                        <div className="grid gap-8">
                            {project.images.map((img: string, idx: number) => (
                                <div key={idx} className="rounded-2xl overflow-hidden border border-border shadow-lg">
                                    <Image
                                        src={img}
                                        alt={`${project.name} screenshot ${idx + 1}`}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </Section>
                </>
            )}
        </div>
    );
};

