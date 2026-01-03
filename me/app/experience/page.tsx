'use client'

import React from 'react';
import { CareerMap } from '@/components/experience/career-map';
import { ExpertiseScroller } from '@/components/experience/expertise-scroller';
import { Timeline } from '@/components/experience/timeline';

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[var(--lando-bg)] relative selection:bg-[var(--lando-glow)] selection:text-[var(--lando-bg)] overflow-x-hidden">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter text-[var(--lando-text)] uppercase font-heading mb-6">
          Professional <br /> <span className="text-[var(--lando-glow)]">Odyssey</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--lando-muted)]">
          Tracing the path of innovation from Lagos to London, building the future of distributed systems.
        </p>
      </section>

      {/* Career Map */}
      <CareerMap />

      {/* Expertise Scroller */}
      <div className="py-12">
        <div className="text-center mb-8">
          <h3 className="text-[var(--lando-muted)] uppercase tracking-widest text-sm font-bold">Core Competencies</h3>
        </div>
        <ExpertiseScroller />
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="text-center pt-24 pb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--lando-text)]">
            The <span className="text-[var(--lando-glow)]">Timeline</span>
          </h2>
        </div>

        <Timeline />
      </div>

      {/* Bottom CTA to match About page flow */}
      <div className="fixed bottom-8 right-8 z-50">
        <a href="/resume.pdf" target="_blank" className="bg-[var(--lando-text)] text-[var(--lando-bg)] px-8 py-4 rounded-full font-bold text-lg hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_30px_var(--lando-glow)] inline-block">
          DOWNLOAD RESUME
        </a>
      </div>
    </main>
  );
}
