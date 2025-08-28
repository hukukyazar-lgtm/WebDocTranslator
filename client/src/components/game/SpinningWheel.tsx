import { memo, useMemo } from 'react';
import { rainbowColors } from '@/lib/gameUtils';

interface SpinningWheelProps {
  word: string;
  isSpinning: boolean;
  spinDuration: number;
  difficulty: number;
}

export const SpinningWheel = memo(({ word, isSpinning, spinDuration, difficulty }: SpinningWheelProps) => {
  const letters = word.split('');
  const radius = 120;
  
  const blurAmount = isSpinning ? (difficulty - 1) * 0.75 : 0;

  const wheelClass = useMemo(() => {
    if (!isSpinning) return '';
    return spinDuration <= 3 ? 'animate-spin-fast' : 'animate-spin-slow';
  }, [isSpinning, spinDuration]);

  return (
    <div className="flex justify-center">
      <div className="game-card rounded-3xl p-8 shadow-2xl animate-slide-up">
        <div className="relative flex items-center justify-center">
          <div 
            className={`${wheelClass} relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center rounded-full bg-gradient-to-br from-card to-muted shadow-2xl border border-border`}
            style={{ animationDuration: `${spinDuration}s` }}
            data-testid="spinning-wheel"
          >
            {letters.map((char, i) => {
              const angle = (i / letters.length) * 360;
              const transformSpin = `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
              const transformAlign = `translateX(${(i - (letters.length - 1) / 2) * 25}px) scale(1.5)`;

              return (
                <span 
                  key={i}
                  className="absolute text-4xl lg:text-5xl font-black uppercase letter-glow transition-all duration-1000"
                  style={{ 
                    color: rainbowColors[i % rainbowColors.length], 
                    transform: isSpinning ? transformSpin : transformAlign, 
                    filter: `blur(${blurAmount}px)`,
                    transition: 'transform 1s, filter 0.5s'
                  }}
                  data-testid={`wheel-letter-${i}`}
                >
                  {char}
                </span>
              );
            })}
            
            <div className="absolute w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse-glow" />
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
