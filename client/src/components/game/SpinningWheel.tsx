import { memo, useMemo } from 'react';
import { rainbowColors, getThemeForCategory } from '@/lib/gameUtils';

interface SpinningWheelProps {
  word: string;
  isSpinning: boolean;
  spinDuration: number;
  difficulty: number;
  category: string;
}

export const SpinningWheel = memo(({ word, isSpinning, spinDuration, difficulty, category }: SpinningWheelProps) => {
  const letters = word.split('');
  const radius = 120;
  const theme = getThemeForCategory(category);
  
  const blurAmount = isSpinning ? (difficulty - 1) * 0.75 : 0;

  const wheelClass = useMemo(() => {
    if (!isSpinning) return '';
    return spinDuration <= 3 ? 'animate-spin-fast' : 'animate-spin-slow';
  }, [isSpinning, spinDuration]);

  const getDynamicLetterColor = useMemo(() => (index: number) => {
    const baseColors = [theme.primary, theme.secondary, ...rainbowColors];
    return baseColors[index % baseColors.length];
  }, [theme]);

  return (
    <div className="flex justify-center">
      <div className="game-card rounded-3xl p-8 shadow-2xl animate-slide-up">
        <div className="relative flex items-center justify-center">
          {/* Outer ring particles */}
          <div className="absolute w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-60 animate-pulse"
                style={{
                  background: getDynamicLetterColor(i),
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-180px) translateX(-50%)`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          <div 
            className={`${wheelClass} relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center rounded-full shadow-2xl border-2`}
            style={{ 
              animationDuration: `${spinDuration}s`,
              background: `conic-gradient(from 0deg, ${theme.primary}20, ${theme.secondary}20, ${theme.primary}20)`,
              borderColor: theme.primary,
              boxShadow: `0 0 40px ${theme.primary}40, inset 0 0 40px ${theme.secondary}20`
            }}
            data-testid="spinning-wheel"
          >
            {letters.map((char, i) => {
              const angle = (i / letters.length) * 360;
              const transformSpin = `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
              const transformAlign = `translateX(${(i - (letters.length - 1) / 2) * 25}px) scale(1.5)`;
              const scale = isSpinning ? 1 + Math.sin(Date.now() * 0.01 + i) * 0.1 : 1.5;

              return (
                <span 
                  key={i}
                  className="absolute text-4xl lg:text-5xl font-black uppercase letter-glow transition-all duration-1000"
                  style={{ 
                    color: getDynamicLetterColor(i),
                    transform: isSpinning 
                      ? `${transformSpin} scale(${scale})` 
                      : `${transformAlign}`, 
                    filter: `blur(${blurAmount}px) drop-shadow(0 0 8px currentColor)`,
                    transition: 'transform 1s, filter 0.5s',
                    textShadow: `0 0 20px currentColor, 0 0 40px currentColor`
                  }}
                  data-testid={`wheel-letter-${i}`}
                >
                  {char}
                </span>
              );
            })}
            
            {/* Center logo/emblem */}
            <div 
              className="absolute w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow border-2"
              style={{
                background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                borderColor: theme.primary,
                boxShadow: `0 0 20px ${theme.primary}60`
              }}
            >
              <div className="text-2xl font-black text-white" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                🇹🇷
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span data-testid="wheel-status">
                {isSpinning ? 'Döndürülüyor...' : 'Durdu'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SpinningWheel.displayName = 'SpinningWheel';
