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
}

export const VirtualKeyboard = memo(({ 
  onKeyPress, 
  onBackspace, 
  onSpace, 
  onSubmit,
  usedKeys = [],
  language = 'tr'
}: VirtualKeyboardProps) => {
  const t = keyboardTranslations[language];
  
  const handleKeyPress = useCallback((key: string) => {
    onKeyPress(key);
  }, [onKeyPress]);

  const getKeyStyle = useCallback((key: string) => {
    const baseClasses = "keyboard-key px-1 sm:px-2 lg:px-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-lg border border-white/30 min-w-[28px] sm:min-w-[36px] lg:min-w-[44px]";
    
    if (usedKeys.includes(key.toUpperCase())) {
      return `${baseClasses} bg-white/30 text-white shadow-xl border-white/50`;
    }
    
    return `${baseClasses} bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/50 shadow-lg`;
  }, [usedKeys]);

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-6 border border-white/20 shadow-2xl" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
      }}>
        <div className="space-y-1 sm:space-y-2 lg:space-y-3">
          {/* First Row */}
          <div className="flex justify-center gap-0.5 sm:gap-1">
            {turkishKeyboardLayout[0].map(key => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={getKeyStyle(key)}
                data-testid={`key-${key.toLowerCase()}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex justify-center gap-0.5 sm:gap-1">
            {turkishKeyboardLayout[1].map(key => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={getKeyStyle(key)}
                data-testid={`key-${key.toLowerCase()}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Third Row */}
          <div className="flex justify-center gap-0.5 sm:gap-1">
            {turkishKeyboardLayout[2].map(key => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={getKeyStyle(key)}
                data-testid={`key-${key.toLowerCase()}`}
              >
                {key}
              </button>
            ))}
            <button
              onClick={onBackspace}
              className="keyboard-key px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-lg border border-red-500/50 bg-red-500/20 text-white hover:bg-red-500/40 shadow-lg"
              data-testid="key-backspace"
            >
              <span className="sm:hidden">🗑️</span>
              <span className="hidden sm:inline">🗑️ {t.delete}</span>
            </button>
          </div>

          {/* Fourth Row - Space and Submit */}
          <div className="flex justify-center gap-1 sm:gap-2">
            <button
              onClick={onSpace}
              className="keyboard-key flex-1 max-w-[120px] sm:max-w-xs py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none backdrop-blur-lg border border-white/30 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/50 shadow-lg"
              data-testid="key-space"
            >
              <span className="sm:hidden">⌨️</span>
              <span className="hidden sm:inline">⌨️ {t.space}</span>
            </button>
            <button
              onClick={onSubmit}
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
      </div>
    </div>
  );
});

VirtualKeyboard.displayName = 'VirtualKeyboard';
