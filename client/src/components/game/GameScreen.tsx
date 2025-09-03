import { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GameHeader } from './GameHeader';
import { SpinningWheel } from './SpinningWheel';
import { LuminaGrid } from './LuminaGrid';
import { VirtualKeyboard } from './VirtualKeyboard';
import { AchievementNotification } from './AchievementNotification';
import { simpleAudio } from '@/lib/simpleAudio';
import { getWordByDifficulty, wordLists } from '@/lib/wordLists';
import { 
  TOTAL_GAME_TIME, 
  calculateScore, 
  calculateStreakMultiplier,
  getSpinDuration, 
  getThemeForCategory, 
  formatTime,
  updateGameStats,
  type GameStats as GameStatsType,
  type Achievement,
  getDefaultAchievements,
  getDefaultDailyGoals
} from '@/lib/gameUtils';
import type { GameSettings } from './MenuScreen';
import type { Language } from './LanguageScreen';
import { getTranslation, getCategoryTranslation } from '@/lib/translations';

// Game translations
const gameTranslations = {
  tr: {
    congratulations: 'Tebrikler!',
    gameOver: 'Oyun Bitti!',
    timeUp: 'Süre doldu!',
    wrongAnswer: 'Yanlış cevap!',
    correct: 'Doğru!',
    score: 'Puan',
    streak: 'Seri',
    totalScore: 'Toplam Puan',
    averageTime: 'Ortalama Süre',
    correctGuesses: 'Doğru Tahmin',
    newGame: 'Yeni Oyun',
    continue: 'Devam Et',
    category: 'Kategori',
    difficulty: 'Zorluk',
    timeLeft: 'Kalan Süre',
    submit: 'Gönder',
    giveUp: 'Pes Et',
    seconds: 'saniye',
    guestMode: 'Misafir Modu',
    mainMenu: 'Ana Menü'
  },
  en: {
    congratulations: 'Congratulations!',
    gameOver: 'Game Over!',
    timeUp: 'Time\'s up!',
    wrongAnswer: 'Wrong answer!',
    correct: 'Correct!',
    score: 'Score',
    streak: 'Streak',
    totalScore: 'Total Score',
    averageTime: 'Average Time',
    correctGuesses: 'Correct Guesses',
    newGame: 'New Game',
    continue: 'Continue',
    category: 'Category',
    difficulty: 'Difficulty',
    timeLeft: 'Time Left',
    submit: 'Submit',
    giveUp: 'Give Up',
    seconds: 'seconds',
    guestMode: 'Guest Mode',
    mainMenu: 'Main Menu'
  },
  es: {
    congratulations: '¡Felicidades!',
    gameOver: '¡Juego Terminado!',
    timeUp: '¡Se acabó el tiempo!',
    wrongAnswer: '¡Respuesta incorrecta!',
    correct: '¡Correcto!',
    score: 'Puntuación',
    streak: 'Racha',
    totalScore: 'Puntuación Total',
    averageTime: 'Tiempo Promedio',
    correctGuesses: 'Aciertos',
    newGame: 'Nuevo Juego',
    continue: 'Continuar',
    category: 'Categoría',
    difficulty: 'Dificultad',
    timeLeft: 'Tiempo Restante',
    enterGuess: 'Ingresa tu respuesta...',
    submit: 'Enviar',
    giveUp: 'Rendirse',
    seconds: 'segundos',
    guestMode: 'Modo Invitado',
    mainMenu: 'Menú Principal'
  },
  it: {
    congratulations: 'Congratulazioni!',
    gameOver: 'Gioco Finito!',
    timeUp: 'Tempo scaduto!',
    wrongAnswer: 'Risposta sbagliata!',
    correct: 'Corretto!',
    score: 'Punteggio',
    streak: 'Serie',
    totalScore: 'Punteggio Totale',
    averageTime: 'Tempo Medio',
    correctGuesses: 'Risposte Corrette',
    newGame: 'Nuovo Gioco',
    continue: 'Continua',
    category: 'Categoria',
    difficulty: 'Difficoltà',
    timeLeft: 'Tempo Rimasto',
    enterGuess: 'Inserisci la tua risposta...',
    submit: 'Invia',
    giveUp: 'Arrendersi',
    seconds: 'secondi',
    guestMode: 'Modalità Ospite',
    mainMenu: 'Menu Principale'
  },
  fr: {
    congratulations: 'Félicitations!',
    gameOver: 'Jeu Terminé!',
    timeUp: 'Temps écoulé!',
    wrongAnswer: 'Mauvaise réponse!',
    correct: 'Correct!',
    score: 'Score',
    streak: 'Série',
    totalScore: 'Score Total',
    averageTime: 'Temps Moyen',
    correctGuesses: 'Bonnes Réponses',
    newGame: 'Nouveau Jeu',
    continue: 'Continuer',
    category: 'Catégorie',
    difficulty: 'Difficulté',
    timeLeft: 'Temps Restant',
    enterGuess: 'Entrez votre réponse...',
    submit: 'Envoyer',
    giveUp: 'Abandonner',
    seconds: 'secondes',
    guestMode: 'Mode Invité',
    mainMenu: 'Menu Principal'
  },
  de: {
    congratulations: 'Glückwunsch!',
    gameOver: 'Spiel Beendet!',
    timeUp: 'Zeit ist um!',
    wrongAnswer: 'Falsche Antwort!',
    correct: 'Richtig!',
    score: 'Punkte',
    streak: 'Serie',
    totalScore: 'Gesamtpunkte',
    averageTime: 'Durchschnittszeit',
    correctGuesses: 'Richtige Antworten',
    newGame: 'Neues Spiel',
    continue: 'Weiter',
    category: 'Kategorie',
    difficulty: 'Schwierigkeit',
    timeLeft: 'Verbleibende Zeit',
    enterGuess: 'Geben Sie Ihre Antwort ein...',
    submit: 'Senden',
    giveUp: 'Aufgeben',
    seconds: 'sekunden',
    guestMode: 'Gastmodus',
    mainMenu: 'Hauptmenü'
  }
};

