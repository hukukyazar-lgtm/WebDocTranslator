import { memo, useEffect, useState } from 'react';

export interface LogoScreenProps {
  onComplete: () => void;
}

export const LogoScreen = memo<LogoScreenProps>(({ onComplete }) => {
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
    background: 'linear-gradient(135deg, #00dccd 0%, #f8bbd9 50%, #e91e63 100%)',
    height: '100vh',
    overflow: 'hidden'
  };

  return (
    <div style={backgroundStyle} onClick={handleClick} className="cursor-pointer">
      <div className="h-full flex items-center justify-center p-6">
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
              PRO EDITION
            </p>
          </div>

          {/* Loading indicator */}
          {showContent && (
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center items-center space-x-2 text-white/60">
                <div className="animate-bounce" style={{ animationDelay: '0s' }}>●</div>
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</div>
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</div>
              </div>
              <p className="text-sm text-white/40 mt-4">
                Dokunmak için tıklayın
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LogoScreen.displayName = 'LogoScreen';