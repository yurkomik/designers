interface OKLCH {
  l: number  // Lightness: 0-100
  c: number  // Chroma: 0-0.4
  h: number  // Hue: 0-360
}

// Parse OKLCH string to object
export function parseOKLCH(oklch: string): OKLCH {
  const match = oklch.match(/oklch\((\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\)/)
  if (!match) {
    return { l: 50, c: 0.1, h: 0 }
  }
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3])
  }
}

// Convert OKLCH object to string
export function oklchToString(oklch: OKLCH): string {
  return `oklch(${oklch.l}% ${oklch.c} ${oklch.h})`
}

// Get complementary color (opposite hue)
export function getComplementaryColor(color: string): string {
  const oklch = parseOKLCH(color)
  return oklchToString({
    ...oklch,
    h: (oklch.h + 180) % 360
  })
}

// Get analogous colors (adjacent hues)
export function getAnalogousColors(color: string): string[] {
  const oklch = parseOKLCH(color)
  return [
    oklchToString({ ...oklch, h: (oklch.h - 30 + 360) % 360 }),
    color,
    oklchToString({ ...oklch, h: (oklch.h + 30) % 360 })
  ]
}

// Get split complementary colors
export function getSplitComplementaryColors(color: string): string[] {
  const oklch = parseOKLCH(color)
  return [
    color,
    oklchToString({ ...oklch, h: (oklch.h + 150) % 360 }),
    oklchToString({ ...oklch, h: (oklch.h + 210) % 360 })
  ]
}

// Get square colors (four evenly spaced hues)
export function getSquareColors(color: string): string[] {
  const oklch = parseOKLCH(color)
  return [
    color,
    oklchToString({ ...oklch, h: (oklch.h + 90) % 360 }),
    oklchToString({ ...oklch, h: (oklch.h + 180) % 360 }),
    oklchToString({ ...oklch, h: (oklch.h + 270) % 360 })
  ]
}

// Get tetradic colors (double complementary)
export function getTetradicColors(color: string): string[] {
  const oklch = parseOKLCH(color)
  return [
    color,
    oklchToString({ ...oklch, h: (oklch.h + 60) % 360 }),
    oklchToString({ ...oklch, h: (oklch.h + 180) % 360 }),
    oklchToString({ ...oklch, h: (oklch.h + 240) % 360 })
  ]
}

// Get triadic colors (three evenly spaced hues)
export function getTriadicColors(color: string): string[] {
  const oklch = parseOKLCH(color)
  return [
    color,
    oklchToString({ ...oklch, h: (oklch.h + 120) % 360 }),
    oklchToString({ ...oklch, h: (oklch.h + 240) % 360 })
  ]
}

// Get monochromatic colors
export function getMonochromaticColors(color: string): string[] {
  const oklch = parseOKLCH(color)
  return [
    oklchToString({ ...oklch, l: Math.max(oklch.l - 20, 0) }),
    color,
    oklchToString({ ...oklch, l: Math.min(oklch.l + 20, 100) }),
    oklchToString({ ...oklch, c: Math.max(oklch.c - 0.1, 0) }),
    oklchToString({ ...oklch, c: Math.min(oklch.c + 0.1, 0.4) })
  ]
}

// Calculate relative luminance for contrast ratio (improved)
function getLuminance(oklch: OKLCH): number {
  // More accurate luminance calculation based on OKLCH
  const L = oklch.l / 100
  const k = 0.2126729 + 0.7151522 + 0.0721750 // Weights for RGB channels
  return L * k
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(parseOKLCH(color1))
  const l2 = getLuminance(parseOKLCH(color2))
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Get accessible color variations with more options
export function getAccessibleVariations(color: string, targetRatio = 4.5): string[] {
  const oklch = parseOKLCH(color)
  const variations: string[] = []

  // Try different lightness levels
  for (let l = 0; l <= 100; l += 5) {
    // Try different chroma levels
    for (let c = 0; c <= 0.4; c += 0.1) {
      const variation = oklchToString({ ...oklch, l, c })
      if (getContrastRatio(variation, "#FFFFFF") >= targetRatio || 
          getContrastRatio(variation, "#000000") >= targetRatio) {
        variations.push(variation)
      }
    }
  }

  // Sort by contrast ratio and return top variations
  return variations
    .sort((a, b) => {
      const ratioA = Math.max(
        getContrastRatio(a, "#FFFFFF"),
        getContrastRatio(a, "#000000")
      )
      const ratioB = Math.max(
        getContrastRatio(b, "#FFFFFF"),
        getContrastRatio(b, "#000000")
      )
      return ratioB - ratioA
    })
    .slice(0, 10)
}

// Get color scheme based on context with more variations
export function getContextColors(context: string): string[] {
  const baseColors = {
    error: { h: 25, c: 0.2 },    // Red
    success: { h: 140, c: 0.15 }, // Green
    warning: { h: 85, c: 0.2 },   // Orange
    info: { h: 230, c: 0.15 },    // Blue
    neutral: { h: 240, c: 0.05 }  // Gray
  }

  const base = baseColors[context as keyof typeof baseColors] || baseColors.neutral
  
  return [
    oklchToString({ l: 30, ...base }), // Darkest
    oklchToString({ l: 45, ...base }), // Dark
    oklchToString({ l: 60, ...base }), // Base
    oklchToString({ l: 75, ...base }), // Light
    oklchToString({ l: 90, ...base })  // Lightest
  ]
}

// Export color harmony types for UI
export const colorHarmonies = [
  { name: "Complementary", fn: getComplementaryColor },
  { name: "Analogous", fn: getAnalogousColors },
  { name: "Triadic", fn: getTriadicColors },
  { name: "Split Complementary", fn: getSplitComplementaryColors },
  { name: "Square", fn: getSquareColors },
  { name: "Tetradic", fn: getTetradicColors },
  { name: "Monochromatic", fn: getMonochromaticColors }
] as const 