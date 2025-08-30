export const TOTAL_GAME_TIME = 30;

// Language detection function
export const getSystemLanguage = (): string => {
  const browserLang = navigator.language || 'tr';
  const langCode = browserLang.split('-')[0];
  const supportedLanguages = ['tr', 'en', 'es', 'it', 'fr', 'de'];
  return supportedLanguages.includes(langCode) ? langCode : 'tr';
};

// Get current language from localStorage or system default
export const getCurrentLanguage = (): string => {
  if (typeof window === 'undefined') return 'tr';
  return localStorage.getItem('game-language') || getSystemLanguage();
};

// Translation definitions
type Language = 'tr' | 'en' | 'es' | 'it' | 'fr' | 'de';

const gameTranslations = {
  tr: {
    totalScore: 'Toplam Puan',
    streak: 'Seri',
    correctGuesses: 'Doğru Tahmin',
    averageTime: 'Ortalama Süre'
  },
  en: {
    totalScore: 'Total Score',
    streak: 'Streak',
    correctGuesses: 'Correct Guesses',
    averageTime: 'Average Time'
  },
  es: {
    totalScore: 'Puntuación Total',
    streak: 'Racha',
    correctGuesses: 'Aciertos',
    averageTime: 'Tiempo Promedio'
  },
  it: {
    totalScore: 'Punteggio Totale',
    streak: 'Serie',
    correctGuesses: 'Risposte Corrette',
    averageTime: 'Tempo Medio'
  },
  fr: {
    totalScore: 'Score Total',
    streak: 'Série',
    correctGuesses: 'Bonnes Réponses',
    averageTime: 'Temps Moyen'
  },
  de: {
    totalScore: 'Gesamtpunkte',
    streak: 'Serie',
    correctGuesses: 'Richtige Antworten',
    averageTime: 'Durchschnittszeit'
  }
};

// Get translations for current language
export const getTranslations = () => {
  const language = getCurrentLanguage() as Language;
  return gameTranslations[language];
};

export const rainbowColors = [
  'hsl(217, 91%, 60%)', // primary blue
  'hsl(262, 83%, 65%)', // secondary purple
  'hsl(160, 84%, 39%)', // accent green
  'hsl(42, 93%, 71%)', // yellow
  'hsl(0, 84%, 60%)', // destructive red
  'hsl(280, 100%, 70%)', // magenta
  'hsl(120, 100%, 50%)', // lime
];

export const categoryThemes = {
  'Hayvanlar': {
    primary: 'hsl(120, 70%, 40%)', // forest green
    secondary: 'hsl(100, 60%, 50%)', // lime green
    background: 'linear-gradient(135deg, hsl(120, 70%, 15%) 0%, hsl(100, 50%, 10%) 100%)'
  },
  'Yiyecek': {
    primary: 'hsl(25, 95%, 53%)', // orange
    secondary: 'hsl(45, 93%, 47%)', // yellow-orange
    background: 'linear-gradient(135deg, hsl(25, 95%, 15%) 0%, hsl(45, 80%, 10%) 100%)'
  },
  'Bilim': {
    primary: 'hsl(230, 80%, 60%)', // science blue
    secondary: 'hsl(260, 70%, 65%)', // purple
    background: 'linear-gradient(135deg, hsl(230, 80%, 15%) 0%, hsl(260, 60%, 10%) 100%)'
  },
  'Ülkeler': {
    primary: 'hsl(0, 70%, 55%)', // red
    secondary: 'hsl(200, 70%, 55%)', // blue
    background: 'linear-gradient(135deg, hsl(0, 70%, 15%) 0%, hsl(200, 60%, 10%) 100%)'
  },
  'Meslekler': {
    primary: 'hsl(340, 75%, 51%)', // pink
    secondary: 'hsl(280, 70%, 60%)', // purple
    background: 'linear-gradient(135deg, hsl(340, 75%, 15%) 0%, hsl(280, 60%, 10%) 100%)'
  },
  'Şehirler': {
    primary: 'hsl(190, 80%, 50%)', // cyan
    secondary: 'hsl(220, 70%, 60%)', // blue
    background: 'linear-gradient(135deg, hsl(190, 80%, 15%) 0%, hsl(220, 60%, 10%) 100%)'
  },
  'Markalar': {
    primary: 'hsl(300, 70%, 55%)', // magenta
    secondary: 'hsl(330, 70%, 55%)', // pink-magenta
    background: 'linear-gradient(135deg, hsl(300, 70%, 15%) 0%, hsl(330, 60%, 10%) 100%)'
  },
  'Eşyalar': {
    primary: 'hsl(40, 80%, 50%)', // gold
    secondary: 'hsl(20, 70%, 55%)', // orange-brown
    background: 'linear-gradient(135deg, hsl(40, 80%, 15%) 0%, hsl(20, 60%, 10%) 100%)'
  },
  'Filmler': {
    primary: 'hsl(350, 80%, 60%)', // red-pink
    secondary: 'hsl(280, 70%, 65%)', // purple
    background: 'linear-gradient(135deg, hsl(350, 80%, 15%) 0%, hsl(280, 60%, 10%) 100%)'
  },
  'Spor Dalları': {
    primary: 'hsl(60, 90%, 50%)', // bright yellow
    secondary: 'hsl(90, 70%, 50%)', // yellow-green
    background: 'linear-gradient(135deg, hsl(60, 90%, 15%) 0%, hsl(90, 60%, 10%) 100%)'
  }
};

