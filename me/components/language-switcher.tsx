"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { languages, type Language } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-accent/10"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{languages[language].name}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
            <div className="py-1">
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code as Language)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-accent/10 transition-colors flex items-center space-x-3 ${
                    language === code ? "bg-accent/20 text-accent" : "text-foreground"
                  }`}
                >
                  <span className="text-lg">{flag}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
