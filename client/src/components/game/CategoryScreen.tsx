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
  const t = translations[selectedLanguage];
  const categoryT = categoryTranslations[selectedLanguage];
  
  const difficultyLabels = [t.easy, t.medium, t.hard, t.veryHard, t.extreme];
  const difficultyColors = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#dc2626'];
  
  const handleCategorySelect = (category: string) => {
    if (selectedDifficulty) {
      onCategorySelect(category, selectedDifficulty);
    }
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

          {/* Modern Tek Sayfa - Side by Side Layout */}
          <div className="animate-slide-up mb-4 sm:mb-6 lg:mb-8" style={{ animationDelay: '0.2s' }}>
            
            {/* Ana Başlık */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              {selectedLanguage === 'tr' ? 'Oyun Kurulumu' : 'Game Setup'}
            </h2>
            
            {/* İki Kolonlu Modern Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Sol Taraf - Zorluk Seçimi */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {selectedLanguage === 'tr' ? '🎯 Zorluk Seviyesi' : '🎯 Difficulty Level'}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">
                    {selectedLanguage === 'tr' ? 'Meydan okumanızı seçin' : 'Choose your challenge'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {difficultyLabels.map((label, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setSelectedDifficulty(index + 1)}
                      className={`w-full p-4 sm:p-5 rounded-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                        selectedDifficulty === index + 1 
                          ? 'ring-4 ring-white/40 scale-105' 
                          : 'hover:scale-102'
                      }`}
                      style={{
                        background: selectedDifficulty === index + 1
                          ? `linear-gradient(135deg, ${difficultyColors[index]}60, ${difficultyColors[index]}40)`
                          : `linear-gradient(135deg, ${difficultyColors[index]}30, ${difficultyColors[index]}10)`,
                        backdropFilter: 'blur(20px)',
                        border: `2px solid ${difficultyColors[index]}${selectedDifficulty === index + 1 ? '80' : '40'}`,
                        boxShadow: selectedDifficulty === index + 1 
                          ? `0 20px 40px ${difficultyColors[index]}40`
                          : `0 10px 20px ${difficultyColors[index]}20`
                      }}
                      data-testid={`difficulty-${index + 1}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
                          {['🟢', '🟡', '🟠', '🔴', '⚫'][index]}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-bold text-white text-lg sm:text-xl">
                            {label}
                          </h4>
                          <div className="text-sm text-white/70">
                            {[
                              selectedLanguage === 'tr' ? 'Yeni başlayanlar için ideal' : 'Perfect for beginners',
                              selectedLanguage === 'tr' ? 'Deneyimliler için uygun' : 'Suitable for experienced',
                              selectedLanguage === 'tr' ? 'Zorlu bir deneyim' : 'A challenging experience',
                              selectedLanguage === 'tr' ? 'Uzmanlar için tasarlanmış' : 'Designed for experts',
                              selectedLanguage === 'tr' ? 'Sadece ustalar için' : 'Only for masters'
                            ][index]}
                          </div>
                        </div>
                        {selectedDifficulty === index + 1 && (
                          <div className="text-2xl">✅</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sağ Taraf - Kategori Seçimi */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {selectedLanguage === 'tr' ? '📚 Kategori Seçimi' : '📚 Category Selection'}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">
                    {selectedLanguage === 'tr' ? 'Hangi konuda oynamak istiyorsunuz?' : 'What topic would you like to play?'}
                  </p>
                </div>
                
                {!selectedDifficulty ? (
                  <div className="text-center p-8 rounded-2xl border-2 border-dashed border-white/20">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-white/60">
                      {selectedLanguage === 'tr' ? 'Önce zorluk seviyesi seçin' : 'Please select a difficulty level first'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.keys(wordLists).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        onMouseEnter={() => setHoveredCategory(cat)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className="group relative p-3 sm:p-4 rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl"
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
                        {/* Seçili zorluk göstergesi */}
                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white" 
                             style={{ backgroundColor: difficultyColors[selectedDifficulty - 1] }}
                             title={difficultyLabels[selectedDifficulty - 1]}>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
                            {categoryIcons[cat]}
                          </div>
                          <div className="font-bold text-white text-xs sm:text-sm">
                            {getCategoryName(cat)}
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            {Object.keys(wordLists[cat]).length} seviye
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
            </div>
            
            {/* Alt kısım - Seçim Özeti */}
            {selectedDifficulty && (
              <div className="mt-8 p-6 rounded-2xl text-center"
                   style={{
                     background: `linear-gradient(135deg, ${difficultyColors[selectedDifficulty - 1]}20, ${difficultyColors[selectedDifficulty - 1]}10)`,
                     backdropFilter: 'blur(20px)',
                     border: `2px solid ${difficultyColors[selectedDifficulty - 1]}40`
                   }}>
                <p className="text-white/80 text-sm">
                  {selectedLanguage === 'tr' 
                    ? `✨ ${difficultyLabels[selectedDifficulty - 1]} seviyesi seçildi. Şimdi bir kategori seçin!`
                    : `✨ ${difficultyLabels[selectedDifficulty - 1]} level selected. Now choose a category!`
                  }
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
});

CategoryScreen.displayName = 'CategoryScreen';