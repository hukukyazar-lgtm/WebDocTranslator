import { memo, useCallback } from 'react';
import { turkishKeyboardLayout } from '@/lib/gameUtils';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onSubmit: () => void;
  usedKeys?: string[];
}

export const VirtualKeyboard = memo(({ 
  onKeyPress, 
  onBackspace, 
  onSpace, 
  onSubmit,
  usedKeys = []
}: VirtualKeyboardProps) => {
  
  const handleKeyPress = useCallback((key: string) => {
    onKeyPress(key);
  }, [onKeyPress]);

  const getKeyStyle = useCallback((key: string) => {
    const baseClasses = "keyboard-key px-4 py-4 text-lg font-black rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none backdrop-blur-lg border border-white/30";
    
    if (usedKeys.includes(key.toUpperCase())) {
      return `${baseClasses} bg-white/30 text-white shadow-2xl border-white/50`;
    }
    
    return `${baseClasses} bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/50 shadow-lg`;
  }, [usedKeys]);

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
      }}>
        <div className="space-y-3">
          {/* First Row */}
          <div className="flex justify-center gap-1 sm:gap-2">
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
          <div className="flex justify-center gap-1 sm:gap-2">
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
          <div className="flex justify-center gap-1 sm:gap-2">
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
              className="keyboard-key px-6 py-4 text-lg font-black rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none backdrop-blur-lg border border-red-500/50 bg-red-500/20 text-white hover:bg-red-500/40 shadow-lg"
              data-testid="key-backspace"
            >
              🗑️ SİL
            </button>
          </div>

          {/* Fourth Row - Space and Submit */}
          <div className="flex justify-center gap-2">
            <button
              onClick={onSpace}
              className="keyboard-key flex-1 max-w-xs py-4 text-lg font-black rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none backdrop-blur-lg border border-white/30 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/50 shadow-lg"
              data-testid="key-space"
            >
              ⌨️ BOŞLUK
            </button>
            <button
              onClick={onSubmit}
              className="keyboard-key px-12 py-4 text-xl font-black rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none backdrop-blur-lg border border-green-500/50 text-white hover:bg-green-500/40 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.3))',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
              }}
              data-testid="key-submit"
            >
              🚀 GÖNDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

VirtualKeyboard.displayName = 'VirtualKeyboard';
