"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plane, Home, Compass } from 'lucide-react';

// Location Data
const locations = {
    lived: [
        { id: 'lagos', x: 52, y: 55, city: 'Lagos', country: 'Nigeria', description: 'Where it all started.', year: '2018-2022' },
        { id: 'london', x: 48, y: 25, city: 'London', country: 'UK', description: 'Current Base. Building the future.', year: '2024-Present' },
    ],
    visited: [
        { id: 'paris', x: 50, y: 27, city: 'Paris', country: 'France', description: 'Tech conferences and croissants.', year: '2023' },
        { id: 'dubai', x: 60, y: 40, city: 'Dubai', country: 'UAE', description: 'Desert safaris and skyscrapers.', year: '2022' },
        { id: 'accra', x: 49, y: 56, city: 'Accra', country: 'Ghana', description: 'Jollof wars and beaches.', year: '2021' },
    ],
    bucketList: [
        { id: 'tokyo', x: 88, y: 35, city: 'Tokyo', country: 'Japan', description: 'Cyberpunk aesthetics and sushi.', year: 'Soon' },
        { id: 'nyc', x: 25, y: 32, city: 'New York', country: 'USA', description: 'The concrete jungle.', year: 'Soon' },
        { id: 'berlin', x: 51, y: 24, city: 'Berlin', country: 'Germany', description: 'Techno and history.', year: 'Soon' },
        { id: 'cape-town', x: 54, y: 80, city: 'Cape Town', country: 'South Africa', description: 'Where oceans meet.', year: 'Soon' },
    ]
};

type Category = 'lived' | 'visited' | 'bucketList';

export function LifeMap() {
    const [activeCategory, setActiveCategory] = useState<Category>('lived');
    const [activeLocation, setActiveLocation] = useState<string | null>(null);

    const categories: { key: Category; label: string; icon: React.ElementType }[] = [
        { key: 'lived', label: 'Lived', icon: Home },
        { key: 'visited', label: 'Visited', icon: Plane },
        { key: 'bucketList', label: 'Bucket List', icon: Compass },
    ];

    const currentLocations = locations[activeCategory];

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <Button
                            key={cat.key}
                            variant={activeCategory === cat.key ? "default" : "outline"}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`rounded-full px-6 py-2 flex items-center gap-2 transition-all ${activeCategory === cat.key
                                    ? "bg-[#A25725] text-white hover:bg-[#bd7748] border-transparent shadow-lg shadow-[#A25725]/20"
                                    : "bg-transparent text-[var(--lando-muted)] border-[var(--lando-muted)]/20 hover:border-[#A25725] hover:text-[#A25725]"
                                }`}
                        >
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                        </Button>
                    ))}
                </div>

                <div className="relative aspect-[2/1] w-full bg-[#1e293b]/50 rounded-3xl border border-[#A25725]/10 p-8 shadow-2xl overflow-hidden backdrop-blur-sm group">
                    {/* Abstract World Map Background */}
                    <svg className="w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 50">
                        {/* Americas */}
                        <path d="M20 10 Q35 5 45 15 T55 25 T40 40 Q25 45 15 35 T20 10Z" fill="currentColor" className="text-[var(--lando-muted)]" />
                        {/* Africa-Europe */}
                        <path d="M45 15 Q60 10 70 15 T75 30 T60 45 Q50 50 48 35 T45 15Z" fill="currentColor" className="text-[var(--lando-muted)]" />
                        {/* Asia-Australia */}
                        <path d="M70 15 Q85 10 95 15 T90 35 T75 40 Q65 35 70 15Z" fill="currentColor" className="text-[var(--lando-muted)]" />
                    </svg>

                    {/* Location Points */}
                    <AnimatePresence mode='wait'>
                        {currentLocations.map((loc) => (
                            <motion.div
                                key={loc.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                onMouseEnter={() => setActiveLocation(loc.id)}
                                onMouseLeave={() => setActiveLocation(null)}
                                onClick={() => setActiveLocation(activeLocation === loc.id ? null : loc.id)}
                            >
                                <div className="relative">
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${activeLocation === loc.id
                                            ? 'bg-[#A25725] border-white shadow-[0_0_20px_#A25725]'
                                            : 'bg-[var(--lando-bg)] border-[#A25725] scale-100'
                                        }`} />

                                    {/* Pulse Effect for Active Category */}
                                    <div className={`absolute inset-0 rounded-full bg-[#A25725] opacity-50 animate-ping`} />

                                    {/* Tooltip */}
                                    <AnimatePresence>
                                        {activeLocation === loc.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: -10, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 bg-[#0a0a0a]/95 border border-[#A25725]/30 p-5 rounded-2xl backdrop-blur-xl shadow-2xl z-30"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-[#A25725]/10 to-transparent rounded-2xl pointer-events-none" />
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="text-[#A25725] font-bold text-xs tracking-widest uppercase">{loc.city}, {loc.country}</div>
                                                    <Badge variant="outline" className="text-[10px] border-[#A25725]/30 text-[#A25725]">{loc.year}</Badge>
                                                </div>
                                                <div className="text-white font-medium text-sm leading-snug">{loc.description}</div>
                                                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-b border-r border-[#A25725]/30 transform rotate-45" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
