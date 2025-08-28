import { memo } from 'react';
import { formatTime } from '@/lib/gameUtils';

const categoryIcons: Record<string, string> = {
  'Hayvanlar': '🦁',
  'Yiyecek': '🍎',
  'Bilim': '🧪',
  'Ülkeler': '🌍',
  'Meslekler': '👨‍💼',
  'Şehirler': '🏙️',
  'Markalar': '🏷️',
  'Spor Dalları': '⚽',
  'Eşyalar': '🪑',
  'Filmler': '🎬'
};

interface GameHeaderProps {
  category: string;
  difficulty: number;
  timeLeft: number;
  totalTime: number;
}

export const GameHeader = memo(({ category, difficulty, timeLeft, totalTime }: GameHeaderProps) => {
  const progressWidth = ((totalTime - timeLeft) / totalTime) * 100;
  const categoryIcon = categoryIcons[category] || '📂';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 backdrop-blur-xl border-b border-white/20" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
    }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))'
              }}
            >
              <span className="text-2xl animate-pulse">🌟</span>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-2">
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #3b82f6, #ffffff, #8b5cf6)',
                    backgroundSize: '200% auto',
                    animation: 'gradient 3s ease infinite'
                  }}
                >
                  WORD
                </span>
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #8b5cf6, #ffffff, #3b82f6)',
                    backgroundSize: '200% auto',
                    animation: 'gradient 3s ease infinite 0.3s'
                  }}
                >
                  SPIN
                </span>
              </h1>
              <div className="text-xs font-bold text-white/60">⚡ PRO EDITION</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="backdrop-blur-lg rounded-xl sm:rounded-2xl px-2 py-1 sm:px-4 sm:py-2 border border-white/20 bg-white/10">
              <span className="text-white text-xs sm:text-sm font-bold" data-testid="text-category">
                {categoryIcon} {category}
              </span>
            </div>
            <div className="backdrop-blur-lg rounded-xl sm:rounded-2xl px-2 py-1 sm:px-4 sm:py-2 border border-white/20 bg-white/10">
              <span className="text-white text-xs sm:text-sm font-bold" data-testid="text-difficulty">
                ⭐ {difficulty}
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
