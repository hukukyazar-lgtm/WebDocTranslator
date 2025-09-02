import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Zap, RotateCcw, Home, Share2 } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

// Bu sadece görsel önizleme için oluşturulmuş bir komponent
export const GameOverPreview = memo(() => {
  // Örnek oyun sonucu verileri
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

  // Tutarlı LUMINA tema stilleri
  const luminaBackground = {
    background: 'radial-gradient(ellipse at center, hsl(230, 35%, 15%) 0%, hsl(230, 35%, 7%) 50%, hsl(220, 40%, 5%) 100%)',
    minHeight: '100vh',
    overflow: 'hidden',
    position: 'relative' as const
  };

  const luminaCard = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
    backdropFilter: 'blur(30px)',
    border: '2px solid rgba(255,255,255,0.20)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)'
  };

  const luminaButton = {
    background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.4), rgba(184, 187, 217, 0.3))',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 220, 205, 0.5)'
  };

  return (
    <div style={luminaBackground}>
      {/* Space particles background - Tutarlı parçacık efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ top: '15%', left: '20%' }}></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ top: '35%', right: '10%', animationDelay: '1s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" style={{ top: '70%', left: '15%', animationDelay: '2s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ bottom: '20%', right: '30%', animationDelay: '1.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ top: '85%', right: '80%', animationDelay: '0.5s' }}></div>
      </div>

      {/* Confetti animation */}
      {gameResult.isWin && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                fontSize: `${20 + Math.random() * 15}px`
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫', '🎈'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}
      
      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          
          {/* Main Result Card - Tutarlı LUMINA tasarımı */}
          <Card className="rounded-3xl p-6 text-center" style={luminaCard}>
            <CardHeader className="pb-4">
              {/* LUMINA Logo - Tutarlı logo kullanımı */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10">
                  <img 
                    src={luminaLogo} 
                    alt="LUMINA" 
                    className="w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(0, 220, 205, 0.5))'
                    }}
                  />
                </div>
                <h1 className="text-2xl font-black text-white tracking-wider">LUMINA</h1>
              </div>

              {/* Result Status */}
              <div className="space-y-3">
                <div className="text-6xl mb-4">
                  {gameResult.isWin ? '🎉' : '😔'}
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {gameResult.isWin ? 'Tebrikler!' : 'Oyun Bitti!'}
                </CardTitle>
                <p className="text-white/80 text-lg">
                  {gameResult.isWin 
                    ? `"${gameResult.correctWord}" kelimesini buldunuz!` 
                    : `Doğru kelime: "${gameResult.correctWord}"`
                  }
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Score Display - Tutarlı istatistik tasarımı */}
              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl rounded-xl p-4 border border-white/20" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                }}>
                  <div className="text-3xl mb-2">💎</div>
                  <div className="text-2xl font-black text-cyan-400">{gameResult.score}</div>
                  <div className="text-sm text-white/80">Puan</div>
                </div>
                
                <div className="backdrop-blur-xl rounded-xl p-4 border border-white/20" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                }}>
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-2xl font-black text-orange-400">{gameResult.streak}</div>
                  <div className="text-sm text-white/80">Seri</div>
                </div>
              </div>

              {/* Game Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-white/80">
                  <span>Kategori:</span>
                  <Badge className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30">
                    🐾 {gameResult.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Zorluk:</span>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                    {gameResult.difficulty}
                  </Badge>
                </div>
                {gameResult.isWin && (
                  <div className="flex justify-between items-center text-white/80">
                    <span>Kalan Süre:</span>
                    <span className="text-green-400 font-bold">{gameResult.timeRemaining} saniye</span>
                  </div>
                )}
              </div>

              {/* Action Buttons - Tutarlı buton tasarımı */}
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full text-white font-bold py-3"
                  style={luminaButton}
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Tekrar Oyna
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    className="text-white border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Ana Menü
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="text-white border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>

              {/* Achievement Notification */}
              {gameResult.isWin && gameResult.streak >= 5 && (
                <div className="mt-4 p-3 rounded-xl border border-gold/30" style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 193, 7, 0.10))'
                }}>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Crown className="h-5 w-5" />
                    <span className="font-bold">Yeni Başarım!</span>
                  </div>
                  <p className="text-yellow-400/80 text-sm mt-1">Seri Ustası - 5+ doğru tahmin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

GameOverPreview.displayName = 'GameOverPreview';