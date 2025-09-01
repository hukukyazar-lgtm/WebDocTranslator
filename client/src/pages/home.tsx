import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { type Language } from '@/components/game/LanguageScreen';
import { LogoScreen } from '@/components/game/LogoScreen';
import { LoginScreen } from '@/components/game/LoginScreen';
import { CategoryScreen } from '@/components/game/CategoryScreen';
import { DifficultyScreen } from '@/components/game/DifficultyScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { SettingsScreen } from '@/components/game/SettingsScreen';
import { DashboardModal } from '@/components/DashboardModal';
import { useAuth } from '@/hooks/useAuth';

// Auto-detect system language or fallback to English
const getSystemLanguage = (): Language => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.slice(0, 2) as Language;
    const supportedLanguages: Language[] = ['tr', 'en', 'es', 'it', 'fr', 'de'];
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
  }
  return 'en';
};

// Get stored language or auto-detect
const getStoredLanguage = (): Language => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('selectedLanguage') as Language;
    const supportedLanguages: Language[] = ['tr', 'en', 'es', 'it', 'fr', 'de'];
    if (stored && supportedLanguages.includes(stored)) {
      return stored;
    }
  }
  return getSystemLanguage();
};

// Store language preference
const setStoredLanguage = (lang: Language): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('selectedLanguage', lang);
  }
};

type AppState = 'logo' | 'login' | 'category' | 'difficulty' | 'game' | 'settings';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('logo');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(getStoredLanguage());
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(3);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  // URL check for direct navigation
  const currentPath = window.location.pathname;
  
  // Direct category page navigation
  if (currentPath === '/category' && appState === 'logo') {
    setAppState('category');
  }
  
  // URL params check for direct game mode
  const urlParams = new URLSearchParams(window.location.search);
  const gameMode = urlParams.get('mode');
  
  // Direct game mode için category ve difficulty default set et
  if (gameMode === 'single' && appState === 'logo') {
    setSelectedCategory('Hayvanlar');
    setSelectedDifficulty(3);
    setAppState('game');
  }
  
  
  // Auto-detect and set language on first load
  useEffect(() => {
    const detectedLang = getStoredLanguage();
    setSelectedLanguage(detectedLang);
  }, []);
  
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setStoredLanguage(language);
  };

  const handleLogoComplete = () => {
    setAppState('login');
  };

  const handleAuthChoice = (isGuest: boolean) => {
    setIsGuestMode(isGuest);
    if (!isGuest) {
      // Sadece login için dashboard'a yönlendir, guest mode'da modal açık kalsın
      window.location.href = '/dashboard';
    } else {
      // Guest mode'da category'ye geç ama modal açık kalmasını sağla
      setAppState('category');
    }
  };

  const handleCategorySelect = (category: string, difficulty: number) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setAppState('game'); // Artık direkt oyuna geç
  };

  const handleDifficultySelect = (difficulty: number) => {
    setSelectedDifficulty(difficulty);
    setAppState('game');
  };

  const handleGameOver = () => {
    // Ana menüye dön - Dashboard modal açma 
    setShowDashboard(true);
    setAppState('category'); // Category sayfasına geri dön ama dashboard modal açık olsun
  };
  
  const handleSettingsOpen = () => {
    setAppState('settings');
  };
  
  const handleSettingsClose = () => {
    setAppState('category');
  };

  const backgroundStyle = {
    background: 'radial-gradient(ellipse at center, hsl(230, 35%, 15%) 0%, hsl(230, 35%, 7%) 50%, hsl(220, 40%, 5%) 100%)',
    height: '100vh',
    overflow: 'hidden'
  };

  // Logo sayfası
  if (appState === 'logo') {
    return (
      <div>
        <LogoScreen 
          onComplete={handleLogoComplete} 
          onDashboard={() => setShowDashboard(true)}
        />
        <DashboardModal 
          isOpen={showDashboard} 
          onClose={() => setShowDashboard(false)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  // Login sayfası
  if (appState === 'login') {
    return (
      <div>
        <LoginScreen 
          onAuthChoice={handleAuthChoice}
          onDashboard={() => setShowDashboard(true)}
          selectedLanguage={selectedLanguage}
        />
        <DashboardModal 
          isOpen={showDashboard} 
          onClose={() => setShowDashboard(false)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }
  
  // Ayarlar sayfası
  if (appState === 'settings') {
    return (
      <div style={backgroundStyle}>
        <SettingsScreen 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onBack={handleSettingsClose}
        />
      </div>
    );
  }

  // Kategori seçimi  
  if (appState === 'category') {
    return (
      <div>
        <CategoryScreen 
          selectedLanguage={selectedLanguage}
          onCategorySelect={handleCategorySelect}
          onBack={() => window.location.href = '/dashboard'}
          onSettingsOpen={handleSettingsOpen}
          isGuestMode={isGuestMode}
        />
        <DashboardModal 
          isOpen={showDashboard} 
          onClose={() => setShowDashboard(false)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  // Zorluk seçimi
  if (appState === 'difficulty') {
    return (
      <DifficultyScreen 
        selectedLanguage={selectedLanguage}
        selectedCategory={selectedCategory}
        onDifficultySelect={handleDifficultySelect}
        onBack={() => setAppState('category')}
        isGuestMode={isGuestMode}
      />
    );
  }

  // Oyun
  if (appState === 'game') {
    const gameSettings = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      language: selectedLanguage
    };
    
    return (
      <div style={backgroundStyle}>
        <GameScreen 
          settings={gameSettings} 
          onGameOver={handleGameOver} 
          isGuestMode={isGuestMode} 
        />
        <DashboardModal 
          isOpen={showDashboard} 
          onClose={() => setShowDashboard(false)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  return null;
}
