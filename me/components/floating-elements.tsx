"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          speed: Math.random() * 20 + 10,
          opacity: Math.random() * 0.1 + 0.05,
        })
      }
      setElements(newElements)
    }

    createElements()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-accent animate-pulse"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            animation: `float-${element.id} ${element.speed}s ease-in-out infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(20px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(15px, -15px) rotate(120deg); }
          66% { transform: translate(-15px, 15px) rotate(240deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(-25px) rotate(180deg); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(20px, -10px) rotate(90deg); }
          50% { transform: translate(0px, -20px) rotate(180deg); }
          75% { transform: translate(-20px, -10px) rotate(270deg); }
        }
        @keyframes float-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-180deg); }
        }
        @keyframes float-7 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(10px, -15px) scale(0.9); }
        }
      `}</style>
    </div>
  )
}
