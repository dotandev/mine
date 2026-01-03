'use client'

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion";
import clsx from "clsx";

export function Timeline() {
    const [timeline, setTimeline] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperience() {
            try {
                const res = await apiClient.getExperience();
                if (res.success) {
                    setTimeline(res.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchExperience();
    }, []);

    if (loading) return (
        <div className="py-24 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--lando-glow)] border-t-transparent rounded-full mx-auto" />
        </div>
    );

    return (
        <section className="py-24 bg-[var(--lando-bg)] relative">
            {/* Vertical Glow Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--lando-glow)] to-transparent opacity-30 transform md:-translate-x-1/2" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="space-y-20">
                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={clsx(
                                "relative flex flex-col md:flex-row gap-8 md:gap-0 group",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[var(--lando-bg)] border-2 border-[var(--lando-glow)] shadow-[0_0_10px_var(--lando-glow)] transform md:-translate-x-1/2 mt-1.5 z-20 group-hover:scale-150 transition-transform duration-300" />

                            {/* Date/Location */}
                            <div className={clsx(
                                "md:w-1/2 pl-16 md:pl-0 flex flex-col justify-center",
                                index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                            )}>
                                <div className="text-[var(--lando-glow)] font-bold mb-1">{item.duration}</div>
                                <div className="text-[var(--lando-muted)] text-sm">{item.location}</div>
                            </div>

                            {/* Content Card */}
                            <div className={clsx(
                                "md:w-1/2 pl-16 md:pl-0 relative z-10",
                                index % 2 === 0 ? "md:pl-16" : "md:pr-16"
                            )}>
                                <motion.div
                                    layout
                                    className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-[var(--lando-glow)]/50 transition-all duration-500 shadow-2xl relative group/card"
                                    initial={{ height: "auto" }}
                                    whileHover={{ scale: 1.02, zIndex: 20 }}
                                >
                                    <CardContent className="p-8 relative">
                                        {/* Subtle Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                        {item.type === "company" ? (
                                            <>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <Building className="w-5 h-5 text-[var(--lando-glow)]" />
                                                    <h3 className="text-2xl font-bold text-[var(--lando-text)]">
                                                        {item.company}
                                                    </h3>
                                                </div>

                                                {/* Roles */}
                                                <div className="space-y-8">
                                                    {item.roles?.map((role: any, rIndex: number) => (
                                                        <motion.div key={rIndex} className="relative pl-4 border-l border-white/10 ml-2" layout>
                                                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--lando-muted)]" />

                                                            <h4 className="text-lg font-semibold text-[var(--lando-text)]">{role.title}</h4>
                                                            <div className="text-sm text-[var(--lando-muted)] mb-3">{role.type}</div>

                                                            {/* Description */}
                                                            <motion.div
                                                                className="text-[var(--lando-muted)] text-sm leading-relaxed mb-4 overflow-hidden"
                                                                initial={{ opacity: 0.8, height: "3.6em" }}
                                                                whileHover={{ opacity: 1, height: "auto" as any }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                {role.description}
                                                            </motion.div>

                                                            {/* Technologies */}
                                                            <motion.div
                                                                className="flex flex-wrap gap-2"
                                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                                whileHover={{ opacity: 1, height: "auto", marginTop: 16 }}
                                                            >
                                                                {role.technologies?.map((tech: string) => (
                                                                    <span key={tech} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-[var(--lando-text)]/80">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </motion.div>

                                                            {/* Read More Cue */}
                                                            <motion.div
                                                                className="text-[var(--lando-glow)] text-xs font-bold uppercase tracking-wider mt-2 cursor-pointer"
                                                                initial={{ opacity: 1 }}
                                                                whileHover={{ opacity: 0 }}
                                                            >
                                                                Hover to expand
                                                            </motion.div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-4">
                                                <h3 className="text-xl font-bold text-[var(--lando-muted)] mb-2">Career Break</h3>
                                                <p className="text-[var(--lando-text)]">{item.description}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}
