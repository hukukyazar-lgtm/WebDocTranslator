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
  
  // Calculate dynamic spacing based on word length to prevent overflow
  const maxSpacing = 35;
  const minSpacing = 15;
  const spacing = Math.max(minSpacing, Math.min(maxSpacing, 300 / letters.length));
  
  // Calculate font size based on word length
  const getFontSize = (letterCount: number, isSpinning: boolean) => {
    if (isSpinning) {
      return intensityLevel === 'final' ? 'text-6xl lg:text-7xl' : 'text-5xl lg:text-6xl';
    }
    
    if (letterCount <= 4) return 'text-6xl lg:text-7xl';
    if (letterCount <= 6) return 'text-5xl lg:text-6xl';
    if (letterCount <= 8) return 'text-4xl lg:text-5xl';
    return 'text-3xl lg:text-4xl';
  };
  
  // Store initial colors for each letter to keep them consistent
  const letterColors = useMemo(() => {
    const baseColors = [theme.primary, theme.secondary, ...rainbowColors];
    return letters.map((_, index) => baseColors[index % baseColors.length]);
  }, [letters.length, theme.primary, theme.secondary]);

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


  return (
    <div className="flex justify-center" style={{ perspective: '1000px' }}>
      <div className="game-card rounded-3xl p-8 shadow-2xl animate-slide-up" style={{ transformStyle: 'preserve-3d' }}>
        <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {/* Enhanced outer ring particles with dynamic intensity */}
          <div className="absolute w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full" style={{ transformStyle: 'preserve-3d' }}>
            {Array.from({ length: intensityLevel === 'final' ? 24 : 12 }).map((_, i) => {
              const particleIntensity = intensityLevel === 'final' ? 1 : intensityLevel === 'critical' ? 0.8 : 0.6;
              return (
                <div
                  key={i}
                  className={`absolute rounded-full animate-pulse ${
                    intensityLevel === 'final' ? 'w-3 h-3' : 'w-2 h-2'
                  }`}
                  style={{
                    background: letterColors[i],
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * (360 / (intensityLevel === 'final' ? 24 : 12))}deg) translateY(-180px) translateX(-50%) translateZ(20px)`,
                    animationDelay: `${i * 0.05}s`,
                    opacity: particleIntensity,
                    boxShadow: intensityLevel === 'final' ? `0 0 15px ${letterColors[i]}` : 'none'
                  }}
                />
              );
            })}
          </div>

          {/* 3D Wheel Base with depth layers */}
          <div 
            className="absolute w-80 h-80 lg:w-96 lg:h-96 rounded-full"
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))`,
              transform: 'translateZ(-30px) rotateX(5deg)',
              filter: 'blur(8px)',
              opacity: 0.7
            }}
          />
          
          <div 
            className="absolute w-80 h-80 lg:w-96 lg:h-96 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}40)`,
              transform: 'translateZ(-20px) rotateX(3deg)',
              filter: 'blur(4px)',
              opacity: 0.8
            }}
          />

          <div 
            className={`${wheelClass} relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center rounded-full shadow-2xl border-8`}
            style={{ 
              animationDuration: `${spinDuration * speedMultiplier}s`,
              background: intensityLevel === 'final' 
                ? `conic-gradient(from 0deg, 
                    hsl(280, 80%, 70%) 0%, 
                    hsl(320, 90%, 65%) 25%, 
                    hsl(200, 85%, 60%) 50%, 
                    hsl(160, 75%, 55%) 75%, 
                    hsl(280, 80%, 70%) 100%)`
                : `conic-gradient(from 0deg, 
                    hsl(280, 60%, 50%) 0%, 
                    hsl(320, 70%, 45%) 25%, 
                    hsl(200, 65%, 40%) 50%, 
                    hsl(160, 55%, 35%) 75%, 
                    hsl(280, 60%, 50%) 100%)`,
              borderImage: intensityLevel === 'final'
                ? `conic-gradient(from 0deg, 
                    hsl(45, 100%, 60%) 0%, 
                    hsl(320, 100%, 70%) 25%, 
                    hsl(200, 100%, 65%) 50%, 
                    hsl(120, 100%, 55%) 75%, 
                    hsl(45, 100%, 60%) 100%) 1`
                : `conic-gradient(from 0deg, 
                    hsl(45, 80%, 50%) 0%, 
                    hsl(320, 80%, 60%) 25%, 
                    hsl(200, 80%, 55%) 50%, 
                    hsl(120, 80%, 45%) 75%, 
                    hsl(45, 80%, 50%) 100%) 1`,
              boxShadow: intensityLevel === 'final'
                ? `0 0 80px hsl(280, 80%, 70%), inset 0 0 60px hsl(320, 90%, 65%), 0 0 120px hsl(200, 85%, 60%), 0 30px 60px rgba(0,0,0,0.4)`
                : intensityLevel === 'critical'
                ? `0 0 60px hsl(280, 60%, 50%), inset 0 0 50px hsl(320, 70%, 45%), 0 20px 40px rgba(0,0,0,0.3)`
                : `0 0 40px hsl(280, 60%, 50%), inset 0 0 40px hsl(320, 70%, 45%), 0 15px 30px rgba(0,0,0,0.25)`,
              transformStyle: 'preserve-3d'
            }}
            data-testid="spinning-wheel"
          >
            {letters.map((char, i) => {
              const angle = (i / letters.length) * 360;
              const transformSpin = `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
              const transformAlign = `translateX(${(i - (letters.length - 1) / 2) * spacing}px) scale(2)`;
              const dynamicScale = getLetterScale(timeLeft, isSpinning, i);
              const letterVisibility = getLetterVisibility(timeLeft, i, letters.length);
              const fontSize = getFontSize(letters.length, isSpinning);

              return (
                <span 
                  key={i}
                  className={`absolute font-black uppercase letter-glow transition-all duration-1000 ${fontSize}`}
                  style={{ 
                    color: letterColors[i],
                    transform: isSpinning 
                      ? `${transformSpin} scale(${dynamicScale}) translateZ(15px)` 
                      : `${transformAlign} translateZ(5px)`, 
                    filter: `blur(${blurAmount}px) drop-shadow(0 0 12px ${isSpinning ? 'currentColor' : 'rgba(255,255,255,0.8)'}) drop-shadow(0 5px 10px rgba(0,0,0,0.3))`,
                    transition: 'transform 1s, filter 0.5s, opacity 0.3s, color 0.5s',
                    textShadow: isSpinning 
                      ? (intensityLevel === 'final'
                        ? `0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor, 0 5px 15px rgba(0,0,0,0.6)`
                        : `0 0 20px currentColor, 0 0 40px currentColor, 0 3px 10px rgba(0,0,0,0.5)`)
                      : `2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.7)`,
                    opacity: isSpinning ? letterVisibility : 1,
                    WebkitTextStroke: isSpinning ? 'none' : '1px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d'
                  }}
                  data-testid={`wheel-letter-${i}`}
                >
                  {char}
                </span>
              );
            })}
            
          </div>
          
        </div>
      </div>
    </div>
  );
});

SpinningWheel.displayName = 'SpinningWheel';
