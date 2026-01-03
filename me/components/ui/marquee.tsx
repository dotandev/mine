"use client";

import { motion } from "framer-motion";

export const Marquee = ({ items, direction = "left", speed = 20 }: { items: string[], direction?: "left" | "right", speed?: number }) => {
    return (
        <div className="relative flex overflow-hidden w-full max-w-[200px] sm:max-w-[400px] mx-auto mask-gradient">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {[...items, ...items, ...items].map((item, i) => (
                    <span key={i} className="text-accent font-bold text-4xl sm:text-7xl lg:text-9xl tracking-tight">
                        {item}
                    </span>
                ))}
            </motion.div>

            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
    );
};
