import { memo } from 'react';

export type Language = 'tr' | 'en' | 'es' | 'it' | 'fr' | 'de';

export interface LanguageScreenProps {
  onLanguageSelect: (language: Language) => void;
  onBack?: () => void;
}

const languages = [
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' }
];

export const LanguageScreen = memo<LanguageScreenProps>(({ onLanguageSelect, onBack }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Statik arka plan - animasyon yok */}
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          {/* Geri butonu */}
          {onBack && (
            <div className="flex justify-start mb-6 animate-slide-up">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                data-testid="button-back"
              >
                <span>←</span>
                <span>Geri</span>
              </button>
            </div>
          )}
          {/* Logo section */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="relative mb-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                    <div className="text-6xl sm:text-7xl">🎯</div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-teal-400 to-pink-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-pink-400 to-teal-500 rounded-full animate-pulse delay-300"></div>
                </div>
                
                <div className="text-center">
                  <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4">
                    <span className="font-light">Word</span>
                    <span className="font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">Spin</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white/90">PRO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div 
            className="backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-slide-up"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.1), rgba(233, 30, 99, 0.1))',
              animationDelay: '0.2s'
            }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                🌍 Dil Seçin
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                Hangi dilde oynamak istiyorsunuz?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => onLanguageSelect(language.code)}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-6 transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  data-testid={`select-language-${language.code}`}
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl sm:text-5xl mb-2">
                      {language.flag}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white">
                      {language.name}
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.2), rgba(233, 30, 99, 0.2))'
                    }}
                  />
                </button>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-xs text-white/50">
                Dil seçiminizi istediğiniz zaman değiştirebilirsiniz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LanguageScreen.displayName = 'LanguageScreen';