import { useState, useEffect, useMemo } from 'react';
import { LuminaMenu } from '@/components/pages/LuminaMenu';
import { LuminaCategories } from '@/components/pages/LuminaCategories';
import { LuminaGame } from '@/components/pages/LuminaGame';
import { LuminaGameOver } from '@/components/LuminaGameOver';
import { LuminaLogin } from '@/components/pages/LuminaLogin';
import { LuminaSettings } from '@/components/pages/LuminaSettings';
import { getWordByDifficulty } from '@/lib/wordLists';
import { useAuth } from '@/hooks/useAuth';
import { useGameStats } from '@/hooks/useGameStats';
import { useQueryClient } from '@tanstack/react-query';

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
  isSequentialGuess: boolean;
  nextExpectedLetterIndex: number;
  sequentialCount: number;
  totalCorrect: number;
  bestStreak: number;
}

const initialGameState: GameState = {
  currentWord: '',
  guessedWord: '',
  category: 'Hayvanlar',
  difficulty: 'Orta',
  timeLeft: 30,
  score: 0,
  streak: 0,
  isSpinning: true,
  guesses: [],
  maxGuesses: 6,
  isGameOver: false,
  gameSuccess: false,
  lives: 3,
  usedLetters: [],
  isSequentialGuess: true,
  nextExpectedLetterIndex: 0,
  sequentialCount: 0,
  totalCorrect: 0,
  bestStreak: 0
};

