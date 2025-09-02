import { useState, useEffect, useMemo } from 'react';
import { LuminaMenu } from '@/components/pages/LuminaMenu';
import { LuminaCategories } from '@/components/pages/LuminaCategories';
import { LuminaGame } from '@/components/pages/LuminaGame';
import { LuminaGameOver } from '@/components/LuminaGameOver';
import { LuminaLogin } from '@/components/pages/LuminaLogin';
import { LuminaSettings } from '@/components/pages/LuminaSettings';
import { getWordByDifficulty } from '@/lib/wordLists';

type AppScreen = 'menu' | 'categories' | 'game' | 'gameover' | 'login' | 'settings';

interface GameState {
  currentWord: string;
  guessedWord: string;
  category: string;
  difficulty: string;
  timeLeft: number;
  score: number;
  streak: number;
  isSpinning: boolean;
  guesses: string[];
  maxGuesses: number;
  isGameOver: boolean;
  gameSuccess: boolean;
  lives: number;
  usedLetters: string[];
}

const initialGameState: GameState = {
  currentWord: '',
  guessedWord: '',
  category: 'Hayvanlar',
  difficulty: 'Orta',
  timeLeft: 30,
  score: 0,
  streak: 5,
  isSpinning: true,
  guesses: [],
  maxGuesses: 6,
  isGameOver: false,
  gameSuccess: false,
  lives: 3,
  usedLetters: []
};

