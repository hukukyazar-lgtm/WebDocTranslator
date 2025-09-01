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
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const t = translations[selectedLanguage];
  const categoryT = categoryTranslations[selectedLanguage];
  
  const difficultyLabels = [t.easy, t.medium, t.hard, t.veryHard, t.extreme];
  const difficultyColors = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#dc2626'];
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowDifficultyModal(true);
  };
  
  const handleDifficultySelect = (difficulty: number) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyModal(false);
    if (selectedCategory) {
      onCategorySelect(selectedCategory, difficulty);
    }
  };
  
  const closeDifficultyModal = () => {
    setShowDifficultyModal(false);
    setSelectedCategory(null);
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
    background: 'radial-gradient(ellipse at center, hsl(230, 35%, 15%) 0%, hsl(230, 35%, 7%) 50%, hsl(220, 40%, 5%) 100%)',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative' as const
  };

  return (
    <div style={backgroundStyle}>
      {/* Space particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ top: '30%', right: '20%', animationDelay: '1s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" style={{ top: '60%', left: '10%', animationDelay: '2s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ bottom: '40%', right: '15%', animationDelay: '1.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ top: '80%', right: '75%', animationDelay: '0.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse" style={{ top: '20%', right: '40%', animationDelay: '2.5s' }}></div>
      </div>
      
      <div className="relative z-10 h-screen flex flex-col p-3 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto my-auto">
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
              {/* LUMINA Eye Logo */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 rounded-full border border-cyan-400/60 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse blur-sm"></div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider">
                  LUMINA
                </h1>
              </div>
              {isGuestMode && (
                <p className="text-sm text-cyan-400/60 mt-2 tracking-wide">
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

          {/* Ana Kategori Grid */}
          <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
            
            {/* Ana Başlık */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              {t.chooseCategory}
            </h2>
            <p className="text-center text-white/60 mb-8">
              {selectedLanguage === 'tr' ? 'Kategori seçin, zorluk seviyesi modal\'da belirlenecek' : 'Choose category, difficulty will be selected in modal'}
            </p>
            
            {/* Modern Kategori Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Object.keys(wordLists).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 transform hover:scale-110 active:scale-95 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl"
                  style={{
                    background: hoveredCategory === cat 
                      ? `linear-gradient(135deg, ${getThemeForCategory(cat).primary}60, ${getThemeForCategory(cat).secondary}60)`
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.12))',
                    boxShadow: hoveredCategory === cat 
                      ? `0 20px 40px ${getThemeForCategory(cat).primary}30`
                      : '0 8px 20px rgba(0, 0, 0, 0.3)'
                  }}
                  data-testid={`button-category-${cat}`}
                >
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                      {categoryIcons[cat]}
                    </div>
                    <div className="font-bold text-white text-base sm:text-lg lg:text-xl mb-2">
                      {getCategoryName(cat)}
                    </div>
                    <div className="text-sm text-white/60">
                      {Object.keys(wordLists[cat]).length} seviye
                    </div>
                  </div>
                  
                  {/* Hover efekti */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </button>
              ))}
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Modern Zorluk Seçimi Pop-up Modal */}
      {showDifficultyModal && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={closeDifficultyModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-lg animate-scale-in">
            <div className="rounded-2xl p-4 sm:p-6"
                 style={{
                   background: `linear-gradient(135deg, ${getThemeForCategory(selectedCategory).primary}20, ${getThemeForCategory(selectedCategory).secondary}20)`,
                   backdropFilter: 'blur(30px)',
                   border: `2px solid ${getThemeForCategory(selectedCategory).primary}40`,
                   boxShadow: `0 30px 60px ${getThemeForCategory(selectedCategory).primary}30`
                 }}>
              
              {/* Modal Header */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {categoryIcons[selectedCategory]}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {getCategoryName(selectedCategory)}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  {selectedLanguage === 'tr' ? 'Zorluk seviyesini seçin' : 'Choose difficulty level'}
                </p>
                
                {/* Close Button */}
                <button
                  onClick={closeDifficultyModal}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 text-sm"
                >
                  ✕
                </button>
              </div>
              
              {/* Zorluk Butonları */}
              <div className="space-y-2">
                {difficultyLabels.map((label, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handleDifficultySelect(index + 1)}
                    className="w-full p-3 sm:p-4 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 text-left"
                    style={{
                      background: `linear-gradient(135deg, ${difficultyColors[index]}60, ${difficultyColors[index]}30)`,
                      backdropFilter: 'blur(20px)',
                      border: `2px solid ${difficultyColors[index]}80`,
                      boxShadow: `0 15px 30px ${difficultyColors[index]}40`
                    }}
                    data-testid={`modal-difficulty-${index + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
                        {['🟢', '🟡', '🟠', '🔴', '⚫'][index]}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-base sm:text-lg mb-0.5">
                          {label}
                        </h4>
                        <div className="text-white/80 text-xs sm:text-sm">
                          {[
                            selectedLanguage === 'tr' ? 'Yeni başlayanlar için ideal' : 'Perfect for beginners',
                            selectedLanguage === 'tr' ? 'Deneyimliler için uygun' : 'Suitable for experienced',
                            selectedLanguage === 'tr' ? 'Zorlu bir deneyim' : 'A challenging experience',
                            selectedLanguage === 'tr' ? 'Uzmanlar için tasarlanmış' : 'Designed for experts',
                            selectedLanguage === 'tr' ? 'Sadece ustalar için' : 'Only for masters'
                          ][index]}
                        </div>
                      </div>
                      <div className="text-xl text-white/60">→</div>
                    </div>
                  </button>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

CategoryScreen.displayName = 'CategoryScreen';