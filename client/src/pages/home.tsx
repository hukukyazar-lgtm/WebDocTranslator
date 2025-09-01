import { useState, useEffect } from 'react';
import { type Language } from '@/components/game/LanguageScreen';
import { LogoScreen } from '@/components/game/LogoScreen';
import { LoginScreen } from '@/components/game/LoginScreen';
import { CategoryScreen } from '@/components/game/CategoryScreen';
import { DifficultyScreen } from '@/components/game/DifficultyScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { SettingsScreen } from '@/components/game/SettingsScreen';
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
  const { isAuthenticated, isLoading } = useAuth();
  
  
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
    if (!isGuest && isAuthenticated) {
      // Authenticated users go to dashboard
      window.location.href = '/dashboard';
    } else {
      // Guests go directly to category selection
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
    setAppState('category');
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
        <LogoScreen onComplete={handleLogoComplete} />
        {/* Test için dashboard linki */}
        <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
          <a 
            href="/dashboard" 
            style={{ 
              color: 'white', 
              background: 'rgba(0,0,0,0.7)', 
              padding: '8px 16px', 
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            📊 Dashboard Test
          </a>
        </div>
      </div>
    );
  }

  // Login sayfası
  if (appState === 'login') {
    return (
      <LoginScreen onAuthChoice={handleAuthChoice} />
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
      <CategoryScreen 
        selectedLanguage={selectedLanguage}
        onCategorySelect={handleCategorySelect}
        onBack={() => setAppState('logo')}
        onSettingsOpen={handleSettingsOpen}
        isGuestMode={isGuestMode}
      />
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
      </div>
    );
  }

  return null;
}