export const getThemeForCategory = (category: string) => {
  return categoryThemes[category as keyof typeof categoryThemes] || {
    primary: 'hsl(217, 91%, 60%)',
    secondary: 'hsl(262, 83%, 65%)',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #7C3AED 100%)'
  };
};

export const turkishKeyboardLayout = [
  ['Q','W','E','R','T','Y','U','I','O','P','Ğ','Ü'],
  ['A','S','D','F','G','H','J','K','L','Ş','İ'],
  ['Z','X','C','V','B','N','M','Ö','Ç']
];

// Achievement and motivation system
export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category?: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface DailyGoal {
  id: string;
  target: number;
  current: number;
  completed: boolean;
  emoji: string;
  name: string;
}

export interface GameStats {
  totalGamesPlayed: number;
  totalCorrectGuesses: number;
  currentStreak: number;
  bestStreak: number;
  totalScore: number;
  averageGuessTime: number;
  categoryExpertise: { [category: string]: number };
  achievements: Achievement[];
  dailyGoals: DailyGoal[];
  lastPlayedDate: string;
}

export const calculateScore = (timeElapsed: number, difficulty: number): number => {
  // Kalan saniye kadar puan ver
  const remainingTime = TOTAL_GAME_TIME - timeElapsed;
  let baseScore = Math.max(0, remainingTime);
  
  // Hız bonusu: 5 saniyede bilirse +5 puan
  if (timeElapsed <= 5) {
    baseScore += 5;
  }
  
  return baseScore;
};

// Perfect streak kontrolü ve çarpan hesaplama
export const calculateStreakMultiplier = (currentStreak: number): number => {
  if (currentStreak >= 5) {
    return 2; // 5 ardışık doğru = 2x puan
  }
  return 1;
};

// Günlük hedefler
export const getDefaultDailyGoals = (): DailyGoal[] => [
  {
    id: 'daily-words',
    name: '10 Kelime Bil',
    target: 10,
    current: 0,
    completed: false,
    emoji: '🎯'
  },
  {
    id: 'daily-streak',
    name: '5 Streak Yap',
    target: 5,
    current: 0,
    completed: false,
    emoji: '🔥'
  }
];

// Başarım sistemi
export const getDefaultAchievements = (): Achievement[] => [
  {
    id: 'first-win',
    name: 'İlk Zafer',
    description: '',
    emoji: '🎉',
    unlocked: false
  },
  {
    id: 'speed-demon',
    name: 'Hız Şeytanı',
    description: '5 saniyede bir kelime bil',
    emoji: '⚡',
    unlocked: false
  },
  {
    id: 'streak-master',
    name: 'Seri Ustası',
    description: '10 ardışık doğru cevap',
    emoji: '🔥',
    unlocked: false
  },
  {
    id: 'animal-expert',
    name: 'Hayvan Uzmanı',
    description: 'Hayvanlar kategorisinde 20 doğru',
    emoji: '🐾',
    category: 'Hayvanlar',
    unlocked: false
  },
  {
    id: 'food-expert',
    name: 'Yemek Uzmanı',
    description: 'Yiyecek kategorisinde 20 doğru',
    emoji: '🍽️',
    category: 'Yiyecek',
    unlocked: false
  },
  {
    id: 'century-club',
    name: 'Yüzler Kulübü',
    description: '100 kelime doğru tahmin et',
    emoji: '💯',
    unlocked: false
  }
];

