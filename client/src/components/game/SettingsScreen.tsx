import { memo } from 'react';
import { type Language } from './LanguageScreen';

export interface SettingsScreenProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onBack: () => void;
}

const languages = [
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' }
];

const translations = {
  tr: {
    title: '⚙️ Ayarlar',
    subtitle: 'Oyun tercihlerinizi düzenleyin',
    languageSection: 'Dil Ayarları',
    languageDesc: 'Oyun dilini değiştirin',
    currentLanguage: 'Mevcut Dil',
    selectLanguage: 'Dil Seçin',
    back: 'Geri',
    autoDetected: 'Otomatik Algılandı',
    saved: 'Kaydedildi!'
  },
  en: {
    title: '⚙️ Settings',
    subtitle: 'Customize your game preferences',
    languageSection: 'Language Settings',
    languageDesc: 'Change the game language',
    currentLanguage: 'Current Language',
    selectLanguage: 'Select Language',
    back: 'Back',
    autoDetected: 'Auto Detected',
    saved: 'Saved!'
  },
  es: {
    title: '⚙️ Configuración',
    subtitle: 'Personaliza tus preferencias del juego',
    languageSection: 'Configuración de Idioma',
    languageDesc: 'Cambiar el idioma del juego',
    currentLanguage: 'Idioma Actual',
    selectLanguage: 'Seleccionar Idioma',
    back: 'Atrás',
    autoDetected: 'Detectado Automáticamente',
    saved: '¡Guardado!'
  },
  it: {
    title: '⚙️ Impostazioni',
    subtitle: 'Personalizza le tue preferenze di gioco',
    languageSection: 'Impostazioni Lingua',
    languageDesc: 'Cambia la lingua del gioco',
    currentLanguage: 'Lingua Corrente',
    selectLanguage: 'Seleziona Lingua',
    back: 'Indietro',
    autoDetected: 'Rilevato Automaticamente',
    saved: 'Salvato!'
  },
  fr: {
    title: '⚙️ Paramètres',
    subtitle: 'Personnalisez vos préférences de jeu',
    languageSection: 'Paramètres de Langue',
    languageDesc: 'Changer la langue du jeu',
    currentLanguage: 'Langue Actuelle',
    selectLanguage: 'Sélectionner une Langue',
    back: 'Retour',
    autoDetected: 'Détecté Automatiquement',
    saved: 'Sauvegardé!'
  },
  de: {
    title: '⚙️ Einstellungen',
    subtitle: 'Passen Sie Ihre Spieleinstellungen an',
    languageSection: 'Spracheinstellungen',
    languageDesc: 'Spielsprache ändern',
    currentLanguage: 'Aktuelle Sprache',
    selectLanguage: 'Sprache Auswählen',
    back: 'Zurück',
    autoDetected: 'Automatisch Erkannt',
    saved: 'Gespeichert!'
  }
};

export const SettingsScreen = memo<SettingsScreenProps>(({ selectedLanguage, onLanguageChange, onBack }) => {
  const t = translations[selectedLanguage];
  const currentLang = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 h-screen flex flex-col justify-center p-3 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          {/* Geri butonu */}
          <div className="flex justify-start mb-6 animate-slide-up">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              data-testid="button-back"
            >
              <span>←</span>
              <span>{t.back}</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {t.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base">
              {t.subtitle}
            </p>
          </div>

          {/* Settings Content */}
          <div 
            className="backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-slide-up space-y-8"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.1), rgba(233, 30, 99, 0.1))',
              animationDelay: '0.2s'
            }}
          >
            {/* Current Language Display */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">{t.currentLanguage}</h3>
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-3xl">{currentLang?.flag}</span>
                <span className="text-white font-medium">{currentLang?.name}</span>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.languageSection}</h3>
              <p className="text-white/70 text-sm mb-6">{t.languageDesc}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 ${
                      selectedLanguage === language.code 
                        ? 'ring-2 ring-teal-400 bg-white/20' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    style={{
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    data-testid={`select-language-${language.code}`}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-3xl mb-1">
                        {language.flag}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {language.name}
                      </div>
                      {selectedLanguage === language.code && (
                        <div className="text-xs text-teal-400 font-medium">
                          ✓ {t.autoDetected}
                        </div>
                      )}
                    </div>
                    
                    {/* Selection indicator */}
                    {selectedLanguage === language.code && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-xs text-white/50">
                {selectedLanguage === 'tr' 
                  ? 'Dil değişiklikleri otomatik olarak kaydedilir'
                  : 'Language changes are saved automatically'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SettingsScreen.displayName = 'SettingsScreen';