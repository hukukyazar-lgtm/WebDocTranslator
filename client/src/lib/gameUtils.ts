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
