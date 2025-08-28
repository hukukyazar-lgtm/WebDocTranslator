import { memo } from 'react';
import { formatTime } from '@/lib/gameUtils';

interface GameStatsProps {
  score: number;
  streak: number;
  correctGuesses: number;
  averageTime: number;
}

export const GameStats = memo(({ score, streak, correctGuesses, averageTime }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <div className="game-card rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-primary" data-testid="stat-score">
          {score}
        </div>
        <div className="text-sm text-muted-foreground">Puan</div>
      </div>
      <div className="game-card rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-accent" data-testid="stat-streak">
          {streak}
        </div>
        <div className="text-sm text-muted-foreground">Seri</div>
      </div>
      <div className="game-card rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-secondary" data-testid="stat-correct">
          {correctGuesses}
        </div>
        <div className="text-sm text-muted-foreground">Doğru</div>
      </div>
      <div className="game-card rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-muted-foreground" data-testid="stat-avg-time">
          {formatTime(averageTime)}
        </div>
        <div className="text-sm text-muted-foreground">Ort. Süre</div>
      </div>
    </div>
  );
});

GameStats.displayName = 'GameStats';
