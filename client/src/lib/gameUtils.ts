export const TOTAL_GAME_TIME = 30;

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
  'Spor Dalları': {
    primary: 'hsl(60, 90%, 50%)', // bright yellow
    secondary: 'hsl(90, 70%, 50%)', // yellow-green
    background: 'linear-gradient(135deg, hsl(60, 90%, 15%) 0%, hsl(90, 60%, 10%) 100%)'
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
  }
};

export const getThemeForCategory = (category: string) => {
  return categoryThemes[category as keyof typeof categoryThemes] || {
    primary: 'hsl(217, 91%, 60%)',
    secondary: 'hsl(262, 83%, 65%)',
    background: 'linear-gradient(135deg, hsl(222, 84%, 5%) 0%, hsl(217, 32%, 17%) 100%)'
  };
};

export const turkishKeyboardLayout = [
  ['Q','W','E','R','T','Y','U','I','O','P','Ğ','Ü'],
  ['A','S','D','F','G','H','J','K','L','Ş','İ'],
  ['Z','X','C','V','B','N','M','Ö','Ç']
];

export const calculateScore = (timeElapsed: number, difficulty: number): number => {
  const baseScore = 100;
  const difficultyBonus = difficulty * 50;
  const timeBonus = Math.max(0, (TOTAL_GAME_TIME - timeElapsed) * 10);
  return baseScore + difficultyBonus + timeBonus;
};

export const formatTime = (seconds: number): string => {
  return `${seconds}s`;
};

export const getSpinDuration = (difficulty: number, timeLeft: number): number => {
  const baseSpeed = 4.5 - (difficulty - 1) * 0.75;
  // Speed up when time is running out
  return timeLeft <= 10 ? baseSpeed + 1.5 : baseSpeed;
};

export const shouldShowCountdown = (timeLeft: number, gameOver: boolean): boolean => {
  return timeLeft <= 10 && !gameOver && timeLeft > 0;
};