// Başarım kontrolü
export const checkAchievements = (stats: GameStats, currentCategory: string, guessTime: number): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  stats.achievements.forEach(achievement => {
    if (achievement.unlocked) return;
    
    switch (achievement.id) {
      case 'first-win':
        if (stats.totalCorrectGuesses >= 1) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newAchievements.push(achievement);
        }
        break;
        
      case 'speed-demon':
        if (guessTime <= 5) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newAchievements.push(achievement);
        }
        break;
        
      case 'streak-master':
        if (stats.currentStreak >= 10) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newAchievements.push(achievement);
        }
        break;
        
      case 'animal-expert':
        if (stats.categoryExpertise['Hayvanlar'] >= 20) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newAchievements.push(achievement);
        }
        break;
        
      case 'food-expert':
        if (stats.categoryExpertise['Yiyecek'] >= 20) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newAchievements.push(achievement);
        }
        break;
        
      case 'century-club':
        if (stats.totalCorrectGuesses >= 100) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newAchievements.push(achievement);
        }
        break;
    }
  });
  
  return newAchievements;
};

// Günlük hedef güncelleme
export const updateDailyGoals = (stats: GameStats, isCorrect: boolean): DailyGoal[] => {
  const today = new Date().toDateString();
  
  // Yeni gün kontrolü
  if (stats.lastPlayedDate !== today) {
    stats.dailyGoals = getDefaultDailyGoals();
  }
  
  if (isCorrect) {
    stats.dailyGoals.forEach(goal => {
      if (goal.id === 'daily-words' && !goal.completed) {
        goal.current = Math.min(goal.current + 1, goal.target);
        goal.completed = goal.current >= goal.target;
      }
      if (goal.id === 'daily-streak' && !goal.completed) {
        goal.current = Math.max(goal.current, stats.currentStreak);
        goal.completed = goal.current >= goal.target;
      }
    });
  }
  
  return stats.dailyGoals;
};

// Oyun istatistiklerini güncelle
export const updateGameStats = (stats: GameStats, isCorrect: boolean, category: string, guessTime: number): GameStats => {
  const today = new Date().toDateString();
  
  stats.totalGamesPlayed++;
  stats.lastPlayedDate = today;
  
  if (isCorrect) {
    stats.totalCorrectGuesses++;
    stats.currentStreak++;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    
    // Kategori uzmanlığı
    stats.categoryExpertise[category] = (stats.categoryExpertise[category] || 0) + 1;
    
    // Puan hesapla
    const baseScore = calculateScore(guessTime, 3);
    const multiplier = calculateStreakMultiplier(stats.currentStreak);
    stats.totalScore += baseScore * multiplier;
    
    // Ortalama tahmin süresi
    stats.averageGuessTime = ((stats.averageGuessTime * (stats.totalCorrectGuesses - 1)) + guessTime) / stats.totalCorrectGuesses;
  } else {
    stats.currentStreak = 0;
  }
  
  // Günlük hedefleri güncelle
  stats.dailyGoals = updateDailyGoals(stats, isCorrect);
  
  // Başarımları kontrol et
  const newAchievements = checkAchievements(stats, category, guessTime);
  
  return stats;
};

export const formatTime = (seconds: number): string => {
  return `${seconds}s`;
};

