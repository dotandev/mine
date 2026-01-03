'use client';

import { AlertCircle, ChevronRight, Radar, Rocket } from "lucide-react";
import { Jua } from "next/font/google";
import { useEffect, useState } from "react";

const jua = Jua({
    weight: '400', // Can be set based on available options
    subsets: ['latin'], // Add any subsets you want
    display: 'swap',
});

const Custom404 = () => {
    const [stage, setStage] = useState(0)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (stage < 3) setStage(stage + 1)
      }, 3000)
  
      return () => clearTimeout(timer)
    }, [stage])
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCoordinates({
          x: Math.floor(Math.random() * 100),
          y: Math.floor(Math.random() * 100)
        })
      }, 2000)
  
      return () => clearInterval(interval)
    }, [])
  
    const stages = [
      { icon: Rocket, text: "Initiating project search sequence..." },
      { icon: Radar, text: "Scanning digital space for project signals..." },
      { icon: AlertCircle, text: "Alert: Project not found in known directories!" },
      { icon: ChevronRight, text: "Recommendations available. Proceed?" }
    ]
  
  const handleRetry = () => {
    window.location.href = '/';
  }
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#A25725] mt-10">
        <div className="w-full max-w-3xl p-8 rounded-lg border-2 border-[#A25725] space-y-8 shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8 text-black">Project Lost in Digital Space</h1>
          
          <div className="space-y-4">
            {stages.map((s, index) => (
              <div key={index} className={`flex items-center space-x-4 ${index > stage ? 'opacity-50' : ''}`}>
                <s.icon className="w-8 h-8 text-[#A25725]" />
                <p className="text-lg text-black">{s.text}</p>
              </div>
            ))}
          </div>
  
          <div className="bg-[#A25725] bg-opacity-10 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-[#A25725]">Mission Control Log</h2>
            <p className="font-mono text-black">
              Last known coordinates: X: {coordinates.x}, Y: {coordinates.y}
            </p>
            <p className="font-mono text-black">
              Status: {stage === 3 ? 'Search Complete' : 'Searching...'}
            </p>
          </div>
  
          {stage === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#A25725]">Recommended Actions:</h2>
              <ul className="list-disc list-inside space-y-2 text-black">
                <li>Check project name and try again</li>
                <li>Explore nearby projects in the digital galaxy</li>
                <li>Initiate a new project creation sequence</li>
              </ul>
              <div className="flex space-x-4">
                <a href="/" className="px-4 py-2 bg-[#A25725] text-white rounded hover:bg-opacity-80 transition-colors">
                  Return to Base
                </a>
                <button onClick={handleRetry} className="px-4 py-2 border border-[#A25725] text-[#A25725] rounded hover:bg-[#A25725] hover:text-white transition-colors">
                  Retry Search
                </button>
              </div>
            </div>
          )}
  
          <div className="text-center text-sm text-black opacity-70">
            <p>CAUTION: Projects lost in digital space may be unrecoverable.</p>
            <p>Always backup your coordinates for safe space traversal.</p>
          </div>
        </div>
      </div>
    )
  }

  export default Custom404;