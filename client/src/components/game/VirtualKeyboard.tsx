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
    const baseClasses = "keyboard-key px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring";
    
    if (usedKeys.includes(key.toUpperCase())) {
      return `${baseClasses} bg-primary text-primary-foreground shadow-lg`;
    }
    
    return `${baseClasses} bg-muted hover:bg-primary hover:text-primary-foreground`;
  }, [usedKeys]);

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="game-card rounded-2xl p-6 shadow-xl">
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
              className="keyboard-key px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="key-backspace"
            >
              SİL
            </button>
          </div>

          {/* Fourth Row - Space and Submit */}
          <div className="flex justify-center gap-2">
            <button
              onClick={onSpace}
              className="keyboard-key flex-1 max-w-xs py-3 sm:py-4 text-sm sm:text-base font-bold bg-muted hover:bg-secondary hover:text-secondary-foreground rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="key-space"
            >
              BOŞLUK
            </button>
            <button
              onClick={onSubmit}
              className="keyboard-key px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-bold bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring shadow-lg"
              data-testid="key-submit"
            >
              GÖNDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

VirtualKeyboard.displayName = 'VirtualKeyboard';