// Enhanced spin dynamics based on difficulty
export const getSpinDuration = (difficulty: number, timeLeft: number): number => {
  // Base speed depends on difficulty: Easy = slow, Hard = fast
  let baseSpeed;
  if (difficulty <= 2) {
    baseSpeed = 8.0; // Easy: Very slow spinning
  } else if (difficulty === 3) {
    baseSpeed = 5.0; // Medium: Medium spinning  
  } else {
    baseSpeed = 3.0; // Hard: Fast spinning
  }
  
  // Dynamic speed changes based on time pressure
  if (timeLeft <= 5) {
    return baseSpeed * 2.5; // Very slow for dramatic effect
  } else if (timeLeft <= 10) {
    return baseSpeed * 1.8; // Slow down significantly
  } else if (timeLeft <= 15) {
    return baseSpeed * 1.2; // Slight slowdown
  }
  
  return baseSpeed;
};

// Get blur intensity based on difficulty and time
export const getBlurIntensity = (difficulty: number, timeLeft: number, isSpinning: boolean): number => {
  if (!isSpinning) return 0;
  
  // Blur intensity based on difficulty: Easy = less blur, Hard = more blur
  let baseBlur;
  if (difficulty <= 2) {
    baseBlur = 1.0; // Easy: Low blur, letters more visible
  } else if (difficulty === 3) {
    baseBlur = 2.5; // Medium: Medium blur
  } else {
    baseBlur = 4.0; // Hard: High blur, letters hard to see
  }
  
  // Reduce blur as time runs out for dramatic reveal
  if (timeLeft <= 5) {
    return baseBlur * 0.3; // Much clearer for final moments
  } else if (timeLeft <= 10) {
    return baseBlur * 0.6; // Getting clearer
  } else if (timeLeft <= 15) {
    return baseBlur * 0.8; // Slightly clearer
  }
  
  return baseBlur;
};

// Calculate letter visibility based on difficulty and time
export const getLetterVisibility = (timeLeft: number, letterIndex: number, totalLetters: number, difficulty: number = 3): number => {
  const timeProgress = (30 - timeLeft) / 30; // 0 to 1 progression
  const letterProgress = letterIndex / totalLetters; // Position of this letter
  
  // Visibility timing based on difficulty
  let visibilityThreshold;
  if (difficulty <= 2) {
    visibilityThreshold = 0.1; // Easy: Letters show early
  } else if (difficulty === 3) {
    visibilityThreshold = 0.2; // Medium: Normal timing
  } else {
    visibilityThreshold = 0.3; // Hard: Letters show later
  }
  
  // Letters become visible progressively
  if (timeProgress > letterProgress + visibilityThreshold) {
    return 1; // Fully visible
  } else if (timeProgress > letterProgress) {
    return (timeProgress - letterProgress) / visibilityThreshold; // Fading in
  }
  
  // Base visibility also depends on difficulty
  return difficulty <= 2 ? 0.3 : difficulty === 3 ? 0.1 : 0.05;
};

// Get dramatic scale effect for letters
export const getLetterScale = (timeLeft: number, isSpinning: boolean, letterIndex: number): number => {
  if (!isSpinning) return 1.5;
  
  const baseScale = 1 + Math.sin(Date.now() * 0.008 + letterIndex) * 0.15;
  
  // Dramatic pulsing when time is critical
  if (timeLeft <= 5) {
    return baseScale * (1 + Math.sin(Date.now() * 0.02) * 0.3);
  } else if (timeLeft <= 10) {
    return baseScale * (1 + Math.sin(Date.now() * 0.015) * 0.2);
  }
  
  return baseScale;
};

export const shouldShowCountdown = (timeLeft: number, gameOver: boolean): boolean => {
  return timeLeft <= 10 && !gameOver && timeLeft > 0;
};

// Get intensity of background effects based on time pressure
export const getIntensityLevel = (timeLeft: number): 'calm' | 'tense' | 'critical' | 'final' => {
  if (timeLeft <= 3) return 'final';
  if (timeLeft <= 7) return 'critical';
  if (timeLeft <= 15) return 'tense';
  return 'calm';
};

// Calculate wheel rotation speed multiplier
export const getWheelSpeedMultiplier = (timeLeft: number): number => {
  if (timeLeft <= 3) return 0.2; // Very slow for dramatic effect
  if (timeLeft <= 7) return 0.4;
  if (timeLeft <= 15) return 0.7;
  return 1; // Normal speed
};

// Export game translations for compatibility
export { gameTranslations };
