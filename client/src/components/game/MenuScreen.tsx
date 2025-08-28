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

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-all duration-1000"
      style={{ background: theme.background }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center p-3 sm:p-4 pt-4 sm:pt-8">
        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl">
          {/* Hero section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 animate-slide-up">
            {/* Clean Modern Logo */}
            <div className="relative mb-6 sm:mb-8 lg:mb-12">
              {/* Minimalist logo container */}
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Simple geometric logo */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                    <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">🎯</div>
                  </div>
                  {/* Subtle accent dots */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
                </div>
                
                {/* Clean typography */}
                <div className="text-center space-y-1 sm:space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold text-white">
                    <span className="font-light">Word</span>
                    <span className="font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Spin</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-medium text-white/90">PRO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-4 border border-white/20 mb-4 sm:mb-6 lg:mb-8" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-2xl lg:text-3xl animate-bounce-soft">🇹🇷</span>
                <span className="text-center">Modern Türkçe Kelime Oyunu</span>
                <span className="text-lg sm:text-2xl lg:text-3xl animate-bounce-soft">🎯</span>
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm lg:text-base text-white/60">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse" />
                <span>30 Saniye</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 animate-pulse" />
                <span>10 Kategori</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 animate-pulse" />
                <span>5 Zorluk</span>
              </div>
            </div>
          </div>

          {/* Category selection with individual difficulty */}
          <div 
            className="backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-8 border border-white/20 shadow-2xl animate-slide-up mb-4 sm:mb-6 lg:mb-8"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              animationDelay: '0.2s'
            }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 flex items-center gap-2 sm:gap-3">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{ background: theme.primary }}
              />
              Kategori ve Zorluk Seçin
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {Object.keys(wordLists).map((cat, index) => {
                const catTheme = getThemeForCategory(cat);
                const currentDifficulty = categoryDifficulties[cat] || 3;
                return (
                  <div
                    key={cat}
                    className={`group relative p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 border ${
                      category === cat 
                        ? 'bg-white/20 border-white/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {category === cat && (
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
                    )}
                    <div className="relative space-y-2 sm:space-y-3">
                      {/* Category name */}
                      <button
                        onClick={() => setCategory(cat)}
                        className="w-full text-center"
                        data-testid="select-category"
                      >
                        <div className="text-white font-medium text-sm sm:text-base lg:text-lg">
                          {cat}
                        </div>
                      </button>
                      
                      {/* Difficulty selector for this category */}
                      <div className="space-y-1 sm:space-y-2">
                        <div className="text-center">
                          <div className="text-xs text-white/60 mb-1">Zorluk</div>
                          <div className="text-xs sm:text-sm font-medium text-white">
                            {difficultyLabels[currentDifficulty as keyof typeof difficultyLabels]}
                          </div>
                        </div>
                        <div className="flex justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() => handleCategoryDifficultyChange(cat, level)}
                              className={`w-5 h-5 sm:w-6 sm:h-6 text-xs rounded-full transition-all duration-300 ${
                                currentDifficulty === level
                                  ? 'bg-white text-black scale-110'
                                  : 'bg-white/20 text-white/60 hover:bg-white/30'
                              }`}
                              data-testid="slider-difficulty"
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Start button */}
          <div className="text-center animate-slide-up pb-4 sm:pb-6" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleStartGame}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg hover:shadow-xl w-full max-w-xs sm:max-w-sm"
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
