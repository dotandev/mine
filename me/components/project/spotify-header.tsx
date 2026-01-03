"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SpotifyHeaderProps {
    title: string;
    category?: string;
}

export const SpotifyHeader = ({ title, category }: SpotifyHeaderProps) => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Shrink title size on scroll
    const scale = useTransform(scrollY, [0, 200], [1, 0.6]);
    const y = useTransform(scrollY, [0, 200], [0, -10]);
    const opacity = useTransform(scrollY, [0, 100], [1, 0]); // Fade out large title
    const miniTitleOpacity = useTransform(scrollY, [150, 250], [0, 1]); // Fade in mini title

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Sticky Top Bar */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/projects" className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors group">
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>

                    <motion.div
                        style={{ opacity: miniTitleOpacity }}
                        className="text-white font-bold text-xl absolute left-1/2 -translate-x-1/2 truncate max-w-[50%]"
                    >
                        {title}
                    </motion.div>

                    <div className="w-10" /> {/* Spacer for balance */}
                </div>
            </div>

            {/* Massive Hero Title Area */}
            <section className="h-[40vh] sm:h-[60vh] flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div style={{ scale, y, originX: 0, originY: 1 }} className="origin-bottom-left">
                    <h4 className="text-accent font-mono tracking-widest uppercase mb-4 text-sm sm:text-base">
                        {category || "Selected Work"}
                    </h4>
                    <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-foreground tracking-tighter leading-none mb-2">
                        {title}
                    </h1>
                </motion.div>
            </section>
        </>
    );
};
