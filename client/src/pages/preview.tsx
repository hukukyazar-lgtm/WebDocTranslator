import { useState } from 'react';
import { GameOverPreview } from '@/components/GameOverPreview';
import { ModernGameOver } from '@/components/ModernGameOver';
import { FuturisticGameOver } from '@/components/FuturisticGameOver';
import { CodyCrossGameOver } from '@/components/CodyCrossGameOver';
import { MonopolyGameOver } from '@/components/MonopolyGameOver';
import { Button } from '@/components/ui/button';

export default function Preview() {
  const [currentStyle, setCurrentStyle] = useState<'classic' | 'modern' | 'futuristic' | 'codycross' | 'monopoly'>('codycross');

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
        <Button 
          variant={currentStyle === 'codycross' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentStyle('codycross')}
          className="backdrop-blur-sm"
        >
          CodyCross
        </Button>
        <Button 
          variant={currentStyle === 'monopoly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentStyle('monopoly')}
          className="backdrop-blur-sm"
        >
          Monopoly GO
        </Button>
      </div>

      {/* Render selected style */}
      {currentStyle === 'classic' && <GameOverPreview />}
      {currentStyle === 'modern' && <ModernGameOver />}
      {currentStyle === 'futuristic' && <FuturisticGameOver />}
      {currentStyle === 'codycross' && <CodyCrossGameOver />}
      {currentStyle === 'monopoly' && <MonopolyGameOver />}
    </div>
  );
}