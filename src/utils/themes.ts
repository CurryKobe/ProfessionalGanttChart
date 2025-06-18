import { Theme } from '../types';

export const themes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#4f8cff',
      primaryLight: '#e6efff',
      secondary: '#1e293b',
      accent: '#10b981',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
      textLight: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#60a5fa',
      primaryLight: '#1e3a8a',
      secondary: '#f1f5f9',
      accent: '#34d399',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      textLight: '#94a3b8',
      border: '#334155',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171'
    }
  },
  blue: {
    name: 'Ocean Blue',
    colors: {
      primary: '#0ea5e9',
      primaryLight: '#e0f2fe',
      secondary: '#0f172a',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      textLight: '#0369a1',
      border: '#bae6fd',
      success: '#06b6d4',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  green: {
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      primaryLight: '#d1fae5',
      secondary: '#064e3b',
      accent: '#10b981',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#064e3b',
      textLight: '#047857',
      border: '#bbf7d0',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  purple: {
    name: 'Royal Purple',
    colors: {
      primary: '#7c3aed',
      primaryLight: '#ede9fe',
      secondary: '#581c87',
      accent: '#a855f7',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87',
      textLight: '#7c2d12',
      border: '#ddd6fe',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  }
};

export const applyTheme = (theme: Theme) => {
  const themeColors = themes[theme].colors;
  const root = document.documentElement;
  
  Object.entries(themeColors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', themeColors.primary);
  }
};