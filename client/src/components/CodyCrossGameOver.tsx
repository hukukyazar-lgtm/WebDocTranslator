import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Home, Share2, Star, Zap, Clock, Trophy } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

// CodyCross style - modern, colorful, friendly, with soft shapes and vibrant colors
export const CodyCrossGameOver = memo(() => {
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

              {/* Philosophical word-vision logo */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  {/* Colorful background with knowledge theme */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-indigo-200 via-blue-200 to-cyan-200 rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute inset-3 bg-white rounded-full shadow-lg"></div>
                  
                  {/* Central philosophical eye of knowledge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      {/* Outer wisdom circle */}
                      <div className="w-16 h-16 rounded-full border-3 border-gradient-to-r from-purple-500 to-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden shadow-lg">
                        
                        {/* The seeing eye - center of wisdom */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-10 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 relative border-2 border-purple-700">
                            {/* Iris - window to knowledge */}
                            <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-5 rounded-full bg-gradient-to-b from-purple-600 via-indigo-700 to-purple-900 shadow-inner">
                              {/* Pupil - depth of understanding */}
                              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-black">
                                {/* Light of comprehension */}
                                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                {/* Inner spark of insight */}
                                <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating letters around the eye - representing words and knowledge */}
                        <div className="absolute top-1 left-2 text-xs font-bold text-purple-600 animate-float-gentle">A</div>
                        <div className="absolute top-2 right-1 text-xs font-bold text-blue-600 animate-float-gentle" style={{ animationDelay: '0.5s' }}>B</div>
                        <div className="absolute bottom-1 left-1 text-xs font-bold text-indigo-600 animate-float-gentle" style={{ animationDelay: '1s' }}>C</div>
                        <div className="absolute bottom-2 right-2 text-xs font-bold text-cyan-600 animate-float-gentle" style={{ animationDelay: '1.5s' }}>?</div>
                        
                        {/* Wisdom sparkles */}
                        <div className="absolute top-3 right-3 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
                      </div>
                      
                      {/* Orbiting knowledge symbols */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-500 text-sm animate-spin-slow">💡</div>
                      <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-blue-500 text-sm animate-bounce-gentle" style={{ animationDelay: '1s' }}>📖</div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-purple-500 text-sm animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
                      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-green-500 text-sm animate-float-gentle" style={{ animationDelay: '1.5s' }}>🔍</div>
                    </div>
                  </div>
                </div>
                
                {/* Philosophical LUMINA text */}
                <h1 className="text-3xl font-black text-white mb-2 tracking-wide relative">
                  <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    LUMINA
                  </span>
                  {/* Glowing text effect */}
                  <span className="absolute inset-0 text-white/10 transform translate-x-0.5 translate-y-0.5 -z-10 blur-sm">
                    LUMINA
                  </span>
                </h1>
                <p className="text-sm text-white/80 font-medium italic">Kelimelerin Işığı</p>
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
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[
                  { icon: Trophy, value: gameResult.score, label: "Puan", color: "#FF6B6B", bgColor: "#FFE5E5" },
                  { icon: Zap, value: gameResult.streak, label: "Seri", color: "#4ECDC4", bgColor: "#E5F9F7" },
                  { icon: Clock, value: `${gameResult.timeRemaining}s`, label: "Süre", color: "#45B7D1", bgColor: "#E5F4FD" },
                  { icon: Star, value: gameResult.attempts, label: "Deneme", color: "#FFA726", bgColor: "#FFF3E0" }
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

              {/* Game details with colorful badges */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Kategori</span>
                  <Badge 
                    className="rounded-full px-4 py-2 text-white font-bold shadow-lg border-0"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    🐾 {gameResult.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Zorluk</span>
                  <Badge 
                    className="rounded-full px-4 py-2 text-white font-bold shadow-lg border-0"
                    style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#8B4513' }}
                  >
                    ⚡ {gameResult.difficulty}
                  </Badge>
                </div>
              </div>

              {/* CodyCross-style action buttons */}
              <div className="space-y-4">
                {/* Primary action - big and colorful */}
                <Button 
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
                    className="h-14 rounded-xl font-bold border-0 shadow-lg text-white"
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    }}
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Ana Menü
                  </Button>
                  
                  <Button 
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

CodyCrossGameOver.displayName = 'CodyCrossGameOver';