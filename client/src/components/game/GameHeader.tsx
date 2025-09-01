import { memo } from 'react';
import type { Language } from './LanguageScreen';

// Header translations
const headerTranslations = {
  tr: {
    level: 'Seviye'
  },
  en: {
    level: 'Level'
  },
  es: {
    level: 'Nivel'
  },
  it: {
    level: 'Livello'
  },
  fr: {
    level: 'Niveau'
  },
  de: {
    level: 'Stufe'
  }
};

// Category translations
const categoryTranslations = {
  tr: {
    'Hayvanlar': 'Hayvanlar',
    'Yiyecek': 'Yiyecek',
    'Bilim': 'Bilim',
    'Ülkeler': 'Ülkeler',
    'Meslekler': 'Meslekler',
    'Şehirler': 'Şehirler',
    'Markalar': 'Markalar',
    'Spor Dalları': 'Spor Dalları',
    'Eşyalar': 'Eşyalar',
    'Filmler': 'Filmler',
    'Karışık': 'Karışık'
  },
  en: {
    'Hayvanlar': 'Animals',
    'Yiyecek': 'Food',
    'Bilim': 'Science',
    'Ülkeler': 'Countries',
    'Meslekler': 'Professions',
    'Şehirler': 'Cities',
    'Markalar': 'Brands',
    'Spor Dalları': 'Sports',
    'Eşyalar': 'Objects',
    'Filmler': 'Movies',
    'Karışık': 'Mixed'
  },
  es: {
    'Hayvanlar': 'Animales',
    'Yiyecek': 'Comida',
    'Bilim': 'Ciencia',
    'Ülkeler': 'Países',
    'Meslekler': 'Profesiones',
    'Şehirler': 'Ciudades',
    'Markalar': 'Marcas',
    'Spor Dalları': 'Deportes',
    'Eşyalar': 'Objetos',
    'Filmler': 'Películas',
    'Karışık': 'Mixto'
  },
  it: {
    'Hayvanlar': 'Animali',
    'Yiyecek': 'Cibo',
    'Bilim': 'Scienza',
    'Ülkeler': 'Paesi',
    'Meslekler': 'Professioni',
    'Şehirler': 'Città',
    'Markalar': 'Marchi',
    'Spor Dalları': 'Sport',
    'Eşyalar': 'Oggetti',
    'Filmler': 'Film',
    'Karışık': 'Misto'
  },
  fr: {
    'Hayvanlar': 'Animaux',
    'Yiyecek': 'Nourriture',
    'Bilim': 'Science',
    'Ülkeler': 'Pays',
    'Meslekler': 'Professions',
    'Şehirler': 'Villes',
    'Markalar': 'Marques',
    'Spor Dalları': 'Sports',
    'Eşyalar': 'Objets',
    'Filmler': 'Films',
    'Karışık': 'Mélangé'
  },
  de: {
    'Hayvanlar': 'Tiere',
    'Yiyecek': 'Essen',
    'Bilim': 'Wissenschaft',
    'Ülkeler': 'Länder',
    'Meslekler': 'Berufe',
    'Şehirler': 'Städte',
    'Markalar': 'Marken',
    'Spor Dalları': 'Sport',
    'Eşyalar': 'Objekte',
    'Filmler': 'Filme',
    'Karışık': 'Gemischt'
  }
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
  'Filmler': '🎬',
  'Karışık': '🎆'
};

interface GameHeaderProps {
  category: string;
  difficulty: number;
  language?: Language;
  isGuestMode?: boolean;
  gameStats?: any;
  showDailyGoals?: boolean;
  onToggleDailyGoals?: () => void;
}

export const GameHeader = memo(({ category, difficulty, language = 'tr', isGuestMode = true, gameStats, showDailyGoals = false, onToggleDailyGoals }: GameHeaderProps) => {
  const categoryIcon = categoryIcons[category] || '📂';
  const t = headerTranslations[language];
  const categoryT = categoryTranslations[language];
  
  const getCategoryName = (turkishName: string): string => {
    return (categoryT as Record<string, string>)[turkishName] || turkishName;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-2 backdrop-blur-xl border-b border-white/20" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
    }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            {/* LUMINA Eye Logo - Küçük */}
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 rounded-full border border-cyan-400/60 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-wider">
                LUMINA
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="backdrop-blur-lg rounded-lg px-2 py-1 border border-white/20 bg-white/10">
              <span className="text-white text-xs font-bold" data-testid="text-category">
                {categoryIcon} {getCategoryName(category)}
              </span>
            </div>
            <div className="backdrop-blur-lg rounded-lg px-2 py-1 border border-white/20 bg-white/10">
              <span className="text-white text-xs font-bold" data-testid="text-difficulty">
                ⭐ {difficulty}
              </span>
            </div>
          </div>
        </div>
        
        {/* Hedefler Kutusu - Header'da sağ köşede */}
        {!isGuestMode && gameStats && onToggleDailyGoals && (
          <div className="relative">
            <button
              onClick={onToggleDailyGoals}
              className="text-white font-medium py-1.5 px-2.5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 backdrop-blur-md border border-white/20 text-xs"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.8), rgba(233, 30, 99, 0.8))',
                boxShadow: '0 4px 15px rgba(0, 220, 205, 0.2)'
              }}
            >
              <div className="text-sm">📅</div>
              <div className="text-xs">
                {gameStats.dailyGoals.filter((g: any) => g.completed).length}/{gameStats.dailyGoals.length}
              </div>
            </button>
            
            {showDailyGoals && (
              <div className="absolute top-full right-0 mt-2 w-64 z-50">
                <div className="bg-white/10 backdrop-blur-xl rounded-lg p-3 border border-white/20">
                  <div className="text-white text-sm font-semibold mb-2">Günlük Hedefler</div>
                  <div className="space-y-2">
                    {gameStats.dailyGoals.map((goal: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className={goal.completed ? 'text-green-400' : 'text-white/60'}>
                          {goal.completed ? '✅' : '⭕'}
                        </div>
                        <div className={`flex-1 ${goal.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                          {goal.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
      </div>
    </header>
  );
});

GameHeader.displayName = 'GameHeader';
