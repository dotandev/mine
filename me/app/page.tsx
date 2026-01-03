import { HomeHero } from "@/components/sections/hero"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Jua } from 'next/font/google'
import { apiClient } from "@/lib/api"
import { ScrollHighlightList } from "@/components/ui/scroll-reveal"

const jua = Jua({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// Force dynamic rendering since we are fetching data
export const dynamic = 'force-dynamic';

export default async function Page() {
  let data: any;
  try {
    const response = await apiClient.getComprehensive();
    data = response.success ? response.data : null;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Fallback data could go here, or just handle gracefully
  }

  const skills = data?.topSkills?.flatMap((s: any) => s.items) || [
    "Software Engineering",
    "Creative Development",
    "System Architecture"
  ];

  // Pick a few for the scroll highlight
  const highlightItems = skills.slice(0, 5);

  return (
    <main className={`${jua.className} min-h-screen bg-slate-950 text-white overflow-hidden`}>
      <HomeHero about={data?.about} />

      <div className="relative z-10 container mx-auto px-4 mt-20">
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-xl md:text-2xl text-slate-400 text-center max-w-2xl mx-auto">
            Explore the intersection of logic and creativity.
            <br />
            {/* <span className="text-sm">Scroll down to see what I'm made of.</span> */}
            <span className="text-sm">Scroll down to see the little I've done.</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold mb-10 text-purple-400">Core Capabilities</h2>
          <ScrollHighlightList items={highlightItems} />
        </div>
      </div>

      <BackgroundBeams />
      <div className="fixed bottom-8 right-8 z-50">
        <a href="/resume.pdf" target="_blank" className="bg-[var(--lando-text)] text-[var(--lando-bg)] px-8 py-4 rounded-full font-bold text-lg hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_30px_var(--lando-glow)] inline-block">
          DOWNLOAD RESUME
        </a>
      </div>
    </main>
  )
}
