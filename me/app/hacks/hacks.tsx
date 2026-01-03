import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Users, Clock, Lightbulb, Target, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

const hackathons = [
  {
    title: 'SwitchCon - 2024',
    date: 'Oct 2023',
    status: 'Success',
    location: 'Lagos, Nigeria',
    theme: 'The Ignition 2023',
    projectLink: '#',
    projectLinkText: 'Link Broken',
    challengesFaced: 'Tight 24h deadline',
    technologiesUsed: ['React', 'Node.js', 'MongoDB'],
    judgesFeedback: 'Innovative use of emerging tech for local problems.',
    award: 'Final 10 Finalist',
    teamMembers: ['Muhammad', 'Joy', 'Victoria'],
    preparationTime: '1 Month',
    keyLearnings: 'Importance of clear communication.',
    sponsorships: [],
    futurePlans: 'Expand into a startup.',
    memorableMoments: 'Clinching the final 10 spot.',
  },
  {
    title: 'Cavista ML Hackathon',
    date: 'Apr 2024',
    status: 'Failure',
    location: 'Unilag, Nigeria',
    theme: 'Health Tech AI',
    projectLink: 'https://github.com/Cavista-Hackathon-2024/The-Nodes/tree/main/Node-Engine',
    projectLinkText: 'View Code',
    challengesFaced: 'Technical complexity overload',
    technologiesUsed: ['Typescript', 'Express', 'Flutter'],
    judgesFeedback: 'N/A',
    award: 'Participant',
    teamMembers: ['Ibraaheem', 'Bashir', 'Habeeb'],
    preparationTime: '1 day',
    keyLearnings: 'Better planning and task division needed.',
    sponsorships: [],
    futurePlans: 'Refine and retry.',
    memorableMoments: 'Building with friends.',
  },
  {
    title: 'Hackops By Pipeops',
    date: 'July 2024',
    status: 'Success',
    location: 'Lagos, Nigeria',
    theme: 'Productivity Tools',
    projectLink: 'https://github.com/Tryouts-HK/Pipe_Hack',
    projectLinkText: 'View Project',
    challengesFaced: 'Integration hurdles',
    technologiesUsed: ['Typescript', 'Express', 'Tensorflow'],
    judgesFeedback: 'Solid implementation.',
    award: 'Finalist',
    teamMembers: ['Daniel Asaboro'],
    preparationTime: '2 Weeks',
    keyLearnings: 'Scope management is key.',
    sponsorships: [],
    futurePlans: 'Ship V1.0',
    memorableMoments: 'Being selected as a finalist!',
  }
];

const HackathonCard = ({ hackathon, index }: { hackathon: any, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative z-10 w-full"
    >
      <div
        className={clsx(
          "bg-[var(--lando-bg)]/80 backdrop-blur-md border border-[var(--lando-muted)]/20 hover:border-[#A25725]/50 rounded-2xl p-6 md:p-8 shadow-xl transition-all duration-300 group overflow-hidden",
          isOpen ? "ring-1 ring-[#A25725]/50" : ""
        )}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#A25725] font-mono text-sm tracking-widest uppercase">{hackathon.date}</span>
              <span className={clsx(
                "px-2 py-0.5 rounded text-xs font-bold uppercase",
                hackathon.status === 'Success' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
              )}>
                {hackathon.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--lando-text)] group-hover:text-[#A25725] transition-colors">
              {hackathon.title}
            </h3>
            <p className="text-[var(--lando-muted)] text-sm">{hackathon.location} • {hackathon.theme}</p>
          </div>

          <div className="flex items-center gap-2">
            {hackathon.award !== 'Participant' && hackathon.award !== 'N/A' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A25725]/10 text-[#A25725] border border-[#A25725]/20">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-bold">{hackathon.award}</span>
              </div>
            )}
            <Button variant="ghost" size="icon" className="text-[var(--lando-muted)] hover:text-[#A25725]">
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hackathon.technologiesUsed.map((tech: string) => (
            <span key={tech} className="px-2 py-1 text-xs rounded-md bg-[var(--lando-text)]/5 text-[var(--lando-text)]/70 border border-[var(--lando-text)]/10">
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-[var(--lando-muted)]/10 grid md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-[var(--lando-text)]/80">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Target className="w-4 h-4 text-[#A25725] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--lando-text)] mb-1">Challenge</strong>
                      {hackathon.challengesFaced}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="w-4 h-4 text-[#A25725] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--lando-text)] mb-1">Team</strong>
                      {hackathon.teamMembers.join(', ')}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-[#A25725] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--lando-text)] mb-1">Prep Time</strong>
                      {hackathon.preparationTime}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Lightbulb className="w-4 h-4 text-[#A25725] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--lando-text)] mb-1">Key Learning</strong>
                      {hackathon.keyLearnings}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Trophy className="w-4 h-4 text-[#A25725] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--lando-text)] mb-1">Memorable Moment</strong>
                      {hackathon.memorableMoments}
                    </div>
                  </div>
                  <div className="pt-2">
                    <a
                      href={hackathon.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#A25725] hover:underline font-semibold"
                    >
                      {hackathon.projectLinkText} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const HackathonTimeline = () => {
  return (
    <div className="relative py-20 px-4">
      {/* Center Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#A25725]/30 to-transparent md:-translate-x-1/2" />

      <div className="max-w-5xl mx-auto space-y-12">
        {hackathons.map((hackathon, index) => (
          <div key={index} className={clsx(
            "relative flex flex-col md:flex-row gap-8 items-center",
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          )}>
            {/* Dot on Timeline */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#A25725] rounded-full shadow-[0_0_10px_#A25725] transform -translate-x-1/2 md:translate-x-[-50%]" />

            {/* Spacer for alternating layout */}
            <div className="hidden md:block w-1/2" />

            {/* Card Container */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
              <HackathonCard hackathon={hackathon} index={index} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-heading font-black text-[var(--lando-text)]">
          Ready for the Next <span className="text-[#A25725]">Challenge?</span>
        </h2>
        <p className="text-[var(--lando-muted)] text-lg">
          Whether it's a 24-hour sprint or a month-long marathon, I'm always game for building innovative solutions.
        </p>
        <Button
          size="lg"
          className="bg-[#A25725] hover:bg-[#bd7748] text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-[#A25725]/25 transition-all"
          onClick={() => window.location.href = '/contact'}
        >
          Let's Hack Together
        </Button>
      </div>
    </div>
  );
};

export default HackathonTimeline;