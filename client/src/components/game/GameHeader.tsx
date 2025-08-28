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
    <header className="fixed top-0 left-0 right-0 z-40 p-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WordSpin Pro
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded-md" data-testid="text-category">
              {category}
            </span>
            <span className="px-2 py-1 bg-accent/20 text-accent rounded-md" data-testid="text-difficulty">
              Zorluk: {difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-muted-foreground">
            <span data-testid="text-time-left">{formatTime(timeLeft)}</span>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="progress-bar h-full rounded-full transition-all duration-1000" 
              style={{ width: `${progressWidth}%` }}
              data-testid="progress-timer"
            />
          </div>
        </div>
      </div>
    </header>
  );
});

GameHeader.displayName = 'GameHeader';
