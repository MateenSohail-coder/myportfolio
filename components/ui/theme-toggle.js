"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative group flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-background/50 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className="absolute inset-0 w-full h-full text-amber-400 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" 
        />
        <Moon 
          className="absolute inset-0 w-full h-full text-blue-400 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" 
        />
      </div>
      
      {/* Absolute Glow Background */}
      <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}
