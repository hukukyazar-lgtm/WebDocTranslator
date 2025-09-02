import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Home, Share2, Star, Zap, Clock, Trophy } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

// Monopoly GO style - luxurious, golden, rich colors with premium feel
export const MonopolyGameOver = memo(() => {
  const gameResult = {
    isWin: true,
    score: 2450,
    timeRemaining: 18,
    streak: 7,
    category: "Hayvanlar",
    difficulty: "Orta",
    correctWord: "KAPLAN",
    totalTime: 30,
    attempts: 3
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1a365d 0%, #2d3748 50%, #1a202c 100%)'
    }}>
      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Golden ornate patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-yellow-400 rounded-full animate-spin-slow"></div>
          <div className="absolute top-20 right-16 w-24 h-24 border-2 border-amber-300 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-16 left-20 w-28 h-28 border-3 border-orange-400 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-yellow-500 rotate-12 animate-bounce-gentle"></div>
        </div>
        
        {/* Floating money symbols */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400/20 text-2xl animate-float-gentle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            >
              {['💰', '💎', '🏆', '⭐', '🎯'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Luxury Monopoly GO style card */}
          <Card className="relative overflow-hidden border-0 shadow-2xl" style={{
            background: 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)',
            borderRadius: '24px'
          }}>
            
            {/* Golden header with premium styling */}
            <div className="relative p-8 text-center" style={{
              background: gameResult.isWin 
                ? 'linear-gradient(135deg, #d69e2e 0%, #f6e05e 50%, #d69e2e 100%)'
                : 'linear-gradient(135deg, #e53e3e 0%, #fc8181 50%, #e53e3e 100%)'
            }}>
              {/* Ornate border effect */}
              <div className="absolute inset-0 border-4 border-yellow-300/30 rounded-t-3xl"></div>
              
              {/* Floating money rain for wins */}
              {gameResult.isWin && (
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-ping text-yellow-200"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: '3s'
                      }}
                    >
                      {['💰', '💎', '🏆'][Math.floor(Math.random() * 3)]}
                    </div>
                  ))}
                </div>
              )}

              {/* Premium logo design */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  {/* Luxury golden frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 rounded-full shadow-2xl animate-pulse"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 rounded-full opacity-90"></div>
                  <div className="absolute inset-3 bg-white rounded-full shadow-inner"></div>
                  
                  {/* Rotating shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-spin-slow"></div>
                  
                  {/* Premium LUMINA logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={luminaLogo} 
                      alt="LUMINA" 
                      className="w-12 h-12 object-contain relative z-10"
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                      }}
                    />
                  </div>
                  
                  {/* Orbiting luxury symbols */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-600 text-lg animate-bounce-gentle">💎</div>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-amber-600 text-lg animate-float-gentle" style={{ animationDelay: '1s' }}>🏆</div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-orange-600 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-yellow-700 text-lg animate-spin-slow" style={{ animationDelay: '1.5s' }}>💰</div>
                </div>
                
                {/* Luxury brand text */}
                <h1 className="text-3xl font-black mb-2 tracking-wider relative" style={{
                  color: '#1a202c',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.5)'
                }}>
                  LUMINA
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-yellow-800 to-transparent"></div>
                  <p className="text-sm font-bold tracking-wider uppercase" style={{ color: '#1a202c' }}>
                    PREMIUM EDITION
                  </p>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-yellow-800 to-transparent"></div>
                </div>
              </div>

              {/* Result display */}
              <div className="relative">
                <div className="text-6xl mb-4 animate-bounce-gentle">
                  {gameResult.isWin ? '🎉' : '💸'}
                </div>
                <h2 className="text-3xl font-black mb-2" style={{ color: '#1a202c' }}>
                  {gameResult.isWin ? 'JACKPOT!' : 'TRY AGAIN!'}
                </h2>
                <p className="text-lg font-bold" style={{ color: '#1a202c' }}>
                  Word: <span className="font-black">{gameResult.correctWord}</span>
                </p>
              </div>
            </div>

            {/* Dark luxury content section */}
            <div className="p-8" style={{ background: 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)' }}>
              {/* Premium stats with golden accents */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[
                  { icon: Trophy, value: gameResult.score, label: "Score", color: "#d69e2e" },
                  { icon: Zap, value: gameResult.streak, label: "Streak", color: "#f6ad55" },
                  { icon: Clock, value: `${gameResult.timeRemaining}s`, label: "Time", color: "#fbd38d" },
                  { icon: Star, value: gameResult.attempts, label: "Tries", color: "#f6e05e" }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div 
                        className="w-14 h-14 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-lg border-2"
                        style={{ 
                          backgroundColor: '#1a202c',
                          borderColor: stat.color + '40'
                        }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <div className="text-xl font-black text-yellow-400">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Luxury game details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-yellow-600/20">
                  <span className="text-gray-300 font-semibold">Category</span>
                  <Badge 
                    className="rounded-full px-4 py-2 font-bold shadow-lg border-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #d69e2e, #f6ad55)',
                      color: '#1a202c',
                      borderColor: '#f6e05e'
                    }}
                  >
                    🐾 {gameResult.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300 font-semibold">Difficulty</span>
                  <Badge 
                    className="rounded-full px-4 py-2 font-bold shadow-lg border-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #f6ad55, #fbd38d)',
                      color: '#1a202c',
                      borderColor: '#f6e05e'
                    }}
                  >
                    ⚡ {gameResult.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Premium action buttons */}
              <div className="space-y-4">
                {/* Main golden button */}
                <Button 
                  className="w-full h-16 rounded-xl text-xl font-black border-0 shadow-xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #d69e2e 0%, #f6ad55 50%, #d69e2e 100%)',
                    color: '#1a202c'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <RotateCcw className="w-6 h-6 mr-3" />
                  PLAY AGAIN
                </Button>
                
                {/* Secondary luxury buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="h-14 rounded-xl font-bold border-2 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #1a202c, #2d3748)',
                      borderColor: '#d69e2e',
                      color: '#f6ad55'
                    }}
                  >
                    <Home className="w-5 h-5 mr-2" />
                    HOME
                  </Button>
                  
                  <Button 
                    className="h-14 rounded-xl font-bold border-2 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #1a202c, #2d3748)',
                      borderColor: '#f6ad55',
                      color: '#fbd38d'
                    }}
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    SHARE
                  </Button>
                </div>
              </div>

              {/* Premium achievement */}
              {gameResult.isWin && gameResult.streak >= 5 && (
                <div className="mt-6 p-4 rounded-xl relative overflow-hidden shadow-lg border-2" style={{
                  background: 'linear-gradient(135deg, #1a202c, #2d3748)',
                  borderColor: '#d69e2e'
                }}>
                  {/* Golden sparkles */}
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2"
                      style={{
                        background: 'linear-gradient(135deg, #d69e2e, #f6ad55)',
                        borderColor: '#f6e05e'
                      }}
                    >
                      <Trophy className="w-6 h-6" style={{ color: '#1a202c' }} />
                    </div>
                    <div>
                      <div className="font-black text-yellow-400">ACHIEVEMENT UNLOCKED!</div>
                      <div className="text-yellow-300 font-semibold text-sm">Streak Master - 5+ Correct</div>
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
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-15px); opacity: 1; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
});

MonopolyGameOver.displayName = 'MonopolyGameOver';