"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const counterRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setLoading(false)
        });

        const counter = { value: 0 };

        tl.to(counter, {
            value: 100,
            duration: 3,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = `${Math.round(counter.value)}%`;
                }
            }
        })
            .to(counterRef.current, {
                opacity: 0,
                duration: 0.5
            })
            .to(containerRef.current, {
                y: "-100%",
                duration: 1,
                ease: "power4.inOut"
            });

    }, { scope: containerRef });

    return (
        <AnimatePresence>
            {loading && (
                <div
                    ref={containerRef}
                    className="fixed inset-0 z-[99999] bg-[#1a1a1a] flex items-center justify-center flex-col text-white"
                >
                    <div className="flex items-end gap-1 md:gap-2 overflow-hidden">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none">
                            DOTAN
                        </h1>
                        <div className="w-2 h-2 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-accent rounded-full mb-2 sm:mb-3 md:mb-4 lg:mb-8 animate-pulse" />
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none">
                            DEV
                        </h1>
                    </div>
                    <div ref={counterRef} className="text-lg sm:text-xl md:text-2xl font-mono mt-4 text-accent/80">
                        0%
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
