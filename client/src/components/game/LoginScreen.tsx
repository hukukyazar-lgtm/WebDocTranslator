import { memo } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface LoginScreenProps {
  onAuthChoice: (isGuest: boolean) => void;
  onDashboard?: () => void;
}

export const LoginScreen = memo<LoginScreenProps>(({ onAuthChoice, onDashboard }) => {
  const { isAuthenticated, isLoading } = useAuth();

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleGoogleLogin = () => {
    // Google OAuth bağlantısı - gelecekte aktif hale gelecek
    console.log('Google login will be activated when credentials are provided');
    // window.location.href = '/api/auth/google';
  };

  const handleFacebookLogin = () => {
    // Facebook OAuth bağlantısı - gelecekte aktif hale gelecek
    console.log('Facebook login will be activated when credentials are provided');
    // window.location.href = '/api/auth/facebook';
  };

  const handleGuestMode = () => {
    if (onDashboard) {
      onDashboard();
    }
    // Delay the auth choice to let dashboard open first
    setTimeout(() => {
      onAuthChoice(true);
    }, 100);
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

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-4 px-8 text-lg font-medium text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl tracking-wide flex items-center justify-center gap-3 backdrop-blur-lg border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(219, 68, 55, 0.8) 0%, rgba(234, 67, 53, 0.9) 100%)',
                boxShadow: '0 8px 32px rgba(219, 68, 55, 0.3)',
              }}
              data-testid="button-google-login"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Facebook Login */}
            <button
              onClick={handleFacebookLogin}
              className="w-full py-4 px-8 text-lg font-medium text-white rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl tracking-wide flex items-center justify-center gap-3 backdrop-blur-lg border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(66, 103, 178, 0.8) 0%, rgba(59, 89, 152, 0.9) 100%)',
                boxShadow: '0 8px 32px rgba(66, 103, 178, 0.3)',
              }}
              data-testid="button-facebook-login"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
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