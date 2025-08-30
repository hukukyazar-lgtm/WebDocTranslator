import { memo, useState, useEffect } from 'react';
import { wordLists } from '@/lib/wordLists';
import { getThemeForCategory } from '@/lib/gameUtils';

import type { Language } from './LanguageScreen';

export interface GameSettings {
  category: string;
  difficulty: number;
  language: Language;
}

interface MenuScreenProps {
  selectedLanguage: Language;
  onStartGame: (settings: GameSettings) => void;
  onBack: () => void;
  isGuestMode?: boolean;
}

export const MenuScreen = memo(({ selectedLanguage, onStartGame, onBack, isGuestMode = false }: MenuScreenProps) => {
  const [category, setCategory] = useState("Hayvanlar");
  const [difficulty, setDifficulty] = useState(3);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categoryDifficulties, setCategoryDifficulties] = useState<Record<string, number>>({});
  
  const theme = getThemeForCategory(hoveredCategory || category);

  const handleStartGame = () => {
    const selectedDifficulty = categoryDifficulties[category] || difficulty;
    onStartGame({ category, difficulty: selectedDifficulty, language: selectedLanguage });
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
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <span>←</span>
              <span>Geri</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                👁️ <span className="font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">Perception</span>
              </h1>
              {isGuestMode && (
                <p className="text-sm text-white/60 mt-1">
                  👤 Misafir Modu - İlerleme kaydedilmiyor
                </p>
              )}
            </div>
            
            {/* Logout button for authenticated users */}
            {!isGuestMode && (
              <div className="text-right">
                <a
                  href="/api/logout"
                  className="text-xs text-white/60 hover:text-white underline transition-colors"
                >
                  Çıkış Yap
                </a>
              </div>
            )}
            
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>

          {/* Modern Category Grid */}
          <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              👁️ Kategori Seç
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {Object.keys(wordLists).map((cat, index) => {
                const icon = categoryIcons[cat] || '📝';
                const colors = [
                  'from-red-400 to-pink-500',
                  'from-blue-400 to-cyan-500', 
                  'from-green-400 to-emerald-500',
                  'from-yellow-400 to-orange-500',
                  'from-purple-400 to-indigo-500',
                  'from-pink-400 to-rose-500',
                  'from-teal-400 to-cyan-500',
                  'from-orange-400 to-red-500',
                  'from-indigo-400 to-purple-500',
                  'from-cyan-400 to-blue-500'
                ];
                const colorClass = colors[index % colors.length];
                
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`relative group overflow-hidden rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 ${
                      category === cat 
                        ? 'scale-110 ring-4 ring-white/50' 
                        : ''
                    }`}
                    style={{
                      background: category === cat 
                        ? `linear-gradient(135deg, rgba(0, 220, 205, 0.9), rgba(233, 30, 99, 0.9))` 
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    data-testid="select-category"
                  >
                    <div className="text-center space-y-2">
                      <div className="text-3xl sm:text-4xl mb-2">
                        {icon}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {cat}
                      </div>
                      <div className="text-xs text-white/70">
                        {Object.keys(wordLists[cat]).length} seviye
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Modern Difficulty Selector */}
            {category && (
              <div className="backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl" style={{
                background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.1), rgba(233, 30, 99, 0.1))'
              }}>
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {categoryIcons[category]} {category}
                  </h4>
                  <p className="text-white/70 text-sm">Zorluk seviyesi seç</p>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-4">
                      {difficultyLabels[(categoryDifficulties[category] || 3) as keyof typeof difficultyLabels]}
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    {[
                      { level: 1, label: 'Başlangıç', color: 'from-green-400 to-emerald-500' },
                      { level: 2, label: 'Kolay', color: 'from-blue-400 to-cyan-500' },
                      { level: 3, label: 'Orta', color: 'from-yellow-400 to-orange-500' },
                      { level: 4, label: 'Zor', color: 'from-orange-400 to-red-500' },
                      { level: 5, label: 'Uzman', color: 'from-red-500 to-pink-600' }
                    ].map(({level, label, color}) => (
                      <button
                        key={level}
                        onClick={() => handleCategoryDifficultyChange(category, level)}
                        className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 min-w-[70px] ${
                          (categoryDifficulties[category] || 3) === level
                            ? 'scale-110 ring-4 ring-white/50'
                            : ''
                        }`}
                        style={{
                          background: (categoryDifficulties[category] || 3) === level
                            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))'
                            : 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        data-testid="slider-difficulty"
                      >
                        <div className={`text-xl font-bold mb-1 ${
                          (categoryDifficulties[category] || 3) === level ? 'text-gray-800' : 'text-white'
                        }`}>
                          {level}
                        </div>
                        <div className={`text-xs font-medium ${
                          (categoryDifficulties[category] || 3) === level ? 'text-gray-600' : 'text-white/70'
                        }`}>
                          {label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modern Start Button */}
          <div className="text-center animate-slide-up pb-4 sm:pb-6 mt-8" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleStartGame}
              disabled={!category}
              className="group relative px-8 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl w-full max-w-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: category 
                  ? 'linear-gradient(135deg, rgba(0, 220, 205, 0.9), rgba(233, 30, 99, 0.9))'
                  : 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: category ? '0 10px 30px rgba(0, 220, 205, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
              data-testid="button-start-game"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">👁️</span>
                <span>OYUNA BAŞLA</span>
                <span className="text-xl">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

MenuScreen.displayName = 'MenuScreen';
