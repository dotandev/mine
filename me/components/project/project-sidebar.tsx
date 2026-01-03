"use client";

import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Code2, Cpu, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectSidebarProps {
    project: any;
}

export const ProjectSidebar = ({ project }: ProjectSidebarProps) => {
    return (
        <div className="lg:sticky lg:top-24 space-y-8 h-fit">
            {/* Back Navigation */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-4"
            >
                <div className="p-2 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-medium">All Projects</span>
            </Link>

            {/* Main Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1DB954] text-black p-8 rounded-[32px] overflow-hidden relative shadow-xl"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-black/10 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        {project.category || "Selected Work"}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] mb-8">
                        {project.name}
                    </h1>

                    <div className="flex flex-col gap-4">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-black text-white hover:bg-black/80 py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Github className="w-5 h-5" />
                                View Code
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-white text-black hover:bg-white/90 py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Metadata Section */}
            <div className="bg-card border border-border/50 p-6 rounded-3xl space-y-6">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                        <Users className="w-4 h-4" /> Team
                    </div>
                    <div className="font-semibold text-lg">{project.team || "Solo Project"}</div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                        <Activity className="w-4 h-4" /> Status
                    </div>
                    <div className="font-semibold text-lg">{project.status || "Completed"}</div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                        <Calendar className="w-4 h-4" /> Year
                    </div>
                    <div className="font-semibold text-lg">{project.year || project.date?.split('-')[0] || "2024"}</div>
                </div>

                <div className="w-full h-px bg-border/50" />

                {/* Industry & Framework (New) */}
                {(project.industry || project.framework) && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            {project.industry && (
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                                        Industry
                                    </div>
                                    <div className="font-medium">{project.industry}</div>
                                </div>
                            )}
                            {project.framework && (
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                                        Framework
                                    </div>
                                    <div className="font-medium">{project.framework}</div>
                                </div>
                            )}
                        </div>
                        <div className="w-full h-px bg-border/50" />
                    </>
                )}

                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">
                        <Code2 className="w-4 h-4" /> Role
                    </div>
                    <div className="font-semibold text-lg">{project.role || "Full Stack Developer"}</div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider mb-3">
                        <Cpu className="w-4 h-4" /> Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {/* Combine languages and technologies, filter duplicates/empty */}
                        {Array.from(new Set([...(project.languages || []), ...(project.technologies || [])])).map((t: string) => (
                            <span key={t} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium">
                                {t}
                            </span>
                        ))}
                        {(!project.languages?.length && !project.technologies?.length) && (
                            <span className="text-muted-foreground italic">Not specified</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
