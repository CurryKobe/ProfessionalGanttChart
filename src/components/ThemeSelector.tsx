import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types';
import { themes } from '../utils/themes';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  t: (key: string) => string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  t
}) => {
  const themeOptions: { key: Theme; color: string }[] = [
    { key: 'light', color: '#4f8cff' },
    { key: 'dark', color: '#1e293b' },
    { key: 'blue', color: '#0ea5e9' },
    { key: 'green', color: '#059669' },
    { key: 'purple', color: '#7c3aed' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium">{t('nav.theme')}</span>
        <div 
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: themeOptions.find(theme => theme.key === currentTheme)?.color }}
        />
      </button>
      
      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-40">
        {themeOptions.map((theme) => (
          <button
            key={theme.key}
            onClick={() => onThemeChange(theme.key)}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              currentTheme === theme.key ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <div 
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: theme.color }}
            />
            <span>{t(`nav.themes.${theme.key}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;