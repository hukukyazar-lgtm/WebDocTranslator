import { memo } from 'react';

interface CountdownOverlayProps {
  timeLeft: number;
  isVisible: boolean;
}

export const CountdownOverlay = memo(({ timeLeft, isVisible }: CountdownOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 countdown-overlay">
      <div className="text-center animate-pulse-glow">
        <div 
          className="text-9xl font-black text-destructive mb-4 animate-bounce-soft" 
          style={{ textShadow: '0 0 20px currentColor, 0 0 40px currentColor' }}
          data-testid="countdown-number"
        >
          {timeLeft}
        </div>
        <div className="text-xl font-bold text-muted-foreground">
          Süre Doluyor!
        </div>
      </div>
    </div>
  );
});

CountdownOverlay.displayName = 'CountdownOverlay';
