import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Heart, Zap, Timer, HelpCircle } from 'lucide-react';

export const CodyCrossGame = memo(() => {
  const currentWord = "KAPLAN";
  const scrambledLetters = ["K", "A", "P", "L", "A", "N"];
  const category = "Hayvanlar";
  const difficulty = "Orta";
  const timeLeft = 23;
  const lives = 2;
  const streak = 5;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 8 + 6}px`,
              height: `${Math.random() * 8 + 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-6">
        {/* Game header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="p-3 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-white/30'}`}
                />
              ))}
            </div>
            
            {/* Streak */}
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold">{streak}</span>
            </div>
          </div>
        </div>

        {/* Category and difficulty */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 rounded-full font-bold">
              🐾 {category}
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 rounded-full font-bold">
              ⚡ {difficulty}
            </Badge>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <Card className="inline-flex items-center gap-3 p-4 bg-white/95 rounded-2xl shadow-xl border-0">
            <Timer className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-3xl font-black text-gray-800">{timeLeft}s</div>
              <div className="text-sm text-gray-600 font-semibold">Kalan Süre</div>
            </div>
          </Card>
        </div>

        {/* Word display area */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
          {/* Answer boxes */}
          <div className="flex gap-3 mb-12">
            {currentWord.split('').map((letter, index) => (
              <Card key={index} className="w-16 h-16 bg-white rounded-2xl shadow-xl border-0 flex items-center justify-center">
                <div className="text-2xl font-black text-gray-800">{letter}</div>
              </Card>
            ))}
          </div>

          {/* Letter tiles */}
          <div className="grid grid-cols-3 gap-4 max-w-xs">
            {scrambledLetters.map((letter, index) => (
              <Card key={index} className="relative group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-xl flex items-center justify-center transform transition-all duration-200 hover:scale-105 active:scale-95">
                  <div className="text-2xl font-black text-white">{letter}</div>
                </div>
                {/* Tap effect */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-100"></div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom action buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Button className="h-14 rounded-2xl font-bold bg-white/20 border border-white/30 text-white hover:bg-white/30">
            <HelpCircle className="w-5 h-5 mr-2" />
            İpucu
          </Button>
          
          <Button className="h-14 rounded-2xl text-xl font-black text-white shadow-xl" style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
          }}>
            Karıştır
          </Button>
          
          <Button className="h-14 rounded-2xl font-bold bg-white/20 border border-white/30 text-white hover:bg-white/30">
            Geç
          </Button>
        </div>

        {/* Word hint */}
        <div className="text-center mt-6">
          <Card className="inline-block p-4 bg-white/90 rounded-2xl shadow-lg border-0">
            <p className="text-gray-700 font-semibold">
              "Çizgili büyük kedi türü"
            </p>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-15px); opacity: 1; }
        }
      `}</style>
    </div>
  );
});

CodyCrossGame.displayName = 'CodyCrossGame';