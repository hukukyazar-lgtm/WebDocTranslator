import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Settings, Trophy, User, HelpCircle, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useGameStats } from '@/hooks/useGameStats';

interface LuminaMenuProps {
  playerStats: {
    gamesPlayed: number;
    successRate: number;
    bestStreak: number;
  };
  onStartGame: () => void;
  onSettings: () => void;
  onLogin: () => void;
}

export const LuminaMenu = memo(({ playerStats, onStartGame, onSettings, onLogin }: LuminaMenuProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { stats } = useGameStats();

  // Use real stats if authenticated, otherwise use passed props for guests
  const currentStats = isAuthenticated && stats ? stats : playerStats;

  const handleProfileAction = () => {
    if (isAuthenticated) {
      // Kullanıcı giriş yapmışsa çıkış yap
      window.location.href = '/api/logout';
    } else {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      onLogin();
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 animate-float-slow"></div>
        <div className="absolute top-1/4 -right-16 w-32 h-32 rounded-full bg-yellow-300/20 animate-float-medium"></div>
        <div className="absolute bottom-1/4 -left-16 w-36 h-36 rounded-full bg-pink-300/15 animate-float-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-16 right-1/4 w-28 h-28 rounded-full bg-cyan-300/20 animate-float-medium" style={{ animationDelay: '2s' }}></div>
        
        {Array.from({ length: 15 }).map((_, i) => (
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header with logo and user info */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
            <div className="absolute inset-3 bg-white rounded-full shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-black text-purple-600">L</div>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-wide">LUMINA</h1>
          
          {/* User greeting */}
          {isAuthenticated && user ? (
            <div className="mb-2">
              <p className="text-xl text-white/90 font-semibold">
                Hoş geldin, {user.firstName || user.email?.split('@')[0] || 'Oyuncu'}! 😊
              </p>
              <p className="text-sm text-white/70">Replit hesabın ile giriş yaptın</p>
            </div>
          ) : (
            <p className="text-xl text-white/80 font-semibold mb-2">Kelime Oyunu</p>
          )}
          
          {isLoading && (
            <p className="text-sm text-white/60">Giriş kontrol ediliyor...</p>
          )}
        </div>

        {/* Main menu cards */}
        <div className="w-full max-w-md space-y-4">
          {/* Play button - main action */}
          <Card className="p-6 bg-white rounded-3xl shadow-2xl border-0">
            <Button 
              onClick={onStartGame}
              className="w-full h-20 rounded-2xl text-2xl font-black shadow-xl text-white" style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              }}
            >
              <Play className="w-8 h-8 mr-4" />
              OYNA
            </Button>
          </Card>

          {/* Secondary menu options */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button 
                onClick={() => console.log('Başarımlar açıldı - Yakında gelecek!')}
                className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <Trophy className="w-6 h-6 mb-1" />
                <div className="text-sm">Başarımlar</div>
              </Button>
            </Card>

            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button 
                onClick={(e) => {
                  // Tıklama efekti ekle
                  const button = e.currentTarget;
                  button.style.transform = 'scale(0.95)';
                  button.style.transition = 'transform 0.1s ease';
                  setTimeout(() => {
                    button.style.transform = 'scale(1)';
                    // Asıl işlemi çalıştır
                    handleProfileAction();
                  }, 100);
                }}
                className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg active:scale-95 transition-all duration-100" style={{
                  background: isAuthenticated 
                    ? 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)' 
                    : 'linear-gradient(135deg, #4facfe 0%, #00c851 100%)'
                }}
                data-testid={isAuthenticated ? 'logout-button' : 'login-button'}
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="w-6 h-6 mb-1" />
                    <div className="text-sm">Çıkış</div>
                  </>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="relative mb-1">
                      <User className="w-5 h-5 text-white" />
                      <BarChart3 className="w-3 h-3 text-white absolute -top-0.5 -right-0.5" />
                    </div>
                    <div className="text-xs font-bold text-center">
                      <div>Giriş Yap</div>
                      <div className="text-[10px] opacity-90 mt-0.5">Skorlarını Kaydet</div>
                    </div>
                  </div>
                )}
              </Button>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button 
                onClick={onSettings}
                className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                }}
              >
                <Settings className="w-6 h-6 mb-1" />
                <div className="text-sm">Ayarlar</div>
              </Button>
            </Card>

            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button 
                onClick={() => console.log('Yardım sayfası açıldı - Yakında gelecek!')}
                className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
              }}>
                <HelpCircle className="w-6 h-6 mb-1" />
                <div className="text-sm text-orange-800">Yardım</div>
              </Button>
            </Card>
          </div>
        </div>

        {/* Player stats preview */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div>
              <div className="text-2xl font-black text-white" data-testid="stat-games-played">
                {currentStats.gamesPlayed}
              </div>
              <div className="text-sm">Oynanmış</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div>
              <div className="text-2xl font-black text-white" data-testid="stat-success-rate">
                {currentStats.successRate}%
              </div>
              <div className="text-sm">Başarı</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div>
              <div className="text-2xl font-black text-white" data-testid="stat-best-streak">
                {currentStats.bestStreak}
              </div>
              <div className="text-sm">En Yüksek Seri</div>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="mt-4 text-white/60 text-sm">
              ✅ İstatistikler kaydediliyor
            </div>
          )}
          
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
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

LuminaMenu.displayName = 'LuminaMenu';