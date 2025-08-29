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
    return (
      <div 
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #e94560 100%)',
          minHeight: '100vh'
        }}
      >
        <GameScreen settings={gameSettings} onGameOver={handleGameOver} />
      </div>
    );
  }
  
  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #e94560 100%)',
        minHeight: '100vh'
      }}
    >
      <MenuScreen onStartGame={handleStartGame} />
    </div>
  );
}
