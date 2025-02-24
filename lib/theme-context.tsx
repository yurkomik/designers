"use client"

import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
}

interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
  colors: Record<string, string>
  setColors: (colors: Record<string, string>) => void
  radius: Record<string, string>
  setRadius: (radius: Record<string, string>) => void
}

const defaultColors = {
  primary: "#8B0000",
  secondary: "#D2691E",
  accent: "#DEB887",
  neutral: "#8B4513",
  info: "#5F9EA0",
  success: "#2E8B57",
  warning: "#DAA520",
  error: "#DC143C",
}

const defaultRadius = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  full: "9999px",
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  colors: defaultColors,
  setColors: () => {},
  radius: defaultRadius,
  setRadius: () => {},
})

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState("light")
  const [colors, setColors] = React.useState(defaultColors)
  const [radius, setRadius] = React.useState(defaultRadius)

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      colors,
      setColors,
      radius,
      setRadius,
    }),
    [theme, colors, radius]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 