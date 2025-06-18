import React, { useState } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);
  
  const themeOptions: { key: Theme; color: string }[] = [
    { key: 'light', color: '#4f8cff' },
    { key: 'dark', color: '#1e293b' },
    { key: 'blue', color: '#0ea5e9' },
    { key: 'green', color: '#059669' },
    { key: 'purple', color: '#7c3aed' }
  ];

  const currentThemeOption = themeOptions.find(theme => theme.key === currentTheme);

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">{t('nav.theme')}</span>
        <div 
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: currentThemeOption?.color }}
        />
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-40">
          {themeOptions.map((theme) => (
            <button
              key={theme.key}
              onClick={() => {
                onThemeChange(theme.key);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
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
      )}
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector;