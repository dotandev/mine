import React from 'react';
import { HeroSection } from '@/components/about/hero-section';
import { InfoList } from '@/components/about/info-list';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--lando-bg)] relative selection:bg-[var(--lando-glow)] selection:text-[var(--lando-bg)] overflow-x-hidden">
      {/* Glow Vignette - Fixed overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 55%, var(--lando-glow) 160%)',
          opacity: 0.6
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <HeroSection />

        <div className="space-y-12 pb-32">
          <InfoList
            title="Services"
            items={[
              { label: "Frontend Development", subLabel: "React, Next.js, TypeScript" },
              // { label: "UI/UX Design", subLabel: "Figma, Framer, Tailwind" },
              { label: "Backend Engineering", subLabel: "Golang, Rust, Node.js, Postgres, Redis" },
              { label: "Performance Optimization", subLabel: "Web Vitals, SEO, Accessibility" }
            ]}
          />

          <InfoList
            title="Experience"
            items={[
              { label: "Software Engineer", subLabel: "Biyard (Feb. 2025 - September 2025)" },
              { label: "Full Stack Developer", subLabel: "Freelance (2020 - 2022)" },
              { label: "Open Source Contributor", subLabel: "React Ecosystem" }
            ]}
          />

          <InfoList
            title="Connect"
            items={[
              { label: "Twitter / X", link: "" },
              { label: "GitHub", link: "https://github.com/khabib" },
              { label: "LinkedIn", link: "https://linkedin.com/in/jeesus" },
              { label: "Email", link: "mailto:?" }
            ]}
          />
        </div>
      </div>

      {/* Sticky Bottom Button (Optional, matches reference) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-[var(--lando-text)] text-[var(--lando-bg)] px-8 py-4 rounded-full font-bold text-lg hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_30px_var(--lando-glow)]">
          GET IN TOUCH
        </button>
      </div>
    </main>
  );
}
