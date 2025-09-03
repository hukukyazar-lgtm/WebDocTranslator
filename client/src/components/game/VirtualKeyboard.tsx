import { memo, useCallback } from 'react';
import { turkishKeyboardLayout } from '@/lib/gameUtils';
import type { Language } from './LanguageScreen';

// Keyboard translations
const keyboardTranslations = {
  tr: {
    delete: 'SİL',
    space: 'BOŞLUK',
    submit: 'GÖNDER'
  },
  en: {
    delete: 'DELETE',
    space: 'SPACE',
    submit: 'SUBMIT'
  },
  es: {
    delete: 'BORRAR',
    space: 'ESPACIO',
    submit: 'ENVIAR'
  },
  it: {
    delete: 'CANCELLA',
    space: 'SPAZIO',
    submit: 'INVIA'
  },
  fr: {
    delete: 'EFFACER',
    space: 'ESPACE',
    submit: 'ENVOYER'
  },
  de: {
    delete: 'LÖSCHEN',
    space: 'LEER',
    submit: 'SENDEN'
  }
};

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onSubmit: () => void;
  usedKeys?: string[];
  language?: Language;
  // Lingo için ekstra prop'lar
  correctKeys?: string[]; // Doğru pozisyondaki harfler (yeşil)
  presentKeys?: string[]; // Yanlış pozisyondaki ama var olan harfler (sarı)
  absentKeys?: string[]; // Olmayan harfler (gri)
}

export const VirtualKeyboard = memo(({ 
  onKeyPress, 
  onBackspace, 
  onSpace, 
  onSubmit,
  usedKeys = [],
  language = 'tr',
  correctKeys = [],
  presentKeys = [],
  absentKeys = []
}: VirtualKeyboardProps) => {
  const t = keyboardTranslations[language];
  
  const handleKeyPress = useCallback((key: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    onKeyPress(key);
    // Focus'u temizle ki tuş highlight kalmasın
    if (event?.currentTarget) {
      event.currentTarget.blur();
    }
  }, [onKeyPress]);

  const getKeyStyle = useCallback((key: string) => {
    const baseClasses = "keyboard-key px-1 sm:px-2 md:px-3 lg:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none backdrop-blur-lg border min-w-[28px] sm:min-w-[36px] md:min-w-[44px] lg:min-w-[52px] touch-manipulation";
    
    const upperKey = key.toUpperCase();
    
    // Correct letters (green pulsing effect)
    if (correctKeys.includes(upperKey)) {
      return `${baseClasses} bg-green-500/40 text-white border-green-400 shadow-lg animate-pulse-green active:scale-90`;
    }
    
    // Present letters (yellow vibrating effect) 
    if (presentKeys.includes(upperKey)) {
      return `${baseClasses} bg-yellow-500/40 text-white border-yellow-400 shadow-lg animate-shake active:scale-90`;
    }
    
    // Absent letters (red shake effect)
    if (absentKeys.includes(upperKey)) {
      return `${baseClasses} bg-red-500/40 text-white/60 border-red-400 shadow-lg animate-shake-red active:scale-90`;
    }
    
    // Default state
    return `${baseClasses} bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/50 border-white/30 shadow-lg active:scale-95`;
  }, [correctKeys, presentKeys, absentKeys]);

  return (
    <div className="space-y-1 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
          {/* First Row */}
          <div className="flex justify-center gap-0.5 sm:gap-1 md:gap-1.5">
            {turkishKeyboardLayout[0].map(key => (
              <button
                key={key}
                onClick={(e) => handleKeyPress(key, e)}
                className={getKeyStyle(key)}
                data-testid={`key-${key.toLowerCase()}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex justify-center gap-0.5 sm:gap-1 md:gap-1.5">
            {turkishKeyboardLayout[1].map(key => (
              <button
                key={key}
                onClick={(e) => handleKeyPress(key, e)}
                className={getKeyStyle(key)}
                data-testid={`key-${key.toLowerCase()}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Third Row */}
          <div className="flex justify-center gap-0.5 sm:gap-1 md:gap-1.5">
            {turkishKeyboardLayout[2].map(key => (
              <button
                key={key}
                onClick={(e) => handleKeyPress(key, e)}
                className={getKeyStyle(key)}
                data-testid={`key-${key.toLowerCase()}`}
              >
                {key}
              </button>
            ))}
            <button
              onClick={(e) => { onBackspace(); e.currentTarget.blur(); }}
              className="keyboard-key px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-lg border border-red-500/50 bg-red-500/20 text-white hover:bg-red-500/40 shadow-lg touch-manipulation"
              data-testid="key-backspace"
            >
              <span className="sm:hidden">🗑️</span>
              <span className="hidden sm:inline">🗑️ {t.delete}</span>
            </button>
          </div>

          {/* Fourth Row - Space and Submit */}
          <div className="flex justify-center gap-1 sm:gap-2">
            <button
              onClick={(e) => { onSpace(); e.currentTarget.blur(); }}
              className="keyboard-key flex-1 max-w-[120px] sm:max-w-xs py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-lg border border-white/30 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/50 shadow-lg"
              data-testid="key-space"
            >
              <span className="sm:hidden">⌨️</span>
              <span className="hidden sm:inline">⌨️ {t.space}</span>
            </button>
            <button
              onClick={(e) => { onSubmit(); e.currentTarget.blur(); }}
              className="keyboard-key px-3 sm:px-4 lg:px-8 py-2 sm:py-3 text-xs sm:text-sm lg:text-lg font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-lg border border-green-500/50 text-white hover:bg-green-500/40 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.3))',
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)'
              }}
              data-testid="key-submit"
            >
              <span className="sm:hidden">🚀</span>
              <span className="hidden sm:inline">🚀 {t.submit}</span>
            </button>
          </div>
    </div>
  );
});

VirtualKeyboard.displayName = 'VirtualKeyboard';
