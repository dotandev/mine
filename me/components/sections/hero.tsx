"use client";

import { Container } from '@/components/Container';
import { FadeIn } from '../uis/FadeIn';
import { Div } from './div';
import { Inter } from 'next/font/google';
import { AnimatedText } from '@/components/ui/animated-text';
import { TextRoller } from '@/components/ui/text-roller';

const inter = Inter({ subsets: ['latin'] });

interface HeroProps {
    about?: {
        name: string;
        title: string;
        bio: string;
        location: string;
    };
};

export const HomeHero = ({ about }: HeroProps) => {
    return (
        <div className="hero-container relative">
            <Container className="mt-10 sm:mt-10 md:mt-26 relative z-10">
                <FadeIn className="max-w-4xl">
                    <div className="h-32 md:h-40 overflow-hidden">
                        <AnimatedText
                            text={about?.title || "One Human, Three Clues."}
                            // className="font-display text-5xl mb-5 font-purple-600 font-semibold tracking-tight text-balance sm:text-7xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                            className="font-display text-5xl mb-5 font-purple-600 font-semibold tracking-tight text-balance sm:text-7xl bg-white bg-clip-text text-transparent"
                        />
                        <AnimatedText
                            text={"One Human, Three Clues."}
                            // className="font-display text-5xl mb-5 font-purple-600 font-semibold tracking-tight text-balance sm:text-7xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                            className="font-display text-5xl mb-5 font-purple-600 font-semibold tracking-tight text-balance sm:text-7xl bg-white bg-clip-text text-transparent"
                        />
                    </div>

                    {/* <Div />

                    <Div /> */}

                    <div className={`${inter.className} mt-20 -mb-28 max-w-5xl`}>
                        <div className="flex flex-col gap-6 text-2xl sm:text-4xl md:text-5xl font-bold text-[#A25725]">

                            {/* Role 1 */}
                            <div className="flex flex-wrap gap-x-3 items-baseline">
                                <span className="text-slate-200">Studying <TextRoller words={["(Botany)", "(CS)"]} className="text-green-600" interval={3200}/>,</span>
                                {/* <span className="text-slate-200">Student <TextRoller words={["(Botany)", "(CS)"]} className="text-green-600" interval={3200}/>,</span> */}
                                <span className="flex gap-2"><span><TextRoller words={["@unilag.", "@miva."]} className="text-[#A25725] underline" interval={3200} /></span></span>
                            </div>

                            {/* Role 2 */}
                            <div className="flex flex-wrap gap-x-3 items-baseline">
                                <span className="text-slate-200">Software Engineer,</span>
                                <span className="flex gap-6"><span><TextRoller words={["@web.", "@ml.", "@databases."]} interval={4150} className="text-[#A25725] underline" /></span></span>
                            </div>

                            {/* Role 3 */}
                            <div className="flex flex-wrap gap-x-3 items-baseline">
                                <span className="text-slate-200">Research,</span>
                                <span className="flex gap-2"><span><TextRoller words={["@leisure.", "@home.", "@nithub."]} interval={5870} className="text-[#A25725] underline" /></span></span>
                            </div>

                        </div>
                    </div>
                </FadeIn>
            </Container>
        </div>
    );
};