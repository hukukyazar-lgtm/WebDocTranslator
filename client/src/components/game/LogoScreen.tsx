import { memo, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

export interface LogoScreenProps {
  onComplete: () => void;
  onDashboard?: () => void;
}

export const LogoScreen = memo<LogoScreenProps>(({ onComplete, onDashboard }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Logo animasyonunu göster
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 3 saniye sonra otomatik olarak login ekranına geç
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleClick = () => {
    onComplete();
  };

  const backgroundStyle = {
    background: 'radial-gradient(ellipse at center, hsl(230, 35%, 15%) 0%, hsl(230, 35%, 7%) 50%, hsl(220, 40%, 5%) 100%)',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative' as const
  };

  return (
    <div style={backgroundStyle} onClick={handleClick} className="cursor-pointer relative">
      {/* Space particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ top: '20%', left: '10%' }}></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ top: '40%', right: '15%', animationDelay: '1s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" style={{ top: '60%', left: '20%', animationDelay: '2s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ bottom: '30%', right: '25%', animationDelay: '1.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ top: '80%', left: '80%', animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="h-full flex items-center justify-center p-6 relative z-10">
        <div className="text-center max-w-md w-full">
          {/* LUMINA Logo ve başlık */}
          <div className="mb-12 animate-slide-up">
            {/* LUMINA Logo */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto relative">
                <img 
                  src={luminaLogo} 
                  alt="LUMINA - The Art of Seeing" 
                  className="w-full h-full object-contain animate-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(0, 220, 205, 0.5))'
                  }}
                />
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-cyan-400/10 animate-pulse blur-xl rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black mb-4 tracking-wider">
              <span className="text-white">
                LUMINA
              </span>
            </h1>
            <p className="text-lg text-cyan-400/80 font-light tracking-wide">
              Uncover the hidden patterns
            </p>
          </div>

          {/* Loading indicator */}
          {showContent && (
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center items-center space-x-2 text-cyan-400/60">
                <div className="animate-bounce" style={{ animationDelay: '0s' }}>●</div>
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</div>
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</div>
              </div>
              <p className="text-sm text-cyan-400/50 mt-4 tracking-wide">
                Tap to continue
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Button - Top Right */}
      {onDashboard && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDashboard();
            }}
            className="backdrop-blur-lg border border-cyan-400/50 text-white shadow-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.3), rgba(255,255,255,0.1))'
            }}
            size="sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </div>
      )}
    </div>
  );
});

LogoScreen.displayName = 'LogoScreen';