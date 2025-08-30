import { useState } from 'react';
import { LanguageScreen, type Language } from '@/components/game/LanguageScreen';
import { LogoScreen } from '@/components/game/LogoScreen';
import { CategoryScreen } from '@/components/game/CategoryScreen';
import { DifficultyScreen } from '@/components/game/DifficultyScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { useAuth } from '@/hooks/useAuth';

type AppState = 'logo' | 'language' | 'category' | 'difficulty' | 'game';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('logo');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(3);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setAppState('category');
  };

  const handleAuthChoice = (isGuest: boolean) => {
    setIsGuestMode(isGuest);
    setAppState('language');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setAppState('difficulty');
  };

  const handleDifficultySelect = (difficulty: number) => {
    setSelectedDifficulty(difficulty);
    setAppState('game');
  };

  const handleGameOver = () => {
    setAppState('category');
  };

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #00dccd 0%, #f8bbd9 50%, #e91e63 100%)',
    minHeight: '100vh'
  };

  // Logo ve giriş sayfası
  if (appState === 'logo') {
    return (
      <LogoScreen onAuthChoice={handleAuthChoice} />
    );
  }

  // Dil seçimi
  if (appState === 'language') {
    return (
      <div style={backgroundStyle}>
        <LanguageScreen onLanguageSelect={handleLanguageSelect} />
      </div>
    );
  }

  // Kategori seçimi  
  if (appState === 'category') {
    return (
      <CategoryScreen 
        selectedLanguage={selectedLanguage!}
        onCategorySelect={handleCategorySelect}
        onBack={() => setAppState('language')}
        isGuestMode={isGuestMode}
      />
    );
  }

  // Zorluk seçimi
  if (appState === 'difficulty') {
    return (
      <DifficultyScreen 
        selectedLanguage={selectedLanguage!}
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
      language: selectedLanguage!
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
