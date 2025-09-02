import { memo, useMemo, useEffect, useState } from 'react';
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
  
  // Animation state for progressive difficulty
  const [animationFrame, setAnimationFrame] = useState(0);
  
  useEffect(() => {
    if (!isSpinning) return;
    
    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
    }, 50); // Update every 50ms for smooth animations
    
    return () => clearInterval(interval);
  }, [isSpinning]);
  
  const blurAmount = getBlurIntensity(difficulty, timeLeft, isSpinning);
  const intensityLevel = getIntensityLevel(timeLeft);
  const speedMultiplier = getWheelSpeedMultiplier(timeLeft);
  
  // Calculate dynamic spacing based on word length to prevent overlap
  const getSpacing = () => {
    if (letters.length <= 4) return 35;
    if (letters.length <= 6) return 30;
    if (letters.length <= 8) return 25;
    if (letters.length <= 10) return 20;
    if (letters.length <= 12) return 15;
    if (letters.length <= 15) return 12;
    return 8; // For very long words
  };
  const spacing = getSpacing();
  
  // Progressive difficulty letter transform system
  const getLetterTransform = (
    index: number, 
    baseAngle: number, 
    letterSpacing: number, 
    baseRadius: number, 
    letterScale: number, 
    rotation: number,
    difficulty: number,
    isSpinning: boolean
  ) => {
    const baseTransform = `rotate(${baseAngle + (index * letterSpacing) + rotation}deg) translate(${baseRadius}px) rotate(-${baseAngle + (index * letterSpacing) + rotation}deg) scale(${letterScale})`;
    
    if (!isSpinning) {
      return `rotate(${baseAngle + (index * letterSpacing)}deg) translate(${baseRadius}px) rotate(-${baseAngle + (index * letterSpacing)}deg) scale(${letterScale})`;
    }
    
    // Easy level (1): Normal wheel rotation only
    if (difficulty === 1) {
      return baseTransform;
    }
    
    // Medium level (2): Individual letter rotation + wheel rotation  
    if (difficulty === 2) {
      const letterRotation = (rotation * 2) + (index * 45); // Individual rotation speed
      return `rotate(${baseAngle + (index * letterSpacing) + rotation}deg) translate(${baseRadius}px) rotate(${letterRotation}deg) scale(${letterScale})`;
    }
    
    // Hard level (3): Position shuffling based on wheel speed
    if (difficulty === 3) {
      const speedFactor = Math.abs(rotation % 360) / 360; // Speed as 0-1
      const shuffle = Math.sin((rotation * 0.02) + (index * 0.5)) * 30 * speedFactor; // Position offset
      const newRadius = baseRadius + shuffle;
      return `rotate(${baseAngle + (index * letterSpacing) + rotation}deg) translate(${newRadius}px) rotate(-${baseAngle + (index * letterSpacing) + rotation}deg) scale(${letterScale})`;
    }
    
    return baseTransform;
  };
  
  // Calculate font size based on word length - extremely aggressive scaling for long words
  const getFontSize = (letterCount: number, isSpinning: boolean) => {
    if (isSpinning) {
      // Spinning state - smaller for longer words
      if (letterCount > 15) return 'text-xl lg:text-2xl';
      if (letterCount > 12) return 'text-2xl lg:text-3xl';
      if (letterCount > 8) return 'text-3xl lg:text-4xl';
      return intensityLevel === 'final' ? 'text-6xl lg:text-7xl' : 'text-5xl lg:text-6xl';
    }
    
    // Revealed state - extremely aggressive scaling
    if (letterCount <= 3) return 'text-5xl lg:text-6xl';
    if (letterCount <= 5) return 'text-4xl lg:text-5xl';
    if (letterCount <= 7) return 'text-3xl lg:text-4xl';
    if (letterCount <= 9) return 'text-2xl lg:text-3xl';
    if (letterCount <= 12) return 'text-xl lg:text-2xl';
    if (letterCount <= 15) return 'text-lg lg:text-xl';
    if (letterCount <= 18) return 'text-base lg:text-lg';
    return 'text-sm lg:text-base';
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

          {/* Floating sparkle particles */}
          <div className="absolute w-[30rem] h-[30rem] lg:w-[35rem] lg:h-[35rem] rounded-full pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute animate-float-sparkle"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-250px) translateX(-50%)`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '4s'
                }}
              >
                <div 
                  className="text-2xl opacity-70"
                  style={{
                    filter: `drop-shadow(0 0 8px ${theme.primary})`,
                    animation: `sparkle-twinkle 2s ease-in-out infinite ${i * 0.2}s`
                  }}
                >
                  ✨
                </div>
              </div>
            ))}
          </div>

          {/* Orbiting light particles */}
          <div className="absolute w-[32rem] h-[32rem] lg:w-[38rem] lg:h-[38rem] rounded-full pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`orbit-${i}`}
                className="absolute animate-orbit-slow"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateY(-270px) translateX(-50%)`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${8 + i}s`
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${theme.secondary}, transparent)`,
                    boxShadow: `0 0 12px ${theme.secondary}, 0 0 24px ${theme.secondary}40`,
                    opacity: 0.8
                  }}
                />
              </div>
            ))}
          </div>

          {/* 3D Wheel Base with depth layers */}
          <div 
            className="absolute w-80 h-80 lg:w-96 lg:h-96 rounded-full"
            style={{
              background: `transparent`,
              transform: 'translateZ(-30px) rotateX(5deg)',
              filter: 'blur(8px)',
              opacity: 0
            }}
          />
          
          <div 
            className="absolute w-80 h-80 lg:w-96 lg:h-96 rounded-full"
            style={{
              background: `transparent`,
              transform: 'translateZ(-20px) rotateX(3deg)',
              filter: 'blur(4px)',
              opacity: 0
            }}
          />

          <div 
            className={`${wheelClass} relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center rounded-full`}
            style={{ 
              animationDuration: `${spinDuration * speedMultiplier}s`,
              background: `transparent`,
              border: 'none',
              boxShadow: 'none',
              transformStyle: 'preserve-3d'
            }}
            data-testid="spinning-wheel"
          >
            {letters.map((char, i) => {
              const angle = (i / letters.length) * 360;
              const baseAngle = angle;
              const letterSpacing = 360 / letters.length;
              
              // Much more aggressive scale reduction for long words
              const getScaleFactor = () => {
                if (letters.length <= 4) return 2;
                if (letters.length <= 6) return 1.8;
                if (letters.length <= 8) return 1.5;
                if (letters.length <= 10) return 1.2;
                if (letters.length <= 12) return 1;
                if (letters.length <= 15) return 0.8;
                return 0.6; // Very small for long words
              };
              const scaleFactor = getScaleFactor();
              const transformAlign = `translateX(${(i - (letters.length - 1) / 2) * spacing}px) scale(${scaleFactor})`;
              const dynamicScale = getLetterScale(timeLeft, isSpinning, i);
              const letterVisibility = getLetterVisibility(timeLeft, i, letters.length, difficulty);
              const fontSize = getFontSize(letters.length, isSpinning);

              // Simple transform - back to original working system
              const finalTransform = isSpinning 
                ? `rotate(${baseAngle}deg) translate(${radius}px) rotate(-${baseAngle}deg) scale(${dynamicScale}) translateZ(15px)`
                : `${transformAlign} translateZ(5px)`;
                
              // Debug difficulty value
              if (i === 0) { // Only log once per render
                console.log('SpinningWheel DEBUG:', { difficulty, isSpinning, category });
              }
              
              // Test: Always show red for medium difficulty
              const getLetterColor = () => {
                if (difficulty === 2 && isSpinning) {
                  console.log(`Letter ${i} should be RED: difficulty=${difficulty}, isSpinning=${isSpinning}`);
                  return '#ff0000'; // Always red to test
                }
                return letterColors[i];
              };

              return (
                <span 
                  key={i}
                  className={`absolute font-sans font-semibold uppercase letter-glow ${fontSize}`}
                  style={{ 
                    letterSpacing: letters.length > 10 ? '-0.05em' : letters.length > 8 ? '-0.02em' : '0',
                    color: getLetterColor(),
                    transform: finalTransform, 
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
            
            {/* Enhanced 3D center emblem with dynamic effects */}
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
                    ? `0 0 40px ${theme.primary}80, 0 0 80px ${theme.secondary}60, 0 10px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)`
                    : `0 0 20px ${theme.primary}60, 0 6px 12px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.2)`,
                  animation: intensityLevel === 'final' ? 'pulse 0.5s infinite' : 'pulse 2s infinite',
                  transform: 'translateZ(25px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className={`font-black text-white ${
                    intensityLevel === 'final' ? 'text-3xl' : 'text-2xl'
                  }`}
                  style={{ 
                    textShadow: '0 0 10px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                    transform: 'translateZ(5px)'
                  }}
                >
                  ✨
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
