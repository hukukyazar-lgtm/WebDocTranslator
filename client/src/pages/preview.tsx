import { useState } from 'react';
import { GameOverPreview } from '@/components/GameOverPreview';
import { ModernGameOver } from '@/components/ModernGameOver';
import { FuturisticGameOver } from '@/components/FuturisticGameOver';
import { Button } from '@/components/ui/button';

export default function Preview() {
  const [currentStyle, setCurrentStyle] = useState<'classic' | 'modern' | 'futuristic'>('modern');

  return (
    <div className="relative">
      {/* Style switcher */}
      <div className="fixed top-4 left-4 z-50 space-x-2">
        <Button 
          variant={currentStyle === 'classic' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentStyle('classic')}
          className="backdrop-blur-sm"
        >
          Klasik
        </Button>
        <Button 
          variant={currentStyle === 'modern' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentStyle('modern')}
          className="backdrop-blur-sm"
        >
          Modern
        </Button>
        <Button 
          variant={currentStyle === 'futuristic' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentStyle('futuristic')}
          className="backdrop-blur-sm"
        >
          Futuristik
        </Button>
      </div>

      {/* Render selected style */}
      {currentStyle === 'classic' && <GameOverPreview />}
      {currentStyle === 'modern' && <ModernGameOver />}
      {currentStyle === 'futuristic' && <FuturisticGameOver />}
    </div>
  );
}