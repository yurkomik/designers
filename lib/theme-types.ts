export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  [key: string]: string; // Allow for additional color slots
}

export interface ThemeRadius {
  boxes: string;
  fields: string;
  selectors: string;
  [key: string]: string; // Allow for additional radius categories
}

export interface ThemeFontWeights {
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  [key: string]: number; // Allow for additional font weight definitions
}

export interface ThemeShadows {
  sm?: string;
  DEFAULT?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  inner?: string;
  none?: string;
  [key: string]: string | undefined;
}

export type ThemeType = 'official' | 'community' | 'custom';

export type PanelBackgroundType = 'solid' | 'translucent';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  radius: ThemeRadius;
  borderWidth: number;
  fontFamily: string;
  type: ThemeType;
  isDark: boolean;
  author?: string;
  source?: string;
  baseFontSize?: number;
  fontScale?: number;
  lineHeight?: number;
  fontWeights?: ThemeFontWeights;
  effects?: {
    depth: boolean;
    noise: boolean;
  };
  shadows?: ThemeShadows;
  customCss?: string; // For advanced theme customizations
  scaling?: string; // UI scaling percentage
  panelBackground?: PanelBackgroundType; // Panel background type
}

export interface ThemeContextType {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  colors: ThemeColors;
  setColors: (colors: ThemeColors) => void;
  radius: ThemeRadius;
  setRadius: (radius: ThemeRadius) => void;
  borderWidth: number;
  setBorderWidth: (width: number) => void;
  defaultTheme: boolean;
  setDefaultTheme: (value: boolean) => void;
  defaultDarkTheme: boolean;
  setDefaultDarkTheme: (value: boolean) => void;
  darkColorScheme: boolean;
  setDarkColorScheme: (value: boolean) => void;
  scaling: string;
  setScaling: (value: string) => void;
  panelBackground: PanelBackgroundType;
  setPanelBackground: (value: PanelBackgroundType) => void;
  saveTheme: () => void;
  exportTheme: () => string;
  importTheme: (themeJson: string) => void;
  resetToDefaults: () => void;
} 