export default function LuminaApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('menu');
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [playerProfile, setPlayerProfile] = useState({
    name: 'Oyuncu',
    gamesPlayed: 247,
    successRate: 89,
    bestStreak: 15,
    totalScore: 1247
  });

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentScreen === 'game' && !gameState.isGameOver && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          
          // Game over if time runs out
          if (newTimeLeft <= 0) {
            setTimeout(() => setCurrentScreen('gameover'), 1500);
            return {
              ...prev,
              timeLeft: 0,
              isGameOver: true,
              gameSuccess: false,
              isSpinning: false
            };
          }
          
          // Adjust spinning based on time
          const newIsSpinning = newTimeLeft > 5; // Stop spinning in last 5 seconds
          
          return {
            ...prev,
            timeLeft: newTimeLeft,
            isSpinning: newIsSpinning
          };
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentScreen, gameState.isGameOver, gameState.timeLeft]);

  const handleStartGame = () => {
    setCurrentScreen('categories');
  };

  const handleCategorySelect = (category: string, difficulty: string) => {
    // Convert difficulty string to number
    let difficultyLevel = 2; // default to medium
    switch(difficulty.toLowerCase()) {
      case 'easy':
      case 'kolay':
        difficultyLevel = 1;
        break;
      case 'medium':
      case 'orta':
        difficultyLevel = 2;
        break;
      case 'hard':
      case 'zor':
        difficultyLevel = 3;
        break;
      default:
        difficultyLevel = parseInt(difficulty) || 2;
    }
    
    const word = getWordByDifficulty(category, difficultyLevel);
    console.log('Selected category:', category, 'difficulty:', difficulty, 'level:', difficultyLevel, 'word:', word);
    
    if (!word) {
      console.error('No word found for category:', category, 'difficulty:', difficultyLevel);
      return;
    }
    
    setGameState({
      ...initialGameState,
      currentWord: word,
      guessedWord: word.replace(/./g, '_'),
      category,
      difficulty: difficulty,
      timeLeft: 30,
      isSpinning: true
    });
    setCurrentScreen('game');
  };

  const handleGameOver = (success: boolean, finalScore: number) => {
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      gameSuccess: success,
      score: finalScore,
      isSpinning: false
    }));
    
    // Update player stats
    setPlayerProfile(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + finalScore,
      successRate: success ? Math.min(prev.successRate + 1, 100) : Math.max(prev.successRate - 1, 0),
      streak: success ? gameState.streak + 1 : 0,
      bestStreak: success ? Math.max(prev.bestStreak, gameState.streak + 1) : prev.bestStreak
    }));
    
    setCurrentScreen('gameover');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('categories');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleKeyPress = (key: string) => {
    if (gameState.isGameOver) return;
    
    setGameState(prev => {
      if (prev.usedLetters.includes(key)) return prev;
      
      const newUsedLetters = [...prev.usedLetters, key];
      let newGuessedWord = prev.guessedWord;
      let correctGuess = false;
      
      // Check if letter is in word
      for (let i = 0; i < prev.currentWord.length; i++) {
        if (prev.currentWord[i].toUpperCase() === key.toUpperCase()) {
          newGuessedWord = newGuessedWord.split('').map((char, index) => 
            index === i ? prev.currentWord[i] : char
          ).join('');
          correctGuess = true;
        }
      }
      
      const newLives = correctGuess ? prev.lives : prev.lives - 1;
      const wordComplete = !newGuessedWord.includes('_');
      
      // Check win condition
      if (wordComplete) {
        const finalScore = prev.timeLeft * 10; // Score based on time left
        setTimeout(() => handleGameOver(true, finalScore), 500);
      }
      // Check lose condition
      else if (newLives <= 0) {
        setTimeout(() => handleGameOver(false, 0), 500);
      }
      
      return {
        ...prev,
        guessedWord: newGuessedWord,
        usedLetters: newUsedLetters,
        lives: newLives
      };
    });
  };

  // Turkish keyboard layout for game
  const turkishKeyboardLayout = useMemo(() => [
    ['Q','W','E','R','T','Y','U','I','O','P','Ğ','Ü'],
    ['A','S','D','F','G','H','J','K','L','Ş','İ'],
    ['Z','X','C','V','B','N','M','Ö','Ç']
  ], []);

  // Render current screen
  switch (currentScreen) {
    case 'menu':
      return (
        <LuminaMenu
          playerStats={{
            gamesPlayed: playerProfile.gamesPlayed,
            successRate: playerProfile.successRate,
            bestStreak: playerProfile.bestStreak
          }}
          onStartGame={handleStartGame}
          onSettings={() => setCurrentScreen('settings')}
          onLogin={() => setCurrentScreen('login')}
        />
      );

    case 'categories':
      return (
        <LuminaCategories
          onGameStart={handleCategorySelect}
          onBack={handleBackToMenu}
        />
      );

    case 'game':
      return (
        <LuminaGame
          gameState={gameState}
          onKeyPress={handleKeyPress}
          onGameOver={handleGameOver}
          onBack={() => setCurrentScreen('categories')}
          turkishKeyboard={turkishKeyboardLayout}
        />
      );

    case 'gameover':
      return (
        <LuminaGameOver
          gameSuccess={gameState.gameSuccess}
          score={gameState.score}
          word={gameState.currentWord}
          timeLeft={gameState.timeLeft}
          streak={gameState.streak}
          category={gameState.category}
          onPlayAgain={handlePlayAgain}
          onMainMenu={handleBackToMenu}
        />
      );

    case 'login':
      return (
        <LuminaLogin
          onLogin={() => setCurrentScreen('menu')}
          onBack={handleBackToMenu}
          onGuestMode={() => setCurrentScreen('menu')}
        />
      );

    case 'settings':
      return (
        <LuminaSettings
          playerProfile={playerProfile}
          onBack={handleBackToMenu}
          onProfileUpdate={setPlayerProfile}
        />
      );

    default:
      return <LuminaMenu 
        playerStats={{
          gamesPlayed: playerProfile.gamesPlayed,
          successRate: playerProfile.successRate,
          bestStreak: playerProfile.bestStreak
        }} 
        onStartGame={handleStartGame} 
        onSettings={() => setCurrentScreen('settings')} 
        onLogin={() => setCurrentScreen('login')} 
      />;
  }
}