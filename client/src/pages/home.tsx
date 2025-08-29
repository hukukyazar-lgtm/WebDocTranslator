import { useState } from 'react';
import { LanguageScreen, type Language } from '@/components/game/LanguageScreen';
import { MenuScreen, type GameSettings } from '@/components/game/MenuScreen';
import { GameScreen } from '@/components/game/GameScreen';

type AppState = 'language' | 'menu' | 'game';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
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

  if (appState === 'menu') {
    return (
      <div style={backgroundStyle}>
        <MenuScreen 
          selectedLanguage={selectedLanguage!} 
          onStartGame={handleStartGame} 
          onBack={() => setAppState('language')}
        />
      </div>
    );
  }

  if (appState === 'game') {
    return (
      <div style={backgroundStyle}>
        <GameScreen settings={gameSettings!} onGameOver={handleGameOver} />
      </div>
    );
  }

  return null;
}
