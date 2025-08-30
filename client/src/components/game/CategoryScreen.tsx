import { memo, useState } from 'react';
import { wordLists } from '@/lib/wordLists';
import { getThemeForCategory } from '@/lib/gameUtils';
import type { Language } from './LanguageScreen';

export interface CategoryScreenProps {
  selectedLanguage: Language;
  onCategorySelect: (category: string, difficulty: number) => void;
  onBack: () => void;
  onSettingsOpen?: () => void;
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

// Translations for CategoryScreen
const translations = {
  tr: {
    back: 'Geri',
    settings: 'Ayarlar',
    guestMode: 'Misafir Modu - İlerleme kaydedilmiyor',
    chooseCategory: 'Kategori Seçin',
    subtitle: 'Hangi konuda oynamak istiyorsunuz?',
    currentLang: 'Dil',
    levels: 'zorluk',
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor',
    veryHard: 'Çok Zor',
    extreme: 'Ekstrem'
  },
  en: {
    back: 'Back',
    settings: 'Settings',
    guestMode: 'Guest Mode - Progress not saved',
    chooseCategory: 'Choose Category',
    subtitle: 'Which topic would you like to play?',
    currentLang: 'Language',
    levels: 'levels',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    veryHard: 'Very Hard',
    extreme: 'Extreme'
  },
  es: {
    back: 'Atrás',
    settings: 'Configuración',
    guestMode: 'Modo Invitado - Progreso no guardado',
    chooseCategory: 'Elegir Categoría',
    subtitle: '¿Sobre qué tema te gustaría jugar?',
    currentLang: 'Idioma',
    levels: 'niveles',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    veryHard: 'Muy Difícil',
    extreme: 'Extremo'
  },
  it: {
    back: 'Indietro',
    settings: 'Impostazioni',
    guestMode: 'Modalità Ospite - Progresso non salvato',
    chooseCategory: 'Scegli Categoria',
    subtitle: 'Su quale argomento vorresti giocare?',
    currentLang: 'Lingua',
    levels: 'livelli',
    easy: 'Facile',
    medium: 'Medio',
    hard: 'Difficile',
    veryHard: 'Molto Difficile',
    extreme: 'Estremo'
  },
  fr: {
    back: 'Retour',
    settings: 'Paramètres',
    guestMode: 'Mode Invité - Progression non sauvegardée',
    chooseCategory: 'Choisir une Catégorie',
    subtitle: 'Sur quel sujet aimeriez-vous jouer?',
    currentLang: 'Langue',
    levels: 'niveaux',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    veryHard: 'Très Difficile',
    extreme: 'Extrême'
  },
  de: {
    back: 'Zurück',
    settings: 'Einstellungen',
    guestMode: 'Gastmodus - Fortschritt nicht gespeichert',
    chooseCategory: 'Kategorie Auswählen',
    subtitle: 'Zu welchem Thema möchten Sie spielen?',
    currentLang: 'Sprache',
    levels: 'stufen',
    easy: 'Einfach',
    medium: 'Mittel',
    hard: 'Schwer',
    veryHard: 'Sehr Schwer',
    extreme: 'Extrem'
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

export const CategoryScreen = memo<CategoryScreenProps>(({ selectedLanguage, onCategorySelect, onBack, onSettingsOpen, isGuestMode = false }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categoryDifficulties, setCategoryDifficulties] = useState<Record<string, number>>({});
  const t = translations[selectedLanguage];
  const categoryT = categoryTranslations[selectedLanguage];
  
  const difficultyLabels = [t.easy, t.medium, t.hard, t.veryHard, t.extreme];
  const difficultyColors = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#dc2626'];
  
  const handleCategorySelect = (category: string) => {
    const difficulty = categoryDifficulties[category] || 1;
    onCategorySelect(category, difficulty);
  };
  
  const setDifficulty = (category: string, difficulty: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCategoryDifficulties(prev => ({ ...prev, [category]: difficulty }));
  };
  
  const theme = getThemeForCategory(hoveredCategory || 'Hayvanlar');
  
  const getCategoryName = (turkishName: string): string => {
    return (categoryT as Record<string, string>)[turkishName] || turkishName;
  };

  const categoryIcons: Record<string, string> = {
    'Hayvanlar': '🐾',
    'Yiyecek': '🍕',
    'Bilim': '🔬',
    'Ülkeler': '🌍',
    'Meslekler': '👔',
    'Şehirler': '🏙️',
    'Markalar': '🏪',
    'Spor Dalları': '🏃‍♂️',
    'Eşyalar': '📦',
    'Filmler': '🎬',
    'Karışık': '🎲'
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
              <span>{t.back}</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                🎯 <span className="font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">WordSpin</span>
              </h1>
              {isGuestMode && (
                <p className="text-sm text-white/60 mt-1">
                  👤 {t.guestMode}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Settings Button */}
              {onSettingsOpen && (
                <button 
                  onClick={onSettingsOpen}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  data-testid="button-settings"
                >
                  <span>⚙️</span>
                  <span className="hidden sm:inline">{t.settings}</span>
                </button>
              )}
              <span className="text-2xl">{languageFlags[selectedLanguage]}</span>
              <span className="text-white font-medium text-sm">{languageNames[selectedLanguage]}</span>
            </div>
          </div>

          {/* Kategori seçimi */}
          <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              {t.chooseCategory}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {Object.keys(wordLists).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
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
                  {/* Zorluk Seçici */}
                  <div className="absolute top-2 left-2 flex gap-1 backdrop-blur-sm bg-black/30 rounded-full px-2 py-1 z-10">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const isSelected = (categoryDifficulties[cat] || 1) === level;
                      return (
                        <div
                          key={level}
                          onClick={(e) => setDifficulty(cat, level, e)}
                          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-125 ${
                            isSelected 
                              ? 'opacity-100 scale-110 shadow-lg' 
                              : 'opacity-70 hover:opacity-90'
                          }`}
                          style={{
                            backgroundColor: isSelected ? difficultyColors[level - 1] : 'transparent',
                            borderColor: difficultyColors[level - 1],
                            boxShadow: isSelected ? `0 0 8px ${difficultyColors[level - 1]}50` : 'none'
                          }}
                          title={difficultyLabels[level - 1]}
                          data-testid={`difficulty-${cat}-${level}`}
                        />
                      );
                    })}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 transition-transform duration-300 group-hover:scale-110">
                      {categoryIcons[cat]}
                    </div>
                    <div className="font-bold text-white text-sm sm:text-base lg:text-lg">
                      {getCategoryName(cat)}
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 mt-1">
                      {Object.keys(wordLists[cat]).length} {t.levels}
                    </div>
                    
                    {/* Seçili Zorluk Göstergesi */}
                    <div className="mt-2 text-xs font-semibold" style={{ color: difficultyColors[(categoryDifficulties[cat] || 1) - 1] }}>
                      {difficultyLabels[(categoryDifficulties[cat] || 1) - 1]}
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