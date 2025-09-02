import { memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Heart, Zap, Timer, HelpCircle, RotateCcw } from 'lucide-react';

export const CodyCrossGame = memo(() => {
  const currentWord = "KAPLAN";
  const guessedWord = "K_P___"; // Player's current guess
  const scrambledLetters = currentWord.split('');
  const category = "Hayvanlar";
  const difficulty = "Orta";
  const timeLeft = 23;
  const lives = 2;
  const streak = 5;
  const isSpinning = true;

  // Turkish keyboard layout
  const turkishKeyboardLayout = [
    ['Q','W','E','R','T','Y','U','I','O','P','Ğ','Ü'],
    ['A','S','D','F','G','H','J','K','L','Ş','İ'],
    ['Z','X','C','V','B','N','M','Ö','Ç']
  ];

  // Calculate spinning wheel position for each letter
  const getLetterPosition = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const radius = 110;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, angle };
  };

  // Spinning animation class based on time pressure
  const spinClass = useMemo(() => {
    if (!isSpinning) return '';
    if (timeLeft <= 5) return 'animate-spin-ultra-slow';
    if (timeLeft <= 10) return 'animate-spin-very-slow'; 
    if (timeLeft <= 15) return 'animate-spin-slow';
    return 'animate-spin';
  }, [isSpinning, timeLeft]);

  // Letter visibility based on time
  const getLetterOpacity = (index: number) => {
    const timeProgress = (30 - timeLeft) / 30;
    const letterProgress = index / scrambledLetters.length;
    return timeProgress > letterProgress ? 1 : 0.3;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-4">
        {/* Game header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" className="p-3 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-3">
            {/* Lives */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-white/30'}`}
                />
              ))}
            </div>
            
            {/* Streak */}
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold text-sm">{streak}</span>
            </div>
          </div>
        </div>

        {/* Category and Timer Row */}
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 rounded-full font-bold text-sm">
            🐾 {category}
          </Badge>
          
          {/* Timer - Central and prominent */}
          <Card className="flex items-center gap-2 px-4 py-2 bg-white/95 rounded-full shadow-xl border-0">
            <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`} />
            <div className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-800'}`}>
              {timeLeft}s
            </div>
          </Card>
          
          <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 rounded-full font-bold text-sm">
            ⚡ {difficulty}
          </Badge>
        </div>

        {/* LUMINA Spinning Wheel */}
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <div className="relative w-64 h-64 mb-8">
            {/* Invisible wheel container */}
            <div className={`absolute inset-0 ${spinClass}`} 
                 style={{ 
                   filter: isSpinning ? `blur(${timeLeft <= 5 ? 1 : timeLeft <= 10 ? 2 : 3}px)` : 'none',
                   animationDuration: isSpinning ? `${timeLeft <= 5 ? 8 : timeLeft <= 10 ? 5 : 3}s` : '0s'
                 }}>
              {scrambledLetters.map((letter, index) => {
                const position = getLetterPosition(index, scrambledLetters.length);
                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      opacity: getLetterOpacity(index),
                      transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * 0.01 + index) * 0.1})`,
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${
                          index % 4 === 0 ? '#4facfe, #00f2fe' :
                          index % 4 === 1 ? '#43e97b, #38f9d7' :
                          index % 4 === 2 ? '#fa709a, #fee140' :
                          '#667eea, #764ba2'
                        })`
                      }}
                    >
                      {letter}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Center pulse effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/80 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>

          {/* Word guess display */}
          <div className="flex gap-2 mb-8">
            {currentWord.split('').map((letter, index) => {
              const guessed = guessedWord[index] !== '_';
              return (
                <Card key={index} className="w-14 h-14 bg-white rounded-2xl shadow-xl border-0 flex items-center justify-center">
                  <div className={`text-2xl font-black ${guessed ? 'text-gray-800' : 'text-gray-300'}`}>
                    {guessed ? letter : '?'}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Turkish Keyboard - CodyCross Style */}
        <div className="space-y-2 mb-4">
          {turkishKeyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((letter, letterIndex) => {
                const isUsed = guessedWord.includes(letter);
                const isCorrect = currentWord.includes(letter);
                return (
                  <Button
                    key={letterIndex}
                    className={`w-8 h-8 text-sm font-bold rounded-lg shadow-lg transition-all duration-200 transform active:scale-95 ${
                      isUsed 
                        ? isCorrect 
                          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white border-0'
                          : 'bg-gradient-to-br from-red-400 to-red-600 text-white border-0'
                        : 'bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white border-0'
                    }`}
                  >
                    {letter}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 h-12 rounded-2xl font-bold bg-white/20 border border-white/30 text-white hover:bg-white/30">
            <HelpCircle className="w-4 h-4 mr-2" />
            İpucu
          </Button>
          
          <Button className="flex-1 h-12 rounded-2xl font-bold bg-white/20 border border-white/30 text-white hover:bg-white/30">
            <RotateCcw className="w-4 h-4 mr-2" />
            Çevir
          </Button>
          
          <Button className="flex-1 h-12 rounded-2xl text-lg font-black text-white shadow-xl" style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
          }}>
            Tahmin Et
          </Button>
        </div>

        {/* Word hint */}
        <div className="text-center mt-4">
          <Card className="inline-block px-4 py-2 bg-white/90 rounded-2xl shadow-lg border-0">
            <p className="text-gray-700 font-semibold text-sm">
              "Çizgili büyük kedi türü"
            </p>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-12px); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ultra-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }
        .animate-spin-very-slow {
          animation: spin-very-slow 8s linear infinite;
        }
        .animate-spin-ultra-slow {
          animation: spin-ultra-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
});

CodyCrossGame.displayName = 'CodyCrossGame';