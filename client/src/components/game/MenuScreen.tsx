import { memo, useState, useEffect } from 'react';
import { wordLists } from '@/lib/wordLists';
import { getThemeForCategory } from '@/lib/gameUtils';

export interface GameSettings {
  category: string;
  difficulty: number;
}

interface MenuScreenProps {
  onStartGame: (settings: GameSettings) => void;
}

export const MenuScreen = memo(({ onStartGame }: MenuScreenProps) => {
  const [category, setCategory] = useState("Hayvanlar");
  const [difficulty, setDifficulty] = useState(3);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categoryDifficulties, setCategoryDifficulties] = useState<Record<string, number>>({});
  
  const theme = getThemeForCategory(hoveredCategory || category);

  const handleStartGame = () => {
    const selectedDifficulty = categoryDifficulties[category] || difficulty;
    onStartGame({ category, difficulty: selectedDifficulty });
  };

  const handleCategoryDifficultyChange = (cat: string, diff: number) => {
    setCategoryDifficulties(prev => ({
      ...prev,
      [cat]: diff
    }));
  };

  const difficultyLabels = {
    1: "Başlangıç",
    2: "Kolay", 
    3: "Orta",
    4: "Zor",
    5: "Uzman"
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
    'Eşyalar': '🪑',
    'Filmler': '🎬'
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-all duration-1000"
    >
      {/* Statik arka plan - animasyon yok */}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center p-3 sm:p-4 pt-4 sm:pt-8">
        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl">
          {/* Hero section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 animate-slide-up">
            {/* Logo */}
            <div className="relative mb-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative animate-float">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl glass-card glow-effect flex items-center justify-center">
                    <div className="text-4xl sm:text-5xl">🎯</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
                </div>
                
                <div className="text-center">
                  <h1 className="text-4xl sm:text-6xl font-bold hero-text">
                    <span className="font-light">Word</span>
                    <span className="font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Spin</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white/90">PRO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category selection with individual difficulty */}
          <div 
            className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-8 animate-slide-up mb-4 sm:mb-6 lg:mb-8"
            style={{ 
              animationDelay: '0.2s'
            }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-6 text-center">
              Kategori Seç
            </h3>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {Object.keys(wordLists).map((cat, index) => {
                const icon = categoryIcons[cat] || '📝';
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-300 ${
                      category === cat 
                        ? 'glass-card scale-110 glow-effect' 
                        : 'hover:bg-white/10 hover:scale-105'
                    }`}
                    data-testid="select-category"
                  >
                    <div className="text-4xl sm:text-5xl">
                      {icon}
                    </div>
                    <div className="text-xs font-medium text-white text-center">
                      {cat}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Difficulty selector for selected category */}
            {category && (
              <div className="text-center space-y-4 mb-6">
                <h4 className="text-lg font-bold text-white">
                  {category} - Zorluk Seviyesi
                </h4>
                <div className="flex justify-center items-center space-y-2">
                  <div className="text-xl font-bold text-white mb-2">
                    {difficultyLabels[(categoryDifficulties[category] || 3) as keyof typeof difficultyLabels]}
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleCategoryDifficultyChange(category, level)}
                      className={`w-10 h-10 text-sm font-bold rounded-full transition-all duration-300 ${
                        (categoryDifficulties[category] || 3) === level
                          ? 'premium-button text-white scale-110'
                          : 'bg-white/20 text-white/60 hover:bg-white/30'
                      }`}
                      data-testid="slider-difficulty"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Start button */}
          <div className="text-center animate-slide-up pb-4 sm:pb-6" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleStartGame}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl sm:rounded-2xl premium-button active:scale-95 w-full max-w-xs sm:max-w-sm"
              data-testid="button-start-game"
            >
              <span className="flex items-center justify-center gap-2">
                <span>▶</span>
                OYUNA BAŞLA
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

MenuScreen.displayName = 'MenuScreen';
