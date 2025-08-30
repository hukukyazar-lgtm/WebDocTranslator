import { memo, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface LogoScreenProps {
  onAuthChoice: (isGuest: boolean) => void;
}

export const LogoScreen = memo<LogoScreenProps>(({ onAuthChoice }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Logo animasyonunu göster
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa, dil seçimine geç
    if (!isLoading && isAuthenticated) {
      onAuthChoice(false);
    }
  }, [isAuthenticated, isLoading, onAuthChoice]);

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleGuestMode = () => {
    onAuthChoice(true);
  };

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #00dccd 0%, #f8bbd9 50%, #e91e63 100%)',
    minHeight: '100vh'
  };

  return (
    <div style={backgroundStyle}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          {/* Logo ve başlık */}
          <div className="mb-12 animate-slide-up">
            <div className="text-6xl mb-6 animate-bounce">
              🎯
            </div>
            <h1 className="text-5xl sm:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
                WordSpin
              </span>
            </h1>
            <p className="text-xl text-white/80 font-medium">
              Türkçe Kelime Tahmin Oyunu
            </p>
          </div>

          {/* Auth seçenekleri */}
          {showContent && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {/* Replit ile giriş */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full py-4 px-6 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.9), rgba(233, 30, 99, 0.9))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 220, 205, 0.3)'
                }}
                data-testid="button-login"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span>Replit ile Giriş Yap</span>
                </span>
              </button>

              {/* Logout seçeneği (giriş yapmış kullanıcılar için) */}
              {isAuthenticated && (
                <div className="text-center">
                  <p className="text-xs text-white/40 mb-4">veya</p>
                  <a
                    href="/api/logout"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/80 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                    data-testid="button-logout"
                  >
                    <span>🚪</span>
                    <span>Çıkış Yap</span>
                  </a>
                </div>
              )}

              <div className="text-center">
                <p className="text-xs text-white/40 mb-4">veya</p>
                
                {/* Misafir girişi */}
                <button 
                  onClick={handleGuestMode}
                  className="px-6 py-3 text-sm font-medium text-white/80 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                  data-testid="button-guest-mode"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>👤</span>
                    <span>Misafir olarak devam et</span>
                  </span>
                </button>
                <p className="text-xs text-white/40 mt-2">
                  * İlerleme ve skorlar kaydedilmeyecek
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LogoScreen.displayName = 'LogoScreen';