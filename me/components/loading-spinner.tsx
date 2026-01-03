"use client"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin border-t-accent"></div>

        {/* Inner ring */}
        <div
          className="absolute top-2 left-2 w-12 h-12 border-4 border-muted/50 rounded-full animate-spin border-t-accent/50"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
    </div>
  )
}
