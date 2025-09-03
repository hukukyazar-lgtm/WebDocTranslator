import { memo } from 'react';

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
  
  // LuminaGame CSS tasarımı - gradient kutular
  const getLetterGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)', 
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #667eea, #764ba2)'
    ];
    return gradients[index % 4];
  };

  // Calculate position for each letter in a circle
  const getLetterPosition = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const radius = 110;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, angle };
  };

  return (
    <div className="relative w-64 h-64">
      {/* Simple gradient wheel */}
      <div className={`absolute inset-0 ${isSpinning ? 'animate-spin' : ''}`} 
           style={{ 
             animationDuration: isSpinning ? '3s' : '0s'
           }}>
        {letters.map((letter, index) => {
          const position = getLetterPosition(index, letters.length);
          return (
            <div
              key={`${letter}-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * 0.002 + index) * 0.1})`,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-2xl border border-white/20"
                style={{
                  background: getLetterGradient(index)
                }}
              >
                {letter || '?'}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Center pulse effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-white/80 rounded-full animate-pulse shadow-lg"></div>
      </div>
    </div>
  );
});

SpinningWheel.displayName = 'SpinningWheel';