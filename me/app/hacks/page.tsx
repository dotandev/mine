'use client'

import { Button } from "@/components/ui/button"
import HackathonTimeline from "./hacks"

const hackathonProjects = [
  {
    title: "QuantumChat - Secure Messaging with Quantum Encryption",
    hackathon: "MIT Quantum Hackathon 2024",
    duration: "48 hours",
    team: "4 members",
    placement: "1st Place",
    prize: "$10,000",
    description:
      "Real-time messaging application using quantum key distribution for unbreakable encryption, built with quantum simulators and classical networking.",
    technologies: ["Qiskit", "WebSocket", "React", "Node.js", "Quantum Cryptography"],
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "#",
      demo: "#",
      devpost: "#",
    },
  },
  {
    title: "EcoTrack - AI-Powered Carbon Footprint Tracker",
    hackathon: "Climate Change AI Hackathon 2024",
    duration: "36 hours",
    team: "3 members",
    placement: "2nd Place",
    prize: "$5,000",
    description:
      "Mobile app that uses computer vision and ML to track personal carbon footprint through receipt scanning and activity monitoring.",
    technologies: ["React Native", "TensorFlow Lite", "Python", "Firebase", "Computer Vision"],
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    title: "DeepFake Detector - Real-time Video Authentication",
    hackathon: "Cybersecurity Hackathon 2023",
    duration: "24 hours",
    team: "2 members",
    placement: "1st Place",
    prize: "$8,000",
    description:
      "Browser extension that detects deepfake videos in real-time using advanced neural networks and provides authenticity scores.",
    technologies: ["PyTorch", "JavaScript", "WebRTC", "Chrome Extension API", "Deep Learning"],
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    title: "BlockVote - Decentralized Voting System",
    hackathon: "Blockchain for Good Hackathon 2023",
    duration: "48 hours",
    team: "5 members",
    placement: "3rd Place",
    prize: "$3,000",
    description:
      "Transparent and secure voting platform using blockchain technology with zero-knowledge proofs for voter privacy.",
    technologies: ["Solidity", "Web3.js", "React", "IPFS", "Zero-Knowledge Proofs"],
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    title: "NeuroControl - Brain-Computer Interface for Accessibility",
    hackathon: "Accessibility Tech Hackathon 2023",
    duration: "36 hours",
    team: "4 members",
    placement: "Winner - Best Accessibility Solution",
    prize: "$7,500",
    description:
      "BCI system that allows users with mobility impairments to control computers using EEG signals and machine learning.",
    technologies: ["Python", "OpenBCI", "TensorFlow", "Signal Processing", "Electron"],
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "#",
      demo: "#",
    },
  },
  {
    title: "AR Surgery Assistant - Mixed Reality Medical Training",
    hackathon: "HealthTech Innovation Hackathon 2022",
    duration: "48 hours",
    team: "6 members",
    placement: "2nd Place",
    prize: "$6,000",
    description:
      "Augmented reality application for surgical training with haptic feedback and real-time guidance for medical students.",
    technologies: ["Unity", "ARCore", "C#", "3D Modeling", "Haptic Feedback"],
    image: "/placeholder.svg?height=300&width=500",
    links: {
      github: "#",
      demo: "#",
    },
  },
]

const hackathonStats = [
  { label: "Hackathons Participated", value: "25+" },
  { label: "Awards Won", value: "12" },
  { label: "Total Prize Money", value: "$45K+" },
  { label: "Team Projects", value: "20+" },
]

export default function HacksPage() {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center -mb-20">
            <h1 className="font-heading font-black text-5xl sm:text-7xl text-[var(--lando-text)] mb-6">
              HACKATHON
              <br />
              <span className="text-[#A25725]">PROJECTS</span>
            </h1>
            <div className="w-24 h-1 bg-[#A25725] mx-auto mb-8 shadow-lg shadow-[#A25725]/50" />
            <p className="text-xl text-[var(--lando-muted)] max-w-3xl mx-auto leading-relaxed">
              Rapid prototyping and innovative solutions built under pressure. A showcase of creativity, technical
              skills, and collaborative problem-solving in time-constrained environments.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-3 lg:px-3">
        <HackathonTimeline />
      </div>
    </div>
  )
}



// 'use client'

// import { BackgroundBeams } from "@/components/ui/background-beams";
// import { Jua } from "next/font/google";
// import { HacksHero } from "./hero";
// import { Poem } from "@/components/sections/poem";
// import { useEffect } from "react";
// import HackathonTimeline from "./hacks";

// const jua = Jua({
//   weight: '400', // Can be set based on available options
//   subsets: ['latin'], // Add any subsets you want
//   display: 'swap',
// });

// const dynamicMetadata = {
//   title: "Hacks - The Basic Portfolio.",
//   description: "For Jesus, By Jesus, Of Jesus.",
//   keywords: "Hacks, The Basic Portfolio, For Jesus, By Jesus, Of Jesus.",
//   author: "The Basic Portfolio",
// };

// export default function Home() {
//   useEffect(() => {
//         document.title = dynamicMetadata.title;
//         const descriptionMetaTag = document.querySelector('meta[name="description"]');
//         const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
//         const authorMetaTag = document.querySelector('meta[name="author"]');
//         if (descriptionMetaTag) descriptionMetaTag.setAttribute('content', dynamicMetadata.description);
//         if (keywordsMetaTag) keywordsMetaTag.setAttribute('content', dynamicMetadata.keywords);
//         if (authorMetaTag) authorMetaTag.setAttribute('content', dynamicMetadata.author);
//       }, []);
//   return (
//     <main className={`${jua.className} relative`}>
//       <HacksHero />
//       <div className="mx-6">
//       <HackathonTimeline />
//       </div>
//       <div className="ml-6 lg:-ml-1">
//       <Poem firstLine={"some of those days, "} secondLine={"I made it to the stage. "} thirdLine={"with my team."} fourthLine={"some, I didn’t! "} fifthLine={"that’s the essence of a hack, then."} />
//       </div>
//       {/* <BackgroundBeams /> */}
//     </main>
//   );
// }