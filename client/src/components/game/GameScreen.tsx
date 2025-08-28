import { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GameHeader } from './GameHeader';
import { SpinningWheel } from './SpinningWheel';
import { VirtualKeyboard } from './VirtualKeyboard';
import { GameStats } from './GameStats';
import { CountdownOverlay } from './CountdownOverlay';
import { GameResultModal } from './GameResultModal';
import { getWordByDifficulty } from '@/lib/wordLists';
import { TOTAL_GAME_TIME, calculateScore, getSpinDuration, shouldShowCountdown, getThemeForCategory } from '@/lib/gameUtils';
import type { GameSettings } from './MenuScreen';

interface GameScreenProps {
  settings: GameSettings;
  onGameOver: () => void;
}

export const GameScreen = memo(({ settings, onGameOver }: GameScreenProps) => {
  const { category, difficulty } = settings;
  const theme = getThemeForCategory(category);
  
  const [secretWord, setSecretWord] = useState('');
  const [guess, setGuess] = useState('');
  const [isSpinning, setIsSpinning] = useState(true);
  const [spinDuration, setSpinDuration] = useState(3.0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [slowdownApplied, setSlowdownApplied] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const timeLeft = TOTAL_GAME_TIME - Math.floor(elapsedTime);
  const showCountdown = shouldShowCountdown(timeLeft, gameOver);

  // Dynamic background based on time left
  const dynamicBackground = useMemo(() => {
    if (timeLeft > 20) {
      return theme.background;
    } else if (timeLeft > 10) {
      // Transition to orange/yellow
      return `linear-gradient(135deg, ${theme.background.match(/hsl\([^)]+\)/)?.[0] || 'hsl(25, 95%, 15%)'} 0%, hsl(45, 80%, 10%) 100%)`;
    } else {
      // Transition to red (danger)
      return 'linear-gradient(135deg, hsl(0, 70%, 15%) 0%, hsl(15, 80%, 10%) 100%)';
    }
  }, [timeLeft, theme.background]);

  // Get used keys from current guess
  const usedKeys = useMemo(() => {
    return guess.toUpperCase().split('').filter((char, index, arr) => 
      arr.indexOf(char) === index && char !== ' '
    );
  }, [guess]);

  // Initialize game
  useEffect(() => {
    const randomWord = getWordByDifficulty(category, difficulty);
    setSecretWord(randomWord);
    
    const baseSpeed = getSpinDuration(difficulty, TOTAL_GAME_TIME);
    setSpinDuration(baseSpeed);
    
    timerRef.current = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [category, difficulty]);
  
  // Handle time countdown effects
  useEffect(() => {
    if (timeLeft <= 10 && !gameOver && !slowdownApplied) {
      setSpinDuration(prevDuration => prevDuration + 1.5);
      setSlowdownApplied(true);
    }

    if (timeLeft <= 0 && !gameOver) {
      endGame("Süre Doldu!", false);
    }
  }, [timeLeft, gameOver, slowdownApplied]);

  const endGame = useCallback((endMessage: string, success: boolean) => {
    if (gameOver) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setMessage(endMessage);
    setIsSpinning(false);
    setGameOver(true);
    setGameSuccess(success);
    
    if (success) {
      const scoreGained = calculateScore(Math.floor(elapsedTime), difficulty);
      setScore(scoreGained);
      setTotalScore(prev => prev + scoreGained);
      setStreak(prev => prev + 1);
      setCorrectGuesses(prev => prev + 1);
      setAverageTime(Math.floor(elapsedTime));
    } else {
      setStreak(0);
    }
    
    setTimeout(() => setShowResultModal(true), 1000);
  }, [gameOver, elapsedTime, difficulty]);

  const handleGuessSubmit = useCallback(() => {
    if (gameOver) return;
    
    if (guess.toUpperCase() === secretWord.toUpperCase()) {
      endGame(`Tebrikler! ${Math.floor(elapsedTime)} saniyede bildin.`, true);
    } else {
      setMessage("Yanlış Tahmin!");
      setGuess(''); 
      setTimeout(() => setMessage(''), 1500);
    }
  }, [gameOver, guess, secretWord, elapsedTime, endGame]);

  const handleKeyPress = useCallback((key: string) => {
    setGuess(prev => prev + key);
  }, []);

  const handleBackspace = useCallback(() => {
    setGuess(prev => prev.slice(0, -1));
  }, []);

  const handleSpace = useCallback(() => {
    setGuess(prev => prev + ' ');
  }, []);

  const handlePlayAgain = useCallback(() => {
    // Reset all game state
    setGuess('');
    setIsSpinning(true);
    setMessage('');
    setGameOver(false);
    setElapsedTime(0);
    setSlowdownApplied(false);
    setShowResultModal(false);
    setGameSuccess(false);
    setScore(0);
    
    // Get new word and reset timer
    const randomWord = getWordByDifficulty(category, difficulty);
    setSecretWord(randomWord);
    
    const baseSpeed = getSpinDuration(difficulty, TOTAL_GAME_TIME);
    setSpinDuration(baseSpeed);
    
    timerRef.current = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
  }, [category, difficulty]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;
      
      const key = event.key.toUpperCase();
      
      if (key === 'ENTER') {
        handleGuessSubmit();
      } else if (key === 'BACKSPACE') {
        handleBackspace();
      } else if (key === ' ') {
        event.preventDefault();
        handleSpace();
      } else if (/^[A-ZÇĞIİÖŞÜ]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, handleGuessSubmit, handleBackspace, handleSpace, handleKeyPress]);

  return (
    <>
      <CountdownOverlay timeLeft={timeLeft} isVisible={showCountdown} />
      <GameResultModal
        isVisible={showResultModal}
        isSuccess={gameSuccess}
        title={gameSuccess ? "Tebrikler!" : "Oyun Bitti!"}
        message={message}
        scoreGained={score}
        totalScore={totalScore}
        onPlayAgain={handlePlayAgain}
        onMainMenu={onGameOver}
      />
      
      <div 
        className="min-h-screen relative overflow-hidden transition-all duration-1000"
        style={{ 
          backgroundImage: dynamicBackground,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                width: Math.random() * 80 + 30,
                height: Math.random() * 80 + 30,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <GameHeader 
          category={category} 
          difficulty={difficulty} 
          timeLeft={timeLeft}
          totalTime={TOTAL_GAME_TIME}
        />
        
        <main className="pt-20 pb-8 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <SpinningWheel 
              word={secretWord} 
              isSpinning={isSpinning} 
              spinDuration={spinDuration} 
              difficulty={difficulty}
              category={category}
            />
            
            {message && (
              <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-accent animate-bounce-soft" data-testid="game-message">
                    {message}
                  </p>
                  <p className="text-muted-foreground">Kelimeyi tahmin etmeye çalış</p>
                </div>
              </div>
            )}
            
            {!gameOver && (
              <>
                <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="backdrop-blur-xl rounded-3xl p-8 border border-white/20 w-full max-w-2xl shadow-2xl" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                  }}>
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full px-8 py-6 text-3xl font-black text-center text-white backdrop-blur-lg border-2 border-white/30 rounded-2xl focus:outline-none focus:border-white/60 transition-all duration-300 placeholder:text-white/50"
                          style={{ 
                            background: 'rgba(255,255,255,0.1)',
                            textShadow: '0 0 20px rgba(255,255,255,0.5)'
                          }}
                          placeholder="KELİMEYİ YAZIN..."
                          value={guess}
                          onChange={(e) => setGuess(e.target.value.toUpperCase())}
                          data-testid="input-guess"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                          <div 
                            className="w-4 h-4 rounded-full animate-pulse shadow-lg"
                            style={{ background: theme.primary, boxShadow: `0 0 10px ${theme.primary}` }}
                          />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                          <div 
                            className="h-1 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.max(20, guess.length * 8)}px`,
                              background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <VirtualKeyboard
                  onKeyPress={handleKeyPress}
                  onBackspace={handleBackspace}
                  onSpace={handleSpace}
                  onSubmit={handleGuessSubmit}
                  usedKeys={usedKeys}
                />
              </>
            )}
            
            <GameStats
              score={totalScore}
              streak={streak}
              correctGuesses={correctGuesses}
              averageTime={averageTime}
            />
          </div>
        </main>
      </div>
    </>
  );
});

GameScreen.displayName = 'GameScreen';
