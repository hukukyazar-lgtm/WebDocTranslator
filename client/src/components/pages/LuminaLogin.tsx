import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LuminaLoginProps {
  onLogin: () => void;
  onBack: () => void;
  onGuestMode: () => void;
}

export const LuminaLogin = memo(({ onLogin, onBack, onGuestMode }: LuminaLoginProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    onLogin();
    return null;
  }

  const handleReplitLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-24 h-24 rounded-full bg-yellow-300/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full bg-pink-300/15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-12 w-20 h-20 rounded-full bg-cyan-300/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 10 + 8}px`,
              height: `${Math.random() * 10 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `gentle-float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {/* Back button */}
        <Button 
          onClick={onBack}
          className="absolute top-6 left-6 p-3 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30"
          data-testid="back-button"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="w-full max-w-sm">
          {/* Logo header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute inset-3 bg-white rounded-full shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-black text-purple-600">L</div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-wide">LUMINA</h1>
            <p className="text-white/80 font-semibold text-lg">Hoş Geldin!</p>
          </div>

          {/* Login card */}
          <Card className="p-8 bg-white rounded-3xl shadow-2xl border-0 mb-6">
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Giriş kontrol ediliyor...</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Giriş Yap</h2>
                    <p className="text-gray-600">Oyun istatistiklerini kaydetmek için giriş yap</p>
                  </div>

                  {/* Replit Login button */}
                  <Button 
                    onClick={handleReplitLogin}
                    className="w-full h-14 rounded-2xl text-lg font-bold text-white shadow-xl transition-all duration-300 transform hover:scale-105" 
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                    data-testid="replit-login-button"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Replit ile Giriş Yap
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <p>Güvenli giriş için Replit hesabınızı kullanın</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Guest play option */}
          <div className="mt-6">
            <Card className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <Button 
                onClick={onGuestMode}
                className="w-full h-12 rounded-xl font-bold bg-transparent border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-300"
                data-testid="guest-mode-button"
              >
                Misafir Olarak Oyna
              </Button>
              <p className="text-white/70 text-xs text-center mt-2">
                İstatistikler kaydedilmeyecek
              </p>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-8px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
});

LuminaLogin.displayName = 'LuminaLogin';