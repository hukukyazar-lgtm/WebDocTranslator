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
            {/* Modern Logo Design */}
            <div className="relative mb-8">
              {/* Logo background glow */}
              <div 
                className="absolute inset-0 blur-3xl opacity-50 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${theme.primary}40, ${theme.secondary}40, transparent)`
                }}
              />
              
              {/* Main logo container */}
              <div className="relative flex flex-col items-center">
                {/* Logo icon */}
                <div className="mb-4 relative">
                  <div 
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/30 animate-pulse-glow"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
                      boxShadow: `0 0 40px ${theme.primary}40`
                    }}
                  >
                    <div className="text-5xl lg:text-6xl font-black relative">
                      <span 
                        className="absolute inset-0 animate-spin-slow"
                        style={{ 
                          background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          filter: 'blur(1px)'
                        }}
                      >
                        🌟
                      </span>
                      <span className="relative text-white">🌟</span>
                    </div>
                  </div>
                  {/* Orbiting particles */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full animate-pulse"
                      style={{
                        background: i % 2 === 0 ? theme.primary : theme.secondary,
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 60}deg) translateY(-50px) translateX(-50%)`,
                        animationDelay: `${i * 0.2}s`,
                        boxShadow: `0 0 10px currentColor`
                      }}
                    />
                  ))}
                </div>
                
                {/* Logo text */}
                <div className="text-center">
                  <h1 className="text-6xl lg:text-8xl font-black mb-2 relative">
                    <span 
                      className="bg-clip-text text-transparent animate-pulse-glow"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${theme.primary}, #ffffff, ${theme.secondary}, ${theme.primary})`,
                        backgroundSize: '300% auto',
                        animation: 'gradient 4s ease infinite',
                        textShadow: '0 0 30px rgba(255,255,255,0.5)'
                      }}
                    >
                      WORD
                    </span>
                    <span 
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${theme.secondary}, #ffffff, ${theme.primary}, ${theme.secondary})`,
                        backgroundSize: '300% auto',
                        animation: 'gradient 4s ease infinite 0.5s'
                      }}
                    >
                      SPIN
                    </span>
                  </h1>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div 
                      className="h-0.5 w-12 rounded-full"
                      style={{ background: theme.primary }}
                    />
                    <span 
                      className="text-2xl lg:text-3xl font-bold px-4 py-1 rounded-full backdrop-blur-lg border border-white/20"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: theme.secondary
                      }}
                    >
                      ⚡ PRO ⚡
                    </span>
                    <div 
                      className="h-0.5 w-12 rounded-full"
                      style={{ background: theme.secondary }}
                    />
                  </div>
                  <div className="text-lg lg:text-xl font-semibold text-white/60">
                    2026 EDITION
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
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(wordLists).map((cat, index) => {
                  const catTheme = getThemeForCategory(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 ${
                        category === cat 
                          ? 'border-white bg-white/20 shadow-2xl' 
                          : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                      }`}
                      data-testid="select-category"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-white font-bold text-lg group-hover:scale-110 transition-transform">
                        {cat}
                      </div>
                      <div 
                        className="w-full h-1 rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ background: catTheme.primary }}
                      />
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
                <div className="text-center mb-6">
                  <div 
                    className="text-4xl font-black mb-2 animate-bounce-soft"
                    style={{ color: theme.primary }}
                  >
                    {difficulty}
                  </div>
                  <div className="text-xl text-white/80 font-semibold">
                    {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                  </div>
                </div>
                <div className="relative">
                  <input 
                    id="difficulty" 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={difficulty} 
                    onChange={e => setDifficulty(parseInt(e.target.value, 10))}
                    className="w-full h-3 appearance-none cursor-pointer rounded-lg"
                    style={{
                      background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
                    }}
                    data-testid="slider-difficulty"
                  />
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    {Object.values(difficultyLabels).map((label, i) => (
                      <span key={i} className={difficulty === i + 1 ? 'text-white font-bold' : ''}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Start button */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleStartGame}
              className="group relative px-12 py-6 text-2xl font-black text-white rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl"
              style={{
                background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                boxShadow: `0 20px 40px ${theme.primary}40`
              }}
              data-testid="button-start-game"
            >
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">
                🚀 OYUNA BAŞLA
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

MenuScreen.displayName = 'MenuScreen';
