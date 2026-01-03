'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Simplified coordinate mapping for visual locations (0-100 scale)
const locations = [
    { id: 'lagos', x: 52, y: 55, city: 'Lagos', country: 'Nigeria', role: 'Software Engineering', year: '2018-2022' },
    { id: 'remote', x: 20, y: 35, city: 'Remote', country: 'Global', role: 'Open Source', year: '2023' },
    { id: 'uk', x: 48, y: 25, city: 'London', country: 'UK', role: 'Senior Engineer', year: '2024-Present' },
];

export function CareerMap() {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);

    return (
        <section className="py-24 relative overflow-hidden bg-[var(--lando-bg)]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[var(--lando-text)] text-center">
                    Global <span className="text-[var(--lando-glow)]">Footprint</span>
                </h2>

                <div className="relative aspect-[2/1] w-full max-w-5xl mx-auto bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden backdrop-blur-sm group">
                    {/* Subtle World Map SVG Background (Simplified Shapes) */}
                    <svg className="w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 50">
                        {/* Abstract Continents */}
                        <path d="M20 10 Q35 5 45 15 T55 25 T40 40 Q25 45 15 35 T20 10Z" fill="currentColor" className="text-[var(--lando-muted)]" /> {/* Americasish */}
                        <path d="M45 15 Q60 10 70 15 T75 30 T60 45 Q50 50 48 35 T45 15Z" fill="currentColor" className="text-[var(--lando-muted)]" /> {/* Africa-Europeish */}
                        <path d="M70 15 Q85 10 95 15 T90 35 T75 40 Q65 35 70 15Z" fill="currentColor" className="text-[var(--lando-muted)]" /> {/* Asiaish */}
                    </svg>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M52 55 Q35 45 48 25" // Lagos -> London curve
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--lando-text)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--lando-glow)" />
                                <stop offset="100%" stopColor="var(--lando-text)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Location Points */}
                    {locations.map((loc) => (
                        <motion.div
                            key={loc.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            onMouseEnter={() => setActiveLocation(loc.id)}
                            onMouseLeave={() => setActiveLocation(null)}
                        >
                            <div className="relative">
                                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${activeLocation === loc.id ? 'bg-[var(--lando-glow)] border-white shadow-[0_0_20px_var(--lando-glow)]' : 'bg-[var(--lando-bg)] border-[var(--lando-muted)] scale-100'}`} />
                                {/* Glow Pulse */}
                                <div className={`absolute inset-0 rounded-full bg-[var(--lando-glow)] opacity-50 animate-ping ${activeLocation === loc.id ? 'block' : 'hidden'}`} />

                                {/* Tooltip */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{
                                        opacity: activeLocation === loc.id ? 1 : 0,
                                        y: activeLocation === loc.id ? -10 : 10,
                                        scale: activeLocation === loc.id ? 1 : 0.9,
                                        pointerEvents: activeLocation === loc.id ? 'auto' : 'none'
                                    }}
                                    className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 bg-[var(--lando-bg)]/95 border border-[var(--lando-glow)]/30 p-5 rounded-2xl backdrop-blur-xl shadow-2xl z-30"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--lando-glow)]/10 to-transparent rounded-2xl pointer-events-none" />
                                    <div className="text-[var(--lando-glow)] font-bold text-xs tracking-widest uppercase mb-1">{loc.city}, {loc.country}</div>
                                    <div className="text-[var(--lando-text)] font-heading font-bold text-lg leading-tight mb-1">{loc.role}</div>
                                    <div className="text-[var(--lando-muted)] text-xs font-mono">{loc.year}</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
