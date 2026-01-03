'use client'

import React from 'react';

const skills = [
    "Software Engineering",
    "Distributed Systems",
    "Cloud Architecture",
    "Frontend Performance",
    "AI Integration",
    "Rust Development",
    "React Ecosystem",
    "System Design"
];

export function ExpertiseScroller() {
    return (
        <section className="py-24 overflow-hidden bg-[var(--lando-bg)] border-y border-white/5">
            <div className="relative flex whitespace-nowrap overflow-hidden">
                {/* First Loop */}
                <div className="animate-marquee flex gap-12 md:gap-24 items-center min-w-full pl-12 md:pl-24">
                    {skills.map((skill, i) => (
                        <span key={i} className="text-4xl md:text-7xl font-bold text-[var(--lando-muted)]/20 hover:text-[var(--lando-glow)] transition-colors duration-300 uppercase font-heading tracking-tighter cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Second Loop (Duplicate for seamless scroll) */}
                <div className="animate-marquee flex aria-hidden gap-12 md:gap-24 items-center min-w-full pl-12 md:pl-24">
                    {skills.map((skill, i) => (
                        <span key={`dup-${i}`} className="text-4xl md:text-7xl font-bold text-[var(--lando-muted)]/20 hover:text-[var(--lando-glow)] transition-colors duration-300 uppercase font-heading tracking-tighter cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