// Category translations
const categoryTranslations = {
  tr: {
    'Hayvanlar': 'Hayvanlar',
    'Yiyecek': 'Yiyecek',
    'Bilim': 'Bilim',
    'Ülkeler': 'Ülkeler',
    'Meslekler': 'Meslekler',
    'Şehirler': 'Şehirler',
    'Markalar': 'Markalar',
    'Spor Dalları': 'Spor Dalları',
    'Eşyalar': 'Eşyalar',
    'Filmler': 'Filmler',
    'Karışık': 'Karışık'
  },
  en: {
    'Hayvanlar': 'Animals',
    'Yiyecek': 'Food',
    'Bilim': 'Science',
    'Ülkeler': 'Countries',
    'Meslekler': 'Professions',
    'Şehirler': 'Cities',
    'Markalar': 'Brands',
    'Spor Dalları': 'Sports',
    'Eşyalar': 'Objects',
    'Filmler': 'Movies',
    'Karışık': 'Mixed'
  },
  es: {
    'Hayvanlar': 'Animales',
    'Yiyecek': 'Comida',
    'Bilim': 'Ciencia',
    'Ülkeler': 'Países',
    'Meslekler': 'Profesiones',
    'Şehirler': 'Ciudades',
    'Markalar': 'Marcas',
    'Spor Dalları': 'Deportes',
    'Eşyalar': 'Objetos',
    'Filmler': 'Películas',
    'Karışık': 'Mixto'
  },
  it: {
    'Hayvanlar': 'Animali',
    'Yiyecek': 'Cibo',
    'Bilim': 'Scienza',
    'Ülkeler': 'Paesi',
    'Meslekler': 'Professioni',
    'Şehirler': 'Città',
    'Markalar': 'Marchi',
    'Spor Dalları': 'Sport',
    'Eşyalar': 'Oggetti',
    'Filmler': 'Film',
    'Karışık': 'Misto'
  },
  fr: {
    'Hayvanlar': 'Animaux',
    'Yiyecek': 'Nourriture',
    'Bilim': 'Science',
    'Ülkeler': 'Pays',
    'Meslekler': 'Professions',
    'Şehirler': 'Villes',
    'Markalar': 'Marques',
    'Spor Dalları': 'Sports',
    'Eşyalar': 'Objets',
    'Filmler': 'Films',
    'Karışık': 'Mélangé'
  },
  de: {
    'Hayvanlar': 'Tiere',
    'Yiyecek': 'Essen',
    'Bilim': 'Wissenschaft',
    'Ülkeler': 'Länder',
    'Meslekler': 'Berufe',
    'Şehirler': 'Städte',
    'Markalar': 'Marken',
    'Spor Dalları': 'Sport',
    'Eşyalar': 'Objekte',
    'Filmler': 'Filme',
    'Karışık': 'Gemischt'
  }
};

