import React from 'react';

export function HeroSection() {
    return (
        <section className="min-h-[90vh] flex flex-col lg:flex-row items-start justify-between py-24 pt-40 lg:pt-24 gap-12 relative z-10">
            <div className="flex-1 space-y-12 w-full">
                <div className="space-y-[-1rem] md:space-y-[-2rem]">
                    <h1 className="text-[clamp(3.5rem,15vw,12rem)] font-bold leading-[0.8] tracking-tighter text-[var(--lando-text)] uppercase font-heading break-all md:break-normal">
                        J.
                    </h1>
                    <h1 className="text-[clamp(3.5rem,15vw,12rem)] font-bold leading-[0.8] tracking-tighter text-[var(--lando-muted)] uppercase font-heading opacity-50 pl-2 md:pl-4 break-all md:break-normal">
                        Akanle
                    </h1>
                </div>

                <div className="max-w-xl space-y-6">
                    <p className="text-xl md:text-3xl font-light text-[var(--lando-text)] leading-relaxed">
                        I craft digital experiences that combine <span className="text-[var(--lando-glow)]">precision engineering</span> with <span className="text-[var(--lando-glow)]">aesthetic brilliance</span>.
                    </p>
                    <p className="text-base md:text-lg text-[var(--lando-muted)]">
                        Software Engineer Developer & A Lad with Full-Stack Experience based in *cryptic**.
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full lg:max-w-xl h-[400px] md:h-[600px] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 group mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black group-hover:scale-105 transition-transform duration-700 ease-out" />
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-[var(--lando-muted)]">
                    {/* <span className="text-xl">Portrait Image</span> */}
                    <img className='rounded-full mx-3 px-3' src="/notion.png" alt="/placeholder.svg" />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--lando-bg)] via-transparent to-transparent opacity-60" />
            </div>
        </section>
    );
}
