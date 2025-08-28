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
  
  const theme = getThemeForCategory(hoveredCategory || category);

  const handleStartGame = () => {
    onStartGame({ category, difficulty });
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Hero section */}
          <div className="text-center mb-12 animate-slide-up">
            {/* Clean Modern Logo */}
            <div className="relative mb-12">
              {/* Minimalist logo container */}
              <div className="flex flex-col items-center space-y-6">
                {/* Simple geometric logo */}
                <div className="relative">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                    <div className="text-4xl lg:text-5xl">🎯</div>
                  </div>
                  {/* Subtle accent dots */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
                </div>
                
                {/* Clean typography */}
                <div className="text-center space-y-2">
                  <h1 className="text-5xl lg:text-7xl font-bold text-white">
                    <span className="font-light">Word</span>
                    <span className="font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Spin</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white/90">PRO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20 mb-8" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center justify-center gap-3">
                <span className="text-3xl animate-bounce-soft">🇹🇷</span>
                <span>Modern Türkçe Kelime Oyunu</span>
                <span className="text-3xl animate-bounce-soft">🎯</span>
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 text-lg text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span>30 Saniye</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                <span>10 Kategori</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                <span>5 Zorluk</span>
              </div>
            </div>
          </div>

          {/* Game settings */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Category selection */}
            <div 
              className="backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-slide-up"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                animationDelay: '0.2s'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ background: theme.primary }}
                />
                Kategori Seçin
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(wordLists).map((cat, index) => {
                  const catTheme = getThemeForCategory(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`group relative p-3 rounded-xl transition-all duration-300 ${
                        category === cat 
                          ? 'bg-white/20 border border-white/40' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      data-testid="select-category"
                    >
                      {category === cat && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
                      )}
                      <div className="relative">
                        <div className="text-white font-medium text-sm text-center">
                          {cat}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty selection */}
            <div 
              className="backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-slide-up"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                animationDelay: '0.4s'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ background: theme.secondary }}
                />
                Zorluk Seviyesi
              </h3>
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                  </div>
                  <div className="text-sm text-white/60">Seviye {difficulty}</div>
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`w-8 h-8 rounded-full transition-all duration-300 ${
                        difficulty === level
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

          {/* Start button */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleStartGame}
              className="group relative px-8 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg hover:shadow-xl"
              data-testid="button-start-game"
            >
              <span className="flex items-center gap-2">
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