interface GameScreenProps {
  settings: GameSettings;
  onGameOver: () => void;
  onCategoryComplete?: (nextCategory: string, difficulty: string) => void;
  isGuestMode?: boolean;
}

export const GameScreen = memo(({ settings, onGameOver, onCategoryComplete, isGuestMode = false }: GameScreenProps) => {
  const { category, difficulty, language } = settings;
  const theme = getThemeForCategory(category);
  const t = gameTranslations[language as Language];
  const categoryT = categoryTranslations[language as Language];
  
  const getCategoryName = (turkishName: string): string => {
    return (categoryT as Record<string, string>)[turkishName] || turkishName;
  };
  
  const [secretWord, setSecretWord] = useState('');
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]); // LUMINA tahmin geçmişi
  const maxGuesses = 4; // Daha az tahmin hakkı, daha kompakt grid
  const [isSpinning, setIsSpinning] = useState(true);
  const [spinDuration, setSpinDuration] = useState(3.0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [slowdownApplied, setSlowdownApplied] = useState(false);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [sparkleText, setSparkleText] = useState(false);
  const [forceKeyboardRender, setForceKeyboardRender] = useState(0);
  const [gameStats, setGameStats] = useState<GameStatsType>(() => ({
    totalGamesPlayed: 0,
    totalCorrectGuesses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalScore: 0,
    averageGuessTime: 0,
    categoryExpertise: {},
    achievements: getDefaultAchievements(),
    dailyGoals: getDefaultDailyGoals(),
    lastPlayedDate: new Date().toDateString()
  }));
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [showDailyGoals, setShowDailyGoals] = useState(false);
  
  // Kategori tamamlama takibi için basit sayaç
  const [categoryCorrectCount, setCategoryCorrectCount] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const timeLeft = TOTAL_GAME_TIME - Math.floor(elapsedTime);

  // Enhanced keyboard feedback system with Turkish character support
  const getKeyboardLetterStates = useMemo(() => {
    // If no guesses, game is over, or we just succeeded, return empty states to clear keyboard
    if (guesses.length === 0 || gameOver || gameSuccess) {
      return { correctKeys: [], presentKeys: [], absentKeys: [] };
    }

    const correctKeys: string[] = [];
    const presentKeys: string[] = [];
    const absentKeys: string[] = [];

    const targetWord = secretWord.toUpperCase();

    guesses.forEach(guess => {
      const guessWord = guess.toUpperCase();
      const usedTargetIndices = new Set<number>();

      // First find exact matches (correct position and letter)
      for (let i = 0; i < Math.min(guessWord.length, targetWord.length); i++) {
        if (guessWord[i] === targetWord[i]) {
          const letter = guessWord[i];
          if (!correctKeys.includes(letter)) {
            correctKeys.push(letter);
          }
          usedTargetIndices.add(i);
        }
      }

      // Then find present letters (wrong position but exists in word)
      for (let i = 0; i < guessWord.length; i++) {
        const letter = guessWord[i];
        
        // Skip if already marked as correct or if it's correct in this position
        if (correctKeys.includes(letter) || (i < targetWord.length && guessWord[i] === targetWord[i])) {
          continue;
        }

        // Check if letter exists elsewhere in target word
        let foundInTarget = false;
        for (let j = 0; j < targetWord.length; j++) {
          if (!usedTargetIndices.has(j) && targetWord[j] === letter) {
            foundInTarget = true;
            usedTargetIndices.add(j);
            break;
          }
        }
        
        if (foundInTarget && !presentKeys.includes(letter)) {
          presentKeys.push(letter);
        } else if (!foundInTarget && !absentKeys.includes(letter)) {
          absentKeys.push(letter);
        }
      }
    });

    // Debug logging
    if (guesses.length > 0) {
      console.log('Keyboard feedback:', { correctKeys, presentKeys, absentKeys, secretWord, guesses });
    }

    return { correctKeys, presentKeys, absentKeys };
  }, [secretWord, guesses, gameOver, gameSuccess]);

  // Dynamic background based on time left with dramatic color transitions
  const dynamicBackground = useMemo(() => {
    if (timeLeft > 15) {
      // Cool blues (30-16 seconds) - calm phase
      return 'linear-gradient(135deg, hsl(220, 80%, 15%) 0%, hsl(240, 70%, 12%) 50%, hsl(200, 85%, 10%) 100%)';
    } else if (timeLeft > 5) {
      // Warm oranges (15-6 seconds) - tension building
      return 'linear-gradient(135deg, hsl(25, 85%, 15%) 0%, hsl(35, 90%, 12%) 50%, hsl(45, 80%, 10%) 100%)';
    } else {
      // Intense reds (5-0 seconds) - high tension
      return 'linear-gradient(135deg, hsl(0, 90%, 18%) 0%, hsl(15, 85%, 15%) 50%, hsl(5, 95%, 12%) 100%)';
    }
  }, [timeLeft]);

  // Enhanced pulse and shake effects for final moments
  const finalEffects = useMemo(() => {
    if (timeLeft <= 2) return 'animate-pulse-intense animate-shake-screen';
    if (timeLeft <= 3) return 'animate-pulse-intense';
    if (timeLeft <= 5) return 'animate-pulse';
    return '';
  }, [timeLeft]);


  // Initialize game
  useEffect(() => {
    const categoryWords = wordLists[category];
    const wordPool = (categoryWords as any)?.[difficulty] || [];
    const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    
    setSecretWord(randomWord);
    setUsedWords([randomWord]);
    
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
      // Play warning sound when time is low
      simpleAudio.playWarning();
    }

    if (timeLeft <= 0 && !gameOver) {
      endGame("", false);
    }
  }, [timeLeft, gameOver, slowdownApplied]);

  const endGame = useCallback((endMessage: string, success: boolean) => {
    if (gameOver) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setMessage(endMessage);
    setIsSpinning(false);
    setGameOver(true);
    setGameSuccess(success);
    
    // Update game stats only once per game
    const updatedStats = updateGameStats(gameStats, success, category, Math.floor(elapsedTime));
    setGameStats(updatedStats);
    
    if (success) {
      // Güncellenen değerleri UI için set et
      const baseScore = calculateScore(Math.floor(elapsedTime), difficulty);
      const multiplier = calculateStreakMultiplier(updatedStats.currentStreak);
      const finalScore = baseScore * multiplier;
      
      setScore(finalScore);
      setStreak(updatedStats.currentStreak);
      setCorrectGuesses(updatedStats.totalCorrectGuesses);
      setAverageTime(updatedStats.averageGuessTime);
      setTotalScore(updatedStats.totalScore);
      
      // Yeni başarım kontrol et
      const newAchievements = updatedStats.achievements.filter(a => 
        a.unlocked && a.unlockedAt && 
        new Date(a.unlockedAt).getTime() > Date.now() - 1000
      );
      
      if (newAchievements.length > 0) {
        setCurrentAchievement(newAchievements[0]);
      }
    } else {
      setStreak(0);
    }
    
  }, [gameOver, gameStats, category, elapsedTime, difficulty]);

  const handleGuessSubmit = useCallback(() => {
    if (gameOver) return;
    if (guess.trim().length === 0) return;
    
    const trimmedGuess = guess.trim().toUpperCase();
    const newGuesses = [...guesses, trimmedGuess];
    setGuesses(newGuesses);
    setGuess('');
    
    
    if (trimmedGuess === secretWord.toUpperCase()) {
      // Doğru tahmin - skor güncelle ve modal göster
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Play success sound
      simpleAudio.playSuccess();
      
      // Timer'ı durdur
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Game stats güncelle
      const updatedStats = updateGameStats(gameStats, true, category, Math.floor(elapsedTime));
      setGameStats(updatedStats);
      
      // Skor hesapla ve güncelle
      const baseScore = calculateScore(Math.floor(elapsedTime), difficulty);
      const multiplier = calculateStreakMultiplier(updatedStats.currentStreak);
      const finalScore = baseScore * multiplier;
      
      setScore(finalScore);
      setStreak(updatedStats.currentStreak);
      setCorrectGuesses(updatedStats.totalCorrectGuesses);
      setAverageTime(updatedStats.averageGuessTime);
      setTotalScore(updatedStats.totalScore);
      setGameSuccess(true); // Başarılı olduğunu işaretle - this will clear keyboard
      
      // Immediately clear keyboard state for correct answer
      setTimeout(() => {
        setGuesses([]); // Clear guesses to reset keyboard colors
      }, 100);
      
      // Yeni başarım kontrol et
      const newAchievements = updatedStats.achievements.filter(a => 
        a.unlocked && a.unlockedAt && 
        new Date(a.unlockedAt).getTime() > Date.now() - 1000
      );
      
      if (newAchievements.length > 0) {
        setCurrentAchievement(newAchievements[0]);
      }
      
      // Kategori tamamlama kontrolü - sayacı artır
      const newCategoryCount = categoryCorrectCount + 1;
      setCategoryCorrectCount(newCategoryCount);
      
      // 25 kelime tamamlandığında bildirim göster ve otomatik kategori geçişi
      if (newCategoryCount >= 25) {
        setTimeout(() => {
          const allCategories = ['Hayvanlar', 'Yiyecek', 'Bilim', 'Ülkeler', 'Meslekler', 'Şehirler', 'Spor Dalları', 'Markalar', 'Filmler', 'Eşyalar'];
          const currentIndex = allCategories.indexOf(category);
          const nextCategory = allCategories[(currentIndex + 1) % allCategories.length];
          
          alert(`🎉 Tebrikler! "${category}" kategorisini "${difficulty}" seviyesinde tamamladınız!\n\n🎯 Serin korunarak "${nextCategory}" kategorisine geçiyorsun!`);
          
          // Otomatik kategori geçişi - seriyi koruyarak
          setTimeout(() => {
            if (onCategoryComplete) {
              onCategoryComplete(nextCategory, difficulty);
            } else {
              // Fallback: LocalStorage ile kategori değiştir ve reload
              localStorage.setItem('nextCategory', nextCategory);
              localStorage.setItem('nextDifficulty', difficulty);
              window.location.reload();
            }
          }, 2000);
        }, 1000);
      }
      
      // Başarı durumunda game over ekranını göster
      setGameOver(true);
    } else if (newGuesses.length >= maxGuesses) {
      // Maksimum tahmin sayısına ulaşıldı - oyunu bitir
      simpleAudio.playError();
      endGame(`${t.gameOver} Doğru kelime: ${secretWord}`, false);
    } else {
      // Yanlış tahmin ama devam ediliyor
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      setMessage(`${t.wrongAnswer} ${maxGuesses - newGuesses.length} tahmin hakkınız kaldı!`);
      setTimeout(() => setMessage(''), 2000);
      
      // Play error sound
      simpleAudio.playError();
    }
  }, [gameOver, guess, secretWord, elapsedTime, endGame, guesses, maxGuesses, t, gameStats, category, difficulty, usedWords, timerRef]);

  const handleKeyPress = useCallback(async (key: string) => {
    setGuess(prev => prev + key);
    // Trigger sparkle effect when typing
    setSparkleText(true);
    setTimeout(() => setSparkleText(false), 1000);
    
    // Play key press sound
    await audioManager.playKeyPress();
  }, []);

  const handleBackspace = useCallback(() => {
    setGuess(prev => prev.slice(0, -1));
  }, []);

  const handleSpace = useCallback(() => {
    setGuess(prev => prev + ' ');
  }, []);

  const handleContinue = useCallback(() => {
    // Clear existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Continue with new word without resetting score
    setGuess('');
    setGuesses([]); // Reset guesses for new word - this will clear keyboard state
    setIsSpinning(true);
    setMessage('');
    setGameOver(false);
    setElapsedTime(0);
    setSlowdownApplied(false);
    setGameSuccess(false);
    
    // Force keyboard clear by updating key
    setForceKeyboardRender(prev => prev + 1);
    
    // Get new word (different from used ones)
    const categoryWords = wordLists[category];
    const wordPool = (categoryWords as any)?.[difficulty] || [];
    
    // Filter out already used words
    const availableWords = wordPool.filter((word: string) => !usedWords.includes(word));
    
    let newWord: string;
    if (availableWords.length === 0) {
      // If all words are used, reset and use all words again
      setUsedWords([]);
      newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    } else {
      newWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    }
    
    if (newWord) {
      setSecretWord(newWord);
      setUsedWords(prev => [...prev, newWord]);
      // Play word complete sound for new word
      simpleAudio.playSuccess();
    }
    
    const baseSpeed = getSpinDuration(difficulty, TOTAL_GAME_TIME);
    setSpinDuration(baseSpeed);
    
    // Start new timer
    timerRef.current = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
  }, [category, difficulty, usedWords]);

  const handlePlayAgain = useCallback(() => {
    // Clear existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset all game state
    setGuess('');
    setGuesses([]); // Reset guesses - this will clear keyboard state
    setIsSpinning(true);
    setMessage('');
    setGameOver(false);
    setElapsedTime(0);
    setSlowdownApplied(false);
    setGameSuccess(false);
    
    // Force keyboard clear by updating key
    setForceKeyboardRender(prev => prev + 1);
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
      
      const key = event.key;
      
      if (key === 'Enter') {
        handleGuessSubmit();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === ' ') {
        event.preventDefault();
        handleSpace();
      } else if (/^[a-zA-ZçğıiİöşüÇĞÖŞÜ]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, handleGuessSubmit, handleBackspace, handleSpace, handleKeyPress]);

  return (
    <>
      
      <div 
        className={`h-screen relative overflow-hidden flex flex-col w-full transition-all duration-500 ${finalEffects}`}
        style={{
          background: dynamicBackground
        }}
      >
        {/* Statik arka plan - animasyon yok */}
        <GameHeader 
          category={category} 
          difficulty={difficulty} 
          language={language as Language}
          isGuestMode={isGuestMode}
          gameStats={gameStats}
          showDailyGoals={showDailyGoals}
          onToggleDailyGoals={() => setShowDailyGoals(!showDailyGoals)}
        />

        {/* Confetti Celebration */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="absolute animate-confetti-burst"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  fontSize: `${20 + Math.random() * 15}px`
                }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫', '🎈'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
        )}
        
        <main className="flex-1 flex flex-col px-1 py-1 pt-10 overflow-hidden min-h-screen max-h-screen">
          <div className="w-full h-full flex flex-col justify-between max-w-full overflow-hidden">
            {/* Kompakt Dikey Layout - Mobil First */}
            <div className="flex flex-col items-center gap-1 w-full overflow-hidden">
              {/* Üst: Spinning Wheel - Ultra Küçük */}
              <div className="flex-shrink-0 w-full flex justify-center -mt-2">
                <div className="transform scale-20 sm:scale-25 md:scale-35 lg:scale-45">
                  <SpinningWheel 
                    word={secretWord} 
                    isSpinning={isSpinning} 
                    spinDuration={spinDuration} 
                    difficulty={difficulty}
                    category={category}
                    timeLeft={timeLeft}
                  />
                </div>
              </div>
              
              
              {/* Orta: LUMINA Grid - Ultra Kompakt */}
              <div className="flex-shrink-0 transform scale-40 sm:scale-50 md:scale-65 lg:scale-80 w-full flex justify-center -mt-2">
                <LuminaGrid
                  word={secretWord}
                  guesses={guesses}
                  currentGuess={guess}
                  maxGuesses={maxGuesses}
                  isGameOver={gameOver}
                />
              </div>
              
              {/* Alt: Kompakt Timer + Keyboard */}
              <div className="flex-shrink-0 w-full max-w-[260px] space-y-1 px-1 -mt-2">
                {/* Timer - Mini */}
                <div className="flex justify-center">
                  <div className={`backdrop-blur-lg rounded px-2 py-0.5 bg-white/10 flex items-center gap-1 shadow-lg text-xs ${timeLeft <= 10 ? 'animate-heartbeat' : ''}`}>
                    <div className="text-xs animate-pulse">⏱️</div>
                    <div className="text-xs font-black text-white whitespace-nowrap" data-testid="text-time-left">
                      {timeLeft <= 0 ? 'Süre bitti' : formatTime(timeLeft)}
                    </div>
                    <div className="w-4 h-0.5 backdrop-blur-lg rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="progress-bar h-full rounded-full transition-all duration-1000 shadow-lg" 
                        style={{ 
                          width: `${((TOTAL_GAME_TIME - timeLeft) / TOTAL_GAME_TIME) * 100}%`,
                          background: timeLeft > 10 
                            ? 'linear-gradient(90deg, #10b981, #3b82f6)' 
                            : 'linear-gradient(90deg, #f59e0b, #ef4444)'
                        }}
                        data-testid="progress-timer"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Virtual Keyboard - Mobil Mini */}
                <div className="transform scale-75 sm:scale-85 md:scale-95 origin-center">
                  <VirtualKeyboard
                    key={`keyboard-${secretWord}-${gameOver}-${gameSuccess}-${guesses.length}-${forceKeyboardRender}`}
                    onKeyPress={handleKeyPress}
                    onBackspace={handleBackspace}
                    onSpace={handleSpace}
                    onSubmit={handleGuessSubmit}
                    language={language as Language}
                    correctKeys={getKeyboardLetterStates.correctKeys}
                    presentKeys={getKeyboardLetterStates.presentKeys}
                    absentKeys={getKeyboardLetterStates.absentKeys}
                  />
                </div>
              </div>
            </div>
            
            {message && (
              <div className="flex justify-center animate-slide-up px-2" style={{ animationDelay: '0.1s' }}>
                <div className="text-center space-y-1 md:space-y-2 max-w-full">
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-accent animate-bounce-soft px-2 md:px-4 break-words" data-testid="game-message">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Game Over Modal - Mobil Responsive */}
            {gameOver && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>
                
                {/* Modal Content */}
                <div className="relative w-full max-w-[280px] xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl animate-scale-in">
                  <div className="backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20 shadow-2xl" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                  }}>
                  <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                    {/* Success/Failure Icon */}
                    <div className="relative">
                      <div 
                        className="absolute inset-0 blur-3xl opacity-50 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${theme.primary}40, transparent)`
                        }}
                      />
                      <div className="relative text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-bounce-soft">
                        {gameSuccess ? '🎉' : '💫'}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h2 
                      className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black animate-pulse-glow"
                      style={{
                        background: `linear-gradient(45deg, ${theme.primary}, #ffffff, ${theme.secondary})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        backgroundSize: '200% auto',
                        animation: 'gradient 3s ease infinite'
                      }}
                    >
                      {gameSuccess ? t.congratulations : t.gameOver}
                    </h2>
                    
                    {/* Score Cards */}
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                      <div className="backdrop-blur-lg rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 border border-white/20" style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                      }}>
                        <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1">{gameSuccess ? '💎' : '💔'}</div>
                        <div 
                          className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-black mb-1"
                          style={{
                            background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent'
                          }}
                        >
                          {gameSuccess ? `+${score}` : '0'}
                        </div>
                        <div className="text-xs font-bold text-white/60">
                          {t.score}
                        </div>
                      </div>
                      
                      <div className="backdrop-blur-lg rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-white/20" style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                      }}>
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1">🏆</div>
                        <div 
                          className="text-lg sm:text-xl md:text-2xl font-black mb-1"
                          style={{
                            background: `linear-gradient(45deg, ${theme.secondary}, ${theme.primary})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent'
                          }}
                        >
                          {totalScore}
                        </div>
                        <div className="text-xs font-bold text-white/60">{t.totalScore}</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {gameSuccess && (
                        <button
                          onClick={handleContinue}
                          className="w-full py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-sm font-black rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-lg border text-white shadow-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primary}50, ${theme.secondary}50)`,
                            borderColor: `${theme.primary}80`,
                            boxShadow: `0 0 20px ${theme.primary}40`
                          }}
                        >
                          ⚡ {t.continue}
                        </button>
                      )}
                      <button
                        onClick={handlePlayAgain}
                        className="w-full py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-sm font-black rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-lg border text-white shadow-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${theme.secondary}40, ${theme.primary}40)`,
                          borderColor: `${theme.secondary}60`,
                          boxShadow: `0 0 20px ${theme.secondary}30`
                        }}
                      >
                        🚀 {t.newGame}
                      </button>
                      <button
                        onClick={onGameOver}
                        className="w-full py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-sm font-black rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-lg border border-white/30 bg-white/10 text-white/90 hover:bg-white/20 shadow-lg"
                      >
                        🏠 {t.mainMenu}
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </main>
        
        
        {/* Misafir modu göstergesi */}
        {isGuestMode && (
          <div className="fixed top-20 right-2 z-30">
            <div className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
              <span className="text-white/70 text-sm flex items-center gap-2">
                <span>👤</span>
                <span>{t.guestMode}</span>
              </span>
            </div>
          </div>
        )}
        
        
        {/* Başarım Bildirimi - Devre Dışı */}
        {false && <AchievementNotification 
          achievement={currentAchievement}
          onClose={() => setCurrentAchievement(null)}
        />}
      </div>
    </>
  );
});

GameScreen.displayName = 'GameScreen';
