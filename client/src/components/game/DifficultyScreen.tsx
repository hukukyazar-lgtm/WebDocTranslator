import { memo, useState } from 'react';
import { wordLists } from '@/lib/wordLists';
import { getThemeForCategory } from '@/lib/gameUtils';
import type { Language } from './LanguageScreen';

export interface DifficultyScreenProps {
  selectedLanguage: Language;
  selectedCategory: string;
  onDifficultySelect: (difficulty: number) => void;
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

export const DifficultyScreen = memo<DifficultyScreenProps>(({ selectedLanguage, selectedCategory, onDifficultySelect, onBack, isGuestMode = false }) => {
  const [hoveredDifficulty, setHoveredDifficulty] = useState<number | null>(null);
  
  const theme = getThemeForCategory(selectedCategory);

  const difficultyLabels: Record<number, string> = {
    1: "Başlangıç",
    2: "Kolay", 
    3: "Orta",
    4: "Zor",
    5: "Uzman"
  };

  const difficultyColors: Record<number, string> = {
    1: "#22c55e", // green
    2: "#3b82f6", // blue  
    3: "#f59e0b", // amber
    4: "#ef4444", // red
    5: "#8b5cf6"  // purple
  };

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

  const availableDifficulties = Object.keys(wordLists[selectedCategory] || {})
    .map(Number)
    .filter(n => !isNaN(n) && n >= 1 && n <= 5)
    .sort();

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

          {/* Seçilen kategori göstergesi */}
          <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-3xl">{categoryIcons[selectedCategory]}</span>
              <span className="text-xl font-bold text-white">{selectedCategory}</span>
            </div>
          </div>

          {/* Zorluk seçimi */}
          <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Zorluk Seviyesi Seçin
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {availableDifficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => onDifficultySelect(diff)}
                  onMouseEnter={() => setHoveredDifficulty(diff)}
                  onMouseLeave={() => setHoveredDifficulty(null)}
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl"
                  style={{
                    background: hoveredDifficulty === diff 
                      ? `linear-gradient(135deg, ${difficultyColors[diff]}60, ${difficultyColors[diff]}40)`
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                    boxShadow: hoveredDifficulty === diff 
                      ? `0 20px 40px ${difficultyColors[diff]}30`
                      : '0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                  data-testid={`button-difficulty-${diff}`}
                >
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                      {diff === 1 ? '🌱' : diff === 2 ? '⭐' : diff === 3 ? '🔥' : diff === 4 ? '💎' : '👑'}
                    </div>
                    <div className="font-bold text-white text-lg sm:text-xl mb-2">
                      {difficultyLabels[diff]}
                    </div>
                    <div className="text-sm text-white/60">
                      {(wordLists[selectedCategory] as any)?.[diff]?.length || 0} kelime
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

DifficultyScreen.displayName = 'DifficultyScreen';