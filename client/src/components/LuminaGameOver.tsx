import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Home, Share2, Star, Zap, Clock, Trophy } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

// CodyCross style - modern, colorful, friendly, with soft shapes and vibrant colors
interface LuminaGameOverProps {
  gameSuccess: boolean;
  score: number;
  word: string;
  timeLeft: number;
  streak: number;
  category: string;
  sequentialCount?: number;
  totalCorrect?: number;
  onContinue?: () => void;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  completedWords?: number;
  totalWords?: number;
}

export const LuminaGameOver = memo(({ gameSuccess, score, word, timeLeft, streak, category, sequentialCount = 0, totalCorrect = 0, onContinue, onPlayAgain, onMainMenu, completedWords = 0, totalWords = 50 }: LuminaGameOverProps) => {
  const gameResult = {
    isWin: gameSuccess,
    score: score,
    timeRemaining: timeLeft,
    streak: streak,
    category: category,
    difficulty: "Orta",
    correctWord: word,
    totalTime: 30,
    attempts: 3
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating geometric shapes like CodyCross */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large soft circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 animate-float-slow"></div>
        <div className="absolute top-1/4 -right-16 w-32 h-32 rounded-full bg-yellow-300/20 animate-float-medium"></div>
        <div className="absolute bottom-1/4 -left-16 w-36 h-36 rounded-full bg-pink-300/15 animate-float-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-16 right-1/4 w-28 h-28 rounded-full bg-cyan-300/20 animate-float-medium" style={{ animationDelay: '2s' }}></div>
        
        {/* Small decorative elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-gentle ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Main CodyCross-style card */}
          <Card className="relative overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">
            
            {/* Colorful header section */}
            <div className="relative p-8 text-center" style={{
              background: gameResult.isWin 
                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            }}>
              {/* Floating stars animation */}
              {gameResult.isWin && (
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-ping"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: '2s'
                      }}
                    >
                      <Star className="w-4 h-4 text-white/60 fill-white/60" />
                    </div>
                  ))}
                </div>
              )}

              {/* Simple, clean CodyCross-style logo */}
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  {/* Simple colorful background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"></div>
                  <div className="absolute inset-2 bg-white rounded-full shadow-inner"></div>
                  
                  {/* Simple letter "L" for LUMINA */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-black text-purple-600">L</div>
                  </div>
                </div>
                
                {/* Clean LUMINA text */}
                <h1 className="text-3xl font-black text-white mb-2 tracking-wide">
                  LUMINA
                </h1>
                <p className="text-sm text-white/80 font-medium">Kelime Oyunu</p>
              </div>

              {/* Big result emoji and text */}
              <div className="relative">
                <div className="text-7xl mb-4 animate-bounce-gentle">
                  {gameResult.isWin ? '🎉' : '😅'}
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {gameResult.isWin ? 'Harika!' : 'Tekrar Dene!'}
                </h2>
                <p className="text-lg text-white/90 font-semibold">
                  Kelime: <span className="font-black">{gameResult.correctWord}</span>
                </p>
              </div>
            </div>

            {/* White content section */}
            <div className="p-8">
              {/* Colorful stats row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Trophy, value: gameResult.score, label: "Toplam Puan", color: "#FF6B6B", bgColor: "#FFE5E5" },
                  { icon: Zap, value: gameResult.streak, label: "Seri", color: "#4ECDC4", bgColor: "#E5F9F7" }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: stat.bgColor }}
                      >
                        <IconComponent size={28} style={{ color: stat.color }} />
                      </div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
              
              {/* Secondary stats row */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Star, value: sequentialCount, label: "Sıralı", color: "#FFA726", bgColor: "#FFF3E0" },
                  { icon: Clock, value: totalCorrect, label: "Toplam Doğru", color: "#45B7D1", bgColor: "#E5F4FD" }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div 
                        className="w-14 h-14 rounded-2xl mx-auto mb-2 flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: stat.bgColor }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <div className="text-xl font-black" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>


              {/* CodyCross-style action buttons */}
              <div className="space-y-4">
                {/* Continue button - only show if successful and under 50 words */}
                {onContinue && (
                  <Button 
                    onClick={onContinue}
                    className="w-full h-16 rounded-2xl text-xl font-black border-0 shadow-xl text-white relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <Zap className="w-6 h-6 mr-3" />
                    Devam Et ({completedWords + 1}/{totalWords})
                  </Button>
                )}
                
                {/* Play again action */}
                <Button 
                  onClick={onPlayAgain}
                  className="w-full h-16 rounded-2xl text-xl font-black border-0 shadow-xl text-white relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <RotateCcw className="w-6 h-6 mr-3" />
                  Tekrar Oyna
                </Button>
                
                {/* Secondary actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={onMainMenu}
                    className="h-14 rounded-xl font-bold border-0 shadow-lg text-white"
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    }}
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Ana Menü
                  </Button>
                  
                  <Button 
                    onClick={() => console.log('Skor paylaşıldı')}
                    className="h-14 rounded-xl font-bold border-0 shadow-lg text-white"
                    style={{
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                    }}
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>

              {/* Achievement badge like CodyCross */}
              {gameResult.isWin && gameResult.streak >= 5 && (
                <div className="mt-6 p-4 rounded-2xl relative overflow-hidden shadow-lg" style={{
                  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
                }}>
                  {/* Sparkle effects */}
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-gray-800">Yeni Başarım!</div>
                      <div className="text-gray-700 font-semibold text-sm">Seri Ustası - 5+ doğru tahmin</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

LuminaGameOver.displayName = 'LuminaGameOver';