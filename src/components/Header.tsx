import React from 'react';
import { BarChart3 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import { Language, Theme } from '../types';

interface HeaderProps {
  language: Language;
  theme: Theme;
  onLanguageChange: (language: Language) => void;
  onThemeChange: (theme: Theme) => void;
  t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  t
}) => {
  return (
    <header className="text-center py-8 mb-6 relative">
      {/* Navigation Controls */}
      <div className="absolute top-0 right-0 flex items-center gap-3">
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
          t={t}
        />
        <ThemeSelector
          currentTheme={theme}
          onThemeChange={onThemeChange}
          t={t}
        />
      </div>

      {/* Main Header Content */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          {t('header.title')}
        </h1>
      </div>
      <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
        {t('header.subtitle')}
      </p>
    </header>
  );
};

export default Header;