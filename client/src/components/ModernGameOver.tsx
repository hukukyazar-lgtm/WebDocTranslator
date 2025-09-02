import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Home, Share2, Zap, Target, Clock, Trophy } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

// Ultra-modern, minimalist, neumorphism + glassmorphism
export const ModernGameOver = memo(() => {
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Main result card with advanced neumorphism */}
          <Card className="relative overflow-hidden border-0 shadow-2xl" style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '32px',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.2),
              inset 0 -1px 0 rgba(0,0,0,0.1),
              0 32px 64px rgba(0,0,0,0.4),
              0 16px 32px rgba(0,0,0,0.2)
            `
          }}>
            
            {/* Ambient glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur opacity-30"></div>
            
            <div className="relative p-8">
              {/* Header with floating logo */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 mx-auto relative">
                    {/* Glowing orb effect behind logo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                    <img 
                      src={luminaLogo} 
                      alt="LUMINA" 
                      className="relative w-full h-full object-contain z-10"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(0, 220, 205, 0.6))'
                      }}
                    />
                  </div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent tracking-wider mt-4">
                    LUMINA
                  </h1>
                </div>

                {/* Status with animated emoji */}
                <div className="mb-6">
                  <div className="text-6xl mb-4 animate-bounce-soft">
                    {gameResult.isWin ? '🎉' : '😔'}
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
                    {gameResult.isWin ? 'Mükemmel!' : 'Tekrar Dene!'}
                  </h2>
                  <p className="text-lg text-white/80 font-medium">
                    {gameResult.isWin 
                      ? `"${gameResult.correctWord}" kelimesini buldunuz!` 
                      : `Doğru kelime: "${gameResult.correctWord}"`
                    }
                  </p>
                </div>
              </div>

              {/* Ultra-modern stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Target, value: gameResult.score, label: "Puan", color: "from-emerald-400 to-cyan-400" },
                  { icon: Zap, value: gameResult.streak, label: "Seri", color: "from-orange-400 to-red-400" },
                  { icon: Clock, value: `${gameResult.timeRemaining}s`, label: "Süre", color: "from-blue-400 to-purple-400" },
                  { icon: Trophy, value: gameResult.attempts, label: "Deneme", color: "from-yellow-400 to-orange-400" }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-20 rounded-2xl blur group-hover:opacity-40 transition duration-300" style={{
                        background: `linear-gradient(45deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`
                      }}></div>
                      <div className="relative p-4 rounded-2xl text-center border border-white/10" style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                        backdropFilter: 'blur(20px)'
                      }}>
                        <IconComponent className="w-6 h-6 mx-auto mb-2 text-white/80" />
                        <div className={`text-2xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/60 font-medium tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Game details with modern badges */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Kategori</span>
                  <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30 backdrop-blur-sm">
                    🐾 {gameResult.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Zorluk</span>
                  <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30 backdrop-blur-sm">
                    ⚡ {gameResult.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Modern action buttons */}
              <div className="space-y-4">
                {/* Primary action */}
                <Button 
                  className="w-full h-14 rounded-2xl text-lg font-bold border-0 shadow-xl relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <RotateCcw className="w-5 h-5 mr-3" />
                  Tekrar Oyna
                </Button>
                
                {/* Secondary actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    className="h-12 rounded-xl font-semibold border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                    }}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Ana Menü
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="h-12 rounded-xl font-semibold border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>

              {/* Achievement notification */}
              {gameResult.isWin && gameResult.streak >= 5 && (
                <div className="mt-6 p-4 rounded-2xl border border-amber-500/30 relative overflow-hidden" style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))'
                }}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-amber-300">Yeni Başarım Açıldı!</div>
                      <div className="text-amber-200/80 text-sm">Seri Ustası - 5+ doğru tahmin</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-soft {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
});

ModernGameOver.displayName = 'ModernGameOver';