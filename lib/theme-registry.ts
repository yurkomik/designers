import { Theme } from "@/lib/theme-types";

// Official shadcn themes
export const officialThemes: Theme[] = [
  {
    id: "default",
    name: "Default",
    description: "The default shadcn/ui theme",
    colors: {
      primary: "hsl(222.2, 47.4%, 11.2%)",
      secondary: "hsl(217.2, 32.6%, 17.5%)",
      accent: "hsl(210, 40%, 96.1%)",
      neutral: "hsl(0, 0%, 100%)",
      info: "hsl(215, 100%, 50%)",
      success: "hsl(142.1, 76.2%, 36.3%)",
      warning: "hsl(47.9, 95.8%, 53.1%)",
      error: "hsl(346.8, 77.2%, 49.8%)",
    },
    radius: {
      boxes: "0.5rem",
      fields: "0.375rem",
      selectors: "0.25rem",
    },
    borderWidth: 1,
    fontFamily: "Inter, system-ui, sans-serif",
    type: "official",
    isDark: false,
  },
  {
    id: "dark",
    name: "Dark",
    description: "Official shadcn dark theme",
    colors: {
      primary: "hsl(0, 0%, 98%)",
      secondary: "hsl(0, 0%, 96.1%)",
      accent: "hsl(240, 3.7%, 15.9%)",
      neutral: "hsl(240, 10%, 3.9%)",
      info: "hsl(215, 100%, 69.6%)",
      success: "hsl(142.1, 70.6%, 45.3%)",
      warning: "hsl(47.9, 95.8%, 53.1%)",
      error: "hsl(346.8, 77.2%, 49.8%)",
    },
    radius: {
      boxes: "0.5rem",
      fields: "0.375rem",
      selectors: "0.25rem",
    },
    borderWidth: 1,
    fontFamily: "Inter, system-ui, sans-serif",
    type: "official",
    isDark: true,
  },
  {
    id: "rose",
    name: "Rose",
    description: "A rosy theme with soft pink accents",
    colors: {
      primary: "hsl(346.8, 77.2%, 49.8%)",
      secondary: "hsl(338, 77.8%, 94.7%)",
      accent: "hsl(338, 69.5%, 93.5%)",
      neutral: "hsl(0, 0%, 100%)",
      info: "hsl(215, 100%, 50%)",
      success: "hsl(142.1, 76.2%, 36.3%)",
      warning: "hsl(47.9, 95.8%, 53.1%)",
      error: "hsl(346.8, 77.2%, 49.8%)",
    },
    radius: {
      boxes: "0.75rem",
      fields: "0.5rem",
      selectors: "0.25rem",
    },
    borderWidth: 1,
    fontFamily: "Inter, system-ui, sans-serif",
    type: "official",
    isDark: false,
  },
  {
    id: "blue",
    name: "Blue",
    description: "A blue-focused theme with modern accents",
    colors: {
      primary: "hsl(221.2, 83.2%, 53.3%)",
      secondary: "hsl(215, 27.9%, 16.9%)",
      accent: "hsl(210, 40%, 96.1%)",
      neutral: "hsl(0, 0%, 100%)",
      info: "hsl(215, 100%, 50%)",
      success: "hsl(142.1, 76.2%, 36.3%)",
      warning: "hsl(47.9, 95.8%, 53.1%)",
      error: "hsl(346.8, 77.2%, 49.8%)",
    },
    radius: {
      boxes: "0.375rem",
      fields: "0.25rem",
      selectors: "0.125rem",
    },
    borderWidth: 1,
    fontFamily: "Inter, system-ui, sans-serif",
    type: "official",
    isDark: false,
  },
  {
    id: "zinc",
    name: "Zinc",
    description: "A minimal gray-scale theme",
    colors: {
      primary: "hsl(240, 5.9%, 10%)",
      secondary: "hsl(240, 5.2%, 33.9%)",
      accent: "hsl(0, 0%, 96.1%)",
      neutral: "hsl(0, 0%, 100%)",
      info: "hsl(215, 100%, 50%)",
      success: "hsl(142.1, 76.2%, 36.3%)",
      warning: "hsl(47.9, 95.8%, 53.1%)",
      error: "hsl(346.8, 77.2%, 49.8%)",
    },
    radius: {
      boxes: "0.25rem",
      fields: "0.25rem",
      selectors: "0.125rem",
    },
    borderWidth: 1,
    fontFamily: "'SF Pro Display', system-ui, sans-serif",
    type: "official",
    isDark: false,
  }
];

