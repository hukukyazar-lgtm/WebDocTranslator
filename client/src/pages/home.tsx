import { useState } from 'react';
import { MenuScreen, type GameSettings } from '@/components/game/MenuScreen';
import { GameScreen } from '@/components/game/GameScreen';

export default function Home() {
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  
  const handleStartGame = (settings: GameSettings) => {
    setGameSettings(settings);
  };

  const handleGameOver = () => {
    setGameSettings(null);
  };

  if (gameSettings) {
    return <GameScreen settings={gameSettings} onGameOver={handleGameOver} />;
  }
  
  return <MenuScreen onStartGame={handleStartGame} />;
}
