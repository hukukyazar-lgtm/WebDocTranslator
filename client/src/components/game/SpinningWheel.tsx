import { memo, useMemo } from 'react';
import { rainbowColors, getThemeForCategory, getBlurIntensity, getLetterVisibility, getLetterScale, getIntensityLevel, getWheelSpeedMultiplier } from '@/lib/gameUtils';

interface SpinningWheelProps {
  word: string;
  isSpinning: boolean;
  spinDuration: number;
  difficulty: number;
  category: string;
  timeLeft?: number;
}

export const SpinningWheel = memo(({ word, isSpinning, spinDuration, difficulty, category, timeLeft = 30 }: SpinningWheelProps) => {
  const letters = word.split('');
  const radius = 120;
  const theme = getThemeForCategory(category);
  
  const blurAmount = getBlurIntensity(difficulty, timeLeft, isSpinning);
  const intensityLevel = getIntensityLevel(timeLeft);
  const speedMultiplier = getWheelSpeedMultiplier(timeLeft);

  const wheelClass = useMemo(() => {
    if (!isSpinning) return '';
    
    // Dynamic animation based on intensity and time pressure
    if (intensityLevel === 'final') {
      return 'animate-spin-ultra-slow';
    } else if (intensityLevel === 'critical') {
      return 'animate-spin-very-slow';
    } else if (intensityLevel === 'tense') {
      return 'animate-spin-medium';
    } else {
      return spinDuration <= 3 ? 'animate-spin-fast' : 'animate-spin-slow';
    }
  }, [isSpinning, spinDuration, intensityLevel]);

  const getDynamicLetterColor = useMemo(() => (index: number) => {
    const baseColors = [theme.primary, theme.secondary, ...rainbowColors];
    return baseColors[index % baseColors.length];
  }, [theme]);

  return (
    <div className="flex justify-center">
      <div className="game-card rounded-3xl p-8 shadow-2xl animate-slide-up">
        <div className="relative flex items-center justify-center">
          {/* Enhanced outer ring particles with dynamic intensity */}
          <div className="absolute w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full">
            {Array.from({ length: intensityLevel === 'final' ? 24 : 12 }).map((_, i) => {
              const particleIntensity = intensityLevel === 'final' ? 1 : intensityLevel === 'critical' ? 0.8 : 0.6;
              return (
                <div
                  key={i}
                  className={`absolute rounded-full animate-pulse ${
                    intensityLevel === 'final' ? 'w-3 h-3' : 'w-2 h-2'
                  }`}
                  style={{
                    background: getDynamicLetterColor(i),
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * (360 / (intensityLevel === 'final' ? 24 : 12))}deg) translateY(-180px) translateX(-50%)`,
                    animationDelay: `${i * 0.05}s`,
                    opacity: particleIntensity,
                    boxShadow: intensityLevel === 'final' ? `0 0 15px ${getDynamicLetterColor(i)}` : 'none'
                  }}
                />
              );
            })}
          </div>

          <div 
            className={`${wheelClass} relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center rounded-full shadow-2xl border-2`}
            style={{ 
              animationDuration: `${spinDuration * speedMultiplier}s`,
              background: intensityLevel === 'final' 
                ? `conic-gradient(from 0deg, ${theme.primary}60, ${theme.secondary}60, ${theme.primary}60)`
                : `conic-gradient(from 0deg, ${theme.primary}20, ${theme.secondary}20, ${theme.primary}20)`,
              borderColor: theme.primary,
              boxShadow: intensityLevel === 'final'
                ? `0 0 80px ${theme.primary}80, inset 0 0 60px ${theme.secondary}40, 0 0 120px ${theme.primary}60`
                : intensityLevel === 'critical'
                ? `0 0 60px ${theme.primary}60, inset 0 0 50px ${theme.secondary}30`
                : `0 0 40px ${theme.primary}40, inset 0 0 40px ${theme.secondary}20`
            }}
            data-testid="spinning-wheel"
          >
            {letters.map((char, i) => {
              const angle = (i / letters.length) * 360;
              const transformSpin = `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
              const transformAlign = `translateX(${(i - (letters.length - 1) / 2) * 25}px) scale(1.5)`;
              const dynamicScale = getLetterScale(timeLeft, isSpinning, i);
              const letterVisibility = getLetterVisibility(timeLeft, i, letters.length);

              return (
                <span 
                  key={i}
                  className={`absolute font-black uppercase letter-glow transition-all duration-1000 ${
                    intensityLevel === 'final' ? 'text-5xl lg:text-6xl' : 'text-4xl lg:text-5xl'
                  }`}
                  style={{ 
                    color: getDynamicLetterColor(i),
                    transform: isSpinning 
                      ? `${transformSpin} scale(${dynamicScale})` 
                      : `${transformAlign}`, 
                    filter: `blur(${blurAmount}px) drop-shadow(0 0 8px currentColor)`,
                    transition: 'transform 1s, filter 0.5s, opacity 0.3s',
                    textShadow: intensityLevel === 'final'
                      ? `0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor`
                      : `0 0 20px currentColor, 0 0 40px currentColor`,
                    opacity: isSpinning ? letterVisibility : 1
                  }}
                  data-testid={`wheel-letter-${i}`}
                >
                  {char}
                </span>
              );
            })}
            
            {/* Enhanced center emblem with dynamic effects */}
            {isSpinning && (
              <div 
                className={`absolute rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow border-2 ${
                  intensityLevel === 'final' ? 'w-20 h-20' : 'w-16 h-16'
                }`}
                style={{
                  background: intensityLevel === 'final'
                    ? `radial-gradient(circle, ${theme.primary}, ${theme.secondary}, ${theme.primary})`
                    : `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                  borderColor: theme.primary,
                  boxShadow: intensityLevel === 'final'
                    ? `0 0 40px ${theme.primary}80, 0 0 80px ${theme.secondary}60`
                    : `0 0 20px ${theme.primary}60`,
                  animation: intensityLevel === 'final' ? 'pulse 0.5s infinite' : 'pulse 2s infinite'
                }}
              >
                <div 
                  className={`font-black text-white ${
                    intensityLevel === 'final' ? 'text-3xl' : 'text-2xl'
                  }`}
                  style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
                >
                  🇹🇷
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
});

SpinningWheel.displayName = 'SpinningWheel';
