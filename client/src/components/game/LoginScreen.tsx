import { memo } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface LoginScreenProps {
  onAuthChoice: (isGuest: boolean) => void;
}

export const LoginScreen = memo<LoginScreenProps>(({ onAuthChoice }) => {
  const { isAuthenticated, isLoading } = useAuth();

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleGuestMode = () => {
    onAuthChoice(true);
  };

  const backgroundStyle = {
    background: 'radial-gradient(ellipse at center, hsl(230, 35%, 15%) 0%, hsl(230, 35%, 7%) 50%, hsl(220, 40%, 5%) 100%)',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative' as const
  };

  return (
    <div style={backgroundStyle}>
      {/* Space particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ top: '15%', left: '20%' }}></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ top: '35%', right: '10%', animationDelay: '1s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" style={{ top: '70%', left: '15%', animationDelay: '2s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ bottom: '20%', right: '30%', animationDelay: '1.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ top: '85%', right: '80%', animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="h-full flex items-center justify-center p-6 relative z-10">
        <div className="text-center max-w-md w-full">
          {/* LUMINA Header */}
          <div className="mb-12 animate-slide-up">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 text-white tracking-wider">
              LUMINA
            </h1>
            <p className="text-lg text-cyan-400/80 font-light tracking-wide">
              Uncover Your Truth
            </p>
          </div>

          {/* Auth options */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* Continue with Replit */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-4 px-8 text-lg font-medium text-black rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl tracking-wide"
              style={{
                background: 'linear-gradient(135deg, hsl(180, 100%, 70%) 0%, hsl(200, 80%, 60%) 100%)',
                boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3)',
              }}
              data-testid="button-login"
            >
              Continue with Replit
            </button>

            {/* Logout option for authenticated users */}
            {isAuthenticated && (
              <div className="text-center">
                <div className="text-center my-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4"></div>
                  <p className="text-xs text-cyan-400/50 tracking-wide mb-4">OR</p>
                </div>
                <a
                  href="/api/logout"
                  className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-cyan-400/80 hover:text-cyan-400 rounded-full bg-cyan-400/5 hover:bg-cyan-400/10 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 tracking-wide"
                  data-testid="button-logout"
                >
                  <span>🚪</span>
                  <span>Log Out</span>
                </a>
              </div>
            )}

            <div className="text-center">
              <div className="text-center my-6">
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4"></div>
                <p className="text-xs text-cyan-400/50 tracking-wide mb-4">OR</p>
              </div>
              
              {/* Guest mode */}
              <button 
                onClick={handleGuestMode}
                className="text-cyan-400/60 hover:text-cyan-400 text-sm font-light transition-all duration-300 tracking-wide underline underline-offset-4 decoration-cyan-400/30 hover:decoration-cyan-400/60"
                data-testid="button-guest-mode"
              >
                Play as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LoginScreen.displayName = 'LoginScreen';