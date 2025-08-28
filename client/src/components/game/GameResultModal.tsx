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
}

export const GameResultModal = memo(({ 
  isVisible, 
  isSuccess, 
  title, 
  message, 
  scoreGained, 
  totalScore, 
  onPlayAgain, 
  onMainMenu 
}: GameResultModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 animate-scale-in">
      <div className="game-card rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl border-2 border-accent">
        <div className="space-y-6">
          <div className="text-6xl animate-bounce-soft">
            {isSuccess ? '🎉' : '😔'}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-accent" data-testid="result-title">
              {title}
            </h2>
            <p className="text-muted-foreground" data-testid="result-message">
              {message}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="score-gained">
                {isSuccess ? `+${scoreGained}` : '0'}
              </div>
              <div className="text-sm text-muted-foreground">
                {isSuccess ? 'Bonus Puan' : 'Puan'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary" data-testid="total-score">
                {totalScore}
              </div>
              <div className="text-sm text-muted-foreground">Toplam Puan</div>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full py-3 px-6 bg-accent hover:bg-accent/80 text-accent-foreground font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              data-testid="button-play-again"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onMainMenu}
              className="w-full py-3 px-6 bg-muted hover:bg-muted/80 text-muted-foreground font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              data-testid="button-main-menu"
            >
              Ana Menü
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

GameResultModal.displayName = 'GameResultModal';
