import { memo } from 'react';

interface GameResultModalProps {
  isVisible: boolean;
  isSuccess: boolean;
  title: string;
  message: string;
  scoreGained: number;
  totalScore: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  onContinue?: () => void;
}

export const GameResultModal = memo(({ 
  isVisible, 
  isSuccess, 
  title, 
  message, 
  scoreGained, 
  totalScore, 
  onPlayAgain, 
  onMainMenu,
  onContinue 
}: GameResultModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50 animate-scale-in p-3 sm:p-4" style={{
      background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(30,30,60,0.9))'
    }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30 animate-pulse"
            style={{
              background: isSuccess 
                ? `linear-gradient(45deg, #10b981, #3b82f6)` 
                : `linear-gradient(45deg, #ef4444, #f59e0b)`,
              width: Math.random() * 40 + 15,
              height: Math.random() * 40 + 15,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-lg w-full text-center shadow-2xl border border-white/20" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
      }}>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Success/Failure Icon with glow effect */}
          <div className="relative">
            <div 
              className="absolute inset-0 blur-3xl opacity-50 rounded-full"
              style={{
                background: isSuccess 
                  ? 'radial-gradient(circle, #10b98140, transparent)' 
                  : 'radial-gradient(circle, #ef444440, transparent)'
              }}
            />
            <div className="relative text-5xl sm:text-6xl lg:text-8xl animate-bounce-soft">
              {isSuccess ? '🎉' : '💫'}
            </div>
          </div>
          
          {/* Title and Message */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-black animate-pulse-glow"
              style={{
                background: isSuccess 
                  ? 'linear-gradient(45deg, #10b981, #ffffff, #3b82f6)' 
                  : 'linear-gradient(45deg, #ef4444, #ffffff, #f59e0b)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradient 3s ease infinite'
              }}
              data-testid="result-title"
            >
              {title}
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl font-medium text-white/80" data-testid="result-message">
              {message}
            </p>
          </div>
          
          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">{isSuccess ? '💎' : '💔'}</div>
              <div 
                className="text-xl sm:text-2xl lg:text-3xl font-black mb-1"
                style={{
                  background: isSuccess ? 'linear-gradient(45deg, #10b981, #3b82f6)' : 'linear-gradient(45deg, #ef4444, #f59e0b)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
                data-testid="score-gained"
              >
                {isSuccess ? `+${scoreGained}` : '0'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white/60">
                {isSuccess ? 'Bonus Puan' : 'Puan'}
              </div>
            </div>
            
            <div className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">🏆</div>
              <div 
                className="text-xl sm:text-2xl lg:text-3xl font-black mb-1"
                style={{
                  background: 'linear-gradient(45deg, #8b5cf6, #a855f7)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
                data-testid="total-score"
              >
                {totalScore}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white/60">Toplam Puan</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {isSuccess && onContinue && (
              <button
                onClick={onContinue}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-sm sm:text-base font-black rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-blue-500/50 text-white shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                }}
                data-testid="button-continue"
              >
                ⚡ Devam Et
              </button>
            )}
            <button
              onClick={onPlayAgain}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-sm sm:text-base font-black rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-green-500/50 text-white shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.3))',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
              }}
              data-testid="button-play-again"
            >
              🚀 Tekrar Oyna
            </button>
            <button
              onClick={onMainMenu}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-sm sm:text-base font-black rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-white/30 bg-white/10 text-white/90 hover:bg-white/20 shadow-lg"
              data-testid="button-main-menu"
            >
              🏠 Ana Menü
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

GameResultModal.displayName = 'GameResultModal';
