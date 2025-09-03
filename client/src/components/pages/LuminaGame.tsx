import { memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Heart, Zap, Timer, HelpCircle, RotateCcw, Delete, Star } from 'lucide-react';
import { useGameStats } from '@/hooks/useGameStats';
import { useAuth } from '@/hooks/useAuth';
import { SpinningWheel } from '../game/SpinningWheel';

interface LuminaGameProps {
  gameState: {
    currentWord: string;
    guessedWord: string;
    category: string;
    difficulty: string;
    timeLeft: number;
    lives: number;
    streak: number;
    score: number;
    isSpinning: boolean;
    usedLetters: string[];
    isSequentialGuess: boolean;
    nextExpectedLetterIndex: number;
  };
  onKeyPress: (key: string) => void;
  onGameOver: (success: boolean, score: number, gameTime?: number) => void;
  onBack?: () => void;
  turkishKeyboard: string[][];
}

export const LuminaGame = memo(({ gameState, onKeyPress, onGameOver, onBack, turkishKeyboard }: LuminaGameProps) => {
  const { currentWord, guessedWord, category, difficulty, timeLeft, lives, streak, score, isSpinning, usedLetters, isSequentialGuess } = gameState;
  const { isAuthenticated } = useAuth();
  const { stats } = useGameStats();
  const scrambledLetters = currentWord.split('');
  const turkishKeyboardLayout = turkishKeyboard;
  
  // Convert difficulty string to number for SpinningWheel
  const difficultyLevel = useMemo(() => {
    switch(difficulty.toLowerCase()) {
      case 'kolay': return 1;
      case 'orta': return 2;
      case 'zor': return 3;
      default: return 2;
    }
  }, [difficulty]);

  // Calculate spinning wheel position for each letter
  const getLetterPosition = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const radius = 110;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, angle };
  };

  // Spinning animation class based on difficulty and time pressure
  const spinClass = useMemo(() => {
    if (!isSpinning) return '';
    
    // Base speed based on difficulty
    let baseSpeed = '';
    if (difficulty === 'kolay') {
      baseSpeed = 'animate-spin-slow'; // Slow for easy
    } else if (difficulty === 'orta') {
      baseSpeed = 'animate-spin'; // Medium for normal
    } else {
      baseSpeed = 'animate-spin-fast'; // Fast for hard
    }
    
    // Adjust speed based on time left (gets slower as time decreases)
    if (timeLeft <= 5) return 'animate-spin-ultra-slow';
    if (timeLeft <= 10) return 'animate-spin-very-slow'; 
    if (timeLeft <= 15) return 'animate-spin-slow';
    
    return baseSpeed;
  }, [isSpinning, timeLeft, difficulty]);

  // Get animation duration based on difficulty and time
  const getAnimationDuration = () => {
    // Time-based priority (final moments)
    if (timeLeft <= 5) return '12s';
    if (timeLeft <= 10) return '8s'; 
    if (timeLeft <= 15) return '5s';
    
    // Difficulty-based base speed
    if (difficulty === 'kolay') return '5s'; // Slow for easy
    if (difficulty === 'orta') return '3s'; // Medium for normal
    return '1.5s'; // Fast for hard
  };

  // Letter visibility based on time - more visible letters
  const getLetterOpacity = (index: number) => {
    if (!isSpinning) return 1; // Always visible when not spinning
    const timeProgress = (30 - timeLeft) / 30;
    const letterProgress = index / scrambledLetters.length;
    return timeProgress > letterProgress ? 1 : 0.6; // Increase minimum opacity
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
          <Button 
            onClick={onBack}
            variant="outline" 
            className="p-3 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            data-testid="back-button"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-1">
            {/* Lives */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart 
                key={i} 
                className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Category and Game Info Row */}
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 rounded-full font-bold text-sm">
            🐾 {category}
          </Badge>
          
          {/* Timer, Seri ve Toplam Puan - Merkez konumda */}
          <div className="flex items-center gap-2">
            {/* Toplam Puan - Sıralı bonusta parlar */}
            <Card className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-xl border-0 transition-all duration-300 ${
              isSequentialGuess 
                ? 'bg-gradient-to-r from-yellow-300 to-amber-400 animate-pulse scale-110' 
                : 'bg-gradient-to-r from-emerald-400 to-teal-500'
            }`}>
              <Star className="w-4 h-4 text-white fill-white" />
              <div className="text-sm font-black text-white">
                {(score || 0).toLocaleString()}
              </div>
              {isSequentialGuess && (
                <div className="text-xs text-white/90 font-bold">2x</div>
              )}
            </Card>
            
            {/* Seri Sayacı */}
            <Card className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-xl border-0">
              <Zap className="w-4 h-4 text-white" />
              <div className="text-lg font-black text-white">
                {streak}
              </div>
            </Card>
            
            {/* Timer */}
            <Card className="flex items-center gap-2 px-4 py-2 bg-white/95 rounded-full shadow-xl border-0">
              <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`} />
              <div className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-800'}`}>
                {timeLeft}s
              </div>
            </Card>
          </div>
          
          <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 rounded-full font-bold text-sm">
            ⚡ {difficulty}
          </Badge>
        </div>

        {/* LUMINA Spinning Wheel */}
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <div className="relative mb-8">
            <SpinningWheel
              word={currentWord}
              isSpinning={isSpinning}
              spinDuration={3000}
              difficulty={difficultyLevel}
              category={category}
              timeLeft={timeLeft}
            />
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

        {/* Turkish Keyboard - Mobile Adaptive */}
        <div className="space-y-1 sm:space-y-2 mb-4 px-2">
          {turkishKeyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1">
              {row.map((letter, letterIndex) => {
                const isUsed = usedLetters.includes(letter);
                const isCorrect = currentWord.includes(letter);
                return (
                  <Button
                    key={letterIndex}
                    onClick={() => onKeyPress(letter)}
                    className={`w-7 h-8 sm:w-8 sm:h-9 md:w-10 md:h-10 text-xs sm:text-sm font-bold rounded-lg shadow-lg transition-all duration-200 transform active:scale-95 touch-manipulation ${
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
        <div className="flex justify-center">
          <Button 
            onClick={() => console.log('İpucu kullanıldı')}
            className="px-6 h-12 rounded-2xl font-bold bg-white/20 border border-white/30 text-white hover:bg-white/30"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            İpucu
          </Button>
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
        @keyframes spin-fast {
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
        .animate-spin-fast {
          animation: spin-fast 1.5s linear infinite;
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

LuminaGame.displayName = 'LuminaGame';