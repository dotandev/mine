"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TextRoller = ({
    words,
    delay = 0,
    interval = 3000,
    className = "",
    loop = true
}: {
    words: string[],
    delay?: number,
    interval?: number,
    className?: string,
    loop?: boolean
}) => {
    const [index, setIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Start animation
        setHasStarted(true);

        if (words.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => {
                // If not looping and we reached the end, clear interval
                if (!loop && prev === words.length - 1) {
                    clearInterval(timer);
                    return prev;
                }
                return (prev + 1) % words.length;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [words, interval, loop]);

    return (
        <div className={`inline-grid bg-transparent h-[1.2em] overflow-hidden align-bottom ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={`${index}-${words[index]}`}
                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                    className="block h-full text-left"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};
