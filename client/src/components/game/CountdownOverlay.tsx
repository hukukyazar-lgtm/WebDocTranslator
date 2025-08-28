import { memo } from 'react';

interface CountdownOverlayProps {
  timeLeft: number;
  isVisible: boolean;
}

export const CountdownOverlay = memo(({ timeLeft, isVisible }: CountdownOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 pointer-events-none z-50">
      <div className="game-card rounded-2xl p-4 shadow-xl border-2 border-destructive animate-pulse-glow">
        <div className="text-center">
          <div 
            className="text-4xl font-black text-destructive mb-2 animate-bounce-soft" 
            style={{ textShadow: '0 0 10px currentColor' }}
            data-testid="countdown-number"
          >
            {timeLeft}
          </div>
          <div className="text-sm font-bold text-destructive">
            Süre Doluyor!
          </div>
        </div>
      </div>
    </div>
  );
});

CountdownOverlay.displayName = 'CountdownOverlay';
