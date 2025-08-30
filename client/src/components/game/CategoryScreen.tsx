import { memo, useState } from 'react';
import { wordLists } from '@/lib/wordLists';
import { getThemeForCategory } from '@/lib/gameUtils';
import type { Language } from './LanguageScreen';

export interface CategoryScreenProps {
  selectedLanguage: Language;
  onGameStart: (category: string, difficulty: number) => void;
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
    chooseDifficulty: 'Zorluk Seviyesi Seçin',
    beginner: 'Başlangıç',
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor',
    expert: 'Uzman',
    words: 'kelime',
    selectCategory: 'Bir kategori seçin',
    backToCategories: 'Kategorilere Dön'
  },
  en: {
    back: 'Back',
    settings: 'Settings',
    guestMode: 'Guest Mode - Progress not saved',
    chooseCategory: 'Choose Category',
    subtitle: 'Which topic would you like to play?',
    currentLang: 'Language',
    levels: 'levels',
    chooseDifficulty: 'Choose Difficulty Level',
    beginner: 'Beginner',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    expert: 'Expert',
    words: 'words',
    selectCategory: 'Select a category',
    backToCategories: 'Back to Categories'
  },
  es: {
    back: 'Atrás',
    settings: 'Configuración',
    guestMode: 'Modo Invitado - Progreso no guardado',
    chooseCategory: 'Elegir Categoría',
    subtitle: '¿Sobre qué tema te gustaría jugar?',
    currentLang: 'Idioma',
    levels: 'niveles',
    chooseDifficulty: 'Elegir Nivel de Dificultad',
    beginner: 'Principiante',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    expert: 'Experto',
    words: 'palabras',
    selectCategory: 'Selecciona una categoría',
    backToCategories: 'Volver a Categorías'
  },
  it: {
    back: 'Indietro',
    settings: 'Impostazioni',
    guestMode: 'Modalità Ospite - Progresso non salvato',
    chooseCategory: 'Scegli Categoria',
    subtitle: 'Su quale argomento vorresti giocare?',
    currentLang: 'Lingua',
    levels: 'livelli',
    chooseDifficulty: 'Scegli Livello di Difficoltà',
    beginner: 'Principiante',
    easy: 'Facile',
    medium: 'Medio',
    hard: 'Difficile',
    expert: 'Esperto',
    words: 'parole',
    selectCategory: 'Seleziona una categoria',
    backToCategories: 'Torna alle Categorie'
  },
  fr: {
    back: 'Retour',
    settings: 'Paramètres',
    guestMode: 'Mode Invité - Progression non sauvegardée',
    chooseCategory: 'Choisir une Catégorie',
    subtitle: 'Sur quel sujet aimeriez-vous jouer?',
    currentLang: 'Langue',
    levels: 'niveaux',
    chooseDifficulty: 'Choisir Niveau de Difficulté',
    beginner: 'Débutant',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    expert: 'Expert',
    words: 'mots',
    selectCategory: 'Sélectionnez une catégorie',
    backToCategories: 'Retour aux Catégories'
  },
  de: {
    back: 'Zurück',
    settings: 'Einstellungen',
    guestMode: 'Gastmodus - Fortschritt nicht gespeichert',
    chooseCategory: 'Kategorie Auswählen',
    subtitle: 'Zu welchem Thema möchten Sie spielen?',
    currentLang: 'Sprache',
    levels: 'stufen',
    chooseDifficulty: 'Schwierigkeitsstufe Auswählen',
    beginner: 'Anfänger',
    easy: 'Einfach',
    medium: 'Mittel',
    hard: 'Schwer',
    expert: 'Experte',
    words: 'wörter',
    selectCategory: 'Wählen Sie eine Kategorie',
    backToCategories: 'Zurück zu Kategorien'
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

export const CategoryScreen = memo<CategoryScreenProps>(({ selectedLanguage, onGameStart, onBack, onSettingsOpen, isGuestMode = false }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDifficulties, setShowDifficulties] = useState(false);
  const t = translations[selectedLanguage];
  const categoryT = categoryTranslations[selectedLanguage];
  
  const theme = getThemeForCategory(hoveredCategory || selectedCategory || 'Hayvanlar');
  
  const getCategoryName = (turkishName: string): string => {
    return (categoryT as Record<string, string>)[turkishName] || turkishName;
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
    'Eşyalar': '🏠',
    'Filmler': '🌬️',
    'Karışık': '🎆'
  };

  const difficultyConfig = [
    { key: 1, icon: '🌱', gradient: 'from-green-400 to-emerald-500' },
    { key: 2, icon: '🌿', gradient: 'from-emerald-400 to-teal-500' },
    { key: 3, icon: '🔥', gradient: 'from-orange-400 to-red-500' },
    { key: 4, icon: '💀', gradient: 'from-red-500 to-purple-600' },
    { key: 5, icon: '👑', gradient: 'from-purple-500 to-pink-600' }
  ];

  const getDifficultyName = (level: number): string => {
    switch(level) {
      case 1: return t.beginner;
      case 2: return t.easy;
      case 3: return t.medium;
      case 4: return t.hard;
      case 5: return t.expert;
      default: return t.easy;
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowDifficulties(true);
  };

  const handleDifficultySelect = (difficulty: number) => {
    if (selectedCategory) {
      onGameStart(selectedCategory, difficulty);
    }
  };

  const handleBackFromDifficulty = () => {
    setSelectedCategory(null);
    setShowDifficulties(false);
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
              onClick={showDifficulties ? handleBackFromDifficulty : onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              data-testid="button-back"
            >
              <span>←</span>
              <span>{showDifficulties ? t.backToCategories : t.back}</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                🎯 <span className="font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">WordSpin</span>
              </h1>
              <p className="text-sm text-white/60 mt-1 font-medium">PRO EDITION</p>
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

          {!showDifficulties ? (
            /* Category Selection */
            <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
                {t.chooseCategory}
              </h3>
              <p className="text-white/70 text-center mb-8">{t.selectCategory}</p>
              
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
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Difficulty Selection */
            <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
              {/* Selected Category Display */}
              {selectedCategory && (
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
                    <span className="text-3xl">{categoryIcons[selectedCategory]}</span>
                    <span className="text-xl font-bold text-white">{getCategoryName(selectedCategory)}</span>
                  </div>
                </div>
              )}
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                {t.chooseDifficulty}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {difficultyConfig.map((diff, index) => {
                  const wordCount = selectedCategory ? (wordLists[selectedCategory as keyof typeof wordLists]?.[diff.key as keyof typeof wordLists[keyof typeof wordLists]]?.length || 0) : 0;
                  return (
                    <button
                      key={diff.key}
                      onClick={() => handleDifficultySelect(diff.key)}
                      disabled={wordCount === 0}
                      className={`group relative p-6 sm:p-8 rounded-3xl transition-all duration-500 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl ${
                        wordCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      style={{
                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                        animationDelay: `${index * 0.1}s`
                      }}
                      data-testid={`button-difficulty-${diff.key}`}
                    >
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                          {diff.icon}
                        </div>
                        <div className={`font-black text-lg sm:text-xl mb-2 bg-gradient-to-r ${diff.gradient} bg-clip-text text-transparent`}>
                          {getDifficultyName(diff.key)}
                        </div>
                        <div className="text-sm text-white/60">
                          {wordCount} {t.words}
                        </div>
                      </div>
                      
                      <div 
                        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${diff.gradient}`}
                        style={{ opacity: 0.1 }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

CategoryScreen.displayName = 'CategoryScreen';