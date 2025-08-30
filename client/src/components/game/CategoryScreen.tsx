import { memo, useState } from 'react';
import { wordLists } from '@/lib/wordLists';
import { getThemeForCategory } from '@/lib/gameUtils';
import type { Language } from './LanguageScreen';

export interface CategoryScreenProps {
  selectedLanguage: Language;
  onCategorySelect: (category: string) => void;
  onBack: () => void;
  isGuestMode?: boolean;
}

const languageNames = {
  'tr': 'Türkçe',
  'en': 'English', 
  'es': 'Español',
  'it': 'Italiano',
  'fr': 'Français',
  'de': 'Deutsch'
};

const languageFlags = {
  'tr': '🇹🇷',
  'en': '🇺🇸',
  'es': '🇪🇸',
  'it': '🇮🇹',
  'fr': '🇫🇷',
  'de': '🇩🇪'
};

export const CategoryScreen = memo<CategoryScreenProps>(({ selectedLanguage, onCategorySelect, onBack, isGuestMode = false }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const theme = getThemeForCategory(hoveredCategory || 'Hayvanlar');

  const categoryIcons: Record<string, string> = {
    'Hayvanlar': '🦁',
    'Yiyecek': '🍎',
    'Bilim': '🧪',
    'Ülkeler': '🌍',
    'Meslekler': '👨‍💼',
    'Şehirler': '🏙️',
    'Markalar': '🏷️',
    'Spor Dalları': '⚽',
    'Eşyalar': '🏠'
  };

  const backgroundStyle = {
    background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}40, ${theme.primary}60)`,
    minHeight: '100vh'
  };

  return (
    <div style={backgroundStyle}>
      <div className="relative z-10 min-h-screen flex items-start justify-center p-3 sm:p-4 pt-4 sm:pt-8">
        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              data-testid="button-back"
            >
              <span>←</span>
              <span>Geri</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                🎯 <span className="font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">WordSpin</span>
              </h1>
              {isGuestMode && (
                <p className="text-sm text-white/60 mt-1">
                  👤 Misafir Modu - İlerleme kaydedilmiyor
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl">{languageFlags[selectedLanguage]}</span>
              <span className="text-white font-medium text-sm">{languageNames[selectedLanguage]}</span>
            </div>
          </div>

          {/* Kategori seçimi */}
          <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Kategori Seçin
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {Object.keys(wordLists).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategorySelect(cat)}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl"
                  style={{
                    background: hoveredCategory === cat 
                      ? `linear-gradient(135deg, ${getThemeForCategory(cat).primary}60, ${getThemeForCategory(cat).secondary}60)`
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                    boxShadow: hoveredCategory === cat 
                      ? `0 20px 40px ${getThemeForCategory(cat).primary}30`
                      : '0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                  data-testid={`button-category-${cat}`}
                >
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 transition-transform duration-300 group-hover:scale-110">
                      {categoryIcons[cat]}
                    </div>
                    <div className="font-bold text-white text-sm sm:text-base lg:text-lg">
                      {cat}
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 mt-1">
                      {Object.keys(wordLists[cat]).length} zorluk
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CategoryScreen.displayName = 'CategoryScreen';