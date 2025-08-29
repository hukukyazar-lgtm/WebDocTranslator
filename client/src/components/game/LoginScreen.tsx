import { memo } from 'react';
import type { Language } from './LanguageScreen';

export interface LoginScreenProps {
  selectedLanguage: Language;
  onBack: () => void;
  onGuestMode: () => void;
}

const languageNames = {
  'tr': 'Türkçe',
  'en': 'English', 
  'es': 'Español',
  'it': 'Italiano',
  'fr': 'Français',
  'de': 'Deutsch'
};

const languageFlags = {
  'tr': '🇹🇷',
  'en': '🇬🇧',
  'es': '🇪🇸', 
  'it': '🇮🇹',
  'fr': '🇫🇷',
  'de': '🇩🇪'
};

export const LoginScreen = memo<LoginScreenProps>(({ selectedLanguage, onBack, onGuestMode }) => {
  const handleLogin = () => {
    // Replit Auth login
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Statik arka plan - animasyon yok */}
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          
          {/* Header with back button and language */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <span>←</span>
              <span>Geri</span>
            </button>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-lg">{languageFlags[selectedLanguage]}</span>
              <span className="text-sm font-medium text-white">{languageNames[selectedLanguage]}</span>
            </div>
          </div>

          {/* Logo section */}
          <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative mb-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                    <div className="text-4xl sm:text-5xl">🎯</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-teal-400 to-pink-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-pink-400 to-teal-500 rounded-full animate-pulse delay-300"></div>
                </div>
                
                <div className="text-center">
                  <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2">
                    <span className="font-light">Word</span>
                    <span className="font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent">Spin</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-white/90">PRO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome message */}
          <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Hoş Geldiniz! 👋
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              İlerlemelerinizi kaydetmek ve skor tablolarında yarışmak için giriş yapın
            </p>
          </div>

          {/* Login card */}
          <div 
            className="backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-slide-up mb-8"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.1), rgba(233, 30, 99, 0.1))',
              animationDelay: '0.3s'
            }}
          >
            <div className="text-center space-y-6">
              
              {/* Login benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="text-2xl">💾</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">İlerleme Kaydı</div>
                    <div className="text-xs text-white/60">Skorlarınız ve başarılarınız güvende</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="text-2xl">🏆</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">Skor Tabloları</div>
                    <div className="text-xs text-white/60">Diğer oyuncularla yarışın</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="text-2xl">🎯</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">Günlük Hedefler</div>
                    <div className="text-xs text-white/60">Motivasyonunuzu yüksek tutun</div>
                  </div>
                </div>
              </div>

              {/* Login button */}
              <button
                onClick={handleLogin}
                className="w-full py-4 px-6 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
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
              
              <p className="text-xs text-white/50 mt-4">
                Güvenli ve hızlı giriş için Replit hesabınızı kullanın
              </p>
            </div>
          </div>
          
          {/* Guest option */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs text-white/40 mb-4">
              veya
            </p>
            <button 
              onClick={onGuestMode}
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
      </div>
    </div>
  );
});

LoginScreen.displayName = 'LoginScreen';