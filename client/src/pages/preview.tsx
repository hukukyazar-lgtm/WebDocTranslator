import { useState } from 'react';
import { GameOverPreview } from '@/components/GameOverPreview';
import { ModernGameOver } from '@/components/ModernGameOver';
import { FuturisticGameOver } from '@/components/FuturisticGameOver';
import { CodyCrossGameOver } from '@/components/CodyCrossGameOver';
import { MonopolyGameOver } from '@/components/MonopolyGameOver';
import { Button } from '@/components/ui/button';

export default function Preview() {
  const [currentStyle, setCurrentStyle] = useState<'classic' | 'modern' | 'futuristic' | 'codycross' | 'monopoly'>('monopoly');

  return (
    <div className="relative">
      {/* Enhanced Style switcher */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-black/80 backdrop-blur-lg rounded-xl p-3 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 gap-2 min-w-[120px]">
            <Button 
              variant={currentStyle === 'monopoly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStyle('monopoly')}
              className="justify-start bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white border-yellow-500 font-bold"
            >
              💰 Monopoly GO
            </Button>
            <Button 
              variant={currentStyle === 'codycross' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStyle('codycross')}
              className="justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-blue-400 font-semibold"
            >
              🎮 CodyCross
            </Button>
            <Button 
              variant={currentStyle === 'modern' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStyle('modern')}
              className="justify-start bg-gradient-to-r from-slate-600 to-purple-600 hover:from-slate-500 hover:to-purple-500 text-white border-slate-400"
            >
              ✨ Modern
            </Button>
            <Button 
              variant={currentStyle === 'futuristic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStyle('futuristic')}
              className="justify-start bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white border-cyan-400"
            >
              🚀 Futuristik
            </Button>
            <Button 
              variant={currentStyle === 'classic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentStyle('classic')}
              className="justify-start bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              📋 Klasik
            </Button>
          </div>
        </div>
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