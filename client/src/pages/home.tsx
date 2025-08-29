import { useState } from 'react';
import { LanguageScreen, type Language } from '@/components/game/LanguageScreen';
import { LoginScreen } from '@/components/game/LoginScreen';
import { MenuScreen, type GameSettings } from '@/components/game/MenuScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { useAuth } from '@/hooks/useAuth';

type AppState = 'language' | 'login' | 'menu' | 'game';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    // Check if user is already authenticated
    if (isAuthenticated) {
      setAppState('menu');
    } else {
      setAppState('login');
    }
  };

  const handleGuestMode = () => {
    setIsGuestMode(true);
    setAppState('menu');
  };

  const handleStartGame = (settings: GameSettings) => {
    setGameSettings(settings);
    setAppState('game');
  };

  const handleGameOver = () => {
    setGameSettings(null);
    setAppState('menu');
  };

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #00dccd 0%, #f8bbd9 50%, #e91e63 100%)',
    minHeight: '100vh'
  };

  if (appState === 'language') {
    return (
      <div style={backgroundStyle}>
        <LanguageScreen onLanguageSelect={handleLanguageSelect} />
      </div>
    );
  }

  if (appState === 'login') {
    return (
      <div style={backgroundStyle}>
        <LoginScreen 
          selectedLanguage={selectedLanguage!} 
          onBack={() => setAppState('language')}
          onGuestMode={handleGuestMode}
        />
      </div>
    );
  }

  if (appState === 'menu') {
    return (
      <div style={backgroundStyle}>
        <MenuScreen 
          selectedLanguage={selectedLanguage!} 
          onStartGame={handleStartGame} 
          onBack={() => setAppState(isGuestMode ? 'language' : (isAuthenticated ? 'login' : 'language'))}
          isGuestMode={isGuestMode}
        />
      </div>
    );
  }

  if (appState === 'game') {
    return (
      <div style={backgroundStyle}>
        <GameScreen settings={gameSettings!} onGameOver={handleGameOver} isGuestMode={isGuestMode} />
      </div>
    );
  }

  return null;
}
