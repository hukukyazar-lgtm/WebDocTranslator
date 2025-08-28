import { memo } from 'react';
import { formatTime } from '@/lib/gameUtils';

interface GameHeaderProps {
  category: string;
  difficulty: number;
  timeLeft: number;
  totalTime: number;
}

export const GameHeader = memo(({ category, difficulty, timeLeft, totalTime }: GameHeaderProps) => {
  const progressWidth = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 backdrop-blur-xl border-b border-white/20" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
    }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl lg:text-4xl font-black text-white animate-pulse-glow">
            WordSpin
            <span className="text-lg lg:text-xl ml-2 opacity-80">PRO</span>
          </h1>
          <div className="hidden sm:flex items-center gap-3">
            <div className="backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/20 bg-white/10">
              <span className="text-white/80 text-sm font-medium" data-testid="text-category">
                📂 {category}
              </span>
            </div>
            <div className="backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/20 bg-white/10">
              <span className="text-white/80 text-sm font-medium" data-testid="text-difficulty">
                ⭐ Seviye {difficulty}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/20 bg-white/10">
            <span className="text-white font-bold text-lg" data-testid="text-time-left">
              ⏱️ {formatTime(timeLeft)}
            </span>
          </div>
          <div className="w-32 h-3 backdrop-blur-lg rounded-full border border-white/20 bg-white/10 overflow-hidden">
            <div 
              className="progress-bar h-full rounded-full transition-all duration-1000 shadow-lg" 
              style={{ 
                width: `${progressWidth}%`,
                background: timeLeft > 10 
                  ? 'linear-gradient(90deg, #10b981, #3b82f6)' 
                  : 'linear-gradient(90deg, #f59e0b, #ef4444)'
              }}
              data-testid="progress-timer"
            />
          </div>
        </div>
      </div>
    </header>
  );
});

GameHeader.displayName = 'GameHeader';