export default function LuminaApp() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { saveGameSession, stats } = useGameStats();
  const queryClient = useQueryClient();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('menu');
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // Calculate current player profile based on auth status and stats
  const playerProfile = useMemo(() => ({
    name: user?.firstName || user?.email || 'Oyuncu',
    gamesPlayed: (isAuthenticated && stats) ? stats.gamesPlayed : 0,
    successRate: (isAuthenticated && stats) ? stats.successRate : 0,
    bestStreak: (isAuthenticated && stats) ? stats.bestStreak : 0,
    totalScore: (isAuthenticated && stats) ? stats.totalScore : 0
  }), [user?.firstName, user?.email, isAuthenticated, stats]);

  // Category progress tracking - track completed words per category/difficulty
  const [categoryProgress, setCategoryProgress] = useState<{[key: string]: {[difficulty: string]: number}}>({});
  
  // Used words tracking to prevent repetition
  const [usedWords, setUsedWords] = useState<{[key: string]: {[difficulty: string]: string[]}}>({});

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
    
    const categoryUsedWords = usedWords[category]?.[difficulty] || [];
    const word = getWordByDifficulty(category, difficultyLevel, categoryUsedWords);
    console.log('Selected category:', category, 'difficulty:', difficulty, 'level:', difficultyLevel, 'word:', word);
    
    if (!word) {
      console.error('No word found for category:', category, 'difficulty:', difficultyLevel);
      return;
    }
    
    setGameState(prev => ({
      ...initialGameState,
      currentWord: word,
      guessedWord: word.replace(/./g, '_'),
      category,
      difficulty: difficulty,
      timeLeft: 30,
      isSpinning: true
    }));
    setCurrentScreen('game');
  };

  const handleGameOver = async (success: boolean, finalScore: number, gameTime?: number) => {
    const timeSpent = gameTime || (30 - gameState.timeLeft);
    
    if (success) {
      // Doğru tahmin: Seri artır, yeni kelime getir, oyun devam etsin
      const newStreak = gameState.streak + 1;
      
      // Update category progress and used words
      const categoryKey = gameState.category;
      const difficultyKey = gameState.difficulty;
      const currentWord = gameState.currentWord;
      
      setCategoryProgress(prev => ({
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          [difficultyKey]: (prev[categoryKey]?.[difficultyKey] || 0) + 1
        }
      }));
      
      // Add word to used words list
      setUsedWords(prev => ({
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          [difficultyKey]: [...(prev[categoryKey]?.[difficultyKey] || []), currentWord]
        }
      }));

      // Get next word for continuous play
      let difficultyLevel = 1;
      switch(gameState.difficulty.toLowerCase()) {
        case 'kolay':
          difficultyLevel = 1;
          break;
        case 'orta':
          difficultyLevel = 2;
          break;
        case 'zor':
          difficultyLevel = 3;
          break;
        default:
          difficultyLevel = parseInt(gameState.difficulty) || 2;
      }
      
      const categoryUsedWords = usedWords[categoryKey]?.[difficultyKey] || [];
      let nextWord = getWordByDifficulty(categoryKey, difficultyLevel, [...categoryUsedWords, currentWord]);
      
      // If no word found (category completed), reset used words and try again
      if (!nextWord) {
        // Reset used words for this category/difficulty
        setUsedWords(prev => ({
          ...prev,
          [categoryKey]: {
            ...prev[categoryKey],
            [difficultyKey]: [] // Reset to empty array
          }
        }));
        
        // Get a new word with fresh pool (excluding current word)
        nextWord = getWordByDifficulty(categoryKey, difficultyLevel, [currentWord]);
      }
      
      if (nextWord) {
        // Continue with next word
        setGameState(prev => ({
          ...prev,
          currentWord: nextWord,
          guessedWord: nextWord.replace(/./g, '_'),
          timeLeft: 30,
          usedLetters: [],
          streak: newStreak,
          score: prev.score + finalScore,
          isSpinning: true,
          // Reset sequential tracking for new word
          isSequentialGuess: true,
          nextExpectedLetterIndex: 0,
          sequentialCount: prev.sequentialCount + (prev.isSequentialGuess ? 1 : 0),
          totalCorrect: prev.totalCorrect + 1,
          bestStreak: Math.max(prev.bestStreak, newStreak)
        }));
        return; // Don't go to game over screen
      } else {
        // This should never happen now, but keep as fallback
        console.error('Still no word available even after reset - this should not happen');
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          gameSuccess: true,
          streak: newStreak,
          isSpinning: false
        }));
      }
    } else {
      // Yanlış tahmin: Oyun bitir, seri kaydet
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        gameSuccess: false,
        score: prev.score + finalScore, // Add final word score to total
        isSpinning: false
      }));
      
      // Save final streak session to database if user is authenticated
      if (isAuthenticated) {
        try {
          await saveGameSession({
            category: gameState.category,
            difficulty: gameState.difficulty.toLowerCase(),
            word: gameState.currentWord,
            isCorrect: false,
            score: gameState.streak, // Save the achieved streak as final score
            guessTime: timeSpent,
          });
        } catch (error) {
          console.error('Failed to save game session:', error);
        }
      }
    }
    
    setCurrentScreen('gameover');
  };

  const handleContinue = () => {
    // Check if category is completed (50 words)
    const categoryKey = gameState.category;
    const difficultyKey = gameState.difficulty;
    const completedWords = categoryProgress[categoryKey]?.[difficultyKey] || 0;
    
    if (completedWords < 50) {
      // Continue with same category/difficulty
      handleCategorySelect(gameState.category, gameState.difficulty);
    } else {
      // Category completed, go back to selection
      setCurrentScreen('categories');
    }
  };

  const handlePlayAgain = () => {
    // Refresh stats when going to categories
    if (isAuthenticated) {
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
    setCurrentScreen('categories');
  };

  const handleBackToMenu = () => {
    // Refresh stats when going to menu
    if (isAuthenticated) {
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
    setCurrentScreen('menu');
  };

  const handleKeyPress = (key: string) => {
    if (gameState.isGameOver) return;
    
    setGameState(prev => {
      if (prev.usedLetters.includes(key)) return prev;
      
      const newUsedLetters = [...prev.usedLetters, key];
      let newGuessedWord = prev.guessedWord;
      let correctGuess = false;
      let newIsSequentialGuess = prev.isSequentialGuess;
      let newNextExpectedLetterIndex = prev.nextExpectedLetterIndex;
      
      // Check if letter is in word
      for (let i = 0; i < prev.currentWord.length; i++) {
        if (prev.currentWord[i].toUpperCase() === key.toUpperCase()) {
          newGuessedWord = newGuessedWord.split('').map((char, index) => 
            index === i ? prev.currentWord[i] : char
          ).join('');
          correctGuess = true;
        }
      }
      
      // Check sequential bonus - oyuncu sırayla mı gidiyor?
      if (correctGuess && newIsSequentialGuess) {
        // Sonraki beklenen harf bu mu?
        if (newNextExpectedLetterIndex < prev.currentWord.length && 
            prev.currentWord[newNextExpectedLetterIndex].toUpperCase() === key.toUpperCase()) {
          // Sıralı devam ediyor!
          newNextExpectedLetterIndex++;
        } else {
          // Sıralı bozuldu
          newIsSequentialGuess = false;
        }
      } else if (correctGuess && !newIsSequentialGuess) {
        // Zaten sıra bozulmuş, normal devam et
      } else if (!correctGuess) {
        // Yanlış harf, sıra bozuldu
        newIsSequentialGuess = false;
      }
      
      const newLives = correctGuess ? prev.lives : prev.lives - 1;
      const wordComplete = !newGuessedWord.includes('_');
      
      // Check win condition
      if (wordComplete) {
        // Sıralı bonus kontrolü
        const baseScore = prev.timeLeft * 10;
        const finalScore = newIsSequentialGuess ? baseScore * 2 : baseScore;
        
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
        lives: newLives,
        isSequentialGuess: newIsSequentialGuess,
        nextExpectedLetterIndex: newNextExpectedLetterIndex
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
      const categoryKey = gameState.category;
      const difficultyKey = gameState.difficulty;
      const completedWords = categoryProgress[categoryKey]?.[difficultyKey] || 0;
      const canContinue = gameState.gameSuccess && completedWords < 50;
      
      return (
        <LuminaGameOver
          gameSuccess={gameState.gameSuccess}
          score={gameState.score}
          word={gameState.currentWord}
          timeLeft={gameState.timeLeft}
          streak={gameState.streak}
          category={gameState.category}
          sequentialCount={gameState.sequentialCount}
          totalCorrect={gameState.totalCorrect}
          bestStreak={gameState.bestStreak}
          onContinue={canContinue ? handleContinue : undefined}
          onPlayAgain={handlePlayAgain}
          onMainMenu={handleBackToMenu}
          completedWords={completedWords}
          totalWords={50}
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
          onProfileUpdate={() => {}}
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