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
    <header className="text-center py-6 sm:py-8 mb-4 sm:mb-6 relative">
      {/* 桌面端右上角，移动端隐藏 */}
      <div className="hidden sm:flex absolute top-0 right-0 items-center gap-3">
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
      {/* 移动端下方居中显示 */}
      <div className="flex sm:hidden justify-center gap-4 mb-4">
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
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h1 className="mobile-heading font-bold text-gray-800">
          {t('header.title')}
        </h1>
      </div>
      <p className="text-gray-600 max-w-lg mx-auto leading-relaxed mobile-text px-4">
        {t('header.subtitle')}
      </p>
    </header>
  );
};

export default Header;