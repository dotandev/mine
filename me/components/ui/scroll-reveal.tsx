"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
}

export const ScrollReveal = ({ children, className }: ScrollRevealProps) => {
    const element = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.9", "start 0.25"],
    });

    return (
        <motion.div
            ref={element}
            style={{ opacity: scrollYProgress }}
            className={cn("transition-opacity", className)}
        >
            {children}
        </motion.div>
    );
};

interface HighlightItemProps {
    children: React.ReactNode;
    index: number;
    total: number;
    progress: MotionValue<number>;
}

// A more complex effect: One by one highlight
export const ScrollHighlightList = ({ items }: { items: string[] }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start center", "end center"],
    });

    return (
        <div ref={container} className="relative py-20">
            {items.map((item, i) => {
                const start = i / items.length;
                const end = start + 1 / items.length;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.95, 1.05, 0.95]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const x = useTransform(scrollYProgress, [start, (start + end) / 2, end], [-20, 0, -20]);

                return (
                    <motion.div
                        key={i}
                        style={{ opacity, scale, x }}
                        className="text-4xl md:text-6xl font-bold py-4 transition-all duration-300 ease-out"
                    >
                        {item}
                    </motion.div>
                );
            })}
        </div>
    );
};