// Community themes - these could be loaded from an API or external source
export const communityThemes: Theme[] = [
  {
    id: "catppuccin",
    name: "Catppuccin",
    description: "Soothing pastel theme for shadcn/ui",
    colors: {
      primary: "hsl(250, 60%, 60%)",
      secondary: "hsl(320, 50%, 60%)",
      accent: "hsl(180, 40%, 50%)",
      neutral: "hsl(220, 30%, 96%)",
      info: "hsl(220, 83%, 65%)",
      success: "hsl(120, 60%, 50%)",
      warning: "hsl(35, 90%, 60%)",
      error: "hsl(0, 80%, 63%)",
    },
    radius: {
      boxes: "0.75rem",
      fields: "0.5rem",
      selectors: "0.5rem",
    },
    borderWidth: 1.5,
    fontFamily: "'Quicksand', system-ui, sans-serif",
    type: "community",
    isDark: false,
    author: "Community",
    source: "https://github.com/catppuccin/catppuccin",
  },
  {
    id: "nord",
    name: "Nord",
    description: "Arctic, north-bluish color palette",
    colors: {
      primary: "hsl(220, 17%, 32%)",
      secondary: "hsl(220, 16%, 36%)",
      accent: "hsl(179, 25%, 65%)",
      neutral: "hsl(218, 27%, 92%)",
      info: "hsl(210, 34%, 63%)",
      success: "hsl(92, 28%, 65%)",
      warning: "hsl(40, 71%, 73%)",
      error: "hsl(354, 42%, 56%)",
    },
    radius: {
      boxes: "0.375rem",
      fields: "0.25rem",
      selectors: "0.25rem",
    },
    borderWidth: 1,
    fontFamily: "'Fira Code', monospace",
    type: "community",
    isDark: false,
    author: "Arctic Ice Studio",
    source: "https://www.nordtheme.com/",
  },
  {
    id: "autumn",
    name: "Autumn",
    description: "Soft and warm autumn-inspired color palette",
    colors: {
      // Main colors
      primary: "hsl(182, 15.2%, 77%)",      // --color-primary: oklch(77% 0.152 181.912)
      secondary: "hsl(22, 19.1%, 70%)",     // --color-secondary: oklch(70% 0.191 22.216)
      accent: "hsl(294, 18.3%, 70%)",       // --color-accent: oklch(70% 0.183 293.541)
      neutral: "hsl(34, 0.7%, 26%)",        // --color-neutral: oklch(26% 0.007 34.298)
      
      // Background colors (mapped from base colors)
      background: "hsl(106, 0.1%, 98%)",    // --color-base-100: oklch(98% 0.001 106.423)
      "background-secondary": "hsl(106, 0.1%, 97%)", // --color-base-200: oklch(97% 0.001 106.424)
      "background-tertiary": "hsl(49, 0.3%, 92%)",  // --color-base-300: oklch(92% 0.003 48.717)
      foreground: "hsl(262, 2.8%, 13%)",    // --color-base-content: oklch(13% 0.028 261.692)
      
      // State colors
      info: "hsl(237, 16.9%, 68%)",         // --color-info: oklch(68% 0.169 237.323)
      success: "hsl(183, 14%, 70%)",        // --color-success: oklch(70% 0.14 182.503)
      warning: "hsl(86, 18.4%, 79%)",       // --color-warning: oklch(79% 0.184 86.047)
      error: "hsl(16, 24.6%, 64%)",         // --color-error: oklch(64% 0.246 16.439)
      
      // Content colors for each main color
      "primary-foreground": "hsl(193, 4.6%, 27%)",  // --color-primary-content: oklch(27% 0.046 192.524)
      "secondary-foreground": "hsl(26, 9.2%, 25%)", // --color-secondary-content: oklch(25% 0.092 26.042)
      "accent-foreground": "hsl(291, 14.1%, 28%)",  // --color-accent-content: oklch(28% 0.141 291.089)
      "neutral-foreground": "hsl(106, 0.1%, 98%)",  // --color-neutral-content: oklch(98% 0.001 106.423)
      "info-foreground": "hsl(237, 1.3%, 97%)",     // --color-info-content: oklch(97% 0.013 236.62)
      "success-foreground": "hsl(181, 1.4%, 98%)",  // --color-success-content: oklch(98% 0.014 180.72)
      "warning-foreground": "hsl(102, 2.6%, 98%)",  // --color-warning-content: oklch(98% 0.026 102.212)
      "error-foreground": "hsl(12, 1.5%, 96%)",     // --color-error-content: oklch(96% 0.015 12.422)
      
      // Card & muted colors
      card: "hsl(106, 0.1%, 98%)",
      "card-foreground": "hsl(262, 2.8%, 13%)",
      muted: "hsl(49, 0.3%, 92%)",
      "muted-foreground": "hsl(262, 1.4%, 40%)",
      
      // Border color
      border: "hsl(49, 0.3%, 85%)",         // Default border color
      "card-border": "hsl(49, 0.3%, 85%)",  // Border color specifically for cards
      
      // Ring & input colors
      ring: "hsl(22, 19.1%, 70%)",          // Use secondary as ring color
      input: "hsl(49, 0.3%, 85%)",
      
      // Shadow colors - essential for depth effect
      "shadow": "hsla(262, 10%, 10%, 0.1)",
      "shadow-foreground": "hsla(262, 30%, 10%, 0.2)",
    },
    radius: {
      boxes: "0.5rem",                     // --radius-box: 0.5rem
      fields: "0.5rem",                    // --radius-field: 0.5rem
      selectors: "1rem",                   // --radius-selector: 1rem
    },
    borderWidth: 1.5,                      // --border: 1.5px
    fontFamily: "Geist Sans, system-ui, sans-serif",
    type: "community",
    isDark: false,
    author: "DaisyUI / Adapted",
    source: "https://daisyui.com/",
    effects: {
      depth: true,                         // --depth: 1
      noise: false,                        // --noise: 0
    },
    // Added additional theme properties
    baseFontSize: 16,
    fontScale: 1.25,
    lineHeight: 1.5,
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    // Add shadow definitions
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", 
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none"
    },
  },
];

// Custom themes - these could be stored in localStorage or a database
export let customThemes: Theme[] = [];

// Get all available themes
export const getAllThemes = (): Theme[] => {
  return [...officialThemes, ...communityThemes, ...customThemes];
};

// Add a custom theme
export const addCustomTheme = (theme: Theme): void => {
  // Ensure it has a unique ID
  const existingIds = getAllThemes().map(t => t.id);
  if (existingIds.includes(theme.id)) {
    throw new Error(`A theme with ID "${theme.id}" already exists`);
  }
  
  customThemes.push({
    ...theme,
    type: "custom"
  });
  
  // Save to localStorage
  localStorage.setItem('custom-themes', JSON.stringify(customThemes));
};

// Load custom themes from localStorage
export const loadCustomThemes = (): void => {
  const saved = localStorage.getItem('custom-themes');
  if (saved) {
    try {
      customThemes = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load custom themes:', e);
    }
  }
};

// Remove a custom theme
export const removeCustomTheme = (themeId: string): void => {
  customThemes = customThemes.filter(theme => theme.id !== themeId);
  localStorage.setItem('custom-themes', JSON.stringify(customThemes));
};

// Get a theme by ID
export const getThemeById = (id: string): Theme | undefined => {
  return getAllThemes().find(theme => theme.id === id);
}; 